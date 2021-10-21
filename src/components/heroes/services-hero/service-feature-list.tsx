import { ServiceFeature } from '$constants'
import { List, ListItemProps, ListProps } from '@mui/material'
import { FunctionComponent } from 'react'
import { ServiceFeatureListItem, ServiceFeatureListItemBaseProps } from './service-feature-list-item'

interface ServiceFeatureListProps extends ListProps {
  features: ServiceFeature[]
  listItemProps?: ListItemProps<'li'>
}

export const ServiceFeatureList: FunctionComponent<ServiceFeatureListProps> = (props) => {
  const {
    features,
    listItemProps,
    ...listProps
  } = props

  return (
    <List {...listProps}>
      {features.map((featureProps, index) => (
        <ServiceFeatureListItem
          key={index}
          {...featureProps}
          {...listItemProps}
        />
      ))}
    </List>
  )
}
