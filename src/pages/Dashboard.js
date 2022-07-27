import { useEffect, useState } from "react";
import {signOut} from 'firebase/auth';
import {auth} from '../firebase-config';
import {useNavigate, Link} from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';
import VoteButtons from "../components/VoteButtons";

function Dashboard() {
  const [userPostsArray, setUserPostsArray] = useState([]);

  let navigate = useNavigate();
  let isAuth = localStorage.getItem('isAuth');

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      isAuth = false;
      navigate('/');
    });
  };

  const myCollection = 'posts';

  useEffect(() => {
    const posts = onSnapshot(collection(db, myCollection), (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
      }
      });
      setUserPostsArray(documents);
    });
    return () => posts();
  }, [myCollection]);

  return (
    <div className="container flex flex-col">
        <div className="flex items-center w-screen h-24 justify-between px-10">
            {!isAuth && <div className='flex items-center justify-center h-screen w-screen'>
                <p className='text-blue-500 text-4xl'>Click <Link to='/sign-in' className='text-blue-900 font-bold hover:text-yellow-400'>here</Link> to sign in and begin adding image collections.</p>
                </div>}
            {isAuth && <Link to='/create-post' className='border-2 rounded border-blue-400 px-4 py-2 bg-blue-400 text-blue-50 font-bold hover:bg-blue-900'>+ Add Post</Link>}
            {isAuth && <button onClick={signUserOut} className='text-blue-400 flex flex-col items-center'>
                Logout
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='fill-blue-400 w-6'>
                <path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z"/>
                </svg>
            </button>}
        </div>
        <div>
            {isAuth && userPostsArray.map((userPost) => {
                return (
                    <div className="border-2 border-blue-700 w-1/2 mx-auto py-10 mb-4">
                        <div className="flex justify-between items-center">
                            <div key={userPost.id} className='flex flex-col items-center justify-center'>
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-4xl mb-4"><span className="text-blue-500 font-bold px-4">Title: </span>{userPost.title}</p>
                                    <p className="text-2xl mb-4"><span className="text-blue-500 font-bold px-4">Description: </span>{userPost.postText}</p>
                                </div>
                            </div>
                            <VoteButtons userPost={userPost} />
                        </div>
                    </div>
                )
            })}
        </div>  
    </div>
  )
}

export default Dashboard;