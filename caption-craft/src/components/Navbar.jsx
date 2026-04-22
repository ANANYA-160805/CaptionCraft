import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__inner}>
        <NavLink to="/" className={styles.navbar__logo}>
          Caption<span>Craft</span>
        </NavLink>

        <div className={styles.navbar__links}>
          {user ? (
            <>
              <NavLink
                to="/feed"
                className={({ isActive }) =>
                  `${styles.navbar__link} ${isActive ? styles['navbar__link--active'] : ''}`
                }
              >
                Feed
              </NavLink>

              <NavLink
                to="/create"
                className={({ isActive }) =>
                  `${styles.navbar__link} ${styles['navbar__link--cta']} ${
                    isActive ? styles['navbar__link--active'] : ''
                  }`
                }
              >
                + New Post
              </NavLink>

              <div className={styles.navbar__user}>
                <span className={styles.navbar__username}>
                  @<span>{user.username}</span>
                </span>
                <button className={styles.navbar__logout} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${styles.navbar__link} ${isActive ? styles['navbar__link--active'] : ''}`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${styles.navbar__link} ${styles['navbar__link--cta']} ${
                    isActive ? styles['navbar__link--active'] : ''
                  }`
                }
              >
                Get Started
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}