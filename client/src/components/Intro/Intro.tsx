import './Intro.css';
import Link from 'next/link';
const Intro = () => {




    return (
        <div className="intro-page">
            <div className="hero">
                <h1>Solve & Analyze With Crimexis</h1>
            </div>

            <div className="CTA">
                <button><Link href='/Register'>Register</Link></button>
                <button><Link href='/Login'>Login</Link></button>
            </div>
        </div>
    )
};


export default Intro;


