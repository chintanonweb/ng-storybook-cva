import { Injectable, signal } from '@angular/core';
import { StorageService } from '../lib/storage.service';
import { Task } from '../types';
import { generateId } from '../lib/utils';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly STORAGE_KEY = 'dashboard_tasks';
  private tasksSignal = signal<Task[]>([]);

  tasks = this.tasksSignal.asReadonly();

  constructor(private storage: StorageService) {
    this.loadTasks();
  }

  private loadTasks(): void {
    const stored = this.storage.getItem<Task[]>(this.STORAGE_KEY);
    if (stored) {
      // Convert date strings back to Date objects
      const tasks = stored.map(task => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined
      }));
      this.tasksSignal.set(tasks);
    } else {
      // Initialize with sample data
      this.initializeSampleData();
    }
  }

  private saveTasks(): void {
    this.storage.setItem(this.STORAGE_KEY, this.tasksSignal());
  }

  private initializeSampleData(): void {
    const sampleTasks: Task[] = [
      {
        id: generateId(),
        title: 'Setup project structure',
        description: 'Create the initial project structure and configuration',
        status: 'completed',
        priority: 'high',
        dueDate: new Date('2024-02-01'),
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20')
      },
      {
        id: generateId(),
        title: 'Implement user authentication',
        description: 'Add login and registration functionality',
        status: 'in-progress',
        priority: 'high',
        dueDate: new Date('2024-02-15'),
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-25')
      },
      {
        id: generateId(),
        title: 'Design dashboard UI',
        description: 'Create wireframes and mockups for the dashboard',
        status: 'todo',
        priority: 'medium',
        dueDate: new Date('2024-02-20'),
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-01-25')
      }
    ];
    this.tasksSignal.set(sampleTasks);
    this.saveTasks();
  }

  createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.tasksSignal.update(tasks => [...tasks, newTask]);
    this.saveTasks();
    return newTask;
  }

  updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null {
    const tasks = this.tasksSignal();
    const index = tasks.findIndex(task => task.id === id);
    
    if (index === -1) return null;

    const updatedTask = {
      ...tasks[index],
      ...updates,
      updatedAt: new Date()
    };

    this.tasksSignal.update(tasks => [
      ...tasks.slice(0, index),
      updatedTask,
      ...tasks.slice(index + 1)
    ]);
    
    this.saveTasks();
    return updatedTask;
  }

  deleteTask(id: string): boolean {
    const tasks = this.tasksSignal();
    const filteredTasks = tasks.filter(task => task.id !== id);
    
    if (filteredTasks.length === tasks.length) return false;
    
    this.tasksSignal.set(filteredTasks);
    this.saveTasks();
    return true;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasksSignal().find(task => task.id === id);
  }
}