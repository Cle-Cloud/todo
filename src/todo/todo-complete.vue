<template>
  <div class="todo-complete">
    <div class="left"><span>{{todos.length}} items left</span></div>
    <div class="middle">
      <span id="all" @click="showAll">All</span>
      <span id="active" @click="showActive">Active</span>
      <span id="completed" @click="showCompleted">Completed</span>
    </div>
    <div class="right"><span @click="deleteCompleted">Delete completed</span></div>
  </div>
</template>

<script>
export default {
  name: 'TodoComplete',
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  methods: {
    showAll(){
      let allObj = document.getElementById("all");
      this.siblings(allObj);
      allObj.classList.add("spanActive");

      this.$emit("showAll");
    },
    showActive(){
      let activeObj = document.getElementById("active");
      this.siblings(activeObj);
      activeObj.classList.add("spanActive");

      this.$emit("showActive");
    },
    showCompleted(){
      let completedObj = document.getElementById("completed");
      this.siblings(completedObj);
      completedObj.classList.add("spanActive");
      
      this.$emit("showCompleted");
    },
    deleteCompleted(){
      this.$emit("deleteCompleted");
    },
    siblings(elem) {
      let b = elem.parentNode.children;
      for(let i =0; i < b.length; i+=1) {
          if(b[i] !== elem){
            b[i].classList.remove("spanActive");
          }
      }
    }
  }
}
</script>

<style scoped>
.todo-complete{width: 100%; height: 10%; background: white;}
.left, .right{width: 20%; text-align: center; position: relative; float: left; height: 100%;}
.left span, .middle span, .right span{display: inline-block; position: relative; top:50%;
  transform: translateY(-50%); color: white; height: 40px; line-height: 40px;
  text-shadow: 1px 1px 1px rgba(0,0,0,.6);}
.middle span, .right span{cursor: pointer;}
.middle span{width: 25%;}
.middle{width: 60%; text-align: center; float: left; position: relative; height: 100%;}
.middle .spanActive{border: 1px solid gray;}
</style>

