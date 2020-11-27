import { useGlobalState } from '$global-state'
import { FunctionComponent, useCallback } from 'react'
import { MeetingDialog, MeetingDialogProps } from './meeting-dialog'
import { CalendlyEventListener } from 'react-calendly'

interface CalendlyMeetingDialogProps extends Omit<
MeetingDialogProps,
  'onCancel' | 'onSubmit' | 'loading' | 'open'
> {

}

type ScheduledHandler = NonNullable<CalendlyEventListener['props']['onEventScheduled']>

export const CalendlyMeetingDialog: FunctionComponent<CalendlyMeetingDialogProps> = (props) => {
  const {
    ...meetingDialogProps
  } = props

  const [
    meetingDialogState,
    setMeetingDialogState
  ] = useGlobalState('meetingDialog')

  const [
    ,
    setSnackbarState
  ] = useGlobalState('snackbar')

  const handleSubmit = useCallback<ScheduledHandler>((e) => {
    setMeetingDialogState(prevState => ({
      ...prevState,
      open: false
    }))

    setSnackbarState(prevState => ({
      ...prevState,
      open: true,
      message: `Rendez-vous confirmé ! 🤓`
    }))
  }, [setMeetingDialogState, setSnackbarState])

  const handleCancel = useCallback(async () => {
    setMeetingDialogState((prevState) => ({
      ...prevState,
      open: false
    }))
  }, [setMeetingDialogState])

  return (
    !!meetingDialogState.open
      ? (
        <CalendlyEventListener onEventScheduled={handleSubmit}>
          <MeetingDialog
            {...meetingDialogProps}
            open
            onCancel={handleCancel}
            loading={false}
          >

          </MeetingDialog>
        </CalendlyEventListener>
      )
      : null
  )
}