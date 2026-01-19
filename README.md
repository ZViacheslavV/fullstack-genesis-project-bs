# 🤰 Leleka Genesis — Backend API

> A robust and scalable backend service powering the Leleka Genesis pregnancy tracking platform.

This repository contains the **backend layer** of the Leleka Genesis application.  
It is responsible for authentication, authorization, data persistence, business logic, and providing a secure REST API consumed by the frontend.

The backend is designed with a strong emphasis on **security**, **clear separation of concerns**, and **long-term maintainability**.

---

## 🧩 Project Overview

The backend API enables core product functionality, including:

- user authentication and session management;
- secure access to private resources;
- structured data storage for diary entries, tasks, and user profiles;
- delivery of week-by-week pregnancy insights and recommendations;
- consistent error handling and well-documented API responses.

The service acts as a single source of truth for all domain data used by the client application.

---

## 🎯 Responsibilities of the Backend

- **User registration and authentication**
  - Email/password authentication
  - Google OAuth 2.0 integration
- **Authorization and access control**
  - Protection of private routes using tokens and session validation
- **CRUD operations** for core entities:
  - User diary entries (create, update, delete)
  - Tasks (to-do items with status management)
  - User profile data, including avatar updates
- **Pregnancy timeline data**
  - Weekly information about maternal condition, baby development, and guidance
- **Centralized error handling**
  - Predictable, structured API responses
  - API documentation via Swagger (OpenAPI)

---

## 🛠️ Tech Stack

- **Node.js / Express** — server runtime and HTTP framework
- **MongoDB + Mongoose** — database and data modeling
- **JWT / Session-based authentication** — secure access control
- **Google OAuth 2.0** — third-party authentication
- **Multer + Cloudinary** — file upload and cloud storage (user avatars)
- **Swagger / OpenAPI** — API documentation and exploration
- **CORS & custom middleware** — security, validation, and error handling

---

## 🔌 API Capabilities

- Authentication and authorization endpoints
- User profile management
- Diary and task management
- Pregnancy week data delivery
- File upload handling
- Health-checked, documented REST API for frontend consumption


