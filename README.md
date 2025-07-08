# Angular 18 Dashboard Application

A modern, feature-rich dashboard application built with Angular 18, featuring standalone components, Tailwind CSS, CVA styling, and comprehensive Storybook integration.

## 🚀 Features

### Core Application
- **Dashboard Overview**: Statistics cards with real-time data and recent activity feeds
- **User Management**: Complete CRUD operations for user management with role-based access
- **Task Management**: Full task lifecycle management with status tracking and priority levels
- **Dark Mode**: System-wide dark mode with localStorage persistence
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Technical Stack
- **Angular 18**: Latest Angular with standalone components architecture
- **TypeScript**: Full type safety with comprehensive interfaces
- **Tailwind CSS v3**: Utility-first CSS framework with custom design system
- **Class Variance Authority (CVA)**: Structured component variants
- **Storybook**: Component documentation and testing
- **Local Storage**: Persistent data storage

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Setup
```bash
# Clone the repository
git clone https://github.com/chintanonweb/ng-storybook-cva
cd ng-storybook-cva

# Install dependencies
npm install

# Start development server
npm start

# Start Storybook (in separate terminal)
npm run storybook
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── layout.component.ts          # Main layout with navigation
│   └── ui/
│       ├── button/
│       │   └── button.component.ts      # Button with CVA variants
│       ├── card/
│       │   └── card.component.ts        # Flexible card container
│       └── badge/
│           └── badge.component.ts       # Status badges
├── pages/
│   ├── dashboard/
│   │   └── dashboard.component.ts       # Dashboard overview
│   ├── users/
│   │   └── users.component.ts           # User management
│   └── tasks/
│       └── tasks.component.ts           # Task management
├── services/
│   ├── users.service.ts                 # User CRUD operations
│   ├── tasks.service.ts                 # Task CRUD operations
│   ├── dashboard.service.ts             # Dashboard statistics
│   ├── theme.service.ts                 # Dark mode management
│   └── storage.service.ts               # LocalStorage wrapper
├── lib/
│   ├── utils.ts                         # Utility functions
│   └── storage.service.ts               # Storage abstraction
├── types/
│   └── index.ts                         # TypeScript interfaces
├── stories/
│   ├── button.stories.ts                # Button component stories
│   ├── card.stories.ts                  # Card component stories
│   └── badge.stories.ts                 # Badge component stories
└── global_styles.css                    # Global styles and CSS variables
```

## 🎨 Design System

### Color Palette
The application uses a comprehensive color system with semantic tokens:

- **Primary**: Blue (#3B82F6) - Main brand color
- **Secondary**: Gray (#6B7280) - Secondary actions
- **Success**: Green (#10B981) - Success states
- **Warning**: Yellow (#F59E0B) - Warning states
- **Destructive**: Red (#EF4444) - Error/danger states

### Typography
- **Font Family**: System font stack for optimal performance
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Line Heights**: 120% for headings, 150% for body text

### Spacing System
8px grid system for consistent spacing:
- **Base unit**: 8px
- **Common values**: 4px, 8px, 16px, 24px, 32px, 48px, 64px

## 🧩 Components

### Button Component
```typescript
<ui-button 
  variant="default" 
  size="default" 
  (onClick)="handleClick()">
  Click me
</ui-button>
```

**Variants**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
**Sizes**: `default`, `sm`, `lg`, `icon`

### Card Component
```typescript
<ui-card padding="default" shadow="default">
  <ui-card-header>
    <ui-card-title>Card Title</ui-card-title>
  </ui-card-header>
  <ui-card-content>
    Card content goes here
  </ui-card-content>
</ui-card>
```

### Badge Component
```typescript
<ui-badge variant="success">Active</ui-badge>
```

**Variants**: `default`, `secondary`, `destructive`, `outline`, `success`, `warning`, `info`

## 📊 Data Management

### Local Storage
All data is persisted using localStorage with the following keys:
- `dashboard_users` - User data
- `dashboard_tasks` - Task data  
- `dashboard_theme` - Theme preference

### Services
- **UsersService**: Manages user CRUD operations
- **TasksService**: Handles task lifecycle management
- **DashboardService**: Computes statistics and recent activity
- **ThemeService**: Manages dark/light mode switching
- **StorageService**: Abstracts localStorage operations

## 🎭 Storybook

Access component documentation and interactive examples:

```bash
npm run storybook
```

Visit `http://localhost:6006` to explore:
- Component variations and states
- Interactive controls
- Documentation and usage examples
- Dark mode testing

### Story Structure
Each component includes multiple focused stories:
- **Default**: Basic component usage
- **Variants**: Different visual styles
- **Sizes**: Size variations
- **States**: Interactive states
- **Examples**: Real-world usage scenarios

## 🌙 Dark Mode

The application supports system-wide dark mode with:
- **Auto-detection**: Respects system preference on first visit
- **Manual toggle**: Theme switcher in navigation
- **Persistence**: Saves preference in localStorage
- **Storybook support**: Dark mode testing in Storybook

## 📱 Responsive Design

Mobile-first responsive design with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Features:
- Collapsible navigation menu
- Responsive grid layouts
- Touch-friendly interface elements
- Optimized typography scaling

## 🔧 Development

### Available Scripts

```bash
# Development server
npm start

# Build for production
npm run build

# Run Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

### Code Style
- **OnPush Change Detection**: Optimized performance
- **Standalone Components**: Modern Angular architecture
- **Signal-based State**: Reactive state management
- **TypeScript Strict Mode**: Enhanced type safety

## 🚀 Deployment

### Production Build
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Storybook Deployment
```bash
npm run build-storybook
```

Static Storybook files will be generated in `storybook-static/`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Angular Team](https://angular.io/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Storybook](https://storybook.js.org/) for component development tools
- [Class Variance Authority](https://cva.style/) for variant management

---

Built with ❤️ using Angular 18, Tailwind CSS, and modern web technologies.