import { useMemo, useState } from 'react'

export default function SafeImage({ srcBase, extensions = ['.jpg','.png','.webp','.svg'], fallback = '/poster-fallback.jpg', alt = '', className = '', style = {} }) {
  const sources = useMemo(() => extensions.map(ext => `${srcBase}${ext}`), [srcBase, extensions])
  const [idx, setIdx] = useState(0)
  const [src, setSrc] = useState(sources[0] || fallback)
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => {
        const next = idx + 1
        if (next < sources.length) { setIdx(next); setSrc(sources[next]) } else { setSrc(fallback) }
      }}
    />
  )
}
