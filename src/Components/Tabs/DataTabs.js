import React, { Component } from 'react';
import Card from '../layout/Card';
import { Consumer } from '../Context';
import EditInputGroup from '../layout/EditInputGroup';
import SpinnerPage from '../layout/SpinnerPage';
import { deepEqual } from 'fast-equals';
// import EditableDataTable from '../layout/EditableDataTable';

export class DataTabs extends Component {
        state = {
                loading : true,
                dataset : {
                        row : [],
                        data : [],
                        column : []
                }
        }

        consoleLog = (title, type, body, dispatch) => {
                dispatch({type: 'LOG_INFO', payload: {title: title, type: type, body: body}});
        }
        
        makeComp(){
                return(
                        <Consumer>
                                { value => {
                                        return(
                                                <div className={ !value.menuSizeController ? 'board-class' : 'large-board'}>
                                                        <div className='card-holder'>
                                                                <Card cardTitle={ this.props.cardTitle } cardType='window-card' data={ this.state.data } />
                                                                <EditInputGroup />
                                                        </div>
                                                </div>
                                        )
                                }}
                        </Consumer>
                );
        }

        render(){
                let rowAttr, dataJSON, columnAttr, isChanged , nextState = null;
                try {
                        this.props.baseRef.once( 'value' ).then( snap => {
                                dataJSON = snap.val();
                                columnAttr = Object.keys(dataJSON[Object.keys(snap.val())[0]]);
                                rowAttr = Object.keys(snap.val());
                                // console.log("dataJSON : ");
                                // console.log(dataJSON);
                                // console.log(`columnAttr: ${columnAttr}\nrowAttr: ${rowAttr}`);
                                nextState = {
                                        loading : false,
                                        dataset : {
                                                row : rowAttr,
                                                data : dataJSON,
                                                column : columnAttr
                                        }
                                };
                                isChanged = !deepEqual(this.state, nextState);
                                
                                if (isChanged){
                                        isChanged = true;
                                        this.setState(nextState);
                                }
                                
                        });
                }
                catch(err) {
                        console.log(err);
                }

                return (
                        <React.Fragment>
                                {!this.state.loading ? (<Consumer>
                                { value => {
                                        return(
                                                <div className={ !value.menuSizeController ? 'board-class' : 'large-board'}>
                                                        <div className='card-holder'>
                                                                <Card cardTitle={ this.props.cardTitle } cardType='window-card' dataset={ this.state.dataset } />
                                                                {/* <EditInputGroup /> */}
                                                        </div>
                                                </div>
                                        )
                                }}
                        </Consumer>) : <SpinnerPage />}
                        </React.Fragment>
                );
        }
}

export default DataTabs;