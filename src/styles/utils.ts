import { CreateCSSProperties } from '@material-ui/core/styles/withStyles'

export const removePx = (value: number | string | null) => (
  typeof value === 'string'
    ? parseInt(value.replace('px', ''), 10)
    : value
)

export const maybePxToPx = (value?: number | string) => (
  typeof value === 'number'
    ? `${value}px`
    : (value != null
      ? value
      : '0'
    )
)

export type PropsFunc<Props extends object, T> = (props: Props) => T
export type PropsCssFunc<Props extends object> = PropsFunc<Props, CreateCSSProperties<Props>>

