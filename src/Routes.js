import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Overview from './routes/Overview';
import Detail from './routes/Detail';

const paths = {
    overview: '/',
    detail: '/:apiName'
};

const InsightsRoute = ({ component: Component, rootClass, ...rest }) => {
    const root = document.getElementById('root');
    root.removeAttribute('class');
    root.classList.add(`page__${rootClass}`, 'pf-c-page__main');
    root.setAttribute('role', 'main');

    return (<Route { ...rest } component={ Component } />);
};

InsightsRoute.propTypes = {
    component: PropTypes.func,
    rootClass: PropTypes.string
};

export const Routes = () => {

    return (
        <Switch>
            <InsightsRoute exact path={ paths.overview } component={ Overview } rootClass='overview'/>
            <InsightsRoute exact path={ paths.detail } component={ Detail } rootClass='detail' />
            <InsightsRoute component={ Overview } rootClass='overview' />
        </Switch>
    );
};

Routes.propTypes = {
    childProps: PropTypes.shape({
        location: PropTypes.shape({
            pathname: PropTypes.string
        })
    })
};
