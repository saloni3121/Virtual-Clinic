import React from 'react';
import Scheduler from '../components/Scheduler.js';

function DoctorHome(props) {

    return (
        <div>
            <Scheduler id={props.match.params.id}></Scheduler>
        </div>
    )
}

export default DoctorHome



