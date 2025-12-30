#!/usr/bin/env node
/**
 * Search Console check script for bamboovalleyphuket.com
 * Usage: node scripts/check-search-console.js [days]
 * Example: node scripts/check-search-console.js 28
 */

require('dotenv').config({ path: '.env.local' })
const { google } = require('googleapis')

const days = parseInt(process.argv[2]) || 28
const siteUrl = 'https://www.bamboovalleyphuket.com/'

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
})

const searchconsole = google.searchconsole({ version: 'v1', auth })

async function getSitemaps() {
  try {
    const response = await searchconsole.sitemaps.list({ siteUrl })
    return response.data.sitemap || []
  } catch (e) {
    return []
  }
}

async function getQueries() {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  try {
    const response = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dimensions: ['query'],
        rowLimit: 20,
      },
    })
    return response.data.rows || []
  } catch (e) {
    console.error('Query error:', e.message)
    return []
  }
}

async function getPages() {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  try {
    const response = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dimensions: ['page'],
        rowLimit: 20,
      },
    })
    return response.data.rows || []
  } catch (e) {
    console.error('Pages error:', e.message)
    return []
  }
}

async function main() {
  console.log(`\n🔍 bamboovalleyphuket.com Search Console (Last ${days} days)\n`)
  console.log('='.repeat(55))

  try {
    // Sitemaps
    const sitemaps = await getSitemaps()
    console.log('\n📋 SITEMAPS')
    if (sitemaps.length) {
      sitemaps.forEach(sm => {
        const submitted = sm.lastSubmitted ? new Date(sm.lastSubmitted).toLocaleDateString() : 'N/A'
        console.log(`   ${sm.path}`)
        console.log(`      Submitted: ${submitted}`)
        if (sm.contents?.[0]) {
          console.log(`      URLs: ${sm.contents[0].submitted || 'N/A'}`)
          console.log(`      Indexed: ${sm.contents[0].indexed ?? 'N/A'}`)
        }
      })
    } else {
      console.log('   No sitemaps found')
    }

    // Queries
    const queries = await getQueries()
    console.log('\n🔎 TOP SEARCH QUERIES')
    if (queries.length) {
      queries.forEach((row, i) => {
        const query = row.keys[0]
        const clicks = row.clicks || 0
        const impressions = row.impressions || 0
        const position = row.position ? row.position.toFixed(1) : 'N/A'
        console.log(`   ${i + 1}. "${query}"`)
        console.log(`      Clicks: ${clicks} | Impressions: ${impressions} | Avg Position: ${position}`)
      })
    } else {
      console.log('   No query data yet (takes 2-3 days to populate)')
    }

    // Pages
    const pages = await getPages()
    console.log('\n📄 TOP PAGES IN SEARCH')
    if (pages.length) {
      pages.forEach((row, i) => {
        const page = row.keys[0].replace('https://www.bamboovalleyphuket.com', '')
        const clicks = row.clicks || 0
        const impressions = row.impressions || 0
        console.log(`   ${i + 1}. ${page || '/'}`)
        console.log(`      Clicks: ${clicks} | Impressions: ${impressions}`)
      })
    } else {
      console.log('   No page data yet')
    }

    console.log('\n' + '='.repeat(55))
    console.log('✅ Search Console check complete\n')

  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

main()
