import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";
import { BASE_URL } from "../utils/constants";

const useGetAllUsers = () => {
  const dispatch = useDispatch();
  const [isSet, setIsSet] = useState(false);
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${BASE_URL}/api/user/`);
        if (res.data) {
          dispatch(setOtherUsers(res.data));
          setIsSet(true);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers();
  }, []);

  return {
    isSet,
  };
};

export default useGetAllUsers;
