const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

async function run() {
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  const siteUrl = 'https://www.bamboovalleyphuket.com/';

  // Get queries by page
  const response = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: '2025-12-01',
      endDate: '2025-12-30',
      dimensions: ['page', 'query'],
      rowLimit: 100,
    },
  });

  // Group by page
  const byPage = {};
  response.data.rows?.forEach(row => {
    const page = row.keys[0].replace('https://www.bamboovalleyphuket.com', '') || '/';
    const query = row.keys[1];
    if (!byPage[page]) byPage[page] = [];
    byPage[page].push({
      query,
      clicks: row.clicks,
      impressions: row.impressions,
      position: row.position.toFixed(1)
    });
  });

  // Print grouped by page
  Object.keys(byPage).sort((a, b) => {
    const aImps = byPage[a].reduce((s, r) => s + r.impressions, 0);
    const bImps = byPage[b].reduce((s, r) => s + r.impressions, 0);
    return bImps - aImps;
  }).forEach(page => {
    const totalImps = byPage[page].reduce((s, r) => s + r.impressions, 0);
    console.log(`\n=== ${page} (${totalImps} total impressions) ===`);
    byPage[page]
      .sort((a, b) => b.impressions - a.impressions)
      .forEach(r => {
        console.log(`  "${r.query}" - ${r.clicks} clicks, ${r.impressions} imps, pos ${r.position}`);
      });
  });
}

run().catch(console.error);
