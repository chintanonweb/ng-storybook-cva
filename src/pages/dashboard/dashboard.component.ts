import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardContentComponent,
} from '../../components/ui/card/card.component';
import { BadgeComponent } from '../../components/ui/badge/badge.component';
import { formatDate } from '../../lib/utils';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    BadgeComponent,
  ],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p class="text-muted-foreground">Welcome to your dashboard overview</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ui-card>
          <ui-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <ui-card-title class="text-sm font-medium">Total Users</ui-card-title>
          </ui-card-header>
          <ui-card-content>
            <div class="text-2xl font-bold">{{ dashboardService.stats().totalUsers }}</div>
            <p class="text-xs text-muted-foreground">Active users in system</p>
          </ui-card-content>
        </ui-card>

        <ui-card>
          <ui-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <ui-card-title class="text-sm font-medium">Total Tasks</ui-card-title>
          </ui-card-header>
          <ui-card-content>
            <div class="text-2xl font-bold">{{ dashboardService.stats().totalTasks }}</div>
            <p class="text-xs text-muted-foreground">All tasks in system</p>
          </ui-card-content>
        </ui-card>

        <ui-card>
          <ui-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <ui-card-title class="text-sm font-medium">Completed</ui-card-title>
          </ui-card-header>
          <ui-card-content>
            <div class="text-2xl font-bold">{{ dashboardService.stats().completedTasks }}</div>
            <p class="text-xs text-muted-foreground">Tasks completed</p>
          </ui-card-content>
        </ui-card>

        <ui-card>
          <ui-card-header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <ui-card-title class="text-sm font-medium">Pending</ui-card-title>
          </ui-card-header>
          <ui-card-content>
            <div class="text-2xl font-bold">{{ dashboardService.stats().pendingTasks }}</div>
            <p class="text-xs text-muted-foreground">Tasks pending</p>
          </ui-card-content>
        </ui-card>
      </div>

      <!-- Recent Activity -->
      <div class="grid gap-4 md:grid-cols-2">
        <!-- Recent Tasks -->
        <ui-card>
          <ui-card-header>
            <ui-card-title>Recent Tasks</ui-card-title>
          </ui-card-header>
          <ui-card-content>
            <div class="space-y-4">
              @for (task of dashboardService.recentTasks(); track task.id) {
                <div class="flex items-center justify-between">
                  <div class="space-y-1">
                    <p class="text-sm font-medium leading-none">{{ task.title }}</p>
                    <p class="text-sm text-muted-foreground">{{ formatDate(task.updatedAt) }}</p>
                  </div>
                  <ui-badge [variant]="getTaskStatusVariant(task.status)">
                    {{ task.status }}
                  </ui-badge>
                </div>
              } @empty {
                <p class="text-sm text-muted-foreground">No tasks found</p>
              }
            </div>
          </ui-card-content>
        </ui-card>

        <!-- Recent Users -->
        <ui-card>
          <ui-card-header>
            <ui-card-title>Recent Users</ui-card-title>
          </ui-card-header>
          <ui-card-content>
            <div class="space-y-4">
              @for (user of dashboardService.recentUsers(); track user.id) {
                <div class="flex items-center justify-between">
                  <div class="space-y-1">
                    <p class="text-sm font-medium leading-none">{{ user.name }}</p>
                    <p class="text-sm text-muted-foreground">{{ user.email }}</p>
                  </div>
                  <ui-badge [variant]="getUserStatusVariant(user.status)">
                    {{ user.status }}
                  </ui-badge>
                </div>
              } @empty {
                <p class="text-sm text-muted-foreground">No users found</p>
              }
            </div>
          </ui-card-content>
        </ui-card>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  constructor(protected dashboardService: DashboardService) {}

  protected formatDate = formatDate;

  getTaskStatusVariant(status: string): 'success' | 'warning' | 'default' {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      default:
        return 'default';
    }
  }

  getUserStatusVariant(status: string): 'success' | 'destructive' {
    return status === 'active' ? 'success' : 'destructive';
  }
}
