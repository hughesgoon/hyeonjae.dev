import React, { useMemo } from 'react'

import { ThumbnailContainer } from '../thumbnail-container'
import { SeriesThumbnailItem } from '../series-thumbnail-item'
import { TAG_TYPE } from '../../constants'

export const SeriesInfo = ({ postGroup, seriesInfo }) => {
  return (
    <ThumbnailContainer>
      {postGroup.map(( node , index) => (
        <SeriesThumbnailItem node={node} seriesInfo={seriesInfo[node.fieldValue]} key={`item_${index}`} />
      ))}
    </ThumbnailContainer>
  )
}
