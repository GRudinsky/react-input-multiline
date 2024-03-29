import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MultilineInput } from '../src';

const meta: Meta = {
  title: 'Welcome',
  component: MultilineInput,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<Props> = args => <MultilineInput {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  value: '',
  placeholder: 'This is a placeholder...',
  name: 'multilineInput'
};
