import { useMutation } from "@tanstack/react-query";
import create from "../../api/posts/create";
import { PostInterface } from "../../types/posts";

const useCreate = (data: PostInterface) => {
  return useMutation({ mutationFn: () => create(data) });
};
export default useCreate;
