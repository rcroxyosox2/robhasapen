import React from 'react';
import { TransitionGroup, Transition } from 'react-transition-group';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as styles from './styles';
import Header from '../Header';
import { KEYCODES, eventHasKeyCode } from '../Form/Input';
import CloseButton from '../Button/CloseButton';

// Exported so that custome one-off modals can leverage
// Should be used after user hits the Tab key

// Restrict focus to these elements (https://stackoverflow.com/questions/1599660/which-html-elements-can-receive-focus)
export const focusableSelector = `
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  [tabindex],
  [contentEditable=true]
`;

export const handleModalFocus = (e, {elementContext, focusableElements: focusableElementsFromProps}) => {

  let focusableElements = focusableElementsFromProps;

  if(elementContext) {
    focusableElements = [...elementContext.querySelectorAll(focusableSelector)];
  }

  if (!focusableElements) {
    return;
  }

  focusableElements = focusableElements.sort((_, elm) => (elm.classList.contains('CloseButtonStyle') || elm.hasAttribute("data-lowtabsort")) ? -1 : 1);

  if (focusableElements.length === 0) {
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length-1];

  const getIndexOfSelectedNode = () => {
    let index = 0;

    focusableElements.forEach((entry, i) => {
      if(entry === document.activeElement) {
        index = i;
      }
    });

    return index;
  }

  if (!e) {
    firstElement.focus();

  // if tabbing forward
  } else if (!e.shiftKey) {

    e.preventDefault(); // This stops the tab focus from going back up into the URL bar

    // if at the last element
    if (getIndexOfSelectedNode()+1 >= focusableElements.length) {
      firstElement.focus();
    } else {
      focusableElements[getIndexOfSelectedNode()+1].focus();
    }

  // if tabbing backwards
  } else if (e.shiftKey) {

    e.preventDefault(); // This stops the tab focus from going back up into the URL bar

    // if at the first element
    if (getIndexOfSelectedNode()-1 < 0) {
      lastElement.focus();
    } else {
      focusableElements[getIndexOfSelectedNode()-1].focus();
    }

  }

};

class Modal extends React.PureComponent {

  constructor(props) {
    super(props);
    this.closeRef = React.createRef();
    this.backgroundRef = props._ref || React.createRef();
    this.headerRef = props._headerRef || React.createRef();
    this.setRoot();
  }

  setRoot() {
    this.root = this.props.root || document.getElementById('root');
  }

  escFunction = (e) => {
    if (!this.props.escToClose) {
      return;
    }
    this.props.onModalClose(e);
  }

  handleFocus = (e) => {
    handleModalFocus(e, {elementContext: this.backgroundRef.current});
  };

  handleKeyDown = (e) => {
    if (eventHasKeyCode(e, KEYCODES.TAB)) {
      this.handleFocus(e);
    }

    if(eventHasKeyCode(e, KEYCODES.ESC)) {
      this.escFunction(e);
    }

    if(
      eventHasKeyCode(e, [KEYCODES.ENTER, KEYCODES.SPACE])
      && e.target === this.closeRef.current
    ) {
      e.preventDefault();
      this.props.onModalClose(e);
    }
  }

  componentDidMount() {
    if (!this.root) {
      this.setRoot();
      this.forceUpdate();
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.isOpen != prevProps.isOpen){
      if (this.props.isOpen) {
        this.onOpen();
      }
      else{
        this.onClose();
      }
    }
  }

  componentWillUnmount() {
    this.onClose();
  }

  lockBodyScroll() {
    const body = document.body;
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y') || window.scrollY || window.pageYOffset;

    body.style.top = `-${scrollY}px`;
    body.style.position = 'fixed';
    body.style.width = '100%';
    body.style.height = `100vh`;
  }

  unlockBodyScroll() {
    document.body.style.position = '';
    window.scrollTo(0, Math.abs(parseInt(document.body.style.top, 10)));
    document.body.style.top = '';
  }

  onOpen() {
    this.lockBodyScroll();
    this.activeElement = document.activeElement;
    this.handleFocus();
  }

  onClose() {
    this.unlockBodyScroll();
    this.activeElement && this.activeElement.focus(); // return focus to the original object that triggered the modal
  }

  handleBgClick = (e) => {

    if (!this.props.bgClickToClose) {
      return;
    }

    if (e.target === this.closeRef.current || e.target === this.backgroundRef.current) {
      this.props.onModalClose(e);
    }
  }

  render() {

    if (!this.root) {
      return null;
    }

    const modal = (
      <TransitionGroup>
        {this.props.isOpen
          && (
            <Transition timeout={{ enter: 0, exit: 320 }} in={this.props.isOpen} onExited={this.props.onAnimationComplete}>
              {
                (animationStatus) => (
                  <styles.ModalContainerStyle
                    onMouseDown={this.handleBgClick}
                    onKeyDown={this.handleKeyDown}
                    ref={this.backgroundRef}
                    animationStatus={animationStatus}
                    role='dialog'
                    aria-modal='true'
                    aria-labelledby={this.props.headerText ? 'modalLabel' : null}
                    >
                    <styles.ModalContentStyle animationStatus={animationStatus} maxWidth={this.props.maxWidth} width={this.props.width}>
                      <styles.CloseContainerStyle><CloseButton ref={this.closeRef} /></styles.CloseContainerStyle>
                      <styles.ModalContainerInnerStyle>
                        {this.props.headerText && <Header styleSize='large' sideLines maxWidth={this.props.headerMaxWidth} {...this.props.headerProps} id='modalLabel' tabIndex='-1'>{this.props.headerText}</Header>}
                        {this.props.children}
                      </styles.ModalContainerInnerStyle>
                    </styles.ModalContentStyle>
                  </styles.ModalContainerStyle>
                )
              }
            </Transition>
          )
        }
      </TransitionGroup>
    );

    return ReactDOM.createPortal(modal, this.root);
  }
}

export const defaultHeaderProps = {
  "styleAlign": "left",
  "styleAlignMobile": "left"
}

Modal.defaultProps = {
  headerText: null,
  headerProps: defaultHeaderProps,
  root: null,
  escToClose: true,
  bgClickToClose: true,
  width: null,
  maxWidth: '100%',
  onModalClose: () => null,
  onAnimationComplete: () => null,
  headerMaxWidth: '370px',
  _headerRef: null, // Depreciated
  isOpen: false,
}

Modal.propTypes = {
  maxWidth: PropTypes.string,
  headerText: PropTypes.string,
  root: PropTypes.func,
  headerMaxWidth: PropTypes.string,
  headerProps: PropTypes.object,
  escToClose: PropTypes.bool,
  onModalClose: PropTypes.func,
  bgClickToClose: PropTypes.bool,
  isOpen: PropTypes.bool,
}

export { styles as ModalStyles };
export default Modal;
