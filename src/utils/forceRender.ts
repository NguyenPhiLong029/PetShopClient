import { DispatchWithoutAction, useEffect, useReducer, useRef } from 'react'

export const useForceRender = (): DispatchWithoutAction => {
  const mounted = useRef(false)
  const [, forceRender] = useReducer((x) => x + 1, 0)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return () => {
    if (mounted.current) {
      forceRender()
    }
  }
}

export default useForceRender
