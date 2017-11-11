export type HallingEvent = {
  id: string
  modifiedTimestamp: number
  firstStartTimestamp: number
  lastEndTimestamp: number
  lang: string
  location: boolean
  name: string
  created: string
  modified: string
  address: {
    postal_area: { name: string; code: string }
    municipality: { name: string; code: string }
    county: { name: string; code: string }
    street: string
    country: { name: string; code: string }
  }
  schedule: any
  media: {
    list: any
  }
}
