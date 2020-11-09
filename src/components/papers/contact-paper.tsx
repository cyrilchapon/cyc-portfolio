import { FontAwesomeSvgIcon } from '$components/icons/font-awesome-svg-icon'
import { MaltSvgIcon } from '$components/icons/malt-svg-icon'
import { ListItemLink } from '$components/lists/list-item-link'
import { faGithub, faLinkedin, faMedium, faMediumM } from '@fortawesome/free-brands-svg-icons'
import { faCalendarDay, faEnvelope, faPhoneAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { Grid, Link, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  contactPaper: {
    backgroundColor: theme.palette.primary.dark
  }
}))

const getAge = (birthday: Date) => {
  var ageDate = new Date(Date.now() - birthday.getTime())
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

const birthDay = new Date(Date.parse('1991-01-04T00:00:00+01:00'))

const ContactPaper = () => { 
  const classes = useStyles()

  return (
    <Paper className={classes.contactPaper}>
      <Grid container direction='row' spacing={0}>
        <Grid item xs={12} sm={6}>
          <List>
            <ListItem>
              <ListItemIcon>
                <FontAwesomeSvgIcon fontSize='small' icon={faUser} />
              </ListItemIcon>

              <ListItemText primary='Cyril CHAPON' />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <FontAwesomeSvgIcon fontSize='small' icon={faCalendarDay} />
              </ListItemIcon>

              <ListItemText primary={`${getAge(birthDay)} ans`} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <FontAwesomeSvgIcon fontSize='small' icon={faEnvelope} />
              </ListItemIcon>

              <ListItemText primary='cyril.chapon@live.com' />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <FontAwesomeSvgIcon fontSize='small' icon={faPhoneAlt} />
              </ListItemIcon>

              <ListItemText primary='06 66 09 62 02' />
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} sm={6}>
          <List>
            <ListItem component={Link} href='https://cyril-chpn.medium.com' color='inherit'>
              <ListItemIcon>
                <FontAwesomeSvgIcon fontSize='small' icon={faMediumM} />
              </ListItemIcon>

              <ListItemLink primary='@cyril-chpn' />
            </ListItem>

            <ListItem component={Link} href='https://github.com/cyrilchapon' color='inherit'>
              <ListItemIcon>
                <FontAwesomeSvgIcon fontSize='small' icon={faGithub} />
              </ListItemIcon>

              <ListItemLink primary='cyrilchapon' />
            </ListItem>

            <ListItem component={Link} href='https://www.linkedin.com/in/cchapon' color='inherit'>
              <ListItemIcon>
                <FontAwesomeSvgIcon fontSize='small' icon={faLinkedin} />
              </ListItemIcon>

              <ListItemLink primary='cchapon' />
            </ListItem>

            <ListItem component={Link} href='https://www.malt.fr/profile/cyrilchapon' color='inherit'>
              <ListItemIcon>
                <MaltSvgIcon fontSize='small' />
              </ListItemIcon>

              <ListItemLink primary='cyrilchapon' />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  )
}

export { ContactPaper }
