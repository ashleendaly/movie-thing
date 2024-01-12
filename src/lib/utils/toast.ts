import { toast } from "sonner";
export function my_toast(promise: Promise<unknown>) {
  return toast.promise(promise, {
    loading: "",
  });
}
