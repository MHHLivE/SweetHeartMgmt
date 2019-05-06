import React, { Component } from 'react';
import Home from '../Tabs/Home';
import { Consumer } from '../Context';
import DataTabs from '../Tabs/DataTabs';
import Settings from '../Tabs/Settings';

class Board extends Component {

        render(){
                const regTest = new RegExp('[A-Z][a-z]+');
                return(
                        <Consumer>
                                {value =>{
                                        if( value.navigator.content === 'Home' ){
                                                return( <Home />);
                                        }else if ( value.navigator.content === 'Settings' ){
                                                return( <Settings /> );
                                        }else if ( regTest.test( value.navigator.content ) ){
                                                return( <DataTabs cardTitle={ value.navigator.content } baseRef={ value.databaseRef.child( value.navigator.content.toLowerCase() ) } /> );
                                        }else{
                                                console.log('error wrong tabs!');   
                                        }
                                }}
                        </Consumer>
                );
        }
}

export default Board;