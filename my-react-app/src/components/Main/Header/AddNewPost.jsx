import React, { Component } from 'react'

class AddNewPost extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       note: {
        title: "",
        body: "",
        timestamp: this.props.timestamp
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.submitNote = this.submitNote.bind(this)
    this.cancelNote = this.cancelNote.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState((prevNote) => ({
      note: {
        ...prevNote.note,
        [name]: value, // name can be either "title" or "body"
        timestamp: this.props.timestamp // set the timestamp to be the data retrieved from Main.js
      }
    }));
  }

  submitNote(event) {
    // this.props.onAdd(this.state.note);
    this.props.add(this.state.note)
    this.setState({
      note: {
        title: "",
        body: "",
      }
    });
    event.preventDefault();
  }

  cancelNote(event) {
    this.setState({
      note: {
        title: "",
        body: "",
      }
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form>
        <div className="shareTop">
          <input
            name="title"
            onChange={(event) => this.handleChange(event)}
            value={this.state.note.title}
            placeholder="Title"
          />
          <textarea
            name="body"
            onChange={(event) => this.handleChange(event)}
            value={this.state.note.body}
            placeholder="Post your thoughts..."
            rows="3"
          />
        </div>
        <div className="shareBotton">
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
          ></input>
        </div>
        <button onClick={(event) => this.submitNote(event)}>
          Post
        </button>
        <button onClick={(event) => this.cancelNote(event)}>
          Cancel
        </button>
      </form>
      </div>
    )
  }
}

export default AddNewPost