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

// Track Register/Enquire button clicks with destination
export const trackRegisterClick = (page: string, destination: string) => {
  event({
    action: 'register_click',
    category: 'Conversion',
    label: `${page} → ${destination}`,
  })
}

// Track CTA button clicks
export const trackCTAClick = (buttonText: string, page: string, section: string) => {
  event({
    action: 'cta_click',
    category: 'Engagement',
    label: `${buttonText} | ${page} | ${section}`,
  })
}

// Track scroll depth milestones (25%, 50%, 75%, 100%)
export const trackScrollDepth = (depth: number, page: string) => {
  event({
    action: 'scroll_depth',
    category: 'Engagement',
    label: page,
    value: depth,
  })
}

// Track section visibility (when user scrolls section into view)
export const trackSectionView = (sectionName: string, page: string) => {
  event({
    action: 'section_view',
    category: 'Engagement',
    label: `${sectionName} | ${page}`,
  })
}

// Track how long user spent on a section
export const trackSectionEngagement = (sectionName: string, page: string, timeSpent: number) => {
  event({
    action: 'section_engagement',
    category: 'Engagement',
    label: `${sectionName} | ${page}`,
    value: timeSpent, // seconds
  })
}
