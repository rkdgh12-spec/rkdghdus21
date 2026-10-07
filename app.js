
  (()=>{
    const root=document.getElementById('forum-source-network');
    const data=window.FORUM_DATA;
    const nodes=data.nodes,edges=data.edges.filter(e=>data.nodes[e.source].kind!=='chapter');
    const chapters=nodes.filter(n=>n.kind==='chapter'),points=nodes.filter(n=>n.kind!=='chapter');
    const stage=root.querySelector('.stage'),svg=root.querySelector('.wires'),layer=root.querySelector('.node-layer'),detail=root.querySelector('.detail');
    const kindNames={chapter:'주제 영역',person:'인물',concept:'개념어',subconcept:'하위개념어',question:'인터뷰 질문'};
    const NS='http://www.w3.org/2000/svg';
    let width=stage.clientWidth,height=stage.clientHeight,k=1,fitK=1,ox=0,oy=0,selected=null,drag=null;
    let expanded=new Set(),visible=new Set(chapters.map(n=>n.id)),cueIndex=-1,currentQuestion=null,presentationMode=true,depthEnabled=false;
    const children=id=>nodes.filter(n=>n.parent===id);
    const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elems=new Map(),paths=[],areas=new Map();
    const q=(s)=>root.querySelector(s);
    const depthButton=q('#forum-depth');
    const flatPlane=q('.map-plane'),threeScene=q('.three-scene'),threeSvg=q('.three-wires'),threeLayer=q('.three-nodes');
    const threeNodes=new Map();const maxThreeZoom=24,labelZoom=z=>Math.min(8,Math.max(1,z<=6?1+(z-1)*.2:z/3));let threeYaw=-.34,threeElevation=.82,threeZoom=1,threePanX=0,threePanY=0;
    function setDepthEnabled(enabled){
      depthEnabled=enabled;
      stage.classList.toggle('three-view',enabled);
      flatPlane.hidden=enabled;threeScene.hidden=!enabled;
      depthButton.setAttribute('aria-pressed',String(enabled));
      depthButton.textContent=enabled?'2D 보기':'3D 보기';
      q('.depth-hint').hidden=!enabled;
      render();save();
    }
    const ancestors=id=>{const arr=[];while(id!==null){arr.unshift(id);id=nodes[id].parent;}return arr};
    const descendants=id=>{const set=new Set([id]);for(const n of nodes)if(n.parent!==null&&set.has(n.parent))set.add(n.id);return set};
    const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const displayLabel=n=>n.kind==='chapter'?`제${n.chapter}장 · ${n.label}`:n.label;
    const dialog=q('#interview-dialog'),video=q('#interview-video'),panel=q('.detail-panel');
    let interviewMode='person';
    let stepHistory=[],stepIndex=-1,stepDepth=0,restoringStep=false;
    const epilogueQuestions=(window.FORUM_EPILOGUE||[]).map(row=>{const person=points.find(n=>n.kind==='person'&&n.label===row.person);return {...row,id:'epilogue-'+person.id,kind:'epilogue',parent:person.id,chapter:person.chapter}});
    const cues=[];
    for(const c of [...chapters].sort((a,b)=>a.chapter-b.chapter)){
      const nav=document.createElement('button');nav.type='button';nav.dataset.chapter=c.id;nav.innerHTML='<span class="nav-number">0'+c.chapter+'</span>'+esc(c.label);nav.addEventListener('click',()=>select(c.id));q('.chapter-nav').append(nav);
      cues.push({id:c.id,deep:false,label:displayLabel(c)});
      for(const p of children(c.id)){cues.push({id:p.id,deep:false,label:p.label+' · 주요 개념'});cues.push({id:p.id,deep:true,label:p.label+' · 인터뷰와 연결'})}
    }
    cues.push({all:true,label:'다시, 조각으로 · 전체 연결'});
    cues.push({epilogue:true,label:'에필로그 · 조소과 교육의 앞으로'});
    const epilogueNav=document.createElement('button');epilogueNav.type='button';epilogueNav.className='epilogue-nav';epilogueNav.textContent='에필로그 · 교육';epilogueNav.addEventListener('click',()=>recordStep(()=>{showAll();openEpilogue(0)}));q('.chapter-nav').append(epilogueNav);
    epilogueQuestions.forEach((n,index)=>{const tab=document.createElement('button');tab.type='button';tab.id='epilogue-person-'+index;tab.textContent=n.person;tab.setAttribute('role','tab');tab.setAttribute('aria-controls','interview-content');tab.addEventListener('click',()=>openEpilogue(index));tab.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?epilogueQuestions.length-1:(index+(e.key==='ArrowRight'?1:epilogueQuestions.length-1))%epilogueQuestions.length;openEpilogue(next);q('#epilogue-person-'+next).focus()});q('#epilogue-people').append(tab)});
    const outerOutline=document.createElementNS(NS,'path');outerOutline.setAttribute('class','outer-outline');outerOutline.setAttribute('aria-hidden','true');svg.append(outerOutline);
    let coreHalo=null;
    for(const c of [...chapters].sort((a,b)=>(a.chapter===5)-(b.chapter===5))){
      if(c.chapter===5){coreHalo=document.createElementNS(NS,'path');coreHalo.setAttribute('class','core-halo');coreHalo.setAttribute('aria-hidden','true');svg.append(coreHalo)}
      const region=document.createElementNS(NS,'path');region.setAttribute('class','region'+(c.chapter===5?' core':''));svg.append(region);
      const heading=document.createElement('button');heading.type='button';heading.className='area-heading cursor-interaction'+(c.chapter===5?' core':'');heading.innerHTML='<span class="chapter-number">제'+esc(c.chapter)+'장</span><strong>'+esc(c.label)+'</strong><small hidden>'+esc(c.subtitle)+'</small>';heading.setAttribute('aria-label',displayLabel(c));heading.setAttribute('aria-expanded','false');heading.addEventListener('pointerdown',e=>e.stopPropagation());heading.addEventListener('click',()=>select(c.id));layer.append(heading);
      areas.set(c.id,{region,heading,members:points.filter(n=>n.chapter===c.chapter)});
    }
    for(const e of edges){
      const l=document.createElementNS(NS,'path');l.classList.add('links');
      if(e.kind!=='hierarchy')l.classList.add(e.kind);if(e.core)l.classList.add('core');
      const t=document.createElementNS(NS,'title'),a=nodes[e.source],b=nodes[e.target];
      const edgeLabel=n=>n.kind==='question'?n.person+' · '+n.label:n.label;
      t.textContent=e.kind!=='hierarchy'?edgeLabel(a)+' ↔ '+edgeLabel(b)+' · '+e.reason:edgeLabel(a)+' → '+edgeLabel(b);
      l.append(t);svg.append(l);paths.push(l);
    }
    for(const n of points){
      const b=document.createElement('button');b.type='button';b.className='dot '+n.kind+' cursor-interaction';b.style.setProperty('--diameter',({person:6.5,concept:4.2,subconcept:3,question:3.5})[n.kind]+'px');
      b.setAttribute('aria-label',kindNames[n.kind]+' '+(n.person?n.person+' / ':'')+(n.question||n.label));b.setAttribute('data-tooltip',n.question||(n.label+(n.subtitle?' · '+n.subtitle:'')));
      b.title=n.question||(n.person&&n.kind!=='person'?n.person+' · ':'')+n.label;
      const mark=document.createElement('span');mark.className='node-mark';b.append(mark);
      b.addEventListener('pointerdown',e=>e.stopPropagation());b.addEventListener('click',()=>select(n.id));
      const label=document.createElement('span');label.className='node-label '+n.kind;
      const labelText=document.createElement('span');labelText.className='node-label-text';labelText.textContent=n.label;label.append(labelText);b.append(label);
      if(n.kind!=='question')b.setAttribute('aria-expanded','false');
      layer.append(b);elems.set(n.id,{b,label});
    }
    function fit(ids=null){
      const arr=ids?nodes.filter(n=>ids.has(n.id)):nodes;
      const minx=Math.min(...arr.map(n=>n.x))-150,maxx=Math.max(...arr.map(n=>n.x))+190,miny=Math.min(...arr.map(n=>n.y))-100,maxy=Math.max(...arr.map(n=>n.y))+110;
      const core=nodes.find(n=>n.kind==='chapter'&&n.label==='다시, 조각으로');
      const cx=ids?(minx+maxx)/2:core.x,cy=ids?(miny+maxy)/2:core.y;
      const rx=Math.max(cx-minx,maxx-cx),ry=Math.max(cy-miny,maxy-cy);
      k=Math.min((width-36)/(2*rx),(height-48)/(2*ry),1.9);fitK=k;ox=width/2-cx*k;oy=height/2-cy*k;render();
    }
    function updateVisible(){
      visible=new Set(chapters.map(n=>n.id));
      for(const n of points)if(visible.has(n.parent)&&expanded.has(n.parent))visible.add(n.id);
    }
    function select(id){return recordStep(()=>selectStep(id))}
    function selectStep(id){
      const before=new Set(visible);selected=id;
      for(const aid of ancestors(id))if(children(aid).length)expanded.add(aid);
      updateVisible();showDetail(nodes[id]);render();save();
      animateNodes(before);
      q('#map-status').textContent=displayLabel(nodes[id])+' 선택';
    }
    function animateNodes(before){
      if(reducedMotion)return;
      if(depthEnabled)return;
      let index=0;for(const nid of visible){if(before.has(nid)||!elems.has(nid))continue;const n=nodes[nid],p=nodes[n.parent],{b}=elems.get(nid);b.animate([{transform:`translate(calc(-50% + ${(p.x-n.x)*k}px),calc(-50% + ${(p.y-n.y)*k}px))`,opacity:0},{transform:'translate(-50%,-50%)',opacity:1}],{duration:520,delay:Math.min(index++*18,320),easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});}
    }
    function showDetail(n,openQuestion=true){
      if(!n){panel.hidden=true;detail.hidden=true;detail.innerHTML='';return}
      if(n.kind==='question'&&openQuestion){panel.hidden=true;openInterview(n);return}
      panel.hidden=false;
      detail.hidden=false;
      const route=ancestors(n.id).map(id=>'<button type="button" data-pick="'+id+'">'+esc(displayLabel(nodes[id]))+'</button>').join('<span aria-hidden="true">›</span>');
      let out='<div class="small-label">'+kindNames[n.kind]+'</div><div class="detail-title">'+esc(n.kind==='question'?n.person+' · '+n.label:displayLabel(n))+'</div>';
      if(n.kind==='person'){
        out+='<div class="person-profile">'+profileHTML(n.label)+'</div>';
        out+='<div class="person-tabs" role="tablist" aria-label="'+esc(n.label)+' 소개"><button type="button" role="tab" id="person-intro-tab" aria-selected="true" aria-controls="person-intro-panel" data-person-tab="intro">자기소개 영상</button><button type="button" role="tab" id="person-concepts-tab" aria-selected="false" aria-controls="person-concepts-panel" tabindex="-1" data-person-tab="concepts">주요 개념</button></div>';
        const hasVideo=!!assetURL(((window.FORUM_MEDIA||{})[n.label+'/Q1']||{}).src);
        out+='<section role="tabpanel" id="person-intro-panel" aria-labelledby="person-intro-tab"><p class="intro-question">현재 어떤 일을 하고 계신지, 본인의 활동을 중심으로 소개해 주세요.</p><button type="button" class="person-video-button" data-introduction="'+n.id+'"><span aria-hidden="true">▷</span> 자기소개 영상 보기</button>'+(hasVideo?'':'<p class="person-media-status">영상 준비 중</p>')+'</section><section role="tabpanel" id="person-concepts-panel" aria-labelledby="person-concepts-tab" hidden>';
      }
      out+='<div class="path">'+route+'</div>';
      if(n.subtitle)out+='<p class="question-text">'+esc(n.subtitle)+'</p>';
      if(n.kind==='question')out+='<p class="question-text">'+esc(n.question)+'</p>';
      else {
        const next=children(n.id).filter(x=>visible.has(x.id));
        if(next.length)out+='<div class="route-list">'+next.map(x=>'<button type="button" class="route-button" data-pick="'+x.id+'">'+esc(x.kind==='question'?x.label+' · '+x.topic:x.label)+(x.kind==='question'?' <em>인터뷰 보기</em>':' <em>펼치기</em>')+'</button>').join('')+'</div>';
      }
      if(n.kind==='person'){
        const related=edges.filter(e=>e.kind==='related'&&visible.has(e.source)&&visible.has(e.target)&&(e.source===n.id||e.target===n.id));
        if(related.length)out+='<div class="small-label">함께 펼쳐진 인물과의 연결</div><div class="relation-list">'+related.map(e=>{const id=e.source===n.id?e.target:e.source;return esc(nodes[id].label)+' — '+esc(e.reason)}).join('<br>')+'</div>';
        if(related.some(e=>e.inferred))out+='<p class="source-note">원문의 인물 연결에 더해, 개념어와 질문의 공통 쟁점을 바탕으로 제안한 연결을 포함합니다.</p>';
      }
      const semanticLinks=edges.filter(e=>e.kind==='semantic'&&visible.has(e.source)&&visible.has(e.target)&&(e.source===n.id||e.target===n.id));
      if(semanticLinks.length)out+='<div class="small-label">함께 이어지는 의미</div><div class="relation-list">'+semanticLinks.map(e=>{const id=e.source===n.id?e.target:e.source,other=nodes[id];return '<button type="button" class="route-button" data-pick="'+id+'">'+esc(other.person+' · '+other.label+(other.kind==='question'?' — '+other.topic:''))+'</button> — '+esc(e.reason)}).join('<br>')+'</div><p class="source-note">원문 개념어와 질문의 접점을 바탕으로 제안한 연결입니다.</p>';
      const questionLinks=edges.filter(e=>e.kind==='question-related'&&visible.has(e.source)&&visible.has(e.target)&&(e.source===n.id||e.target===n.id));
      if(questionLinks.length)out+='<div class="small-label">이어지는 질문</div><div class="relation-list">'+questionLinks.map(e=>{
        const other=nodes[e.source===n.id?e.target:e.source];
        return '<button type="button" class="route-button" data-pick="'+other.id+'">'+esc(other.person+' · '+other.label+' — '+other.topic)+'</button><br>'+esc(e.reason);
      }).join('<br>')+'</div><p class="source-note">원문 질문의 공통 쟁점을 바탕으로 제안한 연결입니다.</p>';
      if(n.kind==='question')out+='<button type="button" class="route-button" data-pick="'+n.id+'">인터뷰 보기</button>';
      if(n.kind==='person')out+='</section>';
      detail.innerHTML=out;detail.querySelectorAll('[data-pick]').forEach(b=>b.addEventListener('click',()=>select(Number(b.dataset.pick))));
      const introButton=detail.querySelector('[data-introduction]');if(introButton)introButton.addEventListener('click',()=>openInterview(introduction(nodes[Number(introButton.dataset.introduction)])));
      const tabs=[...detail.querySelectorAll('[data-person-tab]')];
      function activateTab(tab){recordStep(()=>{for(const t of tabs){const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!active}})}
      tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>activateTab(tab));tab.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();e.stopPropagation();const target=tabs[e.key==='Home'?0:e.key==='End'?tabs.length-1:(index+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length];activateTab(target);target.focus()})});
    }
    function profileHTML(name){const p=(window.FORUM_PROFILES||{})[name];if(!p)return '';return '<p class="person-role">'+esc(p.role)+'</p>'+(p.career?.length?'<ul class="person-career">'+p.career.map(line=>'<li>'+esc(line)+'</li>').join('')+'</ul>':'')}
    function introduction(person){return {id:'intro-'+person.id,kind:'introduction',parent:person.id,person:person.label,chapter:person.chapter,label:'Q1',topic:'자기소개',question:'Q1. 현재 어떤 일을 하고 계신지, 본인의 활동을 중심으로 소개해 주세요.'}}
    function personQuestions(name){const person=points.find(n=>n.kind==='person'&&n.label===name);return [...(person?[introduction(person)]:[]),...points.filter(n=>n.kind==='question'&&n.person===name&&n.label!=='Q1')]}
    function assetURL(value){if(typeof value!=='string'||!value.trim())return '';try{const u=new URL(value,location.href);return ['https:','http:'].includes(u.protocol)?u.href:''}catch{return ''}}
    function stopVideo(){video.pause();video.removeAttribute('src');video.removeAttribute('poster');video.replaceChildren();video.load()}
    function openEpilogue(index){const n=epilogueQuestions[index];if(n)openInterview(n,'epilogue')}
    function openInterview(n,mode='person'){return recordStep(()=>openInterviewStep(n,mode))}
    function openInterviewStep(n,mode='person'){
      currentQuestion=n;stopVideo();
      interviewMode=mode;const isEpilogue=mode==='epilogue';q('#epilogue-collection').hidden=!isEpilogue;
      const content=q('#interview-content');
      if(isEpilogue){content.setAttribute('role','tabpanel');content.setAttribute('aria-labelledby','epilogue-person-'+epilogueQuestions.indexOf(n));content.tabIndex=0}else{content.removeAttribute('role');content.removeAttribute('aria-labelledby');content.removeAttribute('tabindex')}
      q('#epilogue-people').querySelectorAll('button').forEach((tab,index)=>{const active=epilogueQuestions[index].id===n.id;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1});
      const media=(window.FORUM_MEDIA||{})[n.person+'/'+n.label]||{};
      q('#interview-person').textContent=n.person;
      q('#interview-profile').innerHTML=profileHTML(n.person);
      q('#interview-chapter').textContent=(isEpilogue?'에필로그 · 교육에 관한 공통 질문':'제'+n.chapter+'장 · '+chapters.find(c=>c.chapter===n.chapter).label)+' / '+n.label;
      q('#interview-title').textContent=isEpilogue?n.topic:media.title||n.topic||nodes[n.parent].label;
      q('#interview-question').textContent=n.question;
      q('#interview-concepts').replaceChildren();
      for(const id of (isEpilogue?[]:n.kind==='introduction'?children(n.parent).map(x=>x.id):ancestors(n.id)).filter(id=>['concept','subconcept'].includes(nodes[id].kind))){const t=document.createElement('span');t.textContent=nodes[id].label;q('#interview-concepts').append(t)}
      const src=assetURL(media.src);video.hidden=!src;q('#video-empty').hidden=!!src;q('#video-error').hidden=true;
      if(src){video.src=src;const poster=assetURL(media.poster);if(poster)video.poster=poster;video.style.objectFit=media.fit==='cover'?'cover':'contain';video.style.objectPosition=media.position||'center';
        for(const [i,caption] of (media.captions||[]).entries()){const url=assetURL(caption.src);if(!url)continue;const track=document.createElement('track');track.kind='subtitles';track.label=caption.label||'한국어';track.srclang=caption.language||'ko';track.src=url;track.default=i===0;video.append(track)}
        video.load();
      }
      q('#transcript-section').hidden=!media.transcript;q('#transcript-section').open=false;q('#interview-transcript').textContent=media.transcript||'';
      const qs=isEpilogue?epilogueQuestions:personQuestions(n.person),index=qs.findIndex(x=>x.id===n.id);
      q('#question-count').textContent=(index+1)+' / '+qs.length;q('#question-prev').disabled=index===0;q('#question-next').disabled=index===qs.length-1;
      q('#question-prev').textContent=isEpilogue?'이전 인물':'이전 질문';q('#question-next').textContent=isEpilogue?'다음 인물':'다음 질문';q('#interview-related').parentElement.hidden=isEpilogue;
      const related=n.kind==='introduction'?qs.slice(1):[...new Set(edges.filter(e=>e.kind!=='hierarchy'&&(e.source===n.id||e.target===n.id)).map(e=>e.source===n.id?e.target:e.source))].map(id=>nodes[id]).filter(x=>x.kind==='question');
      q('#interview-related').replaceChildren();
      if(!related.length){const t=document.createElement('span');t.textContent='지도의 다른 질문도 만나보세요.';q('#interview-related').append(t)}
      for(const other of related.slice(0,6)){const b=document.createElement('button');b.type='button';b.textContent=other.person+' · '+other.topic;b.addEventListener('click',()=>select(other.id));q('#interview-related').append(b)}
      if(!dialog.open){dialog.showModal();if(!reducedMotion)dialog.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:240,easing:'ease-out'})}
      dialog.scrollTop=0;
    }
    function changeQuestion(delta){if(!currentQuestion)return;if(interviewMode==='epilogue'){openEpilogue(epilogueQuestions.findIndex(n=>n.id===currentQuestion.id)+delta);return}const qs=personQuestions(currentQuestion.person),index=qs.findIndex(x=>x.id===currentQuestion.id),next=qs[index+delta];if(next){if(next.kind==='introduction')openInterview(next);else select(next.id)}}
    q('#question-prev').addEventListener('click',()=>changeQuestion(-1));q('#question-next').addEventListener('click',()=>changeQuestion(1));
    function closeInterview(){recordStep(()=>{stopVideo();dialog.close()})}
    q('#interview-close').addEventListener('click',closeInterview);dialog.addEventListener('close',()=>{if(!dialog.open)stopVideo()});dialog.addEventListener('cancel',e=>{e.preventDefault();closeInterview()});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeInterview()}});
    video.addEventListener('error',()=>{if(video.getAttribute('src'))q('#video-error').hidden=false});
    q('.detail-close').addEventListener('click',()=>recordStep(()=>{panel.hidden=true}));
    function updateCue(){q('#sequence-count').textContent=(cueIndex+1)+' / '+cues.length;q('#sequence-label').textContent=cueIndex<0?'주제 선택부터 시작합니다':cues[cueIndex].label;q('#sequence-prev').disabled=cueIndex<0;q('#sequence-next').disabled=cueIndex>=cues.length-1}
    function runCue(index){return recordStep(()=>runCueStep(index))}
    function runCueStep(index){
      const before=new Set(visible);cueIndex=Math.max(-1,Math.min(cues.length-1,index));expanded.clear();selected=null;
      for(let i=0;i<=cueIndex;i++){const cue=cues[i];if(cue.epilogue){selected=null;continue}if(cue.all){for(const n of nodes)if(n.kind!=='question')expanded.add(n.id);selected=null;continue}for(const id of ancestors(cue.id))if(children(id).length)expanded.add(id);if(cue.deep)for(const id of descendants(cue.id))if(children(id).length)expanded.add(id);selected=cue.id}
      updateVisible();showDetail(null);render();animateNodes(before);updateCue();save();
      if(cues[cueIndex]?.epilogue)openEpilogue(0);
    }
    q('#sequence-next').addEventListener('click',()=>runCue(cueIndex+1));q('#sequence-prev').addEventListener('click',()=>runCue(cueIndex-1));
    function showAll(){return recordStep(()=>{const before=new Set(visible);selected=null;cueIndex=cues.findIndex(c=>c.all);expanded=new Set(nodes.filter(n=>n.kind!=='question').map(n=>n.id));updateVisible();fit();showDetail(null);animateNodes(before);updateCue();save()})}
    function reset(){return recordStep(()=>{selected=null;cueIndex=-1;expanded.clear();updateVisible();fit();showDetail(null);updateCue();save()})}
    function enter(mode){recordStep(()=>{if(mode!=='resume'){presentationMode=mode==='presentation';reset()}q('.sequence-controls').hidden=!presentationMode;q('.map-shell').classList.toggle('explore',!presentationMode);q('.map-shell').inert=false;q('.intro').inert=true;q('.intro').hidden=true;if(!reducedMotion)q('.map-shell').animate([{opacity:0},{opacity:1}],{duration:250,easing:'ease-out'});q(presentationMode?'#sequence-next':'.chapter-nav button').focus({preventScroll:true});save()})}
    q('#enter-presentation').addEventListener('click',()=>enter('presentation'));q('#enter-explore').addEventListener('click',()=>enter('explore'));q('#enter-resume').addEventListener('click',()=>enter('resume'));
    q('#forum-home').addEventListener('click',()=>recordStep(()=>{q('.intro').hidden=false;q('.intro').inert=false;q('.map-shell').inert=true;q('#enter-resume').hidden=expanded.size===0;q('#enter-presentation').focus()}));
    q('#forum-fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await root.requestFullscreen()}catch{q('#map-status').textContent='이 브라우저에서는 전체 화면을 사용할 수 없습니다.'}});
    document.addEventListener('fullscreenchange',()=>{q('#forum-fullscreen').textContent=document.fullscreenElement?'전체 화면 닫기':'전체 화면'});
    document.addEventListener('keydown',e=>{if(e.defaultPrevented||e.ctrlKey||e.metaKey||e.altKey||e.target.closest('input,textarea,select,video,[contenteditable=true],[role=tab]'))return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();moveStep(e.key==='ArrowRight'?1:-1)}else if(presentationMode&&!dialog.open&&q('.intro').hidden&&(e.key==='PageDown'||e.key==='PageUp')){e.preventDefault();runCue(cueIndex+(e.key==='PageDown'?1:-1))}else if(e.key==='Escape'&&!dialog.open)recordStep(()=>{panel.hidden=true})});
    function snapshotStep(){
      return {selected,expanded:[...expanded].sort((a,b)=>a-b),cueIndex,presentationMode,introOpen:!q('.intro').hidden,panelOpen:!panel.hidden,personTab:!panel.hidden&&nodes[selected]?.kind==='person'?(detail.querySelector('[data-person-tab][aria-selected=true]')?.dataset.personTab||'intro'):'intro',interview:dialog.open&&currentQuestion?{id:currentQuestion.id,kind:currentQuestion.kind,person:currentQuestion.person,mode:interviewMode}:null,camera:{k,x:(width/2-ox)/k,y:(height/2-oy)/k},panelScroll:panel.scrollTop,dialogScroll:dialog.scrollTop};
    }
    function stepSignature(s){const {panelScroll,dialogScroll,...navigation}=s;return JSON.stringify(navigation)}
    function recordStep(action){
      if(restoringStep||stepDepth||stepIndex<0)return action();
      stepHistory[stepIndex]=snapshotStep();const before=stepSignature(stepHistory[stepIndex]);
      stepDepth++;try{return action()}finally{stepDepth--;const after=snapshotStep();if(stepSignature(after)!==before){stepHistory=stepHistory.slice(0,stepIndex+1);stepHistory.push(after);stepIndex++}updateStepControls()}
    }
    function resetStepHistory(){stepHistory=[snapshotStep()];stepIndex=0;updateStepControls()}
    function stepLabel(s){if(s.introOpen)return '시작 화면';if(s.interview)return (s.interview.mode==='epilogue'?'에필로그 · ':'')+s.interview.person+' · '+(s.interview.kind==='introduction'?'자기소개 영상':s.interview.mode==='epilogue'?'교육 인터뷰':nodes[s.interview.id]?.label+' 인터뷰');if(s.selected!==null)return (nodes[s.selected].kind==='person'?nodes[s.selected].label+' · '+(s.personTab==='concepts'?'주요 개념':'인물 소개'):displayLabel(nodes[s.selected]));return s.cueIndex>=0?cues[s.cueIndex].label:'주제 선택'}
    function updateStepControls(){
      root.querySelectorAll('[data-history]').forEach(button=>{const delta=Number(button.dataset.history),target=stepIndex+delta;button.disabled=target<0||target>=stepHistory.length;button.title=button.disabled?(delta<0?'이전 단계가 없습니다':'다음 방문 단계가 없습니다'):(delta<0?'뒤로가기: ':'앞으로가기: ')+stepLabel(stepHistory[target])});
      root.querySelectorAll('[data-history-count]').forEach(label=>{label.textContent=stepIndex>0||stepHistory.length>1?stepIndex+' / '+(stepHistory.length-1):''});
      q('#cue-label').textContent=stepHistory[stepIndex]?stepLabel(stepHistory[stepIndex]):'주제 선택';q('#cue-count').textContent=stepIndex+' / '+Math.max(0,stepHistory.length-1);
    }
    function moveStep(delta){
      const target=stepIndex+delta;if(target<0||target>=stepHistory.length)return;
      stepHistory[stepIndex]=snapshotStep();stepIndex=target;const s=stepHistory[stepIndex],before=new Set(visible);restoringStep=true;
      try{
        if(dialog.open)closeInterview();
        selected=s.selected;expanded=new Set(s.expanded);cueIndex=s.cueIndex;presentationMode=s.presentationMode;updateVisible();q('.intro').hidden=!s.introOpen;q('.intro').inert=!s.introOpen;q('.map-shell').inert=s.introOpen;q('#enter-resume').hidden=expanded.size===0;
        k=s.camera.k;ox=width/2-s.camera.x*k;oy=height/2-s.camera.y*k;
        showDetail(s.panelOpen&&selected!==null?nodes[selected]:null,false);
        if(s.panelOpen&&nodes[selected]?.kind==='person')detail.querySelector('[data-person-tab="'+s.personTab+'"]')?.click();
        q('.sequence-controls').hidden=!presentationMode;q('.map-shell').classList.toggle('explore',!presentationMode);render();updateCue();animateNodes(before);panel.scrollTop=s.panelScroll;
        if(s.interview){const item=s.interview.kind==='epilogue'?epilogueQuestions.find(n=>n.id===s.interview.id):s.interview.kind==='introduction'?introduction(points.find(n=>n.kind==='person'&&n.label===s.interview.person)):nodes[s.interview.id];if(item){openInterview(item,s.interview.mode);dialog.scrollTop=s.dialogScroll}}
        save();
      }finally{restoringStep=false;updateStepControls()}
      q('#map-status').textContent=stepLabel(s)+' · '+(delta<0?'이전 단계':'다음 단계');
      const surface=dialog.open?dialog:s.introOpen?q('.intro'):q('.presentation-bar');const control=surface.querySelector('[data-history="'+delta+'"]:not(:disabled)')||surface.querySelector('[data-history]:not(:disabled)')||q('#forum-fit');control.focus({preventScroll:true});
    }
    root.querySelectorAll('[data-history]').forEach(button=>button.addEventListener('click',()=>moveStep(Number(button.dataset.history))));
    function hull(list){
      const ps=list.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
      const cross=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
      const lo=[],hi=[];
      for(const p of ps){while(lo.length>=2&&cross(lo[lo.length-2],lo[lo.length-1],p)<=0)lo.pop();lo.push(p)}
      for(const p of [...ps].reverse()){while(hi.length>=2&&cross(hi[hi.length-2],hi[hi.length-1],p)<=0)hi.pop();hi.push(p)}
      return lo.slice(0,-1).concat(hi.slice(0,-1));
    }
    function softPath(ps){
      const h=hull(ps);if(h.length<3)return '';
      let out='M'+[(h[0][0]+h[h.length-1][0])/2,(h[0][1]+h[h.length-1][1])/2].join(',');
      h.forEach((p,i)=>{const b=h[(i+1)%h.length];out+='Q'+p.join(',')+' '+[(p[0]+b[0])/2,(p[1]+b[1])/2].join(',')});return out+'Z';
    }
    function roundEnvelope(ps){
      const boundary=hull(ps);if(boundary.length<3)return '';
      const lengths=boundary.map((p,i)=>{const b=boundary[(i+1)%boundary.length];return Math.hypot(b[0]-p[0],b[1]-p[1])});
      const perimeter=lengths.reduce((sum,l)=>sum+l,0),samples=[];
      let segment=0,offset=0;
      for(let i=0;i<28;i++){
        const distance=i*perimeter/28;
        while(segment<lengths.length-1&&offset+lengths[segment]<distance){offset+=lengths[segment];segment++}
        const a=boundary[segment],b=boundary[(segment+1)%boundary.length],t=(distance-offset)/lengths[segment];
        samples.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);
      }
      return softPath(samples);
    }
    let networkContours=null;
    function organicContour(samples,cx,cy,minRadius,padding,spread,percentile,variation){
      const count=48,bands=Array.from({length:count},()=>[]);
      for(const [px,py] of samples){
        const dx=px-cx,dy=py-cy,distance=Math.hypot(dx,dy);
        if(distance<minRadius-padding)continue;
        const angle=Math.atan2(dy,dx);
        for(let i=0;i<count;i++){
          const direction=i*2*Math.PI/count;
          const delta=Math.atan2(Math.sin(angle-direction),Math.cos(angle-direction));
          if(Math.abs(delta)<spread)bands[i].push(distance+padding);
        }
      }
      const radii=bands.map(band=>{
        if(!band.length)return minRadius;
        band.sort((a,b)=>a-b);
        return Math.max(minRadius,band[Math.floor((band.length-1)*percentile)]);
      });
      for(let pass=0;pass<2;pass++){
        const previous=[...radii];
        for(let i=0;i<count;i++)radii[i]=(previous[(i+count-1)%count]+2*previous[i]+previous[(i+1)%count])/4;
      }
      const average=radii.reduce((sum,radius)=>sum+radius,0)/count;
      return radii.map((radius,i)=>{
        const softened=average+(radius-average)*variation;
        return [cx+Math.cos(i*2*Math.PI/count)*softened,cy+Math.sin(i*2*Math.PI/count)*softened];
      });
    }
    function contourPath(points){
      const screen=points.map(([x,y])=>[x*k+ox,y*k+oy]);
      const midpoint=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2].join(',');
      let d='M'+midpoint(screen[screen.length-1],screen[0]);
      screen.forEach((p,i)=>{d+='Q'+p.join(',')+' '+midpoint(p,screen[(i+1)%screen.length])});
      return d+'Z';
    }
    function connectedContours(){
      const center=chapters.find(c=>c.chapter===5),outer=points.map(n=>[n.x,n.y]);
      const core=points.filter(n=>n.chapter===5).map(n=>[n.x,n.y]);
      edges.forEach((e,i)=>{
        const path=paths[i],length=path.getTotalLength();
        if(!length) return;
        const a=nodes[e.source],b=nodes[e.target];
        for(const fraction of [.2,.4,.6,.8]){
          const p=path.getPointAtLength(length*fraction);
          const sample=[(p.x-ox)/k,(p.y-oy)/k];
          outer.push(sample);
          if(a.chapter===5&&b.chapter===5&&a.kind!=='chapter'&&b.kind!=='chapter'&&Math.hypot(sample[0]-center.x,sample[1]-center.y)<550)core.push(sample);
        }
      });
      return {outer:organicContour(outer,center.x,center.y,700,120,.22,.97,.78),core:organicContour(core,center.x,center.y,260,290,.26,.82,.6)};
    }
    function connectionPath(e){
      const a=nodes[e.source],b=nodes[e.target],center=chapters.find(c=>c.chapter===5);
      const point=(x,y)=>(x*k+ox).toFixed(2)+','+(y*k+oy).toFixed(2);
      const dx=b.x-a.x,dy=b.y-a.y,distance=Math.hypot(dx,dy);
      const seed=((Math.min(e.source,e.target)*73856093)^(Math.max(e.source,e.target)*19349663))>>>0;
      if(distance<.001||e.kind==='hierarchy'||seed%5<3)return 'M'+point(a.x,a.y)+'L'+point(b.x,b.y);
      const mx=(a.x+b.x)/2,my=(a.y+b.y)/2,nx=-dy/distance,ny=dx/distance;
      let bx,by;
      if(e.core||(a.chapter!==b.chapter&&distance>600)){
        const angle=(seed%997)/997*Math.PI*2,radius=70+Math.sqrt((Math.floor(seed/997)%991)/991)*200;
        const pull=e.core?.5:.3;
        bx=(center.x+Math.cos(angle)*radius-mx)*pull;
        by=(center.y+Math.sin(angle)*radius-my)*pull;
        const length=Math.hypot(bx,by),limit=Math.min(160,distance*.15);
        if(length>limit){bx*=limit/length;by*=limit/length}
      }else{
        const bend=Math.min(26,distance*.035)*(seed%2?1:-1);
        bx=nx*bend;by=ny*bend;
      }
      return 'M'+point(a.x,a.y)+'Q'+point(mx+bx*2,my+by*2)+' '+point(b.x,b.y);
    }
    const threeCenter=chapters.find(n=>n.chapter===5);
    const threeHeight=n=>({chapter:0,person:120,concept:210,subconcept:300,question:355})[n.kind]+(n.coreLayout?40:0);
    const zoomLabelFallback=(x,y,w,h)=>({x:w>width-16?Math.min(width-8,x+12):Math.max(8,Math.min(width-w-8,x+12)),y:Math.max(8,Math.min(height-h-8,y-h/2)),w,h});
    for(const n of nodes){
      const b=document.createElement('button');b.type='button';b.className='three-node cursor-interaction '+(n.kind==='chapter'?'area-heading'+(n.chapter===5?' core':''):'dot '+n.kind);
      b.setAttribute('aria-label',kindNames[n.kind]+' '+(n.person&&n.kind!=='person'?n.person+' / ':'')+(n.question||n.label));b.title=n.question||displayLabel(n);
      if(n.kind==='chapter')b.innerHTML='<span class="chapter-number">제'+esc(n.chapter)+'장</span><strong>'+esc(n.label)+'</strong><small hidden>'+esc(n.subtitle)+'</small>';
      else{b.style.setProperty('--diameter',({person:6.5,concept:4.2,subconcept:3,question:3.5})[n.kind]+'px');const mark=document.createElement('span');mark.className='node-mark';const label=document.createElement('span');label.className='node-label '+n.kind;const labelText=document.createElement('span');labelText.className='node-label-text';labelText.textContent=n.label;label.append(labelText);b.append(mark,label)}
      if(n.kind!=='question')b.setAttribute('aria-expanded','false');
      b.addEventListener('pointerdown',e=>{if(e.button!==1)e.stopPropagation()});b.addEventListener('click',()=>select(n.id));threeLayer.append(b);threeNodes.set(n.id,b);
    }
    function render3D(){
      if(!depthEnabled)return;
      stage.classList.toggle('high-zoom-labels',threeZoom>=3);
      threeScene.style.setProperty('--three-label-zoom',labelZoom(threeZoom).toFixed(2));
      threeSvg.setAttribute('viewBox',`0 0 ${width} ${height}`);
      const rawXYZ=(x,y,z)=>{x-=threeCenter.x;y-=threeCenter.y;const c=Math.cos(threeYaw),s=Math.sin(threeYaw),u=x*c-y*s,v=x*s+y*c,ce=Math.cos(threeElevation),se=Math.sin(threeElevation),d=v*ce-z*se,p=3200/Math.max(1200,3200+d);return {x:u*p,y:(v*se-z*ce)*p,d,p}};
      const boundaryPoints=path=>{if(path.style.display==='none')return [];const length=path.getTotalLength();if(!length)return [];return Array.from({length:64},(_,i)=>{const p=path.getPointAtLength(length*i/64);return [(p.x-ox)/k,(p.y-oy)/k]})};
      const allConnected=points.every(n=>visible.has(n.id));
      const outerBoundary=boundaryPoints(outerOutline),coreBoundary=allConnected?boundaryPoints(areas.get(threeCenter.id).region):[];
      const base=nodes.map(n=>rawXYZ(n.x,n.y,threeHeight(n)));
      for(const p of outerBoundary)base.push(rawXYZ(p[0],p[1],190));
      for(const p of coreBoundary)base.push(rawXYZ(p[0],p[1],210));
      if(outerBoundary.length)base.push(rawXYZ(threeCenter.x,threeCenter.y,510),rawXYZ(threeCenter.x,threeCenter.y,-110));
      const minx=Math.min(...base.map(p=>p.x)),maxx=Math.max(...base.map(p=>p.x)),miny=Math.min(...base.map(p=>p.y)),maxy=Math.max(...base.map(p=>p.y));
      const scale=Math.min((width-100)/Math.max(1,maxx-minx),(height-100)/Math.max(1,maxy-miny),1.35)*threeZoom;
      const midx=(minx+maxx)/2,midy=(miny+maxy)/2;
      const project=(x,y,z=0)=>{const p=rawXYZ(x,y,z);return {x:width/2+threePanX+(p.x-midx)*scale,y:height/2+threePanY+(p.y-midy)*scale,d:p.d}};
      const pos=nodes.map(n=>project(n.x,n.y,threeHeight(n)));
      const volume=(boundary,kind,bottom,top)=>{
        if(!boundary.length)return '';
        const cx=threeCenter.x,cy=threeCenter.y;
        const levels=[[-1,.08],[-.82,.52],[-.45,.86],[0,1],[.45,.86],[.82,.52],[1,.08]];
        const rings=levels.map(([unit,radius])=>boundary.map(([x,y])=>project(cx+(x-cx)*radius,cy+(y-cy)*radius,(bottom+top)/2+unit*(top-bottom)/2)));
        return `<path class="three-volume ${kind}" d="${softPath(rings.flat().map(p=>[p.x,p.y]))}"/>`;
      };
      let ground=`<defs><radialGradient id="three-outer-shade" cx="35%" cy="28%" r="78%"><stop offset="0" style="stop-color:var(--secondary);stop-opacity:.01"/><stop offset="1" style="stop-color:var(--secondary);stop-opacity:.08"/></radialGradient><radialGradient id="three-core-shade" cx="33%" cy="25%" r="76%"><stop offset="0" style="stop-color:var(--accent);stop-opacity:.03"/><stop offset="1" style="stop-color:var(--accent);stop-opacity:.15"/></radialGradient></defs>`,stems='',links='';
      ground+=volume(outerBoundary,'outer',-110,510);
      if(allConnected)ground+=volume(coreBoundary,'core',-45,450);
      for(const n of points){if(!visible.has(n.id))continue;const a=pos[n.id],b=project(n.x,n.y);stems+=`<path class="three-stem" d="M${a.x},${a.y}L${b.x},${b.y}"/>`}
      for(const [i,e] of edges.entries()){
        if(!visible.has(e.source)||!visible.has(e.target))continue;
        const path=paths[i],length=path.getTotalLength();if(!length)continue;
        const start=nodes[e.source],end=nodes[e.target],a=threeHeight(start),b=threeHeight(end);
        const samples=Array.from({length:13},(_,j)=>{const t=j/12,p=path.getPointAtLength(length*t);return project((p.x-ox)/k,(p.y-oy)/k,a+(b-a)*t)});
        const d=samples.map((p,j)=>(j?'L':'M')+p.x+','+p.y).join('');
        links+=`<path class="${path.getAttribute('class')} three-connection" d="${d}"/>`;
      }
      threeSvg.innerHTML=ground+stems+links;
      const lineage=selected===null?new Set():new Set(ancestors(selected)),selectedBranch=selected===null?new Set():descendants(selected);
      const connectedQuestions=new Set();for(const e of edges)if(e.kind!=='hierarchy'&&(e.source===selected||e.target===selected)){if(nodes[e.source].kind==='question')connectedQuestions.add(e.source);if(nodes[e.target].kind==='question')connectedQuestions.add(e.target)}
      const boxes=[],pointBoxes=points.filter(n=>visible.has(n.id)).map(n=>({id:n.id,x:pos[n.id].x-7,y:pos[n.id].y-7,w:14,h:14}));
      const separated=(a,b,gap=0)=>a.x+a.w+gap<=b.x||b.x+b.w+gap<=a.x||a.y+a.h+gap<=b.y||b.y+b.h+gap<=a.y;
      for(const n of [threeCenter,...chapters.filter(c=>c!==threeCenter)]){
        const b=threeNodes.get(n.id),p=pos[n.id],show=visible.has(n.id)&&p.x>-150&&p.x<width+150&&p.y>-60&&p.y<height+60;b.hidden=!show;if(!show)continue;
        b.classList.toggle('selected',selected===n.id);b.setAttribute('aria-expanded',String(expanded.has(n.id)));b.querySelector('small').hidden=!expanded.has(n.id);
        const w=b.offsetWidth,h=b.offsetHeight,c=pos[threeCenter.id],dx=p.x-c.x,dy=p.y-c.y,m=Math.max(1,Math.hypot(dx,dy)),ux=dx/m,uy=dy/m;
        const positions=[[p.x,p.y]];for(const distance of [24,48,72,96])positions.push([p.x+ux*distance,p.y+uy*distance],[p.x-uy*distance,p.y+ux*distance],[p.x+uy*distance,p.y-ux*distance]);
        let chosen=null;for(const [x,y] of positions){const box={x:x-w/2-8,y:y-h/2-8,w:w+16,h:h+16};if(box.x<8||box.y<8||box.x+box.w>width-8||box.y+box.h>height-8)continue;if(boxes.every(other=>separated(box,other,8))){chosen={x,y,box};break}}
        if(!chosen){const x=Math.max(w/2+8,Math.min(width-w/2-8,p.x)),y=Math.max(h/2+8,Math.min(height-h/2-8,p.y));chosen={x,y,box:{x:x-w/2-8,y:y-h/2-8,w:w+16,h:h+16}}}
        b.style.left=chosen.x+'px';b.style.top=chosen.y+'px';b.style.zIndex=String(Math.round(10000-p.d));boxes.push(chosen.box);
      }
      const labelPriority=n=>n.id===selected?0:n.kind==='person'?1:n.kind==='concept'?2:selectedBranch.has(n.id)?3:connectedQuestions.has(n.id)?4:n.kind==='subconcept'?5:6;
      for(const n of [...points].sort((a,b)=>labelPriority(a)-labelPriority(b))){
        const b=threeNodes.get(n.id),label=b.querySelector('.node-label'),p=pos[n.id],x=p.x,y=p.y,show=visible.has(n.id)&&x>=0&&x<=width&&y>=0&&y<=height;
        b.hidden=!show;if(!show)continue;b.style.left=x+'px';b.style.top=y+'px';b.style.zIndex=String(Math.round(10000-p.d));b.classList.toggle('selected',selected===n.id);b.classList.toggle('connected',connectedQuestions.has(n.id));if(n.kind!=='question')b.setAttribute('aria-expanded',String(expanded.has(n.id)));
        label.style.display='block';label.style.width='max-content';const lw=label.offsetWidth,lh=label.offsetHeight,candidates=[];
        for(const gap of [10,18,26,36,50,66]){const diagonal=gap*.71;candidates.push([x+gap,y-lh/2],[x-lw-gap,y-lh/2],[x-lw/2,y+gap],[x-lw/2,y-lh-gap],[x+diagonal,y+diagonal],[x-lw-diagonal,y+diagonal],[x+diagonal,y-lh-diagonal],[x-lw-diagonal,y-lh-diagonal])}
        let choice=null;for(const [lx,ly] of candidates){const box={x:lx,y:ly,w:lw,h:lh};if(lx<8||ly<8||lx+lw>width-8||ly+lh>height-8)continue;if(boxes.every(r=>separated(box,r,6))&&pointBoxes.every(r=>r.id===n.id||separated(box,r))){choice=box;break}}
        if(!choice&&stage.classList.contains('high-zoom-labels'))choice=zoomLabelFallback(x,y,lw,lh);
        if(choice){label.style.left=choice.x-x+b.offsetWidth/2+'px';label.style.top=choice.y-y+b.offsetHeight/2+'px';label.style.width=choice.w+'px';boxes.push(choice)}else label.style.display='none';
      }
    }
    function render(){
      stage.classList.toggle('high-zoom-labels',(depthEnabled?threeZoom:k/fitK)>=3);
      flatPlane.style.setProperty('--flat-label-zoom',labelZoom(k/fitK).toFixed(2));
      svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
      const allConnected=points.every(n=>visible.has(n.id));
      stage.classList.toggle('all-connected',allConnected);
      stage.classList.toggle('chapter-only',expanded.size===0);
      const lineage=selected===null?new Set():new Set(ancestors(selected));
      const selectedBranch=selected===null?new Set():descendants(selected);
      const connectedQuestions=new Set();
      edges.forEach((e,i)=>{
        const l=paths[i],a=nodes[e.source],b=nodes[e.target],shown=visible.has(e.source)&&visible.has(e.target);
        const linkedMeaning=e.kind!=='hierarchy'&&(e.source===selected||e.target===selected);
        if(shown&&linkedMeaning){if(a.kind==='question')connectedQuestions.add(e.source);if(b.kind==='question')connectedQuestions.add(e.target)}
        const newlyShown=shown&&l.dataset.shown!=='true';l.dataset.shown=String(shown);
        l.style.display=shown?'':'none';l.setAttribute('d',connectionPath(e));
        l.classList.toggle('branch',e.kind==='hierarchy'&&selectedBranch.has(e.source)&&selectedBranch.has(e.target));
        l.classList.toggle('active',(lineage.has(e.source)&&lineage.has(e.target))||linkedMeaning);
        if(newlyShown&&!reducedMotion){const length=l.getTotalLength();l.animate([{strokeDasharray:length+' '+length,strokeDashoffset:length,opacity:0},{strokeDasharray:length+' '+length,strokeDashoffset:0,opacity:getComputedStyle(l).opacity}],{duration:e.core?1100:750,delay:e.core?180:i%9*22,easing:'cubic-bezier(.2,.6,.2,1)',fill:'backwards'})}
      });
      if(allConnected&&!networkContours)networkContours=connectedContours();
      const boxes=[],envelopePoints=[];
      const pointBoxes=points.filter(n=>visible.has(n.id)).map(n=>{
        const radius=({person:3.25,concept:2.1,subconcept:1.5,question:1.75})[n.kind]+4;
        return {id:n.id,x:n.x*k+ox-radius,y:n.y*k+oy-radius,w:radius*2,h:radius*2};
      });
      const separated=(a,b,gap=0)=>a.x+a.w+gap<=b.x||b.x+b.w+gap<=a.x||a.y+a.h+gap<=b.y||b.y+b.h+gap<=a.y;
      q('.legend').hidden=expanded.size===0;
      q('.counts').textContent=expanded.size===0?'제목을 누르면 인물이 나타납니다.':'제목 → 인물 → 개념어 → 하위개념어 → 인터뷰 질문';
      q('.chapter-nav').querySelectorAll('[data-chapter]').forEach(b=>b.setAttribute('aria-current',String(selected!==null&&nodes[selected].chapter===nodes[Number(b.dataset.chapter)].chapter)));
      for(const c of chapters){
        const {region,heading,members}=areas.get(c.id),x=c.x*k+ox,y=c.y*k+oy;
        heading.classList.toggle('selected',selected===c.id);heading.setAttribute('aria-expanded',String(expanded.has(c.id)));heading.querySelector('small').hidden=!expanded.has(c.id);region.style.display=expanded.has(c.id)?'':'none';
        const w=heading.offsetWidth,h=heading.offsetHeight;
        const box={x:x-w/2,y:y-h/2,w,h};heading.style.left=box.x+'px';heading.style.top=box.y+'px';
        boxes.push({x:box.x-9,y:box.y-10,w:w+18,h:h+20});
        const ps=[];const pad=Math.max(16,75*k);
        for(const n of members.filter(n=>visible.has(n.id))){for(let i=0;i<8;i++){const a=i*Math.PI/4;ps.push([n.x*k+ox+Math.cos(a)*pad,n.y*k+oy+Math.sin(a)*pad])}}
        for(const dx of [-1,1])for(const dy of [-1,1])ps.push([x+dx*(w/2+16),y+dy*(h/2+16)]);
        if(c.chapter===5&&allConnected){
          region.setAttribute('d',contourPath(networkContours.core));
          ps.length=0;for(const [px,py] of networkContours.core)ps.push([px*k+ox,py*k+oy]);
        }else if(c.chapter===5){
          const radius=500*k;
          region.setAttribute('d',`M${x-radius},${y}a${radius},${radius} 0 1 0 ${radius*2},0a${radius},${radius} 0 1 0 ${-radius*2},0`);
          ps.length=0;for(let i=0;i<24;i++){const angle=i*Math.PI/12;ps.push([x+Math.cos(angle)*radius,y+Math.sin(angle)*radius])}
        }else region.setAttribute('d',softPath(ps));
        if(c.chapter===5){coreHalo.setAttribute('d',region.getAttribute('d'));coreHalo.style.display=region.style.display}
        if(expanded.has(c.id))for(const p of ps)for(let i=0;i<8;i++){const a=i*Math.PI/4;envelopePoints.push([p[0]+Math.cos(a)*8,p[1]+Math.sin(a)*8])}
      }
      outerOutline.style.display=envelopePoints.length?'':'none';
      if(envelopePoints.length){
        if(allConnected){
          const regionSamples=envelopePoints.map(([px,py])=>[(px-ox)/k,(py-oy)/k]);
          const center=chapters.find(c=>c.chapter===5);
          const outer=organicContour([...networkContours.outer,...regionSamples],center.x,center.y,700,85,.16,1,.9);
          outerOutline.setAttribute('d',contourPath(outer));
        }else outerOutline.setAttribute('d',roundEnvelope(envelopePoints));
      }
      const labelPriority=n=>n.id===selected?0:n.kind==='person'?1:n.kind==='concept'?2:selectedBranch.has(n.id)?3:connectedQuestions.has(n.id)?4:n.kind==='subconcept'?5:6;
      const ordered=[...points].sort((a,b)=>labelPriority(a)-labelPriority(b));
      for(const n of ordered){
        const {b,label}=elems.get(n.id),x=n.x*k+ox,y=n.y*k+oy;
        b.style.left=x+'px';b.style.top=y+'px';b.classList.toggle('selected',selected===n.id);b.hidden=!visible.has(n.id)||x<0||x>width||y<0||y>height;
        b.classList.toggle('connected',connectedQuestions.has(n.id));
        if(n.kind!=='question')b.setAttribute('aria-expanded',String(expanded.has(n.id)));
        label.style.display='none';
        if(b.hidden)continue;
        label.style.display='block';label.style.width='max-content';
        const lw=label.offsetWidth,lh=label.offsetHeight;
        const candidates=[];
        const labelGaps=n.kind==='concept'||selectedBranch.has(n.id)?[10,18,26,34,44,54,66,80]:[10,18,26,34,44];
        for(const gap of labelGaps){
          const diagonal=gap*.71;
          candidates.push([x+gap,y-lh/2],[x-lw-gap,y-lh/2],[x-lw/2,y+gap],[x-lw/2,y-lh-gap],
            [x+diagonal,y+diagonal],[x-lw-diagonal,y+diagonal],[x+diagonal,y-lh-diagonal],[x-lw-diagonal,y-lh-diagonal]);
        }
        let choice=null;
        for(const [lx,ly] of candidates){
          const box={x:lx,y:ly,w:lw,h:lh};
          if(lx<8||ly<8||lx+lw>width-8||ly+lh>height-8)continue;
          if(boxes.every(r=>separated(box,r,8))&&pointBoxes.every(r=>r.id===n.id||separated(box,r))){choice=box;break}
        }
        if(!choice&&stage.classList.contains('high-zoom-labels'))choice=zoomLabelFallback(x,y,lw,lh);
        if(choice){label.style.left=(choice.x-x+b.offsetWidth/2)+'px';label.style.top=(choice.y-y+b.offsetHeight/2)+'px';label.style.width=choice.w+'px';boxes.push(choice)}else label.style.display='none';
      }
      render3D();
    }
    function zoom(f,x=width/2,y=height/2){if(depthEnabled){const next=Math.max(.45,Math.min(maxThreeZoom,threeZoom*f)),ratio=next/threeZoom;threePanX=x-width/2-(x-width/2-threePanX)*ratio;threePanY=y-height/2-(y-height/2-threePanY)*ratio;threeZoom=next;render3D();return}const nk=Math.max(fitK*.45,Math.min(fitK*maxThreeZoom,k*f));ox=x-(x-ox)*nk/k;oy=y-(y-oy)*nk/k;k=nk;render()}
    q('#forum-plus').addEventListener('click',()=>recordStep(()=>zoom(1.3)));q('#forum-minus').addEventListener('click',()=>recordStep(()=>zoom(1/1.3)));
    q('#forum-fit').addEventListener('click',showAll);
    depthButton.addEventListener('click',()=>setDepthEnabled(!depthEnabled));
    q('#forum-reset').addEventListener('click',reset);
    stage.addEventListener('wheel',e=>{e.preventDefault();const r=stage.getBoundingClientRect();zoom(Math.exp(-e.deltaY*.0014),e.clientX-r.left,e.clientY-r.top)},{passive:false});
    const pointers=new Map();let pinch=null,framePending=false;
    function scheduleRender(){if(framePending)return;framePending=true;requestAnimationFrame(()=>{framePending=false;render()})}
    stage.addEventListener('pointerdown',e=>{if(e.button!==0&&!(depthEnabled&&e.button===1))return;if(depthEnabled)e.preventDefault();pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});stage.setPointerCapture(e.pointerId);if(pointers.size===1)drag={x:e.clientX,y:e.clientY,ox,oy,panX:threePanX,panY:threePanY,rotate:depthEnabled&&e.button===1};else if(pointers.size===2){const [a,b]=[...pointers.values()],r=stage.getBoundingClientRect(),cx=(a.x+b.x)/2-r.left,cy=(a.y+b.y)/2-r.top;pinch={distance:Math.max(1,Math.hypot(a.x-b.x,a.y-b.y)),k:depthEnabled?threeZoom:k,wx:(cx-ox)/k,wy:(cy-oy)/k,cx,cy,panX:threePanX,panY:threePanY};drag=null}});
    stage.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;const previous=pointers.get(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(depthEnabled){if(pointers.size===2&&pinch){const [a,b]=[...pointers.values()],r=stage.getBoundingClientRect(),cx=(a.x+b.x)/2-r.left,cy=(a.y+b.y)/2-r.top;threeZoom=Math.max(.45,Math.min(maxThreeZoom,pinch.k*Math.hypot(a.x-b.x,a.y-b.y)/pinch.distance));const ratio=threeZoom/pinch.k;threePanX=pinch.panX+cx-pinch.cx-(pinch.cx-width/2)* (ratio-1)+pinch.panX*(ratio-1);threePanY=pinch.panY+cy-pinch.cy-(pinch.cy-height/2)*(ratio-1)+pinch.panY*(ratio-1);scheduleRender()}else if(drag?.rotate){threeYaw+=(e.clientX-previous.x)*.006;threeElevation=Math.max(.28,Math.min(1.45,threeElevation-(e.clientY-previous.y)*.005));scheduleRender()}else if(drag){threePanX=drag.panX+e.clientX-drag.x;threePanY=drag.panY+e.clientY-drag.y;scheduleRender()}return}if(pointers.size===2&&pinch){const [a,b]=[...pointers.values()],r=stage.getBoundingClientRect();k=Math.max(fitK*.45,Math.min(fitK*maxThreeZoom,pinch.k*Math.hypot(a.x-b.x,a.y-b.y)/pinch.distance));ox=(a.x+b.x)/2-r.left-pinch.wx*k;oy=(a.y+b.y)/2-r.top-pinch.wy*k;scheduleRender()}else if(drag){ox=drag.ox+e.clientX-drag.x;oy=drag.oy+e.clientY-drag.y;scheduleRender()}});
    function endPointer(e){pointers.delete(e.pointerId);pinch=null;drag=null;if(pointers.size===1){const p=[...pointers.values()][0];drag={x:p.x,y:p.y,ox,oy,panX:threePanX,panY:threePanY,rotate:false}}}
    stage.addEventListener('pointerup',endPointer);stage.addEventListener('pointercancel',endPointer);
    stage.addEventListener('auxclick',e=>{if(depthEnabled&&e.button===1)e.preventDefault()});
    function save(){try{localStorage.setItem('sculpture-forum-v1',JSON.stringify({selected,expanded:[...expanded],cueIndex,presentationMode,depthEnabled}))}catch{}}
    function restore(){try{const s=JSON.parse(localStorage.getItem('sculpture-forum-v1'));if(s&&Array.isArray(s.expanded)){expanded=new Set(s.expanded.filter(id=>Number.isInteger(id)&&nodes[id]));updateVisible();selected=Number.isInteger(s.selected)&&visible.has(s.selected)?s.selected:null;cueIndex=Number.isInteger(s.cueIndex)?Math.max(-1,Math.min(cues.length-1,s.cueIndex)):-1;presentationMode=s.presentationMode!==false;depthEnabled=s.depthEnabled===true;stage.classList.toggle('three-view',depthEnabled);flatPlane.hidden=depthEnabled;threeScene.hidden=!depthEnabled;depthButton.setAttribute('aria-pressed',String(depthEnabled));depthButton.textContent=depthEnabled?'2D 보기':'3D 보기';q('.depth-hint').hidden=!depthEnabled;showDetail(null);render()}}catch{}}
    new ResizeObserver(()=>{width=stage.clientWidth;height=stage.clientHeight;fit()}).observe(stage);
    fit();showDetail(null);restore();updateCue();q('#enter-resume').hidden=expanded.size===0;resetStepHistory();
  })();

