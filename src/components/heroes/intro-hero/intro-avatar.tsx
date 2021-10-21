import { Avatar, AvatarProps, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Theme } from '$styles'
import clsx from 'clsx'
import { FunctionComponent } from 'react'

const useStyles = makeStyles<Theme>((theme) => ({
  avatar: {
    width: theme.spacing(32),
    height: theme.spacing(32),
  }
}))

export const IntroAvatar: FunctionComponent<AvatarProps<typeof Paper>> = (props) => {
  const classes = useStyles()

  const {
    className,
    ...avatarProps
  } = props

  return (
    <Avatar
      alt='Cyril CHAPON'
      src='https://images.prismic.io/cyc-portfolio/f8c1c291-008c-45c6-96c4-7136ddd67e17_A4CC30B2-1A70-4052-98CF-07F07F17B092.jpg?auto=compress,format'
      elevation={2}
      {...avatarProps}
      className={clsx(classes.avatar, className)}
      component={Paper}
    />
  )
}
