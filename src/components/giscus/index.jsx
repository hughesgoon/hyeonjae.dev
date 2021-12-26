import React, { useEffect } from 'react'

import * as Dom from '../../utils/dom'
import { THEME } from '../../constants'

const src = 'https://giscus.app/client.js'
const DARK_THEME = 'dark'
const LIGHT_THEME = 'light'

export const Giscus = ({ repoConfig }) => {
  const rootElm = React.createRef()

  useEffect(() => {
    const isDarkTheme = Dom.hasClassOfBody(THEME.DARK)
    const giscus = document.createElement('script')
    const giscusConfig = {
      src,
      'data-repo': repoConfig.repo,
      'data-repo-id': repoConfig.repo_id,
      'data-category': repoConfig.category,
      'data-category-id': repoConfig.category_id,
      'data-mapping': 'og:title',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-theme': isDarkTheme ? DARK_THEME : LIGHT_THEME,
      'data-lang': 'ko',
      'crossorigin': 'anonymous',
      'async': true,
    }

    Object.keys(giscusConfig).forEach(configKey => {
      giscus.setAttribute(configKey, giscusConfig[configKey])
    })
    rootElm.current.appendChild(giscus)
  }, [])

  return <div className="giscus" ref={rootElm} />
}
