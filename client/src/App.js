import { Routes, Route } from "react-router-dom";
import { Switch } from "react-dom";
import "./App.css";
import "./index.css"
import styled from "styled-components";
import Footer from "./components/footer";
import LoginForm from "./components/Log_in_Form";
import HomePage from "./components/Home_page";
import SignUp from "./components/Sign_up_Form";
import LandingPage from "./components/Landing_page";
import GameTablesList from "./components/Game_tables_list";
import Leaderboard from "./components/Leaderboard";
import UserInfo from "./components/User_information";
import ActiveGame from "./components/Active_Game_Table";
import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./components/Nav_bar";

const Container = styled.div``;

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [games, setGames] = useState([]);

  // stay logged in function
  useEffect(() => {
    fetch("/auth").then((res) => {
      if (res.ok) {
        res
          .json()
          .then((player) => {
            // setIsAuthenticated(true);
            setCurrentPlayer(player);
          })
          .then(() => {
            fetch("/games")
              .then((res) => res.json())
              .then((games) => {
                console.log("games:", games);
                setGames(games);
              });
          });
      }
    });
  }, []);

  // logging out
  function onLogOut() {
    setCurrentPlayer(null);
  }

  return (
    <Container>
      <Routes>
        <Route path="/" element={<ActiveGame/>}></Route>
      </Routes>
      <Footer/>
    </Container>
  );
}

export default App;
