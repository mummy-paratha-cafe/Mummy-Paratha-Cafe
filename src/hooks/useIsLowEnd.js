import { useMemo } from 'react'

export function useIsLowEnd() {
  return useMemo(() => {
    if (typeof navigator === 'undefined') return false
    const memory = navigator.deviceMemory
    return (
      (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4) ||
      (typeof memory === 'number' && memory <= 4) ||
      (typeof window !== 'undefined' &&
        window.matchMedia('(max-width: 600px)').matches &&
        window.matchMedia('(pointer: coarse)').matches)
    )
  }, [])
}
