import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/post.service';
import Loader from '../components/Loader';
import styles from './CreatePost.module.scss';
import '../styles/global.scss';

export default function CreatePostPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(f);
    });
    setResult(null);
    setError('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('image/')) handleFile(f);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select an image first.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const data = await createPost(file);
      const newPost = data.post;

      try {
        const existing = JSON.parse(sessionStorage.getItem('cc_posts') || '[]');
        existing.unshift(newPost);
        sessionStorage.setItem('cc_posts', JSON.stringify(existing));
      } catch {}

      setResult(newPost);
      setFile(null);
      setPreview(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.create}>
      <div className={styles.create__header}>
        <h1 className={styles.create__title}>
          New <span>Post</span>
        </h1>
        <p className={styles.create__subtitle}>
          Upload an image — AI will craft the caption instantly.
        </p>
      </div>

      <div className={styles.create__card}>
        {error && <div className="alert alert--error" style={{ marginBottom: 20 }}>{error}</div>}

        {!preview ? (
          <div
            className={styles.create__dropzone}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files[0])}
            />
            <div className={styles.create__drop_icon}>🖼️</div>
            <p className={styles.create__drop_text}>Drop an image here or click to browse</p>
            <p className={styles.create__drop_hint}>JPG, PNG, WEBP supported</p>
          </div>
        ) : (
          <div className={styles.create__preview_wrap}>
            <img src={preview} alt="Preview" className={styles.create__preview} />
            <label className={styles.create__preview_change}>
              Change
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </label>
          </div>
        )}

        {loading ? (
          <div className={styles.create__actions}>
            <Loader text="AI is writing your caption…" />
          </div>
        ) : (
          preview && !result && (
            <div className={styles.create__actions}>
              <button
                className="btn btn--primary btn--full"
                onClick={handleSubmit}
                disabled={loading}
              >
                Generate Caption & Post
              </button>
            </div>
          )
        )}

        {result && (
          <div className={styles.create__result}>
            <div className={styles.create__result_label}>Caption Generated</div>
            <p className={styles.create__result_caption}>{result.caption}</p>

            {result.image && (
              <img
                src={result.image}
                alt="Uploaded"
                className={styles.create__result_image}
              />
            )}

            <p style={{ marginTop: 10 }}>
              {result.userId?.username || 'Unknown user'}
            </p>

            <div className={styles.create__actions} style={{ marginTop: 20 }}>
              <button className="btn btn--primary btn--full" onClick={() => navigate('/feed')}>
                View Feed
              </button>
              <button
                className="btn btn--ghost btn--full"
                onClick={() => {
                  setResult(null);
                  setPreview(null);
                  setFile(null);
                }}
              >
                Create Another
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}