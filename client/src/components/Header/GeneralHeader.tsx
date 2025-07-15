

import Image from "next/image";
import logo from '../../../public/CrimexisLogoFinal.png';
import './Header.css';

const GeneralHeader = () => {



    return (
        <header>
            <Image src={logo} className="header-logo" alt="logo" height={200} width={200}/>
            <h1>Crimexis</h1>


            <ul>
                <li></li>
            </ul>
        </header>
    )
};


export default GeneralHeader;

