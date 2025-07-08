import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../components/ui/button/button.component';

const meta: Meta<ButtonComponent> = {
  title: 'UI/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => ({
    props: args,
    template: '<ui-button [variant]="variant" [size]="size">Button</ui-button>',
  }),
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  render: (args) => ({
    props: args,
    template: '<ui-button [variant]="variant" [size]="size">Delete</ui-button>',
  }),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => ({
    props: args,
    template: '<ui-button [variant]="variant" [size]="size">Outline</ui-button>',
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => ({
    props: args,
    template: '<ui-button [variant]="variant" [size]="size">Secondary</ui-button>',
  }),
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
  render: (args) => ({
    props: args,
    template: '<ui-button [variant]="variant" [size]="size">Ghost</ui-button>',
  }),
};

export const Link: Story = {
  args: {
    variant: 'link',
  },
  render: (args) => ({
    props: args,
    template: '<ui-button [variant]="variant" [size]="size">Link</ui-button>',
  }),
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => ({
    props: args,
    template: '<ui-button [variant]="variant" [size]="size">Small</ui-button>',
  }),
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => ({
    props: args,
    template: '<ui-button [variant]="variant" [size]="size">Large</ui-button>',
  }),
};

export const Icon: Story = {
  args: {
    size: 'icon',
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-button [variant]="variant" [size]="size">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </ui-button>
    `,
  }),
};
