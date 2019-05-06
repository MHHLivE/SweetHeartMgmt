import React, { Component } from 'react';
import MenuItem from './MenuItem';
import { Consumer } from '../Context';

class Menu extends Component {
        // constructor(){
        //         super();
        // }

        changeMenuSize = (dispatch) => {
                dispatch({type: 'CHANGE_MENU_SIZE'});
        }

        render() {

                return (
                        <Consumer>
                                { value => {

                                        return (
                                                <div className={ value.menuSizeController ? 'little-menu' : 'menu-class'}>
                                                        <div className='container'>
                                                                <div className='menu-size'><div onClick={ this.changeMenuSize.bind(this, value.dispatch) }><span></span><span></span><span></span></div></div>
                                                                <div className='menu-item-holder'>
                                                                        {value.tabsTree.map(item => {
                                                                                return (
                                                                                        <MenuItem key={ item.id } id={ item.id - 1 } content={ item.content } isOn={ item.showController } icon={ item.icon } isLittle={ value.menuSizeController } navAddress={ value.navigator.content } />
                                                                                );
                                                                        }) }
                                                                </div>
                                                        </div>
                                                </div>
                                        );
                                }}
                        </Consumer>
                );
        };
}

export default Menu;