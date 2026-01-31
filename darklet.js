(() => {
  if(document.getElementById("blooket-gui-sidebar")) return;

  const rarityInfo = {
    Common:"#bdbdbd",
    Uncommon:"#4caf50",
    Rare:"#42a5f5",
    Legendary:"#ff9800",
    Mythic:"#9c27b0",
    Secret:"#e91e63",
    "Ultra Secret":"#ffc107",
    Mystical:"#ff1744"
  };

  const rarityChance = {
    Common:50,
    Uncommon:25,
    Rare:15,
    Legendary:6,
    Mythic:2,
    Secret:1,
    "Ultra Secret":0.16,
    Mystical:0.04
  };

  const packs = {
    "Starter Pack":[["Duck","Common"],["Cat","Common"],["Dog","Uncommon"],["Cow","Uncommon"],["Fox","Rare"],["Tiger","Legendary"]],
    "Space Pack":[["Alien","Uncommon"],["Astronaut","Rare"],["Planet","Rare"],["UFO","Epic"],["Galaxy","Legendary"],["Black Hole","Mythic"]],
    "Spooky Pack":[["Bat","Common"],["Ghost","Uncommon"],["Pumpkin","Rare"],["Vampire","Legendary"],["Reaper","Mythic"]],
    "Aquatic Pack":[["Fish","Common"],["Crab","Uncommon"],["Dolphin","Rare"],["Shark","Legendary"],["Kraken","Mythic"]],
    "Mystic Pack":[["Wizard","Legendary"],["Fairy","Mythic"],["Dragon","Ultra Secret"],["Phoenix","Mystical"]],
    "Jungle Pack":[["Monkey","Common"],["Tiger","Rare"],["Parrot","Uncommon"],["Jaguar","Legendary"],["Panther","Mythic"]],
    "Winter Pack":[["Snowman","Common"],["Penguin","Uncommon"],["Polar Bear","Rare"],["Ice Queen","Legendary"],["Frost Dragon","Mythic"]],
    "Desert Pack":[["Camel","Common"],["Scorpion","Uncommon"],["Sandworm","Rare"],["Sphinx","Legendary"],["Phoenix","Mythic"]],
    "Candy Pack":[["Lollipop","Common"],["Chocolate","Uncommon"],["Gingerbread","Rare"],["Candy Queen","Legendary"],["Sugar Dragon","Mythic"]],
    "Pirate Pack":[["Parrot","Common"],["Pirate","Rare"],["Treasure Chest","Uncommon"],["Kraken","Legendary"],["Ghost Ship","Mythic"]],
    "Medieval Pack":[["Knight","Common"],["Princess","Uncommon"],["Dragon","Rare"],["Wizard","Legendary"],["Black Knight","Mythic"]],
    "Robot Pack":[["Bot","Common"],["Drone","Uncommon"],["Android","Rare"],["AI Overlord","Legendary"],["Quantum Bot","Mythic"]],
    "Bug Pack":[["Ant","Common"],["Beetle","Uncommon"],["Spider","Rare"],["Moth","Legendary"],["Scarab","Mythic"]],
    "Celebrity Pack":[["Singer","Common"],["Actor","Uncommon"],["Influencer","Rare"],["Pop Star","Legendary"],["Legendary Idol","Mythic"]],
    "Breakfast Pack":[["Egg","Common"],["Bacon","Uncommon"],["Pancake","Rare"],["Waffle","Legendary"],["Dragon Toast","Mythic"]],
    "Lunch Pack":[["Sandwich","Common"],["Burger","Uncommon"],["Salad","Rare"],["Pizza","Legendary"],["Ultimate Feast","Mythic"]],
    "Dinner Pack":[["Steak","Common"],["Salmon","Uncommon"],["Pasta","Rare"],["Roast Chicken","Legendary"],["Golden Meal","Mythic"]],
    "Blizzard Pack":[["Snowflake","Common"],["Icicle","Uncommon"],["Blizzard Wolf","Rare"],["Frost Giant","Legendary"],["Ice Phoenix","Mythic"]],
    "Safari Pack":[["Lion","Rare"],["Elephant","Uncommon"],["Giraffe","Common"],["Cheetah","Legendary"],["Rhinoceros","Mythic"]],
    "Bot Pack":[["Tiny Bot","Common"],["Helper Bot","Uncommon"],["Combat Bot","Rare"],["Overlord Bot","Legendary"],["Quantum Bot","Mythic"]],
    "Wonderland Pack":[["White Rabbit","Common"],["Cheshire Cat","Uncommon"],["Mad Hatter","Rare"],["Queen of Hearts","Legendary"],["Jabberwock","Mythic"]],
    "Breakfast Surprise":[["Toast","Common"],["Cereal","Uncommon"],["Coffee","Rare"],["Pancake Stack","Legendary"],["Golden Omelette","Mythic"]]
  };

  const inventory = JSON.parse(localStorage.getItem("blookInv")||"{}");
  const saveInv=()=>localStorage.setItem("blookInv",JSON.stringify(inventory));

  const gui=document.createElement("div");
  gui.id="blooket-gui-sidebar";
  gui.style=`
    position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
    width:900px;height:550px;display:flex;flex-direction:column;
    background:linear-gradient(135deg,#1e3c72,#2a5298);
    color:white;border-radius:24px;z-index:999999;
    box-shadow:0 0 50px rgba(0,0,0,.9);
    font-family:Arial,sans-serif;
  `;
  document.body.appendChild(gui);

  const top=document.createElement("div");
  top.style="height:42px;display:flex;align-items:center;padding:0 14px;cursor:grab;background:linear-gradient(90deg,#ff6a00,#ee0979);border-radius:24px 24px 0 0;user-select:none;font-weight:bold;text-shadow:1px 1px 2px black;";
  top.textContent="🌟 Blooket GUI 🌟";
  gui.appendChild(top);

  const closeBtn=document.createElement("button");
  closeBtn.textContent="✕";
  closeBtn.style="margin-left:auto;width:28px;height:28px;border:none;border-radius:50%;background:#000;color:#fff;cursor:pointer;font-weight:bold;box-shadow:0 0 5px black;";
  top.appendChild(closeBtn);

  const body=document.createElement("div");
  body.style="flex:1;display:flex;overflow:hidden;";
  gui.appendChild(body);

  const sidebar=document.createElement("div");
  sidebar.style="width:200px;padding:10px;display:flex;flex-direction:column;gap:8px;background:linear-gradient(180deg,#3a1c71,#d76d77,#ffaf7b);";
  body.appendChild(sidebar);

  const main=document.createElement("div");
  main.style="flex:1;padding:12px;overflow-y:auto;background:rgba(0,0,0,0.2);border-radius:0 0 24px 24px;";
  body.appendChild(main);

  // Drag
  let drag=false,dx=0,dy=0;
  top.onmousedown=e=>{drag=true;const r=gui.getBoundingClientRect();dx=e.clientX-r.left;dy=e.clientY-r.top;};
  document.onmousemove=e=>{if(!drag)return;gui.style.left=e.clientX-dx+"px";gui.style.top=e.clientY-dy+"px";gui.style.transform="none";};
  document.onmouseup=()=>drag=false;

  closeBtn.onclick=()=>{gui.remove();saveInv();};

  // Mini mode toggle
  let mini=false;
  document.addEventListener("keydown",e=>{
    if(e.key==="Escape"||e.code==="Space"){gui.remove();saveInv();}
    if(e.key==="Shift"){
      mini=!mini;
      if(mini){gui.style.width="450px";gui.style.height="300px";gui.style.fontSize="12px";}
      else{gui.style.width="900px";gui.style.height="550px";gui.style.fontSize="16px";}
    }
  });

  function clearMain(){main.innerHTML="";}

  // Inventory
  function showInventory(){
    clearMain();
    const h=document.createElement("h3");h.textContent="Inventory";main.appendChild(h);
    Object.entries(inventory).forEach(([n,{count,rarity}])=>{
      const d=document.createElement("div");
      d.textContent=`${n} x${count} (${rarity})`;
      d.style=`color:${rarityInfo[rarity]};margin-left:12px;margin-bottom:2px;font-weight:bold;`;
      main.appendChild(d);
    });
  }

  // Index
  function showIndex(){
    clearMain();
    const h=document.createElement("h3");h.textContent="Index (Mysticals hidden)";main.appendChild(h);
    Object.entries(packs).forEach(([p,arr])=>{
      const ph=document.createElement("h4");ph.textContent=p;main.appendChild(ph);
      arr.forEach(([n,r])=>{
        if(r==="Mystical") return;
        const chance = rarityChance[r]??0;
        const d=document.createElement("div");
        d.textContent=`${n} – ${r} (${chance}%)`;
        d.style=`margin-left:12px;color:${rarityInfo[r]};margin-bottom:2px;font-weight:bold`;
        main.appendChild(d);
      });
    });
  }

  // Packs
  function showPacks(){
    clearMain();
    Object.keys(packs).forEach(p=>{
      const btn=document.createElement("button");
      btn.textContent=p;
      btn.style=`padding:12px;margin-bottom:4px;border-radius:14px;font-weight:bold;text-align:center;color:white;background:linear-gradient(135deg,#ff5858,#f09819);cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.5);`;
      main.appendChild(btn);

      const gotDiv=document.createElement("div");
      gotDiv.style="margin:4px 0;font-weight:bold;";
      main.appendChild(gotDiv);

      btn.onclick=()=>{
        const items=packs[p];
        const rand=Math.random()*100;
        let sum=0;
        for(const [n,r] of items){
          const rate= r==="Mystical"?0.04:10;
          sum+=rate;
          if(rand<=sum){
            inventory[n]??={count:0,rarity:r};
            inventory[n].count++;
            saveInv();
            gotDiv.textContent=`🎉 You got: ${n} (${r})`;
            gotDiv.style.color=rarityInfo[r]||"#fff";
            return;
          }
        }
        const [n,r] = items[0];
        inventory[n]??={count:0,rarity:r};
        inventory[n].count++;
        saveInv();
        gotDiv.textContent=`🎉 You got: ${n} (${r})`;
        gotDiv.style.color=rarityInfo[r]||"#fff";
      };
    });
  }

  function addButton(name,fn){
    const b=document.createElement("button");
    b.textContent=name;
    b.style=`padding:10px;border:none;border-radius:12px;font-weight:bold;color:white;background:linear-gradient(135deg,#42e695,#3bb2b8);cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.5);`;
    b.onmouseenter=()=>b.style.filter="brightness(1.2)";
    b.onmouseleave=()=>b.style.filter="none";
    b.onclick=fn;
    sidebar.appendChild(b);
  }

  addButton("Packs",showPacks);
  addButton("Inventory",showInventory);
  addButton("Index",showIndex);

  showPacks();
})();
