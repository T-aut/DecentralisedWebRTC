# Decentralised real time communication on the web prototype

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Node.js version 16 or greater is required.

## Running the project

To run the project for the first time, the following command is required (this command will install the required dependencies):

`npm install`

To run the project (once the dependencies are installed):

`npm start`

## Recommended browser

This prototype was mainly tested using Firefox. The SDP object creation for `RTCPeerConnection` objects tend to take longer on Google Chrome (based on performed tests).

## Known issues

As of right now, these issues are present:

- Video/audio calling seems to rarely work on over-the-internet connections (this functionality, during testing, worked a 100% of the time on local machine calls).
- Chat bubble colors sometimes revert to default (first time I've had this issue with tailwind.css)
