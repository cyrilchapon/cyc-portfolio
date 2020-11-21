import React from 'react'
import { useGlobalState } from '$global-state'
import { IconButton, Snackbar, SnackbarProps } from '@material-ui/core'
import { FunctionComponent } from 'react'
import Markdown from 'markdown-to-jsx'
import { FontAwesomeSvgIcon } from './icons/font-awesome-svg-icon'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const ConnectedSnackbar: FunctionComponent<Omit<SnackbarProps, 'open' | 'onClose'>> = (props) => {
  const [
    snackbarState,
    setSnackbarState
  ] = useGlobalState('snackbar')

  const handleSnackbarClose = React.useCallback(
    () => {
      setSnackbarState(prevState => ({
        ...prevState,
        open: false
      }))
    },
    [setSnackbarState]
  )

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={3000}
      message={<Markdown>{snackbarState.message}</Markdown>}
      action={
        <React.Fragment>
          <IconButton size='small' color='inherit' onClick={handleSnackbarClose}>
            <FontAwesomeSvgIcon fontSize='small' icon={faTimes} />
          </IconButton>
        </React.Fragment>
      }
      {...props}
      onClose={handleSnackbarClose}
      open={snackbarState.open}
    />
  )
}

export { ConnectedSnackbar }
