import React, { Component } from 'react';
interface Props {
    text: string;
}
export default class Text extends Component<Props> {
    render() {
        return <p>{this.props.text}</p>
    }
}