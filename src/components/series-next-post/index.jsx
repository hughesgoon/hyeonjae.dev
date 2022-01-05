import React, { useMemo } from 'react'
import { Link } from 'gatsby'

import './index.scss'

export const SeriesNextPost = ({ post }) => {
  return (
    <Link to={post.fields.slug}>
      <div className="series-next-post-container">
        <h4>시리즈 다음글 이어보기 ➡️</h4>
        <p>{post.frontmatter.title}</p>
      </div>
    </Link>
  )
}
