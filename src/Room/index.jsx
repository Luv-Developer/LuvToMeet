import React from "react"
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
import { useParams } from "react-router-dom"

const Meeting = () => {
const {roomcode} = useParams() // destructuring the room code 
let myMeeting = async(element) => {
    const appID = 601915216
    const serverSecret = "5f62623886b48af6da67740e10f98cd4";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomcode,
        Date.now().toString(),
        "Luv"
    )
    const zp = ZegoUIKitPrebuilt.create(kitToken)
    zp.joinRoom({
        container:element,
         scenario: {
         mode: ZegoUIKitPrebuilt.VideoConference,
        }
    })
}
    return(
        <>
          <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
        </>
    )
}
export default Meeting