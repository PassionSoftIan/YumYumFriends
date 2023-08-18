import React, { Component } from "react";
import O_OvVideo from "./O_OvVideo";
import "./UserVideo.css";

export default class O_UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <div className="streamcomponent">
            <O_OvVideo
              streamManager={this.props.streamManager}
              yumyum={this.props.yumyum}
            />
            <div>
              <p>{this.getNicknameTag()}</p>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
