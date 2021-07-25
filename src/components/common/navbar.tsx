import React, {FC, useEffect, useState} from 'react';
import {Layout, Menu, Button} from 'antd';
import {NavLink, useLocation} from 'react-router-dom';
import {useTranslation} from "react-i18next";


const {Header} = Layout;
const Navbar: FC = (props) => {

    const {t, i18n} = useTranslation(['web','common']);
    const location = useLocation();

    const [state, setState] = useState({
        current: location.pathname,
    });

    const langSwitch = ()=>{
       return  i18n.language == 'en' ? 'ar' : 'en'
    }

    useEffect(() => {
        setState({current: location.pathname})
    }, [location]);

    const changeLang = async () => {
        await i18n.changeLanguage(langSwitch());
    };


    return (
        <Header>
            <div className="logo"/>
            <Menu theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={[state.current]}
                  selectedKeys={[state.current]}>
                <Menu.Item key="/movies">
                    <NavLink to={'/movies'}>
                        {t('web:movies.title')}
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/movies/new">
                    <NavLink to={'/movies/new'}>
                        {t('web:movies.add',{title:'movie'})}
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/genres">
                    <NavLink to={'/genres'}>{t('web:genres.title')}</NavLink>
                </Menu.Item>
                <Menu.Item>
                    <Button onClick={() => changeLang()}
                            type={"primary"}>{langSwitch().toUpperCase()}</Button>
                </Menu.Item>
            </Menu>
        </Header>
    );
}

export default Navbar;