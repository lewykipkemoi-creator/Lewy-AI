"use client";

import Link from "next/link";
import { useState } from "react";

type Product = {name:string;price:string;description:string};

export default function Products() {
  const [products,setProducts] = useState<Product[]>([]);
  const [open,setOpen] = useState(false);
  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [description,setDescription] = useState("");

  function addProduct() {
    if(!name.trim()) return;
    setProducts([...products,{name,price,description}]);
    setName(""); setPrice(""); setDescription(""); setOpen(false);
  }

  return <main className="page">
    <Link href="/dashboard" className="back">← Dashboard</Link>
    <div className="head">
      <div><span>PRODUCTS & MEDIA</span><h1>Your products</h1><p>Give Lewy accurate product information so it can answer customers.</p></div>
      <button onClick={()=>setOpen(true)}>+ Add product</button>
    </div>

    {products.length===0 ? <div className="empty"><div>＋</div><h2>No products yet</h2><p>Add your first product, price, images or documents.</p><button onClick={()=>setOpen(true)}>Add your first product</button></div> :
      <div className="products">{products.map((p,i)=><div className="product" key={i}><h2>{p.name}</h2><b>{p.price ? `KES ${p.price}` : "Price not set"}</b><p>{p.description}</p></div>)}</div>}

    {open && <div className="overlay" onClick={()=>setOpen(false)}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <h2>Add product</h2>
        <input placeholder="Product name" value={name} onChange={e=>setName(e.target.value)}/>
        <input placeholder="Price (KES)" value={price} onChange={e=>setPrice(e.target.value)}/>
        <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)}/>
        <div className="actions"><button className="cancel" onClick={()=>setOpen(false)}>Cancel</button><button onClick={addProduct}>Save product</button></div>
      </div>
    </div>}

    <style jsx>{`
      .page{min-height:100vh;background:#f7f8fc;padding:35px;max-width:1250px;margin:auto;font-family:Arial;color:#171827}.back{color:#7657ff;text-decoration:none;font-weight:700;font-size:13px}.head{display:flex;justify-content:space-between;align-items:end;margin:35px 0}.head span{font-size:10px;color:#7657ff;font-weight:800;letter-spacing:1.5px}.head h1{font-size:32px;margin:8px 0}.head p{color:#777b8d}.head button,.empty button,.actions button{border:0;background:#7657ff;color:white;padding:12px 17px;border-radius:10px;font-weight:800;cursor:pointer}.empty{background:#fff;border:1px solid #e5e6ed;border-radius:20px;text-align:center;padding:80px 20px}.empty div{font-size:35px;color:#7657ff}.empty h2{margin:15px 0 5px}.empty p{color:#777b8d;font-size:13px}.products{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.product{background:#fff;border:1px solid #e5e6ed;border-radius:18px;padding:22px}.product h2{font-size:17px}.product b{color:#7657ff}.product p{color:#777b8d;font-size:12px}.overlay{position:fixed;inset:0;background:#0008;display:grid;place-items:center;padding:20px}.modal{background:#fff;border-radius:20px;padding:25px;width:min(500px,100%)}.modal h2{margin-top:0}.modal input,.modal textarea{width:100%;padding:13px;border:1px solid #dddfea;border-radius:10px;margin:7px 0;font:inherit}.modal textarea{height:110px;resize:vertical}.actions{display:flex;justify-content:flex-end;gap:8px;margin-top:12px}.cancel{background:#eee!important;color:#333!important}@media(max-width:700px){.head{display:block}.head button{margin-top:15px}.products{grid-template-columns:1fr}}
    `}</style>
  </main>
}
