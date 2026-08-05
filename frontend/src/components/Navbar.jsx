import { PlusIcon, LogOutIcon, UserIcon } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return ( 
  <header className="bg-base-300 border-b border-base-content/10">
    <div className="mx-auto max-w-6xl p-4 ">
        <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary font-mono tracking-tight"> Thinkboard </h1>
              {user && (
                <div className="mt-1 flex items-center gap-2 text-sm text-base-content/70">
                  <UserIcon className="size-4" />
                  <span>{user.username}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
                <Link to={"/create"} className="btn btn-primary"> 
                <PlusIcon className="size-5 "/>
                <span>New Note</span>
                </Link>
                <button onClick={handleLogout} className="btn btn-outline">
                  <LogOutIcon className="size-5" />
                  <span>Logout</span>
                </button>
            </div>
        </div>
    </div>
  </header>
  );
};

export default Navbar   