"use client";
import React from 'react'

import AuthSide from '../_Components/AuthSide/AuthSide';
import LoginForm from './LoginForm/LoginForm';
import Logo from '../_Components/Logo/Logo';

export default function page() {
  return (
<main className="min-h-screen bg-[#f4f2ff]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="flex min-h-screen flex-col px-6 py-8 sm:px-10 lg:px-20">
          <Logo />

          <div className="flex flex-1 items-center justify-center py-10">
            <LoginForm />
          </div>
        </section>

        <AuthSide />
      </div>
    </main>
  )
}