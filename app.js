
  (()=>{
    const root=document.getElementById('forum-source-network');
    const data=window.FORUM_DATA;
    const nodes=data.nodes,edges=data.edges.filter(e=>data.nodes[e.source].kind!=='chapter');
    const coreConnections=[
      [134,147,'물질을 판단하고 사유하는 창작'],[134,150,'물질의 판단과 감각적 사고'],
      [134,148,'물질을 통해 세계를 읽는 태도'],[135,147,'물질의 성질에서 시작되는 사유'],
      [135,148,'물질의 성질과 세계를 다르게 보는 경험'],[137,151,'직접 만드는 경험과 감각의 형성'],
      [137,157,'직접 만들기와 창작 교육'],[138,150,'손으로 알게 되는 것과 감각적 사고'],
      [138,148,'직접 작업하며 얻는 물질의 이해'],[138,151,'직접 경험에서 형성되는 감각'],
      [140,150,'우연과 감각적 사고'],[140,151,'우연을 통한 감각의 형성'],
      [141,151,'만남을 받아들이는 태도와 경험'],[143,156,'창작의 지속과 창작 교육'],
      [143,159,'지속되는 창작과 예술의 가치'],[144,156,'작업을 지속하게 하는 교육'],
      [144,157,'지속적인 작업과 만들기·담론·비평'],[147,150,'물질적 사유와 감각적 사고'],
      [148,151,'물질을 통한 세계 경험과 감각'],[153,159,'김종영의 작업과 예술의 가치'],
      [154,159,'시대와 자기 이해, 예술의 가치'],[136,149,'물질을 다루는 경험에 관한 질문'],
      [139,152,'직접 경험과 감각에 관한 질문'],[145,158,'창작의 지속과 교육에 관한 질문']
    ];
    const crossChapterConnections=[
      [134,2,'물질과 창작의 판단'],[135,3,'물질의 성질을 직접 다루는 경험'],
      [137,3,'직접 만드는 경험'],[138,11,'새로운 기술 속 직접 작업의 경험'],
      [147,2,'물질을 통한 조각적 사유'],[148,8,'물질을 통해 넓어지는 조각의 가능성'],
      [150,11,'새로운 기술과 감각적 사고'],[143,8,'조각의 가능성과 지속되는 창작'],
      [137,42,'손으로 만드는 제작 경험'],[138,43,'손과 디지털을 오가는 직접 작업'],
      [147,43,'손과 디지털 매체를 통한 물질적 사유'],[150,42,'제작 과정의 감각과 사고'],
      [156,42,'제작 경험을 통한 창작 교육'],[157,43,'만들기와 디지털 경험'],
      [143,28,'작업을 지속하는 주도권'],[159,31,'동시대에도 이어지는 예술의 가치'],
      [134,78,'물질과 현장에서의 판단'],[135,79,'물질의 조건과 실제 구현의 판단'],
      [137,81,'직접 만들기와 구현'],[138,94,'작업 경험과 현실적 판단'],
      [147,63,'입체적 사고와 물질적 사유'],[148,70,'물질을 통해 세계와 공간을 감각하기'],
      [150,63,'감각과 입체적 사고'],[151,73,'직접 경험에서 형성되는 신체 감각'],
      [157,93,'만들기와 프로젝트 실행'],[143,53,'창작의 지속과 창작 플랫폼'],
      [134,130,'물질의 조건과 창작의 판단'],[135,130,'물질의 성질과 신체의 한계'],
      [137,124,'직접 만들기와 함께 만드는 과정'],[138,129,'직접 작업으로 형성되는 신체 감각'],
      [143,110,'지속되는 창작의 사회적 의미'],[144,124,'작업을 지속시키는 공동의 과정'],
      [147,119,'물질과 조각을 통한 대화'],[150,129,'감각적 사고와 신체성'],
      [151,113,'경험에서 시작되는 예술적 실험'],[156,122,'창작 교육과 참여자의 주체성'],
      [157,117,'만들기와 함께하는 작업'],[159,109,'예술의 가치와 사회적 가치']
    ];
    const crossChapterWeave=[
      [2,134,147],[3,135,137],[5,148,150],[6,137,148],[8,143,159],
      [9,154,159],[11,138,151],[13,143,159],[14,148,159],[16,143,154],
      [20,148,154],[21,148,150],[23,156,159],[24,157,154],[26,159,154],
      [28,143,144],[29,137,143],[31,154,159],[32,148,154],[35,156,159],
      [36,137,157],[38,143,156],[40,150,151],[42,137,157],[43,138,151],
      [45,156,159],[46,150,157],[48,143,150],[49,141,151],
      [53,156,157],[54,143,156],[56,148,157],[58,143,154],[59,154,159],
      [61,150,159],[63,147,150],[64,138,151],[66,143,154],[67,144,159],
      [70,148,150],[71,148,151],[73,138,151],[75,147,150],[76,148,150],
      [78,134,147],[79,135,138],[81,137,157],[82,138,151],
      [85,156,159],[86,157,159],[88,137,157],[90,150,156],[91,148,157],
      [93,137,157],[94,134,138],[96,143,159],[97,148,151],
      [101,156,159],[102,143,156],[104,144,159],[106,156,159],[107,144,156],
      [109,143,159],[110,143,159],[112,148,150],[113,150,151],
      [116,137,157],[117,137,151],[119,147,148],[121,156,157],[122,143,157],
      [124,137,157],[126,143,159],[127,143,159],[129,138,151],[130,135,151]
    ];
    for(const [outer,...centers] of crossChapterWeave){
      for(const center of centers)crossChapterConnections.push([center,outer,'창작 과정에서 맞닿는 개념의 제안 연결']);
    }
    const edgeKeys=new Set(edges.map(e=>[e.source,e.target].sort((a,b)=>a-b).join(':')));
    for(const [source,target,reason] of [...coreConnections,...crossChapterConnections]){
      const key=[source,target].sort((a,b)=>a-b).join(':');
      if(edgeKeys.has(key))continue;
      const kind=nodes[source].kind==='question'?'question-related':'semantic';
      edges.push({source,target,kind,core:true,reason});edgeKeys.add(key);
    }
    const crossChapterPairs=new Map(),thinnedCrossEdges=new Set();
    edges.forEach((e,i)=>{const a=nodes[e.source],b=nodes[e.target];if(e.kind==='hierarchy'||a.chapter===b.chapter||a.chapter===5||b.chapter===5)return;const pair=[a.chapter,b.chapter].sort((x,y)=>x-y).join('-');if(!crossChapterPairs.has(pair))crossChapterPairs.set(pair,[]);crossChapterPairs.get(pair).push(i)});
    for(const pairEdges of crossChapterPairs.values())pairEdges.forEach((i,j)=>{if(j%2===1)thinnedCrossEdges.add(i)});
    const chapters=nodes.filter(n=>n.kind==='chapter'),points=nodes.filter(n=>n.kind!=='chapter');
    const stage=root.querySelector('.stage'),svg=root.querySelector('.wires'),layer=root.querySelector('.node-layer'),detail=root.querySelector('.detail');
    const kindNames={chapter:'주제 영역',person:'인물',concept:'개념어',subconcept:'하위개념어',question:'인터뷰 질문'};
    const NS='http://www.w3.org/2000/svg';
    let width=stage.clientWidth,height=stage.clientHeight,k=1,fitK=1,ox=0,oy=0,selected=null,hovered=null,drag=null;
    let expanded=new Set(),visible=new Set(chapters.map(n=>n.id)),cueIndex=-1,currentQuestion=null,presentationMode=true,depthEnabled=false;
    const children=id=>nodes.filter(n=>n.parent===id);
    const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elems=new Map(),paths=[],areas=new Map();
    const q=(s)=>root.querySelector(s);
    const depthButton=q('#forum-depth');
    const flatPlane=q('.map-plane'),threeScene=q('.three-scene'),threeSvg=q('.three-wires'),threeLayer=q('.three-nodes');
    const threeNodes=new Map();const maxThreeZoom=24,labelZoom=z=>Math.min(8,Math.max(1,z<=6?1+(z-1)*.2:z/3));let threeYaw=-.34,threeElevation=.82,threeZoom=1,threePanX=0,threePanY=0,idleYaw=0,idleElevation=0,idleStrength=0,lastManual3D=0,lastIdleFrame=0,autoCentered3D=false;
    function setDepthEnabled(enabled){
      depthEnabled=enabled;
      if(enabled){autoCentered3D=true;threePanX=0;threePanY=0}
      stage.classList.toggle('three-view',enabled);
      flatPlane.hidden=enabled;threeScene.hidden=!enabled;
      depthButton.setAttribute('aria-pressed',String(enabled));
      depthButton.textContent=enabled?'2D 보기':'3D 보기';
      q('.depth-hint').hidden=!enabled;
      render();save();
    }
    const ancestors=id=>{const arr=[];while(id!==null){arr.unshift(id);id=nodes[id].parent;}return arr};
    const descendants=id=>{const set=new Set([id]);for(const n of nodes)if(n.parent!==null&&set.has(n.parent))set.add(n.id);return set};
    function setHovered(id){
      const next=points.every(n=>visible.has(n.id))?id:null;
      if(hovered===next)return;
      hovered=next;render();
    }
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
    const epilogueNav=document.createElement('button');epilogueNav.type='button';epilogueNav.className='control epilogue-nav';epilogueNav.textContent='에필로그 · 교육';epilogueNav.addEventListener('click',()=>recordStep(()=>{showAll();openEpilogue(0)}));q('.tools').insertBefore(epilogueNav,depthButton);
    epilogueQuestions.forEach((n,index)=>{const tab=document.createElement('button');tab.type='button';tab.id='epilogue-person-'+index;tab.textContent=n.person;tab.setAttribute('role','tab');tab.setAttribute('aria-controls','interview-content');tab.addEventListener('click',()=>openEpilogue(index));tab.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?epilogueQuestions.length-1:(index+(e.key==='ArrowRight'?1:epilogueQuestions.length-1))%epilogueQuestions.length;openEpilogue(next);q('#epilogue-person-'+next).focus()});q('#epilogue-people').append(tab)});
    const outerOutline=document.createElementNS(NS,'path');outerOutline.setAttribute('class','outer-outline');outerOutline.setAttribute('aria-hidden','true');svg.append(outerOutline);
    let coreHalo=null;
    for(const c of [...chapters].sort((a,b)=>(a.chapter===5)-(b.chapter===5))){
      if(c.chapter===5){coreHalo=document.createElementNS(NS,'path');coreHalo.setAttribute('class','core-halo');coreHalo.setAttribute('aria-hidden','true');svg.append(coreHalo)}
      const region=document.createElementNS(NS,'path');region.setAttribute('class','region'+(c.chapter===5?' core':''));svg.append(region);
      const heading=document.createElement('button');heading.type='button';heading.className='area-heading cursor-interaction'+(c.chapter===5?' core':'');heading.innerHTML='<span class="chapter-number">제'+esc(c.chapter)+'장</span><strong>'+esc(c.label)+'</strong><small hidden>'+esc(c.subtitle)+'</small>';heading.setAttribute('aria-label',displayLabel(c));heading.setAttribute('aria-expanded','false');heading.addEventListener('pointerdown',e=>e.stopPropagation());heading.addEventListener('pointerenter',()=>setHovered(c.id));heading.addEventListener('pointerleave',()=>setHovered(null));heading.addEventListener('click',()=>select(c.id));layer.append(heading);
      areas.set(c.id,{region,heading,members:points.filter(n=>n.chapter===c.chapter)});
    }
    const personPastLayer=document.createElementNS(NS,'g'),personCrossLayer=document.createElementNS(NS,'g'),personCurrentLayer=document.createElementNS(NS,'g');
    personPastLayer.setAttribute('class','person-past-layer');personCrossLayer.setAttribute('class','person-cross-layer');personCurrentLayer.setAttribute('class','person-current-layer');
    svg.append(personPastLayer,personCrossLayer,personCurrentLayer);
    for(const e of edges){
      const l=document.createElementNS(NS,'path');l.classList.add('links');
      if(e.kind!=='hierarchy')l.classList.add(e.kind);if(e.core)l.classList.add('core');
      const t=document.createElementNS(NS,'title'),a=nodes[e.source],b=nodes[e.target];
      const edgeLabel=n=>n.kind==='question'?n.person+' · '+n.label:n.label;
      t.textContent=e.kind!=='hierarchy'?edgeLabel(a)+' ↔ '+edgeLabel(b)+' · '+e.reason:edgeLabel(a)+' → '+edgeLabel(b);
      l.append(t);personCurrentLayer.append(l);paths.push(l);
    }
    for(const n of points){
      const b=document.createElement('button');b.type='button';b.className='dot '+n.kind+' cursor-interaction';b.style.setProperty('--diameter',({person:6.5,concept:4.2,subconcept:3,question:3.5})[n.kind]+'px');
      b.setAttribute('aria-label',kindNames[n.kind]+' '+(n.person?n.person+' / ':'')+(n.question||n.label));b.setAttribute('data-tooltip',n.question||(n.label+(n.subtitle?' · '+n.subtitle:'')));
      b.title=n.question||(n.person&&n.kind!=='person'?n.person+' · ':'')+n.label;
      const mark=document.createElement('span');mark.className='node-mark';b.append(mark);
      b.addEventListener('pointerdown',e=>e.stopPropagation());b.addEventListener('pointerenter',()=>setHovered(n.id));b.addEventListener('pointerleave',()=>setHovered(null));b.addEventListener('click',()=>select(n.id));
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
      for(const chapter of chapters){
        if(!expanded.has(chapter.id))continue;
        for(const person of children(chapter.id))visible.add(person.id);
      }
      for(const n of points)if(n.kind!=='person'&&visible.has(n.parent)&&expanded.has(n.parent))visible.add(n.id);
    }
    function select(id){return recordStep(()=>selectStep(id))}
    function selectStep(id){
      const before=new Set(visible);selected=id;
      if(['chapter','person'].includes(nodes[id].kind))for(const n of points)if(n.chapter!==nodes[id].chapter)for(const animation of elems.get(n.id).b.getAnimations())animation.cancel();
      if(['concept','subconcept','question'].includes(nodes[id].kind)){const keep=new Set([...ancestors(id),...descendants(id)]);for(const n of points)if(n.chapter!==nodes[id].chapter||(n.person===nodes[id].person&&!keep.has(n.id)))for(const animation of elems.get(n.id).b.getAnimations())animation.cancel()}
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
    function exitVideoFullscreen(){
      if(document.fullscreenElement===video)document.exitFullscreen().catch(()=>{});
      else if(video.webkitDisplayingFullscreen&&typeof video.webkitExitFullscreen==='function')video.webkitExitFullscreen();
    }
    function stopVideo(){exitVideoFullscreen();video.pause();video.removeAttribute('src');video.removeAttribute('poster');video.replaceChildren();video.load();q('#interview-play').hidden=true}
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
      const src=assetURL(media.src);video.hidden=!src;q('#interview-play').hidden=!src;q('#video-empty').hidden=!!src;q('#video-error').hidden=true;
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
    q('#interview-play').addEventListener('click',()=>{
      if(!video.getAttribute('src'))return;
      if(typeof video.requestFullscreen==='function')video.requestFullscreen().catch(()=>{});
      else if(typeof video.webkitEnterFullscreen==='function')video.webkitEnterFullscreen();
      video.play().catch(()=>{});
    });
    video.addEventListener('play',async()=>{
      q('#interview-play').hidden=true;
      if(!video.getAttribute('src')||document.fullscreenElement===video||video.webkitDisplayingFullscreen)return;
      try{
        if(typeof video.requestFullscreen==='function')await video.requestFullscreen();
        else if(typeof video.webkitEnterFullscreen==='function')video.webkitEnterFullscreen();
      }catch{
        try{if(typeof video.webkitEnterFullscreen==='function')video.webkitEnterFullscreen()}catch{}
      }
    });
    video.addEventListener('ended',()=>{exitVideoFullscreen();q('#interview-play').hidden=false});
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
    function enter(mode){recordStep(()=>{if(mode!=='resume'){presentationMode=mode==='presentation';reset();threePanX=0;threeZoom=1;idleYaw=0;idleElevation=0}q('.sequence-controls').hidden=!presentationMode;q('.map-shell').classList.toggle('explore',!presentationMode);q('.map-shell').inert=false;q('.intro').inert=true;q('.intro').hidden=true;if(mode!=='resume'){width=stage.clientWidth;height=stage.clientHeight;autoCentered3D=depthEnabled;threePanY=0;fit()}if(!reducedMotion)q('.map-shell').animate([{opacity:0},{opacity:1}],{duration:250,easing:'ease-out'});q(presentationMode?'#sequence-next':'#forum-fit').focus({preventScroll:true});save()})}
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
      b.addEventListener('pointerdown',e=>{if(e.button!==1)e.stopPropagation()});b.addEventListener('pointerenter',()=>setHovered(n.id));b.addEventListener('pointerleave',()=>setHovered(null));b.addEventListener('click',()=>select(n.id));threeLayer.append(b);threeNodes.set(n.id,b);
    }
    for(const n of nodes){
      const phase=n.id*2.39996,amplitude=n.kind==='chapter'?1.5:n.kind==='person'?1.3:1.05;
      const targets=n.kind==='chapter'?[areas.get(n.id).heading,threeNodes.get(n.id)]:[elems.get(n.id).b,threeNodes.get(n.id)];
      for(const element of targets){element.style.setProperty('--cell-x',(Math.cos(phase)*amplitude).toFixed(2)+'px');element.style.setProperty('--cell-y',(Math.sin(phase)*amplitude).toFixed(2)+'px');element.style.setProperty('--cell-duration',(6.4+(n.id*37%39)/10).toFixed(1)+'s');element.style.setProperty('--cell-delay',(-((n.id*73)%760)/100).toFixed(2)+'s')}
    }
    function render3D(){
      if(!depthEnabled)return;
      const focusedPerson=selected!==null&&nodes[selected].kind!=='chapter'?nodes[selected].person:null;
      const personChapter=focusedPerson!==null?nodes[selected].chapter:null;
      const activeChapter=selected!==null&&nodes[selected].kind==='chapter'?nodes[selected].chapter:null;
      const branchKeep=focusedPerson!==null&&['concept','subconcept','question'].includes(nodes[selected].kind)?new Set([...ancestors(selected),...descendants(selected)]):null;
      stage.classList.toggle('chapter-focus',activeChapter!==null);
      stage.classList.toggle('high-zoom-labels',threeZoom>=3);
      threeScene.style.setProperty('--three-label-zoom',labelZoom(threeZoom).toFixed(2));
      threeSvg.setAttribute('viewBox',`0 0 ${width} ${height}`);
      const rawXYZ=(x,y,z)=>{x-=threeCenter.x;y-=threeCenter.y;const c=Math.cos(threeYaw+idleYaw),s=Math.sin(threeYaw+idleYaw),u=x*c-y*s,v=x*s+y*c,ce=Math.cos(threeElevation+idleElevation),se=Math.sin(threeElevation+idleElevation),d=v*ce-z*se,p=3200/Math.max(1200,3200+d);return {x:u*p,y:(v*se-z*ce)*p,d,p}};
      const boundaryPoints=path=>{if(path.style.display==='none')return [];const length=path.getTotalLength();if(!length)return [];return Array.from({length:64},(_,i)=>{const p=path.getPointAtLength(length*i/64);return [(p.x-ox)/k,(p.y-oy)/k]})};
      const allConnected=points.every(n=>visible.has(n.id));
      const outerBoundary=boundaryPoints(outerOutline),coreBoundary=allConnected?boundaryPoints(areas.get(threeCenter.id).region):[];
      const base=nodes.map(n=>rawXYZ(n.x,n.y,threeHeight(n)));
      for(const p of outerBoundary)base.push(rawXYZ(p[0],p[1],190));
      for(const p of coreBoundary)base.push(rawXYZ(p[0],p[1],210));
      if(outerBoundary.length)base.push(rawXYZ(threeCenter.x,threeCenter.y,510),rawXYZ(threeCenter.x,threeCenter.y,-110));
      const minx=Math.min(...base.map(p=>p.x)),maxx=Math.max(...base.map(p=>p.x)),miny=Math.min(...base.map(p=>p.y)),maxy=Math.max(...base.map(p=>p.y));
      const centerPoint=rawXYZ(threeCenter.x,threeCenter.y,threeHeight(threeCenter));
      const scale=Math.min((width-100)/Math.max(1,maxx-minx),(height-100)/Math.max(1,maxy-miny),1.35)*threeZoom;
      const midx=(minx+maxx)/2,midy=(miny+maxy)/2;
      if(autoCentered3D){threePanX=(midx-centerPoint.x)*scale;threePanY=(midy-centerPoint.y)*scale}
      const project=(x,y,z=0)=>{const p=rawXYZ(x,y,z);return {x:width/2+threePanX+(p.x-midx)*scale,y:height/2+threePanY+(p.y-midy)*scale,d:p.d}};
      const pos=nodes.map(n=>project(n.x,n.y,threeHeight(n)));
      const volume=(boundary,kind,bottom,top)=>{
        if(!boundary.length)return '';
        const cx=threeCenter.x,cy=threeCenter.y;
        const levels=[[-1,.08],[-.82,.52],[-.45,.86],[0,1],[.45,.86],[.82,.52],[1,.08]];
        const rings=levels.map(([unit,radius])=>boundary.map(([x,y])=>project(cx+(x-cx)*radius,cy+(y-cy)*radius,(bottom+top)/2+unit*(top-bottom)/2)));
        return `<path class="three-volume ${kind}" d="${softPath(rings.flat().map(p=>[p.x,p.y]))}"/>`;
      };
      let ground=`<defs><radialGradient id="three-outer-shade" cx="35%" cy="28%" r="78%"><stop offset="0" style="stop-color:var(--secondary);stop-opacity:.01"/><stop offset="1" style="stop-color:var(--secondary);stop-opacity:.08"/></radialGradient><radialGradient id="three-core-shade" cx="33%" cy="25%" r="76%"><stop offset="0" style="stop-color:var(--accent);stop-opacity:.03"/><stop offset="1" style="stop-color:var(--accent);stop-opacity:.15"/></radialGradient></defs>`,stems='';
      ground+=volume(outerBoundary,'outer',-110,510);
      if(allConnected)ground+=volume(coreBoundary,'core',-45,450);
       for(const n of points){if(!visible.has(n.id))continue;const a=pos[n.id],b=project(n.x,n.y);stems+=`<path class="three-stem${activeChapter!==null&&n.chapter!==activeChapter?' chapter-past':''}${focusedPerson!==null&&n.chapter!==personChapter?' person-other-chapter':''}" d="M${a.x},${a.y}L${b.x},${b.y}"/>`}
      let pastLinks='',crossLinks='',currentLinks='';
      for(const [i,e] of edges.entries()){
        if(!visible.has(e.source)||!visible.has(e.target))continue;
        const path=paths[i];if(path.style.display==='none')continue;
        const length=path.getTotalLength();if(!length)continue;
        const start=nodes[e.source],end=nodes[e.target],a=threeHeight(start),b=threeHeight(end);
        const samples=Array.from({length:13},(_,j)=>{const t=j/12,p=path.getPointAtLength(length*t);return project((p.x-ox)/k,(p.y-oy)/k,a+(b-a)*t)});
        const d=samples.map((p,j)=>(j?'L':'M')+p.x+','+p.y).join('');
        const markup=`<path class="${path.getAttribute('class')} three-connection" d="${d}"/>`;
        if(focusedPerson!==null&&branchKeep===null&&path.classList.contains('person-past'))pastLinks+=markup;
        else if(focusedPerson!==null&&branchKeep===null&&path.classList.contains('person-cross'))crossLinks+=markup;
        else currentLinks+=markup;
      }
      threeSvg.innerHTML=ground+stems+`<g class="person-past-layer">${pastLinks}</g><g class="person-cross-layer">${crossLinks}</g><g class="person-current-layer">${currentLinks}</g>`;
      const lineage=selected===null?new Set():new Set(ancestors(selected)),selectedBranch=selected===null?new Set():descendants(selected);
      const connectedQuestions=new Set();for(const e of edges)if(e.kind!=='hierarchy'&&(e.source===selected||e.target===selected)){if(nodes[e.source].kind==='question')connectedQuestions.add(e.source);if(nodes[e.target].kind==='question')connectedQuestions.add(e.target)}
      const boxes=[],pointBoxes=points.filter(n=>visible.has(n.id)).map(n=>({id:n.id,x:pos[n.id].x-7,y:pos[n.id].y-7,w:14,h:14}));
      const separated=(a,b,gap=0)=>a.x+a.w+gap<=b.x||b.x+b.w+gap<=a.x||a.y+a.h+gap<=b.y||b.y+b.h+gap<=a.y;
      for(const n of [threeCenter,...chapters.filter(c=>c!==threeCenter)]){
        const b=threeNodes.get(n.id),p=pos[n.id],show=visible.has(n.id)&&p.x>-150&&p.x<width+150&&p.y>-60&&p.y<height+60;b.hidden=!show;if(!show)continue;
        b.classList.toggle('selected',selected===n.id);b.classList.toggle('person-chapter-past',personChapter!==null&&n.chapter!==personChapter);b.classList.toggle('chapter-other',activeChapter!==null&&n.chapter!==activeChapter);b.setAttribute('aria-expanded',String(expanded.has(n.id)));b.querySelector('small').hidden=!expanded.has(n.id);
        const w=b.offsetWidth,h=b.offsetHeight,c=pos[threeCenter.id],dx=p.x-c.x,dy=p.y-c.y,m=Math.max(1,Math.hypot(dx,dy)),ux=dx/m,uy=dy/m;
        const positions=[[p.x,p.y]];for(const distance of [24,48,72,96])positions.push([p.x+ux*distance,p.y+uy*distance],[p.x-uy*distance,p.y+ux*distance],[p.x+uy*distance,p.y-ux*distance]);
        let chosen=null;for(const [x,y] of positions){const box={x:x-w/2-8,y:y-h/2-8,w:w+16,h:h+16};if(box.x<8||box.y<8||box.x+box.w>width-8||box.y+box.h>height-8)continue;if(boxes.every(other=>separated(box,other,8))){chosen={x,y,box};break}}
        if(!chosen){const x=Math.max(w/2+8,Math.min(width-w/2-8,p.x)),y=Math.max(h/2+8,Math.min(height-h/2-8,p.y));chosen={x,y,box:{x:x-w/2-8,y:y-h/2-8,w:w+16,h:h+16}}}
        b.style.left=chosen.x+'px';b.style.top=chosen.y+'px';b.style.zIndex=String(Math.round(10000-p.d));boxes.push(chosen.box);
      }
      const labelPriority=n=>n.id===selected?0:n.kind==='person'?1:n.kind==='concept'?2:selectedBranch.has(n.id)?3:connectedQuestions.has(n.id)?4:n.kind==='subconcept'?5:6;
      for(const n of [...points].sort((a,b)=>labelPriority(a)-labelPriority(b))){
        const b=threeNodes.get(n.id),label=b.querySelector('.node-label'),p=pos[n.id],x=p.x,y=p.y,show=visible.has(n.id)&&x>=0&&x<=width&&y>=0&&y<=height;
        b.hidden=!show;if(!show)continue;b.style.left=x+'px';b.style.top=y+'px';b.style.zIndex=String(Math.round(20000-p.d));b.classList.toggle('selected',selected===n.id);b.classList.toggle('person-current',focusedPerson!==null&&n.person===focusedPerson);b.classList.toggle('person-past',focusedPerson!==null&&n.person!==focusedPerson);b.classList.toggle('chapter-past',activeChapter!==null&&n.chapter!==activeChapter);b.classList.toggle('branch-past',branchKeep!==null&&n.person===focusedPerson&&!branchKeep.has(n.id));b.classList.toggle('branch-other-chapter',branchKeep!==null&&n.chapter!==personChapter);b.classList.toggle('connected',connectedQuestions.has(n.id));if(n.kind!=='question')b.setAttribute('aria-expanded',String(expanded.has(n.id)));
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
      const focusedPerson=selected!==null&&nodes[selected].kind!=='chapter'?nodes[selected].person:null;
      const personChapter=focusedPerson!==null?nodes[selected].chapter:null;
      const activeChapter=selected!==null&&nodes[selected].kind==='chapter'?nodes[selected].chapter:null;
      const branchKeep=focusedPerson!==null&&['concept','subconcept','question'].includes(nodes[selected].kind)?new Set([...ancestors(selected),...descendants(selected)]):null;
      stage.classList.toggle('chapter-focus',activeChapter!==null);
      stage.classList.toggle('branch-focus',branchKeep!==null);
      stage.classList.toggle('all-connected',allConnected);
      stage.classList.toggle('chapter-only',expanded.size===0);
      stage.classList.toggle('person-focus',focusedPerson!==null);
      if(!allConnected)hovered=null;
      const emphasis=allConnected&&hovered!==null?hovered:selected;
      const lineage=emphasis===null?new Set():new Set(ancestors(emphasis));
      const selectedBranch=emphasis===null?new Set():descendants(emphasis);
      const hoverChapter=hovered!==null&&nodes[hovered].kind==='chapter'?hovered:null;
      stage.classList.toggle('chapter-hover',hoverChapter!==null);
      stage.classList.toggle('core-chapter-hover',hoverChapter!==null&&nodes[hoverChapter].chapter===5);
      const connectedQuestions=new Set();
      edges.forEach((e,i)=>{
        const l=paths[i],a=nodes[e.source],b=nodes[e.target],shown=visible.has(e.source)&&visible.has(e.target)&&!(allConnected&&thinnedCrossEdges.has(i));
        const linkedMeaning=e.kind!=='hierarchy'&&(e.source===emphasis||e.target===emphasis);
        if(shown&&linkedMeaning){if(a.kind==='question')connectedQuestions.add(e.source);if(b.kind==='question')connectedQuestions.add(e.target)}
        const newlyShown=shown&&l.dataset.shown!=='true';l.dataset.shown=String(shown);
        l.style.display=shown?'':'none';l.setAttribute('d',connectionPath(e));
        l.classList.toggle('person-current',focusedPerson!==null&&a.person===focusedPerson&&b.person===focusedPerson);
        l.classList.toggle('person-cross',focusedPerson!==null&&((a.person===focusedPerson)!==(b.person===focusedPerson)));
        l.classList.toggle('person-past',focusedPerson!==null&&a.person!==focusedPerson&&b.person!==focusedPerson);
        l.classList.toggle('person-other-chapter',focusedPerson!==null&&(a.chapter!==personChapter||b.chapter!==personChapter));
        const linkLayer=focusedPerson!==null&&branchKeep===null?(l.classList.contains('person-past')?personPastLayer:l.classList.contains('person-cross')?personCrossLayer:personCurrentLayer):personCurrentLayer;
        if(l.parentNode!==linkLayer)linkLayer.append(l);
        l.classList.toggle('chapter-past',activeChapter!==null&&a.chapter!==activeChapter&&b.chapter!==activeChapter);
        l.classList.toggle('chapter-cross',activeChapter!==null&&(a.chapter===activeChapter)!==(b.chapter===activeChapter));
        l.classList.toggle('branch-past',branchKeep!==null&&((a.person===focusedPerson&&!branchKeep.has(a.id))||(b.person===focusedPerson&&!branchKeep.has(b.id))));
        const branchRoute=branchKeep!==null&&e.kind==='hierarchy'&&a.chapter===personChapter&&b.chapter===personChapter&&branchKeep.has(a.id)&&branchKeep.has(b.id);
        l.classList.toggle('branch-route',branchRoute);
        l.classList.toggle('branch-other-chapter',branchKeep!==null&&(a.chapter!==personChapter||b.chapter!==personChapter));
        l.classList.toggle('branch-local-other',branchKeep!==null&&!branchRoute&&a.chapter===personChapter&&b.chapter===personChapter);
        l.classList.toggle('branch',e.kind==='hierarchy'&&selectedBranch.has(e.source)&&selectedBranch.has(e.target));
        l.classList.toggle('active',(lineage.has(e.source)&&lineage.has(e.target))||linkedMeaning||(hoverChapter!==null&&(selectedBranch.has(e.source)||selectedBranch.has(e.target))));
        if((activeChapter!==null&&(l.classList.contains('chapter-past')||l.classList.contains('chapter-cross')))||l.classList.contains('person-other-chapter')||(branchKeep!==null&&!branchRoute))for(const animation of l.getAnimations())animation.cancel();
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
        heading.classList.toggle('selected',selected===c.id);heading.classList.toggle('person-chapter-past',personChapter!==null&&c.chapter!==personChapter);heading.classList.toggle('chapter-other',activeChapter!==null&&c.chapter!==activeChapter);region.classList.toggle('person-chapter-past',personChapter!==null&&c.chapter!==personChapter);region.classList.toggle('chapter-other',activeChapter!==null&&c.chapter!==activeChapter);heading.setAttribute('aria-expanded',String(expanded.has(c.id)));heading.querySelector('small').hidden=!expanded.has(c.id);region.style.display=expanded.has(c.id)?'':'none';
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
        b.style.left=x+'px';b.style.top=y+'px';b.classList.toggle('selected',selected===n.id);b.classList.toggle('person-current',focusedPerson!==null&&n.person===focusedPerson);b.classList.toggle('person-past',focusedPerson!==null&&n.person!==focusedPerson);b.classList.toggle('chapter-past',activeChapter!==null&&n.chapter!==activeChapter);b.classList.toggle('branch-past',branchKeep!==null&&n.person===focusedPerson&&!branchKeep.has(n.id));b.classList.toggle('branch-other-chapter',branchKeep!==null&&n.chapter!==personChapter);b.hidden=!visible.has(n.id)||x<0||x>width||y<0||y>height;
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
    stage.addEventListener('wheel',()=>{if(depthEnabled){autoCentered3D=false;lastManual3D=performance.now()}},{capture:true,passive:true});
    stage.addEventListener('pointerdown',()=>{if(depthEnabled){autoCentered3D=false;lastManual3D=performance.now()}},true);
    stage.addEventListener('pointermove',()=>{if(depthEnabled&&pointers.size)lastManual3D=performance.now()},true);
    stage.addEventListener('pointerdown',e=>{if(e.button!==0&&!(depthEnabled&&e.button===1))return;if(depthEnabled)e.preventDefault();pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});stage.setPointerCapture(e.pointerId);if(pointers.size===1)drag={x:e.clientX,y:e.clientY,ox,oy,panX:threePanX,panY:threePanY,rotate:depthEnabled&&e.button===1};else if(pointers.size===2){const [a,b]=[...pointers.values()],r=stage.getBoundingClientRect(),cx=(a.x+b.x)/2-r.left,cy=(a.y+b.y)/2-r.top;pinch={distance:Math.max(1,Math.hypot(a.x-b.x,a.y-b.y)),k:depthEnabled?threeZoom:k,wx:(cx-ox)/k,wy:(cy-oy)/k,cx,cy,panX:threePanX,panY:threePanY};drag=null}});
    stage.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;const previous=pointers.get(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(depthEnabled){if(pointers.size===2&&pinch){const [a,b]=[...pointers.values()],r=stage.getBoundingClientRect(),cx=(a.x+b.x)/2-r.left,cy=(a.y+b.y)/2-r.top;threeZoom=Math.max(.45,Math.min(maxThreeZoom,pinch.k*Math.hypot(a.x-b.x,a.y-b.y)/pinch.distance));const ratio=threeZoom/pinch.k;threePanX=pinch.panX+cx-pinch.cx-(pinch.cx-width/2)* (ratio-1)+pinch.panX*(ratio-1);threePanY=pinch.panY+cy-pinch.cy-(pinch.cy-height/2)*(ratio-1)+pinch.panY*(ratio-1);scheduleRender()}else if(drag?.rotate){threeYaw+=(e.clientX-previous.x)*.006;threeElevation=Math.max(.28,Math.min(1.45,threeElevation-(e.clientY-previous.y)*.005));scheduleRender()}else if(drag){threePanX=drag.panX+e.clientX-drag.x;threePanY=drag.panY+e.clientY-drag.y;scheduleRender()}return}if(pointers.size===2&&pinch){const [a,b]=[...pointers.values()],r=stage.getBoundingClientRect();k=Math.max(fitK*.45,Math.min(fitK*maxThreeZoom,pinch.k*Math.hypot(a.x-b.x,a.y-b.y)/pinch.distance));ox=(a.x+b.x)/2-r.left-pinch.wx*k;oy=(a.y+b.y)/2-r.top-pinch.wy*k;scheduleRender()}else if(drag){ox=drag.ox+e.clientX-drag.x;oy=drag.oy+e.clientY-drag.y;scheduleRender()}});
    function endPointer(e){pointers.delete(e.pointerId);pinch=null;drag=null;if(pointers.size===1){const p=[...pointers.values()][0];drag={x:p.x,y:p.y,ox,oy,panX:threePanX,panY:threePanY,rotate:false}}}
    stage.addEventListener('pointerup',endPointer);stage.addEventListener('pointercancel',endPointer);
    stage.addEventListener('auxclick',e=>{if(depthEnabled&&e.button===1)e.preventDefault()});
    function idleMotionTick(now){
      setTimeout(()=>requestAnimationFrame(idleMotionTick),70);
      if(!depthEnabled||document.hidden||reducedMotion||!q('.intro').hidden)return;
      if(now-lastIdleFrame<70)return;lastIdleFrame=now;
      const target=now-lastManual3D>1800&&pointers.size===0?1:0;
      idleStrength+=(target-idleStrength)*.14;
      const yaw=Math.sin(now/4300)*.06*idleStrength,elevation=Math.cos(now/6100)*.03*idleStrength;
      if(Math.abs(yaw-idleYaw)+Math.abs(elevation-idleElevation)<.00015)return;
      idleYaw=yaw;idleElevation=elevation;render3D();
    }
    function save(){try{localStorage.setItem('sculpture-forum-v1',JSON.stringify({selected,expanded:[...expanded],cueIndex,presentationMode,depthEnabled}))}catch{}}
    function restore(){try{const s=JSON.parse(localStorage.getItem('sculpture-forum-v1'));if(s&&Array.isArray(s.expanded)){expanded=new Set(s.expanded.filter(id=>Number.isInteger(id)&&nodes[id]));updateVisible();selected=Number.isInteger(s.selected)&&visible.has(s.selected)?s.selected:null;cueIndex=Number.isInteger(s.cueIndex)?Math.max(-1,Math.min(cues.length-1,s.cueIndex)):-1;presentationMode=s.presentationMode!==false;depthEnabled=s.depthEnabled===true;autoCentered3D=depthEnabled;stage.classList.toggle('three-view',depthEnabled);flatPlane.hidden=depthEnabled;threeScene.hidden=!depthEnabled;depthButton.setAttribute('aria-pressed',String(depthEnabled));depthButton.textContent=depthEnabled?'2D 보기':'3D 보기';q('.depth-hint').hidden=!depthEnabled;showDetail(null);render()}}catch{}}
    new ResizeObserver(()=>{width=stage.clientWidth;height=stage.clientHeight;if(depthEnabled){autoCentered3D=true;threePanX=0;threePanY=0}fit()}).observe(stage);
    fit();showDetail(null);restore();updateCue();q('#enter-resume').hidden=expanded.size===0;resetStepHistory();requestAnimationFrame(idleMotionTick);
  })();

