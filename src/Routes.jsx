import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedApp from './routes/ProtectedApp';


const Routes = () => {

    return (
        <Router >
            <Switch>
                <ProtectedRoute path="/*">
                    <ProtectedApp />
                </ProtectedRoute>
            </Switch>
        </Router>
    );
}

const ProtectedRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                children
            }
        />
    );
}

export default Routes;
