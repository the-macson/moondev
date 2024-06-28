import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearAuth } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";
import axios from "axios";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  //  implement the logic here to check user session
  useEffect(() => {
    axios
      .get("/api/login")
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch(() => {
        dispatch(clearAuth());
      });
  }, [dispatch]);
  return user;
};

export default useAuthSession;
