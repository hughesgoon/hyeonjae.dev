import React from 'react'
import { graphql, Link } from 'gatsby'
import { Head } from '../components/head'
import { rhythm } from '../utils/typography'
import * as Lang from '../constants'

import '../styles/resume.scss'

export default ({ data }) => {
  const resumes = data.allMarkdownRemark.edges

  const resume = resumes
    .filter(({ node }) => node.frontmatter.lang === Lang.KOREAN)
    .map(({ node }) => node)[0]

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(30),
        padding: `${rhythm(0.5)} ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(
          3 / 4
        )}`,
      }}
    >
      <Head title="About Hughes" description="김현재(Hughes)의 이력서 | 학생개발자 김현재입니다." image="/og-resume.png" />
      <Link to="/">
        <p>← 블로그로 돌아가기</p>
      </Link>
      <div class="about" dangerouslySetInnerHTML={{ __html: resume.html }} />
    </div>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { tag: { eq: null } } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            lang
          }
        }
      }
    }
  }
`
