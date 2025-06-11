import React from 'react';
import { Navigate } from 'react-router-dom';

// Register component is now handled in Login.tsx
export default function Register() {
  return <Navigate to="/login" replace />;
}