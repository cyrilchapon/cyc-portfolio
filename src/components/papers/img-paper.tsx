import { FunctionComponent, ImgHTMLAttributes } from 'react'
import { Paper, PaperClassKey, PaperProps, StandardProps } from '@material-ui/core'

type ImgPaperProps = PaperProps & StandardProps<
  ImgHTMLAttributes<HTMLImageElement>,
  PaperClassKey
>

export const ImgPaper: FunctionComponent<ImgPaperProps> = (props) => (
  <Paper {...props} component='img' />
)
