import { FontAwesomeSvgIcon } from '$components/icons/font-awesome-svg-icon'
import { faGithub, faMedium } from '@fortawesome/free-brands-svg-icons'
import { Stack, styled, SvgIcon, SvgIconProps } from '@mui/material'
import React, { FunctionComponent, ReactNode } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import MakeSvg from '../../../constants/make.svg'
import VercelSvg from '../../../constants/vercel.svg'
import WebAssetIcon from '@mui/icons-material/WebAsset'

const MakeIcon: FunctionComponent<SvgIconProps> = (props) => (
  <SvgIcon
    {...props}
    inheritViewBox
    component={MakeSvg}
  />
)

const VercelIcon: FunctionComponent<SvgIconProps> = (props) => (
  <SvgIcon
    {...props}
    inheritViewBox
    component={VercelSvg}
  />
)

const StyledNode = styled('div')((props) => ({
  padding: '10px 20px',
  borderRadius: props.theme.shape.borderRadius,
  background: props.theme.palette.background.flowNode,
  color: props.theme.palette.text.primary,
  border: `1px solid ${props.theme.palette.primary.main}`,
  textAlign: 'left',
  width: '180px',
  '.react-flow__handle': {
    background: props.theme.palette.primary.main,
    borderColor: props.theme.palette.primary.contrastText,
    width: '8px',
    height: '8px',
    borderRadius: '4px',
  },
}))

export type CustomNodeData = {
  label: ReactNode
  providerType: 'medium' | 'github' | 'make' | 'vercel' | 'web'
}

export type CustomNodeProps = NodeProps<CustomNodeData>

const providerIcons: Record<CustomNodeData['providerType'], ReactNode> = {
  medium: <FontAwesomeSvgIcon icon={faMedium} fontSize="small" sx={{}} />,
  github: <FontAwesomeSvgIcon icon={faGithub} fontSize="small" sx={{}} />,
  make: <MakeIcon fontSize="small" sx={{}} />,
  vercel: <VercelIcon fontSize="small" sx={{ transform: 'scale(0.9)' }} />,
  web: <WebAssetIcon sx={{}} />
}

const CustomNode: FunctionComponent<CustomNodeProps> = ({
  data,
  type = 'customNode',
  sourcePosition = Position.Bottom,
  targetPosition = Position.Top,
  ...rest
}) => {
  const Icon = providerIcons[data.providerType]

  return (
    <StyledNode {...rest}>
      {type === 'customNodeTarget' || type === 'customNode' ? (
        <Handle type="target" position={targetPosition} />
      ) : null}

      <Stack direction="row" spacing={2} alignItems='center'>
        {Icon}
        <strong>{data.label}</strong>
      </Stack>

      {type === 'customNodeSource' || type === 'customNode' ? (
        <Handle type="source" position={sourcePosition} />
      ) : null}
    </StyledNode>
  )
}

export { CustomNode }
