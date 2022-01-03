import React from "react";
import { graphql } from 'gatsby'

import './index.scss'

export default ({ data }) => {
  const info = data.seriesInfo.frontmatter

  return (
    <div className="ogImage" >
      <div className="ogBackground"></div>
      <div className="ogData series">
        <p className="ogSeries" >Series</p>
        <div className="ogTitle" >
          <h1>{info.title}</h1>
        </div>
        <p className="ogContent" >{info.desc}</p>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query SeriesInfo($seriesSlug: String!) {
    seriesInfo: markdownRemark(fields: { slug: { eq: $seriesSlug } }) {
      frontmatter {
        title
        desc
      }
    }
  }
`