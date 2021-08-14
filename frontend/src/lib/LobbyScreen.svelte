<script>
  export let socket;
  export let room = '';
  export let username = '';

  export function join() {
    socket.emit('join', { username, room });
  }

  export function create() {
    socket.emit('create', { username });
  }
</script>

<div class="flex flex-col justify-between items-stretch">
  <input type="text" class="flex-grow bg-black p-4 my-2 rounded-lg outline-none" placeholder="Room ID" bind:value={room}>
  <input type="text" class="flex-grow bg-black p-4 my-2 rounded-lg outline-none" placeholder="Username" bind:value={username}>
  <div class="my-2 px-8 py-4 bg-blue-400 hover:bg-blue-300 rounded-lg cursor-pointer" on:click={join}>
    <p class="text-lg text-white font-bold">Join Room</p>
  </div>
</div>

<hr class="m-8 border-gray-600 border-2" />

<div class="flex flex-col justify-between items-stretch">
  <input type="text" class="flex-grow bg-black p-4 my-2 rounded-lg outline-none" placeholder="Username" bind:value={username}>
  <div class="px-8 py-4 bg-blue-400 hover:bg-blue-300 rounded-lg cursor-pointer" on:click={create}>
    <p class="text-lg text-white font-bold">Create Room</p>
  </div>
</div>
