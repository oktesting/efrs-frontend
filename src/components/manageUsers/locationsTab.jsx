import React, { Component } from "react";

class LocationsTab extends Component {
  renderlocationInfo(label, data) {
    return (
      <div className="form-group row">
        <label className="col-4 col-form-label">{label}</label>
        <div className="col-8">
          <input
            placeholder={label}
            value={data}
            className="form-control here"
            type="text"
            disabled
          />
        </div>
      </div>
    );
  }

  renderLocationCard(data) {
    return (
      <div>
        <form>
          <div>
            {this.renderlocationInfo("Address", data.address)}
            {this.renderlocationInfo("Latitude", data.lat)}
            {this.renderlocationInfo("Longtitude", data.lng)}
            {this.renderlocationInfo("Province", data.province)}
            {this.renderlocationInfo("District", data.district)}
          </div>
        </form>
      </div>
    );
  }

  render() {
    const { locations } = this.props;
    return (
      <div className="col myShadow">
        <div className="mt-3">
          <h4>User Locations</h4>
        </div>
        <hr />
        {locations != null && locations.length !== 0 ? (
          <div>
            {locations.map((item, i) => (
              <div key={i}>
                <h4>Location {i + 1}</h4>
                {this.renderLocationCard(item)}
                <hr />
              </div>
            ))}
          </div>
        ) : (
          <h6> There is no provided location </h6>
        )}
      </div>
    );
  }
}

export default LocationsTab;
