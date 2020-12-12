import React, { Component } from 'react';
import './App.css';
import ReactApexChart from "react-apexcharts";

/*
    Pylväsdiagrammin luominen propsien avulla.
    Käytetään ApexChartseja.
*/
class BarChart extends Component {

    constructor(props) {            //kaavion asetukset
        super(props);
        this.state = {
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: []      //x-akselin data taulukkona
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        startingShape: 'flat',
                        endingShape: 'rounded',
                        columnWidth: '30%',
                        barHeight: '50%',
                        distributed: false,
                        rangeBarOverlap: true,
                        rangeBarGroupRows: false,
                        colors: {
                            ranges: [{
                                from: 0,
                                to: 0,
                                color: undefined
                            }],
                            backgroundBarColors: [],
                            backgroundBarOpacity: 1,
                            backgroundBarRadius: 0,
                        },
                        dataLabels: {
                            position: 'center',
                            maxItems: 100,
                            hideOverflowingLabels: true,
                            orientation: "horizontal"
                        }
                    }
                },
                dataLabels: {
                    enabled: false
                },
                title: {
                    text: 'Tartunnat ikäryhmittäin',
                    align: 'left'
                }
            },
            series: [
                {
                    name: "Tartunnat",
                    data: []                //y-akselin data taulukkona
                }
            ]
        };
    }


    render () {
        return (
            <ReactApexChart className="bar-chart"
                options={this.state.options}
                series={this.state.series}
                type="bar"
                width="95%"
                height="600"
            />
        );
    }

    componentDidUpdate(prevProps, prevState) {                  //Koska data ei tule ensimmäiselle renderille, täytyy se asettaa propseista componentDidUpdatella.
        if (this.props.ageGroups !== prevProps.ageGroups) {
            this.setState({
                options: {
                    ...prevState.options,
                  xaxis: {     
                    categories: this.props.ageGroups 
                  }
                },
                series: prevState.series.map(
                    el => (el.name === "Tartunnat" ? Object.assign(el, {data: Object.values(this.props.infections)}) : el)
                )
            });
        }
    }
}


export default BarChart;