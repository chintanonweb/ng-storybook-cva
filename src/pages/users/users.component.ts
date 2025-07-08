import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../types';
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardContentComponent } from '../../components/ui/card/card.component';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { BadgeComponent } from '../../components/ui/badge/badge.component';
import { formatDate } from '../../lib/utils';

@Component({
  selector: 'app-users',
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
          <h1 class="text-3xl font-bold tracking-tight">Users</h1>
          <p class="text-muted-foreground">Manage system users</p>
        </div>
        <ui-button (onClick)="openCreateModal()">
          <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add User
        </ui-button>
      </div>

      <!-- Users List -->
      <ui-card>
        <ui-card-header>
          <ui-card-title>All Users</ui-card-title>
        </ui-card-header>
        <ui-card-content>
          <div class="space-y-4">
            @for (user of usersService.users(); track user.id) {
              <div class="flex items-center justify-between p-4 border rounded-lg">
                <div class="space-y-1">
                  <div class="flex items-center space-x-2">
                    <p class="text-sm font-medium">{{ user.name }}</p>
                    <ui-badge [variant]="getUserRoleVariant(user.role)">{{ user.role }}</ui-badge>
                    <ui-badge [variant]="getUserStatusVariant(user.status)">{{ user.status }}</ui-badge>
                  </div>
                  <p class="text-sm text-muted-foreground">{{ user.email }}</p>
                  <p class="text-xs text-muted-foreground">Created: {{ formatDate(user.createdAt) }}</p>
                </div>
                <div class="flex space-x-2">
                  <ui-button variant="outline" size="sm" (onClick)="editUser(user)">Edit</ui-button>
                  <ui-button variant="destructive" size="sm" (onClick)="deleteUser(user.id)">Delete</ui-button>
                </div>
              </div>
            } @empty {
              <p class="text-center text-muted-foreground py-8">No users found</p>
            }
          </div>
        </ui-card-content>
      </ui-card>

      <!-- Create/Edit Modal -->
      @if (showModal()) {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ui-card className="w-full max-w-md">
            <ui-card-header>
              <ui-card-title>{{ editingUser() ? 'Edit User' : 'Create User' }}</ui-card-title>
            </ui-card-header>
            <ui-card-content>
              <form (ngSubmit)="saveUser()" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    [(ngModel)]="formData.name"
                    name="name"
                    required
                    class="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    [(ngModel)]="formData.email"
                    name="email"
                    required
                    class="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Role</label>
                  <select
                    [(ngModel)]="formData.role"
                    name="role"
                    required
                    class="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Status</label>
                  <select
                    [(ngModel)]="formData.status"
                    name="status"
                    required
                    class="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div class="flex justify-end space-x-2">
                  <ui-button type="button" variant="outline" (onClick)="closeModal()">Cancel</ui-button>
                  <ui-button type="submit">{{ editingUser() ? 'Update' : 'Create' }}</ui-button>
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
export class UsersComponent {
  showModal = signal(false);
  editingUser = signal<User | null>(null);

  formData = {
    name: '',
    email: '',
    role: 'user' as User['role'],
    status: 'active' as User['status']
  };

  constructor(protected usersService: UsersService) {}

  protected formatDate = formatDate;

  openCreateModal(): void {
    this.editingUser.set(null);
    this.resetForm();
    this.showModal.set(true);
  }

  editUser(user: User): void {
    this.editingUser.set(user);
    this.formData = {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    };
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.editingUser.set(null);
    this.resetForm();
  }

  saveUser(): void {
    const currentUser = this.editingUser();
    
    if (currentUser) {
      // Update existing user
      this.usersService.updateUser(currentUser.id, this.formData);
    } else {
      // Create new user
      this.usersService.createUser(this.formData);
    }
    
    this.closeModal();
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.usersService.deleteUser(id);
    }
  }

  private resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      role: 'user',
      status: 'active'
    };
  }

  getUserRoleVariant(role: string): 'default' | 'secondary' | 'info' {
    switch (role) {
      case 'admin': return 'info';
      case 'moderator': return 'secondary';
      default: return 'default';
    }
  }

  getUserStatusVariant(status: string): 'success' | 'destructive' {
    return status === 'active' ? 'success' : 'destructive';
  }
}