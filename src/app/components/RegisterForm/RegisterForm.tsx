"use client"

import React, { useEffect, useState } from 'react'
import { RegisterFormStyled } from './RegisterForm.styles';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '@/app/firebase';

interface RegisterFormProps {
    changeForm: (showLoginForm: boolean) => void;
}

const form = {
    title: 'Register',
    signUp: 'Sign up',
    emailAlert: 'Email already exist!'
};

const RegisterForm: React.FC<RegisterFormProps> = ({ changeForm }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [emailExists, setEmailExists] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const togglePasswordAgainVisibility = () => {
        setShowPasswordAgain((prevShowPassword) => !prevShowPassword);
    };

    const checkEmailExists = async () => {
        try {
            await fetchSignInMethodsForEmail(auth, email);
            setEmailExists(false);
        } catch (error) {
            console.error('Error checking email existence:', error);
        }
    };

    const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            changeForm(false);
        } catch (error) {
            console.error('Error creating user:', error);
            setEmailExists(true);
        }
    };

    useEffect(() => {
        if (email) {
            checkEmailExists();
        }
    }, [email]);

    return (
        <RegisterFormStyled>
            <div className='form__login'>
                <p className='form__login--title'>{form.title}</p>
                <div className='form__input--container email'>
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
                    <span className={`form__input--alert ${emailExists ? 'show' : ''}`}>{form.emailAlert}</span>
                </div>
                <div className='form__input--container'>
                    <input
                        className='form__input form__input--password'
                        id='password'
                        name='password'
                        placeholder='Password'
                        type={showPassword ? 'text' : 'password'}
                        autoComplete='current-password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span className={`${showPassword ? 'show' : ''} form__input--password-toggle`} onClick={togglePasswordVisibility} />
                </div>
                <div className='form__input--container'>
                    <input
                        className='form__input form__input--password'
                        id='passwordAgain'
                        name='passwordAgain'
                        placeholder='Password'
                        type={showPassword ? 'text' : 'password'}
                        autoComplete='current-password'
                        onChange={(e) => setPasswordAgain(e.target.value)}
                        required
                    />
                    <span className={`${showPasswordAgain ? 'show' : ''} form__input--password-toggle`} onClick={togglePasswordAgainVisibility} />
                </div>
                <button
                    className='btn btn--primary'
                    disabled={(!email || !password || !passwordAgain) || (password !== passwordAgain) || emailExists}
                    onClick={() => signUp()}
                >
                    {form.signUp}
                </button>
            </div>
        </RegisterFormStyled>
    )
};

export default RegisterForm;