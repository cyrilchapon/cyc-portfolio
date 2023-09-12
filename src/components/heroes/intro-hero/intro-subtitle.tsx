import { Tooltip } from '$components/tooltip'
import { styled, Typography, TypographyProps } from '@mui/material'
import { FunctionComponent } from 'react'

const SubtitleTypography = styled(Typography)<TypographyProps<'div', { component: 'div' }>>(() => ({
  textAlign: 'center',
  // color: theme.palette.text.primary,
  // fontSize: theme.typography.h4.fontSize,
  lineHeight: 1.5,
  '&:before': {
    content: 'initial'
  }
}))

const SubtitleKeywordTypography = styled(Typography)<TypographyProps<'span', { component: 'span' }>>(({ theme }) => ({
  color: theme.palette.text.primary,
  // fontSize: theme.typography.h4.fontSize,
  lineHeight: 1.5,
  '&:before': {
    content: 'initial'
  },
  textDecoration: 'underline',
  textDecorationStyle: 'dotted',
  textDecorationThickness: '0.07em',
  textDecorationColor: theme.palette.text.secondary,
  textUnderlineOffset: '0.2em'
  // textDec
}))

export const IntroSubtitle: FunctionComponent<TypographyProps<'div'>> = (props) => {
  return (
    <SubtitleTypography
      variant='subtitle1'
      {...props}
      component='div'
    >
      <Tooltip title="Directeur technique">
        <SubtitleKeywordTypography variant='subtitle1' component='span'>CTO</SubtitleKeywordTypography>
      </Tooltip>
      {' '}&amp;{' '}
      <Tooltip title="Responsable stratégie produit">
        <SubtitleKeywordTypography variant='subtitle1' component='span'>CPO</SubtitleKeywordTypography>
      </Tooltip>
      {' '} as a service
    </SubtitleTypography>
  )
}
