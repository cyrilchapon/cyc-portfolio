import { urls } from '$constants'
import { Link } from '@mui/material'
import { Edge, Node, Position } from 'reactflow'
import { CustomEdge, CustomEdgeData } from './custom-edge'
import { CustomNode, CustomNodeData } from './custom-node'

type NodeType = 'github' | 'medium' | 'make' | 'vercel' | 'web'

type BaseNode = Omit<
  Node<CustomNodeData>,
  'position' | 'sourcePosition' | 'targetPosition'
>

const baseNodes: Record<NodeType, BaseNode> = {
  github: {
    id: 'github',
    data: {
      label: 'Github',
      providerType: 'github',
      tooltip: (
        <>
          Le code source est hébergé sur <em>Github</em>. Il est Open Source,{' '}
          <Link href={urls.githubRepo} target="_blank">
            Allez y faire un tour !
          </Link>
        </>
      ),
      color: 'primary',
    },
    type: 'customNodeSource',
  },
  medium: {
    id: 'medium',
    data: {
      label: 'Medium',
      providerType: 'medium',
      tooltip: (
        <>
          J'écris des articles, hébergés sur <em>Medium</em>.{' '}
          <Link href={urls.medium} target="_blank">
            Allez en lire quelques uns !
          </Link>
        </>
      ),
      color: 'primary',
    },
    type: 'customNodeSource',
  },
  make: {
    id: 'make',
    data: {
      label: 'Make',
      providerType: 'make',
      tooltip: (
        <>
          <em>Make.com</em> — puissant outil d'automation — fait le lien entre{' '}
          <em>Medium</em> et <em>Vercel</em>
        </>
      ),
      color: 'info',
    },
    type: 'customNode',
  },
  vercel: {
    id: 'vercel',
    data: {
      label: 'Vercel',
      providerType: 'vercel',
      tooltip: (
        <>
          J'utilise <em>Vercel</em> pour builder et héberger. C'est un hébergeur
          novateur pilotable par API et conçu pour les Static Apps
        </>
      ),
      color: 'info',
    },
    type: 'customNode',
  },
  web: {
    id: 'web',
    data: {
      label: 'Website',
      providerType: 'web',
      tooltip: (
        <>
          Le site web est à jour 🙂
          <br />
          Vous l'avez sous les yeux !
        </>
      ),
      color: 'secondary',
    },
    type: 'customNodeTarget',
  },
}

export const deskNodes: Node<CustomNodeData>[] = [
  {
    ...baseNodes.github,
    position: { x: 150, y: 0 },
    sourcePosition: Position.Right,
  },
  {
    ...baseNodes.medium,
    position: { x: 0, y: 150 },
    sourcePosition: Position.Right,
  },
  {
    ...baseNodes.make,
    position: { x: 300, y: 150 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    ...baseNodes.vercel,
    position: { x: 600, y: 0 },
    targetPosition: Position.Left,
  },
  {
    ...baseNodes.web,
    position: { x: 600, y: 150 },
    targetPosition: Position.Top,
  },
]

export const mobileNodes: Node<CustomNodeData>[] = [
  {
    ...baseNodes.github,
    position: { x: 0, y: 100 },
    sourcePosition: Position.Bottom,
  },
  {
    ...baseNodes.medium,
    position: { x: 150, y: 0 },
    sourcePosition: Position.Bottom,
  },
  {
    ...baseNodes.make,
    position: { x: 150, y: 200 },
    sourcePosition: Position.Left,
    targetPosition: Position.Top,
  },
  {
    ...baseNodes.vercel,
    position: { x: 0, y: 300 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    ...baseNodes.web,
    position: { x: 150, y: 400 },
    targetPosition: Position.Left,
  },
]

export const edges: Edge<CustomEdgeData>[] = [
  {
    id: 'medium-make',
    source: 'medium',
    target: 'make',
    data: {
      icon: 'plug',
      tooltip: (
        <>
          À chaque changement sur mon espace <em>Medium</em>, un{' '}
          <strong>webhook</strong> est intercepté par <em>Make</em>
        </>
      ),
    },
    // label: 'watch',
    type: 'customEdge',
    animated: true,
  },
  {
    id: 'make-vercel',
    source: 'make',
    target: 'vercel',
    // label: 'deploy',
    data: {
      icon: 'bolt',
      tooltip: (
        <>
          <em>Make</em> ordonne un deploy à <em>Vercel</em> à l'aide d'un{' '}
          <strong>appel&nbsp;API</strong>
        </>
      ),
    },
    type: 'customEdge',
    animated: false,
  },
  {
    id: 'github-vercel',
    source: 'github',
    target: 'vercel',
    // label: 'deploy hook',
    data: {
      icon: 'bolt',
      tooltip: (
        <>
          À chaque push sur la branche de prod, un{' '}
          <strong>deploy&nbsp;hook</strong> ordonne un deploy Vercel
        </>
      ),
    },
    type: 'customEdge',
    animated: true,
  },
  {
    id: 'vercel-web',
    source: 'vercel',
    target: 'web',
    // label: 'deploy hook',
    data: {
      icon: 'cog',
      tooltip: (
        <>
          <em>Vercel</em> vérifie l'intégrité du code, lance les tests, build et
          met en ligne
        </>
      ),
    },
    type: 'customEdge',
    animated: false,
  },
]

export const nodeTypes = {
  customNode: CustomNode,
  customNodeSource: CustomNode,
  customNodeTarget: CustomNode,
}

export const edgeTypes = {
  customEdge: CustomEdge,
}
