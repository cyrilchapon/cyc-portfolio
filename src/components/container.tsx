import { styled } from '$styles'
import {
  generateContainerStyles,
  generateFluidContainerStyles
} from '$styles'

type ContainerVariants =
  | 'classic'
  | 'fluid'
  | 'fullWidth'

interface ContainerProps {
  variant?: ContainerVariants
  fluid?: boolean
  fullWidth?: boolean
}

export const Container = styled<'div', ContainerProps>('div')`
  ${props => {
    const variant = (
      props.variant ??
      (props.fluid ? 'fluid' : null) ??
      (props.fullWidth ? 'fullWidth' : null) ??
      'classic'
    )

    return ({
      classic: generateContainerStyles([
        { space: props.theme.spacings.zetta },
        { space: props.theme.spacings.zetta, breakpoint: props.theme.breakpoints.kilo as number },
        { space: 100, breakpoint: props.theme.breakpoints.mega as number },
        { space: 150, breakpoint: props.theme.breakpoints.giga as number },
        { space: 200, breakpoint: props.theme.breakpoints.tera as number }
      ], 2),
      fluid: generateFluidContainerStyles([
        { space: props.theme.spacings.zetta },
        { space: props.theme.spacings.zetta, breakpoint: props.theme.breakpoints.kilo as number },
        { space: 100, breakpoint: props.theme.breakpoints.mega as number },
        { space: 150, breakpoint: props.theme.breakpoints.giga as number },
        { space: 200, breakpoint: props.theme.breakpoints.tera as number }
      ]),
      fullWidth: generateFluidContainerStyles([
        { space: props.theme.spacings.zetta },
        { space: props.theme.spacings.zetta, breakpoint: props.theme.breakpoints.kilo as number },
        { space: props.theme.spacings.zetta, breakpoint: props.theme.breakpoints.mega as number },
        { space: props.theme.spacings.zetta, breakpoint: props.theme.breakpoints.giga as number },
        { space: props.theme.spacings.zetta, breakpoint: props.theme.breakpoints.tera as number }
      ])
    })[variant]
  }}

  background-color: rgba(255, 255, 255, 0.5);
`
