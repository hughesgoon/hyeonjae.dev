const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
  const blogSeriesTemplate = path.resolve(`./src/templates/blog-series.js`)

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
                tag
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
          seriesInfoPath: "/series/" + series.fieldValue + "/",
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
