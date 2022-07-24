import { useState, useEffect } from "react";
import GoodList from "../components/GoodList";
import Loader from "../components/Loader";
import { API_KEY, API_URL } from "../config";

export default function Shop() {
  // mahsulot
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadClass, setLoadClass] = useState("shop content container");

  useEffect(() => {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        data.featured && setGoods(data.featured);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loading
      ? setLoadClass("d-flex justify-content-center align-items-center content")
      : setLoadClass("shop content container");
  }, [loading]);

  return (
    <div className={loadClass}>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1>Shop</h1>
          <GoodList goods={goods} />
        </div>
      )}
    </div>
  );
}
