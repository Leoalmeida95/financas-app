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
    nome: ''
  }

  render(){
    return(
    <div>
      <label>Nome:</label>
      <input type="text" values={this.state.nome} onChange={(e) => this.setState({nome: e.target.value})}></input>

      <br/>
      O nome digitado foi: {this.state.nome}
     </div>
   );
  }
}

export default App;
