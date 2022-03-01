import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getPopularMovies, searchMovies } from "../api/api-service";
import Movie from "../component/Movie";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    //

    if (searchTerm) {
      searchMovies(searchTerm).then((resp) => {
        // searchMovies metodunu cagir bu metod input da girilen degeri parametre olarak gönderip
        // ona uygun verileri dondursun.
        setMovies(resp.data.results);
        // database den gelen response icindeki result degerini movies degiskenimize atadık.
        setSearchTerm("");
        //input a girilen degeri sildik
      });
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const checkDetail = (id) => {
    console.log(id);
    navigate(`/movie/${id}`);
  };

  useEffect(() => {
    getPopularMovies()
      .then((resp) => {
        // getPopularMovies metodunu calistirdik
        console.log(resp.data.results);
        setMovies(resp.data.results);
        // bize databaseden gelen result datasını movies degiskenine atadık
      })
      .catch((err) => {
        console.log("populer hatasi");
      });
  }, []);

  return (
    <div className="movies">
      <div className="conteiner-search">
        <form className="search-group" onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="text"
            autoFocus="autofocus"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
          <button className="btn-search" type="submit">
            Search
          </button>
        </form>
      </div>
      <Container>
        <Row>
          {movies.length > 0 &&
            movies.map((item) => (
              //movies listemiz ya sayfa ilk acildigindaki(useEffect)getPopularMovies() metodu ile
              //populer filmlerle doluyor
              //ya da search ile searchMovies() metodu ile aranan kriterlere uygun filmlerle doluyor
              <Col className="m-3" onClick={() => checkDetail(item.id)}>
                {/*  her bir elemanına tıklandıgında checkDetail() metodunu elemanın id sini  
          gondererek calistiracak */}

                <Movie key={item.id} {...item} />
                {/* movie componentimizi icine listemizi acıp cagirdik
                gerekli parametreleri icinden alıp card icinde goruntuleyecek*/}
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default MoviesPage;