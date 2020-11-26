import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

// URLwee.app/-> home
// URLwee.app/:code -> redirect
// URLwee.app/:code/stats -> stats
// URLwee.app/* -> NotFound

import home from '../pages/home';
import redirect from '../pages/redirect';
import stats from '../pages/stats';
import NotFound from '../pages/NotFound';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/:code" component={redirect} />
                <Route exact path="/:code/stats" component={stats} />
                <Route exact path="/*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}


export default Routes;