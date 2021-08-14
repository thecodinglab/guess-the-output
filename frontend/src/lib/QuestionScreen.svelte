<script>
  export let socket;
  export let question;
  export let answered = false;
  export let timeout = 0;

  export function submit(answer) {
    socket.emit('answer', { answer });
  }

  const interval = setInterval(() => {
    if (timeout === question.timeout) {
      return clearInterval(interval);
    }
    timeout++;
  }, 1000);
</script>

<div class="w-100 flex rounded-full overflow-hidden bg-black">
  <div class="progress h-2 bg-blue-500" style="width: {100 - 100 / question.timeout * timeout}%">&nbsp;</div>
</div>

<style>
  .progress {
    transition: width 0.2s ease-out;
  }
</style>

<div class="bg-black rounded-lg p-8 my-4 text-left">
  <p class="text-sm font-bold text-gray-400">{question.language}</p>
  <div class="bg-black py-4 rounded-lg">
    <code>{@html question.value}</code>
  </div>
</div>

{#if !answered}
  <div class="grid md:grid-cols-2 gap-1 text-center">
    {#each question.answers as answer}
      <div class="px-8 py-4 bg-blue-400 hover:bg-blue-300 rounded-lg cursor-pointer" on:click={e => submit(answer)}>
        <p class="text-lg text-white font-bold">{answer.value}</p>
      </div>
    {/each}
  </div>
{/if}
