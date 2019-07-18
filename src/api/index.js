import { versionMapper, DEFAULT_PREFIX } from './constants';

export const apiList = () => {
    return fetch(`/${DEFAULT_PREFIX}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(r => {
        if (r.ok) {
            return r.json();
        }

        throw new Error(`Unexpected response code ${r.status}`);
    });
};

export const oneApi = ({ name, version = 'v1' }) => {
    const url = `/${DEFAULT_PREFIX}/${name}/${versionMapper[name] || version}/openapi.json`;
    return fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(r => {
        if (r.ok) {
            return r.json().then(data => ({
                ...data,
                latest: url
            }));
        }

        throw new Error(`Unexpected response code ${r.status}`);
    });
};
