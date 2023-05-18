<script setup>
import WelcomeItem from './WelcomeItem.vue';

</script>

<template>
  <div>
    <WelcomeItem>
      <template #heading>
        Documentation
      </template>

      Vue’s
      <a
        href="https://vuejs.org/"
        target="_blank"
        rel="noopener"
      >official documentation</a>
      provides you with all information you need to get started.
    </WelcomeItem>

    <WelcomeItem>
      <template #heading>
        Tooling
      </template>

      This project is served and bundled with
      <a
        href="https://vitejs.dev/guide/features.html"
        target="_blank"
        rel="noopener"
      >Vite</a>. The
      recommended IDE setup is
      <a
        href="https://code.visualstudio.com/"
        target="_blank"
        rel="noopener"
      >VSCode</a> +
      <a
        href="https://github.com/johnsoncodehk/volar"
        target="_blank"
        rel="noopener"
      >Volar</a>. If
      you need to test your components and web pages, check out
      <a
        href="https://www.cypress.io/"
        target="_blank"
        rel="noopener"
      >Cypress</a> and
      <a
        href="https://on.cypress.io/component"
        target="_blank"
      >Cypress Component Testing</a>.

      <br>

      More instructions are available in <code>README.md</code>.
    </WelcomeItem>

    <WelcomeItem>
      <template #heading>
        Ecosystem
      </template>

      Get official tools and libraries for your project:
      <a
        href="https://pinia.vuejs.org/"
        target="_blank"
        rel="noopener"
      >Pinia</a>,
      <a
        href="https://router.vuejs.org/"
        target="_blank"
        rel="noopener"
      >Vue Router</a>,
      <a
        href="https://test-utils.vuejs.org/"
        target="_blank"
        rel="noopener"
      >Vue Test Utils</a>, and
      <a
        href="https://github.com/vuejs/devtools"
        target="_blank"
        rel="noopener"
      >Vue Dev Tools</a>. If
      you need more resources, we suggest paying
      <a
        href="https://github.com/vuejs/awesome-vue"
        target="_blank"
        rel="noopener"
      >Awesome Vue</a>
      a visit.
    </WelcomeItem>
  </div>
</template>
