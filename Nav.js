var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

/*
    Luodaan yläpaneelin navigointivalikko, ja Routerin avulla ohjataan ne oikeisiin endpointeihin.
*/

var Nav = function (_Component) {
    _inherits(Nav, _Component);

    function Nav(props) {
        _classCallCheck(this, Nav);

        var _this = _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));

        _this.state = {
            fontColor: "white"
        };
        return _this;
    }

    _createClass(Nav, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'nav',
                null,
                React.createElement(
                    'h3',
                    null,
                    'KoronaData'
                ),
                React.createElement(
                    'ul',
                    { className: 'nav-links' },
                    React.createElement(
                        Link,
                        { style: { 'color': this.state.fontColor }, to: '/' },
                        React.createElement(
                            'li',
                            null,
                            'Etusivu'
                        )
                    ),
                    React.createElement(
                        Link,
                        { style: { 'color': this.state.fontColor }, to: '/p\xE4\xE4data' },
                        React.createElement(
                            'li',
                            null,
                            'P\xE4\xE4data'
                        )
                    ),
                    React.createElement(
                        Link,
                        { style: { 'color': this.state.fontColor }, to: '/mielenkiintoinen' },
                        React.createElement(
                            'li',
                            null,
                            'Mielenkiintoinen data'
                        )
                    )
                )
            );
        }
    }]);

    return Nav;
}(Component);

export default Nav;