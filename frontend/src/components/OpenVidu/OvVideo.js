import React, { Component } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
// 가면 이미지를 불러옵니다.
import maskImage1 from "../../assets/Hats/1_tofu_hat.png";
import maskImage2 from "../../assets/Hats/2_mandarin_hat.png";
import maskImage7 from "../../assets/Hats/7_egg_hat.png";
import maskImage10 from "../../assets/Hats/10_eggplant_hat.png";
import maskImage12 from "../../assets/Hats/12_avocado_hat.png";
import maskImage13 from "../../assets/Hats/13_apple_hat.png";

import { connect } from "react-redux";
import { setDetection } from "../../store/detectionSlice";
import GameStage from "./GameStage";
import axios from "axios";

class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.imageRef = React.createRef();
    this.prevEatValue = 0;
    this.state = {
      showWarning: false,
    };
  }

  checkFacePosition(predictions) {
    if (!this.canvasRef.current) {
      return false;
    }
    const canvas = this.canvasRef.current;
    const circleCenterX = canvas.width / 2;
    const circleCenterY = canvas.height * 0.33;
    const circleRadius = circleCenterX * 0.6; // 원의 크기 조정

    predictions.forEach((prediction) => {
      const landmarks = prediction.scaledMesh;
      const noseTip = landmarks[1];

      const distanceToCenter = Math.sqrt(
        Math.pow(noseTip[0] - circleCenterX, 2) +
          Math.pow(noseTip[1] - circleCenterY, 2)
      );

      if (distanceToCenter > circleRadius) {
        this.setState({ showWarning: true });
      } else {
        this.setState({ showWarning: false });
      }
    });
  }

  postCameraScreen = async () => {
    if (!this.imageRef.current) {
      return false;
    }
    const image = this.imageRef.current;
    image.width = this.videoRef.current.videoWidth;
    image.height = this.videoRef.current.videoHeight;
    const context = image.getContext("2d");

    context.drawImage(this.videoRef.current, 0, 0, image.width, image.height);

    const dataUrl = image.toDataURL("image/jpeg");
    const apiUrl = "http://218.154.242.73:51557/v1/object-detection/yolov5s";

    try {
      const formData = new FormData();
      const blob = await fetch(dataUrl).then((res) => res.blob());
      formData.append("image", blob, "capture.jpg");

      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("eat:", response.data.eat);

      if (response.data.eat !== this.prevEatValue) {
        this.prevEatValue = response.data.eat;

        if (this.detectionTimer) {
          clearTimeout(this.detectionTimer);
        }

        if (response.data.eat === 1) {
          this.props.setDetection(true);
          this.detectionTimer = setTimeout(() => {
            this.props.setDetection(false);
          }, 1000);
        }
        //  else {
        //   this.props.setDetection(false);
        // }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  async componentDidMount() {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }

    this.videoRef.current.addEventListener("loadeddata", async () => {
      this.model = await facemesh.load({ maxFaces: 4, minConfidence: 0.75 });
      this.mask = await this.loadMask();
      this.detectFace();
    });
    this.postCameraInterval = setInterval(this.postCameraScreen, 200);
  }

  componentWillUnmount() {
    clearInterval(this.postCameraInterval);
  }

  loadMask = async () => {
    return new Promise((resolve) => {
      const img = new Image();
      const id = localStorage.getItem("currentYum");
      let maskImage;

      switch (id) {
        case "1":
          maskImage = maskImage1;
          break;
        case "2":
          maskImage = maskImage2;
          break;
        case "7":
          maskImage = maskImage7;
          break;
        case "10":
          maskImage = maskImage10;
          break;
        case "12":
          maskImage = maskImage12;
          break;
        case "13":
          maskImage = maskImage13;
          break;
        default:
          console.error("Unexpected id value:", id);
          return;
      }

      img.src = maskImage;
      img.onload = () => resolve(img);
    });
  };

  drawMask = (predictions) => {
    if (!this.canvasRef.current) {
      return;
    }

    const canvas = this.canvasRef.current;
    const context = canvas.getContext("2d");

    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.33;
    const circleRadius = centerX * 0.6;

    canvas.width = this.videoRef.current.videoWidth;
    canvas.height = this.videoRef.current.videoHeight;
    // 캔버스를 좌우 반전합니다.
    context.translate(canvas.width, 0);
    context.scale(-1, 1);

    context.drawImage(this.videoRef.current, 0, 0, canvas.width, canvas.height);

    // 원을 그리고 원 밖부분을 어둡게 만듭니다.
    if (this.state.showWarning) {
      context.fillStyle = "rgba(0, 0, 0, 0.7)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      context.arc(centerX, centerY, circleRadius, 0, Math.PI * 2, true);
      context.fill();

      context.globalCompositeOperation = "source-over";
    }
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
    if (
      !this.model ||
      !this.mask ||
      !this.videoRef.current ||
      !this.canvasRef.current
    ) {
      requestAnimationFrame(this.detectFace);
      return;
    }

    // const predictions = await this.model.estimateFaces(this.videoRef.current);
    const frame = tf.browser.fromPixels(this.videoRef.current);
    const predictions = await this.model.estimateFaces(frame);
    frame.dispose();
    // console.log(predictions[0]);
    this.drawMask(predictions);
    this.checkFacePosition(predictions);
    requestAnimationFrame(this.detectFace);
  };

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
        <canvas
          ref={this.canvasRef}
          style={{
            width: "inherit",
            height: "inherit",
            position: "absolute",
            objectFit: "cover",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
        <canvas
          ref={this.imageRef}
          style={{
            width: "inherit",
            height: "inherit",
            position: "absolute",
            objectFit: "cover",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: "none",
          }}
        />
        {this.state.showWarning && ( // 추가된 부분
          <div
            style={{
              position: "absolute",
              top: "30px",
              left: "50%",
              transform: "translate(-50%, 0)",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            원 안에 얼굴을 넣으세요
          </div>
        )}
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

const mapDispatchToProps = {
  setDetection,
};

export default connect(null, mapDispatchToProps)(OpenViduVideoComponent);
