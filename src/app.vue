<template>
  <div id='app'>
    <div class='mask'>
      <HeaderHtm />
      <Todo />
      <FooterHtm />
    </div>
  </div>
</template>

<script>
import HeaderHtm from './todo/headerhtm.vue';
import FooterHtm from './todo/footerhtm.jsx';
import Todo from './todo/todo.vue';

export default {
  name: 'app',
  components: {
    HeaderHtm,
    FooterHtm,
    Todo
  }
}
</script>
