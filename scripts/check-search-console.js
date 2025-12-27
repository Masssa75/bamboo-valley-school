#!/usr/bin/env node

/**
 * Check Google Search Console for bamboovalleyphuket.com
 * Usage: node scripts/check-search-console.js [days]
 */

require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

const siteUrl = 'https://www.bamboovalleyphuket.com/';

async function main() {
  const days = parseInt(process.argv[2]) || 28;

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth });

  // Calculate date range
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 3); // Data delay
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days);

  const formatDate = (d) => d.toISOString().split('T')[0];

  console.log(`\n🔍 Search Console Data (Last ${days} days)`);
  console.log('Site: bamboovalleyphuket.com');
  console.log('─'.repeat(50));

  try {
    // Get search queries
    const response = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['query'],
        rowLimit: 25,
      },
    });

    if (response.data.rows && response.data.rows.length > 0) {
      console.log('\n📝 Top Search Queries:\n');
      console.log('Query'.padEnd(45) + 'Clicks  Impr   CTR    Pos');
      console.log('─'.repeat(70));

      response.data.rows.forEach((row) => {
        const query = row.keys[0].substring(0, 44).padEnd(45);
        const clicks = String(row.clicks).padEnd(7);
        const impressions = String(row.impressions).padEnd(6);
        const ctr = (row.ctr * 100).toFixed(1).padStart(5) + '%';
        const position = row.position.toFixed(1);
        console.log(`${query}${clicks}${impressions}${ctr}  ${position}`);
      });
    } else {
      console.log('\n⚠️  No search query data yet.');
      console.log('   This could mean:');
      console.log('   - Site is new and not indexed yet');
      console.log('   - Site not verified in Search Console');
      console.log('   - Data takes 2-3 days to appear');
    }
  } catch (error) {
    if (error.message.includes('not a verified')) {
      console.log('\n❌ Site not verified in Google Search Console');
      console.log('   To fix: Add bamboovalleyphuket.com to Search Console');
      console.log('   and verify ownership with the service account.');
    } else {
      console.error('\n❌ Error:', error.message);
    }
  }
}

main().catch(console.error);
