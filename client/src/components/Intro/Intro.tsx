import './Intro.css';
import Link from 'next/link';

const Intro = () => {
  return (
    <div className="intro-page">
      <div className="hero">
        <h1 className="main-heading">Solve & Analyze with <span className="brand">Crimexis</span></h1>
        <p className="sub-heading">
          Empower your department with modern crime logging, hotspot detection, and smart analytics.  
          Crimexis brings clarity, structure, and actionable insights to law enforcement & internal crime reporting.
        </p>
      </div>

      <div className="CTA">
        <Link href='/Register'>
          <button className="cta-button primary">Create Account</button>
        </Link>
        <Link href='/Login'>
          <button className="cta-button secondary">Login to Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default Intro;
