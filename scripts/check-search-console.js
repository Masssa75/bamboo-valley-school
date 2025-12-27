#!/usr/bin/env node

/**
 * Check Google Search Console for bamboovalleyphuket.com
 * Usage: node scripts/check-search-console.js [days]
 *
 * Credentials: Uses root .env file (../../.env)
 * Service account: phuket-camps-analytics@phuketcamp-analytics.iam.gserviceaccount.com
 */

require('dotenv').config({ path: require('path').join(__dirname, '../../../.env') });
const { google } = require('googleapis');

const siteUrl = 'https://www.bamboovalleyphuket.com/';

async function main() {
  const days = parseInt(process.argv[2]) || 28;

  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.error('❌ Missing credentials. Check that ../../.env has:');
    console.error('   - GOOGLE_SERVICE_ACCOUNT_EMAIL');
    console.error('   - GOOGLE_PRIVATE_KEY');
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth });

  // Calculate date range
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 3); // Data delay
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days);

  const formatDate = (d) => d.toISOString().split('T')[0];

  console.log(`\n🔍 Search Console: bamboovalleyphuket.com`);
  console.log(`   Period: Last ${days} days (${formatDate(startDate)} to ${formatDate(endDate)})`);
  console.log('─'.repeat(60));

  // Check sitemaps
  console.log('\n📋 SITEMAPS:');
  try {
    const sitemaps = await searchconsole.sitemaps.list({ siteUrl });
    if (sitemaps.data.sitemap && sitemaps.data.sitemap.length > 0) {
      sitemaps.data.sitemap.forEach(sm => {
        console.log(`   ${sm.path}`);
        console.log(`   └─ Submitted: ${sm.lastSubmitted?.split('T')[0] || 'N/A'}`);
        console.log(`   └─ Downloaded: ${sm.lastDownloaded?.split('T')[0] || 'N/A'}`);
        if (sm.contents) {
          sm.contents.forEach(c => {
            console.log(`   └─ URLs: ${c.submitted} submitted, ${c.indexed} indexed`);
          });
        }
        if (sm.errors > 0) console.log(`   └─ ⚠️  Errors: ${sm.errors}`);
      });
    } else {
      console.log('   ⚠️  No sitemaps submitted!');
      console.log('   Run: node scripts/submit-sitemap.js');
    }
  } catch (e) {
    console.log('   Error:', e.message);
  }

  // Get search queries
  console.log('\n📝 TOP QUERIES:');
  try {
    const response = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['query'],
        rowLimit: 15,
      },
    });

    if (response.data.rows && response.data.rows.length > 0) {
      console.log('   ' + 'Query'.padEnd(40) + 'Clicks  Impr   CTR    Pos');
      console.log('   ' + '─'.repeat(56));

      let totalClicks = 0, totalImpressions = 0;
      response.data.rows.forEach((row) => {
        const query = row.keys[0].substring(0, 39).padEnd(40);
        const clicks = String(row.clicks).padEnd(7);
        const impressions = String(row.impressions).padEnd(6);
        const ctr = (row.ctr * 100).toFixed(1).padStart(5) + '%';
        const position = row.position.toFixed(1);
        console.log(`   ${query}${clicks}${impressions}${ctr}  ${position}`);
        totalClicks += row.clicks;
        totalImpressions += row.impressions;
      });
      console.log('   ' + '─'.repeat(56));
      console.log(`   Total: ${totalClicks} clicks, ${totalImpressions} impressions`);
    } else {
      console.log('   No search data yet (site may be too new)');
    }
  } catch (error) {
    if (error.message.includes('not a verified')) {
      console.log('   ❌ Site not verified in Google Search Console');
    } else {
      console.error('   Error:', error.message);
    }
  }

  // Get top pages
  console.log('\n📄 TOP PAGES:');
  try {
    const response = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['page'],
        rowLimit: 10,
      },
    });

    if (response.data.rows && response.data.rows.length > 0) {
      response.data.rows.forEach((row) => {
        const page = row.keys[0].replace('https://www.bamboovalleyphuket.com', '');
        console.log(`   ${page || '/'} - ${row.clicks} clicks, ${row.impressions} impr`);
      });
    } else {
      console.log('   No page data yet');
    }
  } catch (e) {
    console.log('   Error:', e.message);
  }

  console.log('\n');
}

main().catch(console.error);
