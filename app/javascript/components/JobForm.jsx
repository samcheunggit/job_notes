import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import * as generalHelper from '../helpers/GeneralHelper.js';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback} from 'availity-reactstrap-validation';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { GoogleAutoComplete } from './GoogleAutoComplete.jsx';

class JobForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            company: '',
            appliedDate: '',
            stack: '',
            status: '',
            joburl: '',
            address: '',
            latitude: '',
            longitude: ''
        };

        this.resetField = false;
        this.handleChange = this.handleChange.bind(this);
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.fetchLatLngByAddress = this.fetchLatLngByAddress.bind(this);
      }

      fetchLatLngByAddress(address){
        geocodeByAddress(address)
              .then(results => getLatLng(results[0]))
              .then(latLng => {
                this.setState({ address: address, latitude: latLng.lat, longitude: latLng.lng });
              })
              .catch(error => {
                console.error('Error', error);
              });
      }

      handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
          [name]: value
        });

        this.resetField = false;
      }

      handleInvalidSubmit(event) {
        console.log("invalid submit");
        }

      handleValidSubmit(event) {
        var newJob = {
            title: this.state.title,
            company: this.state.company,
            applieddate: this.state.appliedDate,
            stack: this.state.stack,
            status: this.state.status,
            joburl: this.state.joburl,
            address: this.state.address,
            latitude: this.state.latitude,
            longitude: this.state.longitude
        }

        fetch('/api/jobs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({job: newJob }),
        }).then((response) => {return response.json()})
        .then((job)=>{
          this.props.updateJobListFromCreate(true, "create");
        })

        this.form && this.form.reset();
        this.resetField = true;
      }

      render() {
        // generate options for status select field from generalHelper statusList constant
        const statusOptions = generalHelper.statusList.map((option) =>
            <option value={option.value} key={option.value + option.label}>{option.label}</option>,
        );

        return (
            <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit} ref={c => (this.form = c)}>
                <Row>
                  <Col xs="12" sm="12" md="12" lg="12" xl="12">
                  <AvGroup>
                    <Label for="title">Job Title</Label>
                    <AvInput type="text" name="title" id="title" placeholder="Job Title" onChange={this.handleChange} required/>
                    <AvFeedback>This field is required!</AvFeedback>
                  </AvGroup>
                  </Col>
                  <Col xs="12" sm="12" md="12" lg="12" xl="12">
                    <AvGroup>
                    <Label for="company">Company</Label>
                    <AvInput type="text" name="company" id="company" placeholder="Company" onChange={this.handleChange} required/>
                    <AvFeedback>This field is required!</AvFeedback>
                    </AvGroup>
                   </Col>
                  <Col xs="12" sm="12" md="12" lg="12" xl="12">
                  <AvGroup>
                    <Label for="appliedDate">Applied Date</Label>
                    <AvInput type="date" name="appliedDate" id="appliedDate" placeholder="Applied Date" onChange={this.handleChange} required/>
                    <AvFeedback>Please enter valid date!</AvFeedback>
                  </AvGroup>
                  </Col>
                  <Col xs="12" sm="12" md="12" lg="12" xl="12">
                    <AvGroup>
                      <Label for="stack">Stack</Label>
                      <AvInput type="text" name="stack" id="stack" onChange={this.handleChange} required/>
                      <AvFeedback>This field is required!</AvFeedback>
                    </AvGroup>
                 </Col>
                  <Col xs="12" sm="12" md="12" lg="12" xl="12">
                    <AvGroup>
                       <Label for="status">Status</Label>
                       <AvInput type="select" name="status" id="status" onChange={this.handleChange} required>
                        {statusOptions}
                       </AvInput>
                       <AvFeedback>This field is required!</AvFeedback>
                     </AvGroup>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <AvGroup>
                           <Label for="joburl">Job URL</Label>
                           <AvInput type="text" name="joburl" id="joburl" placeholder="Job URL" onChange={this.handleChange} required/>
                           <AvFeedback>This field is required!</AvFeedback>
                         </AvGroup>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <FormGroup>
                          <Label>Address</Label>
                          <GoogleAutoComplete callbackFromAddressForm={this.fetchLatLngByAddress} reset={this.resetField} />
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <Button color="success" size="lg" block>Save</Button>
                    </Col>
                </Row>
              </AvForm>
        );
      }
}

JobForm.propTypes = {
  name: PropTypes.string
};
// named export
export {JobForm};
