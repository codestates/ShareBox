// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Modal } from "./Modal";

// export default function CurrentPost (props) {
//   const { userId } = props.userinfo;
//   const data = props.record.data;
//   const commentList = props.record.comment;
//   const [text, setText] = useState();
//   const [editingComment, setEditingComment] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const handleTextValue = (e) => {
//     setText(e.target.value);
//   };
//   const handleEdit = () => {
//     navigate(`/records/:${props.recordsId}/edit`);
//   }
//   const handleDeletion = () => {
//     axios
//     .delete(`https://localhost:4000/records/:${props.recordsId}`)
//     .then(res => res.json())
//     .catch(err => console.log(err));
//   }
//   const handleCommentPost = () => {
//     axios
//     .post(`https://localhost:4000/records/:${props.recordsId}/comments`,
//     text)
//     .then(res => res.json())
//     .catch(err => console.log(err));

//     axios
//     .patch(`https://localhost:4000/records/:${props.recordsId}/comments/:${id}`,
//     text)
//   }
//   const handleCommentEdit = (id) => {
//     setEditingComment(true);
//   }
//   useEffect(() => {
//     setIsLoading(true);

//   }, [text]);
//   return (
//     <>
//       <div className="current-post">
//         <div className="article">
//           <h1 className="title">{data.title}</h1>
//           <img
//             className="thumbnail"
//             src={data.picture}
//             alt='thumbnail'
//           />
//           { userId === data.poster ? <div>
//           <button className="btn btn-revise" onClick={handleEdit}>
//             수정
//           </button>
//           <Modal className="btn btn-delete" handleDeletion={handleDeletion}>
//             삭제
//           </Modal>
//           </div> : '' }
//           <p className="poster">
//             {data.poster}
//           </p>
//           <p className="district">
//             {data.district}
//           </p>
//           <p className="content">
//             {data.content}
//           </p>
//         </div>
//         <div className="comment">
//           <div className="write-comment">
//             <textarea className='ip-comment' type='text' onChange={handleTextValue}>
//               {/* { editingComment ? } */}
//             </textarea>
//             <button className="btn btn-post-comment" type="submit" onClick={handleCommentPost}>댓글 등록</button>
//           </div>
//           <div className="comment-list">
//             {commentList.map((ele, index) => {
//               return (
//                 <li
//                   key={index}
//                 >
//                   <span>{ele.userId}</span>
//                   <span>{ele.createdAt}</span>
//                   <span>{ele.updatedAt}</span>
//                   <button className="btn btn-edit-comment" onClick={handleCommentEdit(ele.id)}>수정</button>
//                   <button className="btn btn-delete-comment" onClick={handleCommentDeletion}>삭제</button>
//                   <div>{ele.content}</div>
//                 </li>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
