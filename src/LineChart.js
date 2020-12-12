import React, { Component } from 'react';
import './App.css';
import ReactApexChart from "react-apexcharts";

class LineChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    height: 600,
                    type: 'line',
                    zoom: {
                        enabled: false
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: 'Päivittäiset koronatartunnat',
                    align: 'left'
                },
                xaxis: {
                    categories: []
                },
            },
            series: [
                {
                    name: "Tartunnat",
                    data: []
                }
            ]
        };
    }


    render () {
        return (
            <ReactApexChart className="line-chart"
                options={this.state.options}
                series={this.state.series}
                type="line"
                width="95%"
                height={500}
            />
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.dates !== prevProps.dates) {
            this.setState({
                options: {
                    ...prevState.options,
                  xaxis: {     
                    categories: this.props.dates 
                  }
                },
                series: prevState.series.map(
                    el => (el.name === "Tartunnat" ? Object.assign(el, {data: Object.values(this.props.infections)}) : el)
                )
            });
        }
        if (this.props.startDate !== prevProps.startDate || this.props.endDate !== prevProps.endDate) {
            let i, j, y;
            let newDates = [...this.props.dates];
            let newInfections = JSON.parse(JSON.stringify(this.props.infections));
            
            
            for (i = 0; i < newDates.length; i++) {
                if (this.props.startDate.setHours(0,0,0,0) === new Date(newDates[i]).setHours(0,0,0,0)) {
                    break;
                }
            }
            for (y = newDates.length - 1; y >= 0; y--) {
                if (this.props.endDate.setHours(0,0,0,0) === new Date(newDates[y]).setHours(0,0,0,0)) {
                    break;
                }
            }
            for (let z = 0; z < i; z++) {
                newDates.shift();
            }
            j = y - i;
            for (let z = 0; z < newDates.length - 1 - j; z++) {
                newDates.pop();
            }
            i += 27;
            y += 27;
            for (let z = 27; z < i; z++) {
                delete newInfections[z.toString()];
            }
            
            const objectSize = Object.keys(newInfections).length - 1;
            for (let z = i + objectSize; z > y; z--) {
                console.log("hejooo");
                delete newInfections[z.toString()];
            }
            this.setState({
                options: {
                    ...prevState.options,
                  xaxis: {     
                    categories: newDates
                  }
                },
                series: prevState.series.map(
                    el => (el.name === "Tartunnat" ? Object.assign(el, {data: Object.values(newInfections)}) : el)
                )
            });
        }
    }
}



export default LineChart;