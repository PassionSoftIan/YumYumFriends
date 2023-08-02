import React, { Component } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import maskImage from "../../assets/Hats/tofu-hat-02.png";
import GameStage from "./GameStage";


export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  async componentDidMount() {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
      this.model = await facemesh.load({ maxFaces: 4, minConfidence: 0.75 });
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
    // 캔버스를 좌우 반전합니다.
    context.translate(canvas.width, 0);
    context.scale(-1, 1);

    context.drawImage(this.videoRef.current, 0, 0, canvas.width, canvas.height);

    predictions.forEach((prediction) => {
      const landmarks = prediction.scaledMesh;

      // 두 눈썹 중앙 점과 코 점을 가져옵니다.
      const leftEyebrowMidpoint = landmarks[107];
      const rightEyebrowMidpoint = landmarks[336];
      const noseTip = landmarks[1];

      const offsetX = (leftEyebrowMidpoint[0] + rightEyebrowMidpoint[0]) / 2;
      const offsetY = (leftEyebrowMidpoint[1] + rightEyebrowMidpoint[1]) / 2;

      // 모자 크기 조정을 위한 값을 계산합니다.
      const scaleFactor = 2.5;
      const faceWidth = Math.hypot(noseTip[0] - offsetX, noseTip[1] - offsetY);
      const maskWidth = faceWidth * scaleFactor;
      const maskHeight = (this.mask.height * maskWidth) / this.mask.width;

      context.drawImage(
        this.mask,
        offsetX - maskWidth / 2,
        offsetY - maskHeight * 0.8 - 40,
        maskWidth,
        maskHeight
      );
    });
  };

  detectFace = async () => {
    if (!this.model || !this.mask || !this.videoRef.current) {
      requestAnimationFrame(this.detectFace);
      return;
    }

    const predictions = await this.model.estimateFaces(this.videoRef.current);
    console.log(predictions[0]);
    this.drawMask(predictions);
    requestAnimationFrame(this.detectFace);
  };


  render() {
    return (
      <div style={{ position: "relative" }}>
        <video
          autoPlay={true}
          ref={this.videoRef}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <canvas
          ref={this.canvasRef}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "transparent",
          }}
        >
          <GameStage />
        </div>
      </div>
    );
  }
}
