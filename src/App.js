import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Part1 from './components/part1/Part1';
import Part2 from './components/part2/Part2';
import NavBar from './components/layout/NavBar';
import appRoutes from './appRoutes';

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path={appRoutes.home} component={Home} />
                <Route path={appRoutes.part1} component={Part1} />
                <Route path={appRoutes.part2} component={Part2} />
                <Route />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
