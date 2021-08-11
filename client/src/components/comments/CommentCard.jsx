import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dateFormater } from "../../functions/formaters";

const Card = styled.div`
  .wrapper {
    color: #15202b;
    margin: 5px;
    background-color: #dadada;
    border-radius: 5px;
  }
  .wrapper > * {
    margin: 0 7px 0 7px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    color: blue;
  }
  .body {
    align-items: flex-start;
    word-break: break-all;
  }
  #deleteCommentButton {
    display: none;
  }
  .wrapper:hover {
    #deleteCommentButton {
      display: inline;
    }
    #options {
      display: none;
    }
  }
`;

function CommentCard({ data, children }) {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(dateFormater(new Date()));
  }, [data]);

  return (
    <Card>
      <div className="wrapper">
        <div className="header">
          <div>{data.username}</div>
          <div className="test">
            {data.createdAt ? dateFormater(data.createdAt) : date}
            <span id="deleteCommentButton">{children}</span>
            <span id="options">{children ? <button>...</button> : null}</span>
          </div>
        </div>
        <div className="body">{data.commentBody}</div>
      </div>
    </Card>
  );
}

export default CommentCard;
