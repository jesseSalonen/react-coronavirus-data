import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import LineChart from './LineChart';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

let source;
/*
    Viivakaavion datan hakua varten toteutettu komponentti.
    Mounttauksen jälkeen hakee datan THL:n avoimen datan API:sta,
    ja muuntaa sen kaaviota varten sopivaksi.
    Luo myös päivämäärävalikot alku- ja loppupäivämäärille.
    Data jaetaan lapsikomponentille "lineChart.js" propseina.
    Päivämäärävalikot saavat tietonsa myös stateista.
*/

class Data extends Component {
    constructor(props) {
      super(props);
      this.state = {
          infections: [],           //data tulee kahteen taulukkoon, x-akselille päivämäärät, y-akselille tartunnat
          dates: [],
          startDate: new Date(2020,0,1),
          endDate: new Date(new Date().setDate(new Date().getDate()-1))         //Koska THL tuo datansa pienellä viiveellä, on loppupäivä hieman nykypäivää jäljessä
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
                        minDate={new Date(2020,0,1)}
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
        let index = [];             //sijoitetaan "raaka" data muuttujiin, joita muokataan diagrammiin sopivaksi.
        let label = [];
        let values = [];
        let temp = [];
        axios.get('/fact_epirapo_covid19case.json?column=dateweek20200101-509030.&column=508804L#', {           //haetaan data axiosin avulla, ja käsitellään virheelliset haut componentDidUnmount-metodissa.
            cancelToken: source.token
        }).then(res => {
            index = res.data.dataset.dimension.dateweek202001011.category.index;
            label = res.data.dataset.dimension.dateweek202001011.category.label;
            values = res.data.dataset.value;
            delete values["731"];
            delete values[(Object.keys(values).length - 1).toString()];        //Koska THL tuo datansa pienellä viiveellä, poistetaan viimeisimmät tiedot datasta.
            for (let j = 0; j <= Object.keys(values).length - 1; j++) {
                for (let i = 508488; i <= 509328; i++) {                //uudelleenjärjestetään otsikkotaulukon arvot päivämäärien perusteella.
                    if (index[i] === j) { 
                        temp.push(label[i]);
                    }
                }
            }
            this.setState({
                infections: values,
                dates: temp
            });
            console.log(this.state.infections);             //data on nähtävissä konsolissa
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
}


export default Data;