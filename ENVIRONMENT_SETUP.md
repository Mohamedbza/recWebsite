# Environment Setup Guide

This guide explains how to set up environment variables for the RecPlus website to connect to the production backend.

## Environment Variables

The application uses environment variables to configure the API endpoints. The main variable you need to set is:

- `NEXT_PUBLIC_API_URL`: The base URL for the backend API

## Setup Instructions

### 1. Create Environment Files

Create the following files in the `recWebsite` directory:

#### For Development (.env.local)
```bash
# Create .env.local file
echo "NEXT_PUBLIC_API_URL=https://rec-plus-server.vercel.app/api" > .env.local
```

#### For Production (.env.production)
```bash
# Create .env.production file
echo "NEXT_PUBLIC_API_URL=https://rec-plus-server.vercel.app/api" > .env.production
```

### 2. Environment File Contents

#### .env.local (Development)
```env
# API Configuration
NEXT_PUBLIC_API_URL=https://rec-plus-server.vercel.app/api

# Environment
NODE_ENV=development
```

#### .env.production (Production)
```env
# API Configuration
NEXT_PUBLIC_API_URL=https://rec-plus-server.vercel.app/api

# Environment
NODE_ENV=production
```

### 3. Alternative: Local Development

If you want to use a local backend server for development, use:

```env
# For local development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Configuration Files

The application now uses a centralized configuration system:

- **`config/environment.ts`**: Centralized environment configuration
- **`lib/api.ts`**: Updated to use the centralized config
- **`lib/employer-api.ts`**: Updated to use the centralized config
- **All components**: Updated to use the centralized config

## Verification

To verify that your environment is set up correctly:

1. Start the development server: `npm run dev`
2. Check the browser console for any API errors
3. Test the login functionality
4. Verify that API calls are going to the correct URL

## Troubleshooting

### Common Issues

1. **API calls still going to localhost**: Make sure you've created the `.env.local` file and restarted the development server
2. **Environment variables not loading**: Ensure the variable name starts with `NEXT_PUBLIC_` for client-side access
3. **CORS errors**: The production backend should handle CORS properly

### Debug Information

You can check which API URL is being used by adding this to any component:

```typescript
import { config, isUsingProductionApi } from '../config/environment';

console.log('API URL:', config.apiUrl);
console.log('Using production API:', isUsingProductionApi());
```

## Deployment

When deploying to production (e.g., Vercel), make sure to set the environment variable:

- `NEXT_PUBLIC_API_URL=https://rec-plus-server.vercel.app/api`

This ensures that the production frontend connects to the production backend. 