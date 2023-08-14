import React, { Component } from "react";
import M_OvVideo from "./M_OvVideo";
import M_Friend_OvVideo from "./M_Friend_OvVideo";
import "./UserVideo.css";

export default class M_UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    return (
      <React.Fragment>
        {this.props.streamManager !== undefined ? (
          <div className="streamcomponent" style={{width: "100%", height: "100%"}}>
            {this.props.bit === 0 ? (
              <M_OvVideo
                streamManager={this.props.streamManager}
              />
            ) : (
              <M_Friend_OvVideo
                streamManager={this.props.streamManager}
              />
            )}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
