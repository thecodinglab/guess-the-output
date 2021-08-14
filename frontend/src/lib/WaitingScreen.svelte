<script>
  export let player;
  export let lobby;
  export let answer;
  export let socket;

  export function ready() {
    socket.emit('ready');
  }
</script>

<p class="text-gray-400 mb-4">{lobby.room}</p>

{#if answer}
  <div class="bg-gray-800 text-xl mb-8">
    {#if answer[player?.id] === 'correct'}
      <p>You are correct! 🎉</p>
    {/if}
    {#if answer[player?.id] === 'wrong'}
      <h2>Nope, that's wrong. Take a sip! 🍺</h2>
    {/if}
    {#if answer[player?.id] === 'unanswered'}
      <h2>Ohh no... You didn't make it in time. Jug that beer! 🍻🥴</h2>
    {/if}
  </div>
{/if}

<div class="bg-black rounded-lg p-8 my-4 flex flex-wrap">
  {#each lobby.players as player}
    <div class="bold {player.ready ? 'bg-green-500' : 'bg-blue-500'} p-2 px-7 rounded-full m-1">
      {player.username}
      {#if answer}
        {#if answer[player.id] === 'correct'}✅{/if}
        {#if answer[player.id] === 'wrong'}❌{/if}
        {#if answer[player.id] === 'unanswered'}🕒{/if}
      {/if}
    </div>
  {/each}
</div>

{#if !player.ready}
  <div class="px-8 py-4 bg-blue-400 hover:bg-blue-300 rounded-lg cursor-pointer" on:click={ready}>
    <p class="text-lg text-white font-bold">I'm Ready!</p>
  </div>
{/if}

