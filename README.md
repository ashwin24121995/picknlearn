# Pick N Learn - Fantasy Cricket Education Platform

A comprehensive educational platform for mastering fantasy cricket strategies, built with React, Node.js, tRPC, and MySQL.

## 🎯 Features

- **22+ Detailed Lessons**: Comprehensive curriculum covering fundamentals to advanced strategies
- **Interactive Quizzes**: Test your knowledge with multiple-choice questions and instant feedback
- **Extensive Glossary**: 50+ fantasy cricket terms with definitions and examples
- **Progress Tracking**: Monitor your learning journey and quiz performance
- **Premium Dark Theme**: Modern UI with glass-morphism effects and smooth animations
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Type-Safe API**: End-to-end type safety with tRPC
- **Comprehensive Testing**: 18 vitest tests covering all API endpoints

## 🚀 Tech Stack

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **tRPC** for type-safe API calls
- **Wouter** for routing
- **shadcn/ui** components
- **Vite** for build tooling

### Backend
- **Node.js** with Express
- **tRPC 11** for API layer
- **Drizzle ORM** for database operations
- **MySQL** (Railway) for data persistence
- **Vitest** for testing

## 📦 Installation

### Prerequisites
- Node.js 22.x or higher
- pnpm 10.x or higher
- MySQL database (Railway recommended)

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd pick-n-learn-platform
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL=mysql://user:password@host:port/database

   # Authentication (if using OAuth)
   JWT_SECRET=your-jwt-secret
   OAUTH_SERVER_URL=your-oauth-server-url
   VITE_OAUTH_PORTAL_URL=your-oauth-portal-url
   VITE_APP_ID=your-app-id

   # Optional: Owner information
   OWNER_OPEN_ID=owner-open-id
   OWNER_NAME=owner-name
   ```

4. **Run database migrations**
   ```bash
   pnpm db:push
   ```

5. **Seed the database**
   ```bash
   pnpm tsx server/seed-complete.mjs
   ```

6. **Start development server**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`

## 🧪 Testing

Run the test suite:
```bash
pnpm test
```

Current test coverage:
- ✅ 18 tests passing
- Lessons API (5 tests)
- Quizzes API (5 tests)
- Glossary API (7 tests)
- Auth API (1 test)

## 🏗️ Project Structure

```
pick-n-learn-platform/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Page components
│       ├── lib/           # Utilities and tRPC client
│       └── contexts/      # React contexts
├── server/                # Backend Node.js application
│   ├── _core/            # Core server functionality
│   ├── db.ts             # Database queries
│   ├── routers.ts        # tRPC routers
│   ├── *.test.ts         # Test files
│   └── seed-*.mjs        # Database seeding scripts
├── drizzle/              # Database schema and migrations
│   ├── schema.ts         # Database schema definitions
│   └── migrations/       # SQL migration files
└── shared/               # Shared types and constants
```

## 🎨 Key Pages

- **Home** (`/`) - Landing page with hero section
- **Lessons** (`/lessons`) - Browse all lessons by category
- **Lesson Detail** (`/lessons/:slug`) - Read detailed lesson content
- **Quizzes** (`/quizzes`) - Browse available quizzes
- **Quiz Detail** (`/quizzes/:slug`) - Take interactive quizzes
- **Glossary** (`/glossary`) - Search and browse fantasy cricket terms
- **About** (`/about`) - Platform information and mission

## 🗄️ Database Schema

The platform uses 13 tables:

- `users` - User accounts and authentication
- `lesson_categories` - Lesson categorization
- `lessons` - Lesson content and metadata
- `quizzes` - Quiz information
- `quiz_questions` - Quiz questions and answers
- `quiz_attempts` - User quiz submissions
- `glossary_terms` - Fantasy cricket terminology
- `user_progress` - Learning progress tracking
- `tutorials` - Step-by-step guides
- `tutorial_steps` - Individual tutorial steps
- `user_achievements` - Achievement tracking
- `user_bookmarks` - Saved content
- `user_quiz_history` - Quiz performance history

## 🚢 Deployment

### Railway Deployment

1. **Create a new Railway project**
   - Go to [Railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Add MySQL database**
   - In your Railway project, click "New"
   - Select "Database" → "MySQL"
   - Copy the `DATABASE_URL` connection string

3. **Configure environment variables**
   
   Add these variables in Railway dashboard:
   ```
   DATABASE_URL=<your-railway-mysql-url>
   NODE_ENV=production
   JWT_SECRET=<generate-random-secret>
   ```

4. **Deploy settings**
   - Build Command: `pnpm install && pnpm db:push && pnpm build`
   - Start Command: `pnpm start`
   - Root Directory: `/`

5. **Auto-deploy from GitHub**
   - Railway automatically deploys on every push to main branch
   - Monitor deployments in Railway dashboard

### Environment Variables for Production

Required:
- `DATABASE_URL` - MySQL connection string
- `NODE_ENV` - Set to `production`
- `JWT_SECRET` - Random secret for session signing

Optional (for OAuth):
- `OAUTH_SERVER_URL`
- `VITE_OAUTH_PORTAL_URL`
- `VITE_APP_ID`

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run test suite
- `pnpm db:push` - Push database schema changes
- `pnpm check` - TypeScript type checking
- `pnpm format` - Format code with Prettier

## 🎓 Content Overview

### Lessons
1. Introduction to Fantasy Cricket
2. Understanding Player Roles
3. Fantasy Scoring Systems
4. Understanding Contest Types
5. Recent Form Analysis
6. Bonus Points and Penalties
7. *...and 16 more lessons*

### Quizzes
- Fantasy Cricket Fundamentals Quiz
- Player Analysis Mastery
- *More quizzes coming soon*

### Glossary Terms
- Captain, Vice-Captain, Differential
- Ownership, Chalk, GPP, H2H, 50/50
- Leverage, Correlation, Stacking
- Bankroll, ROI, EV
- *...and 40+ more terms*

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [tRPC](https://trpc.io/) for type-safe APIs
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database ORM by [Drizzle](https://orm.drizzle.team/)

## 📧 Support

For questions or support, please open an issue on GitHub.

---

**Note**: This is an educational platform. We do not operate fantasy sports contests or handle real money transactions.
