import styles from './Loader.module.scss';

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__ring} />
      <p className={styles.loader__text}>{text}</p>
    </div>
  );
}
