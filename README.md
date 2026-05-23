# ProjectSync

A full-stack Kanban-style project management tool for teams — built with React, Node.js, Express, MongoDB, and Socket.io.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Real-time Events](#real-time-events)
- [Screens & Pages](#screens--pages)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

---

## Overview

ProjectSync is a collaborative project management web application inspired by Trello and Asana. Teams can create project boards, organize tasks into Kanban columns, assign cards to members, track progress, and communicate through comments — all in real time.

---

## Features

- **Authentication** — Register, login, logout with JWT. Protected routes on both client and server.
- **Project Boards** — Create projects with a name, description, and color theme. Invite teammates by email.
- **Kanban Columns** — Add, rename, reorder, and delete columns. Drag-and-drop card reordering across columns.
- **Task Cards** — Full card details: title, description, priority (low/medium/high/critical), due date, labels, checklist, and file attachments.
- **Assignees** — Assign multiple project members to any card.
- **Comments** — Post, edit, and delete comments on cards. Only the author can edit or delete their own comment.
- **Notifications** — In-app notifications for card assignments, new comments, card moves, and member additions.
- **Real-time Sync** — Socket.io broadcasts card moves, new comments, and other board changes to all connected project members instantly.
- **Profile Page** — Update name, bio, avatar, and password.
- **Responsive Layout** — Sidebar navigation on desktop and tablet; bottom navigation bar on mobile. Kanban board scrolls horizontally on desktop, stacks vertically on mobile.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, react-router-dom v7 |
| Drag & Drop | @hello-pangea/dnd |
| HTTP Client | Axios |
| Real-time | Socket.io-client |
| Date Formatting | date-fns |
| Toasts | react-hot-toast |
| Backend | Node.js, Express 4 |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Real-time Server | Socket.io |
| Validation | express-validator |
| Dev Server | Nodemon |

---

## Project Structure

```
project-root/
│
├── client/                          ← React frontend (Vite)
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── Auth/                ← LoginForm, RegisterForm, ProtectedRoute
│       │   ├── Board/               ← BoardView, Column, ColumnHeader, AddColumnBtn, BoardHeader
│       │   ├── Card/                ← TaskCard, CardModal, CardPriority, CardDueDate,
│       │   │                           CardLabels, CardChecklist, CardAssignees, AddCardBtn
│       │   ├── Comments/            ← CommentList, CommentItem, CommentForm
│       │   ├── Dashboard/           ← ProjectCard, ProjectGrid, StatsBar
│       │   ├── Layout/              ← Sidebar, Navbar, BottomNav, PageWrapper
│       │   ├── Modals/              ← ModalWrapper, CreateProjectModal,
│       │   │                           InviteMemberModal, ConfirmDeleteModal
│       │   └── Shared/              ← Avatar, Badge, Button, Input, Spinner,
│       │                               Toast, EmptyState
│       ├── context/                 ← AuthContext, ProjectContext, BoardContext,
│       │                               SocketContext, NotificationContext
│       ├── hooks/                   ← useAuth, useBoard, useProjects,
│       │                               useSocket, useClickOutside
│       ├── pages/                   ← LandingPage, LoginPage, RegisterPage,
│       │                               DashboardPage, BoardPage, ProfilePage,
│       │                               NotificationsPage, ProjectSettingsPage,
│       │                               MembersPage, NotFoundPage
│       ├── services/                ← api.js (axios instance), authService,
│       │                               projectService, columnService, cardService,
│       │                               commentService, notificationService
│       ├── styles/                  ← index.css, variables.css, responsive.css
│       ├── utils/                   ← formatDate, getPriorityColor,
│       │                               getInitials, validateForm
│       ├── App.jsx
│       └── main.jsx
│
└── server/                          ← Node.js + Express backend
    ├── config/
    │   └── db.js                    ← MongoDB Atlas connection
    ├── controllers/                 ← authController, projectController,
    │                                   columnController, cardController,
    │                                   commentController, notificationController
    ├── middleware/
    │   ├── authMiddleware.js        ← JWT token verification
    │   └── errorMiddleware.js       ← global error + 404 handler
    ├── models/                      ← User, Project, Column, Card,
    │                                   Comment, Notification
    ├── routes/                      ← authRoutes, projectRoutes, columnRoutes,
    │                                   cardRoutes, commentRoutes, notificationRoutes
    ├── socket/
    │   └── socketHandler.js         ← all Socket.io events
    ├── utils/
    │   ├── generateToken.js
    │   └── sendNotification.js
    └── server.js                    ← Express + Socket.io entry point
```

---

## Database Schema

**Users**
```
_id, name, email (unique), password (hashed), avatar, bio, createdAt, updatedAt
```

**Projects**
```
_id, name, description, color, owner (ref User), members [{ user, role }],
isArchived, createdAt, updatedAt
```

**Columns**
```
_id, name, project (ref Project), order, color, createdAt
```

**Cards**
```
_id, title, description, column (ref Column), project (ref Project),
assignees [ref User], priority, labels [{ text, color }], dueDate,
checklist [{ text, completed }], order, isArchived, createdAt, updatedAt
```

**Comments**
```
_id, text, card (ref Card), author (ref User), isEdited, createdAt, updatedAt
```

**Notifications**
```
_id, recipient (ref User), sender (ref User), type, project, card,
message, isRead, createdAt
```

---

## API Endpoints

```
AUTH
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/profile

PROJECTS
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
POST   /api/projects/:id/invite
DELETE /api/projects/:id/members/:userId

COLUMNS
GET    /api/columns/:projectId
POST   /api/columns
PUT    /api/columns/:id
DELETE /api/columns/:id
PUT    /api/columns/reorder

CARDS
GET    /api/cards/:columnId
POST   /api/cards
GET    /api/cards/:id
PUT    /api/cards/:id
DELETE /api/cards/:id
PUT    /api/cards/:id/move

COMMENTS
GET    /api/comments/:cardId
POST   /api/comments/:cardId
PUT    /api/comments/:id
DELETE /api/comments/:id

NOTIFICATIONS
GET    /api/notifications
PUT    /api/notifications/read-all
DELETE /api/notifications/:id
```

---

## Real-time Events

| Client Emits | Server Broadcasts | Description |
|---|---|---|
| `join:project` | — | Join project room |
| `leave:project` | — | Leave project room |
| `card:move` | `card:moved` | Card dragged to new column |
| `card:update` | `card:updated` | Card fields edited |
| `card:create` | `card:created` | New card added |
| `card:delete` | `card:deleted` | Card removed |
| `comment:new` | `comment:added` | Comment posted |
| `user:typing` | `user:typing` | Typing indicator |
| `user:join` | `presence:update` | User online status |

---

## Screens & Pages

| # | Page | Route | Description |
|---|---|---|---|
| 1 | Landing Page | `/` | Marketing page with features overview |
| 2 | Login | `/login` | Email + password sign in |
| 3 | Register | `/register` | New account creation |
| 4 | Dashboard | `/dashboard` | All projects overview + create new |
| 5 | Board | `/board/:projectId` | Kanban board with drag-and-drop |
| 6 | Card Detail | Modal on board | Full card info, comments, checklist |
| 7 | Project Settings | `/projects/:id/settings` | Rename, invite members, delete |
| 8 | Members | `/projects/:id/members` | Team roster with roles |
| 9 | Profile | `/profile` | Edit name, bio, avatar, password |
| 10 | Notifications | `/notifications` | Activity feed, mark all read |
| 11 | 404 | `*` | Not found fallback |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free [MongoDB Atlas](https://mongodb.com/atlas) account

### 1. Clone the repository

```bash
git clone https://github.com/your-username/projectsync.git
cd projectsync
```

### 2. Set up MongoDB Atlas

1. Create a free M0 cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a database user under **Database Access**
3. Allow all IPs under **Network Access** (0.0.0.0/0)
4. Copy the connection string from **Connect → Drivers**

### 3. Configure environment variables

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/projectsync?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### 4. Install dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 5. Run the development servers

```bash
# Terminal 1 — backend (runs on port 5000)
cd server
npm run dev

# Terminal 2 — frontend (runs on port 5173)
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Deployment

### Backend → Render.com (free)

1. Push code to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Connect your GitHub repo, set root directory to `server`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add all environment variables from `server/.env` in the Render dashboard
7. In MongoDB Atlas → Network Access → allow Render's IP (or `0.0.0.0/0`)

### Frontend → Vercel (free)

1. Import your GitHub repo on [vercel.com](https://vercel.com)
2. Set root directory to `client`
3. Add environment variables:
   - `VITE_API_URL` = your Render backend URL + `/api`
   - `VITE_SOCKET_URL` = your Render backend URL
4. Deploy

---

## Mobile Layout

| Breakpoint | Layout |
|---|---|
| Desktop (1024px+) | Fixed left sidebar, horizontal-scrolling Kanban board |
| Tablet (768px–1024px) | Collapsible sidebar, horizontal-scroll board |
| Mobile (< 768px) | Hidden sidebar, bottom navigation bar, vertical card stacking |

---

