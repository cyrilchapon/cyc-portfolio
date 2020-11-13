import { FontAwesomeSvgIcon } from '$components/icons/font-awesome-svg-icon'
import { MaltSvgIcon } from '$components/icons/malt-svg-icon'
import { ListItemLink } from '$components/lists/list-item-link'
import { faGithub, faLinkedin, faMediumM } from '@fortawesome/free-brands-svg-icons'
import { faCalendarDay, faEnvelope, faPhoneAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { Grid, Link, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, PaperProps } from '@material-ui/core'
import clsx from 'clsx'
import { FunctionComponent } from 'react'

const getAge = (birthday: Date) => {
  var ageDate = new Date(Date.now() - birthday.getTime())
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

const birthDay = new Date(Date.parse('1991-01-04T00:00:00+01:00'))

const ContactPaper: FunctionComponent<PaperProps> = (props) => { 
  const {
    ...paperProps
  } = props

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

              <ListItemText secondary='Age' primary={<strong>{getAge(birthDay)} ans</strong>} />
            </ListItem>

            <ListItem>
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
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} sm={6}>
          <List>
            <ListItem component={Link} href='https://cyril-chpn.medium.com' color='inherit'>
              <ListItemIcon>
                <FontAwesomeSvgIcon fontSize='small' icon={faMediumM} />
              </ListItemIcon>

              <ListItemLink secondary='Medium' primary={<strong>@cyril-chpn</strong>} />
            </ListItem>

            <ListItem component={Link} href='https://github.com/cyrilchapon' color='inherit'>
              <ListItemIcon>
                <FontAwesomeSvgIcon fontSize='small' icon={faGithub} />
              </ListItemIcon>

              <ListItemLink secondary='Github' primary={<strong>cyrilchapon</strong>} />
            </ListItem>

            <ListItem component={Link} href='https://www.linkedin.com/in/cchapon' color='inherit'>
              <ListItemIcon>
                <FontAwesomeSvgIcon fontSize='small' icon={faLinkedin} />
              </ListItemIcon>

              <ListItemLink secondary='LinkedIn' primary={<strong>cchapon</strong>} />
            </ListItem>

            <ListItem component={Link} href='https://www.malt.fr/profile/cyrilchapon' color='inherit'>
              <ListItemIcon>
                <MaltSvgIcon fontSize='small' />
              </ListItemIcon>

              <ListItemLink secondary='Malt' primary={<strong>cyrilchapon</strong>} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  )
}

export { ContactPaper }
