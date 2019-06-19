import React, { Component } from 'react';

export class EditInputGroup extends Component {
        state = {
                isOpen : false
        }

        clickCover = event => {
                this.setState({isOpen : !this.state.isOpen});
        }

        render(){
                // console.log(this.props.inputArrays);
                return(
                        <div className={this.state.isOpen ? 'fab-btn open' : 'fab-btn'}>
                                <div className='edit-btn first-item'><h3><i className="fas fa-plus"></i></h3></div>
                                <div className='edit-btn second-item'><h3><i className="fas fa-pen"></i></h3></div>
                                <div className='edit-btn third-item'><h3><i className="fas fa-minus"></i></h3></div>
                                <div className='btn-cover' onClick={this.clickCover}><i className="fas fa-angle-up"></i></div>
                        </div>
                );
        }
}

export default EditInputGroup;