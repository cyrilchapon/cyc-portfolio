import React, { FunctionComponent, useCallback, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles, Typography, withStyles } from '@material-ui/core'
import clsx from 'clsx'

export type SubscribeFormDialogCancelReason =
  | 'backdropClick'
  | 'escapeKeyDown'
  | 'cancelButton'

export interface SubscribeFormDialogSubmission {
  email: string
}

export interface SubscribeFormDialogProps extends Omit<DialogProps, 'onClose' | 'onSubmit'> {
  onCancel: (evt: {}, reason: SubscribeFormDialogCancelReason) => void
  onSubmit: (evt: {}, submission: SubscribeFormDialogSubmission) => void
}

export const SubscribeFormDialog: FunctionComponent<SubscribeFormDialogProps> = (props) => {
  const {
    onCancel,
    onSubmit,
    ...dialogProps
  } = props

  const [
    email,
    setEmail
  ] = useState('')

  const handleSubmit = useCallback(
    (evt: React.MouseEvent) => {
      onSubmit(evt, { email })
      setEmail('')
    },
    [email]
  )

  const handleCancel = useCallback(
    (evt: React.MouseEvent, reason: SubscribeFormDialogCancelReason) => {
      onCancel(evt, reason)
      setEmail('')
    },
    []
  )

  return (
    <Dialog
      {...dialogProps}
      onClose={handleCancel}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle
        id='form-dialog-title'
      >
        Recontactez-moi
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          En me donnant votre adresse e-mail, vous consentez à ce que je vous recontacte.
        </DialogContentText>

        <TextField
          autoFocus
          margin='dense'
          id='email'
          label='Adresse email'
          type='email'
          value={email}
          onChange={(evt) => setEmail(evt.currentTarget.value)}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={evt => handleCancel(evt, 'cancelButton')} color='primary'>
          Annuler
        </Button>

        <Button onClick={handleSubmit} color='primary' variant='contained'>
          Recontactez-moi
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// import MailchimpSubscribe from 'react-mailchimp-subscribe'

// const url = '//xxxx.us13.list-manage.com/subscribe/post?u=zefzefzef&id=fnfgn';

// // simplest form (only email)
// const SimpleForm = () => <MailchimpSubscribe url={url}/>

// // use the render prop and your custom form
// const CustomForm = () => (
//   <MailchimpSubscribe
//     url={url}
//     render={({ subscribe, status, message }) => (
//       <div>
//         <SimpleForm onSubmitted={formData => subscribe(formData)} />
//         {status === 'sending' && <div style={{ color: 'blue' }}>sending...</div>}
//         {status === 'error' && <div style={{ color: 'red' }} dangerouslySetInnerHTML={{__html: message}}/>}
//         {status === 'success' && <div style={{ color: 'green' }}>Subscribed !</div>}
//       </div>
//     )}
//   />
// )