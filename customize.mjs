import fs from 'fs';
import path from 'path';

const jsFile = 'd:/Satyam/Antigravity/girlfriend-scraper/girlfriend-full/_next/static/chunks/3dvb401oo8-7y.js';
let code = fs.readFileSync(jsFile, 'utf8');

// 1. New generalized notes dataset for the Jar
const newRH = `rH=[
  {num:"01",title:"Favorite Moments",text:"Every simple moment spent with you becomes a favorite memory ✨",bg:"#FFF7F8"},
  {num:"02",title:"Brightest Smile",text:"Your smile has a magic way of making any hard day instantly better 🤍",bg:"#FEF9F3"},
  {num:"03",title:"Late Night Talks",text:"Endless conversations and laughs — the simplest times are the sweetest 🌙",bg:"#F3F7FE"},
  {num:"04",title:"Warm & Cozy",text:"Knowing you are around brings a sense of comfort that words can't describe 🌸",bg:"#F8F3FF"},
  {num:"05",title:"Little Things",text:"Thank you for being yourself, always bringing genuine warmth and light 💫",bg:"#FFFBF2"},
  {num:"06",title:"Always Special",text:"No matter where life goes, you will always hold a special place in my heart 💕",bg:"#FFF2F5"}
]`;

// Replace rH=[...]
code = code.replace(/rH=\["\/images\/1\.avif"[^\]]*\]/, newRH);

// 2. Subtitle update for memory jar
code = code.replace('Tap the jar to pull out a memory', 'Tap the jar to open a sweet note');

// 3. Update useEffect mapping in r2 to save full note object item: t
code = code.replace(
  'n(rH.map((t,e)=>({id:e,src:t,',
  'n(rH.map((t,e)=>({id:e,item:t,src:"",'
);

// 4. Replace card interior rendering from <img> to styled text note card
const oldCardTarget = `(0,r.jsx)("div",{className:"w-full h-full rounded-sm overflow-hidden bg-gray-100 border border-black/5",children:(0,r.jsx)("img",{src:t.src,alt:"Memory",className:"w-full h-full object-cover"})}),(0,r.jsx)("div",{className:"absolute bottom-2.5 right-3 opacity-60",children:(0,r.jsx)(r_,{fill:"#F58CA5",strokeWidth:0,className:"w-4 h-4 text-[#F58CA5]"})})`;

const newCardInterior = `(0,r.jsxs)("div",{className:"w-full h-full rounded-sm p-3 flex flex-col justify-between items-center text-center border border-[#F4AAB9]/30 relative overflow-hidden select-none shadow-inner",style:{backgroundColor:t.item.bg},children:[(0,r.jsxs)("div",{className:"w-full flex items-center justify-between opacity-70 px-1 pt-1",children:[(0,r.jsx)("span",{className:"font-handwriting text-xs text-[#8A6A71] font-semibold",children:"Note "+t.item.num}),(0,r.jsx)(r_,{fill:"#F58CA5",strokeWidth:0,className:"w-3.5 h-3.5 text-[#F58CA5]"})]}),(0,r.jsx)("div",{className:"font-handwriting text-lg sm:text-xl text-[#5C3D46] leading-relaxed my-auto px-1 font-medium select-none",children:t.item.text}),(0,r.jsx)("div",{className:"font-handwriting text-xs text-[#EC8092] font-bold tracking-wide pb-1",children:"✨ "+t.item.title})]})`;

code = code.replace(oldCardTarget, newCardInterior);

// 5. Enhance letter text (rZ)
const newRZ = `rZ=\`You are my safe place, my happiness, and one of the most special people in my life.\\nThank you for every smile, every quiet moment, and for simply being you.\\nI appreciate you more than words can ever say.\``;
code = code.replace(/rZ=`[^`]*`/, newRZ);

// 6. Update final screen text
code = code.replace('To my one and only', 'To someone truly special');

fs.writeFileSync(jsFile, code, 'utf8');
console.log('✅ Customized memory jar & sweet notes successfully!');
