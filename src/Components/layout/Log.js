import React, { Component } from 'react';
import LogItem from './LogItem';
import { Consumer } from '../Context';

class Log extends Component {

        render() {
                return (
                        <Consumer>
                                { value => {
                                        return (
                                                <div className='log-class'>
                                                        <div className='log-holder'>
                                                                <LogItem title='' color='' body='Log goes here...' />
                                                                { value.log.map(item => {
                                                                        return(
                                                                                <LogItem key={ item.id } title={ item.title } color={ item.type } body={ item.body } />
                                                                        );
                                                                }) }
                                                        </div>
                                                </div>
                                        );
                                }}
                        </Consumer>
                );
        };
}

export default Log;