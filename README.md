🛒 Modern Full-Stack E-Commerce Platform
A robust, production-ready e-commerce solution built with the latest Next.js 15 features, focusing on performance, scalability, and type safety.

🌟 Key Features
🛒 Customer Experience
Dynamic Storefront: Fast product browsing with category-based filtering (Beauty, Furniture, Groceries, Fragrances).

Smart Search: Real-time product search with InstantSearchBar for immediate feedback.

Persistent Shopping Cart: Global state management via CartContextProvider to keep track of user selections.

Secure Checkout: Integrated with Stripe for seamless and secure payment processing.

User Accounts: Full authentication flow supported by AuthContextProvider.

🛠️ Admin Dashboard
Inventory Management: Complete CRUD operations for products with image uploads via Vercel Blob.

Order Tracking: Dedicated dashboard to view and manage customer orders and statuses.

Customer Insights: Manage user data and track customer activities from a central location.

🧪 Testing
Unit Testing: Component-level testing using Jest and React Testing Library.

E2E Testing: Critical user flows (Sign in, Cart, Checkout) are verified with Playwright.

🛠️ Tech Stack
Framework: Next.js 15.3 (App Router & Turbopack).

Language: TypeScript

Database: Firebase Firestore for real-time NoSQL data.

Styling: Tailwind CSS v4 for modern, utility-first UI.

Form Logic: React Hook Form + Zod for type-safe validation.

Testing: Jest & Playwright.

🚀 Getting Started

1. Installation
   ```bass
git clone https://github.com/emirhanbayatli/ecommerce-store-nextjs.git
cd ecommerce-store-nextjs
npm install


3. Environment Setup
Create a .env.local file and provide your credentials:

# Firebase
NEXT_PUBLIC_API_KEY=your_key
NEXT_PUBLIC_PROJECT_ID=your_id
# Stripe
STRIPE_SECRET_KEY=your_secret
# Vercel Blob
BLOB_READ_WRITE_TOKEN=your_token

npm run dev
4. Running Tests
Bash

# Run unit tests
npm test 

# Run E2E tests
npx playwright test
