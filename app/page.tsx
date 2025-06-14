import React from 'react';
import LoginForm from './components/LogInForm';
export default function Home() {
  return (
    <div className=" items-center bg-dark justify-items-center  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
       <LoginForm />
     </div>
  );
}
