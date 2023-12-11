"use client"

import React, { useEffect, useRef, useState } from 'react'
import { TrackersStyled } from './trackers.styles';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import TimerBody from '../components/TimerBody/TimerBody';

const Trackers = () => {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const formattedDateStr = currentDate.toLocaleDateString('de-de')
        setFormattedDate(formattedDateStr);
    }, []);

    return (
        <TrackersStyled>
            <h2 className='title'>Today ({formattedDate}.)</h2>
            <TimerBody />
        </TrackersStyled>
    )
}

export default Trackers;
