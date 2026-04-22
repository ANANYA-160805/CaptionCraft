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
      <section className={styles.feed__hero}>
        <div>
          <p className={styles.feed__eyebrow}>Community Showcase</p>
          <h1 className={styles.feed__title}>
            Your <span>Feed</span>
          </h1>
          <p className={styles.feed__subtitle}>
            Discover captions created by AI and see what the community is sharing today.
          </p>
        </div>

        <div className={styles.feed__stats}>
          <div className={styles.feed__stat}>
            <strong>{loading ? '—' : posts.length}</strong>
            <span>Posts</span>
          </div>
          <div className={styles.feed__stat}>
            <strong>AI</strong>
            <span>Generated</span>
          </div>
          <div className={styles.feed__stat}>
            <strong>Live</strong>
            <span>Updates</span>
          </div>
        </div>
      </section>

      <div className={styles.feed__grid}>
        {loading ? (
          <div className={styles.feed__state}>
            <div className={styles.feed__spinner}></div>
            <p>Loading posts...</p>
          </div>
        ) : error ? (
          <div className={styles.feed__state}>
            <div className={styles.feed__stateIcon}>⚠️</div>
            <h2>Something went wrong</h2>
            <p>{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className={styles.feed__empty}>
            <div className={styles.feed__emptyCard}>
              <div className={styles.feed__emptyIcon}>📷</div>
              <h2 className={styles.feed__emptyTitle}>No posts yet</h2>
              <p className={styles.feed__emptyText}>
                Upload an image and let AI craft the perfect caption.
              </p>
              <Link to="/create" className={styles.feed__cta}>
                Create your first post
              </Link>
            </div>
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