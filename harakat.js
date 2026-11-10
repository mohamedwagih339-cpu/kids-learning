/* harakat.js — نشاط الحركات (فتحة/كسرة/ضمة) لإيمو. ملف مستقل. */
(function(){
  "use strict";
  var core=null; function C(){ if(window.__emoCore) return window.__emoCore; if(!core) core={}; return core; }
  function $(id){ var c=C(); return c.$?c.$(id):document.getElementById(id); }
  var LETTERS=[
    {ch:"أ",name:"ألف",key:"alef",forms:{f:"أَ",k:"إِ",d:"أُ"},speak:{f:"أَ",k:"إِ",d:"أُ"}},
    {ch:"ب",name:"باء",key:"ba",forms:{f:"بَ",k:"بِ",d:"بُ"},speak:{f:"بَ",k:"بِ",d:"بُ"}},
    {ch:"ت",name:"تاء",key:"ta",forms:{f:"تَ",k:"تِ",d:"تُ"},speak:{f:"تَ",k:"تِ",d:"تُ"}},
    {ch:"م",name:"ميم",key:"mim",forms:{f:"مَ",k:"مِ",d:"مُ"},speak:{f:"مَ",k:"مِ",d:"مُ"}},
    {ch:"س",name:"سين",key:"sin",forms:{f:"سَ",k:"سِ",d:"سُ"},speak:{f:"سَ",k:"سِ",d:"سُ"}},
    {ch:"ك",name:"كاف",key:"kaf",forms:{f:"كَ",k:"كِ",d:"كُ"},speak:{f:"كَ",k:"كِ",d:"كُ"}},
    {ch:"ل",name:"لام",key:"lam",forms:{f:"لَ",k:"لِ",d:"لُ"},speak:{f:"لَ",k:"لِ",d:"لُ"}},
    {ch:"ن",name:"نون",key:"nun",forms:{f:"نَ",k:"نِ",d:"نُ"},speak:{f:"نَ",k:"نِ",d:"نُ"}},
    {ch:"د",name:"دال",key:"dal",forms:{f:"دَ",k:"دِ",d:"دُ"},speak:{f:"دَ",k:"دِ",d:"دُ"}},
    {ch:"ر",name:"راء",key:"ra",forms:{f:"رَ",k:"رِ",d:"رُ"},speak:{f:"رَ",k:"رِ",d:"رُ"}}
  ];
  var HAR={
    f:{name:"الفتحة",mark:"َ",color:"#ff922b",where:"فوق الحرف",arrow:"↑"},
    k:{name:"الكسرة",mark:"ِ",color:"#339af0",where:"تحت الحرف",arrow:"↓"},
    d:{name:"الضمة",mark:"ُ",color:"#51cf66",where:"فوق الحرف",arrow:"↑"}
  };
  var WORDS={
    alef:{f:[["أَسَد","🦁"],["أَرْنَب","🐰"],["أَحْمَر","🔴"],["أَخْضَر","🟢"],["أَصابع","🖐️"],["أَسنان","😁"]],k:[["إِبْرَة","🪡"],["إِصْبَع","☝️"],["إِنسان","🧒"],["إِوزّة","🪿"],["إِشارة","🚦"],["إِطار","🖼️"]],d:[["أُذُن","👂"],["أُمّ","👩"],["أُسْرة","👨‍👩‍👧"],["أُرْجُوحَة","🎠"],["أُنْبوب","🧪"],["أُخْطُبُوط","🦑"]]},
    ba:{f:[["بَطّة","🦆"],["بَاب","🚪"],["بَقَرَة","🐄"],["بَحْر","🌊"],["بَطّيخ","🍉"],["بَيْت","🏠"]],k:[["بِنْت","👧"],["بَطَّة ","🦆"],["بِئْر","⛲"],["بِسْكِويت","🍪"],["بِنطال","👖"],["بِناء","🏗️"]],d:[["بُرْتُقال","🍊"],["بُنّ","☕"],["بُومَة","🦉"],["بُحَيْرَة","🏞️"],["بُسْتان","🌳"],["بُرْج","🗼"]]},
    ta:{f:[["تَمْر","🌴"],["تَلٌّ","🏔️"],["تاج","👑"]],k:[["تِنّين","🐉"],["تِمْساح","🐊"],["تِلْفاز","📺"],["تِلْميذ","🧑‍🎓"],["تِين ","🫒"],["تِمْثَال","🗽"]],d:[["تُفّاح","🍎"],["تُوت","🍓"],["تُراب","🟤"],["تُحفة","🏛️"],["تُرْس","🛡️"]]},
    mim:{f:[["مَوْز","🍌"],["مَطَر","🌧️"],["مَدْرَسَة","🏫"],["مَلِك","🤴"],["مَاء","💧"],["مَرْكَب","⛵"]],k:[["مِفْتاح","🔑"],["مِقَصّ ","✂️"],["مِلْعَقَة","🥄"],["مِظَلّة","☂️"],["مِصباح","💡"],["مِرآة","🪞"]],d:[["مُعَلِّم","👨‍🏫"],["مُكَعَّب","🧊"],["مُهَنْدِس","👷"],["مُذِيع","🎙️"],["مُنْطاد","🎈"],["مُهَرِّج","🤡"]]},
    sin:{f:[["سَمَكَة","🐟"],["سَيّارَة","🚗"],["سَمَّاعَة","🎧"],["سَحابة","☁️"],["سَاعَةٌ","⏰"]],k:[["سِنّ","🦷"],["سِيرك","🎪"],["سِرْوال","👖"],["سِنْجاب","🐿️"],["سِــباق","🏃‍♂️"],["سِوار","📿"]],d:[["سُنبلة","🌾"],["سُلَّم","🪜"],["سُفُن","🚢"],["سُكَّر","🍬"],["سُلَحْفَاة","🐢"],["سُرْعَة","🏎️"]]},
    kaf:{f:[["كَلْب","🐶"],["كَأس","🥛"],["كَهْفٌ","🗻"],["كَعْكَة","🎂"],["كَوْكَب","🪐"],["كَتْكُوت","🐤"]],k:[["كِتاب","📘"],["كِبريت","🧯"],["كِساء","🧥"],["كِيس","🛍️"],["كِيوِي","🥝"],["كِفَاح","💪"]],d:[["كُرَة","⚽"],["كُرْسي","🪑"],["كُوب","☕"],["كُتُب","📚"],["كُشْك","🏪"],["كُوخ","🛖"]]},
    lam:{f:[["لَبَن","🥛"],["لَوْز","🫘"],["لَيْمون","🍋"],["لَحْم","🍖"],["لَوْح","🧑‍🏫"],["لَمْبَة","💡"]],k:[["لِسان","👅"],["لِباس","👕"],["لِـقَاء","🤝"],["لِفْت","🫜"],["لِـتْر","🍼"],["لِـيَاقَة","🏋️‍♂️"]],d:[["لُعْبَة","🎮"],["لُبنان","🇱🇧"],["لُؤْلُؤ","🦪"],["لُقْمَة","🍽️"],["لُوبيا ","🫘"],["لُغة","🗣️"]]},
    nun:{f:[["نَجْمَة","⭐"],["نَمِر","🐯"],["نَحْلَة","🐝"],["نار","🔥"],["نَهْر","🏞️"],["نافِذَة","🪟"]],k:[["نِسْر ","🦅"],["نِيل "," 🌊 "],["نِصف","½"],["نِهاية","🏁"],["نِسيان","🤔"],["نِداء","📣"]],d:[["نُجوم","✨"],["نُور","✨"],["نُحاس","🥉"],["نُسور","🦅"],["نُقود","💰"],["نُزْهَةٌ","🏞️"]]},
    dal:{f:[["دَجاجَة","🐔"],["دَلْو","🪣"],["دَرّاجَة","🚲"],["دَفْتَر","📓"],["دَار","🏡"],["دَواء","💊"]],k:[["دِيك","🐓"],["دِبْس","🍯"],["دِرْع","🛡️"],["دِفء","🧣"],["دِهان","🎨"]],d:[["دُبّ","🐻"],["دُمى","🧸"],["دُولْفِين ","🐬"],["دُولاب","🚪"],["دُعاء","🤲"],["دُودَة","🐛"]]},
    ra:{f:[["رَمْل","🏖️"],["رَجُل","👨"],["رَأْس","🙂"],["رَبيع","🍃"],["رَسّام","🧑‍🎨"],["رَقْم","🔢"]],k:[["رِواية","📖"],["رِيشَة","🪶"],["رِسالة","✉️"],["رِحْلَة","🧳"],["رِفق","🤝"],["رِضا","😊"]],d:[["رُؤية","👁️"],["رُسوم","🖌️"],["رُبع ","¼"],["رُّمَّان","🔴"],["رُطوبة","🥵"],["رُكن","📐"]]}
  };

var STORAGE_KEY='harakat-progress-v1';
  function loadProg(){ try{ var v=JSON.parse(localStorage.getItem((C().PREFIX||'learn-robot-')+STORAGE_KEY)||'null'); if(v&&typeof v==='object') return v; }catch(e){} return {unlocked:1,lettersDone:{},levelStars:{l1:0,l2:0,l3:0},letterLevel:{}}; }
  function saveProg(p){ try{ localStorage.setItem((C().PREFIX||'learn-robot-')+STORAGE_KEY, JSON.stringify(p)); }catch(e){} }
  var prog=loadProg();
  var state={view:'menu',letter:0,level:1,lessonHar:'f',step:0,sayCount:0,quiz:null};

  function harSpeak(text,onend){ var c=C(); if(c.speak){ c.speak(text,'ar-SA',onend); return; } if(!('speechSynthesis' in window)){ if(onend)onend(); return; } try{ window.speechSynthesis.cancel(); var u=new SpeechSynthesisUtterance(String(text)); u.lang='ar-SA'; u.rate=0.85; if(onend){ var done=false; u.onend=function(){ if(done)return; done=true; onend(); }; setTimeout(function(){ if(!done){done=true; onend();}},2600);} window.speechSynthesis.speak(u);}catch(e){ if(onend)onend(); } }
  function harSpeakSeq(arr,gap,onend){ var i=0; (function next(){ if(i>=arr.length){ if(onend)onend(); return;} var t=arr[i++]; if(!t){ setTimeout(next,gap||300); return;} harSpeak(t,function(){ setTimeout(next,gap||350); }); })(); }
  function bubble(text,tone){ var c=C(); if(c.robotSay) c.robotSay('harakatBubble',text,tone||'info'); else { var b=$('harakatBubble'); if(b) b.textContent=text; } }
  function kid(){ var c=C(); return (c.kidName&&c.kidName())||(c.state&&c.state.name)||'يا بطل'; }
  function cheer(){ var c=C(); if(c.sfxYes)c.sfxYes(); if(c.flash)c.flash(true,'✓'); if(c.glow)c.glow(true); if(c.confetti)c.confetti({count:16,emojis:['⭐','✨','🎉']}); var n=kid(); var m=["أحسنت يا "+n+"! 🌟","ممتاز يا "+n+"! ⭐","رائع يا "+n+"! 🎉","برافو يا "+n+"! 🏆"]; bubble(m[Math.floor(Math.random()*m.length)],'happy'); }
  function oops(){ var c=C(); if(c.sfxNo)c.sfxNo(); if(c.flash)c.flash(false,'✕'); bubble('حاول مرة أخرى يا '+kid()+'، أنت تستطيع 💪','oops'); harSpeak('حاول مرة أخرى يا '+kid()+'، أنت تستطيع'); }
  function open(){ var c=C(); if(c.initAudio)c.initAudio(); if(c.showScreen)c.showScreen('harakatScreen'); state.view='menu'; render(); harSpeak('أهلاً يا '+kid()+'! هنتعلّم الفتحة والكسرة والضمة مع بعض'); }
  function back(){ if(state.view==='menu'){ var c=C(); if(c.goHome)c.goHome(); return; } if(state.view==='letter'){ state.view='menu'; render(); return; } state.view='letter'; render(); }
  function getProgress(){ var earned=(prog.levelStars.l1||0)+(prog.levelStars.l2||0)+(prog.levelStars.l3||0); return {earned:earned,max:9,lettersOpen:prog.unlocked}; }
  function markLesson(li,har,done){ prog.letterLevel[li]=prog.letterLevel[li]||{f:false,k:false,d:false}; prog.letterLevel[li][har]=!!done; if(prog.letterLevel[li].f&&prog.letterLevel[li].k&&prog.letterLevel[li].d){ if(prog.unlocked<li+2&&prog.unlocked<10) prog.unlocked=li+2; } saveProg(prog); updateTop(); }
  function setLevelStar(lvl,stars){ var k='l'+lvl; if(stars>(prog.levelStars[k]||0)){ prog.levelStars[k]=stars; saveProg(prog); updateTop(); } }
  function updateTop(){ var c=C(),p=getProgress(),el=$('harakatScoreTop'); if(el) el.textContent=(c.fmt?c.fmt(p.earned):p.earned); var f=$('harakatStarsFoot'); if(f) f.textContent='⭐ '+(c.fmt?c.fmt(p.earned):p.earned)+' / '+(c.fmt?c.fmt(p.max):p.max); if(c.renderHome) c.renderHome(); }
  function esc(s){ return String(s||'').replace(/[&<>"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m];}); }
  function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
  function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
  function hb(){ return '<div class="quiz-robot-row" style="margin-bottom:12px"><svg class="robot-art tiny" viewBox="0 0 200 220" aria-hidden="true"><use href="#robotSym"></use></svg><div class="speech-bubble side mini" id="harakatBubble" data-tone="happy">أنا إيمو… يلا نتعلّم الحركات!</div></div>'; }

  function render(){ var root=$('harakatRoot'); if(!root) return; updateTop();
    if(state.view==='menu') return renderMenu(root);
    if(state.view==='letter') return renderLetterMenu(root);
    if(state.view==='lesson') return renderLesson(root);
    if(state.view==='l1quiz') return renderL1Quiz(root);
    if(state.view==='l2') return renderL2(root);
    if(state.view==='l3') return renderL3(root);
    if(state.view==='test') return renderTest(root);
    renderMenu(root);
  }

  function renderMenu(root){
    var c=C(); var html=hb();
    html+='<div class="big-banner"><div class="big-banner-text"><b>اختَر الحرف يا '+esc(kid())+' 🔤</b><span>عشرة حروف… افتح الحرف التالي بعد إتمام السابق</span></div></div>';
    html+='<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:12px;margin-top:14px">';
    LETTERS.forEach(function(L,i){ var open=i<prog.unlocked; var done=prog.letterLevel[i]&&prog.letterLevel[i].f&&prog.letterLevel[i].k&&prog.letterLevel[i].d;
      html+='<button class="sec-card" type="button" data-hl="'+i+'" style="padding:16px 10px;text-align:center;opacity:'+(open?1:.45)+';cursor:'+(open?'pointer':'default')+'"><div style="font-size:44px;font-weight:900;color:var(--primary);line-height:1">'+L.ch+'</div><div style="font-weight:800;margin-top:4px">'+L.name+'</div><div style="font-size:12px;margin-top:4px">'+(open?(done?'✅ مكتمل':'🔓 مفتوح'):'🔒 مغلق')+'</div></button>'; });
    html+='</div>';
    html+='<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-top:18px">';
    [1,2,3].forEach(function(lv){ var st=''; for(var i=0;i<3;i++) st+= i<(prog.levelStars['l'+lv]||0)?'⭐':'☆'; var names={1:'المستوى الأول: التعرّف',2:'المستوى الثاني: التمييز والتدريب',3:'المستوى الثالث: التحدي'}; html+='<button class="sec-card" type="button" data-hlv="'+lv+'" style="text-align:right"><div style="font-weight:900;font-size:17px">'+names[lv]+'</div><div style="margin-top:8px;font-size:18px">'+st+'</div><div style="font-size:12px;color:var(--muted);margin-top:4px">اضغط للبدء / اختبار مباشر</div></button>'; });
    html+='</div>'; root.innerHTML=html;
    root.querySelectorAll('[data-hl]').forEach(function(btn){ btn.onclick=function(){ var i=+btn.getAttribute('data-hl'); if(i>=prog.unlocked){ var c=C(); if(c.sfxNo)c.sfxNo(); harSpeak('أكمل الحرف اللي قبله الأول'); return;} var c=C(); if(c.initAudio)c.initAudio(); if(c.sfxClick)c.sfxClick(); state.letter=i; state.view='letter'; render(); }; });
    root.querySelectorAll('[data-hlv]').forEach(function(btn){ btn.onclick=function(){ var c=C(); if(c.initAudio)c.initAudio(); if(c.sfxClick)c.sfxClick(); var lv=+btn.getAttribute('data-hlv'); if(lv===1){ state.letter=0; state.view='letter'; render(); } else if(lv===2) startLevel2(); else startLevel3(); }; });
    bubble('اختَر حرفًا يا '+esc(kid())+'، أو ابدأ مستوى مباشرة','happy');
  }

  function renderLetterMenu(root){
    var c=C(),L=LETTERS[state.letter],st=prog.letterLevel[state.letter]||{}; var html=hb();
    html+='<div class="big-banner"><div class="big-banner-text"><b>حرف '+L.ch+' — '+L.name+'</b><span>تعلّم الفتحة والكسرة والضمة</span></div><button class="btn ghost small" id="hkBackMenu" type="button">كل الحروف</button></div>';
    html+='<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-top:14px">';
    ['f','k','d'].forEach(function(h){ var H=HAR[h],done=!!st[h]; html+='<button class="sec-card" type="button" data-les="'+h+'" style="text-align:center;border-top:6px solid '+H.color+'"><div style="font-size:52px;font-weight:900;line-height:1.1">'+L.forms[h]+'</div><div style="font-weight:900;margin-top:4px">'+H.name+' '+H.mark+'</div><div style="font-size:12px;color:var(--muted)">'+H.where+'</div><div style="margin-top:6px">'+(done?'✅':'▶️ ابدأ')+'</div></button>'; });
    html+='</div>';
    var ready=st.f&&st.k&&st.d;
    html+='<div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:16px">';
    html+='<button class="btn '+(ready?'':'ghost')+'" id="hkL1Quiz" type="button">🎧 اسمع واختر</button>';
    html+='<button class="btn teal" id="hkL2" type="button">المستوى ٢: تدريب</button>';
    html+='<button class="btn gold" id="hkL3" type="button">المستوى ٣: تحدي</button>';
    html+='<button class="btn ghost" id="hkT1" type="button">اختبار م١ (١٠)</button>';
    html+='<button class="btn ghost" id="hkT2" type="button">اختبار م٢ (١٠)</button>';
    html+='<button class="btn ghost" id="hkT3" type="button">اختبار م٣ (١٥)</button>';
    html+='</div>'; root.innerHTML=html;
    root.querySelector('#hkBackMenu').onclick=function(){ var c=C(); if(c.sfxClick)c.sfxClick(); state.view='menu'; render(); };
    root.querySelectorAll('[data-les]').forEach(function(b){ b.onclick=function(){ var c=C(); if(c.initAudio)c.initAudio(); if(c.sfxClick)c.sfxClick(); state.lessonHar=b.getAttribute('data-les'); state.sayCount=0; state.view='lesson'; render(); }; });
    root.querySelector('#hkL1Quiz').onclick=function(){ startL1Quiz(); };
    root.querySelector('#hkL2').onclick=function(){ startLevel2(); };
    root.querySelector('#hkL3').onclick=function(){ startLevel3(); };
    root.querySelector('#hkT1').onclick=function(){ startTest(1); };
    root.querySelector('#hkT2').onclick=function(){ startTest(2); };
    root.querySelector('#hkT3').onclick=function(){ startTest(3); };
    harSpeak('حرف '+L.name+'. اختَر حركة');
  }

  function renderLesson(root){
    var c=C(),L=LETTERS[state.letter],h=state.lessonHar,H=HAR[h],form=L.forms[h],speakForm=L.speak[h],words=(WORDS[L.key]&&WORDS[L.key][h])||[];
    var html=hb();
    html+='<div class="letter-card" style="--tone1:'+H.color+';--tone2:'+H.color+';text-align:center;padding:18px">';
    html+='<div class="card-badge">'+H.name+' — '+L.name+'</div>';
    html+='<div style="font-size:clamp(90px,22vw,150px);font-weight:900;line-height:1;margin:8px 0;color:#24325d">'+form+'</div>';
    html+='<div style="display:inline-flex;align-items:center;gap:8px;background:#fff7ed;border:2px dashed '+H.color+';padding:8px 14px;border-radius:999px;font-weight:900;color:#7c2d12;font-size:18px"><span style="font-size:28px;color:'+H.color+'">'+H.mark+'</span> '+H.name+' '+H.arrow+' '+H.where+'</div>';
    html+='<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:14px">';
    html+='<button class="btn" id="hkSlow" type="button">🐢 اسمع ببطء</button>';
    html+='<button class="btn teal" id="hkFast" type="button">🐇 اسمع بسرعة</button>';
    html+='<button class="btn gold" id="hkRep" type="button">🎤 قولها (مرتين)</button>';
    html+='</div><div id="hkRepMsg" style="margin-top:8px;font-weight:800;color:var(--muted)">اضغط «قولها» وردّد مرتين</div></div>';
    html+='<div style="margin-top:14px"><div style="font-weight:900;font-size:18px;margin-bottom:8px">أمثلة على '+H.name+' مع '+L.name+'</div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px">';
    words.forEach(function(w,i){ html+='<button class="sec-card hk-w" type="button" data-i="'+i+'" style="padding:12px;text-align:center"><div style="font-size:34px">'+w[1]+'</div><div style="font-size:22px;font-weight:900;margin-top:4px">'+esc(w[0])+'</div><div style="font-size:12px;color:var(--muted)">🔊 اسمع</div></button>'; });
    html+='</div></div>';
    html+='<div class="write-card" style="margin-top:14px"><div style="font-weight:900;font-size:18px;margin-bottom:6px">اكتب الحرف وضع الحركة ✍️</div>';
    html+='<div style="color:var(--muted);font-weight:700;font-size:13px;margin-bottom:8px">امشِ على الخط المنقط بالإصبع أو الماوس، ثم ضع '+H.name+' في مكانها</div>';
    html+='<canvas id="hkTrace" width="600" height="260" style="width:100%;max-width:520px;height:auto;background:#fff;border:2px solid #eef1ff;border-radius:18px;touch-action:none;display:block;margin:0 auto"></canvas>';
    html+='<div style="text-align:center;margin-top:10px"><div style="font-weight:800;margin-bottom:6px">أين تضع '+H.name+'؟</div><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><button class="btn" id="hkUp" type="button" style="min-width:140px">⬆️ فوق الحرف</button><button class="btn teal" id="hkDn" type="button" style="min-width:140px">⬇️ تحت الحرف</button></div><div id="hkPlaceMsg" style="margin-top:8px;font-weight:800;min-height:24px"></div></div>';
    html+='<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:10px"><button class="btn ghost" id="hkClr" type="button">امسح</button><button class="btn gold" id="hkDone" type="button">تم الدرس ✅</button><button class="btn ghost" id="hkBk" type="button">رجوع للحرف</button></div></div>';
    root.innerHTML=html;
    harSpeakSeq([speakForm,'',speakForm], 450);
    bubble('هذا حرف '+L.name+' مع '+H.name+'… اسمع وردّد','happy');
    root.querySelector('#hkSlow').onclick=function(){ harSpeak(speakForm); };
    root.querySelector('#hkFast').onclick=function(){ harSpeak(speakForm); };
    root.querySelector('#hkRep').onclick=function(){ state.sayCount=(state.sayCount||0)+1; harSpeakSeq([speakForm,'',speakForm],600); var m=root.querySelector('#hkRepMsg'); if(m) m.textContent=state.sayCount>=2?'أحسنت! ردّدت مرتين ✅':'مرة أخرى… اضغط «قولها»'; if(state.sayCount>=2){ var c=C(); if(c.sfxYes)c.sfxYes(); if(c.burstAtElement)c.burstAtElement(root.querySelector('#hkRep'),['⭐','✨'],6); } };
    root.querySelectorAll('.hk-w').forEach(function(b){ b.onclick=function(){ var w=words[+b.getAttribute('data-i')]; if(w) harSpeak(w[0]); var c=C(); if(c.sfxClick)c.sfxClick(); }; });
    setupTrace(root.querySelector('#hkTrace'), L.ch, H);
    root.querySelector('#hkClr').onclick=function(){ setupTrace(root.querySelector('#hkTrace'), L.ch, H, true); };
    root.querySelector('#hkUp').onclick=function(){ placeMark('up',h); };
    root.querySelector('#hkDn').onclick=function(){ placeMark('down',h); };
    root.querySelector('#hkDone').onclick=function(){ markLesson(state.letter,h,true); var c=C(); if(c.sfxWin)c.sfxWin(); if(c.starRain)c.starRain(); harSpeak('أحسنت! أنهيت درس '+HAR[h].name); state.view='letter'; render(); };
    root.querySelector('#hkBk').onclick=function(){ state.view='letter'; render(); };
  }
  function placeMark(pos,h){ var ok=((h==='k')?'down':'up')===pos; var m=$('hkPlaceMsg'); if(ok){ cheer(); if(m){m.style.color='var(--success,#2f9e44)'; m.textContent='ممتاز! '+HAR[h].name+' '+HAR[h].where+' ✅';} } else { oops(); if(m){m.style.color='var(--danger,#e03131)'; m.textContent='جرّب مرة أخرى… '+HAR[h].name+' '+HAR[h].where;} } }

  function setupTrace(canvas, letter, H, clearOnly){
    if(!canvas) return; var ctx=canvas.getContext('2d'),W=canvas.width,Ch=canvas.height;
    function base(){ ctx.clearRect(0,0,W,Ch); ctx.fillStyle='#ffffff'; ctx.fillRect(0,0,W,Ch); ctx.save(); ctx.setLineDash([8,10]); ctx.strokeStyle='#c7d2fe'; ctx.lineWidth=6; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.font='bold 170px "Noto Sans Arabic","Segoe UI",Arial,sans-serif'; ctx.strokeText(letter,W/2,Ch/2+10); ctx.setLineDash([]); ctx.fillStyle='rgba(124,92,255,0.08)'; ctx.fillText(letter,W/2,Ch/2+10); ctx.restore(); ctx.fillStyle=H.color; ctx.font='bold 48px Arial'; ctx.textAlign='center'; var hy=(H.arrow==='↓')?Ch/2+95:Ch/2-75; ctx.fillText(H.mark,W/2+58,hy); }
    base(); if(clearOnly) return;
    var drawing=false,last=null;
    function pt(e){ var r=canvas.getBoundingClientRect(),sx=canvas.width/r.width,sy=canvas.height/r.height; var t=(e.touches&&e.touches[0])?e.touches[0]:((e.changedTouches&&e.changedTouches[0])?e.changedTouches[0]:e); return {x:(t.clientX-r.left)*sx,y:(t.clientY-r.top)*sy}; }
    function down(e){ drawing=true; last=pt(e); if(e.cancelable) e.preventDefault(); }
    function move(e){ if(!drawing) return; var p=pt(e); ctx.strokeStyle='#2e2063'; ctx.lineWidth=10; ctx.lineCap='round'; ctx.lineJoin='round'; ctx.beginPath(); ctx.moveTo(last.x,last.y); ctx.lineTo(p.x,p.y); ctx.stroke(); last=p; if(e.cancelable) e.preventDefault(); }
    function up(){ drawing=false; last=null; }
    canvas.onpointerdown=down; canvas.onpointermove=move; canvas.onpointerup=up; canvas.onpointerleave=up; canvas.onpointercancel=up;
    canvas.ontouchstart=down; canvas.ontouchmove=move; canvas.ontouchend=up; canvas.ontouchcancel=up;
    canvas.onmousedown=down; canvas.onmousemove=move; window.addEventListener('mouseup',up,{once:false});
  }

  function startL1Quiz(){ var L=LETTERS[state.letter]; var qs=shuffle(['f','k','d','f','k','d']).map(function(h){ return {h:h,form:L.forms[h],speak:L.speak[h],L:L}; }); state.quiz={mode:'l1',q:qs,i:0,score:0,letter:state.letter}; state.view='l1quiz'; render(); }
  function renderL1Quiz(root){ var q=state.quiz,cur=q.q[q.i],L=cur.L; var html=hb(); html+='<div class="letter-card" style="text-align:center;padding:18px"><div class="card-badge">اسمع واختر — '+(q.i+1)+' / '+q.q.length+'</div><div style="font-size:22px;font-weight:900;margin:10px 0">استمع جيدًا… ثم اختر الشكل الصحيح</div><button class="btn gold" id="hkHearQ" type="button" style="font-size:20px;padding:14px 22px">🔊 اسمع</button><div style="display:grid;grid-template-columns:repeat(3,minmax(90px,1fr));gap:12px;margin-top:18px;max-width:520px;margin-left:auto;margin-right:auto">';
    shuffle(['f','k','d']).forEach(function(h){ html+='<button class="sec-card hk-qo" type="button" data-h="'+h+'" style="padding:18px 8px;text-align:center"><div style="font-size:64px;font-weight:900;line-height:1">'+L.forms[h]+'</div></button>'; });
    html+='</div><div id="hkQMsg" style="min-height:28px;margin-top:12px;font-weight:900"></div></div>'; root.innerHTML=html;
    var played=false; function play(){ harSpeak(cur.speak); played=true; } setTimeout(play,350); root.querySelector('#hkHearQ').onclick=play;
    root.querySelectorAll('.hk-qo').forEach(function(b){ b.onclick=function(){ if(b.disabled)return; if(!played) play(); var h=b.getAttribute('data-h'); if(h===cur.h){ q.score++; cheer(); b.style.outline='4px solid #51cf66'; } else { oops(); b.style.outline='4px solid #ff6b6b'; root.querySelectorAll('.hk-qo').forEach(function(x){ if(x.getAttribute('data-h')===cur.h) x.style.outline='4px solid #51cf66'; }); } root.querySelectorAll('.hk-qo').forEach(function(x){x.disabled=true;}); setTimeout(function(){ q.i++; if(q.i>=q.q.length){ var pct=q.score/q.q.length,stars=pct>=0.9?3:pct>=0.7?2:pct>=0.5?1:0; if(stars>=2&&(prog.levelStars.l1||0)<1) setLevelStar(1,1); showResult(q.score,q.q.length,stars,function(){state.view='letter';render();},startL1Quiz);} else render(); },1100); }; });
  }

  function showResult(score,total,stars,onBack,onRetry){ var root=$('harakatRoot'); if(!root) return; var c=C(),n=kid(),st=''; for(var i=0;i<3;i++) st+= i<stars?'<span>⭐</span>':'<span class="off">⭐</span>'; root.innerHTML='<div class="result-card"><div class="result-stars">'+st+'</div><h3>أحسنت يا '+esc(n)+'! 🏆</h3><p style="font-weight:800;font-size:18px">نتيجتك: '+score+' من '+total+'</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:14px"><button class="btn gold" id="hkRetry" type="button">إعادة 🔁</button><button class="btn" id="hkDone" type="button">تم ✅</button></div></div>'; if(c.sfxWin)c.sfxWin(); if(c.starRain)c.starRain(); if(c.flash)c.flash(true,'🏆'); harSpeak('أحسنت يا '+n+'! حصلت على '+stars+' نجوم'); root.querySelector('#hkRetry').onclick=onRetry; root.querySelector('#hkDone').onclick=onBack; updateTop(); }

  function pickL(){ return LETTERS[Math.floor(Math.random()*LETTERS.length)]; }

  /* ===== المستوى الثاني ===== (تم حذف سؤال "أي شكل يختلف؟" وأصبح فيه سؤال الصورة) */
  function makeL2(){ var types=['compare','place','complete'],type=pick(types),L=pickL(),hs=['f','k','d'],target=pick(hs);
    if(type==='compare') return {type:'compare',L:L,target:target};
    if(type==='place') return {type:'place',L:L,target:target};
    var w=pick((WORDS[L.key]&&WORDS[L.key][target])||[["كلمة","❓"]]); return {type:'complete',L:L,target:target,word:w};
  }
  function startLevel2(){ var qs=[]; for(var i=0;i<10;i++) qs.push(makeL2()); state.quiz={mode:'l2',q:qs,i:0,score:0,locked:false,_test:false}; state.view='l2'; render(); }
  function renderL2(root){ var q=state.quiz,cur=q.q[q.i]; var html=hb(); html+='<div class="letter-card" style="text-align:center;padding:16px"><div class="card-badge">'+(q._test?'اختبار المستوى ٢':'المستوى الثاني')+' — '+(q.i+1)+' / '+q.q.length+'</div>';
    if(cur.type==='compare'){ html+='<div style="font-size:20px;font-weight:900;margin:8px 0">استمع واضغط على الشكل الصحيح لحرف '+cur.L.ch+'</div><button class="btn gold" id="hkHearQ" type="button">🔊 اسمع</button><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px;max-width:520px;margin:auto">'; shuffle(['f','k','d']).forEach(function(h){ html+='<button class="sec-card hk-qo" data-h="'+h+'" style="padding:14px"><div style="font-size:60px;font-weight:900">'+cur.L.forms[h]+'</div></button>'; }); html+='</div>'; }
    else if(cur.type==='place'){ html+='<div style="font-size:20px;font-weight:900;margin:8px 0">أين تضع '+HAR[cur.target].name+'؟</div><div style="font-size:80px;font-weight:900;margin:6px 0">'+cur.L.ch+' <span style="font-size:44px;color:'+HAR[cur.target].color+'">'+HAR[cur.target].mark+'</span></div><div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:10px"><button class="btn hk-pl" data-p="up" style="min-width:150px">⬆️ فوق</button><button class="btn teal hk-pl" data-p="down" style="min-width:150px">⬇️ تحت</button></div>'; harSpeak('أين تضع '+HAR[cur.target].name+'؟'); }
    else { html+='<div style="font-size:90px;line-height:1.1">'+cur.word[1]+'</div><div style="font-size:22px;font-weight:900;margin:6px 0">ما حركة حرف '+cur.L.ch+' في أول الكلمة؟</div><button class="btn gold" id="hkHearQ" type="button">🔊 اسمع الكلمة</button><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px;max-width:520px;margin:auto">'; shuffle(['f','k','d']).forEach(function(h){ html+='<button class="sec-card hk-qo" data-h="'+h+'" style="padding:14px"><div style="font-size:56px;font-weight:900">'+cur.L.forms[h]+'</div><div style="font-size:12px;color:var(--muted)">'+HAR[h].name+'</div></button>'; }); html+='</div>'; }
    html+='<div id="hkQMsg" style="min-height:28px;margin-top:12px;font-weight:900"></div></div>'; root.innerHTML=html; wireL2(cur);
  }
  function wireL2(cur){ var q=state.quiz,root=$('harakatRoot'); var hear=root.querySelector('#hkHearQ'); if(hear) hear.onclick=function(){ if(cur.type==='complete') harSpeak(cur.word[0]); else harSpeak(cur.L.speak[cur.target]); };
    if(cur.type==='compare'){ setTimeout(function(){ harSpeak(cur.L.speak[cur.target]); },350); root.querySelectorAll('.hk-qo').forEach(function(b){ b.onclick=function(){ ans2(b.getAttribute('data-h')===cur.target,b,root); }; }); }
    else if(cur.type==='place'){ var ok=(cur.target==='k')?'down':'up'; root.querySelectorAll('.hk-pl').forEach(function(b){ b.onclick=function(){ ans2(b.getAttribute('data-p')===ok,b,root); }; }); }
    else { setTimeout(function(){ harSpeak(cur.word[0]); },350); root.querySelectorAll('.hk-qo').forEach(function(b){ b.onclick=function(){ ans2(b.getAttribute('data-h')===cur.target,b,root); }; }); }
  }
  function ans2(ok,btn,root){ var q=state.quiz; if(q.locked) return; q.locked=true; if(ok){q.score++;cheer();btn.style.outline='4px solid #51cf66';} else {oops();btn.style.outline='4px solid #ff6b6b';} root.querySelectorAll('button.hk-qo,button.hk-pl').forEach(function(x){x.disabled=true;}); setTimeout(function(){ q.i++; q.locked=false; if(q.i>=q.q.length){ var stars=q.score/q.q.length>=0.9?3:q.score/q.q.length>=0.7?2:q.score/q.q.length>=0.5?1:0; setLevelStar(2,stars); showResult(q.score,q.q.length,stars,function(){state.view='menu';render();}, q._test?function(){startTest(2);}:startLevel2);} else { if(q._test) renderTest(root); else renderL2(root); } },1050); }

  /* ===== المستوى الثالث ===== (تم حذف سؤال "أي شكل يختلف؟" وأصبح فيه سؤال الصورة) */
  function makeL3(){ var types=['noimg','pic','write'],type=pick(types),L=pickL(),hs=['f','k','d'],target=pick(hs);
    if(type==='noimg'){ var w=pick((WORDS[L.key]&&WORDS[L.key][target])||[["كلمة",""]]); return {type:'noimg',L:L,target:target,word:w}; }
    if(type==='write') return {type:'write',L:L,target:target};
    var w2=pick((WORDS[L.key]&&WORDS[L.key][target])||[["كلمة","❓"]]); return {type:'pic',L:L,target:target,word:w2};
  }
  function startLevel3(){ var qs=[]; for(var i=0;i<10;i++) qs.push(makeL3()); state.quiz={mode:'l3',q:qs,i:0,score:0,locked:false,_test:false}; state.view='l3'; render(); }
  function renderL3(root){ var q=state.quiz,cur=q.q[q.i]; var html=hb(); html+='<div class="letter-card" style="text-align:center;padding:16px"><div class="card-badge">'+(q._test?'اختبار المستوى ٣':'المستوى الثالث (تحدي)')+' — '+(q.i+1)+' / '+q.q.length+'</div>';
    if(cur.type==='noimg'){ html+='<div style="font-size:20px;font-weight:900;margin:8px 0">استمع واختر الحركة الصحيحة (بدون صورة)</div><button class="btn gold" id="hkHearQ" type="button">🔊 اسمع</button><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px;max-width:520px;margin:auto">'; shuffle(['f','k','d']).forEach(function(h){ html+='<button class="sec-card hk-qo" data-h="'+h+'" style="padding:16px"><div style="font-size:62px;font-weight:900">'+cur.L.forms[h]+'</div></button>'; }); html+='</div>'; }
    else if(cur.type==='write'){ html+='<div style="font-size:20px;font-weight:900;margin:8px 0">اكتب ما تسمع: حرف '+cur.L.name+' مع '+HAR[cur.target].name+'</div><button class="btn gold" id="hkHearQ" type="button">🔊 اسمع</button><div style="margin-top:10px;font-size:80px;font-weight:900;color:#cbd5ff">'+cur.L.ch+'</div><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:8px"><button class="btn hk-pl" data-p="up" style="min-width:140px">ضع الحركة فوق</button><button class="btn teal hk-pl" data-p="down" style="min-width:140px">ضع الحركة تحت</button></div><div style="font-size:12px;color:var(--muted);margin-top:8px">كتابة بدون خط منقط — اختر مكان الحركة</div>'; }
    else { html+='<div style="font-size:90px;line-height:1.1">'+cur.word[1]+'</div><div style="font-size:22px;font-weight:900;margin:6px 0">ما حركة حرف '+cur.L.ch+' في أول الكلمة؟</div><button class="btn gold" id="hkHearQ" type="button">🔊 اسمع الكلمة</button><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px;max-width:520px;margin:auto">'; shuffle(['f','k','d']).forEach(function(h){ html+='<button class="sec-card hk-qo" data-h="'+h+'" style="padding:16px"><div style="font-size:62px;font-weight:900">'+cur.L.forms[h]+'</div></button>'; }); html+='</div>'; }
    html+='<div id="hkQMsg" style="min-height:28px;margin-top:12px;font-weight:900"></div></div>'; root.innerHTML=html;
    var hear=root.querySelector('#hkHearQ'); if(hear) hear.onclick=function(){ if(cur.type==='pic') harSpeak(cur.word[0]); else harSpeak(cur.L.speak[cur.target]); };
    if(cur.type==='noimg'){ setTimeout(function(){ harSpeak(cur.L.speak[cur.target]); },350); root.querySelectorAll('.hk-qo').forEach(function(b){ b.onclick=function(){ ans3(b.getAttribute('data-h')===cur.target,b,root); }; }); }
    else if(cur.type==='write'){ setTimeout(function(){ harSpeak(cur.L.speak[cur.target]); },350); var ok=(cur.target==='k')?'down':'up'; root.querySelectorAll('.hk-pl').forEach(function(b){ b.onclick=function(){ ans3(b.getAttribute('data-p')===ok,b,root); }; }); }
    else { setTimeout(function(){ harSpeak(cur.word[0]); },350); root.querySelectorAll('.hk-qo').forEach(function(b){ b.onclick=function(){ ans3(b.getAttribute('data-h')===cur.target,b,root); }; }); }
  }
  function ans3(ok,btn,root){ var q=state.quiz; if(q.locked) return; q.locked=true; if(ok){q.score++;cheer();btn.style.outline='4px solid #51cf66';} else {oops();btn.style.outline='4px solid #ff6b6b';} root.querySelectorAll('button.hk-qo,button.hk-pl').forEach(function(x){x.disabled=true;}); setTimeout(function(){ q.i++; q.locked=false; if(q.i>=q.q.length){ var stars=q.score/q.q.length>=0.9?3:q.score/q.q.length>=0.7?2:q.score/q.q.length>=0.5?1:0; setLevelStar(3,stars); showResult(q.score,q.q.length,stars,function(){state.view='menu';render();}, q._test?function(){startTest(3);}:startLevel3);} else { if(q._test) renderTest(root); else renderL3(root); } },1050); }

  function startTest(level){ var c=C(); if(c.initAudio)c.initAudio(); if(c.sfxClick)c.sfxClick(); var count=level===3?15:10; var qs=[]; if(level===1){ for(var i=0;i<count;i++){ var L=pickL(),h=pick(['f','k','d']); qs.push({type:'l1',L:L,target:h}); } state.quiz={mode:'test1',level:1,q:qs,i:0,score:0,locked:false,_test:true}; state.view='test'; render(); return; } if(level===2){ for(var i=0;i<count;i++) qs.push(makeL2()); state.quiz={mode:'test2',level:2,q:qs,i:0,score:0,locked:false,_test:true}; state.view='test'; render(); return; } for(var i=0;i<count;i++) qs.push(makeL3()); state.quiz={mode:'test3',level:3,q:qs,i:0,score:0,locked:false,_test:true}; state.view='test'; render(); }
  function renderTest(root){ var q=state.quiz,cur=q.q[q.i]; if(cur && cur.type==='l1'){ var L=cur.L,target=cur.target; var html=hb(); html+='<div class="letter-card" style="text-align:center;padding:16px"><div class="card-badge">اختبار المستوى ١ — '+(q.i+1)+' / '+q.q.length+'</div><div style="font-size:20px;font-weight:900;margin:8px 0">استمع واختر الشكل الصحيح</div><button class="btn gold" id="hkHearQ">🔊 اسمع</button><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px;max-width:520px;margin:auto">'; shuffle(['f','k','d']).forEach(function(h){ html+='<button class="sec-card hk-qo" data-h="'+h+'" style="padding:14px"><div style="font-size:58px;font-weight:900">'+L.forms[h]+'</div></button>'; }); html+='</div><div id="hkQMsg" style="min-height:28px;margin-top:12px;font-weight:900"></div></div>'; root.innerHTML=html; setTimeout(function(){ harSpeak(L.speak[target]); },350); root.querySelector('#hkHearQ').onclick=function(){ harSpeak(L.speak[target]); }; root.querySelectorAll('.hk-qo').forEach(function(b){ b.onclick=function(){ ansT(b.getAttribute('data-h')===target,b,root); }; }); return; } if(q.level===2) { renderL2(root); return; } renderL3(root); }
  function ansT(ok,btn,root){ var q=state.quiz; if(q.locked)return; q.locked=true; if(ok){q.score++;cheer();btn.style.outline='4px solid #51cf66';}else{oops();btn.style.outline='4px solid #ff6b6b';} root.querySelectorAll('.hk-qo').forEach(function(x){x.disabled=true;}); setTimeout(function(){ q.i++; q.locked=false; if(q.i>=q.q.length){ var stars=q.score/q.q.length>=0.9?3:q.score/q.q.length>=0.7?2:q.score/q.q.length>=0.5?1:0; setLevelStar(1,stars); showResult(q.score,q.q.length,stars,function(){state.view='menu';render();},function(){startTest(1);}); } else renderTest(root); },1050); }

  window.Harakat={ open:open, back:back, getProgress:getProgress };
  setTimeout(updateTop,300);
})();