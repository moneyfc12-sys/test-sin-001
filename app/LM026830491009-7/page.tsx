"use client";

import Header from "./header";
import Footer from "./footer";
import { dataItem, } from "./dataitem";
import { useState } from "react";
import ToDoFrom from "./ToDoFrom";
import Modal from "./Modal";

export default function HerbHome() {

    const DataItem = [...dataItem, ];

    const [tasks, setTasks] = useState(DataItem);
    const [numOFTasks, setNoft] = useState(tasks.length);
    const [status, setStatus] = useState(null);
    const [open, setOpen] = useState(false);
    const [selected, setSelectedTask] = useState(null);
    const [editingtask,setEditingTask] = useState(null)

    const reseteditingTask = () => setEditingTask(null);

    const fillteredTasks =
        status == null
            ? tasks
            : tasks.filter((item) => item.status == status);

    let name = "Patipat Trakoonkjantarasiri";
    const major = "เทคโนโลยีสารสนเทศ (Information Technology)";
    let classyear = 2;
    let classSec = "ทส.ท.";
    let active = true;

    const isActive = (act: boolean) => {
        if (act)
            return <span style={{ color: "green" }}>กำลังศึกษาอยู่</span>;

        return <span style={{ color: "red" }}>ไม่ได้เป็นนักศึกษาแล้ว</span>;
    };

    const Status = (sta: boolean) => {
        if (sta)
            return <span style={{ color: "green" }}>ทำแล้ว</span>;

        return <span style={{ color: "red" }}>ยังไม่ได้ทำ</span>;
    };

    const onEdit = (t) => {
        //alert(`งานที่คุณต้องการแก้ไข ${t}`);
        setEditingTask(t);
    };

    const onDelete = (id) => {
        //alert(`คุณต้องการลบข้อมูล รหัสงาน ${id}?`);
        const updateTasks = tasks.filter(
            item => item.id != id
        );
        setTasks(updateTasks);
    };

    const updateTask = (id,name,status,det) => {
        setTasks(
            tasks => tasks.map(
                t =>t.id === id ?
             {   ...t,
                name: name,
                status: status,
                detail:det
             }  :t

            ) );
            setEditingTask(null);
    }

    const tmpTdl = fillteredTasks.map((item, index) => {

        const { id, name ,detail ,type,supplier} = item;

        return (
            <div className="w-full min-w-0 bg-white dark:bg-slate-800 border-8 border-double border-blue-700 shadow-xl overflow-hidden p-6 outline-4 outline-offset-2 outline-blue-700 bg-gradient-to-r from-pink-300 to-blue-300" key={id}>

                <span>ชื่อสมุนไพร: {name}</span>
                <br />

                <span>รายละเอียด: {detail}</span>
                <br />

                <span>ประเภท: {type}</span>
                <br />

                <span>ผู้ผลิต: {supplier}</span>
                <br />

                

                <Modal open={open} onClose={() => setOpen(false)}>
                    {selected && (
                        <div>
                            <p>หัวข้อ:{selected.name}</p>
                            <p>คำอธิบาย:{selected.desc}</p>
                            <p>วันที่: {selected.data_added}</p>
                            <p>ผู้เขียน: {selected.author}</p>
                            <p>สถานะ: {Status(selected.status)}</p>
                        </div>
                    )}
                </Modal>

                <div className="flex flex-wrap gap-2 mt-2">

                    {/* View 
                    <button onClick={(e) => { setSelectedTask(item); setOpen(true); }} className="bg-green-500 text-white px-3 py-1 rounded">
                        View
                    </button>*/}

                    {/* Edit 
                    <button onClick={(e) => onEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                        Edit
                    </button>*/}

                    {/* Delete */}
                    <button onClick={(e) => onDelete(id)} className="bg-red-500 text-white px-3 py-1 rounded">
                        Delete
                    </button>

                </div>

            </div>
        );
    });

    const addTask = (name, status,det,sup) => {

        const newTask = {
            id: tasks.length + 1,
            name: name,
            detail: det,
            type: status,
            supplier: sup
        };

        setTasks([...tasks, newTask]);
        setNoft(tasks.length + 1);
    };

    console.log(`Name: ${name}`);
    console.log(`Major: ${major}`);

    return (
        <>
            <Header />

            <section className="relative bg-cover bg-center min-h-screen text-center px-4 py-15" style={{ backgroundImage: `url('/images/concert.jpg')` }}>

                {/* ข้อมูลนักศึกษา */}
                <div className="max-w-sm mx-auto bg-white dark:bg-slate-800 border-8 border-double border-blue-700 shadow-xl overflow-hidden mb-20 p-8 outline-4 outline-offset-2 outline-blue-700 bg-gradient-to-r from-pink-300 to-blue-300">

                    <h3 className="text-xl font-bold text-slate-800 dark:text-white text-shadow-lg/30">
                        To Do Lists:
                    </h3>

                    <br />

                    <p className="text-shadow-lg/20">
                        ชื่อ-สกุล: {name}
                        <br />
                        สาขา: {major}
                        <br />
                        กลุ่มเรียน/ชั้นปี: {classSec}/ {classyear}
                        <br />
                        สถานะภาพนักศึกษา: {isActive(active)}
                    </p>

                </div>

                {/* Form */}
                <div className="w-full max-w-7xl mx-auto mb-8">
                    <ToDoFrom 
                    addTask={addTask}
                    editingTask={editingtask}
                    updateTask={updateTask}
                    resetEditingTask={reseteditingTask}
                     />
                </div>

                {/* จำนวนงาน + Filter */}
                <div className="w-full max-w-7xl mx-auto flex flex-wrap justify-center items-start gap-6 mb-8">
                        {/* 
                    <div className="space-y-3 bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-full shadow-xs bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 border-8 border-indigo-600">

                        <div>
                            งานที่ต้องทำ{numOFTasks} x รายการ
                        </div>

                        <div>
                            <button onClick={addTask} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-full text-sm px-4 py-2.5 text-center leading-5">
                                เพิ่มงาน
                            </button>
                        </div>

                    </div>

                    <div className="space-y-2">
                        {/*  
                        <button onClick={() => setStatus(null)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium text-sm px-4 py-2.5 text-center leading-5 rounded-full">
                            [A] All
                        </button>

                        <button onClick={() => setStatus(true)} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-full text-sm px-4 py-2.5 text-center leading-5">
                            [C] Completed
                        </button>

                        <button onClick={() => setStatus(false)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-full text-sm px-4 py-2.5 text-center leading-5">
                            [P] Pending
                        </button>
                    </div>*/}

                </div>

                {/* รายการงาน */}
                <div className="w-full max-w-7xl mx-auto px-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">

                        {tmpTdl}

                    </div>

                </div>

            </section>

            <Footer />

        </>
    );
}