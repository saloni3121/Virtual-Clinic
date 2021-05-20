import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import axios from 'axios';

export class DoctorHome extends React.PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            apps: [],
            currentDate: new Date(),
        };
        this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
    }


    
    componentDidMount() {
      axios.get(`http://localhost:5000/doctor-home/${this.props.id}`)
        .then(res => {
          const appointments = res.data.appointments;
          this.setState({apps: appointments});
        })
    }

    render(){
      const {currentDate} = this.state;
      const istTime = date => new Date(date).toLocaleString('en-US', {timeZone: 'UTC'});
        
      const data = this.state.apps.map(function(row){
          return {title: row.patientName,
                  startDate: istTime(row.startDate),
                  endDate: istTime(row.endDate)
                }
      })

   
        
        return (
          <Paper>
            <Scheduler
              data={data}
              height={660}
            >
              <ViewState
                currentDate={currentDate}
                onCurrentDateChange={this.currentDateChange}
              />
              <WeekView
                startDayHour={9}
                endDayHour={18}
              />
              <Toolbar />
              <DateNavigator />
              <TodayButton />
              <Appointments />
            </Scheduler>
          </Paper>
        );
      }
    }

export default DoctorHome
