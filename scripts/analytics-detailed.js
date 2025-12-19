#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const propertyId = process.env.GA_PROPERTY_ID;
const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

async function main() {
  const days = parseInt(process.argv[2]) || 7;
  console.log(`\n📊 Detailed Analytics (Last ${days} days)\n`);

  // Geographic data - Countries
  console.log('🌍 VISITORS BY COUNTRY:\n' + '─'.repeat(50));
  try {
    const [countryRes] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 15,
    });

    if (countryRes.rows && countryRes.rows.length > 0) {
      countryRes.rows.forEach(row => {
        const country = row.dimensionValues[0].value;
        const users = row.metricValues[0].value;
        const sessions = row.metricValues[1].value;
        console.log(`   ${country}: ${users} users, ${sessions} sessions`);
      });
    } else {
      console.log('   No country data yet.');
    }
  } catch (err) {
    console.log('   Error:', err.message);
  }

  // City data
  console.log('\n\n🏙️  VISITORS BY CITY:\n' + '─'.repeat(50));
  try {
    const [cityRes] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'city' }, { name: 'country' }],
      metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 15,
    });

    if (cityRes.rows && cityRes.rows.length > 0) {
      cityRes.rows.forEach(row => {
        const city = row.dimensionValues[0].value;
        const country = row.dimensionValues[1].value;
        const users = row.metricValues[0].value;
        const sessions = row.metricValues[1].value;
        console.log(`   ${city}, ${country}: ${users} users, ${sessions} sessions`);
      });
    } else {
      console.log('   No city data yet.');
    }
  } catch (err) {
    console.log('   Error:', err.message);
  }

  // Detailed referrers (source/medium)
  console.log('\n\n🔗 TRAFFIC SOURCES (Source / Medium):\n' + '─'.repeat(50));
  try {
    const [refRes] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'sessionSource' }, { name: 'sessionMedium' }],
      metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 20,
    });

    if (refRes.rows && refRes.rows.length > 0) {
      refRes.rows.forEach(row => {
        const source = row.dimensionValues[0].value || '(direct)';
        const medium = row.dimensionValues[1].value || '(none)';
        const sessions = row.metricValues[0].value;
        const users = row.metricValues[1].value;
        console.log(`   ${source} / ${medium}: ${sessions} sessions, ${users} users`);
      });
    } else {
      console.log('   No referrer data yet.');
    }
  } catch (err) {
    console.log('   Error:', err.message);
  }

  // Full page referrer (shows actual referring URLs)
  console.log('\n\n🌐 REFERRING URLS:\n' + '─'.repeat(50));
  try {
    const [fullRefRes] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'pageReferrer' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 20,
    });

    if (fullRefRes.rows && fullRefRes.rows.length > 0) {
      let hasData = false;
      fullRefRes.rows.forEach(row => {
        const referrer = row.dimensionValues[0].value;
        const sessions = row.metricValues[0].value;
        if (referrer && referrer !== '(not set)') {
          hasData = true;
          console.log(`   ${sessions}x  ${referrer}`);
        }
      });
      if (!hasData) {
        console.log('   All traffic is direct (no referring URLs).');
      }
    } else {
      console.log('   No referrer URL data yet.');
    }
  } catch (err) {
    console.log('   Error:', err.message);
  }

  console.log('\n');
}

main().catch(console.error);
