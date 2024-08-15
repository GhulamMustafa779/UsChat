import { useEffect } from 'react';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import {setChat} from '../redux/chatSlice'
import { BASE_URL } from './../utils/constants';

const useGetMessages = () => {

    const {chatParticipant} = useSelector(store=>store.chat)
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchMessages = async() =>{
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/message/${chatParticipant?._id}`);
                dispatch(setChat(res.data))
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();
    },[chatParticipant])
}

export default useGetMessages