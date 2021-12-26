import React, { useEffect, useCallback, useRef } from 'react'
import { rhythm } from '../../utils/typography'
import './index.scss'
import { Item } from './item'
import * as ScrollManager from '../../utils/scroll'

export const Tag = ({ tags, tag, selectTag }) => {
  const containerRef = useRef(null)
  let firstPos = 0

  useEffect(tabRef => {
    firstPos = containerRef.current.getBoundingClientRect().top - 60
  }, [])

  const scrollToCenter = useCallback(tabRef => {
    const { offsetWidth: tabWidth } = tabRef.current
    const { scrollLeft, offsetWidth: containerWidth } = containerRef.current
    const tabLeft = tabRef.current.getBoundingClientRect().left
    const containerLeft = containerRef.current.getBoundingClientRect().left
    const refineLeft = tabLeft - containerLeft
    const targetScollX = scrollLeft + refineLeft - (containerWidth / 2) + (tabWidth / 2)

    if (window.scrollY > firstPos) {
      ScrollManager.go(firstPos)
    }

    containerRef.current.scroll({ left: targetScollX, top: 0, behavior: 'smooth' })
  }, [containerRef])

  useEffect(() => {
    ScrollManager.init()
  }, [])

  return (
    <ul
      ref={containerRef}
      className="tag-container"
      role="tablist"
      id="tag"
      style={{
        margin: `0 -${rhythm(3 / 4)}`,
      }}
    >
      <Item title={'All'} selectedTag={tag} onClick={selectTag} scrollToCenter={scrollToCenter} />
      {tags.map((title, idx) => (
        <Item
          key={idx}
          title={title}
          selectedTag={tag}
          onClick={selectTag}
          scrollToCenter={scrollToCenter}
        />
      ))}
    </ul>
  )
}
