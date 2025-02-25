# Notes API - AdonisJS

## Overview
This API allows users to manage notes with tags. Users can register, log in, and create, update, delete, and read notes. Each note can have multiple tags, and users can manage their own tags.

## Technologies Used
- AdonisJS (Backend Framework)
- Lucid ORM (Database Management)
- Authentication (Access tokens guard)
- PostgreSQL (Database)

## Features
- User authentication (Register, Login, Logout)
- CRUD operations notes
- CRUD operations for tags

### Prerequisites
- Node.js (LTS version recommended)
- PostgreSQL (or any other supported database)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/BilbaoJ/learning-adonisjs-6.git
   cd learning-adonisjs-6
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   ```sh
   cp .env.example .env
   ```
   Update the `.env` file with your database and application settings.

4. Run database migrations:
   ```sh
   node ace migration:run
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```

## API Endpoints

### Authentication
| Method | Endpoint       | Description           |
|--------|--------------|-----------------------|
| POST   | /register    | Register a new user  |
| POST   | /login       | Authenticate user    |
| POST   | /logout      | Logout user          |

### Notes
| Method | Endpoint      | Description                  |
|--------|--------------|------------------------------|
| GET    | /notes       | Read all user notes     |
| GET    | /notes/:id   | Read a single note      |
| POST   | /notes       | Create a new note           |
| PUT    | /notes/:id   | Update an existing note     |
| DELETE | /notes/:id   | Delete a note               |

### Tags
| Method | Endpoint      | Description                  |
|--------|--------------|------------------------------|
| GET    | /tags        | Read all user tags      |
| POST   | /tags        | Create a new tag            |
| DELETE | /tags/:id    | Delete a tag                |

## Request Examples

### Register a new user
```sh
POST /register
Content-Type: application/json
{
  "fullName" : "User Example"
  "email": "user@example.com",
  "password": "password123"
}
```

### Create a new note with tags
```sh
POST /notes
Content-Type: application/json
Authorization: Bearer <token>
{
  "title": "My first note",
  "content": "This is a test note.",
  "tags": [
    { "id": 1, "name": "work" },
    { "id": 2, "name": "personal" }
  ]
}
```

### Update a note
```sh
PUT /notes/1
Content-Type: application/json
Authorization: Bearer <token>
{
  "title": "Updated note title",
  "content": "Updated content",
  "tags": [
    { "id": 3, "name": "urgent" }
  ]
}
```

### Create a new tag
```sh
POST /tags
Content-Type: application/json
Authorization: Bearer <token>
{
  "name": "Tag"
}
```



