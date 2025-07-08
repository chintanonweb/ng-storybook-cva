import { Injectable, computed } from '@angular/core';
import { UsersService } from './users.service';
import { TasksService } from './tasks.service';
import { DashboardStats } from '../types';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private usersService: UsersService,
    private tasksService: TasksService
  ) {}

  stats = computed<DashboardStats>(() => {
    const users = this.usersService.users();
    const tasks = this.tasksService.tasks();

    return {
      totalUsers: users.length,
      totalTasks: tasks.length,
      completedTasks: tasks.filter(task => task.status === 'completed').length,
      pendingTasks: tasks.filter(task => task.status !== 'completed').length
    };
  });

  recentTasks = computed(() => {
    return this.tasksService.tasks()
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 5);
  });

  recentUsers = computed(() => {
    return this.usersService.users()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);
  });
}