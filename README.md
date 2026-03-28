# 📸 Instagram Clone - Full Stack 

[![.NET 10](https://img.shields.io/badge/.NET-10.0-512BD4?style=for-the-badge&logo=.net&logoColor=white)](https://dotnet.microsoft.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

A high-performance social media platform featuring real-time messaging, stories, and deep social interactions. Built with **ASP.NET Core 10** using **Domain-Driven Design (DDD)** principles and a **Next.js 15** frontend.

🔗 **[Live Interactive API (Swagger)](https://instagramclone-3043.onrender.com/)** 🔗 **[Live Frontend (Vercel)](https://instagram-clone-ui-livid.vercel.app/)**

> ⚡ *Note: Hosted on Render's free tier. The API may take ~50s to "spin up" on the first request.*

---

## 🎨 Theme & Responsiveness Showcase

### 🏠 Home Feed (Desktop)
| ☀️ Light Mode | 🌙 Dark Mode |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/56ce3676-0183-458f-b02c-586b2038c096" width="100%" alt="Desktop Home Light" /> | <img src="https://github.com/user-attachments/assets/f44af7c5-1a13-43df-98a8-9d2ac6e411a2" width="100%" alt="Desktop Home Dark" /> |

### 📱 Home Feed (Mobile)
| ☀️ Light Mode | 🌙 Dark Mode |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/bf3dcfbf-d855-422b-bd7d-745aa5367600" height="400px" alt="Mobile Home Light" /> | <img src="https://github.com/user-attachments/assets/d3774f67-1667-4fc5-980f-8f0f7412240d" height="400px" alt="Mobile Home Dark" /> |

---

### 👤 Profile Page (Desktop)
| ☀️ Light Mode | 🌙 Dark Mode |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/709d1d0f-bef9-40f3-a9eb-c5cae0796275" width="100%" alt="Profile Desktop Light" /> | <img src="https://github.com/user-attachments/assets/6a942052-6e3e-4ee6-bb30-cddb70b4af6b" width="100%" alt="Profile Desktop Dark" /> |

### 📱 Profile Page (Mobile)
| ☀️ Light Mode | 🌙 Dark Mode |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/261dab32-92eb-4674-b5d6-089e1cd701a9" height="400px" alt="Profile Mobile Light" /> | <img src="https://github.com/user-attachments/assets/0ea60f3d-bbdd-4598-a24b-c2234a2df7de" height="400px" alt="Profile Mobile Dark" /> |

---
## 🏗 Architecture & Design
This project follows **Clean Architecture** to ensure that business logic is independent of frameworks and UI.

* **API Layer:** Handles HTTP requests, SignalR Hubs, and Global Exception Middleware.
* **Application Layer:** Contains DTOs, interfaces, and business logic services.
* **Infrastructure Layer:** Manages persistence with Entity Framework Core and PostgreSQL.
* **Domain Layer:** Defines core entities and business rules.

---

## 🛤️ Roadmap & Known Improvements
While the core application is fully deployed and functional, there is always room to scale. Here are the next features on my radar:

* **Frontend Pagination (Infinite Scroll):** The backend API already has pagination fully implemented; the next step is connecting the Next.js UI to fetch posts dynamically as the user scrolls.
* **Reels Feature:** Build out a dedicated, vertical-scrolling video feed page to match the modern Instagram experience.

---

## 📊 Database Schema (ERD)
The system is built on a relational PostgreSQL database designed for high connectivity between users, posts, and real-time messaging.

<img width="1028" height="717" alt="Instagral_Schema" src="https://github.com/user-attachments/assets/c7e8b917-9e9a-47e9-8b3b-c9258faa35bf" />

### Key Entities:
* **Users:** Core profile data including follower/following counts.
* **Posts & Stories:** Multimedia content with expiration logic for stories.
* **Social Interactions:** Likes and nested comments for posts.
* **Messaging:** One-to-one and Group messaging support with SignalR.

---

## ✨ Key Features

### 🔐 Engineering Standards
* **Clean API:** Global exception middleware for uniform JSON error responses.
* **Type-Safe Identity:** Custom `GetUserId()` extensions for secure data access.
* **Auto-Migrations:** Production database updates automatically on deployment via EF Core.

### 🎨 UX & Performance
* **100dvh Layout:** Fixed mobile viewport issues (address bar height) using Dynamic Viewport Units.
* **Theme Engine:** Persistent dark/light mode synced with Bootstrap 5.
* **Real-time:** Instant notifications and chat using SignalR WebSockets.

---

## 💻 Tech Stack

| Backend | Frontend | Infrastructure |
| :--- | :--- | :--- |
| .NET 10 Core Web API | Next.js 15 (App Router) | PostgreSQL (Managed) |
| EF Core | Zustand (State Mgmt) | Docker |
| SignalR (WebSockets) | Bootstrap 5.3 | Render (API/DB) |
| JWT Authentication | Lucide/Bootstrap Icons | Vercel (UI) |

---

## 🚀 Local Setup

1.  **Clone & Backend:**
    ```bash
    cd InstagramAPI
    dotnet restore
    dotnet run --project API/API.csproj
    ```

2.  **Frontend:**
    ```bash
    cd InstagramUI
    npm install
    npm run dev
    ```

---

## 🤝 Contributing
Contributions are welcome. Please open an issue first to discuss major changes.
