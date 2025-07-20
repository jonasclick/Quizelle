import logo from '../../assets/logoPost.png';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <img src={logo} alt='Logo' style={{ height: '88px' }} />
      <h3>PostGuessr</h3>
    </div>
  );
}
