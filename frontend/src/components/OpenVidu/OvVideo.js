import React, { Component } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";

import maskImage from "../../assets/Hats/tofu-hat-02.png";
export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.maskImg = new Image();
    this.maskImg.src = maskImage;
    this.maskImg.onload = () => {
      this.maskLoaded = true; // 이미지가 로드되면 maskLoaded를 true로 설정합니다.
    };
  }

  async componentDidMount() {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
      this.model = await facemesh.load();
      this.detectFace();
    }
  }

  drawGrid = (face) => {
    const video = this.videoRef.current;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    // 비디오와 동일한 크기로 캔버스 크기를 설정합니다
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  
    // 이전 그리드를 지웁니다
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // 수평 방향으로 좌우 대칭
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  
    // 특징점들을 연결하여 그리드를 그립니다
    ctx.strokeStyle = "rgba(255, 0, 0, 0)"; 
    ctx.beginPath();
    face.forEach((point, index) => {
      ctx.lineTo(point[0], point[1]);
      if (index % 10 === 0 && index !== 0) {
        ctx.stroke();
        ctx.beginPath();
      }
    });
    ctx.stroke();
  
    // 이미지를 그립니다
    const { minX, maxX, minY, maxY } = this.getMinMaxPoints(face);
    const faceWidth = maxX - minX;
    const faceHeight = maxY - minY;
    const scaleFactor = 1.5; // 크기를 조정할 비율을 설정합니다. 원하는 크기로 조정해보세요.
    const maskWidth = faceWidth * scaleFactor;
    const maskHeight = faceHeight * scaleFactor;
  
    // 이마 부분을 나타내는 중심점을 계산합니다
    const foreheadX = (minX + maxX) / 2;
    const foreheadY = minY;
  
    // 이마 부분에 맞춰서 이미지를 그립니다
    const dx = foreheadX - maskWidth / 2;
    const dy = foreheadY - maskHeight / 2; // 이미지 중심을 이마 중심에 맞춥니다.
  
    ctx.drawImage(this.maskImg, dx, dy, maskWidth, maskHeight);
  };

  getMinMaxPoints = (face) => {
    if (!face || face.length === 0) {
      // Return default values when no face is detected
      return {
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
      };
    }

    let minX = face[0][0];
    let maxX = face[0][0];
    let minY = face[0][1];
    let maxY = face[0][1];
    for (const point of face) {
      const x = point[0];
      const y = point[1];
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    return { minX, maxX, minY, maxY };
  };

  detectFace = async () => {
    const video = this.videoRef.current;
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      const predictions = await this.model.estimateFaces(video);
      if (predictions.length > 0 && this.maskLoaded) {
        // 이미지가 로드되었는지 확인합니다.
        this.drawGrid(predictions[0].scaledMesh);
      }
    }
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
      </div>
    );
  }
}
