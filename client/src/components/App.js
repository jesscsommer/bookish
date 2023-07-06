import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import AuthForm from "./account/AuthForm";
import BookCard from "./books/BookCard";
import Buttons from "./building_blocks/Buttons";
import DeleteButton from "./building_blocks/DeleteButton";
import EditButton from "./building_blocks/EditButton";
import Error from "./building_blocks/Error";
import Header from "./building_blocks/Header";

const App = () => {
  return (
    <div className="app">
      <Header />
      {/* <AuthForm /> */}
      <BookCard />
      <EditButton />
      <DeleteButton />
      <Buttons /> 
      <Error />
    </div>
  )
}

export default App
