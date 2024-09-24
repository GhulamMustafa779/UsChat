import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { BASE_URL } from "../utils/constants";

const useSignin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.noUsername = "Field is required!";
    }

    if (!formData.password) {
      newErrors.noPassword = "Field is required!";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length == 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const user = {
          username: formData.username,
          password: formData.password,
        };

        const res = await axios.post(`${BASE_URL}/api/user/login`, user, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (res?.status === 200 && document.cookie.includes("token")) {
          dispatch(setAuthUser(res?.data));
          navigate("/chat");
        } else {
          toast.error(res?.data?.message);
        }
      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useSignin;
