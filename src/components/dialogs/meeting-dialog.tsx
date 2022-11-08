import { Dialog, DialogProps, styled } from '@mui/material'

export type MeetingDialogCancelReason = 'backdropClick' | 'escapeKeyDown'

export interface _MeetingDialogProps extends Omit<DialogProps, 'onClose'> {
  onCancel: (reason: MeetingDialogCancelReason) => void
  loading: boolean
}

export const _MeetingDialog = styled(Dialog)(() => ({
  '.MuiDialog-paper': {
    minHeight: 'calc(100% - 64px)',
    height: 'calc(100% - 64px)',
  },
}))

export type MeetingDialogProps = Omit<
_MeetingDialogProps,
  'onCancel' | 'onSubmit' | 'loading' | 'open'
>

export type CancelHandler = (
  event: React.BaseSyntheticEvent,
  reason: MeetingDialogCancelReason,
) => void
