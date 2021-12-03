import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'

import './index.scss'

export const SeriesThumbnailItem = ({ node, seriesInfo }) => (
  <Link className={`series-thumbnail ${TARGET_CLASS}`} to={"/series/"+node.fieldValue}>
    <div key={node.fieldValue}>
      <h3>{seriesInfo['title']}</h3>
      <p>{seriesInfo['desc']}</p>
      <p>최근 업데이트: {node.nodes[0].frontmatter.date}</p>
      <p>포스트: {node.totalCount}개</p>
    </div>
  </Link>
)
