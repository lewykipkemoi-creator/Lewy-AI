"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type MediaType = "image" | "video" | "pdf" | "document" | "chart";

type Media = {
  id: number;
  name: string;
  type: MediaType;
  size: string;
};

type Product = {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: string;
  description: string;
  variants: string[];
  aiEnabled: boolean;
  media: Media[];
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Urban Runner Sneakers",
    sku: "UR-001",
    category: "Footwear",
    price: 4500,
    stock: "In stock",
    description:
      "Lightweight everyday sneakers available in multiple colours and sizes.",
    variants: ["Black", "White", "Red", "Size 39–45"],
    aiEnabled: true,
    media: [
      { id: 11, name: "urban-runner-black.jpg", type: "image", size: "1.8 MB" },
      { id: 12, name: "urban-runner-video.mp4", type: "video", size: "8.4 MB" },
      { id: 13, name: "urban-runner-size-chart.pdf", type: "chart", size: "420 KB" },
    ],
  },
  {
    id: 2,
    name: "Classic Leather Bag",
    sku: "CLB-204",
    category: "Bags",
    price: 6800,
    stock: "In stock",
    description:
      "Premium everyday leather bag with a spacious interior and adjustable strap.",
    variants: ["Black", "Brown", "Tan"],
    aiEnabled: true,
    media: [
      { id: 21, name: "classic-leather-front.jpg", type: "image", size: "2.1 MB" },
      { id: 22, name: "classic-leather-side.jpg", type: "image", size: "1.7 MB" },
      { id: 23, name: "leather-care-guide.pdf", type: "pdf", size: "690 KB" },
    ],
  },
  {
    id: 3,
    name: "Premium Hoodie",
    sku: "PH-778",
    category: "Clothing",
    price: 3200,
    stock: "Low stock",
    description:
      "Soft heavyweight hoodie designed for everyday wear.",
    variants: ["Black", "Grey", "Navy", "S", "M", "L", "XL"],
    aiEnabled: true,
    media: [
      { id: 31, name: "premium-hoodie-black.jpg", type: "image", size: "1.5 MB" },
      { id: 32, name: "hoodie-size-chart.pdf", type: "chart", size: "310 KB" },
    ],
  },
  {
    id: 4,
    name: "Business Backpack",
    sku: "BB-310",
    category: "Bags",
    price: 5900,
    stock: "Out of stock",
    description:
      "Laptop-ready backpack designed for commuting and business travel.",
    variants: ["Black", "Grey"],
    aiEnabled: false,
    media: [
      { id: 41, name: "business-backpack.jpg", type: "image", size: "2.4 MB" },
      { id: 42, name: "backpack-brochure.pdf", type: "pdf", size: "1.1 MB" },
    ],
  },
];

const typeIcon: Record<MediaType, string> = {
  image: "🖼️",
  video: "🎥",
  pdf: "📄",
  document: "📝",
  chart: "📏",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [showMedia, setShowMedia] = useState<Product | null>(null);
  const [showEdit, setShowEdit] = useState<Product | null>(null);
  const [preview, setPreview] = useState<Media | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const filtered = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const totalMedia = products.reduce((sum, p) => sum + p.media.length, 0);

  function toggleAI(id: number) {
    setProducts((items) =>
      items.map((p) =>
        p.id === id ? { ...p, aiEnabled: !p.aiEnabled } : p
      )
    );
  }

  function addProduct(product: Product) {
    setProducts((items) => [product, ...items]);
    setShowAdd(false);
  }

  function saveEdit(updated: Product) {
    setProducts((items) =>
      items.map((p) => (p.id === updated.id ? updated : p))
    );
    setShowEdit(null);
  }

  function deleteProduct(id: number) {
    setProducts((items) => items.filter((p) => p.id !== id));
    setShowEdit(null);
  }

  return (
    <main className="page">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brandMark">L</div>
          <div>
            <strong>Lewy AI</strong>
            <span>Revenue OS</span>
          </div>
        </div>

        <div className="workspace">
          <span>WORKSPACE</span>
          <strong>My Business</strong>
          <small>Business account</small>
        </div>

        <nav>
          <Nav href="/dashboard" icon="⌂" label="Overview" />
          <Nav href="/dashboard/conversations" icon="◌" label="Conversations" />
          <Nav href="/dashboard/customers" icon="♙" label="Customers" />
          <Nav href="/dashboard/leads" icon="◎" label="Leads" />
          <Nav href="/dashboard/products" icon="▣" label="Products & Media" active />
          <Nav href="/dashboard/revenue" icon="↗" label="Revenue" />
          <Nav href="/dashboard/followups" icon="↻" label="Follow-ups" />
          <Nav href="/dashboard/calendar" icon="□" label="Calendar" />
          <Nav href="/dashboard/channels" icon="⌘" label="Channels" />
          <Nav href="/dashboard/settings" icon="⚙" label="Settings" />
        </nav>

        <div className="aiStatus">
          <div className="pulse"></div>
          <div>
            <strong>Lewy AI is active</strong>
            <span>Ready to help customers</span>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <button
          className="backdrop"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        />
      )}

      <section className="content">
        <header className="topbar">
          <div className="topLeft">
            <button
              className="hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
            <div>
              <span className="eyebrow">BUSINESS KNOWLEDGE</span>
              <h1>Products & Media</h1>
            </div>
          </div>

          <div className="topActions">
            <button className="iconBtn">?</button>
            <button className="avatar">L</button>
          </div>
        </header>

        <div className="hero">
          <div>
            <div className="heroIcon">▣</div>
            <div>
              <h2>Product & Media Library</h2>
              <p>
                Give Lewy everything it needs to answer product questions,
                send media and help customers make purchasing decisions.
              </p>
            </div>
          </div>

          <button className="primary" onClick={() => setShowAdd(true)}>
            + Add product
          </button>
        </div>

        <div className="stats">
          <Stat label="Products" value={products.length.toString()} icon="▣" />
          <Stat label="Media files" value={totalMedia.toString()} icon="◫" />
          <Stat
            label="AI enabled"
            value={products.filter((p) => p.aiEnabled).length.toString()}
            icon="✦"
          />
          <Stat
            label="Categories"
            value={(categories.length - 1).toString()}
            icon="⌁"
          />
        </div>

        <section className="toolbar">
          <div className="search">
            <span>⌕</span>
            <input
              placeholder="Search products or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filters">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "filter active" : "filter"}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="sectionHead">
          <div>
            <h2>Your products</h2>
            <p>
              Products and files Lewy can use when responding to customers.
            </p>
          </div>
          <button className="secondary" onClick={() => setShowAdd(true)}>
            + Add product
          </button>
        </section>

        {filtered.length === 0 ? (
          <div className="empty">
            <div>⌕</div>
            <h3>No products found</h3>
            <p>Try another search or category.</p>
          </div>
        ) : (
          <section className="productGrid">
            {filtered.map((product) => (
              <article className="productCard" key={product.id}>
                <div className="productVisual">
                  <div className="visualIcon">🛍️</div>
                  <span className="categoryBadge">{product.category}</span>
                  <span
                    className={`stock ${
                      product.stock === "Out of stock"
                        ? "out"
                        : product.stock === "Low stock"
                        ? "low"
                        : ""
                    }`}
                  >
                    {product.stock}
                  </span>
                </div>

                <div className="productBody">
                  <div className="productTitle">
                    <div>
                      <h3>{product.name}</h3>
                      <span>{product.sku}</span>
                    </div>
                    <button
                      className="more"
                      onClick={() => setShowEdit(product)}
                    >
                      ⋯
                    </button>
                  </div>

                  <p className="description">{product.description}</p>

                  <div className="price">
                    KES {product.price.toLocaleString()}
                  </div>

                  <div className="variants">
                    {product.variants.slice(0, 4).map((variant) => (
                      <span key={variant}>{variant}</span>
                    ))}
                    {product.variants.length > 4 && (
                      <span>+{product.variants.length - 4}</span>
                    )}
                  </div>

                  <div className="mediaSummary">
                    <div>
                      {product.media.slice(0, 4).map((m) => (
                        <button
                          key={m.id}
                          title={m.name}
                          onClick={() => setPreview(m)}
                        >
                          {typeIcon[m.type]}
                        </button>
                      ))}
                    </div>
                    <span>{product.media.length} files</span>
                  </div>

                  <div className="cardBottom">
                    <button
                      className="mediaBtn"
                      onClick={() => setShowMedia(product)}
                    >
                      Manage media
                    </button>

                    <button
                      className={`aiToggle ${product.aiEnabled ? "on" : ""}`}
                      onClick={() => toggleAI(product.id)}
                    >
                      <span></span>
                      AI can use
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        <section className="capabilities">
          <div className="capHeader">
            <div className="spark">✦</div>
            <div>
              <h2>What can Lewy use?</h2>
              <p>
                Your media library can become part of every customer
                conversation.
              </p>
            </div>
          </div>

          <div className="capGrid">
            <Capability icon="🖼️" title="Product photos" text="Send the right product image when a customer asks to see it." />
            <Capability icon="🎥" title="Product videos" text="Share demonstrations, walkthroughs and promotional videos." />
            <Capability icon="📄" title="PDF documents" text="Send brochures, catalogues, manuals and product information." />
            <Capability icon="📏" title="Size charts" text="Give customers the correct size guide for a product." />
            <Capability icon="📋" title="Price lists" text="Keep pricing documents available to Lewy when needed." />
            <Capability icon="📝" title="Other documents" text="Store menus, policies, specifications and useful business files." />
          </div>
        </section>
      </section>

      {showAdd && (
        <ProductModal
          title="Add product"
          onClose={() => setShowAdd(false)}
          onSave={addProduct}
        />
      )}

      {showEdit && (
        <ProductModal
          title="Edit product"
          initial={showEdit}
          onClose={() => setShowEdit(null)}
          onSave={saveEdit}
          onDelete={() => deleteProduct(showEdit.id)}
        />
      )}

      {showMedia && (
        <MediaModal
          product={showMedia}
          onClose={() => setShowMedia(null)}
          onPreview={setPreview}
        />
      )}

      {preview && (
        <PreviewModal media={preview} onClose={() => setPreview(null)} />
      )}

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          background: #f5f7fb;
          color: #111827;
          display: flex;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .sidebar {
          width: 258px;
          background: #111827;
          color: white;
          padding: 22px 16px;
          position: fixed;
          inset: 0 auto 0 0;
          z-index: 40;
          display: flex;
          flex-direction: column;
        }

        .brand {
          display: flex;
          gap: 11px;
          align-items: center;
          padding: 3px 8px 25px;
        }

        .brandMark {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          display: grid;
          place-items: center;
          font-weight: 900;
          font-size: 19px;
        }

        .brand strong {
          display: block;
          font-size: 16px;
        }

        .brand span {
          color: #9ca3af;
          font-size: 11px;
        }

        .workspace {
          background: #1f2937;
          border: 1px solid #374151;
          border-radius: 13px;
          padding: 12px;
          margin-bottom: 20px;
        }

        .workspace span {
          color: #6b7280;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .workspace strong,
        .workspace small {
          display: block;
        }

        .workspace strong {
          margin-top: 6px;
          font-size: 13px;
        }

        .workspace small {
          color: #9ca3af;
          font-size: 11px;
          margin-top: 2px;
        }

        nav {
          display: grid;
          gap: 4px;
        }

        .navItem {
          text-decoration: none;
          color: #9ca3af;
          padding: 11px 12px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 11px;
          font-size: 13px;
          font-weight: 600;
        }

        .navItem:hover,
        .navItem.active {
          color: white;
          background: #272f3d;
        }

        .navIcon {
          width: 20px;
          text-align: center;
          font-size: 15px;
        }

        .aiStatus {
          margin-top: auto;
          border: 1px solid #263244;
          background: #17202e;
          padding: 12px;
          border-radius: 12px;
          display: flex;
          gap: 9px;
          align-items: center;
        }

        .pulse {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 5px rgba(34, 197, 94, 0.1);
        }

        .aiStatus strong,
        .aiStatus span {
          display: block;
        }

        .aiStatus strong {
          font-size: 11px;
        }

        .aiStatus span {
          color: #9ca3af;
          font-size: 9px;
          margin-top: 2px;
        }

        .content {
          width: calc(100% - 258px);
          margin-left: 258px;
          min-width: 0;
        }

        .topbar {
          min-height: 84px;
          padding: 18px 34px;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .topLeft {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .eyebrow {
          color: #8b5cf6;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.2px;
        }

        h1 {
          margin: 3px 0 0;
          font-size: 23px;
          letter-spacing: -0.5px;
        }

        .topActions {
          display: flex;
          gap: 10px;
        }

        .iconBtn,
        .avatar,
        .hamburger {
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 10px;
          width: 38px;
          height: 38px;
          cursor: pointer;
        }

        .avatar {
          background: #111827;
          color: white;
          border-color: #111827;
          font-weight: 800;
        }

        .hamburger {
          display: none;
          font-size: 18px;
        }

        .hero {
          margin: 28px 34px 22px;
          padding: 25px;
          border-radius: 18px;
          color: white;
          background: linear-gradient(120deg, #171c2b, #272052);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          box-shadow: 0 15px 35px rgba(31, 41, 55, 0.12);
        }

        .hero > div {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .heroIcon {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          background: rgba(139, 92, 246, 0.2);
          display: grid;
          place-items: center;
          font-size: 22px;
        }

        .hero h2 {
          margin: 0 0 5px;
          font-size: 19px;
        }

        .hero p {
          margin: 0;
          color: #c4c7d1;
          max-width: 680px;
          line-height: 1.5;
          font-size: 12px;
        }

        button {
          font-family: inherit;
        }

        .primary,
        .secondary {
          border: 0;
          border-radius: 10px;
          padding: 11px 16px;
          font-weight: 750;
          cursor: pointer;
          white-space: nowrap;
        }

        .primary {
          background: white;
          color: #4f46e5;
        }

        .secondary {
          background: #111827;
          color: white;
        }

        .stats {
          margin: 0 34px 24px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 13px;
        }

        .stat {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 17px;
        }

        .statTop {
          display: flex;
          justify-content: space-between;
          color: #6b7280;
          font-size: 11px;
        }

        .statIcon {
          color: #7c3aed;
        }

        .statValue {
          font-size: 24px;
          font-weight: 850;
          margin-top: 10px;
        }

        .toolbar {
          margin: 0 34px 25px;
          display: flex;
          justify-content: space-between;
          gap: 15px;
          flex-wrap: wrap;
        }

        .search {
          min-width: 280px;
          flex: 1;
          max-width: 430px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 11px;
          display: flex;
          align-items: center;
          padding: 0 12px;
          color: #9ca3af;
        }

        .search input {
          border: 0;
          outline: 0;
          width: 100%;
          padding: 12px 9px;
          background: transparent;
          font: inherit;
          font-size: 12px;
        }

        .filters {
          display: flex;
          gap: 7px;
          overflow-x: auto;
        }

        .filter {
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 9px;
          padding: 9px 12px;
          color: #6b7280;
          cursor: pointer;
          font-size: 11px;
          white-space: nowrap;
        }

        .filter.active {
          background: #111827;
          border-color: #111827;
          color: white;
        }

        .sectionHead {
          margin: 0 34px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
        }

        .sectionHead h2 {
          margin: 0;
          font-size: 17px;
        }

        .sectionHead p {
          margin: 4px 0 0;
          color: #6b7280;
          font-size: 11px;
        }

        .productGrid {
          margin: 0 34px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .productCard {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          overflow: hidden;
          transition: 0.2s ease;
        }

        .productCard:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(17, 24, 39, 0.08);
        }

        .productVisual {
          height: 175px;
          background: linear-gradient(135deg, #eef2ff, #f5f3ff);
          position: relative;
          display: grid;
          place-items: center;
        }

        .visualIcon {
          font-size: 54px;
        }

        .categoryBadge,
        .stock {
          position: absolute;
          top: 11px;
          padding: 5px 8px;
          border-radius: 7px;
          font-size: 9px;
          font-weight: 800;
        }

        .categoryBadge {
          left: 11px;
          background: rgba(255, 255, 255, 0.9);
          color: #4f46e5;
        }

        .stock {
          right: 11px;
          background: #dcfce7;
          color: #15803d;
        }

        .stock.low {
          background: #fef3c7;
          color: #a16207;
        }

        .stock.out {
          background: #fee2e2;
          color: #b91c1c;
        }

        .productBody {
          padding: 15px;
        }

        .productTitle {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }

        .productTitle h3 {
          margin: 0;
          font-size: 14px;
        }

        .productTitle span {
          display: block;
          color: #9ca3af;
          font-size: 9px;
          margin-top: 3px;
        }

        .more {
          border: 0;
          background: transparent;
          font-size: 18px;
          color: #6b7280;
          cursor: pointer;
        }

        .description {
          color: #6b7280;
          font-size: 10px;
          line-height: 1.5;
          min-height: 31px;
          margin: 10px 0;
        }

        .price {
          font-size: 17px;
          font-weight: 850;
        }

        .variants {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin: 10px 0;
        }

        .variants span {
          background: #f3f4f6;
          color: #6b7280;
          padding: 4px 7px;
          border-radius: 6px;
          font-size: 8px;
        }

        .mediaSummary {
          border-top: 1px solid #f0f1f4;
          border-bottom: 1px solid #f0f1f4;
          padding: 9px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #9ca3af;
          font-size: 9px;
        }

        .mediaSummary > div {
          display: flex;
          gap: 3px;
        }

        .mediaSummary button {
          border: 0;
          background: #f7f7f9;
          border-radius: 6px;
          width: 27px;
          height: 27px;
          cursor: pointer;
        }

        .cardBottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 7px;
          margin-top: 11px;
        }

        .mediaBtn {
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          padding: 8px 9px;
          cursor: pointer;
          font-size: 9px;
          font-weight: 700;
        }

        .aiToggle {
          border: 0;
          background: transparent;
          color: #9ca3af;
          font-size: 9px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .aiToggle span {
          width: 23px;
          height: 13px;
          background: #d1d5db;
          border-radius: 20px;
          position: relative;
        }

        .aiToggle span:after {
          content: "";
          position: absolute;
          width: 9px;
          height: 9px;
          background: white;
          border-radius: 50%;
          top: 2px;
          left: 2px;
        }

        .aiToggle.on {
          color: #16a34a;
        }

        .aiToggle.on span {
          background: #22c55e;
        }

        .aiToggle.on span:after {
          left: 12px;
        }

        .capabilities {
          margin: 30px 34px 50px;
          padding: 20px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
        }

        .capHeader {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 17px;
        }

        .spark {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #f3e8ff;
          color: #7c3aed;
          display: grid;
          place-items: center;
        }

        .capHeader h2 {
          margin: 0;
          font-size: 15px;
        }

        .capHeader p {
          margin: 3px 0 0;
          color: #6b7280;
          font-size: 10px;
        }

        .capGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .cap {
          padding: 13px;
          border: 1px solid #eef0f3;
          border-radius: 11px;
        }

        .capIcon {
          font-size: 19px;
        }

        .cap h3 {
          margin: 7px 0 3px;
          font-size: 11px;
        }

        .cap p {
          margin: 0;
          color: #6b7280;
          line-height: 1.45;
          font-size: 9px;
        }

        .empty {
          margin: 0 34px;
          background: white;
          border: 1px dashed #d1d5db;
          border-radius: 15px;
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .empty div {
          font-size: 30px;
        }

        .empty h3 {
          color: #111827;
          margin: 10px 0 4px;
        }

        .empty p {
          margin: 0;
          font-size: 11px;
        }

        .backdrop {
          display: none;
        }

        @media (max-width: 1100px) {
          .productGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .capGrid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 800px) {
          .sidebar {
            transform: translateX(-105%);
            transition: transform 0.25s ease;
            box-shadow: 15px 0 40px rgba(0, 0, 0, 0.18);
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .backdrop {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.4);
            border: 0;
            z-index: 30;
          }

          .content {
            width: 100%;
            margin-left: 0;
          }

          .hamburger {
            display: block;
          }

          .topbar {
            padding: 15px 18px;
          }

          .hero {
            margin: 20px 18px;
            align-items: flex-start;
            flex-direction: column;
          }

          .hero .primary {
            width: 100%;
          }

          .stats {
            margin: 0 18px 20px;
            grid-template-columns: repeat(2, 1fr);
          }

          .toolbar,
          .sectionHead,
          .productGrid,
          .capabilities {
            margin-left: 18px;
            margin-right: 18px;
          }

          .productGrid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          h1 {
            font-size: 18px;
          }

          .topActions .iconBtn {
            display: none;
          }

          .hero {
            padding: 18px;
          }

          .hero > div {
            align-items: flex-start;
          }

          .hero p {
            font-size: 11px;
          }

          .stats {
            gap: 8px;
          }

          .stat {
            padding: 13px;
          }

          .statValue {
            font-size: 20px;
          }

          .toolbar {
            display: block;
          }

          .search {
            min-width: 0;
            max-width: none;
            margin-bottom: 10px;
          }

          .filters {
            padding-bottom: 3px;
          }

          .sectionHead .secondary {
            display: none;
          }

          .capGrid {
            grid-template-columns: 1fr;
          }

          .capabilities {
            padding: 15px;
          }
        }
      `}</style>
    </main>
  );
}

function Nav({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link className={`navItem ${active ? "active" : ""}`} href={href}>
      <span className="navIcon">{icon}</span>
      {label}
    </Link>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="stat">
      <div className="statTop">
        <span>{label}</span>
        <span className="statIcon">{icon}</span>
      </div>
      <div className="statValue">{value}</div>
    </div>
  );
}

function Capability({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="cap">
      <div className="capIcon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function ProductModal({
  title,
  initial,
  onClose,
  onSave,
  onDelete,
}: {
  title: string;
  initial?: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
  onDelete?: () => void;
}) {
  const [name, setName] = useState(initial?.name || "");
  const [sku, setSku] = useState(initial?.sku || "");
  const [category, setCategory] = useState(initial?.category || "Clothing");
  const [price, setPrice] = useState(initial?.price?.toString() || "");
  const [stock, setStock] = useState(initial?.stock || "In stock");
  const [description, setDescription] = useState(initial?.description || "");
  const [variants, setVariants] = useState(
    initial?.variants.join(", ") || ""
  );
  const [aiEnabled, setAiEnabled] = useState(initial?.aiEnabled ?? true);
  const [files, setFiles] = useState<File[]>([]);

  function submit() {
    if (!name.trim()) return;

    const media: Media[] = initial?.media ? [...initial.media] : [];

    files.forEach((file, index) => {
      const lower = file.name.toLowerCase();
      let type: MediaType = "document";

      if (file.type.startsWith("image/")) type = "image";
      else if (file.type.startsWith("video/")) type = "video";
      else if (lower.endsWith(".pdf")) type = "pdf";
      else if (
        lower.includes("size") ||
        lower.includes("chart")
      )
        type = "chart";

      media.push({
        id: Date.now() + index,
        name: file.name,
        type,
        size:
          file.size > 1024 * 1024
            ? `${(file.size / 1024 / 1024).toFixed(1)} MB`
            : `${Math.max(1, Math.round(file.size / 1024))} KB`,
      });
    });

    onSave({
      id: initial?.id || Date.now(),
      name,
      sku: sku || `SKU-${Date.now().toString().slice(-5)}`,
      category,
      price: Number(price) || 0,
      stock,
      description,
      variants: variants
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
      aiEnabled,
      media,
    });
  }

  return (
    <div className="modalLayer">
      <div className="modal">
        <div className="modalHead">
          <div>
            <span>PRODUCT LIBRARY</span>
            <h2>{title}</h2>
          </div>
          <button onClick={onClose}>×</button>
        </div>

        <div className="formGrid">
          <label>
            Product name
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Premium Sneakers" />
          </label>

          <label>
            SKU / product code
            <input value={sku} onChange={(e) => setSku(e.target.value)} placeholder="e.g. SNK-001" />
          </label>

          <label>
            Category
            <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Clothing, footwear..." />
          </label>

          <label>
            Price (KES)
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="4500" />
          </label>

          <label>
            Stock
            <select value={stock} onChange={(e) => setStock(e.target.value)}>
              <option>In stock</option>
              <option>Low stock</option>
              <option>Out of stock</option>
            </select>
          </label>

          <label>
            Variants
            <input value={variants} onChange={(e) => setVariants(e.target.value)} placeholder="Black, White, S, M, L" />
          </label>

          <label className="wide">
            Description
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the product so Lewy understands it..." />
          </label>

          <label className="wide uploadBox">
            <span>Upload product media</span>
            <small>
              Photos, videos, PDFs, size charts, price lists, brochures,
              catalogues and documents.
            </small>
            <input
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
              onChange={(e) =>
                setFiles(Array.from(e.target.files || []))
              }
            />
            {files.length > 0 && (
              <div className="selectedFiles">
                {files.map((file) => (
                  <span key={file.name}>
                    {file.type.startsWith("image/")
                      ? "🖼️"
                      : file.type.startsWith("video/")
                      ? "🎥"
                      : file.name.toLowerCase().endsWith(".pdf")
                      ? "📄"
                      : "📝"}{" "}
                    {file.name}
                  </span>
                ))}
              </div>
            )}
          </label>

          <label className="aiPermission">
            <input
              type="checkbox"
              checked={aiEnabled}
              onChange={(e) => setAiEnabled(e.target.checked)}
            />
            <span>
              <strong>Allow Lewy to use this product</strong>
              <small>
                Lewy can use this product's information and media when
                responding to customers.
              </small>
            </span>
          </label>
        </div>

        <div className="modalFoot">
          {onDelete && (
            <button className="deleteBtn" onClick={onDelete}>
              Delete product
            </button>
          )}
          <div>
            <button className="cancelBtn" onClick={onClose}>
              Cancel
            </button>
            <button className="saveBtn" onClick={submit}>
              Save product
            </button>
          </div>
        </div>
      </div>

      <style jsx>{modalStyles}</style>
    </div>
  );
}

function MediaModal({
  product,
  onClose,
  onPreview,
}: {
  product: Product;
  onClose: () => void;
  onPreview: (media: Media) => void;
}) {
  const [media, setMedia] = useState(product.media);

  function remove(id: number) {
    setMedia((items) => items.filter((m) => m.id !== id));
  }

  return (
    <div className="modalLayer">
      <div className="modal mediaModal">
        <div className="modalHead">
          <div>
            <span>MEDIA LIBRARY</span>
            <h2>{product.name}</h2>
          </div>
          <button onClick={onClose}>×</button>
        </div>

        <div className="mediaUpload">
          <strong>+ Add more files</strong>
          <p>
            Upload additional photos, videos, PDFs, size charts, brochures,
            catalogues or other documents.
          </p>
          <input
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
            onChange={(e) => {
              const newFiles = Array.from(e.target.files || []);
              setMedia((items) => [
                ...items,
                ...newFiles.map((file, index): Media => ({
                  id: Date.now() + index,
                  name: file.name,
                  type: file.type.startsWith("image/")
                    ? "image"
                    : file.type.startsWith("video/")
                    ? "video"
                    : file.name.toLowerCase().endsWith(".pdf")
                    ? "pdf"
                    : file.name.toLowerCase().includes("size") ||
                      file.name.toLowerCase().includes("chart")
                    ? "chart"
                    : "document",
                  size:
                    file.size > 1024 * 1024
                      ? `${(file.size / 1024 / 1024).toFixed(1)} MB`
                      : `${Math.max(1, Math.round(file.size / 1024))} KB`,
                })),
              ]);
            }}
          />
        </div>

        <div className="mediaList">
          {media.map((item) => (
            <div className="mediaRow" key={item.id}>
              <div className="mediaType">{typeIcon[item.type]}</div>
              <div className="mediaInfo">
                <strong>{item.name}</strong>
                <span>
                  {item.type.toUpperCase()} · {item.size}
                </span>
              </div>
              <button onClick={() => onPreview(item)}>Preview</button>
              <button onClick={() => remove(item.id)}>Remove</button>
            </div>
          ))}
        </div>

        <div className="modalFoot">
          <span className="mediaNote">
            {media.length} media files attached
          </span>
          <button className="saveBtn" onClick={onClose}>
            Done
          </button>
        </div>
      </div>

      <style jsx>{modalStyles}</style>
    </div>
  );
}

function PreviewModal({
  media,
  onClose,
}: {
  media: Media;
  onClose: () => void;
}) {
  return (
    <div className="modalLayer">
      <div className="modal previewModal">
        <div className="modalHead">
          <div>
            <span>MEDIA PREVIEW</span>
            <h2>{media.name}</h2>
          </div>
          <button onClick={onClose}>×</button>
        </div>

        <div className="preview">
          <div className="previewIcon">{typeIcon[media.type]}</div>
          <h3>{media.name}</h3>
          <p>
            {media.type === "image"
              ? "Product image ready for customer conversations."
              : media.type === "video"
              ? "Product video ready to be shared."
              : media.type === "chart"
              ? "Size chart available to Lewy."
              : media.type === "pdf"
              ? "PDF document available to Lewy."
              : "Business document available to Lewy."}
          </p>
          <span>
            Prototype preview · {media.type.toUpperCase()} · {media.size}
          </span>
        </div>

        <div className="modalFoot">
          <button className="saveBtn" onClick={onClose}>
            Close preview
          </button>
        </div>
      </div>

      <style jsx>{modalStyles}</style>
    </div>
  );
}

const modalStyles = `
  .modalLayer {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(15, 23, 42, .62);
    backdrop-filter: blur(5px);
    display: grid;
    place-items: center;
    padding: 18px;
  }

  .modal {
    width: min(760px, 100%);
    max-height: 92vh;
    overflow: auto;
    background: white;
    border-radius: 19px;
    box-shadow: 0 25px 80px rgba(0,0,0,.25);
  }

  .modalHead {
    padding: 20px 22px;
    border-bottom: 1px solid #edf0f4;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .modalHead span {
    color: #7c3aed;
    font-size: 9px;
    font-weight: 850;
    letter-spacing: 1px;
  }

  .modalHead h2 {
    margin: 4px 0 0;
    font-size: 20px;
  }

  .modalHead button {
    border: 0;
    background: #f3f4f6;
    width: 32px;
    height: 32px;
    border-radius: 9px;
    cursor: pointer;
    font-size: 20px;
  }

  .formGrid {
    padding: 20px 22px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .formGrid label {
    color: #374151;
    font-size: 10px;
    font-weight: 750;
  }

  .formGrid input,
  .formGrid select,
  .formGrid textarea {
    display: block;
    width: 100%;
    margin-top: 6px;
    border: 1px solid #dfe3e9;
    border-radius: 9px;
    padding: 10px 11px;
    outline: none;
    font: inherit;
    font-size: 11px;
    background: white;
  }

  .formGrid textarea {
    min-height: 80px;
    resize: vertical;
  }

  .formGrid input:focus,
  .formGrid select:focus,
  .formGrid textarea:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139,92,246,.08);
  }

  .wide {
    grid-column: 1 / -1;
  }

  .uploadBox {
    border: 1px dashed #c4b5fd;
    background: #faf8ff;
    padding: 14px;
    border-radius: 11px;
  }

  .uploadBox > span {
    display: block;
    color: #5b21b6;
    font-size: 12px;
  }

  .uploadBox small {
    display: block;
    color: #6b7280;
    margin: 4px 0 10px;
    font-weight: 500;
  }

  .uploadBox input[type=file] {
    border: 0;
    padding: 4px 0;
  }

  .selectedFiles {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 8px;
  }

  .selectedFiles span {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 5px 7px;
    font-size: 9px;
    font-weight: 600;
  }

  .aiPermission {
    grid-column: 1 / -1;
    display: flex !important;
    align-items: flex-start;
    gap: 10px;
    padding: 12px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 10px;
  }

  .aiPermission input {
    width: auto;
    margin: 2px 0 0 !important;
  }

  .aiPermission strong,
  .aiPermission small {
    display: block;
  }

  .aiPermission small {
    margin-top: 3px;
    color: #6b7280;
    font-size: 9px;
    font-weight: 500;
  }

  .modalFoot {
    padding: 15px 22px;
    border-top: 1px solid #edf0f4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  .modalFoot > div {
    display: flex;
    gap: 8px;
  }

  .cancelBtn,
  .deleteBtn,
  .saveBtn {
    border: 0;
    border-radius: 9px;
    padding: 10px 14px;
    cursor: pointer;
    font-weight: 750;
    font-size: 10px;
  }

  .cancelBtn {
    background: #f3f4f6;
    color: #374151;
  }

  .deleteBtn {
    background: #fee2e2;
    color: #b91c1c;
  }

  .saveBtn {
    background: #111827;
    color: white;
  }

  .mediaUpload {
    margin: 20px 22px 12px;
    padding: 17px;
    border: 1px dashed #c4b5fd;
    background: #faf8ff;
    border-radius: 11px;
  }

  .mediaUpload strong {
    color: #5b21b6;
    display: block;
  }

  .mediaUpload p {
    color: #6b7280;
    font-size: 10px;
    margin: 4px 0 10px;
  }

  .mediaUpload input {
    font-size: 10px;
  }

  .mediaList {
    padding: 8px 22px 20px;
    display: grid;
    gap: 7px;
  }

  .mediaRow {
    border: 1px solid #edf0f4;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 9px;
  }

  .mediaType {
    width: 35px;
    height: 35px;
    border-radius: 8px;
    background: #f5f3ff;
    display: grid;
    place-items: center;
  }

  .mediaInfo {
    flex: 1;
    min-width: 0;
  }

  .mediaInfo strong,
  .mediaInfo span {
    display: block;
  }

  .mediaInfo strong {
    font-size: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mediaInfo span {
    color: #9ca3af;
    font-size: 8px;
    margin-top: 3px;
  }

  .mediaRow button {
    border: 1px solid #e5e7eb;
    background: white;
    border-radius: 7px;
    padding: 7px 9px;
    cursor: pointer;
    font-size: 9px;
  }

  .mediaNote {
    color: #6b7280;
    font-size: 9px;
  }

  .previewModal {
    width: min(540px, 100%);
  }

  .preview {
    margin: 20px 22px;
    min-height: 260px;
    border-radius: 14px;
    background: linear-gradient(135deg, #f5f3ff, #eef2ff);
    display: grid;
    place-items: center;
    align-content: center;
    text-align: center;
    padding: 30px;
  }

  .previewIcon {
    font-size: 64px;
  }

  .preview h3 {
    margin: 15px 0 4px;
    font-size: 14px;
    max-width: 90%;
    overflow-wrap: anywhere;
  }

  .preview p {
    margin: 0;
    color: #6b7280;
    font-size: 10px;
  }

  .preview > span {
    margin-top: 12px;
    color: #9ca3af;
    font-size: 8px;
  }

  @media(max-width:600px) {
    .formGrid {
      grid-template-columns: 1fr;
    }

    .wide,
    .aiPermission {
      grid-column: auto;
    }

    .modalFoot {
      align-items: stretch;
      flex-direction: column;
    }

    .modalFoot > div {
      width: 100%;
    }

    .modalFoot button {
      flex: 1;
    }

    .mediaRow button {
      padding: 6px;
    }
  }
`;
