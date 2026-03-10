require('dotenv').config({ path: '.env.local' });
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const client = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }
});

async function getPageTraffic() {
  const [response] = await client.runReport({
    property: 'properties/' + process.env.GA_PROPERTY_ID,
    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
    dimensions: [
      { name: 'sessionSource' },
      { name: 'sessionMedium' }
    ],
    metrics: [
      { name: 'sessions' },
      { name: 'activeUsers' },
      { name: 'screenPageViews' },
      { name: 'averageSessionDuration' },
      { name: 'engagementRate' }
    ],
    dimensionFilter: {
      filter: {
        fieldName: 'pagePath',
        stringFilter: {
          matchType: 'CONTAINS',
          value: 'day-at-bamboo-valley'
        }
      }
    },
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }]
  });

  console.log('Traffic to /en/blog/day-at-bamboo-valley/ (Last 7 days)\n');
  if (!response.rows || response.rows.length === 0) {
    console.log('No traffic data found for this page.');
    return;
  }
  
  console.log('Source / Medium'.padEnd(30) + 'Sessions  Users  Avg Duration  Engagement');
  console.log('-'.repeat(75));
  response.rows.forEach(row => {
    const source = row.dimensionValues[0].value;
    const medium = row.dimensionValues[1].value;
    const sessions = row.metricValues[0].value;
    const users = row.metricValues[1].value;
    const duration = parseFloat(row.metricValues[3].value);
    const engagement = parseFloat(row.metricValues[4].value) * 100;
    
    const mins = Math.floor(duration / 60);
    const secs = Math.round(duration % 60);
    const durationStr = mins + 'm ' + secs + 's';
    
    console.log(
      (source + ' / ' + medium).padEnd(30) + 
      sessions.padStart(8) + 
      users.padStart(7) + 
      durationStr.padStart(14) +
      (engagement.toFixed(0) + '%').padStart(12)
    );
  });
}

getPageTraffic().catch(e => console.error('Error:', e.message));
