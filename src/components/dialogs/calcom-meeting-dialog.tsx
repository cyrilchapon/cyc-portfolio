import React, { FunctionComponent, useCallback } from 'react'
import { AppBar, Box, Dialog, IconButton, Toolbar } from '@mui/material'
import { browserEnv } from '$env'
import CloseIcon from '@mui/icons-material/Close'
import { MeetingDialogProps } from './meeting-dialog'
import { useGlobalState } from '$global-state'
import Cal from '@calcom/embed-react'
import { TitleTypography } from '$components/header'
import { useCalcomAction } from 'hooks/use-calcom-action'

export const CalComMeetingDialog: FunctionComponent<MeetingDialogProps> = (
  props,
) => {
  const [meetingDialogState, setMeetingDialogState] =
    useGlobalState('meetingDialog')

  const [, setSnackbarState] = useGlobalState('snackbar')

  const handleSubmit = useCallback(() => {
    setMeetingDialogState((prevState) => ({
      ...prevState,
      open: false,
    }))

    setSnackbarState((prevState) => ({
      ...prevState,
      open: true,
      message: `Rendez-vous confirmé ! 🤓`,
    }))
  }, [setMeetingDialogState, setSnackbarState])

  useCalcomAction('bookingSuccessful', handleSubmit)

  const handleCancel = useCallback(async () => {
    setMeetingDialogState((prevState) => ({
      ...prevState,
      open: false,
    }))
  }, [setMeetingDialogState])

  return !!meetingDialogState.open ? (
    <Dialog
      {...props}
      open
      fullScreen
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
    >
      <AppBar
        sx={{ position: 'relative' }}
        color="transparent"
        elevation={0}
        variant="outlined"
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCancel}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <TitleTypography sx={{ ml: 2, flex: 1 }} variant="h5">
            Prendre rendez-vous
          </TitleTypography>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 3 }}>
        <Cal
          calLink={`${browserEnv.NEXT_PUBLIC_CALCOM_USER}/${browserEnv.NEXT_PUBLIC_CALCOM_EVENT}`}
          config={
            {
              // name: 'John Doe',
              // email: 'johndoe@gmail.com',
              // notes: 'Test Meeting',
              // guests: ['janedoe@gmail.com'],
              // theme: 'dark',
            }
          }
        />
      </Box>
    </Dialog>
  ) : null
}
