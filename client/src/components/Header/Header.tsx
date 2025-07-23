"use client";
import Image from "next/image";
import logo from '../../../public/CrimexisLogoFinal.png';
import './Header.css';
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
    let currentPath = usePathname();


    return (
        <header>
            <Image src={logo} className="header-logo" alt="logo" height={200} width={200}/>
            <h1>Crimexis</h1>


            <ul>
                <li className={currentPath === '/Dashboard' ? "active-link" : ''}><Link href='/Dashboard'>Dashboard</Link></li>
                <li className={currentPath === '/AddCrime' ? "active-link" : ''}><Link href='/AddCrime'>Log/AddCrime</Link></li>
                <li className={currentPath === '/Hotspots' ? "active-link" : ''}><Link href='/Hotspots'>Hotspots</Link></li>
                <li className={currentPath === '/CrimeLogs' ? "active-link" : ''}><Link href='/CrimeLogs'>CrimeLogs</Link></li>



                
            </ul>
        </header>
    )
};


export default Header;

