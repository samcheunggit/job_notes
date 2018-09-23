import React, { Component } from 'react';
import PropTypes from "prop-types"
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Expand from 'react-expand-animated';
import {JobForm} from './JobForm.jsx';
import {JobTable} from './JobTable.jsx';
import NotificationAlert from 'react-notification-alert';
import * as generalHelper from '../helpers/GeneralHelper.js';


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false, jobs: [] };

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
                <h1>Job Notes</h1>
                <br/>
                <Container className="Main">
                     <NotificationAlert ref="notify" />
                    <Button outline color="info" size="lg" onClick={this.toggle} block>Add Job</Button>
                    <hr className="my-2" />
                    <br/>
                    <Expand open={this.state.open}>
                        <JobForm updateJobListFromCreate={this.checkAndUpdateJobList}/>
                    </Expand>
                    <br/>
                    <JobTable jobsList={this.state.jobs} updateJobListFromDelete={this.checkAndUpdateJobList} />
                    <br/>
                </Container>
            </div>
        )
    }
}

export default Main