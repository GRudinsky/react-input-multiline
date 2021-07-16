import React from 'react';
import { mount } from 'enzyme';
import { MultilineInput } from '../src/MultilineInput';

describe('<AutosizeEditableContent />', () => {
  const contentProps = {
    id: 'message',
    placeholder: 'Type your message here...',
    onChange: jest.fn(),
    value: 'some Value'
  };
  let wrapper = null;

  afterEach(() => {
    wrapper = null;
    jest.resetAllMocks();
  });

  it('should render one div', () => {
    wrapper = mount(<MultilineInput { ...contentProps } />);
    const component = wrapper.find('MultilineInput').find('div');
    expect(component).toHaveLength(1);
    expect(component.props().placeholder).toBe(contentProps.placeholder);
    expect(component.props().className).toBe('multilineInput');
    expect(component.props().id).toBe(contentProps.id);
    expect(component.text()).toEqual(contentProps.value);
  });

  it('should push additional classes to classlist of the child div', () => {
    const additionalClasses = ['class1', 'class2'];

    wrapper = mount(<MultilineInput { ...{ ...contentProps, additionalClasses } } />);
    const component = wrapper.find('MultilineInput').find('div');
    expect(component.props().className).toEqual('multilineInput class1 class2');
  });

  it(`should cancel the key Down event for "Enter" key when preventLineBreaks is true`, () => {
    const event = {
      key: 'Enter',
      preventDefault: jest.fn()
    };
    wrapper = mount(<MultilineInput {...{ ...contentProps, preventLineBreaks : true } } />);
    const component = wrapper.find('MultilineInput').find('div');
    component.simulate('keyDown', event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
  });

  it(`should add the "inlineBlock" clasa to the classList additional class when the value is empty string`, () => {
    const value = 'a';
    const event = {
      target: {
        innerText: ''
      }
    };
    wrapper = mount(<MultilineInput { ...{ ...contentProps, value } } />);
    let component = wrapper.find('MultilineInput').find('div');

    expect(component.props().title).toEqual('a');
    expect(component.props().className).toEqual('multilineInput');
    component.simulate('input', event);

    component = wrapper.find('MultilineInput').find('div');
    expect(component.props().title).toEqual('');
    expect(component.props().className).toEqual('multilineInput inlineBlock');
  });
});

