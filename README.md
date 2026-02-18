# Vidora

A full-stack video management platform with AI-powered subtitle generation and automatic video compression.

## Live Demo

[View Live App](https://cloudinary-saas.vercel.app/)

## Screenshots

### Dashboard
![Dashboard](public/images/DashBoard.png)

### Social Share
![Social Share Page](public/images/SocailPage.png)

### Video Upload
![Upload Page](public/images/UploadPage.png)

## Features

- Video upload with automatic compression and optimization
- AI-generated subtitles using OpenAI
- Video analytics (size comparison, duration tracking)
- Direct client-to-Cloudinary uploads for scalability
- Secure authentication with Clerk
- Responsive design for all devices

## Tech Stack

- **Frontend:** Next.js 16 (Turbopack), React, TypeScript
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL with Prisma Adapter
- **Authentication:** Clerk
- **Media Management:** Cloudinary
- **AI:** OpenAI API
- **Styling:** Tailwind CSS, DaisyUI

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Cloudinary account
- OpenAI API key
- Clerk account

### Installation

1. Clone the repository
```bash
git clone https://github.com/SohailShaikh7860/vidora.git
cd vidora
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```env
DATABASE_URL=your_postgresql_url
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
OPENAI_API_KEY=your_openai_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

4. Run Prisma migrations
```bash
npx prisma migrate dev
```

5. Start development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

