// import { snapChild, SnapChildProps } from '$styles'
import * as React from 'react'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { AppBar, AppBarProps, IconButton, IconButtonProps, Slide, styled, Toolbar, Typography, TypographyProps, useScrollTrigger, useTheme } from '@mui/material'
import { removePx } from '$styles'
import { FunctionComponent } from 'react'
import { FontAwesomeSvgIcon } from './icons/font-awesome-svg-icon'
import { MaltSvgIcon } from './icons/malt-svg-icon'
import { useNavbarHeight } from '$styles'
import { urls } from '$constants'

const IconButtonA: FunctionComponent<IconButtonProps<'a'>> = (props) => (
  <IconButton
    component='a'
    {...props}
  />
)

const MargedIconButton = styled(IconButtonA)(({ theme }) => ({
  '& + &': {
    marginLeft: theme.spacing(2)
  }
}))

const SocialIconButton: FunctionComponent<IconButtonProps<'a'>> = (props) => (
  <MargedIconButton
    edge='end'
    color='inherit'
    {...props}
  />
)

type ScrollAwareAppBarProps = AppBarProps<'header', {
  scrolled: boolean
}>

const ScrollAwareAppBar = styled(AppBar, {
  shouldForwardProp: p => p !== 'scrolled'
})<ScrollAwareAppBarProps>(({ theme, scrolled }) => ({
  flexGrow: 1,
  backgroundColor: scrolled ? theme.palette.background.header : 'transparent',
  backdropFilter: scrolled ? 'blur(4px)' : 'none'
}))

const DivTypography: FunctionComponent<TypographyProps<'div'>> = (props) => (
  <Typography
    component='div'
    {...props}
  />
)

export const TitleTypography = styled(DivTypography)(({ theme }) => ({
  flexGrow: 1,
  fontFamily: theme.typography.variants.sansSerif.fontFamily,
  fontWeight: theme.typography.variants.sansSerif.fontWeightMedium
}))

export const Header: FunctionComponent<AppBarProps> = (props) => {
  const navbarHeight = useNavbarHeight()

  const theme = useTheme()

  const smallSpacing = removePx(theme.spacing(4))
  const bigSpacing = removePx(theme.spacing(20))

  const scrolledOverNavbar = useScrollTrigger({
    disableHysteresis: true,
    // HACK: hack type after migration
    threshold: navbarHeight ?? smallSpacing
  })

  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    // HACK: hack type after migration
    threshold: (navbarHeight ?? smallSpacing) + bigSpacing
  })

  const appBar = (
    <ScrollAwareAppBar
      elevation={scrolledOverNavbar ? 4 : 0}
      position={scrolledOverNavbar ? 'fixed': 'absolute'}
      scrolled={scrolledOverNavbar}
      {...props}
    >
      <Toolbar>
        {/* <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
          <FontAwesomeSvgIcon icon={faBars} />
        </IconButton> */}
        <TitleTypography variant='h5'>
          Cyril CHAPON
        </TitleTypography>

        <SocialIconButton href={urls.linkedIn} target='_blank'>
          <FontAwesomeSvgIcon icon={faLinkedin} />
        </SocialIconButton>

        <SocialIconButton href={urls.malt} target='_blank'>
          <MaltSvgIcon />
        </SocialIconButton>

        <SocialIconButton href={urls.github} target='_blank'>
          <FontAwesomeSvgIcon icon={faGithub} />
        </SocialIconButton>

        {/* <SocialIconButton href={urls.medium} target='_blank'>
          <FontAwesomeSvgIcon icon={faMediumM} />
        </SocialIconButton>

        <SocialIconButton href={urls.devTo} target='_blank'>
          <FontAwesomeSvgIcon icon={faDev} />
        </SocialIconButton> */}
      </Toolbar>
    </ScrollAwareAppBar>
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
