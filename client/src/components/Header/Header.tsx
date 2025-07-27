"use client";

import Image from "next/image";
import logo from '../../../public/CrimexisLogoFinal.png';
import './Header.css';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Header = () => {
    let currentPath = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <header>
                <button className="hamburger-btn" onClick={toggleSidebar}>☰</button>


                <Image src={logo} className="header-logo" alt="logo" height={200} width={200}/>
                <h1>Crimexis</h1>


                <ul>
                    <li className={currentPath === '/Dashboard' ? "active-link" : ''}><Link href='/Dashboard'>Dashboard</Link></li>
                    <li className={currentPath === '/AddCrime' ? "active-link" : ''}><Link href='/AddCrime'>Log/AddCrime</Link></li>
                    <li className={currentPath === '/Hotspots' ? "active-link" : ''}><Link href='/Hotspots'>Hotspots</Link></li>
                    <li className={currentPath === '/CrimeLogs' ? "active-link" : ''}><Link href='/CrimeLogs'>CrimeLogs</Link></li>
                </ul>
            </header>

            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={toggleSidebar}>×</button>
                <ul>
                    <li className={currentPath === '/Dashboard' ? "active-link" : ''}><Link href='/Dashboard'>Home/Dashboard</Link></li>
                    <li className={currentPath === '/Settings' ? "active-link" : ''}><Link href='/Settings'>Manage Settings</Link></li>
                    <li className={currentPath === '/Account' ? "active-link" : ''}><Link href='/Account'>Manage Account</Link></li>
                    <li className={currentPath === '/Session&Network' ? "active-link" : ''}><Link href='/Session&Network'>Network & Session</Link></li>
                    <li className={currentPath === '/ContactDeveloper' ? "active-link" : ''}><Link href='/ContactDeveloper'>Contact Developer</Link></li>
                </ul>
            </div>

        </>
    )
};

export default Header;
