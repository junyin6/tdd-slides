import React from 'react';
import PropTypes from 'prop-types';

const AutoAdvances = (Component, propName, upperBoundPropName) => {
  return class ComponentWithAutoAdvances extends React.PureComponent {
    static displayName = `AutoAdvances(${
      Component.displayName || Component.name
    })`;
    static propTypes = {
      [propName]: PropTypes.number.isRequired,
      [`${propName}Increment`]: PropTypes.func.isRequired,
      [upperBoundPropName]: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array,
      ]).isRequired,
      autoAdvanceDelay: PropTypes.number.isRequired,
    };
    static defaultProps = {
      autoAdvanceDelay: 10e3,
    };
    componentDidMount() {
      this.startTimer();
    }
    componentDidUpdate(prev) {
      if (
        prev[upperBoundPropName] !== this.props[upperBoundPropName] ||
        prev[propName] !== this.props[propName]
      )
        this.startTimer();
    }
    componentWillUnmount() {
      clearTimeout(this._timer);
    }

    startTimer() {
      clearTimeout(this._timer);
      if (!this.props.autoAdvanceDelay) return;
      let upperBound;
      if (typeof this.props[upperBoundPropName] === 'number')
        upperBound = this.props[upperBoundPropName];
      else if (this.props[upperBoundPropName] !== null)
        upperBound = this.props[upperBoundPropName].length;

      this._timer = setTimeout(() => {
        this.props[`${propName}Increment`](upperBound);
      }, this.props.autoAdvanceDelay);
    }
    render() {
      const { autoAdvanceDelay: _autoAdvanceDelay, ...rest } = this.props;
      return <Component {...rest} />;
    }
  };
};

export default AutoAdvances;
