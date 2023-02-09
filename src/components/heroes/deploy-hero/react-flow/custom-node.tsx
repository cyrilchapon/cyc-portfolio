import { FontAwesomeSvgIcon } from '$components/icons/font-awesome-svg-icon'
import { faGithub, faMedium } from '@fortawesome/free-brands-svg-icons'
import {
  Box,
  BoxProps,
  Stack,
  styled,
  SvgIcon,
  SvgIconProps,
} from '@mui/material'
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  FunctionComponent,
  ReactNode,
} from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import MakeSvg from '../../../../constants/make.svg'
import VercelSvg from '../../../../constants/vercel.svg'
import WebAssetIcon from '@mui/icons-material/WebAsset'
import { Tooltip } from '$components/tooltip'

const MakeIcon: FunctionComponent<SvgIconProps> = (props) => (
  <SvgIcon {...props} inheritViewBox component={MakeSvg} />
)

const VercelIcon: FunctionComponent<SvgIconProps> = (props) => (
  <SvgIcon {...props} inheritViewBox component={VercelSvg} />
)

type NodeColor = 'primary' | 'secondary' | 'info'

type BaseNodeProps = BoxProps & {
  nodeColor: NodeColor
}
const BaseNode: ForwardRefExoticComponent<BaseNodeProps> = forwardRef(
  ({ children, ...props }, ref) => (
    <Box ref={ref} {...props}>
      {children}
    </Box>
  ),
)

const StyledNode = styled(BaseNode, {
  shouldForwardProp: (p) => p !== 'nodeColor',
})(({ theme, nodeColor }) => ({
  padding: '10px 20px',
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.background.flowNode,
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette[nodeColor].main}`,
  textAlign: 'left',
  width: '180px',
  '.react-flow__handle': {
    background: theme.palette[nodeColor].main,
    borderColor: theme.palette.text.primary,
    width: '8px',
    height: '8px',
    borderRadius: '4px',
  },
}))

export type CustomNodeData = {
  label: ReactNode
  providerType: 'medium' | 'github' | 'make' | 'vercel' | 'web'
  tooltip?: ReactNode
  color: NodeColor
}

export type CustomNodeProps = NodeProps<CustomNodeData>

const providerIcons: Record<CustomNodeData['providerType'], ReactNode> = {
  medium: <FontAwesomeSvgIcon icon={faMedium} fontSize="small" sx={{}} />,
  github: <FontAwesomeSvgIcon icon={faGithub} fontSize="small" sx={{}} />,
  make: <MakeIcon fontSize="small" sx={{}} />,
  vercel: <VercelIcon fontSize="small" sx={{ transform: 'scale(0.9)' }} />,
  web: <WebAssetIcon sx={{}} />,
}

const CustomNode: FunctionComponent<CustomNodeProps> = ({
  data,
  type = 'customNode',
  sourcePosition = Position.Bottom,
  targetPosition = Position.Top,
  // ...rest
}) => {
  const Icon = providerIcons[data.providerType]

  const nodeComponent = (
    <StyledNode
      // {...rest}
      nodeColor={data.color}
      style={{
        ...(data.tooltip != null
          ? {
              pointerEvents: 'all',
              cursor: 'pointer',
            }
          : {}),
      }}
    >
      {type === 'customNodeTarget' || type === 'customNode' ? (
        <Handle type="target" position={targetPosition} />
      ) : null}

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="flex-start"
        sx={{ width: '100%' }}
      >
        {/* <Typography
          component={Stack}
          color={`${data.color}.main`}
          direction="row"
          alignItems="center"
        >
          {Icon}
        </Typography> */}
        {Icon}
        <strong>{data.label}</strong>
      </Stack>

      {type === 'customNodeSource' || type === 'customNode' ? (
        <Handle type="source" position={sourcePosition} />
      ) : null}
    </StyledNode>
  )

  return data.tooltip != null ? (
    <Tooltip
      title={data.tooltip}
      enterTouchDelay={0}
      leaveTouchDelay={4000}
      leaveDelay={300}
    >
      {nodeComponent}
    </Tooltip>
  ) : (
    nodeComponent
  )
}

export { CustomNode }
