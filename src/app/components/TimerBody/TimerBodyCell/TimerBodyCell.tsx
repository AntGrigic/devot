import React, { useEffect, useRef, useState } from 'react'
import { TimerBodyCellStyled } from './TimerBodyCell.styles';
import { db } from '@/app/firebase';
import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { Timer } from '../TimerBody';

interface TimerBodyCellProps {
    timerId: string;
    isRunning: boolean;
    description: string;
    elapsedTime: number;
    onDelete: () => void;
    startStopwatch: () => void;
    stopStopwatch: () => void;
}

const TimerBodyCell: React.FC<TimerBodyCellProps> = ({
    timerId,
    isRunning,
    description: initialDescription,
    elapsedTime: initialElapsedTime,
    onDelete,
    startStopwatch,
    stopStopwatch,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(initialDescription);
    const [elapsedTime, setElapsedTime] = useState(initialElapsedTime);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

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

            const timerDocRef = doc(collection(db, 'timers'), timerId);
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

    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current!);
            saveTimerData();
        }

        return () => {
            clearInterval(timerRef.current!);
        };
    }, [isRunning, elapsedTime]);

    return (
        <TimerBodyCellStyled>
            <div className={`timer-body__row ${isRunning ? 'active' : ''}`}>
                <div className='timer-body__cell'>
                    <span className='timer-body__cell-timer'>{formatTime(elapsedTime)}</span>
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
                    <span className={`timer-play timer-icon ${isRunning ? 'active' : ''}`} onClick={startStopwatch}></span>
                    <span className='timer-stop timer-icon' onClick={stopStopwatch}></span>
                    <span className='timer-edit timer-icon' onClick={handleEditToggle}></span>
                    <span className='timer-delete timer-icon' onClick={onDelete}></span>
                </div>
            </div>
        </TimerBodyCellStyled>
    )
}

export default TimerBodyCell;
