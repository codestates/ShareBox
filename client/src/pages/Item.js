/* 
게시글 수정 취소 추가
*/
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Header1 from "../components/Header1";
import Header2 from "../components/Header2";
import LoadingIndicator from "../components/LoadingIndicator";
import Category from "../components/Category";

const Image = styled.img`
  width: 500px;
  height: 300px;
`;

axios.defaults.withCredentials = true;

export default function Item(props) {
  /* const accessToken = ; */
  const [cookies, setCookie, removeCookie] = useCookies(["access"]);
  const [isLoading, setIsLoading] = useState(true);
  const [record, setRecord] = useState(null);
  const [post, setPost] = useState({
    title: "",
    complete: false,
    category: "",
    content: "",
    country: "",
    image: "",
  });
  const [preview, setPreview] = useState(null);
  // const { records, comments } = record;
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [text, setText] = useState();
  const [editingComment, setEditingComment] = useState();

  //
  let { id } = useParams();
  const getRecords = () => {
    axios
      .get(`http://localhost:4000/records/${id}`)
      .then((res) => {
        setRecord(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleArticleEdit = () => {
    setIsEditingArticle(true);
  };

  const handleArticleDeletion = () => {
    axios
      .delete(`http://localhost:4000/records/${id}`, { withCredentials: true })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };
  const handleArticleEditComplete = () => {
    const formData = new FormData();
    formData.append("image", post.image, post.image.name);
    axios
      .put(
        `http://localhost:4000/records/${id}`,
        {
          title: post.title,
          content: post.content,
          complete: !!post.complete,
          category: "신선",
          country: post.country,
          image: post.image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };
  const handleInputValue = (key) => (e) => {
    setPost({ ...post, [key]: e.target.value });
    if (key === "image") {
      // const file = e.target.files[0];
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // console.log(reader.readAsDataURL(file));
      const files = e.target.files[0];
      setPost({ ...post, [key]: files });
      // reader.onload = function (e) {
      //   console.log(e.target.result);
      //   setPreview(e.target.result);
      //   setPost({ ...post, [key]: e.target.result });
      // };
    }
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
        .patch(
          `http://localhost:4000/comments/${editingComment}`,
          { content: text },
          { withCredentials: true }
        )
        .then((res) => console.log(res))
        .then(setEditingComment())
        .then(setText(""))
        .catch((err) => console.log(err));
    } else {
      axios
        .post(
          `http://localhost:4000/comments/${id}`,
          { content: `${text}` },
          { withCredentials: true }
        )
        .then((res) => console.log(res))
        .then(setText(""))
        .catch((err) => console.log(err));
    }
  };

  const handleCommentEdit = (commId) => {
    setEditingComment(commId);
    setText(record.comments.filter((comm) => comm.commentsId === commId)[0].content);
  };

  const handleCommentDeletion = (commId) => {
    axios.delete(`http://localhost:4000/comments/${commId}`).then((res) => console.log(res));
  };

  useEffect(() => {
    getRecords();
  }, [record]);

  /* useEffect(() => {
    console.log(editingComment);
  }, [editingComment]);

  useEffect(() => {
    console.log(isEditingArticle);
  }, [isEditingArticle]); */
  /* console.log(record);
  }, [record]); */

  return (
    <center>
      <div className="background">
        <Header1 />
        <Header2
          handleInputValue={props.handleInputValue}
          handleKeyPress={props.handleKeyPress}
          handleSearch={props.handleSearch}
          data={props.data}
          handleLogout={props.handleLogout}
        />
        <Category
          name={["냉동", "신선", "양곡", "축산", "수산", "음료", "스낵", "가공식품", "조미료"]}
          handleCategory={props.handleCategory}
        />
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          /* 'Hello, World!' */
          <div className="current-post">
            {/* ====================게시글 영역=============================== */}
            <div className="article">
              <div className="article-left">
                {isEditingArticle
                  ? [
                      <input
                        key={1}
                        className="title"
                        placeholder={record.record.title}
                        value={post.title}
                        onChange={handleInputValue("title")}
                      ></input>,
                      <input
                        key={2}
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleInputValue("image")}
                        required
                        multiple
                      />,
                    ]
                  : [
                      <h1 key={1} className="title">
                        {record.record.title}
                      </h1>,
                      <Image
                        key={2}
                        src={record.record.image}
                        className="thumbnail"
                        alt="thumbnail"
                      />,
                    ]}
              </div>
              <div className="article-right">
                <div className="btns btns-article">
                  <label>
                    나눔 완료
                    <input
                      type="checkbox"
                      v-model="toggle"
                      name="complete"
                      onClick={handleInputValue("complete")}
                    />
                  </label>
                  <button className="btn btn-revise" onClick={handleArticleEdit}>
                    수정
                  </button>
                  <button className="btn btn-delete" onClick={handleArticleDeletion}>
                    삭제
                  </button>
                </div>
                {isEditingArticle
                  ? [
                      <div>
                        <label for="district-editing">거래 지역 :</label>
                        <input
                          key={1}
                          className="district-editing"
                          onChange={handleInputValue("country")}
                        />
                      </div>,
                      <div>
                        <label for="content-editing">상세 내용 :</label>
                        <textarea
                          key={2}
                          className="content-editing"
                          placeholder={record.record.content}
                          onChange={handleInputValue("content")}
                        />
                      </div>,

                      <button
                        key={3}
                        className="btn btn-article-edit-complete"
                        onClick={handleArticleEditComplete}
                      >
                        수정 완료
                      </button>,
                      <button
                        key={5}
                        className="btn btn-article-edit-cancel"
                        onClick={() => {
                          setIsEditingArticle(false);
                        }}
                      >
                        수정 취소
                      </button>,
                    ]
                  : [
                      <p key={1} className="poster">
                        {record.record.userId}
                      </p>,
                      <p key={2} className="district">
                        거래 지역
                      </p>,
                      <p key={3} className="content">
                        {record.record.content}
                      </p>,
                    ]}
              </div>
            </div>
            {/* =================================================== */}
            <div className="comment">
              <div className="write-comment">
                <textarea
                  className="ip-comment"
                  type="text"
                  value={text}
                  onChange={handleTextValue}
                  onKeyPress={handleKeyPress}
                />
                <button className="btn btn-post-comment" type="submit" onClick={handleSubmitButton}>
                  등록
                </button>
              </div>
              <div className="comment-list">
                {record.comments.map((ele, index) => {
                  return (
                    <ul key={index} className="comment">
                      <p className="infos infos-comment">
                        <span className="comm-userId">{ele.userId}</span>
                        <span className="comm-createdAt">{ele.createdAt}</span>
                        <span className="comm-updatedAt">{ele.updatedAt}</span>
                      </p>
                      <div className="btns btns-comment">
                        <button
                          className="btn btn-edit-comment"
                          onClick={() => handleCommentEdit(ele.commentsId)}
                        >
                          수정
                        </button>
                        <button
                          className="btn btn-delete-comment"
                          onClick={() => handleCommentDeletion(ele.commentsId)}
                        >
                          삭제
                        </button>
                      </div>
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
