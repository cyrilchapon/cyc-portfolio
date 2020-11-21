import { createGlobalState } from 'react-hooks-global-state'

interface SubscribeDialogState {
  open?: boolean
  loading: boolean
  error: Error | null
}

interface SnackbarState {
  open: boolean
  message: string
}

interface GlobalState {
  subscribeDialog: SubscribeDialogState
  snackbar: SnackbarState
}

const initialState: GlobalState = {
  subscribeDialog: {
    open: undefined,
    loading: false,
    error: null
  },
  snackbar: {
    open: false,
    message: ''
  }
}

const { useGlobalState, getGlobalState, setGlobalState } = createGlobalState(initialState)

export {
  useGlobalState,
  getGlobalState,
  setGlobalState
}
