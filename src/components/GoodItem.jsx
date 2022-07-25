import { useEffect, useState } from "react";
import errImage from "../images/image_icon.png";

export default function GoodItem(props) {
  const { id, description, full_background, name, price, addToBasket } = props;
  const [url, setUrl] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [addCard, setAddCard] = useState(false);

  useEffect(() => {
    fetch(full_background)
      .then(() => {
        setUrl(full_background);
        setDisabledBtn(false);
      })
      .catch(() => {
        setUrl(errImage);
        setDisabledBtn(true);
      });
  }, []);

  return (
    <div className="card m-2 p-2" id={id} style={{ width: "18rem" }}>
      <img
        src={url}
        className="card-img-top GoodItem-img"
        alt="image_not_found"
      />
      <div className="card-body position-relative">
        <h4 className="card-text">{name}</h4>
        <p className="text-start">{description}</p>
        <div className="position-absolute position-absolute bottom-0 start-50 translate-middle-x w-100 border-top pt-2">
          <button
          onClick={()=>addToBasket({id, name, price})}
            disabled={disabledBtn}
            className="btn btn-success float-start"
          >
            BUY
          </button>
          <span className="h5 float-end">{price}$</span>
        </div>
      </div>
    </div>
  );
}
