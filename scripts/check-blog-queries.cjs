require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  },
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
});

async function getPageQueries() {
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  
  const response = await searchconsole.searchanalytics.query({
    siteUrl: 'https://bamboovalleyphuket.com/',
    requestBody: {
      startDate: '2025-01-10',
      endDate: '2025-01-17',
      dimensions: ['query'],
      dimensionFilterGroups: [{
        filters: [{
          dimension: 'page',
          operator: 'contains',
          expression: 'day-at-bamboo-valley'
        }]
      }],
      rowLimit: 25
    }
  });

  console.log('Search queries landing on /en/blog/day-at-bamboo-valley/\n');
  console.log('(Search Console data has 2-3 day delay)\n');
  
  if (!response.data.rows || response.data.rows.length === 0) {
    console.log('No query data yet - page may be too new for Search Console to have data.');
    console.log('\nNote: Search Console typically has a 2-3 day data delay.');
    console.log('Since this page was just published yesterday, query data');
    console.log('may not appear until Jan 19-20.');
    return;
  }
  
  console.log('Query'.padEnd(45) + 'Clicks  Impr  CTR   Position');
  console.log('-'.repeat(75));
  response.data.rows.forEach(row => {
    const query = row.keys[0];
    const clicks = row.clicks;
    const impressions = row.impressions;
    const ctr = (row.ctr * 100).toFixed(1) + '%';
    const position = row.position.toFixed(1);
    
    console.log(
      query.substring(0, 44).padEnd(45) + 
      String(clicks).padStart(6) + 
      String(impressions).padStart(6) +
      ctr.padStart(7) +
      position.padStart(10)
    );
  });
}

getPageQueries().catch(e => console.error('Error:', e.message));
