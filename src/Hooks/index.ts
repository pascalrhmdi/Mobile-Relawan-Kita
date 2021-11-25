export * from "./useFetch";

interface ApiResponse {
  data: any[] | any;
  isLoading: boolean;
  error: boolean | string;
}

interface ApiPostResponse extends ApiResponse {
  message: string;
}

export { ApiResponse, ApiPostResponse };
