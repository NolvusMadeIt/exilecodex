import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const GAP = 6
const VIEWPORT_PAD = 12
const DEFAULT_WIDTH = 280

// Position a tooltip in a portal so it isn't clipped by overflow-hidden ancestors.
export function useTooltipPortal({ open, anchorRef, width = DEFAULT_WIDTH }) {
  const tooltipRef = useRef(null)
  const [tooltipStyle, setTooltipStyle] = useState(null)
  const [arrowLeft, setArrowLeft] = useState(12)
  const [openUp, setOpenUp] = useState(false)

  const updatePosition = useCallback(() => {
    const el = anchorRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const tipW = Math.min(width, window.innerWidth * 0.84)
    const tipH = tooltipRef.current?.offsetHeight || 72
    const anchorCenter = rect.left + rect.width / 2

    let left = anchorCenter - tipW / 2
    if (left < VIEWPORT_PAD) left = VIEWPORT_PAD
    if (left + tipW > window.innerWidth - VIEWPORT_PAD) {
      left = window.innerWidth - VIEWPORT_PAD - tipW
    }

    const spaceBelow = window.innerHeight - rect.bottom - GAP
    const spaceAbove = rect.top - GAP
    const flipUp = spaceBelow < tipH && spaceAbove > spaceBelow

    let top = flipUp ? rect.top - tipH - GAP : rect.bottom + GAP
    if (top < VIEWPORT_PAD) top = VIEWPORT_PAD
    if (top + tipH > window.innerHeight - VIEWPORT_PAD) {
      top = window.innerHeight - VIEWPORT_PAD - tipH
    }

    const next = {
      position: 'fixed',
      top,
      left,
      width: tipW,
      zIndex: 210,
    }

    setOpenUp(flipUp)
    setArrowLeft(Math.max(12, Math.min(tipW - 12, anchorCenter - left)))
    setTooltipStyle(prev => (
      prev && prev.top === next.top && prev.left === next.left && prev.width === next.width
        ? prev : next
    ))
  }, [anchorRef, width])

  useEffect(() => {
    if (!open) {
      setTooltipStyle(null)
      return
    }
    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)
    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [open, updatePosition])

  useLayoutEffect(() => {
    if (!open) return
    updatePosition()
  }, [open, updatePosition, tooltipStyle])

  return { tooltipRef, tooltipStyle, arrowLeft, openUp }
}