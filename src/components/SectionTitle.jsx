export default function SectionTitle({ eyebrow, children, description, centered = false }) {
  return (
    <div className={`section-title${centered ? ' section-title--center' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{children}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}
