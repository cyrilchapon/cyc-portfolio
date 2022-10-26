import { useGlobalState } from '$global-state'
import { FunctionComponent, useCallback } from 'react'
import { MeetingDialog, MeetingDialogProps } from './meeting-dialog'
import { EventScheduledEvent, useCalendlyEventListener } from 'react-calendly'

type CalendlyMeetingDialogProps = Omit<
MeetingDialogProps,
  'onCancel' | 'onSubmit' | 'loading' | 'open'
>

type ScheduledHandler = (e: EventScheduledEvent) => void

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

  const handleSubmit = useCallback<ScheduledHandler>(() => {
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

  useCalendlyEventListener({
    onEventScheduled: handleSubmit
  })

  return (
    !!meetingDialogState.open
      ? (
        <MeetingDialog
          {...meetingDialogProps}
          open
          onCancel={handleCancel}
          loading={false}
        />
      )
      : null
  )
}