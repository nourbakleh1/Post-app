import { Table } from "react-bootstrap";
import PostListItem from "./PostListItem";

const PostList = ({ data,deletePosts,dispatch,isLoggedin }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th style={{ width: "70%" }}>Title</th>
          <th style={{ width: "10%" }}></th>
        </tr>
      </thead>
      <tbody>
        <PostListItem data={data} deletePosts={deletePosts} isLoggedin={isLoggedin} dispatch={dispatch}/>
      </tbody>
    </Table>
  );
};

export default PostList;