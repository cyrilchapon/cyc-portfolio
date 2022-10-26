import { composeStack as _composeStack, FONT_STACKS } from "font-stack";

type FontGender = "sansSerif" | "serif" | "mono";

interface FontDefinition {
  link: string;
  family: string;
  fallback: string[];
  weights: {
    light: number;
    regular: number;
    medium: number;
    bold: number;
  };
  gender: FontGender;
}

const fontDefinitions: {
  vollkorn: FontDefinition;
  andadaPro: FontDefinition;
  redHatText: FontDefinition;
  workSans: FontDefinition;
  quicksand: FontDefinition;
  anonymousPro: FontDefinition;
} = {
  vollkorn: {
    link: "https://fonts.googleapis.com/css2?family=Vollkorn:wght@300;400;550;650&display=swap",
    family: "Vollkorn",
    fallback: FONT_STACKS.Arial,
    weights: {
      light: 300,
      regular: 400,
      medium: 550,
      bold: 650,
    },
    gender: "serif",
  },
  andadaPro: {
    link: "https://fonts.googleapis.com/css2?family=Andada+Pro:wght@300;400;550;650&display=swap",
    family: "Andada Pro",
    fallback: FONT_STACKS.Arial,
    weights: {
      light: 300,
      regular: 400,
      medium: 550,
      bold: 650,
    },
    gender: "serif",
  },
  redHatText: {
    link: "https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@280;350;450;600&display=swap",
    family: "Red Hat Text",
    fallback: FONT_STACKS.Tahoma,
    weights: {
      light: 280,
      regular: 350,
      medium: 450,
      bold: 600,
    },
    gender: "sansSerif",
  },
  workSans: {
    link: "https://fonts.googleapis.com/css2?family=Work+Sans:wght@280;350;450;600&display=swap",
    family: "Work Sans",
    fallback: FONT_STACKS.Tahoma,
    weights: {
      light: 280,
      regular: 350,
      medium: 450,
      bold: 600,
    },
    gender: "sansSerif",
  },
  quicksand: {
    link: "https://fonts.googleapis.com/css2?family=Quicksand:wght@300;450;550;700&display=swap",
    family: "Quicksand",
    fallback: FONT_STACKS.Tahoma,
    weights: {
      light: 300,
      regular: 450,
      medium: 550,
      bold: 700,
    },
    gender: "sansSerif",
  },
  anonymousPro: {
    link: "https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@300;400;500;700&display=swap",
    family: "Anonymous Pro",
    fallback: FONT_STACKS["Courier New"],
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
    gender: "mono",
  },
};

const serif = fontDefinitions.andadaPro;
const sansSerif = fontDefinitions.redHatText;
const mono = fontDefinitions.anonymousPro;

export const FONTS: Record<FontGender, FontDefinition> = {
  serif,
  sansSerif,
  mono,
};

export const composeStack = (font: FontDefinition) =>
  _composeStack([font.family, ...font.fallback]);

export type { FontGender, FontDefinition };
