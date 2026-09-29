import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Logo } from '../components/common/Logo';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <Logo size="lg" />
      <div className="space-y-2">
        <h1 className="text-6xl font-black text-indigo-600">404</h1>
        <h2 className="text-2xl font-bold text-slate-900">Page Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link to="/">
          <Button variant="purple" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="secondary" size="md">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};
