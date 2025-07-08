import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      padding: {
        none: '',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },
      shadow: {
        none: 'shadow-none',
        sm: 'shadow-sm',
        default: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
      },
    },
    defaultVariants: {
      padding: 'default',
      shadow: 'default',
    },
  }
);

export interface CardProps extends VariantProps<typeof cardVariants> {}

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cn(cardVariants({ padding, shadow }), className)">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements CardProps {
  @Input() padding: CardProps['padding'] = 'default';
  @Input() shadow: CardProps['shadow'] = 'default';
  @Input() className = '';

  protected readonly cn = cn;
  protected readonly cardVariants = cardVariants;
}

@Component({
  selector: 'ui-card-header',
  standalone: true,
  template: `
    <div class="flex flex-col space-y-1.5 p-6">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardHeaderComponent {}

@Component({
  selector: 'ui-card-title',
  standalone: true,
  template: `
    <h3 class="text-2xl font-semibold leading-none tracking-tight">
      <ng-content></ng-content>
    </h3>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardTitleComponent {}

@Component({
  selector: 'ui-card-content',
  standalone: true,
  template: `
    <div class="p-6 pt-0">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardContentComponent {}