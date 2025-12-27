import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-primary-600">
            PersonalizedAI
          </h1>
          <p className="text-gray-600 mt-2">
            AI-Powered Adaptive English Learning
          </p>
        </div>
        
        {/* Auth form container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Outlet />
        </div>
        
        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} PersonalizedAI. All rights reserved.
        </p>
      </div>
    </div>
  );
}
