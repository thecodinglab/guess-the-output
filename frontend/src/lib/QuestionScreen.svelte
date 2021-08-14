<script>
  export let socket;
  export let question;

  export function submit(answer) {
    socket.emit('answer', { answer });
  }
</script>

<div class="bg-black rounded-lg p-8 my-4 text-left">
  <p class="text-sm font-bold text-gray-400">{question.language}</p>
  <div class="bg-black py-4 rounded-lg">
    <code>{@html question.value}</code>
  </div>
</div>

<div class="grid md:grid-cols-2 gap-1 text-center">
  {#each question.answers as answer}
    <div class="px-8 py-4 bg-blue-400 hover:bg-blue-300 rounded-lg cursor-pointer" on:click={e => submit(answer)}>
      <p class="text-lg text-white font-bold">{answer.value}</p>
    </div>
  {/each}
</div>
