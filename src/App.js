import React, { useState } from 'react';
import ChatScreen from './Screens/ChatScreen';
import strings from './resources/constants/strings';
import HomeScreen from './Screens/HomeScreen';
import CreateOfferScreen from './Screens/CreateOfferScreen';
import adapter from 'webrtc-adapter';
import WaitingScreen from './Screens/WaitingScreen';
import AcceptInitiatorOfferScreen from './Screens/AcceptInitiatorOfferScreen';
import AcceptTargetOfferScreen from './Screens/AcceptTargetOfferScreen';
import Modal from './Components/UI/Modal/Modal';
import ButtonPrimary from './Components/UI/ButtonPrimary';

function App() {
  const [navigationScreen, setNavigationScreen] = useState('HomeScreen');

  // WebRTC data channel
  const [channel, setChannel] = useState();
  const [init, setInit] = useState(false);
  const [initiatorOffer, setInitiatorOffer] = useState('');
  const [targetOffer, setTargetOffer] = useState('');
  const [isCalling, setIsCalling] = useState(false);

  // WebRTC connection (for data channel)
  const [connection, setConnection] = useState(new RTCPeerConnection());

  // WebRTC connection (for video call)
  const [videoConnection, setVideoConnection] = useState(
    new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    })
  );
  const [localStream, setLocalStream] = useState(new MediaStream());
  const [remoteStream, setRemoteStream] = useState(new MediaStream());

  const StartCall = async () => {
    setIsCalling(true);

    // here we create the new offer for video call
    if (!channel) {
      console.log('channel null');
      alert('Could not start call');
      return;
    }

    // init video connection
    // const _videoConnection = new RTCPeerConnection({
    //   iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    // });
    const _videoConnection = videoConnection;

    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localStream.getTracks().forEach((track) => {
      _videoConnection.addTrack(track, localStream);
      console.log('track added');
    });

    _videoConnection.oniceconnectionstatechange = (event) => {
      console.log(
        `on ice connection state change: ${_videoConnection.iceConnectionState}`
      );
    };

    _videoConnection.onconnectionstatechange = (event) => {
      console.log(
        `video connection state change: ${_videoConnection.connectionState}`
      );
    };

    const offer = await _videoConnection.createOffer();
    await _videoConnection.setLocalDescription(offer);

    const remoteStream = new MediaStream();

    // pulling tracks from remote stream
    _videoConnection.ontrack = (event) => {
      console.log('on track!');
      //setIsCalling(true);

      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    const remoteCamera = document.getElementById('remote_camera');
    remoteCamera.srcObject = remoteStream;

    const localCamera = document.getElementById('local_camera');
    localCamera.srcObject = localStream;
  };

  const initiateCall = async () => {
    videoConnection.onicecandidate = (event) => {
      let initiatorOffer = '';
      if (!event.candidate) {
        initiatorOffer = JSON.stringify(videoConnection.localDescription);
        channel.send(`/call ${initiatorOffer}`);
      }
    };
    await StartCall();
  };

  if (!init) {
    const _connection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    _connection.ondatachannel = (event) => {
      console.log('ondatachannel');
      setChannel(event.channel);
    };

    _connection.oniceconnectionstatechange = (event) => {
      console.log(
        `on ice connection state change: ${_connection.iceConnectionState}`
      );
    };

    _connection.onconnectionstatechange = (event) => {
      console.log(`connection state change: ${_connection.connectionState}`);
      if (_connection.connectionState === 'connected')
        onNavigateHandler(strings.screens.ChatScreen);
    };

    _connection.onnegotiationneeded = (e) => {
      console.log('negotiation needed');
    };

    setConnection(_connection);
    setInit(true);
  }

  const onNavigateHandler = (destination) => {
    setNavigationScreen(destination);
  };

  const onCreateOffer = async () => {
    let _channel = connection.createDataChannel('data');
    const _connection = connection;

    _connection.onicecandidate = (event) => {
      // console.log('onicecandidate', event)
      if (!event.candidate) {
        setInitiatorOffer(JSON.stringify(_connection.localDescription));
      }
    };

    const offer = await _connection.createOffer();
    await _connection.setLocalDescription(offer);

    setChannel(_channel);
  };

  const onAcceptOffer = async (offerSDP) => {
    let _connection = connection;

    const offer = JSON.parse(offerSDP);
    await _connection.setRemoteDescription(offer);

    _connection.onicecandidate = (event) => {
      if (!event.candidate) {
        setTargetOffer(JSON.stringify(_connection.localDescription));
      }
    };

    const answer = await _connection.createAnswer();
    await _connection.setLocalDescription(answer);
  };

  const onAcceptTargetOffer = async (targetOfferSDP) => {
    const answer = JSON.parse(targetOfferSDP);
    await connection.setRemoteDescription(answer);
  };

  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen'>
      {navigationScreen === strings.screens.HomeScreen && (
        <HomeScreen onNavigate={onNavigateHandler} />
      )}
      {navigationScreen === strings.screens.CreateOfferScreen && (
        <CreateOfferScreen
          onNavigate={onNavigateHandler}
          onCreateOffer={onCreateOffer}
          offer={initiatorOffer}
        />
      )}
      {navigationScreen === strings.screens.ChatScreen && (
        <ChatScreen
          channel={channel}
          initiateCall={initiateCall}
          startCall={StartCall}
          connection={videoConnection}
        />
      )}
      {navigationScreen === strings.screens.WaitingScreen && <WaitingScreen />}
      {navigationScreen === strings.screens.AcceptInitiatorOfferScreen && (
        <AcceptInitiatorOfferScreen
          onAcceptOffer={onAcceptOffer}
          targetOffer={targetOffer}
        />
      )}
      {navigationScreen === strings.screens.AcceptTargetOfferScreen && (
        <AcceptTargetOfferScreen onAcceptTargetOffer={onAcceptTargetOffer} />
      )}
      {isCalling && (
        <Modal>
          <div className='flex flex-1 flex-col items-center'>
            <div className='flex w-full justify-between mb-2'>
              <video
                id='local_camera'
                autoPlay={true}
                muted={true}
                className='bg-slate-400 w-2/4 mx-1 rounded-md'
              ></video>
              <video
                id='remote_camera'
                autoPlay={true}
                className='bg-slate-400 w-2/4 mx-1 rounded-md'
              ></video>
            </div>
            <ButtonPrimary>End call</ButtonPrimary>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
