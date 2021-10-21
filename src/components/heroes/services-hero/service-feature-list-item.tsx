import { FontAwesomeSvgIcon } from '$components/icons/font-awesome-svg-icon'
import { faCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { ListItem, ListItemIcon, ListItemText, ListItemProps, ListItemTypeMap, ListItemSecondaryAction, IconButton, Link } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Theme } from '$styles'
import { FunctionComponent } from 'react'
import clsx from 'clsx'
import Markdown from 'markdown-to-jsx'
import { Tooltip } from '$components/tooltip'

const useStyles = makeStyles<Theme>(theme => ({
  listItem: {
    paddingTop: `calc(${theme.spacing(1)}px / 2)`,
    paddingBottom: `calc(${theme.spacing(1)}px / 2)`
  },
  listIcon: {
    minWidth: theme.spacing(5)
  },
  listSvgIcon: {
    fontSize: `calc(${theme.typography.body1.fontSize} - 6px)`,
    color: theme.palette.text.dark.semi,
    transform: 'translateY(1px)'
  },
  abbr: {
    textDecoration: 'underline',
    textDecorationStyle: 'dotted'
  },
  featureIcon: {
    color: theme.palette.primary.light
  },
  tooltipMarkdownLink: {
    color: theme.palette.primary.light
  },
  tooltipMarkdownParagraph: {
    '&:first-of-type': {
      marginTop: 0
    },
    '&:last-of-type': {
      marginBottom: 0
    }
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
  const classes = useStyles()

  const {
    name,
    description,
    className,
    ...listItemProps
  } = props

  return (
    <ListItem {...listItemProps} className={clsx(classes.listItem, className)}>
      <ListItemIcon className={classes.listIcon}>
        <FontAwesomeSvgIcon className={classes.listSvgIcon} icon={faCircle} />
      </ListItemIcon>

      <ListItemText primary={<Markdown options={{ forceInline: true }}>{name}</Markdown>} />

      {description && (
        <ListItemSecondaryAction>
          <Tooltip
            title={
              <Markdown
                options={{
                  overrides: {
                    a: { component: Link, props: { className: classes.tooltipMarkdownLink, target: '_blank' } },
                    p: { component: (props) => <p {...props} className={classes.tooltipMarkdownParagraph} /> }
                  }
                }}
              >
                {description}
              </Markdown>
            }
            enterTouchDelay={0}
            leaveTouchDelay={4000}
          >
            <IconButton edge='end' color='primary' className={classes.featureIcon} disableRipple size='small'>
              <FontAwesomeSvgIcon icon={faInfoCircle} fontSize='small' />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  )
}
