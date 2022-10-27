import { styled, Typography, TypographyProps } from '@mui/material'
import { FunctionComponent } from 'react'

const SubtitleTypography = styled(Typography)<TypographyProps<'div', { component: 'div' }>>(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.primary,
  // fontSize: theme.typography.h4.fontSize,
  lineHeight: 1.5,
  '&:before': {
    content: 'initial'
  }
}))

export const IntroSubtitle: FunctionComponent<TypographyProps<'div'>> = (props) => {
  return (
    <SubtitleTypography
      variant='subtitle1'
      {...props}
      component='div'
    >
      CEO &amp; founder @ Homère
      <br />
      Consultant Stratégie Produit
    </SubtitleTypography>
  )
}
