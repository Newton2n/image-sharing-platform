import { Button } from "../index";
import authservice from "../../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
function LogOutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutBtn = async () => {
    const deleteSession = authservice.logOut();

    dispatch(logout());
    if (deleteSession) navigate("/login", { replace: true });
  };
  return <Button className="hover:bg-red-700" children={"Logout"} onClick={logOutBtn} />;
}

export default LogOutBtn;
