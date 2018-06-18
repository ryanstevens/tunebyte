import React, { Component } from "react";
import TuneByteContract from "../build/contracts/TuneByte.json";
import getWeb3 from "./utils/getWeb3";
import Styled from "styled-components";
import PieChart from "react-simple-pie-chart";
import ParticleEffectButton from "react-particle-effect-button";
import AOS from "aos";

import "aos/dist/aos.css";
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
      slices: [],
      hidden: false
    };

    logTuneInstance();


  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

  }


  componentDidMount() {
    this.updateSlices();
    this.aos = AOS;
    this.aos.init();
    this.aos.refresh();
  }

  componentDidUpdate() {
    this.aos = AOS;
    this.aos.refresh();
  }

  submitContract = e => {
    e.preventDefault();
    let payload = {
      shares: [],
      names: [],
      roles: [],
      keys: [],
      songCode: 0,
      songTitle: ""
    };
    let htmlShares = document.getElementsByClassName("shares");
    for (let node of htmlShares) {
      payload.shares.push(parseInt(node.value, 10));
    }

    let htmlNames = document.getElementsByClassName("name");
    for (let node of htmlNames) {
      payload.names.push(node.value);
    }

    let htmlRoles = document.getElementsByClassName("role");
    for (let node of htmlRoles) {
      payload.roles.push(node.value);
    }

    let keys = document.getElementsByClassName("key");
    for (let node of keys) {
      payload.keys.push(node.value);
    }

    payload.songCode = parseInt(
      document.getElementsByClassName("songCode")[0].value, 10
    );

    payload.songTitle = document.getElementsByClassName("songTitle")[0].value;
 //   debugger;
    this.setState({ payload: payload, hidden: false });

    getTuneInstance(function(err, tuneByteInstance, accounts) {
      let keys = payload.keys
      let shares = payload.shares
      tuneByteInstance.addPayee(keys, shares, {from: accounts[0]})
        .then((result) => {
          console.log("DONE", arguments);
          logTuneInstance();
        })
    });

  };


  updateSlices = () => {
    let sliceState = [];
    let slices = document.getElementsByClassName("shares");
    let counter = 0;
    for (let node of slices) {
      sliceState.push({
        color: this.props.colors[counter],
        value: parseInt(node.value, 10)
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
        <nav
          className="navbar pure-menu pure-menu-horizontal"
          data-aos="fade"
          data-aos-delay="600"
        >
          <a href="#" className="pure-menu-heading pure-menu-link">
            TuneByte - Musical Revenue Sharing Made Simple
          </a>
        </nav>

        <main
          className="container"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div>
            <div className="pure-u-1-1" data-aos="fade-right">
              <h1>Define Your Terms!</h1>
              <h3>The Split</h3>
            </div>
            <div style={{ height: "10rem", width: "10rem" }} data-aos="fade-up">
              <PieChart slices={this.state.slices} />
            </div>

            <form onSubmit={this.submitContract}>
              <h2 data-aos="zoom-in-up" data-aos-delay="200">
                Song Affiliates
              </h2>
              <div className="songAffiliates">{affiliates}</div>
              <br />
              <button
                onClick={this.addMember}
                data-aos="zoom-in-up"
                data-aos-delay="200"
              >
                Add Member
              </button>

              <h2 data-aos="fade-up">Song Info</h2>
              <Container className="songInfo" data-aos="fade-up">
                <div>
                  <label for="song">Song Title:</label>
                  <input
                    type="text"
                    name="song"
                    placeholder="Role"
                    required
                    className="songTitle"
                  />
                </div>

                <div>
                  <label for="songcode">Song Code:</label>
                  <input
                    type="text"
                    name="songcode"
                    placeholder="Role"
                    required
                    className="songCode"
                  />
                </div>
              </Container>
              <br />
              <ParticleEffectButton
                color="#121019"
                hidden={this.state.hidden}
                data-aos="fade-up"
              >
                <button>Create Contract</button>
              </ParticleEffectButton>
            </form>
          </div>
        </main>
      </div>
    );
  }
}

// Declaring this for later so we can chain functions on SimpleStorage.
let tuneByteInstance = null;
let accounts=null;
function getTuneInstance(cb) {
  if (tuneByteInstance) {
    return cb(null, tuneByteInstance, accounts);
  }

  const contract = require("truffle-contract");
  const tuneByte = contract(TuneByteContract);

  getWeb3
    .then(results => {
      const web3 = results.web3;
      tuneByte.setProvider(web3.currentProvider);

      web3.eth.getAccounts((error, _accounts) => {
        accounts = _accounts;
        console.log("ACOUNTS", accounts);
        tuneByte
          .deployed()
          .then(instance => {
            tuneByteInstance = instance;
            cb(null, tuneByteInstance, accounts);
          })
      });

    });
      
}

function logTuneInstance() {
  getTuneInstance(function(err, tuneByteInstance, accounts) {
      tuneByteInstance.getPayees.call().then((payees) => {
        console.log("PAYEES", payees);
        payees.forEach((payee) => {
          tuneByteInstance.getShares.call(payee).then((share) => console.log("share for "+payee, share.c[0]));
        })
      });
  });
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
