"use client";

import Header from "./header";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const MyHerbList = () => {
                  const router = useRouter();
                  return (
                    <button
                      onClick={() => router.push("/FIN02_026830491009-7/contact2")}     
                        className="px-6 py-3 bg-white text-pink-600 font-bold rounded-xl shadow-md hover:bg-pink-50 transition"
                        >
                      + เพิ่มข้อมูลสมุนไพร
                    </button>
                  );
                }
  return (
    <>
      <Header />

      <main className="min-h-screen bg-pink-50/50 dark:bg-slate-900 pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Section 1: Hero Banner แนะนำร้าน */}
          <section className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-3xl p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">
                สมุนไพรไทยแท้ 100%
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                ร้านยาสมุนไพร
              </h1>
              <p className="text-pink-100 max-w-xl text-sm md:text-base leading-relaxed">
                คัดสรรยาสมุนไพรคุณภาพดี ปลอดภัย ได้มาตรฐาน เพื่อสุขภาพที่ดีและวิถีชีวิตที่ยั่งยืนของคุณและครอบครัว
              </p>
              <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start">
                {MyHerbList()}
              </div>
            </div>
          </section>

          {/* Section 2: ข้อมูลผู้ดูแลระบบ & ติดต่อ */}
          <section className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                ข้อมูลผู้ดูแลระบบ & ติดต่อ
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                หากมีข้อสงสัยหรือต้องการสอบถามข้อมูลเพิ่มเติม
              </p>
            </div>

            {/* Profile Card ธีมชมพู */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
              <div className="h-28 bg-gradient-to-r from-pink-400 to-rose-400"></div>

              <div className="relative flex flex-col items-center px-6 pb-8 text-center">
                {/* รูปโปรไฟล์ */}
                <div className="-mt-14 mb-4">
                  <img
                    className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 shadow-md object-cover"
                    src="/images/sin.png"
                    alt="Thongsin sin Profile"
                  />
                </div>

                {/* ชื่อและตำแหน่ง */}
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  Thongsin sin
                </h3>
                <p className="text-xs text-pink-600 dark:text-pink-400 font-medium mt-0.5">
                  IT Developer / ผู้ดูแลระบบ
                </p>

                {/* รายละเอียด */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                  ศึกษาที่มหาวิทยาลัยเทคโนโลยีราชมงคลตะวันออก เขตจักรพงษภูวนารถ งานอดิเรก เล่นเกม,,ฟังเพลง ชื่นชอบเกี่ยวกับ IT ซอฟต์แวร์ ฮาร์ดแวร์
                </p>

                {/* ปุ่มติดต่อ E-mail & Github */}
                <div className="mt-5 flex items-center justify-center gap-3 w-full">
                  <a
                    href="mailto:Thongsin.khu@rmutto.ac.th"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 bg-pink-500 text-white text-xs font-semibold rounded-xl shadow-md hover:bg-pink-600 transition"
                  >
                    E-mail
                  </a>
                  <a
                    href="https://github.com/moneyfc12-sys/sin-next-app.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 border border-slate-300 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl hover:bg-pink-50 dark:hover:bg-slate-700 transition"
                  >
                    Github
                  </a>
                </div>

                {/* Social Icon (TikTok) */}
                <div className="mt-5 flex justify-center">
                  <a
                    href="https://vt.tiktok.com/ZSXDYQbm1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition transform hover:scale-110"
                  >
                    <img
                      className="w-9 h-9 rounded-full shadow-md object-cover"
                      src="/images/tiktok.png"
                      alt="TikTok logo"
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}