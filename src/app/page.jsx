
'use client'

import React from 'react';
import PasswordManager from './components/PasswordManager'; 
import Generator from './components/Generator';

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
       <Generator passwordsNumber="4"/>
      <PasswordManager /> {/* Using PasswordManager here */}
    </main>
  );
}