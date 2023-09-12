import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import TimelineIcon from '@mui/icons-material/Timeline'
import { SvgIcon } from '@mui/material'
import { faLaptopCode, faUserNinja } from '@fortawesome/free-solid-svg-icons'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import urls from './urls'

export type ServiceIconType = 'material' | 'font-awesome'

export interface ServiceMaterialIcon {
  type: 'material'
  iconComponent: typeof SvgIcon
}

export interface ServiceFontAwesomeIcon {
  type: 'font-awesome'
  icon: IconDefinition
}

export type ServiceIcon = ServiceMaterialIcon | ServiceFontAwesomeIcon

export type ServiceFeature = {
  name: string
  description?: string
}

export interface Service {
  title: string
  subtitle: string
  icon: ServiceIcon
  features: ServiceFeature[]
}

export const services: Service[] = [
  {
    title: 'CTO as a service',
    subtitle: 'Stratégie tech',
    icon: {
      type: 'font-awesome',
      icon: faUserNinja,
    },
    features: [
      {
        name: 'Architecture technique',
        description: `
Conception d'**architectures techniques**
adaptées au contexte et évolutives.
        `,
      },
      {
        name: 'Choix des technologies',
        description: `
Sélection pragmatique des **outils SAAS**
et **technologies** les plus pertinentes.

[En savoir plus](${urls.stackshare})
        `,
      },
      {
        name: 'Méthodologie projet',
        description: `
Mise en place et évangélisation de
**méthodologies agiles**.
Implémentation des rôles,
des cérémonies et des outils.
        `,
      },
      {
        name: 'Plan RH & prestation',
        description: `
Planning des **prestations** et
recrutement des **profils** 
adaptés aux projets.
        `,
      },
    ],
  },
  {
    title: 'CPO as a service',
    subtitle: 'Stratégie produit',
    icon: {
      type: 'material',
      iconComponent: PrecisionManufacturingIcon,
    },
    features: [
      {
        name: 'Business modeling',
        description: `
Analyse et challenge de **Business Model**
(Revenue Model & Distribution Model).
        `,
      },
      {
        name: 'Milestones',
        description: `
Définition des grands **objectifs**
de développement Business et Marketing.
        `,
      },
      {
        name: 'Roadmap produit',
        description: `
Définition et **conception** des produits.
**Découpage** en projets, **planification**
synchronisée avec les objectifs.
        `,
      },
      {
        name: 'Scalabilité',
        description: `
Identification des **goulets**,
définition des **process** et standards, **automatisation**.
        `,
      },
    ],
  },
  {
    title: 'Tech lead',
    subtitle: 'Opérationnel',
    icon: {
      type: 'font-awesome',
      icon: faLaptopCode,
    },
    features: [
      {
        name: 'Dev. fullstack',
        description: `
**Backend** & **frontend**, stockage de la donnée. Build & deploy. Automatisation.

[En savoir plus](${urls.stackshare})
        `,
      },
      {
        name: 'Tech lead',
        description: `
Animation d'équipe, **conception** technique,
pédagogie et **code-reviews**,
        `,
      },
      {
        name: 'Scrum Mastering',
        description: `
**Gestion de projet** technique, facilitation
et **évangélisation** des pratiques agile.
        `,
      },
      {
        name: 'Product Ownership',
        description: `
**Gestion de produit**, découpage
et **spécification** des sprints
jusqu'aux user-stories,
arbitrages et reviews.
        `,
      },
    ],
  },
]
