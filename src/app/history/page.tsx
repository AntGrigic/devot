"use client"

import React from 'react'
import { HistoryStyled } from './history.styles'
import HistoryTimer from '../components/HistoryTimer/HistoyTimer';

const History = () => {
    return (
        <HistoryStyled>
            <h2 className='title'>Trackers History</h2>
            <HistoryTimer />
        </HistoryStyled>
    )
}

export default History;
