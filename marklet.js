(() => {

const rarityInfo = {
  "Common":       { color:"#cfd8dc", show:true },
  "Uncommon":     { color:"#4caf50", show:true },
  "Rare":         { color:"#2196f3", show:true },
  "Legendary":    { color:"#ff9800", show:true },
  "Mythic":       { color:"#e91e63", show:true },
  "Secret":       { color:"#9c27b0", show:true },
  "Ultra Secret": { color:"#ff1744", show:false },
  "Mystical":     { color:"#00e5ff", show:false }
};

const packs = {
  "Spooky Pack":[["Ghost","Common",44.98],["Zombie","Uncommon",30],["Vampire","Rare",15],["Pumpkin King","Legendary",8.42],["Night Lord","Mythic",1],["Shadow Reaper","Secret",0.5],["Void Phantom","Ultra Secret",0.08],["Apex Nightmare","Mystical",0.02]],
  "Ocean Pack":[["Clownfish","Common",44.98],["Shark","Uncommon",30],["Octopus","Rare",15],["Kraken","Legendary",8.42],["Leviathan","Mythic",1],["Abyss Horror","Secret",0.5],["Tidebreaker","Ultra Secret",0.08],["Poseidon Prime","Mystical",0.02]],
  "Space Pack":[["Alien","Common",44.98],["Astronaut","Uncommon",30],["UFO","Rare",15],["Galaxy Beast","Legendary",8.42],["Cosmic Titan","Mythic",1],["Star Eater","Secret",0.5],["Black Hole God","Ultra Secret",0.08],["Singularity Prime","Mystical",0.02]],
  "Fantasy Pack":[["Elf","Common",44.98],["Dwarf","Uncommon",30],["Wizard","Rare",15],["Archmage","Legendary",8.42],["Ancient Dragon","Mythic",1],["Realm Breaker","Secret",0.5],["Voidwyrm","Ultra Secret",0.08],["World Genesis","Mystical",0.02]],
  "Cyber Pack":[["Drone","Common",44.98],["Android","Uncommon",30],["Mecha Wolf","Rare",15],["AI Overlord","Legendary",8.42],["Neural Core","Mythic",1],["System Zero","Secret",0.5],["Codebreaker","Ultra Secret",0.08],["The Source","Mystical",0.02]],
  "Jungle Pack":[["Monkey","Common",44.98],["Parrot","Uncommon",30],["Tiger","Rare",15],["Ancient Gorilla","Legendary",8.42],["Verdant Titan","Mythic",1],["Jungle Deity","Secret",0.5],["Heart of Wild","Ultra Secret",0.08],["Primal Core","Mystical",0.02]],
  "Winter Pack":[["Snowman","Common",44.98],["Penguin","Uncommon",30],["Polar Bear","Rare",15],["Frost Giant","Legendary",8.42],["Glacier Titan","Mythic",1],["Blizzard Warden","Secret",0.5],["Absolute Zero","Ultra Secret",0.08],["Frozen Singularity","Mystical",0.02]],
  "Desert Pack":[["Camel","Common",45],["Scorpion","Uncommon",30],["Sand Golem","Rare",15],["Pharaoh","Legendary",8],["Sphinx","Mythic",1],["Dune Wraith","Secret",0.5],["Sun God","Ultra Secret",0.08],["Oasis Spirit","Mystical",0.02]],
  "Volcano Pack":[["Lava Lizard","Common",45],["Firebird","Uncommon",30],["Magma Beast","Rare",15],["Volcanic Titan","Legendary",8],["Inferno Dragon","Mythic",1],["Ash Demon","Secret",0.5],["Eruption Lord","Ultra Secret",0.08],["Magma Core","Mystical",0.02]],
  "Candy Pack":[["Candy Cane","Common",45],["Chocolate Bunny","Uncommon",30],["Gingerbread Man","Rare",15],["Sugar Wizard","Legendary",8],["Sweet Dragon","Mythic",1],["Marshmallow Giant","Secret",0.5],["Lollipop King","Ultra Secret",0.08],["Candy Cosmos","Mystical",0.02]],
  "Toy Pack":[["Toy Car","Common",45],["Rubber Duck","Uncommon",30],["Action Figure","Rare",15],["Mechanical Robot","Legendary",8],["Giant Teddy","Mythic",1],["Windup Beast","Secret",0.5],["Toy Overlord","Ultra Secret",0.08],["Infinite Toybox","Mystical",0.02]],
  "Music Pack":[["Tambourine","Common",45],["Flute","Uncommon",30],["Drum","Rare",15],["Guitar","Legendary",8],["Grand Piano","Mythic",1],["Harp Spirit","Secret",0.5],["Conductor","Ultra Secret",0.08],["Symphony Prime","Mystical",0.02]]
};

const inventory = {};
const saved = localStorage.getItem("blooketInventory");
if(saved) Object.assign(inventory, JSON.parse(saved));

/* ================= STYLES ================= */
const style=document.createElement("style");
style.textContent=`
@keyframes jump {0%{transform:translateY(0)}30%{transform:translateY(-28px)}60%{transform:translateY(0)}80%{transform:translateY(-12px)}100%{transform:translateY(0)}}
.jump{animation:jump .6s ease;}
`;
document.head.appendChild(style);

/* ================= GUI ================= */
const gui=document.createElement("div");
gui.style=`
position:absolute;top:50%;left:50%;
width:920px;height:650px;
background:linear-gradient(135deg,#ff0080,#7928ca,#2afadf);
border-radius:24px;
box-shadow:0 0 80px rgba(255,0,200,.8);
color:white;font-family:'Trebuchet MS';
z-index:999999;
display:flex;flex-direction:column;
cursor:grab; user-select:none;
`;
document.body.appendChild(gui);

/* Drag */
let isDragging=false, offsetX=0, offsetY=0;
gui.onmousedown=(e)=>{isDragging=true; offsetX=e.clientX-gui.getBoundingClientRect().left; offsetY=e.clientY-gui.getBoundingClientRect().top; gui.style.cursor="grabbing";}
document.onmousemove=(e)=>{if(!isDragging)return; gui.style.left=e.clientX-offsetX+"px"; gui.style.top=e.clientY-offsetY+"px";}
document.onmouseup=()=>{isDragging=false; gui.style.cursor="grab";};

/* Layout */
const content=document.createElement("div"); content.style=`flex:1;display:flex;overflow:hidden;`; gui.appendChild(content);
const sidebar=document.createElement("div"); sidebar.style=`width:220px;background:rgba(0,0,0,.35);padding:16px;display:flex;flex-direction:column;gap:12px;`; content.appendChild(sidebar);
const main=document.createElement("div"); main.style=`flex:1;position:relative;padding:10px;overflow:auto;`; content.appendChild(main);

/* Preview Panel */
const previewPanel = document.createElement("div");
previewPanel.style = `
  width: 100%;
  height: 200px;
  overflow-y: auto;
  background: rgba(0,0,0,0.65);
  border-radius: 16px;
  padding: 10px;
  margin-bottom: 12px;
`;
main.appendChild(previewPanel);

let previewVisible = true;

// Toggle preview with Return/Enter
document.addEventListener("keydown",(e)=>{
    if(e.code==="Enter"){
        previewVisible = !previewVisible;
        previewPanel.style.display = previewVisible ? "block" : "none";
        e.preventDefault();
    }
});

// Space bar toggle for GUI
document.addEventListener("keydown",(e)=>{
    if(e.code==="Space"){gui.style.display=gui.style.display==="none"?"flex":"none"; e.preventDefault();}
});

/* Result Bar */
const resultBar = document.createElement("div");
resultBar.style = `
  position:absolute;
  bottom:10px;
  left:50%;
  transform:translateX(-50%);
  width:90%;
  height:66px;
  background: rgba(0,0,0,0.85);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:22px;
  font-weight:bold;
  border-radius:16px;
  z-index:1000;
  cursor:pointer;
`;
resultBar.textContent="Open a pack!";
main.appendChild(resultBar);
resultBar.onclick = () => { resultBar.style.display = "none"; };

function showResult(name, rarity){
    resultBar.innerHTML = `You got <span style="color:${rarityInfo[rarity].color}">${name} (${rarity})</span>`;
    resultBar.style.display = "flex"; 
    resultBar.classList.remove("jump"); void resultBar.offsetWidth;
    if(rarity === "Ultra Secret" || rarity === "Mystical") resultBar.classList.add("jump");
}

/* Sidebar Buttons */
["Open Packs","Inventory","Index"].forEach(tab=>{
  const b=document.createElement("button");
  b.textContent=tab;
  b.style=`padding:14px;border:none;border-radius:18px;background:linear-gradient(135deg,#00e5ff,#2979ff);font-size:16px;cursor:pointer;box-shadow:0 0 16px #00e5ff;`;
  b.onclick=()=>showTab(tab);
  sidebar.appendChild(b);
});

/* Clear Inventory */
const clearBtn = document.createElement("button");
clearBtn.textContent = "Clear Inventory";
clearBtn.style=`padding:12px;margin-top:8px;border-radius:12px;background:red;color:white;cursor:pointer;`;
clearBtn.onclick = () => {
    if(confirm("Are you sure you want to clear your inventory?")){
        for(const key in inventory) delete inventory[key];
        localStorage.removeItem("blooketInventory");
        showInventory();
    }
};
sidebar.appendChild(clearBtn);

/* Close */
const close=document.createElement("div"); close.textContent="✖"; close.style=`position:absolute;top:16px;right:20px;cursor:pointer;font-size:20px;`; close.onclick=()=>gui.remove(); gui.appendChild(close);

/* Logic */
function roll(pack){let r=Math.random()*100,sum=0;for(const i of pack){sum+=i[2];if(r<=sum)return i;}return pack.at(-1);}

function showPackPreview(packName){
    previewPanel.innerHTML = `<strong>${packName} Contents:</strong><br>`;
    packs[packName].forEach(([name, rarity, chance])=>{
        if(!rarityInfo[rarity].show) return;
        const div = document.createElement("div");
        div.style = `color:${rarityInfo[rarity].color};`;
        div.textContent = `${name} — ${rarity} (${chance}%)`;
        previewPanel.appendChild(div);
    });
    if(previewVisible) previewPanel.style.display = "block";
}

function showTab(tab){
    main.innerHTML = "";
    main.appendChild(previewPanel);
    main.appendChild(resultBar);
    if(tab==="Open Packs") showPacks();
    if(tab==="Inventory") showInventory();
    if(tab==="Index") showIndex();
}

function showPacks(){
  Object.keys(packs).forEach(packName=>{
    const btn = document.createElement("button");
    btn.textContent = packName;
    btn.style=`width:100%;margin-bottom:10px;padding:16px;background:rgba(0,0,0,.35);border:3px solid white;border-radius:20px;font-size:18px;color:white;`;
    btn.onmouseenter = () => showPackPreview(packName);
    btn.onclick = () => {
        const [name, rarity] = roll(packs[packName]);
        inventory[name] = inventory[name] || {count:0, rarity};
        inventory[name].count++;
        localStorage.setItem("blooketInventory", JSON.stringify(inventory));
        showResult(name, rarity);
    };
    main.appendChild(btn);
  });
}

/* ================= Sorted Inventory ================= */
function showInventory(){
    main.innerHTML = "";
    main.appendChild(previewPanel);
    main.appendChild(resultBar);

    Object.entries(packs).forEach(([packName, pack]) => {
        const ownedBlooks = pack.filter(([name]) => inventory[name]);
        if(ownedBlooks.length === 0) return;

        const h = document.createElement("h2");
        h.textContent = packName;
        h.style = "margin-top:16px; margin-bottom:8px; color:white;";
        main.appendChild(h);

        const grid = document.createElement("div");
        grid.style = "display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:16px;";
        main.appendChild(grid);

        ownedBlooks.forEach(([name]) => {
            const data = inventory[name];
            const card = document.createElement("div");
            card.style=`background:rgba(0,0,0,.45);border:4px solid ${rarityInfo[data.rarity].color};border-radius:20px;padding:14px;text-align:center;box-shadow:0 0 20px ${rarityInfo[data.rarity].color};`;
            card.innerHTML = `<div style="font-size:18px;font-weight:bold">${name}</div><div style="color:${rarityInfo[data.rarity].color}">${data.rarity}</div><div>x${data.count}</div>`;
            grid.appendChild(card);
        });
    });
}

function showIndex(){
  Object.entries(packs).forEach(([packName,pack])=>{
    const h=document.createElement("h2"); h.textContent=packName; main.appendChild(h);
    pack.forEach(([n,r,c])=>{if(!rarityInfo[r].show)return; const d=document.createElement("div"); d.style=`color:${rarityInfo[r].color};margin-left:18px;`; d.textContent=`${n} — ${r} (${c}%)`; main.appendChild(d);});
  });
}

showTab("Open Packs");

})();
