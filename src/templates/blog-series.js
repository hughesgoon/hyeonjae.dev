import { graphql, Link } from 'gatsby'
import React, { useMemo } from 'react'
import { Bio } from '../components/bio'
import { SeriesContents } from '../components/series-contents'
import { Head } from '../components/head'
import { HOME_TITLE } from '../constants'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useRenderedCount } from '../hooks/useRenderedCount'
import { useScrollEvent } from '../hooks/useScrollEvent'
import { Layout } from '../layout'
import * as Dom from '../utils/dom'
import * as EventManager from '../utils/event-manager'

const BASE_LINE = 80

function getDistance(currentPos) {
  return Dom.getDocumentHeight() - currentPos
}

export default ({ data, location }) => {
  const { siteMetadata } = data.site
  const { countOfInitialPost } = siteMetadata.configs
  const posts = data.allMarkdownRemark.edges
  const info = data.seriesInfo.nodes[0].frontmatter

  const [count, countRef, increaseCount] = useRenderedCount()

  useIntersectionObserver()
  useScrollEvent(() => {
    const currentPos = window.scrollY + window.innerHeight
    const isTriggerPos = () => getDistance(currentPos) < BASE_LINE
    const doesNeedMore = () =>
      posts.length > countRef.current * countOfInitialPost

    return EventManager.toFit(increaseCount, {
      dismissCondition: () => !isTriggerPos(),
      triggerCondition: () => isTriggerPos() && doesNeedMore(),
    })()
  })

  return (
    <Layout location={location} title={siteMetadata.title}>
      <Head title={HOME_TITLE} keywords={siteMetadata.keywords} />
      <Link to="/series">다른 시리즈들</Link>
      <h1>{info.title}</h1>
      <p>{info.desc}</p>
      <SeriesContents
        posts={posts}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySeries($series: String! $seriesInfoPath: String!) {
    site {
      siteMetadata {
        title
        configs {
          countOfInitialPost
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date] }
      filter: {
        frontmatter: {
          series: { eq: $series }
          tag: { ne: null }
          draft: { eq: false }
        }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            draft
            tag
          }
        }
      }
    }
    seriesInfo: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: $seriesInfoPath } }
    ) {
      nodes {
        frontmatter {
          title
          desc
        }
      }
    }
  }

`
