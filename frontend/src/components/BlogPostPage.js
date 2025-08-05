import React from 'react';
import { useParams, Link } from 'react-router-dom';
import blogPosts from '../data/blogData';

const BlogPostPage = () => {
  const { id } = useParams();
  const post = blogPosts.find(post => post.id === parseInt(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
    }}>
      <Link to="/" style={{
        display: 'inline-block',
        marginBottom: '2rem',
        color: '#333',
        textDecoration: 'none',
        fontSize: '1rem',
      }}>
        ← Back to Blog
      </Link>
      
      <div style={{
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        backgroundColor: '#ffffff',
      }}>
        <img 
          src={post.image} 
          alt={post.title}
          style={{
            width: '100%',
            height: '400px',
            objectFit: 'cover',
          }}
        />
        
        <div style={{ padding: '2rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}>
            <span style={{
              backgroundColor: '#333',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.8rem',
            }}>
              {post.category}
            </span>
            <span style={{ color: '#666', fontSize: '0.9rem' }}>{post.date}</span>
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '1.5rem',
            color: '#333',
          }}>
            {post.title}
          </h1>

          <div style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#444',
          }}>
            {post.content}
            <p>
              Black tea has been traditionally used as a natural remedy for cold symptoms for several reasons:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li>Contains antioxidants that can help boost immune system</li>
              <li>Warm liquid helps soothe sore throat and reduce congestion</li>
              <li>Caffeine can help with fatigue associated with colds</li>
              <li>Tannins may help reduce inflammation</li>
            </ul>
            <p>
              While black tea isn't a cure for the common cold, many people find it provides relief from symptoms and helps them feel better while recovering. The warmth of the tea can help soothe a sore throat and the steam can help clear congested nasal passages.
            </p>
            <h2 style={{ fontSize: '1.5rem', margin: '1.5rem 0' }}>How to Prepare Black Tea for Cold Relief</h2>
            <p>
              For maximum benefit when you have a cold:
            </p>
            <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li>Use freshly boiled water</li>
              <li>Steep for 3-5 minutes</li>
              <li>Add honey for additional soothing effects (optional)</li>
              <li>Add lemon for vitamin C boost (optional)</li>
            </ol>
            <p>
              Remember to stay hydrated and drink plenty of fluids when you have a cold. Black tea can be part of your fluid intake, but be mindful of its caffeine content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage; 