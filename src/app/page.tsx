'use client'

import { useState } from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import { HomeStyled } from './home.styles';

export default function Home() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  return (
    <HomeStyled className={`${showRegisterForm ? 'test' : ''}`}>
        <LoginForm changeForm={() => setShowRegisterForm(true)} />
        <RegisterForm changeForm={() => setShowRegisterForm(false)} />
    </HomeStyled>
  )
}
