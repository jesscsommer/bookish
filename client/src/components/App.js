import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import AuthForm from "./account/AuthForm";
import BookCard from "./books/BookCard";
import Header from "./building_blocks/Header";

const App = () => {
  return (
    <div className="app">
      <Header />
      {/* <AuthForm /> */}
      <BookCard />
    </div>
  )
}

export default App
