import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from '../components/ui/badge/badge.component';

const meta: Meta<BadgeComponent> = {
  title: 'UI/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => ({
    props: args,
    template: '<ui-badge [variant]="variant">Default</ui-badge>',
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => ({
    props: args,
    template: '<ui-badge [variant]="variant">Secondary</ui-badge>',
  }),
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  render: (args) => ({
    props: args,
    template: '<ui-badge [variant]="variant">Destructive</ui-badge>',
  }),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => ({
    props: args,
    template: '<ui-badge [variant]="variant">Outline</ui-badge>',
  }),
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
  render: (args) => ({
    props: args,
    template: '<ui-badge [variant]="variant">Success</ui-badge>',
  }),
};

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
  render: (args) => ({
    props: args,
    template: '<ui-badge [variant]="variant">Warning</ui-badge>',
  }),
};

export const Info: Story = {
  args: {
    variant: 'info',
  },
  render: (args) => ({
    props: args,
    template: '<ui-badge [variant]="variant">Info</ui-badge>',
  }),
};

export const StatusBadges: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap gap-2">
        <ui-badge variant="success">Active</ui-badge>
        <ui-badge variant="warning">Pending</ui-badge>
        <ui-badge variant="destructive">Inactive</ui-badge>
        <ui-badge variant="info">Admin</ui-badge>
        <ui-badge variant="secondary">User</ui-badge>
        <ui-badge variant="outline">Guest</ui-badge>
      </div>
    `,
  }),
};