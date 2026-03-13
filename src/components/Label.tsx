interface LabelProps {
  text: string
  color?: string
}

export default function Label({ text, color = 'var(--unframer-accent-blue)' }: LabelProps) {
  return (
    <div className="w-fit" style={{ backgroundColor: color, padding: '8px' }}>
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontWeight: 300,
          fontSize: '16px',
          lineHeight: '1.2em',
          letterSpacing: '-0.04em',
        }}
      >
        {text}
      </span>
    </div>
  )
}
