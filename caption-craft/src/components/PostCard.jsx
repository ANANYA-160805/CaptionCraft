import styles from './PostCard.module.scss';

export default function PostCard({ post }) {
  const { image, caption, userId } = post;

  return (
    <article className={styles.card}>
      <div className={styles.card__image_wrap}>
        {image ? (
          <img
            src={image}
            alt={caption || 'Post image'}
            className={styles.card__image}
          />
        ) : (
          <div
            className={styles.card__image_wrap}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#5a5550',
              fontSize: '0.8rem'
            }}
          >
            No image
          </div>
        )}
      </div>

      <div className={styles.card__body}>
        <div className={styles.card__meta}>
          <span className={styles.card__dot} />
          <span className={styles.card__label}>AI Caption</span>
        </div>

        <p className={styles.card__caption}>{caption || 'No caption generated.'}</p>

        <p className={styles.card__username}>
          {userId?.username || 'Unknown user'}
        </p>
      </div>
    </article>
  );
}