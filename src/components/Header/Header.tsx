import logo from '../../assets/logo.png';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <img
        src={logo}
        alt='Logo'
        style={{ height: '44px', marginLeft: '1.5rem' }}
      />
    </div>
  );
}
