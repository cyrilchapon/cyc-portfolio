import { FontAwesomeSvgIcon } from '$components/icons/font-awesome-svg-icon'
import { Grid, Paper, PaperProps, styled, Typography, TypographyProps, useTheme } from '@mui/material'
import { FunctionComponent } from 'react'
import { ServiceFeatureList } from './service-feature-list'
import { ServiceFeature, ServiceIcon } from '$constants'

const _ServicePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2, 4)
}))

const ServiceTitleTypography = styled(Typography)<TypographyProps<'h3', { component: 'h3' }>>(({ theme }) => ({
  fontWeight: theme.typography.variants[theme.typography.variantsMapping.h4].fontWeightMedium,
  color: theme.palette.text.paper.semi
}))

interface ServicePaperProps extends PaperProps {
  icon: ServiceIcon
  title: string
  features: ServiceFeature[]
}

export const ServicePaper: FunctionComponent<ServicePaperProps> = (props) => {
  const theme = useTheme()

  const {
    icon,
    title,
    features,
    ...paperProps
  } = props

  return (
    <_ServicePaper {...paperProps}>
      <Grid container direction='column' spacing={1}>
        <Grid item>
          {icon.type === 'font-awesome'
            ? <FontAwesomeSvgIcon
                icon={icon.icon}
                sx={{
                  fontSize: theme.typography.h1.fontSize,
                  color: theme.palette.primary.main
                }}
              />
            : <icon.iconComponent
                sx={{
                  fontSize: theme.typography.h1.fontSize,
                  color: theme.palette.primary.main
                }}
              />
          }
        </Grid>

        <Grid item>
          <ServiceTitleTypography variant='h4' component='h3'>
            {title}
          </ServiceTitleTypography>
        </Grid>

        <Grid item>
          <ServiceFeatureList features={features} />
        </Grid>
      </Grid>
    </_ServicePaper>
  )
}
