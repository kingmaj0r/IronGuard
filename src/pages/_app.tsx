import React from 'react';
import PasswordManager from '../components/PasswordManager'; 
import Generator from '../components/Generator';

import "../assets/css/tailwind.css"
import "../assets/css/app.css"

const _app: React.FC = () => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-slate-900">
      <Generator passwordsNumber={4} />
      <PasswordManager />
    </main>
  );
}

export default _app;