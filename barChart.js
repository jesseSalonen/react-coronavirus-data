var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import './App.css';
import ReactApexChart from "react-apexcharts";

var BarChart = function (_Component) {
    _inherits(BarChart, _Component);

    function BarChart(props) {
        _classCallCheck(this, BarChart);

        var _this = _possibleConstructorReturn(this, (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).call(this, props));

        _this.state = {
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: []
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
                            backgroundBarRadius: 0
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
            series: [{
                name: "Tartunnat",
                data: []
            }]
        };
        return _this;
    }

    _createClass(BarChart, [{
        key: 'render',
        value: function render() {
            return React.createElement(ReactApexChart, { className: 'bar-chart',
                options: this.state.options,
                series: this.state.series,
                type: 'bar',
                width: '95%',
                height: '600'
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var _this2 = this;

            if (this.props.ageGroups !== prevProps.ageGroups) {
                this.setState({
                    options: Object.assign({}, prevState.options, {
                        xaxis: {
                            categories: this.props.ageGroups
                        }
                    }),
                    series: prevState.series.map(function (el) {
                        return el.name === "Tartunnat" ? Object.assign(el, { data: Object.values(_this2.props.infections) }) : el;
                    })
                });
            }
        }
    }]);

    return BarChart;
}(Component);

export default BarChart;