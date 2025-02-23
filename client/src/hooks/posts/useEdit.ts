import { useMutation } from "@tanstack/react-query";
import edit from "../../api/posts/edit";
import { PostInterface } from "../../types/posts";

const useEdit = (id: string, data: PostInterface) => {
  return useMutation({ mutationFn: () => edit(id, data) });
};
export default useEdit;
