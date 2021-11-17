import AddCase from '@/expandItems/AddCase';
import styles from './index.less';

export default function Tower(props: any) {
  const node = props.node;

  return (
    <div className={styles.test}>
      <div className={styles.line}></div>
      <span style={{ margin: '0 30px 0 6px' }}>#塔吊#</span>

      <AddCase />
    </div>
  );
}
