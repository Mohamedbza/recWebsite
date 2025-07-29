# API Configuration Guide

This guide explains the current API configuration for the RecPlus website.

## Current Configuration

The application is now configured to use the production backend URL directly:

- **Production API URL**: `https://rec-plus-server.vercel.app/api`
- **Configuration File**: `config/environment.ts`

## No Environment Variables Required

The application no longer requires environment variables for API configuration. The production URL is hardcoded in the configuration file for simplicity and reliability.

## Configuration Details

### Centralized Configuration
- **File**: `config/environment.ts`
- **API URL**: `https://rec-plus-server.vercel.app/api`
- **Status**: Production-ready

### Updated Files
All API-related files have been updated to use the centralized configuration:

- `lib/api.ts` - Main API service
- `lib/employer-api.ts` - Employer-specific API service
- `store/slices/accountSlice.ts` - Authentication store
- `contexts/EmployerAuthContext.tsx` - Authentication context
- `components/jobs/JobDetailsModal.tsx` - Job details component
- `app/candidate/profile/page.tsx` - Profile management

## Benefits

1. **Simplified Setup**: No environment variables needed
2. **Production Ready**: Always uses the production backend
3. **Reliable**: No risk of misconfiguration
4. **Consistent**: Same behavior across all environments

## Verification

To verify that the configuration is working correctly:

1. Start the development server: `npm run dev`
2. Check the browser console for any API errors
3. Test the login functionality
4. Verify that API calls are going to the production URL

## Debug Information

You can check which API URL is being used by adding this to any component:

```typescript
import { config, isUsingProductionApi } from '../config/environment';

console.log('API URL:', config.apiUrl);
console.log('Using production API:', isUsingProductionApi());
```

## Troubleshooting

### Common Issues

1. **CORS errors**: The production backend should handle CORS properly
2. **Network errors**: Ensure the production backend is accessible
3. **Authentication issues**: Verify the backend endpoints are working

## Deployment

The application is now ready for deployment without any additional configuration. The production API URL is already configured and will work in all environments. 