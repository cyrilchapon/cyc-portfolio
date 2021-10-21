import { FunctionComponent, ImgHTMLAttributes } from 'react'
import { Paper, PaperClassKey, PaperProps, StandardProps } from '@mui/material'

type ImgPaperProps = PaperProps & StandardProps<
  ImgHTMLAttributes<HTMLImageElement>,
  PaperClassKey
>

export const ImgPaper: FunctionComponent<ImgPaperProps> = (props) => (
  <Paper {...props} component='img' />
)
