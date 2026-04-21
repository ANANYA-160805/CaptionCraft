import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { register } from '../services/auth.service';
import styles from './Auth.module.scss';
import '../styles/global.scss';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const data = await register(username.trim(), password);
      signIn(data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.auth__box}>
        <div className={styles.auth__brand}>
          Caption<span>Craft</span>
        </div>
        <p className={styles.auth__tagline}>AI-powered captions for every moment.</p>

        <div className={styles.auth__card}>
          <h1 className={styles.auth__title}>Create an account</h1>

          <form className={styles.auth__form} onSubmit={handleSubmit}>
            {error && <div className="alert alert--error">{error}</div>}

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--full"
              disabled={loading}
            >
              {loading ? 'Creating account…' : 'Register'}
            </button>
          </form>

          <div className={styles.auth__footer}>
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
