import {
  composeStack as _composeStack,
  FONT_STACKS
} from 'font-stack'

interface FontDefinition {
  link: string
  family: string
  fallback: string[]
  weights: {
    regular: number
    bold: number
  }
}

const sansSerif: FontDefinition = {
  link: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@350;600&display=swap',
  family: 'Work Sans',
  fallback: FONT_STACKS.Tahoma,
  weights: {
    regular: 350,
    bold: 600
  }
}

const mono: FontDefinition = {
  link: 'https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap',
  family: 'Anonymous Pro',
  fallback: FONT_STACKS['Courier New'],
  weights: {
    regular: 400,
    bold: 700
  }
}

export const FONTS = {
  sansSerif,
  mono
}

export const composeStack = (font: FontDefinition) => (
  _composeStack([font.family, ...font.fallback])
)
