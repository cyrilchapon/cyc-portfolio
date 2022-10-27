import React, { FunctionComponent, useCallback } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { IconButton, InputAdornment, LinearProgress, styled, Typography } from '@mui/material'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from '$components/tooltip'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormBox } from '$components/boxes/form-box'

export type SubscribeFormDialogCancelReason =
  | 'backdropClick'
  | 'escapeKeyDown'
  | 'cancelButton'

export interface SubscribeFormDialogProps extends Omit<DialogProps, 'onClose' | 'onSubmit'> {
  onCancel: (reason: SubscribeFormDialogCancelReason) => void
  onSubmit: (submission: SubscribeFormData) => void
  loading: boolean
}

const NoSpamIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.disabled
}))

const NoSpamSvgIcon = styled(IconButton)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize
}))

const ButtonWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden'
}))

const ButtonProgress = styled(LinearProgress)(() => ({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: 2
}))

const GenericTextField = styled(TextField)(({ theme }) => ({
  '&:not(:last-child)': {
    marginBottom: theme.spacing(1)
  },
  '&:not(:first-child)': {
    marginTop: theme.spacing(1),
  }
}))

export interface SubscribeFormData {
  email: string
  firstname: string
  lastname: string
}

const subscribeFormSchema: yup.SchemaOf<SubscribeFormData> = yup.object({
  email: yup
    .string()
    .required('Il me faut votre e-mail !')
    .email(`On ne dirait pas un e-mail valide...`),
  firstname: yup
    .string()
    .required(`J'ai besoin de votre prénom`)
    .min(3, `Un peu court, non ?`)
    .max(50, `Un poil trop long, non ?`),
  lastname: yup
    .string()
    .required(`J'ai besoin de votre nom`)
    .min(3, `Un peu court, non ?`)
    .max(50, `Un poil trop long, non ?`)
})

type CancelHandler = (event: React.BaseSyntheticEvent, reason: SubscribeFormDialogCancelReason) => void

export const SubscribeFormDialog: FunctionComponent<SubscribeFormDialogProps> = (props) => {
  const {
    onCancel,
    onSubmit,
    loading,
    ...dialogProps
  } = props

  const { register, handleSubmit: internalHandleSubmit, formState } = useForm<SubscribeFormData>({
    mode: 'onChange',
    shouldUnregister: true,
    resolver: yupResolver(subscribeFormSchema)
  })

  const handleSubmit = useCallback<SubmitHandler<SubscribeFormData>>(
    (data) => { onSubmit(data) },
    [onSubmit]
  )

  const handleCancel = useCallback<CancelHandler>(
    (evt, reason) => { onCancel(reason) },
    [onCancel]
  )

  const { ref: firstnameRef, ...firstnameProps } = register('firstname')
  const { ref: lastnameRef, ...lastnameProps } = register('lastname')
  const { ref: emailRef, ...emailProps } = register('email')

  return (
    <Dialog
      {...dialogProps}
      onClose={handleCancel}
      aria-labelledby='form-dialog-title'
    >
      <FormBox
        flexDirection='column'
        component='form' onSubmit={internalHandleSubmit(handleSubmit)} noValidate
      >
        <DialogTitle
          id='form-dialog-title'
        >
          <Typography
            component='div'
            variant='h5'
          >
            Contactez-moi
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText color='textPrimary' component='div'>
            Laissez moi vos coordonnées, je vous recontacte au plus vite 🙂
          </DialogContentText>

          <GenericTextField
            // margin='dense'
            id='subscribe-form-firstname'
            color='secondary'
            label='Prénom'
            type='text'
            // defaultValue={email}
            variant='standard'
            fullWidth
            helperText={
              formState.touchedFields.firstname
                ? formState.errors.firstname?.message
                : null
            }
            inputRef={firstnameRef}
            {...firstnameProps}
            error={formState.touchedFields.firstname && !!formState.errors.firstname}
          />

          <GenericTextField
            // margin='dense'
            id='subscribe-form-lastname'
            color='secondary'
            label='Nom'
            type='text'
            // defaultValue={email}
            variant='standard'
            fullWidth
            helperText={
              formState.touchedFields.lastname
                ? formState.errors.lastname?.message
                : null
            }
            inputRef={lastnameRef}
            {...lastnameProps}
            error={formState.touchedFields.lastname && !!formState.errors.lastname}
          />

          <GenericTextField
            // margin='dense'
            id='subscribe-form-email'
            color='secondary'
            label='Adresse email'
            type='email'
            // defaultValue={email}
            variant='standard'
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Tooltip
                    title="Pas d'inquiétude, je spam pas"
                  >
                    <NoSpamIconButton color='inherit' disableRipple size='small'>
                      <NoSpamSvgIcon icon={faInfoCircle} />
                    </NoSpamIconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
            helperText={
              formState.touchedFields.email
                ? formState.errors.email?.message
                : null
            }
            inputRef={emailRef}
            {...emailProps}
            error={formState.touchedFields.email && !!formState.errors.email}
          />
        </DialogContent>

        <DialogActions>
          <ButtonWrapper>
            <Button
              type='submit'
              color='primary'
              variant='contained'
              disabled={
                loading ||
                !formState.isValid
              }
              disableTouchRipple
            >
              C&apos;est parti
            </Button>

            {loading && <ButtonProgress variant='indeterminate' />}
          </ButtonWrapper>
        </DialogActions>
      </FormBox>
    </Dialog>
  )
}
