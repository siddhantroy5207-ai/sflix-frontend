import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [key, setKey] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/validate-key", { key });
      const role = res.data.role;
      localStorage.setItem("sflix_role", role);
      localStorage.setItem("sflix_key", key);
      if (role === "admin") nav("/admin");
      else nav("/home");
    } catch (e) {
      setErr("Invalid access key");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Sflix</h1>
        <p className="mb-6 text-gray-300">Enter your access key to continue</p>
        <input value={key} onChange={e => setKey(e.target.value)} placeholder="Enter Access Key"
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white" />
        <button onClick={handleLogin} className="w-full bg-red-600 p-3 rounded">Enter</button>
        {err && <p className="mt-3 text-red-400">{err}</p>}
      </div>
    </div>
  );
}
