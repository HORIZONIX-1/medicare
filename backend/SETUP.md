# Backend Setup Guide

## Prerequisites
- Node.js (v18+)
- npm (v9+)
- MySQL server running locally (or Docker)

## Quick Start

### Option 1: Automated Setup (Recommended)
Run the setup batch file:
```bash
./run-backend.bat
```

This will:
1. Install dependencies
2. Generate Prisma client
3. Run database migrations
4. Start the development server

### Option 2: Manual Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

3. **Run database migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Environment Setup

Make sure `.env` file exists with:
```
DATABASE_URL="mysql://root:root@localhost:3306/medicare_db"
JWT_SECRET="your_secret"
```

⚠️ **Important:** Update `DATABASE_URL` with your actual MySQL credentials and database name.

## Database Setup

If MySQL database doesn't exist:

```sql
CREATE DATABASE medicare_db;
```

Or if using Docker:
```bash
docker run --name mysql-medicare -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=medicare_db -p 3306:3306 -d mysql:8.0
```

## Common Issues & Fixes

### Issue: `node_modules` missing
**Fix:** Run `npm install`

### Issue: Prisma client not generated
**Fix:** Run `npx prisma generate`

### Issue: Database migration errors
**Fix:** Ensure MySQL is running and `.env` DATABASE_URL is correct

### Issue: "Cannot find module" errors
**Fix:** Delete `node_modules` and `package-lock.json`, then run `npm install` again

## Available Scripts

- `npm run dev` - Start development server (uses ts-node for hot reload)
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server from compiled code
- `npm run seed` - Seed database with sample data

## Backend Server Details

- **Default Port:** 4000 (or specified in PORT env variable)
- **CORS Enabled:** Allows requests from `http://localhost:3000`
- **API Routes:**
  - `/` - Health check
  - `/auth` - Authentication endpoints
  - `/patients` - Patient management
  - `/consultations` - Consultation records
  - `/symptoms` - Symptom management

## Debugging

If the server still won't start:

1. Check Node.js and npm versions:
   ```bash
   node --version
   npm --version
   ```

2. Verify MySQL is running:
   ```bash
   mysql -u root -p -e "SELECT VERSION();"
   ```

3. Check if port 4000 is in use:
   ```bash
   netstat -ano | findstr :4000
   ```

4. Review `.env` file configuration

5. Check npm logs:
   ```bash
   npm install --verbose
   ```
