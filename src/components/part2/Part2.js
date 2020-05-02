import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PageBase } from '../SharedComponents';
import columns from './Part2GridColumnsConfig';
import getMockDistanceMetrix from '../../api/google';
import getAgentsActivity from '../../api/agents';
import { Loader } from '../SharedComponents';
import Grid from './Grid';

const Part2 = () => {
    const [rows, setRows] = useState(null);

    // would run on mounting and unmounting of the component
    useEffect(() => {
        const loadAgentsActicvity = async () => {
            console.log('loading data...');
            const agentsActivity = await getAgentsActivity();
            const distancesResponse = await getMockDistanceMetrix();

            let distances = distancesResponse.rows.map(
                (distance) => distance.elements[0].distance.value
            );

            // get distance edges
            const maxDistance = Math.max(...distances);
            const minDistance = Math.min(...distances);

            // apply distance styling to rows
            let styledRows = agentsActivity.map((agentActivity, index) => ({
                data: { ...agentActivity },
                style: {
                    color: setRowColor(
                        maxDistance,
                        minDistance,
                        distances[index]
                    )
                }
            }));

            // set the rows in the state
            setRows(
                styledRows.sort(
                    (firstRow, secondRow) =>
                        new Date(firstRow.data.date) -
                        new Date(secondRow.data.date)
                )
            );
        };

        loadAgentsActicvity();
    }, []);

    const setRowColor = (maxDistance, minDistance, distance) => {
        if (minDistance === distance) return 'green';
        else if (maxDistance === distance) return 'red';
        else return 'black';
    };

    const renderGrid = () => {
        return <Grid rows={rows} columns={columns} totalRowText='missions' />;
    };

    const renderLoader = () => {
        return <Loader>Loading...</Loader>;
    };

    return <Container>{rows ? renderGrid() : renderLoader()}</Container>;
};

const Container = styled(PageBase)`
    height: fit-content;
    width: 100%;
`;

export default Part2;
