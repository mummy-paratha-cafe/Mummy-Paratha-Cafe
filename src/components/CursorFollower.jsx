import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function CursorFollower() {
  const cursor = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined

    const move = (event) => {
      if (!cursor.current) return
      cursor.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      cursor.current.classList.add('cursor-follower--visible')
    }
    const hide = () => cursor.current?.classList.remove('cursor-follower--visible')
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', hide)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', hide)
    }
  }, [reducedMotion])

  return <span ref={cursor} className="cursor-follower" aria-hidden="true" />
}
