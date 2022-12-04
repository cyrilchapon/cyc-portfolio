import { Andada_Pro, Red_Hat_Text, Red_Hat_Mono } from '@next/font/google'
import { NextFont } from '@next/font/dist/types'

const andadaPro = Andada_Pro({
  display: 'swap',
  preload: true,
  subsets: ['latin', 'latin-ext'],
  fallback: ['Arial', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
  adjustFontFallback: true,
})

const redHatText = Red_Hat_Text({
  display: 'swap',
  preload: true,
  subsets: ['latin', 'latin-ext'],
  fallback: ['Tahoma', 'Verdana', 'Segoe', 'sans-serif'],
  adjustFontFallback: true,
})

const redHatMono = Red_Hat_Mono({
  display: 'swap',
  preload: true,
  subsets: ['latin', 'latin-ext'],
  fallback: ['Courier New', 'Courier', 'Lucida Sans Typewriter', 'Lucida Typewriter', 'monospace'],
  adjustFontFallback: true,
})

type FontGender = 'sansSerif' | 'serif' | 'mono'

type FontDefinition = NextFont & {
  weights: {
    light: number
    regular: number
    medium: number
    bold: number
  }
}

const fontDefinitions: {
  andadaPro: FontDefinition
  redHatText: FontDefinition
  redHatMono: FontDefinition
} = {
  andadaPro: {
    ...andadaPro,
    weights: {
      light: 300,
      regular: 400,
      medium: 550,
      bold: 650,
    },
  },
  redHatText: {
    ...redHatText,
    weights: {
      light: 280,
      regular: 350,
      medium: 450,
      bold: 600,
    },
  },
  redHatMono: {
    ...redHatMono,
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
}

const serif = fontDefinitions.andadaPro
const sansSerif = fontDefinitions.redHatText
const mono = fontDefinitions.redHatMono

export const FONTS: Record<FontGender, FontDefinition> = {
  serif,
  sansSerif,
  mono,
}

export type { FontGender, FontDefinition }
