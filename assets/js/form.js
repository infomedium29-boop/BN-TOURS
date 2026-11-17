import {siteUrl,locale} from './main.js';
const messages={hr:{error:'Provjerite obavezna polja i pokušajte ponovno.',success:'Upit je uspješno poslan. Hvala!',noKey:'Otvoren je e-mail program s pripremljenim upitom. Poruka nije automatski poslana.',failed:'Slanje trenutno nije uspjelo. Pokušajte ponovno ili nas kontaktirajte telefonom.'},en:{error:'Please check the required fields.',success:'Your enquiry has been sent. Thank you!',noKey:'Your email app will open with a prepared message. This form has not sent it automatically.',failed:'Sending failed. Please try again or call us.'},de:{error:'Bitte überprüfen Sie die Pflichtfelder.',success:'Ihre Anfrage wurde gesendet. Vielen Dank!',noKey:'Ihr E-Mail-Programm wird mit einer vorbereiteten Nachricht geöffnet. Automatisch wurde nichts gesendet.',failed:'Das Senden ist fehlgeschlagen. Versuchen Sie es erneut oder rufen Sie uns an.'}};
export function initForm(){
 const form=document.querySelector('[data-quote-form]');if(!form)return;
 const params=new URLSearchParams(location.search), language=locale();
 const city=params.get('polazak')||params.get('departure')||params.get('abfahrt')||'';
 const trip=params.get('putovanje')||params.get('trip')||params.get('reise')||'';
 if(city&&form.elements.departure)form.elements.departure.value=({'djakovo':'Đakovo','slavonski-brod':'Slavonski Brod'}[city]||city[0].toUpperCase()+city.slice(1));
 if(trip&&form.elements.destination)form.elements.destination.value=decodeURIComponent(trip).replace(/-/g,' ');
 const status=form.querySelector('[data-form-status]');function show(msg,err=false){status.textContent=msg;status.className='form-msg visible'+(err?' error':'');status.setAttribute('role','status')}
 form.addEventListener('submit',async e=>{
 e.preventDefault();if(!form.reportValidity()){show(messages[language].error,true);return}
 const data=new FormData(form),obj=Object.fromEntries(data.entries());if(obj.botcheck)return;
 const btn=form.querySelector('[type=submit]');btn.disabled=true;
 let conf={};try{const response=await fetch('/assets/js/config.json');if(response.ok)conf=await response.json()}catch{}
 const key=conf.web3forms_access_key||'';
 if(!key){const subject=encodeURIComponent(`BN Tours – ${obj.destination||'upit'} – ${obj.name||''}`);const body=encodeURIComponent(Object.entries(obj).filter(([k])=>!['botcheck','consent'].includes(k)).map(([k,v])=>`${k}: ${v}`).join('\n'));const link=`mailto:bntoursbn@hotmail.com?subject=${subject}&body=${body}`;show(messages[language].noKey);window.location.href=link;btn.disabled=false;return}
 try{data.set('access_key',key);data.set('subject',`BN Tours – ${obj.destination||'upit'} – ${obj.name}`);const res=await fetch('https://api.web3forms.com/submit',{method:'POST',body:data});const reply=await res.json();if(res.ok&&reply.success){form.reset();show(messages[language].success)}else show(messages[language].failed,true)}catch{show(messages[language].failed,true)}finally{btn.disabled=false}
 });
}
