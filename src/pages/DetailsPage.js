import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";

import { getMovieDetail } from "../api/api-service";
const IMG_API = "https://image.tmdb.org/t/p/w500";

const DetailsPage = () => {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getMovieDetail(movieId).then((resp) => {
      //metodumuzu kullanarak istek yolladık
      setMovie(resp.data);
      //gelen datayı movie degiskenimize atadık
      //obje seklinde.
    });
  }, []);

  const returnBack = () => {
    navigate(-1);
  };
  const { title, overview, vote_average, release_date } = movie;
  return (
    <div className="movie-detail">
      <Container>
        <Row>
          <Col className="col-img" lg={7}>
            <div className="div-img">
              <img src={IMG_API + movie.poster_path} alt={movie.title} />
            </div>
          </Col>

          <Col className="col-details" lg={5}>
            <div className="details">
              <ul>
                <li className="title">
                  <h3>{title}</h3>{" "}
                </li>
                <li>{overview}</li>
                <li>IMDB Vote: {vote_average}</li>
                <li>Release Date: {release_date}</li>
              </ul>
              <div className="conteiner-button">
                <button className="return-button" onClick={returnBack}>
                  <FaArrowCircleLeft /> &nbsp; Return
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailsPage;