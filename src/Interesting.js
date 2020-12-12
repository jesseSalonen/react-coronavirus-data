import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import BarChart from './barChart';

let source;
/*
    Pylväsdiagrammin datan hakua varten toteutettu komponentti.
    Mounttauksen jälkeen hakee datan THL:n avoimen datan API:sta,
    ja muuntaa sen diagrammia varten sopivaksi.
    Data jaetaan lapsikomponentille "barChart.js" propseina.
*/
class Interesting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infections: [],         //data tulee kahteen taulukkoon, x-akselille ikäryhmät, y-akselille tartunnat
            ageGroups: []
        };
        source = axios.CancelToken.source();
    }


    render () {
        return (
            <div>
              <BarChart infections={this.state.infections} ageGroups={this.state.ageGroups}/>
            </div>
        );
    }

    componentDidMount() {
        let index = [];         //sijoitetaan "raaka" data muuttujiin, joita muokataan diagrammiin sopivaksi.
        let label = [];
        let values = [];
        let temp = [];
        axios.get('/fact_epirapo_covid19case.json?column=ttr10yage-444309', {       //haetaan data axiosin avulla, ja käsitellään virheelliset haut componentDidUnmount-metodissa.
            cancelToken: source.token
        }).then(res => {
            index = res.data.dataset.dimension.ttr10yage.category.index;
            label = res.data.dataset.dimension.ttr10yage.category.label;
            values = res.data.dataset.value;
            delete values["9"];             //poistetaan kaikkien ikäryhmien tartuntamäärä objektista.
            for (let j = 0; j <= 8; j++) {
                for (let i = 443690; i <= 444440; i++) {        //uudelleenjärjestetään otsikkotaulukon arvot päivämäärien perusteella.
                    if (index[i] === j) { 
                        temp.push(label[i]);
                    }
                }
            }
            this.setState({
                infections: values,
                ageGroups: temp
            });
            console.log(this.state.ageGroups);          //data on nähtävissä konsolissa
            console.log(this.state.infections);
        }).catch(err => {
            console.log("Catched error: " + err.message);
        });
    }

    componentWillUnmount() {
        if (source) {
            source.cancel("Component got unmounted");           //tällä vältetään muistin täyttyminen jos sivua vaihdetaan kesken kyselyn
        }
    }

}


export default Interesting;