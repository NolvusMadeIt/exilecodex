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

    const rect = el.getBoundingClientRect()
    const menuW = Math.max(rect.width, width || 0, minWidth)
    const menuH = menuRef.current?.offsetHeight || maxHeight

    const spaceBelow = window.innerHeight - rect.bottom - MENU_GAP
    const spaceAbove = rect.top - MENU_GAP
    const openUp = preferUp || (spaceBelow < Math.min(menuH, maxHeight) && spaceAbove > spaceBelow)

    const h = menuRef.current?.offsetHeight || maxHeight
    let top = openUp ? rect.top - h - MENU_GAP : rect.bottom + MENU_GAP
    let left = align === 'right' ? rect.right - menuW : rect.left

    if (left + menuW > window.innerWidth - VIEWPORT_PAD) {
      left = window.innerWidth - menuW - VIEWPORT_PAD
    }
    if (left < VIEWPORT_PAD) left = VIEWPORT_PAD
    if (top < VIEWPORT_PAD) top = VIEWPORT_PAD

    const maxH = openUp
      ? Math.min(maxHeight, rect.top - VIEWPORT_PAD - MENU_GAP)
      : Math.min(maxHeight, window.innerHeight - top - VIEWPORT_PAD)

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