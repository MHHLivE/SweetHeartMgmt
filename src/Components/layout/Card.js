import React, { Component } from 'react'
import CardTable from './CardTable';
import EditableDataTable from './EditableDataTable';

export class Card extends Component {
  render() {
    return (
      <div className={ this.props.cardType ? this.props.cardType : 'card' }>
        <div className='container'>
          <h1>{ this.props.cardTitle }</h1>
          <span className='table-divider'></span>
          { this.props.cardType === 'card' ? ( <CardTable tableCategory={ this.props.cardTitle } /> ) : (<EditableDataTable tableType={ this.props.cardTitle } />)}
        </div>
      </div>
    )
  }
}

export default Card
