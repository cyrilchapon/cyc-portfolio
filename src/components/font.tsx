import { FONTS } from '$styles/font'

const SansSerifFontLink = () => (
  <link
    rel='stylesheet'
    href={FONTS.sansSerif.link}
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
  MonoFontLink
}
