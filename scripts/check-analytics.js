#!/usr/bin/env node
/**
 * Analytics check script for bamboovalleyphuket.com
 * Usage: node scripts/check-analytics.js [days]
 * Example: node scripts/check-analytics.js 7
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

async function getOverview() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
    metrics: [
      { name: 'activeUsers' },
      { name: 'screenPageViews' },
      { name: 'sessions' },
      { name: 'averageSessionDuration' },
    ],
  })
  return response
}

async function getTopPages() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
    limit: 10,
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
  })
  return response
}

async function getTrafficSources() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
    dimensions: [{ name: 'sessionSource' }],
    metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
    limit: 10,
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
  })
  return response
}

async function getCountries() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
    dimensions: [{ name: 'country' }],
    metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
    limit: 10,
    orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
  })
  return response
}

async function main() {
  console.log(`\n📊 bamboovalleyphuket.com Analytics (Last ${days} days)\n`)
  console.log('='.repeat(50))

  try {
    // Overview
    const overview = await getOverview()
    if (overview.rows?.[0]) {
      const m = overview.rows[0].metricValues
      const avgSession = Math.round(parseFloat(m[3].value))
      const mins = Math.floor(avgSession / 60)
      const secs = avgSession % 60

      console.log('\n📈 OVERVIEW')
      console.log(`   Users:        ${m[0].value}`)
      console.log(`   Page Views:   ${m[1].value}`)
      console.log(`   Sessions:     ${m[2].value}`)
      console.log(`   Avg Session:  ${mins}m ${secs}s`)
    }

    // Top Pages
    const pages = await getTopPages()
    if (pages.rows?.length) {
      console.log('\n📄 TOP PAGES')
      pages.rows.forEach((row, i) => {
        const path = row.dimensionValues[0].value
        const views = row.metricValues[0].value
        console.log(`   ${i + 1}. ${path} (${views} views)`)
      })
    }

    // Traffic Sources
    const sources = await getTrafficSources()
    if (sources.rows?.length) {
      console.log('\n🔗 TRAFFIC SOURCES')
      sources.rows.forEach((row) => {
        const source = row.dimensionValues[0].value
        const users = row.metricValues[0].value
        const sessions = row.metricValues[1].value
        console.log(`   ${source}: ${users} users, ${sessions} sessions`)
      })
    }

    // Countries
    const countries = await getCountries()
    if (countries.rows?.length) {
      console.log('\n🌍 TOP COUNTRIES')
      countries.rows.forEach((row) => {
        const country = row.dimensionValues[0].value
        const users = row.metricValues[0].value
        console.log(`   ${country}: ${users} users`)
      })
    }

    console.log('\n' + '='.repeat(50))
    console.log('✅ Analytics check complete\n')

  } catch (error) {
    console.error('Error fetching analytics:', error.message)
    process.exit(1)
  }
}

main()
