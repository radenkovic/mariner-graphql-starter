import { Events } from 'node-mariner';

const PubSub = new Events();

PubSub.on('user:create', (data, params) => {
  console.log('Pubsub message', data);
  console.log('Pubsub params', params);
});

export default PubSub;
