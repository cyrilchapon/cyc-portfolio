import { useMediaQuery, useTheme } from '@material-ui/core'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { removePx } from './utils'

const useNavbarHeight = () => {
  const theme = useTheme()

  const defaultHeight = theme.mixins.toolbar.minHeight

  const matchingHeight = Object
    .entries(theme.mixins.toolbar as Record<string, CSSProperties>)
    .filter(([k]) => k.startsWith('@media'))
    .reduce((acc, [mq, styleObj]) => {
      const matches = useMediaQuery(mq)
      if (matches && 'minHeight' in styleObj) {
        acc = styleObj.minHeight ?? null
      }
      return acc
    }, null as string | number | null)

  return removePx(matchingHeight ?? defaultHeight ?? null)
}

export { useNavbarHeight }