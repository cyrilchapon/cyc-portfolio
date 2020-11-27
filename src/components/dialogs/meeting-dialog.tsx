import React, { FunctionComponent, useCallback } from 'react'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import { ColorObject, decomposeColor, hslToRgb, makeStyles, recomposeColor, rgbToHex, useTheme } from '@material-ui/core'
import { InlineWidget } from 'react-calendly'

export type MeetingDialogCancelReason =
  | 'backdropClick'
  | 'escapeKeyDown'

export interface MeetingDialogProps extends Omit<DialogProps, 'onClose'> {
  onCancel: (reason: MeetingDialogCancelReason) => void
  loading: boolean
}

const useStyles = makeStyles(theme => ({
  dialogPaper: {
    minHeight: 'calc(100% - 64px)',
    height: 'calc(100% - 64px)'
  }
}))

type CancelHandler = (event: React.BaseSyntheticEvent, reason: MeetingDialogCancelReason) => void

const intToHex = (int: number) => {
  const hex = int.toString(16)
  return hex.length === 1 ? '0'.concat(hex) : hex
}

const rgbaToHex = (color: string) => {
  // Idempotent
  if (color.indexOf('#') === 0) {
    return color;
  }

  const decomposedColor = decomposeColor(color)
  if (decomposedColor.type !== 'rgba') {
    throw new Error('Cannot rgbaToHex on a non rgba color')
  }
  const values = decomposedColor.values as [number, number, number, number]

  const hex = `#${values.slice(0, 2).map(intToHex)}${intToHex(values[3]*100)}`
  return hex
}

const getHex = (color: ColorObject | string, removeHash: boolean = false): string => {
  let hex: string

  if (typeof color === 'string') {
    color = decomposeColor(color)
  }

  switch (color.type) {
    case 'hsl':
    case 'hsla':
      hex = rgbToHex(hslToRgb(recomposeColor(color)))
      break
    case 'rgb':
      hex = rgbToHex(recomposeColor(color))
      break
    case 'rgba':
      hex = rgbaToHex(recomposeColor(color))
      break
    default:
      throw new Error(`Unsupported color type ${color.type}`)
  }

  if (removeHash) {
    hex = hex.slice(1)
  }

  return hex
}

export const MeetingDialog: FunctionComponent<MeetingDialogProps> = (props) => {
  const classes = useStyles()
  const theme = useTheme()

  const primary = getHex(theme.palette.primary.main, true)
  const text = getHex(theme.palette.text.primary, true)
  const background = getHex(theme.palette.background.paper, true)

  const {
    onCancel,
    loading,
    ...dialogProps
  } = props

  const handleCancel = useCallback<CancelHandler>(
    (evt, reason) => { onCancel(reason) },
    [onCancel]
  )

  return (
    <Dialog
      {...dialogProps}
      fullWidth
      maxWidth='sm'
      onClose={handleCancel}
      aria-labelledby='form-dialog-title'
      classes={{ paper: classes.dialogPaper }}
    >
      <InlineWidget
        url={`https://calendly.com/cyril-chapon/e-coffee?hide_gdpr_banner=1`}
        styles={{ height: '100%', minHeight: '100%', flexGrow: 1 }}
        pageSettings={{
          backgroundColor: background,
          primaryColor: primary,
          textColor: text,
          hideEventTypeDetails: true
        }}
      />
    </Dialog>
  )
}
