# Text Review

Text Review is a web application that allows users to analyze and highlight official texts. The aim is to promote a better understanding and detailed analysis of texts.

## Features

- Collection of texts from official sources
- Creation of text analyses
- Highlighting of text sections within an analysis
- GraphQL API (Code-First)

## Technologies

- **Frontend:** NextJS, React, TypeScript, Tailwind CSS
- **Backend:** NextJS, GraphQL (Pothos & Apollo/Yoga), Prisma ORM
- **Database:** PostgreSQL
- **Data Validation:** Zod (with `zod-prisma-types`)
- **State Management:** Apollo Client, Zustand
- **Testing:** Jest, React Testing Library
- **Logging:** Winston

## Requirements

- NodeJS
- npm
- PostgreSQL

## Architecture & Design Principles

I follow a strict **Single Source of Truth (SSoT)** approach using Prisma and a layered architecture to ensure type safety and maintainability.

### 1. The Generation Chain (Type Safety Pipeline)
All types are derived automatically to avoid manual duplication (DRY):

1.  **Source of Truth:** `schema.prisma` (Database Models)
2.  **Database Layer:** `prisma generate` creates the Prisma Client & Types.
3.  **Validation Layer:** `prisma-zod-generator` creates Zod schemas from Prisma models.
4.  **API Layer:** `Pothos` generates the GraphQL Schema directly from Prisma Types.
5.  **Frontend Layer:** `GraphQL Code Generator` creates typed React Hooks (`useQuery`) from frontend queries.

### 2. Layered Structure (Separation of Concerns)
We separate logic into three distinct layers to support both GraphQL and Server Components (RSC).

| Layer                                      | Responsibility                                 | Data Flow Rules |
| :----------------------------------------- | :--------------------------------------------- | :--- |
| **Resolver** (`*.resolver.ts`)             | Handles GraphQL specific context (args, info). | Passes the generated `PothosQuery` object (includes, selects) to the service. |
| **Service** (`*.service.ts`)               | Contains purely business logic.                | **Queries:** "Transparent" flow. Must pass Prisma args through. **DO NOT** strictly validate/strip outputs with Zod here, or GraphQL relations will break.<br>**Mutations:** Strict Zod validation for Inputs. |
| **Infrastructure** (`*.infrastructure.ts`) | Direct database access.                        | Executes `prisma.model.find...`. Returns implicit types inferred by Prisma to preserve relations. |

## Project Structure

- **app** Pages and App Router
- **app/api/graphql** GraphQL Endpoint
- **components** Reusable UI Components
- **lib** Core configuration (Prisma, Builder, Logger)
- **prisma** Database Schema and Migrations
- **seeds** Scripts to seed a Database
- **services** Domain logic organized by feature
  - **services/[feature]/[action].resolver.ts** (GraphQL Entry)
  - **services/[feature]/[action].service.ts** (Business Logic)
  - **services/[feature]/[action].infrastructure.ts** (DB Access)
- **types** TypeScript Data Structures

## Setup

1. **Clone Repository**
   ```bash
    git clone <repository-url>
    cd text-review
    ```

2. **Install Dependencies**
   ```bash
    npm install
    ```

3. **Setup Environment Variables**
   Create an `.env` file based on `.env.example`.

4. **Generate Client & Types**
   Important: Run this whenever `schema.prisma` changes.
   ```bash
    npx prisma generate
    ```

5. **Run Application**
    ```bash
    npm run dev
    ```

    The application is accessible at [http://localhost:3000](http://localhost:3000).
    GraphQL Playground is available at [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql).

## Logging
- **error** Critical errors, e.g. failed database connection, API errors
- **warn** Important warnings, e.g. old APIs usage, high resource usage
- **info** General information, e.g. successful API requests, user login
- **http** Incoming http requests, e.g. http method and status code
- **verbose** Detailed information, e.g. process steps
- **debug** Developer information, e.g. variable values, function steps
- **silly** Most detailed information, e.g. raw data

## More
- [Services Overview](./services/readme.md)