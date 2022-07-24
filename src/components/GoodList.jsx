import GoodItem from "./GoodItem";

export default function GoodList(props) {
  const { goods = [] } = props;

  if(!goods.length){
    return <h3>Nothing here</h3>
  }

  return (
    <div className="container row m-2">
      {goods.map((item)=>(
        <GoodItem key={item.id} {...item} />
      ))}
    </div>
  );
}
