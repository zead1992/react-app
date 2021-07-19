import React, {FC, useState} from 'react';
import {Layout, Menu} from 'antd';
import {NavLink, useLocation} from 'react-router-dom';


const {SubMenu} = Menu;
const {Header} = Layout;
const Navbar: FC = (props) => {

    const location = useLocation();

    const [state, setState] = useState({
        current: location.pathname,
    });


    return (
        <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[state.current]}>
                <Menu.Item key="/movies">
                    <NavLink to={'/movies'}>
                        Movies
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/movies/new">
                    <NavLink to={'/movies/new'}>
                        Add Movie
                    </NavLink>
                </Menu.Item>
            </Menu>
        </Header>
    );
}

export default Navbar;