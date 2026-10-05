# 📰 Bangla News 24

<p align="center">
  <strong>A Modern Bengali Online News Portal</strong>
</p>

<p align="center">
  A fast, modern, and fully responsive Bengali news platform for reading the latest national and international news.
</p>

<p align="center">
  <a href="https://bangla-news24-7.vercel.app/">
    🌐 Live Demo
  </a>
  &nbsp; • &nbsp;
  <a href="https://github.com/fahimrahat58/bangla-news24">
    💻 GitHub Repository
  </a>
</p>

---

## 📌 Project Overview

**Bangla News 24** is a modern, fast, and fully responsive Bengali online news portal built with **Next.js, TypeScript, and Tailwind CSS**.

The platform provides a clean and user-friendly experience for browsing the latest news, exploring different categories, reading detailed articles, and managing user authentication.

The project focuses on:

- 📰 Modern news reading experience
- 📱 Fully responsive design
- 🔐 Secure user authentication
- ⚡ Fast and dynamic content
- 🎨 Clean and modern user interface
- 🌐 Production-ready deployment

---

## 📸 Project Preview

<p align="center">
  <img
    src="./public/Screenshot 2026-10-04 212433.png"
    alt="Bangla News 24 Homepage"
    width="100%"
  />
</p>

<p align="center">
  <em>Bangla News 24 Homepage</em>
</p>

---

## ✨ Main Features

### 📰 News Experience

- Latest and featured news
- Breaking news marquee
- Dynamic news sections
- Category-based news browsing
- Dynamic article detail pages
- Clean and distraction-free reading experience

### 🏷️ News Categories

Users can browse news from different categories, including:

- 🇧🇩 National
- 🌎 World
- 🇮🇳 India
- 🏥 Health
- 📰 Other important categories

### 🔐 Authentication

Authentication is implemented using **Better Auth**.

- ✅ User Sign Up
- ✅ User Sign In
- ✅ Google Authentication
- ✅ Email Verification
- ✅ Forgot Password
- ✅ Password Reset
- ✅ Secure Session Management
- ✅ Protected Routes
- ✅ User Logout

### 📱 Responsive Design

The website is optimized for:

- 📱 Mobile
- 📲 Tablet
- 💻 Laptop
- 🖥️ Desktop
- 📺 Large Screens

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **Next.js** | React framework and application architecture |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Styling and responsive UI |
| **Better Auth** | Authentication and session management |
| **MongoDB** | Database |
| **Lucide React** | UI icons |
| **Vercel** | Deployment |

---

## 📦 Dependencies

The project uses the following main dependencies:

- `next` — React framework
- `react` — User interface library
- `react-dom` — React DOM rendering
- `typescript` — Type-safe development
- `tailwindcss` — Utility-first CSS framework
- `better-auth` — Authentication system
- `mongodb` — MongoDB database integration
- `lucide-react` — Icon library

For the complete dependency list, check the project's `package.json` file.

---

## 📂 Project Structure

```text
bangla-news24/
│
├── public/
│   ├── assets/
│   └── screenshots/
│       └── homepage.png
│
├── src/
│   └── app/
│       │
│       ├── (auth)/
│       │   ├── sign-in/
│       │   └── sign-up/
│       │
│       ├── api/
│       │   └── auth/
│       │
│       ├── article/
│       │   └── [id]/
│       │
│       ├── category/
│       │   └── [category]/
│       │
│       ├── components/
│       │   ├── banner.tsx
│       │   ├── header.tsx
│       │   ├── footer.tsx
│       │   └── ...
│       │
│       ├── navcategory/
│       │
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
│
├── .env.local
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## 🚀 Getting Started

Follow the steps below to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/fahimrahat58/bangla-news24.git
```

### 2. Navigate to the Project

```bash
cd bangla-news24
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory.

```env
BETTER_AUTH_SECRET=your_auth_secret_here
BETTER_AUTH_URL=http://localhost:3000

BETTER_AUTH_DB_URL=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

RESEND_API_KEY=your_resend_api_key
```

> ⚠️ Never commit `.env.local` to GitHub or expose your secret keys publicly.

### 5. Start the Development Server

```bash
npm run dev
```

### 6. Open the Application

Open your browser and visit:

```text
http://localhost:3000
```

---

## 🌐 Live Project

<p align="center">

<a href="https://bangla-news24-7.vercel.app/">
  🌐 Visit Bangla News 24
</a>

</p>

---

## 🔗 Relevant Links

| Resource | Link |
|---|---|
| 🌐 Live Website | [Bangla News 24](https://bangla-news24-7.vercel.app/) |
| 💻 GitHub Repository | [View Repository](https://github.com/fahimrahat58/bangla-news24) |
| 👨‍💻 GitHub Profile | [Fahim Muntasir Rahat](https://github.com/fahimrahat58) |
| 💼 LinkedIn | [Fahim Muntasir Rahat](https://www.linkedin.com/in/fahim-muntasir-rahat-46ba6b2a7/) |

---

## 🔐 Authentication Flow

```text
                         ┌───────────────┐
                         │     User      │
                         └───────┬───────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
         ┌─────────┐        ┌─────────┐       ┌──────────┐
         │ Sign Up │        │ Sign In │       │  Google  │
         └────┬────┘        └────┬────┘       │  Login   │
              │                  │             └────┬─────┘
              ▼                  │                  │
      ┌──────────────┐           │                  │
      │    Email     │           │                  │
      │ Verification │           │                  │
      └──────┬───────┘           │                  │
             │                   │                  │
             └───────────────────┼──────────────────┘
                                 ▼
                         ┌───────────────┐
                         │ Authenticated │
                         │    Session    │
                         └───────┬───────┘
                                 │
                                 ▼
                         ┌───────────────┐
                         │   Protected   │
                         │    Routes     │
                         └───────────────┘
```

### Password Recovery

```text
Forgot Password
       │
       ▼
Enter Email
       │
       ▼
Reset Link Sent
       │
       ▼
Reset Password
       │
       ▼
New Password
```

---

## 🎯 Project Goals

The main goals of this project are:

- Build a real-world online news platform
- Practice Next.js App Router
- Improve TypeScript skills
- Build modern responsive interfaces
- Implement authentication with Better Auth
- Work with dynamic routes
- Work with MongoDB
- Integrate dynamic content
- Practice production deployment
- Build a portfolio-ready project

---

## 📱 Responsive Design

The application is designed to provide a consistent experience across different screen sizes.

```text
Mobile
   ↓
Tablet
   ↓
Laptop
   ↓
Desktop
   ↓
Large Screen
```

---

## 📸 Screenshots

### 🏠 Homepage

<p align="center">
  <img
    src="./public/screenshots/homepage.png"
    alt="Bangla News 24 Homepage"
    width="100%"
  />
</p>

### 📰 Article Page

<p align="center">
  <img
    src="./public/screenshots/article-page.png"
    alt="Bangla News 24 Article Page"
    width="100%"
  />
</p>

### 🔐 Sign In

<p align="center">
  <img
    src="./public/screenshots/sign-in.png"
    alt="Bangla News 24 Sign In"
    width="100%"
  />
</p>

### 📝 Sign Up

<p align="center">
  <img
    src="./public/screenshots/sign-up.png"
    alt="Bangla News 24 Sign Up"
    width="100%"
  />
</p>

---

## 📈 Future Improvements

Some planned improvements include:

- 🔎 Advanced news search
- 🔖 Bookmark / Save articles
- ❤️ Like and reaction system
- 💬 Comment system
- 🔔 News notifications
- 👤 User profile dashboard
- 🌙 Dark mode
- ⚡ Improved performance and caching
- 📊 Admin dashboard
- 📰 News management system

---

## 👨‍💻 Developer

### Fahim Muntasir Rahat

**Aspiring Frontend Developer**

Currently learning and building with:

- React
- TypeScript
- Next.js
- Tailwind CSS
- Authentication
- Modern Web Development

### Connect With Me

- 🌐 [Live Project](https://bangla-news24-7.vercel.app/)
- 💻 [GitHub](https://github.com/fahimrahat58)
- 💼 [LinkedIn](https://www.linkedin.com/in/fahim-muntasir-rahat-46ba6b2a7/)

---

## 📄 License

This project is created for learning, portfolio, and educational purposes.

---

<p align="center">
  Made with ❤️ using Next.js, TypeScript & Tailwind CSS
</p>
