import{A as g,_ as d}from"./EditOutlined-5bc00953.js";import{r as p,g as v}from"./index-acdb4e57.js";var C={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"}}]},name:"copy",theme:"outlined"};const b=C;var m=function(e,r){return p.createElement(g,d(d({},e),{},{ref:r,icon:b}))};m.displayName="CopyOutlined";const k=p.forwardRef(m);var w=function(){var t=document.getSelection();if(!t.rangeCount)return function(){};for(var e=document.activeElement,r=[],n=0;n<t.rangeCount;n++)r.push(t.getRangeAt(n));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return t.removeAllRanges(),function(){t.type==="Caret"&&t.removeAllRanges(),t.rangeCount||r.forEach(function(l){t.addRange(l)}),e&&e.focus()}},D=w,f={"text/plain":"Text","text/html":"Url",default:"Text"},h="Copy to clipboard: #{key}, Enter";function x(t){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return t.replace(/#{\s*key\s*}/g,e)}function E(t,e){var r,n,l,s,c,a,i=!1;e||(e={}),r=e.debug||!1;try{l=D(),s=document.createRange(),c=document.getSelection(),a=document.createElement("span"),a.textContent=t,a.ariaHidden="true",a.style.all="unset",a.style.position="fixed",a.style.top=0,a.style.clip="rect(0, 0, 0, 0)",a.style.whiteSpace="pre",a.style.webkitUserSelect="text",a.style.MozUserSelect="text",a.style.msUserSelect="text",a.style.userSelect="text",a.addEventListener("copy",function(o){if(o.stopPropagation(),e.format)if(o.preventDefault(),typeof o.clipboardData>"u"){r&&console.warn("unable to use e.clipboardData"),r&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var u=f[e.format]||f.default;window.clipboardData.setData(u,t)}else o.clipboardData.clearData(),o.clipboardData.setData(e.format,t);e.onCopy&&(o.preventDefault(),e.onCopy(o.clipboardData))}),document.body.appendChild(a),s.selectNodeContents(a),c.addRange(s);var y=document.execCommand("copy");if(!y)throw new Error("copy command was unsuccessful");i=!0}catch(o){r&&console.error("unable to copy using execCommand: ",o),r&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",t),e.onCopy&&e.onCopy(window.clipboardData),i=!0}catch(u){r&&console.error("unable to copy using clipboardData: ",u),r&&console.error("falling back to prompt"),n=x("message"in e?e.message:h),window.prompt(n,t)}}finally{c&&(typeof c.removeRange=="function"?c.removeRange(s):c.removeAllRanges()),a&&document.body.removeChild(a),l()}return i}var R=E;const H=v(R);export{k as C,H as c};
