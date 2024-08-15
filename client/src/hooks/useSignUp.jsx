import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import { BASE_URL } from "../utils/constants";

const useSignin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "Male",
  });
  const [errors, setErrors] = useState();
  const [requestSent, setRequestSent] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullname) {
      newErrors.noFullname = "Field in required!";
    }

    if (!formData.username) {
      newErrors.noUsername = "Field in required!";
    }

    if (!formData.password) {
      newErrors.noPassword = "Field in required!";
    }

    if (!formData.confirmPassword) {
      newErrors.noConfirmPassword = "Field in required!";
    }

    if (!formData.gender) {
      newErrors.noGender = true;
    }

    if (formData.password.trim() != formData.confirmPassword.trim()) {
      newErrors.noMatchingPasswords = "Password doesn't match!";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length == 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRequestSent(true);
    console.log('here');
    if (validate()) {
      try {
        const user = {
          fullName: formData.fullname,
          username: formData.username,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          gender: formData.gender,
        };

        const res = await axios.post(
          `${BASE_URL}/api/user/register`,
          user,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if(res.data.success){
          toast.success(res.data.message);
          navigate('/signin')
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }

    }
    setRequestSent(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!(name == "confirmPassword" && formData.password === "")) {
      setFormData((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
    }
  };

  return {
    formData,
    errors,
    requestSent,
    handleChange,
    handleSubmit,
  };
};

export default useSignin;
