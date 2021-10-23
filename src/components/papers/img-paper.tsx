import { FunctionComponent } from 'react'
import { Paper, PaperProps } from '@mui/material'

type ImgPaperProps = PaperProps<'img'>

export const ImgPaper: FunctionComponent<ImgPaperProps> = (props) => (
  <Paper {...props} component='img' />
)
