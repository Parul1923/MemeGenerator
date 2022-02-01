import React from "react";
import "./styles.css";

class MemeImg extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "",
      allMemeImgs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //ensure that data is fetched at the beginning
    fetch("https://api.imgflip.com/get_memes") //call to URL
      .then((response) => response.json()) //turn promise into JS object
      .then((response) => {
        const { memes } = response.data; //pull memes array from response.data
        console.log(memes[0]);
        this.setState({ allMemeImgs: memes }); // set allMemeImgs state
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Hello");
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randMemeImg = this.state.allMemeImgs[randNum].url;
    this.setState({ randomImg: randMemeImg });
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="top">Top Text</label>
            <input
              type="text"
              name="topText"
              value={this.state.topText}
              onChange={this.handleChange}
              className="top"
              autoComplete="off"
            />
            <br />
            <label htmlFor="bottom">Bottom Text</label>
            <input
              type="text"
              name="bottom"
              value={this.state.bottom}
              onChange={this.handleChange}
              className="bottom"
              autoComplete="off"
            />
            <br />
          </div>
          <button>Generate</button>
        </form>
        <div className="meme">
          {this.state.randomImg === "" ? (
            ""
          ) : (
            <img src={this.state.randomImg} alt="meme" />
          )}
          {this.state.randomImg === "" ? (
            ""
          ) : (
            <h2 className="top">{this.state.topText}</h2>
          )}
          {this.state.randomImg === "" ? (
            ""
          ) : (
            <h2 className="bottom">{this.state.bottom}</h2>
          )}
        </div>
      </div>
    );
  }
}

export default MemeImg;
