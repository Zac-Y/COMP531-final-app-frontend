import React, { Component } from "react";
import UserProfile from "./Sidebar/UserProfile/UserProfile";
import Contents from "./Contents/Contents";
import SideBar from "./Sidebar/Sidebar";
import SearchBar from "./SearchBar/SearchBar";

export class Main extends Component {
  constructor(props) {
    super(props);

    // console.log(JSON.parse(localStorage.getItem("userObject")))
    this.state = {
      // posts: JSON.parse(localStorage.getItem("posts"))
      allPosts: [],
      userPosts: [],
      // addedPosts: [],
      filteredPosts: [],
      friends: [],
      allUsers: null,
      timestamp: 0,
    };

    this.filterPosts = this.filterPosts.bind(this);
    this.addPosts = this.addPosts.bind(this);
    // this.sortPosts = this.sortPosts.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
    this.fetchFriendPosts = this.fetchFriendPosts.bind(this);
  }

  componentDidMount = () => {
    this.fetchUserPosts();
    this.fetchFriends();
    this.fetchAllUsers();
  };

  fetchFriends() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => {
        let currFriends = [];
        json.forEach((friend) => {
          let curUser = JSON.parse(localStorage.getItem("userObject"));
          if (
            friend.id == (curUser.id + 1) % 10 ||
            friend.id == (curUser.id + 2) % 10 ||
            friend.id == (curUser.id + 3) % 10
          ) {
            currFriends.push(friend);
          }
        });
        this.setState({ friends: currFriends });
      });
  }

  fetchUserPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => {
        let currentPosts = [];
        let curUser = JSON.parse(localStorage.getItem("userObject"));
        json.forEach((post) => {
          if (post.userId == curUser.id) {
            post.timestamp = this.state.timestamp; // add a timestamp property to the post object
            this.setState((prevState) => ({
              timestamp: prevState.timestamp + 1,
            }));
            // console.log(post)
            currentPosts.push(post);
          }
        });
        this.setState({
          allPosts: currentPosts,
          userPosts: currentPosts,
          filteredPosts: currentPosts,
        });
      });
  }

  fetchFriendPosts(friend) {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => {
        let friendPosts = [];
        json.forEach((post) => {
          if (post.userId == friend.id) {
            post.timestamp = this.state.timestamp; // add a timestamp property to the post object
            this.setState((prevState) => ({
              timestamp: prevState.timestamp + 1,
            }));
            friendPosts.push(post);
          }
        });

        friendPosts.map((post) => { // need to iterate through b/c friendPosts is an array
          this.setState((prevState) => ({
            filteredPosts: [...prevState.filteredPosts, post],
            allPosts: [...prevState.allPosts, post]
          }));
        })
        
      });
  }

  fetchAllUsers() { // fetch all users for add follower check
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => {
        // console.log(json)
        this.setState({ allUsers: json });
      });
  }

  filterPosts(filteredPosts) {
    this.setState({
      filteredPosts: filteredPosts,
    });
  }

  addPosts(addedPosts) {
    // console.log(this.state.timestamp)
    this.setState((prevState) => ({
      // addedPosts: [...prevState.addedPosts, addedPosts],
      filteredPosts: [...prevState.filteredPosts, addedPosts],
      allPosts: [...prevState.allPosts, addedPosts],
      timestamp: prevState.timestamp + 1
    }));
  }


  addFriend(inputName) {
    // let addedFriend = {
    //   // id: 4, // need to be changed to avoid duplicates
    //   username: inputName,
    //   company: {
    //     catchPhrase: "This is a status headline",
    //   },
    // };

    let addedFriend = null;
    let friendExists = false;
    this.state.allUsers.forEach((user) => {
      if (user.username == inputName) {
        addedFriend = user;
        friendExists = true;
      }
    });

    if (friendExists) {
      this.setState((prevState) => ({
        friends: [...prevState.friends, addedFriend],
      }));
      // TODO: add this friend's posts
      this.fetchFriendPosts(addedFriend)
    } else { // friend not in JSON
      alert("User does not exist")
    }

    // this.setState((prevState) => ({
    //   friends: [...prevState.friends, addedFriend],
    // }));
  }

  deleteFriend(index) {
    // DO NOT use splice b/c in React, you should never mutate the state directly
    // https://stackoverflow.com/questions/36326612/how-to-delete-an-item-from-state-array
    // console.log(this.state.friends)
    this.setState({
      friends: this.state.friends.filter((_, i) => i != index),
    });

    let deletedFriend = this.state.friends.filter((_, i) => i == index)[0]
    console.log(deletedFriend)
    console.log()

    this.setState({
      filteredPosts: this.state.filteredPosts.filter(function(post) {
        return post.userId != deletedFriend.id
      }),
      allPosts: this.state.allPosts.filter(function(post) {
        return post.userId != deletedFriend.id
      })
    });


    // console.log(index)
    // let allFriends = this.state.friends
    // console.log(allFriends)
    // console.log(allFriends[index])
    // let deletedFriends = allFriends.splice(index, 1)
    // console.log(deletedFriends)
    // this.setState({
    //   friends: deletedFriends
    // })
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <div>
              <UserProfile />
            </div>
            <div>
              <h4>Following Friends</h4>
              <SideBar
                allFriends={this.state.friends}
                add={this.addFriend}
                delete={this.deleteFriend}
              />
            </div>
          </div>
        </div>

        <div>
          <div>
            <div>
              <SearchBar
                allPosts={this.state.allPosts}
                filter={this.filterPosts}
              />
            </div>
            <div>
              <h4>New Post</h4>
              <Contents
                filteredPosts={this.state.filteredPosts}
                allPosts={this.state.allPosts}
                // addedPosts={this.state.addedPosts}
                timestamp={this.state.timestamp}
                add={this.addPosts}
              />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
