import { config } from '../config/environment';

// Test function to check API connectivity
export const testApiConnectivity = async () => {
  console.log('Testing API connectivity...');
  console.log('API URL:', config.apiUrl);
  
  try {
    // Test basic connectivity
    const testUrl = `${config.apiUrl}/health`;
    console.log('Testing health endpoint:', testUrl);
    
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Health check response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Health check data:', data);
      return { success: true, message: 'API is reachable' };
    } else {
      console.log('Health check failed:', response.statusText);
      return { success: false, message: `Health check failed: ${response.status}` };
    }
  } catch (error) {
    console.error('API connectivity test failed:', error);
    return { success: false, message: `Connection failed: ${error.message}` };
  }
};

// Test function for candidate login endpoint
export const testCandidateLogin = async (email: string, password: string) => {
  console.log('Testing candidate login endpoint...');
  
  const endpoint = `${config.apiUrl}/auth/candidates/login/public`;
  console.log('Candidate login endpoint:', endpoint);
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    console.log('Candidate login response status:', response.status);
    console.log('Candidate login response headers:', Object.fromEntries(response.headers));
    
    let data;
    try {
      data = await response.json();
    } catch (e) {
      console.error('Failed to parse JSON response:', e);
      const text = await response.text();
      console.log('Response text:', text);
      return { success: false, message: 'Invalid JSON response' };
    }
    
    console.log('Candidate login response data:', data);
    
    return {
      success: response.ok,
      status: response.status,
      data,
      message: response.ok ? 'Login test successful' : `Login test failed: ${response.status}`
    };
  } catch (error) {
    console.error('Candidate login test failed:', error);
    return { success: false, message: `Connection failed: ${error.message}` };
  }
};

// Test function for employer login endpoint
export const testEmployerLogin = async (email: string, password: string) => {
  console.log('Testing employer login endpoint...');
  
  const endpoint = `${config.apiUrl}/auth/companies/login/public`;
  console.log('Employer login endpoint:', endpoint);
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    console.log('Employer login response status:', response.status);
    console.log('Employer login response headers:', Object.fromEntries(response.headers));
    
    let data;
    try {
      data = await response.json();
    } catch (e) {
      console.error('Failed to parse JSON response:', e);
      const text = await response.text();
      console.log('Response text:', text);
      return { success: false, message: 'Invalid JSON response' };
    }
    
    console.log('Employer login response data:', data);
    
    return {
      success: response.ok,
      status: response.status,
      data,
      message: response.ok ? 'Login test successful' : `Login test failed: ${response.status}`
    };
  } catch (error) {
    console.error('Employer login test failed:', error);
    return { success: false, message: `Connection failed: ${error.message}` };
  }
};

// Comprehensive API test
export const runAuthTests = async () => {
  console.log('=== Running Authentication Tests ===');
  
  // Test API connectivity
  const connectivityTest = await testApiConnectivity();
  console.log('Connectivity test result:', connectivityTest);
  
  // Note: These are just endpoint tests - you would need real credentials to test actual login
  console.log('=== Authentication tests complete ===');
  
  return {
    connectivity: connectivityTest,
    candidateEndpoint: `${config.apiUrl}/auth/candidates/login/public`,
    employerEndpoint: `${config.apiUrl}/auth/companies/login/public`,
  };
};