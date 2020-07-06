import React, { Component } from "react";
// import Header from "./Header";
// import Footer from "./Footer";
// import Menu from "./Menu";
// import Content from "./Content";
// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Dashboard from "./components/dashboard/Dashboard";
import Social from "./components/social/Social";
import Profilepage from "./components/profile/profile";
import SearchPageResult from "./components/social/SearchResult";
import AddAccount from "./components/profile/AddAccount";

import { BrowserRouter, Route } from "react-router-dom";
import Register from "./components/Register";
import ViewConnection from "./components/profile/ViewConnection";
import AllUsers from "./components/profile/AllUsers";
import AddNewTrades from "./components/trades/AddNewTrades";
import ShowUserForTrade from "./components/trades/ShowUserForTrade";
import Login from "./components/login";

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/socialpage" component={Social} />
          <Route exact path="/profile" component={Profilepage} />
          <Route exact path="/profile/:id" component={Profilepage} />
          <Route path="/searchResult" component={SearchPageResult} />
          <Route path="/addAccount" component={AddAccount} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/viewConnection" component={ViewConnection} />
          <Route path="/users" component={AllUsers} />
          <Route path="/trade" component={AddNewTrades} />
          <Route path="/showUser" component={ShowUserForTrade} />
        </BrowserRouter>
      </div>
    );
  }
}
