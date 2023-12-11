import React, { useState } from 'react'
import { HistoryTimerCellStyled } from './HistoryTimerCell.styls';
import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { Timer } from '../../TimerBody/TimerBody';

interface HistoyTimerCellProps {
    timerId: string;
    description: string;
    elapsedTime: number;
    moveTimestamp: number;
    onDelete: () => void;
}

const HistoryTimerCell: React.FC<HistoyTimerCellProps> = ({
    description: initialDescription,
    elapsedTime: initialElapsedTime,
    moveTimestamp,
    onDelete,
}) => {
    const [description, setDescription] = useState(initialDescription);
    const [elapsedTime, setElapsedTime] = useState(initialElapsedTime);
    const [isEditing, setIsEditing] = useState(false);

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes
            ).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

        return formattedTime;
    };

    const handleEditToggle = () => {
        setIsEditing((prevIsEditing) => !prevIsEditing);
        saveTimerData();
    }

    const saveTimerData = async () => {
        try {
            const timerData = {
                description,
                elapsedTime,
                timestamp: serverTimestamp(),
            };

            const timerDocRef = doc(collection(db, 'timers'));
            const timerDoc = await getDoc(timerDocRef);

            if (timerDoc.exists()) {
                await updateDoc(timerDocRef, timerData);
            } else {
                await setDoc(timerDocRef, timerData);
            }
        } catch (error) {
            console.error('Error saving timer data:', error);
        }
    };

    const formatDate = (timestamp: number): string => {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate = new Date(timestamp).toLocaleDateString('en-GB', options);

        return formattedDate.replace(/\//g, '.');
    };

    return (
        <HistoryTimerCellStyled>
            <div className='timer-body__row'>
                <div className='timer-body__cell'>
                    <span className='timer-body__cell-date'>{formatDate(moveTimestamp)}</span>
                </div>
                <div className='timer-body__cell'>
                    {isEditing ? (
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onBlur={handleEditToggle}
                            autoFocus
                        />
                    ) : (
                        <span className="timer-body__cell-description" onClick={handleEditToggle}>
                            {description}
                        </span>
                    )}
                </div>
                <div className='timer-body__cell'>
                    <span className='timer-body__cell-timer'>{formatTime(elapsedTime)}</span>
                </div>
                <div className='timer-body__cell'>
                    <span className='timer-edit timer-icon' onClick={handleEditToggle}></span>
                    <span className='timer-delete timer-icon' onClick={onDelete}></span>
                </div>
            </div>
        </HistoryTimerCellStyled>
    )
}

export default HistoryTimerCell;
