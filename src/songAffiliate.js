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
      <Container>
        <div>
          <label for="name">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="name"
          />
        </div>
        <div>
          <label for="role">Role:</label>
          <input
            type="text"
            name="role"
            placeholder="Role"
            required
            className="role"
          />
        </div>
        <div>
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
      </Container>
    );
  }
}

export default SongAffiliate;
