
  (()=>{
    const root=document.getElementById('forum-source-network');
    const data=window.FORUM_DATA;
    // Separate this branch in the tilted view so its progress line remains visible.
    const materialExperienceNode=data.nodes.find(n=>n.person==='최고은'&&n.kind==='subconcept'&&n.label==='물질을 직접 다루는 경험');
    if(materialExperienceNode){materialExperienceNode.x=1268;materialExperienceNode.y=985;}
    const nodes=data.nodes,edges=data.edges.filter(e=>{
      if(nodes[e.source].kind==='chapter'&&nodes[e.source].chapter!==5)return false;
      const a=nodes[e.source],b=nodes[e.target];
      return !(a.person==='권현빈'&&b.person==='권현빈'&&
        [a.label,b.label].includes('창작의 지속')&&[a.label,b.label].includes('직접 만드는 경험'));
    });
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
    for(let i=edges.length-1;i>=0;i--){
      const a=nodes[edges[i].source],b=nodes[edges[i].target];
      if(a.person==='채길원'&&b.person==='채길원'&&
        [a.label,b.label].includes('감각과 사고')&&
        [a.label,b.label].some(label=>label==='물질과 사유'||label==='창작 교육'))edges.splice(i,1);
    }
    const crossChapterPairs=new Map(),thinnedCrossEdges=new Set();
    edges.forEach((e,i)=>{const a=nodes[e.source],b=nodes[e.target];if(e.kind==='hierarchy'||a.chapter===b.chapter||a.chapter===5||b.chapter===5)return;const pair=[a.chapter,b.chapter].sort((x,y)=>x-y).join('-');if(!crossChapterPairs.has(pair))crossChapterPairs.set(pair,[]);crossChapterPairs.get(pair).push(i)});
    for(const pairEdges of crossChapterPairs.values())pairEdges.forEach((i,j)=>{if(j%2===1)thinnedCrossEdges.add(i)});
    const chapters=nodes.filter(n=>n.kind==='chapter'),points=nodes.filter(n=>n.kind!=='chapter');
    const stage=root.querySelector('.stage'),svg=root.querySelector('.wires'),layer=root.querySelector('.node-layer'),detail=root.querySelector('.detail');
    const kindNames={chapter:'주제 영역',person:'인물',concept:'개념어',subconcept:'하위개념어',question:'인터뷰 질문'};
    const NS='http://www.w3.org/2000/svg';
    let width=stage.clientWidth,height=stage.clientHeight,k=1,fitK=1,ox=0,oy=0,selected=null,hovered=null,drag=null;
    let expanded=new Set(),visible=new Set(chapters.map(n=>n.id)),cueIndex=-1,currentQuestion=null,presentationMode=true,depthEnabled=false,cameraMotion=0,threeProjected=[];
    const children=id=>nodes.filter(n=>n.parent===id);
    const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elems=new Map(),paths=[],areas=new Map();
    let guidedStep=false,activeRoute=null,fullReveal=null;
    const q=(s)=>root.querySelector(s);
    const depthButton=q('#forum-depth');
    const flatPlane=q('.map-plane'),threeScene=q('.three-scene'),threeSvg=q('.three-wires'),threeLayer=q('.three-nodes');
    const OVERVIEW_3D_VIEW={yaw:0,elevation:1.38};
    const threeNodes=new Map();const maxThreeZoom=24,labelZoom=z=>Math.min(8,Math.max(1,z<=6?1+(z-1)*.2:z/3));let threeYaw=-.34,threeElevation=.82,threeZoom=1,threePanX=0,threePanY=0,idleYaw=0,idleElevation=0,idleStrength=0,lastManual3D=0,lastIdleFrame=0,autoCentered3D=false,chapterElevationBeforeFocus=null;
    let epilogueRoam=null;
    function stopEpilogueRoam(){
      if(!epilogueRoam)return;
      epilogueRoam=null;epilogueMapAnchor=null;idleYaw=0;idleElevation=0;idleStrength=0;lastManual3D=performance.now();
    }
    function startEpilogueRoam(){
      selected=null;cameraReadingNode=null;cameraReadingCentered=false;fullReveal=null;showDetail(null);
      if(!depthEnabled){setDepthEnabled(true);threeYaw=-.34;threeElevation=.82;threeZoom=1;epilogueMapAnchor={x:.5,y:.5};}
      autoCentered3D=false;idleYaw=0;idleElevation=0;idleStrength=0;threeZoom*=.94;
      render3D();
      if(!reducedMotion){
        const visits=[['최고은',null],['권현빈','물질'],['민지희','리서치'],null,['박재영','창작 플랫폼'],['류성실','세계관'],['강인애',null],null,['안정환',null],['최지혜',null],['서해영','함께하는 조각'],null,['권현빈',null],['채길원',null]];
        const route=[{node:threeCenter,weight:0,zoom:1,elevation:threeElevation}];
        for(const [i,visit] of visits.entries()){
          if(!visit){route.push({node:threeCenter,weight:0,zoom:1,elevation:1.18});continue;}
          const [name,term]=visit;
          const person=points.find(n=>n.kind==='person'&&n.label===name);
          const node=term?points.find(n=>visible.has(n.id)&&n.person===name&&['concept','subconcept'].includes(n.kind)&&n.label.includes(term))||person:person;
          if(node)route.push({node,weight:1,zoom:term?4.1:3.25,elevation:[.72,.48,.88,.58][i%4]});
        }
        const now=performance.now();
        epilogueRoam={elapsed:0,lastTick:now,yaw:threeYaw,zoom:threeZoom,panX:threePanX/width,panY:threePanY/height,route,focus:null,focusId:null};
        epilogueMapAnchor=null;
      }
      q('#map-status').textContent='에필로그 · 노드 사이를 유영하며 창작의 지형을 탐색합니다';save();
    }
    function advanceEpilogueRoam(now){
      const roam=epilogueRoam;if(!roam)return;
      roam.elapsed+=Math.min(100,Math.max(0,now-roam.lastTick));roam.lastTick=now;
      const step=roam.elapsed/14000,index=Math.floor(step),t=step-index,count=roam.route.length;
      const at=i=>{const item=roam.route[((i%count)+count)%count],node=item.node;return {id:node.id,x:node.x,y:node.y,z:threeHeight(node),weight:item.weight,logZoom:Math.log(item.zoom),elevation:item.elevation,yaw:roam.yaw+i/count*Math.PI*2};};
      const a=at(index-1),b=at(index),c=at(index+1),d=at(index+2);
      const blend=key=>{const p=a[key],q=b[key],r=c[key],s=d[key];return .5*((2*q)+(-p+r)*t+(2*p-5*q+4*r-s)*t*t+(-p+3*q-3*r+s)*t*t*t);};
      threeYaw=blend('yaw');threeElevation=Math.max(.32,Math.min(1.42,blend('elevation')));
      threeZoom=Math.max(.65,Math.min(6.5,roam.zoom*Math.exp(blend('logZoom'))));
      const focusEase=t*t*t*(10+t*(-15+6*t));
      roam.focus={x:blend('x'),y:blend('y'),z:blend('z'),weight:b.weight+(c.weight-b.weight)*focusEase};
      roam.focusId=roam.focus.weight>.35?(t<.5?b.id:c.id):null;
      idleYaw=0;idleElevation=0;render3D();
    }
    root.addEventListener('pointerdown',stopEpilogueRoam,true);
    root.addEventListener('wheel',stopEpilogueRoam,{capture:true,passive:true});
    root.addEventListener('keydown',stopEpilogueRoam,true);
    function setDepthEnabled(enabled){
      stopEpilogueRoam();
      cameraMotion++;depthEnabled=enabled;if(!enabled)chapterElevationBeforeFocus=null;
      if(enabled){autoCentered3D=true;threePanX=0;threePanY=0}
      stage.classList.toggle('three-view',enabled);
      flatPlane.hidden=enabled;threeScene.hidden=!enabled;
      depthButton.setAttribute('aria-pressed',String(enabled));
      depthButton.textContent=enabled?'2D 보기':'3D 보기';
      q('.depth-hint').hidden=!enabled;
      render();save();
      if(selected!==null&&!panel.hidden)showDetail(nodes[selected],false);
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
    let interviewMode='person',videoStarted=false;
    let stepHistory=[],stepIndex=-1,stepDepth=0,restoringStep=false;
    const epilogueFilm={id:'epilogue-film',kind:'epilogue',person:'열 명의 목소리',label:'통합 영상',topic:'조소과 교육의 앞으로',question:'확장된 창작의 지형에서 조각교육은 무엇을 이어가고 어떠한 변화를 모색해야 하는가?'};
    const lectureOrder=[
      {chapter:1,people:[['최고은',['Q4','Q7']]]},
      {chapter:2,people:[['류성실',['Q5','Q6']],['강인애',['Q3','Q5']]]},
      {chapter:3,people:[['박재영',['Q2','Q4']],['민지희',['Q5','Q3 후속질문']],['안정환',['Q4','Q5']]]},
      {chapter:4,people:[['최지혜',['Q4','Q3']],['서해영',['Q2','Q6']]]},
      {chapter:5,people:[['권현빈',['Q4','Q5','Q6']],['채길원',['Q5','Q4']]]}
    ];
    const prologueData=window.FORUM_PROLOGUE||{slides:[]},prologueSlides=prologueData.slides;
    let prologueOpen=false,prologueIndex=0;
    const prologueScreen=document.createElement('section');prologueScreen.className='prologue-screen';prologueScreen.hidden=true;prologueScreen.setAttribute('aria-label','프롤로그');prologueScreen.setAttribute('aria-labelledby','prologue-title');stage.append(prologueScreen);
    const prologueNav=document.createElement('button');prologueNav.type='button';prologueNav.className='control prologue-nav';prologueNav.textContent='프롤로그';prologueNav.title='지난 10년의 기록과 발표의 질문';prologueNav.setAttribute('aria-controls','prologue-content');
    if(prologueSlides.length)q('.tool-flow').insertBefore(prologueNav,q('#forum-fit'));
    const cues=prologueSlides.map((slide,index)=>({prologue:index,label:'프롤로그 · '+slide.title}));
    cues.push({overview:true,label:'지형도 · 다섯 개의 장'});
    let applyingCue=false,interviewClosedAt=0,pendingCueTimer=null;
    function setPrologueView(index,animate=false){
      prologueOpen=Number.isInteger(index)&&!!prologueSlides[index];
      prologueScreen.hidden=!prologueOpen;stage.classList.toggle('prologue-mode',prologueOpen);flatPlane.inert=prologueOpen;threeScene.inert=prologueOpen;
      prologueNav.hidden=!prologueOpen;
      if(!prologueOpen){prologueNav.removeAttribute('aria-current');return}
      prologueIndex=index;panel.hidden=true;prologueNav.setAttribute('aria-current','step');
      const slide=prologueSlides[index];
      prologueScreen.classList.toggle('prologue-question-only',!!slide.questionOnly);
      const pager=prologueSlides.length>1&&!prologueSlides.some(item=>item.questionOnly)?'<nav class="prologue-pages" aria-label="프롤로그 화면">'+prologueSlides.map((item,i)=>`<button type="button" data-prologue-page="${i}" aria-label="프롤로그 ${i+1}: ${esc(item.title)}" ${i===index?'aria-current="step"':''}>${String(i+1).padStart(2,'0')}</button>`).join('')+'</nav>':'';
      const records=slide.records?'<ol class="prologue-records">'+slide.records.map(item=>`<li><span class="prologue-record-year">${esc(item.year)}</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></li>`).join('')+'</ol>':'';
      const axes=slide.axes?'<div class="prologue-decade" role="group" aria-label="지난 10년간 제작환경과 교육과정의 변화"><div class="prologue-decade-range" aria-label="2016년부터 2026년까지"><span>2016</span><i></i><span>2026</span></div>'+slide.axes.map(item=>`<div class="prologue-axis"><div class="prologue-axis-label"><strong>${esc(item.label)}</strong></div><div class="prologue-axis-flow"><div class="prologue-term prologue-term-before"><strong class="prologue-term-title">${esc(item.beforeTitle)}</strong><span class="prologue-term-value">${esc(item.before)}</span></div><i aria-hidden="true"></i><div class="prologue-term prologue-term-after"><strong class="prologue-term-title">${esc(item.afterTitle)}</strong><span class="prologue-term-value">${esc(item.after)}</span></div></div><p>${esc(item.detail)}</p></div>`).join('')+'</div>':'';
      const thread=slide.thread?'<ol class="prologue-thread">'+slide.thread.map(item=>`<li><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></li>`).join('')+'</ol>':'';
      prologueScreen.innerHTML=`<div class="prologue-content" id="prologue-content"><div class="prologue-topline"><p class="prologue-eyebrow">${esc(slide.eyebrow)}</p>${pager}</div><h2 id="prologue-title">${esc(slide.title)}</h2>${slide.lead?'<p class="prologue-lead">'+esc(slide.lead)+'</p>':''}${axes}${records}${thread}<div class="prologue-footer${slide.bridgeQuestions?' prologue-paired-questions':''}">${slide.bridgeQuestions?slide.bridgeQuestions.map((question,i)=>`<p class="prologue-bridge" aria-label="${i===0?'제작환경':'교육과정'}의 질문">${esc(question)}</p>`).join(''):`<p class="prologue-bridge">${esc(slide.bridge)}</p>`}</div>${slide.axes||slide.records?'<p class="prologue-source">'+esc(prologueData.source||'')+'</p>':''}</div>`;
      prologueScreen.scrollTop=0;
      if(animate&&!reducedMotion)prologueScreen.firstElementChild.animate([{opacity:0},{opacity:1}],{duration:220,easing:'ease-out'});
    }
    prologueScreen.addEventListener('click',e=>{const button=e.target.closest('[data-prologue-page]');if(button)runCue(Number(button.dataset.prologuePage))});
    prologueNav.addEventListener('click',()=>recordStep(()=>{presentationMode=true;q('.sequence-controls').hidden=false;q('.map-shell').classList.remove('explore');interviewClosedAt=0;if(dialog.open){stopVideo();dialog.close()}runCue(0)}));
    for(const c of [...chapters].sort((a,b)=>a.chapter-b.chapter)){
      const nav=document.createElement('button');nav.type='button';nav.dataset.chapter=c.id;nav.innerHTML='<span class="nav-number">0'+c.chapter+'</span>'+esc(c.label);nav.addEventListener('click',()=>select(c.id));q('.chapter-nav').append(nav);
      cues.push({id:c.id,label:displayLabel(c)});
      for(const [name,questionLabels] of lectureOrder.find(group=>group.chapter===c.chapter).people){
        const person=children(c.id).find(n=>n.label===name);
        if(!person)throw new Error('강연 순서에 없는 인물: '+name);
        for(const questionLabel of questionLabels){
          const question=points.find(n=>n.kind==='question'&&n.person===name&&n.label===questionLabel);
          if(!question)throw new Error('강연 순서에 없는 질문: '+name+' '+questionLabel);
          // One question is one cue, including its person and all intermediate branches.
          cues.push({id:question.id,label:name+' · '+nodes[question.parent].label+' · '+question.label+' '+question.topic});
        }
      }
    }
    cues.push({all:true,label:'다시, 조각으로 · 전체 연결'});
    cues.push({epilogue:true,label:'에필로그 · 조소과 교육의 앞으로'});
    function presentationCueForNode(id){
      const exact=cues.findIndex(cue=>cue.id===id);
      if(exact>=0)return exact;
      const question=cues.findIndex(cue=>nodes[cue.id]?.kind==='question'&&ancestors(cue.id).includes(id));
      return question>=0?question-1:-1;
    }
    const epilogueNav=document.createElement('button');epilogueNav.type='button';epilogueNav.className='control epilogue-nav';epilogueNav.textContent='에필로그';epilogueNav.title='조소과 교육의 앞으로';epilogueNav.addEventListener('click',()=>{if(!prologueOpen&&points.every(n=>visible.has(n.id))){transitionToEpilogue();return}showAll();const motion=cameraMotion;setTimeout(()=>{if(motion===cameraMotion)transitionToEpilogue()},reducedMotion?0:6800)});q('.tool-flow').append(epilogueNav);
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
    for(const [edgeIndex,e] of edges.entries()){
      const l=document.createElementNS(NS,'path');l.classList.add('links');l.dataset.edgeIndex=String(edgeIndex);
      if(e.kind!=='hierarchy')l.classList.add(e.kind);if(e.core)l.classList.add('core');
      const t=document.createElementNS(NS,'title'),a=nodes[e.source],b=nodes[e.target];
      const edgeLabel=n=>n.kind==='question'?n.person+' · '+n.label:n.label;
      t.textContent=e.kind!=='hierarchy'?edgeLabel(a)+' ↔ '+edgeLabel(b)+' · '+e.reason:edgeLabel(a)+' → '+edgeLabel(b);
      l.append(t);personCurrentLayer.append(l);paths.push(l);
    }
    function appendPersonMetadata(label,n){
      if(n.kind!=='person')return;
      const profile=(window.FORUM_PROFILES||{})[n.label];
      if(!profile)return;
      const metadata=document.createElement('span');metadata.className='node-person-meta';
      if(profile.role){const role=document.createElement('span');role.className='node-person-role';role.textContent=profile.role;metadata.append(role)}
      if(profile.career?.length){const career=document.createElement('span');career.className='node-person-career';career.textContent=profile.career.join(' · ');metadata.append(career)}
      if(metadata.childElementCount)label.append(metadata);
    }
    function reservePersonMetadata(label,button,choice,boxes){
      const metadata=label.querySelector('.node-person-meta');
      if(!metadata||!button.classList.contains('step-arrived'))return;
      const gap=parseFloat(getComputedStyle(label).fontSize)*.55;
      const w=metadata.offsetWidth,h=metadata.offsetHeight;
      const left=Math.max(12-choice.x,Math.min(0,width-12-choice.x-w));
      const top=choice.y+label.offsetHeight+gap+h>height-12?-h-gap:label.offsetHeight+gap;
      metadata.style.left=left+'px';metadata.style.top=top+'px';
      boxes.push({x:choice.x+left-4,y:choice.y+top-3,w:w+8,h:h+6});
    }
    for(const n of points){
      const b=document.createElement('button');b.type='button';b.className='dot '+n.kind+' cursor-interaction';b.style.setProperty('--diameter',({person:6.5,concept:4.2,subconcept:3,question:3.5})[n.kind]+'px');
      b.setAttribute('aria-label',kindNames[n.kind]+' '+(n.person?n.person+' / ':'')+(n.question||n.label));b.setAttribute('data-tooltip',n.question||(n.label+(n.subtitle?' · '+n.subtitle:'')));
      b.title=n.question||(n.person&&n.kind!=='person'?n.person+' · ':'')+n.label;
      const mark=document.createElement('span');mark.className='node-mark';b.append(mark);
      b.addEventListener('pointerdown',e=>e.stopPropagation());b.addEventListener('pointerenter',()=>setHovered(n.id));b.addEventListener('pointerleave',()=>setHovered(null));b.addEventListener('click',()=>select(n.id));
      const label=document.createElement('span');label.className='node-label '+n.kind;
      const labelText=document.createElement('span');labelText.className='node-label-text';labelText.textContent=n.label;label.append(labelText);appendPersonMetadata(label,n);b.append(label);
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
    function fitWholeConnection(instant=false){
      epilogueMapAnchor=null;
      const ringTransition=depthEnabled&&fullReveal?.anchorPerson==='채길원';
      const start2D={k,ox,oy};
      const start3D={yaw:threeYaw+idleYaw,elevation:threeElevation+idleElevation,zoom:threeZoom,x:threePanX,y:threePanY};
      if(depthEnabled){autoCentered3D=false;threeYaw=start3D.yaw;threeElevation=start3D.elevation;idleYaw=0;idleElevation=0;lastManual3D=performance.now()}
      fit();
      for(let pass=0;pass<2;pass++){
        render();
        const box=outerOutline.getBBox();
        if(!box.width||!box.height)break;
        const scale=Math.min((width-32)/box.width,(height-24)/box.height);
        const centerX=(box.x+box.width/2-ox)/k,centerY=(box.y+box.height/2-oy)/k;
        k=Math.min(1.9,k*scale);
        ox=width/2-centerX*k;oy=height/2-centerY*k;
      }
      fitK=k;render();
      if(instant&&!depthEnabled)return;
      if(reducedMotion&&!depthEnabled){render();return}
      const token=++cameraMotion,duration=depthEnabled?(ringTransition?7600:5200):5000,start=performance.now();
      if(depthEnabled){
        const turn=((OVERVIEW_3D_VIEW.yaw-start3D.yaw+Math.PI)%(Math.PI*2)+(Math.PI*2))%(Math.PI*2)-Math.PI;
        const goalYaw=start3D.yaw+turn;
        threeYaw=goalYaw;threeElevation=OVERVIEW_3D_VIEW.elevation;threeZoom=1.09;render3D();
        let region=threeSvg.querySelector('.three-volume.outer');
        if(region){
          const box=region.getBBox();
          const fitScale=Math.min((width-32)/Math.max(1,box.width),(height-24)/Math.max(1,box.height));
          threeZoom=Math.max(.45,Math.min(maxThreeZoom,threeZoom*fitScale));render3D();
          region=threeSvg.querySelector('.three-volume.outer');
          const fitted=region.getBBox();
          threePanX+=width/2-fitted.x-fitted.width/2;
          threePanY+=height/2-fitted.y-fitted.height/2;
          render3D();
        }
        const goal={yaw:threeYaw,elevation:threeElevation,zoom:threeZoom,x:threePanX,y:threePanY};
        if(reducedMotion||instant)return;
        threeYaw=start3D.yaw;threeElevation=start3D.elevation;threeZoom=start3D.zoom;threePanX=start3D.x;threePanY=start3D.y;render3D();
        function tick(now){if(token!==cameraMotion)return;const t=Math.min(1,(now-start)/duration),ease=t*t*(3-2*t);
          if(ringTransition){
            const sideYaw=-.32,sweepYaw=.34,sideElevation=.035;
            if(t<.28){const p=smooth(t/.28);threeYaw=start3D.yaw+(sideYaw-start3D.yaw)*p;threeElevation=start3D.elevation+(sideElevation-start3D.elevation)*p}
            else if(t<.72){const p=smooth((t-.28)/.44);threeYaw=sideYaw+(sweepYaw-sideYaw)*p;threeElevation=sideElevation+.025*Math.sin(Math.PI*p)}
            else{const p=smooth((t-.72)/.28);threeYaw=sweepYaw+(goal.yaw-sweepYaw)*p;threeElevation=sideElevation+(goal.elevation-sideElevation)*p}
          }else{const orbit=Math.sin(Math.PI*t);threeYaw=start3D.yaw+(goal.yaw-start3D.yaw)*ease+orbit*.55;threeElevation=start3D.elevation+(goal.elevation-start3D.elevation)*ease-orbit*.32}
          const layoutEase=ringTransition?smooth(t/.52):ease;
          threeZoom=start3D.zoom+(goal.zoom-start3D.zoom)*layoutEase+(ringTransition?.18*Math.sin(Math.PI*t):0);
          threePanX=start3D.x+(goal.x-start3D.x)*layoutEase;threePanY=start3D.y+(goal.y-start3D.y)*layoutEase;lastManual3D=now;render3D();
          if(t<1)requestAnimationFrame(tick);else{fullReveal=null;render3D();stepHistory[stepIndex]=snapshotStep();updateStepControls()}}
        requestAnimationFrame(tick);return;
      }
      const goal={k,ox,oy};k=start2D.k;ox=start2D.ox;oy=start2D.oy;render();
      function tick(now){if(token!==cameraMotion)return;const t=Math.min(1,(now-start)/duration),ease=t*t*(3-2*t);
        k=start2D.k+(goal.k-start2D.k)*ease;ox=start2D.ox+(goal.ox-start2D.ox)*ease;oy=start2D.oy+(goal.oy-start2D.oy)*ease;render();
        if(t<1)requestAnimationFrame(tick);else{fullReveal=null;render();stepHistory[stepIndex]=snapshotStep();updateStepControls()}}
      requestAnimationFrame(tick);
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
    let nodeBranchReveal=null,routeBranchPreview=null,activeForkBranches=null;
    const visibleForkBranches=()=>activeForkBranches&&activeRoute===activeForkBranches.overlay&&activeForkBranches.overlay.isConnected?activeForkBranches:null;
    const showingNodeBranches=()=>routeBranchPreview!==null&&stage.classList.contains('guided-transition');
    // Reveal every child branch with a Q, including Qs outside the lecture order.
    const questionRouteNodes=new Set(nodes.filter(n=>n.kind==='question').flatMap(n=>ancestors(n.id)));
    const lectureQuestionIds=new Set(cues.filter(cue=>nodes[cue.id]?.kind==='question').map(cue=>cue.id));
    const hasQuestionRoute=id=>questionRouteNodes.has(id);
    function branchChildren(id){
      const kind=nodes[id].kind;
      return children(id).filter(n=>kind==='person'?n.kind==='concept':kind==='concept'&&n.kind==='subconcept'&&hasQuestionRoute(n.id));
    }
    const isBranchSource=id=>id!==null&&id!==undefined&&['person','concept'].includes(nodes[id].kind)&&branchChildren(id).length>0;
    function focusedBranchNodes(focusedPerson){
      if(showingNodeBranches()&&nodes[routeBranchPreview].kind==='person')return null;
      if(focusedPerson===null||!['concept','subconcept','question'].includes(nodes[selected].kind))return null;
      const keep=new Set([...ancestors(selected),...descendants(selected)]);
      for(const id of readingContext()||[])keep.add(id);
      // Keep every fork destination readable until its common-source trace finishes.
      const forkBranches=visibleForkBranches();
      if(forkBranches)for(const [sourceId,childIds] of forkBranches.sources){
        if(nodes[sourceId].person!==focusedPerson)continue;
        keep.add(sourceId);for(const id of childIds)keep.add(id);
      }
      if(showingNodeBranches()&&nodes[routeBranchPreview].kind==='concept'){
        for(const id of ancestors(routeBranchPreview))keep.add(id);
        for(const n of branchChildren(routeBranchPreview))keep.add(n.id);
      }
      return keep;
    }
    function nodeBranchState(e){
      const forkBranches=visibleForkBranches(),forkParent=nodes[e.source].parent;
      if(e.kind==='hierarchy'&&forkBranches&&(forkBranches.sources.get(e.source)?.has(e.target)||nodes[e.target].kind==='question'&&forkBranches.sources.get(forkParent)?.has(e.source)))
        return {opacity:0,progress:0,reverse:false,trace:false};
      if(!nodeBranchReveal||selected!==nodeBranchReveal.id&&(!showingNodeBranches()||routeBranchPreview!==nodeBranchReveal.id))return null;
      const source=nodes[nodeBranchReveal.id],a=nodes[e.source],b=nodes[e.target];
      const branchIds=new Set(branchChildren(source.id).map(n=>n.id));
      const branch=e.kind==='hierarchy'&&a.id===source.id&&branchIds.has(b.id);
      // The blue fork draws these edges from the common source, without an early preview.
      if(source.kind==='concept'&&showingNodeBranches()&&e.kind==='hierarchy'&&(branch||(branchIds.has(a.id)&&b.kind==='question')))
        return {opacity:0,progress:0,reverse:false,trace:false};
      const related=source.kind==='person'&&[a,b].some(n=>n.person===source.label&&n.kind==='concept');
      if(!branch&&!related)return null;
      const elapsed=nodeBranchReveal.start===null?-1:performance.now()-nodeBranchReveal.start;
      const progress=elapsed<0?0:Math.min(1,elapsed/1000);
      return branch?{opacity:progress>0?1:0,progress,reverse:false,trace:true}:{opacity:elapsed<1000?0:Math.min(1,(elapsed-1000)/350),progress:1,reverse:false,trace:false};
    }
    function revealNodeBranches(id){
      if(!nodeBranchReveal||nodeBranchReveal.id!==id||nodeBranchReveal.start!==null)return;
      const reveal=nodeBranchReveal;reveal.start=performance.now();
      function tick(){if(nodeBranchReveal!==reveal||selected!==id&&(!showingNodeBranches()||routeBranchPreview!==id))return;render();if(performance.now()-reveal.start<1400)requestAnimationFrame(tick)}
      requestAnimationFrame(tick);
    }
    function markStepArrival(id,append=false){
      if(!append)for(const el of root.querySelectorAll('.step-arrived'))el.classList.remove('step-arrived');
      if(id===null||(!append&&selected!==id))return;
      const n=nodes[id];
      (n.kind==='chapter'?areas.get(id)?.heading:elems.get(id)?.b)?.classList.add('step-arrived');
      threeNodes.get(id)?.classList.add('step-arrived');
      if(isBranchSource(id)&&(selected===id||showingNodeBranches()&&routeBranchPreview===id))revealNodeBranches(id);
    }
    function selectStep(id){
      stopEpilogueRoam();
      readingProjectionBounds=depthEnabled?lastProjectionBounds:null;
      routeBranchPreview=null;
      cameraReadingNode=null;cameraReadingCentered=false;idleYaw=0;idleElevation=0;idleStrength=0;
      markStepArrival(null);
      setPrologueView(null);
      if(!applyingCue&&pendingCueTimer){clearTimeout(pendingCueTimer);pendingCueTimer=null;interviewClosedAt=0}
      fullReveal=null;
      const previous=selected,before=new Set(visible);selected=id;
      openingChapterEntrance=previous===null&&nodes[id].kind==='chapter'&&nodes[id].chapter===1?{id,started:performance.now()}:null;
      if(openingChapterEntrance){
        const entrance=openingChapterEntrance;
        setTimeout(()=>{if(openingChapterEntrance===entrance&&selected===id)markStepArrival(id,true)},reducedMotion?0:1000);
      }
      nodeBranchReveal=isBranchSource(id)?{id,start:null}:null;
      const guided=presentationMode&&previous!==null&&previous!==id&&!reducedMotion;
      if(guided)for(const line of paths)for(const animation of line.getAnimations())animation.cancel();
      if(presentationMode&&!applyingCue){
        const upcoming=cues.findIndex((cue,index)=>index>=cueIndex&&cue.id===id);
        const planned=upcoming>=0?upcoming:cues.findIndex(cue=>cue.id===id);
        if(planned>=0){cueIndex=planned;updateCue()}
        else{
          const beforeQuestion=presentationCueForNode(id);
          if(beforeQuestion>=0){cueIndex=beforeQuestion;updateCue()}
        }
      }
      if(['chapter','person'].includes(nodes[id].kind))for(const n of points)if(n.chapter!==nodes[id].chapter)for(const animation of elems.get(n.id).b.getAnimations())animation.cancel();
      if(['concept','subconcept','question'].includes(nodes[id].kind)){const keep=new Set([...ancestors(id),...descendants(id)]);for(const n of points)if(n.chapter!==nodes[id].chapter||(n.person===nodes[id].person&&!keep.has(n.id)))for(const animation of elems.get(n.id).b.getAnimations())animation.cancel()}
      for(const aid of ancestors(id))if(children(aid).length)expanded.add(aid);
      updateVisible();if(nodes[id].kind==='question')panel.hidden=true;else showDetail(nodes[id]);
      autoCentered3D=false;stage.classList.toggle('guided-transition',guided);guidedStep=guided;render();guidedStep=false;animateNodes(before,guided);
      let cameraArrived=false,routeArrived=!guided;
      let interviewQueued=false;
      const revealQuestion=()=>{
        if(nodes[id].kind!=='question'||!routeArrived||interviewQueued)return;
        interviewQueued=true;
        const arrivalMotion=cameraMotion;
        setTimeout(()=>{if(selected===id&&cameraMotion===arrivalMotion&&!dialog.open)showDetail(nodes[id])},1000);
      };
      followReadableRoute(previous,id,guided,()=>{
        if(openingChapterEntrance?.id===id)openingChapterEntrance=null;
        cameraArrived=true;routeArrived=true;markStepArrival(id,true);revealQuestion();
      });
      save();
      q('#map-status').textContent=displayLabel(nodes[id])+' 선택';
    }
    function animateNodes(before,guided=false){
      if(reducedMotion)return;
      if(fullReveal)return;
      if(depthEnabled)return;
      let index=0;for(const nid of visible){if(before.has(nid)||!elems.has(nid))continue;const n=nodes[nid],p=nodes[n.parent],{b}=elems.get(nid);b.animate(guided?[{opacity:0},{opacity:1}]:[{transform:`translate(calc(-50% + ${(p.x-n.x)*k}px),calc(-50% + ${(p.y-n.y)*k}px))`,opacity:0},{transform:'translate(-50%,-50%)',opacity:1}],{duration:guided?480:520,delay:guided?Math.min(500+index++*12,780):Math.min(index++*18,320),easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});}
    }
    function beginReadableTrace(from,route,to){
      activeRoute?.remove();
      const ids=[from,...route],prefix=nodes[from].person?ancestors(from).slice(1,-1):[],overlay=document.createElementNS(NS,'svg');
      overlay.setAttribute('class','lecture-route');overlay.setAttribute('aria-hidden','true');
      overlay.style.opacity='0';
      const line=document.createElementNS(NS,'path'),head=document.createElementNS(NS,'circle');
      line.setAttribute('class','lecture-route-line');head.setAttribute('class','lecture-route-head');head.setAttribute('r','2.7');
      overlay.append(line,head);stage.append(overlay);activeRoute=overlay;
      const forkBranches={overlay,sources:new Map()};activeForkBranches=forkBranches;
      let motion=cameraMotion,finished=false,finishing=false;
      const forks=[];
      const remove=()=>{overlay.remove();if(activeRoute===overlay)activeRoute=null;if(activeForkBranches===forkBranches){activeForkBranches=null;render()}};
      const point=id=>depthEnabled?threeProjected[id]:{x:nodes[id].x*k+ox,y:nodes[id].y*k+oy};
      function startFork(sourceId){
        if(forks.some(fork=>fork.sourceId===sourceId))return;
        const started=performance.now(),arms=[];
        forkBranches.sources.set(sourceId,new Set(branchChildren(sourceId).map(child=>child.id)));
        for(const child of branchChildren(sourceId)){
          // All arms share one departure; only the selected interview continues beyond its child.
          if(ancestors(to).includes(child.id))continue;
          const armIds=[sourceId,child.id];
          const armLine=document.createElementNS(NS,'path'),armHead=document.createElementNS(NS,'circle');
          armLine.setAttribute('class','lecture-route-line lecture-route-fork');
          armLine.dataset.forkSource=String(sourceId);armLine.dataset.forkTarget=String(child.id);
          armHead.setAttribute('class','lecture-route-head');armHead.setAttribute('r','2.7');
          overlay.append(armLine,armHead);
          const timelines=armIds.slice(1).map((id,i)=>overviewTravelTimeline(armIds[i],id,{
            continueFromNode:true,passThrough:i<armIds.length-2,
            readingDeparture:true,readingArrival:true
          }));
          arms.push({ids:armIds,line:armLine,head:armHead,timelines,duration:timelines.reduce((sum,item)=>sum+item.duration,0)});
        }
        forks.push({sourceId,started,arms});updateVisible();render();drawForks();
      }
      function drawForks(){
        const now=performance.now();let complete=true;
        for(const fork of forks)for(const arm of fork.arms){
          let elapsed=Math.max(0,now-fork.started),index=0;
          if(elapsed<arm.duration)complete=false;
          while(index<arm.timelines.length-1&&elapsed>=arm.timelines[index].duration){elapsed-=arm.timelines[index].duration;index++}
          const timeline=arm.timelines[index],progress=timeline.progressAt(Math.min(1,elapsed/timeline.duration));
          const points=arm.ids.slice(0,index+1).map(point),a=point(arm.ids[index]),b=point(arm.ids[index+1]);
          const tip={x:a.x+(b.x-a.x)*progress,y:a.y+(b.y-a.y)*progress};points.push(tip);
          arm.line.setAttribute('d',points.map((p,i)=>(i?'L':'M')+p.x.toFixed(1)+','+p.y.toFixed(1)).join(''));
          arm.head.setAttribute('cx',tip.x);arm.head.setAttribute('cy',tip.y);
        }
        return complete;
      }
      function draw(index,progress){
        if(activeRoute!==overlay)return;
        overlay.style.opacity='';
        overlay.setAttribute('viewBox',`0 0 ${width} ${height}`);
        const points=[...prefix,...ids.slice(0,index+1)].map(point),a=point(ids[index]),b=point(ids[index+1]);
        const tip={x:a.x+(b.x-a.x)*progress,y:a.y+(b.y-a.y)*progress};points.push(tip);
        // Keep one path for the entire journey; only its travelled portion is drawn.
        line.setAttribute('d',points.map((p,i)=>(i?'L':'M')+p.x.toFixed(1)+','+p.y.toFixed(1)).join(''));
        head.setAttribute('cx',tip.x);head.setAttribute('cy',tip.y);
        drawForks();
      }
      const fade=()=>{finished=true;overlay.classList.add('finish');setTimeout(remove,330)};
      function monitor(){
        if(finished)return;
        if(motion!==cameraMotion||selected!==to||activeRoute!==overlay){remove();return}
        if(drawForks()&&finishing){fade();return}
        requestAnimationFrame(monitor);
      }
      requestAnimationFrame(monitor);
      return {draw,startFork,expectMotion:()=>{motion=cameraMotion},finish:()=>{finishing=true;if(drawForks())fade()}};
    }
    function selectedTextPoint(id){
      const n=nodes[id],button=depthEnabled?threeNodes.get(id):n.kind==='chapter'?areas.get(id).heading:elems.get(id).b;
      const text=n.kind==='chapter'?button.querySelector('strong'):button.querySelector('.node-label-text');
      const element=text&&text.getBoundingClientRect().width?text:button;
      const box=element.getBoundingClientRect(),stageBox=stage.getBoundingClientRect();
      return {x:box.left+box.width/2-stageBox.left,y:box.top+box.height/2-stageBox.top};
    }
    // Fixed overview distances set the rhythm; bounds protect reading time and the lecture budget.
    const NODE_REFERENCE_TRAVEL_MS=850;
    const NODE_TRAVEL_RAMP_MS=120;
    const NODE_PASS_SPEED=.5;
    const NODE_READING_ZONE=.28;
    const NODE_TRAVEL_TIMES={
      chapter:{base:1800,min:1700,max:2200},
      person:{base:1750,min:1600,max:2100},
      concept:{base:1350,min:1200,max:1700},
      subconcept:{base:2100,min:1900,max:2400},
      question:{base:760,min:650,max:900},
      returning:{base:600,min:450,max:800}
    };
    let travelReference=null,overviewTravelPoints=null;
    function hierarchyRoute(from,to){
      const chain=id=>{const ids=[];while(id!==null&&id!==undefined){ids.push(id);id=nodes[id].parent}return ids};
      const a=chain(from),b=chain(to),join=a.find(id=>b.includes(id));
      return join===undefined?[to]:[...a.slice(1,a.indexOf(join)+1),...b.slice(0,b.indexOf(join)).reverse()];
    }
    function getTravelReference(){
      if(travelReference)return travelReference;
      const from=nodes.find(n=>n.kind==='person'&&n.label==='류성실');
      const to=nodes.find(n=>n.person==='류성실'&&n.kind==='concept'&&n.label==='플랫폼');
      // Preserve the Ryu -> platform timing when presentation cues are regrouped.
      travelReference={from:from.id,to:to.id,duration:NODE_REFERENCE_TRAVEL_MS};
      return travelReference;
    }
    function overviewTravelDistance(from,to){
      if(!overviewTravelPoints){
        const c=Math.cos(OVERVIEW_3D_VIEW.yaw),s=Math.sin(OVERVIEW_3D_VIEW.yaw),ce=Math.cos(OVERVIEW_3D_VIEW.elevation),se=Math.sin(OVERVIEW_3D_VIEW.elevation);
        overviewTravelPoints=nodes.map(n=>{
          const x=n.x-threeCenter.x,y=n.y-threeCenter.y,z=threeHeight(n),u=x*c-y*s,v=x*s+y*c;
          const d=v*ce-z*se,p=3200/Math.max(1200,3200+d);
          return {x:u*p,y:(v*se-z*ce)*p};
        });
      }
      const a=overviewTravelPoints[from??threeCenter.id],b=overviewTravelPoints[to];
      // Overview fit, viewport size and translation cancel in the distance ratio.
      return Math.hypot(b.x-a.x,b.y-a.y);
    }
    function overviewTravelTimeline(from,to,flow={}){
      // Restore the original 2.352-second ease for overview -> chapter 1 only.
      if(from===null&&nodes[to].kind==='chapter'&&nodes[to].chapter===1)
        return {duration:flow.openingDuration??2352,progressAt:t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)}};
      const reference=getTravelReference(),referenceLength=overviewTravelDistance(reference.from,reference.to);
      const returning=flow.returning??(from!==null&&from!==undefined&&nodes[from].parent===to);
      const policy=NODE_TRAVEL_TIMES[returning?'returning':nodes[to].kind]||NODE_TRAVEL_TIMES.concept;
      const ratio=overviewTravelDistance(from,to)/Math.max(.000001,referenceLength);
      const zoomReturn=returning&&nodes[from].kind==='subconcept'&&nodes[to].kind==='concept';
      const duration=Math.max(zoomReturn?1250:policy.min,Math.min(policy.max,policy.base*Math.pow(ratio,.6)));
      const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)};
      const pace=p=>{
        let speed=1;
        if(!returning&&flow.readingDeparture&&p<NODE_READING_ZONE)speed=NODE_PASS_SPEED+(1-NODE_PASS_SPEED)*smooth(p/NODE_READING_ZONE);
        if(!returning&&flow.readingArrival&&p>1-NODE_READING_ZONE)speed=NODE_PASS_SPEED+(1-NODE_PASS_SPEED)*smooth((1-p)/NODE_READING_ZONE);
        return speed;
      };
      // Normalize the glide inside its duration, so slowing near text never stretches a long leg.
      const count=128,cost=[0];let weight=0,previous=1/pace(0);
      for(let i=1;i<=count;i++){const next=1/pace(i/count);weight+=(previous+next)/2/count;cost.push(weight);previous=next}
      const ramp=Math.min(NODE_TRAVEL_RAMP_MS,duration*.2);
      const rampIn=flow.continueFromNode?0:ramp,rampOut=flow.passThrough?0:ramp;
      const total=duration-(rampIn+rampOut)/2;
      for(let i=1;i<=count;i++)cost[i]=cost[i]/weight*total;
      const progressAt=t=>{
        const elapsed=Math.max(0,Math.min(1,t))*duration;
        const target=rampIn&&elapsed<rampIn?elapsed*elapsed/(2*rampIn):rampOut&&elapsed>duration-rampOut?total-(duration-elapsed)**2/(2*rampOut):elapsed-rampIn/2;
        let lo=0,hi=count;
        while(lo+1<hi){const mid=(lo+hi)>>1;if(cost[mid]<target)lo=mid;else hi=mid}
        const part=(target-cost[lo])/Math.max(.000001,cost[hi]-cost[lo]);
        return Math.max(0,Math.min(1,(lo+part)/count));
      };
      return {duration,progressAt};
    }
    function nodeTravelProgress(t,duration){
      const elapsed=Math.max(0,Math.min(1,t))*duration,ramp=Math.min(NODE_TRAVEL_RAMP_MS,duration*.2),cruise=duration-ramp;
      if(elapsed<ramp)return elapsed*elapsed/(2*ramp*cruise);
      if(elapsed>duration-ramp)return 1-(duration-elapsed)**2/(2*ramp*cruise);
      return (elapsed-ramp/2)/cruise;
    }
    let cameraReadingNode=null,cameraReadingCentered=false,openingChapterEntrance=null;
    let readingProjectionBounds=null,lastProjectionBounds=null;
    function travel(points,duration,frame,done,progressAt,onProgress,continueFromNode=false){
      const token=++cameraMotion,segments=[],lengths=[0];let total=0;
      for(let i=1;i<points.length;i++){const length=Math.hypot(points[i].x-points[i-1].x,points[i].y-points[i-1].y);segments.push(length);total+=length;lengths.push(total)}
      let start=continueFromNode?performance.now():null,firstChapterEmphasized=false;
      function tick(now){
        if(token!==cameraMotion)return;
        if(start===null)start=now;
        const t=Math.min(1,(now-start)/duration);
        const progress=progressAt?progressAt(t):nodeTravelProgress(t,duration),distance=total*progress;let i=0;
        while(i<segments.length-1&&lengths[i+1]<distance)i++;
        const part=segments[i]?Math.max(0,Math.min(1,(distance-lengths[i])/segments[i])):1;
        const a=points[i],b=points[Math.min(i+1,points.length-1)];
        frame({x:a.x+(b.x-a.x)*part,y:a.y+(b.y-a.y)*part},progress);
        onProgress?.(progress);
        if(!firstChapterEmphasized&&(now-start)>=1000&&selected!==null&&nodes[selected].kind==='chapter'&&nodes[selected].chapter===1){firstChapterEmphasized=true;markStepArrival(selected,true)}
        if(t<1)requestAnimationFrame(tick);
        else{done();if(selected!==null&&stepHistory[stepIndex]?.selected===selected){stepHistory[stepIndex]=snapshotStep();updateStepControls()}}
      }
      requestAnimationFrame(tick);
    }
    // All destinations use the same hierarchy scale, independent of the incoming route.
    const NODE_ZOOM_LEVELS={chapter:1,person:2,concept:4,subconcept:8,question:8};
    const nodeZoomLevel=node=>NODE_ZOOM_LEVELS[node.kind]||1;
    const cameraTravelProgress=(previous,node,t)=>previous===null&&node.kind==='chapter'&&node.chapter===1?t:t*t*(3-2*t);
    function contextFrameIds(id){
      const node=nodes[id];
      if(!node||!['person','concept'].includes(node.kind))return null;
      const person=ancestors(id).map(nid=>nodes[nid]).find(n=>n.kind==='person');
      if(!person)return null;
      return [person.parent,person.id,...children(person.id).filter(n=>n.kind==='concept').map(n=>n.id)];
    }
    function readingContext(){return cameraReadingNode===null?null:contextFrameIds(cameraReadingNode)}
    function pinReadingHeading(button,id){
      if(!cameraReadingCentered||cameraReadingNode!==id||selected===null)return;
      const text=button.querySelector('strong'),box=text.getBoundingClientRect(),area=stage.getBoundingClientRect();
      button.style.left=(parseFloat(button.style.left)+area.left+width/2-box.left-box.width/2)+'px';
      button.style.top=(parseFloat(button.style.top)+area.top+height/2-box.top-box.height/2)+'px';
    }
    function centerReadingText(id){
      if(contextFrameIds(id))return;
      cameraReadingNode=id;cameraReadingCentered=true;
      if(depthEnabled)render3D();else render();
    }
    function readableWaypoints(from,to){
      if(nodes[to].kind==='question'&&(from===null||nodes[from].person!==nodes[to].person)){
        const path=ancestors(to),personIndex=path.findIndex(id=>nodes[id].kind==='person');
        return path.slice(personIndex).filter(nid=>visible.has(nid));
      }
      if(from===null||from===to||nodes[from].person!==nodes[to].person||!nodes[to].person)return [to];
      // ancestors() is root-first, so walk the actual parent chain for the return leg.
      return hierarchyRoute(from,to).filter(nid=>visible.has(nid));
    }
    function followReadableRoute(from,to,guided,after){
      const route=guided?readableWaypoints(from,to):[to];
      const trace=guided?beginReadableTrace(from,route,to):null;
      let index=0,previous=from,readingDeparture=false;
      function next(){
        const target=route[index];cameraReadingNode=target;cameraReadingCentered=false;
        const passThrough=index<route.length-1;
        const returning=previous!==null&&nodes[previous].parent===target;
        const forwardFork=!returning&&passThrough&&isBranchSource(target)&&nodes[route[index+1]].parent===target;
        // Returning along the previous interview's path never unfolds branch previews.
        if(returning){routeBranchPreview=null;nodeBranchReveal=null;render()}
        else if(nodes[target].kind==='person'&&passThrough){routeBranchPreview=target;nodeBranchReveal={id:target,start:null};render()}
        else if(forwardFork&&routeBranchPreview===null){routeBranchPreview=target;nodeBranchReveal={id:target,start:null};render()}
        else if(previous!==null&&nodes[previous].kind==='person'&&passThrough){
          routeBranchPreview=previous;
          if(nodeBranchReveal?.id!==previous)nodeBranchReveal={id:previous,start:performance.now()};
          render();
        }
        // Names and concepts use the same simultaneous departure from one source point.
        if(isBranchSource(previous)&&nodes[target].parent===previous){
          routeBranchPreview=previous;nodeBranchReveal={id:previous,start:performance.now()};
          readingDeparture=true;trace?.startFork(previous);render();
        }
        const readingArrival=passThrough&&!returning;
        const legIndex=index;
        followConnectionToLabel(previous,target,()=>{
          markStepArrival(target,true);
          if(!passThrough){routeBranchPreview=null;trace?.finish();stage.classList.remove('guided-transition');render();after();return}
          // Move through intermediate nodes at a reduced, nonzero speed.
          readingDeparture=readingArrival;previous=target;index++;next();
        },{continueFromNode:index>0,passThrough,returning,readingArrival,readingDeparture:!returning&&readingDeparture,onProgress:p=>{
          if(previous!==null&&routeBranchPreview===previous&&nodes[previous].kind==='person'&&nodes[target].parent===previous&&p>=.45){
            routeBranchPreview=forwardFork?target:null;nodeBranchReveal=forwardFork?{id:target,start:null}:null;render();
          }
          if(forwardFork&&p>=.65){
            if(routeBranchPreview!==target){routeBranchPreview=target;nodeBranchReveal={id:target,start:null};render()}
          }
          trace?.draw(legIndex,p);
        }});
        trace?.expectMotion();
      }
      next();
    }
    function followConnectionToLabel(previous,id,after,flow={}){
      cameraMotion++;
      if(depthEnabled){
        lastManual3D=performance.now();
        const start={x:threePanX,y:threePanY,zoom:threeZoom,yaw:threeYaw,elevation:threeElevation};
        let startFocus=previous!==null&&threeProjected[previous]?{x:threeProjected[previous].x,y:threeProjected[previous].y}:{x:width/2,y:height/2};
        const node=nodes[id],kind=node.kind,contextIds=contextFrameIds(id);
        const sourceId=previous;
        if(sourceId!==undefined&&sourceId!==null&&threeProjected[sourceId])startFocus={x:threeProjected[sourceId].x,y:threeProjected[sourceId].y};
        const focusId=id;
        let goalZoom=contextIds?2.8:nodeZoomLevel(node);
        const goalYaw=start.yaw;
        const goalElevation=start.elevation;
        threeZoom=goalZoom;threeYaw=goalYaw;threeElevation=goalElevation;render3D();
        if(contextIds){
          const xs=contextIds.map(nid=>threeProjected[nid].x),ys=contextIds.map(nid=>threeProjected[nid].y);
          const fitGroup=Math.min(1,Math.max(180,width-340)/Math.max(1,Math.max(...xs)-Math.min(...xs)),Math.max(160,height-240)/Math.max(1,Math.max(...ys)-Math.min(...ys)));
          goalZoom=Math.max(.45,goalZoom*fitGroup);threeZoom=goalZoom;render3D();
        }
        const p=threeProjected[focusId];
        threePanX+=width/2-p.x;threePanY+=height/2-p.y;render3D();
        if(contextIds){
          const xs=contextIds.map(nid=>threeProjected[nid].x),ys=contextIds.map(nid=>threeProjected[nid].y);
          threePanX+=width/2-(Math.min(...xs)+Math.max(...xs))/2;
          threePanY+=height/2-(Math.min(...ys)+Math.max(...ys))/2;
          render3D();
        }
        const goal={x:threePanX,y:threePanY,zoom:goalZoom,yaw:goalYaw,elevation:goalElevation};
        const goalFocus={x:threeProjected[focusId].x,y:threeProjected[focusId].y};
        threePanX=start.x;threePanY=start.y;threeZoom=start.zoom;threeYaw=start.yaw;threeElevation=start.elevation;render3D();
        const finish=()=>{threePanX=goal.x;threePanY=goal.y;threeZoom=goal.zoom;threeYaw=goal.yaw;threeElevation=goal.elevation;render3D();if(!flow.passThrough)centerReadingText(id);after()};
        if(reducedMotion){finish();return}
        const timeline=overviewTravelTimeline(previous,id,flow);
          travel([start,goal],timeline.duration,(_p,lineProgress)=>{
            lastManual3D=performance.now();
            const progress=cameraTravelProgress(previous,node,lineProgress);
            threePanX=start.x+(goal.x-start.x)*progress;threePanY=start.y+(goal.y-start.y)*progress;
            threeZoom=start.zoom*Math.pow(goal.zoom/start.zoom,progress);
            render3D();
            const from=previous!==null?threeProjected[previous]:null,to=threeProjected[focusId];
            // The broad structure stays fixed while the line advances from name to concept.
            if(to&&!contextIds){
              const currentX=(from?from.x:startFocus.x)*(1-progress)+to.x*progress;
              const currentY=(from?from.y:startFocus.y)*(1-progress)+to.y*progress;
              const desiredX=startFocus.x+(goalFocus.x-startFocus.x)*progress;
              const desiredY=startFocus.y+(goalFocus.y-startFocus.y)*progress;
              threePanX+=desiredX-currentX;threePanY+=desiredY-currentY;
              render3D();
            }
          },finish,timeline.progressAt,flow.onProgress,flow.continueFromNode);
        return timeline;
      }
      const start={x:ox,y:oy,k},node=nodes[id],contextIds=contextFrameIds(id);
      k=fitK*(contextIds?2.8:nodeZoomLevel(node));
      if(contextIds){
        const xs=contextIds.map(nid=>nodes[nid].x),ys=contextIds.map(nid=>nodes[nid].y);
        const minx=Math.min(...xs),maxx=Math.max(...xs),miny=Math.min(...ys),maxy=Math.max(...ys);
        k=Math.max(fitK*.45,Math.min(k,Math.max(180,width-340)/Math.max(1,maxx-minx),Math.max(160,height-240)/Math.max(1,maxy-miny)));
        ox=width/2-(minx+maxx)*k/2;oy=height/2-(miny+maxy)*k/2;render();
        const goal={x:ox,y:oy,k};ox=start.x;oy=start.y;k=start.k;render();
        const finish=()=>{ox=goal.x;oy=goal.y;k=goal.k;render();if(!flow.passThrough)centerReadingText(id);after()};
        if(reducedMotion){finish();return}
        const timeline=overviewTravelTimeline(previous,id,flow);
        travel([start,goal],timeline.duration,(_p,t)=>{const p=cameraTravelProgress(previous,node,t);ox=start.x+(goal.x-start.x)*p;oy=start.y+(goal.y-start.y)*p;k=start.k*Math.pow(goal.k/start.k,p);render()},finish,timeline.progressAt,flow.onProgress,flow.continueFromNode);
        return timeline;
      }
      ox=width/2-node.x*k;oy=height/2-node.y*k;render();
      const goal={x:ox,y:oy,k};ox=start.x;oy=start.y;k=start.k;render();
      const finish=()=>{ox=goal.x;oy=goal.y;k=goal.k;render();if(!flow.passThrough)centerReadingText(id);after()};
      if(reducedMotion){finish();return}
      const timeline=overviewTravelTimeline(previous,id,flow);
      travel([start,goal],timeline.duration,(_p,t)=>{const p=cameraTravelProgress(previous,node,t);ox=start.x+(goal.x-start.x)*p;oy=start.y+(goal.y-start.y)*p;k=start.k*Math.pow(goal.k/start.k,p);render()},finish,timeline.progressAt,flow.onProgress,flow.continueFromNode);
      return timeline;
    }
    function showDetail(n,openQuestion=true){
      if(!n){markStepArrival(null);panel.hidden=true;detail.hidden=true;detail.innerHTML='';return}
      if(n.kind==='question'&&openQuestion){panel.hidden=true;openInterview(n);return}
      panel.hidden=false;detail.hidden=false;
      let out='<div class="detail-title">'+esc(n.kind==='question'?n.person+' · '+n.label:displayLabel(n))+'</div>';
      if(n.kind==='person'){
        const profile=(window.FORUM_PROFILES||{})[n.label];
        if(profile?.role)out+='<p class="person-role">'+esc(profile.role)+'</p>';
        if(profile?.career?.length)out+='<p class="detail-career">'+profile.career.map(esc).join('<br>')+'</p>';
      }
      const route=ancestors(n.id).map(id=>nodes[id]);
      out+='<nav class="detail-path" aria-label="현재 항목의 단계 경로">'+route.map((item,i)=>(i?'<span class="path-divider" aria-hidden="true">›</span>':'')+'<span'+(i===route.length-1?' aria-current="location"':'')+'>'+esc(item.label)+'</span>').join('')+'</nav>';
      detail.innerHTML=out;
    }
    function profileHTML(name){const p=(window.FORUM_PROFILES||{})[name];if(!p)return '';return '<p class="person-role">'+esc(p.role)+'</p>'+(p.career?.length?'<ul class="person-career">'+p.career.map(line=>'<li>'+esc(line)+'</li>').join('')+'</ul>':'')}
    function introduction(person){return {id:'intro-'+person.id,kind:'introduction',parent:person.id,person:person.label,chapter:person.chapter,label:'Q1',topic:'자기소개',question:'Q1. 현재 어떤 일을 하고 계신지, 본인의 활동을 중심으로 소개해 주세요.'}}
    function personQuestions(name){const person=points.find(n=>n.kind==='person'&&n.label===name);return [...(person?[introduction(person)]:[]),...points.filter(n=>n.kind==='question'&&n.person===name&&n.label!=='Q1')]}
    function assetURL(value){if(typeof value!=='string'||!value.trim())return '';try{const u=new URL(value,location.href);return ['https:','http:'].includes(u.protocol)?u.href:''}catch{return ''}}
    function exitVideoFullscreen(){
      if(document.fullscreenElement===video)document.exitFullscreen().catch(()=>{});
      else if(video.webkitDisplayingFullscreen&&typeof video.webkitExitFullscreen==='function')video.webkitExitFullscreen();
    }
    let questionScreenTimer=null,questionScreenToken=0;

    // Only the silent edges ramp; dialogue and room tone keep a constant level.
    let interviewAudioBounds=null,interviewAudioFrame=0,interviewUserVolume=video.volume,interviewAppliedVolume=video.volume;
    const audioSmooth=x=>{const t=Math.max(0,Math.min(1,x));return t*t*(3-2*t)};
    function interviewAudioFactor(){
      if(!dialog.open||!videoStarted||video.ended||dialog.classList.contains('question-intro'))return 0;
      const t=video.currentTime||0,duration=video.duration;
      const first=interviewAudioBounds?.firstSpeech??.45;
      const fadeInEnd=Math.max(.08,first-.04),fadeInStart=Math.max(0,fadeInEnd-.28);
      const incoming=audioSmooth((t-fadeInStart)/(fadeInEnd-fadeInStart));
      if(!Number.isFinite(duration))return incoming;
      const last=interviewAudioBounds?.lastSpeech??Math.max(0,duration-.55);
      const fadeOutStart=Math.min(last+.10,duration-.30);
      const fadeOutEnd=Math.min(fadeOutStart+.25,duration-.04);
      return Math.min(incoming,1-audioSmooth((t-fadeOutStart)/Math.max(.04,fadeOutEnd-fadeOutStart)));
    }
    function updateInterviewAudio(){
      cancelAnimationFrame(interviewAudioFrame);interviewAudioFrame=0;
      const target=Math.max(0,Math.min(1,interviewUserVolume*interviewAudioFactor()));
      if(Math.abs(video.volume-target)>.0001){interviewAppliedVolume=target;video.volume=target}
      updateEpilogueVisuals();
      updateInterviewEdgeVisuals();
      if(!video.paused&&!video.ended)interviewAudioFrame=requestAnimationFrame(updateInterviewAudio);
    }
    function configureInterviewAudio(media){
      cancelAnimationFrame(interviewAudioFrame);interviewAudioFrame=0;
      interviewAudioBounds=media?.speechBounds||null;interviewAppliedVolume=0;video.volume=0;
      interviewStartWash.hidden=false;interviewStartWash.style.background='#000';interviewStartWash.style.opacity='1';
    }
    video.addEventListener('volumechange',()=>{
      if(Math.abs(video.volume-interviewAppliedVolume)<.0001)return;
      interviewUserVolume=video.volume;updateInterviewAudio();
    });
    for(const event of ['play','playing','loadedmetadata','timeupdate','seeking','seeked','pause','ended'])video.addEventListener(event,updateInterviewAudio);

    function stopVideo(){cancelAnimationFrame(interviewAudioFrame);interviewAudioFrame=0;videoStarted=false;interviewAppliedVolume=0;video.volume=0;q('#interview-intro-caption').hidden=true;clearTimeout(questionScreenTimer);questionScreenTimer=null;questionScreenToken++;dialog.classList.remove('question-intro','question-playing','play-blocked');exitVideoFullscreen();video.pause();video.removeAttribute('src');video.removeAttribute('poster');video.replaceChildren();video.load();q('#interview-play').hidden=true}
    function openEpilogue(){openInterview(epilogueFilm,'epilogue')}
    let epilogueTransitioning=false,epilogueOverlay=null,epilogueEchoes=null,epilogueContours=null,epilogueOrigin=null;
    function syncEpilogueOverlay(){
      if(!epilogueOverlay||!epilogueEchoes)return;
      epilogueOverlay.setAttribute('viewBox',`0 0 ${width} ${height}`);
      const projected=depthEnabled?new Map([...threeSvg.querySelectorAll('.links[data-edge-index]')].map(path=>[Number(path.dataset.edgeIndex),path])):null;
      for(const [index,echo] of epilogueEchoes){const path=projected?projected.get(index):paths[index];if(path)echo.setAttribute('d',path.getAttribute('d'))}
      const contour=depthEnabled?threeSvg.querySelector('.three-volume.outer'):outerOutline;
      if(contour&&epilogueContours)for(const echo of epilogueContours)echo.setAttribute('d',contour.getAttribute('d'));
      if(epilogueOrigin){const center=depthEnabled?threeProjected[threeCenter.id]:{x:threeCenter.x*k+ox,y:threeCenter.y*k+oy};if(center){epilogueOrigin.setAttribute('cx',center.x);epilogueOrigin.setAttribute('cy',center.y)}}
    }
    async function transitionToEpilogue(){
      if(epilogueTransitioning)return;
      epilogueTransitioning=true;
      const motion=cameraMotion;
      if(!reducedMotion){
        const overlay=document.createElementNS(NS,'svg');overlay.setAttribute('class','epilogue-network');overlay.setAttribute('viewBox',`0 0 ${width} ${height}`);overlay.setAttribute('aria-hidden','true');
        const wash=document.createElement('div');wash.className='epilogue-wash';wash.setAttribute('aria-hidden','true');
        const source=depthEnabled?threeSvg:svg;
        epilogueOverlay=overlay;epilogueEchoes=new Map();
        const contour=depthEnabled?threeSvg.querySelector('.three-volume.outer'):outerOutline;
        epilogueContours=[];
        if(contour?.getAttribute('d'))for(let i=0;i<2;i++){const echo=document.createElementNS(NS,'path');echo.setAttribute('d',contour.getAttribute('d'));echo.setAttribute('class','epilogue-contour'+(i?' second':''));overlay.append(echo);epilogueContours.push(echo)}
        const route=createFullReveal(new Set(),null),routeViews=[];
        for(const path of source.querySelectorAll('.links')){
          if(getComputedStyle(path).display==='none')continue;
          const d=path.getAttribute('d');if(!d)continue;
          const index=Number(path.dataset.edgeIndex),edge=edges[index],length=path.getTotalLength();if(!edge||!length)continue;
          const echo=document.createElementNS(NS,'path');echo.setAttribute('d',d);echo.setAttribute('class','epilogue-link'+(path.classList.contains('core')?' core':''));
          echo.style.setProperty('animation','none','important');echo.style.setProperty('stroke','var(--accent)','important');echo.style.setProperty('opacity','0','important');
          epilogueEchoes.set(index,echo);
          const child=route.parentEdge[edge.source]===index?edge.source:route.parentEdge[edge.target]===index?edge.target:-1;
          const parent=child>=0?route.parentNode[child]:route.arrival[edge.source]<=route.arrival[edge.target]?edge.source:edge.target;
          const start=child>=0
            ?route.arrival[parent]+(parent===threeCenter.id?route.branchDelay[child]:0)
            :Math.max(route.arrival[edge.source],route.arrival[edge.target])+120+(index*71%420);
          echo.classList.add('trace');
          echo.style.setProperty('stroke-width',child>=0?'1.8':'1.35','important');
          echo.style.strokeDasharray=`${length} ${length}`;
          routeViews.push({echo,trace:true,length,reverse:edge.target===parent,start,duration:child>=0?Math.max(440,route.arrival[child]-start):620});
          overlay.append(echo);
        }
        epilogueOrigin=document.createElementNS(NS,'circle');epilogueOrigin.setAttribute('class','epilogue-origin');const center=depthEnabled?threeProjected[threeCenter.id]:{x:threeCenter.x*k+ox,y:threeCenter.y*k+oy};epilogueOrigin.setAttribute('cx',center.x);epilogueOrigin.setAttribute('cy',center.y);epilogueOrigin.setAttribute('r','6');overlay.append(epilogueOrigin);
        stage.classList.add('epilogue-tracing');
        stage.append(wash,overlay);
        const routeStart=performance.now();
        function drawRoute(now){
          if(!overlay.isConnected)return;
          const elapsed=now-routeStart;
          for(const view of routeViews){
            if(view.trace){
              const progress=smooth((elapsed-view.start)/view.duration);
              view.echo.style.strokeDashoffset=String((view.reverse?-1:1)*view.length*(1-progress));
              view.echo.style.setProperty('opacity',elapsed<view.start?'0':progress<1?'.96':'.46','important');
            }
          }
          requestAnimationFrame(drawRoute);
        }
        requestAnimationFrame(drawRoute);
        await new Promise(resolve=>setTimeout(resolve,6300));
        if(motion===cameraMotion){
          const white=document.createElement('div');white.className='epilogue-center-white';white.setAttribute('aria-hidden','true');
          (document.fullscreenElement||document.body).append(white);
          await new Promise(resolve=>setTimeout(resolve,3200));
          if(motion===cameraMotion){
            openEpilogue();overlay.classList.add('handoff');wash.classList.add('handoff');
            await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
          }
          white.remove();
          await new Promise(resolve=>setTimeout(resolve,500));
        }
        overlay.remove();wash.remove();stage.classList.remove('epilogue-tracing');if(epilogueOverlay===overlay){epilogueOverlay=null;epilogueEchoes=null;epilogueContours=null;epilogueOrigin=null}
      }
      epilogueTransitioning=false;
      if(reducedMotion&&motion===cameraMotion)openEpilogue();
    }
    function openInterview(n,mode='person'){return recordStep(()=>openInterviewStep(n,mode))}
    let epilogueMapView=null,epilogueMapAnchor=null,aligningEpilogueMap=false;
    function rememberEpilogueMapView(){
      const outline=depthEnabled?threeSvg.querySelector('.three-volume.outer'):null,box=outline?.getBBox();
      epilogueMapAnchor=box?{x:(box.x+box.width/2)/width,y:(box.y+box.height/2)/height}:null;
      epilogueMapView={k,fitK,ox,oy,width,height,threeYaw,threeElevation,threeZoom,threePanX,threePanY,autoCentered3D,scrollX:window.scrollX,scrollY:window.scrollY,rootScrollLeft:root.scrollLeft,rootScrollTop:root.scrollTop};
    }
    function restoreEpilogueMapView(){
      const view=epilogueMapView;if(!view)return;
      width=stage.clientWidth;height=stage.clientHeight;
      k=view.k;fitK=view.fitK;ox=view.ox+(width-view.width)/2;oy=view.oy+(height-view.height)/2;
      threeYaw=view.threeYaw;threeElevation=view.threeElevation;threeZoom=view.threeZoom;
      threePanX=view.threePanX;threePanY=view.threePanY;autoCentered3D=view.autoCentered3D;
      root.scrollLeft=view.rootScrollLeft;root.scrollTop=view.rootScrollTop;
      window.scrollTo({left:view.scrollX,top:view.scrollY,behavior:'instant'});render();
    }
    function positionEpilogueTitle(){
      const rect=stage.getBoundingClientRect(),inset=window.innerWidth<=700?12:18,leftInset=window.innerWidth<=700?12:20;
      dialog.style.setProperty('--epilogue-title-top',(rect.top+inset)+'px');
      dialog.style.setProperty('--epilogue-title-left',(rect.left+leftInset)+'px');
    }
    window.addEventListener('resize',positionEpilogueTitle);
    document.addEventListener('fullscreenchange',()=>requestAnimationFrame(positionEpilogueTitle));
    function openInterviewStep(n,mode='person'){
      if(mode==='epilogue'&&!dialog.open)rememberEpilogueMapView();
      currentQuestion=n;stopVideo();videoStarted=false;
      dialog.classList.add('question-cinema');
      interviewMode=mode;const isEpilogue=mode==='epilogue';q('#epilogue-collection').hidden=true;dialog.classList.toggle('epilogue-mode',isEpilogue);
      const content=q('#interview-content');
      content.removeAttribute('role');content.removeAttribute('aria-labelledby');content.removeAttribute('tabindex');
      const media=(window.FORUM_MEDIA||{})[isEpilogue?'epilogue/film':n.person+'/'+n.label]||{};
      q('#interview-person').textContent=n.person;
      q('#interview-profile').innerHTML=isEpilogue?'':profileHTML(n.person);
      const caption=q('#interview-intro-caption'),profile=(window.FORUM_PROFILES||{})[n.person];
      caption.hidden=true;
      caption.dataset.epiloguePerson='';
      caption.innerHTML=!isEpilogue&&profile?'<div class="intro-caption-heading"><strong>'+esc(n.person)+'</strong><span>'+esc(profile.role)+'</span></div>'+(profile.career?.length?'<p>'+profile.career.map(esc).join(' · ')+'</p>':''):'';

      q('#interview-chapter').textContent=isEpilogue?'에필로그':'';
      positionEpilogueTitle();
      q('#interview-title').textContent=isEpilogue?n.topic:media.title||n.topic||nodes[n.parent].label;
      const screenQuestions={'채길원/Q4':'김종영의 삶과 철학은 오늘날 창작과 조각교육에 어떤 의미를 갖는가?','채길원/Q5':'물질을 직접 다루는 경험은 세계를 이해하는 데 어떠한 영향을 미치는가?','권현빈/Q6':'무엇이 계속 작업하게 하는가?','권현빈/Q5':'직접 만드는 과정은 무엇을 새로 깨닫게 하는가?','권현빈/Q4':'창작 과정에서 물질 고유의 성질을 어떻게 대하는가?','서해영/Q6':'함께하는 창작과 작가 개인의 조각적 탐구는 어떻게 균형을 이루는가?','서해영/Q5':'함께 만드는 과정에서 참여자는 어떻게 창작의 주체가 되는가?','서해영/Q2':'개인의 창작에서 함께하는 창작으로 나아가게 된 계기는 무엇인가?','최지혜/Q5':'대중성과 예술적 실험 사이의 균형은 어떻게 이루어질 수 있는가?','최지혜/Q3':'공적 지원은 창작에 어떤 가능성과 한계를 만드는가?','최지혜/Q4':'개인의 창작은 사회와 만나며 어떻게 공공성을 갖게 되는가?','안정환/Q5':'서로 다른 주체가 함께하는 프로젝트에서 기획자는 어떤 역할을 하는가?','안정환/Q4':'작가와 기업 등 다양한 주체의 협업은 어떻게 이루어지는가?','민지희/Q3 후속질문':'직접 만들어본 경험은 건축 현장에서 판단을 내리는 데 어떤 영향을 미치는가?','민지희/Q5':'건축 설계에서 리서치는 어떻게 창작으로 이어지는가?','박재영/Q4':'창작자가 직접 만드는 플랫폼은 어떤 모습이며, 이를 모색하는 이유는 무엇인가?','박재영/Q2':'창작자의 활동은 어디까지 확장될 수 있는가?','강인애/Q5':'디지털 제작이 보편화된 오늘날, 손과 재료로 형태를 만들어 온 경험은 어떤 의미를 갖는가?','강인애/Q3':'예술과 산업, 대중문화의 경계가 흐려지며 문화콘텐츠가 확장되는 현상을 어떻게 바라보는가?','최고은/Q4':'물질을 직접 경험한다는 것은 무엇인가?','최고은/Q5':'조각은 왜 나의 ‘모국어’인가?','최고은/Q7':'오늘날 조각은 어떤 언어로 존재하는가?','류성실/Q5':'하나의 세계관을 다양한 매체로 전개하는 이유는 무엇인가?','류성실/Q6':'미술 제도와 대중문화, 온라인 플랫폼을 넘나들며 작업해 온 경험은 어떠했는가?'};
      q('#interview-question').textContent=screenQuestions[n.person+'/'+n.label]||n.question;
      q('#interview-concepts').replaceChildren();
      for(const id of (isEpilogue?[]:n.kind==='introduction'?children(n.parent).map(x=>x.id):ancestors(n.id)).filter(id=>['concept','subconcept'].includes(nodes[id].kind))){const t=document.createElement('span');t.textContent=nodes[id].label;q('#interview-concepts').append(t)}
      const src=assetURL(media.src);video.hidden=!src;q('#interview-play').hidden=!src;q('#video-empty').hidden=!!src;q('#video-error').hidden=true;
      q('#video-empty strong').textContent=isEpilogue?'에필로그 영상 준비 중':'영상 준비 중';
      q('#video-empty p').textContent=isEpilogue?'열 명의 답변을 엮은 통합 영상을 이곳에서 보실 수 있습니다.':'인터뷰 영상은 추후 공개됩니다.';
      if(src){configureInterviewAudio(media);video.src=src;const poster=assetURL(media.poster);if(poster)video.poster=poster;video.style.objectFit=media.fit==='cover'?'cover':'contain';video.style.objectPosition=media.position||'center';
        for(const [i,caption] of (media.captions||[]).entries()){const url=assetURL(caption.src);if(!url)continue;const track=document.createElement('track');track.kind='subtitles';track.label=caption.label||'한국어';track.srclang=caption.language||'ko';track.src=url;track.default=i===0;video.append(track);if(i===0)track.track.mode='showing'}
        video.load();
      }
      q('#transcript-section').hidden=!media.transcript;q('#transcript-section').open=false;q('#interview-transcript').textContent=media.transcript||'';
      const qs=isEpilogue?[epilogueFilm]:personQuestions(n.person),index=qs.findIndex(x=>x.id===n.id);
      const plannedStep=presentationMode&&!isEpilogue?cues.findIndex(c=>c.id===n.id):-1;
      q('#question-count').textContent=plannedStep>=0?'강연 단계 '+(plannedStep+1)+' / '+cues.length:(index+1)+' / '+qs.length;
      q('#question-prev').disabled=plannedStep>=0?plannedStep===0:index===0;q('#question-next').disabled=plannedStep>=0?plannedStep===cues.length-1:index===qs.length-1;
      q('#question-prev').textContent=plannedStep>=0?'이전 단계':'이전 질문';q('#question-next').textContent=plannedStep>=0?'다음 단계':'다음 질문';q('#question-next').hidden=presentationMode&&!isEpilogue;q('#interview-related').parentElement.hidden=isEpilogue;
      const related=n.kind==='introduction'?qs.slice(1):[...new Set(edges.filter(e=>e.kind!=='hierarchy'&&(e.source===n.id||e.target===n.id)).map(e=>e.source===n.id?e.target:e.source))].map(id=>nodes[id]).filter(x=>x.kind==='question');
      q('#interview-related').replaceChildren();
      if(!related.length){const t=document.createElement('span');t.textContent='지도의 다른 질문도 만나보세요.';q('#interview-related').append(t)}
      for(const other of related.slice(0,6)){const b=document.createElement('button');b.type='button';b.textContent=other.person+' · '+other.topic;b.addEventListener('click',()=>select(other.id));q('#interview-related').append(b)}
      q('#interview-stage-next').hidden=!presentationMode||isEpilogue||cueIndex>=cues.length-1;
      if(!dialog.open){
        const reference=q('#sequence-next').getBoundingClientRect(),nextButton=q('#interview-stage-next');
        nextButton.style.right=Math.max(0,document.documentElement.clientWidth-reference.right)+'px';
        nextButton.style.bottom=Math.max(0,window.innerHeight-reference.bottom-window.scrollY)+'px';
        dialog.showModal();
        if(!reducedMotion&&!isEpilogue)dialog.animate([{opacity:0},{opacity:1}],{duration:240,easing:'ease-out'});
      }
      dialog.scrollTop=0;
      dialog.classList.add('question-intro');
      q('#interview-stage-next').hidden=false;
      q('#interview-stage-next').title='인터뷰 영상 재생';
    }
    function updateIntroCaption(){
      const caption=q('#interview-intro-caption'),time=video.currentTime||0;
      let show=dialog.open&&!!video.getAttribute('src')&&videoStarted&&!video.ended&&!dialog.classList.contains('question-intro');
      if(interviewMode==='epilogue'){
        const item=(window.FORUM_MEDIA?.['epilogue/film']?.peopleTimeline||[]).find(item=>time>=item.start&&time<item.end);
        const profile=item&&window.FORUM_PROFILES?.[item.person];
        show=show&&!!profile;
        if(show&&(caption.dataset.epiloguePerson!==item.person||!caption.textContent)){
          caption.dataset.epiloguePerson=item.person;
          caption.innerHTML='<div class="intro-caption-heading"><strong>'+esc(item.person)+'</strong><span>'+esc(profile.role)+'</span></div>'+(profile.career?.length?'<p>'+profile.career.map(esc).join(' · ')+'</p>':'');
        }
      }else{
        caption.dataset.epiloguePerson='';
        show=show&&!!currentQuestion?.person&&time<(window.FORUM_MEDIA?.[currentQuestion.person+'/'+currentQuestion.label]?.introEnd??(7+(window.FORUM_MEDIA?.[currentQuestion.person+'/'+currentQuestion.label]?.timelineOffset||0)));
      }
      caption.hidden=!show;
    }
    for(const event of ['playing','timeupdate','seeked','pause','ended','loadedmetadata'])video.addEventListener(event,updateIntroCaption);
    const epilogueVideoWash=document.createElement('div');
    epilogueVideoWash.className='epilogue-video-wash';epilogueVideoWash.setAttribute('aria-hidden','true');epilogueVideoWash.hidden=true;
    q('.interview-media').append(epilogueVideoWash);
    const interviewStartWash=document.createElement('div');
    interviewStartWash.className='interview-start-wash';interviewStartWash.setAttribute('aria-hidden','true');interviewStartWash.hidden=true;
    q('.interview-media').append(interviewStartWash);
    function updateInterviewEdgeVisuals(){
      const time=video.currentTime||0,duration=video.duration;
      const last=interviewAudioBounds?.lastSpeech??Math.max(0,(duration||0)-.6);
      const fadeOutStart=Math.min(last+.06,(duration||0)-.35);
      const outgoing=interviewMode!=='epilogue'&&Number.isFinite(duration)?audioSmooth((time-fadeOutStart)/Math.max(.08,duration-.04-fadeOutStart)):0;
      const active=dialog.open&&!!video.getAttribute('src')&&(!videoStarted||time<1.25||outgoing>0);
      interviewStartWash.hidden=!active;
      if(!active)return;
      const incoming=!videoStarted?1:1-audioSmooth((time-.12)/1.13);
      interviewStartWash.style.background='#000';
      interviewStartWash.style.opacity=String(Math.max(incoming,outgoing));
    }
    function updateEpilogueVisuals(){
      const active=interviewMode==='epilogue'&&dialog.open&&videoStarted&&!dialog.classList.contains('question-intro');
      epilogueVideoWash.hidden=!active;
      if(!active)return;
      const time=video.currentTime||0,duration=video.duration;
      const outgoing=Number.isFinite(duration)?audioSmooth((time-(duration-3.4))/3.4):0;
      const light=outgoing;
      epilogueVideoWash.style.opacity='1';
      epilogueVideoWash.style.setProperty('--epilogue-light-opacity',String(light));
      epilogueVideoWash.style.setProperty('--epilogue-light-scale',String(.02+light*2.48));
      epilogueVideoWash.style.setProperty('--epilogue-light-fill',String(audioSmooth((light-.48)/.52)));
      updateIntroCaption();
    }
    function changeQuestion(delta){if(!currentQuestion)return;if(interviewMode==='epilogue')return;const plannedStep=presentationMode?cues.findIndex(c=>c.id===currentQuestion.id):-1;if(plannedStep>=0){runCue(plannedStep+delta);return}const qs=personQuestions(currentQuestion.person),index=qs.findIndex(x=>x.id===currentQuestion.id),next=qs[index+delta];if(next){if(next.kind==='introduction')openInterview(next);else select(next.id)}}
    q('#question-prev').addEventListener('click',()=>changeQuestion(-1));q('#question-next').addEventListener('click',()=>changeQuestion(1));
    function closeInterview(){recordStep(()=>{
      const returningToEpilogueMap=dialog.open&&interviewMode==='epilogue';
      if(dialog.open)interviewClosedAt=performance.now();stopVideo();dialog.close();
      if(returningToEpilogueMap){
        q('#forum-fit').focus({preventScroll:true});restoreEpilogueMapView();
        const returnMotion=cameraMotion,returnCue=cueIndex,returnView=epilogueMapView;
        const canRestore=()=>!dialog.open&&cueIndex===returnCue&&cameraMotion===returnMotion&&epilogueMapView===returnView;
        requestAnimationFrame(()=>{if(canRestore())restoreEpilogueMapView();requestAnimationFrame(()=>{if(canRestore())restoreEpilogueMapView();if(epilogueMapView===returnView)epilogueMapView=null})});
      }
    })}
    q('#interview-close').addEventListener('click',closeInterview);dialog.addEventListener('close',()=>{if(!dialog.open)stopVideo()});dialog.addEventListener('cancel',e=>{e.preventDefault();closeInterview()});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeInterview()}});
    video.addEventListener('error',()=>{if(video.getAttribute('src'))q('#video-error').hidden=false});
    q('#interview-play').addEventListener('click',()=>{
      if(!video.getAttribute('src'))return;
      if(dialog.classList.contains('question-cinema')){dialog.classList.remove('question-intro','play-blocked');dialog.classList.add('question-playing');clearTimeout(questionScreenTimer)}
      else if(typeof video.requestFullscreen==='function')video.requestFullscreen().catch(()=>{});
      else if(typeof video.webkitEnterFullscreen==='function')video.webkitEnterFullscreen();
      video.play().catch(()=>{});
    });
    video.addEventListener('play',async()=>{
      videoStarted=true;q('#interview-play').hidden=true;
      if(dialog.classList.contains('question-cinema')){dialog.classList.remove('question-intro','play-blocked');dialog.classList.add('question-playing');return}
      if(!video.getAttribute('src')||document.fullscreenElement===video||video.webkitDisplayingFullscreen)return;
      try{
        if(typeof video.requestFullscreen==='function')await video.requestFullscreen();
        else if(typeof video.webkitEnterFullscreen==='function')video.webkitEnterFullscreen();
      }catch{
        try{if(typeof video.webkitEnterFullscreen==='function')video.webkitEnterFullscreen()}catch{}
      }
    });
    video.addEventListener('ended',async()=>{
      if(interviewMode==='epilogue'&&dialog.classList.contains('question-cinema')){
        updateEpilogueVisuals();const token=questionScreenToken;
        await new Promise(resolve=>setTimeout(resolve,350));
        if(!dialog.open||token!==questionScreenToken||!video.ended)return;
        const reveal=document.createElement('div');reveal.className='epilogue-center-white epilogue-map-reveal';reveal.setAttribute('aria-hidden','true');
        (document.fullscreenElement||document.body).append(reveal);
        const returnMotion=cameraMotion;
        closeInterview();
        await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
        if(!dialog.open&&cameraMotion===returnMotion&&!prologueOpen&&q('.intro').hidden){startEpilogueRoam();reveal.classList.add('revealing');}
        else{reveal.remove();return;}
        if(!reducedMotion)await new Promise(resolve=>setTimeout(resolve,2400));
        reveal.remove();return;
      }
      if(dialog.classList.contains('question-cinema')){
        const token=questionScreenToken;updateInterviewEdgeVisuals();
        await new Promise(resolve=>setTimeout(resolve,220));
        if(dialog.open&&token===questionScreenToken&&video.ended)closeInterview();return;
      }exitVideoFullscreen();q('#interview-play').hidden=false
    });
    q('.detail-close').addEventListener('click',()=>recordStep(()=>{panel.hidden=true}));
    function updateCue(){const start=prologueSlides.length+1;q('#sequence-count').textContent=prologueOpen?'프롤로그':cues[cueIndex]?.overview?'지형도':Math.max(0,cueIndex-start+1)+' / '+(cues.length-start);q('#sequence-label').textContent=cueIndex<0?'프롤로그부터 시작':selected!==null&&cues[cueIndex]?.id!==selected?displayLabel(nodes[selected]):cues[cueIndex].label;q('#sequence-prev').disabled=cueIndex<0||(prologueOpen&&cueIndex===0);q('#sequence-next').disabled=cueIndex>=cues.length-1;q('#sequence-prev').title=cueIndex>0?'이전: '+cues[cueIndex-1].label:'이전 단계가 없습니다';q('#sequence-next').title=cueIndex<cues.length-1?'다음: '+cues[cueIndex+1].label:'다음 단계가 없습니다';q('#interview-stage-next').hidden=!(dialog.open&&dialog.classList.contains('question-intro'))&&(!presentationMode||prologueOpen||cueIndex>=cues.length-1);q('#interview-stage-next').title=cueIndex<cues.length-1?'다음: '+cues[cueIndex+1].label:'다음 단계가 없습니다'}
    function runCue(index){return recordStep(()=>runCueStep(index))}
    function runCueStep(index){
      stopEpilogueRoam();
      epilogueMapAnchor=null;
      if(pendingCueTimer){clearTimeout(pendingCueTimer);pendingCueTimer=null}
      const nextIndex=Math.max(-1,Math.min(cues.length-1,index));
      const upcomingCue=cues[nextIndex];
      if(dialog.open)closeInterview();
      if(nextIndex>cueIndex&&upcomingCue&&interviewClosedAt){
        const remaining=2000-(performance.now()-interviewClosedAt);
        if(remaining>0){
          const waitingAt=cueIndex;
          pendingCueTimer=setTimeout(()=>{pendingCueTimer=null;if(cueIndex===waitingAt&&!dialog.open){interviewClosedAt=0;runCue(nextIndex)}},remaining);
          return;
        }
        interviewClosedAt=0;
      }
      cueIndex=nextIndex;
      const cue=cues[cueIndex];
      if(cue&&Number.isInteger(cue.prologue)){
        cameraMotion++;fullReveal=null;stage.classList.remove('guided-transition');activeRoute?.remove();activeRoute=null;interviewClosedAt=0;selected=null;
        expanded.clear();updateVisible();fit();showDetail(null);
        setPrologueView(cue.prologue,true);updateCue();save();q('#map-status').textContent=cue.label;return;
      }
      const leavingPrologue=prologueOpen;
      setPrologueView(null);
      if(leavingPrologue){selected=null;expanded.clear();updateVisible();autoCentered3D=depthEnabled;threePanX=0;threePanY=0;threeZoom=1;idleYaw=0;idleElevation=0;fit()}
      if(!cue){cameraMotion++;selected=null;expanded.clear();updateVisible();showDetail(null);fit();updateCue();save();return}
      if(cue.overview){cameraMotion++;selected=null;expanded.clear();updateVisible();showDetail(null);fit();updateCue();save();q('#map-status').textContent=cue.label;return}
      if(cue.epilogue&&points.every(n=>visible.has(n.id))){
        stage.classList.remove('guided-transition');activeRoute?.remove();activeRoute=null;
        if(selected!==null){selected=null;showDetail(null);render()}
        updateCue();save();transitionToEpilogue();return;
      }
      if(cue.all||cue.epilogue){
        cameraMotion++;stage.classList.remove('guided-transition');activeRoute?.remove();activeRoute=null;const before=new Set(visible),anchorPerson=selected!==null?nodes[selected].person:'채길원';selected=null;expanded=new Set(nodes.filter(n=>n.kind!=='question').map(n=>n.id));fullReveal=!reducedMotion?createFullReveal(before,anchorPerson):null;updateVisible();fitWholeConnection();showDetail(null);animateNodes(before);updateCue();save();
        if(cue.epilogue)transitionToEpilogue();
        return;
      }
      expanded.clear();
      for(let i=0;i<=cueIndex;i++){
        const prior=cues[i];
        if(prior.all||prior.epilogue||prior.overview||Number.isInteger(prior.prologue))continue;
        for(const id of ancestors(prior.id))if(children(id).length)expanded.add(id);
      }
      applyingCue=true;
      try{selectStep(cue.id)}finally{applyingCue=false}
      updateCue();
    }
    q('#interview-stage-next').addEventListener('click',()=>{
      if(dialog.open&&dialog.classList.contains('question-intro')){
        dialog.classList.remove('question-intro','play-blocked');dialog.classList.add('question-playing');
        q('#interview-stage-next').hidden=interviewMode==='epilogue'||!presentationMode||cueIndex>=cues.length-1;
        if(video.getAttribute('src'))video.play().catch(()=>{dialog.classList.add('play-blocked');q('#interview-play').hidden=false});
        return;
      }
      if(!presentationMode||cueIndex>=cues.length-1)return;
      if(dialog.open&&video.getAttribute('src')&&!videoStarted){
        if(dialog.classList.contains('question-cinema')){dialog.classList.add('question-playing');dialog.classList.remove('play-blocked');video.play().catch(()=>{dialog.classList.add('play-blocked');q('#interview-play').hidden=false});return}
        try{
          if(typeof video.requestFullscreen==='function')video.requestFullscreen().catch(()=>{});
          else if(typeof video.webkitEnterFullscreen==='function')video.webkitEnterFullscreen();
        }catch{}
        video.play().catch(()=>{});
        return;
      }
      runCue(cueIndex+1);
    });
    q('#sequence-next').addEventListener('click',()=>runCue(cueIndex+1));q('#sequence-prev').addEventListener('click',()=>runCue(cueIndex-1));
    function showAll(){return recordStep(()=>{setPrologueView(null);if(pendingCueTimer){clearTimeout(pendingCueTimer);pendingCueTimer=null}interviewClosedAt=0;cameraMotion++;stage.classList.remove('guided-transition');activeRoute?.remove();activeRoute=null;const before=new Set(visible),anchorPerson=selected!==null?nodes[selected].person:'채길원';selected=null;cueIndex=cues.findIndex(c=>c.all);expanded=new Set(nodes.filter(n=>n.kind!=='question').map(n=>n.id));fullReveal=!reducedMotion?createFullReveal(before,anchorPerson):null;updateVisible();fitWholeConnection();showDetail(null);animateNodes(before);updateCue();save()})}
    function reset(startAtPrologue=true){return recordStep(()=>{setPrologueView(null);if(pendingCueTimer){clearTimeout(pendingCueTimer);pendingCueTimer=null}interviewClosedAt=0;cameraMotion++;stage.classList.remove('guided-transition');activeRoute?.remove();activeRoute=null;selected=null;cueIndex=-1;expanded.clear();updateVisible();fit();showDetail(null);if(startAtPrologue!==false&&presentationMode&&prologueSlides.length&&q('.intro').hidden)runCue(0);updateCue();save()})}
    function enter(mode){recordStep(()=>{if(mode!=='resume'){presentationMode=mode==='presentation';reset(false);threePanX=0;threeZoom=1;idleYaw=0;idleElevation=0}q('.sequence-controls').hidden=!presentationMode;q('.map-shell').classList.toggle('explore',!presentationMode);q('.map-shell').inert=false;q('.intro').inert=true;q('.intro').hidden=true;if(mode!=='resume'){width=stage.clientWidth;height=stage.clientHeight;autoCentered3D=depthEnabled;threePanY=0;fit()}if(mode==='presentation'&&prologueSlides.length)runCue(0);else if(mode==='resume'){setPrologueView(cues[cueIndex]?.prologue);updateCue()}if(!reducedMotion)q('.map-shell').animate([{opacity:0},{opacity:1}],{duration:250,easing:'ease-out'});q(presentationMode?'#sequence-next':'#forum-fit').focus({preventScroll:true});save()})}
    q('#intro-next').addEventListener('click',()=>enter('presentation'));q('#intro-fullscreen').addEventListener('click',()=>q('#forum-fullscreen').click());
    // Empty-space clicks share the existing stage controls; panning never advances.
    let blankPointer=null,lastBlankStepAt=0;
    const blankExcluded='button,a,input,textarea,select,video,audio,summary,[role=button],[contenteditable=true],.detail-panel,.header,.sequence-controls,.interview-history,.node-label,.area-heading,h1,h2,h3,p,strong,span,small';
    function isBlankStepTarget(target){
      if(!(target instanceof Element)||target.closest(blankExcluded))return false;
      if(dialog.open)return dialog.classList.contains('question-intro')&&dialog.contains(target);
      if(!q('.intro').hidden)return q('.intro').contains(target);
      return presentationMode&&stage.contains(target);
    }
    root.addEventListener('pointerdown',e=>{
      blankPointer=isBlankStepTarget(e.target)&&e.isPrimary&&(e.button===0||e.button===2)?{id:e.pointerId,x:e.clientX,y:e.clientY,moved:false}:null;
    },true);
    root.addEventListener('pointermove',e=>{if(blankPointer?.id===e.pointerId&&Math.hypot(e.clientX-blankPointer.x,e.clientY-blankPointer.y)>6)blankPointer.moved=true},true);
    root.addEventListener('pointercancel',()=>{blankPointer=null},true);
    function moveFromBlank(e,direction){
      if(!isBlankStepTarget(e.target)||e.ctrlKey||e.metaKey||e.altKey||e.shiftKey)return;
      if(direction<0)e.preventDefault();
      if(!blankPointer||blankPointer.moved||Math.hypot(e.clientX-blankPointer.x,e.clientY-blankPointer.y)>6||performance.now()-lastBlankStepAt<350)return;
      const control=!q('.intro').hidden?(direction>0?q('#intro-next'):null):dialog.open?(direction>0?q('#interview-stage-next'):q('#sequence-prev')):q(direction>0?'#sequence-next':'#sequence-prev');
      if(!control||control.disabled||control.hidden)return;
      lastBlankStepAt=performance.now();blankPointer=null;control.click();
    }
    root.addEventListener('click',e=>{if(e.button===0&&e.detail===1)moveFromBlank(e,1)});
    root.addEventListener('contextmenu',e=>moveFromBlank(e,-1));
    q('#forum-home').addEventListener('click',()=>recordStep(()=>{cameraMotion++;if(pendingCueTimer){clearTimeout(pendingCueTimer);pendingCueTimer=null}q('.intro').hidden=false;q('.intro').inert=false;q('.map-shell').inert=true;q('#intro-next').focus()}));
    q('#forum-fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await root.requestFullscreen()}catch{q('#map-status').textContent='이 브라우저에서는 전체 화면을 사용할 수 없습니다.'}});
    document.addEventListener('fullscreenchange',()=>{q('#forum-fullscreen').textContent=document.fullscreenElement?'전체 화면 닫기':'전체 화면';q('#intro-fullscreen').textContent=document.fullscreenElement?'전체 화면 닫기':'전체 화면'});
    document.addEventListener('keydown',e=>{if(e.defaultPrevented||e.ctrlKey||e.metaKey||e.altKey||e.target.closest('input,textarea,select,video,[contenteditable=true],[role=tab]'))return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();moveStep(e.key==='ArrowRight'?1:-1)}else if(presentationMode&&!dialog.open&&q('.intro').hidden&&(e.key==='PageDown'||e.key==='PageUp')){e.preventDefault();runCue(cueIndex+(e.key==='PageDown'?1:-1))}else if(e.key==='Escape'&&!dialog.open)recordStep(()=>{panel.hidden=true})});
    function snapshotStep(){
      return {selected,expanded:[...expanded].sort((a,b)=>a-b),cueIndex,presentationMode,prologue:prologueOpen?prologueIndex:null,introOpen:!q('.intro').hidden,panelOpen:!panel.hidden,personTab:!panel.hidden&&nodes[selected]?.kind==='person'?(detail.querySelector('[data-person-tab][aria-selected=true]')?.dataset.personTab||'intro'):'intro',interview:dialog.open&&currentQuestion?{id:currentQuestion.id,kind:currentQuestion.kind,person:currentQuestion.person,mode:interviewMode}:null,camera:{k,x:(width/2-ox)/k,y:(height/2-oy)/k},panelScroll:panel.scrollTop,dialogScroll:dialog.scrollTop};
    }
    function stepSignature(s){const {panelScroll,dialogScroll,...navigation}=s;return JSON.stringify(navigation)}
    function recordStep(action){
      if(restoringStep||stepDepth||stepIndex<0)return action();
      stepHistory[stepIndex]=snapshotStep();const before=stepSignature(stepHistory[stepIndex]);
      stepDepth++;try{return action()}finally{stepDepth--;const after=snapshotStep();if(stepSignature(after)!==before){stepHistory=stepHistory.slice(0,stepIndex+1);stepHistory.push(after);stepIndex++}updateStepControls()}
    }
    function resetStepHistory(){stepHistory=[snapshotStep()];stepIndex=0;updateStepControls()}
    function stepLabel(s){if(s.introOpen)return '시작 화면';if(Number.isInteger(s.prologue))return '프롤로그 · '+prologueSlides[s.prologue].title;if(s.interview)return (s.interview.mode==='epilogue'?'에필로그 · ':'')+s.interview.person+' · '+(s.interview.kind==='introduction'?'자기소개 영상':s.interview.mode==='epilogue'?'교육 인터뷰':nodes[s.interview.id]?.label+' 인터뷰');if(s.selected!==null)return (nodes[s.selected].kind==='person'?nodes[s.selected].label+' · '+(s.personTab==='concepts'?'주요 개념':'인물 소개'):displayLabel(nodes[s.selected]));return s.cueIndex>=0?cues[s.cueIndex].label:'주제 선택'}
    function updateStepControls(){
      root.querySelectorAll('[data-history]').forEach(button=>{const delta=Number(button.dataset.history),target=stepIndex+delta;button.disabled=target<0||target>=stepHistory.length;button.title=button.disabled?(delta<0?'이전 단계가 없습니다':'다음 방문 단계가 없습니다'):(delta<0?'뒤로가기: ':'앞으로가기: ')+stepLabel(stepHistory[target])});
      root.querySelectorAll('[data-history-count]').forEach(label=>{label.textContent=stepIndex>0||stepHistory.length>1?stepIndex+' / '+(stepHistory.length-1):''});
      q('#cue-label').textContent=stepHistory[stepIndex]?stepLabel(stepHistory[stepIndex]):'주제 선택';q('#cue-count').textContent=stepIndex+' / '+Math.max(0,stepHistory.length-1);
    }
    function moveStep(delta){
      cameraReadingNode=null;const target=stepIndex+delta;if(target<0||target>=stepHistory.length)return;if(pendingCueTimer){clearTimeout(pendingCueTimer);pendingCueTimer=null}interviewClosedAt=0;cameraMotion++;stage.classList.remove('guided-transition');activeRoute?.remove();activeRoute=null;
      stepHistory[stepIndex]=snapshotStep();stepIndex=target;const s=stepHistory[stepIndex],before=new Set(visible);restoringStep=true;
      try{
        if(dialog.open)closeInterview();
        selected=s.selected;expanded=new Set(s.expanded);cueIndex=s.cueIndex;presentationMode=s.presentationMode;updateVisible();q('.intro').hidden=!s.introOpen;q('.intro').inert=!s.introOpen;q('.map-shell').inert=s.introOpen;
        k=s.camera.k;ox=width/2-s.camera.x*k;oy=height/2-s.camera.y*k;
        showDetail(s.panelOpen&&selected!==null?nodes[selected]:null,false);
        if(s.panelOpen&&nodes[selected]?.kind==='person')detail.querySelector('[data-person-tab="'+s.personTab+'"]')?.click();
        q('.sequence-controls').hidden=!presentationMode;q('.map-shell').classList.toggle('explore',!presentationMode);if(depthEnabled)autoCentered3D=true;render();setPrologueView(s.prologue);updateCue();animateNodes(before);panel.scrollTop=s.panelScroll;
        if(s.interview){const item=s.interview.kind==='epilogue'?epilogueFilm:s.interview.kind==='introduction'?introduction(points.find(n=>n.kind==='person'&&n.label===s.interview.person)):nodes[s.interview.id];if(item){openInterview(item,s.interview.mode);dialog.scrollTop=s.dialogScroll}}
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
    const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)};
    function createFullReveal(before,anchorPerson){
      const distance=nodes.map(()=>Infinity),parentEdge=nodes.map(()=>-1),parentNode=nodes.map(()=>-1),used=new Set();
      distance[threeCenter.id]=0;
      for(let count=0;count<nodes.length;count++){
        let u=-1;for(const n of nodes)if(!used.has(n.id)&&(u<0||distance[n.id]<distance[u]))u=n.id;
        if(u<0||!Number.isFinite(distance[u]))break;used.add(u);
        for(const [index,e] of edges.entries()){
          if(thinnedCrossEdges.has(index))continue;
          const v=e.source===u?e.target:e.target===u?e.source:-1;if(v<0||used.has(v))continue;
          const length=Math.hypot(nodes[u].x-nodes[v].x,nodes[u].y-nodes[v].y);
          const next=distance[u]+120+Math.pow(length,.7);
          if(next<distance[v]){distance[v]=next;parentEdge[v]=index;parentNode[v]=u}
        }
      }
      const finite=distance.filter(Number.isFinite),maximum=Math.max(...finite,1);
      const branches=nodes.filter(n=>parentNode[n.id]===threeCenter.id).sort((a,b)=>Math.atan2(a.y-threeCenter.y,a.x-threeCenter.x)-Math.atan2(b.y-threeCenter.y,b.x-threeCenter.x));
      const branchDelay=nodes.map(n=>{let id=n.id;while(parentNode[id]>=0&&parentNode[id]!==threeCenter.id)id=parentNode[id];const rank=branches.findIndex(branch=>branch.id===id);return rank<0?0:rank/Math.max(1,branches.length-1)*650});
      const arrival=distance.map((value,id)=>id===threeCenter.id?0:Number.isFinite(value)?300+value/maximum*2700+branchDelay[id]:300+Math.hypot(nodes[id].x-threeCenter.x,nodes[id].y-threeCenter.y)/1200*2700);
      return {before,anchorPerson,start:performance.now(),arrival,parentEdge,parentNode,branchDelay};
    }
    function fullRevealAmount(x,y){
      if(!fullReveal)return 1;
      const distance=Math.hypot(x-threeCenter.x,y-threeCenter.y);
      return smooth((performance.now()-fullReveal.start-850-distance/1200*1300)/2300);
    }
    function fullRevealCore(){return fullReveal?smooth((performance.now()-fullReveal.start-900)/2600):1}
    function fullRevealNode(n){
      if(!fullReveal||n.person===fullReveal.anchorPerson||n.kind==='chapter'&&n.chapter===5)return 1;
      const amount=smooth((performance.now()-fullReveal.start-fullReveal.arrival[n.id])/300);
      return fullReveal.before.has(n.id) ? .12+.88*amount : amount;
    }
    function fullRevealEdge(e,index){
      if(!fullReveal)return {opacity:1,progress:1,reverse:false,trace:false};
      const a=nodes[e.source],b=nodes[e.target];
      if(a.person===fullReveal.anchorPerson&&b.person===fullReveal.anchorPerson)return {opacity:1,progress:1,reverse:false,trace:false};
      const elapsed=performance.now()-fullReveal.start;
      const child=fullReveal.parentEdge[e.source]===index?e.source:fullReveal.parentEdge[e.target]===index?e.target:-1;
      if(child>=0){const parent=fullReveal.parentNode[child],start=fullReveal.arrival[parent]+(parent===threeCenter.id?fullReveal.branchDelay[child]:0),end=fullReveal.arrival[child];return {opacity:1,progress:smooth((elapsed-start)/Math.max(360,end-start)),reverse:e.target===parent,trace:true}}
      const amount=smooth((elapsed-Math.max(fullReveal.arrival[e.source],fullReveal.arrival[e.target])-(index*71%420))/700);
      return {opacity:amount,progress:1,reverse:false,trace:false};
    }
    const threeHeight=n=>({chapter:0,person:120,concept:210,subconcept:300,question:355})[n.kind]+(n.coreLayout?40:0);
    const zoomLabelFallback=(x,y,w,h)=>({x:w>width-16?Math.min(width-8,x+12):Math.max(8,Math.min(width-w-8,x+12)),y:Math.max(8,Math.min(height-h-8,y-h/2)),w,h});
    for(const n of nodes){
      const b=document.createElement('button');b.type='button';b.className='three-node cursor-interaction '+(n.kind==='chapter'?'area-heading'+(n.chapter===5?' core':''):'dot '+n.kind);
      b.setAttribute('aria-label',kindNames[n.kind]+' '+(n.person&&n.kind!=='person'?n.person+' / ':'')+(n.question||n.label));b.title=n.question||displayLabel(n);
      if(n.kind==='chapter')b.innerHTML='<span class="chapter-number">제'+esc(n.chapter)+'장</span><strong>'+esc(n.label)+'</strong><small hidden>'+esc(n.subtitle)+'</small>';
      else{b.style.setProperty('--diameter',({person:6.5,concept:4.2,subconcept:3,question:3.5})[n.kind]+'px');const mark=document.createElement('span');mark.className='node-mark';const label=document.createElement('span');label.className='node-label '+n.kind;const labelText=document.createElement('span');labelText.className='node-label-text';labelText.textContent=n.label;label.append(labelText);appendPersonMetadata(label,n);b.append(mark,label)}
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
      const reveal=fullReveal;
      const revealAmount=(x,y)=>fullRevealAmount(x,y);
      const nodeReveal=n=>fullRevealNode(n);
      const setRevealOpacity=(element,n)=>{if(reveal&&n.person!==reveal.anchorPerson)element.style.setProperty('opacity',String(nodeReveal(n)),'important');else element.style.removeProperty('opacity')};
      const focusedPerson=selected!==null&&nodes[selected].kind!=='chapter'?nodes[selected].person:null;
      const personChapter=focusedPerson!==null?nodes[selected].chapter:null;
      const activeChapter=selected!==null&&nodes[selected].kind==='chapter'?nodes[selected].chapter:null;
      const branchKeep=focusedBranchNodes(focusedPerson);
      stage.classList.toggle('chapter-focus',activeChapter!==null);
      stage.classList.toggle('high-zoom-labels',threeZoom>=3);
      const contextIds=readingContext(),contextSet=new Set(contextIds||[]);
      threeScene.style.setProperty('--three-label-zoom',Math.max(selected!==null&&nodes[selected].person?1.4:1,labelZoom(threeZoom)).toFixed(2));
      threeSvg.setAttribute('viewBox',`0 0 ${width} ${height}`);
      const rawXYZ=(x,y,z)=>{x-=threeCenter.x;y-=threeCenter.y;const c=Math.cos(threeYaw+idleYaw),s=Math.sin(threeYaw+idleYaw),u=x*c-y*s,v=x*s+y*c,ce=Math.cos(threeElevation+idleElevation),se=Math.sin(threeElevation+idleElevation),d=v*ce-z*se,p=3200/Math.max(1200,3200+d);return {x:u*p,y:(v*se-z*ce)*p,d,p}};
      const boundaryPoints=path=>{if(path.style.display==='none')return [];const length=path.getTotalLength();if(!length)return [];return Array.from({length:64},(_,i)=>{const p=path.getPointAtLength(length*i/64);return [(p.x-ox)/k,(p.y-oy)/k]})};
      const allConnected=points.every(n=>visible.has(n.id));
      const outerBoundary=boundaryPoints(outerOutline),coreBoundary=allConnected?boundaryPoints(areas.get(threeCenter.id).region):[];
      const base=nodes.map(n=>rawXYZ(n.x,n.y,threeHeight(n)));
      for(const p of outerBoundary)base.push(rawXYZ(p[0],p[1],190));
      for(const p of coreBoundary)base.push(rawXYZ(p[0],p[1],210));
      if(outerBoundary.length)base.push(rawXYZ(threeCenter.x,threeCenter.y,510),rawXYZ(threeCenter.x,threeCenter.y,-110));
      let minx=Math.min(...base.map(p=>p.x)),maxx=Math.max(...base.map(p=>p.x)),miny=Math.min(...base.map(p=>p.y)),maxy=Math.max(...base.map(p=>p.y));
      // Labels and outline shapes may change during a cue; they must not refit the camera.
      if(selected!==null&&readingProjectionBounds&&readingProjectionBounds.yaw===threeYaw&&readingProjectionBounds.elevation===threeElevation){
        ({minx,maxx,miny,maxy}=readingProjectionBounds);
      }
      lastProjectionBounds={minx,maxx,miny,maxy,yaw:threeYaw,elevation:threeElevation};
      const cameraNode=selected!==null?nodes[cameraReadingNode??selected]:threeCenter;
      const centerPoint=rawXYZ(cameraNode.x,cameraNode.y,threeHeight(cameraNode));
      const scale=Math.min((width-100)/Math.max(1,maxx-minx),(height-100)/Math.max(1,maxy-miny),1.35)*threeZoom;
      const midx=(minx+maxx)/2,midy=(miny+maxy)/2;
      if(autoCentered3D){threePanX=(midx-centerPoint.x)*scale;threePanY=(midy-centerPoint.y)*scale}
      if(epilogueRoam?.focus){
        const roam=epilogueRoam,focus=roam.focus,aim=rawXYZ(focus.x,focus.y,focus.z),weight=focus.weight,ratio=threeZoom/roam.zoom;
        threePanX=roam.panX*width*ratio*(1-weight)+(midx-aim.x)*scale*weight;
        threePanY=roam.panY*height*ratio*(1-weight)+(midy-aim.y)*scale*weight;
      }
      const project=(x,y,z=0)=>{const p=rawXYZ(x,y,z);return {x:width/2+threePanX+(p.x-midx)*scale,y:height/2+threePanY+(p.y-midy)*scale,d:p.d}};
      const pos=nodes.map(n=>project(n.x,n.y,threeHeight(n)));
      threeProjected=pos;
      const volume=(boundary,kind,bottom,top)=>{
        if(!boundary.length)return '';
        const cx=threeCenter.x,cy=threeCenter.y;
        const levels=[[-1,.08],[-.82,.52],[-.45,.86],[0,1],[.45,.86],[.82,.52],[1,.08]];
        const rings=levels.map(([unit,radius])=>boundary.map(([x,y])=>project(cx+(x-cx)*radius,cy+(y-cy)*radius,(bottom+top)/2+unit*(top-bottom)/2)));
        return `<path class="three-volume ${kind}" d="${softPath(rings.flat().map(p=>[p.x,p.y]))}"/>`;
      };
      let ground=`<defs><radialGradient id="three-outer-shade" cx="35%" cy="28%" r="78%"><stop offset="0" style="stop-color:var(--secondary);stop-opacity:.01"/><stop offset="1" style="stop-color:var(--secondary);stop-opacity:.08"/></radialGradient><radialGradient id="three-core-shade" cx="33%" cy="25%" r="76%"><stop offset="0" style="stop-color:var(--accent);stop-opacity:.03"/><stop offset="1" style="stop-color:var(--accent);stop-opacity:.15"/></radialGradient></defs>`,stems='';
      ground+=volume(outerBoundary,'outer',-110,510);
      if(allConnected)ground+=`<g opacity="${fullRevealCore()}">${volume(coreBoundary,'core',-45,450)}</g>`;
       for(const n of points){if(!visible.has(n.id))continue;const a=pos[n.id],b=project(n.x,n.y),opacity=nodeReveal(n);stems+=`<g opacity="${opacity}"><path class="three-stem${activeChapter!==null&&n.chapter!==activeChapter?' chapter-past':''}${focusedPerson!==null&&n.chapter!==personChapter?' person-other-chapter':''}" d="M${a.x},${a.y}L${b.x},${b.y}"/></g>`}
      let pastLinks='',crossLinks='',currentLinks='';
      for(const [i,e] of edges.entries()){
        if(!visible.has(e.source)||!visible.has(e.target))continue;
        const path=paths[i];if(path.style.display==='none')continue;
        const length=path.getTotalLength();if(!length)continue;
        const start=nodes[e.source],end=nodes[e.target],a=threeHeight(start),b=threeHeight(end);
        const samples=Array.from({length:13},(_,j)=>{const t=j/12,p=path.getPointAtLength(length*t);return project((p.x-ox)/k,(p.y-oy)/k,a+(b-a)*t)});
        const d=samples.map((p,j)=>(j?'L':'M')+p.x+','+p.y).join('');
        const revealState=nodeBranchState(e)||fullRevealEdge(e,i),projectedLength=samples.slice(1).reduce((sum,p,j)=>sum+Math.hypot(p.x-samples[j].x,p.y-samples[j].y),0);
        const traceStyle=revealState.trace?` style="stroke-dasharray:${projectedLength} ${projectedLength};stroke-dashoffset:${(revealState.reverse?-1:1)*projectedLength*(1-revealState.progress)}"`:'';
        const chapterPersonGuide=start.kind==='chapter'&&e.kind==='hierarchy';
        const markup=`<g opacity="${chapterPersonGuide?0:revealState.opacity}"><path class="${path.getAttribute('class')} three-connection" data-edge-index="${i}" d="${d}"${traceStyle}/></g>`;
        if(focusedPerson!==null&&branchKeep===null&&path.classList.contains('person-past'))pastLinks+=markup;
        else if(focusedPerson!==null&&branchKeep===null&&path.classList.contains('person-cross'))crossLinks+=markup;
        else currentLinks+=markup;
      }
      threeSvg.innerHTML=ground+stems+`<g class="person-past-layer">${pastLinks}</g><g class="person-cross-layer">${crossLinks}</g><g class="person-current-layer">${currentLinks}</g>`;
      if(epilogueMapAnchor&&!epilogueRoam&&allConnected&&selected===null&&!aligningEpilogueMap){
        const box=threeSvg.querySelector('.three-volume.outer')?.getBBox();
        if(box){const dx=width*epilogueMapAnchor.x-box.x-box.width/2,dy=height*epilogueMapAnchor.y-box.y-box.height/2;
          if(Math.abs(dx)+Math.abs(dy)>.05){autoCentered3D=false;threePanX+=dx;threePanY+=dy;aligningEpilogueMap=true;try{render3D()}finally{aligningEpilogueMap=false}return}
        }
      }
      if(epilogueOverlay)syncEpilogueOverlay();
      const lineage=selected===null?new Set():new Set(ancestors(selected)),selectedBranch=selected===null?new Set():descendants(selected);
      const connectedQuestions=new Set();for(const e of edges)if(e.kind!=='hierarchy'&&(e.source===selected||e.target===selected)){if(nodes[e.source].kind==='question')connectedQuestions.add(e.source);if(nodes[e.target].kind==='question')connectedQuestions.add(e.target)}
      const boxes=[],pointBoxes=points.filter(n=>visible.has(n.id)).map(n=>({id:n.id,x:pos[n.id].x-7,y:pos[n.id].y-7,w:14,h:14}));
      const activePath=selected!==null?ancestors(selected).filter(id=>visible.has(id)&&nodes[id].kind!=='chapter'):[];
      const activeNodeBoxes=activePath.map(id=>{const p=pos[id],label=threeNodes.get(id)?.querySelector('.node-label'),lw=label?.offsetWidth||0,lh=label?.offsetHeight||0;return {x:p.x-Math.max(42,lw/2+20),y:p.y-Math.max(26,lh/2+17),w:Math.max(84,lw+40),h:Math.max(52,lh+34)}});
      const activeLineBoxes=[];
      for(let i=1;i<activePath.length;i++){const from=pos[activePath[i-1]],to=pos[activePath[i]];for(let t=1;t<10;t++){const f=t/10,x=from.x+(to.x-from.x)*f,y=from.y+(to.y-from.y)*f;activeLineBoxes.push({x:x-13,y:y-13,w:26,h:26})}}
      const activeObstacles=[...activeNodeBoxes,...activeLineBoxes];
      const separated=(a,b,gap=0)=>a.x+a.w+gap<=b.x||b.x+b.w+gap<=a.x||a.y+a.h+gap<=b.y||b.y+b.h+gap<=a.y;
      for(const n of [threeCenter,...chapters.filter(c=>c!==threeCenter)]){
        const b=threeNodes.get(n.id),p=pos[n.id],show=visible.has(n.id)&&p.x>-150&&p.x<width+150&&p.y>-60&&p.y<height+60;b.hidden=!show;if(!show)continue;
        b.classList.toggle('reading-node',cameraReadingCentered&&cameraReadingNode===n.id);b.classList.toggle('selected',selected===n.id);b.classList.toggle('person-chapter-past',personChapter!==null&&n.chapter!==personChapter);b.classList.toggle('chapter-other',activeChapter!==null&&n.chapter!==activeChapter);b.setAttribute('aria-expanded',String(expanded.has(n.id)));b.querySelector('small').hidden=!expanded.has(n.id);
        const w=b.offsetWidth,h=b.offsetHeight,c=pos[threeCenter.id],dx=p.x-c.x,dy=p.y-c.y,m=Math.max(1,Math.hypot(dx,dy)),ux=dx/m,uy=dy/m;
        const positions=[[p.x,p.y]];
        for(const distance of [24,48,72,96,128,160,192,224,256])positions.push([p.x+ux*distance,p.y+uy*distance],[p.x-uy*distance,p.y+ux*distance],[p.x+uy*distance,p.y-ux*distance],[p.x-ux*distance,p.y-uy*distance],[p.x+uy*distance,p.y-ux*distance],[p.x-uy*distance,p.y+ux*distance],[p.x+distance,p.y],[p.x-distance,p.y],[p.x,p.y+distance],[p.x,p.y-distance]);
        const protectRoute=!contextIds&&!allConnected&&selected!==null&&nodes[selected].chapter===n.chapter&&nodes[selected].kind!=='chapter';
        let chosen=null;for(const [x,y] of positions){const box={x:x-w/2-8,y:y-h/2-8,w:w+16,h:h+16};if(box.x<8||box.y<8||box.x+box.w>width-8||box.y+box.h>height-8)continue;if(boxes.every(other=>separated(box,other,8))&&(!protectRoute||activeObstacles.every(other=>separated(box,other,8)))){chosen={x,y,box};break}}
        if(!chosen){const x=Math.max(w/2+8,Math.min(width-w/2-8,p.x)),y=Math.max(h/2+8,Math.min(height-h/2-8,p.y));chosen={x,y,box:{x:x-w/2-8,y:y-h/2-8,w:w+16,h:h+16}}}
        b.style.left=chosen.x+'px';b.style.top=chosen.y+'px';pinReadingHeading(b,n.id);b.style.zIndex=String(Math.round(10000-p.d));setRevealOpacity(b,n);boxes.push(chosen.box);
      }
      const selectedQuestionParent=selected!==null&&nodes[selected].kind==='question'?nodes[selected].parent:null;
      const labelPriority=n=>contextIds?(n.id===contextIds[1]?-2:contextSet.has(n.id)?-1:n.kind==='person'?2:n.kind==='concept'?3:6):n.id===epilogueRoam?.focusId?-2:n.id===(cameraReadingNode??selected)?-1:n.id===selected?0:n.id===selectedQuestionParent?1:n.kind==='person'?2:n.kind==='concept'?3:selectedBranch.has(n.id)?4:connectedQuestions.has(n.id)?5:n.kind==='subconcept'?6:7;
      for(const n of [...points].sort((a,b)=>labelPriority(a)-labelPriority(b))){
        const b=threeNodes.get(n.id),label=b.querySelector('.node-label'),p=pos[n.id],x=p.x,y=p.y,show=visible.has(n.id)&&x>=0&&x<=width&&y>=0&&y<=height;
        b.hidden=!show;if(!show)continue;b.style.left=x+'px';b.style.top=y+'px';b.style.zIndex=String(Math.round(20000-p.d));setRevealOpacity(b,n);b.classList.toggle('reading-node',cameraReadingCentered&&cameraReadingNode===n.id);b.classList.toggle('selected',selected===n.id);b.classList.toggle('person-current',focusedPerson!==null&&n.person===focusedPerson);b.classList.toggle('person-past',focusedPerson!==null&&n.person!==focusedPerson);b.classList.toggle('chapter-past',activeChapter!==null&&n.chapter!==activeChapter);b.classList.toggle('branch-past',branchKeep!==null&&n.person===focusedPerson&&!branchKeep.has(n.id));b.classList.toggle('branch-other-chapter',branchKeep!==null&&n.chapter!==personChapter);b.classList.toggle('connected',connectedQuestions.has(n.id));if(n.kind!=='question')b.setAttribute('aria-expanded',String(expanded.has(n.id)));
        label.style.display='block';label.style.width='max-content';const lw=label.offsetWidth,lh=label.offsetHeight,candidates=[];
        for(const gap of [10,18,26,36,50,66]){const diagonal=gap*.71;candidates.push([x+gap,y-lh/2],[x-lw-gap,y-lh/2],[x-lw/2,y+gap],[x-lw/2,y-lh-gap],[x+diagonal,y+diagonal],[x-lw-diagonal,y+diagonal],[x+diagonal,y-lh-diagonal],[x-lw-diagonal,y-lh-diagonal])}
        let choice=null;for(const [lx,ly] of candidates){const box={x:lx,y:ly,w:lw,h:lh};if(lx<8||ly<8||lx+lw>width-8||ly+lh>height-8)continue;if(boxes.every(r=>separated(box,r,6))&&pointBoxes.every(r=>r.id===n.id||separated(box,r))){choice=box;break}}
        if(!choice&&(contextSet.has(n.id)||stage.classList.contains('high-zoom-labels')))choice=zoomLabelFallback(x,y,lw,lh);
        if(cameraReadingCentered&&selected!==null&&cameraReadingNode===n.id)choice={x:width/2-lw/2,y:height/2-lh/2,w:lw,h:lh};
        if(choice){label.style.left=choice.x-x+b.offsetWidth/2+'px';label.style.top=choice.y-y+b.offsetHeight/2+'px';label.style.width=choice.w+'px';boxes.push(choice);reservePersonMetadata(label,b,choice,boxes)}else label.style.display='none';
      }
    }
    function render(){
      stage.classList.toggle('high-zoom-labels',(depthEnabled?threeZoom:k/fitK)>=3);
      const contextIds=readingContext(),contextSet=new Set(contextIds||[]);
      flatPlane.style.setProperty('--flat-label-zoom',Math.max(selected!==null&&nodes[selected].person?1.4:1,labelZoom(k/fitK)).toFixed(2));
      svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
      const allConnected=points.every(n=>visible.has(n.id));
      const focusedPerson=selected!==null&&nodes[selected].kind!=='chapter'?nodes[selected].person:null;
      const personChapter=focusedPerson!==null?nodes[selected].chapter:null;
      const activeChapter=selected!==null&&nodes[selected].kind==='chapter'?nodes[selected].chapter:null;
      const branchKeep=focusedBranchNodes(focusedPerson);
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
      const futureBranch=branchKeep!==null?descendants(selected):new Set();
      edges.forEach((e,i)=>{
        const l=paths[i],a=nodes[e.source],b=nodes[e.target];
        const unusedQuestionEdge=presentationMode&&focusedPerson!==null&&e.kind==='hierarchy'&&b.kind==='question'&&!lectureQuestionIds.has(b.id)&&selected!==b.id;
        const shown=visible.has(e.source)&&visible.has(e.target)&&!unusedQuestionEdge&&!(allConnected&&thinnedCrossEdges.has(i));
        const linkedMeaning=e.kind!=='hierarchy'&&(e.source===emphasis||e.target===emphasis);
        if(shown&&linkedMeaning){if(a.kind==='question')connectedQuestions.add(e.source);if(b.kind==='question')connectedQuestions.add(e.target)}
        const newlyShown=shown&&l.dataset.shown!=='true';l.dataset.shown=String(shown);
        l.style.display=shown?'':'none';l.setAttribute('d',connectionPath(e));
        const revealState=shown?(nodeBranchState(e)||(fullReveal?fullRevealEdge(e,i):null)):null;
        const chapterPersonGuide=a.kind==='chapter'&&e.kind==='hierarchy';
        l.style.filter=chapterPersonGuide?'opacity(0)':revealState?`opacity(${revealState.opacity})`:'';
        if(revealState?.trace){const length=l.getTotalLength();l.style.strokeDasharray=`${length} ${length}`;l.style.strokeDashoffset=String((revealState.reverse?-1:1)*length*(1-revealState.progress))}
        else{l.style.strokeDasharray='';l.style.strokeDashoffset=''}
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
        // Descendant text can be visible before its connecting blue trace begins.
        l.classList.toggle('branch-upcoming',presentationMode&&branchRoute&&selected!==b.id&&futureBranch.has(b.id));
        l.classList.toggle('branch-other-chapter',branchKeep!==null&&(a.chapter!==personChapter||b.chapter!==personChapter));
        l.classList.toggle('branch-local-other',branchKeep!==null&&!branchRoute&&a.chapter===personChapter&&b.chapter===personChapter);
        l.classList.toggle('branch',e.kind==='hierarchy'&&selectedBranch.has(e.source)&&selectedBranch.has(e.target));
        l.classList.toggle('active',(lineage.has(e.source)&&lineage.has(e.target))||linkedMeaning||(hoverChapter!==null&&(selectedBranch.has(e.source)||selectedBranch.has(e.target))));
        if((activeChapter!==null&&(l.classList.contains('chapter-past')||l.classList.contains('chapter-cross')))||l.classList.contains('person-other-chapter')||(branchKeep!==null&&!branchRoute))for(const animation of l.getAnimations())animation.cancel();
        if(newlyShown&&!reducedMotion&&!guidedStep&&!fullReveal&&!revealState){const length=l.getTotalLength();l.animate([{strokeDasharray:length+' '+length,strokeDashoffset:length,opacity:0},{strokeDasharray:length+' '+length,strokeDashoffset:0,opacity:getComputedStyle(l).opacity}],{duration:e.core?1100:750,delay:e.core?180:i%9*22,easing:'cubic-bezier(.2,.6,.2,1)',fill:'backwards'})}
      });
      if(epilogueOverlay&&!depthEnabled)syncEpilogueOverlay();
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
        heading.classList.toggle('selected',selected===c.id);heading.classList.toggle('person-chapter-past',personChapter!==null&&c.chapter!==personChapter);heading.classList.toggle('chapter-other',activeChapter!==null&&c.chapter!==activeChapter);region.classList.toggle('person-chapter-past',personChapter!==null&&c.chapter!==personChapter);region.classList.toggle('chapter-other',activeChapter!==null&&c.chapter!==activeChapter);heading.setAttribute('aria-expanded',String(expanded.has(c.id)));heading.querySelector('small').hidden=!expanded.has(c.id);region.style.display=expanded.has(c.id)?'':'none';heading.style.filter=fullReveal?`opacity(${fullRevealNode(c)})`:'';region.style.filter=fullReveal?`opacity(${c.chapter===5?fullRevealCore():fullRevealNode(c)})`:'';
        const w=heading.offsetWidth,h=heading.offsetHeight;
        const box={x:x-w/2,y:y-h/2,w,h};heading.style.left=box.x+'px';heading.style.top=box.y+'px';pinReadingHeading(heading,c.id);
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
        if(c.chapter===5){coreHalo.setAttribute('d',region.getAttribute('d'));coreHalo.style.display=region.style.display;coreHalo.style.filter=fullReveal?`opacity(${fullRevealCore()})`:''}
        if(expanded.has(c.id))for(const p of ps)for(let i=0;i<8;i++){const a=i*Math.PI/4;envelopePoints.push([p[0]+Math.cos(a)*8,p[1]+Math.sin(a)*8])}
      }
      outerOutline.style.display=envelopePoints.length?'':'none';outerOutline.style.filter=fullReveal?`opacity(${fullRevealAmount(threeCenter.x,threeCenter.y)*.85})`:'';
      if(envelopePoints.length){
        if(allConnected){
          const regionSamples=envelopePoints.map(([px,py])=>[(px-ox)/k,(py-oy)/k]);
          const center=chapters.find(c=>c.chapter===5);
          const outer=organicContour([...networkContours.outer,...regionSamples],center.x,center.y,700,85,.16,1,.9);
          outerOutline.setAttribute('d',contourPath(outer));
        }else outerOutline.setAttribute('d',roundEnvelope(envelopePoints));
      }
      const labelPriority=n=>contextIds?(n.id===contextIds[1]?-2:contextSet.has(n.id)?-1:n.kind==='person'?2:n.kind==='concept'?3:6):n.id===(cameraReadingNode??selected)?-1:n.id===selected?0:n.kind==='person'?1:n.kind==='concept'?2:selectedBranch.has(n.id)?3:connectedQuestions.has(n.id)?4:n.kind==='subconcept'?5:6;
      const ordered=[...points].sort((a,b)=>labelPriority(a)-labelPriority(b));
      for(const n of ordered){
        const {b,label}=elems.get(n.id),x=n.x*k+ox,y=n.y*k+oy;
        b.style.left=x+'px';b.style.top=y+'px';b.style.filter=fullReveal?`opacity(${fullRevealNode(n)})`:'';b.classList.toggle('reading-node',cameraReadingCentered&&cameraReadingNode===n.id);b.classList.toggle('selected',selected===n.id);b.classList.toggle('person-current',focusedPerson!==null&&n.person===focusedPerson);b.classList.toggle('person-past',focusedPerson!==null&&n.person!==focusedPerson);b.classList.toggle('chapter-past',activeChapter!==null&&n.chapter!==activeChapter);b.classList.toggle('branch-past',branchKeep!==null&&n.person===focusedPerson&&!branchKeep.has(n.id));b.classList.toggle('branch-other-chapter',branchKeep!==null&&n.chapter!==personChapter);b.hidden=!visible.has(n.id)||x<0||x>width||y<0||y>height;
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
        if(!choice&&(contextSet.has(n.id)||stage.classList.contains('high-zoom-labels')))choice=zoomLabelFallback(x,y,lw,lh);
        if(cameraReadingCentered&&selected!==null&&cameraReadingNode===n.id)choice={x:width/2-lw/2,y:height/2-lh/2,w:lw,h:lh};
        if(choice){label.style.left=(choice.x-x+b.offsetWidth/2)+'px';label.style.top=(choice.y-y+b.offsetHeight/2)+'px';label.style.width=choice.w+'px';boxes.push(choice);reservePersonMetadata(label,b,choice,boxes)}else label.style.display='none';
      }
      render3D();
    }
    function zoom(f,x=width/2,y=height/2){if(depthEnabled){const next=Math.max(.45,Math.min(maxThreeZoom,threeZoom*f)),ratio=next/threeZoom;threePanX=x-width/2-(x-width/2-threePanX)*ratio;threePanY=y-height/2-(y-height/2-threePanY)*ratio;threeZoom=next;render3D();return}const nk=Math.max(fitK*.45,Math.min(fitK*maxThreeZoom,k*f));ox=x-(x-ox)*nk/k;oy=y-(y-oy)*nk/k;k=nk;render()}
    q('#forum-plus').addEventListener('click',()=>recordStep(()=>zoom(1.3)));q('#forum-minus').addEventListener('click',()=>recordStep(()=>zoom(1/1.3)));
    q('#forum-fit').addEventListener('click',showAll);
    depthButton.addEventListener('click',()=>setDepthEnabled(!depthEnabled));
    q('#forum-reset').addEventListener('click',reset);
    stage.addEventListener('wheel',e=>{if(prologueOpen)return;epilogueMapAnchor=null;e.preventDefault();const r=stage.getBoundingClientRect();zoom(Math.exp(-e.deltaY*.0014),e.clientX-r.left,e.clientY-r.top)},{passive:false});
    stage.addEventListener('pointerdown',()=>{epilogueMapAnchor=null});
    const pointers=new Map();let pinch=null,framePending=false;
    function scheduleRender(){if(framePending)return;framePending=true;requestAnimationFrame(()=>{framePending=false;render()})}
    stage.addEventListener('wheel',()=>{if(prologueOpen)return;cameraMotion++;stage.classList.remove('guided-transition');cameraReadingCentered=false;if(depthEnabled){autoCentered3D=false;lastManual3D=performance.now()}},{capture:true,passive:true});
    stage.addEventListener('pointerdown',()=>{if(prologueOpen)return;cameraMotion++;stage.classList.remove('guided-transition');cameraReadingCentered=false;if(depthEnabled){autoCentered3D=false;lastManual3D=performance.now()}},true);
    stage.addEventListener('pointermove',()=>{if(depthEnabled&&pointers.size)lastManual3D=performance.now()},true);
    stage.addEventListener('pointerdown',e=>{if(prologueOpen)return;if(e.button!==0&&!(depthEnabled&&e.button===1))return;if(depthEnabled)e.preventDefault();pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});stage.setPointerCapture(e.pointerId);if(pointers.size===1)drag={x:e.clientX,y:e.clientY,ox,oy,panX:threePanX,panY:threePanY,rotate:depthEnabled&&e.button===1};else if(pointers.size===2){const [a,b]=[...pointers.values()],r=stage.getBoundingClientRect(),cx=(a.x+b.x)/2-r.left,cy=(a.y+b.y)/2-r.top;pinch={distance:Math.max(1,Math.hypot(a.x-b.x,a.y-b.y)),k:depthEnabled?threeZoom:k,wx:(cx-ox)/k,wy:(cy-oy)/k,cx,cy,panX:threePanX,panY:threePanY};drag=null}});
    stage.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;const previous=pointers.get(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(depthEnabled){if(pointers.size===2&&pinch){const [a,b]=[...pointers.values()],r=stage.getBoundingClientRect(),cx=(a.x+b.x)/2-r.left,cy=(a.y+b.y)/2-r.top;threeZoom=Math.max(.45,Math.min(maxThreeZoom,pinch.k*Math.hypot(a.x-b.x,a.y-b.y)/pinch.distance));const ratio=threeZoom/pinch.k;threePanX=pinch.panX+cx-pinch.cx-(pinch.cx-width/2)* (ratio-1)+pinch.panX*(ratio-1);threePanY=pinch.panY+cy-pinch.cy-(pinch.cy-height/2)*(ratio-1)+pinch.panY*(ratio-1);scheduleRender()}else if(drag?.rotate){threeYaw+=(e.clientX-previous.x)*.006;threeElevation=Math.max(.28,Math.min(1.45,threeElevation-(e.clientY-previous.y)*.005));scheduleRender()}else if(drag){threePanX=drag.panX+e.clientX-drag.x;threePanY=drag.panY+e.clientY-drag.y;scheduleRender()}return}if(pointers.size===2&&pinch){const [a,b]=[...pointers.values()],r=stage.getBoundingClientRect();k=Math.max(fitK*.45,Math.min(fitK*maxThreeZoom,pinch.k*Math.hypot(a.x-b.x,a.y-b.y)/pinch.distance));ox=(a.x+b.x)/2-r.left-pinch.wx*k;oy=(a.y+b.y)/2-r.top-pinch.wy*k;scheduleRender()}else if(drag){ox=drag.ox+e.clientX-drag.x;oy=drag.oy+e.clientY-drag.y;scheduleRender()}});
    function endPointer(e){pointers.delete(e.pointerId);pinch=null;drag=null;if(pointers.size===1){const p=[...pointers.values()][0];drag={x:p.x,y:p.y,ox,oy,panX:threePanX,panY:threePanY,rotate:false}}}
    stage.addEventListener('pointerup',endPointer);stage.addEventListener('pointercancel',endPointer);
    stage.addEventListener('auxclick',e=>{if(depthEnabled&&e.button===1)e.preventDefault()});
    function idleMotionTick(now){
      if(epilogueRoam)requestAnimationFrame(idleMotionTick);else setTimeout(()=>requestAnimationFrame(idleMotionTick),70);
      if(!depthEnabled||prologueOpen||dialog.open||document.hidden||reducedMotion||!q('.intro').hidden)return;
      if(now-lastIdleFrame<(epilogueRoam?32:70))return;lastIdleFrame=now;
      if(epilogueRoam&&!dialog.open){
        advanceEpilogueRoam(now);return;
      }
      const target=now-lastManual3D>1800&&pointers.size===0&&!(selected!==null&&cameraReadingNode!==null)?1:0;
      idleStrength+=(target-idleStrength)*.14;
      const yaw=Math.sin(now/4300)*.06*idleStrength,elevation=Math.cos(now/6100)*.03*idleStrength;
      if(Math.abs(yaw-idleYaw)+Math.abs(elevation-idleElevation)<.00015)return;
      idleYaw=yaw;idleElevation=elevation;render3D();
    }
    function save(){try{localStorage.setItem('sculpture-forum-v1',JSON.stringify({selected,expanded:[...expanded],cueIndex,cueVersion:6,presentationMode,depthEnabled}))}catch{}}
    function restore(){try{const s=JSON.parse(localStorage.getItem('sculpture-forum-v1'));if(s&&Array.isArray(s.expanded)){expanded=new Set(s.expanded.filter(id=>Number.isInteger(id)&&nodes[id]));updateVisible();selected=Number.isInteger(s.selected)&&visible.has(s.selected)?s.selected:null;cueIndex=s.cueVersion===6&&Number.isInteger(s.cueIndex)?Math.max(-1,Math.min(cues.length-1,s.cueIndex)):selected!==null?presentationCueForNode(selected):points.every(n=>visible.has(n.id))?cues.findIndex(c=>c.all):-1;presentationMode=s.presentationMode!==false;depthEnabled=s.depthEnabled===true;autoCentered3D=depthEnabled;stage.classList.toggle('three-view',depthEnabled);flatPlane.hidden=depthEnabled;threeScene.hidden=!depthEnabled;depthButton.setAttribute('aria-pressed',String(depthEnabled));depthButton.textContent=depthEnabled?'2D 보기':'3D 보기';q('.depth-hint').hidden=!depthEnabled;showDetail(null);render()}}catch{}}
    new ResizeObserver(()=>{
      const nextWidth=stage.clientWidth,nextHeight=stage.clientHeight;
      if(width===nextWidth&&height===nextHeight)return;
      cameraMotion++;width=nextWidth;height=nextHeight;
      if(epilogueMapView){restoreEpilogueMapView();return}
      if(epilogueRoam){render();return}
      const entrance=openingChapterEntrance;
      if(entrance&&selected===entrance.id){
        autoCentered3D=false;
        followConnectionToLabel(null,entrance.id,()=>{
          if(openingChapterEntrance!==entrance)return;
          openingChapterEntrance=null;markStepArrival(entrance.id,true);
        },{openingDuration:Math.max(120,2352-(performance.now()-entrance.started))});
        return;
      }
      if(depthEnabled){autoCentered3D=true;threePanX=0;threePanY=0}fit();
    }).observe(stage);
    fit();showDetail(null);restore();updateCue();resetStepHistory();requestAnimationFrame(idleMotionTick);
  })();



