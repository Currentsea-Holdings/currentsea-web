import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { CSCard, type CardProps } from '@/components/common/CSCard';

export default {
  title: 'Components/CSCard',
  component: CSCard,
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
} as Meta<typeof CSCard>;

const Template: StoryFn<CardProps> = (args) => <CSCard {...args} />;

export const Default = Template.bind({});
Default.storyName = 'Primary';
Default.args = {};
