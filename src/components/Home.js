import React from 'react';
import { PageBase } from './SharedComponents';
import styled from 'styled-components';

const Home = () => {
    return (
        <MainPage>
            <MainTitle>Please select part</MainTitle>
        </MainPage>
    );
};

const MainPage = styled(PageBase)`
    text-align: center;
`;

const MainTitle = styled.h1`
    color: blue;
`;

export default Home;
