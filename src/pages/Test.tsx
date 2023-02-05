import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';

const Test = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get(
        'http://localhost:5000/api/transactions'
      );
      setPosts(response.data);
      console.log(response.data);
    };
    getPosts();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <ul className='flex flex-col text-center mt-10'>
        {currentPosts.map((post: any) => {
          return (
            <li key={post._id} className='border-2'>
              {post.detail}
            </li>
          );
        })}
      </ul>
      <Pagination
        totalPosts={posts.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Test;
