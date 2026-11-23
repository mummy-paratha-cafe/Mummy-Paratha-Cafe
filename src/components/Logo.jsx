import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CONFIG } from '../config'

export default function Logo({ compact = false }) {
  const [imgError, setImgError] = useState(false)

  return (
    <Link to="/" className={`brand-lockup${compact ? ' brand-lockup--compact' : ''}`} aria-label={CONFIG.name}>
      <div className="brand-row">
        {!imgError && (
          <img
            src="/images/brand-mascot.webp"
            alt="Cafe chef mascot holding a rolling pin"
            className="brand-mascot"
            onError={() => setImgError(true)}
            width={compact ? 36 : 46}
            height={compact ? 36 : 46}
          />
        )}
        <div className="brand-col">
          <span className="brand-script">
            <span className="brand-script-orange">Mummy</span>{' '}
            <span className="brand-script-white">Paratha</span>
          </span>
          <div className="brand-meta-row">
            <span className="brand-cafe">&amp; CAFE</span>
            {!compact && <span className="brand-tagline">{CONFIG.tagline}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}
