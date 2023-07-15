import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "./utils/PlayButton";
import PauseButton from "./utils/PauseButton";
import SettingsButton from "./utils/SettingsButton";
import { useContext, useEffect, useRef, useState } from "react";
import SettingsContext from "./context/SettingsContext";

const red = '#f54e4e';
const green = '#4aec8c';

function Timer() {
    const [isPaused, setIsPaused] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [mode, setMode] = useState('work'); //work/break/null
    
    const secondsLeftRef = useRef();
    const isPausedRef = useRef();
    const modeRef = useRef();

    const settingsInfo = useContext(SettingsContext);

    const totalSeconds = (mode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
    const percentage = Math.round(secondsLeft / totalSeconds);

    useEffect(() => {
        initTimer();

        // TODO: setInterval is used here, but it might desync. If it does, be sure to change it in the next branch
        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }

            if (secondsLeftRef.current === 0) {
                return switchMode();
            }

            tick();
        }, 1000);

        // Clear interval on component unmount
        return interval;
    }, [settingsInfo]);

    const initTimer = () => {
        setSecondsLeft(settingsInfo.workMinutes * 60);
    };

    const switchMode = () => {
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
        const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
        
        setMode(nextMode);
        modeRef.current = nextMode;

        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;
    }

    const tick = () => {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    return (
        <div>
            <CircularProgressbar
                value={percentage} 
                text={`${percentage}%`} 
                styles={buildStyles({ 
                    textColor: '#fff',
                    pathColor: red,
                    trailColor: 'rgba(255, 255, 255, .2)'
                })}
            />
            <div style={{marginTop:'20px'}}>
                {isPaused ? <PlayButton /> : <PauseButton />}
            </div>
            <div style={{marginTop:'20px'}}>
                <SettingsButton onClick={() => {
                    settingsInfo.setShowSettings(true);
                }}/>
            </div>
        </div>
    )
}

export default Timer