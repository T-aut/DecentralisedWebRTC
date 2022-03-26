// const ipfs = await IPFS.create({
//   repo: 'decentralisedWebRTC' + Math.random(), // random so we get a new peerid every time, useful for testing
//   Addresses: {
//     Swarm: ['/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star'],
//   },
// });

import Libp2p from 'libp2p/src/';
import Gossipsub from 'libp2p-gossipsub';
import Mplex from 'libp2p-mplex/src/mplex';
import Bootstrap from 'libp2p-bootstrap';
import { NOISE } from '@chainsafe/libp2p-noise';
import Websockets from 'libp2p-websockets';
import WebRTCStar from 'libp2p-webrtc-star';
import { PeerId } from 'ipfs-core';
import PubsubPeerDiscovery from 'libp2p-pubsub-peer-discovery';
//import { MulticastDNS } from '@libp2p/mdns';
const { fromString: uint8ArrayFromString } = require('uint8arrays/from-string');
const { toString: uint8ArrayToString } = require('uint8arrays/to-string');

const libp2p = await Libp2p.create({
  addresses: {
    listen: [
      '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
      '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
    ],
  },
  modules: {
    transport: [Websockets, WebRTCStar],
    streamMuxer: [Mplex],
    connEncryption: [NOISE],
    peerDiscovery: [Bootstrap],
    pubsub: Gossipsub,
  },
  config: {
    pubsub: {
      enabled: true,
      emitSelf: false,
    },
    peerDiscovery: {
      [Bootstrap.tag]: {
        enabled: true,
        list: [
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmZa1sAxajnQjVM8WjWXoMbmPd7NsWhfKsPkErzpm9wGkp',
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
        ],
      },
    },
  },
});

libp2p.on('peer:discovery', async (peerId) => {
  console.log(`Found peer ${peerId.toB58String()}`);
});

libp2p.connectionManager.on('peer:connect', (connection) => {
  console.log(`Connected to ${connection.remotePeer.toB58String()}`);
});

libp2p.connectionManager.on('peer:disconnect', (connection) => {
  console.log(`Disconnected from ${connection.remotePeer.toB58String()}`);
});

await libp2p.start();
console.log(`Libp2p started!\nlibp2p id is ${libp2p.peerId.toB58String()}`);

libp2p.pubsub.on(identifier, (msg) => {
  console.log('message received');
  console.log(`node1 received: ${uint8ArrayToString(msg.data)}`);
});

await libp2p.pubsub.subscribe(identifier);
console.log(`subscribed to ${identifier}`);

setNode(libp2p);

const connectToPeer = async () => {
  const a = await node.peerStore.addressBook.get(
    PeerId.createFromB58String(multiaddr)
  );
  console.log(a);
  console.log(PeerId.createFromB58String(multiaddr));
  const b = PeerId.createFromB58String(multiaddr);
  //await node.dial(b);
  const peer = await node.peerStore.get(b);
  console.log(peer);
  //await node.dial(b);
  const addresses = await node.peerStore.addressBook.getMultiaddrsForPeer(
    PeerId.createFromB58String(multiaddr)
  );
  await node.peerStore.addressBook.set(b, addresses);
  await node.ping(b);
};

const subscribeToTopic = async () => {
  await node.pubsub.subscribe(identifier);
  console.log(`subscribed to ${identifier}`);
};

const sendHello = async () => {
  node.pubsub.publish(identifier, uint8ArrayFromString('Hello!'));

  console.log(`published to ${identifier}`);
};

const onPeers = async () => {
  const peerIds = await node.pubsub.getSubscribers(identifier);
  const topics = await node.pubsub.getTopics();
  console.log(peerIds);
  console.log(topics);
  const addresses = await node.peerStore.addressBook.getMultiaddrsForPeer(
    PeerId.createFromB58String(multiaddr)
  );
  console.log(addresses);

  // peerInfos.forEach((info) => {
  //   info.addrs.forEach((addr) => console.log(addr.toString()));
  // });
};
