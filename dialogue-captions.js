/* One transparent dialogue layer for films and image cutaways. */
(()=>{
  const video=document.getElementById('interview-video');
  const dialog=document.getElementById('interview-dialog');
  const stage=dialog?.querySelector('.interview-media');
  if(!video||!dialog||!stage)return;
  const caption=document.createElement('div');
  caption.className='interview-dialogue-caption';caption.hidden=true;
  caption.setAttribute('aria-hidden','true');stage.append(caption);
  const bound=new WeakSet();let lastCues=[],lastSource='';
  function nativeFullscreen(){return document.fullscreenElement===video||!!video.webkitDisplayingFullscreen;}
  function bind(){
    const native=nativeFullscreen();
    for(const track of video.textTracks){
      if(!['subtitles','captions'].includes(track.kind))continue;
      if(!bound.has(track)){bound.add(track);track.addEventListener('cuechange',sync);}
      // Hidden tracks keep their active cues, without drawing native cue boxes.
      const mode=native?'showing':'hidden';if(track.mode!==mode)track.mode=mode;
    }
  }
  function sync(){
    bind();
    const visible=dialog.open&&video.getAttribute('src')&&!video.ended
      &&!nativeFullscreen()&&!dialog.classList.contains('question-intro');
    const cues=visible?Array.from(video.textTracks)
      .filter(track=>['subtitles','captions'].includes(track.kind))
      .slice(0,1).flatMap(track=>Array.from(track.activeCues||[])):[];
    const source=video.getAttribute('src')||'';
    if(source!==lastSource||cues.length!==lastCues.length||cues.some((cue,i)=>cue!==lastCues[i])){
      const fragment=document.createDocumentFragment();
      for(const [i,cue] of cues.entries()){
        if(i)fragment.append(document.createElement('br'));
        if(typeof cue.getCueAsHTML==='function')fragment.append(cue.getCueAsHTML());
        else fragment.append(document.createTextNode(cue.text));
      }
      caption.replaceChildren(fragment);lastCues=cues;lastSource=source;
    }
    caption.hidden=!visible||!cues.length;
  }
  video.textTracks.addEventListener('addtrack',sync);
  video.textTracks.addEventListener('change',sync);
  video.addEventListener('loadedmetadata',sync);
  for(const event of ['loadeddata','playing','timeupdate','seeked','pause','ended','emptied','webkitbeginfullscreen','webkitendfullscreen'])video.addEventListener(event,sync);
  video.addEventListener('load',sync,true);
  document.addEventListener('fullscreenchange',sync);
  dialog.addEventListener('close',sync);
  new MutationObserver(sync).observe(dialog,{attributes:true,attributeFilter:['open','class']});
  new MutationObserver(sync).observe(video,{attributes:true,attributeFilter:['src']});
  sync();
})();
