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

export const FONTS: Record<FontGender, FontDefinition> = {
  serif: {
    ...andadaPro,
    weights: {
      light: 300,
      regular: 400,
      medium: 550,
      bold: 650,
    },
  },
  sansSerif: {
    ...redHatText,
    weights: {
      light: 280,
      regular: 350,
      medium: 450,
      bold: 600,
    },
  },
  mono: {
    ...redHatMono,
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
}

export type { FontGender, FontDefinition }
