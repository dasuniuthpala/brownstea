import React from 'react';
import { Link } from 'react-router-dom';

const BlogPost = ({ post }) => {
  return (
    <div className="blog-post-card" style={{
      border: '1px solid #eee',
      borderRadius: '8px',
      overflow: 'hidden',
      margin: '1rem 0',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
    }}>
      <div className="blog-image" style={{
        width: '100%',
        height: '300px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          backgroundColor: '#333',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '0.8rem',
        }}>
          {post.category}
        </div>
        <img 
          src={post.image} 
          alt={post.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '0.8rem',
        }}>
          {post.date}
        </div>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h2 style={{ 
          fontSize: '1.5rem',
          marginBottom: '1rem',
          color: '#333'
        }}>{post.title}</h2>
        <p style={{
          color: '#666',
          fontSize: '1rem',
          lineHeight: '1.5'
        }}>{post.excerpt}</p>
        <div style={{
          marginTop: '1rem'
        }}>
          <Link 
            to={`/post/${post.id}`}
            style={{
              color: '#333',
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
