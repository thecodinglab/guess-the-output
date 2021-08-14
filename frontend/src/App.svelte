<script>
  import QuestionScreen from './lib/QuestionScreen.svelte';
  import LobbyScreen from './lib/LobbyScreen.svelte';
  import WaitingScreen from './lib/WaitingScreen.svelte';
  import ScoreScreen from './lib/ScoreScreen.svelte';

  export let socket;
  export let lobby;
  export let answer;
  export let question;
  export let score;
  export let finish;

  $: player = lobby?.players.find(player => player.id === socket.id);

  socket.on('room', data => {
    lobby = data;
  });

  socket.on('question', data => {
    question = data.question;
    answer = null;
  });

  socket.on('score', data => {
    answer = data.scores;
    question = null;
  });

  socket.on('finish', data => {
    finish = data.scores;
    question = null;
    answer = null;
    score = null;
  });

  socket.onAny(console.log);
</script>

<section class="min-h-screen bg-gray-800 text-white body-font flex justify-center items-center">
  <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
    <div class="text-center lg:w-2/3 w-full">
      {#if lobby}
        {#if question}
          <QuestionScreen {socket} {question} />
        {/if}
        {#if (score || !question) && !finish}
          <WaitingScreen {socket} {lobby} {player} {answer} />
        {/if}
        {#if finish}
          <ScoreScreen {socket} {lobby} {player} {finish} />
        {/if}
      {:else}
        <LobbyScreen {socket} />
      {/if}
    </div>
  </div>
</section>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
