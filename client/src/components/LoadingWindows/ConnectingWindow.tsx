import { useEffect, useState } from 'react';
import './ConnectingWindow.css';


const ConnectingWindow = () => {
    const messages = [
        "Waking up secure servers...",
        "Starting backend engine...",
        "Connecting to AlphaTech systems...",
        "Establishing a secure session...",
        "Almost there! Preparing your experience...",
        "Establishing a secure session...",
        "Thanks for your patience...",
        "Almost there! Preparing your experience..."
    ]

    const [currentIndex, setCurrentIndex] = useState(0);
    
    

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => {
            return prev < messages.length-1 ? prev + 1:prev
        })
    },3000);

    return () => clearInterval(interval);
    }, []);

    return (
        <div className="connecting-window">
            <p className='messages'>{messages[currentIndex]}</p>
            <div className='spinner'></div>
        </div>
    )
};


export default ConnectingWindow;