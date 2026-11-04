"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ShopList({ data }) {
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const [keyword, setKeyword] = useState("");
  const filterShops = data.filter((item) => {
    const searchText = keyword.toLowerCase();
    return item.shopName.toLowerCase().includes(searchText); 
  });

  const router = useRouter();

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this shop?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:8000/api/shops/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete Shop");
      }
      router.refresh();
    } catch (error) {
      alert(error.message);
    }
  };

  const Status = (sta) => {
    if (sta === "หัว") return <span style={{ color: "green" }}>หัว</span>;
    if (sta === "ใบ") return <span style={{ color: "green" }}>ใบ</span>;
    return <span style={{ color: "green" }}>{sta || "ไม่ระบุ"}</span>;
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="">{/* Profile section */}</div>
          </div>
        ) : (
          <div className="">{/* Login prompt section */}</div>
        )}
      </div>

      <br></br>
      <div className="mb-6">
        <input
          type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search..."
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 text-gray-600">Found {filterShops.length} Herb</div>

      <div className="flex justify-between items-center">
        <Link
          href="/FIN02_026830491009-7/new"
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          + Add New
        </Link>
      </div>
      <br></br>

      <div className="space-y-4">
        {filterShops.map((shop) => (
          <div key={shop.id || shop.shopId} className="border rounded-lg p-4 bg-white shadow-sm">
            <h2 className="font-semibold text-lg">{shop.shopName}</h2>
            
            <div className="mt-2 text-sm text-gray-700">
              <p className="my-1"><strong>ประเภทสมุนไพร:</strong> {Status(shop.shopType)} </p>
              <p className="my-1"><strong>รายละเอียด:</strong> {shop.shopDetails || shop.shopType} </p>
              <p className="my-1"><strong>การนำไปใช้:</strong> {shop.shopUsage || "ไม่ระบุ"} </p>
              <p className="my-1"><strong>ผู้ผลิต:</strong> {shop.shopManufacturer || shop.Pro || "ยังไม่มีข้อมูล"} </p>
              <p className="my-1"><strong>ข้อมูลติดต่อผู้ผลิต:</strong> {shop.shopManufacturerContact || "ยังไม่มีข้อมูล"} </p>
            </div>
            
            <div className="mt-4 flex gap-2">
              <Link
                href={`/FIN02_026830491009-7/edit?id=${shop.id}`}
                className="bg-yellow-500 text-white px-3 py-1.5 rounded"
              >
                Edit
              </Link>
              <button
                onClick={(e) => handleDelete(`${shop.id}`)}
                className="bg-red-500 text-white px-3 py-1.5 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}