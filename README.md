# Nova Kicks — Premium Sneaker E-Commerce

A production-quality premium e-commerce website for a sneaker brand called "Nova Kicks". Built with modern web technologies and designed to Awwwards standards.

## Tech Stack

### Frontend
- **Next.js 16** (App Router) — React framework
- **TypeScript** — Type safety
- **Tailwind CSS v4** — Utility-first styling
- **Shadcn UI** — Accessible component library (built on @base-ui/react)
- **Framer Motion** — Animations & micro-interactions
- **React Hook Form + Zod** — Form validation
- **Lucide React** — Icons

### Backend
- **Node.js + Express** — REST API
- **TypeScript** — Type safety
- **MongoDB + Mongoose** — Database
- **Nodemon** — Development auto-reload

## Features

- **Home Page** — Hero with animations, featured categories, trending products, testimonials, newsletter
- **Products Page** — Grid catalog with search, filters (category, price), sorting, pagination
- **Product Detail** — Image gallery with zoom, size/color selection, reviews, related products
- **Shopping Cart** — Quantity management, coupon system, real-time totals
- **Checkout** — Shipping form, mock payment, order confirmation
- **Order Success** — Order summary with generated order ID
- **About & Contact** — Brand story, contact form
- **Responsive Design** — Pixel-perfect on 320px → 1920px
- **Animations** — Fade-in, hover effects, image zoom, cart drawer, skeleton loading
- **SEO** — Metadata, Open Graph tags

## Getting Started

### Prerequisites
- Node.js 20.9+ 
- npm
- MongoDB Atlas account (free tier)

### 1. Clone the Repository

```bash
git clone <repo-url>
cd novakicks
```

### 2. Environment Setup

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Backend** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/novakicks?retryWrites=true&w=majority
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### 3. Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 4. Seed the Database (Optional — frontend works with local data)

```bash
cd backend
npm run seed
```

### 5. Run Development Servers

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
# Frontend
cd frontend
npm run build
npm start

# Backend
cd backend
npm run build
npm start
```

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js pages (App Router)
│   │   │   ├── page.tsx         # Home
│   │   │   ├── products/        # Catalog + Details
│   │   │   ├── cart/            # Shopping cart
│   │   │   ├── checkout/        # Checkout flow
│   │   │   ├── order-success/   # Confirmation
│   │   │   ├── about/           # About page
│   │   │   ├── contact/         # Contact form
│   │   │   └── not-found.tsx    # 404 page
│   │   ├── components/
│   │   │   ├── layout/          # Navbar, Footer, CartDrawer
│   │   │   ├── home/            # Hero, Categories, Trending, etc.
│   │   │   ├── products/        # ProductCard, Grid, Filters
│   │   │   └── ui/              # Shadcn UI components
│   │   ├── lib/                 # Utils, Cart context (store)
│   │   ├── types/               # TypeScript interfaces
│   │   ├── data/                # Product data (32 products)
│   │   └── hooks/               # Custom hooks
│   ├── public/                  # Static assets
│   ├── next.config.ts
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── index.ts             # Express server entry
│   │   ├── models/              # Mongoose schemas
│   │   ├── routes/              # API route definitions
│   │   ├── controllers/         # Route handlers
│   │   ├── seed/                # Database seed script
│   │   └── middleware/          # Express middleware
│   ├── .env                     # Environment variables
│   └── package.json
│
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (filters, sort, pagination) |
| GET | `/api/products/featured` | Featured products |
| GET | `/api/products/trending` | Trending products |
| GET | `/api/products/categories` | All categories |
| GET | `/api/products/:id` | Single product details |
| POST | `/api/orders` | Create order |
| GET | `/api/orders` | List orders (filter by email) |
| GET | `/api/orders/:id` | Single order |
| GET | `/api/health` | Health check |

## Deployment

### Frontend → Vercel

1. Push to GitHub
2. Import project in Vercel
3. Set root directory to `frontend`
4. Set environment variable `NEXT_PUBLIC_API_URL` to your Render URL
5. Deploy

### Backend → Render

1. Push to GitHub
2. Create a new Web Service on Render
3. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Add environment variables (`MONGODB_URI`, `CORS_ORIGIN`)
5. Deploy

### Database → MongoDB Atlas

1. Create free cluster on MongoDB Atlas
2. Get connection string
3. Add to backend `.env` as `MONGODB_URI`

## Color Palette

- **Background**: `#FAFAFA`
- **Primary**: `#111111`
- **Accent**: `#3B82F6`
- **Secondary**: `#E5E7EB`
- **Success**: `#22C55E`
- **Error**: `#EF4444`

## Design Notes

- Built with premium Apple/Nike/Stripe/Shopify quality standards
- Glassmorphism, soft shadows, rounded cards, large typography
- Micro-interactions on every interactive element
- Smooth page transitions and scroll-based animations
- Fully responsive (320px to 1920px)
- Accessible HTML with semantic elements
- Image optimization with Next.js Image component
- Lazy loading and code splitting

## License

MIT
