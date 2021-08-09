import React from 'react';
import ReactDOM from 'react-dom';

export default class LocalePortal extends React.Component {
    render() {
        return ReactDOM.createPortal(this.props.children, document.getElementById('localePortal'));
    }
}