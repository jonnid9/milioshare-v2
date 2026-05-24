
import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const starter = [
{name:"Seedance Private", text:"🎉 PENYERAHAN AKUN SEEDANCE PRIVATE 🎉"},
{name:"Google Veo 3.1 Basic", text:"🎉 PENYERAHAN AKUN GOOGLE FLOW VEO 3.1 BASIC 🎉"},
{name:"Super Grok Ultimate", text:"🎉 PENYERAHAN AKUN SUPER GROK ULTIMATE 🎉"},
{name:"Kling Motion Control Basic", text:"🎉 PENYERAHAN AKUN KLING MOTION CONTROL BASIC 🎉"},
{name:"Flow Ultra Sharing", text:"🔥 GOOGLE FLOW ULTRA VIP BASIC (EXTENSION)"}
];

function App(){
const [templates,setTemplates]=useState(()=>{
const s=localStorage.getItem("milio_templates");
return s?JSON.parse(s):starter;
});

const [selected,setSelected]=useState(0);
const [wa,setWa]=useState("081216589695");
const [msg,setMsg]=useState("Halo OM MILIO, saya mau berlangganan tools AI premium.");
const [newName,setNewName]=useState("");
const [newText,setNewText]=useState("");

useEffect(()=>{
localStorage.setItem("milio_templates",JSON.stringify(templates));
},[templates]);

const updateText=(v)=>{
const arr=[...templates];
arr[selected].text=v;
setTemplates(arr);
}

const addTemplate=()=>{
if(!newName)return;
setTemplates([...templates,{name:newName,text:newText}]);
setNewName("");
setNewText("");
}

const waLink=`https://wa.me/62${wa.replace(/^0/,'')}?text=${encodeURIComponent(msg)}`;

return(
<div className="wrap">

<div className="left">
<div className="logo">MILIOLAB.AI</div>

{templates.map((t,i)=>(
<button key={i}
className={selected===i?"active":""}
onClick={()=>setSelected(i)}>
{t.name}
</button>
))}

</div>

<div className="center">

<h1>MILIOLAB.AI TEMPLATE CENTER</h1>

<textarea
value={templates[selected].text}
onChange={(e)=>updateText(e.target.value)}
/>

<button
className="copy"
onClick={()=>{
navigator.clipboard.writeText(templates[selected].text)
alert("Template copied")
}}>
COPY TEMPLATE
</button>

</div>

<div className="right">

<div className="card">
<h3>WA LINK GENERATOR</h3>

<input
value={wa}
onChange={(e)=>setWa(e.target.value)}
placeholder="Nomor WA"
/>

<textarea
value={msg}
onChange={(e)=>setMsg(e.target.value)}
/>

<input value={waLink} readOnly />

<button
onClick={()=>{
navigator.clipboard.writeText(waLink)
alert("WA Link copied")
}}>
COPY WA LINK
</button>
</div>

<div className="card">
<h3>TAMBAH TEMPLATE</h3>

<input
placeholder="Nama Template"
value={newName}
onChange={(e)=>setNewName(e.target.value)}
/>

<textarea
placeholder="Isi template"
value={newText}
onChange={(e)=>setNewText(e.target.value)}
/>

<button onClick={addTemplate}>
SIMPAN TEMPLATE
</button>
</div>

<div className="card">
<h3>BANNER PROMPT GENERATOR</h3>

<textarea
defaultValue="TOOLS AI PREMIUM ORIGINAL — FULL SERVICE & FULL GARANSI"
></textarea>

<button
onClick={()=>{
alert("Prompt siap copy")
}}>
COPY PROMPT
</button>

</div>

</div>

</div>
)
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>)
