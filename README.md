# 🔄 NodeFlow

A modern workflow automation platform built with Next.js, featuring AI integration, background job processing, and a beautiful UI.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🎨 **Modern UI** - Built with shadcn/ui and Tailwind CSS
- 🔐 **Authentication** - Secure email/password auth with Better Auth
- 🤖 **AI Integration** - Support for OpenAI, Anthropic, Google Gemini, and DeepSeek
- ⚡ **Background Jobs** - Powered by Inngest for reliable async processing
- 📊 **Type-Safe APIs** - End-to-end type safety with tRPC
- 💾 **Database** - PostgreSQL with Prisma ORM
- 🎯 **Error Tracking** - Integrated with Sentry
- 📱 **Responsive Design** - Mobile-first approach

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15.5.4 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui + Radix UI
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

### Backend
- **API**: tRPC for type-safe APIs
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: Better Auth
- **Background Jobs**: Inngest
- **AI SDKs**: Vercel AI SDK with multiple providers

### DevOps
- **Monitoring**: Sentry
- **Code Quality**: Biome
- **Process Management**: mprocs

## 📋 Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- PostgreSQL database (or Neon account)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iway-irshad/nodeflow.git
   cd nodeflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://..."

   # Better Auth
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"

   # AI Providers (Optional)
   OPENAI_API_KEY="sk-or-v1-..."  # OpenRouter key
   GOOGLE_GENERATIVE_AI_API_KEY="..."
   ANTHROPIC_API_KEY="..."
   DEEPSEEK_API_KEY="..."

   # Sentry (Optional)
   SENTRY_AUTH_TOKEN="..."
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Run the development server**
   ```bash
   # Run Next.js only
   npm run dev

   # Run Next.js + Inngest (recommended)
   npm run dev:all
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
nodeflow/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── public/                    # Static files
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # Auth pages (login, signup)
│   │   ├── (dashboard)/      # Dashboard pages
│   │   └── api/              # API routes
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   └── ...               # Custom components
│   ├── features/
│   │   ├── auth/             # Auth feature
│   │   └── workflows/        # Workflows feature
│   ├── lib/                  # Utilities and configs
│   ├── trpc/                 # tRPC routers and setup
│   ├── inngest/              # Background job functions
│   └── generated/
│       └── prisma/           # Generated Prisma client
├── .env                      # Environment variables
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start Next.js dev server
npm run dev:all          # Start Next.js + Inngest dev server

# Build
npm run build            # Build for production

# Production
npm run start            # Start production server

# Database
npx prisma studio        # Open Prisma Studio
npx prisma migrate dev   # Create and apply migration
npx prisma generate      # Regenerate Prisma client

# Code Quality
npm run lint             # Run Biome linter
npm run format           # Format code with Biome

# Background Jobs
npm run inngest:dev      # Start Inngest dev server
```

## 🗄️ Database Schema

Key models:
- **User**: User accounts with authentication
- **Session**: User sessions
- **Account**: OAuth accounts
- **Workflow**: Workflow definitions
- **Verification**: Email verification tokens

## 🔐 Authentication

The app uses [Better Auth](https://better-auth.com/) with:
- ✅ Email/Password authentication
- ✅ Auto sign-in after signup
- ✅ Session management
- ✅ Protected routes

## 🤖 AI Integration

Supports multiple AI providers through OpenRouter:
- OpenAI (GPT-4o-mini)
- Anthropic (Claude 3.5 Haiku)
- DeepSeek
- Google Gemini (direct integration)

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` | React framework |
| `@trpc/server` | Type-safe APIs |
| `@prisma/client` | Database ORM |
| `@polar-sh/better-auth` | Authentication |
| `inngest` | Background jobs |
| `@ai-sdk/*` | AI integrations |
| `@radix-ui/*` | UI primitives |
| `tailwindcss` | Styling |
| `zod` | Schema validation |
| `react-hook-form` | Form management |

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS
- Google Cloud
- Self-hosted

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Irshad**
- GitHub: [@iway-irshad](https://github.com/iway-irshad)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)
- [tRPC](https://trpc.io/)
- [Better Auth](https://better-auth.com/)
- [Inngest](https://www.inngest.com/)

---

<p align="center">Made with ❤️ by Irshad</p>
