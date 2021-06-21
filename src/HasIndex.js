import React from 'react';
import PropTypes from 'prop-types';

const HasIndex = (Component, indexPropName) =>
  class ComponentWithIndex extends React.PureComponent {
    static displayName = `HasIndex(${Component.displayName || Component.name})`;
    static propTypes = {
      Component: PropTypes.elementType,
      indexPropName: PropTypes.string,
    };

    state = {
      index: 0,
    };

    handleIncrement = (upperBound) => {
      this.setState(({ index }) => ({
        index: upperBound ? (index + 1) % upperBound : index + 1,
      }));
    };

    handleDecrement = (upperBound) => {
      this.setState(({ index }) => ({
        index: upperBound ? (upperBound + index - 1) % upperBound : index - 1,
      }));
    };

    render() {
      const indexProps = {
        [indexPropName]: this.state.index,
        [`${indexPropName}Increment`]: this.handleIncrement,
        [`${indexPropName}Decrement`]: this.handleDecrement,
      };
      return <Component {...this.props} {...indexProps} />;
    }
  };

export default HasIndex;
