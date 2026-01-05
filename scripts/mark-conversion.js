#!/usr/bin/env node
/**
 * Mark an event as a conversion in GA4
 * Usage: node scripts/mark-conversion.js contact_form_submit
 */

require('dotenv').config({ path: '.env.local' })
const { AnalyticsAdminServiceClient } = require('@google-analytics/admin')

const propertyId = process.env.GA_PROPERTY_ID
const eventName = process.argv[2] || 'contact_form_submit'

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

async function markAsConversion() {
  console.log(`\n🎯 Marking "${eventName}" as a conversion...\n`)

  try {
    // First, list existing conversion events to check if it already exists
    const [existingConversions] = await adminClient.listConversionEvents({
      parent: `properties/${propertyId}`,
    })

    const alreadyExists = existingConversions.some(
      conv => conv.eventName === eventName
    )

    if (alreadyExists) {
      console.log(`✅ "${eventName}" is already marked as a conversion!`)
      return
    }

    // Create the conversion event
    const [conversionEvent] = await adminClient.createConversionEvent({
      parent: `properties/${propertyId}`,
      conversionEvent: {
        eventName: eventName,
      },
    })

    console.log(`✅ Successfully marked "${eventName}" as a conversion!`)
    console.log(`   Resource: ${conversionEvent.name}`)

  } catch (error) {
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    console.error('Full error:', JSON.stringify(error.details || error, null, 2))
    process.exit(1)
  }
}

markAsConversion()
