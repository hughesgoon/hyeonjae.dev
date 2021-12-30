import React from 'react'
import { Link } from 'gatsby'
import { Nav } from '../nav'
import { ThemeSwitch } from '../theme-switch'
import { BLOG_TITLE } from '../../constants'

import './index.scss'

export const Top = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    <div className="top">
      <div className="contents">
        <div>
          <Link to={`/`} className="link">
            {BLOG_TITLE}
          </Link>
          <ThemeSwitch />
        </div>
        <Nav />
      </div>
    </div>
  )
}
