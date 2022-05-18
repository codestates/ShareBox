import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Apple from "../components/apple.jpg";
import { Modal } from "../components/Modal";
import Header1 from "../components/Header1";
import Header2 from "../components/Header2";
import LoadingIndicator from "../components/LoadingIndicator";
import { Toggle } from "../components/Toggle";

export default function Item(props) {
  /* const accessToken = ; */
  const [isLoading, setIsLoading] = useState(true);
  const [record, setRecord] = useState(null);
  const [post , setPost] = useState({
    title : '',
    image : '',
    category : '',
    content : '',
    country : '' }
  );
  const [preview, setPreview] = useState(null);
  // const { records, comments } = record;
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [text, setText] = useState();
  const [editingComment, setEditingComment] = useState();

  let userId = "kimcoding";
  let dummy = {
    record: {
      category: "category",
      image: "image",
      title: "title",
      time: "time",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a varius mi. Fusce luctus faucibus lorem sit amet dictum. Integer ut bibendum sapien. Sed nibh purus, iaculis a tellus vel, consectetur mattis massa. Vestibulum ac sapien vestibulum neque pulvinar iaculis. Aliquam elementum, ipsum ac tempus tristique, libero dolor interdum metus, et cursus lectus magna vel dolor. Nullam felis mi, luctus non vulputate sit amet, volutpat at mi. Cras a mollis risus. Nunc id massa id sem tristique lacinia. Curabitur mattis orci eleifend neque feugiat commodo. Ut feugiat felis vitae felis porttitor ullamcorper. Fusce efficitur massa eget mi dapibus, quis feugiat velit pharetra. Sed ac eros malesuada, suscipit leo id, vestibulum tellus. Donec elit augue, ullamcorper eget sem nec, accumsan eleifend arcu. Duis bibendum neque eu nunc lacinia vestibulum. Nunc pretium sem in ipsum finibus, id tincidunt orci consectetur.",
      complete: "complete",
    },
    comment: [
      {
        id: "1",
        userId: "userId",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a varius mi. Fusce luctus faucibus lorem sit amet dictum. Integer ut bibendum sapien. Sed nibh purus, iaculis a tellus vel, consectetur mattis massa. Vestibulum ac sapien vestibulum neque pulvinar iaculis. Aliquam elementum, ipsum ac tempus tristique, libero dolor interdum metus, et cursus lectus magna vel dolor. Nullam felis mi, luctus non vulputate sit amet, volutpat at mi. Cras a mollis risus. Nunc id massa id sem tristique lacinia. Curabitur mattis orci eleifend neque feugiat commodo. Ut feugiat felis vitae felis porttitor ullamcorper. Fusce efficitur massa eget mi dapibus, quis feugiat velit pharetra. Sed ac eros malesuada, suscipit leo id, vestibulum tellus. Donec elit augue, ullamcorper eget sem nec, accumsan eleifend arcu. Duis bibendum neque eu nunc lacinia vestibulum. Nunc pretium sem in ipsum finibus, id tincidunt orci consectetur.",
        createdAt: "createdAt",
        updatedAt: "updatedAt",
      },
      {
        id: "2",
        userId: "userId",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a varius mi. Fusce luctus faucibus lorem sit amet dictum. Integer ut bibendum sapien. Sed nibh purus, iaculis a tellus vel, consectetur mattis massa. Vestibulum ac sapien vestibulum neque pulvinar iaculis. Aliquam elementum, ipsum ac tempus tristique, libero dolor interdum metus, et cursus lectus magna vel dolor. Nullam felis mi, luctus non vulputate sit amet, volutpat at mi. Cras a mollis risus. Nunc id massa id sem tristique lacinia. Curabitur mattis orci eleifend neque feugiat commodo. Ut feugiat felis vitae felis porttitor ullamcorper. Fusce efficitur massa eget mi dapibus, quis feugiat velit pharetra. Sed ac eros malesuada, suscipit leo id, vestibulum tellus. Donec elit augue, ullamcorper eget sem nec, accumsan eleifend arcu. Duis bibendum neque eu nunc lacinia vestibulum. Nunc pretium sem in ipsum finibus, id tincidunt orci consectetur.",
        createdAt: "createdAt",
        updatedAt: "updatedAt",
      },
    ],
  };

  // 
  let { id } = useParams();
  /* console.log(id); */
  const getRecords = () => {
    axios
      .get(`http://localhost:4000/records/${id}`)
      .then(res => {
        setRecord(res.data.data)
        setIsLoading(false)
      })
      .catch(err => console.log(err));
  }

  const handleArticleEdit = () => {
    setIsEditingArticle(true);
  };
  const handleArticleDeletion = () => {
    const token =
      "a";
    axios
      .delete(`http://localhost:4000/records/${id}`, { headers: { authorization: `Bearer ${token}` } })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };
  const handleArticleEditComplete = () => {
    const token =
      "a";
    axios.put(`http://localhost:4000/records/${id}`, {
      title: post.title,
      image: post.image,
      content: post.content,
      category: post.category,
      country: post.country,
      }, { headers: { authorization: `Bearer ${token}` } })
    .then(res => console.log(res))
    .catch((err) => console.log(err.response));
  }
  const handleInputValue = (key) => (e) => {
    setPost({ ...post, [key]: e.target.value });
    if (key === 'image'){
      const file = e.target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = function (e){
        console.log(e.target.result)
        setPreview(e.target.result)
        setPost({ ...post, [key]: e.target.result })
      }
    }
  }
  const handleTextValue = (e) => {
    setText(e.target.value);
  }
  const handleKeyPress = (e) => {
    if (e.type === "keypress" && e.code === "Enter") {
      handleSubmitButton();
    }
  }

  const handleSubmitButton = () => {
    const token = 'a';
    if (editingComment) {
      axios.patch(`http://localhost:4000/comments/${editingComment}`, { content: text }, { headers: { authorization: `Bearer ${token}` } })
        .then(res => console.log(res))
        .then(setEditingComment())
        .then(setText(''))
        .catch(err => console.log(err));
    } else {
      axios
        .post(`http://localhost:4000/comments`, { content: text }, { headers: { authorization: `Bearer ${token}` } })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };


  const handleCommentEdit = (commId) => {
    const token =
      "a";
    setEditingComment(commId);
    setText(record.comments.filter((comm) => comm.commentsId === commId)[0].content);
  };


  const handleCommentDeletion = (commId) => {
    axios.delete(`http://localhost:4000/comments/${commId}`)
    .then(res => console.log(res));
  };

  useEffect(() => {
    getRecords();
  }, []);
  useEffect(() => {
    console.log(editingComment)
  }, [editingComment]);
  return (
    <center>
      <div className="background">
        <Header1 />
        <Header2 signedIn={props.signedIn} handleLogout={props.handleLogout} />
        {isLoading ? (
          <LoadingIndicator />
        ) : ( /* 'Hello, World!' */
          <div className="current-post">
            <div className="article">
              <div className="article-left">
                { isEditingArticle ?
                [<input key={1} className="title" value={record.record.title} onChange={handleInputValue}></input>,
                <input key={2} type="file" accept='image/*' onChange={handleInputValue('image')}/>]
                : [<h1 key={1} className="title">{record.record.title}</h1>,
                <img key={2} className="thumbnail" src={Apple} alt="thumbnail" />]}
              </div>
              <div className="article-right">
                {
                  true ? (
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
                { isEditingArticle ?
                [<input key={1} className="poster-editing" /* value={record.record} onChange={handleInputValue} */ />,
                <input key={2} className="district-editing" value={record.record.country} onChange={handleInputValue} />,
                <textarea key={3} className="content-editing" value={record.record.content} onChange={handleInputValue} />,
                <button key={4} className="btn btn-article-edit-complete" onClick={() => handleArticleEditComplete}>수정 완료</button>]
                : [<p key={1} className="poster">{record.record.poster}poster</p>,
                <p key={2} className="district">{record.record.district}district</p>,
                <p key={3} className="content">{record.record.content}</p>]}
              </div>
            </div>
            <div className="comment">
              <div className="write-comment">
                <textarea className='ip-comment' type='text' value={text} onChange={handleTextValue} onKeyPress={handleKeyPress} />
                <button className="btn btn-post-comment" type="submit" onClick={() => handleSubmitButton}>
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
                      {
                        true ? (
                          <div className="btns btns-comment">
                            <button
                              className="btn btn-edit-comment" onClick={() => {
                                handleCommentEdit(ele.commentsId);
                              }}
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