import React, { Component } from 'react';

export default class OpenViduVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    componentDidMount() {
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    render() {
        return (
        <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          padding: "0",
          margin: "0",
        }}
        >
        <video
          autoPlay={true}
          ref={this.videoRef}
          style={{
            width: "inherit",
            height: "inherit",
            objectFit: "cover",
            // visibility: "hidden",
          }}
        />
        </div>
    )}

}
