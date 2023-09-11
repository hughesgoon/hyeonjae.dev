import { graphql } from 'gatsby'
import _ from 'lodash'
import React, { useMemo, useRef, useEffect, useState } from 'react'
import { Bio } from '../components/bio'
import { Tag } from '../components/tag'
import { Contents } from '../components/contents'
import { Head } from '../components/head'
import { HOME_TITLE } from '../constants'
import { useTag } from '../hooks/useTag'
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
  const groups = data.allMarkdownRemark.group

  const tags = useMemo(
    () => _.uniq(groups.map((group) => group.fieldValue)),
    []
  )

  const bioRef = useRef(null)
  const [firstPos, setFirstPos] = useState(200)
  const [count, countRef, increaseCount] = useRenderedCount()
  const [tag, selectTag] = useTag(firstPos)

  useEffect(
    (tabRef) => {
      setFirstPos(
        !bioRef.current
          ? 200
          : bioRef.current.getBoundingClientRect().bottom +
              window.pageYOffset -
              36
      )
    },
    [bioRef.current]
  )

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
      <Head title={HOME_TITLE} />
      <Bio ref={bioRef} />
      <Tag tags={tags} tag={tag} selectTag={selectTag} />
      <Contents
        posts={posts}
        countOfInitialPost={countOfInitialPost}
        count={count}
        tag={tag}
      />
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
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tag: { ne: null }, draft: { eq: false } } }
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
      group(field: { frontmatter: { tag: SELECT } }) {
        nodes {
          frontmatter {
            title
          }
        }
        fieldValue
      }
    }
  }
`
