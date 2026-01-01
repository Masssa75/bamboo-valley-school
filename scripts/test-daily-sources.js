#!/usr/bin/env node
require('dotenv').config({ path: '.env.local' })
const { BetaAnalyticsDataClient } = require('@google-analytics/data')

const client = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
})

async function run() {
  const [response] = await client.runReport({
    property: 'properties/' + process.env.GA_PROPERTY_ID,
    dateRanges: [{ startDate: '14daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'date' }, { name: 'sessionSource' }],
    metrics: [{ name: 'activeUsers' }],
    orderBys: [{ dimension: { dimensionName: 'date' } }]
  })

  const byDate = {}
  response.rows?.forEach(row => {
    const date = row.dimensionValues[0].value
    const source = row.dimensionValues[1].value
    const users = parseInt(row.metricValues[0].value)

    if (!byDate[date]) byDate[date] = { total: 0 }
    byDate[date][source] = (byDate[date][source] || 0) + users
    byDate[date].total += users
  })

  // Format for display
  console.log('\n📊 Daily Traffic by Source (Last 14 days)\n')
  console.log('Date       | Total | Google | Direct | Facebook | Other')
  console.log('-'.repeat(60))

  Object.keys(byDate).sort().forEach(date => {
    const d = byDate[date]
    const formatted = date.slice(4,6) + '/' + date.slice(6,8)
    const google = d['google'] || 0
    const direct = d['(direct)'] || 0
    const fb = d['facebook.com'] || 0
    const other = d.total - google - direct - fb
    console.log(`${formatted}      | ${String(d.total).padStart(5)} | ${String(google).padStart(6)} | ${String(direct).padStart(6)} | ${String(fb).padStart(8)} | ${other}`)
  })
}
run().catch(e => console.error(e.message))
