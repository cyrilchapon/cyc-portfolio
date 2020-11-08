import 'styled-components'
import { Theme as _Theme } from '../styles/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends _Theme {
    
  }
}
