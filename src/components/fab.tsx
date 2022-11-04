import { Fab, FabProps, PropTypes, SvgIcon, SvgIconProps, Zoom } from '@mui/material'
import { heroThemes, HeroType } from 'pages'
import * as React from 'react'
import { FontAwesomeSvgIcon } from './icons/font-awesome-svg-icon'
import { faLinkedinIn, faMedium } from '@fortawesome/free-brands-svg-icons'
import { useGlobalState } from '$global-state'
import { faCalendarDay, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Themes, ThemesServiceContext } from '$styles'
import HomereSvg from '../constants/homere-favicon-homr-black.svg'
import { urls } from '$constants'

const HomereIcon: React.FunctionComponent<SvgIconProps> = (props) => (
  <SvgIcon
    {...props}
    inheritViewBox
    component={HomereSvg}
    color='secondary'
  />
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MainFabProps = {
  currentHeroInView?: HeroType | null
  currentThemeKey: keyof Themes
}

type FabType =
  | 'bookAMeeting'
  | 'contactMe'
  | 'goToHomere'
  | 'goToMedium'
  | 'goToLinkedIn'

const heroesFabTypes: Partial<Record<HeroType, FabType>> = {
  about: 'contactMe',
  resume: 'goToLinkedIn',
  homere: 'goToHomere',
  services: 'bookAMeeting',
  medium: 'goToMedium'
}

const heroesRootColor: Record<HeroType, PropTypes.Color | 'success' | 'error' | 'info' | 'warning'> = {
  intro: 'primary',
  about: 'default',
  resume: 'default',
  homere: 'default',
  services: 'primary',
  medium: 'default'
}

type BehaviorProps =
  | ({ component: 'a' } & Pick<FabProps<'a'>, 'href' | 'target'>)
  | ({ component: 'a' } & Pick<FabProps<'button'>, 'onClick'>)

type FabDef = BehaviorProps & {
  icon: React.ReactNode
}

export const MainFab: React.FunctionComponent<MainFabProps> = ({
  currentHeroInView,
  currentThemeKey,
  ...restProps
}) => {
  const themes = React.useContext(ThemesServiceContext)

  const currentFabType: FabType | null = (currentHeroInView != null ? heroesFabTypes[currentHeroInView] : null) ?? null

  const transitionDuration = {
    enter: themes.root.transitions.duration.shortest,
    exit: themes.root.transitions.duration.shortest,
  }

  const [, setMeetingDialogState] = useGlobalState('meetingDialog')
  const [, setSubscribeDialogState] = useGlobalState('subscribeDialog')

  const fabsProps: Record<FabType, FabDef> = {
    bookAMeeting: {
      component: 'a',
      icon: <FontAwesomeSvgIcon icon={faCalendarDay} fontSize='small' sx={{}} />,
      onClick: () =>
        setMeetingDialogState((prevState) => ({
          ...prevState,
          open: true,
        })),
    },
    contactMe: {
      component: 'a',
      icon: <FontAwesomeSvgIcon icon={faEnvelope} fontSize='small' sx={{}} />,
      onClick: () =>
        setSubscribeDialogState((prevState) => ({
          ...prevState,
          open: true,
        })),
    },
    goToHomere: {
      component: 'a',
      icon: <HomereIcon sx={{}} />,
      href: urls.homere,
      target: '_blank'
    },
    goToMedium: {
      component: 'a',
      icon: <FontAwesomeSvgIcon icon={faMedium} fontSize='small' sx={{}} />,
      href: urls.medium,
      target: '_blank'
    },
    goToLinkedIn: {
      component: 'a',
      icon: <FontAwesomeSvgIcon icon={faLinkedinIn} fontSize='small' sx={{}} />,
      href: urls.linkedIn,
      target: '_blank'
    }
  }

  return (
    <>
      {(Object.entries(heroThemes) as [HeroType, keyof Themes][]).map(([heroType, themeKey]) => {
        const fabType = heroesFabTypes[heroType] ?? null

        if (fabType == null) {
          return null
        }

        const { icon, ...fabProps } = fabsProps[fabType]

        const isActiveFab = currentFabType === fabType && currentThemeKey === themeKey

        const rootColor = heroesRootColor[heroType]

        return (
          <Zoom
            key={`${fabType}-${themeKey}`}
            in={isActiveFab}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${isActiveFab ? transitionDuration.exit : 0}ms`,
            }}
          >
            <Fab {...restProps} {...fabProps} color={rootColor}>
              {icon}
            </Fab>
          </Zoom>
        )
      })}
    </>
  )
}
