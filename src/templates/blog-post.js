import React from 'react'
import Layout from '../components/layout'
import Img from 'gatsby-image';
import { graphql } from 'gatsby'

function BlogPost(props) {
    const post = props.data.markdownRemark;
    const { title } = post.frontmatter;
    const hasImage = post.frontmatter.image == null ? false : true;


    return (
        <Layout>
            <div>
                <h1>{title}</h1>
                {hasImage &&
                  <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
                }
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </Layout>
    )
}

export default BlogPost;
export const query = graphql`
 query PostQuery($slug: String!) {
     markdownRemark(fields: { slug: { eq: $slug } }) {
       html
       frontmatter {
        title
        description
        image {
          childImageSharp {
            resize(width: 1500, height: 1500) {
              src
            }
            fluid(maxWidth: 786) {
              ...GatsbyImageSharpFluid
            }
          }
       }
       }
   }
}
`  