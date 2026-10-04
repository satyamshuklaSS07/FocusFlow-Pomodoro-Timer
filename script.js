const $ = (id) => document.getElementById(id);
const CIRCUMFERENCE = 2 * Math.PI * 132;
const defaults = {work:25, short:5, long:15, cycle:4, sound:true, notify:false};
let settings = {...defaults};
let mode = 'work', remaining = 25*60, total = 25*60, running = false, endAt = null, ticker = null;
let completed = 0, focusSeconds = 0, streak = 0;
let audioContext;
const quotes = [
  ['Great things are done by a series of small things brought together.','Vincent van Gogh'],
  ['It always seems impossible until it is done.','Nelson Mandela'],
  ['The secret of getting ahead is getting started.','Mark Twain'],
  ['You don’t have to see the whole staircase, just take the first step.','Martin Luther King Jr.'],
  ['Focus on being productive instead of busy.','Tim Ferriss']
];
let quoteIndex = 0;

function durationFor(m=mode){ return settings[m]*60; }
function updateDisplay(){
  const mins=Math.floor(remaining/60), secs=remaining%60;
  $('timeDisplay').textContent=`${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
  const ratio=total ? remaining/total : 0;
  $('ringProgress').style.strokeDasharray=CIRCUMFERENCE;
  $('ringProgress').style.strokeDashoffset=CIRCUMFERENCE*(1-ratio);
  $('timerLabel').textContent=mode==='work'?'TIME TO FOCUS':mode==='short'?'TAKE A BREATHER':'LONG BREAK';
  $('sessionNote').textContent=mode==='work'?`Session ${completed+1} · Make it count`:'A little rest goes a long way';
  $('startText').textContent=running?'Pause timer':mode==='work'?'Start focus':'Start break';
  $('startIcon').textContent=running?'Ⅱ':'▶';
  $('completedCount').textContent=completed;
  $('focusMinutes').innerHTML=`${Math.floor(focusSeconds/60)}<span class="unit">m</span>`;
  $('streakCount').textContent=streak;
  $('goalText').textContent=`${Math.min(completed,4)} / 4 sessions`;
  $('dailyProgress').style.width=`${Math.min(completed/4,1)*100}%`;
  document.title=`${$('timeDisplay').textContent} — FocusFlow`;
}
function setMode(next, reset=true){
  pauseTimer(); mode=next;
  document.querySelectorAll('.mode').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
  if(reset){total=durationFor();remaining=total;}
  updateDisplay();
}
function startTimer(){
  if(running){pauseTimer();return;}
  if(remaining<=0)remaining=total;
  running=true; endAt=Date.now()+remaining*1000;
  ticker=setInterval(tick,250); updateDisplay();
}
function pauseTimer(){
  if(running){remaining=Math.max(0,Math.ceil((endAt-Date.now())/1000));}
  running=false;clearInterval(ticker);ticker=null;updateDisplay();
}
function tick(){
  const now=Date.now();
  remaining=Math.max(0,Math.ceil((endAt-now)/1000));
  if(mode==='work') focusSeconds += 0.25;
  updateDisplay();
  if(remaining<=0) finishSession();
}
function finishSession(){
  pauseTimer();
  if(mode==='work'){
    completed++;streak++;
    showToast('Focus session complete. Time for a break!');
    if(settings.sound) playTone();
    notify('Focus session complete','You did it. Take a moment to rest.');
    setMode(completed%settings.cycle===0?'long':'short');
  }else{
    showToast('Break complete. Ready for another focus session?');
    if(settings.sound)playTone();
    notify('Break complete','Whenever you are ready, start your next focus session.');
    setMode('work');
  }
}
function skipSession(){pauseTimer(); if(mode==='work')setMode('short');else setMode('work');}
function resetTimer(){pauseTimer();remaining=total;updateDisplay();}
function playTone(){
  try{
    audioContext=audioContext||new(window.AudioContext||window.webkitAudioContext)();
    const osc=audioContext.createOscillator(),gain=audioContext.createGain();
    osc.connect(gain);gain.connect(audioContext.destination);osc.frequency.value=660;gain.gain.setValueAtTime(.12,audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001,audioContext.currentTime+.6);osc.start();osc.stop(audioContext.currentTime+.6);
  }catch(e){/* Audio may be unavailable. */}
}
function notify(title,body){
  if(settings.notify&&'Notification'in window&&Notification.permission==='granted')new Notification(title,{body});
}
function showToast(message){
  const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(showToast.timeout);
  showToast.timeout=setTimeout(()=>el.classList.remove('show'),3000);
}
function openSettings(){
  $('workInput').value=settings.work;$('shortInput').value=settings.short;$('longInput').value=settings.long;$('cycleInput').value=settings.cycle;
  $('soundToggle').checked=settings.sound;$('notifyToggle').checked=settings.notify;
  $('settingsModal').hidden=false;
}
function closeSettings(){$('settingsModal').hidden=true;}
function saveSettings(){
  const values={work:+$('workInput').value,short:+$('shortInput').value,long:+$('longInput').value,cycle:+$('cycleInput').value};
  if(Object.values(values).some(v=>!Number.isFinite(v)||v<1)||values.work>120||values.short>60||values.long>90||values.cycle<2||values.cycle>8){
    showToast('Please enter valid timer settings.');return;
  }
  settings={...settings,...values,sound:$('soundToggle').checked,notify:$('notifyToggle').checked};
  if(settings.notify&&'Notification'in window&&Notification.permission==='default'){
    Notification.requestPermission().then(permission=>{if(permission!=='granted'){settings.notify=false;$('notifyToggle').checked=false;showToast('Notifications were not enabled by your browser.');}});
  }
  localStorage.setItem('focusflow-settings',JSON.stringify(settings));
  pauseTimer();total=durationFor();remaining=total;updateDisplay();closeSettings();showToast('Settings saved.');
}
function loadSettings(){
  try{const saved=JSON.parse(localStorage.getItem('focusflow-settings'));if(saved)settings={...defaults,...saved};}catch(e){}
}
document.querySelectorAll('.mode').forEach(btn=>btn.addEventListener('click',()=>setMode(btn.dataset.mode)));
$('startBtn').addEventListener('click',startTimer);
$('resetBtn').addEventListener('click',resetTimer);
$('skipBtn').addEventListener('click',skipSession);
$('settingsToggle').addEventListener('click',openSettings);
$('closeSettings').addEventListener('click',closeSettings);
$('cancelSettings').addEventListener('click',closeSettings);
$('saveSettings').addEventListener('click',saveSettings);
$('settingsModal').addEventListener('click',e=>{if(e.target===$('settingsModal'))closeSettings();});
$('newQuote').addEventListener('click',()=>{
  quoteIndex=(quoteIndex+1)%quotes.length;$('quoteText').textContent=quotes[quoteIndex][0];$('quoteText').nextElementSibling.textContent=`— ${quotes[quoteIndex][1]}`;
});
document.addEventListener('keydown',e=>{
  if(e.code==='Space'&&!e.repeat&&$('settingsModal').hidden){e.preventDefault();startTimer();}
  if(e.key==='Escape')closeSettings();
});
$('todayDate').textContent=new Intl.DateTimeFormat('en',{month:'short',day:'numeric'}).format(new Date());
loadSettings();total=durationFor();remaining=total;updateDisplay();
