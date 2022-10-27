import { Paper, PaperProps, styled } from '@mui/material'
import { FunctionComponent } from 'react'

interface TerminalPaperBaseProps extends PaperProps {
  initialLines?: number
}

const _TerminalPaper = styled(Paper, {
  shouldForwardProp: p => p !== 'initialLines'
})<TerminalPaperBaseProps>(({ theme, initialLines }) => ({
  padding: theme.spacing(1),
  height: 
    theme.spacing(
      (theme.typography.subtitle1.lineHeight as number) * (initialLines ?? 1) * 2
    ) + theme.spacing(2),
  backgroundColor: theme.palette.background.terminal
}))

const TerminalPaperBase: FunctionComponent<TerminalPaperBaseProps> = (props) => {
  return (
    <_TerminalPaper
      variant='outlined'
      {...props}
    />
  )
}

export { TerminalPaperBase }
export type { TerminalPaperBaseProps }
