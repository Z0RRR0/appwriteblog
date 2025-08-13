import React, {useState, useEffect} from 'react'
import service from '../appwrite/config'
import { Postcard, Container } from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getPosts().then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    }).catch((err) => {
        console.error('Failed to fetch posts', err)
    })
    }, [])
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Postcard {...post} />
                    </div>
            ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts