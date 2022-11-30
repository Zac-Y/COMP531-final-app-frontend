import { Grid } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import Container from "@mui/material/Container";
import AddNewPost from "../Header/AddNewPost";
import NewPost from "../Header/NewPost";
import OldPost from "./OldPost";
import React, { Component } from "react";

export class Contents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
    };

    this.addNote = this.addNote.bind(this);
  }

  addNote(newNote) {
    this.setState((prevNotes) => ({
      notes: [...prevNotes.notes, newNote],
    }));
  }

  render() {
    return (
      <div>
        {/* <AddNewPost onAdd={this.addNote} /> */}
        <AddNewPost add={this.props.add} timestamp={this.props.timestamp} />

        {/* {this.state.notes.map((noteItem, index) => {
          return (
            <NewPost
              key={index}
              id={index}
              title={noteItem.title}
              body={noteItem.content}
            />
          );
        })} */}
        <Container sx={{ py: 1 }} maxWidth="md">
          <Grid container spacing={4}>
            {/* {JSON.parse(localStorage.getItem("posts")).map((p) => { */}

            {[]
              .concat(this.props.filteredPosts)
              .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
              .map((p, index) => {
                {/* console.log(p) */}
                return (
                  <Grid key={index} item xs={12} sm={6} md={4}>
                    <OldPost id={p.id} title={p.title} body={p.body} />
                  </Grid>
                );
              })}

            {/* {this.props.filteredPosts.map((p, index) => {
              console.log(p)
              return (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <OldPost id={p.id} title={p.title} body={p.body} />
                </Grid>
              );
            })} */}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Contents;
