import HomereSvg from '../../constants/homere-favicon-homr-black.svg'
import { SvgIcon, SvgIconProps } from '@mui/material'

export const HomereIcon: React.FunctionComponent<SvgIconProps> = (props) => (
  <SvgIcon {...props} inheritViewBox component={HomereSvg} />
)
