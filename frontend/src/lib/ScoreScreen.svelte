<script>
  export let lobby;
  export let player;
  export let finish;
</script>

<div class="bg-black rounded-lg py-4 my-4">
  {#each lobby.players as player, index}
    <div class="bold p-2 px-7 rounded-full mr-2 flex flex-col">
      <p class="text-left w-1/5 mb-2">{player.username}</p>
      <div class="flex-grow  flex rounded-full overflow-hidden">
        {#if finish[player.id].unanswered > 0}
          <div class="bg-gray-500" style="width: {100 / lobby.total * finish[player.id].unanswered}%">🕒</div>
        {/if}
        {#if finish[player.id].wrong > 0}
          <div class="bg-red-500" style="width: {100 / lobby.total * finish[player.id].wrong}%">✕</div>
        {/if}
        {#if finish[player.id].correct > 0}
          <div class="bg-green-500" style="width: {100 / lobby.total * finish[player.id].correct}%">✔</div>
        {/if}
      </div>
    </div>
    {#if index < lobby.players.length - 1}
      <hr class="m-4 my-2 border-gray-600 border-1" />
    {/if}
  {/each}
</div>
