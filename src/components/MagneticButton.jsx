import { useRef } from 'react'

export default function MagneticButton({ href, children, className = '' }) {
  const ref = useRef(null)

  const move = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !ref.current) return
    const bounds = ref.current.getBoundingClientRect()
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.08
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.08
    ref.current.style.transform = `translate(${x}px, ${y}px)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return <a ref={ref} className={className} href={href} onPointerMove={move} onPointerLeave={reset}>{children}</a>
}
