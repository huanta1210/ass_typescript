import { useNavigate } from "react-router";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <button
      onClick={handleLogOut}
      className="text-sm font-semibold mt-5 hover:text-red-400"
    >
      <i className="fa-solid fa-arrow-right-from-bracket text-red-500 mr-2"></i>
      Log Out
    </button>
  );
};

export default LogOut;
