import { Theme } from './theme'
import emotionNormalize from 'emotion-normalize'
import emotionReset from 'emotion-reset'
import { css } from '@emotion/core'

export const reset = (theme: Theme) => emotionReset
export const normalize = (theme: Theme) => emotionNormalize

export const globalStyles = (theme: Theme) => css`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    line-height: ${theme.typography.text.kilo.lineHeight};
  }

  html,
  body,
  /* Plus form elements that don't inherit font settings. */
  /* https://stackoverflow.com/questions/26140050/why-is-font-family-not-inherited-in-button-tags-automatically */
  input,
  select,
  optgroup,
  textarea,
  button {
    font-family: ${theme.fontStack.default};
    font-weight: ${theme.fontWeight.regular};
    font-size: ${theme.typography.text.kilo.fontSize};
  }
`
