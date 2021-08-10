/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';

export default class Portal extends React.Component {
    render() {
        return ReactDOM.createPortal(this.props.children, document.getElementById('portal'));
    }
}