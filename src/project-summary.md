# NestJS Blog API - Project Summary

## Project Overview
This is a NestJS-based RESTful API for a blog application. It provides endpoints for user authentication, blog post management, and tag management. The application follows a modular architecture pattern and uses TypeORM for database interactions with PostgreSQL.

## Architecture
The application follows NestJS's modular architecture:
- **Modules**: Encapsulate related components (controllers, services, providers)
- **Controllers**: Handle HTTP requests and return responses
- **Providers/Services**: Implement business logic
- **Guards**: Protect routes based on conditions (like authentication)
- **DTOs**: Define data transfer objects for validation
- **Entities**: Define database models

## Main Components

### Modules
- **AppModule**: Root module that imports all other modules
- **AuthModule**: Handles authentication and authorization
- **UsersModule**: Manages user-related operations
- **PostsModule**: Manages blog post operations
- **TagsModule**: Manages tags for blog posts
- **MetaOptionsModule**: Manages metadata for posts
- **PaginationModule**: Provides pagination functionality

### Controllers
- **AppController**: Root controller with basic endpoints
- **AuthController**: Handles authentication endpoints (sign-in)
- **UsersController**: Manages user CRUD operations
- **PostsController**: Manages blog post CRUD operations

### Services/Providers
- **AppService**: Basic application service
- **AuthService**: Authentication service
- **SignInProvider**: Handles user sign-in logic
- **HashingProvider/BcryptProvider**: Password hashing
- **UsersService**: User management
- **PostsService**: Blog post management
- **PaginationProvider**: Handles pagination logic

## Authentication System
The application uses JWT (JSON Web Token) for authentication:

- **JWT Configuration**: Configured in `auth/config/jwt.config.ts`
- **JWT Validation**: Validated in `auth/config/jwt.validations.ts`
- **Guards**:
  - **AuthenticationGuard**: Main guard that determines authentication type
  - **AccessTokenGuard**: Validates JWT tokens
- **Auth Types**: Bearer token and None (public routes)
- **Authentication Flow**:
  1. User signs in with email/password
  2. System validates credentials
  3. JWT token is generated and returned
  4. Token is used for subsequent authenticated requests

## Database Models

### Entities
- **User**: Represents application users
- **Post**: Represents blog posts
- **Tag**: Represents post tags
- **MetaOption**: Represents metadata for posts

### Relationships
- User has many Posts (one-to-many)
- Post has many Tags (many-to-many)
- Post has one MetaOption (one-to-one)

## API Endpoints

### Authentication
- POST `/auth/sign-in`: User login

### Users
- GET `/users`: Get all users (paginated)
- POST `/users`: Create a new user
- POST `/users/create-many`: Create multiple users
- PATCH `/users`: Update user details

### Posts
- GET `/posts`: Get all posts (paginated)
- GET `/posts/:id`: Get a specific post
- POST `/posts`: Create a new post
- PATCH `/posts`: Update a post
- DELETE `/posts/:id`: Delete a post

## Configuration
The application uses a configuration system based on environment variables:

- **Environment Files**: `.env`, `.env.development`, etc.
- **Configuration Modules**:
  - `app.config.ts`: Application configuration
  - `database.config.ts`: Database connection configuration
  - `jwt.config.ts`: JWT authentication configuration
- **Validation**: Environment variables are validated using Joi

## Validation
- Uses class-validator for DTO validation
- Global validation pipe configured in main.ts
- Custom validation rules for various DTOs

## Documentation
- Swagger/OpenAPI documentation configured in main.ts
- Available at `/api` endpoint
- Includes API descriptions, request/response examples

## Testing
- Jest for unit and integration tests
- E2E tests with Supertest
- Test configuration in jest.config and jest-e2e.json

## Build and Deployment
- **Build**: `npm run build` using NestJS CLI
- **Development**: `npm run start:dev` with hot-reload
- **Production**: `npm run start:prod`
- **Documentation**: `npm run doc` generates documentation using Compodoc

## Dependencies
- **Core**: NestJS framework packages
- **Database**: TypeORM, PostgreSQL
- **Authentication**: JWT
- **Validation**: class-validator, joi
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest, Supertest
- **Utilities**: bcrypt for password hashing