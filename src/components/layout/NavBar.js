import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import appRoutes from '../../appRoutes';

const NavBar = () => {
    return (
        <Container>
            <Link to={appRoutes.home}>Home</Link>|
            <Link to={appRoutes.part1}>Part 1</Link>|
            <Link to={appRoutes.part2}>Part 2</Link>
        </Container>
    );
};

const Container = styled.div`
    color: white;
    text-align: center;
    width: 100%;
    position: fixed;
    top: 0;
    background-color: #5c5858;
    height: 60px;
    line-height: 60px;

    & a {
        margin-right: 20px;
        margin-left: 20px;
        color: white;
    }
`;

export default NavBar;
