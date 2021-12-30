import React from 'react'
import { Link } from 'gatsby'

import './index.scss'

export const Nav = () => (
  <nav className="nav">
    <ul className="nav-list">
      <li>
        <Link to={`/series`} className="nav-link">시리즈</Link>
      </li>
    </ul>
  </nav>
)
