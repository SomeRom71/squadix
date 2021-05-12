import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ME_PATH, LOGIN_PATH, POLICY_PATH, RULES_PATH, TERMS_PATH } from '../../constants/routes.constants';
import UserPreview from '../user-preview';
import cn from 'classnames';

import s from './header-menu.module.scss';

const HeaderMenu = ({className, displayName, profilePictureUrl}) => {

    const menuRef = useRef();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const history = useHistory();

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }
  
    const onLogout = () => {
        localStorage.removeItem('accessToken');
        history.push(LOGIN_PATH);
    }

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    return (
        <div 
            ref={menuRef}
            className={cn(s.container, className)}
        >
            <UserPreview 
                name={displayName}
                avatar={profilePictureUrl}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            {isMenuOpen && 
                <ul className={s.menu}>
                    <li>
                        <Link to={ME_PATH}>Профиль</Link>
                    </li>
                    <li>
                        <Link to={POLICY_PATH}>Политика</Link>
                    </li>
                    <li>
                        <Link to={RULES_PATH}>Правила</Link>
                    </li>
                    <li>
                        <Link to={TERMS_PATH}>Условия</Link>
                    </li>
                    <li>
                        <button
                            onClick={() => onLogout()}
                        >
                            Выйти
                        </button>
                    </li>
                </ul>
            }
        </div>
    )
}

export default HeaderMenu;