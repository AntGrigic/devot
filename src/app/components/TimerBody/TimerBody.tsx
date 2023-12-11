import React, { useEffect, useRef, useState } from 'react'
import { TimerBodyStyled } from './TimerBody.styles'
import TimerBodyCell from './TimerBodyCell/TimerBodyCell';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

export interface Timer {
    id: string;
    isRunning: boolean;
    description: string;
    elapsedTime: number;
    moveTimestamp: number;
}

const TimerBody = () => {
    const [timers, setTimers] = useState<Timer[]>([] as Timer[]);

    const startNewTimer = async () => {
        try {
            const newTimer: Timer = {
                id: '',
                isRunning: false,
                description: '-',
                elapsedTime: 0,
                moveTimestamp: 0,
            };

            const timersCollection = collection(db, 'timers');
            const timerDocRef = await addDoc(timersCollection, newTimer);

            newTimer.id = timerDocRef.id;

            setTimers((prevTimers) => [...prevTimers, newTimer]);
        } catch (error) {
            console.error('Error starting a new timer:', error);
        }
    };

    const deleteTimer = async (id: string) => {
        setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));

        try {
            const timerDocRef = doc(collection(db, 'timers'), id);
            await deleteDoc(timerDocRef);
        } catch (error) {
            console.error('Error deleting timer:', error);
        }
    };

    const startStopwatch = (id: string) => {
        setTimers((prevTimers) =>
            prevTimers.map((timer) =>
                timer.id === id
                    ? { ...timer, isRunning: !timer.isRunning }
                    : timer.isRunning
                    ? { ...timer, isRunning: false }
                    : timer
                )
        );
    };

    const stopStopwatch = async (id: string) => {
        setTimers((prevTimers) =>
            prevTimers.map((timer) =>
                timer.id === id
                    ? { ...timer, isRunning: false }
                    : timer
            )
        );

        try {
            const timerDocRef = doc(collection(db, 'timers'), id);
            await updateDoc(timerDocRef, { isRunning: false });

            const timerToMove = timers.find((timer) => timer.id === id);
            if (timerToMove) {
                await moveTimerToHistory(id, timerToMove);
            }
        } catch (error) {
            console.error('Error stopping timer:', error);
        }
    };

    const moveTimerToHistory = async (id: string, timerToMove: Timer) => {
        try {
            const historyTimersCollection = collection(db, 'historyTimers');
            const historyTimerDocRef = doc(historyTimersCollection, id);

            await setDoc(historyTimerDocRef, timerToMove);

            await deleteTimer(id);
        } catch (error) {
            console.error('Error moving timer to history:', error);
        }
    };

    const stopAllTimers = () => {
        setTimers((prevTimers) =>
            prevTimers.map((timer) => ({
                ...timer,
                isRunning: false,
            }))
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const timersCollection = collection(db, 'timers');
                const querySnapshot = await getDocs(timersCollection);

                const fetchedTimers: Timer[] = [];
                querySnapshot.forEach((doc) => {
                    const timerData = doc.data() as Timer;
                    timerData.id = doc.id;
                    fetchedTimers.push(timerData);
                });

                setTimers(fetchedTimers);
            } catch (error) {
                console.error('Error fetching timers:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <TimerBodyStyled>
            <div className='timer-container'>
                <div className='timer-buttons'>
                    <span className='timer-buttons__new btn btn--primary' onClick={startNewTimer}>Start new timer</span>
                    <span className='timer-buttons__stop btn btn--secondery' onClick={stopAllTimers}>Stop all</span>
                </div>
                <div className='timer-content'>
                    <div className='timer-header'>
                        <div className='timer-header__cell'>
                            <span className='timer-header__cell-content'>Time logged</span>
                        </div>
                        <div className='timer-header__cell'>
                            <span className='timer-header__cell-content'>Description</span>
                        </div>
                        <div className='timer-header__cell'>
                            <span className='timer-header__cell-content'>Actions</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='timer-body'>
                {timers.map((timer) => (
                    <TimerBodyCell
                        timerId={timer.id}
                        key={timer.id}
                        isRunning={timer.isRunning}
                        description={timer.description}
                        elapsedTime={timer.elapsedTime}
                        onDelete={() => deleteTimer(timer.id)}
                        startStopwatch={() => startStopwatch(timer.id)}
                        stopStopwatch={() => stopStopwatch(timer.id)}
                    />
                ))}
            </div>
        </TimerBodyStyled>
    )
}

export default TimerBody;
