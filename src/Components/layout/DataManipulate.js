import React, { Component } from 'react';
import { Consumer } from '../Context';


export class DataManipulate extends Component{
    state = "";

    componentDidMount() {
        this.setState(this.props.editor, () => this.setState(this.props.editor));
    }

    componentWillReceiveProps() {
        this.setState(this.props.editor, () => this.setState(this.props.editor));
        this.render();
    }

    submitForm = (event, id, dispatch) => {
        event.preventDefault();
        let data = this.state.data;
        let flag = true;
        if(data === null) data = {};
        let param = {};
        if(id === "add"){
            let newPayload = {};
            this.state.inputsArr.map(input => {
                if(data[input] !== undefined){
                    newPayload[input] = data[input];
                } else {
                    newPayload[input] = null;
                    alert("u must fill " + input + " field to submit data!");
                    flag = false;
                }
            })
            newPayload["addTable"] = this.props.table;
            param = {type: "ADD_DATA", payload: newPayload};

        } else {
            let data = this.state.data;
            if(data === null) data = {};
            let newPayload = {updata: {}};
            this.state.inputsArr.map(input => {
                if(data[input] !== undefined){
                    newPayload.updata[input] = data[input];
                } else {
                    newPayload.updata[input] = null;
                    alert("u must fill " + input + " field to submit data!");
                    flag = false;
                }
            })
            newPayload["prevID"] = id;
            let temp = newPayload.updata["key"];
            newPayload.updata["key"] = id;
            if(newPayload["prevID"] !== temp) alert("in Firebase u can't change keys! please remove and remake tuple for that kind of changes")
            newPayload["updTable"] = this.props.table;
            param = {type: "UPDATE_DATA", payload: newPayload};
        }
        
        if(flag){
            dispatch(param);
        }
        // dispatch();
        // this.forceUpdate();
        // this.props.myForceUpdate();
        this.props.exit();
    }

    valChange = (event, id, inputName) => {
        // console.log(id + " : " + inputName + " : " + event.target.value);
        let newData = this.state.data;
        if(newData === null){
            newData = {};
        }
        newData[inputName] = event.target.value;
        this.setState({...this.state, data: newData});
    }

    render() {
        while(this.state.inputsArr === undefined){
            return null;
        }

        return (
            <Consumer>
                {value => (
                    <form className="editor-form" onSubmit={(e) => this.submitForm(e, this.props.editor.id, value.dispatch)} >
                        {
                            (this.state !== null) ? this.state.inputsArr.map(input => {
                                let key = this.props.id + "-" + input;
                                return(<input key={key} type="text" placeholder={"enter " + input} name={input} onChange={(e) => this.valChange(e, this.props.id, input)} value={this.state.data !== null ? this.state.data[input] : ""} />)
                            }) : (<React.Fragment></React.Fragment>)
                        }

                        <input type="submit" value="submit"/>
                    </form>
                )}
            </Consumer>
        );
    }
}

export default DataManipulate;