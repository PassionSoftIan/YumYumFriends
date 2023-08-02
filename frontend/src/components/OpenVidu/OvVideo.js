import React, { Component } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";

// 가면 이미지를 불러옵니다.
import maskImage from "../../assets/Sticker/eggboy-hat.png";

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  async componentDidMount() {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
      this.model = await facemesh.load();
      this.mask = await this.loadMask();
      this.detectFace();
    }
  }

  loadMask = async () => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = maskImage;
      img.onload = () => resolve(img);
    });
  };

  drawMask = (predictions) => {
    const canvas = this.canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = this.videoRef.current.videoWidth;
    canvas.height = this.videoRef.current.videoHeight;
    context.drawImage(this.videoRef.current, 0, 0, canvas.width, canvas.height);

    predictions.forEach((prediction) => {
      const topLeft = prediction.boundingBox.topLeft;
      const bottomRight = prediction.boundingBox.bottomRight;
      const width = bottomRight[0] - topLeft[0];
      const height = bottomRight[1] - topLeft[1];
      context.drawImage(this.mask, topLeft[0], topLeft[1], width, height);
    });
  };

  detectFace = async () => {
    if (!this.model || !this.mask || !this.videoRef.current) {
      requestAnimationFrame(this.detectFace);
      return;
    }

    const predictions = await this.model.estimateFaces(this.videoRef.current);
    this.drawMask(predictions);
    requestAnimationFrame(this.detectFace);
  };

  render() {
    return (
      <div>
        <video
          autoPlay={true}
          ref={this.videoRef}
          style={{
            width: "100%",
            height: "100%",
            // objectFit: "cover",
          }}
        />
        <canvas ref={this.canvasRef} />
      </div>
    );
  }
}
