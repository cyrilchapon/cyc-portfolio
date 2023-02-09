import { styled, SvgIcon, SvgIconProps, SxProps, Theme, useTheme } from '@mui/material'
import React, { FunctionComponent, ReactNode } from 'react'
import { EdgeProps, getSimpleBezierPath } from 'reactflow'
import BoltIcon from '@mui/icons-material/Bolt'
import CircleIcon from '@mui/icons-material/Circle'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import SettingsIcon from '@mui/icons-material/Settings'
import PowerIcon from '@mui/icons-material/Power'
// import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import { Tooltip } from '$components/tooltip'
import CircleSvg from '../../../../constants/circle.svg'
import { FontAwesomeSvgIcon } from '$components/icons/font-awesome-svg-icon'
import { faCog, faCogs } from '@fortawesome/free-solid-svg-icons'

const CircleOutlinedIcon: FunctionComponent<SvgIconProps> = (props) => (
  <SvgIcon {...props} inheritViewBox component={CircleSvg} />
)

const CustomPath = styled('path')(({ theme }) => ({
  // Increase specificity to override default styles
  '&.react-flow__edge-path, &.react-flow__connection-path': {
    // stroke: theme.palette.primary.main,
    // stroke: theme.palette.background.default
  },
}))

type IconColor = 'primary' | 'secondary' | 'info' | 'neutral'

export type CustomEdgeData = {
  icon?: 'bolt' | 'cog' | 'plug'
  iconColor?: IconColor
  tooltip?: ReactNode
}

export type CustomEdgeProps = EdgeProps<CustomEdgeData>

const getIconSizeProps = (baseSize: number, x: number, y: number) => ({
  x: x - (baseSize / 2),
  y: y - (baseSize / 2),
  height: `${baseSize}px`,
  width: `${baseSize}px`,
})

export const CustomEdge: FunctionComponent<CustomEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const theme = useTheme()
  const iconColor = data?.iconColor ?? 'neutral'

  const colorSx: SxProps<Theme> = {
    color: theme.palette[iconColor].main,
    ...(data?.tooltip != null ? { pointerEvents: 'all' } : null),
  }

  const subIconComponent =
    data?.icon === 'bolt' ? (
      <BoltIcon sx={colorSx} {...getIconSizeProps(20, labelX, labelY)} />
    ) : data?.icon === 'cog' ? (
      <SettingsIcon sx={colorSx} {...getIconSizeProps(16, labelX, labelY)} />
      // <FontAwesomeSvgIcon icon={faCog} {...iconPropsSmall} />
    ) : data?.icon === 'plug' ? (
      <PowerIcon sx={colorSx} {...getIconSizeProps(17, labelX, labelY)} />
    ) : null

  const iconComponent =
    subIconComponent != null ? (
      <>
        <CircleIcon
          x={labelX - 15}
          y={labelY - 15}
          height="30px"
          width="30px"
          sx={{
            color: theme.palette.background.flowEdgeIcon,
            ...(data?.tooltip != null ? { pointerEvents: 'all' } : null),
          }}
        />

        <CircleOutlinedIcon
          x={labelX - 13}
          y={labelY - 13}
          height="26px"
          width="26px"
          sx={{
            color: theme.palette[iconColor].main,
            ...(data?.tooltip != null ? { pointerEvents: 'all' } : null),
          }}
        />

        {subIconComponent}
      </>
    ) : null

  return (
    <>
      <CustomPath
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {iconComponent != null ? (
        data?.tooltip != null ? (
          <Tooltip
            title={data.tooltip}
            enterTouchDelay={0}
            leaveTouchDelay={4000}
            leaveDelay={300}
          >
            <g>{iconComponent}</g>
          </Tooltip>
        ) : (
          iconComponent
        )
      ) : null}
    </>
  )
}
