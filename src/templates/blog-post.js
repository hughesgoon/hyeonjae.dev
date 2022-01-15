import React, { useEffect } from 'react'
import { graphql } from 'gatsby'

import * as Elements from '../components/elements'
import * as ScrollManager from '../utils/scroll'
import { Layout } from '../layout'
import { Head } from '../components/head'
import { PostTitle } from '../components/post-title'
import { PostDate } from '../components/post-date'
import { PostContainer } from '../components/post-container'
import { SeriesCollect } from '../components/series-collect'
import { SeriesNextPost } from '../components/series-next-post'
import { Bio } from '../components/bio'
import { PostNavigator } from '../components/post-navigator'
import { Giscus } from '../components/giscus'

import '../styles/code.scss'
import 'katex/dist/katex.min.css'

export default ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const metaData = data.site.siteMetadata
  const seriesTitle = !data.seriesInfo ? null : data.seriesInfo.frontmatter.title
  const seriesContents = !seriesTitle ? null : data.seriesContents.nodes
  const { title, comment, siteUrl, author, sponsor } = metaData
  const { giscus } = comment
  const { title: postTitle, date, tag } = post.frontmatter
  const postOrderInSeries = !seriesTitle ? null : seriesContents.findIndex(post => post.frontmatter.title === postTitle)

  useEffect(() => {
    ScrollManager.init()
    return () => {
      ScrollManager.destroy()
    }
  }, [])

  return (
    <Layout location={location} title={title}>
      <Head title={postTitle} description={post.excerpt} image={pageContext.ogImage.path} />
      <PostTitle title={postTitle} />
      <PostDate date={date} />
      {seriesTitle && (
        <SeriesCollect seriesContents={seriesContents} seriesSlug={pageContext.seriesSlug} seriesTitle={seriesTitle} postTitle={postTitle} />
      )}
      <PostContainer html={post.html} />
      {seriesContents &&
       postOrderInSeries != seriesContents.length-1 && (
        <SeriesNextPost post={seriesContents[postOrderInSeries+1]} />
      )}
      <Elements.Hr />
      <Bio />
      <PostNavigator pageContext={pageContext} />
      <Giscus repoConfig={giscus} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $series: String, $seriesSlug: String) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        comment {
          giscus {
            category
            category_id
            repo
            repo_id
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 280)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tag
      }
    }
    seriesInfo: markdownRemark(fields: { slug: { eq: $seriesSlug } }) {
      frontmatter {
        title
      }
    }
    seriesContents: allMarkdownRemark(
      filter: { frontmatter: { series: { eq: $series, ne: null }, tag: { ne: null } } }
      sort: { fields: frontmatter___date, order: ASC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
`
