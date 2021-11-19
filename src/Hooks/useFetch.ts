import axios from "axios";
import { useState, useEffect } from "react";
import { ApiResponse, ApiPostResponse } from ".";

const initialState: ApiResponse = {
  items: [],
  isLoading: true,
  error: false,
};

const postInitialState: ApiPostResponse = {
  ...initialState,
  message: "",
};

const useFetchGet = (url: string, refreshing: boolean) => {
  const [data, setData] = useState<ApiResponse>(initialState);
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData({ items: response.data.data, isLoading: false, error: false });
      })
      .catch((err) => {
        setData({ items: [], isLoading: false, error: err.message });
      });
  }, [refreshing]);

  return { ...data };
};

const useFetchPost = (url: string, body: object, refreshing: boolean) => {
  const [data, setData] =
    useState<ApiPostResponse>(postInitialState);
  useEffect(() => {
    axios
      .post(url, JSON.stringify(body))
      .then((response) => {
        setData({
          items: response.data.data,
          message: response.data.message,
          isLoading: false,
          error: false,
        });
      })
      .catch((err) => {
        setData({
          items: [],
          message: "Error! Something went wrong",
          isLoading: false,
          error: err.message,
        });
      });
  }, [refreshing]);
  return { ...data };
};

export { useFetchGet, useFetchPost };
