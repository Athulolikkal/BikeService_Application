import axios from "axios";
const BASE_URL = "http://localhost:3000/api/auth";
const instance = axios.create({
  baseURL: BASE_URL,
});

export const userSignup = async (
  name: string,
  email: string,
  password: string,
  phonenumber: number
) => {
  try {
    const isUserSignedUp = await instance.post("/usersignup", {
      name,
      email,
      password,
      phonenumber,
    });
    return isUserSignedUp?.data;
  } catch (err) {
    console.log(err);
  }
};

export const userLogin = async (email: string, password: string) => {
  try {
    const isUserLogin = await instance.post("/userlogin", { email, password });
    return isUserLogin?.data;
  } catch (err) {
    console.log(err);
  }
};

export const adminLogin = async (email: string, password: string) => {
  try {
    const adminLogin = await instance.post("/adminlogin", { email, password });
    return adminLogin?.data;
  } catch (err) {
    console.log(err);
  }
};
