# Moto Shine | Bike Servicing Management API

## Project Summary

This is a **Bike Servicing Management API** called **Moto Shine** built with **Node.js**, **Express.js**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**. It allows a bike servicing center to manage **customers**, **bikes**, and **service records**. The API supports **CRUD** operations for bikes, customers, and services and includes special endpoints for assigning and completing servicing jobs.

### Tech Stack:

- **Node.js** – JavaScript runtime for server-side development.
- **Express.js** – Web framework for building APIs.
- **TypeScript** – Type-safe language for JavaScript applications.
- **Prisma ORM** – A next-generation Object Relational Mapping (ORM) tool for Node.js & TypeScript, with support for PostgreSQL.
- **PostgreSQL** – A powerful, open-source relational database system.

### Key Features:

- **Customer Management**: Create, fetch, update, and delete customers.
- **Bike Management**: Add, fetch, and update bikes for each customer.
- **Service Management**: Create service records, update service status, and track service completion.
- **Service Overdue Tracking**: Get pending and overdue services (older than 7 days).

## Live Backend Link

[Live Backend (e.g., Railway, Render)](https://moto-shine.vercel.app)

## Setup Guide

### Prerequisites

Before you start, make sure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **PostgreSQL** (or access to a PostgreSQL database)
- **Prisma CLI** (for managing the Prisma database schema)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/snokeOver/moto-shine
   cd moto-shine
   ```
2. **Install Dependencies:**

```bash
npm install
```

3. **Set up Environment Variables:**

```bash
# App name
APP_NAME=moto shine

# Environment (e.g., development, production)
NODE_ENV=development

# Server Port
PORT=3500

# Database URL
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/bike_servicing

```

4. **Add script to package.json file:**

```bash
 "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
```

5.**Start the Development Server**

```bash
npm run dev
```
