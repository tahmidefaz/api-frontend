import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { PageHeader, PageHeaderTitle, Main } from '@redhat-cloud-services/frontend-components';
import {
    Card,
    CardBody,
    Grid,
    Stack,
    StackItem
} from '@patternfly/react-core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { onLoadApis } from '../store/actions';

const Overview = ({ loadApis, services, history }) => {
    useEffect(() => {
        loadApis();
    }, []);
    return (
        <React.Fragment>
            <PageHeader className="pf-m-light">
                <PageHeaderTitle title='Api documentation' />
            </PageHeader>
            <Main>
                <Grid gutter="md" sm={ 6 } md={ 4 } lg={ 2 }>
                    { services.loaded && services.endpoints && services.endpoints.map((endpoint, key) => (
                        <Card
                            onClick={ e => {
                                e.preventDefault();
                                history.push(`/${endpoint.replace('/api/', '')}`);
                            } }
                            key={ key }
                            className="ins-c-api__list-item"
                        >
                            <CardBody>
                                <Stack>
                                    <StackItem isFilled>
                                        { endpoint.replace('/api/', '') }
                                    </StackItem>
                                </Stack>
                            </CardBody>
                        </Card>
                    )) }
                </Grid>
            </Main>
        </React.Fragment>
    );
};

Overview.propTypes = {
    loadApis: PropTypes.func,
    services: PropTypes.shape({
        loaded: PropTypes.bool
    }),
    history: PropTypes.shape({
        push: PropTypes.func
    })
};
Overview.defaultProps = {
    loadApis: () => undefined,
    services: {
        loaded: false
    }
};

export default withRouter(connect(({ services }) => ({
    services
}), (dispatch) => ({ loadApis: () => dispatch(onLoadApis()) }))(Overview));
