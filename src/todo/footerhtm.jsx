export default{
  data(){
    return {
      author: 'Cle',
      divStyle: 'width:100%; height:10%; position:relative; text-align:center;',
      spanStyle: 'position:relative; top:50%; transform:translateY(-50%); display:inline-block;' +
       'color:white; text-shadow:1px 1px 1px rgba(0,0,0,.8);'
    };
  },
  render(){
    return (
      <div style={this.divStyle}>
        <span style={this.spanStyle}>Written by {this.author}</span>
      </div>
    );
  }
}