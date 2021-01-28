import { authHeader } from "./authHeader";

export const rentalService = {
    save,
};

function save(device) {
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'POST',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({device: device})
    };
    return fetch(`/rentals`, requestOptions).then(data => data.json());
};