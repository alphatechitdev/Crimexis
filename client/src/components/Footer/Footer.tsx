import Link from 'next/link';
import './Footer.css'; 
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>Crimexis</h2>
          <p>Crimexis — Predict Prevent Protect</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/About">About Us</a></li>
            <li><a href="/Portfolio">Our Portfolio</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p></p>
          <p></p>
        </div>

      
      </div>

      <div className="footer-bottom">
        <p>© 2025 <Link href="/">Crimexis</Link> — Managed & Powered by <a href="https://alphatechit.dev" target="_blank" rel="noreferrer">AlphaTech</a></p>
      </div>
    </footer>
  );
};

export default Footer;
