import React, { Component } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";


export class SearchBar extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      searchText: ""
    }
  }

  setSearchText(event) {
      this.setState({
        searchText: event.target.value
      })
  }

  clickHandler() {
    let allPosts = this.props.allPosts
    let filteredPosts = allPosts.filter(post => {
      return post.body.toLowerCase().includes(this.state.searchText.toLowerCase())
  })
    this.props.filter(filteredPosts)
  }

  render() {
    return (
      <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Here"
        onChange={(e) => this.setSearchText(e)}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={() => {
          this.clickHandler()
        }}
      >
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
    )
  }
}

export default SearchBar