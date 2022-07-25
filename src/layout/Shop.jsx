import { useState, useEffect } from "react";
import BasketList from "../components/BasketList";
import Cart from "../components/Cart";
import GoodList from "../components/GoodList";
import Loader from "../components/Loader";
import { API_KEY, API_URL } from "../config";
import { toast } from "react-toastify";

export default function Shop() {
  // mahsulot
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadClass, setLoadClass] = useState("shop content container");
  const [order, setOrder] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false);

  function removeToBasket(item) {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };

      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          
          return {
            ...orderItem,
            quantity: orderItem.quantity - 1,
          };
        } else {
          return orderItem;
        }
      });
      setOrder(newOrder);
    }
    if(order.quantity < 0){
      setOrder(0)
    }
    toast.error("Remove 1 item");
  }

  const addToBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };

      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });
      setOrder(newOrder);
    }
    toast.success("Goods added to basket successfully");
  };

  const handleBasketShow = () => {
    setBasketShow(!isBasketShow);
  };
  useEffect(() => {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
      method: "GET",
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

  function removeFromBasket(itemID) {
    const newOrder = order.filter((item) => item.id !== itemID);
    setOrder(newOrder);
    toast.error("Goods deleted from basket successfully");
  }

  return (
    <div className={loadClass}>
      <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1>Shop</h1>
          <GoodList goods={goods} addToBasket={addToBasket} />
        </div>
      )}
      {isBasketShow && (
        <BasketList
          addToBasket={addToBasket}
          order={order}
          removeFromBasket={removeFromBasket}
          handleBasketShow={handleBasketShow}
          removeToBasket={removeToBasket}
        />
      )}
    </div>
  );
}
