"use client"

import { useState,useEffect } from "react"

export default function ToDoFrom({ addTask,editingTask,updateTask,resetEditingTask }){

    const [name,setname] = useState('');
    const [det,setdet] = useState('');
    const [sup,setsup] = useState('');
    const [taskStatus,setTaskStatus] = useState('');
    

    useEffect(()=>{
    
      if(editingTask){
        const {name,status,det,sup} = editingTask;
        setname(name)
        setdet(det)
        setsup(sup)
        setTaskStatus(status)
        
      }else{
        setname('');
        setdet('')
        setsup('')
        setTaskStatus('');
        
      }
    },[editingTask]);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!name.trim()) return;
        if(editingTask){
          updateTask(editingTask.id,name,taskStatus,det,sup);
        }else{
          addTask(name,taskStatus,det,sup);
        }
        handleCancel;
    }

    const handleCancel = (e) => {
        setname('');
        setdet('')
        setsup('')
        setTaskStatus('');
        resetEditingTask();
    }
    return (
         <form onSubmit={handleSubmit}>
      <div className="m-3 p-6 bg-white rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">เพิ่มข้อมูลสมุนไพร</h3>
        <div className="flex">
          <label className="mb-2 text-sm font-medium text-slate-700">ชื่อสมุนไพร:</label>
          <input
            type="text"
            placeholder="Enter task..."
            className="w-11/12 ms-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease-content focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={name}
            onChange={(e)=>setname(e.target.value)}
          />
          
        </div>
        <br></br>
        <label className="mb-2 text-sm font-medium text-slate-700">รายละเอียด:</label>
          <input
            type="text"
            placeholder="Enter detail..."
            className="w-11/12 ms-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease-content focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={det}
            onChange={(e)=>setdet(e.target.value)}
          />
        <br></br>
        <br></br>
        <label className="mb-2 text-sm font-medium text-slate-700">ผู้ผลิต:</label>
          <input
            type="text"
            placeholder="Enter suppiler..."
            className="w-11/12 ms-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease-content focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={sup}
            onChange={(e)=>setsup(e.target.value)}
          />
        
        <div className="flex gap-3">
          <label className="mt-4 py-4 text-sm font-medium text-slate-700">การดำเนินการ:</label>
          <label className="mt-4 px-4 py-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg">
            <input type="radio" name="taskStatus" value='ใช้ภายนอก'  onChange={(e)=>setTaskStatus(e.target.value )} className="h-4 w-4 accent-blue-600 cursor-pointer" />
            <span className="text-sm font-medium text-gray-700">ใช้ภายนอก</span>
          </label>
          <label className="ms-2 mt-4 px-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg">
            <input type="radio" name="taskStatus" value='ใช้ภายใน'  onChange={(e)=>setTaskStatus(e.target.value)} className="h-4 w-4 accent-blue-600 cursor-pointer" />
            <span className="text-sm font-medium text-gray-700">ใช้ภายใน</span>
          </label>
          <label className="ms-2 mt-4 px-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg">
            <input type="radio" name="taskStatus" value='ใช้ภายในและภายนอก' defaultChecked={true} onChange={(e)=>setTaskStatus(e.target.value)} className="h-4 w-4 accent-blue-600 cursor-pointer" />
            <span className="text-sm font-medium text-gray-700">ใช้ภายในและภายนอก</span>
          </label>

          
        </div>
        <div className="flex mt-4 gap-2 justify-center">
          <button className="bg-blue-600 text-white px-4 py-1 rounded">
            {editingTask ? 'update task' : 'บันทึก'}
            
          </button>
          <button className="bg-gray-600 text-white px-4 rounded" onClick={handleCancel}>
            เคลียร์
          </button>
        </div>
      </div>
      <br></br>
      <div className="p-3 border-8 border-double border-blue-700 shadow-xl overflow-hidden outline-4 outline-offset-2 outline-blue-700 bg-gradient-to-r from-pink-300 to-blue-300 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">รายการสมุนไพรในระบบ</h3>
        </div>
    </form>
    ); 
}