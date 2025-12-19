#!/usr/bin/env node

/**
 * Check Google Analytics for bamboovalleyphuket.com
 * Usage: node scripts/check-analytics.js [days]
 * Example: node scripts/check-analytics.js 7
 */

require('dotenv').config({ path: '.env.local' });
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const propertyId = process.env.GA_PROPERTY_ID;

if (!propertyId) {
  console.error('Error: GA_PROPERTY_ID not set in .env.local');
  process.exit(1);
}

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

async function getOverview(days = 7) {
  console.log(`\n📊 Analytics Overview (Last ${days} days)\n`);
  console.log('Property: Bamboo Valley School (bamboovalleyphuket.com)');
  console.log('Property ID:', propertyId);
  console.log('─'.repeat(50));

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
        { name: 'sessions' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
      ],
    });

    if (response.rows && response.rows.length > 0) {
      const row = response.rows[0];
      const metrics = row.metricValues;

      console.log('\n📈 Summary:');
      console.log(`   Active Users:     ${metrics[0].value}`);
      console.log(`   Page Views:       ${metrics[1].value}`);
      console.log(`   Sessions:         ${metrics[2].value}`);
      console.log(`   Avg Duration:     ${Math.round(parseFloat(metrics[3].value))}s`);
      console.log(`   Bounce Rate:      ${(parseFloat(metrics[4].value) * 100).toFixed(1)}%`);
    } else {
      console.log('\n⚠️  No data yet - site just launched, check back later.');
    }
  } catch (error) {
    console.error('\n❌ Error fetching overview:', error.message);
    return;
  }
}

async function getTopPages(days = 7) {
  console.log('\n\n📄 Top Pages:');
  console.log('─'.repeat(50));

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
      limit: 10,
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    });

    if (response.rows && response.rows.length > 0) {
      response.rows.forEach((row, i) => {
        const path = row.dimensionValues[0].value;
        const views = row.metricValues[0].value;
        const users = row.metricValues[1].value;
        console.log(`   ${i + 1}. ${path}`);
        console.log(`      Views: ${views} | Users: ${users}`);
      });
    } else {
      console.log('   No page data yet.');
    }
  } catch (error) {
    console.error('   Error:', error.message);
  }
}

async function getTrafficSources(days = 7) {
  console.log('\n\n🌐 Traffic Sources:');
  console.log('─'.repeat(50));

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'sessionSource' }],
      metrics: [{ name: 'sessions' }],
      limit: 10,
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    });

    if (response.rows && response.rows.length > 0) {
      response.rows.forEach((row, i) => {
        const source = row.dimensionValues[0].value || '(direct)';
        const sessions = row.metricValues[0].value;
        console.log(`   ${i + 1}. ${source}: ${sessions} sessions`);
      });
    } else {
      console.log('   No traffic source data yet.');
    }
  } catch (error) {
    console.error('   Error:', error.message);
  }
}

async function main() {
  const days = parseInt(process.argv[2]) || 7;

  await getOverview(days);
  await getTopPages(days);
  await getTrafficSources(days);

  console.log('\n');
}

main().catch(console.error);
