import React from "react";
import { Card } from "react-bootstrap";

const IMG_API= "https://image.tmdb.org/t/p/w1280";
const Movie = ({ title, poster_path, description }) => {
  
  return (
      <div className="movie">
    <Card style={{ width: "18rem", cursor: "pointer" }}>
      <Card.Img variant="top" src={IMG_API + poster_path} alt="movie_poster" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
    </div>
  );
};

export default Movie;