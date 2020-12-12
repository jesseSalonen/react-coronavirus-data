import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import BarChart from './barChart';

let source;

class Interesting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            infections: [],
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
        let index = [];
        let label = [];
        let values = [];
        let temp = [];
        axios.get('/fact_epirapo_covid19case.json?column=ttr10yage-444309', {
            cancelToken: source.token
        }).then(res => {
            index = res.data.dataset.dimension.ttr10yage.category.index;
            label = res.data.dataset.dimension.ttr10yage.category.label;
            values = res.data.dataset.value;
            delete values["9"];
            for (let j = 0; j <= 8; j++) {
                for (let i = 443690; i <= 444440; i++) {
                    if (index[i] === j) { 
                        temp.push(label[i]);
                    }
                }
            }
            this.setState({
                infections: values,
                ageGroups: temp
            });
            console.log(this.state.ageGroups);
            console.log(this.state.infections);
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


export default Interesting;