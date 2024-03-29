import { FontAwesomeSvgIcon } from '$components/icons/font-awesome-svg-icon'
import { ListItemLink } from '$components/lists/list-item-link'
import { birthDay, urls } from '$constants'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faCalendarDay, faUser } from '@fortawesome/free-solid-svg-icons'
import { Grid, Link, List, ListItem, ListItemIcon, ListItemText, Paper, PaperProps } from '@mui/material'
import { useYearDuration } from 'hooks/use-duration'
import { FunctionComponent } from 'react'

const ContactPaper: FunctionComponent<PaperProps> = (props) => { 
  const {
    ...paperProps
  } = props

  const myselfAge = useYearDuration(birthDay)

  return (
    <Paper {...paperProps}>
      <Grid container direction='row' spacing={0}>
        <Grid item xs={12} sm={6}>
          <List>
            <ListItem>
              <ListItemIcon>
                <FontAwesomeSvgIcon fontSize='small' icon={faUser} />
              </ListItemIcon>

              <ListItemText secondary='Nom' primary={<strong>Cyril CHAPON</strong>} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <FontAwesomeSvgIcon fontSize='small' icon={faCalendarDay} />
              </ListItemIcon>

              <ListItemText secondary='Age' primary={<strong>{myselfAge} ans</strong>} />
            </ListItem>

            {/* <ListItem>
              <ListItemIcon>
                <FontAwesomeSvgIcon fontSize='small' icon={faEnvelope} />
              </ListItemIcon>

              <ListItemText secondary='E-mail' primary={<strong>cyril&#x002E;chapon[at]live&#x002E;com</strong>} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <FontAwesomeSvgIcon fontSize='small' icon={faPhoneAlt} />
              </ListItemIcon>

              <ListItemText secondary='Téléphone' primary={<strong>&#x002B;33&#x0020;6&#x0020;66&#x0020;09&#x0020;62&#x0020;02</strong>} />
            </ListItem> */}
          </List>
        </Grid>

        <Grid item xs={12} sm={6}>
          <List>
            {/* <ListItem component={Link} href={urls.medium} color='inherit'>
              <ListItemIcon>
                <FontAwesomeSvgIcon fontSize='small' icon={faMediumM} />
              </ListItemIcon>

              <ListItemLink secondary='Medium' primary={<strong>@cyril-chpn</strong>} />
            </ListItem> */}

            <ListItem component={Link} href={urls.linkedIn} color='inherit'>
              <ListItemIcon>
                <FontAwesomeSvgIcon fontSize='medium' icon={faLinkedin} />
              </ListItemIcon>

              <ListItemLink secondary='LinkedIn' primary={<strong>cchapon</strong>} />
            </ListItem>

            <ListItem component={Link} href={urls.github} color='inherit'>
              <ListItemIcon>
                <FontAwesomeSvgIcon fontSize='medium' icon={faGithub} />
              </ListItemIcon>

              <ListItemLink secondary='Github' primary={<strong>cyrilchapon</strong>} />
            </ListItem>

            {/* <ListItem component={Link} href={urls.malt} color='inherit'>
              <ListItemIcon>
                <MaltSvgIcon fontSize='small' />
              </ListItemIcon>

              <ListItemLink secondary='Malt' primary={<strong>cyrilchapon</strong>} />
            </ListItem> */}
          </List>
        </Grid>
      </Grid>
    </Paper>
  )
}

export { ContactPaper }
