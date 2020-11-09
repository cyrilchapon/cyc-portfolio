import { Button, ButtonProps, makeStyles } from "@material-ui/core";
import { FunctionComponent } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.background.default,
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }
}))

export const DarkButton: FunctionComponent<ButtonProps> = (props: ButtonProps) => {
  const classes = useStyles()

  return <Button {...props} variant='contained' className={classes.root} />
}
