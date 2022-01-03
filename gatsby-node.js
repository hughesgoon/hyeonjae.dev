const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { createOpenGraphImage } = require(`gatsby-plugin-open-graph-images`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
  const blogSeriesTemplate = path.resolve(`./src/templates/blog-series.js`)
  const blogPostOgTemplate = path.resolve(`./src/og-image/blog-post.og-image.js`)
  const blogSeriesOgTemplate = path.resolve(`./src/og-image/blog-series.og-image.js`)

  return graphql(
    `
      {
        allMarkdownRemark(
          filter: { frontmatter: { tag: { ne: null }, draft: { eq: false } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                series
              }
            }
            previous {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
            next {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
          group(field: frontmatter___series) {
            fieldValue
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges;
	 
    posts.forEach((post) => {
      createPage({
        path: post.node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: post.node.fields.slug,
          previous: post.next,
          next: post.previous,
          series: post.node.frontmatter.series,
          seriesSlug: "/" + post.node.frontmatter.series + "/",
          ogImage: createOpenGraphImage(createPage, {
            path: `og-images/post/${post.node.fields.slug.replace(/\//g,"")}.png`,
            component: blogPostOgTemplate,
            context: {
              slug: post.node.fields.slug,
            }
          }),
        },
      })
    })
    
    // Create series pages.
    const seriesNodes = result.data.allMarkdownRemark.group;

    seriesNodes.forEach((series) => {
      createPage({
        path: `/series/` + series.fieldValue + `/`,
        component: blogSeriesTemplate,
        context: {
          series: series.fieldValue,
          seriesSlug: "/" + series.fieldValue + "/",
          ogImage: createOpenGraphImage(createPage, {
            path: `og-images/series/${series.fieldValue}.png`,
            component: blogSeriesOgTemplate,
            context: {
              seriesSlug: "/" + series.fieldValue + "/",
            }
          }),
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
