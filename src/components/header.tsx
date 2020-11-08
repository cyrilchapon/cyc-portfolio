// import { snapChild, SnapChildProps } from '$styles'
import * as React from 'react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faMedium, faMediumM } from '@fortawesome/free-brands-svg-icons'
import { AppBar, AppBarProps, Button, fade, IconButton, IconButtonProps, makeStyles, Slide, Theme, Toolbar, Typography, useMediaQuery, useScrollTrigger, useTheme } from '@material-ui/core'
import { FunctionComponent } from 'react'
import { FontAwesomeSvgIcon } from './icons/font-awesome-svg-icon'
import { MaltSvgIcon } from './icons/malt-svg-icon'
import { omit } from 'lodash'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { theme } from '$styles'

// export const Header = styled(_Header)<SnapChildProps>`
//   /* background-color: ${props => props.theme.colors.header};
//   min-height: ${props => props.theme.spacings.header}; */
//   ${snapChild}
// `

const useSocialButtonStyles = makeStyles((theme) => ({
  socialIcon: {
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  }
}))

const SocialIconButton: FunctionComponent<IconButtonProps<'a'>> = (props) => {
  const classes = useSocialButtonStyles()

  return (
    <IconButton
      component='a'
      edge='end'
      color='inherit'
      className={classes.socialIcon}
      {...props}
    />
  )
}

type WithScrollTrigger<T extends {} = {}> = T & {
  scrolled: boolean
}

const useStyles = makeStyles<
  Theme,
  WithScrollTrigger,
  'root' | 'menuButton' | 'title'
>((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: props => props.scrolled ? theme.palette.background.default : 'transparent',
    color: theme.palette.getContrastText(theme.palette.background.default)
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const removePx = (value: number | string | null) => (
  typeof value === 'string'
    ? parseInt(value.replace('px', ''), 10)
    : value
)

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

export const Header: FunctionComponent<AppBarProps> = (props) => {
  const navbarHeight = useNavbarHeight()

  const scrolledOverNavbar = useScrollTrigger({
    disableHysteresis: true,
    threshold: (navbarHeight ?? theme.spacing(4))
  })

  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: (navbarHeight ?? theme.spacing(4)) + theme.spacing(20)
  })

  const classes = useStyles({ ...props, scrolled: scrolledOverNavbar })

  const appBar = (
    <AppBar
      className={classes.root}
      elevation={scrolledOverNavbar ? 4 : 0}
      position={scrolledOverNavbar ? 'fixed': 'absolute'}
      {...props}
    >
      <Toolbar>
        <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
          <FontAwesomeSvgIcon icon={faBars} />
        </IconButton>
        <Typography variant='h6' className={classes.title}>
          News
        </Typography>

        <SocialIconButton href='https://cyril-chpn.medium.com'>
          <FontAwesomeSvgIcon icon={faMediumM} />
        </SocialIconButton>

        <SocialIconButton href='https://github.com/cyrilchapon'>
          <FontAwesomeSvgIcon icon={faGithub} />
        </SocialIconButton>

        <SocialIconButton href='https://www.linkedin.com/in/cchapon'>
          <FontAwesomeSvgIcon icon={faLinkedin} />
        </SocialIconButton>

        <SocialIconButton href='https://www.malt.fr/profile/cyrilchapon'>
          <MaltSvgIcon />
        </SocialIconButton>
      </Toolbar>
    </AppBar>
  )

  return (
    scrolledOverNavbar
      ? (
        <Slide direction='down' in={scrolled}>
          {appBar}
        </Slide>
      )
      : appBar
  )
}
