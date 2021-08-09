/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';

export default class CurrencyPortal extends React.Component {
    render() {
        return ReactDOM.createPortal(this.props.children, document.getElementById('currencyPortal'));
    }
}