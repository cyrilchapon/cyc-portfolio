export interface MediumFeedMeta {
  url: string
  title: string
  link: string
  author: string
  description: string
  image: string
}

export interface MediumFeedItemEnclosure {
}

export interface MediumFeedItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: MediumFeedItemEnclosure
  categories: string[]
}

export interface MediumFeed {
  status: string
  feed: MediumFeedMeta
  items: MediumFeedItem[]
}
