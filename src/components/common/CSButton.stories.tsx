import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { CSButton, CSButtonProps } from '@/components/common/CSButton';

export default {
  title: 'Components/CSButton',
  component: CSButton,
  argTypes: {
    color: {
      options: ['primary', 'primary-light-10', 'primary-light-20'],
      control: { type: 'inline-radio' },
    },
    onClick: {
      action: 'clicked',
    },
  },
  args: {
    disabled: false,
  },
} as Meta<typeof CSButton>;

const Template: StoryFn<CSButtonProps> = (args) => <CSButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Primary',
  color: 'primary',
};

export const Disabled: StoryObj<typeof CSButton> = Template.bind({});
Disabled.args = {
  children: 'Disabled',
  color: 'primary',
  disabled: true,
};
