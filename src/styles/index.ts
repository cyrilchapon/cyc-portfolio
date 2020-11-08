import { CreateCSSProperties } from '@material-ui/core/styles/withStyles'

export * from './theme'
// export * from './global-styles/index.ts.bak'
export * from './font'
export * from './snap-child'
export * from './snap-parent'
// export * from './breakpoints.ts.bak'

export type PropsFunc<Props extends object, T> = (props: Props) => T
export type PropsCssFunc<Props extends object> = PropsFunc<Props, CreateCSSProperties<Props>>
