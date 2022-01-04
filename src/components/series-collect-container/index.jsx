import React from 'react'

import './index.scss'

export const SeriesCollectContainer = React.memo(({ children }) => (
  <div className="series-collect-container">{children}</div>
))
