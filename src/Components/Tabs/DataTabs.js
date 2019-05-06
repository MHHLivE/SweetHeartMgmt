import React, { Component } from 'react';
import Card from '../layout/Card';
import { Consumer } from '../Context';
import EditInputGroup from '../layout/EditInputGroup';

export class DataTabs extends Component {

        render(){
                this.props.baseRef.on( 'value' , snap => {
                        console.log( snap.val() )
                        console.log( Object.keys(snap.val()).length );
                });
                return(
                        <Consumer>
                                { value => {
                                        return(
                                                <div className={ !value.menuSizeController ? 'board-class' : 'large-board'}>
                                                        <div className='card-holder'>
                                                                <Card cardTitle={ this.props.cardTitle } cardType='window-card' />
                                                                <EditInputGroup  />
                                                        </div>
                                                </div>
                                        )
                                }}
                        </Consumer>
                )
        }
}

export default DataTabs;