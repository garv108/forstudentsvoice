# StudentVoice - Project Structure

A full-stack TypeScript web application for collecting and analyzing student feedback in educational institutions.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (React + Vite)                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   Pages     │  │ Components  │  │        Hooks           │ │
│  │  - Home     │  │ - Navbar    │  │ - use-contact          │ │
│  │  - 404      │  │ - Scene3D   │  │ - use-mobile           │ │
│  └─────────────┘  │ - UI (50+)  │  │ - use-toast            │ │
│                   └─────────────┘  └─────────────────────────┘ │
└───────────────────────────┬─────────────────────────────────────┘
                            │ HTTP/API
┌───────────────────────────┴─────────────────────────────────────┐
│                      SERVER (Express + TS)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   Routes    │  │  Storage    │  │       Database          │ │
│  │ - /api/contact  │ - PostgreSQL │  │ - Drizzle ORM         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                            │
┌───────────────────────────┴─────────────────────────────────────┐
│                        SHARED                                    │
│  - Schema definitions (Zod + Drizzle)                           │
│  - API route type definitions                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
forstudentsvoice/
├── client/                      # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx          # Main navigation header
│   │   │   ├── Scene3D.tsx         # 3D hero & feature scenes (Three.js)
│   │   │   └── ui/                 # Radix UI + Tailwind components
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── form.tsx
│   │   │       ├── input.tsx
│   │   │       ├── accordion.tsx
│   │   │       ├── dialog.tsx
│   │   │       ├── toast.tsx
│   │   │       └── ... (50+ more UI components)
│   │   ├── pages/
│   │   │   ├── Home.tsx             # Landing page with sections
│   │   │   │   - Hero with 3D scene
│   │   │   │   - Value proposition (personas)
│   │   │   │   - Features grid
│   │   │   │   - How it works (3 steps)
│   │   │   │   - Contact/demo form
│   │   │   │   - FAQ accordion
│   │   │   │   - Footer
│   │   │   └── not-found.tsx        # 404 error page
│   │   ├── hooks/
│   │   │   ├── use-contact.ts       # Contact form submission hook
│   │   │   ├── use-mobile.tsx       # Mobile detection hook
│   │   │   └── use-toast.ts         # Toast notification hook
│   │   ├── lib/
│   │   │   ├── queryClient.ts       # TanStack Query client config
│   │   │   └── utils.ts             # Utility functions (cn helper)
│   │   ├── App.tsx                  # Root component with routing
│   │   ├── main.tsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── public/
│   │   ├── favicon.png
│   │   └── logo.png
│   ├── index.html
│   └── requirements.md              # Frontend dependencies & notes
│
├── server/                       # Backend Express server
│   ├── index.ts                  # Main server setup & middleware
│   ├── routes.ts                 # API route handlers
│   ├── storage.ts                # Database storage interface
│   ├── db.ts                     # Drizzle database connection
│   ├── static.ts                 # Production static file serving
│   └── vite.ts                   # Vite dev server setup
│
├── shared/                       # Shared between client & server
│   ├── routes.ts                 # API route type definitions
│   └── schema.ts                 # Database schema & Zod schemas
│
├── script/                       # Build scripts
│   └── build.ts                  # Production build script
│
├── attached_assets/              # Asset files and documentation
│
├── package.json                  # Root package.json (monorepo-style)
├── vite.config.ts                # Vite configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── drizzle.config.ts            # Drizzle ORM configuration
└── postcss.config.js            # PostCSS configuration
```

---

## Key Files Explained

### 🔐 Core Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies: React, Express, Drizzle, Radix UI, Three.js, Framer Motion |
| `vite.config.ts` | Vite bundler config with React plugin |
| `tailwind.config.ts` | Tailwind with custom fonts (Inter, Plus Jakarta Sans) |
| `tsconfig.json` | TypeScript strict mode configuration |
| `drizzle.config.ts` | Database migration configuration |

### 🖥️ Client Entry Points

| File | Purpose |
|------|---------|
| `client/src/main.tsx` | React 18 entry point |
| `client/src/App.tsx` | Root component with wouter routing, QueryClient, TooltipProvider |

### 🖥️ Server Entry Points

| File | Purpose |
|------|---------|
| `server/index.ts` | Express app setup, middleware, error handling, route registration |
| `server/routes.ts` | API route handlers (POST /api/contact) |
| `server/storage.ts` | Database operations (createContactInquiry) |
| `server/db.ts` | PostgreSQL connection via Drizzle |

### 📦 Shared Definitions

| File | Purpose |
|------|---------|
| `shared/schema.ts` | `contactInquiries` table, Zod insert schema |
| `shared/routes.ts` | API endpoint definitions with input/output validation |

---

## API Routes

### Contact Form Submission

```
POST /api/contact
├── Input (Zod Schema)
│   ├── name: string (required)
│   ├── email: string (required)
│   ├── phone: string (optional)
│   ├── googleId: string (optional)
│   └── institution: string (required)
└── Responses
    ├── 200: { success: true }
    ├── 400: { message: string } (validation error)
    └── 500: { message: "Internal Server Error" }
```

---

## Database Schema

### contactInquiries Table

| Column | Type | Constraints |
|--------|------|-------------|
| id | serial | PRIMARY KEY |
| name | text | NOT NULL |
| email | text | NOT NULL |
| phone | text | NULLABLE |
| googleId | text | NULLABLE |
| institution | text | NOT NULL |
| createdAt | text | NOT NULL, DEFAULT "CURRENT_TIMESTAMP" |

---

## Technology Stack

### Frontend
- **Framework**: React 18.3
- **Build Tool**: Vite 7.3
- **Routing**: wouter 3.3
- **Data Fetching**: TanStack Query 5.60
- **Styling**: Tailwind CSS 3.4 + tailwind-merge
- **UI Components**: Radix UI (15+ primitives)
- **Animations**: Framer Motion 11.18
- **3D Graphics**: Three.js 0.182, @react-three/fiber 8.18, @react-three/drei 9.122
- **Forms**: React Hook Form 7.55, Zod 3.24
- **Icons**: Lucide React 0.453

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express 5.0
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM 0.39
- **Validation**: Zod 3.24

---

## Development Commands

```
bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Run production server
npm run check    # TypeScript type checking
npm run db:push  # Push database schema changes
```

---

## Important Dependencies Summary

```
# Core React
react, react-dom (18.3.1)
@tanstack/react-query (5.60.5)

# Routing & Forms
wouter (3.3.5)
react-hook-form (7.55.0)
@hookform/resolvers (3.10.0)

# UI & Styling
@radix-ui/* (multiple)
tailwindcss (3.4.17)
tailwind-merge (2.6.0)
clsx (2.1.1)

# 3D & Animations
three (0.182.0)
@react-three/fiber (8.18.0)
@react-three/drei (9.122.0)
framer-motion (11.18.2)

# Backend
express (5.0.1)
drizzle-orm (0.39.3)
drizzle-kit (0.31.8)
pg (8.16.3)

# Validation
zod (3.24.2)
```

---

## File Relationship Flow

```
User Action (Submit Contact Form)
    │
    ▼
┌─────────────────────────────────────┐
│  Home.tsx (useForm + useSubmitContact) │
│    │                                   │
│    ├── form.handleSubmit(onSubmit)   │
│    └── mutation.mutate(data)         │
└──────────────┬──────────────────────┘
               │ POST /api/contact
               ▼
┌─────────────────────────────────────┐
│  server/routes.ts                   │
│    │                                 │
│    ├── api.contact.submit.input.parse(req.body)
│    └── storage.createContactInquiry(input)
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  server/storage.ts                  │
│    │                                 │
│    └── db.insert(contactInquiries).returning()
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  server/db.ts                       │
│    │                                 │
│    └── Drizzle PostgreSQL connection│
└─────────────────────────────────────┘
```

---

*Generated for StudentVoice - A student feedback platform for educational institutions*
