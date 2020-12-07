export * from './font'
export * from './meta'

import * as fonts from './font'
import * as metas from './meta'
import * as favicons from './favicon'

export const linksGenerator = () => ([
  ...Object.values(metas).map(Component => Component()),
  ...Object.values(fonts).map(Component => Component()),
  ...Object.values(favicons).map(Component => Component()),
])
