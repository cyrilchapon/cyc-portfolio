import { ListItemText, ListItemTextProps } from '@material-ui/core'

export const ListItemLink = <SecondaryTypographyComponent extends React.ElementType<any> = 'p'>(props: ListItemTextProps<'a', SecondaryTypographyComponent>) => (
  <ListItemText {...props} />
)
