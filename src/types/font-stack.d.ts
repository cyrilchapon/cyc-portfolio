declare module 'font-stack' {
  type DefaultKnownFamily = 'default'

  type SansSerifKnownFamily =
    | 'Arial'
    | 'Arial Black'
    | 'Arial Narrow'
    | 'Gill Sans'
    | 'Tahoma'
    | 'Verdana'

  type SerifKnownFamily = 'Georgia' | 'Palatino' | 'Times New Roman'

  type MonoKnownFamily = 'Courier New' | 'Lucida Sans Typewriter'

  type FantasyKnownFamily = 'Copperplate' | 'Papyrus'

  type ScriptKnownFamily = 'Brush Script MT'

  type KnownFamily =
    | DefaultKnownFamily
    | SansSerifKnownFamily
    | SerifKnownFamily
    | MonoKnownFamily
    | FantasyKnownFamily
    | ScriptKnownFamily

  export function _escapeFamily(char: string): (family: string) => string
  export function _familyIsUnsafe(family: string): boolean
  export function composeStack(families: string[]): string
  export const FONT_STACKS: Record<KnownFamily, string[]>

  const exportVal = {
    _escapeFamily,
    _familyIsUnsafe,
    composeStack,
    FONT_STACKS,
  }

  export default exportVal
}
