import React, {FC, useState} from 'react';
import {Menu} from 'antd';
import {useLocation, matchPath, Link, NavLink, RouteComponentProps} from 'react-router-dom';


const {SubMenu} = Menu;
const Navbar: FC = (props) => {

    const [state, setState] = useState({
        current: 'mail',
    });

    const handleClick = e => {
        setState({current: e.key});

    };

    return (
        <Menu onClick={handleClick}
              selectedKeys={[state.current]}
              mode="horizontal">
            <SubMenu key="movies" title={
                <>
                    <NavLink to={"/movies"}>
                        Movies
                    </NavLink>
                </>
            }>
                <Menu.Item key="add-movie">
                    <NavLink to={"/movies/new"}>
                        Add Movie
                    </NavLink>
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
}

export default Navbar;