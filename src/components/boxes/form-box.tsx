import { FunctionComponent, FormHTMLAttributes } from 'react'
import { Box, BoxProps } from '@mui/material'

type FormBoxProps = BoxProps & FormHTMLAttributes<HTMLFormElement>

export const FormBox: FunctionComponent<FormBoxProps> = (props) => (
  <Box {...props} component='form' />
)
