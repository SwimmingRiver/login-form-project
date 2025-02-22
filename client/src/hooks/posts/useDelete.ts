import { useMutation } from "@tanstack/react-query";
import remove from "../../api/posts/delete";

const useDelete = (id: string) => {
  return useMutation({ mutationFn: () => remove(id) });
};

export default useDelete;
