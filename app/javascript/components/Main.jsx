import React, { Component } from 'react';
import PropTypes from "prop-types"
import { Jumbotron, Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Expand from 'react-expand-animated';
import {JobForm} from './JobForm.jsx';
import {JobTable} from './JobTable.jsx';
import {MapContainer} from './MapContainer.jsx';
import NotificationAlert from 'react-notification-alert';
import * as generalHelper from '../helpers/GeneralHelper.js';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false, jobs: [] };
        this.googleProps = this.props.google;

        this.checkAndUpdateJobList = this.checkAndUpdateJobList.bind(this);
        this.toggle = this.toggle.bind(this);
        this.fetchAllJobs = this.fetchAllJobs.bind(this);
      }

    toggle = () => {
        this.setState(prevState => ({ open: !prevState.open }));
    };

    checkAndUpdateJobList = (updateFlag, action) => {
        if(updateFlag){
            if(action === "create")
                this.toggleAlert("success", "Job is created successfully");

            this.fetchAllJobs();
            this.setState({ open: false });
        }
        else{
            console.log("nothing changed");
        }
    }

    fetchAllJobs(){
        fetch('/api/jobs.json')
            .then((response) => {return response.json()})
            .then((data) => {this.setState({ jobs: data }) });
    }

    componentDidMount(){
      this.fetchAllJobs();
    }

    toggleAlert(type, message){
        var options = generalHelper.options;
        options.message = (<div>{message}</div>);
        options.type = type
        this.refs.notify.notificationAlert(options);
    }

    render(){
        return(
            <div>
                    <Jumbotron>
                    <h1 style={{fontFamily: "Verdana"}}>Notes for job searching</h1>
                    </Jumbotron>
                    <NotificationAlert ref="notify" />
                    <Button outline color="info" size="lg" onClick={this.toggle} block>Add Job</Button>
                    <br/>
                    <hr className="my-2" />
                    <br/>
                    <Expand open={this.state.open}>
                        <JobForm updateJobListFromCreate={this.checkAndUpdateJobList}/>
                    </Expand>
                    <br/>
                    <JobTable jobsList={this.state.jobs} googleProps={this.googleProps} updateJobList={this.checkAndUpdateJobList} />
                    <br/>
            </div>
        )
    }
}

const WrappedContainer = GoogleApiWrapper({
   apiKey: "AIzaSyCrA58mbRriitGYTLXaGpQ1w4BD0Ysuysw",
   language: "en"
})(Main);

export default WrappedContainer