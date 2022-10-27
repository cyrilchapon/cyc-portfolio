import { ListItemText, ListItemTextProps } from '@mui/material'

export const ListItemLink = <SecondaryTypographyComponent extends React.ElementType = 'p'>(props: ListItemTextProps<'a', SecondaryTypographyComponent>) => (
  <ListItemText {...props} />
)
