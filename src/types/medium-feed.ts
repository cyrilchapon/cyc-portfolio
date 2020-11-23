import { DateTime } from 'luxon'
import textClip from 'text-clipper'
// import escapeHtml from 'escape-html'
import stripTags from 'striptags'
import { omit } from 'lodash'

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

export interface MediumArticle {
  title: string
  subtitle: string | null
  pubDate: Date
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: MediumFeedItemEnclosure
  categories: string[]
}

export interface RawMediumFeedItem {
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
  meta: MediumFeedMeta
  articles: MediumArticle[]
}

export interface RawMediumFeed {
  status: string
  feed: MediumFeedMeta
  items: RawMediumFeedItem[]
}

type WithGroups<T extends string, RegexResultT extends RegExpExecArray = RegExpExecArray> = Omit<RegexResultT, 'groups'> & {
  groups: {
    [key in T]?: string
  }
}

const _parseMediumItemContent = (content: string) => {
  const titleSubtitlePattern = /^\s*(?<title><h3>.*<\/h3>)\s*(?<subtitle><h4>.*<\/h4>)?\s*(<figure>.*<\/figure>)?/m

  const {
    groups: {
      title,
      subtitle
    }
  } = titleSubtitlePattern.exec(content) as WithGroups<'title' | 'subtitle'>

  const contentWithoutTitlesAndImg = content.replace(titleSubtitlePattern, '')

  return {
    title: title != null ? stripTags(title) : null,
    subtitle: subtitle != null ? stripTags(subtitle) : null,
    content: contentWithoutTitlesAndImg
  }
}

const _parseMediumDate = (dateString: string) => {
  const dateTime = DateTime.fromFormat(dateString, 'yyyy-MM-dd HH:mm:ss')
  const date = dateTime.toJSDate()
  return date
}

const _composeDescriptionFromContent = (limit: number) => (content: string) => textClip(content, 1000, {
  html: true,
  breakWords: false,
  imageWeight: 0
})

const _splitMediumImg = (imgSrc: string) => {
  const imgPattern = /(?:https?:)?\/\/(?<host>cdn-images-\d+\.medium\.com|miro\.medium\.com)\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+\/(?<id>\d+\*[a-zA-Z0-9-]+)/
  const {
    groups: {
      host,
      id
    }
  } = imgPattern.exec(imgSrc) as WithGroups<'host' | 'id'>

  return (host != null && id != null)
    ? { host, id }
    : null
}

const _composeMediumImg = (size: number) => ({ host, id }: { host: string, id: string }) => (
  `https://${host}/max/${size}/${id}`
)

const _parseMediumImg = (size: number) => (imgSrc: string) => {
  const imgAttrs = _splitMediumImg(imgSrc)

  if (imgAttrs == null) {
    return imgSrc
  }

  const adaptedMediumImg = _composeMediumImg(size)(imgAttrs)

  return adaptedMediumImg
}

const parseMediumFeedArticle = (rawItem: RawMediumFeedItem, options: MediumFeedOptions): MediumArticle => {
  const {
    title,
    subtitle,
    content
  } = _parseMediumItemContent(rawItem.content)

  return {
    ...rawItem,
    pubDate: _parseMediumDate(rawItem.pubDate),
    title: title ?? rawItem.title,
    subtitle,
    content,
    description: _composeDescriptionFromContent(options.descriptionMaxLength)(content),
    thumbnail: _parseMediumImg(options.imgWidth)(rawItem.thumbnail)
  }
}

interface MediumFeedOptions {
  imgWidth: number
  descriptionMaxLength: number
}

const defaultOptions: MediumFeedOptions = {
  imgWidth: 512,
  descriptionMaxLength: 1000
}

const parseMediumFeed = (mediumFeed: RawMediumFeed, options?: Partial<MediumFeedOptions>): MediumFeed => {
  const _options: MediumFeedOptions = {
    ...defaultOptions,
    ...options,
  }

  const parsed = {
    ...omit(mediumFeed, ['items', 'feed']),
    meta: mediumFeed.feed,
    articles: mediumFeed.items.map(item => parseMediumFeedArticle(item, _options))
  }

  return parsed
}

export {
  parseMediumFeed,
  parseMediumFeedArticle,
  _parseMediumItemContent,
  _parseMediumDate,
  _composeDescriptionFromContent
}
