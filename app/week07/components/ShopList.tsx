"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserProfile from "./UserProfile";
import LoginButton from "./Login";
import LogoutButton from "./Logout";

export default function ShopList({data}){
//alert(data);

    let storedUser="";
    if (typeof window !== 'undefined'){
        storedUser = localStorage.getItem("user");
    }

    const [keyword,setKeyword] = useState("");
    const filterShops = data.filter(
        (item) => {
            const searchText = keyword.toLowerCase();
            return item.shopName.toLowerCase().includes(searchText)
        }

    );
      // เพิ่มคำสั่งภายใน component ShopList ส่วนของ Script
  const router = useRouter();

  

const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this shop?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
  `http://localhost:2006/api/shops/${id}`,
  {
    method: "DELETE",
  }
      );

      if (!response.ok) {
        throw new Error("Failed to delete Shop");
      }
      // Refresh page
      router.refresh();
    } catch (error) {
      alert(error.message);
    }
};
    const Status = (sta: boolean) => {
        if (sta)
            return <span style={{ color: "green" }}>open</span>;

        return <span style={{ color: "red" }}>close</span>;
    };

    return(
        
        <div className="max-w-3xl ma-auto p-6">
            <div className="flex items-center justify-between gap-3 border border-gray-200 rounded-2xl bg-gradient-to-r from-blue-50 to-white px-5 py-4 shadow-sm">

  <div className="flex items-center gap-3">
    {/* Profile Icon */}
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold shadow-sm">
      P
    </div>

    {/* Welcome Text */}
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-blue-600">
        Welcome back
      </p>
      <h2 className="text-lg font-bold text-gray-800">
        Patipat 👋
      </h2>
      <p className="text-xs text-gray-500">
        Manage your shops here
      </p>
    </div>
  </div>

  <div className="shrink-0">
    {storedUser ? <LogoutButton /> : <LoginButton />}
  </div>

</div>
             {/* Search */}
             <br></br>
      <div className="mb-6">

        <input
          type="text"
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
          placeholder="Search shop..."
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>
            <div className="mb-4 text-gray-600">
                Found {data.length} shop(s)
            </div>
            {/* A */}
            {/* เพิ่มปุ่มเพื่อสร้างร้านค้า โดยระบุไว้ในของส่วนการแสดงผลไปยังผู้ใช้ตำแหน่งใด ๆ */}
            <div className="flex justify-between items-center">
            <Link href="/week07/new"
                className="bg-green-600 text-white px-4 py-2 rounded-lg">
                + Add New
            </Link>
            </div>
            <br></br>
            <div className="space-y-4">
                {
                    filterShops.map(shop => (
                        <div key={shop.shopId} className="border rounded-lg p-4">
                            <h2 className="forn-semibold">
                                {shop.shopName}
                            </h2>
                            <p>Open Status: {Status(shop.shopStatus)} </p>
                            <Link href={`/week07/${shop.id}`} className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded">
                            View Detail
                            </Link>
                                {/* เพิ่มปุ่มเพื่อลบร้านค้า โดยระบุไว้ในของส่วนการแสดงผลไปยังผู้ใช้ */}
                                <button onClick={(e)=>handleDelete(`${shop.id}`)}
                                    className="ms-1 bg-red-500 text-white px-3 py-2 rounded">
                                    Delete
                                </button>
                               
                                {/* B */}
                                {/* เพิ่มปุ่มเพื่อแก้ไขข้อมูลร้านค้า โดยระบุไว้ในของส่วนการแสดงผลไปยังผู้ใช้ */}
                                <Link href={`/week07/${shop.id}/edit`}
                                    className="ms-1 bg-yellow-500 text-white px-3 py-2 rounded">
                                    Update
                                </Link>


                        </div>
                    ))
                }
                
            </div>
            {/* C */}


        </div>
    );
}
