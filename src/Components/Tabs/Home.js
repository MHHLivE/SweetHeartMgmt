import React, { Component } from 'react';
import { Consumer } from '../Context';
import Card from '../layout/Card';

class Home extends Component{
        render(){
                return(
                        <Consumer>
                                { value => {
                                        return(
                                                <div className={ !value.menuSizeController ? 'board-class' : 'large-board'}>
                                                        <div className='card-holder'>
                                                                { value.tabsTree.filter( tabs => (tabs.id !== 1 && tabs.id !==7)).map( tabs => (
                                                                        <Card key={ tabs.id } cardTitle={ tabs.title } cardType={ 'card' } />
                                                                ) ) }
                                                        </div>
                                                </div>
                                        )
                                }}
                        </Consumer>
                );
        }
}

export default Home;