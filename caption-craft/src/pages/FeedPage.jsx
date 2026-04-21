import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import api from '../services/api';
import styles from './Feed.module.scss';
import '../styles/global.scss';

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/posts');
        setPosts(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load feed');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className={styles.feed}>
      <div className={styles.feed__header}>
        <h1 className={styles.feed__title}>
          Your <span>Feed</span>
        </h1>
        <p className={styles.feed__subtitle}>
          {posts.length > 0
            ? `${posts.length} post${posts.length !== 1 ? 's' : ''} captured`
            : 'Start sharing your moments'}
        </p>
      </div>

      <div className={styles.feed__grid}>
        {loading ? (
          <p style={{ color: '#aaa' }}>Loading posts...</p>
        ) : error ? (
          <p style={{ color: '#ff7b7b' }}>{error}</p>
        ) : posts.length === 0 ? (
          <div className={styles.feed__empty}>
            <div className={styles.feed__empty_icon}>📷</div>
            <h2 className={styles.feed__empty_title}>No posts yet</h2>
            <p className={styles.feed__empty_text}>
              Upload an image and let AI craft the perfect caption.
            </p>
            <Link to="/create" className="btn btn--primary">
              Create your first post
            </Link>
          </div>
        ) : (
          posts.map((post, index) => (
            <PostCard key={post._id || index} post={post} />
          ))
        )}
      </div>
    </main>
  );
}