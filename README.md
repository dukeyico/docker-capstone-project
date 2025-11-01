# Full-Stack Todo App

A modern, full-featured todo application built with React and Convex, featuring real-time updates, user authentication, and comprehensive task management.

## Features

### Core Functionality
- ✅ **Create Tasks** - Add new tasks with title, description, due date, and priority
- 📖 **View Tasks** - Clean, organized list view with filtering and search
- ✏️ **Edit Tasks** - Update any task details inline
- 🗑️ **Delete Tasks** - Remove tasks with confirmation dialog
- ☑️ **Toggle Completion** - Mark tasks as completed or pending

### Advanced Features
- 🔍 **Search & Filter** - Find tasks by keyword or filter by status
- 📊 **Task Statistics** - View completion progress and task counts
- 🎯 **Priority Levels** - Organize tasks by Low, Medium, or High priority
- 📅 **Due Dates** - Set and track task deadlines with overdue indicators
- 🔄 **Real-time Updates** - Changes sync instantly across all devices
- 🔐 **User Authentication** - Secure login with personal task management
- 📱 **Responsive Design** - Works perfectly on desktop and mobile

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Convex (real-time database and functions)
- **Authentication**: Convex Auth
- **Notifications**: Sonner (toast notifications)
- **Styling**: Tailwind CSS with custom design system

## Getting Started

### Prerequisites
- Node.js 18+ installed
- A Convex account (free at [convex.dev](https://convex.dev))

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up Convex**:
   ```bash
   npx convex dev
   ```
   This will:
   - Create a new Convex project
   - Set up authentication
   - Deploy the database schema and functions

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:5173`

## Usage

### Getting Started
1. **Sign Up/Sign In** - Create an account or sign in with existing credentials
2. **Add Your First Task** - Click "Add Task" and fill in the details
3. **Organize Tasks** - Set priorities, due dates, and descriptions
4. **Track Progress** - Use filters and view your completion statistics

### Task Management
- **Quick Actions**: Click the checkbox to toggle completion, or use the edit/delete buttons
- **Bulk Operations**: Use filters to focus on specific task types
- **Search**: Find tasks quickly by typing in the search box
- **Priority System**: Use color-coded priorities (🔴 High, 🟡 Medium, 🟢 Low)

### Filtering & Search
- **All Tasks**: View everything in your task list
- **Pending**: Focus on incomplete tasks
- **Completed**: Review finished tasks
- **Search**: Find tasks by title or description content

## Project Structure

```
src/
├── components/
│   ├── TodoApp.tsx          # Main app component
│   ├── TaskForm.tsx         # Task creation/editing form
│   ├── TaskList.tsx         # Task list container
│   ├── TaskItem.tsx         # Individual task component
│   ├── TaskStats.tsx        # Statistics dashboard
│   └── TaskFilters.tsx      # Search and filter controls
├── App.tsx                  # Root component with auth
└── main.tsx                 # App entry point

convex/
├── schema.ts                # Database schema definition
├── tasks.ts                 # Task CRUD operations
├── auth.ts                  # Authentication setup
└── _generated/              # Auto-generated Convex files
```

## API Functions

### Queries
- `getTasks(filter?, search?)` - Fetch filtered and searched tasks
- `getTaskStats()` - Get task completion statistics

### Mutations
- `createTask(title, description?, dueDate?, priority)` - Create new task
- `updateTask(id, updates)` - Update existing task
- `toggleTask(id)` - Toggle task completion status
- `deleteTask(id)` - Delete a task

## Database Schema

```typescript
tasks: {
  title: string              // Task title (required)
  description?: string       // Optional description
  completed: boolean         // Completion status
  userId: Id<"users">       // Owner reference
  dueDate?: number          // Optional due date timestamp
  priority: "low" | "medium" | "high"  // Priority level
  _creationTime: number     // Auto-generated timestamp
  _id: Id<"tasks">          // Auto-generated unique ID
}
```

## Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set up environment variables
4. Configure redirects for SPA routing

### Environment Variables
The app uses Convex for backend services, so no additional environment variables are needed for basic functionality.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit with descriptive messages: `git commit -m "Add feature description"`
5. Push to your branch: `git push origin feature-name`
6. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

- 📖 [Convex Documentation](https://docs.convex.dev)
- 💬 [Convex Discord Community](https://convex.dev/community)
- 🐛 [Report Issues](https://github.com/your-repo/issues)

---

Built with ❤️ using React and Convex
