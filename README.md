# Finexio 💸

![React](https://img.shields.io/badge/React-20232A?style=flat\&logo=react\&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat\&logo=typescript\&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat\&logo=redux\&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat\&logo=chartdotjs\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat\&logo=node.js\&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat\&logo=sass\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat\&logo=postgresql\&logoColor=white)

---

## 📊 О проекте

**Finexio** — это fullstack‑приложение для учета личных финансов и анализа расходов.
Проект позволяет записывать транзакции, распределять их по категориям и наглядно отслеживать траты с помощью интерактивных графиков.

Проект создавался как **pet‑project для портфолио Junior frontend / fullstack разработчика**.

🎥 **Полный функционал:** https://youtu.be/C-zXnkUiVPo

---

## ✨ Основные возможности

### 🔐 Аутентификация

* Регистрация и авторизация пользователей
* Хэширование паролей с помощью **bcrypt**
* Авторизация через **JWT (JSON Web Token)**

![alt text](<screenshots/unknown_replay_2025.12.15-22 (online-video-cutter.com).gif>)
---

### 🗂️ Категории расходов

* Создание категорий (например: `🛒 Супермаркеты`, `🚗 Машина`)
* Редактирование категорий
* Удаление категорий

![alt text](<screenshots/unknown_replay_2025.12.15-22 (online-video-cutter.com) (1).gif>)
![alt text](<screenshots/unknown_replay_2025.12.15-22 (online-video-cutter.com) (4).gif>)
---

### 💳 Транзакции

* Создание транзакций с указанием категории
* Редактирование транзакций
* Удаление транзакций

Пример:

```
Вкусно и точка  -1200 ₽
```

![alt text](<screenshots/unknown_replay_2025.12.15-22 (online-video-cutter.com) (2).gif>)
![alt text](<screenshots/unknown_replay_2025.12.15-22 (online-video-cutter.com) (3).gif>)

---

### 📈 Аналитика и графики

* Анализ расходов за текущий месяц
* Группировка трат по категориям
* Bar‑график с количеством расходов по месяцам

Графики реализованы с помощью **Chart.js**.

![alt text](screenshots/msedge_pBe9744hBw.png)

* диаграмма расходов по категориям
* bar‑график трат по месяцам

---

### 🌗 Темная и светлая тема

* Переключение между светлой и темной темой
* Сохранение выбранной темы

![alt text](screenshots/clideo_editor_acd186b0b546469fb1e22101db5ad14c.gif)

---

## 🧱 Стек технологий

### Frontend

* **Vite** (React + TypeScript)
* **Redux Toolkit**
* **Sass**
* **Chart.js**
* **Axios**
* Кастомные React‑хуки

### Backend

* **TypeScript**
* **Node.js + Express.js**
* **PostgreSQL**
* **JWT**
* **bcrypt**
* **dotenv**
* **cors**
* **nodemon**

---

## 🚀 Запуск проекта локально

### 1. Клонирование репозитория

```bash
git clone https://github.com/bakko7821/finexio.git
```

### 2. Установка зависимостей

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd server
npm install
```

### 3. Переменные окружения

Создайте `.env` файл в папке `server`:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=finexio
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
```

### 4. Запуск

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
```

---

## 🎯 Цели проекта

* Закрепить навыки **React + TypeScript**
* Практика **Redux Toolkit** и работы с глобальным состоянием
* Работа с REST API и JWT‑авторизацией
* Визуализация данных с помощью графиков
* Создание полноценного fullstack‑приложения

---

## 👨‍💻 Автор

Проект разработан в рамках pet‑project для портфолио.

Если есть идеи, фидбек или предложения — буду рад ⭐
