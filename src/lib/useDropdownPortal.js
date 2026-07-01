import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const MENU_GAP = 4
const VIEWPORT_PAD = 8

// Position a dropdown menu in a portal so it isn't clipped by overflow-hidden ancestors.
export function useDropdownPortal({
  open,
  onClose,
  anchorRef,
  width,
  minWidth = 240,
  maxHeight = 280,
  align = 'left',
  preferUp = false,
}) {
  const menuRef = useRef(null)
  const [menuStyle, setMenuStyle] = useState(null)

  const updatePosition = useCallback(() => {
    const el = anchorRef.current
    if (!el) return

    // CSS `zoom` on <html> (Settings → font size) scales getBoundingClientRect's visual
    // coords, while position:fixed style coords are pre-zoom. Convert to style-space by
    // dividing by the zoom so the menu lands on its anchor at any scale (no-op at zoom 1).
    const Z = parseFloat(getComputedStyle(document.documentElement).zoom) || 1
    const r = el.getBoundingClientRect()
    const rect = { top: r.top / Z, bottom: r.bottom / Z, left: r.left / Z, right: r.right / Z, width: r.width / Z }
    const vw = window.innerWidth / Z
    const vh = window.innerHeight / Z

    const menuW = Math.max(rect.width, width || 0, minWidth)
    const menuH = menuRef.current?.offsetHeight || maxHeight

    const spaceBelow = vh - rect.bottom - MENU_GAP
    const spaceAbove = rect.top - MENU_GAP
    const openUp = preferUp || (spaceBelow < Math.min(menuH, maxHeight) && spaceAbove > spaceBelow)

    const h = menuRef.current?.offsetHeight || maxHeight
    let top = openUp ? rect.top - h - MENU_GAP : rect.bottom + MENU_GAP
    let left = align === 'right' ? rect.right - menuW : rect.left

    if (left + menuW > vw - VIEWPORT_PAD) {
      left = vw - menuW - VIEWPORT_PAD
    }
    if (left < VIEWPORT_PAD) left = VIEWPORT_PAD
    if (top < VIEWPORT_PAD) top = VIEWPORT_PAD

    const maxH = openUp
      ? Math.min(maxHeight, rect.top - VIEWPORT_PAD - MENU_GAP)
      : Math.min(maxHeight, vh - top - VIEWPORT_PAD)

    const next = {
      position: 'fixed',
      top,
      left,
      width: menuW,
      maxHeight: Math.max(120, maxH),
      zIndex: 200,
    }
    setMenuStyle(prev => (
      prev && prev.top === next.top && prev.left === next.left
        && prev.width === next.width && prev.maxHeight === next.maxHeight
        ? prev : next
    ))
  }, [anchorRef, width, minWidth, maxHeight, align, preferUp])

  useEffect(() => {
    if (!open) {
      setMenuStyle(null)
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

  // Re-measure after the portal mounts so flip/height use the real menu size.
  useLayoutEffect(() => {
    if (!open) return
    updatePosition()
  }, [open, updatePosition, menuStyle])

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (anchorRef.current?.contains(e.target) || menuRef.current?.contains(e.target)) return
      onClose()
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open, onClose, anchorRef])

  return { menuRef, menuStyle, updatePosition }
}