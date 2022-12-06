import { Hero, HeroProps } from '$components/hero'
import { styled } from '@mui/material'
// import { useResponsive } from '$styles/media-query'
// import { Container } from '@mui/material'
import {
  forwardRef,
  ForwardRefExoticComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import ReactFlow, {
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  FitViewOptions,
  EdgeChange,
  NodeChange,
  Node,
  Edge,
  Position,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { CustomNode, CustomNodeData } from './custom-node'
import { useResizeDetector } from 'react-resize-detector'
import { useResponsive } from '$styles'

const StyledReactFlow = styled(ReactFlow)({
  '.react-flow__attribution': {
    display: 'none',
  },
})

const deskNodes: Node<CustomNodeData>[] = [
  {
    id: 'github',
    data: { label: 'Github', providerType: 'github' },
    position: { x: 125, y: 0 },
    type: 'customNodeSource',
    sourcePosition: Position.Right,
  },
  {
    id: 'medium',
    data: { label: 'Medium', providerType: 'medium' },
    position: { x: 0, y: 100 },
    type: 'customNodeSource',
    sourcePosition: Position.Right,
  },
  {
    id: 'make',
    data: { label: 'Make', providerType: 'make' },
    position: { x: 250, y: 100 },
    type: 'customNode',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'vercel',
    data: { label: 'Vercel', providerType: 'vercel' },
    position: { x: 550, y: 0 },
    type: 'customNode',
    targetPosition: Position.Left,
  },
  {
    id: 'web',
    data: { label: 'Website', providerType: 'web' },
    position: { x: 550, y: 100 },
    type: 'customNodeTarget',
    targetPosition: Position.Top,
  },
]

const mobileNodes: Node<CustomNodeData>[] = [
  {
    id: 'github',
    data: { label: 'Github', providerType: 'github' },
    position: { x: 0, y: 100 },
    type: 'customNodeSource',
    sourcePosition: Position.Bottom,
  },
  {
    id: 'medium',
    data: { label: 'Medium', providerType: 'medium' },
    position: { x: 150, y: 0 },
    type: 'customNodeSource',
    sourcePosition: Position.Bottom,
  },
  {
    id: 'make',
    data: { label: 'Make', providerType: 'make' },
    position: { x: 150, y: 200 },
    type: 'customNode',
    sourcePosition: Position.Left,
    targetPosition: Position.Top,
  },
  {
    id: 'vercel',
    data: { label: 'Vercel', providerType: 'vercel' },
    position: { x: 0, y: 300 },
    type: 'customNode',
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'web',
    data: { label: 'Website', providerType: 'web' },
    position: { x: 150, y: 400 },
    type: 'customNodeTarget',
    targetPosition: Position.Left,
  },
]

const edges: Edge[] = [
  {
    id: 'medium-make',
    source: 'medium',
    target: 'make',
    // label: 'watch',
    type: 'simplebezier',
    animated: true,
  },
  {
    id: 'make-vercel',
    source: 'make',
    target: 'vercel',
    // label: 'deploy',
    type: 'simplebezier',
    animated: true,
  },
  {
    id: 'github-vercel',
    source: 'github',
    target: 'vercel',
    // label: 'deploy hook',
    type: 'simplebezier',
    animated: true,
  },
  {
    id: 'vercel-web',
    source: 'vercel',
    target: 'web',
    // label: 'deploy hook',
    type: 'simplebezier',
    animated: true,
  },
]

function useForwardedRef<T>(ref: React.ForwardedRef<T>) {
  const innerRef = useRef<T>(null)

  useEffect(() => {
    if (!ref) return
    if (typeof ref === 'function') {
      ref(innerRef.current)
    } else {
      ref.current = innerRef.current
    }
  })

  return innerRef
}

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
  minZoom: 0.6,
  maxZoom: 1,
}

export const _ArchiHero: ForwardRefExoticComponent<HeroProps> = forwardRef(
  (props, ref) => {
    const nodeTypes = useMemo(
      () => ({
        customNode: CustomNode,
        customNodeSource: CustomNode,
        customNodeTarget: CustomNode,
      }),
      [],
    )

    const r = useResponsive()

    const nodes = r({
      xs: mobileNodes,
      md: deskNodes,
    }, deskNodes)

    const innerRef = useForwardedRef(ref)

    const { width: heroWidth, height: heroHeight } = useResizeDetector({
      targetRef: innerRef,
    })

    const reactFlow = useReactFlow<CustomNodeData>()
    useEffect(() => {
      reactFlow.fitView(fitViewOptions)
    }, [reactFlow, heroWidth, heroHeight])

    return (
      <>
        <Hero
          bgcolor="transparent"
          ref={innerRef}
          {...props}
          style={{ height: '100vh' }}
        >
          <StyledReactFlow
            nodeTypes={nodeTypes}
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
          >
            <Background />
            {/* <Controls showInteractive={false} /> */}
          </StyledReactFlow>
        </Hero>
      </>
    )
  },
)

export const ArchiHero: ForwardRefExoticComponent<HeroProps> = forwardRef(
  (props, ref) => (
    <ReactFlowProvider>
      <_ArchiHero ref={ref} {...props}/>
    </ReactFlowProvider>
  )
)
