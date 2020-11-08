// import { snapChild, SnapChildProps } from '$styles'

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faMedium, faMediumM } from '@fortawesome/free-brands-svg-icons'
import { AppBar, AppBarProps, Button, fade, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { FunctionComponent } from 'react'
import { FontAwesomeSvgIcon } from './icons/font-awesome-svg-icon'
import { MaltSvgIcon } from './icons/malt-svg-icon'

// export const Header = styled(_Header)<SnapChildProps>`
//   /* background-color: ${props => props.theme.colors.header};
//   min-height: ${props => props.theme.spacings.header}; */
//   ${snapChild}
// `

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    color: theme.palette.getContrastText(theme.palette.background.default)
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export const Header: FunctionComponent<AppBarProps> = (props) => {
  const classes = useStyles()

  return (
    <AppBar className={classes.root} {...props}>
      <Toolbar>
        <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
          <FontAwesomeSvgIcon icon={faBars} />
        </IconButton>
        <Typography variant='h6' className={classes.title}>
          News
        </Typography>

        <IconButton edge='end' color='inherit'>
          <FontAwesomeSvgIcon icon={faMediumM} />
        </IconButton>

        <IconButton edge='end' color='inherit'>
          <FontAwesomeSvgIcon icon={faGithub} />
        </IconButton>

        <IconButton edge='end' color='inherit'>
          <FontAwesomeSvgIcon icon={faLinkedin} />
        </IconButton>

        <IconButton edge='end' color='inherit'>
          <MaltSvgIcon />
        </IconButton>
        {/* <Button color='inherit'>Login</Button> */}
      </Toolbar>
    </AppBar>
  )
}
