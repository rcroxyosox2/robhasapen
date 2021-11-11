import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './styles';

const Container = (props) => {
  return (<styles.ContainerStyle {...props} ref={props._ref}>{ props.children }</styles.ContainerStyle>);
};

Container.defaultProps = {
  styleSize: 'default',
  _ref: null,
  flex: false,
  styleAlign: null,
  styleGutterSize: 'default',
  styleGapSize: 'default',
  styleAlignMobile: null,
  mobileCollapse: false,
  mobileColumn: false,
};

Container.propTypes = {
  styleSize: PropTypes.oneOf(['tiny', 'small', 'medium', 'default']),
  styleAlign: PropTypes.oneOf(['left', 'right', 'center']),
  styleAlignMobile: PropTypes.oneOf(['left', 'right', 'center']),
  styleGutterSize: PropTypes.oneOf(['default', 'medium']),
  styleGapSize: PropTypes.oneOf(['default', 'medium']),
  flex: PropTypes.bool,
  mobileCollapse: PropTypes.bool,
  mobileColumn: PropTypes.bool,
};

export { styles as ContainerStyles };
export default Container;
