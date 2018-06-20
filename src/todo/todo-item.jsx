export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      itemContentId: 'itemContent' + this.index,
      completeItemId: 'completeItem' + this.index,
      spanId: 'span' + this.index
    };
  },
  methods: {
    completeItem() {
      let itemContentObj = document.getElementById(this.itemContentId);
      let completeItemObj = document.getElementById(this.completeItemId);
      let spanObj = document.getElementById(this.spanId);
      
      if(itemContentObj.classList.contains("active")){
        completeItemObj.style.opacity = 0.1;
        itemContentObj.classList.remove("active");
        spanObj.classList.remove("spanActive");

        this.$emit("completeChange", false, this.index);
      } else{
        completeItemObj.style.opacity = 1;
        itemContentObj.classList.add("active");
        spanObj.classList.add("spanActive");

        this.$emit("completeChange", true, this.index);
      }
    },
    deleteItem() {
      this.$emit("deleteTodoItem", this.index);
    }
  },
  render: function(h){
    let opacityStyle = 'opacity:0.1';
    let itemContentClass = 'itemContent';
    let spanClass = '';

    if(this.todo.complete === true){
      opacityStyle = 'opacity:1';
      itemContentClass += ' active';
      spanClass += 'spanActive';
    }else{
      opacityStyle = 'opacity:0.1';
      itemContentClass = 'itemContent';
      spanClass = '';
    }
    
    return (
      <div class="todo-item">
        <div id={this.completeItemId} class="completeItem" style={opacityStyle} onClick={this.completeItem}></div>
        <div id={this.itemContentId} class={itemContentClass}>
          <span class={spanClass} id={this.spanId}>{this.todo.content}</span>
        </div>
        <div class="deleteItem" onClick={this.deleteItem}></div>
      </div>
    );
  }
}

