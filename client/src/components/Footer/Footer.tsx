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
            <li><a href="https://www.alphatechit.dev/case-studies/crimexis" target='blank'>Case Study / Blog</a></li>
            <li><a>About Us (Comming Soon)</a></li>

          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Developer</h3>
          <a href="mailto:hassam@alphatechit.dev">Email: hassam@alphatechit.dev</a>
          <a href="https://www.instagram.com/haxxaamm?igsh=MTJsb3RwMnVzcWh1aA%3D%3D&utm_source=qr" target='blank'>Instagram</a>
        </div>

      
      </div>

      <div className="footer-bottom">
        <p>© 2025 <Link href="/">Crimexis</Link> — Managed & Powered by <a href="https://alphatechit.dev" target="_blank" rel="noreferrer">AlphaTech</a></p>
         <p>
          All rights reserved. | Powered by ambition, crafted in Pakistan 🇵🇰
        </p>
      </div>
    </footer>
  );
};

export default Footer;
