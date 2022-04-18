import React, { useState, useEffect, useCallback } from "react";

import { debounce } from "./utils";
import axios from "axios";
import "./App.less";

const PENDING = "PENDING";
const EMPTY = "EMPTY";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";

function App() {
  const [msg, setMsg] = useState({
    logo: "",
    name: "",
    qq: "",
  });
  const [status, setStatus] = useState(EMPTY);

  // get user info
  function getInfo(id) {
    setStatus(PENDING);
    axios
      .get("https://api.uomg.com/api/qq.info", {
        params: {
          qq: id,
        },
      })
      .then((res) => {
        if (res && res.data && res.data.code === 1) {
          setStatus(SUCCESS);
          const { qlogo, name, qq } = res.data;
          setMsg({
            qlogo,
            name,
            qq,
          });
        } else {
          setStatus(ERROR);
        }
      })
      .catch((err) => {
        setStatus(ERROR);
      });
  }

  // useCallback + debounce
  const debounceGetInfo = useCallback(debounce(getInfo), []);

  // search event
  const onSearch = (e) => {
    setStatus(PENDING);
    debounceGetInfo(e.target.value);
  };

  // User comp
  function User({ qlogo, name, qq }) {
    return (
      <div className="user">
        <img src={qlogo} alt="" />
        <div className="info">
          <div>{name}</div>
          <div>{qq}</div>
        </div>
      </div>
    );
  }

  // Empty comp
  function Empty({ desc }) {
    return <div className="empty">{desc}</div>;
  }

  const State = {
    PENDING: <Empty desc={"请求中..."} />,
    EMPTY: <Empty desc={"暂无数据"} />,
    ERROR: <Empty desc={"出错了!"} />,
    SUCCESS: <User {...msg} />,
  };

  return (
    <div className="app">
      <h2>QQ号查询</h2>
      <div className="search">
        QQ: <input onChange={onSearch} />
      </div>
      {State[status]}
    </div>
  );
}

export default App;
