import React, { useMemo } from 'react'
import { Link } from 'gatsby'

import { SeriesCollectContainer } from '../series-collect-container'
import { SeriesCollectItem } from '../series-collect-item'
import { TAG_TYPE } from '../../constants'

import './index.scss'

export const SeriesCollect = ({ seriesContents, seriesSlug, seriesTitle, postTitle }) => {
  return (
    <SeriesCollectContainer>
      <Link className="series-collect-title" to={"/series" + seriesSlug} >
        <h3>Series: {seriesTitle} 📚</h3>
      </Link>
      <ul>
        {seriesContents.map(( node , index) => (
          <SeriesCollectItem node={node} count={`${index}`} key={`item_${index}`} pos={node.frontmatter.title === postTitle} />
        ))}
      </ul>
    </SeriesCollectContainer>
  )
}
