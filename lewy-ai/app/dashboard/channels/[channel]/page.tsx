"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function ChannelSetup() {
  const params = useParams();
  const channel = String(params.channel || "channel").replaceAll("-", " ");
  const title = channel.charAt(0).toUpperCase() + channel.slice(1);

  return <main className="page">
    <Link href="/dashboard/channels" className="back">← Back to channels</Link>
    <div className="box">
      <div className="icon">✓</div>
      <h1>Connect {title}</h1>
      <p>Your {title} connection setup will appear here. This is the connection point for the real API/OAuth integration.</p>
      <div className="notice">Connection interface ready</div>
      <Link href="/dashboard/channels" className="button">← Back to channels</Link>
    </div>
    <style jsx>{`
      .page{min-height:100vh;background:#f7f8fc;padding:35px;font-family:Arial;color:#171827}.back{color:#7657ff;text-decoration:none;font-weight:700;font-size:13px}.box{max-width:600px;background:#fff;border:1px solid #e5e6ed;border-radius:22px;padding:35px;margin:60px auto}.icon{width:60px;height:60px;border-radius:16px;background:#eeeaff;color:#7657ff;display:grid;place-items:center;font-size:25px;font-weight:900}.box h1{font-size:30px;margin:22px 0 10px}.box p{color:#777b8d;line-height:1.6}.notice{padding:14px;background:#f4f2ff;border-radius:12px;color:#7657ff;font-weight:700;margin:25px 0;font-size:13px}.button{display:block;text-align:center;background:#7657ff;color:#fff;text-decoration:none;padding:13px;border-radius:10px;font-weight:800;font-size:13px}
    `}</style>
  </main>
}
