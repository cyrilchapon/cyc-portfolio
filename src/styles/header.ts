import { useMediaQuery, useTheme } from '@mui/material'

type MinHeight = {
  minHeight: number
}

const useNavbarHeight = () => {
  //   {
  //     "minHeight": 56,
  //     "@media (min-width:0px)": {
  //         "@media (orientation: landscape)": {
  //             "minHeight": 48
  //         }
  //     },
  //     "@media (min-width:600px)": {
  //         "minHeight": 64
  //     }
  // }

  const {
    mixins: { toolbar },
    breakpoints,
  } = useTheme()

  const toolbarDesktopQuery = breakpoints.up('sm')
  const toolbarLandscapeQuery = `${breakpoints.up(
    'xs',
  )} and (orientation: landscape)`
  const isDesktop = useMediaQuery(toolbarDesktopQuery)
  const isLandscape = useMediaQuery(toolbarLandscapeQuery)

  let currentToolbarMinHeight = toolbar as MinHeight
  if (isDesktop) {
    currentToolbarMinHeight = toolbar[toolbarDesktopQuery] as MinHeight
  } else if (isLandscape) {
    currentToolbarMinHeight = (
      toolbar[breakpoints.up('xs')] as Record<string, MinHeight>
    )[`@media (orientation: landscape)`]
  }
  return currentToolbarMinHeight.minHeight
}

export { useNavbarHeight }
