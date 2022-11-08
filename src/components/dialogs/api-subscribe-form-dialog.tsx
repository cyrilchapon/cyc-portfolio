import { useGlobalState } from '$global-state'
import { FunctionComponent, useCallback } from 'react'
import { SubscribeFormDialog, SubscribeFormDialogProps, SubscribeFormData } from './subscribe-form-dialog'
import { apiAxios, postContact } from '$connectors/api-axios'

type ApiSubscribeFormDialogProps = Omit<
  SubscribeFormDialogProps,
  'onCancel' | 'onSubmit' | 'loading' | 'open'
>

export const ApiSubscribeFormDialog: FunctionComponent<ApiSubscribeFormDialogProps> = (props) => {
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
      await postContact(apiAxios)(formData)

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
  }, [setSubscribeDialogState, setSnackbarState])

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