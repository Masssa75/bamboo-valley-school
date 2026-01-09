#!/usr/bin/env node
/**
 * Conversion tracking script for bamboovalleyphuket.com
 * Shows contact form submissions with their traffic sources
 *
 * Usage: node scripts/check-conversions.js [days]
 * Example: node scripts/check-conversions.js 7
 */

require('dotenv').config({ path: '.env.local' })
const { BetaAnalyticsDataClient } = require('@google-analytics/data')

const propertyId = process.env.GA_PROPERTY_ID
const days = parseInt(process.argv[2]) || 28

if (!propertyId) {
  console.error('Missing GA_PROPERTY_ID in .env.local')
  process.exit(1)
}

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
})

async function getConversionsBySource() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
    dimensions: [
      { name: 'eventName' },
      { name: 'sessionSource' },
      { name: 'sessionMedium' },
    ],
    metrics: [
      { name: 'eventCount' },
    ],
    dimensionFilter: {
      filter: {
        fieldName: 'eventName',
        stringFilter: {
          value: 'contact_form_submit',
        },
      },
    },
    orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
  })
  return response
}

async function getConversionsByDate() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
    dimensions: [
      { name: 'date' },
      { name: 'sessionSource' },
      { name: 'sessionMedium' },
      { name: 'country' },
    ],
    metrics: [
      { name: 'eventCount' },
    ],
    dimensionFilter: {
      filter: {
        fieldName: 'eventName',
        stringFilter: {
          value: 'contact_form_submit',
        },
      },
    },
    orderBys: [{ dimension: { dimensionName: 'date' }, desc: true }],
  })
  return response
}

async function getContactPageVisitors() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
    dimensions: [
      { name: 'date' },
      { name: 'sessionSource' },
      { name: 'sessionMedium' },
      { name: 'country' },
    ],
    metrics: [
      { name: 'screenPageViews' },
      { name: 'activeUsers' },
    ],
    dimensionFilter: {
      filter: {
        fieldName: 'pagePath',
        stringFilter: {
          matchType: 'CONTAINS',
          value: 'contact',
        },
      },
    },
    orderBys: [{ dimension: { dimensionName: 'date' }, desc: true }],
    limit: 20,
  })
  return response
}

function formatDate(dateStr) {
  // Format: 20260106 -> Jan 6, 2026
  const year = dateStr.slice(0, 4)
  const month = parseInt(dateStr.slice(4, 6)) - 1
  const day = parseInt(dateStr.slice(6, 8))
  const date = new Date(year, month, day)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

async function main() {
  console.log(`\n📬 Contact Form Conversions (Last ${days} days)\n`)
  console.log('='.repeat(60))

  try {
    // Conversions by source
    const bySource = await getConversionsBySource()
    if (bySource.rows?.length) {
      console.log('\n📊 SUBMISSIONS BY SOURCE')
      let total = 0
      bySource.rows.forEach((row) => {
        const source = row.dimensionValues[1].value
        const medium = row.dimensionValues[2].value
        const count = parseInt(row.metricValues[0].value)
        total += count
        console.log(`   ${source} / ${medium}: ${count} submission${count > 1 ? 's' : ''}`)
      })
      console.log(`   ─────────────────────────`)
      console.log(`   Total: ${total} submission${total > 1 ? 's' : ''}`)
    } else {
      console.log('\n📊 SUBMISSIONS BY SOURCE')
      console.log('   No contact form submissions in this period')
    }

    // Conversions by date (with details)
    const byDate = await getConversionsByDate()
    if (byDate.rows?.length) {
      console.log('\n📅 SUBMISSION TIMELINE')
      byDate.rows.forEach((row) => {
        const date = formatDate(row.dimensionValues[0].value)
        const source = row.dimensionValues[1].value
        const medium = row.dimensionValues[2].value
        const country = row.dimensionValues[3].value
        const count = row.metricValues[0].value
        console.log(`   ${date}: ${source}/${medium} from ${country} (${count})`)
      })
    }

    // Contact page visitors (for context)
    const contactVisitors = await getContactPageVisitors()
    if (contactVisitors.rows?.length) {
      console.log('\n👥 RECENT CONTACT PAGE VISITORS')
      const seen = new Set()
      let shown = 0
      contactVisitors.rows.forEach((row) => {
        if (shown >= 10) return
        const date = formatDate(row.dimensionValues[0].value)
        const source = row.dimensionValues[1].value
        const medium = row.dimensionValues[2].value
        const country = row.dimensionValues[3].value
        const views = row.metricValues[0].value
        const key = `${date}-${source}-${country}`
        if (!seen.has(key)) {
          seen.add(key)
          console.log(`   ${date}: ${source}/${medium} from ${country} (${views} views)`)
          shown++
        }
      })
    }

    console.log('\n' + '='.repeat(60))
    console.log('✅ Conversion check complete\n')

  } catch (error) {
    console.error('Error fetching conversions:', error.message)
    if (error.message.includes('eventName')) {
      console.log('\n💡 Note: Make sure contact_form_submit event is being tracked.')
      console.log('   Check GA4 → Configure → Events to verify.\n')
    }
    process.exit(1)
  }
}

main()
