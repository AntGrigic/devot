"use client"

import React, { useState } from 'react'
import { LoginFormStyled } from './LoginForm.styles';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

interface LoginFormProps {
    changeForm: () => void;
}

const form = {
    title: 'Login',
    signIn: 'Login',
    formText: 'Need an account?',
    registerHere: 'Register here'
};

const LoginForm: React.FC<LoginFormProps> = ({ changeForm }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <LoginFormStyled>
            <div className='form__login'>
                <p className='form__login--title'>{form.title}</p>
                <input
                    className='form__input'
                    id="email"
                    name="email"
                    placeholder='Email'
                    autoComplete='email'
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div className='form__input--container'>
                    <input
                        className='form__input form__input--password'
                        id='passowrd'
                        name='password'
                        placeholder='Password'
                        type={showPassword ? 'text' : 'password'}
                        autoComplete='current-password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span className={`${showPassword ? 'show' : ''} form__input--password-toggle`} onClick={togglePasswordVisibility} />
                </div>
                <button
                    className='btn btn--primary'
                    disabled={!email || !password}
                    onClick={() => signIn('credentials', {email, password, redirect: true, callbackUrl: '/trackers'})}
                >
                    {form.signIn}
                </button>
            </div>
            <div className='form__new'>
                <Image src={'/images/new-account.png'} alt={'New account icon'} width='95' height='75' />
                <div className='form__new--register'>
                    <p className='form__new--text'>{form.formText}</p>
                    <p className='form__new--highlighted-text' onClick={changeForm}>{form.registerHere}</p>
                </div>
            </div>
        </LoginFormStyled>
    )
};

export default LoginForm;