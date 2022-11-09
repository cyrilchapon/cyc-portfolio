import React, { FunctionComponent, useCallback } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {
  FormGroup,
  FormLabel,
  IconButton,
  InputAdornment,
  LinearProgress,
  styled,
  Typography,
} from '@mui/material'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from '$components/tooltip'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormBox } from '$components/boxes/form-box'
import { FontAwesomeSvgIcon } from '$components/icons/font-awesome-svg-icon'
import { Stack } from '@mui/system'
import { captchaActions } from '$constants/captcha'
import { Turnstile } from '@marsidev/react-turnstile'
import { browserEnv } from '$env'

export type SubscribeFormDialogCancelReason =
  | 'backdropClick'
  | 'escapeKeyDown'
  | 'cancelButton'

export interface SubscribeFormDialogProps
  extends Omit<DialogProps, 'onClose' | 'onSubmit'> {
  onCancel: (reason: SubscribeFormDialogCancelReason) => void
  onSubmit: (submission: SubscribeFormData) => void
  loading: boolean
}

const NoSpamIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.disabled,
}))

const NoSpamSvgIcon = styled(FontAwesomeSvgIcon)(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
}))

const ButtonWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}))

const ButtonProgress = styled(LinearProgress)(() => ({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: 2,
}))

const TurnstileControl = styled(Turnstile)(() => ({
  'iframe': {
    // width: '100% !important'
    margin: '-2px'
  }
}))

export interface SubscribeFormData {
  email: string
  firstName: string
  lastName: string
  captcha: string
}

const subscribeFormSchema: yup.SchemaOf<SubscribeFormData> = yup.object({
  email: yup
    .string()
    .required('Il me faut votre e-mail !')
    .email(`On ne dirait pas un e-mail valide...`),
  firstName: yup
    .string()
    .required(`J'ai besoin de votre prénom`)
    .min(3, `Un peu court, non ?`)
    .max(50, `Un poil trop long, non ?`),
  lastName: yup
    .string()
    .required(`J'ai besoin de votre nom`)
    .min(3, `Un peu court, non ?`)
    .max(50, `Un poil trop long, non ?`),
  captcha: yup.string().required(`Veuillez vérifier votre humanité`),
})

type CancelHandler = (
  event: React.BaseSyntheticEvent,
  reason: SubscribeFormDialogCancelReason,
) => void

export const SubscribeFormDialog: FunctionComponent<
  SubscribeFormDialogProps
> = (props) => {
  const { onCancel, onSubmit, loading, ...dialogProps } = props

  const {
    register,
    handleSubmit: internalHandleSubmit,
    formState,
    setValue,
    getValues,
    control,
  } = useForm<SubscribeFormData>({
    mode: 'onChange',
    shouldUnregister: true,
    resolver: yupResolver(subscribeFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      captcha: '',
    },
  })

  const handleSubmit = useCallback<SubmitHandler<SubscribeFormData>>(
    (data) => {
      onSubmit(data)
    },
    [onSubmit],
  )

  const handleCancel = useCallback<CancelHandler>(
    (evt, reason) => {
      onCancel(reason)
    },
    [onCancel],
  )

  const { ref: firstNameRef, ...firstNameProps } = register('firstName')
  const { ref: lastNameRef, ...lastNameProps } = register('lastName')
  const { ref: emailRef, ...emailProps } = register('email')
  register('captcha')

  const handleCaptchaVerify = useCallback(
    (token: string) => {
      setValue('captcha', token, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    },
    [setValue],
  )

  const handleCaptchaError = useCallback(() => {
    // TODO: log error
    setValue('captcha', '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }, [setValue])

  const handleCaptchaExpire = useCallback(() => {
    // TODO: check
    setValue('captcha', '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }, [setValue])

  // const handleReset = useCallback(() => {
  //   console.log('reset')
  //   setValue('captcha', '', {
  //     shouldValidate: true,
  //     shouldDirty: true,
  //     shouldTouch: true,
  //   })
  // }, [setValue])

  console.log(getValues())

  return (
    <Dialog
      {...dialogProps}
      onClose={handleCancel}
      scroll="body"
      aria-labelledby="form-dialog-title"
    >
      <FormBox
        flexDirection="column"
        component="form"
        onSubmit={internalHandleSubmit(handleSubmit)}
        // onReset={handleReset}
        noValidate
      >
        <DialogTitle id="form-dialog-title">
          <Typography component="div" variant="h5">
            Contactez-moi
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <Stack direction="column" spacing={2}>
            <DialogContentText color="textPrimary" component="div">
              Laissez moi vos coordonnées, je vous recontacte au plus vite 🙂
            </DialogContentText>

            <TextField
              // margin='dense'
              id="subscribe-form-firstname"
              color="info"
              label="Prénom"
              type="text"
              // defaultValue={email}
              variant="filled"
              size="small"
              margin="none"
              fullWidth
              required
              helperText={
                formState.touchedFields.firstName
                  ? formState.errors.firstName?.message
                  : null
              }
              inputRef={firstNameRef}
              {...firstNameProps}
              error={
                formState.touchedFields.firstName &&
                !!formState.errors.firstName
              }
            />

            <TextField
              // margin='dense'
              id="subscribe-form-lastname"
              color="info"
              label="Nom"
              type="text"
              // defaultValue={email}
              variant="filled"
              size="small"
              margin="none"
              fullWidth
              required
              helperText={
                formState.touchedFields.lastName
                  ? formState.errors.lastName?.message
                  : null
              }
              inputRef={lastNameRef}
              {...lastNameProps}
              error={
                formState.touchedFields.lastName && !!formState.errors.lastName
              }
            />

            <TextField
              // margin='dense'
              id="subscribe-form-email"
              color="info"
              label="Adresse email"
              type="email"
              // defaultValue={email}
              variant="filled"
              size="small"
              margin="none"
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Pas d'inquiétude, je ne spam pas">
                      <NoSpamIconButton
                        color="inherit"
                        disableRipple
                        size="small"
                      >
                        <NoSpamSvgIcon icon={faInfoCircle} />
                      </NoSpamIconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
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

            <FormGroup>
              <FormLabel sx={{ mb: 1 }} required>Je ne suis pas un robot</FormLabel>

              <Controller
                control={control}
                name="captcha"
                defaultValue=""
                render={() => (
                  <TurnstileControl
                    siteKey={browserEnv.NEXT_PUBLIC_TURNSTILE_PUBLIC_KEY}
                    options={{
                      action: captchaActions.contact,
                      size: 'normal',
                    }}
                    onSuccess={handleCaptchaVerify}
                    onError={handleCaptchaError}
                    onExpire={handleCaptchaExpire}
                  />
                )}
              />
            </FormGroup>
          </Stack>
        </DialogContent>

        <DialogActions>
          <ButtonWrapper>
            <Button
              type="submit"
              color="primary"
              // variant="contained"
              disabled={loading || !formState.isValid}
              disableTouchRipple
            >
              C&apos;est parti
            </Button>

            {loading && <ButtonProgress variant="indeterminate" />}
          </ButtonWrapper>
        </DialogActions>
      </FormBox>
    </Dialog>
  )
}
