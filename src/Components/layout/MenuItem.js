import React, { Component } from 'react';
import { Consumer } from '../Context';

class MenuItem extends Component {

        
        consoleLog = (title, type, body, dispatch) => {
                // console.log('called !');
                dispatch({type: 'LOG_INFO', payload: {title: title, type: type, body: body}});
                // console.log(dispatch);
        }

        setBoard = (content, id, dispatch) => {
                // console.log('called!');
                dispatch({ type: 'CHANGE_BOARD', payload: {content: content, id: id}});
        }

        changeBaord = (props, dispatch) => {
                // console.log(props.id);
                this.setBoard(this.props.content, this.props.id, dispatch);
                (props.navAddress !== props.content) ? this.consoleLog('board-changed', 'green', props.content + ' opened.', dispatch) : this.consoleLog('board-message', 'white', props.content + ' still is open.', dispatch) ;
                // this.consoleLog('board-changed', 'green', 'board !', dispatch);
        }

        render(){

                return (
                        <Consumer>
                                {value => {
                                        let isActive = this.props.navAddress === this.props.content;
                                        return (
                                                <div className={ 'menu-btn' + (isActive ? ' active' : '') + (this.props.isOn ? '' : ' hide')} onClick={ this.changeBaord.bind(this, this.props, value.dispatch) }>
                                                        <h3><i className={ this.props.icon }></i>  <span className= { this.props.isLittle ? 'hide' : '' } >{ this.props.content }</span></h3>
                                                </div>
                                        );
                                }}
                        </Consumer>
                );
        }
}

export default MenuItem;