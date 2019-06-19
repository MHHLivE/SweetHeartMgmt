import React, { Component } from 'react';
import { Consumer } from '../Context';

export class EditableDataTable extends Component {
        // state = {
        //         data : {}
        // };

        render(){
                console.log("dataTable dataset :: ");
                console.log( this.props.dataset.data );

                return(
                        <Consumer>
                                { value => (
                                        <div>
                                                <h5>{ this.props.tableType.toLowerCase() }</h5>
                                                
                                        </div>
                                )}
                        </Consumer>
                );
        }
}

export default EditableDataTable;