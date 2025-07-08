import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../types';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent } from '../../components/ui/card/card.component';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { BadgeComponent } from '../../components/ui/badge/badge.component';
import { formatDate } from '../../lib/utils';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    ButtonComponent,
    BadgeComponent
  ],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Tasks</h1>
          <p class="text-muted-foreground">Manage your tasks and projects</p>
        </div>
        <ui-button (onClick)="openCreateModal()">
          <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </ui-button>
      </div>

      <!-- Tasks List -->
      <ui-card>
        <ui-card-header>
          <ui-card-title>All Tasks</ui-card-title>
        </ui-card-header>
        <ui-card-content>
          <div class="space-y-4">
            @for (task of tasksService.tasks(); track task.id) {
              <div class="flex items-start justify-between p-4 border rounded-lg">
                <div class="space-y-2 flex-1">
                  <div class="flex items-center space-x-2">
                    <h3 class="text-sm font-medium">{{ task.title }}</h3>
                    <ui-badge [variant]="getTaskStatusVariant(task.status)">{{ task.status }}</ui-badge>
                    <ui-badge [variant]="getTaskPriorityVariant(task.priority)">{{ task.priority }}</ui-badge>
                  </div>
                  <p class="text-sm text-muted-foreground">{{ task.description }}</p>
                  <div class="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Created: {{ formatDate(task.createdAt) }}</span>
                    @if (task.dueDate) {
                      <span>Due: {{ formatDate(task.dueDate) }}</span>
                    }
                  </div>
                </div>
                <div class="flex space-x-2">
                  <ui-button variant="outline" size="sm" (onClick)="editTask(task)">Edit</ui-button>
                  <ui-button variant="destructive" size="sm" (onClick)="deleteTask(task.id)">Delete</ui-button>
                </div>
              </div>
            } @empty {
              <p class="text-center text-muted-foreground py-8">No tasks found</p>
            }
          </div>
        </ui-card-content>
      </ui-card>

      <!-- Create/Edit Modal -->
      @if (showModal()) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ui-card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <ui-card-header>
              <ui-card-title>{{ editingTask() ? 'Edit Task' : 'Create Task' }}</ui-card-title>
            </ui-card-header>
            <ui-card-content>
              <form (ngSubmit)="saveTask()" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.title"
                    name="title"
                    required
                    class="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    [(ngModel)]="formData.description"
                    name="description"
                    required
                    rows="3"
                    class="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Status</label>
                  <select
                    [(ngModel)]="formData.status"
                    name="status"
                    required
                    class="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Priority</label>
                  <select
                    [(ngModel)]="formData.priority"
                    name="priority"
                    required
                    class="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Due Date (Optional)</label>
                  <input
                    type="date"
                    [(ngModel)]="formData.dueDate"
                    name="dueDate"
                    class="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div class="flex justify-end space-x-2">
                  <ui-button type="button" variant="outline" (onClick)="closeModal()">Cancel</ui-button>
                  <ui-button type="submit">{{ editingTask() ? 'Update' : 'Create' }}</ui-button>
                </div>
              </form>
            </ui-card-content>
          </ui-card>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent {
  showModal = signal(false);
  editingTask = signal<Task | null>(null);

  formData = {
    title: '',
    description: '',
    status: 'todo' as Task['status'],
    priority: 'medium' as Task['priority'],
    dueDate: ''
  };

  constructor(protected tasksService: TasksService) {}

  protected formatDate = formatDate;

  openCreateModal(): void {
    this.editingTask.set(null);
    this.resetForm();
    this.showModal.set(true);
  }

  editTask(task: Task): void {
    this.editingTask.set(task);
    this.formData = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : ''
    };
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.editingTask.set(null);
    this.resetForm();
  }

  saveTask(): void {
    const currentTask = this.editingTask();
    const taskData = {
      ...this.formData,
      dueDate: this.formData.dueDate ? new Date(this.formData.dueDate) : undefined
    };
    
    if (currentTask) {
      // Update existing task
      this.tasksService.updateTask(currentTask.id, taskData);
    } else {
      // Create new task
      this.tasksService.createTask(taskData);
    }
    
    this.closeModal();
  }

  deleteTask(id: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasksService.deleteTask(id);
    }
  }

  private resetForm(): void {
    this.formData = {
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: ''
    };
  }

  getTaskStatusVariant(status: string): 'success' | 'warning' | 'default' {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      default: return 'default';
    }
  }

  getTaskPriorityVariant(priority: string): 'destructive' | 'warning' | 'default' {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      default: return 'default';
    }
  }
}