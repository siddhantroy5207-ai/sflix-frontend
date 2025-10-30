import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-red-500">🎬 Cinephile</h1>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-red-400">Home</Link>
        <Link to="/login" className="hover:text-red-400">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
