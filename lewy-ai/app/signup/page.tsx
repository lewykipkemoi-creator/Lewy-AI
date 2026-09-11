"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { createClient } from "../../lib/supabase";

export default function SignupPage() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [message,setMessage] = useState("");
  const [loading,setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });

      if (error) throw error;

      setMessage(
        "Account created. Check your email if email confirmation is enabled, then sign in."
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth">
      <style jsx>{`
        .auth{min-height:100vh;background:#07090d;color:#f5f7fa;display:grid;place-items:center;padding:25px;font-family:Inter,system-ui,sans-serif}
        .box{width:min(430px,100%)}
        .brand{display:flex;align-items:center;gap:9px;font-weight:800;font-size:20px;margin-bottom:35px}
        .mark{width:32px;height:32px;display:grid;place-items:center;border-radius:9px;background:linear-gradient(135deg,#8b5cf6,#6366f1)}
        .brand span{color:#8b5cf6}
        .back{color:#737a87;font-size:13px;display:inline-flex;align-items:center;gap:7px;margin-bottom:20px}
        .card{border:1px solid #1b1e26;background:#0c0f14;border-radius:16px;padding:30px}
        h1{font-size:28px;margin:0 0 8px}
        .sub{color:#777f8c;font-size:14px;margin-bottom:27px}
        label{display:block;color:#b5bbc5;font-size:12px;font-weight:700;margin:16px 0 7px}
        input{width:100%;padding:13px;border-radius:9px;border:1px solid #282c35;background:#080a0e;color:#fff;outline:none}
        input:focus{border-color:#6d50b3}
        button{width:100%;margin-top:22px;padding:13px;border:0;border-radius:9px;background:linear-gradient(135deg,#8b5cf6,#6366f1);color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center;gap:8px}
        .error{margin-top:15px;color:#fca5a5;font-size:13px}
        .success{margin-top:15px;color:#86efac;font-size:13px;line-height:1.5}
        .bottom{text-align:center;color:#747b87;font-size:13px;margin-top:20px}
        .bottom a{color:#a78bfa}
      `}</style>

      <div className="box">
        <Link href="/" className="back"><ArrowLeft size={14}/> Back to Lewy AI</Link>

        <div className="brand">
          <span className="mark"><Sparkles size={16}/></span>
          lewy<span>AI</span>
        </div>

        <div className="card">
          <h1>Create your workspace</h1>
          <div className="sub">Start building your customer-response system.</div>

          <form onSubmit={submit}>
            <label>Your name</label>
            <input required value={name} onChange={e=>setName(e.target.value)} />

            <label>Email</label>
            <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} />

            <label>Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />

            <button disabled={loading}>
              {loading && <Loader2 size={16}/>}
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>

          {error && <div className="error">{error}</div>}
          {message && <div className="success">{message}</div>}
        </div>

        <div className="bottom">
          Already have an account? <Link href="/login">Sign in</Link>
        </div>
      </div>
    </main>
  );
}
