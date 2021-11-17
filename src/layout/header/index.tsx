import { AimOutlined } from '@ant-design/icons';
import RowFlex from '@/component/RowFlex';
import styles from './index.less';

interface IProps {}

export const GuideHeader: React.FC<IProps> = (props) => {
  return (
    <RowFlex className={styles.header}>
      <RowFlex className={styles.logo} justify="center" align="middle">
        <AimOutlined style={{ color: '#fba831', fontSize: 28 }} />
      </RowFlex>
      &nbsp;&nbsp;&nbsp;&nbsp;拖拽配置DEMO
    </RowFlex>
  );
};
