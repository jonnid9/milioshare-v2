
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const defaultTemplates = [
  {
    name:"Seedance Private",
    content:"🎉 PENYERAHAN AKUN SEEDANCE PRIVATE 🎉\n\n📦 Paket : SEEDANCE PRIVATE 1 BULAN"
  },
  {
    name:"Google Veo Flow Basic",
    content:"🎉 PENYERAHAN AKUN GOOGLE FLOW VEO 3.1 BASIC 🎉"
  },
  {
    name:"Super Grok Ultimate",
    content:"🎉 PENYERAHAN AKUN SUPER GROK ULTIMATE 🎉"
  },
  {
    name:"Kling Motion Control Pro",
    content:"🎉 PENYERAHAN AKUN KLING MOTION CONTROL PRO / ALL IN 🎉"
  },
  {
    name:"Flow Ultra Sharing",
    content:"🔥 GOOGLE FLOW ULTRA VIP BASIC (EXTENSION)"
  }
];

function App(){
  const [templates,setTemplates] = useState(()=>{
    const saved = localStorage.getItem("miliolab_templates");
    return saved ? JSON.parse(saved) : defaultTemplates;
  });

  const [selected,setSelected] = useState(0);
  const [newName,setNewName] = useState("");
  const [newContent,setNewContent] = useState("");

  useEffect(()=>{
    localStorage.setItem("miliolab_templates",JSON.stringify(templates));
  },[templates]);

  const updateContent=(v)=>{
    const updated=[...templates];
    updated[selected].content=v;
    setTemplates(updated);
  }

  const addTemplate=()=>{
    if(!newName)return;
    setTemplates([...templates,{
      name:newName,
      content:newContent
    }]);
    setNewName("");
    setNewContent("");
  }

  return(
    <div className="app">
      <div className="sidebar">
        <h2>MILIOLAB.AI</h2>
        {templates.map((t,i)=>(
          <button
            key={i}
            className={selected===i?"active":""}
            onClick={()=>setSelected(i)}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="editor">
        <h1>{templates[selected].name}</h1>
        <textarea
          value={templates[selected].content}
          onChange={(e)=>updateContent(e.target.value)}
        />
      </div>

      <div className="addpanel">
        <h3>Tambah Template</h3>
        <input
          placeholder="Nama Template"
          value={newName}
          onChange={(e)=>setNewName(e.target.value)}
        />
        <textarea
          placeholder="Isi Template"
          value={newContent}
          onChange={(e)=>setNewContent(e.target.value)}
        />
        <button onClick={addTemplate}>SIMPAN TEMPLATE</button>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
