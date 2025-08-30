import type { User, UserPreferences } from '../entities/user';

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@zephyrai.jo',
    name: 'Zephyr Admin',
    avatar: '/avatars/admin.jpg',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    preferences: {
      theme: 'dark',
      language: 'en',
      notifications: {
        email: true,
        push: true,
        marketing: false,
      },
      ui: {
        animationLevel: 'full',
        compactMode: false,
      },
    },
  },
];

export class UserService {
  // Future: This will connect to database/API
  private users: User[] = mockUsers;

  async getUser(id: string): Promise<User | null> {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.users.find(user => user.id === id) ?? null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.users.find(user => user.email === email) ?? null;
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substring(2),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.users.push(newUser);
    return newUser;
  }

  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex === -1) return null;
    
    const existingUser = this.users[userIndex];
    if (!existingUser) return null;
    
    this.users[userIndex] = {
      ...existingUser,
      preferences: {
        ...existingUser.preferences,
        ...preferences,
      },
      updatedAt: new Date(),
    };
    
    return this.users[userIndex] ?? null;
  }

  async getAllUsers(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...this.users];
  }
}