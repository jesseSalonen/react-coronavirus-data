var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import './App.css';
import ReactApexChart from "react-apexcharts";

var LineChart = function (_Component) {
    _inherits(LineChart, _Component);

    function LineChart(props) {
        _classCallCheck(this, LineChart);

        var _this = _possibleConstructorReturn(this, (LineChart.__proto__ || Object.getPrototypeOf(LineChart)).call(this, props));

        _this.state = {
            options: {
                chart: {
                    height: 600,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
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
                }
            },
            series: [{
                name: "Tartunnat",
                data: []
            }]
        };
        return _this;
    }

    _createClass(LineChart, [{
        key: 'render',
        value: function render() {
            return React.createElement(ReactApexChart, { className: 'line-chart',
                options: this.state.options,
                series: this.state.series,
                type: 'line',
                width: '95%',
                height: 500
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var _this2 = this;

            if (this.props.dates !== prevProps.dates) {
                this.setState({
                    options: Object.assign({}, prevState.options, {
                        xaxis: {
                            categories: this.props.dates
                        }
                    }),
                    series: prevState.series.map(function (el) {
                        return el.name === "Tartunnat" ? Object.assign(el, { data: Object.values(_this2.props.infections) }) : el;
                    })
                });
            }
            if (this.props.startDate !== prevProps.startDate || this.props.endDate !== prevProps.endDate) {
                var i = void 0,
                    j = void 0,
                    y = void 0;
                var newDates = [].concat(_toConsumableArray(this.props.dates));
                var newInfections = JSON.parse(JSON.stringify(this.props.infections));

                for (i = 0; i < newDates.length; i++) {
                    if (this.props.startDate.setHours(0, 0, 0, 0) === new Date(newDates[i]).setHours(0, 0, 0, 0)) {
                        break;
                    }
                }
                for (y = newDates.length - 1; y >= 0; y--) {
                    if (this.props.endDate.setHours(0, 0, 0, 0) === new Date(newDates[y]).setHours(0, 0, 0, 0)) {
                        break;
                    }
                }
                for (var z = 0; z < i; z++) {
                    newDates.shift();
                }
                j = y - i;
                for (var _z = 0; _z < newDates.length - 1 - j; _z++) {
                    newDates.pop();
                }
                i += 27;
                y += 27;
                for (var _z2 = 27; _z2 < i; _z2++) {
                    delete newInfections[_z2.toString()];
                }

                var objectSize = Object.keys(newInfections).length - 1;
                for (var _z3 = i + objectSize; _z3 > y; _z3--) {
                    console.log("hejooo");
                    delete newInfections[_z3.toString()];
                }
                this.setState({
                    options: Object.assign({}, prevState.options, {
                        xaxis: {
                            categories: newDates
                        }
                    }),
                    series: prevState.series.map(function (el) {
                        return el.name === "Tartunnat" ? Object.assign(el, { data: Object.values(newInfections) }) : el;
                    })
                });
            }
        }
    }]);

    return LineChart;
}(Component);

export default LineChart;