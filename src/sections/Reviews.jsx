import { useEffect, useState } from 'react'
import { reviews } from '../data/reviews'
import SectionTitle from '../components/SectionTitle'

export default function Reviews() {
  const [active, setActive] = useState(0)
  const [touchStart, setTouchStart] = useState(null)

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % reviews.length), 6000)
    return () => window.clearInterval(timer)
  }, [])

  const review = reviews[active]
  return (
    <section className="section reviews-section" id="reviews">
      <div className="section-wrap review-content">
        <SectionTitle eyebrow="KIND WORDS, WARM HEARTS" centered>Good food makes <em>memories</em></SectionTitle>
        <div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>★★★★★</div>
        <blockquote
          onTouchStart={(event) => setTouchStart(event.changedTouches[0].clientX)}
          onTouchEnd={(event) => {
            if (touchStart === null) return
            const distance = event.changedTouches[0].clientX - touchStart
            if (Math.abs(distance) > 40) setActive((current) => (current + (distance < 0 ? 1 : reviews.length - 1)) % reviews.length)
            setTouchStart(null)
          }}
        >“{review.quote}”</blockquote>
        <span className="review-author">{review.name}</span>
        <div className="review-dots" role="group" aria-label="Choose a review">{reviews.map((entry, index) => <button key={entry.name} type="button" className={index === active ? 'active' : ''} onClick={() => setActive(index)} aria-label={`Show review ${index + 1}`} />)}</div>
        <small className="review-note">Sample reviews — replace with real customer feedback.</small>
      </div>
    </section>
  )
}
