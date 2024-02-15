import { ReactNode } from 'react';
import styles from './ErrorMessage.module.scss';

type Props = {
  children: ReactNode;
};

export default function ErrorMessage(props: Props) {
  return <div className={styles.errorMessage}>{props.children}</div>;
}
