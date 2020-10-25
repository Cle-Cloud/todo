<template>
  <div class='todo'>
    <div class='content'>
      <input 
          type='text' 
          placeholder="What do you want to do next..." 
          v-model="content" 
          @keyup.enter="addTodo" 
      />
      <TodoItem 
          v-for="(todo, index) in showTodos" 
          :index="todo.index"
          :todo="todo"
          :key="todo.index + index"
          @deleteTodoItem="deleteTodoItem"
          @completeChange="completeChange"
      />
      <TodoComplete 
        :todos="showTodos"
        @showAll="showAll"
        @showCompleted="showCompleted"
        @showActive="showActive"
        @deleteCompleted="deleteCompleted"
      />
    </div>
  </div>
</template>

<script>
import TodoItem from './todo-item.jsx';
import TodoComplete from './todo-complete.vue';

export default {
  name: 'Todo',
  components: {
    TodoItem,
    TodoComplete
  },
  data(){
    return {
      content: '',
      todoIndex: 0,
      todos: [],
      showTodos: []
    };
  },
  methods: {
    addTodo(){
      let todo = {};
      this.todoIndex += 1;
      todo.index = this.todoIndex;
      todo.content = this.content;
      todo.complete = false;
      this.todos.push(todo);
      this.showTodos.push(todo);
      this.content = '';
    },
    deleteTodoItem(index){
      this.todos = this.todos.filter((todo) => todo.index !== index);
      this.showTodos = this.showTodos.filter((todo) => todo.index !== index);
    },
    showAll(){
      this.copyTodos(this.todos);
    },
    showActive(){
      this.copyTodos(this.todos);
      this.showTodos = this.showTodos.filter((todo) => todo.complete === false);
    },
    showCompleted(){
      this.copyTodos(this.todos);
      this.showTodos = this.showTodos.filter((todo) => todo.complete === true);
    },
    deleteCompleted(){
      this.todos = this.todos.filter((todo)=>todo.complete === false);
      this.showTodos = this.showTodos.filter((todo)=>todo.complete === false);
    },
    completeChange(completeValue, index){
      this.todos.filter((todo) => todo.index === index)[0].complete = completeValue;
      this.showTodos.filter((todo) => todo.index === index)[0].complete = completeValue;
    },
    copyTodos(todos){
      this.showTodos = [];
      for(let i=0; i < todos.length; i+=1){
        this.showTodos.push(todos[i]);
      }
    }
  }
}
</script>

<style scoped>
.todo{width: 100%; height: 70%;}
.todo .content{width: 50%; height: 100%; margin: 0 auto;}
.todo .content input{width: 100%; height: 10%; font-size: 25px; box-sizing: border-box;}
</style>

