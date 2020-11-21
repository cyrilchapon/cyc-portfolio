import React, { FunctionComponent, useCallback, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { IconButton, InputAdornment, InputLabel, LinearProgress, makeStyles, OutlinedInput, Typography, withStyles } from '@material-ui/core'
import { FontAwesomeSvgIcon } from '$components/icons/font-awesome-svg-icon'
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

const useStyles = makeStyles(theme => ({
  noSpamIcon: {
    fontSize: theme.typography.body1.fontSize
  },
  noSpamIconButton: {
    color: theme.palette.text.disabled
  },
  buttonWrapper: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden'
  },
  buttonProgress: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 2
  },
  textField: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1)
    },
    '&:not(:first-child)': {
      marginTop: theme.spacing(1),
    }
  }
}))

export interface SubscribeFormData {
  email: string
  firstname: string
  lastname: string
}

const subscribeFormSchema = yup.object().shape<SubscribeFormData>({
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
  const classes = useStyles()

  const {
    onCancel,
    onSubmit,
    loading,
    ...dialogProps
  } = props

  const { register, handleSubmit: internalHandleSubmit, errors, formState } = useForm<SubscribeFormData>({
    mode: 'onChange',
    resolver: yupResolver(subscribeFormSchema)
  })

  const handleSubmit = useCallback<SubmitHandler<SubscribeFormData>>(
    (data, evt) => { onSubmit(data) },
    [onSubmit]
  )

  const handleCancel = useCallback<CancelHandler>(
    (evt, reason) => { onCancel(reason) },
    [onCancel]
  )

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
          disableTypography
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

          <TextField
            // margin='dense'
            id='subscribe-form-firstname'
            color='secondary'
            name='firstname'
            label='Prénom'
            type='text'
            // defaultValue={email}
            variant='standard'
            fullWidth
            helperText={
              formState.touched.firstname
                ? errors.firstname?.message
                : null
            }
            inputRef={register}
            error={formState.touched.firstname && !!errors.firstname}
            className={classes.textField}
          />

          <TextField
            // margin='dense'
            id='subscribe-form-lastname'
            color='secondary'
            name='lastname'
            label='Nom'
            type='text'
            // defaultValue={email}
            variant='standard'
            fullWidth
            helperText={
              formState.touched.lastname
                ? errors.lastname?.message
                : null
            }
            inputRef={register}
            error={formState.touched.lastname && !!errors.lastname}
            className={classes.textField}
          />

          <TextField
            // margin='dense'
            id='subscribe-form-email'
            color='secondary'
            name='email'
            label='Adresse email'
            type='email'
            // defaultValue={email}
            variant='standard'
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Tooltip
                    title="Pas d'inquiétude, aucun SPAM sans votre accord"
                  >
                    <IconButton color='inherit' disableRipple size='small' className={classes.noSpamIconButton}>
                      <FontAwesomeSvgIcon icon={faInfoCircle} className={classes.noSpamIcon} />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
            helperText={
              formState.touched.email
                ? errors.email?.message
                : null
            }
            inputRef={register}
            error={formState.touched.email && !!errors.email}
            className={classes.textField}
          />
        </DialogContent>

        <DialogActions>
          <div className={classes.buttonWrapper}>
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
              C'est parti
            </Button>

            {loading && <LinearProgress className={classes.buttonProgress} variant='indeterminate' />}
          </div>
        </DialogActions>
      </FormBox>
    </Dialog>
  )
}
