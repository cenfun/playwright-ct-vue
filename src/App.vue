<script setup>
import { onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import TheWelcome from './components/TheWelcome.vue';

const onClick = () => {

};

const callFunction = (v) => {
    if (v === 100) {
        console.log('message 100');
    }
    if (v === false) {
        console.log('never covered');
    }
};

const init = () => {
    for (let i = 0; i < 1000; i++) {
        callFunction(i);
    }
};

onMounted(() => {

    init();

});
</script>

<template>
  <div class="app">
    <header>
      <img
        alt="Vue logo"
        class="logo"
        src="./assets/logo.svg"
        width="125"
        height="125"
        @click="onClick"
      >

      <div class="wrapper">
        <HelloWorld msg="You did it!" />
      </div>
    </header>

    <main>
      <TheWelcome />
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
