import axios from "axios";

export const syncUserWithBackend = async (email: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_DEV}/api/v1/signup`, {
      email: email,
    });
    console.log("User synced successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to sync user:", error);
  }
};