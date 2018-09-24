import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  render() {

  if (!this.props.google) {
        return <div>Loading...</div>;
      }

    return (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%"
        }}
      >
        <Map style={{}} google={this.props.google} zoom={18} initialCenter={{lat: this.props.latitude, lng: this.props.longitude}}>
          <Marker
            onClick={this.onMarkerClick}
            position={{lat: this.props.latitude, lng: this.props.longitude}}
            icon={{
              path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
              scale: 5
            }}
            name={this.props.address}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h5>{this.state.selectedPlace.name}</h5>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}