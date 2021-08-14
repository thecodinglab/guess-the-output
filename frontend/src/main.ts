import App from './App.svelte';
import io from 'socket.io-client';
import './theme.css';

const socket = io('https://guess-the-output.thecodinglab.dev');

export default new App({
  target: document.body,
  props: { socket },
});
