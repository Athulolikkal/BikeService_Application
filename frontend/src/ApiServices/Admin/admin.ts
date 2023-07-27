import axios from "axios";
const BASE_URL = "http://localhost:3000/api/admin";
const instance = axios.create({
  baseURL: BASE_URL,
});

export const addServiceData = async (
  name: string,
  rate: string,
  details: string
) => {
  try {
    const isServicesAdded = await instance.post("/addservices", {
      name,
      rate,
      details,
    });
    return isServicesAdded?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllServices = async () => {
  try {
    const getAllServices = await instance.get("/allservices");
    return getAllServices?.data;
  } catch (err) {
    console.log(err);
  }
};

export const editService = async (
  serviceId: string | undefined,
  name: string,
  rate: string,
  details: string
) => {
  try {
    const editService = await instance.put("/editservice", {
      serviceId,
      name,
      rate,
      details,
    });
    return editService?.data;
  } catch (err) {
    console.log(err);
  }
};

export const removeService = async (serviceId: string|undefined) => {
  try {
    const removeServiceData = await instance.patch("/removeservice", {
      serviceId,
    });
    return removeServiceData?.data;
  } catch (err) {
    console.log(err);
  }
};
