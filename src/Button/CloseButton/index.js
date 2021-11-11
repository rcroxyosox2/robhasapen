import React from 'react';
import * as styles from './styles';

const CloseButton = React.forwardRef((props, ref) => {
  return <styles.CloseButtonStyle {...props} ref={ref}>{props.children}</styles.CloseButtonStyle>
});

export default CloseButton;
export { styles as CloseButtonStyles };