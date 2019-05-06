import React, { Component } from 'react';

export class CardTableItem extends Component{

        render(){
                let classType = '';
                this.props.isHide ? classType += 'hide' : classType+='';
                this.props.isPicture ? classType += ' card-table-picture' : classType += '';
                classType += ' card-table-item';
                let content;
                switch( this.props.content ){
                        case 'none genre':
                                content = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK0oMLUCNdpI8rF7slai2O5xaFU5egNnTGkqEUxVWnPD5n-P8V';
                                break;
                        case 'none station':
                                content = 'data:image/png;base64,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';
                                break;
                        case 'none flag':
                                content = 'https://cdn0.iconfinder.com/data/icons/seo-smart-pack/128/grey_new_seo-34-512.png';
                                break;
                        default:
                                content = this.props.content;
                                break;
                }

                if( this.props.isPicture ){
                        // console.log( this.props.content );
                        return(
                                <div className={ classType } style={ { backgroundImage: `url(${ content })` } }></div>
                        );
                }else{
                        return(
                                <div className={ classType }> { this.props.content } </div>
                        );
                }
        }
}

export default CardTableItem;