const faviconBaseUrl = 'https://images.prismic.io/cyc-portfolio/39cafa75-ee4a-4878-81bb-4f3e464df04a_avatar.png'

// // For IE 9 and below. ICO should be 32x32 pixels in size
// const ie9 = () => (
//   <!--[if IE]>
//     <link
//       rel='shortcut icon'
//       href='/path/to/favicon.ico'
//     />
//   <![endif]-->
// )

// Touch Icons - iOS and Android 2.1+ 180x180 pixels in size.
const touch = () => (
  <link
    rel='apple-touch-icon'
    href={`${faviconBaseUrl}?auto=compress,format,w=180`}
    key='apple-touch-icon'
  />
)

const desktop = () => (
  <link
    rel='icon'
    href={`${faviconBaseUrl}?auto=compress,format,w=192`}
    key='favicon'
  />
)

export {
  // ie9,
  touch,
  desktop
}
