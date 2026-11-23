const badges = [
  ['✿', 'Fresh Ingredients'],
  ['⌂', 'Homely Food'],
  ['♡', 'Made With Love'],
  ['✧', 'Hygienic Kitchen'],
]

export default function TrustStrip() {
  return (
    <section className="trust-strip" id="trust">
      <div className="trust-inner">
        {badges.map(([icon, label]) => <div key={label}><span>{icon}</span>{label}</div>)}
      </div>
    </section>
  )
}
