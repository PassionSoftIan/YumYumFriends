import React, { Component } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import { drawMesh } from "./utilities";

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
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
    this.runFacemesh();
  }

  runFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8,
    });
    setInterval(() => {
      this.detect(net);
    }, 200);
  };

  detect = async (net) => {
    if (
      typeof this.videoRef.current !== "undefined" &&
      this.videoRef.current !== null &&
      this.videoRef.current.readyState === 4
    ) {
      // Get Video Properties
      const video = this.videoRef.current;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set video width
      video.width = videoWidth;
      video.height = videoHeight;

      // Set canvas width
      this.canvasRef.current.width = videoWidth;
      this.canvasRef.current.height = videoHeight;

      // Make Detections
      const face = await net.estimateFaces(video);
      console.log(face);

      // Get canvas context
      const ctx = this.canvasRef.current.getContext("2d");
      requestAnimationFrame(() => {
        drawMesh(face, ctx);
      });
    }
  };

  render() {
    return (
      <div style={{ position: "relative" }}>
        <video
          autoPlay={true}
          ref={this.videoRef}
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
          }}
        />
        <canvas
          ref={this.canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
          }}
        />
      </div>
    );
  }
}
