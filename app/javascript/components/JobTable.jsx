import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ReactTable from "react-table";
import * as generalHelper from '../helpers/GeneralHelper.js';
import { FaTimes } from 'react-icons/fa';
import _ from 'lodash';
import NotificationAlert from 'react-notification-alert';
import {MapContainer} from './MapContainer.jsx';

class JobTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              jobs: this.props.jobsList
        };
        this.editableStatus = this.editableStatus.bind(this);
        this.saveStatus = this.saveStatus.bind(this);
      }

    componentDidUpdate(prevProps) {
        // compare two lists to set new state, otherwise it will enter infinite loop
      if (!_.isEqual(prevProps.jobsList, this.props.jobsList)) {
        this.setState({ jobs: this.props.jobsList });
      }
    }

    deleteJob = (jobId, event) => {
        fetch(`/api/jobs/${jobId}`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            }).then((response) => {
                this.props.updateJobListFromDelete(true, "delete");
                this.toggleAlert("success", "Job is deleted successfully");
              })
            event.preventDefault();
        };

    toggleAlert(type, message){
        var options = generalHelper.options;
        options.message = (<div>{message}</div>);
        options.type = type
        this.refs.notify.notificationAlert(options);
    }

    saveStatus(){
        console.log("save status called");
    }

    editableStatus(cellInfo) {

//        this.setState({ editJobStatus: cellInfo.original.status, editJobId: cellInfo.original.id });
        const statusOptions = generalHelper.statusList.map((option) =>
            <option value={option.value} key={option.value + option.label}>{option.label}</option>,
        );

        return (
            <Input type="select" name="status" id="editableStatus" value={cellInfo.original.status} onChange={this.saveStatus}>
                                    {statusOptions}
                                   </Input>
        );
      }

    render() {

        return(
        <div>
            <NotificationAlert ref="notify" />
            <ReactTable
              data={this.state.jobs}
              columns={[
                {
                  columns: [
                    {
                      accessor: "id",
                      Cell: row => (
                        <span onClick={(e) => this.deleteJob(row.original.id, e)}><FaTimes /></span>
                      ),
                      maxWidth: 30
                    },
                    {
                      Header: "Title",
                      accessor: "title",
                      Footer: () =>
                        <div style={{ textAlign: "center" }}>Title</div>
                    },
                    {
                      Header: "Company",
                      accessor: "company",
                      Footer: () =>
                        <div style={{ textAlign: "center" }}>Company</div>
                    },
                    {
                      Header: "Applied Date",
                      accessor: "applieddate",
                      Footer: () =>
                        <div style={{ textAlign: "center" }}>Applied Date</div>
                    },
                    {
                      Header: "Stack",
                      accessor: "stack",
                      Footer: () =>
                        <div style={{ textAlign: "center" }}>Stack</div>
                    },
                    {
                      Header: "Status",
                      accessor: "status",
                      Cell: this.editableStatus
                      /*Cell: row => (

                            <span>
                                <span style={{
                                  color: row.value === 'reject' ? '#ff2e00'
                                    : row.value === 'offer' ? '#57d500'
                                    : '#ffbf00',
                                  transition: 'all .3s ease'
                                }}>
                                  &#x25cf;
                                </span>&nbsp;&nbsp;
                                <label>{generalHelper.getStatusLabel(row.original.status)}</label>
                            </span>
                        ),*/,
                      Footer: () =>
                        <div style={{ textAlign: "center" }}>Status</div>
                    },
                    {
                      Header: "Job URL",
                      accessor: "joburl",
                      Cell: row => (
                            <a href={row.original.joburl} target="_blank">{row.original.joburl}</a>
                          ),
                      Footer: () =>
                        <div style={{ textAlign: "center" }}>Job URL</div>
                    },
                    {
                      Header: "Address",
                      accessor: "address",
                      Footer: () =>
                        <div style={{ textAlign: "center" }}>Address</div>
                    }
                  ]
                },
                {
                  columns: [
                    {
                      expander: true,
                      Header: () => <strong>Map</strong>,
                      width: 65,
                      Expander: ({ isExpanded }) =>
                        <div>
                          {isExpanded
                            ? <span>&#x2299;</span>
                            : <span>&#x2295;</span>}
                        </div>,
                      style: {
                        cursor: "pointer",
                        fontSize: 25,
                        padding: "0",
                        textAlign: "center",
                        userSelect: "none"
                      },
                      Footer: () => <span></span>
                    }
                  ]
                }
              ]}
              defaultPageSize={20}
              filterable
              className="-striped -highlight"
              SubComponent={(row) => <div id="googleMap" style={{ width: 100 + '%', height:400+'px' }}>
                  <MapContainer google={this.props.googleProps}
                  address={row.original.address}
                  latitude={row.original.latitude}
                  longitude={row.original.longitude}/>
              </div>
              }
            />
        </div>
        );
    }
}

JobTable.propTypes = {
//  name: PropTypes.string
};
// named export
export {JobTable};
