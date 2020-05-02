import React from 'react';
import styled from 'styled-components';

const Grid = ({ columns, rows, totalRowText }) => {
    return (
        <Table>
            <Headers>
                {Object.keys(columns).map((column, index) => (
                    <Header
                        key={index}
                        minWidth={columns[column].minWidth}
                        width={columns[column].width}
                    >
                        {columns[column].displayName}
                    </Header>
                ))}
            </Headers>
            <Body>
                {rows.map((row, index) => {
                    return (
                        <Row key={index}>
                            {Object.keys(row.data).map((cell, index) => {
                                const column = columns[cell];

                                return (
                                    <Cell
                                        color={row.style.color}
                                        key={index}
                                        width={column.width}
                                        minWidth={column.minWidth}
                                    >
                                        {row.data[cell]}
                                    </Cell>
                                );
                            })}
                        </Row>
                    );
                })}
            </Body>
            <Summary>
                <TotalRow>
                    {rows.length} {totalRowText}
                </TotalRow>
            </Summary>
        </Table>
    );
};

const TotalRow = styled.div`
    position: absolute;
    font-size: 13px;
    right: 0;
    margin-right: 20px;
    font-weight: 700;
`;

const Summary = styled.div`
    background-color: #e4f0e5;
    position: relative;
    height: 40px;
    line-height: 40px;
    border-radius: 0 0 5px 5px;
    border-top: 2px solid lightgray;
    border-bottom: 1px solid lightgray;
    border-right: 1px solid lightgray;
    border-left: 1px solid lightgray;
`;

const Cell = styled.div`
    color: ${(props) => props.color};
    text-indent: 15px;
    box-sizing: border-box;
    font-size: 15px;
    line-height: 40px;
    font-weight: 700;
    flex: ${(props) => props.width};
    min-width: ${(props) => props.minWidth};
`;

const Row = styled.div`
    display: flex;
    border-bottom: 1px solid lightgray;

    &:last-of-type {
        border-bottom: none;
    }
`;

const Body = styled.div`
    height: fit-content;
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
`;

const Header = styled(Cell)`
    height: 30px;
    line-height: 30px;
    flex: ${(props) => props.width};
    font-weight: 900;
    border-left: 1px solid lightgray;
    margin-top: 5px;
    margin-bottom: 5px;

    &:first-of-type {
        border-left: none;
    }
`;

const Headers = styled.div`
    background-color: #e4f0e5;
    height: 40px;
    display: flex;
    border: 1px solid lightgray;
    border-bottom: 2px solid lightgray;
    border-radius: 5px 5px 0 0;
`;

const Table = styled.div`
    padding-right: 30px;
    padding-left: 30px;
    min-width: fit-content;
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
`;

export default Grid;
