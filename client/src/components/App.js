import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import AuthForm from "./account/AuthForm";
import BookCard from "./books/BookCard";

const App = () => {
  return (
    <div className="app">
      {/* <AuthForm /> */}
      <BookCard />
    </div>
  )
}

export default App
