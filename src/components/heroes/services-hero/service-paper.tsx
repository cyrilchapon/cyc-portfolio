import { FontAwesomeSvgIcon } from '$components/icons/font-awesome-svg-icon'
import { Grid, makeStyles, Paper, PaperProps, Typography } from '@material-ui/core'
import { FunctionComponent } from 'react'
import { ServiceFeatureList } from './service-feature-list'
import { ServiceFeatureListItemBaseProps } from './service-feature-list-item'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { ServiceFeature, ServiceIcon } from '$constants'

const useStyles = makeStyles(theme => ({
  servicePaper: {
    padding: theme.spacing(2, 4)
  },
  serviceTitle: {
    fontWeight: theme.typography.variants[theme.typography.variantsMapping.h4].fontWeightMedium,
    color: theme.palette.text.dark.semi
  },
  serviceIcon: {
    fontSize: theme.typography.h1.fontSize,
    color: theme.palette.primary.main
  }
}))

interface ServicePaperProps extends PaperProps {
  icon: ServiceIcon
  title: string
  features: ServiceFeature[]
}

export const ServicePaper: FunctionComponent<ServicePaperProps> = (props) => {
  const classes = useStyles()

  const {
    icon,
    title,
    features,
    ...paperProps
  } = props

  return (
    <Paper {...paperProps} className={classes.servicePaper}>
      <Grid container direction='column' spacing={1}>
        <Grid item>
          {icon.type === 'font-awesome'
            ? <FontAwesomeSvgIcon icon={icon.icon} className={classes.serviceIcon} />
            : <icon.iconComponent className={classes.serviceIcon} />
          }
        </Grid>

        <Grid item>
          <Typography variant='h4' component='h3' className={classes.serviceTitle}>
            {title}
          </Typography>
        </Grid>

        <Grid item>
          <ServiceFeatureList features={features} />
        </Grid>
      </Grid>
    </Paper>
  )
}
