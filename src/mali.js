import React, { useState, useEffect, useCallback, useRef } from "react";

import { debounce } from "./utils";
import axios from "axios";
import "./App.less";

const PENDING = "PENDING";
const EMPTY = "EMPTY";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";

const cardDataList = [
  {
    brandName: "弄堂里",
    brandLogo:
      "https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*anNdQqA_I_AAAAAAAAAAAAAAARQnAQ",
    distanceDesc: "500m",
    campImage:
      "https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*U29sSqgeU-4AAAAAAAAAAAAAARQnAQ",
    promoLogo: [
      "https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*y6CTRo9L2oEAAAAAAAAAAAAAARQnAQ",
      "https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*Q1d4SIoeKRkAAAAAAAAAAAAAARQnAQ",
    ],
    voucherDesc: "弄堂里14元超值优惠券包x2",
    benefitAmount: "1",
    oriPriceAmount: "28",
    discountDesc: "0.6折",
    voucherStockNum: "库存888份",
  },
  {
    brandName: "弄堂里",
    brandLogo:
      "https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*anNdQqA_I_AAAAAAAAAAAAAAARQnAQ",
    distanceDesc: "500m",
    campImage:
      "https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*U29sSqgeU-4AAAAAAAAAAAAAARQnAQ",
    promoLogo: [
      "https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*Q1d4SIoeKRkAAAAAAAAAAAAAARQnAQ",
    ],
    voucherDesc: "弄堂里14元超值优惠券包x2",
    benefitAmount: "1",
    discountDesc: "0.6折",
  },
  {
    brandName: "飞猪",
    brandLogo:
      "https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*dCL5Q4oBaQsAAAAAAAAAAAAAARQnAQ",
    campImage:
      "https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*MZ7VSaNZXRYAAAAAAAAAAAAAARQnAQ",
    promoLogo:
      "https://gw.alipayobjects.com/mdn/rms_7527d7/afts/img/A*90WEQLmnKdkAAAAAAAAAAAAAARQnAQ",
    voucherDesc: "南方航空20元优惠券",
    benefitAmount: "20",
  },
];

const Card = (props) => {
  const { data } = props;
  const tickRef = useRef(10);
  const [tick, setTick] = useState(10);
  const [rushed, setRushed] = useState(false);
  const [hasRequest, setHasRequest] = useState(false)

  function request() {
    setHasRequest(true)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setHasRequest(false)
        resolve();
      }, 1000);
    });
  }

  function onRush() {
    if (tick !== 0 || rushed || hasRequest) return;
    request().then(() => {
      setRushed(true);
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTick(--tickRef.current);
      if (tickRef.current === 0) {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="card">
      <div className="card-left">
        <div className="card-left-title">
          <img src={data.brandLogo} alt="" />
          <div>{data.brandName}</div>
          <div className="distance">{data.distanceDesc}</div>
        </div>
        <div className="card-left-content">
          <img src={data.campImage} alt="" className="camp-img" />
          <div className="card-content-right">
            <div className="promo-logo">
              {typeof data.promoLogo === "string" ? (
                <img className="logo-item" src={data.promoLogo} />
              ) : (
                data.promoLogo.map((logo) => (
                  <img className="logo-item" src={logo} alt="" />
                ))
              )}
            </div>
            <div className="desc">{data.voucherDesc}</div>
            <div className="price">
              <div className="benefit">{data.benefitAmount}元</div>
              {data.oriPriceAmount && (
                <div className="old-price">{data.oriPriceAmount}元</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="card-right">
        <div className="discount">{data.discountDesc}</div>
        <div className="button" onClick={onRush}>
          {!!tick ? tick : rushed ? "已抢购" : "抢购"}
        </div>
        <div className="stock">{data.voucherStockNum}</div>
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      {cardDataList.map((data) => (
        <Card data={data} />
      ))}
    </>
  );
}

export default App;
