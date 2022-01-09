import { graphql } from 'gatsby'
import React, { useMemo } from 'react'
import { SeriesInfo } from '../components/series-info'
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

  const postGroup = data.postGroup.group
  const seriesInfo = data.infos.nodes

  var seriesInfoReform = {}
  seriesInfo.map(
    node =>
      (seriesInfoReform[node.fields.slug.split('/')[1]] = {
        title: node.frontmatter.title,
        desc: node.frontmatter.desc,
      })
  )

  const [count, countRef, increaseCount] = useRenderedCount()

  useIntersectionObserver()
  useScrollEvent(() => {
    const currentPos = window.scrollY + window.innerHeight
    const isTriggerPos = () => getDistance(currentPos) < BASE_LINE
    const doesNeedMore = () =>
      seriesInfo.length > countRef.current * countOfInitialPost

    return EventManager.toFit(increaseCount, {
      dismissCondition: () => !isTriggerPos(),
      triggerCondition: () => isTriggerPos() && doesNeedMore(),
    })()
  })

  return (
    <Layout location={location} title={siteMetadata.title}>
      <Head title="Series" />
      <SeriesInfo postGroup={postGroup} seriesInfo={seriesInfoReform} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        configs {
          countOfInitialPost
        }
      }
    }
    infos: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/series/" } }
    ) {
      nodes {
        frontmatter {
          title
          desc
        }
        fields {
          slug
        }
      }
    }
    postGroup: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tag: { ne: null }, draft: { eq: false } } }
    ) {
      group(field: frontmatter___series) {
        nodes {
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
          }
        }
        fieldValue
        totalCount
      }
    }
  }
`
