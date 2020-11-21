import { Tooltip as _Tooltip, withStyles } from "@material-ui/core";

export const Tooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.background.tooltip,
    boxShadow: theme.shadows[6],
    color: theme.palette.getContrastText(theme.palette.background.tooltip),
    fontWeight: theme.typography.variants.sansSerif.fontWeightMedium,
    // maxWidth: 220,
    fontSize: theme.typography.body2.fontSize,
    padding: theme.spacing(2),
    // border: `1px solid ${fade(theme.palette.primary.dark, 0.3)}`,
  }
}))(_Tooltip)
