declare module 'react-typed' {
  import * as React from 'react'

  type Typed = any

  export interface ReactTypedProps {
    style?: object,
    className?: '',
    children?: any,
    typedRef?: React.RefCallback<Typed>,
    stopped?: boolean,
    strings?: string[],
    stringsElement?: string,
    typeSpeed?: number,
    startDelay?: number,
    backSpeed?: number,
    smartBackspace?: boolean,
    shuffle?: boolean,
    backDelay?: number,
    fadeOut?: boolean,
    fadeOutClass?: string,
    fadeOutDelay?: number,
    loop?: boolean,
    loopCount?: number,
    showCursor?: boolean,
    cursorChar?: string,
    autoInsertCss?: boolean,
    attr?: string,
    bindInputFocusEvents?: boolean,
    contentType?: 'html' | null,
    onComplete?: (typed: Typed) => void,
    preStringTyped?: (arrayPos: number, typed: Typed) => void,
    onStringTyped?: (arrayPos: number, typed: Typed) => void,
    onLastStringBackspaced?: (typed: Typed) => void,
    onTypingPaused?: (arrayPos: number, typed: Typed) => void,
    onTypingResumed?: (arrayPos: number, typed: Typed) => void,
    onReset?: (typed: Typed) => void,
    onStop?: (arrayPos: number, typed: Typed) => void,
    onStart?: (arrayPos: number, typed: Typed) => void,
    onDestroy?: (typed: Typed) => void
  }

  class ReactTyped extends React.Component<ReactTypedProps> {}
  export default ReactTyped
  // export default 
}
