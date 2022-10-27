import { FontAwesomeSvgIcon } from '$components/icons/font-awesome-svg-icon'
import { faCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { ListItem, ListItemIcon, ListItemText, ListItemProps, ListItemSecondaryAction, IconButton, Link, styled } from '@mui/material'
import { FunctionComponent } from 'react'
import Markdown from 'markdown-to-jsx'
import { Tooltip } from '$components/tooltip'

const ServiceListItem = styled(ListItem)(({ theme }) => ({
  paddingTop: `calc(${theme.spacing(1)}px / 2)`,
  paddingBottom: `calc(${theme.spacing(1)}px / 2)`
}))

const ServiceListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: theme.spacing(5)
}))

const ServiceSvgIcon = styled(FontAwesomeSvgIcon)(({ theme }) => ({
  fontSize: `calc(${theme.typography.body1.fontSize} - 6px)`,
  color: theme.palette.text.paper.semi,
  transform: 'translateY(1px)'
}))

const ServiceFeatureIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.light
}))

const TooltipMarkdownLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.light
}))

const TooltipMarkdownParagraph = styled('p')(() => ({
  '&:first-of-type': {
    marginTop: 0
  },
  '&:last-of-type': {
    marginBottom: 0
  }
}))

export interface ServiceFeatureListItemBaseProps {
  name: string
  description?: string
}

export type ServiceFeatureListItemProps =
  & ListItemProps<'li'>
  & ServiceFeatureListItemBaseProps

export const ServiceFeatureListItem: FunctionComponent<ServiceFeatureListItemProps> = (props) => {
  const {
    name,
    description,
    ...listItemProps
  } = props

  return (
    <ServiceListItem {...listItemProps}>
      <ServiceListItemIcon>
        <ServiceSvgIcon icon={faCircle} />
      </ServiceListItemIcon>

      <ListItemText primary={<Markdown options={{ forceInline: true }}>{name}</Markdown>} />

      {description && (
        <ListItemSecondaryAction>
          <Tooltip
            title={
              <Markdown
                options={{
                  overrides: {
                    a: { component: TooltipMarkdownLink, props: { target: '_blank' } },
                    p: { component: TooltipMarkdownParagraph }
                  }
                }}
              >
                {description}
              </Markdown>
            }
            enterTouchDelay={0}
            leaveTouchDelay={4000}
            leaveDelay={300}
          >
            <ServiceFeatureIconButton edge='end' color='primary' disableRipple size='small'>
              <FontAwesomeSvgIcon icon={faInfoCircle} fontSize='small' />
            </ServiceFeatureIconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      )}
    </ServiceListItem>
  )
}
