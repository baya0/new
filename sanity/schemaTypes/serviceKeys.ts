// Service + location enumerations shared by servicePage and locationPage
// schemas. Editors pick from these lists in Studio; the public site reads
// the values back as route slugs (e.g. /services/managed-it-services or
// /services/managed-it-services/dubai).

export const SERVICE_KEY_OPTIONS = [
  { title: 'Managed IT Services', value: 'managed-it-services' },
  { title: 'Cloud Services', value: 'cloud-services' },
  { title: 'Cybersecurity', value: 'cybersecurity' },
  { title: 'Datacenter Infrastructure', value: 'datacenter-infrastructure' },
  { title: 'Network Solutions', value: 'network-solutions' },
  { title: 'Staff Augmentation', value: 'staff-augmentation' },
  { title: 'Cloud Migration', value: 'cloud-migration' },
  { title: 'Enterprise Infrastructure', value: 'enterprise-infrastructure' },
  { title: 'Digital Transformation', value: 'digital-transformation' },
] as const

export const LOCATION_KEY_OPTIONS = [
  { title: 'Dubai', value: 'dubai' },
  { title: 'Riyadh', value: 'riyadh' },
  { title: 'Istanbul', value: 'istanbul' },
  { title: 'Ankara', value: 'ankara' },
  { title: 'Abu Dhabi', value: 'abu-dhabi' },
  { title: 'Doha', value: 'doha' },
  { title: 'Cairo', value: 'cairo' },
  { title: 'Amman', value: 'amman' },
  { title: 'Beirut', value: 'beirut' },
] as const
