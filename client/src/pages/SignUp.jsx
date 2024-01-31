import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setErr("Invalid email or username");
        return;
      }
      setLoading(false);
      setErr(null);
      navigate("/sign-in");
    } catch (err) {
      setLoading(false);
      setErr("Invalid email or username");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg hover:border-gray-700"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg hover:border-gray-700"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg hover:border-gray-700"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 text-white font-semibold"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-4 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {err && <p className="text-red-500 mt-5">{err}</p>}
    </div>
  );
}
