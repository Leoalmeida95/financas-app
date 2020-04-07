import React from 'react';


// function App() {
//   return (
//     <div>
//         hello world
//     </div>
//   );
// }

class App extends React.Component{

  state = {
    numero1: null,
    numero2:null,
    resultado:null
  }

  render(){
    return(
    <div>
      <label>Entre com os valores:</label>
      <input type="text" values={this.state.numero1} onChange={(e) => this.setState({numero1: e.target.value})}></input> +
      <input type="text" values={this.state.numero2} onChange={(e) => this.setState({numero2: e.target.value})}></input> 
      <br/>
      <button onClick={()=> this.setState({resultado: parseInt(this.state.numero1) + parseInt(this.state.numero2)})}>Somar</button>
      <br/>
      <br/>
      Resultado: {this.state.resultado}
     </div>
   );
  }
}

export default App;
