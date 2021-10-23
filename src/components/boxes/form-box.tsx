import { FunctionComponent } from 'react'
import { Box, BoxProps } from '@mui/material'

type FormBoxProps = BoxProps<'form'>

export const FormBox: FunctionComponent<FormBoxProps> = (props) => (
  <Box {...props} component='form' />
)
