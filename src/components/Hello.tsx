import React, { Component } from "react";

interface IProps { compiler: string; framework: string; }

// export const Hello = (props: HelloProps) => <h1>Hello world! from {props.compiler} and {props.framework}!</h1>;
export default class Hello extends Component<IProps, {}> {
    render() {
      return (
        <h1>Hello world! from {this.props.compiler} and {this.props.framework}!</h1>
      )
    }
  }