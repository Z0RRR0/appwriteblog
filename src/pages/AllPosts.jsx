import React, {useState, useEffect} from 'react'
import service from '../appwrite/config'
import { Postcard, Container } from '../components'
import { useSelector } from 'react-redux';


function AllPosts() {
  const userData = useSelector((state) => state.auth.userData);
  const currentUserId = userData?.$id;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // track posts loadingsession is ready

  useEffect(() => {

    if (!currentUserId) return;
    service.getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch posts', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentUserId]);

  // Wait until userData is loaded
  if (!currentUserId) {
    return (
      <div className='w-full py-8'>
        <Container>
          <p>Loading user info...Please Refresh</p>
        </Container>
      </div>
    );
  }

  const userPosts = posts.filter(post => post && post.userId === currentUserId);

  return (
    <div className='w-full py-8'>
      <Container>
        {loading ? (
          <p>Loading posts...</p>
        ) : (
          <div className='flex flex-wrap'>
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <div key={post.$id} className="p-2 w-1/4">
                  <Postcard {...post} />
                </div>
              ))
            ) : (
              <p>No posts to show.</p>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts