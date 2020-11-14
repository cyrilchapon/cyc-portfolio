import { FONTS } from '$styles/font'

const SansSerifFontLink = () => (
  <link
    rel='stylesheet'
    href={FONTS.sansSerif.link}
    key='sans-serif-font-link'
  />
)

const SerifFontLink = () => (
  <link
    rel='stylesheet'
    href={FONTS.serif.link}
    key='serif-font-link'
  />
)

const MonoFontLink = () => (
  <link
    rel='stylesheet'
    href={FONTS.mono.link}
    key='mono-font-link'
  />
)

export {
  SansSerifFontLink,
  SerifFontLink,
  MonoFontLink
}
