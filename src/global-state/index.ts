import { createGlobalState } from 'react-hooks-global-state'

const initialState = { subscribeModalOpen: false }
const { useGlobalState, getGlobalState, setGlobalState } = createGlobalState(initialState)

export {
  useGlobalState,
  getGlobalState,
  setGlobalState
}
