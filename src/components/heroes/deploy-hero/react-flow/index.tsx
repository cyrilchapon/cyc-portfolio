import { useResponsive } from '$styles'
import { styled } from '@mui/material'
import { FunctionComponent, useEffect } from 'react'
import ReactFlow, { Background, FitViewOptions, ReactFlowProps, useReactFlow } from 'reactflow'
import { CustomNodeData } from './custom-node'
import { deskNodes, edges, edgeTypes, mobileNodes, nodeTypes } from './nodes'

import 'reactflow/dist/style.css'

const StyledReactFlow = styled(ReactFlow)({
  '.react-flow__attribution': {
    display: 'none',
  },
})

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
  minZoom: 0.2,
  maxZoom: 2,
}

type CustomReactFlowProps = ReactFlowProps & {
  parentWidth: number | null
  parentHeight: number | null
}

const CustomReactFlow: FunctionComponent<CustomReactFlowProps> = ({ parentWidth, parentHeight, ...props }) => {
  const r = useResponsive()
  const nodes = r(
    {
      xs: mobileNodes,
      md: deskNodes,
    },
    deskNodes,
  )

  const reactFlow = useReactFlow<CustomNodeData>()
  useEffect(() => {
    reactFlow.fitView(fitViewOptions)
  }, [reactFlow, parentWidth, parentHeight])

  return (
    <StyledReactFlow
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      nodes={nodes}
      edges={edges}
      zoomOnScroll={false}
      panOnDrag={false}
      zoomOnDoubleClick={false}
      zoomOnPinch={false}
      preventScrolling={false}
      nodesDraggable={false}
      elementsSelectable={false}
      edgesFocusable={false}
      nodesConnectable={false}
      fitView={fitViewOptions != null}
      fitViewOptions={fitViewOptions}
      {...props}
    >
      <Background />
    </StyledReactFlow>
  )
}

export { CustomReactFlow }
