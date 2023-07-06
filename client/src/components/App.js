import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import AuthForm from "./account/AuthForm";

const App = () => {
  return (
    <div className="app">
      <AuthForm />
    </div>
  )
}

export default App
