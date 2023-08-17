import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import React, { Component } from "react";
// import "./App.css";
import Button from "../Common/Button";
import M_UserVideoComponent from "./M_UserVideoComponent";
import styles from './MVidu.module.css'
import "./OpenViduComponent.css";

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "https://yumyumfriends.site/";

class M_OpenViduComponent extends Component {
  constructor(props) {
    super(props);

    console.log("----");
    console.log(props);
    console.log("----");
    const UserID = localStorage.getItem("id");
    const UserName = localStorage.getItem("nickname").replace(/['"]+/g, "");

    const SessionID = this.props.sessionID;

    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      mySessionId: SessionID,
      myUserName: UserName,
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      subStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.handleSubVideoStream = this.handleSubVideoStream.bind(this);
  }

  componentDidMount() {
    // 입장
    // this.joinSession();
    window.addEventListener("beforeunload", this.onbeforeunload);
    // this.joinSession();
  }

  componentWillUnmount() {
    this.leaveSession();
    window.removeEventListener("beforeunload", this.onbeforeunload);
    console.log("componentWillUnmount");
  }

  onbeforeunload(event) {
    this.leaveSession();
    console.log("onbeforeunload");
  }

  handleSubVideoStream(stream) {
    if (this.state.subStreamManager !== stream) {
      this.setState({
        subStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  sendMessage = (Session, msgdata, msgtype) => {
    if (Session != null) {
      Session.signal({
        data: msgdata, // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: msgtype, // The type of message (optional)
      })
        .then(() => {
          console.log("Message successfully sent");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("No session");
    }
  };

  ///

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;
        this.props.onObjectCreated(mySession);
        console.log("--------------체크");
        console.log(mySession);

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own

          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);
          this.handleSubVideoStream(subscriber);
          this.sendMessage(mySession, this.props.myYum, "friendYum");
          console.log("friendyum message send");

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
          // 호스트는 퇴장하지 않음
          // 게스트 측에서 인원 초과 시 자동 퇴장
          if (
            subscribers.length > 1 &&
            this.props.hostInfo !== this.state.myUserName
          ) {
            console.log("-------------------disconnect---------------");
            this.leaveSession();
            // 퇴장 처리
          }
          console.log(subscribers);
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        mySession.on("signal:observer", (event) => {
          console.log(event.data); // Message
          // 관전자 입장 / 퇴장 메시지 수신
          // 프론트에서 수신 받은 메시지를 화면에 출력
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        this.getToken().then((token) => {
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "1280x720", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: true, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);
              this.sendMessage(mySession, this.props.myYum, "friendYum");
              console.log(mySession);

              console.log(publisher);

              // Obtain the current video device in use
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );
              var currentVideoDeviceId = publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId;
              var currentVideoDevice = videoDevices.find(
                (device) => device.deviceId === currentVideoDeviceId
              );

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;
    const UserID = localStorage.getItem("id");
    const UserName = localStorage.getItem("nickname").replace(/['"]+/g, "");

    const SessionID = this.props.sessionID;

    if (mySession) {
      this.leaveSessionUpdate();
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: SessionID,
      myUserName: UserName,
      mainStreamManager: undefined,
      subStreamManager: undefined,
      publisher: undefined,
    });
  }

  leaveSessionUpdate() {
    const URL = "https://yumyumfriends.site";
    axios
      .delete(`${URL}/api/v1/session/exit?session_id=${this.state.mySessionId}`)
      .then((response) => {
        console.log(response);
        console.log("퇴장 처리 완료");
      })
      .catch((error) => console.log(error));
  }

  render() {
    // M_OvVideo Publisher와 Subscriber 나눌 bit 변수 지정
    const Pub = 0;
    const Subs = 1;

    return (
      <div className="container">
        {this.state.session === undefined ? (
          <div id="join">
            <div id="join-dialog" className="jumbotron vertical-center">
              {/* <form className="form-group" onSubmit={this.joinSession}>
                <p className="text-center">
                  <input
                    className="btn btn-lg btn-success"
                    name="commit"
                    type="submit"
                    value="친구랑 냠냠!"
                  />
                </p>
              </form> */}
              <Button onClick={this.joinSession} className={styles['with']}>친구랑 냠냠!</Button>
            </div>
          </div>
        ) : (
          <div
            id="session"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              width: "100vw",
            }}
          >
            {/* 내 화면 */}
            <div id="main-video" style={{ height: "30%", minHeight: "0" }}>
              <M_UserVideoComponent
                streamManager={this.state.mainStreamManager}
                bit={Pub}
              />
            </div>

            {/* 공백 */}
            <div
              className="MultiBack"
              style={{ height: "40%", minHeight: "0" }}
            ></div>
            {/* 친구 화면 */}
            <div
              className="stream-container"
              style={{ height: "30%", minHeight: "0" }}
            >
              {this.state.subStreamManager === undefined ? (
                <div>대기중</div>
              ) : (
                <M_UserVideoComponent
                  streamManager={this.state.subStreamManager}
                  bit={Subs}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  }
}

export default M_OpenViduComponent;
