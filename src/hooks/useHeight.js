import { useLayoutEffect, useState } from 'react'

export default function useHeight(ref) {
  const [maxHeight, setMaxHeight] = useState(undefined)

  useLayoutEffect(() => {
    const el = ref.current
    const originals = {
      className: el.className,
      transition: el.style.transition,
    }
    el.style.transition = 'none'
    el.className = ''
    const height = el.getBoundingClientRect().height
    el.className = originals.className
    el.style.transition = originals.transition
    setMaxHeight(height)
  }, [])
  return maxHeight
}
