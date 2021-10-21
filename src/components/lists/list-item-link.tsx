import { ListItemText, ListItemTextProps } from '@mui/material'

export const ListItemLink = <SecondaryTypographyComponent extends React.ElementType<any> = 'p'>(props: ListItemTextProps<'a', SecondaryTypographyComponent>) => (
  <ListItemText {...props} />
)
