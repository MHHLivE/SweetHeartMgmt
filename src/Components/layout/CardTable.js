import React, { Component } from 'react';
import { Consumer } from '../Context';
import CardTableRow from './CardTableRow';

export class CardTable extends Component {

        render(){
                return(
                        <Consumer>
                                { value => {
                                        let tableCat = {};
                                        let firstAttr, secondAttr, thirdAttr, id;

                                        switch( this.props.tableCategory ){
                                                case 'STATIONS':
                                                tableCat = value.dataTable.stations;
                                                id = 'stationID';
                                                firstAttr = 'image';
                                                secondAttr = 'stationID';
                                                thirdAttr = 'name';
                                                // console.log(tableCat);
                                                break;

                                                case 'USERS':
                                                tableCat = value.dataTable.users;
                                                id = 'username';
                                                firstAttr = 'username';
                                                secondAttr = 'firstName';
                                                thirdAttr = 'lastName';
                                                // console.log(tableCat);
                                                break;

                                                case 'PLAYLISTS':
                                                tableCat = value.dataTable.playlists;
                                                id = 'playlistID';
                                                firstAttr = 'playlistID';
                                                secondAttr = 'name';
                                                thirdAttr = '';
                                                // console.log(tableCat);
                                                break;

                                                case 'GENRES':
                                                tableCat = value.dataTable.genres;
                                                id = 'genreTitle';
                                                firstAttr = 'image';
                                                secondAttr = 'genreTitle';
                                                thirdAttr = 'createdYear';
                                                // console.log(tableCat);
                                                break;

                                                case 'COUNTRIES':
                                                tableCat = value.dataTable.countries;
                                                id = 'continent';
                                                firstAttr = 'flag';
                                                secondAttr = 'continent';
                                                thirdAttr = 'lang';
                                                // console.log(tableCat);
                                                // console.log(tableCat[0]['lang']);
                                                break;

                                                default:
                                                break;
                                        }

                                        return(
                                                <div className='card-table-holder'>
                                                        <div className='card-table'>
                                                                { tableCat.map( instance => (
                                                                        <CardTableRow key={ instance[id] } firstAttr={ instance[firstAttr] } secAttr={ instance[secondAttr] } thirdAttr={ instance[thirdAttr] } isPicture={ firstAttr === 'image' || firstAttr === 'flag'}  />
                                                                )) }
                                                               
                                                        </div>
                                                </div>        
                                        )
                                
                                }}
                        </Consumer>
                )
        }
}

export default CardTable;