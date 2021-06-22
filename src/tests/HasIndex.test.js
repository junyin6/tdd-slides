import React from 'react';
import { shallow } from 'enzyme';
import HasIndex from '../HasIndex';

describe('HasIndex()', () => {
  const MockComponent = () => null;
  MockComponent.displayName = 'MockComponent';
  const MockComponentWithIndex = HasIndex(MockComponent, 'index');

  it('has the expected displayName', () => {
    expect(MockComponentWithIndex.displayName).toBe('HasIndex(MockComponent)');
  });

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MockComponentWithIndex />);
  });

  it('has initial `index` state equal to the `defaultIndex` prop', () => {
    expect(wrapper.state('index')).toBe(0);
    const wrapper2 = shallow(<MockComponentWithIndex defaultIndex={1} />);
    expect(wrapper2.state('index')).toBe(1);
  });

  it('always has `index` state equal to the `index` prop', () => {
    const wrapperWithInitialIndex = shallow(
      <MockComponentWithIndex index={1} />
    );
    expect(wrapperWithInitialIndex.state('index')).toBe(1);
    wrapperWithInitialIndex.setProps({ index: 2 });
    expect(wrapperWithInitialIndex.state('index')).toBe(2);
  });

  it('allows `index` state to change if the `index` prop is unset', () => {
    const wrapperWithInitialIndex = shallow(
      <MockComponentWithIndex index={1} />
    );
    wrapperWithInitialIndex.setProps({ index: undefined });
    wrapperWithInitialIndex.setState({ index: 2 });
    expect(wrapperWithInitialIndex.state('index')).toBe(2);
  });

  it('calls `onIndexChange` on decrement/increment', () => {
    const onIndexChange = jest.fn();
    wrapper.setProps({ index: 0, onIndexChange });
    wrapper.prop('indexDecrement')(3);
    expect(onIndexChange).toHaveBeenCalledWith({ target: { value: 2 } });
    wrapper.prop('indexIncrement')(3);
    expect(onIndexChange).toHaveBeenCalledWith({ target: { value: 1 } });
  });
  it('has an initial `index` of 0', () => {
    expect(wrapper.state('index')).toBe(0);
  });

  it('passes `index` state down as an `index` prop', () => {
    expect(wrapper.prop('index')).toBe(0);
    wrapper.setState({ index: 1 });
    expect(wrapper.prop('index')).toBe(1);
  });

  it('has an `index` state of 2 after decrementing from 3', () => {
    wrapper.setState({ index: 3 });
    wrapper.prop('indexDecrement')();
    expect(wrapper.state('index')).toBe(2);
  });

  it('has an `index` state of 1 on increment from 0', () => {
    wrapper.setState({ index: 0 });
    wrapper.prop('indexIncrement')();
    expect(wrapper.state('index')).toBe(1);
  });

  it('has Max Index state after decrementing from 0', () => {
    wrapper.setState({ index: 0 });
    wrapper.prop('indexDecrement')(3);
    expect(wrapper.state('index')).toBe(2);
  });

  it('has 0 Index state after incrementing from maxIndex', () => {
    wrapper.setState({ index: 2 });
    wrapper.prop('indexIncrement')(3);
    expect(wrapper.state('index')).toBe(0);
  });
});
