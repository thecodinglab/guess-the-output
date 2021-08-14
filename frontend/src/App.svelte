<script>
  import logo from './assets/svelte.png';
  import { Socket } from 'socket.io-client';

  export let socket: Socket;
  export let status = 'waiting';

  socket.on('pong', () => {
    status += ' pong';
  });

  function ping() {
    status += ' ping';
    socket.emit('ping');
  }
</script>

<section class="text-gray-600 body-font">
  <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
    <img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src={logo}>
    <div class="text-center lg:w-2/3 w-full">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Svelte</h1>
      <p class="mb-8 leading-relaxed">Status: {status}</p>
      <button on:click={ping}>Ping</button>
    </div>
  </div>
</section>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
