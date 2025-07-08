import { Injectable, signal } from '@angular/core';
import { StorageService } from '../lib/storage.service';
import { User } from '../types';
import { generateId } from '../lib/utils';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly STORAGE_KEY = 'dashboard_users';
  private usersSignal = signal<User[]>([]);

  users = this.usersSignal.asReadonly();

  constructor(private storage: StorageService) {
    this.loadUsers();
  }

  private loadUsers(): void {
    const stored = this.storage.getItem<User[]>(this.STORAGE_KEY);
    if (stored) {
      // Convert date strings back to Date objects
      const users = stored.map(user => ({
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt)
      }));
      this.usersSignal.set(users);
    } else {
      // Initialize with sample data
      this.initializeSampleData();
    }
  }

  private saveUsers(): void {
    this.storage.setItem(this.STORAGE_KEY, this.usersSignal());
  }

  private initializeSampleData(): void {
    const sampleUsers: User[] = [
      {
        id: generateId(),
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        status: 'active',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: generateId(),
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'user',
        status: 'active',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
      },
      {
        id: generateId(),
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'moderator',
        status: 'inactive',
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-01-25')
      }
    ];
    this.usersSignal.set(sampleUsers);
    this.saveUsers();
  }

  createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const newUser: User = {
      ...userData,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.usersSignal.update(users => [...users, newUser]);
    this.saveUsers();
    return newUser;
  }

  updateUser(id: string, updates: Partial<Omit<User, 'id' | 'createdAt'>>): User | null {
    const users = this.usersSignal();
    const index = users.findIndex(user => user.id === id);
    
    if (index === -1) return null;

    const updatedUser = {
      ...users[index],
      ...updates,
      updatedAt: new Date()
    };

    this.usersSignal.update(users => [
      ...users.slice(0, index),
      updatedUser,
      ...users.slice(index + 1)
    ]);
    
    this.saveUsers();
    return updatedUser;
  }

  deleteUser(id: string): boolean {
    const users = this.usersSignal();
    const filteredUsers = users.filter(user => user.id !== id);
    
    if (filteredUsers.length === users.length) return false;
    
    this.usersSignal.set(filteredUsers);
    this.saveUsers();
    return true;
  }

  getUserById(id: string): User | undefined {
    return this.usersSignal().find(user => user.id === id);
  }
}