import Vue from 'vue';
import app from './app.vue';
import './asserts/style/style.styl';

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
  render: (h) => h(app)
}).$mount(root);