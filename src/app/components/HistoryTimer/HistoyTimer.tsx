import React, { useEffect, useState } from 'react'
import { HistoryTimerStyled } from './HistoryTimer.styls';
import HistoryTimerCell from './HistoryTimerCell/HistoryTimerCell';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { Timer } from '../TimerBody/TimerBody';

const HistoryTimer = () => {
    const [timers, setTimers] = useState<Timer[]>([] as Timer[]);

    const deleteTimer = async (id: string) => {
        setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));

        try {
            const timerDocRef = doc(collection(db, 'historyTimers'), id);
            await deleteDoc(timerDocRef);
        } catch (error) {
            console.error('Error deleting timer:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const timersCollection = collection(db, 'historyTimers');
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
        <HistoryTimerStyled>
            <div className='timer-container'>
                <div className='timer-content'>
                    <div className='timer-header'>
                        <div className='timer-header__cell'>
                            <span className='timer-header__cell-content'>Date</span>
                        </div>
                        <div className='timer-header__cell'>
                            <span className='timer-header__cell-content'>Description</span>
                        </div>
                        <div className='timer-header__cell'>
                            <span className='timer-header__cell-content'>Time Tracked</span>
                        </div>
                        <div className='timer-header__cell'>
                            <span className='timer-header__cell-content'>Actions</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='timer-body'>
                {timers.map((timer) => (
                    <HistoryTimerCell
                        timerId={timer.id}
                        key={timer.id}
                        description={timer.description}
                        elapsedTime={timer.elapsedTime}
                        moveTimestamp={timer.moveTimestamp}
                        onDelete={() => deleteTimer(timer.id)}
                    />
                ))}
            </div>
        </HistoryTimerStyled>
    )
}

export default HistoryTimer;