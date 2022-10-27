import { styled, Typography, TypographyProps } from '@mui/material'
import { FunctionComponent } from 'react'

const IntroTitleTypography = styled(Typography)<TypographyProps<'h1', { component: 'h1' }>>(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: theme.typography.variants[theme.typography.variantsMapping.h3].fontWeightRegular,
  textAlign: 'center'
}))

export const IntroTitle: FunctionComponent<TypographyProps<'h1'>> = (props) => {
  return (
    <IntroTitleTypography
      variant='h2'
      {...props}
      component='h1'
    >
      <strong>Cyril</strong> CHAPON
    </IntroTitleTypography>
  )
}
