"use client"

import Image from 'next/image';
import React from 'react';
import { HeaderStyled } from './Header.style';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/firebase';

const navigation = [
    {
        title: "Trackers",
        link: "trackers",
        icon: "tracker-icon"
    },
    {
        title: "History",
        link: "history",
        icon: "history-icon"
    },
];

const header = {
    headerTitle: 'Tracking tool',
    link: '/',
    logout: 'Logout',
    icon: 'logout-icon'
}

const Header = () => {
    const pathname = usePathname();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <HeaderStyled>
            <div className='header__logo'>
                <Image src={'/images/devot-logo.png'} alt={'Devot Tracking tool'} width="162" height="43" />
                <span className='header__title'>{header.headerTitle}</span>
            </div>
            <nav className='header__navigation'>
                <ul className='header__navigation-list'>
                    {navigation.map((item, index) => (
                        <li
                            className={`header__navigation-list-item ${item.icon} ${pathname === `/${item.link}` ? 'active' : ''}`}
                            key={index}
                        >
                            <Link href={item.link}>
                                {item.title}
                            </Link>
                        </li>
                    ))}
                    <li
                        className={`header__navigation-list-logout ${header.icon} ${pathname === header.link ? 'active' : ''}`}
                        onClick={handleLogout}
                    >
                        <Link href={header.link}>
                            {header.logout}
                        </Link>
                    </li>
                </ul>
            </nav>
        </HeaderStyled>
    )
}

export default Header;