# ✅ To-Do App

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![License](https://img.shields.io/badge/license-ISC-blue)](#)
[![Vite](https://img.shields.io/badge/Bundler-Vite-8A2BE2)](#)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6)](#)

Welcome to the **To-Do App**, a simple and efficient task management web application. Built with vanilla TypeScript and Vite, it allows you to create multiple task lists, manage tasks, and persist your data locally in the browser.

---

## 📊 Technologies Used

- **Language**: TypeScript (Vanilla)
- **Bundler**: Vite
- **Storage**: LocalStorage API
- **Linting**: ESLint + TypeScript ESLint

---

## 🚀 Key Features

- Create multiple to-do lists.
- Add, complete, and delete tasks within each list.
- Filter tasks by pending or all.
- Delete entire lists.
- Data persistence via LocalStorage.
- Lightweight, fast, and responsive design.
- Modular and scalable project architecture.

---

## ⚙️ How to Run Locally

1. **Clone the repository:**

```bash
git clone https://github.com/IgnacioFleming/to-do.git
cd to-do
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📂 Project Structure

```bash
src/
├── enums/
├── helpers/
├── layout/
├── todos/
├── types/
└── main.ts
```

## ✨ Usage Overview

- **Create a New List:** Add a title and start adding tasks.

- **Add Tasks:** Quickly add tasks within a selected list.

- **Mark as Completed:** Click to toggle task completion.

- **Filter Tasks:** Switch between viewing all tasks or only pending ones.

- **Delete Tasks/Lists:** Remove individual tasks or entire lists.

All changes are **saved automatically** in your browser via LocalStorage.

## 👨‍💻 Author

Developed by **Ignacio Fleming**
