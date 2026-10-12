/* Image cutaways follow the existing interview clock; audio and duration stay intact. */
(()=>{
  const video=document.getElementById('interview-video');
  const dialog=document.getElementById('interview-dialog');
  const stage=dialog?.querySelector('.interview-media');
  if(!video||!dialog||!stage)return;
  const sequences=window.FORUM_IMAGE_INSERTS||{};
  const imageDuration=3;
  const overlay=document.createElement('div');
  overlay.id='interview-work-images';overlay.hidden=true;
  const speech=document.createElement('div');
  speech.className='work-image-speech';speech.setAttribute('aria-hidden','true');
  stage.append(overlay);
  let sequence=null,frames=[],source='',frameRequest=null,currentIndex=-1;

  function hide(){
    overlay.hidden=true;stage.classList.remove('work-images-active');
    currentIndex=-1;speech.textContent='';
  }
  function cancelFrame(){
    if(frameRequest===null)return;
    if(typeof video.cancelVideoFrameCallback==='function')video.cancelVideoFrameCallback(frameRequest);
    else cancelAnimationFrame(frameRequest);
    frameRequest=null;
  }
  function configure(){
    const nextSource=video.getAttribute('src')||'';
    if(nextSource===source)return;
    cancelFrame();hide();stage.classList.remove('work-images-intro-finished');source=nextSource;sequence=null;frames=[];overlay.replaceChildren();
    const key=Object.keys(sequences).find(key=>nextSource&&window.FORUM_MEDIA?.[key]?.src===nextSource);
    const candidate=key&&sequences[key];
    if(!candidate||!Number.isFinite(candidate.start))return;
    sequence=candidate;
    frames=sequence.images.map(work=>{
      const figure=document.createElement('figure');figure.hidden=true;figure.classList.toggle('work-image-restored',!!work.restored);
      const image=document.createElement('img');image.src=work.src;image.alt=work.caption;
      image.decoding='async';image.addEventListener('load',()=>sync());
      figure.append(image);
      if(work.originalText){
        const ns='http://www.w3.org/2000/svg',sourceText=work.originalText;
        const svg=document.createElementNS(ns,'svg');svg.classList.add('work-image-original-text');
        svg.setAttribute('viewBox','0 0 '+sourceText.width+' '+sourceText.height);
        svg.setAttribute('preserveAspectRatio','xMidYMid meet');svg.setAttribute('aria-hidden','true');
        const defs=document.createElementNS(ns,'defs'),clip=document.createElementNS(ns,'clipPath');
        const clipId='work-original-text-'+overlay.childElementCount;clip.setAttribute('id',clipId);
        for(const d of sourceText.paths){const path=document.createElementNS(ns,'path');path.setAttribute('d',d);clip.append(path);}
        defs.append(clip);svg.append(defs);
        const original=document.createElementNS(ns,'image');
        original.setAttribute('href',sourceText.src);original.setAttribute('width',sourceText.width);
        original.setAttribute('height',sourceText.height);original.setAttribute('clip-path','url(#'+clipId+')');
        svg.append(original);figure.append(svg);
      }
      const caption=document.createElement('figcaption');caption.textContent=work.caption;
      figure.append(caption);
      overlay.append(figure);return {figure,image};
    });
    overlay.append(speech);
  }
  function sync(time=video.currentTime){
    configure();
    stage.classList.toggle('work-images-intro-finished',!!sequence&&time>=sequence.start);
    const active=sequence&&dialog.open&&!dialog.classList.contains('question-intro')
      &&!video.ended&&time>=sequence.start&&time<sequence.start+sequence.images.length*imageDuration;
    const index=active?Math.floor((time-sequence.start)/imageDuration):-1;
    if(index<0||!frames[index]?.image.complete||!frames[index].image.naturalWidth){hide();return;}
    if(index!==currentIndex){
      frames.forEach(({figure},i)=>figure.hidden=i!==index);
      currentIndex=index;
    }
    overlay.hidden=false;stage.classList.add('work-images-active');
    speech.textContent=Array.from(video.textTracks).filter(track=>track.mode==='showing')
      .flatMap(track=>Array.from(track.activeCues||[])).map(cue=>cue.text).join('\n');
  }
  function tick(){
    frameRequest=null;sync();
    if(!video.paused&&!video.ended&&dialog.open)schedule();
  }
  function schedule(){
    if(frameRequest!==null)return;
    if(typeof video.requestVideoFrameCallback==='function')frameRequest=video.requestVideoFrameCallback(tick);
    else frameRequest=requestAnimationFrame(tick);
  }
  video.addEventListener('playing',()=>{sync();schedule();});
  for(const event of ['timeupdate','seeked','loadedmetadata'])video.addEventListener(event,()=>sync());
  video.addEventListener('pause',()=>{cancelFrame();sync();});
  video.addEventListener('ended',()=>{cancelFrame();hide();});
  video.addEventListener('emptied',()=>{cancelFrame();hide();configure();});
  video.addEventListener('loadstart',()=>{configure();sync();});
  dialog.addEventListener('close',()=>{cancelFrame();hide();});
  new MutationObserver(()=>{configure();sync();}).observe(video,{attributes:true,attributeFilter:['src']});
  configure();
})();

