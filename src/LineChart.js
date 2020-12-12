import React, { Component } from 'react';
import './App.css';
import ReactApexChart from "react-apexcharts";

/*
    Viivakaavion luominen propsien avulla.
    Käytetään ApexChartseja.
*/
class LineChart extends Component {

    constructor(props) {            //kaavion asetukset
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
                    categories: []          //x-akselin data taulukkona
                },
            },
            series: [
                {
                    name: "Tartunnat",
                    data: []            //y-akselin data taulukkona
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
        if (this.props.dates !== prevProps.dates) {             //Koska data ei tule ensimmäiselle renderille, täytyy se asettaa propseista componentDidUpdatella.
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
        if (this.props.startDate !== prevProps.startDate || this.props.endDate !== prevProps.endDate) {         //datan päivittäminen kun ajankohtia muutellaan valikoista.
            let i, j, y;
            let newDates = [...this.props.dates];
            let newInfections = JSON.parse(JSON.stringify(this.props.infections));          //luodaan kopiot propseista
            
            
            for (i = 0; i < newDates.length; i++) {
                if (this.props.startDate.setHours(0,0,0,0) === new Date(newDates[i]).setHours(0,0,0,0)) {           //haetaan startDatea vastaava indkesi taulukosta
                    break;
                }
            }
            for (y = newDates.length - 1; y >= 0; y--) {
                if (this.props.endDate.setHours(0,0,0,0) === new Date(newDates[y]).setHours(0,0,0,0)) {             //haetaan endDatea vastaava indeksi taulukosta
                    break;
                }
            }
            for (let z = 0; z < i; z++) {               //poistetaan päivämäärätaulukosta alku- ja loppupään ylimääräiset päivät jotka jäävät ulkopuolelle
                newDates.shift();
            }
            j = y - i;
            for (let z = 0; z < newDates.length - 1 - j; z++) {
                newDates.pop();
            }
            i += 27;
            y += 27;
            for (let z = 27; z < i; z++) {              //sama tartuntamääriin
                delete newInfections[z.toString()];
            }
            
            const objectSize = Object.keys(newInfections).length - 1;
            for (let z = i + objectSize; z > y; z--) {
                console.log("hejooo");
                delete newInfections[z.toString()];
            }
            this.setState({             //asetetaan uudet taulukot kaavion käyttöön
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