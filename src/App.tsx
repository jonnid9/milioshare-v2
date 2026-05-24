import React, { useEffect, useMemo, useState } from 'react';

type Need = 'email' | 'password' | 'link' | 'kode' | 'tanggal';
type TemplateItem = {
  id: string;
  name: string;
  category: string;
  title: string;
  packageName: string;
  needs: Need[];
  detail?: string[];
  bonus?: string[];
  premium?: string[];
  rules?: string[];
  support?: string[];
  flowUltra?: { servers: number };
};

const ADMIN_LINK = 'https://wa.link/d3t9ge';
const EXT_LINK = 'https://apps.texaproject.com/ext/TEKNO_APPS_v5.2.0_PROD.zip';
const APK_LINK = 'https://www.dropbox.com/scl/fi/5hlu7owq1bfshczuppbcg/TeknoApps_V1.2.apk?rlkey=r2zzwgqv0ok9p4k5fiwkmi5hx&st=bp23y15w&dl=1&utm_source=chatgpt.com';
const KIWI_LINK = 'https://github.com/kiwibrowser/src.next/releases/download/14310011181/com.kiwibrowser.browser-arm64-14310011181-github.apk';

const defaultRules = [
  'Dilarang mengganti password/email',
  'Jangan login berlebihan di banyak device',
  'Dilarang share akun ke publik',
  'Gunakan dengan normal & wajar',
  'Garansi berlaku selama masa aktif apabila bukan karena human error user',
];

const defaultSupport = ['Full Service', 'Full Garansi', 'Support Fast Respon', 'Dibantu sampai bisa login'];
const premiumAllIn = ['Generate Kling MC', 'Generate Veo 3.1', 'Generate Super Grok', 'Generate Happy Horse', 'Generate Seedance'];

const templatesDefault: TemplateItem[] = [
  {
    id: 'seedance', category: 'Tools Private', name: 'Seedance Private', title: '🎉 PENYERAHAN AKUN SEEDANCE PRIVATE 🎉', packageName: 'SEEDANCE PRIVATE 1 BULAN', needs: ['email','password','link','tanggal'],
    bonus: ['Happy Horse 15 Video', 'GPT Image Unlimited', 'Seedream Image Unlimited']
  },
  {
    id: 'veo-basic', category: 'Google Veo', name: 'Google Flow Veo Basic', title: '🎉 PENYERAHAN AKUN GOOGLE FLOW VEO BASIC 🎉', packageName: 'FLOW VEO 3.1 BASIC LITE MODE', needs: ['email','password','link','tanggal'],
    bonus: ['Happy Horse 5 Video', 'GPT Image Unlimited', 'Seedream Image Unlimited'], detail: ['40 Video Perhari', 'Masa Aktif 1 Bulan']
  },
  {
    id: 'veo-pro', category: 'Google Veo', name: 'Google Flow Veo Pro', title: '🎉 PENYERAHAN AKUN GOOGLE FLOW VEO PRO 🎉', packageName: 'FLOW VEO 3.1 PRO FAST', needs: ['email','password','link','tanggal'],
    bonus: ['Happy Horse 5 Video', 'GPT Image Unlimited', 'Seedream Image Unlimited'], detail: ['60 Video Perhari', 'Masa Aktif 1 Bulan']
  },
  {
    id: 'veo-ultimate', category: 'Google Veo', name: 'Google Flow Veo Ultimate', title: '🎉 PENYERAHAN AKUN GOOGLE FLOW VEO ULTIMATE 🎉', packageName: 'FLOW VEO 3.1 ULTIMATE FAST', needs: ['email','password','link','tanggal'],
    bonus: ['Happy Horse 5 Video', 'GPT Image Unlimited', 'Seedream Image Unlimited'], detail: ['Unlimited Fast', 'Quality 30 Video', 'Masa Aktif 1 Bulan']
  },
  {
    id: 'grok-basic', category: 'Super Grok', name: 'Super Grok Basic', title: '🎉 PENYERAHAN AKUN SUPER GROK BASIC 🎉', packageName: 'SUPER GROK BASIC', needs: ['email','password','link','tanggal'],
    bonus: ['Happy Horse 5 Video', 'GPT Image Unlimited', 'Seedream Image Unlimited'], detail: ['30 Video Perhari', 'Masa Aktif 1 Bulan']
  },
  {
    id: 'grok-ultimate', category: 'Super Grok', name: 'Super Grok Ultimate', title: '🎉 PENYERAHAN AKUN SUPER GROK ULTIMATE 🎉', packageName: 'SUPER GROK ULTIMATE', needs: ['email','password','link','tanggal'],
    bonus: ['Happy Horse 15 Video', 'GPT Image Unlimited', 'Seedream Image Unlimited'], detail: ['Unlimited Video Perhari', 'Masa Aktif 1 Bulan']
  },
  {
    id: 'happy-horse', category: 'Tools Private', name: 'Happy Horse Ultimate', title: '🎉 PENYERAHAN AKUN HAPPY HORSE ULTIMATE 🎉', packageName: 'HAPPY HORSE ULTIMATE', needs: ['email','password','link','tanggal'],
    bonus: ['GPT Image Unlimited', 'Seedream Image Unlimited'], detail: ['Unlimited Generate', 'Masa Aktif 1 Bulan']
  },
  {
    id: 'suno', category: 'Tools Private', name: 'Suno Ultimate', title: '🎉 PENYERAHAN AKUN SUNO ULTIMATE 🎉', packageName: 'SUNO ULTIMATE UNLIMITED', needs: ['email','password','link','tanggal'],
    bonus: ['GPT Image Unlimited', 'Seedream Image Unlimited'], detail: ['Unlimited Generate', 'Masa Aktif 1 Bulan']
  },
  {
    id: 'kling-basic', category: 'Kling / All In', name: 'Kling Motion Control Basic / All In', title: '🎉 PENYERAHAN AKUN KLING MOTION CONTROL BASIC / ALL IN 🎉', packageName: 'KLING MOTION CONTROL BASIC / ALL IN', needs: ['email','password','link','tanggal'],
    detail: ['Total Harian Mendapat 8x Generate', '2x Generate V3.0 Standar', '2x Generate V3.0 Pro', '2x Generate V2.6 Standar', '2x Generate V2.6 Pro', 'Bonus Harian Kredit 120'],
    bonus: ['Suno 2x Sehari', 'Seedream Image Unlimited', 'GPT Image Unlimited'], premium: premiumAllIn
  },
  {
    id: 'kling-pro', category: 'Kling / All In', name: 'Kling Motion Control Pro / All In', title: '🎉 PENYERAHAN AKUN KLING MOTION CONTROL PRO / ALL IN 🎉', packageName: 'KLING MOTION CONTROL PRO / ALL IN', needs: ['email','password','link','tanggal'],
    detail: ['Total Harian Mendapat 14x Generate', '4x Generate V3.0 Standar', '3x Generate V3.0 Pro', '4x Generate V2.6 Standar', '3x Generate V2.6 Pro', 'Bonus Harian Kredit 200'],
    bonus: ['Suno 5x Sehari', 'Seedream Image Unlimited', 'GPT Image Unlimited'], premium: premiumAllIn
  },
  {
    id: 'kling-ultimate', category: 'Kling / All In', name: 'Kling Motion Control Ultimate / All In', title: '🎉 PENYERAHAN AKUN KLING MOTION CONTROL ULTIMATE / ALL IN 🎉', packageName: 'KLING MOTION CONTROL ULTIMATE / ALL IN', needs: ['email','password','link','tanggal'],
    detail: ['Total Harian Mendapat 20x Generate', '5x Generate V3.0 Standar', '5x Generate V3.0 Pro', '5x Generate V2.6 Standar', '5x Generate V2.6 Pro', 'Bonus Harian Kredit 400'],
    bonus: ['Suno 10x Sehari', 'Seedream Image Unlimited', 'GPT Image Unlimited'], premium: premiumAllIn
  },
  {
    id: 'chatgpt', category: 'Tools Support', name: 'Chat GPT Plus Private', title: '🎉 PENYERAHAN AKUN CHAT GPT PLUS PRIVATE 🎉', packageName: 'CHAT GPT PLUS PRIVATE', needs: ['email','password','tanggal'],
    detail: ['GPT-4o Active', 'Upload File', 'GPT Image Generation', 'Faster Response', 'Advanced AI Features']
  },
  {
    id: 'capcut', category: 'Tools Support', name: 'CapCut Pro Private', title: '🎉 PENYERAHAN AKUN CAPCUT PRO PRIVATE 🎉', packageName: 'CAPCUT PRO PRIVATE', needs: ['email','password','tanggal'],
    detail: ['Semua Fitur Pro Active', 'Export Tanpa Watermark', 'Premium Effect & Template', 'Premium Font & Asset', 'HD / 4K Export']
  },
  {
    id: 'flow-ultra-basic', category: 'Flow Ultra Sharing', name: 'Flow Ultra VIP Basic Extension', title: '🔥 PENYERAHAN AKUN GOOGLE FLOW ULTRA VIP BASIC (EXTENSION) 🔥', packageName: 'GOOGLE FLOW ULTRA VIP BASIC (EXTENSION)', needs: ['kode','tanggal'], flowUltra: {servers: 3}
  },
  {
    id: 'flow-ultra-pro', category: 'Flow Ultra Sharing', name: 'Flow Ultra VIP Pro Extension', title: '🔥 PENYERAHAN AKUN GOOGLE FLOW ULTRA VIP PRO (EXTENSION) 🔥', packageName: 'GOOGLE FLOW ULTRA VIP PRO (EXTENSION)', needs: ['kode','tanggal'], flowUltra: {servers: 5}
  },
  {
    id: 'flow-ultra-ultimate', category: 'Flow Ultra Sharing', name: 'Flow Ultra VIP Ultimate Extension', title: '🔥 PENYERAHAN AKUN GOOGLE FLOW ULTRA VIP ULTIMATE (EXTENSION) 🔥', packageName: 'GOOGLE FLOW ULTRA VIP ULTIMATE (EXTENSION)', needs: ['kode','tanggal'], flowUltra: {servers: 7}
  },
];

function checklist(items: string[]) { return items.map(x => `✅ ${x}`).join('\n'); }
function bullets(items: string[]) { return items.map(x => `• ${x}`).join('\n'); }
function sep() { return '━━━━━━━━━━━━━━━'; }
function bigSep() { return '━━━━━━━━━━━━━━━━━━━━━━'; }

function compose(t: TemplateItem, data: Record<string,string>) {
  const email = data.email || 'xxxxxxxx@gmail.com';
  const password = data.password || 'xxxxxxxx';
  const link = data.link || 'xxxxxxxx';
  const kode = data.kode || 'xxxxxxxxxxxxxxxx';
  const tanggal = data.tanggal || 'xxxxxxxx';

  if (t.flowUltra) {
    const serverText = t.flowUltra.servers === 3 ? 'Server 1, 2, atau 3' : t.flowUltra.servers === 5 ? 'Server 1, 2, 3, 4, atau 5' : 'Server 1–7';
    return `${t.title}\n${bigSep()}\n\nTerima kasih sudah order di *MILIOLAB.AI* 💎\n\n⚠️ *INFO PENTING*\nIni adalah *PAKET SHARING (AKUN BERBAGI)*, bukan akun private.\nAkses *Google Flow Ultra Private* saat ini tersedia di harga premium.\n\nGunakan akun ini dengan bijak karena:\n\n✔ Masih bisa *UNLIMITED generate (VEO 3.1 – lower priority)*\n✔ Disarankan:\n• Maksimal *2 output per generate*\n• Jika gagal → gunakan *1 output saja*\n\n${bigSep()}\n\n🧠 *JIKA GAGAL GENERATE, CEK INI:*\n\n• Pastikan *foto & prompt sudah sesuai*\n• Coba *pindah server (${serverText})*\n• Gunakan *internet stabil*\n• *Close browser* lalu login ulang\n• Ulangi generate secara bertahap (hindari spam)\n\n${bigSep()}\n\n📱 *BATAS DEVICE (WAJIB DIPATUHI)*\n\n• Maksimal: *2 perangkat aktif*\n• Wajib logout perangkat lama sebelum login baru\n\n❗ Karena ini *paket sharing*, pelanggaran device berisiko *banned sistem tanpa garansi*\n\n${bigSep()}\n\n📦 *DETAIL AKUN & AKSES*\n\n📱 *PENGGUNA IOS MOBILE*\nMenggunakan Browser *ORION*\n\n📱 *PENGGUNA ANDROID*\nMenggunakan APK yang terlampir\n\n⚠️ Simak tutorial sampai selesai sebelum penggunaan\n\n🔗 *LINK EXTENSION — LAPTOP / PC / IOS ORION*\n${EXT_LINK}\n\n🔗 *LINK APK ANDROID*\n${APK_LINK}\n\n🔗 *LINK KIWI BROWSER*\n${KIWI_LINK}\n\n🎟 *Kode Akses:*\n\`${kode}\`\n\n📦 *Paket:*\n${t.packageName}\n\n📅 *Tanggal Aktif:*\n\`${tanggal}\`\n\n🛡 *Masa Aktif:*\n30 Hari\n\n${bigSep()}\n\n⚙️ *FITUR UTAMA*\n\n✅ ${t.flowUltra.servers} Server Google Flow\n✅ Bonus Server Super Grok\n✅ Bonus Chat GPT PLUS 1 Bulan\n✅ Bebas pindah server sesuai kondisi\n✅ Setara memiliki ${t.flowUltra.servers} jalur akses berbeda\n\n${bigSep()}\n\n⚠️ *KEBIJAKAN PEMBELIAN*\n\n• Tidak dapat refund setelah pembelian\n• Ini adalah paket sharing, performa bisa fluktuatif tergantung penggunaan\n• Jika terjadi kendala, mohon bersabar\n• Tim akan berusaha maksimal memperbaiki secepat mungkin\n\n${bigSep()}\n\n🎥 *PENTING*\n\nPastikan menonton tutorial sampai selesai agar tidak terjadi kesalahan penggunaan.\n\n${bigSep()}\n\n🛠 *SUPPORT & GARANSI*\n\n✅ Full Service\n✅ Full Garansi\n✅ Support Fast Respon\n✅ Dibantu sampai berhasil install\n\n📲 *OM MILIO*\nCHAT ADMIN DISINI:\n${ADMIN_LINK}\n\n${bigSep()}\n\n💎 *MILIOLAB.AI*\nArtificial Intelligence for Real Business Growth 🚀`;
  }

  const accountLines: string[] = [];
  if (t.needs.includes('email')) accountLines.push(`📧 Email :\n\`${email}\``);
  if (t.needs.includes('password')) accountLines.push(`🔑 Password :\n\`${password}\``);
  if (t.needs.includes('link')) accountLines.push(`🔗 Link Akses :\n\`${link}\``);
  accountLines.push(`📦 Paket :\n${t.packageName}`);
  accountLines.push(`📅 Tanggal Aktif :\n\`${tanggal}\``);
  accountLines.push(`🛡 Masa Aktif :\n30 Hari`);

  const sections: string[] = [
    `${t.title}\n\nTerima kasih sudah order di *MILIOLAB.AI* 💎\nBerikut detail akun kamu:\n\n${sep()}\n🔐 *DETAIL AKUN*\n\n${accountLines.join('\n\n')}`
  ];

  if (t.detail?.length) sections.push(`${sep()}\n⚙️ *DETAIL / SISTEM PAKET*\n\n${checklist(t.detail)}`);
  if (t.bonus?.length) sections.push(`${sep()}\n🎁 *BONUS AKTIF*\n\n${checklist(t.bonus)}`);
  if (t.premium?.length) sections.push(`📌 *FITUR PREMIUM*\n\n${checklist(t.premium)}`);
  sections.push(`${sep()}\n📌 *RULES PEMAKAIAN*\n\n${bullets(t.rules || defaultRules)}`);
  sections.push(`${sep()}\n🛠 *SUPPORT & GARANSI*\n\n${checklist(t.support || defaultSupport)}\n\n📲 *OM MILIO*\nCHAT ADMIN DISINI:\n${ADMIN_LINK}`);
  sections.push(`${sep()}\n💎 *MILIOLAB.AI*\nArtificial Intelligence for Real Business Growth 🚀`);
  return sections.join('\n\n');
}

const blank: TemplateItem = { id: '', name: '', category: 'Custom', title: '🎉 PENYERAHAN AKUN CUSTOM 🎉', packageName: '', needs: ['email','password','link','tanggal'], detail: [], bonus: [] };

export default function App() {
  const [templates, setTemplates] = useState<TemplateItem[]>(() => {
    const saved = localStorage.getItem('milio_templates_v2');
    return saved ? JSON.parse(saved) : templatesDefault;
  });
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(templates[0]?.id || 'seedance');
  const [data, setData] = useState({ email: '', password: '', link: '', kode: '', tanggal: '' });
  const [copied, setCopied] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState<TemplateItem>(blank);

  useEffect(() => localStorage.setItem('milio_templates_v2', JSON.stringify(templates)), [templates]);

  useEffect(() => {
    const hideSandboxButton = () => {
      document.querySelectorAll('*').forEach((el: any) => {
        const text = el.innerText || '';
        if (text.includes('Open Sandbox') || text.includes('Made with CodeSandbox')) el.style.display = 'none';
      });
    };
    hideSandboxButton();
    const timer = setInterval(hideSandboxButton, 1000);
    const blockRightClick = (e: MouseEvent) => e.preventDefault();
    const blockKeys = (e: KeyboardEvent) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())) || (e.ctrlKey && e.key.toUpperCase() === 'U')) {
        e.preventDefault(); alert('Protected by MILIOLAB.AI');
      }
    };
    document.addEventListener('contextmenu', blockRightClick);
    document.addEventListener('keydown', blockKeys);
    return () => { clearInterval(timer); document.removeEventListener('contextmenu', blockRightClick); document.removeEventListener('keydown', blockKeys); };
  }, []);

  const selected = templates.find(t => t.id === selectedId) || templates[0];
  const result = useMemo(() => selected ? compose(selected, data) : '', [selected, data]);
  const filtered = templates.filter(t => (t.name + t.category + t.packageName).toLowerCase().includes(query.toLowerCase()));

  function copy() {
    navigator.clipboard.writeText(result);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  }
  function saveDraft() {
    const item = { ...draft, id: draft.id || draft.name.toLowerCase().replace(/[^a-z0-9]+/g,'-') + '-' + Date.now() };
    setTemplates(prev => prev.some(x => x.id === item.id) ? prev.map(x => x.id === item.id ? item : x) : [...prev, item]);
    setSelectedId(item.id); setEditMode(false);
  }
  function startEdit(t?: TemplateItem) { setDraft(t ? JSON.parse(JSON.stringify(t)) : { ...blank, id: '' }); setEditMode(true); }
  function removeSelected() {
    if (!selected) return;
    if (confirm('Hapus template ini?')) {
      const next = templates.filter(t => t.id !== selected.id);
      setTemplates(next); setSelectedId(next[0]?.id || '');
    }
  }
  function updateDraftList(field: 'detail'|'bonus'|'premium', value: string) {
    setDraft({ ...draft, [field]: value.split('\n').filter(Boolean) });
  }

  return <div className="app">
    <header>
      <img src="/miliolab-logo.png" alt="MILIOLAB" />
      <div><h1>MILIOLAB.AI TEMPLATE CENTER</h1><p>Template penyerahan akun terbaru • editable • siap copy WhatsApp</p></div>
    </header>

    <main className="grid">
      <aside className="card sidebar">
        <h2>Produk</h2>
        <input placeholder="Cari produk..." value={query} onChange={e=>setQuery(e.target.value)} />
        <div className="list">
          {filtered.map(t => <button key={t.id} onClick={()=>setSelectedId(t.id)} className={selectedId===t.id?'active':''}>
            <b>{t.name}</b><small>{t.category}</small>
          </button>)}
        </div>
        <button className="danger" onClick={removeSelected}>Hapus Template Terpilih</button>
      </aside>

      <section className="card output">
        <div className="badge">FULL SERVICE • FULL GARANSI</div>
        <h2>{selected?.name}</h2>
        <p>{selected?.packageName}</p>
        <div className="form">
          {selected?.needs.includes('email') && <input placeholder="Email akun" value={data.email} onChange={e=>setData({...data,email:e.target.value})}/>} 
          {selected?.needs.includes('password') && <input placeholder="Password akun" value={data.password} onChange={e=>setData({...data,password:e.target.value})}/>} 
          {selected?.needs.includes('link') && <input className="wide" placeholder="Link akses / dashboard / login" value={data.link} onChange={e=>setData({...data,link:e.target.value})}/>} 
          {selected?.needs.includes('kode') && <input className="wide" placeholder="Kode akses" value={data.kode} onChange={e=>setData({...data,kode:e.target.value})}/>} 
          {selected?.needs.includes('tanggal') && <input className="wide" placeholder="Tanggal aktif, contoh: 1 Mei 2026" value={data.tanggal} onChange={e=>setData({...data,tanggal:e.target.value})}/>} 
        </div>
        <button className="copy" onClick={copy}>{copied ? 'BERHASIL DISALIN ✅' : 'COPY TEMPLATE SIAP KIRIM'}</button>
        <textarea readOnly value={result}/>
      </section>

      <aside className="right">
        <div className="card wa">
          <h2>WA Link Generator</h2>
          <p>Buat link WhatsApp cepat.</p>
          <input value="62" readOnly /> <input defaultValue="81216589695" />
          <textarea defaultValue={'Halo OM MILIO, saya mau berlangganan tools AI premium.'}/>
        </div>

        <div className="card editor">
          <h2>Template Builder</h2>
          <p>Tambah template baru atau edit template lama.</p>
          <button className="copy" onClick={()=>startEdit(selected)}>Edit Template Terpilih</button>
          <button onClick={()=>startEdit()}>Tambah Template Baru</button>
          {editMode && <div className="modal">
            <div className="modalbox">
              <h2>{draft.id ? 'Edit Template' : 'Tambah Template'}</h2>
              <input placeholder="Nama produk" value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})}/>
              <input placeholder="Kategori" value={draft.category} onChange={e=>setDraft({...draft,category:e.target.value})}/>
              <input placeholder="Judul penyerahan" value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})}/>
              <input placeholder="Nama paket" value={draft.packageName} onChange={e=>setDraft({...draft,packageName:e.target.value})}/>
              <label>Field yang dipakai</label>
              <div className="checks">{(['email','password','link','kode','tanggal'] as Need[]).map(n => <label key={n}><input type="checkbox" checked={draft.needs.includes(n)} onChange={e=>setDraft({...draft, needs:e.target.checked?[...draft.needs,n]:draft.needs.filter(x=>x!==n)})}/> {n}</label>)}</div>
              <textarea placeholder="Detail / sistem paket, pisahkan per baris" value={(draft.detail||[]).join('\n')} onChange={e=>updateDraftList('detail', e.target.value)}/>
              <textarea placeholder="Bonus, pisahkan per baris" value={(draft.bonus||[]).join('\n')} onChange={e=>updateDraftList('bonus', e.target.value)}/>
              <textarea placeholder="Fitur premium, pisahkan per baris" value={(draft.premium||[]).join('\n')} onChange={e=>updateDraftList('premium', e.target.value)}/>
              <div className="row"><button onClick={()=>setEditMode(false)}>Batal</button><button className="copy" onClick={saveDraft}>Simpan Template</button></div>
            </div>
          </div>}
        </div>
      </aside>
    </main>
  </div>;
}
