<script setup>
import {
    reactive, watch, watchEffect
} from 'vue';
const props = defineProps({
    msg: {
        type: String,
        required: true
    }
});

const state = reactive({

});

const onClick = () => {
    console.log('clicked');
    state.msg = 'clicked';
};

const showError = () => {
    // uncovered
};

const update = () => {
    if (state.msg === 'error') {
        showError();
    }
};

watch(() => state.msg, () => {

    console.log('update');
    update();
});

watchEffect(() => {
    console.log('watchEffect', props.msg);
    state.msg = props.msg;
});


</script>

<template>
  <div class="greetings">
    <h1
      class="green"
      @click="onClick"
    >
      {{ state.msg }}
    </h1>
    <h3>
      You've successfully created a project with
      <a
        href="https://vitejs.dev/"
        target="_blank"
        rel="noopener"
      >Vite</a> +
      <a
        href="https://vuejs.org/"
        target="_blank"
        rel="noopener"
      >Vue 3</a>.
    </h3>
  </div>
</template>

<style>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

</style>
