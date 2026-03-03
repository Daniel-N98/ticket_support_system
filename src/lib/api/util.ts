import toast from "react-hot-toast";

export function toastOrReturn(message: string | undefined, returnValue: any) {
  if (message) {
    toast.error(message);
    return null;
  }

  return returnValue;
}