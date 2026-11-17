# Divari di stipendio – dataviz Radar QN

Sette dataviz interattive per il pezzo Radar sui divari di stipendio fra giovani e adulti e fra donne e uomini, e sulle misure della manovra 2027 (art. 42-44). Pagine statiche in D3 v7 con gli assets condivisi della skill radar-dataviz, pubblicate su GitHub Pages dalla root di `main`.

Indice con anteprime e snippet da copiare: https://elena-aquilanti.github.io/divari-stipendi/

## Dataviz

| # | Dataviz | URL | Dati | Altezza iniziale |
|---|---|---|---|---|
| 1 | Le donne guadagnano meno a ogni età | https://elena-aquilanti.github.io/divari-stipendi/eta-sesso/ | data/eta_sesso_2024.csv | 920px |
| 2 | Under 30 e over 55, euro ogni 100 | https://elena-aquilanti.github.io/divari-stipendi/giovani-adulti/ | data/serie_2014_2024.csv, data/regole_art44.csv | 770px |
| 3 | Donne e uomini 2014-2024 | https://elena-aquilanti.github.io/divari-stipendi/donne-uomini/ | data/serie_2014_2024.csv, data/regole_art44.csv | 790px |
| 4 | Precari e stabilizzazioni | https://elena-aquilanti.github.io/divari-stipendi/precari/ | data/stabilizzazioni.csv | 660px |
| 5 | Tre misure, poca strada | https://elena-aquilanti.github.io/divari-stipendi/tre-misure/ | data/misure.csv | 720px |
| 6 | Tre casi dell'1% | https://elena-aquilanti.github.io/divari-stipendi/casi-uno-per-cento/ | data/casi_uno_per_cento.csv, data/regole_art44.csv | 540px |
| 7 | Il tuo caso | https://elena-aquilanti.github.io/divari-stipendi/il-tuo-caso/ | data/regole_art44.csv | 520px |

## Dati

CSV UTF-8 con separatore `;` e virgola decimale, in `data/`. Ogni valore viene dalla scheda dati del pezzo (Fase 2); fra parentesi le righe di riferimento.

- `eta_sesso_2024.csv`: retribuzione media annua dei dipendenti privati per classe di età e sesso, 2024. Inps, Osservatorio sui lavoratori dipendenti del settore privato (D38, D40, D99).
- `serie_2014_2024.csv`: retribuzione media annua 2014-2024 per sesso e per classe di età (fino a 29, 30-54, 55 e oltre). Inps, Analisi della dinamica retributiva (D5, D6, D9, D25, D27, D95-D97).
- `stabilizzazioni.csv`: precari del settore privato (media 2024, Inps) e stabilizzazioni con esonero previste nel 2027 dalla relazione tecnica (D48, D88, D100).
- `regole_art44.csv`: parametri dell'imposta dell'1% sugli aumenti, ddl di bilancio 2027 art. 44 (D64, D69, D70). Il risparmio massimo (550 euro) è calcolato: 2.500 × (23% − 1%).
- `casi_uno_per_cento.csv`: tre esempi costruiti da Radar, non dati (D105-D107).
- `misure.csv`: le tre misure, cosa valgono e quanti ne beneficiano (D68, D76, D78, D82, D83, D90).

Tutte le quote e i divari mostrati (per esempio 48,8 euro ogni 100, 0,4%, 6,8% del divario) sono calcolati nelle pagine a partire dai CSV. Per aggiornare un grafico basta cambiare il CSV.

## Struttura

```
index.html            indice con anteprima desktop e mobile e snippet "Copia"
data/                 CSV sorgente
assets/radar.css      stile Radar (skill radar-dataviz, non modificato)
assets/radar.js       funzioni Radar (skill radar-dataviz, non modificato)
assets/embed.js       script per la pagina ospite (versione leggibile)
assets/embed.min.js   script per la pagina ospite (da incollare, con ACCOUNT da sostituire)
assets/divari.css     componenti di questo pezzo (numeri chiave, controlli, schede)
assets/divari.js      funzioni comuni ai sette grafici (regola dell'1%, barre divise)
<slug>/index.html     una cartella per dataviz
```

## Snippet per il CMS

Ogni snippet contiene l'iframe e lo script inline che adatta l'altezza e passa il tema del sito. Se in un articolo ci sono più dataviz, lo script può restare in ognuna: grazie al controllo `__radarQNv2` lavora una volta sola.

### 1. Le donne guadagnano meno a ogni età

```html
<iframe src="https://elena-aquilanti.github.io/divari-stipendi/eta-sesso/" width="100%" height="920" frameborder="0" scrolling="no" title="Le donne guadagnano meno a ogni età"></iframe>
<script>
(function(){if(window.__radarQNv2)return;window.__radarQNv2=1;var O="https://elena-aquilanti.github.io";var MQ=window.matchMedia("(prefers-color-scheme:dark)");function frames(){return Array.prototype.filter.call(document.getElementsByTagName("iframe"),function(f){return(f.getAttribute("src")||"").indexOf(O+"/")===0;});}function theme(){var t=document.documentElement.getAttribute("data-theme");return t==="dark"||t==="light"?t:(MQ.matches?"dark":"light");}function bgOf(el){for(;el&&el.nodeType===1;el=el.parentElement){var c=getComputedStyle(el).backgroundColor;if(c&&c !=="transparent"&&!/rgba\([^)]*,\s*0\)$/.test(c))return c;}return null;}function send(f){try{f.contentWindow.postMessage({sentinel:"radar-qn",type:"theme",theme:theme(),bg:bgOf(f.parentElement)},O);}catch(e){}}function sendAll(){frames().forEach(send);}window.addEventListener("message",function(e){if(e.origin !==O)return;var d=e.data;if(!d||d.sentinel !=="radar-qn"||d.type !=="height")return;frames().forEach(function(f){if(f.contentWindow !==e.source)return;var h=Math.ceil(+d.height);if(h > 0&&20000 > h)f.style.height=h+"px";send(f);});});new MutationObserver(function(){sendAll();setTimeout(sendAll,400);}).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});if(MQ.addEventListener)MQ.addEventListener("change",sendAll);})();
</script>
```

### 2. Under 30 e over 55, euro ogni 100

```html
<iframe src="https://elena-aquilanti.github.io/divari-stipendi/giovani-adulti/" width="100%" height="770" frameborder="0" scrolling="no" title="Under 30 e over 55, euro ogni 100"></iframe>
<script>
(function(){if(window.__radarQNv2)return;window.__radarQNv2=1;var O="https://elena-aquilanti.github.io";var MQ=window.matchMedia("(prefers-color-scheme:dark)");function frames(){return Array.prototype.filter.call(document.getElementsByTagName("iframe"),function(f){return(f.getAttribute("src")||"").indexOf(O+"/")===0;});}function theme(){var t=document.documentElement.getAttribute("data-theme");return t==="dark"||t==="light"?t:(MQ.matches?"dark":"light");}function bgOf(el){for(;el&&el.nodeType===1;el=el.parentElement){var c=getComputedStyle(el).backgroundColor;if(c&&c !=="transparent"&&!/rgba\([^)]*,\s*0\)$/.test(c))return c;}return null;}function send(f){try{f.contentWindow.postMessage({sentinel:"radar-qn",type:"theme",theme:theme(),bg:bgOf(f.parentElement)},O);}catch(e){}}function sendAll(){frames().forEach(send);}window.addEventListener("message",function(e){if(e.origin !==O)return;var d=e.data;if(!d||d.sentinel !=="radar-qn"||d.type !=="height")return;frames().forEach(function(f){if(f.contentWindow !==e.source)return;var h=Math.ceil(+d.height);if(h > 0&&20000 > h)f.style.height=h+"px";send(f);});});new MutationObserver(function(){sendAll();setTimeout(sendAll,400);}).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});if(MQ.addEventListener)MQ.addEventListener("change",sendAll);})();
</script>
```

### 3. Donne e uomini 2014-2024

```html
<iframe src="https://elena-aquilanti.github.io/divari-stipendi/donne-uomini/" width="100%" height="790" frameborder="0" scrolling="no" title="Donne e uomini 2014-2024"></iframe>
<script>
(function(){if(window.__radarQNv2)return;window.__radarQNv2=1;var O="https://elena-aquilanti.github.io";var MQ=window.matchMedia("(prefers-color-scheme:dark)");function frames(){return Array.prototype.filter.call(document.getElementsByTagName("iframe"),function(f){return(f.getAttribute("src")||"").indexOf(O+"/")===0;});}function theme(){var t=document.documentElement.getAttribute("data-theme");return t==="dark"||t==="light"?t:(MQ.matches?"dark":"light");}function bgOf(el){for(;el&&el.nodeType===1;el=el.parentElement){var c=getComputedStyle(el).backgroundColor;if(c&&c !=="transparent"&&!/rgba\([^)]*,\s*0\)$/.test(c))return c;}return null;}function send(f){try{f.contentWindow.postMessage({sentinel:"radar-qn",type:"theme",theme:theme(),bg:bgOf(f.parentElement)},O);}catch(e){}}function sendAll(){frames().forEach(send);}window.addEventListener("message",function(e){if(e.origin !==O)return;var d=e.data;if(!d||d.sentinel !=="radar-qn"||d.type !=="height")return;frames().forEach(function(f){if(f.contentWindow !==e.source)return;var h=Math.ceil(+d.height);if(h > 0&&20000 > h)f.style.height=h+"px";send(f);});});new MutationObserver(function(){sendAll();setTimeout(sendAll,400);}).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});if(MQ.addEventListener)MQ.addEventListener("change",sendAll);})();
</script>
```

### 4. Precari e stabilizzazioni

```html
<iframe src="https://elena-aquilanti.github.io/divari-stipendi/precari/" width="100%" height="660" frameborder="0" scrolling="no" title="Precari e stabilizzazioni"></iframe>
<script>
(function(){if(window.__radarQNv2)return;window.__radarQNv2=1;var O="https://elena-aquilanti.github.io";var MQ=window.matchMedia("(prefers-color-scheme:dark)");function frames(){return Array.prototype.filter.call(document.getElementsByTagName("iframe"),function(f){return(f.getAttribute("src")||"").indexOf(O+"/")===0;});}function theme(){var t=document.documentElement.getAttribute("data-theme");return t==="dark"||t==="light"?t:(MQ.matches?"dark":"light");}function bgOf(el){for(;el&&el.nodeType===1;el=el.parentElement){var c=getComputedStyle(el).backgroundColor;if(c&&c !=="transparent"&&!/rgba\([^)]*,\s*0\)$/.test(c))return c;}return null;}function send(f){try{f.contentWindow.postMessage({sentinel:"radar-qn",type:"theme",theme:theme(),bg:bgOf(f.parentElement)},O);}catch(e){}}function sendAll(){frames().forEach(send);}window.addEventListener("message",function(e){if(e.origin !==O)return;var d=e.data;if(!d||d.sentinel !=="radar-qn"||d.type !=="height")return;frames().forEach(function(f){if(f.contentWindow !==e.source)return;var h=Math.ceil(+d.height);if(h > 0&&20000 > h)f.style.height=h+"px";send(f);});});new MutationObserver(function(){sendAll();setTimeout(sendAll,400);}).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});if(MQ.addEventListener)MQ.addEventListener("change",sendAll);})();
</script>
```

### 5. Tre misure, poca strada

```html
<iframe src="https://elena-aquilanti.github.io/divari-stipendi/tre-misure/" width="100%" height="720" frameborder="0" scrolling="no" title="Tre misure, poca strada"></iframe>
<script>
(function(){if(window.__radarQNv2)return;window.__radarQNv2=1;var O="https://elena-aquilanti.github.io";var MQ=window.matchMedia("(prefers-color-scheme:dark)");function frames(){return Array.prototype.filter.call(document.getElementsByTagName("iframe"),function(f){return(f.getAttribute("src")||"").indexOf(O+"/")===0;});}function theme(){var t=document.documentElement.getAttribute("data-theme");return t==="dark"||t==="light"?t:(MQ.matches?"dark":"light");}function bgOf(el){for(;el&&el.nodeType===1;el=el.parentElement){var c=getComputedStyle(el).backgroundColor;if(c&&c !=="transparent"&&!/rgba\([^)]*,\s*0\)$/.test(c))return c;}return null;}function send(f){try{f.contentWindow.postMessage({sentinel:"radar-qn",type:"theme",theme:theme(),bg:bgOf(f.parentElement)},O);}catch(e){}}function sendAll(){frames().forEach(send);}window.addEventListener("message",function(e){if(e.origin !==O)return;var d=e.data;if(!d||d.sentinel !=="radar-qn"||d.type !=="height")return;frames().forEach(function(f){if(f.contentWindow !==e.source)return;var h=Math.ceil(+d.height);if(h > 0&&20000 > h)f.style.height=h+"px";send(f);});});new MutationObserver(function(){sendAll();setTimeout(sendAll,400);}).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});if(MQ.addEventListener)MQ.addEventListener("change",sendAll);})();
</script>
```

### 6. Tre casi dell'1%

```html
<iframe src="https://elena-aquilanti.github.io/divari-stipendi/casi-uno-per-cento/" width="100%" height="540" frameborder="0" scrolling="no" title="Tre casi dell'1%"></iframe>
<script>
(function(){if(window.__radarQNv2)return;window.__radarQNv2=1;var O="https://elena-aquilanti.github.io";var MQ=window.matchMedia("(prefers-color-scheme:dark)");function frames(){return Array.prototype.filter.call(document.getElementsByTagName("iframe"),function(f){return(f.getAttribute("src")||"").indexOf(O+"/")===0;});}function theme(){var t=document.documentElement.getAttribute("data-theme");return t==="dark"||t==="light"?t:(MQ.matches?"dark":"light");}function bgOf(el){for(;el&&el.nodeType===1;el=el.parentElement){var c=getComputedStyle(el).backgroundColor;if(c&&c !=="transparent"&&!/rgba\([^)]*,\s*0\)$/.test(c))return c;}return null;}function send(f){try{f.contentWindow.postMessage({sentinel:"radar-qn",type:"theme",theme:theme(),bg:bgOf(f.parentElement)},O);}catch(e){}}function sendAll(){frames().forEach(send);}window.addEventListener("message",function(e){if(e.origin !==O)return;var d=e.data;if(!d||d.sentinel !=="radar-qn"||d.type !=="height")return;frames().forEach(function(f){if(f.contentWindow !==e.source)return;var h=Math.ceil(+d.height);if(h > 0&&20000 > h)f.style.height=h+"px";send(f);});});new MutationObserver(function(){sendAll();setTimeout(sendAll,400);}).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});if(MQ.addEventListener)MQ.addEventListener("change",sendAll);})();
</script>
```

### 7. Il tuo caso

```html
<iframe src="https://elena-aquilanti.github.io/divari-stipendi/il-tuo-caso/" width="100%" height="520" frameborder="0" scrolling="no" title="Il tuo caso"></iframe>
<script>
(function(){if(window.__radarQNv2)return;window.__radarQNv2=1;var O="https://elena-aquilanti.github.io";var MQ=window.matchMedia("(prefers-color-scheme:dark)");function frames(){return Array.prototype.filter.call(document.getElementsByTagName("iframe"),function(f){return(f.getAttribute("src")||"").indexOf(O+"/")===0;});}function theme(){var t=document.documentElement.getAttribute("data-theme");return t==="dark"||t==="light"?t:(MQ.matches?"dark":"light");}function bgOf(el){for(;el&&el.nodeType===1;el=el.parentElement){var c=getComputedStyle(el).backgroundColor;if(c&&c !=="transparent"&&!/rgba\([^)]*,\s*0\)$/.test(c))return c;}return null;}function send(f){try{f.contentWindow.postMessage({sentinel:"radar-qn",type:"theme",theme:theme(),bg:bgOf(f.parentElement)},O);}catch(e){}}function sendAll(){frames().forEach(send);}window.addEventListener("message",function(e){if(e.origin !==O)return;var d=e.data;if(!d||d.sentinel !=="radar-qn"||d.type !=="height")return;frames().forEach(function(f){if(f.contentWindow !==e.source)return;var h=Math.ceil(+d.height);if(h > 0&&20000 > h)f.style.height=h+"px";send(f);});});new MutationObserver(function(){sendAll();setTimeout(sendAll,400);}).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});if(MQ.addEventListener)MQ.addEventListener("change",sendAll);})();
</script>
```

