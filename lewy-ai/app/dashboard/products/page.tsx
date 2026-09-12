"use client";

import Link from "next/link";
import { useState } from "react";

type Product = { name:string; sku:string; price:string; stock:string; media:number };

export default function Products() {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");

  function addProduct() {
    if (!name.trim()) return;
    setProducts([...products,{name:name.trim(),sku:sku || "—",price:price || "0",stock:"0",media:0}]);
    setName("");setPrice("");setSku("");setShow(false);
  }

  return <div className="page">
    <style jsx global>{`
      *{box-sizing:border-box}body{margin:0;font-family:Inter,Arial,sans-serif;background:#f6f7fb;color:#111827}a{text-decoration:none;color:inherit}
      .header{height:72px;background:#fff;border-bottom:1px solid #e7e9ef;display:flex;align-items:center;justify-content:space-between;padding:0 30px;position:sticky;top:0;z-index:10}.left{display:flex;align-items:center;gap:14px}.back{font-size:12px;color:#667085}.title{font-size:17px;font-weight:800}.sub{font-size:11px;color:#8991a3;margin-top:3px}.add{border:0;background:#7c3aed;color:#fff;border-radius:10px;padding:11px 15px;font-size:11px;font-weight:800;cursor:pointer}
      .content{max-width:1200px;margin:auto;padding:30px}.hero{background:linear-gradient(115deg,#11182d,#30245b);color:#fff;border-radius:20px;padding:26px;margin-bottom:22px}.hero h1{margin:5px 0;font-size:24px}.hero p{color:#bdc3d3;font-size:12px;line-height:1.6;max-width:700px}.tag{font-size:10px;color:#a78bfa;font-weight:800;text-transform:uppercase;letter-spacing:.1em}
      .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:13px;margin-bottom:22px}.stat{background:#fff;border:1px solid #e7e9ef;border-radius:15px;padding:17px}.stat small{color:#7b8495;font-size:10px}.stat strong{display:block;font-size:22px;margin-top:7px}
      .toolbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}.toolbar h2{font-size:15px}.search{border:1px solid #dddfe6;border-radius:9px;padding:10px 12px;background:#fff;font-size:11px;width:220px}.products{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}.product{background:#fff;border:1px solid #e6e8ef;border-radius:17px;overflow:hidden}.visual{height:150px;background:linear-gradient(135deg,#f0f1f6,#e6e8ef);display:grid;place-items:center;font-size:42px;color:#a0a7b6}.details{padding:16px}.details strong{font-size:13px}.sku{font-size:10px;color:#8b93a3;margin-top:4px}.price{font-size:16px;font-weight:800;margin-top:12px}.meta{display:flex;justify-content:space-between;margin-top:10px;font-size:10px;color:#737b8c}.empty{background:#fff;border:1px dashed #d8dbe4;border-radius:17px;padding:50px 20px;text-align:center;color:#737b8c;grid-column:1/-1}.empty strong{display:block;color:#202536;font-size:14px;margin-bottom:6px}
      .modalBg{position:fixed;inset:0;background:#0008;display:grid;place-items:center;padding:18px;z-index:30}.modal{background:#fff;border-radius:18px;padding:24px;width:100%;max-width:470px}.modal h2{margin:0 0 18px;font-size:18px}.field{margin-bottom:12px}.field label{display:block;font-size:10px;font-weight:800;margin-bottom:5px;color:#667085}.field input{width:100%;padding:11px;border:1px solid #dfe2e9;border-radius:9px;font-size:12px}.actions{display:flex;justify-content:flex-end;gap:9px;margin-top:18px}.cancel{border:1px solid #ddd;background:#fff;padding:10px 14px;border-radius:9px;font-size:11px;font-weight:700}.save{border:0;background:#7c3aed;color:#fff;padding:10px 15px;border-radius:9px;font-size:11px;font-weight:800}
      @media(max-width:800px){.content{padding:18px 14px}.products{grid-template-columns:1fr 1fr}.stats{grid-template-columns:1fr 1fr}.header{padding:0 15px}}
      @media(max-width:500px){.products{grid-template-columns:1fr}.stats{grid-template-columns:1fr 1fr}.search{width:145px}.hero h1{font-size:20px}.title{font-size:15px}}
    `}</style>

    <header className="header">
      <div className="left"><Link href="/dashboard" className="back">← Dashboard</Link><div><div className="title">Products & Media</div><div className="sub">Give Lewy access to your products, images and documents</div></div></div>
      <button className="add" onClick={() => setShow(true)}>+ Add Product</button>
    </header>

    <main className="content">
      <section className="hero"><div className="tag">AI product knowledge</div><h1>Products, photos, videos and documents.</h1><p>Add the information Lewy needs to answer customer questions and eventually send the right product media through connected channels.</p></section>

      <div className="stats">
        <div className="stat"><small>Products</small><strong>{products.length}</strong></div>
        <div className="stat"><small>Photos & media</small><strong>{products.reduce((a,p)=>a+p.media,0)}</strong></div>
        <div className="stat"><small>AI enabled</small><strong>{products.length}</strong></div>
        <div className="stat"><small>Documents</small><strong>0</strong></div>
      </div>

      <div className="toolbar"><h2>Your product library</h2><input className="search" placeholder="Search products..." /></div>

      <div className="products">
        {products.length === 0 ? <div className="empty"><strong>Your product library is empty</strong>No products have been added yet.<br/><button className="add" style={{marginTop:15}} onClick={()=>setShow(true)}>+ Add your first product</button></div> :
        products.map(p=><div className="product" key={p.name+p.sku}><div className="visual">▣</div><div className="details"><strong>{p.name}</strong><div className="sku">SKU: {p.sku}</div><div className="price">KES {p.price}</div><div className="meta"><span>Stock: {p.stock}</span><span>{p.media} media</span></div></div></div>)}
      </div>
    </main>

    {show && <div className="modalBg"><div className="modal">
      <h2>Add product</h2>
      <div className="field"><label>PRODUCT NAME</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Premium Hoodie" /></div>
      <div className="field"><label>SKU / PRODUCT CODE</label><input value={sku} onChange={e=>setSku(e.target.value)} placeholder="e.g. HD-001" /></div>
      <div className="field"><label>PRICE (KES)</label><input value={price} onChange={e=>setPrice(e.target.value)} placeholder="e.g. 3500" /></div>
      <div className="actions"><button className="cancel" onClick={()=>setShow(false)}>Cancel</button><button className="save" onClick={addProduct}>Create product</button></div>
    </div></div>}
  </div>;
}
