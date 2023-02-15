import { DateTime } from 'luxon'
import textClip from 'text-clipper'
import stripTags from 'striptags'
import { omit } from 'lodash'

type JSONPrimitive = number | string | boolean | null

type JSONObject = { [k: string]: JSONType }
type JSONArray = Array<JSONType>

type JSONType = JSONPrimitive | JSONObject | JSONArray

type Serializer<T, TSerializable extends JSONType> = (
  object: T,
) => TSerializable
type Deserializer<T, TSerializable extends JSONType> = (
  serializedObject: TSerializable,
) => T

export type MediumFeedMeta = {
  url: string
  title: string
  link: string
  author: string
  description: string
  image: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MediumFeedItemEnclosure = Record<string, any>

// Index signature is missing in type 'MyInterface'.

export type MediumArticle = {
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

export type SerializableMediumArticle = Omit<MediumArticle, 'pubDate'> & {
  pubDate: string
}

export type RawMediumFeedItem = {
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

export type MediumFeed = {
  status: string
  meta: MediumFeedMeta
  articles: MediumArticle[]
}

export type SerializableMediumFeed = Omit<MediumFeed, 'articles'> & {
  articles: SerializableMediumArticle[]
}

export type RawMediumFeed = {
  status: string
  feed: MediumFeedMeta
  items: RawMediumFeedItem[]
}

type WithGroups<
  T extends string,
  RegexResultT extends RegExpExecArray = RegExpExecArray,
> = Omit<RegexResultT, 'groups'> & {
  groups: {
    [key in T]?: string
  }
}

const _parseMediumItemContent = (content: string) => {
  const titleSubtitlePattern =
    /^\s*(?<title><h3>.*<\/h3>)\s*(?<subtitle><h4>.*<\/h4>)?\s*(<figure>.*<\/figure>)?/m

  const {
    groups: { title, subtitle },
  } = titleSubtitlePattern.exec(content) as WithGroups<'title' | 'subtitle'>

  const contentWithoutTitlesAndImg = content.replace(titleSubtitlePattern, '')

  return {
    title: title != null ? stripTags(title) : null,
    subtitle: subtitle != null ? stripTags(subtitle) : null,
    content: contentWithoutTitlesAndImg,
  }
}

const _parseMediumDate = (dateString: string) => {
  const dateTime = DateTime.fromFormat(dateString, 'yyyy-MM-dd HH:mm:ss')
  const date = dateTime.toJSDate()
  return date
}

const _composeDescriptionFromContent =
  (limit = 1000) =>
  (content: string) =>
    textClip(content, limit, {
      html: true,
      breakWords: false,
      imageWeight: 0,
    })

const _splitMediumThumbnail = (imgSrc: string) => {
  const imgPattern =
    /^(?:https?:)?\/\/(?<host>cdn-images-\d+\.medium\.com)\/.+\/(?<id>[^/]+)$/
  const {
    groups: { host, id },
  } = imgPattern.exec(imgSrc) as WithGroups<'host' | 'id'>

  return host != null && id != null ? { host, id } : null
}

const _composeMediumThumbnail =
  (size: number) =>
  ({ host, id }: { host: string; id: string }) =>
    `https://${host}/max/${size}/${id}`

const _parseMediumThumbnail = (size: number) => (imgSrc: string) => {
  const imgAttrs = _splitMediumThumbnail(imgSrc)

  if (imgAttrs == null) {
    return imgSrc
  }

  const adaptedMediumImg = _composeMediumThumbnail(size)(imgAttrs)

  return adaptedMediumImg
}

const parseMediumFeedArticle = (
  rawItem: RawMediumFeedItem,
  options: MediumFeedOptions,
): MediumArticle => {
  const { title, subtitle, content } = _parseMediumItemContent(rawItem.content)

  return {
    ...rawItem,
    pubDate: _parseMediumDate(rawItem.pubDate),
    title: title ?? rawItem.title,
    subtitle,
    content,
    description: _composeDescriptionFromContent(options.descriptionMaxLength)(
      content,
    ),
    thumbnail: _parseMediumThumbnail(options.imgWidth)(rawItem.thumbnail),
  }
}

interface MediumFeedOptions {
  imgWidth: number
  descriptionMaxLength: number
}

const defaultOptions: MediumFeedOptions = {
  imgWidth: 512,
  descriptionMaxLength: 1000,
}

const parseMediumFeed = (
  mediumFeed: RawMediumFeed,
  options?: Partial<MediumFeedOptions>,
): MediumFeed => {
  const _options: MediumFeedOptions = {
    ...defaultOptions,
    ...options,
  }

  const parsed = {
    ...omit(mediumFeed, ['items', 'feed']),
    meta: mediumFeed.feed,
    articles: mediumFeed.items.map((item) =>
      parseMediumFeedArticle(item, _options),
    ),
  }

  return parsed
}

const deflateMediumFeedArticle: Serializer<
  MediumArticle,
  SerializableMediumArticle
> = (mediumArticle) => {
  return {
    ...mediumArticle,
    pubDate: mediumArticle.pubDate.toISOString(),
  }
}

const deflateMediumFeed: Serializer<MediumFeed, SerializableMediumFeed> = (
  mediumFeed,
) => {
  return {
    ...mediumFeed,
    articles: mediumFeed.articles.map(deflateMediumFeedArticle),
  }
}

const inflateMediumFeedArticle: Deserializer<
  MediumArticle,
  SerializableMediumArticle
> = (deflatedArticle) => {
  return {
    ...deflatedArticle,
    pubDate: new Date(deflatedArticle.pubDate),
  }
}

const inflateMediumFeed: Deserializer<MediumFeed, SerializableMediumFeed> = (
  deflatedFeed,
) => {
  return {
    ...deflatedFeed,
    articles: deflatedFeed.articles.map(inflateMediumFeedArticle),
  }
}

export {
  parseMediumFeed,
  parseMediumFeedArticle,
  deflateMediumFeed,
  deflateMediumFeedArticle,
  inflateMediumFeedArticle,
  inflateMediumFeed,
  _parseMediumItemContent,
  _parseMediumDate,
  _composeDescriptionFromContent,
}
