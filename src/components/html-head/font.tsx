import { FONTS } from '$styles/font'

const SansSerifFontLink = () => (
  <link
    rel='stylesheet'
    href={FONTS.sansSerif.link}
  />
)

const SerifFontLink = () => (
  <link
    rel='stylesheet'
    href={FONTS.serif.link}
  />
)

const MonoFontLink = () => (
  <link
    rel='stylesheet'
    href={FONTS.mono.link}
  />
)

export {
  SansSerifFontLink,
  SerifFontLink,
  MonoFontLink
}
