import React, { useState, useEffect } from 'react';
import { Loader } from '../SharedComponents';
import styled from 'styled-components';
import calculateMostIsolatedCountry from '../../utils/isolatedCountryUtils';
import { PageBase } from '../SharedComponents';
import getAgentsActivity from '../../api/agents';

const Part1 = () => {
    const [agentsActivity, setAgentsActicity] = useState(null);

    useEffect(() => {
        const loadAgentsActivity = async () => {
            const agentsActivityResposne = await getAgentsActivity();
            setAgentsActicity(agentsActivityResposne);
        };

        loadAgentsActivity();
    }, []);

    const renderLoader = () => {
        return <Loader>Loading...</Loader>;
    };

    const renderEmptyState = () => {
        return <EmptyState>Sorry, No agents data recorded</EmptyState>;
    };

    const renderSingleWinnerMessage = (isolatedCountryData) => {
        return (
            <>
                <div>
                    And the most isolated country is...{' '}
                    <ColoredData>{isolatedCountryData.country}!!!</ColoredData>
                </div>
                <div>
                    Which had{' '}
                    <ColoredData>
                        {isolatedCountryData.isolatedAgentsCount}
                    </ColoredData>{' '}
                    isolated agents!!!
                </div>
            </>
        );
    };

    const renderMultipleWinnersMessage = (isolatedCountriesData) => {
        return (
            <>
                <div>Those are most isolated countries:</div>
                {isolatedCountriesData.map((isolatedCountry) => {
                    return (
                        <div key={isolatedCountry.country}>
                            <ColoredData>
                                {isolatedCountry.country}{' '}
                            </ColoredData>{' '}
                            with{' '}
                            <ColoredData>
                                {isolatedCountry.isolatedAgentsCount}{' '}
                            </ColoredData>
                            isolated agents
                        </div>
                    );
                })}
            </>
        );
    };

    const mainRender = () => {
        if (!agentsActivity) {
            return renderLoader();
        } else if (agentsActivity.length === 0) {
            return renderEmptyState();
        } else {
            const mostIsolatedCountries = calculateMostIsolatedCountry(
                agentsActivity
            );
            if (mostIsolatedCountries.length === 1) {
                return renderSingleWinnerMessage(mostIsolatedCountries[0]);
            } else {
                return renderMultipleWinnersMessage(mostIsolatedCountries);
            }
        }
    };

    return <Container>{mainRender()}</Container>;
};

const EmptyState = styled.div`
    font-size: 50px;
`;

const ColoredData = styled.span`
    color: red;
`;

const Container = styled(PageBase)`
    padding-top: 100px;
    text-align: center;
    color: black;
    font-size: 40px;
`;

export default Part1;
