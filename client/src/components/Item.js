import { Link } from "react-router-dom"

function Item (props) {

  return (
    <div>
      <img alt={props.title} src={props.img} />
      
      <Link to = {`/`} >
       {/*  해당 상품 페이지로 보내야 함 */}
        <span>`{props.region} / {props.title} / {props.createdAt}</span>
      </Link>
      

    </div>
  )
}

export default Item