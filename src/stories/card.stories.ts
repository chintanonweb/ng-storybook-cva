import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent } from '../components/ui/card/card.component';

const meta: Meta<CardComponent> = {
  title: 'UI/Card',
  component: CardComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ui-card>
        <ui-card-header>
          <ui-card-title>Card Title</ui-card-title>
        </ui-card-header>
        <ui-card-content>
          <p>This is the card content. It can contain any type of content you need.</p>
        </ui-card-content>
      </ui-card>
    `,
  }),
};

export const WithoutPadding: Story = {
  args: {
    padding: 'none',
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-card [padding]="padding">
        <div class="p-6">
          <h3 class="text-lg font-semibold">Custom Padding</h3>
          <p class="text-muted-foreground">This card has no default padding, allowing for custom spacing.</p>
        </div>
      </ui-card>
    `,
  }),
};

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-card [padding]="padding">
        <h3 class="text-lg font-semibold">Small Padding</h3>
        <p class="text-muted-foreground">This card uses small padding for a more compact layout.</p>
      </ui-card>
    `,
  }),
};

export const LargePadding: Story = {
  args: {
    padding: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-card [padding]="padding">
        <h3 class="text-lg font-semibold">Large Padding</h3>
        <p class="text-muted-foreground">This card uses large padding for a more spacious layout.</p>
      </ui-card>
    `,
  }),
};

export const LargeShadow: Story = {
  args: {
    shadow: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-card [shadow]="shadow">
        <ui-card-header>
          <ui-card-title>Large Shadow</ui-card-title>
        </ui-card-header>
        <ui-card-content>
          <p>This card has a large shadow for more visual prominence.</p>
        </ui-card-content>
      </ui-card>
    `,
  }),
};

export const NoShadow: Story = {
  args: {
    shadow: 'none',
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-card [shadow]="shadow">
        <ui-card-header>
          <ui-card-title>No Shadow</ui-card-title>
        </ui-card-header>
        <ui-card-content>
          <p>This card has no shadow for a flat design approach.</p>
        </ui-card-content>
      </ui-card>
    `,
  }),
};