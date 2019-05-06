import React, { Component } from 'react';
import Header from './Components/layout/Header';
import Menu from './Components/layout/Menu';
import Board from './Components/layout/Board';
import Log from './Components/layout/Log';
import { Provider } from './Components/Context'

class App extends Component {

        changeMenuSize = () =>{
                this.setState({
                        menuSizeController: !this.state.menuSizeController
                });
        }

        render(){
                return (
                        <Provider>
                                <div className='app-class'>
                                        <Header />
                                        <Menu />
                                        <Board />
                                        <Log />
                                </div>
                        </Provider>
                );
        }
}

export default App;