# commit 1.1.1

### Серверная часть

- Установленны библиотеки: 
---
1. Express.js: npm install express
2. Cors: npm install cors
3. dotenv: npm install dotenv
4. Prisma: 
```
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```
5. PostgreSQL: npm install pg
6. JsonWebToken: npm install jsonwebtoken
7. Bcypt: 
```
npm install bcrypt
npm install --save-dev node-gyp
```
8. Zod: npm install zod
9. Morgan: npm install morgan
10. Path: npm install path
11. Multer: npm install multer
12. Nodemon: 
```
npm install -D typescript ts-node nodemon @types/node
npm install -D concurrently
```



### Клиентская часть

- Собран проект используя ```npm create vite@latest``` template: **React + TS**
- Установленны библиотеки: 
---
1. React-Router-Dom: npm install react-router-dom 
2. Axios: npm install axios
3. Redux Toolkin: npm install @reduxjs/toolkit

# commit 1.2.0

- Создана архитектура
- Свёрстаны страницы LoginPage.tsx и RegisterPage.tsx

# commit 2.2.0

- Создано подключение к базе данных через Prisma
- Починить сервис авторизации

# commit 3.3.0

### Серверная часть
- Из проекта удалена Prisma и Prisma-client
- Установлен sequelize
```
npm install sequelize pg pg-hstore
npm install --save-dev @types/node @types/express @types/jsonwebtoken
npm install sequelize-typescript
```
- Созданы эндпоинты для авторизации

### Клиентская часть

- Созданы axios запросы на авторизацию и регистрацию

# commit 3.4.0

- Стилизован и заполнен контентом компонент **Navigate.tsx**
- Создан файл **/style/navigate.scss**

# commit 4.4.0

- Создана модель транзакции **/models/Transaction.ts**
- Созданы POST и GET эндпоинты на получение задач **/routes/trasnsactions.ts**

# commit 4.5.0

### Серверная часть

- Создана модель категорий **/models/Category.ts**
- Чуть исправлены GET эндпоинты, теперь туда сразу передается название категории
- В GET эндпоинте на получение всех транзакции пользователя добавлена сортировка по месяцам

### Клиентская часть

- Создан запрос на получение всех транзакций
- Добавленна базовая отрисовка

# commit 5.5.0

### Серверная часть

- Небольшие изменения

### Клиентская часть

- Создан компонент **/components/TransactionComponent.tsx**

# commit 6.6.0

### Серверная часть

- Небольшие изменения

### Клиентская часть

- Стилизована страница **TransactionPage.tsx**

# commit 7.7.0

### Серверная часть

- Добавлены POST и GET эндпоинты для categories.ts
- Чуть измененна модель Category.ts

### Клиентска часть

- Начал создавать логику добавления новой задачи используя Redux

# commit 8.8.0

### Серверная часть

- Изменен POST эндпоинт на добавление новой категории.

### Клиентская часть

- Создана логика добавления новой категории

# commit 8.9.0

- Доделанна логика добавления новой транзакции и выбора категории

# commit 9.10.0

### Сервреная часть

- Добавлен DELETE эндпоинт для удалении транзакции

### Клиентская часть

- Добавлена логика удаления транзакции

# commit 9.11.0

- Чуть освежил дизайн
- Измененны переменные
- Чуть по верстке изменны формы создания
(NEXT-commit - Добавить live отрисовку после удаления и добавления транзакций)