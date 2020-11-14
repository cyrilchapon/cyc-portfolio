export * from './font'
export * from './meta'

import * as fonts from './font'
import * as metas from './meta'

export const linksGenerator = () => ([
  ...Object.values(metas).map(Component => Component()),
  ...Object.values(fonts).map(Component => Component())
])
