export default function SmokeWave({ className = '' }) {
  return (
    <div className={`smoke-wave ${className}`.trim()} aria-hidden="true">
      <img className="smoke-wave-image" src="/images/smoke-wave.png" alt="" />
    </div>
  )
}
