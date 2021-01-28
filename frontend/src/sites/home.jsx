import React, { useEffect, useState } from 'react';
import { deviceService } from '../services/deviceService';
import { userService } from '../services/userService';

export default function Home() {

    const [devices, setDevices] = useState([]);
    const [types, setTypes] = useState([]);
    const [currentDevice, setCurrentDevice] = useState({});

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        deviceService.getAvailable().then(devices => {
            if (devices === []) {
                return;
            }
            setDevices(devices);
        });

        deviceService.getTypes().then(types => setTypes(types));

    }, []);

    let handleSubmit = function (e) {

        e.preventDefault();

        setSubmitted(true);

        // stop here if form is invalid
        if (!(currentDevice)) {
            return;
        }

        setLoading(true);
        deviceService.save({ name: currentDevice.name, type: currentDevice.type })
            .then(() => setLoading(false));
    };

    let logout = function (e) {
        console.log("logout");
        userService.logout();
        window.location.reload();
    };

    let deviceSelectionChanged = function (e) {

        e.preventDefault();

        setCurrentDevice(e.target.value);

    };

    let deviceNameChanged = function (e) {
        let dev = currentDevice;
        dev.name = e.currentTarget.value;
        setCurrentDevice(dev);
    };
    let deviceTypeChanged = function (e) {
        let dev = currentDevice;
        dev.type = e.target.value;
        setCurrentDevice(dev);
    }

    return (
        <div className="col-md-6 col-md-offset-3 container">
            {JSON.stringify(currentDevice)}
            <div className="row align-items-end">
                <button className="btn" onClick={logout}>Logout</button>
            </div>
            <div className="row align-items-center">
                <div className="col col-md-3">
                    <select onChange={deviceSelectionChanged}>
                        {devices && devices.map((d) => <option key={d.id} value={d}>{d.name}</option>)}
                    </select>
                </div>
                <div className="col col-md-3">
                    <form name="form" onSubmit={handleSubmit}>
                        <div className={'form-group' + (submitted && !currentDevice.name ? ' has-error' : '')}>
                            <label htmlFor="deviceName">Devicename:</label>
                            <input type="text" className="form-control" name="deviceName" value={currentDevice.name} onChange={deviceNameChanged} />
                        </div>
                        <div className={'form-group' + (submitted && !currentDevice.type ? ' has-error' : '')}>
                            <label htmlFor="deviceType">Devicetype:</label>
                            <select className="form-control" name="deviceType" onChange={deviceTypeChanged} >
                                {types && types.map((t) => <option value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" disabled={loading}>Speichern</button>
                            {loading &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                        </div>
                        {error &&
                            <div className={'alert alert-danger'}>{error}</div>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}