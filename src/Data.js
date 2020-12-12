import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import LineChart from './LineChart';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

let source;

class Data extends Component {
    constructor(props) {
      super(props);
      this.state = {
          infections: [],
          dates: [],
          startDate: new Date(2020,0,28),
          endDate: new Date(new Date().setDate(new Date().getDate()-1))
      };
      source = axios.CancelToken.source();
    }


    render () {
        return (
            <div>
                <LineChart
                    infections={this.state.infections}
                    dates={this.state.dates}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}/>
                <div className="dateButton1">
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={date => this.setState({startDate: date})}
                        selectsStart
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        minDate={new Date(2020,0,28)}
                        maxDate={this.state.endDate}
                        dateFormat="yyyy/MM/dd"/>
                </div>
                <div className="dateButton2">
                    <DatePicker
                        selected={this.state.endDate}
                        onChange={date => this.setState({endDate: date})}
                        selectsEnd
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        minDate={this.state.startDate}
                        maxDate={new Date(new Date().setDate(new Date().getDate()-1))}
                        dateFormat="yyyy/MM/dd"/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        let index = [];
        let label = [];
        let values = [];
        let temp = [];
        const elapsed_days = this.daysFromStart();
        axios.get('/fact_epirapo_covid19case.json?column=dateweek2020010120201231-443702L', {
            cancelToken: source.token
        }).then(res => {
            index = res.data.dataset.dimension.dateweek2020010120201231.category.index;
            label = res.data.dataset.dimension.dateweek2020010120201231.category.label;
            values = res.data.dataset.value;
            delete values[(Object.keys(values).length + 26).toString()];
            for (let j = 27; j <= elapsed_days; j++) {
                for (let i = 443640; i <= 444640; i++) {
                    if (index[i] === j) { 
                        temp.push(label[i]);
                    }
                }
            }
            this.setState({
                infections: values,
                dates: temp
            });
            console.log(this.state.infections);
            console.log(this.state.dates);
        }).catch(err => {
            console.log("Catched error: " + err.message);
        });

    }
    componentWillUnmount() {
        if (source) {
            source.cancel("Component got unmounted");
        }
    }

    daysFromStart = () => {
        const date1 = new Date("Jan 2, 2020, 12:00:00");
        const date2 = new Date();

        const total_seconds = Math.abs(date2 - date1) / 1000;

        const days_difference = Math.floor(total_seconds / (60 * 60 * 24));

        return days_difference;
    }
}


export default Data;