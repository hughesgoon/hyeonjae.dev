import React from "react";
import { graphql } from 'gatsby'

import './index.scss'

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <div className="ogImage" >
      <div className="ogBackground"></div>
      <div className="ogData post">
        <p className="ogPost" >Hyeonjae.dev</p>
        <div className="ogTitle" >
          <h1>{post.frontmatter.title}</h1>
        </div>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query PostInfo($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
    }
  }
`