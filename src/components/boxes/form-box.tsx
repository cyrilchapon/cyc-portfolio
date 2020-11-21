import { FunctionComponent, FormHTMLAttributes } from 'react'
import { Box, BoxProps } from '@material-ui/core'

type FormBoxProps = BoxProps & FormHTMLAttributes<HTMLFormElement>

export const FormBox: FunctionComponent<FormBoxProps> = (props) => (
  <Box {...props} component='form' />
)
