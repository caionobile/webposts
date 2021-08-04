import React from "react";
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
`;

function CommentCard({ data }) {
  return (
    <Card>
      <div className="wrapper">
        <div className="header">
          <div>User</div>
          <div>
            {data.createdAt
              ? dateFormater(data.createdAt)
              : dateFormater(new Date())}
          </div>
        </div>
        <div className="body">{data.commentBody}</div>
      </div>
    </Card>
  );
}

export default CommentCard;
