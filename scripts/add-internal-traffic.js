#!/usr/bin/env node
/**
 * Add internal traffic filter rule via GA4 Admin API
 * Usage: node scripts/add-internal-traffic.js "Rule Name" "IP Address"
 */

require('dotenv').config({ path: '.env.local' })
const { AnalyticsAdminServiceClient } = require('@google-analytics/admin')

const propertyId = process.env.GA_PROPERTY_ID
const ruleName = process.argv[2] || 'School IP'
const ipAddress = process.argv[3] || '2403:6200:8876:207c:1153:8fd7:31b4:9c46'

if (!propertyId) {
  console.error('Missing GA_PROPERTY_ID in .env.local')
  process.exit(1)
}

const adminClient = new AnalyticsAdminServiceClient({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
})

async function addInternalTrafficRule() {
  console.log(`\n🔒 Adding internal traffic rule...`)
  console.log(`   Rule name: ${ruleName}`)
  console.log(`   IP: ${ipAddress}\n`)

  try {
    // First, list data streams to get the stream ID
    const [dataStreams] = await adminClient.listDataStreams({
      parent: `properties/${propertyId}`,
    })

    if (!dataStreams || dataStreams.length === 0) {
      console.error('No data streams found for this property')
      process.exit(1)
    }

    console.log('📊 Found data streams:')
    dataStreams.forEach(stream => {
      console.log(`   - ${stream.displayName} (${stream.name})`)
      console.log(`     Type: ${stream.type}`)
      if (stream.webStreamData) {
        console.log(`     URL: ${stream.webStreamData.defaultUri}`)
        console.log(`     Measurement ID: ${stream.webStreamData.measurementId}`)
      }
    })

    // Try to get/create internal traffic rules
    // The API for this might be through measurementProtocolSecrets or other methods
    // Let's check what methods are available

    console.log('\n🔍 Checking available API methods for internal traffic...')

    // List available methods on the client
    const methods = Object.keys(adminClient).filter(key =>
      typeof adminClient[key] === 'function' &&
      !key.startsWith('_') &&
      key.toLowerCase().includes('internal') || key.toLowerCase().includes('filter') || key.toLowerCase().includes('traffic')
    )

    if (methods.length > 0) {
      console.log('Available related methods:', methods)
    }

    // Try listing data filters
    console.log('\n📋 Listing data filters...')
    try {
      const [filters] = await adminClient.listDataFilters({
        parent: `properties/${propertyId}`,
      })
      console.log('Existing filters:')
      if (filters && filters.length > 0) {
        filters.forEach(f => console.log(`   - ${f.displayName} (${f.name})`))
      } else {
        console.log('   No filters found')
      }
    } catch (e) {
      console.log('   Could not list filters:', e.message)
    }

    // The internal traffic definition is typically done through the UI or Tag Manager
    // But let's see if we can create a data filter
    console.log('\n⚠️  Note: Internal traffic rules are typically configured through:')
    console.log('   1. GA4 Admin UI → Data Streams → Configure tag settings → Define internal traffic')
    console.log('   2. Google Tag Manager')
    console.log('\n   The Admin API primarily manages Data Filters (for filtering out internal traffic)')
    console.log('   but the IP definition itself may need UI configuration.')

  } catch (error) {
    console.error('Error:', error.message)
    if (error.details) {
      console.error('Details:', error.details)
    }
    process.exit(1)
  }
}

addInternalTrafficRule()
