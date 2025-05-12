import { Bell, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg">Manage Your Business with- SmartCRM</h1>
      <div className="flex items-center gap-4">
        {/* <Bell className="w-6 h-6 cursor-pointer" /> */}
        <UserCircle
          className="w-8 h-8 cursor-pointer"
          // onClick={() => navigate("/profile")}
        />
      </div>
    </header>
  );
};

export default Navbar;
