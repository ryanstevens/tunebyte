import React, { Component } from "react";
import TuneByteContract from "../build/contracts/TuneByte.json";
import getWeb3 from "./utils/getWeb3";
import Styled from "styled-components";
import PieChart from "react-simple-pie-chart";

import "./css/oswald.css";
import "./css/open-sans.css";
import "./css/pure-min.css";
import "./App.css";
import SongAffiliate from "./songAffiliate";

const Container = Styled.div`
    display: flex;
    width: 50vw;
    justify-content: space-around;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storageValue: 0,
      affiliates: 1,
      web3: null,
      slices: []
    };
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        });

        // Instantiate contract once web3 provided.
        this.instantiateContract();
      })
      .catch(() => {
        console.log("Error finding web3.");
      });
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require("truffle-contract");
    const tuneByte = contract(TuneByteContract);
    tuneByte.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    var tuneByteInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      tuneByte
        .deployed()
        .then(instance => {
          tuneByteInstance = instance;
          debugger;
          return 1;
          // return tuneByteInstance.get.call(accounts[0]);
        })
        .then(result => {
          // Update state with the result.
          return this.setState({ storageValue: result.c[0] });
        });
    });
  }

  submitContract = () => {
    console.log("");
  };

  componentDidMount() {
    this.updateSlices();
  }

  updateSlices = () => {
    let sliceState = [];
    let slices = document.getElementsByClassName("shares");
    let counter = 0;
    for (let node of slices) {
      sliceState.push({
        color: this.props.colors[counter],
        value: parseInt(node.value)
      });
      counter++;
    }
    this.setState({ slices: sliceState });
  };
  addMember = e => {
    e.preventDefault();
    let prev = this.state.affiliates;
    this.setState({ affiliates: prev + 1 });
    this.updateSlices();
  };

  render() {
    const affiliates = new Array(this.state.affiliates);
    affiliates.fill(<SongAffiliate update={this.updateSlices} />);
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">
            TuneByte - A musical Journey
          </a>
        </nav>

        <main className="container">
          <div>
            <div className="pure-u-1-1">
              <h1>Define Your Terms!</h1>
              <h3>The Split</h3>
            </div>
            <div style={{ height: "10rem", width: "10rem" }}>
              <PieChart slices={this.state.slices} />
            </div>

            <form>
              <h2>Song Affiliates</h2>
              <div className="songAffiliates">{affiliates}</div>
              <button onClick={this.addMember}>Add Member</button>

              <h2>Song Info</h2>
              <Container className="songInfo">
                <div>
                  <label for="song">Song Title:</label>
                  <input type="text" name="song" placeholder="Role" required />
                </div>

                <div>
                  <label for="songcode">Song Code:</label>
                  <input
                    type="text"
                    name="songcode"
                    placeholder="Role"
                    required
                  />
                </div>
              </Container>
              <button onSubmit={this.submitContract}>Create Contract</button>
            </form>
          </div>
        </main>
      </div>
    );
  }
}

export default App;

App.defaultProps = {
  colors: [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "Darkorange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen"
  ]
};
