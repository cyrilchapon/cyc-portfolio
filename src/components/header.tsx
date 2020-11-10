// import { snapChild, SnapChildProps } from '$styles'
import * as React from 'react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faMediumM } from '@fortawesome/free-brands-svg-icons'
import { AppBar, AppBarProps, IconButton, IconButtonProps, makeStyles, Slide, Theme, Toolbar, Typography, useScrollTrigger } from '@material-ui/core'
import { FunctionComponent } from 'react'
import { FontAwesomeSvgIcon } from './icons/font-awesome-svg-icon'
import { MaltSvgIcon } from './icons/malt-svg-icon'
import { theme, useNavbarHeight } from '$styles'

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
    // backgroundColor: props => props.scrolled ? theme.palette.background.default : 'transparent',
    color: theme.palette.getContrastText(theme.palette.background.header),
    backgroundColor: props => props.scrolled ? theme.palette.background.header : 'transparent',
    // backdropFilter: props => props.scrolled ? 'blur(5px)' : 'initial'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontFamily: theme.typography.variants.sansSerif.fontFamily,
    fontWeight: theme.typography.variants.sansSerif.fontWeightMedium
  }
}))

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
        {/* <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
          <FontAwesomeSvgIcon icon={faBars} />
        </IconButton> */}
        <Typography variant='h5' component='div' className={classes.title}>
          Cyril CHAPON
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
