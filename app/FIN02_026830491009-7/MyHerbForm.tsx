"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const API_URL = "http://localhost:8000/api/shops";
const LIST_PAGE = "/FIN02_026830491009-7/contact2";

export default function ShopForm({ mode = "add", id: idProp = null }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = idProp ?? searchParams.get("id");
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    shopName: "",
    shopType: "",
    shopDetails: "",
    shopManufacturer: "",
    shopManufacturerContact: "", // ฟิลด์ใหม่: ข้อมูลติดต่อผู้ผลิต
    shopUsage: "ยาใช้ทั้งภายในและภายนอก", // ฟิลด์ใหม่: การนำไปใช้ (Default)
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;

    if (!id) {
      setError("ไม่พบ ID ที่ต้องการแก้ไข");
      setFetching(false);
      return;
    }

    const loadShop = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("ไม่พบข้อมูลที่ต้องการแก้ไข");
        }
        const data = await response.json();

        setForm({
          shopName: data.shopName ?? "",
          shopType: data.shopType ?? "",
          shopDetails: data.shopDetails ?? "",
          shopManufacturer: data.shopManufacturer ?? data.Pro ?? "",
          shopManufacturerContact: data.shopManufacturerContact ?? "",
          shopUsage: data.shopUsage ?? "ยาใช้ทั้งภายในและภายนอก",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };

    loadShop();
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = isEdit ? `${API_URL}/${id}` : API_URL;
      const method = isEdit ? "PUT" : "POST";

      const payload = {
        ...form,
        shopStatus: true
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(isEdit ? "Failed to update shop." : "Failed to create Shop");
      }

      router.push(LIST_PAGE);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <p className="p-6">กำลังโหลดข้อมูล...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h2 className="text-2xl font-bold">
        {isEdit ? "แก้ไขข้อมูลสมุนไพร" : "เพิ่มข้อมูลสมุนไพร"}
      </h2>

      {error && <p className="text-red-600">{error}</p>}

      {/* ชื่อสมุนไพร */}
      <div>
        <label className="block font-semibold mb-1">ชื่อสมุนไพร</label>
        <input
          type="text" name="shopName" value={form.shopName}
          onChange={handleChange} required
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* ประเภทสมุนไพร */}
      <div>
        <label className="block font-semibold mb-1">ประเภทสมุนไพร</label>
        <select
          name="shopType" value={form.shopType}
          onChange={handleChange} required
          className="w-full border rounded-lg p-3"
        >
          <option value="">Please select</option>
          <option value="หัว">หัว</option>
          <option value="ใบ">ใบ</option>
        </select>
      </div>

      {/* รายละเอียดสมุนไพร */}
      <div>
        <label className="block font-semibold mb-1">รายละเอียดสมุนไพร</label>
        <input
          type="text" name="shopDetails" value={form.shopDetails}
          onChange={handleChange} required
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* ผู้ผลิต */}
      <div>
        <label className="block font-semibold mb-1">ผู้ผลิต</label>
        <input
          type="text" name="shopManufacturer" value={form.shopManufacturer}
          onChange={handleChange} required
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* ข้อมูลติดต่อผู้ผลิต (เพิ่มใหม่) */}
      <div>
        <label className="block font-semibold mb-1">ข้อมูลติดต่อผู้ผลิต</label>
        <input
          type="text" name="shopManufacturerContact" value={form.shopManufacturerContact}
          onChange={handleChange} required
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* การนำไปใช้ (เพิ่มใหม่) */}
      <div>
        <label className="block font-semibold mb-2">การนำไปใช้</label>
        <div className="flex flex-wrap gap-4 items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio" name="shopUsage" value="ยาใช้ภายใน"
              checked={form.shopUsage === "ยาใช้ภายใน"}
              onChange={handleChange}
              className="w-4 h-4"
            />
            ยาใช้ภายใน
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio" name="shopUsage" value="ยาใช้ภายนอก"
              checked={form.shopUsage === "ยาใช้ภายนอก"}
              onChange={handleChange}
              className="w-4 h-4"
            />
            ยาใช้ภายนอก
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio" name="shopUsage" value="ยาใช้ทั้งภายในและภายนอก"
              checked={form.shopUsage === "ยาใช้ทั้งภายในและภายนอก"}
              onChange={handleChange}
              className="w-4 h-4"
            />
            ยาใช้ทั้งภายในและภายนอก
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          type="submit" disabled={loading}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Saving..." : isEdit ? "Update Shop" : "Add Shop"}
        </button>

        <button
          type="button" onClick={() => router.push(LIST_PAGE)}
          className="bg-gray-300 px-5 py-3 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}