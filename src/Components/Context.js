import React, { Component } from 'react';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
        apiKey: "AIzaSyAW-ymnGuT9RqSJDpKSdPYBPyhfWEfhZPA",
        authDomain: "sweatheart-7a071.firebaseapp.com",
        databaseURL: "https://sweatheart-7a071.firebaseio.com",
        projectId: "sweatheart-7a071",
        storageBucket: "sweatheart-7a071.appspot.com",
        messagingSenderId: "507815349761"
};

firebase.initializeApp( firebaseConfig );

// firebase test ::
const rootRef = firebase.database().ref();

// access firebase database and read from it for test ::
// const oneRoot = rootRef.child('users');
// const twoRoot = rootRef.once('value' , snap => console.log( snap.val() ) );
// const threeRoot = rootRef.child('stationPlaylist').orderByChild('playlistID').equalTo('0001').once('value', snap => console.log(snap.val()));
// const fourRoot = rootRef.child('users').orderByChild('age').startAt('18').once('value', snap => console.log( snap.val() ) );
// const fiveRoot = rootRef.child('stationPlaylist').on('value', snap => {
//         let array;
//         for(let data in snap.val()){
//                 array = data.split('-');
//                 const subRoot = rootRef.child('stations').child(array[0]).once('value', snap => console.log(snap.val()));
//                 const secSubRoot = rootRef.child('playlists').child(array[1]).once('value', snap => console.log(snap.val()));
//                 console.log(array);
//                 console.log(subRoot);
//                 console.log(secSubRoot);
//         }
// });
// const sixRoot = rootRef.child('stationPlaylist').on('value', snap => {
//         // console.log( snap.key );
//         // console.log( snap.val() );
//         // console.log( snap.val().key );
//         // snap.child().on('value', snapShot => console.log( snapShot.val() ) );
//         rootRef.child('stations').child(snap.key).once ('value', snapStation => console.log(snapStation.val() ) );
        
// });
// const sevenRoot = rootRef.child('stations').orderByKey().limitToFirst(2).on('value' , snap => {
//         console.log( snap.val() )
// });

// // log queries here ::
// console.log( rootRef.child('comment').orderByChild('content').startAt('This') );
// console.log( oneRoot );
// console.log( twoRoot );
// console.log( threeRoot );
// console.log( fourRoot );
// console.log( fiveRoot );
// console.log( sixRoot );
// console.log( sevenRoot );






const Context = React.createContext();

const reducer = (state, action) => {
        // console.log(action);
        switch( action.type ){
                case 'CHANGE_MENU_SIZE': 
                return {
                        ...state,
                        menuSizeController : !state.menuSizeController,
                };

                case 'LOG_INFO':
                const length = state.log.length + 1;
                const newLog = [{id: length, title: action.payload.title, type: action.payload.type, body: action.payload.body}];
                return{
                        ...state,
                        log: state.log.concat(newLog),
                };

                case 'CHANGE_BOARD':
                let id = action.payload.id;
                return{
                        ...state,
                        navigator: state.tabsTree[id],
                };

                case 'CHANGE_TABLE-MODE':
                let mode = action.payload.mode;
                return{
                        ...state,
                        editTableMode : mode,
                };

                case 'UPDATE_DATA':
                let data = action.payload;
                let upFlag = false;
                firebase.database().ref('/' + data.updTable + '/' + data.prevID).once('value').then(snap => {
                        if(snap.val() === null){
                                alert("ur key doesn't exists!");
                        } else {
                                upFlag = true;
                        }
                }).then(() => {
                        if(upFlag){
                                firebase.database().ref('/' + data.updTable + '/' + data.prevID).update(data.updata);
                        }
                });
                return state;
                
                case 'ADD_DATA':
                let tmpdata = action.payload;
                let exFlag = true;
                firebase.database().ref('/' + tmpdata.addTable + '/' + tmpdata.key).once('value').then(snap => {
                        if(snap.val() === null){
                                exFlag = false;
                        } else {
                                alert("ur key exists! please choose another key!");
                        }
                }).then(() => {
                        if(!exFlag){
                                firebase.database().ref('/' + tmpdata.addTable + '/' + tmpdata.key).set(tmpdata);
                        }
                });
                
                return state;
                
                case 'RMV_DATA':
                let rmvInfo = action.payload;
                firebase.database().ref('/' + rmvInfo.rmvTable + '/' + rmvInfo.rmvId).remove();
                return state;

                default:
                return state;
        }
}

export class Provider extends Component {
        state = {
                tabsTree:[
                        {
                                id: 1,
                                title: 'HOME',
                                showController: true,
                                icon: 'fas fa-home',
                                content: 'Home'
                        },
                        {
                                id: 2,
                                title: 'STATIONS',
                                showController: true,
                                icon: 'fas fa-broadcast-tower',
                                content: 'Stations'
                        },
                        {
                                id: 3,
                                title: 'USERS',
                                showController: true,
                                icon: 'fas fa-user',
                                content: 'Users'
                        },
                        {
                                id: 4,
                                title: 'PLAYLISTS',
                                showController: true,
                                icon: 'fas fa-list-alt',
                                content: 'Playlists'
                        },
                        {
                                id: 5,
                                title: 'GENRES',
                                showController: true,
                                icon: 'fas fa-music',
                                content: 'Genres'
                        },
                        {
                                id: 6,
                                title: 'COUNTRIES',
                                showController: true,
                                icon: 'fas fa-globe',
                                content: 'Countries'
                        },
                        {
                                id: 7,
                                title: 'SETTING',
                                showController: true,
                                icon: 'fas fa-cog',
                                content: 'Settings'
                        },
                ],
                navigator: {
                        id: 1,
                        title: 'HOME',
                        showController: true,
                        icon: 'fas fa-home',
                        content: 'Home'
                },
                editTableMode : 'none',
                dataTable:{
                        stations:[
                                {
                                        stationID: '0001',
                                        name:'First Station',
                                        address: 'any address',
                                        image: 'none station',
                                        description: 'this is first station that I create it !',
                                        genreTitle: 'Pop Music',
                                        CountryName: 'Iran'
                                },
                                {
                                        stationID: '0002',
                                        name:'Second Station',
                                        address: 'any other address',
                                        image: 'none station',
                                        description: 'this is the second one !',
                                        genreTitle: 'Instrumental',
                                        CountryName: 'UnitedStates'
                                },
                                {
                                        stationID: '',
                                        name:'',
                                        address: '',
                                        image: '',
                                        description: '',
                                        genreTitle: '',
                                        CountryName: ''
                                }
                        ],
                        users:[
                                {
                                        username: 'mhhlive77',
                                        firstName: 'Mohammad Hassan',
                                        age: '21',
                                        email: 'mhhlive77@gmail.com',
                                        password: 'a1t3o7m7',
                                        phoneNum: '+989391737588',
                                        lastName: 'Hajivandi',
                                        countryName: 'Iran',
                                },
                                {
                                        username: 'samadi98',
                                        firstName: 'Amir Hossein',
                                        age: '21',
                                        email: 'samadipour@gmail.com',
                                        password: '0123456789',
                                        phoneNum: '+15555555555',
                                        lastName: 'Samadipour',
                                        countryName: 'UnitedStates',
                                },
                                {
                                        username: '',
                                        firstName: '',
                                        age: '',
                                        email: '',
                                        password: '',
                                        phoneNum: '',
                                        lastName: '',
                                        countryName: '',
                                }
                        ],
                        genres:[
                                {
                                        genreTitle: 'Pop Music',
                                        details: ' This genre containes stations that play POP musics for listeners :) ',
                                        createdYear: '2019',
                                        image: 'none genre'
                                },
                                {
                                        genreTitle: 'Instrumental Musics',
                                        details: ' This genre have all stations that play the best archive of instrumental musics in the world ! ',
                                        createdYear: '1990',
                                        image: 'none genre'
                                },
                                {
                                        genreTitle: '',
                                        details: '',
                                        createdYear: '',
                                        image: ''
                                }
                        ],
                        playlists:[
                                {
                                        playlistID: '0000',
                                        name: 'First Custom Playlist'
                                },
                                {
                                        playlistID: '0001',
                                        name: 'Second Custom Playlist'
                                },
                                {
                                        playlistID: '',
                                        name: ''
                                }
                        ],
                        countries:[
                                {
                                        continent: 'Iran',
                                        flag: 'none flag',
                                        lang:'Persian'
                                },
                                {
                                        continent: 'UnitedStates',
                                        flag: 'none flag',
                                        lang:'English'
                                },
                                {
                                        continent: '',
                                        flag: '',
                                        lang:''
                                }
                        ],
                        transaction:[
                                {
                                        transactionNum: '0000001',
                                        amount: '1000000',
                                        time: '',
                                        date: '',
                                        success: true,
                                        username: 'samadi98'
                                },
                                {
                                        transactionNum: '0000002',
                                        amount: '9000',
                                        time: '',
                                        date: '',
                                        success: false,
                                        username: 'samadi98'
                                },
                                {
                                        transactionNum: '',
                                        amount: '',
                                        time: '',
                                        date: '',
                                        success: '',
                                        username: ''
                                }
                        ],
                        comment:[
                                {
                                        commentID: '00001',
                                        content: 'This is realy good stations that you gather all of them in here :D',
                                        date: '',
                                        time: '',
                                        username: 'mhhlive77',
                                        stationID: '0001',
                                        replyCommentID: ''
                                },
                                {
                                        commentID: '00002',
                                        content: 'it\'s realy not',
                                        date: '',
                                        time: '',
                                        username: 'samadi98',
                                        stationID: '0001',
                                        replyCommentID: '00001'
                                },
                                {
                                        commentID: '',
                                        content: '',
                                        date: '',
                                        time: '',
                                        username: '',
                                        stationID: '',
                                        replyCommentID: ''
                                }
                        ],
                        userGenre:[
                                {
                                        genreTitle: 'Pop Music',
                                        username: 'samadi98'
                                },
                                {
                                        genreTitle: '',
                                        username: ''
                                }
                        ],
                        userPlaylist:[
                                {
                                        playlistID: '0000',
                                        username: 'mhhlive77'
                                },
                                {
                                        playlistID: '0001',
                                        username: 'samadi98'
                                },
                                {
                                        playlistID: '',
                                        username: ''
                                }
                        ],
                        stationSubscribe:[
                                {
                                        username: 'mhhlive77',
                                        stationID: '0001'
                                },
                                {
                                        username: 'mhhlive77',
                                        stationID: '0002'
                                },{
                                        username: 'samadi98',
                                        stationID: '0001'
                                },{
                                        username: '',
                                        stationID: ''
                                }
                        ],
                        stationPlaylist:[
                                {
                                        stationID: '0001',
                                        playlistID: '0001'
                                },
                                {
                                        stationID: '0002',
                                        playlistID: '0001'
                                },
                                {
                                        stationID: '0001',
                                        playlistID: '0002'
                                },
                                {
                                        stationID: '',
                                        playlistID: ''
                                }
                        ]
                },
                databaseRef: rootRef,
                menuSizeController: true,
                log: [],
                dispatch: action => this.setState(state => reducer(state, action))
        };
        

        render() {
                return (
                        <Context.Provider value={ this.state }>
                                { this.props.children }
                        </Context.Provider>
                );
        };
}

export const Consumer = Context.Consumer;