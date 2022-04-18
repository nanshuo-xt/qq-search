import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "./utils";
import axios from "axios";
import "./App.css";

function App() {
  const [msg, setMsg] = useState({
    logo: "",
    name: "",
    qq: "",
  });
  const [loading, setLoading] = useState(false);

  const debounceSearch = useCallback(
    debounce((e) => {
      console.log("e", e.target.value);
      getInfo(e.target.value);
    }),
    []
  );

  function getInfo(id = "774740085") {
    axios
      .get("https://api.uomg.com/api/qq.info", {
        params: {
          qq: id,
        },
      })
      .then((res) => {
        console.log("res", res);
        const { qlogo, name, qq } = res.data;
        setMsg({
          qlogo,
          name,
          qq,
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  return (
    <div className="app">
      <h2>QQ号查询</h2>
      <div className="search">
        QQ：
        <input onChange={debounceSearch} />
      </div>
      <div className="user">
        <img src={msg.qlogo} alt=""/>
        <div className="info">
          <div>{msg.name}</div>
          <div>{msg.qq}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
