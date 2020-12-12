var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import LineChart from './LineChart';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

var source = void 0;
/*
    Viivakaavion datan hakua varten toteutettu komponentti.
    Mounttauksen jälkeen hakee datan THL:n avoimen datan API:sta,
    ja muuntaa sen kaaviota varten sopivaksi.
    Luo myös päivämäärävalikot alku- ja loppupäivämäärille.
    Data jaetaan lapsikomponentille "lineChart.js" propseina.
    Päivämäärävalikot saavat tietonsa myös stateista.
*/

var Data = function (_Component) {
    _inherits(Data, _Component);

    function Data(props) {
        _classCallCheck(this, Data);

        var _this = _possibleConstructorReturn(this, (Data.__proto__ || Object.getPrototypeOf(Data)).call(this, props));

        _this.daysFromStart = function () {
            var date1 = new Date("Jan 2, 2020, 12:00:00"); //tämä täytyy tehdä, koska THL:n arvojen alkamisajankohdat ovat hieman sattumanvaraiset
            var date2 = new Date();

            var total_seconds = Math.abs(date2 - date1) / 1000;

            var days_difference = Math.floor(total_seconds / (60 * 60 * 24));

            return days_difference;
        };

        _this.state = {
            infections: [], //data tulee kahteen taulukkoon, x-akselille päivämäärät, y-akselille tartunnat
            dates: [],
            startDate: new Date(2020, 0, 28),
            endDate: new Date(new Date().setDate(new Date().getDate() - 1)) //Koska THL tuo datansa pienellä viiveellä, on loppupäivä hieman nykypäivää jäljessä
        };
        source = axios.CancelToken.source();
        return _this;
    }

    _createClass(Data, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(LineChart, {
                    infections: this.state.infections,
                    dates: this.state.dates,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate }),
                React.createElement(
                    'div',
                    { className: 'dateButton1' },
                    React.createElement(DatePicker, {
                        selected: this.state.startDate,
                        onChange: function onChange(date) {
                            return _this2.setState({ startDate: date });
                        },
                        selectsStart: true,
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                        minDate: new Date(2020, 0, 28),
                        maxDate: this.state.endDate,
                        dateFormat: 'yyyy/MM/dd' })
                ),
                React.createElement(
                    'div',
                    { className: 'dateButton2' },
                    React.createElement(DatePicker, {
                        selected: this.state.endDate,
                        onChange: function onChange(date) {
                            return _this2.setState({ endDate: date });
                        },
                        selectsEnd: true,
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                        minDate: this.state.startDate,
                        maxDate: new Date(new Date().setDate(new Date().getDate() - 1)),
                        dateFormat: 'yyyy/MM/dd' })
                )
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            var index = []; //sijoitetaan "raaka" data muuttujiin, joita muokataan diagrammiin sopivaksi.
            var label = [];
            var values = [];
            var temp = [];
            var elapsed_days = this.daysFromStart(); //haetaan kuluneiden päivämäärien arvo, jotta datasta saadaan oikea loppupäivämäärä kaaviolle.
            axios.get('/fact_epirapo_covid19case.json?column=dateweek2020010120201231-443702L', { //haetaan data axiosin avulla, ja käsitellään virheelliset haut componentDidUnmount-metodissa.
                cancelToken: source.token
            }).then(function (res) {
                index = res.data.dataset.dimension.dateweek2020010120201231.category.index;
                label = res.data.dataset.dimension.dateweek2020010120201231.category.label;
                values = res.data.dataset.value;
                delete values[(Object.keys(values).length + 26).toString()]; //Koska THL tuo datansa pienellä viiveellä, poistetaan viimeisimmät tiedot datasta.
                for (var j = 27; j <= elapsed_days; j++) {
                    for (var i = 443640; i <= 444640; i++) {
                        //uudelleenjärjestetään otsikkotaulukon arvot päivämäärien perusteella.
                        if (index[i] === j) {
                            temp.push(label[i]);
                        }
                    }
                }
                _this3.setState({
                    infections: values,
                    dates: temp
                });
                console.log(_this3.state.infections); //data on nähtävissä konsolissa
                console.log(_this3.state.dates);
            }).catch(function (err) {
                console.log("Catched error: " + err.message);
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (source) {
                source.cancel("Component got unmounted");
            }
        }
    }]);

    return Data;
}(Component);

export default Data;