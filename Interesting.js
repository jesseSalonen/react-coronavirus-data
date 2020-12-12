var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import BarChart from './barChart';

var source = void 0;
/*
    Pylväsdiagrammin datan hakua varten toteutettu komponentti.
    Mounttauksen jälkeen hakee datan THL:n avoimen datan API:sta,
    ja muuntaa sen diagrammia varten sopivaksi.
    Data jaetaan lapsikomponentille "barChart.js" propseina.
*/

var Interesting = function (_Component) {
    _inherits(Interesting, _Component);

    function Interesting(props) {
        _classCallCheck(this, Interesting);

        var _this = _possibleConstructorReturn(this, (Interesting.__proto__ || Object.getPrototypeOf(Interesting)).call(this, props));

        _this.state = {
            infections: [], //data tulee kahteen taulukkoon, x-akselille ikäryhmät, y-akselille tartunnat
            ageGroups: []
        };
        source = axios.CancelToken.source();
        return _this;
    }

    _createClass(Interesting, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(BarChart, { infections: this.state.infections, ageGroups: this.state.ageGroups })
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var index = []; //sijoitetaan "raaka" data muuttujiin, joita muokataan diagrammiin sopivaksi.
            var label = [];
            var values = [];
            var temp = [];
            axios.get('/fact_epirapo_covid19case.json?column=ttr10yage-444309', { //haetaan data axiosin avulla, ja käsitellään virheelliset haut componentDidUnmount-metodissa.
                cancelToken: source.token
            }).then(function (res) {
                index = res.data.dataset.dimension.ttr10yage.category.index;
                label = res.data.dataset.dimension.ttr10yage.category.label;
                values = res.data.dataset.value;
                delete values["9"]; //poistetaan kaikkien ikäryhmien tartuntamäärä objektista.
                for (var j = 0; j <= 8; j++) {
                    for (var i = 443690; i <= 444440; i++) {
                        //uudelleenjärjestetään otsikkotaulukon arvot päivämäärien perusteella.
                        if (index[i] === j) {
                            temp.push(label[i]);
                        }
                    }
                }
                _this2.setState({
                    infections: values,
                    ageGroups: temp
                });
                console.log(_this2.state.ageGroups); //data on nähtävissä konsolissa
                console.log(_this2.state.infections);
            }).catch(function (err) {
                console.log("Catched error: " + err.message);
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (source) {
                source.cancel("Component got unmounted"); //tällä vältetään muistin täyttyminen jos sivua vaihdetaan kesken kyselyn
            }
        }
    }]);

    return Interesting;
}(Component);

export default Interesting;