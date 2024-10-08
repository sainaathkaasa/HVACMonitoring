import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import './Header.css';
// import "../Menu-bar/Menubar.css";
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/UrjalinksLogo_03.png';
import { useDispatch, useSelector } from 'react-redux';
import { set_Menubaropen } from '../../Redux/Action/Action';
import { RootState } from '../../Redux/Reducer';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const Header: React.FC = () => {
    const [toggle, setToggle] = useState<string>('hidden');
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);
    const currentUser = useSelector((state: RootState) => state.user.user)


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setToggle('hidden');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);


        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleVisible = (): void => {
        setToggle((prev) => (prev === 'hidden' ? 'visible' : 'hidden'));
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };


    const menuState = useSelector((state: RootState) => state.user.menubar);

    const menubarDispatch = useDispatch();

    return (
        <div className="header">
            <div className="header-menu-logo">
                {menuState ? (
                    <div
                        className="menu-items"
                        onClick={() => { menubarDispatch(set_Menubaropen(false)) }}
                    >
                        <MenuOpenIcon className="menuicon" />
                    </div>
                ) : (
                    <div
                        className="menu-items"
                        onClick={() => { menubarDispatch(set_Menubaropen(true)) }}
                    >
                        <MenuIcon className="menuicon" />
                    </div>
                )}
                {/* <div className="logo"><div><img src={logo} alt="logo" /></div></div> */}

                <Link to="/dashboards" className="link link2 homelink">
                    {/* <li>Home</li> */}
                    <div className="logo">
                        <div>
                            <img src={logo} alt="logo" />
                        </div>
                    </div>
                </Link>
            </div>

            <div className="account">
                <li className="user-email">
                    <AccountCircleIcon className="accounticon" />
                    <span>{currentUser?.email}</span>
                </li>
                <li className="menuu" onClick={handleVisible}>
                    <MoreVertIcon />
                    <div className={`menu ${toggle}`} ref={menuRef}>
                        <Link className="link2" to="/accountinfo">
                            <AccountCircleIcon />
                            <span>Account</span>
                        </Link>
                        <Link className="link2" to="" onClick={handleLogout}>
                            <LogoutIcon />
                            <span>Logout</span>
                        </Link>
                    </div>
                </li>
            </div>
        </div>
    );
};

export default Header;
