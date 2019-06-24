import React, { Component } from 'react';
import { Consumer } from '../Context';
import DataManipulate from './DataManipulate';

export class EditableDataTable extends Component {
        state = {
                showEditor: false,
                data: null,
                id: ""
        };

        handleEditClick = (id) => {
                let data = this.props.dataset.data[id];
                this.setState({data: data, showEditor: true, id : id});
        }
        
        handleRmvClick = (id, table, dispatch) => {
                dispatch({type: "RMV_DATA", payload: {rmvId: id, rmvTable: table}});
        }
        
        handleAddClick = () => {
                this.setState({data: null, showEditor: true, id : "add"});
        }
        
        handleExitClick = () => {
                this.setState({data: null, showEditor: false, id: ""});
        }

        render(){
                return(
                        <Consumer>
                                { value => (
                                        <div className="table-container">
                                                <div className="data-table">{
                                                        this.props.dataset.row.map(row => {
                                                                return(
                                                                        <div key={row} className="touple">
                                                                                <h3 className="touple-key"><i className="fas fa-greater-than"></i> {row} : </h3>
                                                                                {
                                                                                        this.props.dataset.column.map(clmn => {
                                                                                                return(<p key={row + clmn} className="touple-clmn">{clmn} : <strong className="touple-clmn-data">{this.props.dataset.data[row][clmn]}</strong></p>);
                                                                                        })
                                                                                }
                                                                                <i className="edit-btn fas fa-pen" onClick={() => this.handleEditClick(row)}></i>
                                                                                <i className="trash-btn fas fa-trash-alt" onClick={() => this.handleRmvClick(row, this.props.tableType.toLowerCase(), value.dispatch)}></i>
                                                                        </div>
                                                                );
                                                        })
                                                }
                                                <div className="touple add-touple"><i className="far fa-plus-square" onClick={() => this.handleAddClick()}></i></div>
                                                </div>
                                                <div className={this.state.showEditor ? "editor" : "editor hide"}>
                                                        <div className="page-cover" onClick={() => this.handleExitClick()}></div>
                                                        <DataManipulate table={this.props.tableType.toLowerCase()} exit={() => this.handleExitClick()} editor={{inputsArr: this.props.dataset.column, data: this.state.data, id: this.state.id}}/>
                                                </div>
                                        </div>
                                )}
                        </Consumer>
                );
        }
}

export default EditableDataTable;