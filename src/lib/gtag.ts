export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// School-specific tracking events
export const trackEnquiryClick = () => {
  event({
    action: 'enquiry_click',
    category: 'Conversion',
    label: 'Enquiry Button',
  })
}

export const trackWhatsAppClick = (page: string) => {
  event({
    action: 'whatsapp_click',
    category: 'Contact',
    label: `WhatsApp - ${page}`,
  })
}

export const trackProgramView = (program: string) => {
  event({
    action: 'program_view',
    category: 'Engagement',
    label: program,
  })
}

export const trackVideoComplete = () => {
  event({
    action: 'video_complete',
    category: 'Engagement',
    label: 'Hero Video',
  })
}
