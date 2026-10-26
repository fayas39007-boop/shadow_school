const C=document.getElementById('c'),g=C.getContext('2d');g.imageSmoothingEnabled=false;
const W=320,H=180,T=16;
const LV=[
{n:"I. Detention",need:1,sp:[296,24],intro:"9:47 PM. Detention. The bell rings backwards and every light dies. Find the key on the teacher's desk.",
 p:["A brass key. Tag: 'Room 13 - do not let them out.' Something scratches under the floor..."],
 m:["####################","#..................#","#.##.##....##.##...#","#.##.##....##.##...#","#..................#","#S........K........#","#..................#","#.##.##....##.##...#","#.##.##....##.##...#","#..................#","##################D#"]},
{n:"II. The Hall",need:3,intro:"The east hall. Lockers breathe. The Hall Monitor listens for footsteps. Walk slowly - running is loud. Find 3 notes.",
 p:["'We stayed late for the Founder's Lesson. We never left.' - Mara","'It hears you move. Stand still and it forgets.' - scratched into a locker","'The library holds the missing pages. Burn them in the basement.'"],
 m:["####################","#S.................#","#.##############...#","#.#K...........#...#","#.#.###..###...#...#","#.......E......K...#","#.#.###..###.#.#...#","#.#..K.......#.#...#","#.##############...#","#..................#","##################D#"]},
{n:"III. Library",need:4,intro:"The library. Shelves lean in to listen. Four torn pages are hidden between the stacks.",
 p:["Page 1: ShadowSchool was built on a sealed well. The first students were the mortar.","Page 2: Headmaster Vale fed it detentions. One soul per year.","Page 3: The shadow wears the face of whoever it last devoured.","Page 4: It can be bound by candlelight, at the well, below."],
 m:["####################","#S.................#","#.###..###..###....#","#.###..###..###....#","#.......K..........#","#.###.K###..###.K..#","#.###..###..###....#","#........E.........#","#.###..###..###..K.#","#.###..###..###....#","##################D#"]},
{n:"IV. The Well",need:3,intro:"The basement. The well breathes cold air. Light three candles - and do not stop moving.",
 p:["Candle one. The whispers stop for a moment.","Candle two. The shadow screams somewhere behind you.","Candle three. The well is bound. Run for the stairs."],
 m:["####################","#S.................#","#.##.##.####.##.##.#","#.##.##.####.##.##.#","#..K...............#","#.##.##.####.##.##.#","#.##.##.####.##.##.#","#.......E......K...#","#.##.##.####.##.##.#","#.......K..........#","##################D#"]}];
const NAR=[["Ah. There you are. Detention again? Impressive commitment.","I'm the Narrator. I've watched this building longer than anyone, and nobody has ever thanked me.",{t:"Before the lights die, any questions? I do love questions.",c:[["Who are you, really?",["> Who are you, really?","A voice with no body and too much free time. I narrate. Sometimes I warn. It rarely helps."]],["What's in this school?",["> What's in this school?","Something that was fed here for a very long time. It hears everything that moves.","Walk, and it hesitates. Run, and it knows. Stand still, and it forgets you. Mostly."]],["I'm just leaving.",["> I'm just leaving.","Ha! The doors locked at 9:47. Keep that spirit, though. It makes the screaming more interesting."]]]},"9:47 PM. The bell rings backwards and every light dies.","Find the key on the teacher's desk. Move with WASD. Hold Shift to run, but it's loud. It's always loud."],
["The east hall. Lockers breathe, if you listen. Don't listen.","The Hall Monitor patrols here. It never sleeps and it never blinks. I would know. I've tried to make it laugh.","Walk slowly. Find 3 notes. Yes, I'm aware reading is the last thing you want to do right now."],
["The library. Shelves lean in to listen. They gossip, you know.","Four torn pages are hidden between the stacks. They explain everything. I'd tell you myself, but where's the fun in that?"],
["The basement. The well breathes cold air. This is where it began.","Light three candles, and do not stop moving. I'd offer to hold one, but, well. No hands.","I'll be right here. Narrating. Cheering you on, in my way."]];
const OUT=["The well is bound. The pages burn. For a moment, the whole school exhales.","You did it. I honestly had money on the shadow. Not that I have pockets.","The bell rings forward. Dawn. Go home.","And if your reflection waits a second too long to follow you... don't mention it to me. I'd only narrate it."];
const CQ=["NARRATOR: It heard you. Funny, that.","NARRATOR: The Monitor's awake. Stand still, or run. Both are bad.","NARRATOR: The shelves are holding their breath. So should you.","NARRATOR: It's angry. Candles. Candles. Candles."];
const DQ=["NARRATOR: Oh. That was quick. Call it practice.","NARRATOR: I did say it was loud.","NARRATOR: It's not personal. Okay, it's a little personal.","NARRATOR: Again. I'm not going anywhere. Neither is it."];
const PAL=[['#2a2330','#1a141f','#4b3a2a'],['#222a2a','#141a1a','#3a4a3a'],['#2d2418','#1c150d','#5a3a1c'],['#201418','#120a0e','#5a1a1a']];
let lv=0,map,P,E,items,got,need,dr,st='title',msg='',mt=0,shown=0,t=0,dt0=0,keys={},A,dl=[],di=0,sel=0,cb2=null,nq={},dc=0;
const bg=document.createElement('canvas');bg.width=W;bg.height=H;const bx=bg.getContext('2d');
const dk=document.createElement('canvas');dk.width=W;dk.height=H;const dx=dk.getContext('2d');
const rnd=s=>{s=Math.sin(s)*1e4;return s-Math.floor(s)};
let fx=1,tc=0,hb=0;
const PL={k:'#111',s:'#e8c9a0',h:'#3a2a1c',b:'#4a6a98',B:'#34507a',p:'#2a2a3a',g:'#7a5a2a'};
const PT=['..hhhh..','.hhhhhh.','.hssssh.','.hsksks.','..ssss..','.bbbbbb.','gbBbbBbg','.bbbbbb.','..pppp..'],PLG=[['..p..p..','..k..k..'],['...pp...','...kk...']];
const SH=['...kkkk...','..kkkkkk..','.kkkkkkkk.','.kkekkekk.','.kkkkkkkk.','kkkkkkkkkk','kkkkkkkkkk','k.kkkkkk.k','k.kkkkkk.k','..kkkkkk..','..kkkkkk..'],SL=[['.k.kk.kk.k','.k..k..k..'],['k.kk.kk.k.','..k..k..k.']];
function spr(rows,x,y,pal,fl){rows.forEach((r,j)=>{for(let i=0;i<r.length;i++){const c=r[fl?r.length-1-i:i];if(c!='.'){g.fillStyle=pal[c];g.fillRect(x+i,y+j,1,1)}}})}
const vg=document.createElement('canvas');vg.width=W;vg.height=H;{const v=vg.getContext('2d'),q=v.createRadialGradient(160,90,70,160,90,200);q.addColorStop(0,'rgba(0,0,0,0)');q.addColorStop(1,'rgba(0,0,0,.75)');v.fillStyle=q;v.fillRect(0,0,W,H);v.fillStyle='rgba(0,0,0,.14)';for(let y=0;y<H;y+=2)v.fillRect(0,y,W,1)}
const DU=Array.from({length:40},(_,i)=>({x:rnd(i)*W,y:rnd(i*3)*H,s:.5+rnd(i*7)}));
const RC=['#7a1f1f','#1f4a7a','#6a6a2a','#2a5a3a','#5a2a6a'];
function prop(X,Y,x,y){const R=(c,a,b,w,h)=>{bx.fillStyle=c;bx.fillRect(X+a,Y+b,w,h)};
 if(lv==0){R('#3b2a1c',1,4,14,8);R('#6b4c2e',1,3,14,3);R('#8a6a44',1,3,14,1);R('#d8d0b8',4,4,4,3);R('#222',2,12,1,4);R('#222',13,12,1,4)}
 else if(lv==1){R('#2f4650',1,0,14,16);R('#3d5a66',2,1,12,14);for(let i=0;i<4;i++)R('#17252b',4,3+i*2,8,1);R('#c9a227',12,9,1,2);if((x+y)%3==0)R('#1c2f36',2,11,5,4)}
 else if(lv==2){R('#4a3118',0,0,16,16);for(let r=0;r<3;r++){R('#2b1c0e',1,1+r*5,14,4);for(let i=0;i<6;i++)R(RC[(i+r+x)%5],2+i*2,1+r*5+(i%3?1:0),2,i%3?3:4)}}
 else{R('#3a3a44',0,0,16,16);R('#4c4c58',1,1,6,6);R('#2c2c36',9,8,6,7);R('#1a1a22',7,2,1,10);R('#2a5a2a',0,13,5,3);if((x*3+y)%4==0){R('#7a0e0e',10,0,1,6);R('#7a0e0e',9,6,3,1)}}}
function win(X,Y){bx.fillStyle='#0b1226';bx.fillRect(X+3,Y+3,10,9);bx.fillStyle='#3a4a6a';bx.fillRect(X+3,Y+7,10,1);bx.fillRect(X+8,Y+3,1,9);if(lv<2){bx.fillStyle='#dfe8ff';bx.fillRect(X+4,Y+4,2,2)}}
function intro(){const s=g.createLinearGradient(0,0,0,H);s.addColorStop(0,'#05030a');s.addColorStop(1,'#2a1230');g.fillStyle=s;g.fillRect(0,0,W,H);
 for(let i=0;i<50;i++){g.fillStyle=`rgba(255,255,255,${.3+.3*Math.sin(t*2+i)})`;g.fillRect(rnd(i)*W|0,rnd(i*5)*90|0,1,1)}
 g.fillStyle='#dfe8ff';g.beginPath();g.arc(265,34,14,0,7);g.fill();g.fillStyle='#0a0612';g.beginPath();g.arc(271,30,12,0,7);g.fill();
 g.fillStyle='#0a0510';g.fillRect(40,130,240,50);g.fillRect(130,112,60,18);g.fillRect(150,102,20,10);g.fillRect(156,92,8,10);g.fillRect(159,84,2,8);
 for(let i=0;i<12;i++)for(let j=0;j<2;j++){const on=rnd(i*7+j+Math.floor(t*(i==5?9:.7)))>.8;g.fillStyle=on?'#ffd27a':'#15101c';g.fillRect(50+i*18,138+j*18,8,10)}
 g.fillStyle='rgba(150,170,255,.25)';for(let i=0;i<40;i++)g.fillRect((rnd(i)*W+t*20)%W,(rnd(i*3)*H+t*160)%H,1,5);
 g.font='16px monospace';const gl=Math.sin(t*13)>.96?2:0;txt('SHADOWSCHOOL',68+gl,32,'#c0302f');g.font='8px monospace'}
function snd(f,d,ty='sine',v=.1){if(!A)return;const o=A.createOscillator(),n=A.createGain();o.type=ty;o.frequency.value=f;n.gain.setValueAtTime(v,A.currentTime);n.gain.exponentialRampToValueAtTime(.001,A.currentTime+d);o.connect(n).connect(A.destination);o.start();o.stop(A.currentTime+d)}
function audio(){if(A)return;A=new AudioContext();const o=A.createOscillator(),n=A.createGain();o.type='sawtooth';o.frequency.value=48;n.gain.value=.025;o.connect(n).connect(A.destination);o.start()}
function say(s,sec=5){msg=s;mt=sec+s.length/40;shown=0}
function talk(l,cb){dl=l;di=0;shown=0;sel=0;cb2=cb||null;st='talk'}
function nx(){if(tc>.8)return;const l=dl[di],s=l.t||l;if(shown<s.length){shown=s.length;return}if(l.c)dl.splice(di+1,0,...l.c[sel][1]);di++;shown=0;sel=0;snd(520,.05,'square',.04);if(di>=dl.length){st='play';cb2&&cb2()}}
function load(i){lv=i;const L=LV[i];need=L.need;map=L.m.map(r=>r.split(''));items=[];E=[];got=0;
 map.forEach((r,y)=>r.forEach((c,x)=>{const X=x*T+8,Y=y*T+8;
  if(c=='S'){P={x:X,y:Y};r[x]='.'}
  if(c=='K'){items.push({x:X,y:Y});r[x]='.'}
  if(c=='E'){E.push({x:X,y:Y,tx:X,ty:Y,ch:0});r[x]='.'}
  if(c=='D')dr={x:X,y:Y}}));
 mt=0;nq={};paint();tc=2.6;talk(NAR[i].slice())}
function paint(){const[f,w,a]=PAL[lv];map.forEach((r,y)=>r.forEach((c,x)=>{const X=x*T,Y=y*T;
 bx.fillStyle=c=='#'?w:f;bx.fillRect(X,Y,T,T);
 for(let k=0;k<10;k++){const r1=rnd(x*131+y*71+k*17+lv*5);bx.fillStyle=c=='#'?'#0c080e':'rgba(0,0,0,.25)';bx.fillRect(X+(r1*16|0),Y+(rnd(r1*99)*16|0),2,1)}
 if(c=='#'){bx.fillStyle='#2f2536';bx.fillRect(X,Y,T,1);bx.fillRect(X,Y+8,T,1);bx.fillRect(X+((y&1)?4:10),Y,1,8);bx.fillRect(X+((y&1)?10:4),Y+8,1,8)}
 if(c=='D'){bx.fillStyle=a;bx.fillRect(X+2,Y,12,T);bx.fillStyle='#000';bx.fillRect(X+10,Y+8,2,2);bx.fillStyle='#143a14';bx.fillRect(X+3,Y+1,10,4);bx.fillStyle='#4f4';bx.fillRect(X+4,Y+2,8,2)}
 if(c=='#'){if(x>0&&x<19&&y>0&&y<10)prop(X,Y,x,y);else if(y==0&&x%4==2)win(X,Y)}
 if(c=='.'){if(lv<2&&(x+y)%2==0){bx.fillStyle='rgba(255,255,255,.05)';bx.fillRect(X,Y,T,T)}if(lv==2){bx.fillStyle='rgba(0,0,0,.3)';bx.fillRect(X,Y+7,T,1)}if(lv==3&&rnd(x*9+y*31)>.8){bx.fillStyle=rnd(x+y)>.5?'#16283a':'#3a0a0a';bx.fillRect(X+3,Y+5,9,5)}}}))}
const hit=(x,y)=>{const c=(map[y/T|0]||[])[x/T|0];return c==undefined||c=='#'||(c=='D'&&got<need)};
function mv(o,a,b){const r=3,cs=[[-r,-r],[r,-r],[-r,r],[r,r]];let m=0,n=o.x+a;
 if(!cs.some(([p,q])=>hit(n+p,o.y+q))){if(n!=o.x)m=1;o.x=n}
 n=o.y+b;if(!cs.some(([p,q])=>hit(o.x+p,n+q))){if(n!=o.y)m=1;o.y=n}return m}
function pick(e){for(let i=0;i<30;i++){const x=1+rnd(t*7+i+e.x)*18|0,y=1+rnd(t*3+i*5+e.y)*9|0;if(map[y]&&map[y][x]=='.'){e.tx=x*T+8;e.ty=y*T+8;return}}}
function die(){st='dead';dt0=0;snd(90,.8,'sawtooth',.3);say(DQ[dc++%DQ.length],1.5)}
function upd(d){
 const run=keys.shift,ax=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0),ay=(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0);
 const sp=run?85:50,l=Math.hypot(ax,ay)||1;if(ax)fx=ax;mv(P,ax/l*sp*d,ay/l*sp*d);
 const noise=(ax||ay)?(run?110:52):24;
 E.forEach(e=>{const dd=Math.hypot(P.x-e.x,P.y-e.y);
  if(dd<noise){if(e.ch<=0){snd(70,.5,'square',.12);if(!nq.c){nq.c=1;say(CQ[lv],3)}}e.ch=2}else if(e.ch>0)e.ch-=d;
  let tx,ty,s;
  if(e.ch>0){tx=P.x;ty=P.y;s=40+lv*9}else{if(Math.hypot(e.tx-e.x,e.ty-e.y)<4)pick(e);tx=e.tx;ty=e.ty;s=22}
  const a=Math.atan2(ty-e.y,tx-e.x);if(!mv(e,Math.cos(a)*s*d,Math.sin(a)*s*d)&&e.ch<=0)pick(e);
  if(dd<7)die()});
 items=items.filter(it=>{if(Math.hypot(P.x-it.x,P.y-it.y)>9)return true;
  got++;snd(660,.3,'triangle',.15);const L=LV[lv];let s=L.p[got-1];
  if(got>=need)s+=" The exit unlocks.";say(s,5);
  if(L.sp&&!E.length){E.push({x:L.sp[0],y:L.sp[1],tx:P.x,ty:P.y,ch:9});snd(60,1,'sawtooth',.25)}return false});
 if(got>=need&&Math.hypot(P.x-dr.x,P.y-dr.y)<9){snd(220,.6,'triangle',.2);lv<3?load(lv+1):(snd(330,1.5,'sine',.2),talk(OUT.slice(),()=>{st='end'}))}}
function wrap(s,n){let l='',o=[];s.split(' ').forEach(x=>{if((l+x).length>n){o.push(l);l=''}l+=x+' '});o.push(l);return o}
function txt(s,x,y,c='#d8d0e8'){g.fillStyle='#000';g.fillText(s,x+1,y+1);g.fillStyle=c;g.fillText(s,x,y)}
function draw(){
 g.fillStyle='#000';g.fillRect(0,0,W,H);g.font='8px monospace';g.textBaseline='top';
 if(st=='title'){intro();
  txt('A pixel-horror story in four levels',70,80,'#8a7f9c');txt('Press ENTER',122,120,Math.sin(t*4)>0?'#fff':'#555');return}
 if(st=='end'){const s=g.createLinearGradient(0,0,0,H);s.addColorStop(0,'#1a1030');s.addColorStop(1,'#e8a060');g.fillStyle=s;g.fillRect(0,0,W,H);wrap("You light the last candle at the well. The shadow screams and the pages burn. The bell rings forward. Dawn. But in the window, your reflection waits a second too long to follow you. THE END",44).forEach((l,i)=>txt(l,24,50+i*12));txt('ENTER - title',120,150,'#8a7f9c');return}
 const chased=E.some(e=>e.ch>0),sh=st=='dead'?(Math.random()-.5)*4:chased?(Math.random()-.5)*1.2:0;g.save();g.translate(sh,sh);g.drawImage(bg,0,0);
 if(got>=need){g.fillStyle=`rgba(255,210,120,${.35+Math.sin(t*6)*.15})`;g.fillRect(dr.x-6,dr.y-8,12,16)}
 items.forEach(it=>{const y=it.y+Math.sin(t*3+it.x)*1.5,q=g.createRadialGradient(it.x,y,1,it.x,y,12);q.addColorStop(0,'rgba(255,210,120,.5)');q.addColorStop(1,'rgba(255,210,120,0)');g.fillStyle=q;g.fillRect(it.x-12,y-12,24,24);
 if(lv==0){g.fillStyle='#e8c14a';g.fillRect(it.x-3,y-3,3,3);g.fillRect(it.x,y-2,5,1);g.fillRect(it.x+3,y-1,1,2)}
 else if(lv==3){g.fillStyle='#eee';g.fillRect(it.x-1,y-1,3,5);g.fillStyle=Math.sin(t*20+it.x)>0?'#ffb030':'#ff7a10';g.fillRect(it.x,y-4,1,3)}
 else{g.fillStyle='#e8dcb8';g.fillRect(it.x-3,y-4,6,8);g.fillStyle='#6a5a3a';g.fillRect(it.x-2,y-2,4,1);g.fillRect(it.x-2,y,3,1)}});
 E.forEach(e=>{const w=Math.sin(t*6)>0?0:1,x=Math.round(e.x)-5,y=Math.round(e.y)-8+(Math.sin(t*3+e.x)*1.5|0),ag=g.createRadialGradient(e.x,e.y,2,e.x,e.y,22);
 ag.addColorStop(0,'rgba(90,0,120,.35)');ag.addColorStop(1,'rgba(90,0,120,0)');g.fillStyle=ag;g.fillRect(e.x-22,e.y-22,44,44);
 spr(SH.concat(SL[w]),x,y,{k:'#0a0510',e:e.ch>0?'#f22':'#ff0'},e.x>P.x)});
 const f=Math.floor(t*8)%2,mvg=keys.w||keys.a||keys.s||keys.d||keys.arrowup||keys.arrowdown||keys.arrowleft||keys.arrowright;
 g.fillStyle='rgba(0,0,0,.4)';g.fillRect(P.x-3,P.y+3,7,2);spr(PT.concat(PLG[mvg?f:0]),Math.round(P.x)-4,Math.round(P.y)-8,PL,fx<0);
 g.restore();
 dx.globalCompositeOperation='source-over';dx.clearRect(0,0,W,H);dx.fillStyle='rgba(0,0,0,.965)';dx.fillRect(0,0,W,H);
 dx.globalCompositeOperation='destination-out';
 const r=52+Math.sin(t*9)*2-(Math.sin(t*23)*Math.sin(t*7)>.85?20:0),gr=dx.createRadialGradient(P.x,P.y,2,P.x,P.y,r);
 gr.addColorStop(0,'rgba(0,0,0,1)');gr.addColorStop(.6,'rgba(0,0,0,.8)');gr.addColorStop(1,'rgba(0,0,0,0)');dx.fillStyle=gr;dx.fillRect(0,0,W,H);
 g.drawImage(dk,0,0);
g.globalCompositeOperation='lighter';{const q=g.createRadialGradient(P.x,P.y,0,P.x,P.y,60);q.addColorStop(0,'rgba(255,190,110,.13)');q.addColorStop(1,'rgba(255,190,110,0)');g.fillStyle=q;g.fillRect(P.x-60,P.y-60,120,120)}g.globalCompositeOperation='source-over';
g.fillStyle=['rgba(40,20,60,.12)','rgba(20,60,50,.12)','rgba(80,50,10,.12)','rgba(90,0,10,.16)'][lv];g.fillRect(0,0,W,H);
DU.forEach((d,i)=>{g.fillStyle='rgba(200,200,220,.25)';g.fillRect((d.x+t*6*d.s)%W,d.y+Math.sin(t*d.s+i)*6,1,1)});
items.forEach(it=>{if(Math.hypot(P.x-it.x,P.y-it.y)<110&&Math.sin(t*6+it.x)>.2){g.fillStyle='#ffd27a';g.fillRect(it.x,it.y-6,1,1)}});
if(chased){g.fillStyle=`rgba(160,0,0,${.08+.06*Math.sin(t*10)})`;g.fillRect(0,0,W,H)}
g.drawImage(vg,0,0);
 E.forEach(e=>{if(Math.hypot(P.x-e.x,P.y-e.y)<130){g.fillStyle='#f22';g.fillRect(e.x-2,e.y-4,1,1);g.fillRect(e.x+2,e.y-4,1,1)}});
 txt(`${LV[lv].n}   ${LV[lv].need==1?'key':'items'} ${got}/${need}`,4,3,'#8a7f9c');
 if(st=='talk'&&dl[di]){const c=dl[di],s0=c.t||c,pl=s0[0]=='>',done=shown>=s0.length,col=pl?'#4a6a98':'#7a1f1f';
  g.fillStyle='rgba(6,3,10,.93)';g.fillRect(0,114,W,66);g.fillStyle=col;g.fillRect(0,114,W,1);
  g.fillStyle='#000';g.fillRect(6,122,26,26);g.fillStyle=col;g.fillRect(5,121,28,1);g.fillRect(5,148,28,1);g.fillRect(5,121,1,28);g.fillRect(32,121,1,28);
  if(pl)spr(PT.concat(PLG[0]),15,129,PL,0);
  else{g.fillStyle='#14101a';g.fillRect(9,124,18,22);g.fillStyle='#000';g.fillRect(12,128,12,14);if(Math.sin(t*1.3)<.97){g.fillStyle='#ffd27a';g.fillRect(14,133,3,2);g.fillRect(21,133,3,2)}if(!done&&Math.sin(t*30)>0){g.fillStyle='#c0302f';g.fillRect(16,139,6,2)}}
  txt(pl?'YOU':'NARRATOR',38,118,pl?'#8ab0e8':'#c0302f');
  wrap(s0.slice(0,shown|0).replace(/^> /,''),50).forEach((l,i)=>txt(l,38,128+i*10));
  if(c.c&&done)c.c.forEach((o,i)=>txt((i==sel?'> ':'  ')+o[0],40,150+i*9,i==sel?'#fff':'#8a7f9c'));
  else if(done)txt(Math.sin(t*6)>0?'▼':' ',306,166,'#8a7f9c')}
 if(mt>0){g.fillStyle='rgba(0,0,0,.8)';g.fillRect(0,138,W,42);wrap(msg.slice(0,shown|0),56).forEach((l,i)=>txt(l,6,142+i*10))}
 if(tc>0){g.fillStyle=`rgba(0,0,0,${Math.min(1,tc)})`;g.fillRect(0,0,W,H);if(tc>.3){const n=LV[lv].n.toUpperCase();g.font='16px monospace';txt(n,160-n.length*4.8,78,'#c0302f');g.font='8px monospace'}}
 if(st=='dead'){g.fillStyle=`rgba(120,0,0,${Math.min(.7,dt0)})`;g.fillRect(0,0,W,H);txt('IT FOUND YOU',116,84,'#fff')}}
let last=0;function loop(ts){const d=Math.min(.05,(ts-last)/1000||0);last=ts;t+=d;if(!(st=='talk'&&tc>.8))shown+=d*40;if(mt>0)mt-=d;if(tc>0)tc-=d;if(st=='play'&&E.some(e=>e.ch>0)&&(hb-=d)<0){hb=.6;snd(48,.2,'sine',.35)}
 if(st=='play')upd(d);else if(st=='dead'){dt0+=d;if(dt0>1.8)load(lv)}
 draw();requestAnimationFrame(loop)}
addEventListener('keydown',e=>{const k=e.key.toLowerCase();keys[k]=1;if(k.startsWith('arrow')||k==' ')e.preventDefault();
 if(st=='talk'){if(e.repeat)return;if(k=='enter'||k==' ')nx();else if(dl[di]&&dl[di].c){const n=dl[di].c.length;if(k=='s'||k=='arrowdown')sel=(sel+1)%n;if(k=='w'||k=='arrowup')sel=(sel+n-1)%n}return}
 if(k=='enter'){audio();if(st=='title')load(0);else if(st=='end')st='title'}
 if(k=='r'&&st=='play')load(lv)});
addEventListener('keyup',e=>keys[e.key.toLowerCase()]=0);
addEventListener('blur',()=>keys={});
requestAnimationFrame(loop);
