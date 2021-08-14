<script>
  import logo from './assets/svelte.png'
</script>

<section class="text-gray-600 body-font">
  <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
    <img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src={logo}>
    <div class="text-center lg:w-2/3 w-full">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Svelte</h1>
      <p class="mb-8 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A culpa dolorem
        eius excepturi hic illo, incidunt laudantium libero molestias non odit quaerat quasi recusandae
        reiciendis suscipit tenetur vel, veritatis vitae.</p>
    </div>
  </div>
</section>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
