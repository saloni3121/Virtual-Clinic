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
            currentDate: new Date(),
        };
        this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
    }


    
    componentDidMount() {
        axios.get(`http://localhost:5000/doctor-home/${this.props.id}`)
          .then(res => {
            console.log(res.data.appointments)
            const appointments = res.data.appointments;
            this.setState({data: appointments});
          })
      }
    
    render() {
        
        const { data, currentDate } = this.state;
        console.log(data)
        // function convert(array){
        //     let newArray
        //     array.map((app)=> {
        //         let obj = {
        //             startDate: app.startDate,
        //             endDate: app.endDate,
        //             title: app.patientName,
        //             id: app.id
        //         }
        //         newArray.push(obj)
        //     })
        //     console.log(newArray);
        //     return newArray;
        // }
        // let arr = convert(data);
        
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
                startDayHour={1}
                endDayHour={23}
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
