import React, { Fragment, useState, useEffect } from 'react';
import ChatScreen from './Screens/ChatScreen';
import strings from './resources/constants/strings';
import HomeScreen from './Screens/HomeScreen';
import CreateOfferScreen from './Screens/CreateOfferScreen';
import adapter from 'webrtc-adapter';
import WaitingScreen from './Screens/WaitingScreen';
import AcceptInitiatorOfferScreen from './Screens/AcceptInitiatorOfferScreen';
import AcceptTargetOfferScreen from './Screens/AcceptTargetOfferScreen';

function App() {
  const [navigationScreen, setNavigationScreen] = useState('HomeScreen');

  // WebRTC data channel
  const [channel, setChannel] = useState();
  const [init, setInit] = useState(false);
  const [initiatorOffer, setInitiatorOffer] = useState('');
  const [targetOffer, setTargetOffer] = useState('');

  // WebRTC connection
  const [connection, setConnection] = useState(
    new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    })
  );

  if (!init) {
    const _connection = connection;
    _connection.ondatachannel = (event) => {
      console.log('ondatachannel');
      const _channel = event.channel;
      //channel.onopen = (event) => console.log('onopen', event);
      //channel.onmessage = (event) => console.log('onmessage', event);
      //_channel.onmessage = (event) => alert(event.data);

      setChannel(_channel);
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

    setConnection(_connection);
    setInit(true);
  }

  const onNavigateHandler = (destination) => {
    setNavigationScreen(destination);
  };

  const onCreateOffer = async () => {
    let _channel = connection.createDataChannel('data');
    const _connection = connection;

    //_channel.onmessage = (event) => alert(event.data);

    _connection.onicecandidate = (event) => {
      // console.log('onicecandidate', event)
      if (!event.candidate) {
        setInitiatorOffer(JSON.stringify(_connection.localDescription));
      }
    };

    const offer = await _connection.createOffer();
    await _connection.setLocalDescription(offer);

    setChannel(_channel);
    setConnection(_connection);
  };

  const onAcceptOffer = async (offerSDP) => {
    let _connection = connection;
    let _channel = channel;

    const offer = JSON.parse(offerSDP);
    await _connection.setRemoteDescription(offer);

    _connection.onicecandidate = (event) => {
      if (!event.candidate) {
        setTargetOffer(JSON.stringify(_connection.localDescription));
      }
    };

    const answer = await _connection.createAnswer();
    await _connection.setLocalDescription(answer);

    setChannel(_channel);
    setConnection(_connection);
  };

  const onAcceptTargetOffer = async (targetOfferSDP) => {
    const _connection = connection;
    const answer = JSON.parse(targetOfferSDP);
    await connection.setRemoteDescription(answer);
    setConnection(_connection);
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
        <ChatScreen channel={channel} />
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
    </div>
  );
}

export default App;
