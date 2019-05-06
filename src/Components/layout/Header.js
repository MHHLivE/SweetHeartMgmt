import React, { Component } from 'react';
import { Consumer } from '../Context';

class Header extends Component {

        render() {
                return (
                        <Consumer>
                                {value => {
                                        // console.log(value.navigator);
                                        let supDirectory = ( value.navigator.content !== 'Home' ) ? 'Home' : null;
                                        let nowaDirectory = value.navigator.content;
                        
                                        return (
                                                <div className='header-class'>
                                                        <div className='container'>
                                                                <div className='brand nav-section'>
                                                                        <h1>SweetHeart - Management Panell</h1>
                                                                </div>
                                                                <div className='nav-title nav-section'>
                                                                        <h2><span className={ supDirectory === null ? 'hide' : '' }>{ supDirectory }</span><span className={ supDirectory === null ? 'hide' : '' }> > </span><span>{ nowaDirectory }</span></h2>
                                                                </div>
                                                        </div>
                                                </div>
                                        );
                                }}
                        </Consumer>
                );
        };
}

export default Header;