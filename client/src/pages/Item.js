import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Apple from "../components/apple.jpg";
import { Modal } from "../components/Modal";
import Header1 from "../components/Header1";
import Header2 from "../components/Header2";
import LoadingIndicator from "../components/LoadingIndicator";
import { Toggle } from "../components/Toggle";

export default function Item () {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState();
  const [editingComment, setEditingComment] = useState();
  let userId = 'kimcoding';
  let dummy = {
    record: {
       category: 'category',
       image: 'image',
       title: 'title',
       time: 'time',
       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a varius mi. Fusce luctus faucibus lorem sit amet dictum. Integer ut bibendum sapien. Sed nibh purus, iaculis a tellus vel, consectetur mattis massa. Vestibulum ac sapien vestibulum neque pulvinar iaculis. Aliquam elementum, ipsum ac tempus tristique, libero dolor interdum metus, et cursus lectus magna vel dolor. Nullam felis mi, luctus non vulputate sit amet, volutpat at mi. Cras a mollis risus. Nunc id massa id sem tristique lacinia. Curabitur mattis orci eleifend neque feugiat commodo. Ut feugiat felis vitae felis porttitor ullamcorper. Fusce efficitur massa eget mi dapibus, quis feugiat velit pharetra. Sed ac eros malesuada, suscipit leo id, vestibulum tellus. Donec elit augue, ullamcorper eget sem nec, accumsan eleifend arcu. Duis bibendum neque eu nunc lacinia vestibulum. Nunc pretium sem in ipsum finibus, id tincidunt orci consectetur.',
       complete: 'complete'
     },
    comment : [
      {
        id: '1',
        userId: 'userId',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a varius mi. Fusce luctus faucibus lorem sit amet dictum. Integer ut bibendum sapien. Sed nibh purus, iaculis a tellus vel, consectetur mattis massa. Vestibulum ac sapien vestibulum neque pulvinar iaculis. Aliquam elementum, ipsum ac tempus tristique, libero dolor interdum metus, et cursus lectus magna vel dolor. Nullam felis mi, luctus non vulputate sit amet, volutpat at mi. Cras a mollis risus. Nunc id massa id sem tristique lacinia. Curabitur mattis orci eleifend neque feugiat commodo. Ut feugiat felis vitae felis porttitor ullamcorper. Fusce efficitur massa eget mi dapibus, quis feugiat velit pharetra. Sed ac eros malesuada, suscipit leo id, vestibulum tellus. Donec elit augue, ullamcorper eget sem nec, accumsan eleifend arcu. Duis bibendum neque eu nunc lacinia vestibulum. Nunc pretium sem in ipsum finibus, id tincidunt orci consectetur.',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
      {
        id: '2',
        userId: 'userId',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a varius mi. Fusce luctus faucibus lorem sit amet dictum. Integer ut bibendum sapien. Sed nibh purus, iaculis a tellus vel, consectetur mattis massa. Vestibulum ac sapien vestibulum neque pulvinar iaculis. Aliquam elementum, ipsum ac tempus tristique, libero dolor interdum metus, et cursus lectus magna vel dolor. Nullam felis mi, luctus non vulputate sit amet, volutpat at mi. Cras a mollis risus. Nunc id massa id sem tristique lacinia. Curabitur mattis orci eleifend neque feugiat commodo. Ut feugiat felis vitae felis porttitor ullamcorper. Fusce efficitur massa eget mi dapibus, quis feugiat velit pharetra. Sed ac eros malesuada, suscipit leo id, vestibulum tellus. Donec elit augue, ullamcorper eget sem nec, accumsan eleifend arcu. Duis bibendum neque eu nunc lacinia vestibulum. Nunc pretium sem in ipsum finibus, id tincidunt orci consectetur.',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      }
    ],
  };
  const handleArticleEdit = () => {
    navigate(`/record`);
  }
  const handleArticleDeletion = () => {
    axios
    .delete(`https://localhost:4000/records/:${1}`)
    .then(res => res.json())
    .catch(err => console.log(err));
  }
  const handleTextValue = (e) => {
    setText(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.type === 'keypress' && e.code === 'Enter') {
      handleSubmitButton()
    }
  }
  const handleSubmitButton = () => {
    if (editingComment) {
      axios
      .patch(`https://localhost:4000/records/:${1}/comments/:${editingComment}`)
      .then(setEditingComment());
    } else {
      axios
      .post(`https://localhost:4000/records/:${1}/comments`,
      text)
      .then(res => res.json())
      .catch(err => console.log(err));
    }
  }
  const handleCommentEdit = (commId) => {
    setEditingComment(commId);
    setText(dummy.comment.filter(comm => comm.id === commId)[0].content);
  }
  const handleCommentDeletion = (id) => {
    axios
    .delete(`https://localhost:4000/records/:${1}/comments/:${id}`)
  }
  return (
    <center>
      <div className="background">
        <Header1 />
        <Header2 />
        { isLoading ? <LoadingIndicator /> :
          <div className="current-post">
            <div className="article">
              <div className="article-left">
                <h1 className="title">{dummy.record.title}</h1>
                <img
                  className="thumbnail"
                  src={Apple}
                  alt='thumbnail'
                />
              </div>
              <div className="article-right">
                { /* userId === dummy.record.poster */ true ?
                <div className="btns btns-article">
                  <Toggle />
                  <button className="btn btn-revise" onClick={handleArticleEdit}>
                    수정
                  </button>
                  <Modal className="btn btn-delete" handleArticleDeletion={handleArticleDeletion}>
                    삭제
                  </Modal>
                </div> : '' }
                <p className="poster">
                  {dummy.record.poster}poster
                </p>
                <p className="district">
                  {dummy.record.district}district
                </p>
                <p className="content">
                  {dummy.record.content}
                </p>
              </div>
            </div>
            <div className="comment">
              <div className="write-comment">
                <textarea className='ip-comment' type='text' onChange={handleTextValue} onKeyPress={handleKeyPress}>
                  {text}
                </textarea>
                <button className="btn btn-post-comment" type="submit" onClick={handleSubmitButton}>등록</button>
              </div>
              <div className="comment-list">
                {dummy.comment.map((ele, index) => {
                  return (
                    <ul
                      key={index}
                      className="comment"
                    >
                      <p className="infos infos-comment">
                        <span className="comm-userId">{ele.userId}</span>
                        <span className="comm-createdAt">{ele.createdAt}</span>
                        <span className="comm-updatedAt">{ele.updatedAt}</span>
                      </p>
                      { /* userId === ele.userId */ true ?
                      <div className="btns btns-comment">
                        <button className="btn btn-edit-comment" onClick={() => handleCommentEdit(ele.id)}>수정</button>
                        <button className="btn btn-delete-comment" onClick={handleCommentDeletion(ele.id)}>삭제</button>
                      </div> : '' }
                      <div className="text-comment">{ele.content}</div>
                    </ul>
                  );
                })}
              </div>
            </div>
          </div>
        }
      </div>
    </center>
  );
}