// lib/endpoints.js

const endpoints = {
  development: {
    api_gateway: process.env.NEXT_PRIVATE_API_GATEWAY, 
  },
  production: {
    api_gateway: process.env.NEXT_PUBLIC_API_GATEWAY, 
  },
};

export const getEndpoint = () => { 
  const env = process.env.NODE_ENV || 'development';
  
  if (!endpoints[env]) {
    throw new Error(`No endpoint configuration found for environment: ${env}`);
  }

  return endpoints[env];
};