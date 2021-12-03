import React, { useMemo } from 'react'

import { ThumbnailContainer } from '../thumbnail-container'
import { ThumbnailItem } from '../thumbnail-item'
import { TAG_TYPE } from '../../constants'

export const SeriesContents = ({ posts }) => {

  return (
    <ThumbnailContainer>
      {posts.map(({ node }, index) => (
        <ThumbnailItem count={`${index}`} node={node} key={`item_${index}`} />
      ))}
    </ThumbnailContainer>
  )
}
