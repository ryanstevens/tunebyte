import React, { Component } from "react";
import Styled from "styled-components";

const Container = Styled.div`
    display: flex;
    width: 60rem;
    justify-content: space-around;
`;

class SongAffiliate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = () => {
    this.props.update();
  };

  render() {
    return (
      <Container data-aos="zoom-in-up" data-aos-delay="200">
        <div data-aos="zoom-in-right">
          <label for="name">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="name"
          />
        </div>
        <div data-aos="zoom-in-right" data-aos-delay="400">
          <label for="role">Role:</label>
          <input
            type="text"
            name="role"
            placeholder="Role"
            required
            className="role"
          />
        </div>
        <div data-aos="zoom-in-right" data-aos-delay="600">
          <label for="shares">Shares:</label>
          <input
            type="number"
            name="shares"
            required
            defaultValue={1}
            min={0}
            className="shares"
            onChange={this.handleChange}
          />
        </div>
        <div data-aos="zoom-in-right" data-aos-delay="800">
          <label for="shares">Public Key:</label>
          <input
            type="text"
            name="key"
            required
            placeholder="Key"
            className="key"
            onChange={this.handleChange}
          />
        </div>        
      </Container>
    );
  }
}

export default SongAffiliate;
