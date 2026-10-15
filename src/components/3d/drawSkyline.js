// Orthographic skyline from public GitHub contribution levels.
export function drawSkyline(svg, { mode, yaw, pitch, days }) {
  const levels=days.map(day=>day.level);
  const weeks=Math.ceil(levels.length/7);
  const w=svg.clientWidth||800,h=svg.clientHeight||300;svg.setAttribute('viewBox',`0 0 ${w} ${h}`);svg.replaceChildren();
  const colors=['#132119','#0e4429','#006d32','#26a641','#39d353'];
  const make=(points,fill)=>{const p=document.createElementNS('http://www.w3.org/2000/svg','polygon');p.setAttribute('points',points.map(a=>a.join(',')).join(' '));p.setAttribute('fill',fill);svg.append(p);};
  if(mode==='flat'){
   const size=Math.min((w-12)/weeks,(h-36)/7),gap=Math.max(1,size*.18);levels.forEach((v,i)=>{const x=(w-weeks*size)/2+Math.floor(i/7)*size,y=(h-7*size)/2+(i%7)*size;make([[x,y],[x+size-gap,y],[x+size-gap,y+size-gap],[x,y+size-gap]],colors[v]);});return;
  }
  const rotate=(x,z)=>({x:x*Math.cos(yaw)-z*Math.sin(yaw),d:x*Math.sin(yaw)+z*Math.cos(yaw)});
  const raw=(x,z,y)=>{const p=rotate(x,z);return [p.x,p.d*Math.sin(pitch)-y*Math.cos(pitch)];};
  const bounds=[];for(const x of [-weeks/2,weeks/2])for(const z of [-3.5,3.5])for(const y of [0,3])bounds.push(raw(x,z,y));
  const minX=Math.min(...bounds.map(p=>p[0])),maxX=Math.max(...bounds.map(p=>p[0])),minY=Math.min(...bounds.map(p=>p[1])),maxY=Math.max(...bounds.map(p=>p[1]));
  const unit=Math.min((w-32)/(maxX-minX),(h-36)/(maxY-minY));
  const project=(x,z,y)=>{const p=raw(x,z,y);return [w/2+(p[0]-(minX+maxX)/2)*unit,h/2+(p[1]-(minY+maxY)/2)*unit];};
  make([project(-weeks/2-.2,-3.7,-.12),project(weeks/2+.2,-3.7,-.12),project(weeks/2+.2,3.7,-.12),project(-weeks/2-.2,3.7,-.12)],'#0c1710');
  const blocks=levels.map((v,i)=>({v,x:Math.floor(i/7)-(weeks-1)/2,z:i%7-3})).sort((a,b)=>rotate(a.x,a.z).d-rotate(b.x,b.z).d);
  for(const {v,x,z} of blocks){
   const a=.38,height=v===0?.07:.12+v*.52;
   const faces=[
    {d:rotate(x,z-a).d,points:[[x-a,z-a,0],[x+a,z-a,0],[x+a,z-a,height],[x-a,z-a,height]],fill:'#14532d'},
    {d:rotate(x+a,z).d,points:[[x+a,z-a,0],[x+a,z+a,0],[x+a,z+a,height],[x+a,z-a,height]],fill:'#238636'},
    {d:rotate(x,z+a).d,points:[[x+a,z+a,0],[x-a,z+a,0],[x-a,z+a,height],[x+a,z+a,height]],fill:'#1c6838'},
    {d:rotate(x-a,z).d,points:[[x-a,z+a,0],[x-a,z-a,0],[x-a,z-a,height],[x-a,z+a,height]],fill:'#104225'}
   ].sort((a,b)=>a.d-b.d);
   for(const face of faces)make(face.points.map(p=>project(...p)),v?face.fill:'#11251a');
   make([[x-a,z-a,height],[x+a,z-a,height],[x+a,z+a,height],[x-a,z+a,height]].map(p=>project(...p)),colors[v]);
  }

 }
