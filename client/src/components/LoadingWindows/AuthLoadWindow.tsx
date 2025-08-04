
import './AuthLoadWindow.css';

const AuthLoadWindow = () => {

    return (
        <div className="auth-load-page">
            <div>
            <p className='authloadmessages'>Checking Auth With Servers...</p>
            </div>
            <div className="spinner"></div>
        </div>
    )
};


export default AuthLoadWindow;