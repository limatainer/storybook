import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './my-element';

const meta: Meta = {
  title: 'Components/MyElement',
  tags: ['autodocs'],
  render: () => html`<my-element></my-element>`,
  argTypes: {
  }
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
  args: {
  }
};

export const Secondary: Story = {
  args: {
  }
};