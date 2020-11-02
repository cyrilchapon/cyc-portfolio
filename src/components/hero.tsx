import {
  styled,
  Theme,
  ThemeColorName,
  snapChild,
  SnapChildProps
} from '$styles'

export interface HeroProps {
  color?: ThemeColorName
  escapeHeader?: boolean
}

const getColor = (theme: Theme) => (themeColorName?: ThemeColorName) => (
  theme.colors[themeColorName ?? 'p400']
)

const getHeight = (theme: Theme) => (escapeHeader?: boolean) => (
  (escapeHeader ?? false)
    ? `calc(100vh - ${theme.spacings.header})`
    : '100vh'
)

export const Hero = styled<'section', HeroProps & SnapChildProps>('section')`
  background-color: ${props => getColor(props.theme)(props.color)};
  height: ${props => getHeight(props.theme)(props.escapeHeader)};

  ${props => snapChild(props)}

  display: flex;
  flex-direction: column;
  justify-content: center;
`
