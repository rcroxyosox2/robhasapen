import React from 'react';
import throttle from 'lodash.throttle';
import { withTheme } from 'styled-components';

const withIsMobile = (WrappedComponent) => {
  class HOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // eslint-disable-next-line react/no-unused-state
        windowWidth: window.innerWidth,
      };
      this.throttledResize = throttle(this.handleResize, 200);
    }

    componentDidMount() {
      window.addEventListener('resize', this.throttledResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.throttledResize);
    }

    handleResize = () => {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ windowWidth: window.innerWidth });
    }

    currentWindowSize = () => {
      const { windowWidth } = this.state;
      return windowWidth;
    }

    isMobile = () => {
      const { theme } = this.props;
      return window.innerWidth <= parseInt(theme.responsive.largestMobileScreen, 10);
    }

    render() {
      return <WrappedComponent {...this.props} isMobile={this.isMobile} currentWindowSize={this.currentWindowSize} />;
    }
  }

  return withTheme(HOC);
};

export default withIsMobile;
