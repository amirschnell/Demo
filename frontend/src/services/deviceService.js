import { authHeader } from "./authHeader";

export const deviceService = {
    getAvailable,
    save,
    getTypes,
};

function getAvailable() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`/devices/available`, requestOptions).then(data => data.json());
};

function save(device) {
    const requestOptions = {
        method: 'POST',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(device)
    };
    return fetch(`/devices`, requestOptions);
};

function getTypes() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`/devices/types`, requestOptions).then(data => data.json());
}