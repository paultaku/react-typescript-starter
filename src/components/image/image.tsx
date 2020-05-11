import React, { Component } from 'react';

interface Props {
    img: string;
}

export default class Image extends Component<Props> {
    render() {
        return <img src={this.props.img} />
    }
}