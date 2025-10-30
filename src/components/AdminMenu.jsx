const AdminMenu = ({ onUpload }) => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-red-400">Admin Upload Panel</h2>
      <input
        type="text"
        placeholder="Movie title"
        id="title"
        className="p-2 mb-3 w-full rounded bg-gray-800 text-white"
      />
      <input
        type="text"
        placeholder="Poster URL"
        id="poster"
        className="p-2 mb-3 w-full rounded bg-gray-800 text-white"
      />
      <input
        type="text"
        placeholder="Genre"
        id="genre"
        className="p-2 mb-3 w-full rounded bg-gray-800 text-white"
      />
      <button
        onClick={onUpload}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded w-full"
      >
        Upload Movie
      </button>
    </div>
  );
};

export default AdminMenu;
