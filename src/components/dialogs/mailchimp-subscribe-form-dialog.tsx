import { useGlobalState } from '$global-state'
import { FunctionComponent, useCallback } from 'react'
import { SubscribeFormDialog, SubscribeFormDialogProps, SubscribeFormData } from './subscribe-form-dialog'
import { mailchimpAxios } from '$connectors'

interface MailchimpSubscribeFormDialogProps extends Omit<
  SubscribeFormDialogProps,
  'onCancel' | 'onSubmit' | 'loading' | 'open'
> {

}

export const MailchimpSubscribeFormDialog: FunctionComponent<MailchimpSubscribeFormDialogProps> = (props) => {
  const {
    ...subscribeFormProps
  } = props

  const [
    subscribeDialogState,
    setSubscribeDialogState
  ] = useGlobalState('subscribeDialog')

  const [
    ,
    setSnackbarState
  ] = useGlobalState('snackbar')

  const handleSubmit = useCallback(async (formData: SubscribeFormData) => {
    setSubscribeDialogState(prevState => ({
      ...prevState,
      loading: true
    }))

    try {
      await mailchimpAxios.subscribe(formData)

      setSnackbarState(prevState => ({
        ...prevState,
        open: true,
        message: "C'est OK, je vous recontacte très vite 🤗"
      }))

      setSubscribeDialogState(prevState => ({
        ...prevState,
        error: null,
        loading: false,
        open: false
      }))
    } catch (err: unknown) {
      setSnackbarState(prevState => ({
        ...prevState,
        open: true,
        message: (err as Error).message
      }))

      setSubscribeDialogState(prevState => ({
        ...prevState,
        error: (err as Error),
        loading: false
      }))
    }
  }, [setSubscribeDialogState, mailchimpAxios])

  const handleCancel = useCallback(async () => {
    setSubscribeDialogState((prevState) => ({
      ...prevState,
      loading: false,
      error: null,
      open: false
    }))
  }, [setSubscribeDialogState])

  return (
    subscribeDialogState.open != null
      ? (
        <SubscribeFormDialog
          {...subscribeFormProps}
          open={subscribeDialogState.open}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          loading={subscribeDialogState.loading}
        />
      )
      : null
  )
}