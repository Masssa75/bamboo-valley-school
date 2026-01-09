#!/usr/bin/env node
/**
 * Enquiry Attribution Script for bamboovalleyphuket.com
 * Shows recent contact form submissions with likely traffic sources
 *
 * Usage: node scripts/check-enquiries.js [days]
 * Example: node scripts/check-enquiries.js 7
 */

// Load GA4 credentials from .env.local, Supabase from root .env
require('dotenv').config({ path: '.env.local' })
require('dotenv').config({ path: '../../.env', override: false })

const { createClient } = require('@supabase/supabase-js')
const { BetaAnalyticsDataClient } = require('@google-analytics/data')

const days = parseInt(process.argv[2]) || 7

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const analyticsClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
})

function getCountryFromEmail(email) {
  const domain = email.split('@')[1]?.toLowerCase()
  const countryDomains = {
    'qq.com': 'China', '163.com': 'China', '126.com': 'China', 'sina.com': 'China',
    'mail.ru': 'Russia', 'yandex.ru': 'Russia', 'yandex.com': 'Russia',
    'naver.com': 'South Korea', 'daum.net': 'South Korea',
    'yahoo.co.jp': 'Japan',
  }
  return countryDomains[domain] || null
}

function getCountryFromPhone(phone) {
  if (!phone) return null
  const cleaned = phone.replace(/[^0-9+]/g, '')
  if (cleaned.startsWith('+86') || cleaned.startsWith('86')) return 'China'
  if (cleaned.startsWith('+7') || cleaned.startsWith('7')) return 'Russia'
  if (cleaned.startsWith('+66') || cleaned.startsWith('66')) return 'Thailand'
  if (cleaned.startsWith('+1')) return 'USA/Canada'
  if (cleaned.startsWith('+44')) return 'UK'
  return null
}

async function getTrafficByCountryAndDate() {
  try {
    const [response] = await analyticsClient.runReport({
      property: `properties/${process.env.GA_PROPERTY_ID}`,
      dateRanges: [{ startDate: `${days + 2}daysAgo`, endDate: 'today' }],
      dimensions: [
        { name: 'date' },
        { name: 'country' },
        { name: 'sessionSource' },
        { name: 'sessionMedium' },
      ],
      metrics: [{ name: 'sessions' }],
      dimensionFilter: {
        filter: {
          fieldName: 'pagePath',
          stringFilter: { matchType: 'CONTAINS', value: 'contact' },
        },
      },
      orderBys: [{ dimension: { dimensionName: 'date' }, desc: true }],
      limit: 100,
    })
    return response.rows || []
  } catch (err) {
    console.error('GA4 error:', err.message)
    return []
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

function formatGADate(dateStr) {
  // Format: 20260106 -> 2026-01-06
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`
}

async function main() {
  console.log(`\n📬 Contact Form Enquiries (Last ${days} days)\n`)
  console.log('='.repeat(70))

  // Get enquiries from Supabase
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data: enquiries, error } = await supabase
    .from('school_enquiries')
    .select('*')
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase error:', error.message)
    return
  }

  // Get GA4 traffic data
  const trafficData = await getTrafficByCountryAndDate()

  if (!enquiries?.length) {
    console.log('\n  No enquiries in this period\n')
    return
  }

  // Process each enquiry
  for (const enquiry of enquiries) {
    const country = getCountryFromEmail(enquiry.email) || getCountryFromPhone(enquiry.phone) || 'Unknown'
    const submittedDate = new Date(enquiry.created_at)
    const gaDate = submittedDate.toISOString().slice(0, 10).replace(/-/g, '')
    const prevDate = new Date(submittedDate)
    prevDate.setDate(prevDate.getDate() - 1)
    const gaPrevDate = prevDate.toISOString().slice(0, 10).replace(/-/g, '')

    // Find matching traffic sources (same day or day before due to GA4 delay)
    const matchingSources = trafficData.filter(row => {
      const rowDate = row.dimensionValues[0].value
      const rowCountry = row.dimensionValues[1].value
      return (rowDate === gaDate || rowDate === gaPrevDate) &&
             (country === 'Unknown' || rowCountry === country)
    })

    console.log(`\n📧 ${enquiry.name} <${enquiry.email}>`)
    console.log(`   📍 Likely from: ${country}`)
    console.log(`   📅 Submitted: ${formatDate(enquiry.created_at)}`)
    if (enquiry.phone) console.log(`   📱 Phone: ${enquiry.phone}`)
    if (enquiry.subject) console.log(`   📋 Subject: ${enquiry.subject}`)

    // Show likely traffic sources
    if (matchingSources.length > 0) {
      console.log(`   🔗 Likely traffic source:`)
      const seen = new Set()
      matchingSources.forEach(row => {
        const source = row.dimensionValues[2].value
        const medium = row.dimensionValues[3].value
        const key = `${source}/${medium}`
        if (!seen.has(key)) {
          seen.add(key)
          const sessions = row.metricValues[0].value
          console.log(`      → ${source}/${medium} (${sessions} session${sessions > 1 ? 's' : ''})`)
        }
      })
    } else {
      console.log(`   🔗 Traffic source: ⏳ GA4 data pending (24-48h delay)`)
    }

    const msg = enquiry.message?.substring(0, 120) || ''
    console.log(`   💬 ${msg}${msg.length >= 120 ? '...' : ''}`)
  }

  console.log('\n' + '='.repeat(70))
  console.log(`✅ Found ${enquiries.length} enquir${enquiries.length === 1 ? 'y' : 'ies'}`)
  console.log(`\n💡 Note: GA4 has a 24-48h data delay. Recent submissions may show`)
  console.log(`   "pending" until traffic data is processed.\n`)
}

main()
