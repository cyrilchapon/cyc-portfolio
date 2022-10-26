import { createGlobalState } from "react-hooks-global-state";

interface SubscribeDialogState {
  open?: boolean;
  loading: boolean;
  error: Error | null;
}

interface MeetingDialogState {
  open?: boolean;
}

interface SnackbarState {
  open: boolean;
  message: string;
}

interface GlobalState {
  subscribeDialog: SubscribeDialogState;
  meetingDialog: MeetingDialogState;
  snackbar: SnackbarState;
}

const initialState: GlobalState = {
  subscribeDialog: {
    open: undefined,
    loading: false,
    error: null,
  },
  meetingDialog: {
    open: undefined,
  },
  snackbar: {
    open: false,
    message: "",
  },
};

const { useGlobalState, getGlobalState, setGlobalState } =
  createGlobalState(initialState);

export { useGlobalState, getGlobalState, setGlobalState };
