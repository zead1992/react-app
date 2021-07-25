import React, {FC, useEffect, useState} from 'react';
import {Button, Layout, Menu} from 'antd';
import {NavLink, useHistory, useLocation} from 'react-router-dom';
import {useTranslation} from "react-i18next";


const {Header} = Layout;
const Navbar: FC = (props) => {

    const {t, i18n} = useTranslation(['web', 'common']);
    const location = useLocation();
    const history = useHistory();

    const [state, setState] = useState({
        current: location.pathname,
    });

    const langSwitch = () => {
        return i18n.language == 'en' ? 'ar' : 'en'
    }

    useEffect(() => {
        setState({current: location.pathname})
    }, [location]);

    const changeLang = async () => {
        await i18n.changeLanguage(langSwitch());
        const url = location.pathname.replace(`/${langSwitch()}/`, `/${i18n.language}/`);
        history.push(url);
    };


    return (
        <Header>
            <div className="logo"/>
            <Menu theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={[state.current]}
                  selectedKeys={[state.current]}>
                <Menu.Item key={`/${i18n.language}/movies`}>
                    <NavLink to={`/${i18n.language}/movies`}>
                        {t('web:movies.title')}
                    </NavLink>
                </Menu.Item>
                <Menu.Item key={`/${i18n.language}/movies/new`}>
                    <NavLink to={`/${i18n.language}/movies/new`}>
                        {t('web:movies.add')}
                    </NavLink>
                </Menu.Item>
                <Menu.Item key={`/${i18n.language}/genres`}>
                    <NavLink to={`/${i18n.language}/genres`}>{t('web:genres.title')}</NavLink>
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