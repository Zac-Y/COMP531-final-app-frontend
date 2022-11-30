import React from "react";
import {
  Typography,
  CardMedia,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";

function OldPost(post) {
  return (
    <div>
      <Card
        variant="outlined"
        style={{ width: "100%" }}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <CardMedia
          component="img"
          image="https://picsum.photos/300/200"
          alt="random img"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {post.id}
            {post.title}
            
          </Typography>
          <Typography>{post.body}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="large">
            Edit
          </Button>
          <Button variant="contained" size="large">
            Comment
          </Button>
        </CardActions>
        <Typography>This is comment 1</Typography>
        <Typography>This is comment 2</Typography>
        <Typography>This is comment 3</Typography>
      </Card>
    </div>
  );
}

export default OldPost;
