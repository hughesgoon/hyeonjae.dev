import React, { useRef, useCallback, useEffect } from 'react'

export const Item = ({ title, selectedTag, onClick, scrollToCenter }) => {
  const tabRef = useRef(null)

  const handleClick = useCallback(() => {
    scrollToCenter(tabRef)
    onClick(title)
  }, [tabRef])

  useEffect(() => {
    if (selectedTag === title) {
      scrollToCenter(tabRef)
    }
  }, [selectedTag, tabRef])

  return (
    <li
      ref={tabRef}
      className="item"
      role="tab"
      aria-selected={selectedTag === title ? 'true' : 'false'}
    >
      <div onClick={handleClick}>{title}</div>
    </li>
  )
}
