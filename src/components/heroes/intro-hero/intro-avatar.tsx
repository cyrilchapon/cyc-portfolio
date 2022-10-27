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
      src='https://images.prismic.io/cyc-portfolio/f8c1c291-008c-45c6-96c4-7136ddd67e17_A4CC30B2-1A70-4052-98CF-07F07F17B092.jpg?auto=compress,format'
      elevation={2}
      {...props}
      component={Paper}
    />
  )
}
