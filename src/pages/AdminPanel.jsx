import React, { useEffect, useState } from "react";
import api from "../utils/api";

export default function AdminPanel(){
  const [keys, setKeys] = useState([]);
  const [newKey, setNewKey] = useState("");
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [form, setForm] = useState({ title:"", director:"", releaseYear:"", rating:0, posterUrl:"", synopsis:"", trailerUrl:"", genreId:"" });

  useEffect(()=>{ loadAll(); }, []);

  const loadAll = async () => {
    const [keysRes, genresRes, moviesRes] = await Promise.all([
      api.get("/admin/user-keys"),
      api.get("/admin/genres"),
      api.get("/movies")
    ]);
    setKeys(keysRes.data);
    setGenres(genresRes.data);
    setMovies(moviesRes.data);
  };

  const addKey = async () => {
    if (!newKey) return;
    await api.post("/admin/user-keys", { key: newKey });
    setNewKey("");
    loadAll();
  };

  const deleteKey = async (id) => {
    await api.delete(`/admin/user-keys/${id}`);
    loadAll();
  };

  const addGenre = async () => {
    if (!genreName) return;
    await api.post("/admin/genres", { name: genreName });
    setGenreName("");
    loadAll();
  };

  const addMovie = async () => {
    if (!form.title || !form.genreId) return alert("Title & Genre required");
    await api.post("/admin/movies", form);
    setForm({ title:"", director:"", releaseYear:"", rating:0, posterUrl:"", synopsis:"", trailerUrl:"", genreId:"" });
    loadAll();
  };

  const deleteMovie = async (id) => {
    await api.delete(`/admin/movies/${id}`);
    loadAll();
  };

  return (
    <div className="min-h-screen p-6 bg-black text-white">
      <h1 className="text-3xl mb-4">Admin Panel</h1>

      <section className="mb-8 p-4 bg-gray-900 rounded">
        <h2 className="font-bold">Manage User Keys</h2>
        <div className="flex gap-2 mt-2">
          <input value={newKey} onChange={e=>setNewKey(e.target.value)} className="p-2 bg-gray-800 rounded" placeholder="Enter new key"/>
          <button onClick={addKey} className="bg-blue-600 px-3 rounded">+ Add Key</button>
        </div>
        <ul className="mt-3">
          {keys.map(k => (
            <li key={k._id} className="flex justify-between p-2 bg-gray-800 rounded mt-2">
              <div>{k.key} <span className="text-xs text-gray-400">({k.role})</span></div>
              <button onClick={()=>deleteKey(k._id)} className="text-red-500">Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8 p-4 bg-gray-900 rounded">
        <h2 className="font-bold">Genres</h2>
        <div className="flex gap-2 mt-2">
          <input value={genreName} onChange={e=>setGenreName(e.target.value)} className="p-2 bg-gray-800 rounded" placeholder="New genre name"/>
          <button onClick={addGenre} className="bg-blue-600 px-3 rounded">+ Add Genre</button>
        </div>
        <div className="mt-3">
          {genres.map(g => <div key={g._id} className="p-2 bg-gray-800 rounded mt-2">{g.name}</div>)}
        </div>
      </section>

      <section className="mb-8 p-4 bg-gray-900 rounded">
        <h2 className="font-bold">Add Movie</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="p-2 bg-gray-800 rounded"/>
          <input placeholder="Director" value={form.director} onChange={e=>setForm({...form,director:e.target.value})} className="p-2 bg-gray-800 rounded"/>
          <input placeholder="Year" value={form.releaseYear} onChange={e=>setForm({...form,releaseYear:e.target.value})} className="p-2 bg-gray-800 rounded"/>
          <input placeholder="Rating" type="number" step="0.1" value={form.rating} onChange={e=>setForm({...form,rating:parseFloat(e.target.value)})} className="p-2 bg-gray-800 rounded"/>
          <input placeholder="Poster URL" value={form.posterUrl} onChange={e=>setForm({...form,posterUrl:e.target.value})} className="p-2 bg-gray-800 rounded"/>
          <select value={form.genreId} onChange={e=>setForm({...form,genreId:e.target.value})} className="p-2 bg-gray-800 rounded">
            <option value="">Choose genre</option>
            {genres.map(g => <option value={g._id} key={g._id}>{g.name}</option>)}
          </select>
          <input placeholder="Trailer URL" value={form.trailerUrl} onChange={e=>setForm({...form,trailerUrl:e.target.value})} className="p-2 bg-gray-800 rounded col-span-2"/>
          <textarea placeholder="Synopsis" value={form.synopsis} onChange={e=>setForm({...form,synopsis:e.target.value})} className="p-2 bg-gray-800 rounded col-span-2"></textarea>
        </div>
        <div className="mt-3">
          <button onClick={addMovie} className="bg-green-600 px-4 py-2 rounded">Add Movie</button>
        </div>
      </section>

      <section className="p-4 bg-gray-900 rounded">
        <h2 className="font-bold">Existing Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
          {movies.map(m => (
            <div key={m._id} className="bg-gray-800 p-2 rounded">
              <img src={m.posterUrl} alt={m.title} className="h-40 w-full object-cover rounded"/>
              <div className="mt-2 font-bold">{m.title}</div>
              <div className="flex gap-2 mt-2">
                <button onClick={()=>{ if(confirm("Delete?")) deleteMovie(m._id) }} className="bg-red-600 px-2 rounded">Delete</button>
                {/* For edit full movie, admin can edit inline or you can create a modal for update */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
