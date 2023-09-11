import { Avatar, AvatarProps, Paper, styled } from '@mui/material'
import { FunctionComponent } from 'react'

const MyAvatar = styled(Avatar)<AvatarProps<typeof Paper, { component: typeof Paper }>>(({ theme }) => ({
  width: theme.spacing(32),
  height: theme.spacing(32),
}))

export const IntroAvatar: FunctionComponent<AvatarProps<typeof Paper>> = (props) => {
  return (
    <MyAvatar
      alt='Cyril CHAPON'
      src='https://images.prismic.io/cyc-portfolio/9c31b03f-6845-44b5-8a44-d2321c5d183e_IMG_4897_compressed.jpg?auto=compress,format&w=500'
      elevation={2}
      {...props}
      component={Paper}
    />
  )
}
