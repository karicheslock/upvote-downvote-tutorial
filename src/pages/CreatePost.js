import { useState, useEffect } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function CreatePost() {

    const [title, setTitle] = useState('');
    const [postText, setPostText] = useState('');

    let navigate = useNavigate();

    const isAuth = localStorage.getItem('isAuth');

    const isInvalid = title === '' || postText === '';

    const createPost = async (event) => {
        event.preventDefault();

        const postsRef = collection(db, 'posts');

        try {
            await addDoc(postsRef, {
                title,
                postText,
                author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
                upVotesUsers: [],
                downVotesUsers: [],
                created: Timestamp.now(),
                updated: Timestamp.now(),
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handlePostTextChange = (event) => {
        setPostText(event.target.value);
    }


    useEffect(() => {
        if (!isAuth) {
            navigate("/sign-in");
        }
    }, [isAuth, navigate])

  return (
    <div className='container flex flex-col items-center justify-center h-screen'>
        <div className='flex flex-col justify-center'>
            <div className='flex flex-col border-4 border-blue-900 p-4 bg-gray-100 w-full mx-auto'>
                <label className='mb-2 text-xl text-blue-900 font-bold'>Title:</label>
                <input aria-label='Enter a title' placeholder='Title...' onChange={handleTitleChange} className='text-xl p-2 rounded' />
                <label className='mb-2 mt-2 text-xl text-blue-900 font-bold'>Post:</label>
                <textarea aria-label='Enter your post' placeholder="Post... (max 250 characters)" onChange={handlePostTextChange} className='text-xl p-2 h-24 rounded mb-4' maxLength={250} />
                <button onClick={createPost} className={`border-2 rounded border-blue-800 px-4 py-1 bg-blue-900 text-blue-50 text-xl font-bold hover:bg-blue-500 w-fit mx-auto ${isInvalid && 'cursor-not-allowed opacity-50'}`}>Create Post</button>
                <button onClick={() => navigate('/')} className='text-red-500 font-bold mt-2 hover:text-red-700'>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default CreatePost;