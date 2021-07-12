import React, {FC, useState} from 'react';
import {Menu,Layout} from 'antd';
import {useLocation, matchPath, Link, NavLink, RouteComponentProps} from 'react-router-dom';


const {SubMenu} = Menu;
const {Header} = Layout;
const Navbar: FC = (props) => {

    const [state, setState] = useState({
        current: 'movies',
    });

    const handleClick = e => {
        console.log(e);
        setState({current: e.key});
        console.log(state);
    };

    return (
        <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[state.current]}>
                <Menu.Item key="movies">
                    <NavLink to={'/movies'}>
                        Movies
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="add-movie">
                    <NavLink to={'/movies/new'}>
                        Add Movie
                    </NavLink>
                </Menu.Item>
            </Menu>
        </Header>
    );
}

export default Navbar;