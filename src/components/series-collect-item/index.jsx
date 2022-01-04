import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'

import './index.scss'

export const SeriesCollectItem = ({ node, count, pos }) => (
  <li>
    <Link className={`series-collect ${TARGET_CLASS} ${pos?"viewing":""}`} to={node.fields.slug} >
      {Number(count) + 1 + ". " + node.frontmatter.title}
    </Link>
  </li>
)
