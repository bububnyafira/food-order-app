import axios from "axios";

export const getDishes = (callback) => {
  axios
    .get("http://localhost:5000/api/dishes")
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
};
