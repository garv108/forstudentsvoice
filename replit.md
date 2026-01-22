# StudentVoice Landing Page

## Overview

StudentVoice is a modern, single-page marketing landing page for a SaaS platform that provides proactive student feedback systems to colleges and universities. The application features a React frontend with 3D visual elements, smooth animations, and a contact form that connects to a PostgreSQL backend for storing demo requests.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS with custom design tokens defined in CSS variables
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **3D Graphics**: React Three Fiber with Drei helpers for floating 3D elements in hero section
- **Animations**: Framer Motion for scroll reveals and page transitions
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query for server state

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript compiled with tsx for development, esbuild for production
- **API Pattern**: Simple REST endpoints defined in `shared/routes.ts`
- **Database ORM**: Drizzle ORM with PostgreSQL

### Build System
- **Frontend Build**: Vite with React plugin
- **Backend Build**: esbuild bundling with selective dependency externalization
- **Development**: Hot module replacement via Vite dev server proxied through Express

### Project Structure
```
client/           # Frontend React application
  src/
    components/   # Reusable UI components
    pages/        # Route page components
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Backend Express application
  index.ts        # Server entry point
  routes.ts       # API route definitions
  storage.ts      # Database operations
  db.ts           # Database connection
shared/           # Shared code between frontend/backend
  schema.ts       # Drizzle database schema
  routes.ts       # API route type definitions
```

### Design Decisions
1. **Monorepo Structure**: Single repository with shared types between frontend and backend reduces type drift and simplifies deployment
2. **shadcn/ui Components**: Copy-paste component model allows full customization while maintaining consistency
3. **CSS Variables for Theming**: Design tokens in `:root` enable easy theme modifications
4. **Zod Schemas**: Shared validation between client forms and server API ensures consistent data validation

## External Dependencies

### Database
- **PostgreSQL**: Primary data store accessed via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries with automatic schema migrations via `drizzle-kit push`

### Third-Party Libraries
- **@react-three/fiber + drei**: 3D rendering for visual effects
- **framer-motion**: Animation library for scroll-based reveals
- **Radix UI**: Accessible, unstyled component primitives
- **TanStack Query**: Async state management and caching

### Fonts
- **Inter**: Primary sans-serif font for body text
- **Plus Jakarta Sans**: Display font for headings
- Loaded via Google Fonts in `client/index.html`

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string (required for database operations)