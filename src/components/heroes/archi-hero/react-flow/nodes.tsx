import { Edge, Node, Position } from 'reactflow'
import { CustomNode, CustomNodeData } from './custom-node'

export const deskNodes: Node<CustomNodeData>[] = [
  {
    id: 'github',
    data: {
      label: 'Github',
      providerType: 'github',
      tooltip: 'Le code source est hébergé sur Github',
      color: 'primary',
    },
    position: { x: 125, y: 0 },
    type: 'customNodeSource',
    sourcePosition: Position.Right,
  },
  {
    id: 'medium',
    data: {
      label: 'Medium',
      providerType: 'medium',
      tooltip: 'Les articles sont hébergés sur Medium',
      color: 'primary',
    },
    position: { x: 0, y: 100 },
    type: 'customNodeSource',
    sourcePosition: Position.Right,
  },
  {
    id: 'make',
    data: {
      label: 'Make',
      providerType: 'make',
      tooltip:
        'Un scénario Make.com automatise le déploiement à chaque changement sur mon espace Medium',
      color: 'primary',
    },
    position: { x: 250, y: 100 },
    type: 'customNode',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'vercel',
    data: {
      label: 'Vercel',
      providerType: 'vercel',
      tooltip:
        "Vercel déclenche un build du site web lorsqu'il en reçoit l'ordre",
      color: 'info',
    },
    position: { x: 550, y: 0 },
    type: 'customNode',
    targetPosition: Position.Left,
  },
  {
    id: 'web',
    data: {
      label: 'Website',
      providerType: 'web',
      tooltip: <>Le site web est à jour 🙂<br />Vous l'avez sous les yeux !</>,
      color: 'secondary',
    },
    position: { x: 550, y: 100 },
    type: 'customNodeTarget',
    targetPosition: Position.Top,
  },
]

export const mobileNodes: Node<CustomNodeData>[] = [
  {
    id: 'github',
    data: { label: 'Github', providerType: 'github', color: 'primary' },
    position: { x: 0, y: 100 },
    type: 'customNodeSource',
    sourcePosition: Position.Bottom,
  },
  {
    id: 'medium',
    data: { label: 'Medium', providerType: 'medium', color: 'primary' },
    position: { x: 150, y: 0 },
    type: 'customNodeSource',
    sourcePosition: Position.Bottom,
  },
  {
    id: 'make',
    data: { label: 'Make', providerType: 'make', color: 'primary' },
    position: { x: 150, y: 200 },
    type: 'customNode',
    sourcePosition: Position.Left,
    targetPosition: Position.Top,
  },
  {
    id: 'vercel',
    data: { label: 'Vercel', providerType: 'vercel', color: 'info' },
    position: { x: 0, y: 300 },
    type: 'customNode',
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'web',
    data: { label: 'Website', providerType: 'web', color: 'secondary' },
    position: { x: 150, y: 400 },
    type: 'customNodeTarget',
    targetPosition: Position.Left,
  },
]

export const edges: Edge[] = [
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
    animated: false,
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
    animated: false,
  },
]

export const nodeTypes = {
  customNode: CustomNode,
  customNodeSource: CustomNode,
  customNodeTarget: CustomNode,
}
