import React, { Component } from 'react';
import CardTableItem from './CardTableItem';

export class CardTableRow extends Component {

        render() {

                let nullFAttr =  this.props.firstAttr === '' 
                let nullSAttr = this.props.secAttr === ''
                let nullTAttr = this.props.thirdAttr === '' || this.props.thirdAttr === undefined
                let nullRow = ( nullFAttr ) && ( nullSAttr ) && ( nullTAttr );

                return (
                        <React.Fragment>
                                <div className={ nullRow ? 'hide' : 'card-table-row' }>
                                        <CardTableItem isPicture={ this.props.isPicture } content={ this.props.firstAttr } isHide={ nullFAttr } />
                                        <CardTableItem isPicture={ false } content={ this.props.secAttr } isHide={ nullSAttr } />
                                        <CardTableItem isPicture={ false } content={ this.props.thirdAttr } isHide={ nullTAttr } />
                                </div>
                        </React.Fragment>
                )
        }
}

export default CardTableRow;
