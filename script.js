function openInvitation(){document.body.classList.add('invite-open');document.getElementById('invitation').scrollIntoView({behavior:'smooth',block:'start'});}
const openButton=document.getElementById('openInvite');
const introAudio=document.getElementById('musicIntro');
const audio=document.getElementById('song');
let musicStarted=false;
openButton.addEventListener('click',async()=>{
  openInvitation();
  if(musicStarted)return;
  musicStarted=true;
  introAudio.currentTime=0;
  try{
    await introAudio.play();
    // Switch at 8,000 ms (not at the MP3 encoder's padded end timestamp).
    window.setTimeout(async()=>{
      introAudio.pause();
      try{await audio.play()}catch(e){musicStarted=false;}
    },8000);
  }catch(e){musicStarted=false;/* Browser may block autoplay; retry on the next user tap. */}
});
const weddingTime=new Date('2026-12-04T17:00:00+02:00').getTime();
function updateCountdown(){let left=Math.max(0,weddingTime-Date.now());const vals=[Math.floor(left/86400000),Math.floor(left/3600000)%24,Math.floor(left/60000)%60,Math.floor(left/1000)%60];['days','hours','minutes','seconds'].forEach((id,i)=>{const el=document.getElementById(id);if(el)el.textContent=String(vals[i]).padStart(2,'0')})}
updateCountdown();setInterval(updateCountdown,1000);
document.getElementById('calendarButton').addEventListener('click',()=>{const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Saad and Fatima//Wedding//AR','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:saad-fatima-wedding-20261204@invitation.local','DTSTAMP:20261112T140000Z','DTSTART;TZID=Africa/Cairo:20261204T170000','DTEND;TZID=Africa/Cairo:20261204T230000','SUMMARY:زفاف سعد وفاطمة','LOCATION:فيلا نعمة، الجيزة','DESCRIPTION:يسعدنا مشاركتكم فرحتنا','BEGIN:VALARM','TRIGGER:-P1D','ACTION:DISPLAY','DESCRIPTION:تذكير: غدًا حفل زفاف سعد وفاطمة','END:VALARM','END:VEVENT','END:VCALENDAR'].join('\r\n');const blob=new Blob([ics],{type:'text/calendar;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='Saad-Fatima-Wedding.ics';a.click();URL.revokeObjectURL(url)});
function makePetal(){if(!document.body.classList.contains('invite-open'))return;const p=document.createElement('span');p.className='petal';p.textContent=Math.random()>.5?'✿':'❀';p.style.left=Math.random()*100+'%';p.style.fontSize=(10+Math.random()*10)+'px';p.style.setProperty('--drift',(Math.random()*130-65)+'px');p.style.animationDuration=(10+Math.random()*9)+'s';document.querySelector('.petals').appendChild(p);setTimeout(()=>p.remove(),20000)}setInterval(makePetal,1250);

// Share the invitation using the device's WhatsApp share flow.
document.getElementById('shareButton').addEventListener('click',()=>{const message='يسعدنا دعوتكم لحضور حفل زفاف سعد وفاطمة يوم 4 ديسمبر 2026 في فيلا نعمة - الجيزة. نتشرف بوجودكم معنا!';const url='https://wa.me/?text='+encodeURIComponent(message+' '+window.location.href);window.open(url,'_blank','noopener,noreferrer')});
