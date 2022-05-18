import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Apple from "../components/apple.jpg";
import { Modal } from "../components/Modal";
import Header1 from "../components/Header1";
import Header2 from "../components/Header2";
import LoadingIndicator from "../components/LoadingIndicator";

export default function Item(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoaidng] = useState(false);
  


  console.log(props)

  //const [data, setData] = useState();
  const [text, setText] = useState();
  const [editingComment, setEditingComment] = useState();

  const handleArticleEdit = () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsInVzZXJJZCI6ImN5czExMTEiLCJlbWFpbCI6IjQ1NjdAZGF1bS5DT00iLCJjb3VudHJ5Ijoi7Iah7YyM6rWsIiwibW9iaWxlIjoiMDEwMTIzNDU2NzgiLCJpYXQiOjE2NTI4MDA1NDAsImV4cCI6MTY1Mjg4Njk0MH0.ICeDeDFR2Ol8MQUReMWZ4AbDqqMAgmTtLGI29mPQHhw";
    axios
      .put(
        `http://localhost:4000/records/1`,
        {
          title: `test`,
          image: `test`,
          content: `test`,
          category: `냉장`,
          country: `강남구`,
          complete: 0,
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.data));
  };
  const handleArticleDeletion = () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsInVzZXJJZCI6ImN5czExMTEiLCJlbWFpbCI6IjQ1NjdAZGF1bS5DT00iLCJjb3VudHJ5Ijoi7Iah7YyM6rWsIiwibW9iaWxlIjoiMDEwMTIzNDU2NzgiLCJpYXQiOjE2NTI4MDA1NDAsImV4cCI6MTY1Mjg4Njk0MH0.ICeDeDFR2Ol8MQUReMWZ4AbDqqMAgmTtLGI29mPQHhw";
    axios
      .delete(`http://localhost:4000/records/2`, { headers: { authorization: `Bearer ${token}` } })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  };
  const handleTextValue = (e) => {
    setText(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.type === "keypress" && e.code === "Enter") {
      handleSubmitButton();
    }
  };
  const handleSubmitButton = () => {
    if (editingComment) {
      axios
        .patch(`https://localhost:4000/records/:${1}/comments/:${editingComment}`)
        .then(setEditingComment());
    } else {
      axios
        .post(`https://localhost:4000/records/:${1}/comments`, text)
        .then((res) => res.json())
        .catch((err) => console.log(err));
    }
  };
  const handleCommentEdit = (commId) => {
    setEditingComment(commId);
    setText(dummy.comment.filter((comm) => comm.id === commId)[0].content);
  };
  const handleCommentDeletion = (id) => {
    axios.delete(`https://localhost:4000/records/:${1}/comments/:${id}`);
  };

  return (
    <center>
      <div className="background">
        <Header1 />
        <Header2 />
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <div className="current-post">
            <div className="article">
              <div className="article-left">
                <h1 className="title">{dummy.record.title}</h1>
                <img className="thumbnail" src={Apple} alt="thumbnail" />
              </div>
              <div className="article-right">
                {
                  /* userId === dummy.record.poster */ true ? (
                    <div className="btns btns-article">
                      <button className="btn btn-revise" onClick={handleArticleEdit}>
                        수정
                      </button>
                      <button className="btn btn-delete" onClick={handleArticleDeletion}>
                        삭제
                      </button>
                    </div>
                  ) : (
                    ""
                  )
                }
                <p className="poster">{dummy.record.poster}poster</p>
                <p className="district">{dummy.record.district}district</p>
                <p className="content">{dummy.record.content}</p>
              </div>
            </div>
            <div className="comment">
              <div className="write-comment">
                <textarea className='ip-comment' type='text' value={text} onChange={handleTextValue} onKeyPress={handleKeyPress}>
                </textarea>
                <button className="btn btn-post-comment" type="submit" onClick={handleSubmitButton}>
                  등록
                </button>
              </div>
              <div className="comment-list">

                {dummy.comment.map((ele, index) => {
                  return (
                    <ul key={index} className="comment">
                      <p className="infos infos-comment">
                        <span className="comm-userId">{ele.userId}</span>
                        <span className="comm-createdAt">{ele.createdAt}</span>
                        <span className="comm-updatedAt">{ele.updatedAt}</span>
                      </p>
                      {
                        /* userId === ele.userId */ true ? (
                          <div className="btns btns-comment">
                            <button
                              className="btn btn-edit-comment" /* onClick={handleCommentEdit(ele.id)} */
                            >
                              수정
                            </button>
                            <button
                              className="btn btn-delete-comment"
                              onClick={handleCommentDeletion(ele.id)}
                            >
                              삭제
                            </button>
                          </div>
                        ) : (
                          ""
                        )
                      }
                      <div className="text-comment">{ele.content}</div>

                    </ul>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </center>
  );
}
