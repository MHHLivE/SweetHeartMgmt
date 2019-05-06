import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LogItem extends Component {

        render(){

                return(
                        <React.Fragment>
                                <p className='pure-white'>>> <strong className={ this.props.color }>{ this.props.title }</strong> { this.props.title !== '' ? ' : ' : ''} { this.props.body }</p>
                        </React.Fragment>
                );
        }
}

LogItem.propTypes = {
        body: PropTypes.string.isRequired
};

export default LogItem;