import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

const ImageGalleryTemplate = ({ data }) => {
  const { markdownRemark: post } = data;
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Layout>
      <h1>{post.frontmatter.title}</h1>
      <p>{post.frontmatter.description}</p>
      <div className="gallery">
        {post.frontmatter.images.map((img, index) => (
          <div key={index} className="thumbnail">
            <img src={img.image} alt={img.alt} onClick={() => setSelectedImage(img.image)} />
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="" />
        </div>
      )}
    </Layout>
  );
};

export const pageQuery = graphql`
  query ImageGalleryByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        images {
          image
          alt
        }
      }
    }
  }
`;

export default ImageGalleryTemplate;
