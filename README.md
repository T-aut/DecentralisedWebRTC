# Decentralised real time communication on the web prototype

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Node.js version 16 or greater is required.

## Running the project

To run the project for the first time, the following command is required (this command will install the required dependencies):

`npm install`

To run the project (once the dependencies are installed):

`npm start`

## Usage

This prototype demonstrates the ability to connect two browser clients via WebRTC without the need of a signaling server.

This prototype requires two browser instances (tabs). The prototype also assumes two roles - `communication initiator` and `receiving peer`

The initiator flow:
- Press the "Start chatting" button.
- Copy the given offer string and send it to the receiving peer via a 3rd party.
- Paste the answer string from the peer.
- Press the "Continue" button

The receiving peer's flow:
- Press the "Accept an invite" button.
- Paste in the initiator's offer into the textbox.
- Copy the created answer string and send it to the initiator via a 3rd party.
- Once the initiator accepts this answer, the communication will begin

Once a communication channel between the clients has been established, both clients are navigated to the Chat Screen.

![image](https://user-images.githubusercontent.com/38637817/170833766-df3b05b2-8851-4aa4-a5d9-902b75ae54d7.png)

## Recommended browser

This prototype was mainly tested using Firefox. The SDP object creation for `RTCPeerConnection` objects tend to take longer on Google Chrome (based on performed tests).

## Known issues

As of right now, these issues are present:

- Video/audio calling seems to rarely work on over-the-internet connections (this functionality, during testing, worked a 100% of the time on local machine calls).
- Chat bubble colors sometimes revert to default (first time I've had this issue with tailwind.css).
