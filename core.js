(function(root){
  'use strict';
  const DAY=86400000, KEY='ielts-studio-v1';
  const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
  function dateKey(time=Date.now()){const d=new Date(time);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
  function fresh(){return {version:1,cards:{},history:{},favorites:[],essays:{},settings:{goal:20,newLimit:10,accent:'en-GB'}};}
  function validate(s,ids){
    const object=x=>x&&typeof x==='object'&&!Array.isArray(x);
    if(!object(s)||s.version!==1||!object(s.cards)||!object(s.history)||!object(s.essays)||!Array.isArray(s.favorites)||!object(s.settings))throw Error('备份格式不正确');
    const out=fresh(),valid=new Set(ids);
    if(!Number.isInteger(s.settings.goal)||s.settings.goal<5||s.settings.goal>100||!Number.isInteger(s.settings.newLimit)||s.settings.newLimit<1||s.settings.newLimit>50||!['en-GB','en-US'].includes(s.settings.accent))throw Error('计划设置无效');
    out.settings={goal:s.settings.goal,newLimit:s.settings.newLimit,accent:s.settings.accent};
    for(const [id,c] of Object.entries(s.cards)){
      if(!valid.has(id))continue;
      if(!object(c)||!Number.isInteger(c.reps)||c.reps<0||!Number.isInteger(c.lapses)||c.lapses<0||!Number.isFinite(c.interval)||c.interval<0||c.interval>365||!Number.isFinite(c.due)||c.due<0||c.due>8640000000000000||!Number.isFinite(c.last)||c.last<0||c.last>8640000000000000||!Number.isFinite(c.first)||c.first<0||c.first>c.last)throw Error('复习记录无效');
      out.cards[id]={reps:c.reps,lapses:c.lapses,interval:c.interval,due:c.due,last:c.last,first:c.first};
    }
    for(const [day,n] of Object.entries(s.history)){if(!/^\d{4}-\d{2}-\d{2}$/.test(day)||!Number.isInteger(n)||n<0||n>100000)throw Error('历史记录无效');out.history[day]=n;}
    out.favorites=[...new Set(s.favorites.filter(id=>valid.has(id)))];
    for(const [topic,essay] of Object.entries(s.essays)){if(!['environment','education','technology','society'].includes(topic)||typeof essay!=='string'||essay.length>100000)throw Error('草稿格式无效');out.essays[topic]=essay;}
    return out;
  }
  function merge(a,b){
    const out=JSON.parse(JSON.stringify(a));
    for(const [id,c] of Object.entries(b.cards))if(!own(out.cards,id)||c.last>out.cards[id].last)out.cards[id]=c;
    for(const [d,n] of Object.entries(b.history))out.history[d]=Math.max(out.history[d]||0,n);
    out.favorites=[...new Set([...a.favorites,...b.favorites])];
    for(const [t,e] of Object.entries(b.essays))if(!out.essays[t])out.essays[t]=e;
    return out;
  }
  function schedule(previous,rating,now=Date.now()){
    if(!['again','hard','good','easy'].includes(rating))throw Error('Unknown rating');
    const p=previous||{reps:0,lapses:0,interval:0,first:now};
    let interval=rating==='again'?10/1440:rating==='hard'?Math.max(1,p.interval*1.2):rating==='good'?(p.reps===0?1:Math.max(3,p.interval*2)):Math.max(4,p.interval*3);
    interval=Math.min(365,interval);
    return {reps:p.reps+1,lapses:p.lapses+(rating==='again'?1:0),interval,due:now+interval*DAY,last:now,first:p.first};
  }
  function queue(words,state,topic='all',now=Date.now()){
    const matches=w=>topic==='all'||w.topic===topic;
    const due=words.filter(w=>matches(w)&&state.cards[w.id]?.due<=now).sort((a,b)=>state.cards[a.id].due-state.cards[b.id].due);
    const newToday=Object.values(state.cards).filter(c=>dateKey(c.first)===dateKey(now)).length;
    const remaining=Math.max(0,state.settings.newLimit-newToday);
    return [...due,...words.filter(w=>matches(w)&&!own(state.cards,w.id)).slice(0,remaining)].map(w=>w.id);
  }
  function streak(history,now=Date.now()){
    let d=new Date(now);d.setHours(12,0,0,0);if(!history[dateKey(d)])d.setDate(d.getDate()-1);
    let count=0;while(history[dateKey(d)]){count++;d.setDate(d.getDate()-1);}return count;
  }
  const api={DAY,KEY,dateKey,fresh,validate,merge,schedule,queue,streak};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.IELTSCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
