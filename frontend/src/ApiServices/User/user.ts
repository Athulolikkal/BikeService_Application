import axios from "axios";
const BASE_URL = "http://localhost:3000/api/user";
const instance = axios.create({
  baseURL: BASE_URL,
});

export const bookNOw = async (
  userId: string | undefined,
  userName: string | undefined,
  email: string | undefined,
  serviceId: string | undefined,
  serviceName: string | undefined,
  rate: string | undefined,
  date: string | undefined
) => {
  try {
    const bookTheUser = await instance.post("/servicebooking", {
      userId,
      userName,
      serviceId,
      serviceName,
      rate,
      email,
      date,
    });
    return bookTheUser?.data;
  } catch (err) {
    console.log(err);
  }
};

export const findUserBookingById = async (userId: string | undefined) => {
  try {
    const userBookings = await instance.get(
      `/userbookingsbyid?userId=${userId}`
    );
    return userBookings?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllBookings = async () => {
  try {
    const allBookings = await instance.get("/allbookings");
    return allBookings?.data;
  } catch (err) {
    console.log(err);
  }
};

export const changeBookingStatus = async (
  bookingId: string | undefined,
  value: string
) => {
  try {
    const changeStatus = await instance.patch("/changestatus", {
      bookingId,
      value,
    });
    return changeStatus?.data;
  } catch (err) {
    console.log(err);
  }
};
