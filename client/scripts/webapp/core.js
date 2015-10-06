/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)+1>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b="length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+K.uid++}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){
return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var aa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ba=/<([\w:]+)/,ca=/<|&#?\w+;/,da=/<(?:script|style|link)/i,ea=/checked\s*(?:[^=]|=\s*.checked.)/i,fa=/^$|\/(?:java|ecma)script/i,ga=/^true\/(.*)/,ha=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ia={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ia.optgroup=ia.option,ia.tbody=ia.tfoot=ia.colgroup=ia.caption=ia.thead,ia.th=ia.td;function ja(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function ka(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function la(a){var b=ga.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function ma(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function na(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function oa(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pa(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=oa(h),f=oa(a),d=0,e=f.length;e>d;d++)pa(f[d],g[d]);if(b)if(c)for(f=f||oa(a),g=g||oa(h),d=0,e=f.length;e>d;d++)na(f[d],g[d]);else na(a,h);return g=oa(h,"script"),g.length>0&&ma(g,!i&&oa(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(ca.test(e)){f=f||k.appendChild(b.createElement("div")),g=(ba.exec(e)||["",""])[1].toLowerCase(),h=ia[g]||ia._default,f.innerHTML=h[1]+e.replace(aa,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=oa(k.appendChild(e),"script"),i&&ma(f),c)){j=0;while(e=f[j++])fa.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(oa(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&ma(oa(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(oa(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!da.test(a)&&!ia[(ba.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(aa,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(oa(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(oa(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&ea.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(oa(c,"script"),ka),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,oa(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,la),j=0;g>j;j++)h=f[j],fa.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(ha,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qa,ra={};function sa(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function ta(a){var b=l,c=ra[a];return c||(c=sa(a,b),"none"!==c&&c||(qa=(qa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qa[0].contentDocument,b.write(),b.close(),c=sa(a,b),qa.detach()),ra[a]=c),c}var ua=/^margin/,va=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wa=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)};function xa(a,b,c){var d,e,f,g,h=a.style;return c=c||wa(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),va.test(g)&&ua.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function ya(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),f.removeChild(c),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var za=/^(none|table(?!-c[ea]).+)/,Aa=new RegExp("^("+Q+")(.*)$","i"),Ba=new RegExp("^([+-])=("+Q+")","i"),Ca={position:"absolute",visibility:"hidden",display:"block"},Da={letterSpacing:"0",fontWeight:"400"},Ea=["Webkit","O","Moz","ms"];function Fa(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Ea.length;while(e--)if(b=Ea[e]+c,b in a)return b;return d}function Ga(a,b,c){var d=Aa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Ha(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ia(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wa(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xa(a,b,f),(0>e||null==e)&&(e=a.style[b]),va.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Ha(a,b,c||(g?"border":"content"),d,f)+"px"}function Ja(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",ta(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xa(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fa(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Ba.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fa(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xa(a,b,d)),"normal"===e&&b in Da&&(e=Da[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?za.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Ca,function(){return Ia(a,b,d)}):Ia(a,b,d):void 0},set:function(a,c,d){var e=d&&wa(a);return Ga(a,c,d?Ha(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=ya(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ua.test(a)||(n.cssHooks[a+b].set=Ga)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wa(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Ja(this,!0)},hide:function(){return Ja(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Ka(a,b,c,d,e){return new Ka.prototype.init(a,b,c,d,e)}n.Tween=Ka,Ka.prototype={constructor:Ka,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ka.propHooks[this.prop];return a&&a.get?a.get(this):Ka.propHooks._default.get(this)},run:function(a){var b,c=Ka.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ka.propHooks._default.set(this),this}},Ka.prototype.init.prototype=Ka.prototype,Ka.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Ka.propHooks.scrollTop=Ka.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Ka.prototype.init,n.fx.step={};var La,Ma,Na=/^(?:toggle|show|hide)$/,Oa=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pa=/queueHooks$/,Qa=[Va],Ra={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Oa.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Oa.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sa(){return setTimeout(function(){La=void 0}),La=n.now()}function Ta(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ua(a,b,c){for(var d,e=(Ra[b]||[]).concat(Ra["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Va(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||ta(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Na.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?ta(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ua(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wa(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xa(a,b,c){var d,e,f=0,g=Qa.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=La||Sa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:La||Sa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wa(k,j.opts.specialEasing);g>f;f++)if(d=Qa[f].call(j,a,k,j.opts))return d;return n.map(k,Ua,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xa,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Ra[c]=Ra[c]||[],Ra[c].unshift(b)},prefilter:function(a,b){b?Qa.unshift(a):Qa.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xa(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pa.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Ta(b,!0),a,d,e)}}),n.each({slideDown:Ta("show"),slideUp:Ta("hide"),slideToggle:Ta("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(La=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),La=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ma||(Ma=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Ma),Ma=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Ya,Za,$a=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Za:Ya)),
void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Za={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$a[b]||n.find.attr;$a[b]=function(a,b,d){var e,f;return d||(f=$a[b],$a[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$a[b]=f),e}});var _a=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_a.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ab=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ab," ").indexOf(b)>=0)return!0;return!1}});var bb=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cb=n.now(),db=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var eb=/#.*$/,fb=/([?&])_=[^&]*/,gb=/^(.*?):[ \t]*([^\r\n]*)$/gm,hb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ib=/^(?:GET|HEAD)$/,jb=/^\/\//,kb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,lb={},mb={},nb="*/".concat("*"),ob=a.location.href,pb=kb.exec(ob.toLowerCase())||[];function qb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function rb(a,b,c,d){var e={},f=a===mb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function sb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function tb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function ub(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:ob,type:"GET",isLocal:hb.test(pb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":nb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?sb(sb(a,n.ajaxSettings),b):sb(n.ajaxSettings,a)},ajaxPrefilter:qb(lb),ajaxTransport:qb(mb),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=gb.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||ob)+"").replace(eb,"").replace(jb,pb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=kb.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===pb[1]&&h[2]===pb[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(pb[3]||("http:"===pb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),rb(lb,k,b,v),2===t)return v;i=n.event&&k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!ib.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(db.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=fb.test(d)?d.replace(fb,"$1_="+cb++):d+(db.test(d)?"&":"?")+"_="+cb++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+nb+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=rb(mb,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=tb(k,v,f)),u=ub(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var vb=/%20/g,wb=/\[\]$/,xb=/\r?\n/g,yb=/^(?:submit|button|image|reset|file)$/i,zb=/^(?:input|select|textarea|keygen)/i;function Ab(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||wb.test(a)?d(a,e):Ab(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Ab(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Ab(c,a[c],b,e);return d.join("&").replace(vb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&zb.test(this.nodeName)&&!yb.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(xb,"\r\n")}}):{name:b.name,value:c.replace(xb,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Bb=0,Cb={},Db={0:200,1223:204},Eb=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Cb)Cb[a]()}),k.cors=!!Eb&&"withCredentials"in Eb,k.ajax=Eb=!!Eb,n.ajaxTransport(function(a){var b;return k.cors||Eb&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Bb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Cb[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Db[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Cb[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Fb=[],Gb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Fb.pop()||n.expando+"_"+cb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Gb.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Gb,"$1"+e):b.jsonp!==!1&&(b.url+=(db.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Fb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Hb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Hb)return Hb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Ib=a.document.documentElement;function Jb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Jb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Ib;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ib})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Jb(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=ya(k.pixelPosition,function(a,c){return c?(c=xa(a,b),va.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Kb=a.jQuery,Lb=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Lb),b&&a.jQuery===n&&(a.jQuery=Kb),n},typeof b===U&&(a.jQuery=a.$=n),n});
//# sourceMappingURL=jquery.min.map
/*! jQuery UI - v1.10.4 - 2014-04-20
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.slider.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function(e,t){function i(t,i){var s,a,o,r=t.nodeName.toLowerCase();return"area"===r?(s=t.parentNode,a=s.name,t.href&&a&&"map"===s.nodeName.toLowerCase()?(o=e("img[usemap=#"+a+"]")[0],!!o&&n(o)):!1):(/input|select|textarea|button|object/.test(r)?!t.disabled:"a"===r?t.href||i:i)&&n(t)}function n(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var s=0,a=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"1.10.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(i,n){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),n&&n.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(i){if(i!==t)return this.css("zIndex",i);if(this.length)for(var n,s,a=e(this[0]);a.length&&a[0]!==document;){if(n=a.css("position"),("absolute"===n||"relative"===n||"fixed"===n)&&(s=parseInt(a.css("zIndex"),10),!isNaN(s)&&0!==s))return s;a=a.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++s)})},removeUniqueId:function(){return this.each(function(){a.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,n){return!!e.data(t,n[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var n=e.attr(t,"tabindex"),s=isNaN(n);return(s||n>=0)&&i(t,!s)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(i,n){function s(t,i,n,s){return e.each(a,function(){i-=parseFloat(e.css(t,"padding"+this))||0,n&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),s&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var a="Width"===n?["Left","Right"]:["Top","Bottom"],o=n.toLowerCase(),r={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+n]=function(i){return i===t?r["inner"+n].call(this):this.each(function(){e(this).css(o,s(this,i)+"px")})},e.fn["outer"+n]=function(t,i){return"number"!=typeof t?r["outer"+n].call(this,t):this.each(function(){e(this).css(o,s(this,t,!0,i)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,i,n){var s,a=e.ui[t].prototype;for(s in n)a.plugins[s]=a.plugins[s]||[],a.plugins[s].push([i,n[s]])},call:function(e,t,i){var n,s=e.plugins[t];if(s&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(n=0;s.length>n;n++)e.options[s[n][0]]&&s[n][1].apply(e.element,i)}},hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var n=i&&"left"===i?"scrollLeft":"scrollTop",s=!1;return t[n]>0?!0:(t[n]=1,s=t[n]>0,t[n]=0,s)}})})(jQuery);(function(t,e){var i=0,s=Array.prototype.slice,n=t.cleanData;t.cleanData=function(e){for(var i,s=0;null!=(i=e[s]);s++)try{t(i).triggerHandler("remove")}catch(o){}n(e)},t.widget=function(i,s,n){var o,a,r,h,l={},c=i.split(".")[0];i=i.split(".")[1],o=c+"-"+i,n||(n=s,s=t.Widget),t.expr[":"][o.toLowerCase()]=function(e){return!!t.data(e,o)},t[c]=t[c]||{},a=t[c][i],r=t[c][i]=function(t,i){return this._createWidget?(arguments.length&&this._createWidget(t,i),e):new r(t,i)},t.extend(r,a,{version:n.version,_proto:t.extend({},n),_childConstructors:[]}),h=new s,h.options=t.widget.extend({},h.options),t.each(n,function(i,n){return t.isFunction(n)?(l[i]=function(){var t=function(){return s.prototype[i].apply(this,arguments)},e=function(t){return s.prototype[i].apply(this,t)};return function(){var i,s=this._super,o=this._superApply;return this._super=t,this._superApply=e,i=n.apply(this,arguments),this._super=s,this._superApply=o,i}}(),e):(l[i]=n,e)}),r.prototype=t.widget.extend(h,{widgetEventPrefix:a?h.widgetEventPrefix||i:i},l,{constructor:r,namespace:c,widgetName:i,widgetFullName:o}),a?(t.each(a._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,r,i._proto)}),delete a._childConstructors):s._childConstructors.push(r),t.widget.bridge(i,r)},t.widget.extend=function(i){for(var n,o,a=s.call(arguments,1),r=0,h=a.length;h>r;r++)for(n in a[r])o=a[r][n],a[r].hasOwnProperty(n)&&o!==e&&(i[n]=t.isPlainObject(o)?t.isPlainObject(i[n])?t.widget.extend({},i[n],o):t.widget.extend({},o):o);return i},t.widget.bridge=function(i,n){var o=n.prototype.widgetFullName||i;t.fn[i]=function(a){var r="string"==typeof a,h=s.call(arguments,1),l=this;return a=!r&&h.length?t.widget.extend.apply(null,[a].concat(h)):a,r?this.each(function(){var s,n=t.data(this,o);return n?t.isFunction(n[a])&&"_"!==a.charAt(0)?(s=n[a].apply(n,h),s!==n&&s!==e?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):e):t.error("no such method '"+a+"' for "+i+" widget instance"):t.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+a+"'")}):this.each(function(){var e=t.data(this,o);e?e.option(a||{})._init():t.data(this,o,new n(a,this))}),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(e,s){s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this.bindings=t(),this.hoverable=t(),this.focusable=t(),s!==this&&(t.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===s&&this.destroy()}}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(i,s){var n,o,a,r=i;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof i)if(r={},n=i.split("."),i=n.shift(),n.length){for(o=r[i]=t.widget.extend({},this.options[i]),a=0;n.length-1>a;a++)o[n[a]]=o[n[a]]||{},o=o[n[a]];if(i=n.pop(),1===arguments.length)return o[i]===e?null:o[i];o[i]=s}else{if(1===arguments.length)return this.options[i]===e?null:this.options[i];r[i]=s}return this._setOptions(r),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!e).attr("aria-disabled",e),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var o,a=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=o=t(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,o=this.widget()),t.each(n,function(n,r){function h(){return i||a.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof r?a[r]:r).apply(a,arguments):e}"string"!=typeof r&&(h.guid=r.guid=r.guid||h.guid||t.guid++);var l=n.match(/^(\w+)\s*(.*)$/),c=l[1]+a.eventNamespace,u=l[2];u?o.delegate(u,c,h):s.bind(c,h)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(e).undelegate(e)},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){"string"==typeof n&&(n={effect:n});var a,r=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue(function(i){t(this)[e](),o&&o.call(s[0]),i()})}})})(jQuery);(function(t){var e=!1;t(document).mouseup(function(){e=!1}),t.widget("ui.mouse",{version:"1.10.4",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.bind("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).bind("click."+this.widgetName,function(i){return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):undefined}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&t(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!e){this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var s=this,n=1===i.which,a="string"==typeof this.options.cancel&&i.target.nodeName?t(i.target).closest(this.options.cancel).length:!1;return n&&!a&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){s.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,!this._mouseStarted)?(i.preventDefault(),!0):(!0===t.data(i.target,this.widgetName+".preventClickEvent")&&t.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return s._mouseMove(t)},this._mouseUpDelegate=function(t){return s._mouseUp(t)},t(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),e=!0,!0)):!0}},_mouseMove:function(e){return t.ui.ie&&(!document.documentMode||9>document.documentMode)&&!e.button?this._mouseUp(e):this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(e){return t(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&t.data(e.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(e)),!1},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})})(jQuery);(function(t){var e=5;t.widget("ui.slider",t.ui.mouse,{version:"1.10.4",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var e,i,s=this.options,n=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),a="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",o=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),e=n.length;i>e;e++)o.push(a);this.handles=n.add(t(o.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(e){t(this).data("ui-slider-handle-index",e)})},_createRange:function(){var e=this.options,i="";e.range?(e.range===!0&&(e.values?e.values.length&&2!==e.values.length?e.values=[e.values[0],e.values[0]]:t.isArray(e.values)&&(e.values=e.values.slice(0)):e.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=t("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===e.range||"max"===e.range?" ui-slider-range-"+e.range:""))):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){var t=this.handles.add(this.range).filter("a");this._off(t),this._on(t,this._handleEvents),this._hoverable(t),this._focusable(t)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(e){var i,s,n,a,o,r,l,h,u=this,c=this.options;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:e.pageX,y:e.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(e){var i=Math.abs(s-u.values(e));(n>i||n===i&&(e===u._lastChangedValue||u.values(e)===c.min))&&(n=i,a=t(this),o=e)}),r=this._start(e,o),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=o,a.addClass("ui-state-active").focus(),l=a.offset(),h=!t(e.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=h?{left:0,top:0}:{left:e.pageX-l.left-a.width()/2,top:e.pageY-l.top-a.height()/2-(parseInt(a.css("borderTopWidth"),10)||0)-(parseInt(a.css("borderBottomWidth"),10)||0)+(parseInt(a.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(e,o,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(t){var e={x:t.pageX,y:t.pageY},i=this._normValueFromMouse(e);return this._slide(t,this._handleIndex,i),!1},_mouseStop:function(t){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(t,this._handleIndex),this._change(t,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(t){var e,i,s,n,a;return"horizontal"===this.orientation?(e=this.elementSize.width,i=t.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(e=this.elementSize.height,i=t.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/e,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),a=this._valueMin()+s*n,this._trimAlignValue(a)},_start:function(t,e){var i={handle:this.handles[e],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("start",t,i)},_slide:function(t,e,i){var s,n,a;this.options.values&&this.options.values.length?(s=this.values(e?0:1),2===this.options.values.length&&this.options.range===!0&&(0===e&&i>s||1===e&&s>i)&&(i=s),i!==this.values(e)&&(n=this.values(),n[e]=i,a=this._trigger("slide",t,{handle:this.handles[e],value:i,values:n}),s=this.values(e?0:1),a!==!1&&this.values(e,i))):i!==this.value()&&(a=this._trigger("slide",t,{handle:this.handles[e],value:i}),a!==!1&&this.value(i))},_stop:function(t,e){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("stop",t,i)},_change:function(t,e){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._lastChangedValue=e,this._trigger("change",t,i)}},value:function(t){return arguments.length?(this.options.value=this._trimAlignValue(t),this._refreshValue(),this._change(null,0),undefined):this._value()},values:function(e,i){var s,n,a;if(arguments.length>1)return this.options.values[e]=this._trimAlignValue(i),this._refreshValue(),this._change(null,e),undefined;if(!arguments.length)return this._values();if(!t.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(e):this.value();for(s=this.options.values,n=arguments[0],a=0;s.length>a;a+=1)s[a]=this._trimAlignValue(n[a]),this._change(null,a);this._refreshValue()},_setOption:function(e,i){var s,n=0;switch("range"===e&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),t.isArray(this.options.values)&&(n=this.options.values.length),t.Widget.prototype._setOption.apply(this,arguments),e){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=0;n>s;s+=1)this._change(null,s);this._animateOff=!1;break;case"min":case"max":this._animateOff=!0,this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var t=this.options.value;return t=this._trimAlignValue(t)},_values:function(t){var e,i,s;if(arguments.length)return e=this.options.values[t],e=this._trimAlignValue(e);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(t){if(this._valueMin()>=t)return this._valueMin();if(t>=this._valueMax())return this._valueMax();var e=this.options.step>0?this.options.step:1,i=(t-this._valueMin())%e,s=t-i;return 2*Math.abs(i)>=e&&(s+=i>0?e:-e),parseFloat(s.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var e,i,s,n,a,o=this.options.range,r=this.options,l=this,h=this._animateOff?!1:r.animate,u={};this.options.values&&this.options.values.length?this.handles.each(function(s){i=100*((l.values(s)-l._valueMin())/(l._valueMax()-l._valueMin())),u["horizontal"===l.orientation?"left":"bottom"]=i+"%",t(this).stop(1,1)[h?"animate":"css"](u,r.animate),l.options.range===!0&&("horizontal"===l.orientation?(0===s&&l.range.stop(1,1)[h?"animate":"css"]({left:i+"%"},r.animate),1===s&&l.range[h?"animate":"css"]({width:i-e+"%"},{queue:!1,duration:r.animate})):(0===s&&l.range.stop(1,1)[h?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&l.range[h?"animate":"css"]({height:i-e+"%"},{queue:!1,duration:r.animate}))),e=i}):(s=this.value(),n=this._valueMin(),a=this._valueMax(),i=a!==n?100*((s-n)/(a-n)):0,u["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[h?"animate":"css"](u,r.animate),"min"===o&&"horizontal"===this.orientation&&this.range.stop(1,1)[h?"animate":"css"]({width:i+"%"},r.animate),"max"===o&&"horizontal"===this.orientation&&this.range[h?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:r.animate}),"min"===o&&"vertical"===this.orientation&&this.range.stop(1,1)[h?"animate":"css"]({height:i+"%"},r.animate),"max"===o&&"vertical"===this.orientation&&this.range[h?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:r.animate}))},_handleEvents:{keydown:function(i){var s,n,a,o,r=t(i.target).data("ui-slider-handle-index");switch(i.keyCode){case t.ui.keyCode.HOME:case t.ui.keyCode.END:case t.ui.keyCode.PAGE_UP:case t.ui.keyCode.PAGE_DOWN:case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(i.preventDefault(),!this._keySliding&&(this._keySliding=!0,t(i.target).addClass("ui-state-active"),s=this._start(i,r),s===!1))return}switch(o=this.options.step,n=a=this.options.values&&this.options.values.length?this.values(r):this.value(),i.keyCode){case t.ui.keyCode.HOME:a=this._valueMin();break;case t.ui.keyCode.END:a=this._valueMax();break;case t.ui.keyCode.PAGE_UP:a=this._trimAlignValue(n+(this._valueMax()-this._valueMin())/e);break;case t.ui.keyCode.PAGE_DOWN:a=this._trimAlignValue(n-(this._valueMax()-this._valueMin())/e);break;case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:if(n===this._valueMax())return;a=this._trimAlignValue(n+o);break;case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(n===this._valueMin())return;a=this._trimAlignValue(n-o)}this._slide(i,r,a)},click:function(t){t.preventDefault()},keyup:function(e){var i=t(e.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(e,i),this._change(e,i),t(e.target).removeClass("ui-state-active"))}}})})(jQuery);
/*!
 * jQuery Validation Plugin v1.13.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2014 Jörn Zaefferer
 * Released under the MIT license
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery"], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

$.extend($.fn, {
	// http://jqueryvalidation.org/validate/
	validate: function( options ) {

		// if nothing is selected, return nothing; can't chain anyway
		if ( !this.length ) {
			if ( options && options.debug && window.console ) {
				console.warn( "Nothing selected, can't validate, returning nothing." );
			}
			return;
		}

		// check if a validator for this form was already created
		var validator = $.data( this[ 0 ], "validator" );
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr( "novalidate", "novalidate" );

		validator = new $.validator( options, this[ 0 ] );
		$.data( this[ 0 ], "validator", validator );

		if ( validator.settings.onsubmit ) {

			this.validateDelegate( ":submit", "click", function( event ) {
				if ( validator.settings.submitHandler ) {
					validator.submitButton = event.target;
				}
				// allow suppressing validation by adding a cancel class to the submit button
				if ( $( event.target ).hasClass( "cancel" ) ) {
					validator.cancelSubmit = true;
				}

				// allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
				if ( $( event.target ).attr( "formnovalidate" ) !== undefined ) {
					validator.cancelSubmit = true;
				}
			});

			// validate the form on submit
			this.submit( function( event ) {
				if ( validator.settings.debug ) {
					// prevent form submit to be able to see console output
					event.preventDefault();
				}
				function handle() {
					var hidden;
					if ( validator.settings.submitHandler ) {
						if ( validator.submitButton ) {
							// insert a hidden input as a replacement for the missing submit button
							hidden = $( "<input type='hidden'/>" )
								.attr( "name", validator.submitButton.name )
								.val( $( validator.submitButton ).val() )
								.appendTo( validator.currentForm );
						}
						validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if ( validator.submitButton ) {
							// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						return false;
					}
					return true;
				}

				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			});
		}

		return validator;
	},
	// http://jqueryvalidation.org/valid/
	valid: function() {
		var valid, validator;

		if ( $( this[ 0 ] ).is( "form" ) ) {
			valid = this.validate().form();
		} else {
			valid = true;
			validator = $( this[ 0 ].form ).validate();
			this.each( function() {
				valid = validator.element( this ) && valid;
			});
		}
		return valid;
	},
	// attributes: space separated list of attributes to retrieve and remove
	removeAttrs: function( attributes ) {
		var result = {},
			$element = this;
		$.each( attributes.split( /\s/ ), function( index, value ) {
			result[ value ] = $element.attr( value );
			$element.removeAttr( value );
		});
		return result;
	},
	// http://jqueryvalidation.org/rules/
	rules: function( command, argument ) {
		var element = this[ 0 ],
			settings, staticRules, existingRules, data, param, filtered;

		if ( command ) {
			settings = $.data( element.form, "validator" ).settings;
			staticRules = settings.rules;
			existingRules = $.validator.staticRules( element );
			switch ( command ) {
			case "add":
				$.extend( existingRules, $.validator.normalizeRule( argument ) );
				// remove messages from rules, but allow them to be set separately
				delete existingRules.messages;
				staticRules[ element.name ] = existingRules;
				if ( argument.messages ) {
					settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
				}
				break;
			case "remove":
				if ( !argument ) {
					delete staticRules[ element.name ];
					return existingRules;
				}
				filtered = {};
				$.each( argument.split( /\s/ ), function( index, method ) {
					filtered[ method ] = existingRules[ method ];
					delete existingRules[ method ];
					if ( method === "required" ) {
						$( element ).removeAttr( "aria-required" );
					}
				});
				return filtered;
			}
		}

		data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.classRules( element ),
			$.validator.attributeRules( element ),
			$.validator.dataRules( element ),
			$.validator.staticRules( element )
		), element );

		// make sure required is at front
		if ( data.required ) {
			param = data.required;
			delete data.required;
			data = $.extend( { required: param }, data );
			$( element ).attr( "aria-required", "true" );
		}

		// make sure remote is at back
		if ( data.remote ) {
			param = data.remote;
			delete data.remote;
			data = $.extend( data, { remote: param });
		}

		return data;
	}
});

// Custom selectors
$.extend( $.expr[ ":" ], {
	// http://jqueryvalidation.org/blank-selector/
	blank: function( a ) {
		return !$.trim( "" + $( a ).val() );
	},
	// http://jqueryvalidation.org/filled-selector/
	filled: function( a ) {
		return !!$.trim( "" + $( a ).val() );
	},
	// http://jqueryvalidation.org/unchecked-selector/
	unchecked: function( a ) {
		return !$( a ).prop( "checked" );
	}
});

// constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

// http://jqueryvalidation.org/jQuery.validator.format/
$.validator.format = function( source, params ) {
	if ( arguments.length === 1 ) {
		return function() {
			var args = $.makeArray( arguments );
			args.unshift( source );
			return $.validator.format.apply( this, args );
		};
	}
	if ( arguments.length > 2 && params.constructor !== Array  ) {
		params = $.makeArray( arguments ).slice( 1 );
	}
	if ( params.constructor !== Array ) {
		params = [ params ];
	}
	$.each( params, function( i, n ) {
		source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
			return n;
		});
	});
	return source;
};

$.extend( $.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		validClass: "valid",
		errorElement: "label",
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function( element ) {
			this.lastActive = element;

			// hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
				if ( this.settings.unhighlight ) {
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				}
				this.hideThese( this.errorsFor( element ) );
			}
		},
		onfocusout: function( element ) {
			if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
				this.element( element );
			}
		},
		onkeyup: function( element, event ) {
			if ( event.which === 9 && this.elementValue( element ) === "" ) {
				return;
			} else if ( element.name in this.submitted || element === this.lastElement ) {
				this.element( element );
			}
		},
		onclick: function( element ) {
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) {
				this.element( element );

			// or option elements, check parent select in that case
			} else if ( element.parentNode.name in this.submitted ) {
				this.element( element.parentNode );
			}
		},
		highlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
			} else {
				$( element ).addClass( errorClass ).removeClass( validClass );
			}
		},
		unhighlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
			} else {
				$( element ).removeClass( errorClass ).addClass( validClass );
			}
		}
	},

	// http://jqueryvalidation.org/jQuery.validator.setDefaults/
	setDefaults: function( settings ) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date ( ISO ).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format( "Please enter no more than {0} characters." ),
		minlength: $.validator.format( "Please enter at least {0} characters." ),
		rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
		range: $.validator.format( "Please enter a value between {0} and {1}." ),
		max: $.validator.format( "Please enter a value less than or equal to {0}." ),
		min: $.validator.format( "Please enter a value greater than or equal to {0}." )
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $( this.settings.errorLabelContainer );
			this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
			this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = ( this.groups = {} ),
				rules;
			$.each( this.settings.groups, function( key, value ) {
				if ( typeof value === "string" ) {
					value = value.split( /\s/ );
				}
				$.each( value, function( index, name ) {
					groups[ name ] = key;
				});
			});
			rules = this.settings.rules;
			$.each( rules, function( key, value ) {
				rules[ key ] = $.validator.normalizeRule( value );
			});

			function delegate( event ) {
				var validator = $.data( this[ 0 ].form, "validator" ),
					eventType = "on" + event.type.replace( /^validate/, "" ),
					settings = validator.settings;
				if ( settings[ eventType ] && !this.is( settings.ignore ) ) {
					settings[ eventType ].call( validator, this[ 0 ], event );
				}
			}
			$( this.currentForm )
				.validateDelegate( ":text, [type='password'], [type='file'], select, textarea, " +
					"[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
					"[type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], " +
					"[type='range'], [type='color'], [type='radio'], [type='checkbox']",
					"focusin focusout keyup", delegate)
				// Support: Chrome, oldIE
				// "select" is provided as event.target when clicking a option
				.validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", delegate);

			if ( this.settings.invalidHandler ) {
				$( this.currentForm ).bind( "invalid-form.validate", this.settings.invalidHandler );
			}

			// Add aria-required to any Static/Data/Class required fields before first validation
			// Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
			$( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
		},

		// http://jqueryvalidation.org/Validator.form/
		form: function() {
			this.checkForm();
			$.extend( this.submitted, this.errorMap );
			this.invalid = $.extend({}, this.errorMap );
			if ( !this.valid() ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
			}
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
				this.check( elements[ i ] );
			}
			return this.valid();
		},

		// http://jqueryvalidation.org/Validator.element/
		element: function( element ) {
			var cleanElement = this.clean( element ),
				checkElement = this.validationTargetFor( cleanElement ),
				result = true;

			this.lastElement = checkElement;

			if ( checkElement === undefined ) {
				delete this.invalid[ cleanElement.name ];
			} else {
				this.prepareElement( checkElement );
				this.currentElements = $( checkElement );

				result = this.check( checkElement ) !== false;
				if ( result ) {
					delete this.invalid[ checkElement.name ];
				} else {
					this.invalid[ checkElement.name ] = true;
				}
			}
			// Add aria-invalid status for screen readers
			$( element ).attr( "aria-invalid", !result );

			if ( !this.numberOfInvalids() ) {
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://jqueryvalidation.org/Validator.showErrors/
		showErrors: function( errors ) {
			if ( errors ) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[ name ],
						element: this.findByName( name )[ 0 ]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function( element ) {
					return !( element.name in errors );
				});
			}
			if ( this.settings.showErrors ) {
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			} else {
				this.defaultShowErrors();
			}
		},

		// http://jqueryvalidation.org/Validator.resetForm/
		resetForm: function() {
			if ( $.fn.resetForm ) {
				$( this.currentForm ).resetForm();
			}
			this.submitted = {};
			this.lastElement = null;
			this.prepareForm();
			this.hideErrors();
			this.elements()
					.removeClass( this.settings.errorClass )
					.removeData( "previousValue" )
					.removeAttr( "aria-invalid" );
		},

		numberOfInvalids: function() {
			return this.objectLength( this.invalid );
		},

		objectLength: function( obj ) {
			/* jshint unused: false */
			var count = 0,
				i;
			for ( i in obj ) {
				count++;
			}
			return count;
		},

		hideErrors: function() {
			this.hideThese( this.toHide );
		},

		hideThese: function( errors ) {
			errors.not( this.containers ).text( "" );
			this.addWrapper( errors ).hide();
		},

		valid: function() {
			return this.size() === 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if ( this.settings.focusInvalid ) {
				try {
					$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [])
					.filter( ":visible" )
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger( "focusin" );
				} catch ( e ) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep( this.errorList, function( n ) {
				return n.element.name === lastActive.name;
			}).length === 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// select all valid inputs inside the form (no submit or reset buttons)
			return $( this.currentForm )
			.find( "input, select, textarea" )
			.not( ":submit, :reset, :image, [disabled]" )
			.not( this.settings.ignore )
			.filter( function() {
				if ( !this.name && validator.settings.debug && window.console ) {
					console.error( "%o has no name assigned", this );
				}

				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
					return false;
				}

				rulesCache[ this.name ] = true;
				return true;
			});
		},

		clean: function( selector ) {
			return $( selector )[ 0 ];
		},

		errors: function() {
			var errorClass = this.settings.errorClass.split( " " ).join( "." );
			return $( this.settings.errorElement + "." + errorClass, this.errorContext );
		},

		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $( [] );
			this.toHide = $( [] );
			this.currentElements = $( [] );
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor( element );
		},

		elementValue: function( element ) {
			var val,
				$element = $( element ),
				type = element.type;

			if ( type === "radio" || type === "checkbox" ) {
				return $( "input[name='" + element.name + "']:checked" ).val();
			} else if ( type === "number" && typeof element.validity !== "undefined" ) {
				return element.validity.badInput ? false : $element.val();
			}

			val = $element.val();
			if ( typeof val === "string" ) {
				return val.replace(/\r/g, "" );
			}
			return val;
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $( element ).rules(),
				rulesCount = $.map( rules, function( n, i ) {
					return i;
				}).length,
				dependencyMismatch = false,
				val = this.elementValue( element ),
				result, method, rule;

			for ( method in rules ) {
				rule = { method: method, parameters: rules[ method ] };
				try {

					result = $.validator.methods[ method ].call( this, val, element, rule.parameters );

					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" && rulesCount === 1 ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result === "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor( element ) );
						return;
					}

					if ( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch ( e ) {
					if ( this.settings.debug && window.console ) {
						console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
					}
					throw e;
				}
			}
			if ( dependencyMismatch ) {
				return;
			}
			if ( this.objectLength( rules ) ) {
				this.successList.push( element );
			}
			return true;
		},

		// return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		// return the generic message if present and no method specific message is present
		customDataMessage: function( element, method ) {
			return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
				method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
		},

		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[ name ];
			return m && ( m.constructor === String ? m : m[ method ]);
		},

		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for ( var i = 0; i < arguments.length; i++) {
				if ( arguments[ i ] !== undefined ) {
					return arguments[ i ];
				}
			}
			return undefined;
		},

		defaultMessage: function( element, method ) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customDataMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[ method ],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message === "function" ) {
				message = message.call( this, rule.parameters, element );
			} else if ( theregex.test( message ) ) {
				message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
			}
			this.errorList.push({
				message: message,
				element: element,
				method: rule.method
			});

			this.errorMap[ element.name ] = message;
			this.submitted[ element.name ] = message;
		},

		addWrapper: function( toToggle ) {
			if ( this.settings.wrapper ) {
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			}
			return toToggle;
		},

		defaultShowErrors: function() {
			var i, elements, error;
			for ( i = 0; this.errorList[ i ]; i++ ) {
				error = this.errorList[ i ];
				if ( this.settings.highlight ) {
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				}
				this.showLabel( error.element, error.message );
			}
			if ( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if ( this.settings.success ) {
				for ( i = 0; this.successList[ i ]; i++ ) {
					this.showLabel( this.successList[ i ] );
				}
			}
			if ( this.settings.unhighlight ) {
				for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not( this.invalidElements() );
		},

		invalidElements: function() {
			return $( this.errorList ).map(function() {
				return this.element;
			});
		},

		showLabel: function( element, message ) {
			var place, group, errorID,
				error = this.errorsFor( element ),
				elementID = this.idOrName( element ),
				describedBy = $( element ).attr( "aria-describedby" );
			if ( error.length ) {
				// refresh error/success class
				error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
				// replace message on existing label
				error.html( message );
			} else {
				// create error element
				error = $( "<" + this.settings.errorElement + ">" )
					.attr( "id", elementID + "-error" )
					.addClass( this.settings.errorClass )
					.html( message || "" );

				// Maintain reference to the element to be placed into the DOM
				place = error;
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
				}
				if ( this.labelContainer.length ) {
					this.labelContainer.append( place );
				} else if ( this.settings.errorPlacement ) {
					this.settings.errorPlacement( place, $( element ) );
				} else {
					place.insertAfter( element );
				}

				// Link error back to the element
				if ( error.is( "label" ) ) {
					// If the error is a label, then associate using 'for'
					error.attr( "for", elementID );
				} else if ( error.parents( "label[for='" + elementID + "']" ).length === 0 ) {
					// If the element is not a child of an associated label, then it's necessary
					// to explicitly apply aria-describedby

					errorID = error.attr( "id" );
					// Respect existing non-error aria-describedby
					if ( !describedBy ) {
						describedBy = errorID;
					} else if ( !describedBy.match( new RegExp( "\b" + errorID + "\b" ) ) ) {
						// Add to end of list if not already present
						describedBy += " " + errorID;
					}
					$( element ).attr( "aria-describedby", describedBy );

					// If this element is grouped, then assign to all elements in the same group
					group = this.groups[ element.name ];
					if ( group ) {
						$.each( this.groups, function( name, testgroup ) {
							if ( testgroup === group ) {
								$( "[name='" + name + "']", this.currentForm )
									.attr( "aria-describedby", error.attr( "id" ) );
							}
						});
					}
				}
			}
			if ( !message && this.settings.success ) {
				error.text( "" );
				if ( typeof this.settings.success === "string" ) {
					error.addClass( this.settings.success );
				} else {
					this.settings.success( error, element );
				}
			}
			this.toShow = this.toShow.add( error );
		},

		errorsFor: function( element ) {
			var name = this.idOrName( element ),
				describer = $( element ).attr( "aria-describedby" ),
				selector = "label[for='" + name + "'], label[for='" + name + "'] *";
			// aria-describedby should directly reference the error element
			if ( describer ) {
				selector = selector + ", #" + describer.replace( /\s+/g, ", #" );
			}
			return this
				.errors()
				.filter( selector );
		},

		idOrName: function( element ) {
			return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
		},

		validationTargetFor: function( element ) {
			// if radio/checkbox, validate first element in group instead
			if ( this.checkable( element ) ) {
				element = this.findByName( element.name ).not( this.settings.ignore )[ 0 ];
			}
			return element;
		},

		checkable: function( element ) {
			return ( /radio|checkbox/i ).test( element.type );
		},

		findByName: function( name ) {
			return $( this.currentForm ).find( "[name='" + name + "']" );
		},

		getLength: function( value, element ) {
			switch ( element.nodeName.toLowerCase() ) {
			case "select":
				return $( "option:selected", element ).length;
			case "input":
				if ( this.checkable( element ) ) {
					return this.findByName( element.name ).filter( ":checked" ).length;
				}
			}
			return value.length;
		},

		depend: function( param, element ) {
			return this.dependTypes[typeof param] ? this.dependTypes[typeof param]( param, element ) : true;
		},

		dependTypes: {
			"boolean": function( param ) {
				return param;
			},
			"string": function( param, element ) {
				return !!$( param, element.form ).length;
			},
			"function": function( param, element ) {
				return param( element );
			}
		},

		optional: function( element ) {
			var val = this.elementValue( element );
			return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
		},

		startRequest: function( element ) {
			if ( !this.pending[ element.name ] ) {
				this.pendingRequest++;
				this.pending[ element.name ] = true;
			}
		},

		stopRequest: function( element, valid ) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if ( this.pendingRequest < 0 ) {
				this.pendingRequest = 0;
			}
			delete this.pending[ element.name ];
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
				$( this.currentForm ).submit();
				this.formSubmitted = false;
			} else if (!valid && this.pendingRequest === 0 && this.formSubmitted ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
				this.formSubmitted = false;
			}
		},

		previousValue: function( element ) {
			return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		}

	},

	classRuleSettings: {
		required: { required: true },
		email: { email: true },
		url: { url: true },
		date: { date: true },
		dateISO: { dateISO: true },
		number: { number: true },
		digits: { digits: true },
		creditcard: { creditcard: true }
	},

	addClassRules: function( className, rules ) {
		if ( className.constructor === String ) {
			this.classRuleSettings[ className ] = rules;
		} else {
			$.extend( this.classRuleSettings, className );
		}
	},

	classRules: function( element ) {
		var rules = {},
			classes = $( element ).attr( "class" );

		if ( classes ) {
			$.each( classes.split( " " ), function() {
				if ( this in $.validator.classRuleSettings ) {
					$.extend( rules, $.validator.classRuleSettings[ this ]);
				}
			});
		}
		return rules;
	},

	attributeRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {

			// support for <input required> in both html5 and older browsers
			if ( method === "required" ) {
				value = element.getAttribute( method );
				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if ( value === "" ) {
					value = true;
				}
				// force non-HTML5 browsers to return bool
				value = !!value;
			} else {
				value = $element.attr( method );
			}

			// convert the value to a number for number inputs, and for text for backwards compability
			// allows type="date" and others to be compared as strings
			if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
				value = Number( value );
			}

			if ( value || value === 0 ) {
				rules[ method ] = value;
			} else if ( type === method && type !== "range" ) {
				// exception: the jquery validate 'range' method
				// does not test for the html5 'range' type
				rules[ method ] = true;
			}
		}

		// maxlength may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
		if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
			delete rules.maxlength;
		}

		return rules;
	},

	dataRules: function( element ) {
		var method, value,
			rules = {}, $element = $( element );
		for ( method in $.validator.methods ) {
			value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
			if ( value !== undefined ) {
				rules[ method ] = value;
			}
		}
		return rules;
	},

	staticRules: function( element ) {
		var rules = {},
			validator = $.data( element.form, "validator" );

		if ( validator.settings.rules ) {
			rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
		}
		return rules;
	},

	normalizeRules: function( rules, element ) {
		// handle dependency check
		$.each( rules, function( prop, val ) {
			// ignore rule when param is explicitly false, eg. required:false
			if ( val === false ) {
				delete rules[ prop ];
				return;
			}
			if ( val.param || val.depends ) {
				var keepRule = true;
				switch ( typeof val.depends ) {
				case "string":
					keepRule = !!$( val.depends, element.form ).length;
					break;
				case "function":
					keepRule = val.depends.call( element, element );
					break;
				}
				if ( keepRule ) {
					rules[ prop ] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[ prop ];
				}
			}
		});

		// evaluate parameters
		$.each( rules, function( rule, parameter ) {
			rules[ rule ] = $.isFunction( parameter ) ? parameter( element ) : parameter;
		});

		// clean number parameters
		$.each([ "minlength", "maxlength" ], function() {
			if ( rules[ this ] ) {
				rules[ this ] = Number( rules[ this ] );
			}
		});
		$.each([ "rangelength", "range" ], function() {
			var parts;
			if ( rules[ this ] ) {
				if ( $.isArray( rules[ this ] ) ) {
					rules[ this ] = [ Number( rules[ this ][ 0 ]), Number( rules[ this ][ 1 ] ) ];
				} else if ( typeof rules[ this ] === "string" ) {
					parts = rules[ this ].replace(/[\[\]]/g, "" ).split( /[\s,]+/ );
					rules[ this ] = [ Number( parts[ 0 ]), Number( parts[ 1 ] ) ];
				}
			}
		});

		if ( $.validator.autoCreateRanges ) {
			// auto-create ranges
			if ( rules.min && rules.max ) {
				rules.range = [ rules.min, rules.max ];
				delete rules.min;
				delete rules.max;
			}
			if ( rules.minlength && rules.maxlength ) {
				rules.rangelength = [ rules.minlength, rules.maxlength ];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function( data ) {
		if ( typeof data === "string" ) {
			var transformed = {};
			$.each( data.split( /\s/ ), function() {
				transformed[ this ] = true;
			});
			data = transformed;
		}
		return data;
	},

	// http://jqueryvalidation.org/jQuery.validator.addMethod/
	addMethod: function( name, method, message ) {
		$.validator.methods[ name ] = method;
		$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
		if ( method.length < 3 ) {
			$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
		}
	},

	methods: {

		// http://jqueryvalidation.org/required-method/
		required: function( value, element, param ) {
			// check if dependency is met
			if ( !this.depend( param, element ) ) {
				return "dependency-mismatch";
			}
			if ( element.nodeName.toLowerCase() === "select" ) {
				// could be an array for select-multiple or a string, both are fine this way
				var val = $( element ).val();
				return val && val.length > 0;
			}
			if ( this.checkable( element ) ) {
				return this.getLength( value, element ) > 0;
			}
			return $.trim( value ).length > 0;
		},

		// http://jqueryvalidation.org/email-method/
		email: function( value, element ) {
			// From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
			// Retrieved 2014-01-14
			// If you have a problem with this implementation, report a bug against the above spec
			// Or use custom methods to implement your own email validation
			return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
		},

		// http://jqueryvalidation.org/url-method/
		url: function( value, element ) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional( element ) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test( value );
		},

		// http://jqueryvalidation.org/date-method/
		date: function( value, element ) {
			return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
		},

		// http://jqueryvalidation.org/dateISO-method/
		dateISO: function( value, element ) {
			return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
		},

		// http://jqueryvalidation.org/number-method/
		number: function( value, element ) {
			return this.optional( element ) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
		},

		// http://jqueryvalidation.org/digits-method/
		digits: function( value, element ) {
			return this.optional( element ) || /^\d+$/.test( value );
		},

		// http://jqueryvalidation.org/creditcard-method/
		// based on http://en.wikipedia.org/wiki/Luhn/
		creditcard: function( value, element ) {
			if ( this.optional( element ) ) {
				return "dependency-mismatch";
			}
			// accept only spaces, digits and dashes
			if ( /[^0-9 \-]+/.test( value ) ) {
				return false;
			}
			var nCheck = 0,
				nDigit = 0,
				bEven = false,
				n, cDigit;

			value = value.replace( /\D/g, "" );

			// Basing min and max length on
			// http://developer.ean.com/general_info/Valid_Credit_Card_Types
			if ( value.length < 13 || value.length > 19 ) {
				return false;
			}

			for ( n = value.length - 1; n >= 0; n--) {
				cDigit = value.charAt( n );
				nDigit = parseInt( cDigit, 10 );
				if ( bEven ) {
					if ( ( nDigit *= 2 ) > 9 ) {
						nDigit -= 9;
					}
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return ( nCheck % 10 ) === 0;
		},

		// http://jqueryvalidation.org/minlength-method/
		minlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( $.trim( value ), element );
			return this.optional( element ) || length >= param;
		},

		// http://jqueryvalidation.org/maxlength-method/
		maxlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( $.trim( value ), element );
			return this.optional( element ) || length <= param;
		},

		// http://jqueryvalidation.org/rangelength-method/
		rangelength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( $.trim( value ), element );
			return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
		},

		// http://jqueryvalidation.org/min-method/
		min: function( value, element, param ) {
			return this.optional( element ) || value >= param;
		},

		// http://jqueryvalidation.org/max-method/
		max: function( value, element, param ) {
			return this.optional( element ) || value <= param;
		},

		// http://jqueryvalidation.org/range-method/
		range: function( value, element, param ) {
			return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
		},

		// http://jqueryvalidation.org/equalTo-method/
		equalTo: function( value, element, param ) {
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $( param );
			if ( this.settings.onfocusout ) {
				target.unbind( ".validate-equalTo" ).bind( "blur.validate-equalTo", function() {
					$( element ).valid();
				});
			}
			return value === target.val();
		},

		// http://jqueryvalidation.org/remote-method/
		remote: function( value, element, param ) {
			if ( this.optional( element ) ) {
				return "dependency-mismatch";
			}

			var previous = this.previousValue( element ),
				validator, data;

			if (!this.settings.messages[ element.name ] ) {
				this.settings.messages[ element.name ] = {};
			}
			previous.originalMessage = this.settings.messages[ element.name ].remote;
			this.settings.messages[ element.name ].remote = previous.message;

			param = typeof param === "string" && { url: param } || param;

			if ( previous.old === value ) {
				return previous.valid;
			}

			previous.old = value;
			validator = this;
			this.startRequest( element );
			data = {};
			data[ element.name ] = value;
			$.ajax( $.extend( true, {
				url: param,
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				context: validator.currentForm,
				success: function( response ) {
					var valid = response === true || response === "true",
						errors, message, submitted;

					validator.settings.messages[ element.name ].remote = previous.originalMessage;
					if ( valid ) {
						submitted = validator.formSubmitted;
						validator.prepareElement( element );
						validator.formSubmitted = submitted;
						validator.successList.push( element );
						delete validator.invalid[ element.name ];
						validator.showErrors();
					} else {
						errors = {};
						message = response || validator.defaultMessage( element, "remote" );
						errors[ element.name ] = previous.message = $.isFunction( message ) ? message( value ) : message;
						validator.invalid[ element.name ] = true;
						validator.showErrors( errors );
					}
					previous.valid = valid;
					validator.stopRequest( element, valid );
				}
			}, param ) );
			return "pending";
		}

	}

});

$.format = function deprecated() {
	throw "$.format has been deprecated. Please use $.validator.format instead.";
};

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

var pendingRequests = {},
	ajax;
// Use a prefilter if available (1.5+)
if ( $.ajaxPrefilter ) {
	$.ajaxPrefilter(function( settings, _, xhr ) {
		var port = settings.port;
		if ( settings.mode === "abort" ) {
			if ( pendingRequests[port] ) {
				pendingRequests[port].abort();
			}
			pendingRequests[port] = xhr;
		}
	});
} else {
	// Proxy ajax
	ajax = $.ajax;
	$.ajax = function( settings ) {
		var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
			port = ( "port" in settings ? settings : $.ajaxSettings ).port;
		if ( mode === "abort" ) {
			if ( pendingRequests[port] ) {
				pendingRequests[port].abort();
			}
			pendingRequests[port] = ajax.apply(this, arguments);
			return pendingRequests[port];
		}
		return ajax.apply(this, arguments);
	};
}

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target

$.extend($.fn, {
	validateDelegate: function( delegate, type, handler ) {
		return this.bind(type, function( event ) {
			var target = $(event.target);
			if ( target.is(delegate) ) {
				return handler.apply(target, arguments);
			}
		});
	}
});

}));
/* Chosen v1.1.0 | (c) 2011-2013 by Harvest | MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md */
!function(){var a,AbstractChosen,Chosen,SelectParser,b,c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};SelectParser=function(){function SelectParser(){this.options_index=0,this.parsed=[]}return SelectParser.prototype.add_node=function(a){return"OPTGROUP"===a.nodeName.toUpperCase()?this.add_group(a):this.add_option(a)},SelectParser.prototype.add_group=function(a){var b,c,d,e,f,g;for(b=this.parsed.length,this.parsed.push({array_index:b,group:!0,label:this.escapeExpression(a.label),children:0,disabled:a.disabled}),f=a.childNodes,g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(this.add_option(c,b,a.disabled));return g},SelectParser.prototype.add_option=function(a,b,c){return"OPTION"===a.nodeName.toUpperCase()?(""!==a.text?(null!=b&&(this.parsed[b].children+=1),this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:a.value,text:a.text,html:a.innerHTML,selected:a.selected,disabled:c===!0?c:a.disabled,group_array_index:b,classes:a.className,style:a.style.cssText})):this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:!0}),this.options_index+=1):void 0},SelectParser.prototype.escapeExpression=function(a){var b,c;return null==a||a===!1?"":/[\&\<\>\"\'\`]/.test(a)?(b={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},c=/&(?!\w+;)|[\<\>\"\'\`]/g,a.replace(c,function(a){return b[a]||"&amp;"})):a},SelectParser}(),SelectParser.select_to_array=function(a){var b,c,d,e,f;for(c=new SelectParser,f=a.childNodes,d=0,e=f.length;e>d;d++)b=f[d],c.add_node(b);return c.parsed},AbstractChosen=function(){function AbstractChosen(a,b){this.form_field=a,this.options=null!=b?b:{},AbstractChosen.browser_is_supported()&&(this.is_multiple=this.form_field.multiple,this.set_default_text(),this.set_default_values(),this.setup(),this.set_up_html(),this.register_observers())}return AbstractChosen.prototype.set_default_values=function(){var a=this;return this.click_test_action=function(b){return a.test_active_click(b)},this.activate_action=function(b){return a.activate_field(b)},this.active_field=!1,this.mouse_on_container=!1,this.results_showing=!1,this.result_highlighted=null,this.allow_single_deselect=null!=this.options.allow_single_deselect&&null!=this.form_field.options[0]&&""===this.form_field.options[0].text?this.options.allow_single_deselect:!1,this.disable_search_threshold=this.options.disable_search_threshold||0,this.disable_search=this.options.disable_search||!1,this.enable_split_word_search=null!=this.options.enable_split_word_search?this.options.enable_split_word_search:!0,this.group_search=null!=this.options.group_search?this.options.group_search:!0,this.search_contains=this.options.search_contains||!1,this.single_backstroke_delete=null!=this.options.single_backstroke_delete?this.options.single_backstroke_delete:!0,this.max_selected_options=this.options.max_selected_options||1/0,this.inherit_select_classes=this.options.inherit_select_classes||!1,this.display_selected_options=null!=this.options.display_selected_options?this.options.display_selected_options:!0,this.display_disabled_options=null!=this.options.display_disabled_options?this.options.display_disabled_options:!0},AbstractChosen.prototype.set_default_text=function(){return this.default_text=this.form_field.getAttribute("data-placeholder")?this.form_field.getAttribute("data-placeholder"):this.is_multiple?this.options.placeholder_text_multiple||this.options.placeholder_text||AbstractChosen.default_multiple_text:this.options.placeholder_text_single||this.options.placeholder_text||AbstractChosen.default_single_text,this.results_none_found=this.form_field.getAttribute("data-no_results_text")||this.options.no_results_text||AbstractChosen.default_no_result_text},AbstractChosen.prototype.mouse_enter=function(){return this.mouse_on_container=!0},AbstractChosen.prototype.mouse_leave=function(){return this.mouse_on_container=!1},AbstractChosen.prototype.input_focus=function(){var a=this;if(this.is_multiple){if(!this.active_field)return setTimeout(function(){return a.container_mousedown()},50)}else if(!this.active_field)return this.activate_field()},AbstractChosen.prototype.input_blur=function(){var a=this;return this.mouse_on_container?void 0:(this.active_field=!1,setTimeout(function(){return a.blur_test()},100))},AbstractChosen.prototype.results_option_build=function(a){var b,c,d,e,f;for(b="",f=this.results_data,d=0,e=f.length;e>d;d++)c=f[d],b+=c.group?this.result_add_group(c):this.result_add_option(c),(null!=a?a.first:void 0)&&(c.selected&&this.is_multiple?this.choice_build(c):c.selected&&!this.is_multiple&&this.single_set_selected_text(c.text));return b},AbstractChosen.prototype.result_add_option=function(a){var b,c;return a.search_match?this.include_option_in_results(a)?(b=[],a.disabled||a.selected&&this.is_multiple||b.push("active-result"),!a.disabled||a.selected&&this.is_multiple||b.push("disabled-result"),a.selected&&b.push("result-selected"),null!=a.group_array_index&&b.push("group-option"),""!==a.classes&&b.push(a.classes),c=document.createElement("li"),c.className=b.join(" "),c.style.cssText=a.style,c.setAttribute("data-option-array-index",a.array_index),c.innerHTML=a.search_text,this.outerHTML(c)):"":""},AbstractChosen.prototype.result_add_group=function(a){var b;return a.search_match||a.group_match?a.active_options>0?(b=document.createElement("li"),b.className="group-result",b.innerHTML=a.search_text,this.outerHTML(b)):"":""},AbstractChosen.prototype.results_update_field=function(){return this.set_default_text(),this.is_multiple||this.results_reset_cleanup(),this.result_clear_highlight(),this.results_build(),this.results_showing?this.winnow_results():void 0},AbstractChosen.prototype.reset_single_select_options=function(){var a,b,c,d,e;for(d=this.results_data,e=[],b=0,c=d.length;c>b;b++)a=d[b],a.selected?e.push(a.selected=!1):e.push(void 0);return e},AbstractChosen.prototype.results_toggle=function(){return this.results_showing?this.results_hide():this.results_show()},AbstractChosen.prototype.results_search=function(){return this.results_showing?this.winnow_results():this.results_show()},AbstractChosen.prototype.winnow_results=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m;for(this.no_results_clear(),e=0,g=this.get_search_text(),a=g.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),d=this.search_contains?"":"^",c=new RegExp(d+a,"i"),j=new RegExp(a,"i"),m=this.results_data,k=0,l=m.length;l>k;k++)b=m[k],b.search_match=!1,f=null,this.include_option_in_results(b)&&(b.group&&(b.group_match=!1,b.active_options=0),null!=b.group_array_index&&this.results_data[b.group_array_index]&&(f=this.results_data[b.group_array_index],0===f.active_options&&f.search_match&&(e+=1),f.active_options+=1),(!b.group||this.group_search)&&(b.search_text=b.group?b.label:b.html,b.search_match=this.search_string_match(b.search_text,c),b.search_match&&!b.group&&(e+=1),b.search_match?(g.length&&(h=b.search_text.search(j),i=b.search_text.substr(0,h+g.length)+"</em>"+b.search_text.substr(h+g.length),b.search_text=i.substr(0,h)+"<em>"+i.substr(h)),null!=f&&(f.group_match=!0)):null!=b.group_array_index&&this.results_data[b.group_array_index].search_match&&(b.search_match=!0)));return this.result_clear_highlight(),1>e&&g.length?(this.update_results_content(""),this.no_results(g)):(this.update_results_content(this.results_option_build()),this.winnow_results_set_highlight())},AbstractChosen.prototype.search_string_match=function(a,b){var c,d,e,f;if(b.test(a))return!0;if(this.enable_split_word_search&&(a.indexOf(" ")>=0||0===a.indexOf("["))&&(d=a.replace(/\[|\]/g,"").split(" "),d.length))for(e=0,f=d.length;f>e;e++)if(c=d[e],b.test(c))return!0},AbstractChosen.prototype.choices_count=function(){var a,b,c,d;if(null!=this.selected_option_count)return this.selected_option_count;for(this.selected_option_count=0,d=this.form_field.options,b=0,c=d.length;c>b;b++)a=d[b],a.selected&&(this.selected_option_count+=1);return this.selected_option_count},AbstractChosen.prototype.choices_click=function(a){return a.preventDefault(),this.results_showing||this.is_disabled?void 0:this.results_show()},AbstractChosen.prototype.keyup_checker=function(a){var b,c;switch(b=null!=(c=a.which)?c:a.keyCode,this.search_field_scale(),b){case 8:if(this.is_multiple&&this.backstroke_length<1&&this.choices_count()>0)return this.keydown_backstroke();if(!this.pending_backstroke)return this.result_clear_highlight(),this.results_search();break;case 13:if(a.preventDefault(),this.results_showing)return this.result_select(a);break;case 27:return this.results_showing&&this.results_hide(),!0;case 9:case 38:case 40:case 16:case 91:case 17:break;default:return this.results_search()}},AbstractChosen.prototype.clipboard_event_checker=function(){var a=this;return setTimeout(function(){return a.results_search()},50)},AbstractChosen.prototype.container_width=function(){return null!=this.options.width?this.options.width:""+this.form_field.offsetWidth+"px"},AbstractChosen.prototype.include_option_in_results=function(a){return this.is_multiple&&!this.display_selected_options&&a.selected?!1:!this.display_disabled_options&&a.disabled?!1:a.empty?!1:!0},AbstractChosen.prototype.search_results_touchstart=function(a){return this.touch_started=!0,this.search_results_mouseover(a)},AbstractChosen.prototype.search_results_touchmove=function(a){return this.touch_started=!1,this.search_results_mouseout(a)},AbstractChosen.prototype.search_results_touchend=function(a){return this.touch_started?this.search_results_mouseup(a):void 0},AbstractChosen.prototype.outerHTML=function(a){var b;return a.outerHTML?a.outerHTML:(b=document.createElement("div"),b.appendChild(a),b.innerHTML)},AbstractChosen.browser_is_supported=function(){return"Microsoft Internet Explorer"===window.navigator.appName?document.documentMode>=8:/iP(od|hone)/i.test(window.navigator.userAgent)?!1:/Android/i.test(window.navigator.userAgent)&&/Mobile/i.test(window.navigator.userAgent)?!1:!0},AbstractChosen.default_multiple_text="Select Some Options",AbstractChosen.default_single_text="Select an Option",AbstractChosen.default_no_result_text="No results match",AbstractChosen}(),a=jQuery,a.fn.extend({chosen:function(b){return AbstractChosen.browser_is_supported()?this.each(function(){var c,d;c=a(this),d=c.data("chosen"),"destroy"===b&&d?d.destroy():d||c.data("chosen",new Chosen(this,b))}):this}}),Chosen=function(c){function Chosen(){return b=Chosen.__super__.constructor.apply(this,arguments)}return d(Chosen,c),Chosen.prototype.setup=function(){return this.form_field_jq=a(this.form_field),this.current_selectedIndex=this.form_field.selectedIndex,this.is_rtl=this.form_field_jq.hasClass("chosen-rtl")},Chosen.prototype.set_up_html=function(){var b,c;return b=["chosen-container"],b.push("chosen-container-"+(this.is_multiple?"multi":"single")),this.inherit_select_classes&&this.form_field.className&&b.push(this.form_field.className),this.is_rtl&&b.push("chosen-rtl"),c={"class":b.join(" "),style:"width: "+this.container_width()+";",title:this.form_field.title},this.form_field.id.length&&(c.id=this.form_field.id.replace(/[^\w]/g,"_")+"_chosen"),this.container=a("<div />",c),this.is_multiple?this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="'+this.default_text+'" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>'):this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>'+this.default_text+'</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'),this.form_field_jq.hide().after(this.container),this.dropdown=this.container.find("div.chosen-drop").first(),this.search_field=this.container.find("input").first(),this.search_results=this.container.find("ul.chosen-results").first(),this.search_field_scale(),this.search_no_results=this.container.find("li.no-results").first(),this.is_multiple?(this.search_choices=this.container.find("ul.chosen-choices").first(),this.search_container=this.container.find("li.search-field").first()):(this.search_container=this.container.find("div.chosen-search").first(),this.selected_item=this.container.find(".chosen-single").first()),this.results_build(),this.set_tab_index(),this.set_label_behavior(),this.form_field_jq.trigger("chosen:ready",{chosen:this})},Chosen.prototype.register_observers=function(){var a=this;return this.container.bind("mousedown.chosen",function(b){a.container_mousedown(b)}),this.container.bind("mouseup.chosen",function(b){a.container_mouseup(b)}),this.container.bind("mouseenter.chosen",function(b){a.mouse_enter(b)}),this.container.bind("mouseleave.chosen",function(b){a.mouse_leave(b)}),this.search_results.bind("mouseup.chosen",function(b){a.search_results_mouseup(b)}),this.search_results.bind("mouseover.chosen",function(b){a.search_results_mouseover(b)}),this.search_results.bind("mouseout.chosen",function(b){a.search_results_mouseout(b)}),this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen",function(b){a.search_results_mousewheel(b)}),this.search_results.bind("touchstart.chosen",function(b){a.search_results_touchstart(b)}),this.search_results.bind("touchmove.chosen",function(b){a.search_results_touchmove(b)}),this.search_results.bind("touchend.chosen",function(b){a.search_results_touchend(b)}),this.form_field_jq.bind("chosen:updated.chosen",function(b){a.results_update_field(b)}),this.form_field_jq.bind("chosen:activate.chosen",function(b){a.activate_field(b)}),this.form_field_jq.bind("chosen:open.chosen",function(b){a.container_mousedown(b)}),this.form_field_jq.bind("chosen:close.chosen",function(b){a.input_blur(b)}),this.search_field.bind("blur.chosen",function(b){a.input_blur(b)}),this.search_field.bind("keyup.chosen",function(b){a.keyup_checker(b)}),this.search_field.bind("keydown.chosen",function(b){a.keydown_checker(b)}),this.search_field.bind("focus.chosen",function(b){a.input_focus(b)}),this.search_field.bind("cut.chosen",function(b){a.clipboard_event_checker(b)}),this.search_field.bind("paste.chosen",function(b){a.clipboard_event_checker(b)}),this.is_multiple?this.search_choices.bind("click.chosen",function(b){a.choices_click(b)}):this.container.bind("click.chosen",function(a){a.preventDefault()})},Chosen.prototype.destroy=function(){return a(this.container[0].ownerDocument).unbind("click.chosen",this.click_test_action),this.search_field[0].tabIndex&&(this.form_field_jq[0].tabIndex=this.search_field[0].tabIndex),this.container.remove(),this.form_field_jq.removeData("chosen"),this.form_field_jq.show()},Chosen.prototype.search_field_disabled=function(){return this.is_disabled=this.form_field_jq[0].disabled,this.is_disabled?(this.container.addClass("chosen-disabled"),this.search_field[0].disabled=!0,this.is_multiple||this.selected_item.unbind("focus.chosen",this.activate_action),this.close_field()):(this.container.removeClass("chosen-disabled"),this.search_field[0].disabled=!1,this.is_multiple?void 0:this.selected_item.bind("focus.chosen",this.activate_action))},Chosen.prototype.container_mousedown=function(b){return this.is_disabled||(b&&"mousedown"===b.type&&!this.results_showing&&b.preventDefault(),null!=b&&a(b.target).hasClass("search-choice-close"))?void 0:(this.active_field?this.is_multiple||!b||a(b.target)[0]!==this.selected_item[0]&&!a(b.target).parents("a.chosen-single").length||(b.preventDefault(),this.results_toggle()):(this.is_multiple&&this.search_field.val(""),a(this.container[0].ownerDocument).bind("click.chosen",this.click_test_action),this.results_show()),this.activate_field())},Chosen.prototype.container_mouseup=function(a){return"ABBR"!==a.target.nodeName||this.is_disabled?void 0:this.results_reset(a)},Chosen.prototype.search_results_mousewheel=function(a){var b;return a.originalEvent&&(b=-a.originalEvent.wheelDelta||a.originalEvent.detail),null!=b?(a.preventDefault(),"DOMMouseScroll"===a.type&&(b=40*b),this.search_results.scrollTop(b+this.search_results.scrollTop())):void 0},Chosen.prototype.blur_test=function(){return!this.active_field&&this.container.hasClass("chosen-container-active")?this.close_field():void 0},Chosen.prototype.close_field=function(){return a(this.container[0].ownerDocument).unbind("click.chosen",this.click_test_action),this.active_field=!1,this.results_hide(),this.container.removeClass("chosen-container-active"),this.clear_backstroke(),this.show_search_field_default(),this.search_field_scale()},Chosen.prototype.activate_field=function(){return this.container.addClass("chosen-container-active"),this.active_field=!0,this.search_field.val(this.search_field.val()),this.search_field.focus()},Chosen.prototype.test_active_click=function(b){var c;return c=a(b.target).closest(".chosen-container"),c.length&&this.container[0]===c[0]?this.active_field=!0:this.close_field()},Chosen.prototype.results_build=function(){return this.parsing=!0,this.selected_option_count=null,this.results_data=SelectParser.select_to_array(this.form_field),this.is_multiple?this.search_choices.find("li.search-choice").remove():this.is_multiple||(this.single_set_selected_text(),this.disable_search||this.form_field.options.length<=this.disable_search_threshold?(this.search_field[0].readOnly=!0,this.container.addClass("chosen-container-single-nosearch")):(this.search_field[0].readOnly=!1,this.container.removeClass("chosen-container-single-nosearch"))),this.update_results_content(this.results_option_build({first:!0})),this.search_field_disabled(),this.show_search_field_default(),this.search_field_scale(),this.parsing=!1},Chosen.prototype.result_do_highlight=function(a){var b,c,d,e,f;if(a.length){if(this.result_clear_highlight(),this.result_highlight=a,this.result_highlight.addClass("highlighted"),d=parseInt(this.search_results.css("maxHeight"),10),f=this.search_results.scrollTop(),e=d+f,c=this.result_highlight.position().top+this.search_results.scrollTop(),b=c+this.result_highlight.outerHeight(),b>=e)return this.search_results.scrollTop(b-d>0?b-d:0);if(f>c)return this.search_results.scrollTop(c)}},Chosen.prototype.result_clear_highlight=function(){return this.result_highlight&&this.result_highlight.removeClass("highlighted"),this.result_highlight=null},Chosen.prototype.results_show=function(){return this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.container.addClass("chosen-with-drop"),this.results_showing=!0,this.search_field.focus(),this.search_field.val(this.search_field.val()),this.winnow_results(),this.form_field_jq.trigger("chosen:showing_dropdown",{chosen:this}))},Chosen.prototype.update_results_content=function(a){return this.search_results.html(a)},Chosen.prototype.results_hide=function(){return this.results_showing&&(this.result_clear_highlight(),this.container.removeClass("chosen-with-drop"),this.form_field_jq.trigger("chosen:hiding_dropdown",{chosen:this})),this.results_showing=!1},Chosen.prototype.set_tab_index=function(){var a;return this.form_field.tabIndex?(a=this.form_field.tabIndex,this.form_field.tabIndex=-1,this.search_field[0].tabIndex=a):void 0},Chosen.prototype.set_label_behavior=function(){var b=this;return this.form_field_label=this.form_field_jq.parents("label"),!this.form_field_label.length&&this.form_field.id.length&&(this.form_field_label=a("label[for='"+this.form_field.id+"']")),this.form_field_label.length>0?this.form_field_label.bind("click.chosen",function(a){return b.is_multiple?b.container_mousedown(a):b.activate_field()}):void 0},Chosen.prototype.show_search_field_default=function(){return this.is_multiple&&this.choices_count()<1&&!this.active_field?(this.search_field.val(this.default_text),this.search_field.addClass("default")):(this.search_field.val(""),this.search_field.removeClass("default"))},Chosen.prototype.search_results_mouseup=function(b){var c;return c=a(b.target).hasClass("active-result")?a(b.target):a(b.target).parents(".active-result").first(),c.length?(this.result_highlight=c,this.result_select(b),this.search_field.focus()):void 0},Chosen.prototype.search_results_mouseover=function(b){var c;return c=a(b.target).hasClass("active-result")?a(b.target):a(b.target).parents(".active-result").first(),c?this.result_do_highlight(c):void 0},Chosen.prototype.search_results_mouseout=function(b){return a(b.target).hasClass("active-result")?this.result_clear_highlight():void 0},Chosen.prototype.choice_build=function(b){var c,d,e=this;return c=a("<li />",{"class":"search-choice"}).html("<span>"+b.html+"</span>"),b.disabled?c.addClass("search-choice-disabled"):(d=a("<a />",{"class":"search-choice-close","data-option-array-index":b.array_index}),d.bind("click.chosen",function(a){return e.choice_destroy_link_click(a)}),c.append(d)),this.search_container.before(c)},Chosen.prototype.choice_destroy_link_click=function(b){return b.preventDefault(),b.stopPropagation(),this.is_disabled?void 0:this.choice_destroy(a(b.target))},Chosen.prototype.choice_destroy=function(a){return this.result_deselect(a[0].getAttribute("data-option-array-index"))?(this.show_search_field_default(),this.is_multiple&&this.choices_count()>0&&this.search_field.val().length<1&&this.results_hide(),a.parents("li").first().remove(),this.search_field_scale()):void 0},Chosen.prototype.results_reset=function(){return this.reset_single_select_options(),this.form_field.options[0].selected=!0,this.single_set_selected_text(),this.show_search_field_default(),this.results_reset_cleanup(),this.form_field_jq.trigger("change"),this.active_field?this.results_hide():void 0},Chosen.prototype.results_reset_cleanup=function(){return this.current_selectedIndex=this.form_field.selectedIndex,this.selected_item.find("abbr").remove()},Chosen.prototype.result_select=function(a){var b,c;return this.result_highlight?(b=this.result_highlight,this.result_clear_highlight(),this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.is_multiple?b.removeClass("active-result"):this.reset_single_select_options(),c=this.results_data[b[0].getAttribute("data-option-array-index")],c.selected=!0,this.form_field.options[c.options_index].selected=!0,this.selected_option_count=null,this.is_multiple?this.choice_build(c):this.single_set_selected_text(c.text),(a.metaKey||a.ctrlKey)&&this.is_multiple||this.results_hide(),this.search_field.val(""),(this.is_multiple||this.form_field.selectedIndex!==this.current_selectedIndex)&&this.form_field_jq.trigger("change",{selected:this.form_field.options[c.options_index].value}),this.current_selectedIndex=this.form_field.selectedIndex,this.search_field_scale())):void 0},Chosen.prototype.single_set_selected_text=function(a){return null==a&&(a=this.default_text),a===this.default_text?this.selected_item.addClass("chosen-default"):(this.single_deselect_control_build(),this.selected_item.removeClass("chosen-default")),this.selected_item.find("span").text(a)},Chosen.prototype.result_deselect=function(a){var b;return b=this.results_data[a],this.form_field.options[b.options_index].disabled?!1:(b.selected=!1,this.form_field.options[b.options_index].selected=!1,this.selected_option_count=null,this.result_clear_highlight(),this.results_showing&&this.winnow_results(),this.form_field_jq.trigger("change",{deselected:this.form_field.options[b.options_index].value}),this.search_field_scale(),!0)},Chosen.prototype.single_deselect_control_build=function(){return this.allow_single_deselect?(this.selected_item.find("abbr").length||this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'),this.selected_item.addClass("chosen-single-with-deselect")):void 0},Chosen.prototype.get_search_text=function(){return this.search_field.val()===this.default_text?"":a("<div/>").text(a.trim(this.search_field.val())).html()},Chosen.prototype.winnow_results_set_highlight=function(){var a,b;return b=this.is_multiple?[]:this.search_results.find(".result-selected.active-result"),a=b.length?b.first():this.search_results.find(".active-result").first(),null!=a?this.result_do_highlight(a):void 0},Chosen.prototype.no_results=function(b){var c;return c=a('<li class="no-results">'+this.results_none_found+' "<span></span>"</li>'),c.find("span").first().html(b),this.search_results.append(c),this.form_field_jq.trigger("chosen:no_results",{chosen:this})},Chosen.prototype.no_results_clear=function(){return this.search_results.find(".no-results").remove()},Chosen.prototype.keydown_arrow=function(){var a;return this.results_showing&&this.result_highlight?(a=this.result_highlight.nextAll("li.active-result").first())?this.result_do_highlight(a):void 0:this.results_show()},Chosen.prototype.keyup_arrow=function(){var a;return this.results_showing||this.is_multiple?this.result_highlight?(a=this.result_highlight.prevAll("li.active-result"),a.length?this.result_do_highlight(a.first()):(this.choices_count()>0&&this.results_hide(),this.result_clear_highlight())):void 0:this.results_show()},Chosen.prototype.keydown_backstroke=function(){var a;return this.pending_backstroke?(this.choice_destroy(this.pending_backstroke.find("a").first()),this.clear_backstroke()):(a=this.search_container.siblings("li.search-choice").last(),a.length&&!a.hasClass("search-choice-disabled")?(this.pending_backstroke=a,this.single_backstroke_delete?this.keydown_backstroke():this.pending_backstroke.addClass("search-choice-focus")):void 0)},Chosen.prototype.clear_backstroke=function(){return this.pending_backstroke&&this.pending_backstroke.removeClass("search-choice-focus"),this.pending_backstroke=null},Chosen.prototype.keydown_checker=function(a){var b,c;switch(b=null!=(c=a.which)?c:a.keyCode,this.search_field_scale(),8!==b&&this.pending_backstroke&&this.clear_backstroke(),b){case 8:this.backstroke_length=this.search_field.val().length;break;case 9:this.results_showing&&!this.is_multiple&&this.result_select(a),this.mouse_on_container=!1;break;case 13:a.preventDefault();break;case 38:a.preventDefault(),this.keyup_arrow();break;case 40:a.preventDefault(),this.keydown_arrow()}},Chosen.prototype.search_field_scale=function(){var b,c,d,e,f,g,h,i,j;if(this.is_multiple){for(d=0,h=0,f="position:absolute; left: -1000px; top: -1000px; display:none;",g=["font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"],i=0,j=g.length;j>i;i++)e=g[i],f+=e+":"+this.search_field.css(e)+";";return b=a("<div />",{style:f}),b.text(this.search_field.val()),a("body").append(b),h=b.width()+25,b.remove(),c=this.container.outerWidth(),h>c-10&&(h=c-10),this.search_field.css({width:h+"px"})}},Chosen}(AbstractChosen)}.call(this);
/*! device.js 0.2.7 */
(function(){var a,b,c,d,e,f,g,h,i,j;b=window.device,a={},window.device=a,d=window.document.documentElement,j=window.navigator.userAgent.toLowerCase(),a.ios=function(){return a.iphone()||a.ipod()||a.ipad()},a.iphone=function(){return!a.windows()&&e("iphone")},a.ipod=function(){return e("ipod")},a.ipad=function(){return e("ipad")},a.android=function(){return!a.windows()&&e("android")},a.androidPhone=function(){return a.android()&&e("mobile")},a.androidTablet=function(){return a.android()&&!e("mobile")},a.blackberry=function(){return e("blackberry")||e("bb10")||e("rim")},a.blackberryPhone=function(){return a.blackberry()&&!e("tablet")},a.blackberryTablet=function(){return a.blackberry()&&e("tablet")},a.windows=function(){return e("windows")},a.windowsPhone=function(){return a.windows()&&e("phone")},a.windowsTablet=function(){return a.windows()&&e("touch")&&!a.windowsPhone()},a.fxos=function(){return(e("(mobile;")||e("(tablet;"))&&e("; rv:")},a.fxosPhone=function(){return a.fxos()&&e("mobile")},a.fxosTablet=function(){return a.fxos()&&e("tablet")},a.meego=function(){return e("meego")},a.cordova=function(){return window.cordova&&"file:"===location.protocol},a.nodeWebkit=function(){return"object"==typeof window.process},a.mobile=function(){return a.androidPhone()||a.iphone()||a.ipod()||a.windowsPhone()||a.blackberryPhone()||a.fxosPhone()||a.meego()},a.tablet=function(){return a.ipad()||a.androidTablet()||a.blackberryTablet()||a.windowsTablet()||a.fxosTablet()},a.desktop=function(){return!a.tablet()&&!a.mobile()},a.television=function(){var a;for(television=["googletv","viera","smarttv","internet.tv","netcast","nettv","appletv","boxee","kylo","roku","dlnadoc","roku","pov_tv","hbbtv","ce-html"],a=0;a<television.length;){if(e(television[a]))return!0;a++}return!1},a.portrait=function(){return window.innerHeight/window.innerWidth>1},a.landscape=function(){return window.innerHeight/window.innerWidth<1},a.noConflict=function(){return window.device=b,this},e=function(a){return-1!==j.indexOf(a)},g=function(a){var b;return b=new RegExp(a,"i"),d.className.match(b)},c=function(a){var b=null;g(a)||(b=d.className.replace(/^\s+|\s+$/g,""),d.className=b+" "+a)},i=function(a){g(a)&&(d.className=d.className.replace(" "+a,""))},a.ios()?a.ipad()?c("ios ipad tablet"):a.iphone()?c("ios iphone mobile"):a.ipod()&&c("ios ipod mobile"):a.android()?c(a.androidTablet()?"android tablet":"android mobile"):a.blackberry()?c(a.blackberryTablet()?"blackberry tablet":"blackberry mobile"):a.windows()?c(a.windowsTablet()?"windows tablet":a.windowsPhone()?"windows mobile":"desktop"):a.fxos()?c(a.fxosTablet()?"fxos tablet":"fxos mobile"):a.meego()?c("meego mobile"):a.nodeWebkit()?c("node-webkit"):a.television()?c("television"):a.desktop()&&c("desktop"),a.cordova()&&c("cordova"),f=function(){a.landscape()?(i("portrait"),c("landscape")):(i("landscape"),c("portrait"))},h=Object.prototype.hasOwnProperty.call(window,"onorientationchange")?"orientationchange":"resize",window.addEventListener?window.addEventListener(h,f,!1):window.attachEvent?window.attachEvent(h,f):window[h]=f,f(),"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return a}):"undefined"!=typeof module&&module.exports?module.exports=a:window.device=a}).call(this);

/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("wolfy87-eventemitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(window,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function f(e){this.img=e}function c(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);var i=n.nodeType;if(i&&(1===i||9===i||11===i))for(var r=n.querySelectorAll("img"),o=0,s=r.length;s>o;o++){var f=r[o];this.addImage(f)}}},s.prototype.addImage=function(e){var t=new f(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),f.prototype=new t,f.prototype.check=function(){var e=v[this.img.src]||new c(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},f.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return c.prototype=new t,c.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},c.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});
/*
 AngularJS v1.3.0
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(S,X,u){'use strict';function y(b){return function(){var a=arguments[0],c;c="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.3.0/"+(b?b+"/":"")+a;for(a=1;a<arguments.length;a++){c=c+(1==a?"?":"&")+"p"+(a-1)+"=";var d=encodeURIComponent,e;e=arguments[a];e="function"==typeof e?e.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof e?"undefined":"string"!=typeof e?JSON.stringify(e):e;c+=d(e)}return Error(c)}}function Ra(b){if(null==b||Sa(b))return!1;var a=b.length;return b.nodeType===
ka&&a?!0:I(b)||B(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function r(b,a,c){var d,e;if(b)if(F(b))for(d in b)"prototype"==d||"length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d)||a.call(c,b[d],d,b);else if(B(b)||Ra(b)){var f="object"!==typeof b;d=0;for(e=b.length;d<e;d++)(f||d in b)&&a.call(c,b[d],d,b)}else if(b.forEach&&b.forEach!==r)b.forEach(a,c,b);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d,b);return b}function ic(b){var a=[],c;for(c in b)b.hasOwnProperty(c)&&a.push(c);
return a.sort()}function zd(b,a,c){for(var d=ic(b),e=0;e<d.length;e++)a.call(c,b[d[e]],d[e]);return d}function jc(b){return function(a,c){b(c,a)}}function Ad(){return++hb}function kc(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function E(b){for(var a=b.$$hashKey,c=1,d=arguments.length;c<d;c++){var e=arguments[c];if(e)for(var f=Object.keys(e),g=0,k=f.length;g<k;g++){var h=f[g];b[h]=e[h]}}kc(b,a);return b}function ba(b){return parseInt(b,10)}function lc(b,a){return E(new (E(function(){},{prototype:b})),
a)}function A(){}function Ta(b){return b}function da(b){return function(){return b}}function w(b){return"undefined"===typeof b}function z(b){return"undefined"!==typeof b}function G(b){return null!==b&&"object"===typeof b}function I(b){return"string"===typeof b}function W(b){return"number"===typeof b}function ea(b){return"[object Date]"===Ia.call(b)}function F(b){return"function"===typeof b}function ib(b){return"[object RegExp]"===Ia.call(b)}function Sa(b){return b&&b.window===b}function Ua(b){return b&&
b.$evalAsync&&b.$watch}function Va(b){return"boolean"===typeof b}function mc(b){return!(!b||!(b.nodeName||b.prop&&b.attr&&b.find))}function Bd(b){var a={};b=b.split(",");var c;for(c=0;c<b.length;c++)a[b[c]]=!0;return a}function pa(b){return N(b.nodeName||b[0].nodeName)}function Wa(b,a){var c=b.indexOf(a);0<=c&&b.splice(c,1);return a}function Ca(b,a,c,d){if(Sa(b)||Ua(b))throw Xa("cpws");if(a){if(b===a)throw Xa("cpi");c=c||[];d=d||[];if(G(b)){var e=c.indexOf(b);if(-1!==e)return d[e];c.push(b);d.push(a)}if(B(b))for(var f=
a.length=0;f<b.length;f++)e=Ca(b[f],null,c,d),G(b[f])&&(c.push(b[f]),d.push(e)),a.push(e);else{var g=a.$$hashKey;B(a)?a.length=0:r(a,function(b,c){delete a[c]});for(f in b)b.hasOwnProperty(f)&&(e=Ca(b[f],null,c,d),G(b[f])&&(c.push(b[f]),d.push(e)),a[f]=e);kc(a,g)}}else if(a=b)B(b)?a=Ca(b,[],c,d):ea(b)?a=new Date(b.getTime()):ib(b)?(a=new RegExp(b.source,b.toString().match(/[^\/]*$/)[0]),a.lastIndex=b.lastIndex):G(b)&&(e=Object.create(Object.getPrototypeOf(b)),a=Ca(b,e,c,d));return a}function qa(b,
a){if(B(b)){a=a||[];for(var c=0,d=b.length;c<d;c++)a[c]=b[c]}else if(G(b))for(c in a=a||{},b)if("$"!==c.charAt(0)||"$"!==c.charAt(1))a[c]=b[c];return a||b}function la(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;var c=typeof b,d;if(c==typeof a&&"object"==c)if(B(b)){if(!B(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!la(b[d],a[d]))return!1;return!0}}else{if(ea(b))return ea(a)?la(b.getTime(),a.getTime()):!1;if(ib(b)&&ib(a))return b.toString()==a.toString();
if(Ua(b)||Ua(a)||Sa(b)||Sa(a)||B(a))return!1;c={};for(d in b)if("$"!==d.charAt(0)&&!F(b[d])){if(!la(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&"$"!==d.charAt(0)&&a[d]!==u&&!F(a[d]))return!1;return!0}return!1}function jb(b,a,c){return b.concat(Ya.call(a,c))}function nc(b,a){var c=2<arguments.length?Ya.call(arguments,2):[];return!F(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,c.concat(Ya.call(arguments,0))):a.apply(b,c)}:function(){return arguments.length?
a.apply(b,arguments):a.call(b)}}function Cd(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)&&"$"===b.charAt(1)?c=u:Sa(a)?c="$WINDOW":a&&X===a?c="$DOCUMENT":Ua(a)&&(c="$SCOPE");return c}function ra(b,a){return"undefined"===typeof b?u:JSON.stringify(b,Cd,a?"  ":null)}function oc(b){return I(b)?JSON.parse(b):b}function sa(b){b=D(b).clone();try{b.empty()}catch(a){}var c=D("<div>").append(b).html();try{return b[0].nodeType===kb?N(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,function(a,b){return"<"+
N(b)})}catch(d){return N(c)}}function pc(b){try{return decodeURIComponent(b)}catch(a){}}function qc(b){var a={},c,d;r((b||"").split("&"),function(b){b&&(c=b.replace(/\+/g,"%20").split("="),d=pc(c[0]),z(d)&&(b=z(c[1])?pc(c[1]):!0,Hb.call(a,d)?B(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Ib(b){var a=[];r(b,function(b,d){B(b)?r(b,function(b){a.push(Da(d,!0)+(!0===b?"":"="+Da(b,!0)))}):a.push(Da(d,!0)+(!0===b?"":"="+Da(b,!0)))});return a.length?a.join("&"):""}function lb(b){return Da(b,
!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function Da(b,a){return encodeURIComponent(b).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%3B/gi,";").replace(/%20/g,a?"%20":"+")}function Dd(b,a){var c,d,e=mb.length;b=D(b);for(d=0;d<e;++d)if(c=mb[d]+a,I(c=b.attr(c)))return c;return null}function Ed(b,a){var c,d,e={};r(mb,function(a){a+="app";!c&&b.hasAttribute&&b.hasAttribute(a)&&(c=b,d=b.getAttribute(a))});r(mb,function(a){a+="app";
var e;!c&&(e=b.querySelector("["+a.replace(":","\\:")+"]"))&&(c=e,d=e.getAttribute(a))});c&&(e.strictDi=null!==Dd(c,"strict-di"),a(c,d?[d]:[],e))}function rc(b,a,c){G(c)||(c={});c=E({strictDi:!1},c);var d=function(){b=D(b);if(b.injector()){var d=b[0]===X?"document":sa(b);throw Xa("btstrpd",d.replace(/</,"&lt;").replace(/>/,"&gt;"));}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);c.debugInfoEnabled&&a.push(["$compileProvider",function(a){a.debugInfoEnabled(!0)}]);a.unshift("ng");
d=Jb(a,c.strictDi);d.invoke(["$rootScope","$rootElement","$compile","$injector",function(a,b,c,d){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return d},e=/^NG_ENABLE_DEBUG_INFO!/,f=/^NG_DEFER_BOOTSTRAP!/;S&&e.test(S.name)&&(c.debugInfoEnabled=!0,S.name=S.name.replace(e,""));if(S&&!f.test(S.name))return d();S.name=S.name.replace(f,"");ta.resumeBootstrap=function(b){r(b,function(b){a.push(b)});d()}}function Fd(){S.name="NG_ENABLE_DEBUG_INFO!"+S.name;S.location.reload()}function Gd(b){return ta.element(b).injector().get("$$testability")}
function Kb(b,a){a=a||"_";return b.replace(Hd,function(b,d){return(d?a:"")+b.toLowerCase()})}function Id(){var b;sc||((ma=S.jQuery)&&ma.fn.on?(D=ma,E(ma.fn,{scope:Ja.scope,isolateScope:Ja.isolateScope,controller:Ja.controller,injector:Ja.injector,inheritedData:Ja.inheritedData}),b=ma.cleanData,ma.cleanData=function(a){var c;if(Lb)Lb=!1;else for(var d=0,e;null!=(e=a[d]);d++)(c=ma._data(e,"events"))&&c.$destroy&&ma(e).triggerHandler("$destroy");b(a)}):D=R,ta.element=D,sc=!0)}function Mb(b,a,c){if(!b)throw Xa("areq",
a||"?",c||"required");return b}function nb(b,a,c){c&&B(b)&&(b=b[b.length-1]);Mb(F(b),a,"not a function, got "+(b&&"object"===typeof b?b.constructor.name||"Object":typeof b));return b}function Ka(b,a){if("hasOwnProperty"===b)throw Xa("badname",a);}function tc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,f=a.length,g=0;g<f;g++)d=a[g],b&&(b=(e=b)[d]);return!c&&F(b)?nc(e,b):b}function ob(b){var a=b[0];b=b[b.length-1];var c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b);return D(c)}function wa(){return Object.create(null)}
function Jd(b){function a(a,b,c){return a[b]||(a[b]=c())}var c=y("$injector"),d=y("ng");b=a(b,"angular",Object);b.$$minErr=b.$$minErr||y;return a(b,"module",function(){var b={};return function(f,g,k){if("hasOwnProperty"===f)throw d("badname","module");g&&b.hasOwnProperty(f)&&(b[f]=null);return a(b,f,function(){function a(c,d,e,f){f||(f=b);return function(){f[e||"push"]([c,d,arguments]);return n}}if(!g)throw c("nomod",f);var b=[],d=[],e=[],p=a("$injector","invoke","push",d),n={_invokeQueue:b,_configBlocks:d,
_runBlocks:e,requires:g,name:f,provider:a("$provide","provider"),factory:a("$provide","factory"),service:a("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),animation:a("$animateProvider","register"),filter:a("$filterProvider","register"),controller:a("$controllerProvider","register"),directive:a("$compileProvider","directive"),config:p,run:function(a){e.push(a);return this}};k&&p(k);return n})}})}function Kd(b){E(b,{bootstrap:rc,copy:Ca,extend:E,equals:la,
element:D,forEach:r,injector:Jb,noop:A,bind:nc,toJson:ra,fromJson:oc,identity:Ta,isUndefined:w,isDefined:z,isString:I,isFunction:F,isObject:G,isNumber:W,isElement:mc,isArray:B,version:Ld,isDate:ea,lowercase:N,uppercase:pb,callbacks:{counter:0},getTestability:Gd,$$minErr:y,$$csp:Za,reloadWithDebugInfo:Fd});$a=Jd(S);try{$a("ngLocale")}catch(a){$a("ngLocale",[]).provider("$locale",Md)}$a("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:Nd});a.provider("$compile",uc).directive({a:Od,
input:vc,textarea:vc,form:Pd,script:Qd,select:Rd,style:Sd,option:Td,ngBind:Ud,ngBindHtml:Vd,ngBindTemplate:Wd,ngClass:Xd,ngClassEven:Yd,ngClassOdd:Zd,ngCloak:$d,ngController:ae,ngForm:be,ngHide:ce,ngIf:de,ngInclude:ee,ngInit:fe,ngNonBindable:ge,ngPluralize:he,ngRepeat:ie,ngShow:je,ngStyle:ke,ngSwitch:le,ngSwitchWhen:me,ngSwitchDefault:ne,ngOptions:oe,ngTransclude:pe,ngModel:qe,ngList:re,ngChange:se,pattern:wc,ngPattern:wc,required:xc,ngRequired:xc,minlength:yc,ngMinlength:yc,maxlength:zc,ngMaxlength:zc,
ngValue:te,ngModelOptions:ue}).directive({ngInclude:ve}).directive(qb).directive(Ac);a.provider({$anchorScroll:we,$animate:xe,$browser:ye,$cacheFactory:ze,$controller:Ae,$document:Be,$exceptionHandler:Ce,$filter:Bc,$interpolate:De,$interval:Ee,$http:Fe,$httpBackend:Ge,$location:He,$log:Ie,$parse:Je,$rootScope:Ke,$q:Le,$$q:Me,$sce:Ne,$sceDelegate:Oe,$sniffer:Pe,$templateCache:Qe,$templateRequest:Re,$$testability:Se,$timeout:Te,$window:Ue,$$rAF:Ve,$$asyncCallback:We})}])}function ab(b){return b.replace(Xe,
function(a,b,d,e){return e?d.toUpperCase():d}).replace(Ye,"Moz$1")}function Cc(b){b=b.nodeType;return b===ka||!b||9===b}function Dc(b,a){var c,d,e=a.createDocumentFragment(),f=[];if(Nb.test(b)){c=c||e.appendChild(a.createElement("div"));d=(Ze.exec(b)||["",""])[1].toLowerCase();d=ha[d]||ha._default;c.innerHTML=d[1]+b.replace($e,"<$1></$2>")+d[2];for(d=d[0];d--;)c=c.lastChild;f=jb(f,c.childNodes);c=e.firstChild;c.textContent=""}else f.push(a.createTextNode(b));e.textContent="";e.innerHTML="";r(f,function(a){e.appendChild(a)});
return e}function R(b){if(b instanceof R)return b;var a;I(b)&&(b=U(b),a=!0);if(!(this instanceof R)){if(a&&"<"!=b.charAt(0))throw Ob("nosel");return new R(b)}if(a){a=X;var c;b=(c=af.exec(b))?[a.createElement(c[1])]:(c=Dc(b,a))?c.childNodes:[]}Ec(this,b)}function Pb(b){return b.cloneNode(!0)}function rb(b,a){a||sb(b);if(b.querySelectorAll)for(var c=b.querySelectorAll("*"),d=0,e=c.length;d<e;d++)sb(c[d])}function Fc(b,a,c,d){if(z(d))throw Ob("offargs");var e=(d=tb(b))&&d.events,f=d&&d.handle;if(f)if(a)r(a.split(" "),
function(a){if(z(c)){var d=e[a];Wa(d||[],c);if(d&&0<d.length)return}b.removeEventListener(a,f,!1);delete e[a]});else for(a in e)"$destroy"!==a&&b.removeEventListener(a,f,!1),delete e[a]}function sb(b,a){var c=b.ng339,d=c&&ub[c];d&&(a?delete d.data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),Fc(b)),delete ub[c],b.ng339=u))}function tb(b,a){var c=b.ng339,c=c&&ub[c];a&&!c&&(b.ng339=c=++bf,c=ub[c]={events:{},data:{},handle:u});return c}function Qb(b,a,c){if(Cc(b)){var d=z(c),e=!d&&a&&!G(a),
f=!a;b=(b=tb(b,!e))&&b.data;if(d)b[a]=c;else{if(f)return b;if(e)return b&&b[a];E(b,a)}}}function Rb(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function Sb(b,a){a&&b.setAttribute&&r(a.split(" "),function(a){b.setAttribute("class",U((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+U(a)+" "," ")))})}function Tb(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");
r(a.split(" "),function(a){a=U(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",U(c))}}function Ec(b,a){if(a)if(a.nodeType)b[b.length++]=a;else{var c=a.length;if("number"===typeof c&&a.window!==a){if(c)for(var d=0;d<c;d++)b[b.length++]=a[d]}else b[b.length++]=a}}function Gc(b,a){return vb(b,"$"+(a||"ngController")+"Controller")}function vb(b,a,c){9==b.nodeType&&(b=b.documentElement);for(a=B(a)?a:[a];b;){for(var d=0,e=a.length;d<e;d++)if((c=D.data(b,a[d]))!==u)return c;b=b.parentNode||
11===b.nodeType&&b.host}}function Hc(b){for(rb(b,!0);b.firstChild;)b.removeChild(b.firstChild)}function Ic(b,a){a||rb(b);var c=b.parentNode;c&&c.removeChild(b)}function cf(b,a){a=a||S;if("complete"===a.document.readyState)a.setTimeout(b);else D(a).on("load",b)}function Jc(b,a){var c=wb[a.toLowerCase()];return c&&Kc[pa(b)]&&c}function df(b,a){var c=b.nodeName;return("INPUT"===c||"TEXTAREA"===c)&&Lc[a]}function ef(b,a){var c=function(c,e){c.isDefaultPrevented=function(){return c.defaultPrevented};var f=
a[e||c.type],g=f?f.length:0;if(g){if(w(c.immediatePropagationStopped)){var k=c.stopImmediatePropagation;c.stopImmediatePropagation=function(){c.immediatePropagationStopped=!0;c.stopPropagation&&c.stopPropagation();k&&k.call(c)}}c.isImmediatePropagationStopped=function(){return!0===c.immediatePropagationStopped};1<g&&(f=qa(f));for(var h=0;h<g;h++)c.isImmediatePropagationStopped()||f[h].call(b,c)}};c.elem=b;return c}function La(b,a){var c=b&&b.$$hashKey;if(c)return"function"===typeof c&&(c=b.$$hashKey()),
c;c=typeof b;return c="function"==c||"object"==c&&null!==b?b.$$hashKey=c+":"+(a||Ad)():c+":"+b}function bb(b,a){if(a){var c=0;this.nextUid=function(){return++c}}r(b,this.put,this)}function ff(b){return(b=b.toString().replace(Mc,"").match(Nc))?"function("+(b[1]||"").replace(/[\s\r\n]+/," ")+")":"fn"}function Ub(b,a,c){var d;if("function"===typeof b){if(!(d=b.$inject)){d=[];if(b.length){if(a)throw I(c)&&c||(c=b.name||ff(b)),Ea("strictdi",c);a=b.toString().replace(Mc,"");a=a.match(Nc);r(a[1].split(gf),
function(a){a.replace(hf,function(a,b,c){d.push(c)})})}b.$inject=d}}else B(b)?(a=b.length-1,nb(b[a],"fn"),d=b.slice(0,a)):nb(b,"fn",!0);return d}function Jb(b,a){function c(a){return function(b,c){if(G(b))r(b,jc(a));else return a(b,c)}}function d(a,b){Ka(a,"service");if(F(b)||B(b))b=p.instantiate(b);if(!b.$get)throw Ea("pget",a);return q[a+"Provider"]=b}function e(a,b){return function(){var c=s.invoke(b,this,u,a);if(w(c))throw Ea("undef",a);return c}}function f(a,b,c){return d(a,{$get:!1!==c?e(a,
b):b})}function g(a){var b=[],c;r(a,function(a){function d(a){var b,c;b=0;for(c=a.length;b<c;b++){var e=a[b],f=p.get(e[0]);f[e[1]].apply(f,e[2])}}if(!m.get(a)){m.put(a,!0);try{I(a)?(c=$a(a),b=b.concat(g(c.requires)).concat(c._runBlocks),d(c._invokeQueue),d(c._configBlocks)):F(a)?b.push(p.invoke(a)):B(a)?b.push(p.invoke(a)):nb(a,"module")}catch(e){throw B(a)&&(a=a[a.length-1]),e.message&&e.stack&&-1==e.stack.indexOf(e.message)&&(e=e.message+"\n"+e.stack),Ea("modulerr",a,e.stack||e.message||e);}}});
return b}function k(b,c){function d(a){if(b.hasOwnProperty(a)){if(b[a]===h)throw Ea("cdep",a+" <- "+l.join(" <- "));return b[a]}try{return l.unshift(a),b[a]=h,b[a]=c(a)}catch(e){throw b[a]===h&&delete b[a],e;}finally{l.shift()}}function e(b,c,f,g){"string"===typeof f&&(g=f,f=null);var h=[];g=Ub(b,a,g);var k,l,n;l=0;for(k=g.length;l<k;l++){n=g[l];if("string"!==typeof n)throw Ea("itkn",n);h.push(f&&f.hasOwnProperty(n)?f[n]:d(n))}B(b)&&(b=b[k]);return b.apply(c,h)}return{invoke:e,instantiate:function(a,
b,c){var d=function(){};d.prototype=(B(a)?a[a.length-1]:a).prototype;d=new d;a=e(a,d,b,c);return G(a)||F(a)?a:d},get:d,annotate:Ub,has:function(a){return q.hasOwnProperty(a+"Provider")||b.hasOwnProperty(a)}}}a=!0===a;var h={},l=[],m=new bb([],!0),q={$provide:{provider:c(d),factory:c(f),service:c(function(a,b){return f(a,["$injector",function(a){return a.instantiate(b)}])}),value:c(function(a,b){return f(a,da(b),!1)}),constant:c(function(a,b){Ka(a,"constant");q[a]=b;n[a]=b}),decorator:function(a,b){var c=
p.get(a+"Provider"),d=c.$get;c.$get=function(){var a=s.invoke(d,c);return s.invoke(b,null,{$delegate:a})}}}},p=q.$injector=k(q,function(){throw Ea("unpr",l.join(" <- "));}),n={},s=n.$injector=k(n,function(a){var b=p.get(a+"Provider");return s.invoke(b.$get,b,u,a)});r(g(b),function(a){s.invoke(a||A)});return s}function we(){var b=!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;Array.prototype.some.call(a,function(a){if("a"===
pa(a))return b=a,!0});return b}function f(b){if(b){b.scrollIntoView();var c;c=g.yOffset;F(c)?c=c():mc(c)?(c=c[0],c="fixed"!==a.getComputedStyle(c).position?0:c.getBoundingClientRect().bottom):W(c)||(c=0);c&&(b=b.getBoundingClientRect().top,a.scrollBy(0,b-c))}else a.scrollTo(0,0)}function g(){var a=c.hash(),b;a?(b=k.getElementById(a))?f(b):(b=e(k.getElementsByName(a)))?f(b):"top"===a&&f(null):f(null)}var k=a.document;b&&d.$watch(function(){return c.hash()},function(a,b){a===b&&""===a||cf(function(){d.$evalAsync(g)})});
return g}]}function We(){this.$get=["$$rAF","$timeout",function(b,a){return b.supported?function(a){return b(a)}:function(b){return a(b,0,!1)}}]}function jf(b,a,c,d){function e(a){try{a.apply(null,Ya.call(arguments,1))}finally{if(x--,0===x)for(;t.length;)try{t.pop()()}catch(b){c.error(b)}}}function f(a,b){(function xa(){r(T,function(a){a()});C=b(xa,a)})()}function g(){k();h()}function k(){M=b.history.state;M=w(M)?null:M;la(M,V)&&(M=V);V=M}function h(){if(H!==m.url()||P!==M)H=m.url(),P=M,r(O,function(a){a(m.url(),
M)})}function l(a){try{return decodeURIComponent(a)}catch(b){return a}}var m=this,q=a[0],p=b.location,n=b.history,s=b.setTimeout,J=b.clearTimeout,v={};m.isMock=!1;var x=0,t=[];m.$$completeOutstandingRequest=e;m.$$incOutstandingRequestCount=function(){x++};m.notifyWhenNoOutstandingRequests=function(a){r(T,function(a){a()});0===x?a():t.push(a)};var T=[],C;m.addPollFn=function(a){w(C)&&f(100,s);T.push(a);return a};var M,P,H=p.href,Q=a.find("base"),aa=null;k();P=M;m.url=function(a,c,e){w(e)&&(e=null);
p!==b.location&&(p=b.location);n!==b.history&&(n=b.history);if(a){var f=P===e;if(H!==a||d.history&&!f){var g=H&&Fa(H)===Fa(a);H=a;P=e;!d.history||g&&f?(g||(aa=a),c?p.replace(a):p.href=a):(n[c?"replaceState":"pushState"](e,"",a),k(),P=M);return m}}else return aa||p.href.replace(/%27/g,"'")};m.state=function(){return M};var O=[],K=!1,V=null;m.onUrlChange=function(a){if(!K){if(d.history)D(b).on("popstate",g);D(b).on("hashchange",g);K=!0}O.push(a);return a};m.$$checkUrlChange=h;m.baseHref=function(){var a=
Q.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};var ca={},Ma="",fa=m.baseHref();m.cookies=function(a,b){var d,e,f,g;if(a)b===u?q.cookie=encodeURIComponent(a)+"=;path="+fa+";expires=Thu, 01 Jan 1970 00:00:00 GMT":I(b)&&(d=(q.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+";path="+fa).length+1,4096<d&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(q.cookie!==Ma)for(Ma=q.cookie,d=Ma.split("; "),ca={},f=0;f<d.length;f++)e=
d[f],g=e.indexOf("="),0<g&&(a=l(e.substring(0,g)),ca[a]===u&&(ca[a]=l(e.substring(g+1))));return ca}};m.defer=function(a,b){var c;x++;c=s(function(){delete v[c];e(a)},b||0);v[c]=!0;return c};m.defer.cancel=function(a){return v[a]?(delete v[a],J(a),e(A),!0):!1}}function ye(){this.$get=["$window","$log","$sniffer","$document",function(b,a,c,d){return new jf(b,d,a,c)}]}function ze(){this.$get=function(){function b(b,d){function e(a){a!=q&&(p?p==a&&(p=a.n):p=a,f(a.n,a.p),f(a,q),q=a,q.n=null)}function f(a,
b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw y("$cacheFactory")("iid",b);var g=0,k=E({},d,{id:b}),h={},l=d&&d.capacity||Number.MAX_VALUE,m={},q=null,p=null;return a[b]={put:function(a,b){if(l<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});e(c)}if(!w(b))return a in h||g++,h[a]=b,g>l&&this.remove(p.key),b},get:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return h[a]},remove:function(a){if(l<Number.MAX_VALUE){var b=m[a];if(!b)return;b==q&&(q=b.p);b==p&&(p=b.n);f(b.n,b.p);delete m[a]}delete h[a];
g--},removeAll:function(){h={};g=0;m={};q=p=null},destroy:function(){m=k=h=null;delete a[b]},info:function(){return E({},k,{size:g})}}}var a={};b.info=function(){var b={};r(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function Qe(){this.$get=["$cacheFactory",function(b){return b("templates")}]}function uc(b,a){function c(a,b){var c=/^\s*([@=&])(\??)\s*(\w*)\s*$/,d={};r(a,function(a,e){var f=a.match(c);if(!f)throw ia("iscp",b,e,a);d[e]={attrName:f[3]||e,mode:f[1],
optional:"?"===f[2]}});return d}var d={},e=/^\s*directive\:\s*([\d\w_\-]+)\s+(.*)$/,f=/(([\d\w_\-]+)(?:\:([^;]+))?;?)/,g=Bd("ngSrc,ngSrcset,src,srcset"),k=/^(?:(\^\^?)?(\?)?(\^\^?)?)?/,h=/^(on[a-z]+|formaction)$/;this.directive=function q(a,e){Ka(a,"directive");I(a)?(Mb(e,"directiveFactory"),d.hasOwnProperty(a)||(d[a]=[],b.factory(a+"Directive",["$injector","$exceptionHandler",function(b,e){var f=[];r(d[a],function(d,g){try{var h=b.invoke(d);F(h)?h={compile:da(h)}:!h.compile&&h.link&&(h.compile=da(h.link));
h.priority=h.priority||0;h.index=g;h.name=h.name||a;h.require=h.require||h.controller&&h.name;h.restrict=h.restrict||"EA";G(h.scope)&&(h.$$isolateBindings=c(h.scope,h.name));f.push(h)}catch(k){e(k)}});return f}])),d[a].push(e)):r(a,jc(q));return this};this.aHrefSanitizationWhitelist=function(b){return z(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return z(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};
var l=!0;this.debugInfoEnabled=function(a){return z(a)?(l=a,this):l};this.$get=["$injector","$interpolate","$exceptionHandler","$templateRequest","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,c,s,J,v,x,t,T,C,M){function P(a,b){try{a.addClass(b)}catch(c){}}function H(a,b,c,d,e){a instanceof D||(a=D(a));r(a,function(b,c){b.nodeType==kb&&b.nodeValue.match(/\S+/)&&(a[c]=D(b).wrap("<span></span>").parent()[0])});var f=Q(a,b,a,c,d,e);H.$$addScopeClass(a);
var g=null;return function(b,c,d,e,h){Mb(b,"scope");g||(g=(h=h&&h[0])?"foreignobject"!==pa(h)&&h.toString().match(/SVG/)?"svg":"html":"html");h="html"!==g?D(S(g,D("<div>").append(a).html())):c?Ja.clone.call(a):a;if(d)for(var k in d)h.data("$"+k+"Controller",d[k].instance);H.$$addScopeInfo(h,b);c&&c(h,b);f&&f(b,h,h,e);return h}}function Q(a,b,c,d,e,f){function g(a,c,d,e){var f,k,l,p,n,t,s;if(q)for(s=Array(c.length),p=0;p<h.length;p+=3)f=h[p],s[f]=c[f];else s=c;p=0;for(n=h.length;p<n;)k=s[h[p++]],c=
h[p++],f=h[p++],c?(c.scope?(l=a.$new(),H.$$addScopeInfo(D(k),l)):l=a,t=c.transcludeOnThisElement?aa(a,c.transclude,e,c.elementTranscludeOnThisElement):!c.templateOnThisElement&&e?e:!e&&b?aa(a,b):null,c(f,l,k,d,t)):f&&f(a,k.childNodes,u,e)}for(var h=[],k,l,p,n,q,t=0;t<a.length;t++){k=new Xb;l=O(a[t],[],k,0===t?d:u,e);(f=l.length?ca(l,a[t],k,b,c,null,[],[],f):null)&&f.scope&&H.$$addScopeClass(k.$$element);k=f&&f.terminal||!(p=a[t].childNodes)||!p.length?null:Q(p,f?(f.transcludeOnThisElement||!f.templateOnThisElement)&&
f.transclude:b);if(f||k)h.push(t,f,k),n=!0,q=q||f;f=null}return n?g:null}function aa(a,b,c,d){return function(d,e,f,g,h){d||(d=a.$new(!1,h),d.$$transcluded=!0);return b(d,e,f,c,g)}}function O(b,c,g,h,k){var l=g.$attr,p;switch(b.nodeType){case ka:fa(c,ua(pa(b)),"E",h,k);for(var n,t,s,v=b.attributes,J=0,T=v&&v.length;J<T;J++){var M=!1,C=!1;n=v[J];p=n.name;n=U(n.value);t=ua(p);if(s=ya.test(t))p=Kb(t.substr(6),"-");var H=t.replace(/(Start|End)$/,""),P;a:{var O=H;if(d.hasOwnProperty(O)){P=void 0;for(var O=
a.get(O+"Directive"),r=0,aa=O.length;r<aa;r++)if(P=O[r],P.multiElement){P=!0;break a}}P=!1}P&&t===H+"Start"&&(M=p,C=p.substr(0,p.length-5)+"end",p=p.substr(0,p.length-6));t=ua(p.toLowerCase());l[t]=p;if(s||!g.hasOwnProperty(t))g[t]=n,Jc(b,t)&&(g[t]=!0);R(b,c,n,t,s);fa(c,t,"A",h,k,M,C)}b=b.className;if(I(b)&&""!==b)for(;p=f.exec(b);)t=ua(p[2]),fa(c,t,"C",h,k)&&(g[t]=U(p[3])),b=b.substr(p.index+p[0].length);break;case kb:Y(c,b.nodeValue);break;case 8:try{if(p=e.exec(b.nodeValue))t=ua(p[1]),fa(c,t,"M",
h,k)&&(g[t]=U(p[2]))}catch(x){}}c.sort(y);return c}function K(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ia("uterdir",b,c);a.nodeType==ka&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return D(d)}function V(a,b,c){return function(d,e,f,g,h){e=K(e[0],b,c);return a(d,e,f,g,h)}}function ca(a,d,e,f,g,h,l,q,t){function s(a,b,c,d){if(a){c&&(a=V(a,c,d));a.require=L.require;a.directiveName=ga;if(Q===L||L.$$isolateScope)a=
Z(a,{isolateScope:!0});l.push(a)}if(b){c&&(b=V(b,c,d));b.require=L.require;b.directiveName=ga;if(Q===L||L.$$isolateScope)b=Z(b,{isolateScope:!0});q.push(b)}}function T(a,b,c,d){var e,f="data",g=!1,h=c,l;if(I(b)){if(l=b.match(k),b=b.substring(l[0].length),l[3]&&(l[1]?l[3]=null:l[1]=l[3]),"^"===l[1]?f="inheritedData":"^^"===l[1]&&(f="inheritedData",h=c.parent()),"?"===l[2]&&(g=!0),e=null,d&&"data"===f&&(e=d[b])&&(e=e.instance),e=e||h[f]("$"+b+"Controller"),!e&&!g)throw ia("ctreq",b,a);}else B(b)&&(e=
[],r(b,function(b){e.push(T(a,b,c,d))}));return e}function M(a,c,f,g,h){function k(a,b,c){var d;Ua(a)||(c=b,b=a,a=u);E&&(d=P);c||(c=E?O.parent():O);return h(a,b,d,c,Wb)}var n,t,s,C,P,xb,O,K;d===f?(K=e,O=e.$$element):(O=D(f),K=new Xb(O,e));Q&&(C=c.$new(!0));xb=h&&k;aa&&(x={},P={},r(aa,function(a){var b={$scope:a===Q||a.$$isolateScope?C:c,$element:O,$attrs:K,$transclude:xb};s=a.controller;"@"==s&&(s=K[a.name]);b=v(s,b,!0,a.controllerAs);P[a.name]=b;E||O.data("$"+a.name+"Controller",b.instance);x[a.name]=
b}));if(Q){H.$$addScopeInfo(O,C,!0,!(ca&&(ca===Q||ca===Q.$$originalDirective)));H.$$addScopeClass(O,!0);g=x&&x[Q.name];var V=C;g&&g.identifier&&!0===Q.bindToController&&(V=g.instance);r(C.$$isolateBindings=Q.$$isolateBindings,function(a,d){var e=a.attrName,f=a.optional,g,h,k,l;switch(a.mode){case "@":K.$observe(e,function(a){V[d]=a});K.$$observers[e].$$scope=c;K[e]&&(V[d]=b(K[e])(c));break;case "=":if(f&&!K[e])break;h=J(K[e]);l=h.literal?la:function(a,b){return a===b||a!==a&&b!==b};k=h.assign||function(){g=
V[d]=h(c);throw ia("nonassign",K[e],Q.name);};g=V[d]=h(c);f=function(a){l(a,V[d])||(l(a,g)?k(c,a=V[d]):V[d]=a);return g=a};f.$stateful=!0;f=c.$watch(J(K[e],f),null,h.literal);C.$on("$destroy",f);break;case "&":h=J(K[e]),V[d]=function(a){return h(c,a)}}})}x&&(r(x,function(a){a()}),x=null);g=0;for(n=l.length;g<n;g++)t=l[g],$(t,t.isolateScope?C:c,O,K,t.require&&T(t.directiveName,t.require,O,P),xb);var Wb=c;Q&&(Q.template||null===Q.templateUrl)&&(Wb=C);a&&a(Wb,f.childNodes,u,h);for(g=q.length-1;0<=g;g--)t=
q[g],$(t,t.isolateScope?C:c,O,K,t.require&&T(t.directiveName,t.require,O,P),xb)}t=t||{};for(var C=-Number.MAX_VALUE,P,aa=t.controllerDirectives,x,Q=t.newIsolateScopeDirective,ca=t.templateDirective,fa=t.nonTlbTranscludeDirective,Na=!1,A=!1,E=t.hasElementTranscludeDirective,Y=e.$$element=D(d),L,ga,y,Ga=f,N,R=0,ya=a.length;R<ya;R++){L=a[R];var W=L.$$start,Vb=L.$$end;W&&(Y=K(d,W,Vb));y=u;if(C>L.priority)break;if(y=L.scope)L.templateUrl||(G(y)?(xa("new/isolated scope",Q||P,L,Y),Q=L):xa("new/isolated scope",
Q,L,Y)),P=P||L;ga=L.name;!L.templateUrl&&L.controller&&(y=L.controller,aa=aa||{},xa("'"+ga+"' controller",aa[ga],L,Y),aa[ga]=L);if(y=L.transclude)Na=!0,L.$$tlb||(xa("transclusion",fa,L,Y),fa=L),"element"==y?(E=!0,C=L.priority,y=Y,Y=e.$$element=D(X.createComment(" "+ga+": "+e[ga]+" ")),d=Y[0],yb(g,Ya.call(y,0),d),Ga=H(y,f,C,h&&h.name,{nonTlbTranscludeDirective:fa})):(y=D(Pb(d)).contents(),Y.empty(),Ga=H(y,f));if(L.template)if(A=!0,xa("template",ca,L,Y),ca=L,y=F(L.template)?L.template(Y,e):L.template,
y=Oc(y),L.replace){h=L;y=Nb.test(y)?Pc(S(L.templateNamespace,U(y))):[];d=y[0];if(1!=y.length||d.nodeType!==ka)throw ia("tplrt",ga,"");yb(g,Y,d);ya={$attr:{}};y=O(d,[],ya);var ba=a.splice(R+1,a.length-(R+1));Q&&Ma(y);a=a.concat(y).concat(ba);z(e,ya);ya=a.length}else Y.html(y);if(L.templateUrl)A=!0,xa("template",ca,L,Y),ca=L,L.replace&&(h=L),M=w(a.splice(R,a.length-R),Y,e,g,Na&&Ga,l,q,{controllerDirectives:aa,newIsolateScopeDirective:Q,templateDirective:ca,nonTlbTranscludeDirective:fa}),ya=a.length;
else if(L.compile)try{N=L.compile(Y,e,Ga),F(N)?s(null,N,W,Vb):N&&s(N.pre,N.post,W,Vb)}catch(kf){c(kf,sa(Y))}L.terminal&&(M.terminal=!0,C=Math.max(C,L.priority))}M.scope=P&&!0===P.scope;M.transcludeOnThisElement=Na;M.elementTranscludeOnThisElement=E;M.templateOnThisElement=A;M.transclude=Ga;t.hasElementTranscludeDirective=E;return M}function Ma(a){for(var b=0,c=a.length;b<c;b++)a[b]=lc(a[b],{$$isolateScope:!0})}function fa(b,e,f,g,h,k,l){if(e===h)return null;h=null;if(d.hasOwnProperty(e)){var p;e=
a.get(e+"Directive");for(var t=0,s=e.length;t<s;t++)try{p=e[t],(g===u||g>p.priority)&&-1!=p.restrict.indexOf(f)&&(k&&(p=lc(p,{$$start:k,$$end:l})),b.push(p),h=p)}catch(v){c(v)}}return h}function z(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;r(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&b[e]!==d&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});r(b,function(b,f){"class"==f?(P(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==f?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+
";":"")+b):"$"==f.charAt(0)||a.hasOwnProperty(f)||(a[f]=b,d[f]=c[f])})}function w(a,b,c,d,e,f,g,h){var k=[],l,p,n=b[0],t=a.shift(),q=E({},t,{templateUrl:null,transclude:null,replace:null,$$originalDirective:t}),v=F(t.templateUrl)?t.templateUrl(b,c):t.templateUrl,J=t.templateNamespace;b.empty();s(T.getTrustedResourceUrl(v)).then(function(s){var C,T;s=Oc(s);if(t.replace){s=Nb.test(s)?Pc(S(J,U(s))):[];C=s[0];if(1!=s.length||C.nodeType!==ka)throw ia("tplrt",t.name,v);s={$attr:{}};yb(d,b,C);var M=O(C,
[],s);G(t.scope)&&Ma(M);a=M.concat(a);z(c,s)}else C=n,b.html(s);a.unshift(q);l=ca(a,C,c,e,b,t,f,g,h);r(d,function(a,c){a==C&&(d[c]=b[0])});for(p=Q(b[0].childNodes,e);k.length;){s=k.shift();T=k.shift();var H=k.shift(),K=k.shift(),M=b[0];if(!s.$$destroyed){if(T!==n){var x=T.className;h.hasElementTranscludeDirective&&t.replace||(M=Pb(C));yb(H,D(T),M);P(D(M),x)}T=l.transcludeOnThisElement?aa(s,l.transclude,K):K;l(p,s,M,d,T)}}k=null});return function(a,b,c,d,e){a=e;b.$$destroyed||(k?(k.push(b),k.push(c),
k.push(d),k.push(a)):(l.transcludeOnThisElement&&(a=aa(b,l.transclude,e)),l(p,b,c,d,a)))}}function y(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function xa(a,b,c,d){if(b)throw ia("multidir",b.name,c.name,a,sa(d));}function Y(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:function(a){a=a.parent();var b=!!a.length;b&&H.$$addBindingClass(a);return function(a,c){var e=c.parent();b||H.$$addBindingClass(e);H.$$addBindingInfo(e,d.expressions);a.$watch(d,
function(a){c[0].nodeValue=a})}}})}function S(a,b){a=N(a||"html");switch(a){case "svg":case "math":var c=X.createElement("div");c.innerHTML="<"+a+">"+b+"</"+a+">";return c.childNodes[0].childNodes;default:return b}}function Ga(a,b){if("srcdoc"==b)return T.HTML;var c=pa(a);if("xlinkHref"==b||"form"==c&&"action"==b||"img"!=c&&("src"==b||"ngSrc"==b))return T.RESOURCE_URL}function R(a,c,d,e,f){var k=b(d,!0);if(k){if("multiple"===e&&"select"===pa(a))throw ia("selmulti",sa(a));c.push({priority:100,compile:function(){return{pre:function(c,
d,l){d=l.$$observers||(l.$$observers={});if(h.test(e))throw ia("nodomevents");l[e]&&(k=b(l[e],!0,Ga(a,e),g[e]||f))&&(l[e]=k(c),(d[e]||(d[e]=[])).$$inter=!0,(l.$$observers&&l.$$observers[e].$$scope||c).$watch(k,function(a,b){"class"===e&&a!=b?l.$updateClass(a,b):l.$set(e,a)}))}}}})}}function yb(a,b,c){var d=b[0],e=b.length,f=d.parentNode,g,h;if(a)for(g=0,h=a.length;g<h;g++)if(a[g]==d){a[g++]=c;h=g+e-1;for(var k=a.length;g<k;g++,h++)h<k?a[g]=a[h]:delete a[g];a.length-=e-1;a.context===d&&(a.context=
c);break}f&&f.replaceChild(c,d);a=X.createDocumentFragment();a.appendChild(d);D(c).data(D(d).data());ma?(Lb=!0,ma.cleanData([d])):delete D.cache[d[D.expando]];d=1;for(e=b.length;d<e;d++)f=b[d],D(f).remove(),a.appendChild(f),delete b[d];b[0]=c;b.length=1}function Z(a,b){return E(function(){return a.apply(null,arguments)},a,b)}function $(a,b,d,e,f,g){try{a(b,d,e,f,g)}catch(h){c(h,sa(d))}}var Xb=function(a,b){if(b){var c=Object.keys(b),d,e,f;d=0;for(e=c.length;d<e;d++)f=c[d],this[f]=b[f]}else this.$attr=
{};this.$$element=a};Xb.prototype={$normalize:ua,$addClass:function(a){a&&0<a.length&&C.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&C.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=Qc(a,b);c&&c.length&&C.addClass(this.$$element,c);(c=Qc(b,a))&&c.length&&C.removeClass(this.$$element,c)},$set:function(a,b,d,e){var f=this.$$element[0],g=Jc(f,a),h=df(f,a),f=a;g?(this.$$element.prop(a,b),e=g):h&&(this[h]=b,f=h);this[a]=b;e?this.$attr[a]=e:(e=this.$attr[a])||(this.$attr[a]=
e=Kb(a,"-"));g=pa(this.$$element);if("a"===g&&"href"===a||"img"===g&&"src"===a)this[a]=b=M(b,"src"===a);else if("img"===g&&"srcset"===a){for(var g="",h=U(b),k=/(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/,k=/\s/.test(h)?k:/(,)/,h=h.split(k),k=Math.floor(h.length/2),l=0;l<k;l++)var p=2*l,g=g+M(U(h[p]),!0),g=g+(" "+U(h[p+1]));h=U(h[2*l]).split(/\s/);g+=M(U(h[0]),!0);2===h.length&&(g+=" "+U(h[1]));this[a]=b=g}!1!==d&&(null===b||b===u?this.$$element.removeAttr(e):this.$$element.attr(e,b));(a=this.$$observers)&&
r(a[f],function(a){try{a(b)}catch(d){c(d)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers=wa()),e=d[a]||(d[a]=[]);e.push(b);x.$evalAsync(function(){e.$$inter||b(c[a])});return function(){Wa(e,b)}}};var ga=b.startSymbol(),Na=b.endSymbol(),Oc="{{"==ga||"}}"==Na?Ta:function(a){return a.replace(/\{\{/g,ga).replace(/}}/g,Na)},ya=/^ngAttr[A-Z]/;H.$$addBindingInfo=l?function(a,b){var c=a.data("$binding")||[];B(b)?c=c.concat(b):c.push(b);a.data("$binding",c)}:A;H.$$addBindingClass=l?
function(a){P(a,"ng-binding")}:A;H.$$addScopeInfo=l?function(a,b,c,d){a.data(c?d?"$isolateScopeNoTemplate":"$isolateScope":"$scope",b)}:A;H.$$addScopeClass=l?function(a,b){P(a,b?"ng-isolate-scope":"ng-scope")}:A;return H}]}function ua(b){return ab(b.replace(lf,""))}function Qc(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),f=0;a:for(;f<d.length;f++){for(var g=d[f],k=0;k<e.length;k++)if(g==e[k])continue a;c+=(0<c.length?" ":"")+g}return c}function Pc(b){b=D(b);var a=b.length;if(1>=a)return b;for(;a--;)8===
b[a].nodeType&&mf.call(b,a,1);return b}function Ae(){var b={},a=!1,c=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,c){Ka(a,"controller");G(a)?E(b,a):b[a]=c};this.allowGlobals=function(){a=!0};this.$get=["$injector","$window",function(d,e){function f(a,b,c,d){if(!a||!G(a.$scope))throw y("$controller")("noscp",d,b);a.$scope[b]=c}return function(g,k,h,l){var m,q,p;h=!0===h;l&&I(l)&&(p=l);I(g)&&(l=g.match(c),q=l[1],p=p||l[3],g=b.hasOwnProperty(q)?b[q]:tc(k.$scope,q,!0)||(a?tc(e,q,!0):u),nb(g,q,!0));
if(h)return h=function(){},h.prototype=(B(g)?g[g.length-1]:g).prototype,m=new h,p&&f(k,p,m,q||g.name),E(function(){d.invoke(g,m,k,q);return m},{instance:m,identifier:p});m=d.instantiate(g,k,q);p&&f(k,p,m,q||g.name);return m}}]}function Be(){this.$get=["$window",function(b){return D(b.document)}]}function Ce(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function Rc(b){var a={},c,d,e;if(!b)return a;r(b.split("\n"),function(b){e=b.indexOf(":");c=N(U(b.substr(0,e)));
d=U(b.substr(e+1));c&&(a[c]=a[c]?a[c]+", "+d:d)});return a}function Sc(b){var a=G(b)?b:u;return function(c){a||(a=Rc(b));return c?a[N(c)]||null:a}}function Tc(b,a,c){if(F(c))return c(b,a);r(c,function(c){b=c(b,a)});return b}function Fe(){var b=/^\s*(\[|\{[^\{])/,a=/[\}\]]\s*$/,c=/^\)\]\}',?\n/,d={"Content-Type":"application/json;charset=utf-8"},e=this.defaults={transformResponse:[function(d,e){if(I(d)){d=d.replace(c,"");var f=e("Content-Type");if(f&&0===f.indexOf("application/json")||b.test(d)&&a.test(d))d=
oc(d)}return d}],transformRequest:[function(a){return G(a)&&"[object File]"!==Ia.call(a)&&"[object Blob]"!==Ia.call(a)?ra(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:qa(d),put:qa(d),patch:qa(d)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},f=!1;this.useApplyAsync=function(a){return z(a)?(f=!!a,this):f};var g=this.interceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(a,b,c,d,q,p){function n(a){function b(a){var d=
E({},a);d.data=a.data?Tc(a.data,a.headers,c.transformResponse):a.data;a=a.status;return 200<=a&&300>a?d:q.reject(d)}var c={method:"get",transformRequest:e.transformRequest,transformResponse:e.transformResponse},d=function(a){var b=e.headers,c=E({},a.headers),d,f,b=E({},b.common,b[N(a.method)]);a:for(d in b){a=N(d);for(f in c)if(N(f)===a)continue a;c[d]=b[d]}(function(a){var b;r(a,function(c,d){F(c)&&(b=c(),null!=b?a[d]=b:delete a[d])})})(c);return c}(a);E(c,a);c.headers=d;c.method=pb(c.method);var f=
[function(a){d=a.headers;var c=Tc(a.data,Sc(d),a.transformRequest);w(c)&&r(d,function(a,b){"content-type"===N(b)&&delete d[b]});w(a.withCredentials)&&!w(e.withCredentials)&&(a.withCredentials=e.withCredentials);return s(a,c,d).then(b,b)},u],g=q.when(c);for(r(x,function(a){(a.request||a.requestError)&&f.unshift(a.request,a.requestError);(a.response||a.responseError)&&f.push(a.response,a.responseError)});f.length;){a=f.shift();var h=f.shift(),g=g.then(a,h)}g.success=function(a){g.then(function(b){a(b.data,
b.status,b.headers,c)});return g};g.error=function(a){g.then(null,function(b){a(b.data,b.status,b.headers,c)});return g};return g}function s(c,g,l){function p(a,b,c,e){function g(){s(b,a,c,e)}O&&(200<=a&&300>a?O.put(V,[a,b,Rc(c),e]):O.remove(V));f?d.$applyAsync(g):(g(),d.$$phase||d.$apply())}function s(a,b,d,e){b=Math.max(b,0);(200<=b&&300>b?x.resolve:x.reject)({data:a,status:b,headers:Sc(d),config:c,statusText:e})}function H(){var a=n.pendingRequests.indexOf(c);-1!==a&&n.pendingRequests.splice(a,
1)}var x=q.defer(),r=x.promise,O,K,V=J(c.url,c.params);n.pendingRequests.push(c);r.then(H,H);!c.cache&&!e.cache||!1===c.cache||"GET"!==c.method&&"JSONP"!==c.method||(O=G(c.cache)?c.cache:G(e.cache)?e.cache:v);if(O)if(K=O.get(V),z(K)){if(K&&F(K.then))return K.then(H,H),K;B(K)?s(K[1],K[0],qa(K[2]),K[3]):s(K,200,{},"OK")}else O.put(V,r);w(K)&&((K=Uc(c.url)?b.cookies()[c.xsrfCookieName||e.xsrfCookieName]:u)&&(l[c.xsrfHeaderName||e.xsrfHeaderName]=K),a(c.method,V,g,p,l,c.timeout,c.withCredentials,c.responseType));
return r}function J(a,b){if(!b)return a;var c=[];zd(b,function(a,b){null===a||w(a)||(B(a)||(a=[a]),r(a,function(a){G(a)&&(a=ea(a)?a.toISOString():ra(a));c.push(Da(b)+"="+Da(a))}))});0<c.length&&(a+=(-1==a.indexOf("?")?"?":"&")+c.join("&"));return a}var v=c("$http"),x=[];r(g,function(a){x.unshift(I(a)?p.get(a):p.invoke(a))});n.pendingRequests=[];(function(a){r(arguments,function(a){n[a]=function(b,c){return n(E(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){r(arguments,function(a){n[a]=
function(b,c,d){return n(E(d||{},{method:a,url:b,data:c}))}})})("post","put","patch");n.defaults=e;return n}]}function nf(){return new S.XMLHttpRequest}function Ge(){this.$get=["$browser","$window","$document",function(b,a,c){return of(b,nf,b.defer,a.angular.callbacks,c[0])}]}function of(b,a,c,d,e){function f(a,b,c){var f=e.createElement("script"),m=null;f.type="text/javascript";f.src=a;f.async=!0;m=function(a){f.removeEventListener("load",m,!1);f.removeEventListener("error",m,!1);e.body.removeChild(f);
f=null;var g=-1,n="unknown";a&&("load"!==a.type||d[b].called||(a={type:"error"}),n=a.type,g="error"===a.type?404:200);c&&c(g,n)};f.addEventListener("load",m,!1);f.addEventListener("error",m,!1);e.body.appendChild(f);return m}return function(e,k,h,l,m,q,p,n){function s(){x&&x();t&&t.abort()}function J(a,d,e,f,g){C&&c.cancel(C);x=t=null;a(d,e,f,g);b.$$completeOutstandingRequest(A)}b.$$incOutstandingRequestCount();k=k||b.url();if("jsonp"==N(e)){var v="_"+(d.counter++).toString(36);d[v]=function(a){d[v].data=
a;d[v].called=!0};var x=f(k.replace("JSON_CALLBACK","angular.callbacks."+v),v,function(a,b){J(l,a,d[v].data,"",b);d[v]=A})}else{var t=a();t.open(e,k,!0);r(m,function(a,b){z(a)&&t.setRequestHeader(b,a)});t.onload=function(){var a=t.statusText||"",b="response"in t?t.response:t.responseText,c=1223===t.status?204:t.status;0===c&&(c=b?200:"file"==za(k).protocol?404:0);J(l,c,b,t.getAllResponseHeaders(),a)};e=function(){J(l,-1,null,null,"")};t.onerror=e;t.onabort=e;p&&(t.withCredentials=!0);if(n)try{t.responseType=
n}catch(T){if("json"!==n)throw T;}t.send(h||null)}if(0<q)var C=c(s,q);else q&&F(q.then)&&q.then(s)}}function De(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function f(a){return"\\\\\\"+a}function g(f,g,n,s){function J(c){return c.replace(l,b).replace(m,a)}function v(a){try{var b;var c=n?e.getTrusted(n,a):e.valueOf(a);if(null==c)b="";else{switch(typeof c){case "string":break;
case "number":c=""+c;break;default:c=ra(c)}b=c}return b}catch(g){a=Yb("interr",f,g.toString()),d(a)}}s=!!s;for(var x,t,T=0,C=[],M=[],P=f.length,H=[],r=[];T<P;)if(-1!=(x=f.indexOf(b,T))&&-1!=(t=f.indexOf(a,x+k)))T!==x&&H.push(J(f.substring(T,x))),T=f.substring(x+k,t),C.push(T),M.push(c(T,v)),T=t+h,r.push(H.length),H.push("");else{T!==P&&H.push(J(f.substring(T)));break}if(n&&1<H.length)throw Yb("noconcat",f);if(!g||C.length){var u=function(a){for(var b=0,c=C.length;b<c;b++){if(s&&w(a[b]))return;H[r[b]]=
a[b]}return H.join("")};return E(function(a){var b=0,c=C.length,e=Array(c);try{for(;b<c;b++)e[b]=M[b](a);return u(e)}catch(g){a=Yb("interr",f,g.toString()),d(a)}},{exp:f,expressions:C,$$watchDelegate:function(a,b,c){var d;return a.$watchGroup(M,function(c,e){var f=u(c);F(b)&&b.call(this,f,c!==e?d:f,a);d=f},c)}})}}var k=b.length,h=a.length,l=new RegExp(b.replace(/./g,f),"g"),m=new RegExp(a.replace(/./g,f),"g");g.startSymbol=function(){return b};g.endSymbol=function(){return a};return g}]}function Ee(){this.$get=
["$rootScope","$window","$q","$$q",function(b,a,c,d){function e(e,k,h,l){var m=a.setInterval,q=a.clearInterval,p=0,n=z(l)&&!l,s=(n?d:c).defer(),J=s.promise;h=z(h)?h:0;J.then(null,null,e);J.$$intervalId=m(function(){s.notify(p++);0<h&&p>=h&&(s.resolve(p),q(J.$$intervalId),delete f[J.$$intervalId]);n||b.$apply()},k);f[J.$$intervalId]=s;return J}var f={};e.cancel=function(b){return b&&b.$$intervalId in f?(f[b.$$intervalId].reject("canceled"),a.clearInterval(b.$$intervalId),delete f[b.$$intervalId],!0):
!1};return e}]}function Md(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a",short:"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return 1===b?"one":"other"}}}}function Zb(b){b=b.split("/");for(var a=b.length;a--;)b[a]=lb(b[a]);return b.join("/")}function Vc(b,a,c){b=za(b,c);a.$$protocol=
b.protocol;a.$$host=b.hostname;a.$$port=ba(b.port)||pf[b.protocol]||null}function Wc(b,a,c){var d="/"!==b.charAt(0);d&&(b="/"+b);b=za(b,c);a.$$path=decodeURIComponent(d&&"/"===b.pathname.charAt(0)?b.pathname.substring(1):b.pathname);a.$$search=qc(b.search);a.$$hash=decodeURIComponent(b.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function va(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Fa(b){var a=b.indexOf("#");return-1==a?b:b.substr(0,a)}function $b(b){return b.substr(0,
Fa(b).lastIndexOf("/")+1)}function ac(b,a){this.$$html5=!0;a=a||"";var c=$b(b);Vc(b,this,b);this.$$parse=function(a){var e=va(c,a);if(!I(e))throw cb("ipthprfx",a,c);Wc(e,this,b);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Ib(this.$$search),b=this.$$hash?"#"+lb(this.$$hash):"";this.$$url=Zb(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;(f=va(b,d))!==u?
(g=f,g=(f=va(a,f))!==u?c+(va("/",f)||f):b+g):(f=va(c,d))!==u?g=c+f:c==d+"/"&&(g=c);g&&this.$$parse(g);return!!g}}function bc(b,a){var c=$b(b);Vc(b,this,b);this.$$parse=function(d){var e=va(b,d)||va(c,d),e="#"==e.charAt(0)?va(a,e):this.$$html5?e:"";if(!I(e))throw cb("ihshprfx",d,a);Wc(e,this,b);d=this.$$path;var f=/^\/[A-Z]:(\/.*)/;0===e.indexOf(b)&&(e=e.replace(b,""));f.exec(e)||(d=(e=f.exec(d))?e[1]:d);this.$$path=d;this.$$compose()};this.$$compose=function(){var c=Ib(this.$$search),e=this.$$hash?
"#"+lb(this.$$hash):"";this.$$url=Zb(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+(this.$$url?a+this.$$url:"")};this.$$parseLinkUrl=function(a,c){return Fa(b)==Fa(a)?(this.$$parse(a),!0):!1}}function Xc(b,a){this.$$html5=!0;bc.apply(this,arguments);var c=$b(b);this.$$parseLinkUrl=function(d,e){if(e&&"#"===e[0])return this.hash(e.slice(1)),!0;var f,g;b==Fa(d)?f=d:(g=va(c,d))?f=b+a+g:c===d+"/"&&(f=c);f&&this.$$parse(f);return!!f};this.$$compose=function(){var c=Ib(this.$$search),e=this.$$hash?"#"+lb(this.$$hash):
"";this.$$url=Zb(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=b+a+this.$$url}}function zb(b){return function(){return this[b]}}function Yc(b,a){return function(c){if(w(c))return this[b];this[b]=a(c);this.$$compose();return this}}function He(){var b="",a={enabled:!1,requireBase:!0,rewriteLinks:!0};this.hashPrefix=function(a){return z(a)?(b=a,this):b};this.html5Mode=function(b){return Va(b)?(a.enabled=b,this):G(b)?(Va(b.enabled)&&(a.enabled=b.enabled),Va(b.requireBase)&&(a.requireBase=b.requireBase),Va(b.rewriteLinks)&&
(a.rewriteLinks=b.rewriteLinks),this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement",function(c,d,e,f){function g(a,b,c){var e=h.url(),f=h.$$state;try{d.url(a,b,c),h.$$state=d.state()}catch(g){throw h.url(e),h.$$state=f,g;}}function k(a,b){c.$broadcast("$locationChangeSuccess",h.absUrl(),a,h.$$state,b)}var h,l;l=d.baseHref();var m=d.url(),q;if(a.enabled){if(!l&&a.requireBase)throw cb("nobase");q=m.substring(0,m.indexOf("/",m.indexOf("//")+2))+(l||"/");l=e.history?ac:Xc}else q=Fa(m),
l=bc;h=new l(q,"#"+b);h.$$parseLinkUrl(m,m);h.$$state=d.state();var p=/^\s*(javascript|mailto):/i;f.on("click",function(b){if(a.rewriteLinks&&!b.ctrlKey&&!b.metaKey&&2!=b.which){for(var e=D(b.target);"a"!==pa(e[0]);)if(e[0]===f[0]||!(e=e.parent())[0])return;var g=e.prop("href"),k=e.attr("href")||e.attr("xlink:href");G(g)&&"[object SVGAnimatedString]"===g.toString()&&(g=za(g.animVal).href);p.test(g)||!g||e.attr("target")||b.isDefaultPrevented()||!h.$$parseLinkUrl(g,k)||(b.preventDefault(),h.absUrl()!=
d.url()&&(c.$apply(),S.angular["ff-684208-preventDefault"]=!0))}});h.absUrl()!=m&&d.url(h.absUrl(),!0);var n=!0;d.onUrlChange(function(a,b){c.$evalAsync(function(){var d=h.absUrl(),e=h.$$state;h.$$parse(a);h.$$state=b;c.$broadcast("$locationChangeStart",a,d,b,e).defaultPrevented?(h.$$parse(d),h.$$state=e,g(d,!1,e)):(n=!1,k(d,e))});c.$$phase||c.$digest()});c.$watch(function(){var a=d.url(),b=d.state(),f=h.$$replace,l=a!==h.absUrl()||h.$$html5&&e.history&&b!==h.$$state;if(n||l)n=!1,c.$evalAsync(function(){c.$broadcast("$locationChangeStart",
h.absUrl(),a,h.$$state,b).defaultPrevented?(h.$$parse(a),h.$$state=b):(l&&g(h.absUrl(),f,b===h.$$state?null:h.$$state),k(a,b))});h.$$replace=!1});return h}]}function Ie(){var b=!0,a=this;this.debugEnabled=function(a){return z(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||
{},e=b[a]||b.log||A;a=!1;try{a=!!e.apply}catch(h){}return a?function(){var a=[];r(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function na(b,a){if("__defineGetter__"===b||"__defineSetter__"===b||"__lookupGetter__"===b||"__lookupSetter__"===b||"__proto__"===b)throw oa("isecfld",a);return b}function Aa(b,a){if(b){if(b.constructor===
b)throw oa("isecfn",a);if(b.window===b)throw oa("isecwindow",a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw oa("isecdom",a);if(b===Object)throw oa("isecobj",a);}return b}function cc(b){return b.constant}function Oa(b,a,c,d){Aa(b,d);a=a.split(".");for(var e,f=0;1<a.length;f++){e=na(a.shift(),d);var g=Aa(b[e],d);g||(g={},b[e]=g);b=g}e=na(a.shift(),d);Aa(b[e],d);return b[e]=c}function Zc(b,a,c,d,e,f){na(b,f);na(a,f);na(c,f);na(d,f);na(e,f);return function(f,k){var h=k&&k.hasOwnProperty(b)?
k:f;if(null==h)return h;h=h[b];if(!a)return h;if(null==h)return u;h=h[a];if(!c)return h;if(null==h)return u;h=h[c];if(!d)return h;if(null==h)return u;h=h[d];return e?null==h?u:h=h[e]:h}}function $c(b,a,c){var d=ad[b];if(d)return d;var e=b.split("."),f=e.length;if(a.csp)d=6>f?Zc(e[0],e[1],e[2],e[3],e[4],c):function(a,b){var d=0,g;do g=Zc(e[d++],e[d++],e[d++],e[d++],e[d++],c)(a,b),b=u,a=g;while(d<f);return g};else{var g="";r(e,function(a,b){na(a,c);g+="if(s == null) return undefined;\ns="+(b?"s":'((l&&l.hasOwnProperty("'+
a+'"))?l:s)')+"."+a+";\n"});g+="return s;";a=new Function("s","l",g);a.toString=da(g);d=a}d.sharedGetter=!0;d.assign=function(a,c){return Oa(a,b,c,b)};return ad[b]=d}function Je(){var b=wa(),a={csp:!1};this.$get=["$filter","$sniffer",function(c,d){function e(a){var b=a;a.sharedGetter&&(b=function(b,c){return a(b,c)},b.literal=a.literal,b.constant=a.constant,b.assign=a.assign);return b}function f(a,b){for(var c=0,d=a.length;c<d;c++){var e=a[c];e.constant||(e.inputs?f(e.inputs,b):-1===b.indexOf(e)&&
b.push(e))}return b}function g(a,b){return null==a||null==b?a===b:"object"===typeof a&&(a=a.valueOf(),"object"===typeof a)?!1:a===b||a!==a&&b!==b}function k(a,b,c,d){var e=d.$$inputs||(d.$$inputs=f(d.inputs,[])),h;if(1===e.length){var k=g,e=e[0];return a.$watch(function(a){var b=e(a);g(b,k)||(h=d(a),k=b&&b.valueOf());return h},b,c)}for(var l=[],m=0,q=e.length;m<q;m++)l[m]=g;return a.$watch(function(a){for(var b=!1,c=0,f=e.length;c<f;c++){var k=e[c](a);if(b||(b=!g(k,l[c])))l[c]=k&&k.valueOf()}b&&(h=
d(a));return h},b,c)}function h(a,b,c,d){var e,f;return e=a.$watch(function(a){return d(a)},function(a,c,d){f=a;F(b)&&b.apply(this,arguments);z(a)&&d.$$postDigest(function(){z(f)&&e()})},c)}function l(a,b,c,d){function e(a){var b=!0;r(a,function(a){z(a)||(b=!1)});return b}var f,g;return f=a.$watch(function(a){return d(a)},function(a,c,d){g=a;F(b)&&b.call(this,a,c,d);e(a)&&d.$$postDigest(function(){e(g)&&f()})},c)}function m(a,b,c,d){var e;return e=a.$watch(function(a){return d(a)},function(a,c,d){F(b)&&
b.apply(this,arguments);e()},c)}function q(a,b){if(!b)return a;var c=function(c,d){var e=a(c,d),f=b(e,c,d);return z(e)?f:e};a.$$watchDelegate&&a.$$watchDelegate!==k?c.$$watchDelegate=a.$$watchDelegate:b.$stateful||(c.$$watchDelegate=k,c.inputs=[a]);return c}a.csp=d.csp;return function(d,f){var g,J,v;switch(typeof d){case "string":return v=d=d.trim(),g=b[v],g||(":"===d.charAt(0)&&":"===d.charAt(1)&&(J=!0,d=d.substring(2)),g=new dc(a),g=(new db(g,c,a)).parse(d),g.constant?g.$$watchDelegate=m:J?(g=e(g),
g.$$watchDelegate=g.literal?l:h):g.inputs&&(g.$$watchDelegate=k),b[v]=g),q(g,f);case "function":return q(d,f);default:return q(A,f)}}}]}function Le(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return bd(function(a){b.$evalAsync(a)},a)}]}function Me(){this.$get=["$browser","$exceptionHandler",function(b,a){return bd(function(a){b.defer(a)},a)}]}function bd(b,a){function c(a,b,c){function d(b){return function(c){e||(e=!0,b.call(a,c))}}var e=!1;return[d(b),d(c)]}function d(){this.$$state=
{status:0}}function e(a,b){return function(c){b.call(a,c)}}function f(c){!c.processScheduled&&c.pending&&(c.processScheduled=!0,b(function(){var b,d,e;e=c.pending;c.processScheduled=!1;c.pending=u;for(var f=0,g=e.length;f<g;++f){d=e[f][0];b=e[f][c.status];try{F(b)?d.resolve(b(c.value)):1===c.status?d.resolve(c.value):d.reject(c.value)}catch(h){d.reject(h),a(h)}}}))}function g(){this.promise=new d;this.resolve=e(this,this.resolve);this.reject=e(this,this.reject);this.notify=e(this,this.notify)}var k=
y("$q",TypeError);d.prototype={then:function(a,b,c){var d=new g;this.$$state.pending=this.$$state.pending||[];this.$$state.pending.push([d,a,b,c]);0<this.$$state.status&&f(this.$$state);return d.promise},"catch":function(a){return this.then(null,a)},"finally":function(a,b){return this.then(function(b){return l(b,!0,a)},function(b){return l(b,!1,a)},b)}};g.prototype={resolve:function(a){this.promise.$$state.status||(a===this.promise?this.$$reject(k("qcycle",a)):this.$$resolve(a))},$$resolve:function(b){var d,
e;e=c(this,this.$$resolve,this.$$reject);try{if(G(b)||F(b))d=b&&b.then;F(d)?(this.promise.$$state.status=-1,d.call(b,e[0],e[1],this.notify)):(this.promise.$$state.value=b,this.promise.$$state.status=1,f(this.promise.$$state))}catch(g){e[1](g),a(g)}},reject:function(a){this.promise.$$state.status||this.$$reject(a)},$$reject:function(a){this.promise.$$state.value=a;this.promise.$$state.status=2;f(this.promise.$$state)},notify:function(c){var d=this.promise.$$state.pending;0>=this.promise.$$state.status&&
d&&d.length&&b(function(){for(var b,e,f=0,g=d.length;f<g;f++){e=d[f][0];b=d[f][3];try{e.notify(F(b)?b(c):c)}catch(h){a(h)}}})}};var h=function(a,b){var c=new g;b?c.resolve(a):c.reject(a);return c.promise},l=function(a,b,c){var d=null;try{F(c)&&(d=c())}catch(e){return h(e,!1)}return d&&F(d.then)?d.then(function(){return h(a,b)},function(a){return h(a,!1)}):h(a,b)},m=function(a,b,c,d){var e=new g;e.resolve(a);return e.promise.then(b,c,d)},q=function n(a){if(!F(a))throw k("norslvr",a);if(!(this instanceof
n))return new n(a);var b=new g;a(function(a){b.resolve(a)},function(a){b.reject(a)});return b.promise};q.defer=function(){return new g};q.reject=function(a){var b=new g;b.reject(a);return b.promise};q.when=m;q.all=function(a){var b=new g,c=0,d=B(a)?[]:{};r(a,function(a,e){c++;m(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise};return q}function Ve(){this.$get=["$window","$timeout",function(b,
a){var c=b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame,d=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.mozCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,e=!!c,f=e?function(a){var b=c(a);return function(){d(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};f.supported=e;return f}]}function Ke(){var b=10,a=y("$rootScope"),c=null,d=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$injector","$exceptionHandler",
"$parse","$browser",function(e,f,g,k){function h(){this.$id=++hb;this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this.$root=this;this.$$destroyed=!1;this.$$listeners={};this.$$listenerCount={};this.$$isolateBindings=null}function l(b){if(s.$$phase)throw a("inprog",s.$$phase);s.$$phase=b}function m(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function q(){}function p(){for(;x.length;)try{x.shift()()}catch(a){f(a)}d=
null}function n(){null===d&&(d=k.defer(function(){s.$apply(p)}))}h.prototype={constructor:h,$new:function(a,b){function c(){d.$$destroyed=!0}var d;b=b||this;a?(d=new h,d.$root=this.$root):(this.$$ChildScope||(this.$$ChildScope=function(){this.$$watchers=this.$$nextSibling=this.$$childHead=this.$$childTail=null;this.$$listeners={};this.$$listenerCount={};this.$id=++hb;this.$$ChildScope=null},this.$$ChildScope.prototype=this),d=new this.$$ChildScope);d.$parent=b;d.$$prevSibling=b.$$childTail;b.$$childHead?
(b.$$childTail.$$nextSibling=d,b.$$childTail=d):b.$$childHead=b.$$childTail=d;(a||b!=this)&&d.$on("$destroy",c);return d},$watch:function(a,b,d){var e=g(a);if(e.$$watchDelegate)return e.$$watchDelegate(this,b,d,e);var f=this.$$watchers,h={fn:b,last:q,get:e,exp:a,eq:!!d};c=null;F(b)||(h.fn=A);f||(f=this.$$watchers=[]);f.unshift(h);return function(){Wa(f,h);c=null}},$watchGroup:function(a,b){function c(){h=!1;k?(k=!1,b(e,e,g)):b(e,d,g)}var d=Array(a.length),e=Array(a.length),f=[],g=this,h=!1,k=!0;if(!a.length){var l=
!0;g.$evalAsync(function(){l&&b(e,e,g)});return function(){l=!1}}if(1===a.length)return this.$watch(a[0],function(a,c,f){e[0]=a;d[0]=c;b(e,a===c?e:d,f)});r(a,function(a,b){var k=g.$watch(a,function(a,f){e[b]=a;d[b]=f;h||(h=!0,g.$evalAsync(c))});f.push(k)});return function(){for(;f.length;)f.shift()()}},$watchCollection:function(a,b){function c(a){e=a;var b,d,g,h;if(G(e))if(Ra(e))for(f!==p&&(f=p,s=f.length=0,l++),a=e.length,s!==a&&(l++,f.length=s=a),b=0;b<a;b++)h=f[b],g=e[b],d=h!==h&&g!==g,d||h===
g||(l++,f[b]=g);else{f!==n&&(f=n={},s=0,l++);a=0;for(b in e)e.hasOwnProperty(b)&&(a++,g=e[b],h=f[b],b in f?(d=h!==h&&g!==g,d||h===g||(l++,f[b]=g)):(s++,f[b]=g,l++));if(s>a)for(b in l++,f)e.hasOwnProperty(b)||(s--,delete f[b])}else f!==e&&(f=e,l++);return l}c.$stateful=!0;var d=this,e,f,h,k=1<b.length,l=0,m=g(a,c),p=[],n={},q=!0,s=0;return this.$watch(m,function(){q?(q=!1,b(e,e,d)):b(e,h,d);if(k)if(G(e))if(Ra(e)){h=Array(e.length);for(var a=0;a<e.length;a++)h[a]=e[a]}else for(a in h={},e)Hb.call(e,
a)&&(h[a]=e[a]);else h=e})},$digest:function(){var e,g,h,m,n,r,Q=b,x,O=[],K,u,z;l("$digest");k.$$checkUrlChange();this===s&&null!==d&&(k.defer.cancel(d),p());c=null;do{r=!1;for(x=this;J.length;){try{z=J.shift(),z.scope.$eval(z.expression)}catch(y){f(y)}c=null}a:do{if(m=x.$$watchers)for(n=m.length;n--;)try{if(e=m[n])if((g=e.get(x))!==(h=e.last)&&!(e.eq?la(g,h):"number"===typeof g&&"number"===typeof h&&isNaN(g)&&isNaN(h)))r=!0,c=e,e.last=e.eq?Ca(g,null):g,e.fn(g,h===q?g:h,x),5>Q&&(K=4-Q,O[K]||(O[K]=
[]),u=F(e.exp)?"fn: "+(e.exp.name||e.exp.toString()):e.exp,u+="; newVal: "+ra(g)+"; oldVal: "+ra(h),O[K].push(u));else if(e===c){r=!1;break a}}catch(D){f(D)}if(!(m=x.$$childHead||x!==this&&x.$$nextSibling))for(;x!==this&&!(m=x.$$nextSibling);)x=x.$parent}while(x=m);if((r||J.length)&&!Q--)throw s.$$phase=null,a("infdig",b,ra(O));}while(r||J.length);for(s.$$phase=null;v.length;)try{v.shift()()}catch(A){f(A)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=
!0;if(this!==s){for(var b in this.$$listenerCount)m(this,this.$$listenerCount[b],b);a.$$childHead==this&&(a.$$childHead=this.$$nextSibling);a.$$childTail==this&&(a.$$childTail=this.$$prevSibling);this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling);this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling);this.$destroy=this.$digest=this.$apply=this.$evalAsync=this.$applyAsync=A;this.$on=this.$watch=this.$watchGroup=function(){return A};this.$$listeners={};this.$parent=
this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=this.$$watchers=null}}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a){s.$$phase||J.length||k.defer(function(){J.length&&s.$digest()});J.push({scope:this,expression:a})},$$postDigest:function(a){v.push(a)},$apply:function(a){try{return l("$apply"),this.$eval(a)}catch(b){f(b)}finally{s.$$phase=null;try{s.$digest()}catch(c){throw f(c),c;}}},$applyAsync:function(a){function b(){c.$eval(a)}var c=this;a&&
x.push(b);n()},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);var e=this;return function(){c[c.indexOf(b)]=null;m(e,1,a)}},$emit:function(a,b){var c=[],d,e=this,g=!1,h={name:a,targetScope:e,stopPropagation:function(){g=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=jb([h],arguments,1),l,m;do{d=e.$$listeners[a]||c;h.currentScope=e;
l=0;for(m=d.length;l<m;l++)if(d[l])try{d[l].apply(null,k)}catch(p){f(p)}else d.splice(l,1),l--,m--;if(g)return h.currentScope=null,h;e=e.$parent}while(e);h.currentScope=null;return h},$broadcast:function(a,b){var c=this,d=this,e={name:a,targetScope:this,preventDefault:function(){e.defaultPrevented=!0},defaultPrevented:!1};if(!this.$$listenerCount[a])return e;for(var g=jb([e],arguments,1),h,k;c=d;){e.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,g)}catch(l){f(l)}else d.splice(h,
1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}e.currentScope=null;return e}};var s=new h,J=s.$$asyncQueue=[],v=s.$$postDigestQueue=[],x=s.$$applyAsyncQueue=[];return s}]}function Nd(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*((https?|ftp|file|blob):|data:image\/)/;this.aHrefSanitizationWhitelist=function(a){return z(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return z(b)?(a=b,this):a};this.$get=
function(){return function(c,d){var e=d?a:b,f;f=za(c).href;return""===f||f.match(e)?c:"unsafe:"+f}}}function qf(b){if("self"===b)return b;if(I(b)){if(-1<b.indexOf("***"))throw Ba("iwcard",b);b=b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08").replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return new RegExp("^"+b+"$")}if(ib(b))return new RegExp("^"+b.source+"$");throw Ba("imatcher");}function cd(b){var a=[];z(b)&&r(b,function(b){a.push(qf(b))});return a}function Oe(){this.SCE_CONTEXTS=
ja;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=cd(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&(a=cd(b));return a};this.$get=["$injector",function(c){function d(a,b){return"self"===a?Uc(b):!!a.exec(b.href)}function e(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};
return b}var f=function(a){throw Ba("unsafe");};c.has("$sanitize")&&(f=c.get("$sanitize"));var g=e(),k={};k[ja.HTML]=e(g);k[ja.CSS]=e(g);k[ja.URL]=e(g);k[ja.JS]=e(g);k[ja.RESOURCE_URL]=e(k[ja.URL]);return{trustAs:function(a,b){var c=k.hasOwnProperty(a)?k[a]:null;if(!c)throw Ba("icontext",a,b);if(null===b||b===u||""===b)return b;if("string"!==typeof b)throw Ba("itype",a);return new c(b)},getTrusted:function(c,e){if(null===e||e===u||""===e)return e;var g=k.hasOwnProperty(c)?k[c]:null;if(g&&e instanceof
g)return e.$$unwrapTrustedValue();if(c===ja.RESOURCE_URL){var g=za(e.toString()),q,p,n=!1;q=0;for(p=b.length;q<p;q++)if(d(b[q],g)){n=!0;break}if(n)for(q=0,p=a.length;q<p;q++)if(d(a[q],g)){n=!1;break}if(n)return e;throw Ba("insecurl",e.toString());}if(c===ja.HTML)return f(e);throw Ba("unsafe");},valueOf:function(a){return a instanceof g?a.$$unwrapTrustedValue():a}}}]}function Ne(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$document","$parse","$sceDelegate",function(a,
c,d){if(b&&8>a[0].documentMode)throw Ba("iequirks");var e=qa(ja);e.isEnabled=function(){return b};e.trustAs=d.trustAs;e.getTrusted=d.getTrusted;e.valueOf=d.valueOf;b||(e.trustAs=e.getTrusted=function(a,b){return b},e.valueOf=Ta);e.parseAs=function(a,b){var d=c(b);return d.literal&&d.constant?d:c(b,function(b){return e.getTrusted(a,b)})};var f=e.parseAs,g=e.getTrusted,k=e.trustAs;r(ja,function(a,b){var c=N(b);e[ab("parse_as_"+c)]=function(b){return f(a,b)};e[ab("get_trusted_"+c)]=function(b){return g(a,
b)};e[ab("trust_as_"+c)]=function(b){return k(a,b)}});return e}]}function Pe(){this.$get=["$window","$document",function(b,a){var c={},d=ba((/android (\d+)/.exec(N((b.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),f=a[0]||{},g,k=/^(Moz|webkit|O|ms)(?=[A-Z])/,h=f.body&&f.body.style,l=!1,m=!1;if(h){for(var q in h)if(l=k.exec(q)){g=l[0];g=g.substr(0,1).toUpperCase()+g.substr(1);break}g||(g="WebkitOpacity"in h&&"webkit");l=!!("transition"in h||g+"Transition"in h);m=!!("animation"in
h||g+"Animation"in h);!d||l&&m||(l=I(f.body.style.webkitTransition),m=I(f.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hasEvent:function(a){if("input"==a&&9==Pa)return!1;if(w(c[a])){var b=f.createElement("div");c[a]="on"+a in b}return c[a]},csp:Za(),vendorPrefix:g,transitions:l,animations:m,android:d}}]}function Re(){this.$get=["$templateCache","$http","$q",function(b,a,c){function d(e,f){function g(){k.totalPendingRequests--;if(!f)throw ia("tpload",e);return c.reject()}
var k=d;k.totalPendingRequests++;return a.get(e,{cache:b}).then(function(a){a=a.data;if(!a||0===a.length)return g();k.totalPendingRequests--;b.put(e,a);return a},g)}d.totalPendingRequests=0;return d}]}function Se(){this.$get=["$rootScope","$browser","$location",function(b,a,c){return{findBindings:function(a,b,c){a=a.getElementsByClassName("ng-binding");var g=[];r(a,function(a){var d=ta.element(a).data("$binding");d&&r(d,function(d){c?(new RegExp("(^|\\s)"+b+"(\\s|\\||$)")).test(d)&&g.push(a):-1!=
d.indexOf(b)&&g.push(a)})});return g},findModels:function(a,b,c){for(var g=["ng-","data-ng-","ng\\:"],k=0;k<g.length;++k){var h=a.querySelectorAll("["+g[k]+"model"+(c?"=":"*=")+'"'+b+'"]');if(h.length)return h}},getLocation:function(){return c.url()},setLocation:function(a){a!==c.url()&&(c.url(a),b.$digest())},whenStable:function(b){a.notifyWhenNoOutstandingRequests(b)}}}]}function Te(){this.$get=["$rootScope","$browser","$q","$$q","$exceptionHandler",function(b,a,c,d,e){function f(f,h,l){var m=z(l)&&
!l,q=(m?d:c).defer(),p=q.promise;h=a.defer(function(){try{q.resolve(f())}catch(a){q.reject(a),e(a)}finally{delete g[p.$$timeoutId]}m||b.$apply()},h);p.$$timeoutId=h;g[h]=q;return p}var g={};f.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return f}]}function za(b,a){var c=b;Pa&&(Z.setAttribute("href",c),c=Z.href);Z.setAttribute("href",c);return{href:Z.href,protocol:Z.protocol?Z.protocol.replace(/:$/,""):
"",host:Z.host,search:Z.search?Z.search.replace(/^\?/,""):"",hash:Z.hash?Z.hash.replace(/^#/,""):"",hostname:Z.hostname,port:Z.port,pathname:"/"===Z.pathname.charAt(0)?Z.pathname:"/"+Z.pathname}}function Uc(b){b=I(b)?za(b):b;return b.protocol===dd.protocol&&b.host===dd.host}function Ue(){this.$get=da(S)}function Bc(b){function a(c,d){if(G(c)){var e={};r(c,function(b,c){e[c]=a(c,b)});return e}return b.factory(c+"Filter",d)}this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+
"Filter")}}];a("currency",ed);a("date",fd);a("filter",rf);a("json",sf);a("limitTo",tf);a("lowercase",uf);a("number",gd);a("orderBy",hd);a("uppercase",vf)}function rf(){return function(b,a,c){if(!B(b))return b;var d=typeof c,e=[];e.check=function(a,b){for(var c=0;c<e.length;c++)if(!e[c](a,b))return!1;return!0};"function"!==d&&(c="boolean"===d&&c?function(a,b){return ta.equals(a,b)}:function(a,b){if(a&&b&&"object"===typeof a&&"object"===typeof b){for(var d in a)if("$"!==d.charAt(0)&&Hb.call(a,d)&&c(a[d],
b[d]))return!0;return!1}b=(""+b).toLowerCase();return-1<(""+a).toLowerCase().indexOf(b)});var f=function(a,b){if("string"===typeof b&&"!"===b.charAt(0))return!f(a,b.substr(1));switch(typeof a){case "boolean":case "number":case "string":return c(a,b);case "object":switch(typeof b){case "object":return c(a,b);default:for(var d in a)if("$"!==d.charAt(0)&&f(a[d],b))return!0}return!1;case "array":for(d=0;d<a.length;d++)if(f(a[d],b))return!0;return!1;default:return!1}};switch(typeof a){case "boolean":case "number":case "string":a=
{$:a};case "object":for(var g in a)(function(b){"undefined"!==typeof a[b]&&e.push(function(c){return f("$"==b?c:c&&c[b],a[b])})})(g);break;case "function":e.push(a);break;default:return b}d=[];for(g=0;g<b.length;g++){var k=b[g];e.check(k,g)&&d.push(k)}return d}}function ed(b){var a=b.NUMBER_FORMATS;return function(b,d,e){w(d)&&(d=a.CURRENCY_SYM);w(e)&&(e=2);return null==b?b:id(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,e).replace(/\u00A4/g,d)}}function gd(b){var a=b.NUMBER_FORMATS;return function(b,
d){return null==b?b:id(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function id(b,a,c,d,e){if(!isFinite(b)||G(b))return"";var f=0>b;b=Math.abs(b);var g=b+"",k="",h=[],l=!1;if(-1!==g.indexOf("e")){var m=g.match(/([\d\.]+)e(-?)(\d+)/);m&&"-"==m[2]&&m[3]>e+1?(g="0",b=0):(k=g,l=!0)}if(l)0<e&&-1<b&&1>b&&(k=b.toFixed(e));else{g=(g.split(jd)[1]||"").length;w(e)&&(e=Math.min(Math.max(a.minFrac,g),a.maxFrac));b=+(Math.round(+(b.toString()+"e"+e)).toString()+"e"+-e);0===b&&(f=!1);b=(""+b).split(jd);g=b[0];
b=b[1]||"";var m=0,q=a.lgSize,p=a.gSize;if(g.length>=q+p)for(m=g.length-q,l=0;l<m;l++)0===(m-l)%p&&0!==l&&(k+=c),k+=g.charAt(l);for(l=m;l<g.length;l++)0===(g.length-l)%q&&0!==l&&(k+=c),k+=g.charAt(l);for(;b.length<e;)b+="0";e&&"0"!==e&&(k+=d+b.substr(0,e))}h.push(f?a.negPre:a.posPre);h.push(k);h.push(f?a.negSuf:a.posSuf);return h.join("")}function Ab(b,a,c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function $(b,a,c,d){c=c||0;return function(e){e=
e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Ab(e,a,d)}}function Bb(b,a){return function(c,d){var e=c["get"+b](),f=pb(a?"SHORT"+b:b);return d[f][e]}}function kd(b){var a=(new Date(b,0,1)).getDay();return new Date(b,0,(4>=a?5:12)-a)}function ld(b){return function(a){var c=kd(a.getFullYear());a=+new Date(a.getFullYear(),a.getMonth(),a.getDate()+(4-a.getDay()))-+c;a=1+Math.round(a/6048E5);return Ab(a,b)}}function fd(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var f=0,g=0,k=b[8]?
a.setUTCFullYear:a.setFullYear,h=b[8]?a.setUTCHours:a.setHours;b[9]&&(f=ba(b[9]+b[10]),g=ba(b[9]+b[11]));k.call(a,ba(b[1]),ba(b[2])-1,ba(b[3]));f=ba(b[4]||0)-f;g=ba(b[5]||0)-g;k=ba(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));h.call(a,f,g,k,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,e,f){var g="",k=[],h,l;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;I(c)&&(c=wf.test(c)?ba(c):a(c));W(c)&&(c=new Date(c));
if(!ea(c))return c;for(;e;)(l=xf.exec(e))?(k=jb(k,l,1),e=k.pop()):(k.push(e),e=null);f&&"UTC"===f&&(c=new Date(c.getTime()),c.setMinutes(c.getMinutes()+c.getTimezoneOffset()));r(k,function(a){h=yf[a];g+=h?h(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function sf(){return function(b){return ra(b,!0)}}function tf(){return function(b,a){W(b)&&(b=b.toString());if(!B(b)&&!I(b))return b;a=Infinity===Math.abs(Number(a))?Number(a):ba(a);if(I(b))return a?0<=a?b.slice(0,a):
b.slice(a,b.length):"";var c=[],d,e;a>b.length?a=b.length:a<-b.length&&(a=-b.length);0<a?(d=0,e=a):(d=b.length+a,e=b.length);for(;d<e;d++)c.push(b[d]);return c}}function hd(b){return function(a,c,d){function e(a,b){return b?function(b,c){return a(c,b)}:a}function f(a,b){var c=typeof a,d=typeof b;return c==d?(ea(a)&&ea(b)&&(a=a.valueOf(),b=b.valueOf()),"string"==c&&(a=a.toLowerCase(),b=b.toLowerCase()),a===b?0:a<b?-1:1):c<d?-1:1}if(!Ra(a))return a;c=B(c)?c:[c];0===c.length&&(c=["+"]);c=c.map(function(a){var c=
!1,d=a||Ta;if(I(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);if(""===a)return e(function(a,b){return f(a,b)},c);d=b(a);if(d.constant){var g=d();return e(function(a,b){return f(a[g],b[g])},c)}}return e(function(a,b){return f(d(a),d(b))},c)});for(var g=[],k=0;k<a.length;k++)g.push(a[k]);return g.sort(e(function(a,b){for(var d=0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function Ha(b){F(b)&&(b={link:b});b.restrict=b.restrict||"AC";return da(b)}
function md(b,a,c,d,e){var f=this,g=[],k=f.$$parentForm=b.parent().controller("form")||Cb;f.$error={};f.$$success={};f.$pending=u;f.$name=e(a.name||a.ngForm||"")(c);f.$dirty=!1;f.$pristine=!0;f.$valid=!0;f.$invalid=!1;f.$submitted=!1;k.$addControl(f);f.$rollbackViewValue=function(){r(g,function(a){a.$rollbackViewValue()})};f.$commitViewValue=function(){r(g,function(a){a.$commitViewValue()})};f.$addControl=function(a){Ka(a.$name,"input");g.push(a);a.$name&&(f[a.$name]=a)};f.$$renameControl=function(a,
b){var c=a.$name;f[c]===a&&delete f[c];f[b]=a;a.$name=b};f.$removeControl=function(a){a.$name&&f[a.$name]===a&&delete f[a.$name];r(f.$pending,function(b,c){f.$setValidity(c,null,a)});r(f.$error,function(b,c){f.$setValidity(c,null,a)});Wa(g,a)};nd({ctrl:this,$element:b,set:function(a,b,c){var d=a[b];d?-1===d.indexOf(c)&&d.push(c):a[b]=[c]},unset:function(a,b,c){var d=a[b];d&&(Wa(d,c),0===d.length&&delete a[b])},parentForm:k,$animate:d});f.$setDirty=function(){d.removeClass(b,Qa);d.addClass(b,Db);f.$dirty=
!0;f.$pristine=!1;k.$setDirty()};f.$setPristine=function(){d.setClass(b,Qa,Db+" ng-submitted");f.$dirty=!1;f.$pristine=!0;f.$submitted=!1;r(g,function(a){a.$setPristine()})};f.$setUntouched=function(){r(g,function(a){a.$setUntouched()})};f.$setSubmitted=function(){d.addClass(b,"ng-submitted");f.$submitted=!0;k.$setSubmitted()}}function ec(b){b.$formatters.push(function(a){return b.$isEmpty(a)?a:a.toString()})}function eb(b,a,c,d,e,f){a.prop("validity");var g=a[0].placeholder,k={},h=N(a[0].type);if(!e.android){var l=
!1;a.on("compositionstart",function(a){l=!0});a.on("compositionend",function(){l=!1;m()})}var m=function(b){if(!l){var e=a.val(),f=b&&b.type;Pa&&"input"===(b||k).type&&a[0].placeholder!==g?g=a[0].placeholder:("password"===h||c.ngTrim&&"false"===c.ngTrim||(e=U(e)),(d.$viewValue!==e||""===e&&d.$$hasNativeValidators)&&d.$setViewValue(e,f))}};if(e.hasEvent("input"))a.on("input",m);else{var q,p=function(a){q||(q=f.defer(function(){m(a);q=null}))};a.on("keydown",function(a){var b=a.keyCode;91===b||15<b&&
19>b||37<=b&&40>=b||p(a)});if(e.hasEvent("paste"))a.on("paste cut",p)}a.on("change",m);d.$render=function(){a.val(d.$isEmpty(d.$modelValue)?"":d.$viewValue)}}function Eb(b,a){return function(c,d){var e,f;if(ea(c))return c;if(I(c)){'"'==c.charAt(0)&&'"'==c.charAt(c.length-1)&&(c=c.substring(1,c.length-1));if(zf.test(c))return new Date(c);b.lastIndex=0;if(e=b.exec(c))return e.shift(),f=d?{yyyy:d.getFullYear(),MM:d.getMonth()+1,dd:d.getDate(),HH:d.getHours(),mm:d.getMinutes(),ss:d.getSeconds(),sss:d.getMilliseconds()/
1E3}:{yyyy:1970,MM:1,dd:1,HH:0,mm:0,ss:0,sss:0},r(e,function(b,c){c<a.length&&(f[a[c]]=+b)}),new Date(f.yyyy,f.MM-1,f.dd,f.HH,f.mm,f.ss||0,1E3*f.sss||0)}return NaN}}function fb(b,a,c,d){return function(e,f,g,k,h,l,m){function q(a){return z(a)?ea(a)?a:c(a):u}od(e,f,g,k);eb(e,f,g,k,h,l);var p=k&&k.$options&&k.$options.timezone,n;k.$$parserName=b;k.$parsers.push(function(b){return k.$isEmpty(b)?null:a.test(b)?(b=c(b,n),"UTC"===p&&b.setMinutes(b.getMinutes()-b.getTimezoneOffset()),b):u});k.$formatters.push(function(a){if(k.$isEmpty(a))n=
null;else{if(!ea(a))throw Fb("datefmt",a);if((n=a)&&"UTC"===p){var b=6E4*n.getTimezoneOffset();n=new Date(n.getTime()+b)}return m("date")(a,d,p)}return""});if(z(g.min)||g.ngMin){var s;k.$validators.min=function(a){return k.$isEmpty(a)||w(s)||c(a)>=s};g.$observe("min",function(a){s=q(a);k.$validate()})}if(z(g.max)||g.ngMax){var r;k.$validators.max=function(a){return k.$isEmpty(a)||w(r)||c(a)<=r};g.$observe("max",function(a){r=q(a);k.$validate()})}k.$isEmpty=function(a){return!a||a.getTime&&a.getTime()!==
a.getTime()}}}function od(b,a,c,d){(d.$$hasNativeValidators=G(a[0].validity))&&d.$parsers.push(function(b){var c=a.prop("validity")||{};return c.badInput&&!c.typeMismatch?u:b})}function pd(b,a,c,d,e){if(z(d)){b=b(d);if(!b.constant)throw y("ngModel")("constexpr",c,d);return b(a)}return e}function nd(b){function a(a,b){b&&!f[a]?(l.addClass(e,a),f[a]=!0):!b&&f[a]&&(l.removeClass(e,a),f[a]=!1)}function c(b,c){b=b?"-"+Kb(b,"-"):"";a(gb+b,!0===c);a(qd+b,!1===c)}var d=b.ctrl,e=b.$element,f={},g=b.set,k=
b.unset,h=b.parentForm,l=b.$animate;f[qd]=!(f[gb]=e.hasClass(gb));d.$setValidity=function(b,e,f){e===u?(d.$pending||(d.$pending={}),g(d.$pending,b,f)):(d.$pending&&k(d.$pending,b,f),rd(d.$pending)&&(d.$pending=u));Va(e)?e?(k(d.$error,b,f),g(d.$$success,b,f)):(g(d.$error,b,f),k(d.$$success,b,f)):(k(d.$error,b,f),k(d.$$success,b,f));d.$pending?(a(sd,!0),d.$valid=d.$invalid=u,c("",null)):(a(sd,!1),d.$valid=rd(d.$error),d.$invalid=!d.$valid,c("",d.$valid));e=d.$pending&&d.$pending[b]?u:d.$error[b]?!1:
d.$$success[b]?!0:null;c(b,e);h.$setValidity(b,e,d)}}function rd(b){if(b)for(var a in b)return!1;return!0}function fc(b,a){b="ngClass"+b;return["$animate",function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e==b[m])continue a;c.push(e)}return c}function e(a){if(!B(a)){if(I(a))return a.split(" ");if(G(a)){var b=[];r(a,function(a,c){a&&(b=b.concat(c.split(" ")))});return b}}return a}return{restrict:"AC",link:function(f,g,k){function h(a,b){var c=g.data("$classCounts")||
{},d=[];r(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});g.data("$classCounts",c);return d.join(" ")}function l(b){if(!0===a||f.$index%2===a){var l=e(b||[]);if(!m){var n=h(l,1);k.$addClass(n)}else if(!la(b,m)){var s=e(m),n=d(l,s),l=d(s,l),n=h(n,1),l=h(l,-1);n&&n.length&&c.addClass(g,n);l&&l.length&&c.removeClass(g,l)}}m=qa(b)}var m;f.$watch(k[b],l,!0);k.$observe("class",function(a){l(f.$eval(k[b]))});"ngClass"!==b&&f.$watch("$index",function(c,d){var g=c&1;if(g!==(d&1)){var l=
e(f.$eval(k[b]));g===a?(g=h(l,1),k.$addClass(g)):(g=h(l,-1),k.$removeClass(g))}})}}}]}var Af=/^\/(.+)\/([a-z]*)$/,N=function(b){return I(b)?b.toLowerCase():b},Hb=Object.prototype.hasOwnProperty,pb=function(b){return I(b)?b.toUpperCase():b},Pa,D,ma,Ya=[].slice,mf=[].splice,Bf=[].push,Ia=Object.prototype.toString,Xa=y("ng"),ta=S.angular||(S.angular={}),$a,hb=0;Pa=X.documentMode;A.$inject=[];Ta.$inject=[];var B=Array.isArray,U=function(b){return I(b)?b.trim():b},Za=function(){if(z(Za.isActive_))return Za.isActive_;
var b=!(!X.querySelector("[ng-csp]")&&!X.querySelector("[data-ng-csp]"));if(!b)try{new Function("")}catch(a){b=!0}return Za.isActive_=b},mb=["ng-","data-ng-","ng:","x-ng-"],Hd=/[A-Z]/g,sc=!1,Lb,ka=1,kb=3,Ld={full:"1.3.0",major:1,minor:3,dot:0,codeName:"superluminal-nudge"};R.expando="ng339";var ub=R.cache={},bf=1;R._data=function(b){return this.cache[b[this.expando]]||{}};var Xe=/([\:\-\_]+(.))/g,Ye=/^moz([A-Z])/,Cf={mouseleave:"mouseout",mouseenter:"mouseover"},Ob=y("jqLite"),af=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,
Nb=/<|&#?\w+;/,Ze=/<([\w:]+)/,$e=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ha={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ha.optgroup=ha.option;ha.tbody=ha.tfoot=ha.colgroup=ha.caption=ha.thead;ha.th=ha.td;var Ja=R.prototype={ready:function(b){function a(){c||(c=
!0,b())}var c=!1;"complete"===X.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),R(S).on("load",a),this.on("DOMContentLoaded",a))},toString:function(){var b=[];r(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?D(this[b]):D(this[this.length+b])},length:0,push:Bf,sort:[].sort,splice:[].splice},wb={};r("multiple selected checked disabled readOnly required open".split(" "),function(b){wb[N(b)]=b});var Kc={};r("input select option textarea button form details".split(" "),
function(b){Kc[b]=!0});var Lc={ngMinlength:"minlength",ngMaxlength:"maxlength",ngMin:"min",ngMax:"max",ngPattern:"pattern"};r({data:Qb,removeData:sb},function(b,a){R[a]=b});r({data:Qb,inheritedData:vb,scope:function(b){return D.data(b,"$scope")||vb(b.parentNode||b,["$isolateScope","$scope"])},isolateScope:function(b){return D.data(b,"$isolateScope")||D.data(b,"$isolateScopeNoTemplate")},controller:Gc,injector:function(b){return vb(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:Rb,
css:function(b,a,c){a=ab(a);if(z(c))b.style[a]=c;else return b.style[a]},attr:function(b,a,c){var d=N(a);if(wb[d])if(z(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));else return b[a]||(b.attributes.getNamedItem(a)||A).specified?d:u;else if(z(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?u:b},prop:function(b,a,c){if(z(c))b[a]=c;else return b[a]},text:function(){function b(a,b){if(w(b)){var d=a.nodeType;return d===ka||d===kb?a.textContent:""}a.textContent=
b}b.$dv="";return b}(),val:function(b,a){if(w(a)){if(b.multiple&&"select"===pa(b)){var c=[];r(b.options,function(a){a.selected&&c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(w(a))return b.innerHTML;rb(b,!0);b.innerHTML=a},empty:Hc},function(b,a){R.prototype[a]=function(a,d){var e,f,g=this.length;if(b!==Hc&&(2==b.length&&b!==Rb&&b!==Gc?a:d)===u){if(G(a)){for(e=0;e<g;e++)if(b===Qb)b(this[e],a);else for(f in a)b(this[e],f,a[f]);return this}e=b.$dv;
g=e===u?Math.min(g,1):g;for(f=0;f<g;f++){var k=b(this[f],a,d);e=e?e+k:k}return e}for(e=0;e<g;e++)b(this[e],a,d);return this}});r({removeData:sb,on:function a(c,d,e,f){if(z(f))throw Ob("onargs");if(Cc(c)){var g=tb(c,!0);f=g.events;var k=g.handle;k||(k=g.handle=ef(c,f));for(var g=0<=d.indexOf(" ")?d.split(" "):[d],h=g.length;h--;){d=g[h];var l=f[d];l||(f[d]=[],"mouseenter"===d||"mouseleave"===d?a(c,Cf[d],function(a){var c=a.relatedTarget;c&&(c===this||this.contains(c))||k(a,d)}):"$destroy"!==d&&c.addEventListener(d,
k,!1),l=f[d]);l.push(e)}}},off:Fc,one:function(a,c,d){a=D(a);a.on(c,function f(){a.off(c,d);a.off(c,f)});a.on(c,d)},replaceWith:function(a,c){var d,e=a.parentNode;rb(a);r(new R(c),function(c){d?e.insertBefore(c,d.nextSibling):e.replaceChild(c,a);d=c})},children:function(a){var c=[];r(a.childNodes,function(a){a.nodeType===ka&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,c){var d=a.nodeType;if(d===ka||11===d){c=new R(c);for(var d=0,e=c.length;d<
e;d++)a.appendChild(c[d])}},prepend:function(a,c){if(a.nodeType===ka){var d=a.firstChild;r(new R(c),function(c){a.insertBefore(c,d)})}},wrap:function(a,c){c=D(c).eq(0).clone()[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:Ic,detach:function(a){Ic(a,!0)},after:function(a,c){var d=a,e=a.parentNode;c=new R(c);for(var f=0,g=c.length;f<g;f++){var k=c[f];e.insertBefore(k,d.nextSibling);d=k}},addClass:Tb,removeClass:Sb,toggleClass:function(a,c,d){c&&r(c.split(" "),function(c){var f=
d;w(f)&&(f=!Rb(a,c));(f?Tb:Sb)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){return a.nextElementSibling},find:function(a,c){return a.getElementsByTagName?a.getElementsByTagName(c):[]},clone:Pb,triggerHandler:function(a,c,d){var e,f,g=c.type||c,k=tb(a);if(k=(k=k&&k.events)&&k[g])e={preventDefault:function(){this.defaultPrevented=!0},isDefaultPrevented:function(){return!0===this.defaultPrevented},stopImmediatePropagation:function(){this.immediatePropagationStopped=
!0},isImmediatePropagationStopped:function(){return!0===this.immediatePropagationStopped},stopPropagation:A,type:g,target:a},c.type&&(e=E(e,c)),c=qa(k),f=d?[e].concat(d):[e],r(c,function(c){e.isImmediatePropagationStopped()||c.apply(a,f)})}},function(a,c){R.prototype[c]=function(c,e,f){for(var g,k=0,h=this.length;k<h;k++)w(g)?(g=a(this[k],c,e,f),z(g)&&(g=D(g))):Ec(g,a(this[k],c,e,f));return z(g)?g:this};R.prototype.bind=R.prototype.on;R.prototype.unbind=R.prototype.off});bb.prototype={put:function(a,
c){this[La(a,this.nextUid)]=c},get:function(a){return this[La(a,this.nextUid)]},remove:function(a){var c=this[a=La(a,this.nextUid)];delete this[a];return c}};var Nc=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,gf=/,/,hf=/^\s*(_?)(\S+?)\1\s*$/,Mc=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Ea=y("$injector");Jb.$$annotate=Ub;var Df=y("$animate"),xe=["$provide",function(a){this.$$selectors={};this.register=function(c,d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Df("notcsel",c);this.$$selectors[c.substr(1)]=e;
a.factory(e,d)};this.classNameFilter=function(a){1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?a:null);return this.$$classNameFilter};this.$get=["$$q","$$asyncCallback","$rootScope",function(a,d,e){function f(d){var f,g=a.defer();g.promise.$$cancelFn=function(){f&&f()};e.$$postDigest(function(){f=d(function(){g.resolve()})});return g.promise}function g(a,c){var d=[],e=[],f=wa();r((a.attr("class")||"").split(/\s+/),function(a){f[a]=!0});r(c,function(a,c){var g=f[c];!1===a&&g?e.push(c):
!0!==a||g||d.push(c)});return 0<d.length+e.length&&[d.length?d:null,e.length?e:null]}function k(a,c,d){for(var e=0,f=c.length;e<f;++e)a[c[e]]=d}function h(){m||(m=a.defer(),d(function(){m.resolve();m=null}));return m.promise}function l(a,c){if(ta.isObject(c)){var d=E(c.from||{},c.to||{});a.css(d)}}var m;return{animate:function(a,c,d){l(a,{from:c,to:d});return h()},enter:function(a,c,d,e){l(a,e);d?d.after(a):c.prepend(a);return h()},leave:function(a,c){a.remove();return h()},move:function(a,c,d,e){return this.enter(a,
c,d,e)},addClass:function(a,c,d){return this.setClass(a,c,[],d)},$$addClassImmediately:function(a,c,d){a=D(a);c=I(c)?c:B(c)?c.join(" "):"";r(a,function(a){Tb(a,c)});l(a,d);return h()},removeClass:function(a,c,d){return this.setClass(a,[],c,d)},$$removeClassImmediately:function(a,c,d){a=D(a);c=I(c)?c:B(c)?c.join(" "):"";r(a,function(a){Sb(a,c)});l(a,d);return h()},setClass:function(a,c,d,e){var h=this,l=!1;a=D(a);var m=a.data("$$animateClasses");m?e&&m.options&&(m.options=ta.extend(m.options||{},e)):
(m={classes:{},options:e},l=!0);e=m.classes;c=B(c)?c:c.split(" ");d=B(d)?d:d.split(" ");k(e,c,!0);k(e,d,!1);l&&(m.promise=f(function(c){var d=a.data("$$animateClasses");a.removeData("$$animateClasses");if(d){var e=g(a,d.classes);e&&h.$$setClassImmediately(a,e[0],e[1],d.options)}c()}),a.data("$$animateClasses",m));return m.promise},$$setClassImmediately:function(a,c,d,e){c&&this.$$addClassImmediately(a,c);d&&this.$$removeClassImmediately(a,d);l(a,e);return h()},enabled:A,cancel:A}}]}],ia=y("$compile");
uc.$inject=["$provide","$$sanitizeUriProvider"];var lf=/^(x[\:\-_]|data[\:\-_])/i,Yb=y("$interpolate"),Ef=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,pf={http:80,https:443,ftp:21},cb=y("$location"),Ff={$$html5:!1,$$replace:!1,absUrl:zb("$$absUrl"),url:function(a){if(w(a))return this.$$url;a=Ef.exec(a);a[1]&&this.path(decodeURIComponent(a[1]));(a[2]||a[1])&&this.search(a[3]||"");this.hash(a[5]||"");return this},protocol:zb("$$protocol"),host:zb("$$host"),port:zb("$$port"),path:Yc("$$path",function(a){a=null!==
a?a.toString():"";return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;case 1:if(I(a)||W(a))a=a.toString(),this.$$search=qc(a);else if(G(a))a=Ca(a,{}),r(a,function(c,e){null==c&&delete a[e]}),this.$$search=a;else throw cb("isrcharg");break;default:w(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:Yc("$$hash",function(a){return null!==a?a.toString():""}),replace:function(){this.$$replace=!0;return this}};
r([Xc,bc,ac],function(a){a.prototype=Object.create(Ff);a.prototype.state=function(c){if(!arguments.length)return this.$$state;if(a!==ac||!this.$$html5)throw cb("nostate");this.$$state=w(c)?null:c;return this}});var oa=y("$parse"),Gf=Function.prototype.call,Hf=Function.prototype.apply,If=Function.prototype.bind,Gb=wa();r({"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:function(){}},function(a,c){a.constant=a.literal=a.sharedGetter=!0;Gb[c]=a});Gb["this"]=
function(a){return a};Gb["this"].sharedGetter=!0;var gc=E(wa(),{"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return z(d)?z(e)?d+e:d:z(e)?e:u},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(z(d)?d:0)-(z(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,c)},"!=":function(a,c,d,e){return d(a,
c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},"!":function(a,c,d){return!d(a,c)},"=":!0,"|":!0}),Jf={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},dc=function(a){this.options=a};dc.prototype={constructor:dc,lex:function(a){this.text=a;this.index=0;this.ch=u;
for(this.tokens=[];this.index<this.text.length;)if(this.ch=this.text.charAt(this.index),this.is("\"'"))this.readString(this.ch);else if(this.isNumber(this.ch)||this.is(".")&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(this.ch))this.readIdent();else if(this.is("(){}[].,;:?"))this.tokens.push({index:this.index,text:this.ch}),this.index++;else if(this.isWhitespace(this.ch))this.index++;else{a=this.ch+this.peek();var c=a+this.peek(2),d=gc[this.ch],e=gc[a],f=gc[c];f?(this.tokens.push({index:this.index,
text:c,fn:f}),this.index+=3):e?(this.tokens.push({index:this.index,text:a,fn:e}),this.index+=2):d?(this.tokens.push({index:this.index,text:this.ch,fn:d}),this.index+=1):this.throwError("Unexpected next character ",this.index,this.index+1)}return this.tokens},is:function(a){return-1!==a.indexOf(this.ch)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===
a||"\n"===a||"\v"===a||"\u00a0"===a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=z(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw oa("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=N(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==
d&&this.isExpOperator(e))a+=d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}a*=1;this.tokens.push({index:c,text:a,constant:!0,fn:function(){return a}})},readIdent:function(){for(var a=this.text,c="",d=this.index,e,f,g,k;this.index<this.text.length;){k=this.text.charAt(this.index);if("."===k||this.isIdent(k)||this.isNumber(k))"."===
k&&(e=this.index),c+=k;else break;this.index++}e&&"."===c[c.length-1]&&(this.index--,c=c.slice(0,-1),e=c.lastIndexOf("."),-1===e&&(e=u));if(e)for(f=this.index;f<this.text.length;){k=this.text.charAt(f);if("("===k){g=c.substr(e-d+1);c=c.substr(0,e-d);this.index=f;break}if(this.isWhitespace(k))f++;else break}this.tokens.push({index:d,text:c,fn:Gb[c]||$c(c,this.options,a)});g&&(this.tokens.push({index:e,text:"."}),this.tokens.push({index:e+1,text:g}))},readString:function(a){var c=this.index;this.index++;
for(var d="",e=a,f=!1;this.index<this.text.length;){var g=this.text.charAt(this.index),e=e+g;if(f)"u"===g?(f=this.text.substring(this.index+1,this.index+5),f.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):d+=Jf[g]||g,f=!1;else if("\\"===g)f=!0;else{if(g===a){this.index++;this.tokens.push({index:c,text:e,string:d,constant:!0,fn:function(){return d}});return}d+=g}this.index++}this.throwError("Unterminated quote",c)}};
var db=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};db.ZERO=E(function(){return 0},{sharedGetter:!0,constant:!0});db.prototype={constructor:db,parse:function(a){this.text=a;this.tokens=this.lexer.lex(a);a=this.statements();0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]);a.literal=!!a.literal;a.constant=!!a.constant;return a},primary:function(){var a;if(this.expect("("))a=this.filterChain(),this.consume(")");else if(this.expect("["))a=this.arrayDeclaration();
else if(this.expect("{"))a=this.object();else{var c=this.expect();(a=c.fn)||this.throwError("not a primary expression",c);c.constant&&(a.constant=!0,a.literal=!0)}for(var d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):"["===c.text?(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw oa("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},peekToken:function(){if(0===
this.tokens.length)throw oa("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){if(0<this.tokens.length){var f=this.tokens[0],g=f.text;if(g===a||g===c||g===d||g===e||!(a||c||d||e))return f}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,e))?(this.tokens.shift(),a):!1},consume:function(a){this.expect(a)||this.throwError("is unexpected, expecting ["+a+"]",this.peek())},unaryFn:function(a,c){return E(function(d,e){return a(d,e,c)},{constant:c.constant,inputs:[c]})},binaryFn:function(a,
c,d,e){return E(function(e,g){return c(e,g,a,d)},{constant:a.constant&&d.constant,inputs:!e&&[a,d]})},statements:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,d){for(var e,f=0,g=a.length;f<g;f++)e=a[f](c,d);return e}},filterChain:function(){for(var a=this.expression();this.expect("|");)a=this.filter(a);return a},filter:function(a){var c=this.expect(),d=this.$filter(c.text),e,f;if(this.peek(":"))for(e=
[],f=[];this.expect(":");)e.push(this.expression());c=[a].concat(e||[]);return E(function(c,k){var h=a(c,k);if(f){f[0]=h;for(h=e.length;h--;)f[h+1]=e[h](c,k);return d.apply(u,f)}return d(h)},{constant:!d.$stateful&&c.every(cc),inputs:!d.$stateful&&c})},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary(),c,d;return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),
E(function(d,f){return a.assign(d,c(d,f),f)},{inputs:[a,c]})):a},ternary:function(){var a=this.logicalOR(),c,d;if(d=this.expect("?")){c=this.assignment();if(d=this.expect(":")){var e=this.assignment();return E(function(d,g){return a(d,g)?c(d,g):e(d,g)},{constant:a.constant&&c.constant&&e.constant})}this.throwError("expected :",d)}return a},logicalOR:function(){for(var a=this.logicalAND(),c;c=this.expect("||");)a=this.binaryFn(a,c.fn,this.logicalAND(),!0);return a},logicalAND:function(){var a=this.equality(),
c;if(c=this.expect("&&"))a=this.binaryFn(a,c.fn,this.logicalAND(),!0);return a},equality:function(){var a=this.relational(),c;if(c=this.expect("==","!=","===","!=="))a=this.binaryFn(a,c.fn,this.equality());return a},relational:function(){var a=this.additive(),c;if(c=this.expect("<",">","<=",">="))a=this.binaryFn(a,c.fn,this.relational());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+","-");)a=this.binaryFn(a,c.fn,this.multiplicative());return a},multiplicative:function(){for(var a=
this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.fn,this.unary());return a},unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn(db.ZERO,a.fn,this.unary()):(a=this.expect("!"))?this.unaryFn(a.fn,this.unary()):this.primary()},fieldAccess:function(a){var c=this.text,d=this.expect().text,e=$c(d,this.options,c);return E(function(c,d,k){return e(k||a(c,d))},{assign:function(e,g,k){(k=a(e,k))||a.assign(e,k={});return Oa(k,d,g,c)}})},objectIndex:function(a){var c=
this.text,d=this.expression();this.consume("]");return E(function(e,f){var g=a(e,f),k=d(e,f);na(k,c);return g?Aa(g[k],c):u},{assign:function(e,f,g){var k=na(d(e,g),c);(g=Aa(a(e,g),c))||a.assign(e,g={});return g[k]=f}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());while(this.expect(","))}this.consume(")");var e=this.text,f=d.length?[]:null;return function(g,k){var h=c?c(g,k):g,l=a(g,k,h)||A;if(f)for(var m=d.length;m--;)f[m]=Aa(d[m](g,k),e);Aa(h,
e);if(l){if(l.constructor===l)throw oa("isecfn",e);if(l===Gf||l===Hf||l===If)throw oa("isecff",e);}h=l.apply?l.apply(h,f):l(f[0],f[1],f[2],f[3],f[4]);return Aa(h,e)}},arrayDeclaration:function(){var a=[];if("]"!==this.peekToken().text){do{if(this.peek("]"))break;var c=this.expression();a.push(c)}while(this.expect(","))}this.consume("]");return E(function(c,e){for(var f=[],g=0,k=a.length;g<k;g++)f.push(a[g](c,e));return f},{literal:!0,constant:a.every(cc),inputs:a})},object:function(){var a=[],c=[];
if("}"!==this.peekToken().text){do{if(this.peek("}"))break;var d=this.expect();a.push(d.string||d.text);this.consume(":");d=this.expression();c.push(d)}while(this.expect(","))}this.consume("}");return E(function(d,f){for(var g={},k=0,h=c.length;k<h;k++)g[a[k]]=c[k](d,f);return g},{literal:!0,constant:c.every(cc),inputs:c})}};var ad=wa(),Ba=y("$sce"),ja={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},ia=y("$compile"),Z=X.createElement("a"),dd=za(S.location.href,!0);Bc.$inject=
["$provide"];ed.$inject=["$locale"];gd.$inject=["$locale"];var jd=".",yf={yyyy:$("FullYear",4),yy:$("FullYear",2,0,!0),y:$("FullYear",1),MMMM:Bb("Month"),MMM:Bb("Month",!0),MM:$("Month",2,1),M:$("Month",1,1),dd:$("Date",2),d:$("Date",1),HH:$("Hours",2),H:$("Hours",1),hh:$("Hours",2,-12),h:$("Hours",1,-12),mm:$("Minutes",2),m:$("Minutes",1),ss:$("Seconds",2),s:$("Seconds",1),sss:$("Milliseconds",3),EEEE:Bb("Day"),EEE:Bb("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=
-1*a.getTimezoneOffset();return a=(0<=a?"+":"")+(Ab(Math[0<a?"floor":"ceil"](a/60),2)+Ab(Math.abs(a%60),2))},ww:ld(2),w:ld(1)},xf=/((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/,wf=/^\-?\d+$/;fd.$inject=["$locale"];var uf=da(N),vf=da(pb);hd.$inject=["$parse"];var Od=da({restrict:"E",compile:function(a,c){if(!c.href&&!c.xlinkHref&&!c.name)return function(a,c){var f="[object SVGAnimatedString]"===Ia.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(f)||
a.preventDefault()})}}}),qb={};r(wb,function(a,c){if("multiple"!=a){var d=ua("ng-"+c);qb[d]=function(){return{restrict:"A",priority:100,link:function(a,f,g){a.$watch(g[d],function(a){g.$set(c,!!a)})}}}}});r(Lc,function(a,c){qb[c]=function(){return{priority:100,link:function(a,e,f){if("ngPattern"===c&&"/"==f.ngPattern.charAt(0)&&(e=f.ngPattern.match(Af))){f.$set("ngPattern",new RegExp(e[1],e[2]));return}a.$watch(f[c],function(a){f.$set(c,a)})}}}});r(["src","srcset","href"],function(a){var c=ua("ng-"+
a);qb[c]=function(){return{priority:99,link:function(d,e,f){var g=a,k=a;"href"===a&&"[object SVGAnimatedString]"===Ia.call(e.prop("href"))&&(k="xlinkHref",f.$attr[k]="xlink:href",g=null);f.$observe(c,function(c){c?(f.$set(k,c),Pa&&g&&e.prop(g,f[k])):"href"===a&&f.$set(k,null)})}}}});var Cb={$addControl:A,$$renameControl:function(a,c){a.$name=c},$removeControl:A,$setValidity:A,$setDirty:A,$setPristine:A,$setSubmitted:A};md.$inject=["$element","$attrs","$scope","$animate","$interpolate"];var td=function(a){return["$timeout",
function(c){return{name:"form",restrict:a?"EAC":"E",controller:md,compile:function(a){a.addClass(Qa).addClass(gb);return{pre:function(a,d,g,k){if(!("action"in g)){var h=function(c){a.$apply(function(){k.$commitViewValue();k.$setSubmitted()});c.preventDefault?c.preventDefault():c.returnValue=!1};d[0].addEventListener("submit",h,!1);d.on("$destroy",function(){c(function(){d[0].removeEventListener("submit",h,!1)},0,!1)})}var l=k.$$parentForm,m=k.$name;m&&(Oa(a,m,k,m),g.$observe(g.name?"name":"ngForm",
function(c){m!==c&&(Oa(a,m,u,m),m=c,Oa(a,m,k,m),l.$$renameControl(k,m))}));d.on("$destroy",function(){l.$removeControl(k);m&&Oa(a,m,u,m);E(k,Cb)})}}}}}]},Pd=td(),be=td(!0),zf=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,Kf=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,Lf=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,Mf=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,ud=/^(\d{4})-(\d{2})-(\d{2})$/,
vd=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,hc=/^(\d{4})-W(\d\d)$/,wd=/^(\d{4})-(\d\d)$/,xd=/^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,Nf=/(\s+|^)default(\s+|$)/,Fb=new y("ngModel"),yd={text:function(a,c,d,e,f,g){eb(a,c,d,e,f,g);ec(e)},date:fb("date",ud,Eb(ud,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":fb("datetimelocal",vd,Eb(vd,"yyyy MM dd HH mm ss sss".split(" ")),"yyyy-MM-ddTHH:mm:ss.sss"),time:fb("time",xd,Eb(xd,["HH","mm","ss","sss"]),"HH:mm:ss.sss"),week:fb("week",
hc,function(a,c){if(ea(a))return a;if(I(a)){hc.lastIndex=0;var d=hc.exec(a);if(d){var e=+d[1],f=+d[2],g=d=0,k=0,h=0,l=kd(e),f=7*(f-1);c&&(d=c.getHours(),g=c.getMinutes(),k=c.getSeconds(),h=c.getMilliseconds());return new Date(e,0,l.getDate()+f,d,g,k,h)}}return NaN},"yyyy-Www"),month:fb("month",wd,Eb(wd,["yyyy","MM"]),"yyyy-MM"),number:function(a,c,d,e,f,g){od(a,c,d,e);eb(a,c,d,e,f,g);e.$$parserName="number";e.$parsers.push(function(a){return e.$isEmpty(a)?null:Mf.test(a)?parseFloat(a):u});e.$formatters.push(function(a){if(!e.$isEmpty(a)){if(!W(a))throw Fb("numfmt",
a);a=a.toString()}return a});if(d.min||d.ngMin){var k;e.$validators.min=function(a){return e.$isEmpty(a)||w(k)||a>=k};d.$observe("min",function(a){z(a)&&!W(a)&&(a=parseFloat(a,10));k=W(a)&&!isNaN(a)?a:u;e.$validate()})}if(d.max||d.ngMax){var h;e.$validators.max=function(a){return e.$isEmpty(a)||w(h)||a<=h};d.$observe("max",function(a){z(a)&&!W(a)&&(a=parseFloat(a,10));h=W(a)&&!isNaN(a)?a:u;e.$validate()})}},url:function(a,c,d,e,f,g){eb(a,c,d,e,f,g);ec(e);e.$$parserName="url";e.$validators.url=function(a){return e.$isEmpty(a)||
Kf.test(a)}},email:function(a,c,d,e,f,g){eb(a,c,d,e,f,g);ec(e);e.$$parserName="email";e.$validators.email=function(a){return e.$isEmpty(a)||Lf.test(a)}},radio:function(a,c,d,e){w(d.name)&&c.attr("name",++hb);c.on("click",function(a){c[0].checked&&e.$setViewValue(d.value,a&&a.type)});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e,f,g,k,h){var l=pd(h,a,"ngTrueValue",d.ngTrueValue,!0),m=pd(h,a,"ngFalseValue",d.ngFalseValue,!1);c.on("click",
function(a){e.$setViewValue(c[0].checked,a&&a.type)});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return a!==l};e.$formatters.push(function(a){return la(a,l)});e.$parsers.push(function(a){return a?l:m})},hidden:A,button:A,submit:A,reset:A,file:A},vc=["$browser","$sniffer","$filter","$parse",function(a,c,d,e){return{restrict:"E",require:["?ngModel"],link:{pre:function(f,g,k,h){h[0]&&(yd[N(k.type)]||yd.text)(f,g,k,h[0],c,a,d,e)}}}}],gb="ng-valid",qd="ng-invalid",Qa="ng-pristine",
Db="ng-dirty",sd="ng-pending",Of=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate","$timeout","$rootScope","$q","$interpolate",function(a,c,d,e,f,g,k,h,l,m){this.$modelValue=this.$viewValue=Number.NaN;this.$validators={};this.$asyncValidators={};this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$untouched=!0;this.$touched=!1;this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$error={};this.$$success={};this.$pending=u;this.$name=m(d.name||
"",!1)(a);var q=f(d.ngModel),p=null,n=this,s=function(){var c=q(a);n.$options&&n.$options.getterSetter&&F(c)&&(c=c());return c},J=function(c){var d;n.$options&&n.$options.getterSetter&&F(d=q(a))?d(n.$modelValue):q.assign(a,n.$modelValue)};this.$$setOptions=function(a){n.$options=a;if(!(q.assign||a&&a.getterSetter))throw Fb("nonassign",d.ngModel,sa(e));};this.$render=A;this.$isEmpty=function(a){return w(a)||""===a||null===a||a!==a};var v=e.inheritedData("$formController")||Cb,x=0;nd({ctrl:this,$element:e,
set:function(a,c){a[c]=!0},unset:function(a,c){delete a[c]},parentForm:v,$animate:g});this.$setPristine=function(){n.$dirty=!1;n.$pristine=!0;g.removeClass(e,Db);g.addClass(e,Qa)};this.$setUntouched=function(){n.$touched=!1;n.$untouched=!0;g.setClass(e,"ng-untouched","ng-touched")};this.$setTouched=function(){n.$touched=!0;n.$untouched=!1;g.setClass(e,"ng-touched","ng-untouched")};this.$rollbackViewValue=function(){k.cancel(p);n.$viewValue=n.$$lastCommittedViewValue;n.$render()};this.$validate=function(){W(n.$modelValue)&&
isNaN(n.$modelValue)||this.$$parseAndValidate()};this.$$runValidators=function(a,c,d,e){function f(){var a=!0;r(n.$validators,function(e,f){var g=e(c,d);a=a&&g;h(f,g)});return a?!0:(r(n.$asyncValidators,function(a,c){h(c,null)}),!1)}function g(){var a=[],e=!0;r(n.$asyncValidators,function(f,g){var k=f(c,d);if(!k||!F(k.then))throw Fb("$asyncValidators",k);h(g,u);a.push(k.then(function(){h(g,!0)},function(a){e=!1;h(g,!1)}))});a.length?l.all(a).then(function(){k(e)},A):k(!0)}function h(a,c){m===x&&n.$setValidity(a,
c)}function k(a){m===x&&e(a)}x++;var m=x;(function(a){var c=n.$$parserName||"parse";if(a===u)h(c,null);else if(h(c,a),!a)return r(n.$validators,function(a,c){h(c,null)}),r(n.$asyncValidators,function(a,c){h(c,null)}),!1;return!0})(a)?f()?g():k(!1):k(!1)};this.$commitViewValue=function(){var a=n.$viewValue;k.cancel(p);if(n.$$lastCommittedViewValue!==a||""===a&&n.$$hasNativeValidators)n.$$lastCommittedViewValue=a,n.$pristine&&(n.$dirty=!0,n.$pristine=!1,g.removeClass(e,Qa),g.addClass(e,Db),v.$setDirty()),
this.$$parseAndValidate()};this.$$parseAndValidate=function(){var a=n.$$lastCommittedViewValue,c=a,d=w(c)?u:!0;if(d)for(var e=0;e<n.$parsers.length;e++)if(c=n.$parsers[e](c),w(c)){d=!1;break}W(n.$modelValue)&&isNaN(n.$modelValue)&&(n.$modelValue=s());var f=n.$modelValue,g=n.$options&&n.$options.allowInvalid;g&&(n.$modelValue=c,n.$modelValue!==f&&n.$$writeModelToScope());n.$$runValidators(d,c,a,function(a){g||(n.$modelValue=a?c:u,n.$modelValue!==f&&n.$$writeModelToScope())})};this.$$writeModelToScope=
function(){J(n.$modelValue);r(n.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}})};this.$setViewValue=function(a,c){n.$viewValue=a;n.$options&&!n.$options.updateOnDefault||n.$$debounceViewValueCommit(c)};this.$$debounceViewValueCommit=function(c){var d=0,e=n.$options;e&&z(e.debounce)&&(e=e.debounce,W(e)?d=e:W(e[c])?d=e[c]:W(e["default"])&&(d=e["default"]));k.cancel(p);d?p=k(function(){n.$commitViewValue()},d):h.$$phase?n.$commitViewValue():a.$apply(function(){n.$commitViewValue()})};a.$watch(function(){var a=
s();if(a!==n.$modelValue){n.$modelValue=a;for(var c=n.$formatters,d=c.length,e=a;d--;)e=c[d](e);n.$viewValue!==e&&(n.$viewValue=n.$$lastCommittedViewValue=e,n.$render(),n.$$runValidators(u,a,e,A))}return a})}],qe=function(){return{restrict:"A",require:["ngModel","^?form","^?ngModelOptions"],controller:Of,priority:1,compile:function(a){a.addClass(Qa).addClass("ng-untouched").addClass(gb);return{pre:function(a,d,e,f){var g=f[0],k=f[1]||Cb;g.$$setOptions(f[2]&&f[2].$options);k.$addControl(g);e.$observe("name",
function(a){g.$name!==a&&k.$$renameControl(g,a)});a.$on("$destroy",function(){k.$removeControl(g)})},post:function(a,d,e,f){var g=f[0];if(g.$options&&g.$options.updateOn)d.on(g.$options.updateOn,function(a){g.$$debounceViewValueCommit(a&&a.type)});d.on("blur",function(d){g.$touched||a.$apply(function(){g.$setTouched()})})}}}}},se=da({restrict:"A",require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),xc=function(){return{restrict:"A",require:"?ngModel",
link:function(a,c,d,e){e&&(d.required=!0,e.$validators.required=function(a){return!d.required||!e.$isEmpty(a)},d.$observe("required",function(){e.$validate()}))}}},wc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f,g=d.ngPattern||d.pattern;d.$observe("pattern",function(a){I(a)&&0<a.length&&(a=new RegExp(a));if(a&&!a.test)throw y("ngPattern")("noregexp",g,a,sa(c));f=a||u;e.$validate()});e.$validators.pattern=function(a){return e.$isEmpty(a)||w(f)||f.test(a)}}}}},
zc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=0;d.$observe("maxlength",function(a){f=ba(a)||0;e.$validate()});e.$validators.maxlength=function(a,c){return e.$isEmpty(a)||c.length<=f}}}}},yc=function(){return{restrict:"A",require:"?ngModel",link:function(a,c,d,e){if(e){var f=0;d.$observe("minlength",function(a){f=ba(a)||0;e.$validate()});e.$validators.minlength=function(a,c){return e.$isEmpty(a)||c.length>=f}}}}},re=function(){return{restrict:"A",priority:100,
require:"ngModel",link:function(a,c,d,e){var f=c.attr(d.$attr.ngList)||", ",g="false"!==d.ngTrim,k=g?U(f):f;e.$parsers.push(function(a){if(!w(a)){var c=[];a&&r(a.split(k),function(a){a&&c.push(g?U(a):a)});return c}});e.$formatters.push(function(a){return B(a)?a.join(f):u});e.$isEmpty=function(a){return!a||!a.length}}}},Pf=/^(true|false|\d+)$/,te=function(){return{restrict:"A",priority:100,compile:function(a,c){return Pf.test(c.ngValue)?function(a,c,f){f.$set("value",a.$eval(f.ngValue))}:function(a,
c,f){a.$watch(f.ngValue,function(a){f.$set("value",a)})}}}},ue=function(){return{restrict:"A",controller:["$scope","$attrs",function(a,c){var d=this;this.$options=a.$eval(c.ngModelOptions);this.$options.updateOn!==u?(this.$options.updateOnDefault=!1,this.$options.updateOn=U(this.$options.updateOn.replace(Nf,function(){d.$options.updateOnDefault=!0;return" "}))):this.$options.updateOnDefault=!0}]}},Ud=["$compile",function(a){return{restrict:"AC",compile:function(c){a.$$addBindingClass(c);return function(c,
e,f){a.$$addBindingInfo(e,f.ngBind);e=e[0];c.$watch(f.ngBind,function(a){e.textContent=a===u?"":a})}}}}],Wd=["$interpolate","$compile",function(a,c){return{compile:function(d){c.$$addBindingClass(d);return function(d,f,g){d=a(f.attr(g.$attr.ngBindTemplate));c.$$addBindingInfo(f,d.expressions);f=f[0];g.$observe("ngBindTemplate",function(a){f.textContent=a===u?"":a})}}}}],Vd=["$sce","$parse","$compile",function(a,c,d){return{restrict:"A",compile:function(e,f){var g=c(f.ngBindHtml),k=c(f.ngBindHtml,
function(a){return(a||"").toString()});d.$$addBindingClass(e);return function(c,e,f){d.$$addBindingInfo(e,f.ngBindHtml);c.$watch(k,function(){e.html(a.getTrustedHtml(g(c))||"")})}}}}],Xd=fc("",!0),Zd=fc("Odd",0),Yd=fc("Even",1),$d=Ha({compile:function(a,c){c.$set("ngCloak",u);a.removeClass("ng-cloak")}}),ae=[function(){return{restrict:"A",scope:!0,controller:"@",priority:500}}],Ac={},Qf={blur:!0,focus:!0};r("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),
function(a){var c=ua("ng-"+a);Ac[c]=["$parse","$rootScope",function(d,e){return{restrict:"A",compile:function(f,g){var k=d(g[c]);return function(c,d){d.on(a,function(d){var f=function(){k(c,{$event:d})};Qf[a]&&e.$$phase?c.$evalAsync(f):c.$apply(f)})}}}}]});var de=["$animate",function(a){return{multiElement:!0,transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,f,g){var k,h,l;c.$watch(e.ngIf,function(c){c?h||g(function(c,f){h=f;c[c.length++]=X.createComment(" end ngIf: "+
e.ngIf+" ");k={clone:c};a.enter(c,d.parent(),d)}):(l&&(l.remove(),l=null),h&&(h.$destroy(),h=null),k&&(l=ob(k.clone),a.leave(l).then(function(){l=null}),k=null))})}}}],ee=["$templateRequest","$anchorScroll","$animate","$sce",function(a,c,d,e){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:ta.noop,compile:function(f,g){var k=g.ngInclude||g.src,h=g.onload||"",l=g.autoscroll;return function(f,g,p,n,r){var u=0,v,x,t,y=function(){x&&(x.remove(),x=null);v&&(v.$destroy(),
v=null);t&&(d.leave(t).then(function(){x=null}),x=t,t=null)};f.$watch(e.parseAsResourceUrl(k),function(e){var k=function(){!z(l)||l&&!f.$eval(l)||c()},p=++u;e?(a(e,!0).then(function(a){if(p===u){var c=f.$new();n.template=a;a=r(c,function(a){y();d.enter(a,null,g).then(k)});v=c;t=a;v.$emit("$includeContentLoaded",e);f.$eval(h)}},function(){p===u&&(y(),f.$emit("$includeContentError",e))}),f.$emit("$includeContentRequested",e)):(y(),n.template=null)})}}}}],ve=["$compile",function(a){return{restrict:"ECA",
priority:-400,require:"ngInclude",link:function(c,d,e,f){/SVG/.test(d[0].toString())?(d.empty(),a(Dc(f.template,X).childNodes)(c,function(a){d.append(a)},u,u,d)):(d.html(f.template),a(d.contents())(c))}}}],fe=Ha({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),ge=Ha({terminal:!0,priority:1E3}),he=["$locale","$interpolate",function(a,c){var d=/{}/g;return{restrict:"EA",link:function(e,f,g){var k=g.count,h=g.$attr.when&&f.attr(g.$attr.when),l=g.offset||0,m=e.$eval(h)||
{},q={},p=c.startSymbol(),n=c.endSymbol(),s=/^when(Minus)?(.+)$/;r(g,function(a,c){s.test(c)&&(m[N(c.replace("when","").replace("Minus","-"))]=f.attr(g.$attr[c]))});r(m,function(a,e){q[e]=c(a.replace(d,p+k+"-"+l+n))});e.$watch(function(){var c=parseFloat(e.$eval(k));if(isNaN(c))return"";c in m||(c=a.pluralCat(c-l));return q[c](e)},function(a){f.text(a)})}}}],ie=["$parse","$animate",function(a,c){var d=y("ngRepeat"),e=function(a,c,d,e,l,m,q){a[d]=e;l&&(a[l]=m);a.$index=c;a.$first=0===c;a.$last=c===
q-1;a.$middle=!(a.$first||a.$last);a.$odd=!(a.$even=0===(c&1))};return{restrict:"A",multiElement:!0,transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,compile:function(f,g){var k=g.ngRepeat,h=X.createComment(" end ngRepeat: "+k+" "),l=k.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!l)throw d("iexp",k);var m=l[1],q=l[2],p=l[3],n=l[4],l=m.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);if(!l)throw d("iidexp",m);var s=l[3]||l[1],J=
l[2];if(p&&(!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(p)||/^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent)$/.test(p)))throw d("badident",p);var v,x,t,y,z={$id:La};n?v=a(n):(t=function(a,c){return La(c)},y=function(a){return a});return function(a,f,g,l,n){v&&(x=function(c,d,e){J&&(z[J]=c);z[s]=d;z.$index=e;return v(a,z)});var m=wa();a.$watchCollection(q,function(g){var l,q,z=f[0],H,v=wa(),C,Q,A,E,w,B,F;p&&(a[p]=g);if(Ra(g))w=g,q=x||t;else{q=x||y;w=[];for(F in g)g.hasOwnProperty(F)&&
"$"!=F.charAt(0)&&w.push(F);w.sort()}C=w.length;F=Array(C);for(l=0;l<C;l++)if(Q=g===w?l:w[l],A=g[Q],E=q(Q,A,l),m[E])B=m[E],delete m[E],v[E]=B,F[l]=B;else{if(v[E])throw r(F,function(a){a&&a.scope&&(m[a.id]=a)}),d("dupes",k,E,ra(A));F[l]={id:E,scope:u,clone:u};v[E]=!0}for(H in m){B=m[H];E=ob(B.clone);c.leave(E);if(E[0].parentNode)for(l=0,q=E.length;l<q;l++)E[l].$$NG_REMOVED=!0;B.scope.$destroy()}for(l=0;l<C;l++)if(Q=g===w?l:w[l],A=g[Q],B=F[l],B.scope){H=z;do H=H.nextSibling;while(H&&H.$$NG_REMOVED);
B.clone[0]!=H&&c.move(ob(B.clone),null,D(z));z=B.clone[B.clone.length-1];e(B.scope,l,s,A,J,Q,C)}else n(function(a,d){B.scope=d;var f=h.cloneNode(!1);a[a.length++]=f;c.enter(a,null,D(z));z=f;B.clone=a;v[B.id]=B;e(B.scope,l,s,A,J,Q,C)});m=v})}}}}],je=["$animate",function(a){return{restrict:"A",multiElement:!0,link:function(c,d,e){c.$watch(e.ngShow,function(c){a[c?"removeClass":"addClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],ce=["$animate",function(a){return{restrict:"A",multiElement:!0,
link:function(c,d,e){c.$watch(e.ngHide,function(c){a[c?"addClass":"removeClass"](d,"ng-hide",{tempClasses:"ng-hide-animate"})})}}}],ke=Ha(function(a,c,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&r(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),le=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(c,d,e,f){var g=[],k=[],h=[],l=[],m=function(a,c){return function(){a.splice(c,1)}};c.$watch(e.ngSwitch||e.on,function(c){var d,
e;d=0;for(e=h.length;d<e;++d)a.cancel(h[d]);d=h.length=0;for(e=l.length;d<e;++d){var s=ob(k[d].clone);l[d].$destroy();(h[d]=a.leave(s)).then(m(h,d))}k.length=0;l.length=0;(g=f.cases["!"+c]||f.cases["?"])&&r(g,function(c){c.transclude(function(d,e){l.push(e);var f=c.element;d[d.length++]=X.createComment(" end ngSwitchWhen: ");k.push({clone:d});a.enter(d,f.parent(),f)})})})}}}],me=Ha({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,f){e.cases["!"+d.ngSwitchWhen]=
e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:f,element:c})}}),ne=Ha({transclude:"element",priority:1200,require:"^ngSwitch",multiElement:!0,link:function(a,c,d,e,f){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:f,element:c})}}),pe=Ha({restrict:"EAC",link:function(a,c,d,e,f){if(!f)throw y("ngTransclude")("orphan",sa(c));f(function(a){c.empty();c.append(a)})}}),Qd=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,d){"text/ng-template"==
d.type&&a.put(d.id,c[0].text)}}}],Rf=y("ngOptions"),oe=da({restrict:"A",terminal:!0}),Rd=["$compile","$parse",function(a,c){var d=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,e={$setViewValue:A};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,c,d){var h=this,l={},m=e,q;h.databound=d.ngModel;
h.init=function(a,c,d){m=a;q=d};h.addOption=function(c,d){Ka(c,'"option value"');l[c]=!0;m.$viewValue==c&&(a.val(c),q.parent()&&q.remove());d&&d[0].hasAttribute("selected")&&(d[0].selected=!0)};h.removeOption=function(a){this.hasOption(a)&&(delete l[a],m.$viewValue==a&&this.renderUnknownOption(a))};h.renderUnknownOption=function(c){c="? "+La(c)+" ?";q.val(c);a.prepend(q);a.val(c);q.prop("selected",!0)};h.hasOption=function(a){return l.hasOwnProperty(a)};c.$on("$destroy",function(){h.renderUnknownOption=
A})}],link:function(e,g,k,h){function l(a,c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(C.parent()&&C.remove(),c.val(a),""===a&&v.prop("selected",!0)):w(a)&&v?c.val(""):e.renderUnknownOption(a)};c.on("change",function(){a.$apply(function(){C.parent()&&C.remove();d.$setViewValue(c.val())})})}function m(a,c,d){var e;d.$render=function(){var a=new bb(d.$viewValue);r(c.find("option"),function(c){c.selected=z(a.get(c.value))})};a.$watch(function(){la(e,d.$viewValue)||(e=qa(d.$viewValue),
d.$render())});c.on("change",function(){a.$apply(function(){var a=[];r(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function q(e,f,g){function h(a,c,d){N[A]=d;F&&(N[F]=c);return a(e,N)}function k(a){var c;if(n)if(G&&B(a)){c=new bb([]);for(var d=0;d<a.length;d++)c.put(h(G,null,a[d]),!0)}else c=new bb(a);else G&&(a=h(G,null,a));return function(d,e){var f;f=G?G:w?w:I;return n?z(c.remove(h(f,d,e))):a==h(f,d,e)}}function l(){x||(e.$$postDigest(q),x=!0)}function m(a,
c,d){a[c]=a[c]||0;a[c]+=d?1:-1}function q(){x=!1;var a={"":[]},c=[""],d,l,s,u,v;s=g.$viewValue;u=P(e)||[];var A=F?ic(u):u,w,B,D,I,G,N={};I=k(s);v=!1;var S;for(G=0;D=A.length,G<D;G++){w=G;if(F&&(w=A[G],"$"===w.charAt(0)))continue;B=u[w];d=h(M,w,B)||"";(l=a[d])||(l=a[d]=[],c.push(d));d=I(w,B);v=v||d;w=h(C,w,B);w=z(w)?w:"";l.push({id:F?A[G]:G,label:w,selected:d})}n||(y||null===s?a[""].unshift({id:"",label:"",selected:!v}):v||a[""].unshift({id:"?",label:"",selected:!0}));I=0;for(A=c.length;I<A;I++){d=
c[I];l=a[d];R.length<=I?(s={element:E.clone().attr("label",d),label:l.label},u=[s],R.push(u),f.append(s.element)):(u=R[I],s=u[0],s.label!=d&&s.element.attr("label",s.label=d));w=null;G=0;for(D=l.length;G<D;G++)d=l[G],(v=u[G+1])?(w=v.element,v.label!==d.label&&(m(N,v.label,!1),m(N,d.label,!0),w.text(v.label=d.label)),v.id!==d.id&&w.val(v.id=d.id),w[0].selected!==d.selected&&(w.prop("selected",v.selected=d.selected),Pa&&w.prop("selected",v.selected))):(""===d.id&&y?S=y:(S=t.clone()).val(d.id).prop("selected",
d.selected).attr("selected",d.selected).text(d.label),u.push(v={element:S,label:d.label,id:d.id,selected:d.selected}),m(N,d.label,!0),w?w.after(S):s.element.append(S),w=S);for(G++;u.length>G;)d=u.pop(),m(N,d.label,!1),d.element.remove();r(N,function(a,c){0<a?p.addOption(c):0>a&&p.removeOption(c)})}for(;R.length>I;)R.pop()[0].element.remove()}var v;if(!(v=s.match(d)))throw Rf("iexp",s,sa(f));var C=c(v[2]||v[1]),A=v[4]||v[6],D=/ as /.test(v[0])&&v[1],w=D?c(D):null,F=v[5],M=c(v[3]||""),I=c(v[2]?v[1]:
A),P=c(v[7]),G=v[8]?c(v[8]):null,R=[[{element:f,label:""}]],N={};y&&(a(y)(e),y.removeClass("ng-scope"),y.remove());f.empty();f.on("change",function(){e.$apply(function(){var a=P(e)||[],c;if(n)c=[],r(f.val(),function(d){c.push("?"===d?u:""===d?null:h(w?w:I,d,a[d]))});else{var d=f.val();c="?"===d?u:""===d?null:h(w?w:I,d,a[d])}g.$setViewValue(c);q()})});g.$render=q;e.$watchCollection(P,l);e.$watchCollection(function(){var a=P(e),c;if(a&&B(a)){c=Array(a.length);for(var d=0,f=a.length;d<f;d++)c[d]=h(C,
d,a[d])}else if(a)for(d in c={},a)a.hasOwnProperty(d)&&(c[d]=h(C,d,a[d]));return c},l);n&&e.$watchCollection(function(){return g.$modelValue},l)}if(h[1]){var p=h[0];h=h[1];var n=k.multiple,s=k.ngOptions,y=!1,v,x=!1,t=D(X.createElement("option")),E=D(X.createElement("optgroup")),C=t.clone();k=0;for(var A=g.children(),F=A.length;k<F;k++)if(""===A[k].value){v=y=A.eq(k);break}p.init(h,y,C);n&&(h.$isEmpty=function(a){return!a||0===a.length});s?q(e,g,h):n?m(e,g,h):l(e,g,h,p)}}}}],Td=["$interpolate",function(a){var c=
{addOption:A,removeOption:A};return{restrict:"E",priority:100,compile:function(d,e){if(w(e.value)){var f=a(d.text(),!0);f||e.$set("value",d.text())}return function(a,d,e){var l=d.parent(),m=l.data("$selectController")||l.parent().data("$selectController");m&&m.databound||(m=c);f?a.$watch(f,function(a,c){e.$set("value",a);c!==a&&m.removeOption(c);m.addOption(a,d)}):m.addOption(e.value,d);d.on("$destroy",function(){m.removeOption(e.value)})}}}}],Sd=da({restrict:"E",terminal:!1});S.angular.bootstrap?
console.log("WARNING: Tried to load angular more than once."):(Id(),Kd(ta),D(X).ready(function(){Ed(X,rc)}))})(window,document);!window.angular.$$csp()&&window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>');
//# sourceMappingURL=angular.min.js.map

/**
 * Angucomplete
 * Autocomplete directive for AngularJS
 * By Daryl Rowland
 */

angular.module('angucomplete', [] )
    .directive('angucomplete', function ($parse, $http, $sce, $timeout) {
    return {
        restrict: 'EA',
        scope: {
            "id": "@id",
            "placeholder": "@placeholder",
            "selectedObject": "=selectedobject",
            "url": "@url",
            "dataField": "@datafield",
            "titleField": "@titlefield",
            "descriptionField": "@descriptionfield",
            "imageField": "@imagefield",
            "imageUri": "@imageuri",
            "inputClass": "@inputclass",
            "userPause": "@pause",
            "localData": "=localdata",
            "searchFields": "@searchfields",
            "minLengthUser": "@minlength",
            "matchClass": "@matchclass"
        },
        template: '<div class="angucomplete-holder"><input id="{{id}}_value" ng-model="searchStr" type="text" placeholder="{{placeholder}}" class="{{inputClass}}" onmouseup="this.select();" ng-focus="resetHideResults()" ng-blur="hideResults()" /><div id="{{id}}_dropdown" class="angucomplete-dropdown" ng-if="showDropdown"><div class="angucomplete-searching" ng-show="searching">Searching...</div><div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)">No results found</div><div class="angucomplete-row" ng-repeat="result in results" ng-mousedown="selectResult(result)" ng-mouseover="hoverRow()" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}"><div ng-if="imageField" class="angucomplete-image-holder"><img ng-if="result.image && result.image != \'\'" ng-src="{{result.image}}" class="angucomplete-image"/><div ng-if="!result.image && result.image != \'\'" class="angucomplete-image-default"></div></div><div class="angucomplete-title" ng-if="matchClass" ng-bind-html="result.title"></div><div class="angucomplete-title" ng-if="!matchClass">{{ result.title }}</div><div ng-if="result.description && result.description != \'\'" class="angucomplete-description">{{result.description}}</div></div></div></div>',

        link: function($scope, elem, attrs) {
            $scope.lastSearchTerm = null;
            $scope.currentIndex = null;
            $scope.justChanged = false;
            $scope.searchTimer = null;
            $scope.hideTimer = null;
            $scope.searching = false;
            $scope.pause = 500;
            $scope.minLength = 3;
            $scope.searchStr = null;

            if ($scope.minLengthUser && $scope.minLengthUser != "") {
                $scope.minLength = $scope.minLengthUser;
            }

            if ($scope.userPause) {
                $scope.pause = $scope.userPause;
            }

            isNewSearchNeeded = function(newTerm, oldTerm) {
                return newTerm.length >= $scope.minLength && newTerm != oldTerm
            }

            $scope.processResults = function(responseData, str) {
                if (responseData && responseData.length > 0) {
                    $scope.results = [];

                    var titleFields = [];
                    if ($scope.titleField && $scope.titleField != "") {
                        titleFields = $scope.titleField.split(",");
                    }

                    for (var i = 0; i < responseData.length; i++) {
                        // Get title variables
                        var titleCode = [];

                        for (var t = 0; t < titleFields.length; t++) {
                            titleCode.push(responseData[i][titleFields[t]]);
                        }

                        var description = "";
                        if ($scope.descriptionField) {
                            description = responseData[i][$scope.descriptionField];
                        }

                        var imageUri = "";
                        if ($scope.imageUri) {
                            imageUri = $scope.imageUri;
                        }

                        var image = "";
                        if ($scope.imageField) {
                            image = imageUri + responseData[i][$scope.imageField];
                        }

                        var text = titleCode.join(' ');
                        if ($scope.matchClass) {
                            var re = new RegExp(str, 'i');
                            var strPart = text.match(re)[0];
                            text = $sce.trustAsHtml(text.replace(re, '<span class="'+ $scope.matchClass +'">'+ strPart +'</span>'));
                        }

                        var resultRow = {
                            title: text,
                            description: description,
                            image: image,
                            originalObject: responseData[i]
                        }

                        $scope.results[$scope.results.length] = resultRow;
                    }


                } else {
                    $scope.results = [];
                }
            }

            $scope.searchTimerComplete = function(str) {
                // Begin the search

                if (str.length >= $scope.minLength) {
                    if ($scope.localData) {
                        var searchFields = $scope.searchFields.split(",");

                        var matches = [];

                        for (var i = 0; i < $scope.localData.length; i++) {
                            var match = false;

                            for (var s = 0; s < searchFields.length; s++) {
                                match = match || (typeof $scope.localData[i][searchFields[s]] === 'string' && typeof str === 'string' && $scope.localData[i][searchFields[s]].toLowerCase().indexOf(str.toLowerCase()) >= 0);
                            }

                            if (match) {
                                matches[matches.length] = $scope.localData[i];
                            }
                        }

                        $scope.searching = false;
                        $scope.processResults(matches, str);

                    } else {
                        $http.get($scope.url + str, {}).
                            success(function(responseData, status, headers, config) {
                                $scope.searching = false;
                                $scope.processResults((($scope.dataField) ? responseData[$scope.dataField] : responseData ), str);
                            }).
                            error(function(data, status, headers, config) {
                                console.log("error");
                            });
                    }
                }
            }

            $scope.hideResults = function() {
                $scope.hideTimer = $timeout(function() {
                    $scope.showDropdown = false;
                }, $scope.pause);
            };

            $scope.resetHideResults = function() {
                if($scope.hideTimer) {
                    $timeout.cancel($scope.hideTimer);
                };
            };

            $scope.hoverRow = function(index) {
                $scope.currentIndex = index;
            }

            $scope.keyPressed = function(event) {
                if (!(event.which == 38 || event.which == 40 || event.which == 13)) {
                    if (!$scope.searchStr || $scope.searchStr == "") {
                        $scope.showDropdown = false;
                        $scope.lastSearchTerm = null
                    } else if (isNewSearchNeeded($scope.searchStr, $scope.lastSearchTerm)) {
                        $scope.lastSearchTerm = $scope.searchStr
                        $scope.showDropdown = true;
                        $scope.currentIndex = -1;
                        $scope.results = [];

                        if ($scope.searchTimer) {
                            $timeout.cancel($scope.searchTimer);
                        }

                        $scope.searching = true;

                        $scope.searchTimer = $timeout(function() {
                            $scope.searchTimerComplete($scope.searchStr);
                        }, $scope.pause);
                    }
                } else {
                    event.preventDefault();
                }
            }

            $scope.selectResult = function(result) {
                if ($scope.matchClass) {
                    result.title = result.title.toString().replace(/(<([^>]+)>)/ig, '');
                }
                $scope.searchStr = $scope.lastSearchTerm = result.title;
                $scope.selectedObject = result;
                $scope.showDropdown = false;
                $scope.results = [];
                //$scope.$apply();
            }

            var inputField = elem.find('input');

            inputField.on('keyup', $scope.keyPressed);

            elem.on("keyup", function (event) {
                if(event.which === 40) {
                    if ($scope.results && ($scope.currentIndex + 1) < $scope.results.length) {
                        $scope.currentIndex ++;
                        $scope.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    }

                    $scope.$apply();
                } else if(event.which == 38) {
                    if ($scope.currentIndex >= 1) {
                        $scope.currentIndex --;
                        $scope.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    }

                } else if (event.which == 13) {
                    if ($scope.results && $scope.currentIndex >= 0 && $scope.currentIndex < $scope.results.length) {
                        $scope.selectResult($scope.results[$scope.currentIndex]);
                        $scope.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    } else {
                        $scope.results = [];
                        $scope.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    }

                } else if (event.which == 27) {
                    $scope.results = [];
                    $scope.showDropdown = false;
                    $scope.$apply();
                } else if (event.which == 8) {
                    $scope.selectedObject = null;
                    $scope.$apply();
                }
            });

        }
    };
});


/*
 AngularJS v1.3.15
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(q,d,C){'use strict';function v(r,k,h){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,f,b,c,y){function z(){l&&(h.cancel(l),l=null);m&&(m.$destroy(),m=null);n&&(l=h.leave(n),l.then(function(){l=null}),n=null)}function x(){var b=r.current&&r.current.locals;if(d.isDefined(b&&b.$template)){var b=a.$new(),c=r.current;n=y(b,function(b){h.enter(b,null,n||f).then(function(){!d.isDefined(t)||t&&!a.$eval(t)||k()});z()});m=c.scope=b;m.$emit("$viewContentLoaded");
m.$eval(w)}else z()}var m,n,l,t=b.autoscroll,w=b.onload||"";a.$on("$routeChangeSuccess",x);x()}}}function A(d,k,h){return{restrict:"ECA",priority:-400,link:function(a,f){var b=h.current,c=b.locals;f.html(c.$template);var y=d(f.contents());b.controller&&(c.$scope=a,c=k(b.controller,c),b.controllerAs&&(a[b.controllerAs]=c),f.data("$ngControllerController",c),f.children().data("$ngControllerController",c));y(a)}}}q=d.module("ngRoute",["ng"]).provider("$route",function(){function r(a,f){return d.extend(Object.create(a),
f)}function k(a,d){var b=d.caseInsensitiveMatch,c={originalPath:a,regexp:a},h=c.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(a,d,b,c){a="?"===c?c:null;c="*"===c?c:null;h.push({name:b,optional:!!a});d=d||"";return""+(a?"":d)+"(?:"+(a?d:"")+(c&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");c.regexp=new RegExp("^"+a+"$",b?"i":"");return c}var h={};this.when=function(a,f){var b=d.copy(f);d.isUndefined(b.reloadOnSearch)&&(b.reloadOnSearch=!0);
d.isUndefined(b.caseInsensitiveMatch)&&(b.caseInsensitiveMatch=this.caseInsensitiveMatch);h[a]=d.extend(b,a&&k(a,b));if(a){var c="/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";h[c]=d.extend({redirectTo:a},k(c,b))}return this};this.caseInsensitiveMatch=!1;this.otherwise=function(a){"string"===typeof a&&(a={redirectTo:a});this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(a,f,b,c,k,q,x){function m(b){var e=s.current;
(v=(p=l())&&e&&p.$$route===e.$$route&&d.equals(p.pathParams,e.pathParams)&&!p.reloadOnSearch&&!w)||!e&&!p||a.$broadcast("$routeChangeStart",p,e).defaultPrevented&&b&&b.preventDefault()}function n(){var u=s.current,e=p;if(v)u.params=e.params,d.copy(u.params,b),a.$broadcast("$routeUpdate",u);else if(e||u)w=!1,(s.current=e)&&e.redirectTo&&(d.isString(e.redirectTo)?f.path(t(e.redirectTo,e.params)).search(e.params).replace():f.url(e.redirectTo(e.pathParams,f.path(),f.search())).replace()),c.when(e).then(function(){if(e){var a=
d.extend({},e.resolve),b,g;d.forEach(a,function(b,e){a[e]=d.isString(b)?k.get(b):k.invoke(b,null,null,e)});d.isDefined(b=e.template)?d.isFunction(b)&&(b=b(e.params)):d.isDefined(g=e.templateUrl)&&(d.isFunction(g)&&(g=g(e.params)),g=x.getTrustedResourceUrl(g),d.isDefined(g)&&(e.loadedTemplateUrl=g,b=q(g)));d.isDefined(b)&&(a.$template=b);return c.all(a)}}).then(function(c){e==s.current&&(e&&(e.locals=c,d.copy(e.params,b)),a.$broadcast("$routeChangeSuccess",e,u))},function(b){e==s.current&&a.$broadcast("$routeChangeError",
e,u,b)})}function l(){var a,b;d.forEach(h,function(c,h){var g;if(g=!b){var k=f.path();g=c.keys;var m={};if(c.regexp)if(k=c.regexp.exec(k)){for(var l=1,n=k.length;l<n;++l){var p=g[l-1],q=k[l];p&&q&&(m[p.name]=q)}g=m}else g=null;else g=null;g=a=g}g&&(b=r(c,{params:d.extend({},f.search(),a),pathParams:a}),b.$$route=c)});return b||h[null]&&r(h[null],{params:{},pathParams:{}})}function t(a,b){var c=[];d.forEach((a||"").split(":"),function(a,d){if(0===d)c.push(a);else{var f=a.match(/(\w+)(?:[?*])?(.*)/),
h=f[1];c.push(b[h]);c.push(f[2]||"");delete b[h]}});return c.join("")}var w=!1,p,v,s={routes:h,reload:function(){w=!0;a.$evalAsync(function(){m();n()})},updateParams:function(a){if(this.current&&this.current.$$route)a=d.extend({},this.current.params,a),f.path(t(this.current.$$route.originalPath,a)),f.search(a);else throw B("norout");}};a.$on("$locationChangeStart",m);a.$on("$locationChangeSuccess",n);return s}]});var B=d.$$minErr("ngRoute");q.provider("$routeParams",function(){this.$get=function(){return{}}});
q.directive("ngView",v);q.directive("ngView",A);v.$inject=["$route","$anchorScroll","$animate"];A.$inject=["$compile","$controller","$route"]})(window,window.angular);
//# sourceMappingURL=angular-route.min.js.map

/*
 AngularJS v1.2.29
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(y,w,z){'use strict';function u(f,a,c){r.directive(f,["$parse","$swipe",function(m,p){var q=75,g=0.3,e=30;return function(h,n,l){function k(d){if(!b)return!1;var s=Math.abs(d.y-b.y);d=(d.x-b.x)*a;return v&&s<q&&0<d&&d>e&&s/d<g}var s=m(l[f]),b,v;p.bind(n,{start:function(d,s){b=d;v=!0},cancel:function(b){v=!1},end:function(b,a){k(b)&&h.$apply(function(){n.triggerHandler(c);s(h,{$event:a})})}})}}])}var r=w.module("ngTouch",[]);r.factory("$swipe",[function(){function f(a){var c=a.touches&&a.touches.length?
a.touches:[a];a=a.changedTouches&&a.changedTouches[0]||a.originalEvent&&a.originalEvent.changedTouches&&a.originalEvent.changedTouches[0]||c[0].originalEvent||c[0];return{x:a.clientX,y:a.clientY}}return{bind:function(a,c){var m,p,q,g,e=!1;a.on("touchstart mousedown",function(a){q=f(a);e=!0;p=m=0;g=q;c.start&&c.start(q,a)});a.on("touchcancel",function(a){e=!1;c.cancel&&c.cancel(a)});a.on("touchmove mousemove",function(a){if(e&&q){var n=f(a);m+=Math.abs(n.x-g.x);p+=Math.abs(n.y-g.y);g=n;10>m&&10>p||
(p>m?(e=!1,c.cancel&&c.cancel(a)):(a.preventDefault(),c.move&&c.move(n,a)))}});a.on("touchend mouseup",function(a){e&&(e=!1,c.end&&c.end(f(a),a))})}}}]);r.config(["$provide",function(f){f.decorator("ngClickDirective",["$delegate",function(a){a.shift();return a}])}]);r.directive("ngClick",["$parse","$timeout","$rootElement",function(f,a,c){function m(a,b,c){for(var d=0;d<a.length;d+=2)if(Math.abs(a[d]-b)<e&&Math.abs(a[d+1]-c)<e)return a.splice(d,d+2),!0;return!1}function p(a){if(!(Date.now()-n>g)){var b=
a.touches&&a.touches.length?a.touches:[a],c=b[0].clientX,b=b[0].clientY;1>c&&1>b||k&&k[0]===c&&k[1]===b||(k&&(k=null),"label"===a.target.tagName.toLowerCase()&&(k=[c,b]),m(l,c,b)||(a.stopPropagation(),a.preventDefault(),a.target&&a.target.blur()))}}function q(c){c=c.touches&&c.touches.length?c.touches:[c];var b=c[0].clientX,e=c[0].clientY;l.push(b,e);a(function(){for(var a=0;a<l.length;a+=2)if(l[a]==b&&l[a+1]==e){l.splice(a,a+2);break}},g,!1)}var g=2500,e=25,h="ng-click-active",n,l,k;return function(a,
b,e){function d(){k=!1;b.removeClass(h)}var g=f(e.ngClick),k=!1,t,r,u,x;b.on("touchstart",function(a){k=!0;t=a.target?a.target:a.srcElement;3==t.nodeType&&(t=t.parentNode);b.addClass(h);r=Date.now();a=a.touches&&a.touches.length?a.touches:[a];a=a[0].originalEvent||a[0];u=a.clientX;x=a.clientY});b.on("touchmove",function(a){d()});b.on("touchcancel",function(a){d()});b.on("touchend",function(a){var g=Date.now()-r,f=a.changedTouches&&a.changedTouches.length?a.changedTouches:a.touches&&a.touches.length?
a.touches:[a],h=f[0].originalEvent||f[0],f=h.clientX,h=h.clientY,s=Math.sqrt(Math.pow(f-u,2)+Math.pow(h-x,2));k&&(750>g&&12>s)&&(l||(c[0].addEventListener("click",p,!0),c[0].addEventListener("touchstart",q,!0),l=[]),n=Date.now(),m(l,f,h),t&&t.blur(),w.isDefined(e.disabled)&&!1!==e.disabled||b.triggerHandler("click",[a]));d()});b.onclick=function(a){};b.on("click",function(b,c){a.$apply(function(){g(a,{$event:c||b})})});b.on("mousedown",function(a){b.addClass(h)});b.on("mousemove mouseup",function(a){b.removeClass(h)})}}]);
u("ngSwipeLeft",-1,"swipeleft");u("ngSwipeRight",1,"swiperight")})(window,window.angular);
//# sourceMappingURL=angular-touch.min.js.map

/*! angular-easyfb
version: 1.3.1
build date: 2015-06-13
author: Robin Fan
https://github.com/pc035860/angular-easyfb.git */
!function(a){function b(b,c){var d="ezfb-social-plugin-wrap",e="display: inline-block; width: 0; height: 0; overflow: hidden;",f=["fbPage"],g=function(a){var b='<span class="'+d+'" style="'+e+'">';return a.wrap(b).parent()},h=function(a){var b='<div class="'+d+'">';return a.wrap(b).parent()},i=function(a){return a.parent().hasClass(d)},j=function(a){var b=a.parent();return b.after(a).remove(),a};a.directive(c,["ezfb","$q","$document",function(a){var d=f.indexOf(c)>=0,e=c.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();return{restrict:"EC",require:"?^ezfbXfbml",compile:function(c){return c.removeClass(e),function(c,f,k,l){function m(a){return function(){var b;n&&a===o&&(b=k.onrender,b&&c.$eval(b),n=!1,j(f))}}if(!l){var n=!1,o=0;a.$rendered().then(function(){f.addClass(e),c.$watch(function(){var a=[];return angular.forEach(b,function(b){a.push(k[b])}),a},function(){var b;o++,n?a.XFBML.parse(f.parent()[0],m(o)):(n=!0,b=d?h:g,a.XFBML.parse(b(f)[0],m(o)))},!0)}),f.bind("$destroy",function(){i(f)&&j(f)})}}}}}])}a.provider("ezfb",function(){function a(a,b){return angular.isObject(b)?void angular.extend(a,b):angular.copy(a)}function b(a,b,c){return function(){return a.apply(b,c)}}var c={COMPLETED_REGISTRATION:"fb_mobile_complete_registration",VIEWED_CONTENT:"fb_mobile_content_view",SEARCHED:"fb_mobile_search",RATED:"fb_mobile_rate",COMPLETED_TUTORIAL:"fb_mobile_tutorial_completion",ADDED_TO_CART:"fb_mobile_add_to_cart",ADDED_TO_WISHLIST:"fb_mobile_add_to_wishlist",INITIATED_CHECKOUT:"fb_mobile_initiated_checkout",ADDED_PAYMENT_INFO:"fb_mobile_add_payment_info",ACHIEVED_LEVEL:"fb_mobile_level_achieved",UNLOCKED_ACHIEVEMENT:"fb_mobile_achievement_unlocked",SPENT_CREDITS:"fb_mobile_spent_credits"},d={CURRENCY:"fb_currency",REGISTRATION_METHOD:"fb_registration_method",CONTENT_TYPE:"fb_content_type",CONTENT_ID:"fb_content_id",SEARCH_STRING:"fb_search_string",SUCCESS:"fb_success",MAX_RATING_VALUE:"fb_max_rating_value",PAYMENT_INFO_AVAILABLE:"fb_payment_info_available",NUM_ITEMS:"fb_num_items",LEVEL:"fb_level",DESCRIPTION:"fb_description"},e=-1,f={api:[1,2,3],ui:1,getAuthResponse:e,getLoginStatus:0,login:0,logout:0,"Event.subscribe":1,"Event.unsubscribe":1,"XFBML.parse":1,"Canvas.Prefetcher.addStaticResource":e,"Canvas.Prefetcher.setCollectionMode":e,"Canvas.getPageInfo":0,"Canvas.hideFlashElement":e,"Canvas.scrollTo":e,"Canvas.setAutoGrow":e,"Canvas.setDoneLoading":0,"Canvas.setSize":e,"Canvas.setUrlHandler":0,"Canvas.showFlashElement":e,"Canvas.startTimer":e,"Canvas.stopTimer":0,"AppEvents.logEvent":e,"AppEvents.logPurchase":e,"AppEvents.activateApp":e},g="en_US",h={status:!0,cookie:!0,xfbml:!0,version:"v2.0"},i=["$window","$document","ezfbAsyncInit","ezfbLocale",function(a,b,c,d){!function(a){var b,c="facebook-jssdk",e=a.getElementsByTagName("script")[0];a.getElementById(c)||(b=a.createElement("script"),b.id=c,b.async=!0,b.src="//connect.facebook.net/"+d+"/sdk.js",e.parentNode.insertBefore(b,e))}(b[0]),a.fbAsyncInit=c}],j=i,k=["$window","ezfbInitParams",function(a,b){a.FB.init(b)}],l=k;return{setInitParams:function(b){a(h,b)},getInitParams:function(){return a(h)},setLocale:function(a){g=a},getLocale:function(){return g},setLoadSDKFunction:function(a){if(!angular.isArray(a)&&!angular.isFunction(a))throw new Error("Init function type error.");j=a},getLoadSDKFunction:function(){return j},setInitFunction:function(a){if(!angular.isArray(a)&&!angular.isFunction(a))throw new Error("Init function type error.");l=a},getInitFunction:function(){return l},$get:["$window","$q","$document","$parse","$rootScope","$injector","$timeout",function(i,m,n,o,p,q,r){var s,t,u,v,w,x;return v={},w=m.defer(),(h.appId||l!==k)&&w.resolve(),s=m.defer(),t=m.defer(),n[0].getElementById("fb-root")||n.find("body").append('<div id="fb-root"></div>'),x=function(){w.promise.then(function(){var a=function(){u.$$rendered=!0,r(function(){t.resolve()}),u.Event.unsubscribe("xfbml.render",a)};u.Event.subscribe("xfbml.render",a),q.invoke(l,null,{ezfbInitParams:h}),u.$$ready=!0,s.resolve()})},q.invoke(j,null,{ezfbAsyncInit:x,ezfbLocale:g}),u={$$ready:!1,$$rendered:!1,$ready:function(a){return angular.isFunction(a)&&s.promise.then(a),s.promise},$rendered:function(a){return angular.isFunction(a)&&t.promise.then(a),t.promise},init:function(b){a(h,b),w.resolve()},AppEvents:{EventNames:c,ParameterNames:d}},angular.forEach(f,function(a,c){var d=o(c),f=d.assign;f(u,function(){var f=b(function(b){var f,g;if(f=m.defer(),g=function(a){var d,e;for(d=angular.isFunction(b[a])?b[a]:angular.noop,e=function(){var a=Array.prototype.slice.call(arguments);p.$$phase?(d.apply(null,a),f.resolve.apply(f,a)):p.$apply(function(){d.apply(null,a),f.resolve.apply(f,a)})};b.length<=a;)b.push(null);var g;if("Event.subscribe"===c)g=b[0],angular.isUndefined(v[g])&&(v[g]=[]),v[g].push({original:d,wrapped:e});else if("Event.unsubscribe"===c&&(g=b[0],angular.isArray(v[g]))){var h,i,j=v[g].length;for(h=0;j>h;h++)if(i=v[g][h],i.original===d){e=i.wrapped,v[g].splice(h,1);break}}b[a]=e},a!==e)if(angular.isNumber(a))g(a);else if(angular.isArray(a)){var h,j;for(h=0;h<a.length;h++)if(j=a[h],b.length==j||b.length==j+1&&angular.isFunction(b[j])){g(j);break}}var k=d(i.FB);if(!k)throw new Error("Facebook API `FB."+c+"` doesn't exist.");return k.apply(i.FB,b),f.promise},null,[Array.prototype.slice.call(arguments)]);if("getAuthResponse"===c){if(angular.isUndefined(i.FB))throw new Error("`FB` is not ready.");return i.FB.getAuthResponse()}return a!==e?s.promise.then(f):void s.promise.then(f)})}),u}]}}).directive("ezfbXfbml",["ezfb","$parse","$compile","$timeout",function(a,b,c,d){return{restrict:"EAC",controller:function(){},compile:function(e){var f=e.html();return function(e,g,h){var i=!0,j=h.onrender,k=function(){i&&(j&&e.$eval(j),i=!1)};a.XFBML.parse(g[0],k);var l=b(h.ezfbXfbml).assign;e.$watch(h.ezfbXfbml,function(b){b&&(i=!0,g.html(f),c(g.contents())(e),d(function(){a.XFBML.parse(g[0],k)}),(l||angular.noop)(e,!1))},!0)}}}}]);var c={fbLike:["action","colorscheme","href","kidDirectedSite","layout","ref","share","showFaces","width"],fbShareButton:["href","layout","width"],fbSend:["colorscheme","href","kidDirectedSite","ref"],fbPost:["href","width"],fbFollow:["colorscheme","href","kidDirectedSite","layout","showFaces","width"],fbComments:["colorscheme","href","mobile","numPosts","orderBy","width"],fbCommentsCount:["href"],fbActivity:["action","appId","colorscheme","filter","header","height","linktarget","maxAge","recommendations","ref","site","width"],fbRecommendations:["action","appId","colorscheme","header","height","linktarget","maxAge","ref","site","width"],fbRecommendationsBar:["action","href","maxAge","numRecommendations","readTime","ref","side","site","trigger"],fbLikeBox:["colorscheme","forceWall","header","height","href","showBorder","showFaces","stream","width"],fbFacepile:["action","appId","colorscheme","href","maxRows","size","width"],fbPage:["href","width","height","hideCover","showFacepile","showPosts"],fbVideo:["href","width","allowfullscreen"]};angular.forEach(c,b)}(angular.module("ezfb",[]));
/*! angular-payments 11-09-2014 */
angular.module("angularPayments",[]),angular.module("angularPayments").factory("Common",[function(){var a={};return a.parseExpiry=function(a){var b,c,d,e;return a=a||"",a=a.replace(/\s/g,""),e=a.split("/",2),b=e[0],d=e[1],2===(null!=d?d.length:void 0)&&/^\d+$/.test(d)&&(c=(new Date).getFullYear(),c=c.toString().slice(0,2),d=c+d),b=parseInt(b,10),d=parseInt(d,10),{month:b,year:d}},a}]),angular.module("angularPayments").factory("Cards",[function(){var a=/(\d{1,4})/g,b=/(?:^|\s)(\d{4})$/,c=[{type:"maestro",pattern:/^(5018|5020|5038|6304|6759|676[1-3])/,format:a,inputFormat:b,length:[12,13,14,15,16,17,18,19],cvcLength:[3],luhn:!0},{type:"dinersclub",pattern:/^(36|38|30[0-5])/,format:a,inputFormat:b,length:[14],cvcLength:[3],luhn:!0},{type:"laser",pattern:/^(6706|6771|6709)/,format:a,inputFormat:b,length:[16,17,18,19],cvcLength:[3],luhn:!0},{type:"jcb",pattern:/^35/,format:a,inputFormat:b,length:[16],cvcLength:[3],luhn:!0},{type:"unionpay",pattern:/^62/,format:a,inputFormat:b,length:[16,17,18,19],cvcLength:[3],luhn:!1},{type:"discover",pattern:/^(6011|65|64[4-9]|622)/,format:a,inputFormat:b,length:[16],cvcLength:[3],luhn:!0},{type:"mastercard",pattern:/^5[1-5]/,format:a,inputFormat:b,length:[16],cvcLength:[3],luhn:!0},{type:"amex",pattern:/^3[47]/,format:/(\d{1,4})(\d{1,6})?(\d{1,5})?/,inputFormat:/^(\d{4}|\d{4}\s\d{6})$/,length:[15],cvcLength:[3,4],luhn:!0},{type:"visa",pattern:/^4/,format:a,inputFormat:b,length:[13,14,15,16],cvcLength:[3],luhn:!0}],d=function(a){var b,d,e;for(a=(a+"").replace(/\D/g,""),d=0,e=c.length;e>d;d++)if(b=c[d],b.pattern.test(a))return b},e=function(a){var b,d,e;for(d=0,e=c.length;e>d;d++)if(b=c[d],b.type===a)return b};return{fromNumber:function(a){return d(a)},fromType:function(a){return e(a)},defaultFormat:function(){return a},defaultInputFormat:function(){return b}}}]),angular.module("angularPayments").factory("_Format",["Cards","Common","$filter",function(a,b,c){var d={},e=function(a){var b;return null!=a.prop("selectionStart")&&a.prop("selectionStart")!==a.prop("selectionEnd")?!0:("undefined"!=typeof document&&null!==document&&null!=(b=document.selection)&&"function"==typeof b.createRange?b.createRange().text:void 0)?!0:!1},f=function(b){var c,d,e,f,g,h,i;if(e=String.fromCharCode(b.which),c=angular.element(b.currentTarget),i=c.val(),d=a.fromNumber(i+e),f=(i.replace(/\D/g,"")+e).length,h=16,d&&(h=d.length[d.length.length-1]),!(f>=h)){if(!/^\d+$/.test(e)&&!b.meta&&b.keyCode>=46)return void b.preventDefault();if(null==c.prop("selectionStart")||c.prop("selectionStart")===i.length)return g=a.defaultInputFormat(),d&&(g=d.inputFormat),g.test(i)?(b.preventDefault(),c.val(i+" "+e)):g.test(i+e)?(b.preventDefault(),c.val(i+e+" ")):void 0}},g=function(b){var c,d,f,g;c=angular.element(b.currentTarget),f=String.fromCharCode(b.which),/^\d+$/.test(f)&&(e(c)||(g=(c.val()+f).replace(/\D/g,""),d=a.fromNumber(g),d?g.length<=d.length[d.length.length-1]||b.preventDefault():g.length<=16||b.preventDefault()))},h=function(a){var b,c;return b=angular.element(a.currentTarget),c=b.val(),a.meta||8!==a.which||null!=b.prop("selectionStart")&&b.prop("selectionStart")!==c.length?void 0:/\d\s$/.test(c)&&!a.meta&&a.keyCode>=46?(a.preventDefault(),b.val(c.replace(/\d\s$/,""))):/\s\d?$/.test(c)?(a.preventDefault(),b.val(c.replace(/\s\d?$/,""))):void 0},i=function(b){var c,d,e,f;return(c=a.fromNumber(b))?(e=c.length[c.length.length-1],b=b.replace(/\D/g,""),b=b.slice(0,+e+1||9e9),c.format.global?null!=(f=b.match(c.format))?f.join(" "):void 0:(d=c.format.exec(b),null!=d&&d.shift(),null!=d?d.join(" "):void 0)):b},j=function(a){return setTimeout(function(){var b,c;return b=angular.element(a.target),c=b.val(),c=i(c),b.val(c)})},k=function(a){return null!=a?a.replace(/\s/g,""):a};d.card=function(a,b){a.bind("keypress",g),a.bind("keypress",f),a.bind("keydown",h),a.bind("paste",j),b.$parsers.push(k),b.$formatters.push(i)},_formatCVC=function(a){return $target=angular.element(a.currentTarget),digit=String.fromCharCode(a.which),!/^\d+$/.test(digit)&&!a.meta&&a.keyCode>=46?void a.preventDefault():(val=$target.val()+digit,val.length<=4?void 0:void a.preventDefault())},d.cvc=function(a){a.bind("keypress",_formatCVC)},_restrictExpiry=function(a){var b,c,d;return b=angular.element(a.currentTarget),c=String.fromCharCode(a.which),!/^\d+$/.test(c)&&!a.meta&&a.keyCode>=46?void a.preventDefault():e(b)?void 0:(d=b.val()+c,d=d.replace(/\D/g,""),d.length>6?void a.preventDefault():void 0)},_formatExpiry=function(a){var b,c,d;return c=String.fromCharCode(a.which),!/^\d+$/.test(c)&&!a.meta&&a.keyCode>=46?void a.preventDefault():(b=angular.element(a.currentTarget),d=b.val()+c,/^\d$/.test(d)&&"0"!==d&&"1"!==d?(a.preventDefault(),b.val("0"+d+" / ")):/^\d\d$/.test(d)?(a.preventDefault(),b.val(""+d+" / ")):void 0)},_formatForwardExpiry=function(a){var b,c,d;return c=String.fromCharCode(a.which),!/^\d+$/.test(c)&&!a.meta&&a.keyCode>=46?void 0:(b=angular.element(a.currentTarget),d=b.val(),/^\d\d$/.test(d)?b.val(""+d+" / "):void 0)},_formatForwardSlash=function(a){var b,c,d;return c=String.fromCharCode(a.which),"/"===c?(b=angular.element(a.currentTarget),d=b.val(),/^\d$/.test(d)&&"0"!==d?b.val("0"+d+" / "):void 0):void 0},_formatBackExpiry=function(a){var b,c;if(!a.meta&&(b=angular.element(a.currentTarget),c=b.val(),8===a.which&&(null==b.prop("selectionStart")||b.prop("selectionStart")===c.length)))return/\d(\s|\/)+$/.test(c)?(a.preventDefault(),b.val(c.replace(/\d(\s|\/)*$/,""))):/\s\/\s?\d?$/.test(c)?(a.preventDefault(),b.val(c.replace(/\s\/\s?\d?$/,""))):void 0};var l=function(a){if(null!=a){var d=b.parseExpiry(a),e=new Date(d.year,d.month-1);return c("date")(e,"MM/yyyy")}return null},m=function(a){if(null!=a){var d=b.parseExpiry(a),e=new Date(d.year,d.month-1);return c("date")(e,"MM / yyyy")}return null};return d.expiry=function(a,b){a.bind("keypress",_restrictExpiry),a.bind("keypress",_formatExpiry),a.bind("keypress",_formatForwardSlash),a.bind("keypress",_formatForwardExpiry),a.bind("keydown",_formatBackExpiry),b.$parsers.push(l),b.$formatters.push(m)},function(a,b,c){if(!d[a])throw types=Object.keys(d),errstr='Unknown type for formatting: "'+a+'". ',errstr+='Should be one of: "'+types.join('", "')+'"';return d[a](b,c)}}]).directive("paymentsFormat",["$window","_Format",function(a,b){return{restrict:"A",require:"ngModel",link:function(a,c,d,e){b(d.paymentsFormat,c,e)}}}]),angular.module("angularPayments").factory("_Validate",["Cards","Common","$parse",function(a,b,c){var d=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1},e=function(a){var b,c,d,e,f,g;for(d=!0,e=0,c=(a+"").split("").reverse(),f=0,g=c.length;g>f;f++)b=c[f],b=parseInt(b,10),(d=!d)&&(b*=2),b>9&&(b-=9),e+=b;return e%10===0},f={};return f.cvc=function(b,e,f,g){var h,i;if(null==b||0==b.length)return!0;if(!/^\d+$/.test(b))return!1;var j;if(g.paymentsTypeModel){var k=c(g.paymentsTypeModel);j=k(f)}return j?(h=b.length,d.call(null!=(i=a.fromType(j))?i.cvcLength:void 0,h)>=0):b.length>=3&&b.length<=4},f.card=function(b,f,g,h){var i,j,k;h.paymentsTypeModel&&(k=c(h.paymentsTypeModel));var l=function(){k&&k.assign(g,null),f.$card=null};return null==b||0==b.length?(l(),!0):(b=(b+"").replace(/\s+|-/g,""),/^\d+$/.test(b)&&(i=a.fromNumber(b))?(f.$card=angular.copy(i),k&&k.assign(g,i.type),j=b.length,ret=d.call(i.length,j)>=0&&(i.luhn===!1||e(b)),ret):(l(),!1))},f.expiry=function(a){if(null==a||0==a.length)return!0;obj=b.parseExpiry(a),month=obj.month,year=obj.year;var c,d,e;return month&&year&&/^\d+$/.test(month)&&/^\d+$/.test(year)&&parseInt(month,10)<=12?(2===year.length&&(e=(new Date).getFullYear(),e=e.toString().slice(0,2),year=e+year),d=new Date(year,month),c=new Date,d.setMonth(d.getMonth()-1),d.setMonth(d.getMonth()+1,1),d>c):!1},function(a,b,c,d,e){if(!f[a])throw types=Object.keys(f),errstr='Unknown type for validation: "'+a+'". ',errstr+='Should be one of: "'+types.join('", "')+'"';return f[a](b,c,d,e)}}]).factory("_ValidateWatch",["_Validate",function(a){var b={};return b.cvc=function(b,c,d,e){e.paymentsTypeModel&&d.$watch(e.paymentsTypeModel,function(f,g){if(f!=g){var h=a(b,c.$modelValue,c,d,e);c.$setValidity(b,h)}})},function(a,c,d,e){return b[a]?b[a](a,c,d,e):void 0}}]).directive("paymentsValidate",["$window","_Validate","_ValidateWatch",function(a,b,c){return{restrict:"A",require:"ngModel",link:function(a,d,e,f){var g=e.paymentsValidate;c(g,f,a,e);var h=function(c){var d=b(g,c,f,a,e);return f.$setValidity(g,d),d?c:void 0};f.$formatters.push(h),f.$parsers.push(h)}}}]),angular.module("angularPayments").directive("stripeForm",["$window","$parse","Common",function(a,b,c){return _getDataToSend=function(a){var b=["number","expMonth","expYear","cvc","name","addressLine1","addressLine2","addressCity","addressState","addressZip","addressCountry"],c=function(a){return a.replace(/([A-Z])/g,function(a){return"_"+a.toLowerCase()})},d={};for(i in b)a.hasOwnProperty(b[i])&&(d[c(b[i])]=angular.copy(a[b[i]]));return d.number=(d.number||"").replace(/ /g,""),d},{restrict:"A",link:function(b,d,e){if(!a.Stripe)throw"stripeForm requires that you have stripe.js installed. Include https://js.stripe.com/v2/ into your html.";var f=angular.element(d);f.bind("submit",function(){expMonthUsed=b.expMonth?!0:!1,expYearUsed=b.expYear?!0:!1,expMonthUsed&&expYearUsed||(exp=c.parseExpiry(b.expiry),b.expMonth=exp.month,b.expYear=exp.year);var d=f.find("button");d.prop("disabled",!0),f.hasClass("ng-valid")?a.Stripe.createToken(_getDataToSend(b),function(){var a=arguments;b.$apply(function(){b[e.stripeForm].apply(b,a)}),d.prop("disabled",!1)}):(b.$apply(function(){b[e.stripeForm].apply(b,[400,{error:"Invalid form submitted."}])}),d.prop("disabled",!1)),b.expMonth=null,b.expYear=null})}}}]);
/*
 AngularJS v1.3.15
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p,f,n){'use strict';f.module("ngCookies",["ng"]).factory("$cookies",["$rootScope","$browser",function(e,b){var c={},g={},h,k=!1,l=f.copy,m=f.isUndefined;b.addPollFn(function(){var a=b.cookies();h!=a&&(h=a,l(a,g),l(a,c),k&&e.$apply())})();k=!0;e.$watch(function(){var a,d,e;for(a in g)m(c[a])&&b.cookies(a,n);for(a in c)d=c[a],f.isString(d)||(d=""+d,c[a]=d),d!==g[a]&&(b.cookies(a,d),e=!0);if(e)for(a in d=b.cookies(),c)c[a]!==d[a]&&(m(d[a])?delete c[a]:c[a]=d[a])});return c}]).factory("$cookieStore",
["$cookies",function(e){return{get:function(b){return(b=e[b])?f.fromJson(b):b},put:function(b,c){e[b]=f.toJson(c)},remove:function(b){delete e[b]}}}])})(window,window.angular);
//# sourceMappingURL=angular-cookies.min.js.map

/*
 AngularJS v1.2.29
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(q,g,r){'use strict';function F(a){var d=[];t(d,g.noop).chars(a);return d.join("")}function l(a){var d={};a=a.split(",");var c;for(c=0;c<a.length;c++)d[a[c]]=!0;return d}function G(a,d){function c(a,b,c,h){b=g.lowercase(b);if(u[b])for(;f.last()&&v[f.last()];)e("",f.last());w[b]&&f.last()==b&&e("",b);(h=x[b]||!!h)||f.push(b);var n={};c.replace(H,function(a,b,d,c,e){n[b]=s(d||c||e||"")});d.start&&d.start(b,n,h)}function e(a,b){var c=0,e;if(b=g.lowercase(b))for(c=f.length-1;0<=c&&f[c]!=b;c--);
if(0<=c){for(e=f.length-1;e>=c;e--)d.end&&d.end(f[e]);f.length=c}}"string"!==typeof a&&(a=null===a||"undefined"===typeof a?"":""+a);var b,k,f=[],n=a,h;for(f.last=function(){return f[f.length-1]};a;){h="";k=!0;if(f.last()&&y[f.last()])a=a.replace(RegExp("(.*)<\\s*\\/\\s*"+f.last()+"[^>]*>","i"),function(a,b){b=b.replace(I,"$1").replace(J,"$1");d.chars&&d.chars(s(b));return""}),e("",f.last());else{if(0===a.indexOf("\x3c!--"))b=a.indexOf("--",4),0<=b&&a.lastIndexOf("--\x3e",b)===b&&(d.comment&&d.comment(a.substring(4,
b)),a=a.substring(b+3),k=!1);else if(z.test(a)){if(b=a.match(z))a=a.replace(b[0],""),k=!1}else if(K.test(a)){if(b=a.match(A))a=a.substring(b[0].length),b[0].replace(A,e),k=!1}else L.test(a)&&((b=a.match(B))?(b[4]&&(a=a.substring(b[0].length),b[0].replace(B,c)),k=!1):(h+="<",a=a.substring(1)));k&&(b=a.indexOf("<"),h+=0>b?a:a.substring(0,b),a=0>b?"":a.substring(b),d.chars&&d.chars(s(h)))}if(a==n)throw M("badparse",a);n=a}e()}function s(a){if(!a)return"";var d=N.exec(a);a=d[1];var c=d[3];if(d=d[2])p.innerHTML=
d.replace(/</g,"&lt;"),d="textContent"in p?p.textContent:p.innerText;return a+d+c}function C(a){return a.replace(/&/g,"&amp;").replace(O,function(a){var c=a.charCodeAt(0);a=a.charCodeAt(1);return"&#"+(1024*(c-55296)+(a-56320)+65536)+";"}).replace(P,function(a){return"&#"+a.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function t(a,d){var c=!1,e=g.bind(a,a.push);return{start:function(a,k,f){a=g.lowercase(a);!c&&y[a]&&(c=a);c||!0!==D[a]||(e("<"),e(a),g.forEach(k,function(c,f){var m=
g.lowercase(f),k="img"===a&&"src"===m||"background"===m;!0!==Q[m]||!0===E[m]&&!d(c,k)||(e(" "),e(f),e('="'),e(C(c)),e('"'))}),e(f?"/>":">"))},end:function(a){a=g.lowercase(a);c||!0!==D[a]||(e("</"),e(a),e(">"));a==c&&(c=!1)},chars:function(a){c||e(C(a))}}}var M=g.$$minErr("$sanitize"),B=/^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,A=/^<\/\s*([\w:-]+)[^>]*>/,H=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,L=/^</,
K=/^<\//,I=/\x3c!--(.*?)--\x3e/g,z=/<!DOCTYPE([^>]*?)>/i,J=/<!\[CDATA\[(.*?)]]\x3e/g,O=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,P=/([^\#-~| |!])/g,x=l("area,br,col,hr,img,wbr");q=l("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr");r=l("rp,rt");var w=g.extend({},r,q),u=g.extend({},q,l("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),v=g.extend({},r,l("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
y=l("script,style"),D=g.extend({},x,u,v,w),E=l("background,cite,href,longdesc,src,usemap"),Q=g.extend({},E,l("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width")),p=document.createElement("pre"),N=/^(\s*)([\s\S]*?)(\s*)$/;g.module("ngSanitize",[]).provider("$sanitize",
function(){this.$get=["$$sanitizeUri",function(a){return function(d){var c=[];G(d,t(c,function(c,b){return!/^unsafe/.test(a(c,b))}));return c.join("")}}]});g.module("ngSanitize").filter("linky",["$sanitize",function(a){var d=/((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"]/,c=/^mailto:/;return function(e,b){function k(a){a&&m.push(F(a))}function f(a,c){m.push("<a ");g.isDefined(b)&&(m.push('target="'),m.push(b),m.push('" '));m.push('href="',a.replace('"',"&quot;"),'">');k(c);m.push("</a>")}
if(!e)return e;for(var n,h=e,m=[],l,p;n=h.match(d);)l=n[0],n[2]==n[3]&&(l="mailto:"+l),p=n.index,k(h.substr(0,p)),f(l,n[0].replace(c,"")),h=h.substring(p+n[0].length);k(h);return a(m.join(""))}}])})(window,window.angular);
//# sourceMappingURL=angular-sanitize.min.js.map

/*
 AngularJS v1.3.20
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(I,d,B){'use strict';function D(f,q){q=q||{};d.forEach(q,function(d,h){delete q[h]});for(var h in f)!f.hasOwnProperty(h)||"$"===h.charAt(0)&&"$"===h.charAt(1)||(q[h]=f[h]);return q}var w=d.$$minErr("$resource"),C=/^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;d.module("ngResource",["ng"]).provider("$resource",function(){var f=this;this.defaults={stripTrailingSlashes:!0,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}}};
this.$get=["$http","$q",function(q,h){function t(d,g){this.template=d;this.defaults=s({},f.defaults,g);this.urlParams={}}function v(x,g,l,m){function c(b,k){var c={};k=s({},g,k);r(k,function(a,k){u(a)&&(a=a());var d;if(a&&a.charAt&&"@"==a.charAt(0)){d=b;var e=a.substr(1);if(null==e||""===e||"hasOwnProperty"===e||!C.test("."+e))throw w("badmember",e);for(var e=e.split("."),n=0,g=e.length;n<g&&d!==B;n++){var h=e[n];d=null!==d?d[h]:B}}else d=a;c[k]=d});return c}function F(b){return b.resource}function e(b){D(b||
{},this)}var G=new t(x,m);l=s({},f.defaults.actions,l);e.prototype.toJSON=function(){var b=s({},this);delete b.$promise;delete b.$resolved;return b};r(l,function(b,k){var g=/^(POST|PUT|PATCH)$/i.test(b.method);e[k]=function(a,y,m,x){var n={},f,l,z;switch(arguments.length){case 4:z=x,l=m;case 3:case 2:if(u(y)){if(u(a)){l=a;z=y;break}l=y;z=m}else{n=a;f=y;l=m;break}case 1:u(a)?l=a:g?f=a:n=a;break;case 0:break;default:throw w("badargs",arguments.length);}var t=this instanceof e,p=t?f:b.isArray?[]:new e(f),
A={},v=b.interceptor&&b.interceptor.response||F,C=b.interceptor&&b.interceptor.responseError||B;r(b,function(b,a){"params"!=a&&"isArray"!=a&&"interceptor"!=a&&(A[a]=H(b))});g&&(A.data=f);G.setUrlParams(A,s({},c(f,b.params||{}),n),b.url);n=q(A).then(function(a){var c=a.data,g=p.$promise;if(c){if(d.isArray(c)!==!!b.isArray)throw w("badcfg",k,b.isArray?"array":"object",d.isArray(c)?"array":"object");b.isArray?(p.length=0,r(c,function(a){"object"===typeof a?p.push(new e(a)):p.push(a)})):(D(c,p),p.$promise=
g)}p.$resolved=!0;a.resource=p;return a},function(a){p.$resolved=!0;(z||E)(a);return h.reject(a)});n=n.then(function(a){var b=v(a);(l||E)(b,a.headers);return b},C);return t?n:(p.$promise=n,p.$resolved=!1,p)};e.prototype["$"+k]=function(a,b,c){u(a)&&(c=b,b=a,a={});a=e[k].call(this,a,this,b,c);return a.$promise||a}});e.bind=function(b){return v(x,s({},g,b),l)};return e}var E=d.noop,r=d.forEach,s=d.extend,H=d.copy,u=d.isFunction;t.prototype={setUrlParams:function(f,g,l){var m=this,c=l||m.template,h,
e,q=m.urlParams={};r(c.split(/\W/),function(b){if("hasOwnProperty"===b)throw w("badname");!/^\d+$/.test(b)&&b&&(new RegExp("(^|[^\\\\]):"+b+"(\\W|$)")).test(c)&&(q[b]=!0)});c=c.replace(/\\:/g,":");g=g||{};r(m.urlParams,function(b,k){h=g.hasOwnProperty(k)?g[k]:m.defaults[k];d.isDefined(h)&&null!==h?(e=encodeURIComponent(h).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"%20").replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+"),c=c.replace(new RegExp(":"+
k+"(\\W|$)","g"),function(b,a){return e+a})):c=c.replace(new RegExp("(/?):"+k+"(\\W|$)","g"),function(b,a,c){return"/"==c.charAt(0)?c:a+c})});m.defaults.stripTrailingSlashes&&(c=c.replace(/\/+$/,"")||"/");c=c.replace(/\/\.(?=\w+($|\?))/,".");f.url=c.replace(/\/\\\./,"/.");r(g,function(b,c){m.urlParams[c]||(f.params=f.params||{},f.params[c]=b)})}};return v}]})})(window,window.angular);
//# sourceMappingURL=angular-resource.min.js.map

/*! device.js 0.2.7 */
(function(){var a,b,c,d,e,f,g,h,i,j;b=window.device,a={},window.device=a,d=window.document.documentElement,j=window.navigator.userAgent.toLowerCase(),a.ios=function(){return a.iphone()||a.ipod()||a.ipad()},a.iphone=function(){return!a.windows()&&e("iphone")},a.ipod=function(){return e("ipod")},a.ipad=function(){return e("ipad")},a.android=function(){return!a.windows()&&e("android")},a.androidPhone=function(){return a.android()&&e("mobile")},a.androidTablet=function(){return a.android()&&!e("mobile")},a.blackberry=function(){return e("blackberry")||e("bb10")||e("rim")},a.blackberryPhone=function(){return a.blackberry()&&!e("tablet")},a.blackberryTablet=function(){return a.blackberry()&&e("tablet")},a.windows=function(){return e("windows")},a.windowsPhone=function(){return a.windows()&&e("phone")},a.windowsTablet=function(){return a.windows()&&e("touch")&&!a.windowsPhone()},a.fxos=function(){return(e("(mobile;")||e("(tablet;"))&&e("; rv:")},a.fxosPhone=function(){return a.fxos()&&e("mobile")},a.fxosTablet=function(){return a.fxos()&&e("tablet")},a.meego=function(){return e("meego")},a.cordova=function(){return window.cordova&&"file:"===location.protocol},a.nodeWebkit=function(){return"object"==typeof window.process},a.mobile=function(){return a.androidPhone()||a.iphone()||a.ipod()||a.windowsPhone()||a.blackberryPhone()||a.fxosPhone()||a.meego()},a.tablet=function(){return a.ipad()||a.androidTablet()||a.blackberryTablet()||a.windowsTablet()||a.fxosTablet()},a.desktop=function(){return!a.tablet()&&!a.mobile()},a.television=function(){var a;for(television=["googletv","viera","smarttv","internet.tv","netcast","nettv","appletv","boxee","kylo","roku","dlnadoc","roku","pov_tv","hbbtv","ce-html"],a=0;a<television.length;){if(e(television[a]))return!0;a++}return!1},a.portrait=function(){return window.innerHeight/window.innerWidth>1},a.landscape=function(){return window.innerHeight/window.innerWidth<1},a.noConflict=function(){return window.device=b,this},e=function(a){return-1!==j.indexOf(a)},g=function(a){var b;return b=new RegExp(a,"i"),d.className.match(b)},c=function(a){var b=null;g(a)||(b=d.className.replace(/^\s+|\s+$/g,""),d.className=b+" "+a)},i=function(a){g(a)&&(d.className=d.className.replace(" "+a,""))},a.ios()?a.ipad()?c("ios ipad tablet"):a.iphone()?c("ios iphone mobile"):a.ipod()&&c("ios ipod mobile"):a.android()?c(a.androidTablet()?"android tablet":"android mobile"):a.blackberry()?c(a.blackberryTablet()?"blackberry tablet":"blackberry mobile"):a.windows()?c(a.windowsTablet()?"windows tablet":a.windowsPhone()?"windows mobile":"desktop"):a.fxos()?c(a.fxosTablet()?"fxos tablet":"fxos mobile"):a.meego()?c("meego mobile"):a.nodeWebkit()?c("node-webkit"):a.television()?c("television"):a.desktop()&&c("desktop"),a.cordova()&&c("cordova"),f=function(){a.landscape()?(i("portrait"),c("landscape")):(i("landscape"),c("portrait"))},h=Object.prototype.hasOwnProperty.call(window,"onorientationchange")?"orientationchange":"resize",window.addEventListener?window.addEventListener(h,f,!1):window.attachEvent?window.attachEvent(h,f):window[h]=f,f(),"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return a}):"undefined"!=typeof module&&module.exports?module.exports=a:window.device=a}).call(this);

/*global angular */
/*
 jQuery UI Datepicker plugin wrapper

 @note If ≤ IE8 make sure you have a polyfill for Date.toISOString()
 @param [ui-date] {object} Options to pass to $.fn.datepicker() merged onto uiDateConfig
 */

angular.module('ui.date', [])

.constant('uiDateConfig', {})

.directive('uiDate', ['uiDateConfig', 'uiDateConverter', function (uiDateConfig, uiDateConverter) {
  'use strict';
  var options;
  options = {};
  angular.extend(options, uiDateConfig);
  return {
    require:'?ngModel',
    link:function (scope, element, attrs, controller) {
      var getOptions = function () {
        return angular.extend({}, uiDateConfig, scope.$eval(attrs.uiDate));
      };
      var initDateWidget = function () {
        var showing = false;
        var opts = getOptions();

        function setVal() {
          var keys = ['Hours', 'Minutes', 'Seconds', 'Milliseconds'],
              isDate = angular.isDate(controller.$modelValue),
              preserve = {};

          if (isDate) {
            angular.forEach(keys, function(key) {
              preserve[key] = controller.$modelValue['get' + key]();
            });
          }
          controller.$setViewValue(element.datepicker('getDate'));

          if (isDate) {
            angular.forEach(keys, function(key) {
               controller.$viewValue['set' + key](preserve[key]);
            });
          }
        }

        // If we have a controller (i.e. ngModelController) then wire it up
        if (controller) {

          // Set the view value in a $apply block when users selects
          // (calling directive user's function too if provided)
          var _onSelect = opts.onSelect || angular.noop;
          opts.onSelect = function (value, picker) {
            scope.$apply(function() {
              showing = true;
              setVal();
              _onSelect(value, picker);
              element.blur();
            });
          };

          var _beforeShow = opts.beforeShow || angular.noop;
          opts.beforeShow = function(input, picker) {
            showing = true;
            _beforeShow(input, picker);
          };

          var _onClose = opts.onClose || angular.noop;
          opts.onClose = function(value, picker) {
            showing = false;
            _onClose(value, picker);
          };
          element.off('blur.datepicker').on('blur.datepicker', function() {
            if ( !showing ) {
              scope.$apply(function() {
                element.datepicker('setDate', element.datepicker('getDate'));
                setVal();
              });
            }
          });

          // Update the date picker when the model changes
          controller.$render = function () {
            var date = controller.$modelValue;
            if ( angular.isDefined(date) && date !== null && !angular.isDate(date) ) {
                if ( angular.isString(controller.$modelValue) ) {
                    date = uiDateConverter.stringToDate(attrs.uiDateFormat, controller.$modelValue);
                } else {
                    throw new Error('ng-Model value must be a Date, or a String object with a date formatter - currently it is a ' + typeof date + ' - use ui-date-format to convert it from a string');
                }
            }
            element.datepicker('setDate', date);
          };
        }
        // Check if the element already has a datepicker.
        if (element.data('datepicker')) {
            // Updates the datepicker options
            element.datepicker('option', opts);
            element.datepicker('refresh');
        } else {
            // Creates the new datepicker widget
            element.datepicker(opts);

            //Cleanup on destroy, prevent memory leaking
            element.on('$destroy', function () {
               element.datepicker('destroy');
            });
        }

        if ( controller ) {
          // Force a render to override whatever is in the input text box
          controller.$render();
        }
      };
      // Watch for changes to the directives options
      scope.$watch(getOptions, initDateWidget, true);
    }
  };
}
])
.factory('uiDateConverter', ['uiDateFormatConfig', function(uiDateFormatConfig){

    function dateToString(dateFormat, value){
        dateFormat = dateFormat || uiDateFormatConfig;
        if (value) {
            if (dateFormat) {
                return jQuery.datepicker.formatDate(dateFormat, value);
            }

            if (value.toISOString) {
                return value.toISOString();
            }
        }
        return null;
    }

    function stringToDate(dateFormat, value) {
        dateFormat = dateFormat || uiDateFormatConfig;
        if ( angular.isString(value) ) {
            if (dateFormat) {
                return jQuery.datepicker.parseDate(dateFormat, value);
            }

            var isoDate = new Date(value);
            return isNaN(isoDate.getTime()) ? null : isoDate;
        }
        return null;
    }

    return {
        stringToDate: stringToDate,
        dateToString: dateToString
    };

}])
.constant('uiDateFormatConfig', '')
.directive('uiDateFormat', ['uiDateConverter', function(uiDateConverter) {
  var directive = {
    require:'ngModel',
    link: function(scope, element, attrs, modelCtrl) {
        var dateFormat = attrs.uiDateFormat;

        // Use the datepicker with the attribute value as the dateFormat string to convert to and from a string
        modelCtrl.$formatters.unshift(function(value) {
            return uiDateConverter.stringToDate(dateFormat, value);
        });

        modelCtrl.$parsers.push(function(value){
            return uiDateConverter.dateToString(dateFormat, value);
        });

    }
  };

  return directive;
}]);

/**
 * @license Angulartics v0.19.2
 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
 * License: MIT
 */
!function(a,b){"use strict";var c=window.angulartics||(window.angulartics={});c.waitForVendorCount=0,c.waitForVendorApi=function(a,b,d,e,f){f||c.waitForVendorCount++,e||(e=d,d=void 0),!Object.prototype.hasOwnProperty.call(window,a)||void 0!==d&&void 0===window[a][d]?setTimeout(function(){c.waitForVendorApi(a,b,d,e,!0)},b):(c.waitForVendorCount--,e(window[a]))},a.module("angulartics",[]).provider("$analytics",function(){var b={pageTracking:{autoTrackFirstPage:!0,autoTrackVirtualPages:!0,trackRelativePath:!1,autoBasePath:!1,basePath:""},eventTracking:{},bufferFlushDelay:1e3,developerMode:!1},d=["pageTrack","eventTrack","setAlias","setUsername","setUserProperties","setUserPropertiesOnce","setSuperProperties","setSuperPropertiesOnce"],e={},f={},g=function(a){return function(){c.waitForVendorCount&&(e[a]||(e[a]=[]),e[a].push(arguments))}},h=function(b,c){return f[b]||(f[b]=[]),f[b].push(c),function(){var c=arguments;a.forEach(f[b],function(a){a.apply(this,c)},this)}},i={settings:b},j=function(a,b){b?setTimeout(a,b):a()},k={$get:function(){return i},api:i,settings:b,virtualPageviews:function(a){this.settings.pageTracking.autoTrackVirtualPages=a},firstPageview:function(a){this.settings.pageTracking.autoTrackFirstPage=a},withBase:function(b){this.settings.pageTracking.basePath=b?a.element(document).find("base").attr("href"):""},withAutoBase:function(a){this.settings.pageTracking.autoBasePath=a},developerMode:function(a){this.settings.developerMode=a}},l=function(c,d){i[c]=h(c,d);var f=b[c],g=f?f.bufferFlushDelay:null,k=null!==g?g:b.bufferFlushDelay;a.forEach(e[c],function(a,b){j(function(){d.apply(this,a)},b*k)})},m=function(a){return a.replace(/^./,function(a){return a.toUpperCase()})},n=function(a){var b="register"+m(a);k[b]=function(b){l(a,b)},i[a]=h(a,g(a))};return a.forEach(d,n),k}).run(["$rootScope","$window","$analytics","$injector",function(b,c,d,e){d.settings.pageTracking.autoTrackFirstPage&&e.invoke(["$location",function(a){var b=!0;if(e.has("$route")){var f=e.get("$route");for(var g in f.routes){b=!1;break}}else if(e.has("$state")){var h=e.get("$state");for(var i in h.get()){b=!1;break}}if(b)if(d.settings.pageTracking.autoBasePath&&(d.settings.pageTracking.basePath=c.location.pathname),d.settings.pageTracking.trackRelativePath){var j=d.settings.pageTracking.basePath+a.url();d.pageTrack(j,a)}else d.pageTrack(a.absUrl(),a)}]),d.settings.pageTracking.autoTrackVirtualPages&&e.invoke(["$location",function(a){d.settings.pageTracking.autoBasePath&&(d.settings.pageTracking.basePath=c.location.pathname+"#"),e.has("$route")&&b.$on("$routeChangeSuccess",function(b,c){if(!c||!(c.$$route||c).redirectTo){var e=d.settings.pageTracking.basePath+a.url();d.pageTrack(e,a)}}),e.has("$state")&&b.$on("$stateChangeSuccess",function(b,c){var e=d.settings.pageTracking.basePath+a.url();d.pageTrack(e,a)})}]),d.settings.developerMode&&a.forEach(d,function(a,b){"function"==typeof a&&(d[b]=function(){})})}]).directive("analyticsOn",["$analytics",function(b){function c(a){return["a:","button:","button:button","button:submit","input:button","input:submit"].indexOf(a.tagName.toLowerCase()+":"+(a.type||""))>=0}function d(a){return c(a),"click"}function e(a){return c(a)?a.innerText||a.value:a.id||a.name||a.tagName}function f(a){return"analytics"===a.substr(0,9)&&-1===["On","Event","If","Properties","EventType"].indexOf(a.substr(9))}function g(a){var b=a.slice(9);return"undefined"!=typeof b&&null!==b&&b.length>0?b.substring(0,1).toLowerCase()+b.substring(1):b}return{restrict:"A",link:function(c,h,i){var j=i.analyticsOn||d(h[0]),k={};a.forEach(i.$attr,function(a,b){f(b)&&(k[g(b)]=i[b],i.$observe(b,function(a){k[g(b)]=a}))}),a.element(h[0]).bind(j,function(d){var f=i.analyticsEvent||e(h[0]);k.eventType=d.type,(!i.analyticsIf||c.$eval(i.analyticsIf))&&(i.analyticsProperties&&a.extend(k,c.$eval(i.analyticsProperties)),b.eventTrack(f,k))})}}}])}(angular);

/**
 * @license Angulartics v0.19.2
 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
 * Google Tag Manager Plugin Contributed by http://github.com/danrowe49
 * License: MIT
 */
!function(a){"use strict";a.module("angulartics.google.tagmanager",["angulartics"]).config(["$analyticsProvider",function(a){a.registerPageTrack(function(a){var b=window.dataLayer=window.dataLayer||[];b.push({event:"content-view","content-name":a})}),a.registerEventTrack(function(a,b){var c=window.dataLayer=window.dataLayer||[];c.push({event:"interaction",target:b.category,action:a,"target-properties":b.label,value:b.value,"interaction-type":b.noninteraction})})}])}(angular);

!function(window,angular,undefined){"use strict";angular.module("angulartics.google.analytics",["angulartics"]).config(["$analyticsProvider",function($analyticsProvider){$analyticsProvider.settings.pageTracking.trackRelativePath=!0,$analyticsProvider.settings.ga={additionalAccountNames:undefined,userId:null},$analyticsProvider.registerPageTrack(function(path){window._gaq&&(_gaq.push(["_trackPageview",path]),angular.forEach($analyticsProvider.settings.ga.additionalAccountNames,function(accountName){_gaq.push([accountName+"._trackPageview",path])})),window.ga&&($analyticsProvider.settings.ga.userId&&ga("set","&uid",$analyticsProvider.settings.ga.userId),ga("send","pageview",path),angular.forEach($analyticsProvider.settings.ga.additionalAccountNames,function(accountName){ga(accountName+".send","pageview",path)}))}),$analyticsProvider.registerEventTrack(function(action,properties){if(properties&&properties.category||(properties=properties||{},properties.category="Event"),properties.value){var parsed=parseInt(properties.value,10);properties.value=isNaN(parsed)?0:parsed}if(window.ga){for(var eventOptions={eventCategory:properties.category,eventAction:action,eventLabel:properties.label,eventValue:properties.value,nonInteraction:properties.noninteraction,page:properties.page||window.location.hash.substring(1)||window.location.pathname,userId:$analyticsProvider.settings.ga.userId},idx=1;20>=idx;idx++)properties["dimension"+idx.toString()]&&(eventOptions["dimension"+idx.toString()]=properties["dimension"+idx.toString()]),properties["metric"+idx.toString()]&&(eventOptions["metric"+idx.toString()]=properties["metric"+idx.toString()]);ga("send","event",eventOptions),angular.forEach($analyticsProvider.settings.ga.additionalAccountNames,function(accountName){ga(accountName+".send","event",eventOptions)})}else window._gaq&&_gaq.push(["_trackEvent",properties.category,action,properties.label,properties.value,properties.noninteraction])}),$analyticsProvider.registerSetUsername(function(userId){$analyticsProvider.settings.ga.userId=userId})}])}(window,window.angular);
//# sourceMappingURL=../dist/angulartics-google-analytics.min.js.map
!function(window,angular,undefined){"use strict";angular.module("angulartics.segment",["angulartics"]).config(["$analyticsProvider",function($analyticsProvider){$analyticsProvider.registerPageTrack(function(path,properties){try{analytics.page(path,properties)}catch(e){if(!(e instanceof ReferenceError))throw e}}),$analyticsProvider.registerEventTrack(function(event,properties,options,callback){try{analytics.track(event,properties,options,callback)}catch(e){if(!(e instanceof ReferenceError))throw e}}),$analyticsProvider.registerSetUserProperties(function(userId,traits,options,callback){try{analytics.identify(userId,traits,options,callback)}catch(e){if(!(e instanceof ReferenceError))throw e}}),$analyticsProvider.registerSetUserPropertiesOnce(function(userId,traits,options,callback){try{analytics.identify(userId,traits,options,callback)}catch(e){if(!(e instanceof ReferenceError))throw e}}),$analyticsProvider.registerSetAlias(function(userId,previousId,options,callback){try{analytics.alias(userId,previousId,options,callback)}catch(e){if(!(e instanceof ReferenceError))throw e}})}])}(window,window.angular);
//# sourceMappingURL=../dist/angulartics-segment.min.js.map
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

var ngAB = angular.module('ngAB', []).value('spec', {});

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

ngAB.service('ABChoices', ['spec', ABChoices]);

function ABChoices(spec) {

    this.get = function() {
        return spec.map(function(test){
            return [test.name, test.cases[0].name];
        });
    };

    this.getString = function() {
        return this.get().map(function(choice) {
            return choice.join("=");
        }).join("&");
    };
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

ngAB.factory('ABInterceptor', ['spec','ABChoices', ngABInterceptor]);

function ngABInterceptor(spec,  ABChoices) {
    // Construct file modification chain spec in form:
    // {'filename': [{change}, {change}, ...], ...}
    var path_mods = spec.reduce(function(pmods, test) {
        // For test in spec, chain changes
        function add_changes(change) {
            pmods[change.file] = (pmods[change.file] || [])
                .concat([change]);
        }
        (test['cases'][0]['changes'] || []).map(add_changes);
        return pmods;
    }, {});

    function elementReplace(data, change) {
        var container = document.createElement('replace-container');
        container.innerHTML = data;
        $(container).find(change.findEle)
            .replaceWith(change.replace);
        return container.innerHTML;
    }

    function elementSwitch(data, change) {
        var container = document.createElement('replace-container');
        container.innerHTML = data;
        var toReplace = $(container).find(change.findEle);
        var children = toReplace.children().detach();
        toReplace.replaceWith(change.switchEle).append(children);
        return container.innerHTML;
    }

    function elementRemove(data, change) {
        var container = document.createElement('replace-container');
        container.innerHTML = data;
        $(container).find(change.removeEle).replaceWith('');
        return container.innerHTML;
    }

    return {
        response: function(response) {
            var mods = path_mods[response.config.url];
            if (!mods) {
                // No test spec for this path
                return response;
            }

            function applyChange(data, change) {
                data += change.append || '';
                if (change.css) {
                    data += '<style>' + change.css + '</style>'
                } else if (change.find && change.replace) {
                    data = data.replace(new RegExp(change.find,
                        change.flags), change.replace)
                } else if (change.findEle && change.replace) {
                    data = elementReplace(data, change);
                } else if (change.findEle && change.switchEle) {
                    data = elementSwitch(data, change);
                } else if (change.removeEle) {
                    data = elementRemove(data, change);
                } else if (change.replaceAll) {
                    data = change.replaceAll;
                }
                return data;
            }

            response.data = mods.reduce(applyChange, response.data);
            return response;
        }
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

ngAB.config(['$httpProvider', ngABConfig]);

function ngABConfig($httpProvider) {
    $httpProvider.interceptors.push('ABInterceptor');
}
/*!
 * viewport-units-buggyfill v0.5.1
 * @web: https://github.com/rodneyrehm/viewport-units-buggyfill/
 * @author: Rodney Rehm - http://rodneyrehm.de/en/
 */

(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.viewportUnitsBuggyfill = factory();
  }
}(this, function () {
  'use strict';
  /*global document, window, navigator, location, XMLHttpRequest, XDomainRequest*/

  var initialized = false;
  var options;
  var userAgent = window.navigator.userAgent;
  var viewportUnitExpression = /([+-]?[0-9.]+)(vh|vw|vmin|vmax)/g;
  var forEach = [].forEach;
  var dimensions;
  var declarations;
  var styleNode;
  var isOldInternetExplorer = false;
  var isOperaMini = userAgent.indexOf('Opera Mini') > -1;

  var isMobileSafari = /(iPhone|iPod|iPad).+AppleWebKit/i.test(userAgent) && (function() {
    // Regexp for iOS-version tested against the following userAgent strings:
    // Example WebView UserAgents:
    // * iOS Chrome on iOS8: "Mozilla/5.0 (iPad; CPU OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) CriOS/39.0.2171.50 Mobile/12B410 Safari/600.1.4"
    // * iOS Facebook on iOS7: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D201 [FBAN/FBIOS;FBAV/12.1.0.24.20; FBBV/3214247; FBDV/iPhone6,1;FBMD/iPhone; FBSN/iPhone OS;FBSV/7.1.1; FBSS/2; FBCR/AT&T;FBID/phone;FBLC/en_US;FBOP/5]"
    // Example Safari UserAgents:
    // * Safari iOS8: "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4"
    // * Safari iOS7: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A4449d Safari/9537.53"
    var iOSversion = userAgent.match(/OS (\d)/);
    // viewport units work fine in mobile Safari and webView on iOS 8+
    return iOSversion && iOSversion.length>1 && parseInt(iOSversion[1]) < 8;
  })();

  var isBadStockAndroid = (function() {
    // Android stock browser test derived from
    // http://stackoverflow.com/questions/24926221/distinguish-android-chrome-from-stock-browser-stock-browsers-user-agent-contai
    var isAndroid = userAgent.indexOf(' Android ') > -1;
    if (!isAndroid) {
      return false;
    }

    var isStockAndroid = userAgent.indexOf('Version/') > -1;
    if (!isStockAndroid) {
      return false;
    }

    var versionNumber = parseFloat((userAgent.match('Android ([0-9.]+)') || [])[1]);
    // anything below 4.4 uses WebKit without *any* viewport support,
    // 4.4 has issues with viewport units within calc()
    return versionNumber <= 4.4;
  })();

  // Do not remove the following comment!
  // It is a conditional comment used to
  // identify old Internet Explorer versions

  /*@cc_on

  @if (@_jscript_version <= 10)
    isOldInternetExplorer = true;
  @end

  @*/

  // added check for IE11, since it *still* doesn't understand vmax!!!
  if (!isOldInternetExplorer) {
    isOldInternetExplorer = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);
  }
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      var callback = function() {
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(callback, wait);
    };
  }

  // from http://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
  function inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  function initialize(initOptions) {
    if (initialized) {
      return;
    }

    if (initOptions === true) {
      initOptions = {
        force: true
      };
    }

    options = initOptions || {};
    options.isMobileSafari = isMobileSafari;
    options.isBadStockAndroid = isBadStockAndroid;

    if (!options.force && !isMobileSafari && !isOldInternetExplorer && !isBadStockAndroid && !isOperaMini && (!options.hacks || !options.hacks.required(options))) {
      // this buggyfill only applies to mobile safari, IE9-10 and the Stock Android Browser.
      return;
    }

    options.hacks && options.hacks.initialize(options);

    initialized = true;
    styleNode = document.createElement('style');
    styleNode.id = 'patched-viewport';
    document.head.appendChild(styleNode);

    // Issue #6: Cross Origin Stylesheets are not accessible through CSSOM,
    // therefore download and inject them as <style> to circumvent SOP.
    importCrossOriginLinks(function() {
      var _refresh = debounce(refresh, options.refreshDebounceWait || 100);
      // doing a full refresh rather than updateStyles because an orientationchange
      // could activate different stylesheets
      window.addEventListener('orientationchange', _refresh, true);
      // orientationchange might have happened while in a different window
      window.addEventListener('pageshow', _refresh, true);

      if (options.force || isOldInternetExplorer || inIframe()) {
        window.addEventListener('resize', _refresh, true);
        options._listeningToResize = true;
      }

      options.hacks && options.hacks.initializeEvents(options, refresh, _refresh);

      refresh();
    });
  }

  function updateStyles() {
    styleNode.textContent = getReplacedViewportUnits();
    // move to the end in case inline <style>s were added dynamically
    styleNode.parentNode.appendChild(styleNode);
  }

  function refresh() {
    if (!initialized) {
      return;
    }

    findProperties();

    // iOS Safari will report window.innerWidth and .innerHeight as 0 unless a timeout is used here.
    // TODO: figure out WHY innerWidth === 0
    setTimeout(function() {
      updateStyles();
    }, 1);
  }

  function findProperties() {
    declarations = [];
    forEach.call(document.styleSheets, function(sheet) {
      if (sheet.ownerNode.id === 'patched-viewport' || !sheet.cssRules || sheet.ownerNode.getAttribute('data-viewport-units-buggyfill') === 'ignore') {
        // skip entire sheet because no rules are present, it's supposed to be ignored or it's the target-element of the buggyfill
        return;
      }

      if (sheet.media && sheet.media.mediaText && window.matchMedia && !window.matchMedia(sheet.media.mediaText).matches) {
        // skip entire sheet because media attribute doesn't match
        return;
      }

      forEach.call(sheet.cssRules, findDeclarations);
    });

    return declarations;
  }

  function findDeclarations(rule) {
    if (rule.type === 7) {
      var value;

      // there may be a case where accessing cssText throws an error.
      // I could not reproduce this issue, but the worst that can happen
      // this way is an animation not running properly.
      // not awesome, but probably better than a script error
      // see https://github.com/rodneyrehm/viewport-units-buggyfill/issues/21
      try {
        value = rule.cssText;
      } catch(e) {
        return;
      }

      viewportUnitExpression.lastIndex = 0;
      if (viewportUnitExpression.test(value)) {
        // KeyframesRule does not have a CSS-PropertyName
        declarations.push([rule, null, value]);
        options.hacks && options.hacks.findDeclarations(declarations, rule, null, value);
      }

      return;
    }

    if (!rule.style) {
      if (!rule.cssRules) {
        return;
      }

      forEach.call(rule.cssRules, function(_rule) {
        findDeclarations(_rule);
      });

      return;
    }

    forEach.call(rule.style, function(name) {
      var value = rule.style.getPropertyValue(name);
      // preserve those !important rules
      if (rule.style.getPropertyPriority(name)) {
        value += ' !important';
      }

      viewportUnitExpression.lastIndex = 0;
      if (viewportUnitExpression.test(value)) {
        declarations.push([rule, name, value]);
        options.hacks && options.hacks.findDeclarations(declarations, rule, name, value);
      }
    });
  }

  function getReplacedViewportUnits() {
    dimensions = getViewport();

    var css = [];
    var buffer = [];
    var open;
    var close;

    declarations.forEach(function(item) {
      var _item = overwriteDeclaration.apply(null, item);
      var _open = _item.selector.length ? (_item.selector.join(' {\n') + ' {\n') : '';
      var _close = new Array(_item.selector.length + 1).join('\n}');

      if (!_open || _open !== open) {
        if (buffer.length) {
          css.push(open + buffer.join('\n') + close);
          buffer.length = 0;
        }

        if (_open) {
          open = _open;
          close = _close;
          buffer.push(_item.content);
        } else {
          css.push(_item.content);
          open = null;
          close = null;
        }

        return;
      }

      if (_open && !open) {
        open = _open;
        close = _close;
      }

      buffer.push(_item.content);
    });

    if (buffer.length) {
      css.push(open + buffer.join('\n') + close);
    }

    // Opera Mini messes up on the content hack (it replaces the DOM node's innerHTML with the value).
    // This fixes it. We test for Opera Mini only since it is the most expensive CSS selector
    // see https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors
    if (isOperaMini) {
      css.push('* { content: normal !important; }');
    }

    return css.join('\n\n');
  }

  function overwriteDeclaration(rule, name, value) {
    var _value;
    var _selectors = [];

    _value = value.replace(viewportUnitExpression, replaceValues);

    if (options.hacks) {
      _value = options.hacks.overwriteDeclaration(rule, name, _value);
    }

    if (name) {
      // skipping KeyframesRule
      _selectors.push(rule.selectorText);
      _value = name + ': ' + _value + ';';
    }

    var _rule = rule.parentRule;
    while (_rule) {
      _selectors.unshift('@media ' + _rule.media.mediaText);
      _rule = _rule.parentRule;
    }

    return {
      selector: _selectors,
      content: _value
    };
  }

  function replaceValues(match, number, unit) {
    var _base = dimensions[unit];
    var _number = parseFloat(number) / 100;
    return (_number * _base) + 'px';
  }

  function getViewport() {
    var vh = window.innerHeight;
    var vw = window.innerWidth;

    return {
      vh: vh,
      vw: vw,
      vmax: Math.max(vw, vh),
      vmin: Math.min(vw, vh)
    };
  }

  function importCrossOriginLinks(next) {
    var _waiting = 0;
    var decrease = function() {
      _waiting--;
      if (!_waiting) {
        next();
      }
    };

    forEach.call(document.styleSheets, function(sheet) {
      if (!sheet.href || origin(sheet.href) === origin(location.href)) {
        // skip <style> and <link> from same origin
        return;
      }

      _waiting++;
      convertLinkToStyle(sheet.ownerNode, decrease);
    });

    if (!_waiting) {
      next();
    }
  }

  function origin(url) {
    return url.slice(0, url.indexOf('/', url.indexOf('://') + 3));
  }

  function convertLinkToStyle(link, next) {
    getCors(link.href, function() {
      var style = document.createElement('style');
      style.media = link.media;
      style.setAttribute('data-href', link.href);
      style.textContent = this.responseText;
      link.parentNode.replaceChild(style, link);
      next();
    }, next);
  }

  function getCors(url, success, error) {
    var xhr = new XMLHttpRequest();
    if ('withCredentials' in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open('GET', url, true);
    } else if (typeof XDomainRequest !== 'undefined') {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open('GET', url);
    } else {
      throw new Error('cross-domain XHR not supported');
    }

    xhr.onload = success;
    xhr.onerror = error;
    xhr.send();
    return xhr;
  }

  return {
    version: '0.5.1',
    findProperties: findProperties,
    getCss: getReplacedViewportUnits,
    init: initialize,
    refresh: refresh
  };

}));

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

var GiftStarterApp = angular.module('GiftStarterApp',
    ['ngRoute', 'ezfb', 'angularPayments', 'ngCookies',  'ngTouch',
        'ngSanitize', 'ngAB', 'ngResource', 'ui.date', 'gsAngulartics']);

angular.module('GiftStarterApp').service('AppStateService', [
            '$location','$window','$rootScope',
    function($location,  $window,  $rootScope) {

        var self = this;
        var state = {};

        this.set = set;
        this.get = get;
        this.remove = remove;

        function set(key, value) {state[key] = value}
        function get(key) {return state[key]}
        function remove(key) {delete state[key]}

        this.base64State = base64State;
        this.base64StateForSharing = base64StateForSharing;
        this.getOauthRedirectUrl = getOauthRedirectUrl;
        this.getOauthRedirectUrlForSharing = getOauthRedirectUrlForSharing;
        this.overlayState = overlayState;
        this.thanksState = thanksState;

        this.path = $location.path();

        // Remove OAuth params
        $location.search('code', null);
        $location.search('oauth_verifier', null);
        $location.search('oauth_token', null);
        $location.search('authuser', null);
        $location.search('num_sessions', null);
        $location.search('session_state', null);
        $location.search('prompt', null);

        // Remove FB OAuth fragment
        if ($location.hash() == '_=_') {
            $location.hash('');
        }

        function getOauthRedirectUrl() {
            return $window.location.protocol + '//' + $window.location.host
                + '/?state=' + self.base64State();
        }

        function getOauthRedirectUrlForSharing() {
            return $window.location.protocol + '//' + $window.location.host
                + '/?state=' + self.base64State(true);
        }

        function base64StateForSharing() {
            return base64State(true)
        }

        // Returns encoded app state for persisting across OAuth transitions
        function base64State(isSharingLogin) {
            state.path = window.location.pathname; //self.path;
            if(window.location.hash!="" && window.location.hash!="#") {
                state.hash = window.location.hash.slice(1);
            }
            state.app_url = $window.location.protocol + '//' + $window.location.host + '/';
            state.is_sharing_login = isSharingLogin?1:0;
            state.prior_uid = $rootScope.uid;
            state.prior_token = $rootScope.token;
            console && console.log && console.log('encoding state', state);
            return btoa(JSON.stringify(state));
        }

        this.setPath = function(path) {self.path = path};

        function overlayState(selectedParts) {
            set('selectedParts', selectedParts);
        }

        function thanksState(thanksData) {
            set('thanks', thanksData);
        }

        if ($location.search().state) {
            state = JSON.parse($window.atob($location.search()['state']));
            console && console.log && console.log('parsed state', state);
            $location.search('state', null);
            if (state.title_url) {
                $location.path('/giftstart/' + state.title_url);
            } else if (state.path) {
                $location.path(state.path);
                if (state.hash) {
                    $location.hash(state.hash);
                }
            }
            $rootScope.$broadcast('state-parsed');
        }

        if ($location.search().code && $location.search().session_state && $location.search().authuser) {
            // Handle non-FB oauth
            // Make object for authResponse
            self.gplusAuthResponse = (function(a) {
                if (a == "") return {};
                var b = {};
                for (var i = 0; i < a.length; ++i)
                {
                    var p=a[i].split('=');
                    if (p.length != 2) continue;
                    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
                }
                return b;
            })($window.location.search.substr(1).split('&'));
            $location.search('code', null);
            $location.search('session_state', null);
            $location.search('authuser', null);
            $location.search('num_sessions', null);
            $location.search('prompt', null);
        } else if (/access_token/.test($location.hash())) {
            // Handle FB oauth
            self.fbAuthResponse = (function(a) {
                if (a == "") return {};
                var b = {};
                for (var i = 0; i < a.length; ++i)
                {
                    var p=a[i].split('=');
                    if (p.length != 2) continue;
                    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
                }
                return b;
            })($location.hash().split('&'));
            $location.hash('');
        }

        // Delete tracking url as soon as it is seen
        if ($location.search().re) {
            set('referrer', JSON.parse(atob($location.search().re)));
            $location.search('re', null);
        }

        //delete API key
        if ($location.search().public_key) {
            set('api_key', $location.search().public_key);
            $location.search('public_key', null);
        }


        if ($location.search().source && $location.search().title &&
            $location.search().product_url) {
            set('referrer', {
                type: 'partner',
                channel: $location.search().source.replace("shopify/", ""),
                uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                    function(c) {
                        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    }
                )
            });
            this.giftstartReferralData = $location.search();
        }

    }
]);


/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.config(['$routeProvider','$locationProvider','$httpProvider',
    appConfig]);
GiftStarterApp.config(['ezfbProvider', '$httpProvider', facebookConfig]);

function appConfig($routeProvider,  $locationProvider,  $httpProvider) {
    $routeProvider
        .when('/',
        {templateUrl: '/scripts/home/home.html', reloadOnSearch: false})
        .when('/yourvillage',
        {templateUrl: '/views/yourvillage/yourvillage.html', reloadOnSearch: false})
        .when('/test',
        {templateUrl: '/views/home/home.html', reloadOnSearch: false})
        .when('/create',
        {templateUrl: '/scripts/giftstart/create/giftstart-create.html', reloadOnSearch: false})
        .when('/giftstart',
        {templateUrl: '/scripts/giftstart/giftstart.html', reloadOnSearch: false})
        .when('/giftstart/:title',
        {templateUrl: '/scripts/giftstart/giftstart.html', reloadOnSearch: false})
        .when('/giftstart/:title/:object/:attr',
        {templateUrl: '/scripts/giftstart/giftstart.html', reloadOnSearch: false})
        .when('/giftstart/:title/print',
        {templateUrl: '/scripts/giftstart/print/print.html', reloadOnSearch: false})
        .when('/login',
        {templateUrl: '/views/login/login.html', reloadOnSearch: false})
        .when('/join',
        {templateUrl: '/views/join/join.html', reloadOnSearch: false})
        .when('/is',
        {templateUrl: '/views/is/is.html', reloadOnSearch: false})
        .when('/users/:uid',
        {templateUrl: '/scripts/user/user_profile.html', reloadOnSearch: false})
        .when('/user/:uid',
        {templateUrl: '/scripts/user/user_profile.html', reloadOnSearch: false})
        .when('/about',
        {templateUrl: '/scripts/static-pages/about/about.html', reloadOnSearch: false})
        .when('/concierge',
        {templateUrl: '/scripts/static-pages/concierge/concierge.html', reloadOnSearch: false})
        .when('/faq',
        {templateUrl: '/scripts/static-pages/faq/faq.html', reloadOnSearch: false})
        .when('/howitworks',
        {templateUrl: '/scripts/static-pages/howitworks/howitworks.html', reloadOnSearch: false})
        .when('/oldbrowser',
        {templateUrl: '/scripts/static-pages/oldbrowser/oldbrowser.html', reloadOnSearch: false})
        .when('/partners',
        {templateUrl: '/scripts/static-pages/partners/partners.html', reloadOnSearch: false})
        .when('/portal',
        {templateUrl: '/scripts/partnerportal/partnerportal.html', reloadOnSearch: false})
        .when('/press',
        {templateUrl: '/scripts/static-pages/press/press.html', reloadOnSearch: false})
        .when('/terms',
        {templateUrl: '/scripts/static-pages/terms/terms.html', reloadOnSearch: false})
        .when('/privacy',
        {templateUrl: '/scripts/static-pages/privacy/privacy.html', reloadOnSearch: false})
        .when('/what-is-it',
        {templateUrl: '/scripts/static-pages/about/about.html', reloadOnSearch: false})
        .when('/add-the-button',
        {templateUrl: '/scripts/partnerportal/partnerportal.html'})
        .when('/reset/:resetCode',
        {templateUrl: '/scripts/home/home.html', reloadOnSearch: false})
        .when('/search/:searchTerm',
        {templateUrl: '/scripts/home/home.html', reloadOnSearch: false})
        .when('/search/',
        {templateUrl: '/scripts/static-pages/giftideas/giftideas.html', reloadOnSearch: false})
        .when('/giftideas',
        {templateUrl: '/scripts/static-pages/giftideas/giftideas.html', reloadOnSearch: false})
        .when('/giftideas/:term*',
        {templateUrl: '/scripts/static-pages/giftideas/giftideas.html', reloadOnSearch: false})
        .when('/:path*', {
            controller: 'ContentRouteController',
            reloadOnSearch: false,
            template: '<ng-include ng-show="error" src="\'/scripts/four-oh-four.ng.html\'"></ng-include><div id="wp-content" ng-bind-html="content"></div>'
        })
        .otherwise({redirectTo: '/'});

    $locationProvider.hashPrefix('!').html5Mode({enabled: true});
	$locationProvider.html5Mode(true);

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}

function facebookConfig(ezfbProvider, $httpProvider) {
    ezfbProvider.setInitParams({appId: window.fbAppId});
}

GiftStarterApp.controller('ContentRouteController', contentRouteController);

function contentRouteController($scope, $routeParams, $http, $sce, $window) {
//    $scope.templateUrl = '';
//    var baseUrl = '/blog/'; //content.giftstarter.com/';
    function onRouteUpdate() {
//        $scope.templateUrl = baseUrl + $routeParams.path;
//        $scope.error = false;
//        $http.get($scope.templateUrl).success(function(response) {
//            $scope.content = $sce.trustAsHtml(extractMain(response));
//            $scope.error = false;
//        }).error(function(){
            $scope.content = '';
            $scope.error = true;
//        });
    }

//    var re = new RegExp('content.giftstarter.com', 'g');
//    function replaceLink(ele) {
//        ele.host = ele.host.replace(re, $window.location.host);
//    }

//    function replaceAnchorLinks(ele) {
//        var anchors = ele.querySelectorAll('a');
//        Array.prototype.slice.call(anchors).forEach(replaceLink);
//        return ele;
//    }

    function extractMain(html) {
        return $(html).find('.site-inner').html()+'<link rel="stylesheet" id="open-sans-css" href="//fonts.googleapis.com/css?family=Open+Sans%3A300italic%2C400italic%2C600italic%2C300%2C400%2C600&amp;subset=latin%2Clatin-ext&amp;ver=4.1" type="text/css" media="all"><link rel="stylesheet" id="dashicons-css" href="http://content.giftstarter.com/wp-includes/css/dashicons.min.css?ver=4.1" type="text/css" media="all"><link rel="stylesheet" id="admin-bar-css" href="http://content.giftstarter.com/wp-includes/css/admin-bar.min.css?ver=4.1" type="text/css" media="all"><link rel="stylesheet" id="menu-image-css" href="http://content.giftstarter.com/wp-content/plugins/menu-image/menu-image.css?ver=1.1" type="text/css" media="all"><!--link rel="stylesheet" id="googlefonts-css" href="http://fonts.googleapis.com/css?family=Roboto+Condensed:400&amp;subset=latin" type="text/css" media="all"--><link rel="stylesheet" id="omega-style-css" href="http://content.giftstarter.com/wp-content/themes/omega/style.css?ver=4.1" type="text/css" media="all"><link rel="stylesheet" id="footer-credits-css" href="http://content.giftstarter.com/wp-content/plugins/footer-putter/styles/footer-credits.css?ver=1.11" type="text/css" media="all">';
        /*
        var container = document.createElement('div'),
            bodyTags,
            result;
        container.innerHTML = html;
        bodyTags = container.querySelector('main');
        //console && console.log && console.log(replaceAnchorLinks(bodyTags));
        if (bodyTags == null) {
            result = html;
            console && console.log && console.log('html: ',html);
        } else if (bodyTags.length > 0) {
            result = bodyTags.innerHTML;
        } else if (bodyTags.hasOwnProperty('innerHTML')) {
            result = bodyTags.innerHTML;
        } else {
            result = html;
        }
        container = null;
        return result;
        */
    }
    $scope.$on('$routeChangeSuccess', onRouteUpdate);
    onRouteUpdate();
}

angular.module('GiftStarterApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/views/home/home.html',
    "We will be moving all views out of scripts and into views. In due time."
  );


  $templateCache.put('/views/is/is.html',
    "<div class=\"howitworks static-pages\" ng-controller=\"HowItWorksController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>Crowdfunding for Gifts</h1>\n" +
    "    <p>Let us tell you a bit more about how it works.<br />GiftStarter is the place to give and get meaningful gifts. Gift and pay for ANY product or service TO anyone WITH anyone.</p>\n" +
    "    <a class=\"button red\" target=\"_blank\" href=\"/concierge\">ASK A QUESTION</a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main\">\n" +
    "    <div class=\"menu\">\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'welcome'\" ng-class=\"{selected: sectionShown == 'welcome'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          WELCOME\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'group-gifting'\" ng-class=\"{selected: sectionShown == 'group-gifting'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          GROUP GIFTING\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'concierge'\" ng-class=\"{selected: sectionShown == 'concierge'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          GIFT CONCIERGE\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'search'\" ng-class=\"{selected: sectionShown == 'search'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          FIND A GIFT\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'glossary'\" ng-class=\"{selected: sectionShown == 'glossary'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          GLOSSARY\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"selector-bar\"></div>\n" +
    "\n" +
    "    <div class=\"content\">\n" +
    "      <div id=\"welcome\" ng-show=\"sectionShown == 'welcome'\">\n" +
    "        <h2>Welcome to GiftStarter!</h2>\n" +
    "        <h4>Start amazing gifts here -- ones you are proud to give, and they're happy to get.</h4>\n" +
    "        <p class=\"sub\">\n" +
    "          GiftStarter is the best way to bring family and friends together to give an amazing gift. You start it -- and we help you with the rest. When you use GiftStarter, you don't have to collect the money or chase people down for cash.<br />It only takes a couple minutes to launch a campaign for your gift.\n" +
    "          <br />Start an amazing gift today! Once it is complete, we handle ensuring the card with everyone's messages and the gift is shipped!\n" +
    "        </p>\n" +
    "      </div>\n" +
    "      <div id=\"glossary\" ng-show=\"sectionShown == 'glossary'\">\n" +
    "        <h2>Giftstarter Glossary</h2>\n" +
    "        <h4>GiftStarter is a new gifting movement bringing people committed to giving amazing gifts.</h4>\n" +
    "        <p class=\"sub\">\n" +
    "          Here's a glossary of gifting words to help you in our gifting community:\n" +
    "        </p>\n" +
    "        <table>\n" +
    "          <tr>\n" +
    "            <td>GiftStarter - n.</td>\n" +
    "            <td>That's us! We are here to help you give amazing gifts you are proud to give, and they are happy to get.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Gift Champion - n.</td>\n" +
    "            <td>This is a person (you!) that starts an amazing gift, and invites family and friends to pitch in.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Contributor - n.</td>\n" +
    "            <td>The people invited in by the Gift Champion to pitch in on the amazing gift and sign the card.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Recipient - n.</td>\n" +
    "            <td>The person(s) that receive the amazing gift!</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Gift Concierge - n.</td>\n" +
    "            <td>Our Gift Concierge is like your personal shopper who will help you find and give that amazing gift.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Nudge - n, v.</td>\n" +
    "            <td>These are the gentle friendly reminders (nudges) we make in order to help ensure your gifting event is amazing.</td>\n" +
    "          </tr>\n" +
    "        </table>\n" +
    "      </div>\n" +
    "      <div id=\"search\" ng-show=\"sectionShown == 'search'\">\n" +
    "        <h2>Find an Amazing Gift</h2>\n" +
    "        <h4>GiftStarter helps you give amazing gifts you are proud to give and they are happy to get.</h4>\n" +
    "        <p class=\"sub\">GiftStarter has the tools to help you find those gifts you’re proud to give, and they’re happy to get.</p>\n" +
    "        <div class=\"search-item\">\n" +
    "          <div class=\"desc\">\n" +
    "            <p>SEARCH</p>\n" +
    "            <p>Use our search bar located at the top of the page and on the home page to search for products by name or brand. We source our gifts from reliable stores such as:</p>\n" +
    "          </div>\n" +
    "          <img src=\"/assets/howitworks/how-it-works-findagift-1.png\" />\n" +
    "        </div>\n" +
    "        <div class=\"search-item\">\n" +
    "          <div class=\"desc\">\n" +
    "            <p>GIFT CONCIERGE</p>\n" +
    "            <p>Our Gift Concierge is like you personal shopping assistant who will help you find the perfect gift for the occassion - even if it’s not on our site!</p>\n" +
    "          </div>\n" +
    "          <div id=\"search-item-concierge\">\n" +
    "            <p>You can <a href=\"mailto:giftconcierge@giftstarter.com\">email</a> (giftconcierge@giftstarter.com), contact via <a href=\"javascript:void(0);\" onclick=\"olark('api.box.expand')\">chat</a>, or call  206.486.4849</p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"search-item\">\n" +
    "          <div class=\"desc\">\n" +
    "            <p>GIFT IDEAS</p>\n" +
    "            <p>More of a browser when you shop? Our carefully curated gift ideas are a great place to see what new and exciting products there are to gift.</p>\n" +
    "          </div>\n" +
    "          <img src=\"/assets/howitworks/how-it-works-findagift-2.png\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div id=\"concierge\" ng-show=\"sectionShown == 'concierge'\">\n" +
    "        <h2>Gift Concierge</h2>\n" +
    "        <h4>Fast, fun, and no pressure personal shopper to help you find that perfect gift. Can't find it? We can help. Can't think of an idea? We can help.</h4>\n" +
    "        <p class=\"sub\">We'll get back to you same day if possible -- definitely within 24 hours.</p>\n" +
    "        <div class=\"concierge-table\">\n" +
    "          <div class=\"concierge-item\">\n" +
    "            <p>EMAIL<br/><br/>\n" +
    "              Send us an email at any time. The more information you include about your need, the more we can help!<br/><br/><br/>\n" +
    "              <a href=\"mailto:giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a>\n" +
    "            </p>\n" +
    "          </div>\n" +
    "          <div class=\"concierge-item\">\n" +
    "            <p>LIVE CHAT<br/><br/>\n" +
    "              You can access our live chat program in the bottom right corner of your browser.<br/><br/>\n" +
    "              <a href=\"javascript:void(0);\" onclick=\"olark('api.box.expand')\">Don't see it?</a><br/><br/>\n" +
    "              *Live chat available during business hours (PST)\n" +
    "            </p>\n" +
    "          </div>\n" +
    "          <div class=\"concierge-item\">\n" +
    "            <p>ONLINE FORM<br/><br/>\n" +
    "              Fill out the quick form about your gifting need and we'll get on it ASAP!<br/><br/><br/>\n" +
    "              <a href=\"/concierge\" class=\"button\">ONLINE FORM</a>\n" +
    "            </p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <p>Or you can just plain call us: 206-486-4849.</p>\n" +
    "      </div>\n" +
    "      <div id=\"group-gifting\" ng-show=\"sectionShown == 'group-gifting'\">\n" +
    "        <h2>Group Gifting Starts Here</h2>\n" +
    "        <h4>GiftStarter is a new gifting movement focused on bringing people together in a community that loves giving amazing gifts.<br/></h4>\n" +
    "        <p class=\"sub\">Our patent-pending technology divides the price of the gift into perfect pieces, giving family and friends the ability to purchases as many or as few pieces as they wish! Any product available online can be gifted with GiftStarter, and we’re here to help every step of the way. From collecting the money to shipping the gift - and even creating a special card with your personal messages - we’ve got you covered!<br/></p>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-1.png\" />\n" +
    "          <p class=\"center\"><strong>1</strong><br/>FIND A GIFT</p><p>Search from over 3 million products on our site. You can also discover our favorite gifts on our Gift Ideas page or contact our Gift Concierge for custom gifts.</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-2.png\" />\n" +
    "          <p class=\"center\"><strong>2</strong><br/>SELECT A GIFT</p><p>From the search results or Gift Ideas page, you can click on product images to view product information and details, and the “GiftStart it” button. Click this button to start your group gift!</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-3.png\" />\n" +
    "          <p class=\"center\"><strong>3</strong><br/>ADJUST THE PIECES</p><p>Click the “+” to add pieces, thus lowering the price of each piece. Click the “-” button to remove pieces, and increase the price of each piece. Consider the size of the group you’ll invite; some people will buy 1 piece, some may buy more.</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-4.png\" />\n" +
    "          <p class=\"center\"><strong>4</strong><br/>YOUR GIFTING EVENT</p><p>Describe the reason for this gift. What’s the event? Who is it for? Why is this a good gift for this person and/or event?</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-5.png\" />\n" +
    "          <p class=\"center\"><strong>5</strong><br/>THE GIFT</p><p>Tell us where this gift needs to go and when you want it there and we’ll make it happen! <br />*Note standard shipping is always free with GiftStarter</p>\n" +
    "        </div>\n" +
    "        <p class=\"clear sub\">That’s all there is to it. Share and invite friends and family to purchase pieces and give a gift that shows how much you care. We’re here to help you at any time and to ensure the gift and personal card are delivered. <br /><br />Give a remarkable gift today.</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"clear\">\n" +
    "      <a href=\"/giftideas\" alt=\"\" class=\"button\" id=\"gifting-button\">START GIFTING</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <hr />\n" +
    "\n" +
    "    <h2>Inspiring Examples</h2>\n" +
    "    <ng-include src=\"'/scripts/inspirationalexamples/inspirationalexamples.ng.html'\"></ng-include>\n" +
    "  </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/views/join/join-form.html',
    "<div class=\"userlogin__form\">\n" +
    "    <h4>Create account with email address:</h4>\n" +
    "    <form ng-submit=\"$parent.doCreateEmail()\" class=\"create_action\">\n" +
    "        <input class=\"userlogin__name\" type=\"text\" name=\"name\" ng-model=\"$parent.name\" placeholder=\"First Name\" required /><br/>\n" +
    "        <input class=\"userlogin__surname\" type=\"text\" name=\"surname\" ng-model=\"$parent.surname\" placeholder=\"Last Name\" required /><br/>\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Email Address\" required /><br/>\n" +
    "        <div class=\"userlogin__passwordwrap\"><input ng-hide=\"$parent.showPassword\" class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required /><input ng-show=\"$parent.showPassword\" class=\"userlogin__password\" type=\"text\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required /><div class=\"userlogin__eye\" ng-click=\"$parent.showPassword=!$parent.showPassword\"></div></div>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "\t\t<button class=\"userlogin__loginbtn create_action ui right labeled icon button\" ng-class=\"$parent.working ? 'loading' : 'secondary'\" ng-disabled=\"$parent.working\">\n" +
    "  \t\t<i class=\"right arrow icon\"></i>\n" +
    "  \t\tCreate Account\n" +
    "\t\t</button>\n" +
    "    </form>\n" +
    "</div>\n"
  );


  $templateCache.put('/views/join/join.html',
    "<div class=\"userlogin\" ng-controller=\"LoginOrCreateController\">\n" +
    "    <div class=\"userlogin__emaillogin login-block\" ng-show=\"showCreate\">\n" +
    "        <ng-include src=\"'/views/join/join-form.html'\"></ng-include>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showSocials\">\n" +
    "            <span>Already have an account? </span>\n" +
    "            <span><a ng-href=\"/login\" class=\"userlogin__createacclink linky\">Login</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"vertical-line-block\">\n" +
    "        <div class=\"vertical-line\" ng-show=\"showSocials\"/>\n" +
    "    </div>\n" +
    "    <div class=\"userlogin__sociallogin login-block\" ng-show=\"showSocials\">\n" +
    "        <h4>Or {{showCreate?\"create account\":\"login\"}} with social media:</h4>\n" +
    "        <div class=\"social\">\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginFacebook()\"><img class=\"social__icons\" src=\"/assets/login/facebook.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginTwitter()\"><img class=\"social__icons\" src=\"/assets/login/twitter.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginLinkedin()\"><img class=\"social__icons\" src=\"/assets/login/linkedin.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginGoogleplus()\"><img class=\"social__icons\" src=\"/assets/login/google.png\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showCreate\">\n" +
    "            <span>Don't have an account? </span>\n" +
    "           <span><a ng-click=\"showCreate=true; resetForm();\" class=\"userlogin__createacclink linky\">Create</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<script>\n" +
    "    function handlePopupClosed() {\n" +
    "        angular.element(document.getElementById('shareControllerWrapper')).scope().refreshPermissionsStatus();\n" +
    "    }\n" +
    "</script>"
  );


  $templateCache.put('/views/join/onboard.html',
    "<!--\n" +
    "To change this template use Tools | Templates.\n" +
    "-->\n" +
    "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n" +
    "<html>\n" +
    "<head>\n" +
    "    <title></title>\n" +
    "</head>\n" +
    "<body>\n" +
    "\n" +
    "</body>\n" +
    "</html>"
  );


  $templateCache.put('/views/login/login-form.html',
    "<div class=\"userlogin__form\" ng-hide=\"$parent.showForgot || $parent.showReset\">\n" +
    "    <h4>Login with your email address:</h4>\n" +
    "    <form ng-submit=\"$parent.doLoginEmail()\" class=\"login_action\">\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Enter your email address\" required />\n" +
    "        <div class=\"userlogin__passwordwrap\"><input class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Enter your password\" required></div>\n" +
    "        <a class=\"userlogin__forgot linky\" ng-click=\"$parent.showForgot=true\">Forgot password</a>\n" +
    "        <div class=\"userlogin__wrapper\">\n" +
    "            <!--<input class=\"userlogin__remember\" type=\"checkbox\" name=\"remember\" id=\"remember\">-->\n" +
    "        </div>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "\t\t<button class=\"userlogin__loginbtn ui right labeled icon button\" ng-class=\"$parent.working ? 'loading' : 'secondary'\" ng-disabled=\"$parent.working\">\n" +
    "  \t\t<i class=\"right arrow icon\"></i>\n" +
    "  \t\tLogin\n" +
    "\t\t</button>\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"userlogin__form\" ng-show=\"$parent.showForgot\">\n" +
    "    <form ng-submit=\"$parent.doForgotPassword()\">\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Enter your email address\" required />\n" +
    "        <a class=\"userlogin__forgot linky\" ng-click=\"$parent.showForgot=false\">Cancel</a>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "        <button class=\"userlogin__loginbtn\" ng-disabled=\"$parent.working\">Get Password</button>\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"userlogin__form\" ng-show=\"$parent.showReset\">\n" +
    "    <h4>Reset Your Password:</h4>\n" +
    "    <form ng-submit=\"$parent.doResetPassword()\">\n" +
    "        <input class=\"userlogin__email\" type=\"hidden\" name=\"resetcode\" ng-model=\"$parent.resetCode\" placeholder=\"Enter the reset code\" required />\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Enter your email address\" required />\n" +
    "        <div class=\"userlogin__passwordwrap\"><input ng-hide=\"$parent.showPassword\" class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Enter a New Password\" required /><input ng-show=\"$parent.showPassword\" class=\"userlogin__password\" type=\"text\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required /><div class=\"userlogin__eye\" ng-click=\"$parent.showPassword=!$parent.showPassword\"></div></div>\n" +
    "        <!--<input class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.reenterpassword\" placeholder=\"Re-enter the Password\" required>-->\n" +
    "        <a class=\"userlogin__forgot linky\" ng-click=\"$parent.showReset=false\">Cancel</a>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "        <button class=\"userlogin__loginbtn red\" ng-disabled=\"$parent.working\">Change Password</button>\n" +
    "    </form>\n" +
    "</div>"
  );


  $templateCache.put('/views/login/login.html',
    "<div class=\"userlogin\" ng-controller=\"LoginOrCreateController\">\n" +
    "    <div class=\"userlogin__emaillogin login-block\" ng-show=\"showCreate\">\n" +
    "        <ng-include src=\"'/views/login/login-form.html'\"></ng-include>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showSocials\">\n" +
    "            <span>Don't have an account? </span>\n" +
    "           <span><a ng-click=\"showCreate=true; resetForm();\" class=\"userlogin__createacclink linky\">Create</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"vertical-line-block\">\n" +
    "        <div class=\"vertical-line\" ng-show=\"showSocials\"/>\n" +
    "    </div>\n" +
    "    <div class=\"userlogin__sociallogin login-block\" ng-show=\"showSocials\">\n" +
    "        <h4>Or {{showCreate?\"create account\":\"login\"}} with social media:</h4>\n" +
    "        <div class=\"social\">\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginFacebook()\"><img class=\"social__icons\" src=\"/assets/login/facebook.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginTwitter()\"><img class=\"social__icons\" src=\"/assets/login/twitter.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginLinkedin()\"><img class=\"social__icons\" src=\"/assets/login/linkedin.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginGoogleplus()\"><img class=\"social__icons\" src=\"/assets/login/google.png\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showCreate\">\n" +
    "            <span>Don't have an account? </span>\n" +
    "           <span><a ng-href=\"/join\" class=\"userlogin__createacclink linky\">Join</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<script>\n" +
    "    function handlePopupClosed() {\n" +
    "        angular.element(document.getElementById('shareControllerWrapper')).scope().refreshPermissionsStatus();\n" +
    "    }\n" +
    "</script>"
  );


  $templateCache.put('/views/yourvillage/yourvillage.html',
    "<style>\n" +
    "    footer .footblock .logo {\n" +
    "        margin-left: auto;\n" +
    "        margin: 30px auto 0;\n" +
    "    }\n" +
    "    @media screen and (max-width: 1030px) {\n" +
    "        footer .footblock .footcol.joinus {\n" +
    "            margin: 0 6%;\n" +
    "            width: auto;\n" +
    "        }\n" +
    "        footer .footblock.left {\n" +
    "            margin-bottom: 0;\n" +
    "        }\n" +
    "    }\n" +
    "    .main.yourvillage {\n" +
    "        padding-top: 47px;\n" +
    "    }\n" +
    "    .hello-bar {\n" +
    "        padding: 10px;\n" +
    "        width: 100%;\n" +
    "        text-transform: uppercase;\n" +
    "        border-bottom: 1px solid #e2e2e2;\n" +
    "        z-index: 10;\n" +
    "    }\n" +
    "    .hello-bar a {\n" +
    "        color:#E44028;\n" +
    "    }\n" +
    "    .product-tab .container {\n" +
    "        padding-left: 15px;\n" +
    "        padding-right: 15px;\n" +
    "    }\n" +
    "    .h1, .h2, .h3, .h4, .h5 {\n" +
    "        text-transform: none;\n" +
    "    }\n" +
    "    .newsletter {\n" +
    "        padding-top: 55px;\n" +
    "        padding-bottom: 55px;\n" +
    "    }\n" +
    "    .newsletter p {\n" +
    "        margin-bottom: 20px;\n" +
    "    }\n" +
    "    .newsletter-form .form-group {\n" +
    "        width: 85%;\n" +
    "    }\n" +
    "    .newsletter-form .form-control {\n" +
    "        font-size: 16px;\n" +
    "        padding: 25px;\n" +
    "        margin: 0;\n" +
    "    }\n" +
    "    .newsletter-form a {\n" +
    "        text-decoration: underline;\n" +
    "        color: white;\n" +
    "    }\n" +
    "    .newsletter-form a {\n" +
    "        color: #fff;\n" +
    "    }\n" +
    "    .newsletter-form .btn a {\n" +
    "        text-decoration: none;\n" +
    "    }\n" +
    "    .newsletter-form h3 {\n" +
    "        margin-bottom: 0;\n" +
    "    }\n" +
    "    .newsletter-form .btn {\n" +
    "        width: auto;\n" +
    "    }\n" +
    "    .thumb-item-img a:hover {\n" +
    "        color: #333;\n" +
    "    }\n" +
    "    @media screen and (max-width: 360px) {\n" +
    "        [class*=\"col-xs\"] {\n" +
    "            float: left;\n" +
    "        }\n" +
    "        .col-xs-6 {\n" +
    "            width: 50% !important;\n" +
    "        }\n" +
    "    }\n" +
    "</style>\n" +
    "<div class=\"ui grey one item menu top fixed\">\n" +
    "    <div class=\"active item\">\n" +
    "        Questions? Call Us: <span class=\"contactNumber\"></span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"ui grid stackable providence container\">\n" +
    "    <div class=\"sixteen wide column\">\n" +
    "        <img class=\"ui fluid centered medium image\" src=\"/assets/webLogo.png\">\n" +
    "        <div class=\"ui center aligned huge header\">Create a GiftStarter Campaign and Easily:</div>\n" +
    "        <div class=\"ui big list\">\n" +
    "            <div class=\"item\">\n" +
    "                <i class=\"check square icon red\"></i>\n" +
    "                <div class=\"content\">Break any product or service into affordable pieces.</div>\n" +
    "            </div>\n" +
    "            <div class=\"item\">\n" +
    "                <i class=\"check square icon red\"></i>\n" +
    "                <div class=\"content\">Get support from family &amp; friends.</div>\n" +
    "            </div>\n" +
    "            <div class=\"item\">\n" +
    "                <i class=\"check square icon red\"></i>\n" +
    "                <div class=\"content\">Save time and money when it matters most.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"ui grid stackable container\">\n" +
    "    <div class=\"sixteen wide column\">\n" +
    "        <h1 class=\"ui center aligned header\">\n" +
    "                Get The Help You Need\n" +
    "                <div class=\"sub header\">Not quite sure what will make your life easier? We have teamed up with Providence &amp; YourVillage to provide a few suggestions based on what other mothers have found useful.</div>\n" +
    "            </h1>\n" +
    "        <div class=\"ui two column grid\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"column\">\n" +
    "                    <div class=\"ui fluid brown card\">\n" +
    "                        <a class=\"image\" href=\"https://www.giftstarter.com/giftideas/abcdoula\">\n" +
    "                            <img src=\"images/products/abcdoula.png\">\n" +
    "                        </a>\n" +
    "                        <div class=\"content\">\n" +
    "                            <a class=\"header center aligned\" href=\"https://www.giftstarter.com/giftideas/abcdoula\">ABC Doula</a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"column\">\n" +
    "                    <div class=\"ui fluid olive card\">\n" +
    "                        <a class=\"image\" href=\"https://www.giftstarter.com/giftideas/lishfood\">\n" +
    "                            <img src=\"images/products/lishfood.png\">\n" +
    "                        </a>\n" +
    "                        <div class=\"content\">\n" +
    "                            <a class=\"header center aligned\" href=\"https://www.giftstarter.com/giftideas/lishfood\">Lish</a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"column\">\n" +
    "                    <div class=\"ui fluid yellow card\">\n" +
    "                        <a class=\"image\" href=\"https://www.giftstarter.com/giftideas/farmtofit\">\n" +
    "                            <img src=\"images/products/farmtofit.png\">\n" +
    "                        </a>\n" +
    "                        <div class=\"content\">\n" +
    "                            <a class=\"header center aligned\" href=\"https://www.giftstarter.com/giftideas/farmtofit\">Farm To Fit</a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"column\">\n" +
    "                    <div class=\"ui fluid teal card\">\n" +
    "                        <a class=\"image\" href=\"https://www.giftstarter.com/giftideas/fullbellyfare\">\n" +
    "                            <img src=\"images/products/fullbellyfare.png\">\n" +
    "                        </a>\n" +
    "                        <div class=\"content\">\n" +
    "                            <a class=\"header center aligned\" href=\"https://www.giftstarter.com/giftideas/fullbellyfare\">Full Belly Fare</a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"ui grid stackable container\">\n" +
    "    <div class=\"sixteen wide column\">\n" +
    "        <div class=\"ui attached segment\">\n" +
    "            <div class=\"ui header huge centered\">\n" +
    "                We're here to help.\n" +
    "                <div class=\"sub header\">\n" +
    "                    Our \"Mommy Happiness\" specialist are always here to help. Give us a call or send us an email.\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"ui two bottom attached buttons\">\n" +
    "            <a class=\"ui grey button\" href=\"mailto:giftconcierge@giftstarter.com\">\n" +
    "                <i class=\"mail icon\"></i>\n" +
    "                Email\n" +
    "            </a>\n" +
    "            <a class=\"ui positive button\" href=\"tel:+1-206-486-4849\">\n" +
    "                <i class=\"phone icon\"></i>\n" +
    "                Call\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<script>\n" +
    "    $(function () {\n" +
    "        var $elContactNumber = $('.contactNumber'),\n" +
    "            contactNumber = '+1-206-486-4849',\n" +
    "            contactNumberDisplay = '(206) 486-4849',\n" +
    "            $body = $('body');\n" +
    "        $body.attr({\n" +
    "            style: \"max-width: none;\"\n" +
    "        });\n" +
    "        if(isMobile()) {\n" +
    "            if(isIOS()) {\n" +
    "                fixIOSAffix();\n" +
    "            }\n" +
    "            $elContactNumber.html('<a href=\"tel:' + contactNumber + '\">' + contactNumberDisplay + '</a>');\n" +
    "        } else {\n" +
    "            $elContactNumber.html(contactNumberDisplay)\n" +
    "        }\n" +
    "\n" +
    "        function isIOS() {\n" +
    "            return /(iPad|iPhone|iPod)/g.test(navigator.userAgent);\n" +
    "        }\n" +
    "\n" +
    "        function isMobile() {\n" +
    "            return /(iPad|iPhone|iPod|Android|BlackBerry|BB\\d+|CriOS)/g.test(navigator.userAgent);\n" +
    "        }\n" +
    "\n" +
    "        function fixIOSAffix() {\n" +
    "            var affix = $('[data-spy=\"affix\"]'),\n" +
    "                input = $('input');\n" +
    "            input.on('focus', function () {\n" +
    "                affix.fadeOut();\n" +
    "            });\n" +
    "            input.on('blur', function () {\n" +
    "                affix.fadeIn();\n" +
    "            });\n" +
    "        }\n" +
    "    });\n" +
    "</script>"
  );


  $templateCache.put('/scripts/brandbar/brandbar.ng.html',
    "<div id=\"brandbar\">\n" +
    "    <div class=\"brandbox\"><a href=\"/search/sturtevants\"><img src=\"/assets/brandbar/sturtevants.png\"></a></div>\n" +
    "    <div class=\"brandbox\"><a href=\"/search/butter+london\"><img src=\"/assets/brandbar/butterLondon.png\"></a></div>\n" +
    "    <div class=\"brandbox\"><a href=\"/search/rei\"><img src=\"/assets/brandbar/rei.png\"></a></div>\n" +
    "    <div class=\"brandbox\"><a href=\"/search/bhphoto\"><img src=\"/assets/brandbar/bhphoto.png\"></a></div>\n" +
    "    <div class=\"brandbox\"><a href=\"/search/amazon\"><img src=\"/assets/brandbar/amazon.png\"></a></div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/button/giftstart-it-button.ng.html',
    "<div class=\"giftstart-it-button\">\n" +
    "    <a><h4>GiftStart It!</h4></a>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/four-oh-four.ng.html',
    "<style>\n" +
    "    #four-oh-four {\n" +
    "        margin: 6em auto;\n" +
    "        text-align: center;\n" +
    "    }\n" +
    "    #four-oh-four h1.super {\n" +
    "        font-size: 4em;\n" +
    "    }\n" +
    "</style>\n" +
    "\n" +
    "<div id=\"four-oh-four\">\n" +
    "    <h1 class=\"super\">404</h1>\n" +
    "    <h2>Woops!  This page doesn't exist.</h2>\n" +
    "    <p><a href=\"/\">Here's a link to the home page!</a></p>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('/scripts/giftideas/giftideas.ng.html',
    "<div id=\"giftideas\">\n" +
    "\n" +
    "    <div ng-show=\"product\" class=\"singleproduct\">\n" +
    "        <div class=\"head\">\n" +
    "            <div class=\"hero\">\n" +
    "                <img src=\"/assets/giftideas/category{{product.productImage}}\" alt=\"{{product.imageAltText}}\">\n" +
    "            </div>\n" +
    "            <div class=\"titles\">\n" +
    "                <div class=\"scrollbox\">\n" +
    "                    <h2 class=\"textleft\"><span ng-bind-html=\"product.productName\"></span></h2>\n" +
    "                    <h3 class=\"textleft\">${{product.productPrice}}</h3>\n" +
    "                    <p class=\"textleft\"><span ng-bind-html=\"product.productDescription\"></span></p>\n" +
    "                </div>\n" +
    "                <div class=\"gsbuttons\">\n" +
    "                    <button ng-click=\"goToLink(product.giftStartLink)\" target=\"_self\" class=\"primary gsbutton\" ng-show=\"product.hasPrice\">GIFTSTART IT!</button>\n" +
    "                    <button onclick=\"olark('api.box.expand')\" class=\"primary gsbutton\" ng-show=\"!product.hasPrice\">CONTACT THE GIFT CONCIERGE</button>\n" +
    "                    <div ng-show=\"product.hasPrice\" class=\"saveforlater\">\n" +
    "                        <button ng-click=\"saveGiftIdeaForLater(product);\" class=\"primary gsbutton\" ng-show=\"product.hasPrice\">Save for Later <img ng-show=\"isSavingForLater\" class=\"loader\" src=\"/assets/loading_transparent.gif\"></button>\n" +
    "                        <div class=\"product-message\" ng-bind-html=\"productMessage\"></div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"clear\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"category\" class=\"products\">\n" +
    "        <div class=\"head\" ng-show=\"!product\">\n" +
    "            <div class=\"hero\">\n" +
    "                <img src=\"/assets/giftideas/category/{{category.categorySlug}}.jpg\" alt=\"{{category.categorySlug}}\">\n" +
    "            </div>\n" +
    "            <div class=\"titles\">\n" +
    "                <h1><span ng-bind-html=\"category.categoryName\"></span></h1>\n" +
    "                <h4>Our Favorite Gifts & Most Popular GiftStarts</h4>\n" +
    "                <div><span ng-bind-html=\"category.categoryBlurb\"></span></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"clear\"></div>\n" +
    "        <div class=\"grid\">\n" +
    "            <div ng-repeat=\"group in groups\" class=\"group\" ng-class-odd=\"'left'\" ng-class-even=\"'right'\">\n" +
    "                <div ng-repeat=\"product in group\" ng-class=\"{'last':product==lastProduct&&group.length==1}\" class='tile' title=\"{{product.productNameStripped}}\"><a href=\"{{categoryPath}}/{{product.productSlug}}\"><img src=\"/assets/giftideas/category{{product.productThumb}}\" alt=\"{{product.imageAltText}}\" /><div class=\"tilelabel\"><span ng-bind-html=\"product.productNameShort\"></span><br/><span class=\"price\">${{product.productPrice}}</span></div></a></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"clear\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <h1>Top Categories for Group Gifting</h1>\n" +
    "    <div class=\"grid categories\">\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/music\"><img src=\"/assets/giftideas/category/music.jpg\" alt=\"Music\"/><div class=\"tilelabel\">Music</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/luma\"><img src=\"/assets/giftideas/category/luma.png\" alt=\"Luma Diamonds\"/><div class=\"tilelabel\">Luma Diamonds</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/kids\"><img src=\"/assets/giftideas/category/kids.jpg\" alt=\"Kids\"/><div class=\"tilelabel\">Kids</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/home\"><img src=\"/assets/giftideas/category/home.jpg\" alt=\"Home\"/><div class=\"tilelabel\">Home</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/cute\"><img src=\"/assets/giftideas/category/cute.jpg\" alt=\"Cute\"/><div class=\"tilelabel\">Cute</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/baby\"><img src=\"/assets/giftideas/category/Baby.jpg\" alt=\"Baby\"/><div class=\"tilelabel\">Baby</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/forher\"><img src=\"/assets/giftideas/category/forHer.jpg\" alt=\"For Her\"/><div class=\"tilelabel\">For Her</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/forhim\"><img src=\"/assets/giftideas/category/forHim.jpg\" alt=\"For Him\"/><div class=\"tilelabel\">For Him</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/cool\"><img src=\"/assets/giftideas/category/cool.jpg\" alt=\"Cool\"/><div class=\"tilelabel\">Cool</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/office\"><img src=\"/assets/giftideas/category/office.jpg\" alt=\"Office\"/><div class=\"tilelabel\">Office</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/farewell\"><img src=\"/assets/giftideas/category/Farewell.jpg\" alt=\"Farewell\"/><div class=\"tilelabel\">Farewell</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/sympathy\"><img src=\"/assets/giftideas/category/sympathy.jpg\" alt=\"Sympathy\"/><div class=\"tilelabel\">Sympathy</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/beauty\"><img src=\"/assets/giftideas/category/beauty.jpg\" alt=\"Beauty\"/><div class=\"tilelabel\">Beauty</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/wine\"><img src=\"/assets/giftideas/category/wine.jpg\" alt=\"Wine\"/><div class=\"tilelabel\">Wine</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/butterlondon\"><img src=\"/assets/giftideas/category/butterLONDON.jpg\" alt=\"butter LONDON\"/><div class=\"tilelabel\">butter LONDON</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/petlovers\"><img src=\"/assets/giftideas/category/pet-lovers.jpg\" alt=\"Pet Lovers\"/><div class=\"tilelabel\">Pet Lovers</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/wedding\"><img src=\"/assets/giftideas/category/Wedding.jpg\" alt=\"Wedding\"/><div class=\"tilelabel\">Wedding</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/graduation\"><img src=\"/assets/giftideas/category/graduation.jpg\" alt=\"Graduation\"/><div class=\"tilelabel\">Graduation</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/red\"><img src=\"/assets/giftideas/category/red.jpg\" alt=\"Wear Red\"/><div class=\"tilelabel\">Wear Red</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/pisces\"><img src=\"/assets/giftideas/category/pisces.jpg\" alt=\"Pisces\"/><div class=\"tilelabel\">Pisces</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/patriots\"><img src=\"/assets/giftideas/category/Patriots.jpg\" alt=\"Patriots\"/><div class=\"tilelabel\">Patriots</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/seahawks\"><img src=\"/assets/giftideas/category/Seahawks.jpg\" alt=\"Seahawks\"/><div class=\"tilelabel\">Seahawks</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/employee\"><img src=\"/assets/giftideas/category/employee.jpg\" alt=\"Employee Appreciation\"/><div class=\"tilelabel\">Employee Appreciation</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/boss\"><img src=\"/assets/giftideas/category/Boss.jpg\" alt=\"Boss\"/><div class=\"tilelabel\">Boss</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/teacher\"><img src=\"/assets/giftideas/category/teacher.jpg\" alt=\"Teacher\"/><div class=\"tilelabel\">Teacher</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/electronics\"><img src=\"/assets/giftideas/category/electronics.jpg\" alt=\"Electronics\"/><div class=\"tilelabel\">Electronics</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/outdoors\"><img src=\"/assets/giftideas/category/outdoors.jpg\" alt=\"Outdoors\"/><div class=\"tilelabel\">Outdoors</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/green\"><img src=\"/assets/giftideas/category/green.jpg\" alt=\"Green and Organic\"/><div class=\"tilelabel\">Green and Organic</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/military\"><img src=\"/assets/giftideas/category/Military.jpg\" alt=\"Military\"/><div class=\"tilelabel\">Military</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/giftcard\"><img src=\"/assets/giftideas/category/giftcard.jpg\" alt=\"Gift Cards\"/><div class=\"tilelabel\">Gift Cards</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"clear\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/scripts/giftsgivenbar/giftsgivenbar.ng.html',
    "<div id=\"giftsgivenbar\" ng-controller=\"GiftsGivenBarController\">\n" +
    "    <h2>Gifts given through GiftStarter</h2>\n" +
    "    <span ng-repeat=\"campaign in campaigns\">\n" +
    "        <div ng-if=\"$index%6==0\"></div><div ng-class-even=\"'hidephone'\" class=\"giftbox\"><a ng-href=\"{{campaign.url}}\"><img ng-src=\"{{campaign.img}}\" title=\"{{campaign.title}}\"></a></div>\n" +
    "    </span>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/giftstart/brand-pillow/brand-pillow-new.ng.html',
    "<div class=\"static-pages\">\n" +
    "  <div id=\"new-pillow\" class=\"headerwrap\">\n" +
    "\n" +
    "    <h1>GIVE AN AMAZING GIFT</h1>\n" +
    "    <img src=\"/assets/welcome.png\" class=\"welcome\"><h1 id=\"welcome-gters\">{{referredFrom}}</h1>\n" +
    "    <p>Give amazing gifts you're proud to give, and they're happy to get. From a group or from yourself, we'll help make it happen.</p>\n" +
    "\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/giftstart/brand-pillow/brand-pillow-video.html',
    "<div class=\"gsintro-2\" ng-show=\"showIntroCopy\">\n" +
    "    <div id=\"pillow-wrapper\">\n" +
    "        <div id=\"pillow-header-copy\">\n" +
    "            <header class=\"welcome\">\n" +
    "                <img id=\"pillow-header-img\" src=\"/assets/welcomeBanner.png\">\n" +
    "            </header>\n" +
    "            <p id=\"pillow-copy\">GiftStarter helps friends and family come together to pitch in on bigger, better gifts!  You've already found a product to giftstart, well done!  All you need now is a compelling story, and you're ready to share this giftstart with your friends and family!</p>\n" +
    "        </div>\n" +
    "        <div id=\"pillow-video-div\">\n" +
    "            <iframe id=\"pillow-iframe\" src=\"//www.youtube.com/embed/tA2gcLIJYBU\" frameborder=\"0\" allowfullscreen></iframe>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<style>\n" +
    "    div.gsintro-2 {\n" +
    "        width: 120%;\n" +
    "        background-color: #f0f0f0;\n" +
    "        box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);\n" +
    "        padding: 2em 15%;\n" +
    "        margin: 0 -10%;\n" +
    "        text-align: left;\n" +
    "    }\n" +
    "    #pillow-header-copy {vertical-align: top;}\n" +
    "    #pillow-header-img {width: 100%;}\n" +
    "    #pillow-copy {margin-bottom: 2em;}\n" +
    "    #pillow-iframe {width: 100%;}\n" +
    "\n" +
    "    @media screen and (min-width: 33em) {\n" +
    "        #pillow-header-img {width: 80%;}\n" +
    "        #pillow-wrapper {\n" +
    "            width: 30em;\n" +
    "            margin: 0 auto;\n" +
    "        }\n" +
    "        #pillow-iframe {height: 16.875em;}\n" +
    "    }\n" +
    "    @media screen and (min-width: 66em) {\n" +
    "        #pillow-wrapper {width: 62em;}\n" +
    "        #pillow-header-copy {\n" +
    "            display: inline-block;\n" +
    "            width: 30em;\n" +
    "            margin-right: 1.5em;\n" +
    "        }\n" +
    "        #pillow-video-div {\n" +
    "            display: inline-block;\n" +
    "            width: 30em;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "</style>"
  );


  $templateCache.put('/scripts/giftstart/brand-pillow/brand-pillow.html',
    "<div class=\"gsintro\" ng-show=\"showIntroCopy\">\n" +
    "    <h2>Hey There!</h2>\n" +
    "    <p>GiftStarter helps you and your friends/family get bigger, better gifts by getting everyone to pitch in.</p>\n" +
    "    <p class=\"copy\">By creating this GiftStart, you're on the way to delivering an awesome gift!  Just add a compelling story, create the GiftStart, and share with your loved ones!  Easy as pie. (Even easier, actually)</p>\n" +
    "    <p class=\"cancel-button\" ng-click=\"showIntroCopy = false\">Close</p>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/giftstart/create/giftstart-create.html',
    "\n" +
    "<div class=\"create wrapper shipping\" id=\"giftstart-contact-wrapper\" ng-controller=\"GiftStartCreateController\">\n" +
    "\n" +
    "    <ng-include ng-show=\"fromReferral\" src=\"'/scripts/giftstart/brand-pillow/brand-pillow-video.html'\"></ng-include>\n" +
    "\n" +
    "    <div ng-hide=\"showLoginBox\">\n" +
    "        <div ng-show=\"isCreateStepTiles()\"><h2 class=\"state-title\">How many pitch-in pieces do you want?</h2><div class=\"state-subtitle\">Create Your Gifting Event: step 2 of 4</div></div>\n" +
    "        <div ng-show=\"isCreateStepStory()\"><h2 class=\"state-title\">Your Gifting Event</h2><div class=\"state-subtitle\">Create Your Gifting Event: step 3 of 4</div></div>\n" +
    "        <div ng-show=\"isCreateStepShipping()\"><h2 class=\"state-title\">Shipping Details</h2><div class=\"state-subtitle\">Create Your Gifting Event: step 4 of 4</div></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"block image\">\n" +
    "        <div class=\"image-container\">\n" +
    "            <gs-overlay giftstart=\"giftStart\" ng-class=\"{initialized: pitchInsInitialized}\" ng-click=\"selectionUpdated();\"></gs-overlay>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"block details\" ng-class=\"{submitting:isSubmittingData}\" id=\"giftstart-create-controls\">\n" +
    "\n" +
    "        <form name=\"campaignForm\" ng-hide=\"showLoginBox\" novalidate>\n" +
    "\n" +
    "            <div ng-show=\"isCreateStepTiles()\" id=\"num-part-selection\">\n" +
    "                <div class=\"desc\"><strong>Things to consider:</strong><br />How many people do you think will pitch-in on the gift? How much do you think each person will pitch-in?<br />We recommend picking the smallest amount per piece because remember, a person can always buy more than one piece.</div>\n" +
    "                <div class=\"more-parts\">Add Pieces<br/><img class=\"linky\" ng-click=\"moreParts($event)\" src=\"/assets/circle_red_plus.png\"></div>\n" +
    "                <div class=\"fewer-parts-mobile\">Remove Pieces<br/><img class=\"linky\" ng-click=\"fewerParts($event)\" src=\"/assets/circle_red_minus.png\"></div>\n" +
    "                <span class=\"parts-control\"><span class=\"numtiles\"> {{x*y}} Pieces</span>\n" +
    "                <span class=\"money\" ng-hide=\"fetchingTaxRate\"> ${{ totalPrice/100/x/y | number : 2 }} <img class=\"loading\"  src=\"/assets/loading.gif\" ng-show=\"fetchingTaxRate\"/> each* <span class=\"tax-note\">(+tax)</span></span></span>\n" +
    "                <div class=\"fewer-parts\"><img class=\"linky\" ng-click=\"fewerParts($event)\" src=\"/assets/circle_red_minus.png\"><br/>Remove Pieces</div>\n" +
    "                <!-- button class=\"help float-right\" ng-click=\"help()\">Help</button -->\n" +
    "                <span class=\"disclaimer\">* Shipping is included.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-show=\"isCreateStepStory()\">\n" +
    "                <h2>1. What's the gifting event?</h2>\n" +
    "                <input type=\"text\"\n" +
    "                       id=\"campaign-title\"\n" +
    "                       name=\"title\"\n" +
    "                       placeholder=\"What's the occasion?\"\n" +
    "                       maxlength=\"140\"\n" +
    "                       ng-model=\"title\"\n" +
    "                       ng-focus=\"hideValidationError.title = true\"\n" +
    "                       ng-blur=\"hideValidationError.title = false\"\n" +
    "                       onkeypress=\"return event.keyCode==13?false:true\"\n" +
    "                       required=\"\"/>\n" +
    "                <label for=\"campaign-title\">140 character maximum.</label>\n" +
    "                <div ng-show=\"(campaignForm.$submitted || campaignForm.title.$touched || validationTrigger.createButtonClicked) && !hideValidationError.title\" class=\"errorWrapper\">\n" +
    "                    <div ng-show=\"campaignForm.title.$error.required\">\n" +
    "                        <div class=\"arrowUp\"></div>\n" +
    "                        <div class=\"errorMessage\">\n" +
    "                            Don't forget to name the gifting event!\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <h2>2. Describe your gifting event.</h2>\n" +
    "                <textarea id=\"campaign-description\"\n" +
    "                          name=\"description\"\n" +
    "                          placeholder=\"Who's the gift for? What's your relationship? Why this gift?\"\n" +
    "                          maxlength=\"500\"\n" +
    "                          ng-focus=\"hideValidationError.description = true\"\n" +
    "                          ng-blur=\"hideValidationError.description = false\"\n" +
    "                          ng-model=\"description\"\n" +
    "                          ng-blur=\"onDescriptionBlur()\"\n" +
    "                          required=\"\"></textarea>\n" +
    "                <label for=\"campaign-description\">500 character maximum (3-5 sentences)</label>\n" +
    "                <div ng-show=\"(campaignForm.$submitted || campaignForm.description.$touched || validationTrigger.createButtonClicked) && !hideValidationError.description\" class=\"errorWrapper\">\n" +
    "                    <div ng-show=\"campaignForm.description.$error.required\">\n" +
    "                        <div class=\"arrowUp\"></div>\n" +
    "                        <div class=\"errorMessage\">\n" +
    "                            Don't forget to describe it!\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div id=\"not-long-enough\" ng-hide=\"descriptionLongEnough\">\n" +
    "                    <p>Woah there! Looks like your GiftStart description is a bit short.  We know, brevity is the soul of wit - but how about we add to the story to get people more involved?  Here are a few questions for inspiration:</p>\n" +
    "                    <ul>\n" +
    "                        <li>Why does the recipient deserve this gift?</li>\n" +
    "                        <li>Is there a story behind the gift or why the recipient might need/want it?</li>\n" +
    "                        <li>What is special/awesome/interesting/unique about this product?</li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <div class=\"email\">\n" +
    "                    <h2>3. Your Email Address</h2>\n" +
    "                    <input type=\"email\"\n" +
    "                           id=\"contact-email\"\n" +
    "                           placeholder=\"username@mail.com\"\n" +
    "                           name=\"gcEmail\"\n" +
    "                           ng-model=\"gcEmail\"\n" +
    "                           ng-focus=\"hideValidationError.gcEmail = true\"\n" +
    "                           ng-blur=\"hideValidationError.gcEmail = false\"\n" +
    "                           onkeypress=\"return event.keyCode==13?false:true\"\n" +
    "                           required=\"\">\n" +
    "                    <div ng-show=\"(campaignForm.$submitted || campaignForm.gcEmail.$touched || validationTrigger.createButtonClicked) && !hideValidationError.gcEmail\" class=\"errorWrapper\">\n" +
    "                        <div ng-show=\"campaignForm.gcEmail.$error.required\">\n" +
    "                            <div class=\"arrowUp\"></div>\n" +
    "                            <div class=\"errorMessage\">\n" +
    "                                Don't forget your email address!\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div ng-show=\"campaignForm.gcEmail.$error.email\">\n" +
    "                            <div class=\"arrowUp\"></div>\n" +
    "                            <div class=\"errorMessage\">\n" +
    "                                Your email address is invalid!\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-show=\"isCreateStepShipping()\">\n" +
    "                <h2>1. Who is the Gift for?</h2>\n" +
    "                <!-- label>All prices include taxes, shipping, and handling, based on destination.</label -->\n" +
    "                <div class=\"shipping-details\">\n" +
    "                    <span class=\"name\">\n" +
    "                        <input type=\"text\"\n" +
    "                               placeholder=\"First and Last Name\"\n" +
    "                               ng-model=\"shippingName\"\n" +
    "                               name=\"shippingName\"\n" +
    "                               ng-focus=\"hideValidationError.shippingName = true\"\n" +
    "                               ng-blur=\"hideValidationError.shippingName = false\"\n" +
    "                               onkeypress=\"return event.keyCode==13?false:true\"\n" +
    "                               required=\"\" />\n" +
    "                        <div ng-show=\"(campaignForm.$submitted || campaignForm.shippingName.$touched || validationTrigger.createButtonClicked) && !hideValidationError.shippingName \" class=\"errorWrapper\">\n" +
    "                            <div ng-show=\"campaignForm.shippingName.$error.required\">\n" +
    "                                <div class=\"arrowUp\"></div>\n" +
    "                                <div class=\"errorMessage\">\n" +
    "                                    Don't forget recipient's name!\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </span>\n" +
    "                    <span class=\"email\">\n" +
    "                        <input type=\"email\"\n" +
    "                               ng-model=\"shippingEmail\"\n" +
    "                               name=\"shippingEmail\"\n" +
    "                               placeholder=\"Email Address*\"\n" +
    "                               ng-focus=\"hideValidationError.shippingEmail = true\"\n" +
    "                               ng-blur=\"hideValidationError.shippingEmail = false\"\n" +
    "                               onkeypress=\"return event.keyCode!=13\"\n" +
    "                               required=\"\" />\n" +
    "                        <label>* Email will only be sent after the gift is received</label>\n" +
    "                        <div ng-show=\"(campaignForm.$submitted || campaignForm.shippingEmail.$touched || validationTrigger.createButtonClicked) && !hideValidationError.shippingEmail\" class=\"errorWrapper\">\n" +
    "                            <div ng-show=\"campaignForm.shippingEmail.$error.required\">\n" +
    "                                <div class=\"arrowUp\"></div>\n" +
    "                                <div class=\"errorMessage\">\n" +
    "                                    Don't forget recipient's email address!\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div ng-show=\"campaignForm.shippingEmail.$error.email\">\n" +
    "                                <div class=\"arrowUp\"></div>\n" +
    "                                <div class=\"errorMessage\">\n" +
    "                                    Recipient's email address is invalid!\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </span>\n" +
    "                    <h2>2. Where should the Gift be shipped?</h2>\n" +
    "                    <span class=\"state\">\n" +
    "                        <select class=\"state\"\n" +
    "                                ng-model=\"shippingState\"\n" +
    "                                name=\"shippingState\"\n" +
    "                                required=\"\"\n" +
    "                                ng-change=\"shippingChanged()\"\n" +
    "                                ng-model-options=\"{ updateOn: 'default blur', debounce: { default: 500, blur: 0 } }\"\n" +
    "                                ng-focus=\"hideValidationError.shippingState = true\"\n" +
    "                                ng-blur=\"hideValidationError.shippingState = false\"\n" +
    "                                onkeypress=\"return event.keyCode==13?false:true\"\n" +
    "                                >\n" +
    "                            <option value=\"\">State</option>\n" +
    "                            <option value=\"AK\">AK</option>\n" +
    "                            <option value=\"AL\">AL</option>\n" +
    "                            <option value=\"AR\">AR</option>\n" +
    "                            <option value=\"AZ\">AZ</option>\n" +
    "                            <option value=\"CA\">CA</option>\n" +
    "                            <option value=\"CO\">CO</option>\n" +
    "                            <option value=\"CT\">CT</option>\n" +
    "                            <option value=\"DC\">DC</option>\n" +
    "                            <option value=\"DE\">DE</option>\n" +
    "                            <option value=\"FL\">FL</option>\n" +
    "                            <option value=\"GA\">GA</option>\n" +
    "                            <option value=\"IA\">IA</option>\n" +
    "                            <option value=\"ID\">ID</option>\n" +
    "                            <option value=\"IL\">IL</option>\n" +
    "                            <option value=\"IN\">IN</option>\n" +
    "                            <option value=\"KS\">KS</option>\n" +
    "                            <option value=\"KY\">KY</option>\n" +
    "                            <option value=\"LA\">LA</option>\n" +
    "                            <option value=\"MA\">MA</option>\n" +
    "                            <option value=\"MD\">MD</option>\n" +
    "                            <option value=\"ME\">ME</option>\n" +
    "                            <option value=\"MI\">MI</option>\n" +
    "                            <option value=\"MN\">MN</option>\n" +
    "                            <option value=\"MO\">MO</option>\n" +
    "                            <option value=\"MS\">MS</option>\n" +
    "                            <option value=\"MT\">MT</option>\n" +
    "                            <option value=\"NC\">NC</option>\n" +
    "                            <option value=\"ND\">ND</option>\n" +
    "                            <option value=\"NE\">NE</option>\n" +
    "                            <option value=\"NH\">NH</option>\n" +
    "                            <option value=\"NJ\">NJ</option>\n" +
    "                            <option value=\"NM\">NM</option>\n" +
    "                            <option value=\"NV\">NV</option>\n" +
    "                            <option value=\"NY\">NY</option>\n" +
    "                            <option value=\"OH\">OH</option>\n" +
    "                            <option value=\"OK\">OK</option>\n" +
    "                            <option value=\"OR\">OR</option>\n" +
    "                            <option value=\"PA\">PA</option>\n" +
    "                            <option value=\"RI\">RI</option>\n" +
    "                            <option value=\"SC\">SC</option>\n" +
    "                            <option value=\"SD\">SD</option>\n" +
    "                            <option value=\"TN\">TN</option>\n" +
    "                            <option value=\"TX\">TX</option>\n" +
    "                            <option value=\"UT\">UT</option>\n" +
    "                            <option value=\"VA\">VA</option>\n" +
    "                            <option value=\"VT\">VT</option>\n" +
    "                            <option value=\"WA\">WA</option>\n" +
    "                            <option value=\"WI\">WI</option>\n" +
    "                            <option value=\"WV\">WV</option>\n" +
    "                            <option value=\"WY\">WY</option>\n" +
    "                        </select>\n" +
    "                        <div ng-show=\"(campaignForm.$submitted || campaignForm.shippingState.$touched || validationTrigger.createButtonClicked) && !hideValidationError.shippingState\" class=\"errorWrapper\">\n" +
    "                            <div ng-show=\"campaignForm.shippingState.$error.required\">\n" +
    "                                <div class=\"arrowUp\"></div>\n" +
    "                                <div class=\"errorMessage\">\n" +
    "                                    Don't forget to add the state!\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </span>\n" +
    "                    <span class=\"zip\">\n" +
    "                        <input type=\"text\"\n" +
    "                               class=\"zip\"\n" +
    "                               name=\"shippingZip\"\n" +
    "                               placeholder=\"Zip Code\"\n" +
    "                               minlength=\"5\" maxlength=\"5\"\n" +
    "                               ng-model=\"shippingZip\"\n" +
    "                               required=\"\"\n" +
    "                               ng-change=\"shippingChanged()\"\n" +
    "                               ng-model-options=\"{ updateOn: 'default blur', debounce: { default: 500, blur: 0 } }\"\n" +
    "                               ng-focus=\"hideValidationError.shippingZip = true\"\n" +
    "                               ng-blur=\"hideValidationError.shippingZip = false\"\n" +
    "                               onkeypress=\"return event.keyCode==13?false:true\" />\n" +
    "                        <div ng-show=\"(campaignForm.$submitted || campaignForm.shippingZip.$touched || validationTrigger.createButtonClicked) && !hideValidationError.shippingZip\" class=\"errorWrapper\">\n" +
    "                            <div ng-show=\"campaignForm.shippingZip.$error.required\">\n" +
    "                                <div class=\"arrowUp\"></div>\n" +
    "                                <div class=\"errorMessage\">\n" +
    "                                    Don't forget to add the zip!\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "                <div class=\"campaign-length\">\n" +
    "                    <h2>3. When do you need the gift to be delivered?</h2>\n" +
    "                    <label>Currently we only allow delivery dates less than 34 days away.</label>\n" +
    "                    <h4>Delivery Date <a class=\"button\" ng-click=\"changeDeliveryDate()\">CHANGE</a></h4>\n" +
    "                    <input ui-date\n" +
    "                           type=\"text\"\n" +
    "                           class=\"endDate\"\n" +
    "                           ng-model=\"deliveryDate\"\n" +
    "                           name=\"deliveryDate\"\n" +
    "                           placeholder=\"mm/dd/yyyy\"\n" +
    "                           ng-focus=\"hideValidationError.deliveryDate = true\"\n" +
    "                           ng-blur=\"hideValidationError.deliveryDate = false; deliveryDateChanged()\"\n" +
    "                           required=\"\">\n" +
    "                    <div ng-show=\"(campaignForm.$submitted || campaignForm.deliveryDate.$touched || validationTrigger.createButtonClicked) && !hideValidationError.deliveryDate\" class=\"errorWrapper\">\n" +
    "                        <div ng-show=\"campaignForm.deliveryDate.$error.required\">\n" +
    "                            <div class=\"arrowUp\"></div>\n" +
    "                            <div class=\"errorMessage\">\n" +
    "                                Please select a date!\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div ng-show=\"!dateChosenValid()\">\n" +
    "                            <div class=\"arrowUp\"></div>\n" +
    "                            <div class=\"errorMessage\">\n" +
    "                                Please select a date!\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <h4 ng-hide=\"dueDateEmpty()\">Campaign End Date <!--a class=\"button\" ng-click=\"changeDueDate = !changeDueDate\">CHANGE</a--></h4>\n" +
    "                    <p class=\"endDate-text\" ng-hide=\"dueDateEmpty()\">Your campaign will end on </p><h2 class=\"endDate-date\" ng-hide=\"dueDateEmpty()\">{{campaignEndDate.toDateString()}}</h2><p class=\"endDate-text\" ng-hide=\"dueDateEmpty()\">.</p>\n" +
    "                    <p id=\"endDate-comment\" ng-hide=\"dueDateEmpty()\">Your campaign needs to end at least 5 days before your delivery date.</p>\n" +
    "                    <div ng-show=\"changeDueDate\" class=\"endRange\" ng-class=\"{opaque: dueDateEmpty()}\" ui-date></div>\n" +
    "                </div>\n" +
    "                <div class=\"coupon-code\">\n" +
    "                    <h2>5. Do you have a promo code?</h2>\n" +
    "                    <input type=\"text\"\n" +
    "                           id=\"coupon\"\n" +
    "                           name=\"coupon\"\n" +
    "                           placeholder=\"Enter your code\"\n" +
    "                           maxlength=\"20\"\n" +
    "                           ng-model=\"coupon\"\n" +
    "                           ng-focus=\"hideValidationError.code = true\"\n" +
    "                           ng-blur=\"hideValidationError.code = false;\"\n" +
    "                           onkeypress=\"return event.keyCode==13?false:true\"\n" +
    "                           ng-change=\"priceChanged()\"/>\n" +
    "                </div>\n" +
    "                <div class=\"price-block\">\n" +
    "                    <h2>Price</h2>\n" +
    "                    <label>\n" +
    "                        Base price of the gift.\n" +
    "                        <input type=\"checkbox\" id=\"tooltip-checkbox\"/>\n" +
    "                        <label for=\"tooltip-checkbox\">\n" +
    "                            <span class=\"tooltip-icon\">\n" +
    "                                ?\n" +
    "                                <span class=\"tooltip\">\n" +
    "                                    The price of the gift at the time of creation will be used to determine the gift \"base price.\"\n" +
    "                                </span>\n" +
    "                            </span>\n" +
    "                        </label>\n" +
    "                    </label>\n" +
    "                    <div class=\"money\" id=\"price\">${{inputPrice}}</div>\n" +
    "                </div>\n" +
    "                <div class=\"total-price-block\">\n" +
    "                    <h2>Total Price</h2>\n" +
    "                    <label>Including all fees and taxes. Shipping is free!</label>\n" +
    "                    <div class=\"money\" ng-hide=\"fetchingTaxRate || !shippingDetailsSubmitted\">${{ totalPrice/100 | number : 2 }}</div><div class=\"money\" ng-hide=\"shippingDetailsSubmitted\">...</div><img class=\"loading\" src=\"/assets/loading.gif\" ng-show=\"fetchingTaxRate\"/>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "        <div ng-show=\"showLoginBox\" class=\"login-box\">\n" +
    "            <h2>Log in or create an account:</h2>\n" +
    "            <ng-include src=\"'/scripts/login/login-or-create.html'\"></ng-include>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"progress-nav\" ng-hide=\"showLoginBox\">\n" +
    "        <div class=\"back-indicator\" ng-class=\"{'invisible': isCreateStepTiles()}\"><img id=\"giftstart-create-prev\" class=\"linky prev\" ng-click=\"prevStep()\" src=\"/assets/circle_black_lt.png\"><br/>PREVIOUS<br/>STEP</div>\n" +
    "        <div class=\"step-indicator\"><img src=\"/assets/circle_green_check.png\" alt=\"Find a gift\"/><br/>FIND<br/>A GIFT</div><img class=\"step-indicator-divider\" src=\"/assets/hbar_black.png\" /><div class=\"step-indicator\"><img ng-hide=\"isCreateStepStory()||isCreateStepShipping()\" src=\"/assets/circle_black.png\" alt=\"Adjust the tiles\"/><img ng-show=\"isCreateStepStory()||isCreateStepShipping()\" src=\"/assets/circle_green_check.png\" class=\"linky\" ng-click=\"goToStep(1)\" alt=\"Adjust the pieces\" /><br/>Adjust<br/>the pieces</div><img class=\"step-indicator-divider\" src=\"/assets/hbar_black.png\" /><div class=\"step-indicator\"><img ng-hide=\"isCreateStepShipping()\" src=\"/assets/circle_black.png\" alt=\"Tell the story\"/><img ng-show=\"isCreateStepShipping()\" src=\"/assets/circle_green_check.png\" class=\"linky\" ng-click=\"goToStep(2)\" alt=\"Tell the story\" /><br/>Tell the<br/>story</div><img class=\"step-indicator-divider\" src=\"/assets/hbar_black.png\" alt=\"Shipping datails\"/><div class=\"step-indicator\"><img src=\"/assets/circle_black.png\" /><br/>Shipping<br/>details</div>\n" +
    "        <button id=\"giftstart-create-next\" class=\"next primary\" ng-hide=\"isCreateStepShipping()\" ng-click=\"nextStep()\">NEXT STEP</button>\n" +
    "        <button id=\"giftstart-create-submit\" class=\"next primary create-campaign\" ng-show=\"isCreateStepShipping()\" ng-click=\"next()\">NEXT STEP</button><img ng-show=\"isSubmittingData\" class=\"loader\" src=\"/assets/loading_transparent.gif\">\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/giftstart/funding-bar/funding-bar.html',
    "<div class=\"funding-bar wrapper\">\n" +
    "    <div class=\"bar-bg\"></div><div ng-style=\"{'width': pitchinBarProgress()}\" class=\"pi-bar\"></div><div ng-style=\"{'width': fundingBarProgress()}\" class=\"bar\"></div><div class=\"mask\"><img src=\"/assets/giftstart/mask.png\"/></div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/giftstart/giftstart.html',
    "<div class=\"giftstart wrapper\" ng-controller=\"GiftStartController\" >\n" +
    "\n" +
    "    <div class=\"fullwidth block\">\n" +
    "        <div class=\"title\">\n" +
    "            <h1 class=\"title campaign-title\" ng-hide=\"editMode\">{{giftStart.title}}</h1>\n" +
    "            <input class=\"title\" ng-model=\"newTitle\" ng-show=\"editMode\"/>\n" +
    "            <span class=\"title edit\"></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"fullwidth block\">\n" +
    "\n" +
    "        <div class=\"col2 block\" ng-hide=\"showLoginBox||showPayBox||showSignBox||showShareBox\">\n" +
    "            <div class=\"prodtitle\">\n" +
    "                <a ng-href=\"{{giftStart.product_url}}\" rel=\"nofollow\" class=\"title\" target=\"_blank\" ng-click=\"productLinkClicked();\" ng-mouseover=\"hideOverlay();\" ng-mouseleave=\"showOverlay();\" ng-show=\"giftStart.product_title\">{{giftStart.product_title}}</a>\n" +
    "            </div>\n" +
    "            <div class=\"description\">\n" +
    "                <span class=\"description edit\"><textarea class=\"description\" ng-model=\"newDescription\" ng-show=\"editMode\"></textarea></span>\n" +
    "                <span class=\"description makelinks\" ng-hide=\"editMode\" style=\"white-space: pre-line;\">{{giftStart.description}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"signature\">\n" +
    "                <p class=\"name\" ng-show=\"!editMode\">\n" +
    "                    <span class=\"signature__title\" ng-show=\" giftStart.gc_name \"> {{ giftStart.gc_name }} </span>\n" +
    "                </p>\n" +
    "                    <input class=\"gc-name\" ng-model=\"newGcName\" ng-show=\"editMode\"/>\n" +
    "                <a class=\"edit button linky\" ng-show=\"campaignEditable && !editMode && secondsLeft > 0 && !campaignComplete()\" ng-click=\"editMode=true;\">EDIT</a>\n" +
    "                <div class=\"save\"><button class=\"save\" ng-click=\"updateCampaign();\" ng-show=\"editMode\">Save</button><button class=\"save\" ng-click=\"editMode=false;\" ng-show=\"editMode\">X</button></div>\n" +
    "                <p ng-show=\"giftStart.gc_name.length > 0 || editMode\" class=\"gift-champion\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gift Champion</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"overlay block\" Xng-class=\"{shrunk: showPayBox}\">\n" +
    "            <div class=\"image-upload\" ng-show=\"editMode\"><label>Upload New Image:  </label><input id=\"campaign-image-input\" type=\"file\" capture=\"camera\" accept=\"image/*\"/></div>\n" +
    "            <gs-overlay ng-class=\"{initialized: pitchInsInitialized}\" giftstart=\"giftStart\" ng-click=\"selectionUpdated();\"></gs-overlay>\n" +
    "            <div class=\"receipt-wrap\" ng-show=\"showPayBox\">\n" +
    "                <div class=\"receipt\">\n" +
    "                    <div class=\"receipt-tiles\">\n" +
    "                        <div class=\"img-wrap\" style=\"background-image:url('{{giftStart.product_img_url}}')\"></div>\n" +
    "                        <div class=\"info-tiles\">\n" +
    "                            <h2 class=\"num-tiles\">{{giftStart.nSelected}} PIECES</h2>\n" +
    "                            <h4 class=\"cost-tiles\">AT ${{getTileCost() / 100 | number : 2}} EACH</h4>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"receipt-total\">\n" +
    "                        <h4 class=\"purchase-total\">PURCHASE TOTAL: <h2 class=\"total-price\">${{giftStart.totalSelection / 100 | number : 2}}</h2></h4>\n" +
    "                        <p class=\"purchase-note\">Includes our gift concierge service, taxes, shipping, handling, and handmade card.</p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"login-box\" ng-show=\"showLoginBox\">\n" +
    "            <h2>Log in or create an account:</h2>\n" +
    "            <ng-include src=\"'/scripts/login/login-or-create.html'\"></ng-include>\n" +
    "        </div>\n" +
    "        <div class=\"pay-box\" ng-show=\"showPayBox\">\n" +
    "            <h2>Payment Information:</h2>\n" +
    "            <p>We accept payment by Visa, MasterCard, Amex, or Discover.  Our payments are secure and processed by PayPal.</p>\n" +
    "            <ng-include src=\"'/scripts/pay/pay.html'\"></ng-include>\n" +
    "        </div>\n" +
    "        <div class=\"sign-box\" ng-show=\"showSignBox\">\n" +
    "            <h2>Sign the Card:</h2>\n" +
    "            <p>Write a message to the recipient and we'll include it on the group card so they'll know part of this gift came from you. You know, giving credit where credit is due. We’re all about that.</p>\n" +
    "            <ng-include src=\"'/scripts/popover/note/note-popover.html'\"></ng-include>\n" +
    "        </div>\n" +
    "        <div class=\"share-box\" ng-show=\"showShareBox\">\n" +
    "            <h2>Share with Friends:</h2>\n" +
    "            <p>Your payment was successful! Thank you. You will receive an email shorty. In the meantime, you can invite friends to pitch in just like you did.</p>\n" +
    "            <a href=\"#share-panel\"><button class=\"pitch-in button green\" ng-click=\"showSharePanel(true)\" ng-hide=\"showShare\"><span>INVITE FRIENDS TO PITCH IN</span></button></a>\n" +
    "            <a href=\"\" ng-click=\"shareBox(false)\">SKIP THIS STEP</a>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--ng-include src=\"'/scripts/share/invite-pitchin.html'\"></ng-include-->\n" +
    "\n" +
    "        <div class=\"col2 block\" ng-hide=\"showLoginBox||showPayBox||showSignBox||showShareBox\">\n" +
    "            <div class=\"pitch-instructions\" ng-show=\"secondsLeft > 0 && !campaignComplete()\">\n" +
    "                <div class=\"ordinal_circle\"><span class=\"ordinal\">1</span></div><h4> CLICK ON THE PIECES YOU WANT TO PURCHASE</h4><br/>\n" +
    "                <div class=\"ordinal_circle\"><span class=\"ordinal\">2</span></div><h4> PITCH IN!</h4>\n" +
    "            </div>\n" +
    "            <button class=\"pitch-in button red\" ng-show=\"secondsLeft > 0 && !campaignComplete()\" ng-class=\"{disabled: giftStart.totalSelection == 0}\" ng-click=\"pitchIn()\" ng-mouseover=\"pitchInHoverCallback()\" title=\"{{pitchinButtonHoverMessage}}\">PAY ${{giftStart.totalSelection / 100 | number : 2}} NOW</button>\n" +
    "\n" +
    "            <div class=\"giftstart-this\" ng-show=\"secondsLeft <= 0 || campaignComplete()\">\n" +
    "                Would you like to give this gift to someone you know?  Click the button below to start your own campaign for this gift.<br/>\n" +
    "                <a class=\"giftstart-this-link\" target=\"_self\" href=\"{{giftstartThisUrl()}}\"><button class=\"pitch-in button primary\">GIFTSTART IT</button></a>\n" +
    "                <div class=\"saveforlater\">\n" +
    "                    <button class=\"pitch-in button green\" ng-click=\"saveProdForLater();\">SAVE FOR LATER <img ng-show=\"isSavingForLater\" class=\"loader\" src=\"/assets/loading_transparent.gif\"></button>\n" +
    "                    <div class=\"product-message\" ng-bind-html=\"productMessage\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <a href=\"#share-panel\"><button class=\"pitch-in button green\" ng-click=\"showSharePanel(true)\" ng-hide=\"showShare\"><span ng-hide=\"secondsLeft <= 0 || campaignComplete()\">INVITE FRIENDS TO PITCH IN</span><span ng-show=\"secondsLeft <= 0 || campaignComplete()\">SHARE THIS CAMPAIGN</span></button></a>\n" +
    "            <!--div class=\"invite block\">\n" +
    "                <h3 class=\"black invite-friends\">Share This Campaign With Friends!</h3>\n" +
    "                <img class=\"share\" src=\"/assets/envelope.png\" ng-click=\"emailShare();\" />\n" +
    "                <img class=\"share\" src=\"/assets/facebookicon.png\" ng-click=\"facebookShare();\"/>\n" +
    "                <img class=\"share\" src=\"/assets/twittericon.png\" ng-click=\"twitterShare();\" />\n" +
    "                <img class=\"share\" src=\"/assets/googleicon.png\" ng-click=\"googlePlusShare();\" /><br/>\n" +
    "                Or share this link:\n" +
    "                <input id=\"share-url\" type=\"text\" value=\"{{campaignUrl()}}\" gs-copy-url readonly/>\n" +
    "            </div-->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"fullwidth block fullwidth--last\">\n" +
    "        <div class=\"prices block\">\n" +
    "            <gs-funding-bar></gs-funding-bar>\n" +
    "            <div class=\"price funded\">\n" +
    "                <h2><span class=\"giftstart product contribution\">{{giftStart.nBought}}</span> Pieces</h2>\n" +
    "                <h4>Gifted</h4>\n" +
    "            </div>\n" +
    "            <div class=\"price remaining\">\n" +
    "                <h2><span class=\"giftstart product remaining\">{{giftStart.nTotal-giftStart.nBought}}</span> Pieces</h2>\n" +
    "                <h4>Remaining</h4>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"completion block\">\n" +
    "            <p>This campaign ends {{giftStart.deadline*1000 | date:\"MMMM d 'at' ha PST\" : 'PST'}}</p>\n" +
    "            <div><h2 class=\"countdown\" ng-class=\"{danger: (secondsLeft < 86400) && (secondsLeft <= 0)}\">{{countdown}}</h2><h4 ng-hide=\"secondsLeft <= 0 || campaignComplete()\">Left for Pitch-ins</h4></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"share-panel\">\n" +
    "        <a id=\"closebtn\" href=\"\" ng-show=\"showShare\" ng-click=\"showSharePanel(false)\">CLOSE</a>\n" +
    "        <ng-include src=\"'/scripts/share/invite-pitchin.html'\" ng-show=\"showShare\"></ng-include>\n" +
    "    </div>\n" +
    "\n" +
    "    <hr />\n" +
    "\n" +
    "    <gs-thanks></gs-thanks>\n" +
    "    <div class=\"groupcard\">\n" +
    "        <div class=\"title title--groupcard\">\n" +
    "            <h2 class=\"title__name\">Group Card</h2>\n" +
    "            <span class=\"title__catchline\">To sign the card, first pitch-in by purchasing some pieces above</span>\n" +
    "        </div>\n" +
    "        <div ng-repeat-start=\"pitchIn in pitchIns | orderBy:'-timestamp' track by $index\" class=\"h--hide\"></div>\n" +
    "        <div class=\"contributors {{randomColor($index)}}\">\n" +
    "            <div class=\"contributors__titleblock {{randomColor($index)}}\"></div>\n" +
    "            <div class=\"contributors__figure\">\n" +
    "                <a class=\"contributors__link\" ng-href=\"/users/{{pitchIn.uid}}\" ng-hide=\"isEditing(pitchIn) && picEdit\">\n" +
    "                    <img class=\"contributors__img\" ng-src=\"{{pitchIn.img}}\" />\n" +
    "                </a>\n" +
    "                <a class=\"userprofile__imageedit button\" ng-show=\"isEditing(pitchIn) && !picEdit\" ng-click=\"setPicEdit(true)\">Change photo</a>\n" +
    "                <gs-image-upload ng-show=\"isEditing(pitchIn) && picEdit\" on-image-updated=\"imageUpdated\"></gs-image-upload>\n" +
    "                <a class=\"userprofile__imagesave button\" ng-click=\"picSubmit()\" ng-show=\"isEditing(pitchIn) && picEdit\">Save</a>\n" +
    "            </div>\n" +
    "            <div class=\"contributors__info\">\n" +
    "                <h4 class=\"contributors__name\" ng-show=\"!isEditing(pitchIn)\">{{pitchIn.name}}</h4>\n" +
    "                <input type=\"text\" ng-model=\"pitchIn.name\" ng-show=\"isEditing(pitchIn)\" placeholder=\"Name\"/>\n" +
    "                <p class=\"contributors__info\" ng-show=\"!isEditing(pitchIn)\">{{pitchIn.note}}</p>\n" +
    "                <textarea ng-model=\"pitchIn.note\" ng-show=\"isEditing(pitchIn)\" placeholder=\"Comment\"/>\n" +
    "                <p id=\"textcount\" ng-show=\"isEditing(pitchIn)\">{{230 - pitchIn.note.length}}</p>\n" +
    "            </div>\n" +
    "            <div class=\"contributors__edit\">\n" +
    "                <a class=\"contributors__edit__button button\" ng-show=\"pitchIn.uid == userId && !isEditing(pitchIn) && commentEditing.length == 0\" ng-click=\"editingComment(pitchIn, true)\">EDIT</a>\n" +
    "                <a class=\"contributors__edit__button button\" ng-show=\"isEditing(pitchIn)\" ng-click=\"cancelEditComment(pitchIn)\">CANCEL</a>\n" +
    "                <button class=\"contributors__edit__button savebtn red\" ng-show=\"isEditing(pitchIn)\" ng-disabled=\"picUploading || pitchIn.note.length > 230 || pitchIn.name.length > 38 || pitchIn.name.length < 1\" ng-click=\"editingComment(pitchIn, false)\">SAVE</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div ng-repeat-end class=\"h--hide\"></div>\n" +
    "        <p class=\"nocontributors\" ng-hide=\"pitchIns.length > 0\">No contributors yet - be the first one on the card!</p>\n" +
    "    </div>\n" +
    "    <div ng-show=\"secondsLeft <= 0 || campaignComplete()\" class=\"btn btn--pdf\">\n" +
    "        <a href=\"\" ng-click=\"toPDFPage()\" class=\"btn__link\">\n" +
    "            View Card PDF\n" +
    "        </a>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/giftstart/overlay/overlay.html',
    "<div class=\"overlay\" style=\"background-image: url({{giftstart.product_img_url}})\">\n" +
    "</div>"
  );


  $templateCache.put('/scripts/giftstart/print/print.html',
    "<div class=\"giftstart wrapper\" ng-controller=\"GiftStartController\">\n" +
    "\n" +
    "    <div class=\"fullwidth block\">\n" +
    "        <div class=\"title\">\n" +
    "            <h2 class=\"title\" ng-hide=\"editMode\">{{giftStart.title}}</h2>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"fullwidth\">\n" +
    "\n" +
    "        <div class=\"col2 block\">\n" +
    "            <h3 class=\"title\" target=\"_blank\">\n" +
    "                {{giftStart.product_title}}</h3>\n" +
    "\n" +
    "            <div class=\"desc\">\n" +
    "                GiftStarter is a Gifting Experience Service. Our mission is to focus on the gifting experience, using\n" +
    "                technology as an enabler. We enable the experience that captures giving between the recipient and those\n" +
    "                that give.<br/><br/>\n" +
    "\n" +
    "                Search for and select a product using the search bar on the homepage, fill out the GiftStart information\n" +
    "                to share your story on why this is important to you or your gift recipient, and bring others along on\n" +
    "                the giving journey. We let your family and friends choose their pieces of the gift to give, we send an\n" +
    "                awesome hand-crafted group card to remember the experience, and the gift too. <br/>\n" +
    "            </div>\n" +
    "            <div id=\"header-logo\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"overlay col2 block\">\n" +
    "            <div class=\"overlay\" style=\"background-image: url({{giftStart.product_img_url}})\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"groupcard\">\n" +
    "        <div class=\"contributor__description\">\n" +
    "            <p class=\"contributor__text\">\n" +
    "                {{giftStart.description}}\n" +
    "            </p>\n" +
    "\n" +
    "            <p class=\"name\">\n" +
    "                <span>\n" +
    "                   &mdash;&mdash;{{giftStart.gc_name}}\n" +
    "                </span>\n" +
    "            </p>\n" +
    "\n" +
    "            <p class=\"gift-champion\">\n" +
    "                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gift Champion\n" +
    "            </p>\n" +
    "        </div>\n" +
    "        <div class=\"contributor__link\">\n" +
    "            <p class=\"contributor__campaign\">\n" +
    "                View the Campaign\n" +
    "            </p>\n" +
    "            <gs-print-url class=\"contributor__href\"></gs-print-url>\n" +
    "        </div>\n" +
    "        <div class=\"groupcard__wrapper\">\n" +
    "            <div ng-repeat-start=\"pitchIn in pitchIns\"\n" +
    "                 ng-class=\"{true: 'contributors--row'}[$index % 3 == 0 && !$first]\"\n" +
    "                 class=\"contributors--pre h--hide\"></div>\n" +
    "            <div class=\"contributors {{randomColor($index)}}\" ng-class=\"{true: 'contributors--only'}[pitchIns.length == 1]\">\n" +
    "                <div class=\"contributors__titleblock {{randomColor($index)}}\"></div>\n" +
    "                <div class=\"contributors__figure\">\n" +
    "                    <!--<div class=\"img-border\">-->\n" +
    "                        <img class=\"contributors__img\" ng-src=\"{{pitchIn.img}}\"/>\n" +
    "                    <!--</div>-->\n" +
    "                </div>\n" +
    "                <div class=\"contributors__info\">\n" +
    "                    <h3 class=\"contributors__name\">{{pitchIn.name}}</h3>\n" +
    "\n" +
    "                    <p class=\"contributors__info\">{{pitchIn.note}}</p>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div ng-repeat-end class=\"h--hide\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<style>\n" +
    "    html {\n" +
    "        background: #fff;\n" +
    "    }\n" +
    "\n" +
    "    * {\n" +
    "        font-family: Roboto, sans-serif;\n" +
    "    }\n" +
    "\n" +
    "    * a {\n" +
    "        font-size: 1em;\n" +
    "        text-decoration: none;\n" +
    "    }\n" +
    "\n" +
    "    @font-face {\n" +
    "        font-family: Gotham;\n" +
    "        src: url('/assets/fonts/Gotham-Book.woff'), url('/assets/fonts/Gotham-Book.ttf');\n" +
    "    }\n" +
    "\n" +
    "    @font-face {\n" +
    "        font-family: Gotham;\n" +
    "        font-style: italic;\n" +
    "        src: url('/assets/fonts/Gotham-BookItalic.woff'), url('/assets/fonts/Gotham-BookItalic.ttf');\n" +
    "    }\n" +
    "\n" +
    "    @font-face {\n" +
    "        font-family: \"Roboto Slab\";\n" +
    "        src: url('/assets/fonts/RobotoSlab-Thin-webfont.woff');\n" +
    "    }\n" +
    "\n" +
    "    @font-face {\n" +
    "        font-family: \"Roboto Bold\";\n" +
    "        src: url('/assets/fonts/Roboto-Bold.woff'), url('/assets/fonts/Roboto-Bold.ttf');\n" +
    "    }\n" +
    "\n" +
    "    @font-face {\n" +
    "        font-family: Roboto;\n" +
    "        src: url('/assets/fonts/Roboto-Regular.woff');\n" +
    "    }\n" +
    "\n" +
    "    h3 {\n" +
    "        font: 400 1.25em \"Roboto\", sans-serif;\n" +
    "        color: #000;\n" +
    "    }\n" +
    "\n" +
    "    #habla_oplink_a,\n" +
    "    footer,\n" +
    "    .headerNav,\n" +
    "    .search,\n" +
    "    #header,\n" +
    "    .toast-wrapper,\n" +
    "    .h--hide,\n" +
    "    body > :last-child {\n" +
    "        display: none;\n" +
    "    }\n" +
    "\n" +
    "    #header-logo {\n" +
    "        background-image: url(/assets/GSlogo_web_large_reg.png);\n" +
    "        background-repeat: no-repeat;\n" +
    "        background-size: 238px 98px;\n" +
    "        width: 238px;\n" +
    "        height: 98px;\n" +
    "        position: relative;\n" +
    "        top: 0;\n" +
    "        left: 20px;\n" +
    "    }\n" +
    "\n" +
    "    .groupcard {\n" +
    "        width: 100% !important;\n" +
    "        margin: 0 !important;\n" +
    "        border-top: 1px solid #ccc;\n" +
    "    }\n" +
    "\n" +
    "    .overlay {\n" +
    "        display: block;\n" +
    "        margin-left: auto !important;\n" +
    "        margin-right: auto !important;\n" +
    "        height: 400px;\n" +
    "        background-size: 350px 400px;\n" +
    "        background-repeat: no-repeat;\n" +
    "    }\n" +
    "\n" +
    "    #angular-view {\n" +
    "        margin: 0;\n" +
    "    }\n" +
    "\n" +
    "    .col2 {\n" +
    "        margin-right: 0 !important;\n" +
    "        width: 50% !important;\n" +
    "        margin-right: 3%;\n" +
    "        float: right !important;\n" +
    "    }\n" +
    "\n" +
    "    .contributor__link,\n" +
    "    .contributors__img,\n" +
    "    .contributor__description {\n" +
    "        display: inline-block;\n" +
    "    }\n" +
    "\n" +
    "    .contributor__campaign {\n" +
    "        font-size: 21px;\n" +
    "        color: #ffffff;\n" +
    "        margin: 0 0 15px;\n" +
    "    }\n" +
    "\n" +
    "    .groupcard__wrapper {\n" +
    "        float: left;\n" +
    "        width: 96%;\n" +
    "        margin: 10px 2%;\n" +
    "    }\n" +
    "\n" +
    "    .desc {\n" +
    "        font-family: Roboto, sans-serif;\n" +
    "    }\n" +
    "\n" +
    "    /*.contributors__img {*/\n" +
    "        /*width: 47% !important;*/\n" +
    "        /*margin: 5% 25% !important*/\n" +
    "    /*}*/\n" +
    "\n" +
    "    .contributor__description {\n" +
    "        width: 60%;\n" +
    "        margin-left: 3%;\n" +
    "    }\n" +
    "\n" +
    "    .contributor__link {\n" +
    "        background: #238471;\n" +
    "        width: 32%;\n" +
    "        float: right;\n" +
    "        padding: 6% 0 7%;\n" +
    "        margin: 10px 2% 0 2%\n" +
    "    }\n" +
    "\n" +
    "    .contributor__href {\n" +
    "        color: #ffffff;\n" +
    "        text-decoration: none;\n" +
    "    }\n" +
    "\n" +
    "    .gift-champion {\n" +
    "        padding-left: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .contributor__text,\n" +
    "    .name,\n" +
    "    .gift-champion {\n" +
    "        text-align: left !important;\n" +
    "    }\n" +
    "\n" +
    "    .fullwidth > .groupcard {\n" +
    "        display: block !important;\n" +
    "        border-top: 1px solid #ccc;\n" +
    "    }\n" +
    "\n" +
    "    .title--groupcard .title {\n" +
    "        margin-top: 25px;\n" +
    "    }\n" +
    "\n" +
    "    .title {\n" +
    "        color: black;\n" +
    "        text-align: center;\n" +
    "        border-radius: 25px;\n" +
    "    }\n" +
    "\n" +
    "    .groupcard {\n" +
    "        clear: both;\n" +
    "        padding: 0;\n" +
    "        text-align: center;\n" +
    "        display: block;\n" +
    "        width: 92%;\n" +
    "        margin: 0 4% 5rem 4%;\n" +
    "    }\n" +
    "\n" +
    "    @media only screen and (max-width: 667px) {\n" +
    "        .groupcard {\n" +
    "            display: block;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    @media only screen and (max-width: 375px) and (orientation: portrait) {\n" +
    "        .groupcard {\n" +
    "            display: block;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    .groupcard .title--groupcard {\n" +
    "        margin: 0 auto 5rem;\n" +
    "        /*display: table-caption;*/\n" +
    "    }\n" +
    "\n" +
    "    @media only screen and (max-width: 667px) {\n" +
    "        .groupcard .title--groupcard {\n" +
    "            display: block;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    @media only screen and (max-width: 375px) and (orientation: portrait) {\n" +
    "        .groupcard .title--groupcard {\n" +
    "            display: block;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    .groupcard .title__name {\n" +
    "        font-size: 3.2rem;\n" +
    "    }\n" +
    "\n" +
    "    .groupcard .contributors {\n" +
    "        display: inline-block;\n" +
    "        width: 26% !important;\n" +
    "        vertical-align: top;\n" +
    "    }\n" +
    "\n" +
    "    @media only screen and (min-width: 376px) and (max-width: 768px) and (orientation: portrait) {\n" +
    "        .groupcard .contributors--row {\n" +
    "            display: none;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    /*@media only screen and (min-width: 376px) and (max-width: 768px) and (orientation: portrait) {*/\n" +
    "        /*.groupcard .contributors--pre:nth-child(2n) {*/\n" +
    "            /*display: table-row;*/\n" +
    "        /*}*/\n" +
    "    /*}*/\n" +
    "\n" +
    "    /*@media only screen and (min-width: 376px) and (max-width: 768px) and (orientation: portrait) {*/\n" +
    "        /*.groupcard .contributors--only {*/\n" +
    "            /*width: 50%;*/\n" +
    "        /*}*/\n" +
    "    /*}*/\n" +
    "\n" +
    "    /*@media only screen and (max-width: 667px) {*/\n" +
    "        /*.groupcard .contributors--only {*/\n" +
    "            /*width: 100%;*/\n" +
    "        /*}*/\n" +
    "    /*}*/\n" +
    "\n" +
    "    /*@media only screen and (max-width: 375px) and (orientation: portrait) {*/\n" +
    "        /*.groupcard .contributors--only {*/\n" +
    "            /*width: 100%;*/\n" +
    "        /*}*/\n" +
    "    /*}*/\n" +
    "\n" +
    "    .groupcard .contributors__info {\n" +
    "        padding: 0 10% 3%;\n" +
    "        -webkit-hyphens: auto;\n" +
    "        -moz-hyphens: auto;\n" +
    "        -ms-hyphens: auto;\n" +
    "        hyphens: auto;\n" +
    "    }\n" +
    "\n" +
    "    .groupcard .contributors__name {\n" +
    "        text-align: center;\n" +
    "    }\n" +
    "\n" +
    "    .groupcard .contributors__img {\n" +
    "        width: 100%;\n" +
    "        margin: 8% 0 1%;\n" +
    "        -webkit-border-radius: 50%;\n" +
    "        -moz-border-radius: 50%;\n" +
    "        -ms-border-radius: 50%;\n" +
    "        border: 6px solid #d6d6d6;\n" +
    "        border-radius: 50%;\n" +
    "        vertical-align: top;\n" +
    "    }\n" +
    "\n" +
    "    /*.img-border {*/\n" +
    "        /*border: 6px solid #d6d6d6;*/\n" +
    "        /*border-radius: 50%;*/\n" +
    "        /*width: 80%*/\n" +
    "    /*}*/\n" +
    "</style>\n"
  );


  $templateCache.put('/scripts/giftstart/thanks/thanked-campaigns.ng.html',
    "<div class=\"thanked-campaigns wrapper\" ng-repeat=\"campaign in campaigns\">\n" +
    "    <a ng-href=\"/giftstart/{{campaign.giftstart_url_title}}\">\n" +
    "        <img class=\"thanks-image\" ng-src=\"{{campaign.thanks_img_url}}\"/>\n" +
    "    </a>\n" +
    "    <div class=\"description-container\">\n" +
    "        <a ng-href=\"/giftstart/{{campaign.giftstart_url_title}}\">\n" +
    "            <h4 class=\"accent\">{{campaign.title}}</h4>\n" +
    "        </a>\n" +
    "        <p class=\"campaign-description\">{{campaign.thanks_message}}</p>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/giftstart/thanks/thanks.html',
    "<div class=\"thank-you block\" ng-show=\"thanks.editable || thanks.edit || thanks.message\">\n" +
    "    <!--<div class=\"thank-you block\">-->\n" +
    "    <div class=\"message\">\n" +
    "        <div class=\"show-message\" ng-hide=\"thanks.edit\">\n" +
    "            <h1>GiftStart Success!</h1>\n" +
    "            <h4>A Thank You From the Recipient:</h4>\n" +
    "            <p>{{thanks.message}}</p>\n" +
    "        </div>\n" +
    "        <div class=\"edit-message\" ng-show=\"thanks.edit\">\n" +
    "            <h1>Say Thank You!</h1>\n" +
    "            <p>Say a few words of thanks to those who pitched in, we'll send them a link when you're finished, and you can share it on your favorite social sites:</p>\n" +
    "            <textarea ng-model=\"thanks.newMessage\"></textarea>\n" +
    "            <div class=\"profile-img\" ng-show=\"thanks.profileImageUrl\">\n" +
    "                <p>Logged in as:</p>\n" +
    "                <img ng-src=\"{{thanks.profileImageUrl}}\"/>\n" +
    "            </div>\n" +
    "            <div class=\"login-for-pic\" ng-hide=\"loggedIn\">\n" +
    "                <p>Login to add a profile picture!</p><button class=\"white-fill\" ng-click=\"thanks.showLogin()\">Login</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"image\">\n" +
    "        <img ng-src=\"{{thanks.imgUrl}}\" ng-show=\"thanks.imgUrl && !thanks.edit\"/>\n" +
    "        <gs-image-upload class=\"white-buttons\" ng-show=\"thanks.edit\" on-image-updated=\"thanks.imageUpdated\"></gs-image-upload>\n" +
    "    </div>\n" +
    "    <div class=\"buttons\">\n" +
    "        <button class=\"white-fill submit\" ng-show=\"thanks.edit\" ng-click=\"thanks.update();\">Say Thanks!</button><button class=\"edit white-border\" ng-show=\"thanks.editable && !thanks.edit\" ng-click=\"thanks.edit=true;\"><img class=\"edit\" src=\"/assets/edit_button_white.png\"/></button>\n" +
    "    </div>\n" +
    "    <button class=\"cancel\" ng-show=\"thanks.edit\" ng-click=\"thanks.edit=false;\">X</button>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/header/giftstart-it-header.ng.html',
    "<div class=\"giftstart-it-header\" ng-class=\"{shown: shown}\">\n" +
    "    <span>\n" +
    "        <p>Want to give this gift to someone you know?</p>\n" +
    "        <gs-it-button ng-click=\"linkClicked()\"></gs-it-button>\n" +
    "        <p class=\"cancel\" ng-click=\"hideButtonHeader()\">X</p>\n" +
    "    </span>\n" +
    "</div>\n" +
    "<div class=\"giftstart-it-header-padding\" ng-class=\"{shown: shown}\"></div>\n"
  );


  $templateCache.put('/scripts/header/subscribe-header.ng.html',
    "<div class=\"subscribe-header\">\n" +
    "    <span>\n" +
    "        <p>Hey! Join our email newsletter for <b>group gifting ideas and updates</b>!</p>\n" +
    "        <form action=\"//giftstarter.us8.list-manage.com/subscribe/post?u=9d503578c402cdc6d3fa96dd7&amp;id=c2e64310be\" method=\"post\" id=\"mc-embedded-subscribe-form-hdr\" name=\"mc-embedded-subscribe-form\" class=\"validate ng-pristine ng-valid\" target=\"_blank\" novalidate=\"\">\n" +
    "            <input type=\"email\" value=\"\" name=\"EMAIL\" class=\"email\" id=\"mce-EMAIL\" placeholder=\"Enter Email Address\" required=\"\">\n" +
    "            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->\n" +
    "            <div style=\"position: absolute; left: -5000px;\"><input type=\"text\" name=\"b_9d503578c402cdc6d3fa96dd7_fdc0096ceb\" tabindex=\"-1\" value=\"\"></div>\n" +
    "            <button type=\"submit\" class=\"button\">Subscribe</button>\n" +
    "        </form>\n" +
    "    </span>\n" +
    "</div>\n" +
    "<div class=\"subscribe-header-padding\" ng-class=\"{shown: subscribeShow}\"></div>\n"
  );


  $templateCache.put('/scripts/home/giftstart-squares.ng.html',
    "<div id=\"giftstart-squares\">\n" +
    "    <div class=\"column one\"><a href=\"https://www.giftstarter.com/giftstart/Agnes-Christmas-gift\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/158.jpeg');\"><p>Agnes Christmas gift</p></div></div></a><a href=\"https://www.giftstarter.com/giftstart/Dae-Needs-a-Manly-Grill-for-his-Birthday\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/23.jpg');\"><p>Dae Needs a Manly Grill for his Birthday</p></div></div></a></div><div class=\"column two\"><a href=\"https://www.giftstarter.com/giftstart/A-fantastic-bag-for-a-fantastic-lady\"><div class=\"giftstart-square big\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/58.jpeg');\"><p>A fantastic bag for a fantastic lady</p></div></div></a></div><div class=\"column three\"><a href=\"https://www.giftstarter.com/giftstart/Rocky-is-just-a-baby\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/115.jpeg');\"><p>Rocky Baby</p></div></div></a><a href=\"https://www.giftstarter.com/giftstart/Just-when-you-thought-Quinn-and-Silas-pictures-couldnt-get-any-more-amazing\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/125.jpeg');\"><p>Just when you thought Quinn and Silas' pictures couldn't get any more amazing...</p></div></div></a><a href=\"https://www.giftstarter.com/giftstart/Geekwire-Community-Feeding-Over-400-in-Seattle\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/Union_Gospel_Mission___Human_str.jpg');\"><p>Geekwire Feeds the Homeless</p></div></div></a><a href=\"https://www.giftstarter.com/giftstart/Lets-get-Dale-a-FitBit\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/31.com/skuimage/857717');\"><p>Let's get Dale a FitBit!</p></div></div></a><a href=\"https://www.giftstarter.com/giftstart/My-inner-nerd\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/37.jpeg');\"><p>My inner nerd.,</p></div></div></a><a href=\"https://www.giftstarter.com/giftstart/2-bottles-of-scotch-for-Matt-to-send-him-off-to-his-journey-at-Porchcom\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/132.jpeg');\"><p>2 Bottles of Scotch</p></div></div></a></div>\n" +
    "    <div style=\"clear: both;\"></div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/home/home.html',
    "<div class=\"landing-page\" ng-controller=\"HomeController\">\n" +
    "\t<!--div class=\"headerwrap\">\n" +
    "        <h1>Welcome to GiftStarter!</h1>\n" +
    "        <p>We are putting the emotion back into gifting. With GiftStarter you can give gifts you're proud to give, and\n" +
    "            they're happy to get. Make your lists. Find your community. Give better gifts.</p>\n" +
    "        <a name=\"productsearch\"></a>\n" +
    "        <gs-product-search></gs-product-search>\n" +
    "    </div-->\n" +
    "    <!--ng-include src=\"'/scripts/product/search-results.ng.html'\"></ng-include-->\n" +
    "    <ng-include src=\"'/scripts/home/whatisgiftstarter/why-giftstarter.ng.html'\"></ng-include>\n" +
    "    <ng-include src=\"'/scripts/home/whatisgiftstarter/how-it-works.ng.html'\"></ng-include>\n" +
    "\t<!--ng-include src=\"'/scripts/staffpicks/staffpicks.ng.html'\"></ng-include-->\n" +
    "    <!--ng-include src=\"'/scripts/giftsgivenbar/giftsgivenbar.ng.html'\"></ng-include-->\n" +
    "    <div class=\"userlogin\" id=\"loginpanel\">\n" +
    "        <div class=\"userlogin__logo\"></div>\n" +
    "        <h2 class=\"userlogin__title\">\n" +
    "            Join the giving movement\n" +
    "        </h2>\n" +
    "    </div>\n" +
    "    <ng-include src=\"'/scripts/login/login-or-create.html'\"></ng-include>\n" +
    "    <ng-include src=\"'/scripts/brandbar/brandbar.ng.html'\"></ng-include>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/home/top-campaign.html',
    "<div class=\"campaign-preview wrapper\">\n" +
    "    <a ng-href=\"/giftstart/{{campaign.giftstart_url_title}}\"><div class=\"campaign-title\"><h1>{{campaign.title}}</h1></div><p class=\"product-name\">{{campaign.product.title}}</p><img class=\"product-image\" ng-src=\"{{campaign.product_img_url}}\"/></a>\n" +
    "    <div class=\"comment-container\" ng-class=\"{fadedIn: fadeIn}\">\n" +
    "        <img class=\"contrib-img\" ng-src=\"{{pitchins[index % pitchins.length].img}}\"/>\n" +
    "        <div class=\"comment-wrapper\">\n" +
    "            <p class=\"contrib-message\">{{pitchins[index % pitchins.length].note}}</p>\n" +
    "            <p class=\"contrib-name\">{{pitchins[index % pitchins.length].name}}</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/home/whatisgiftstarter/how-it-works.ng.html',
    "<div class=\"whatisgiftstarter how-it-works\">\n" +
    "    <h2>How it works</h2>\n" +
    "    <img src=\"/assets/whatisgiftstarter/howitworks1.png\" />\n" +
    "    <img src=\"/assets/whatisgiftstarter/howitworks2.png\" />\n" +
    "    <p><span class=\"title\">IF YOU CAN BUY IT ONLINE, YOU CAN GIFT IT WITH GIFTSTARTER.</span> <span id=\"howitworks-paragraph\">When you set up your gift\n" +
    "    campaign, you can <strong>choose how many pieces</strong> will be in your grid. We <strong>break up the price of\n" +
    "    the product into pieces</strong>, so the more pieces you have, the cheaper each piece is! Once your gift\n" +
    "    campaign is set up, you <strong>invite your friends to buy pieces</strong> -- and your part is finished! Each\n" +
    "    contributor can <strong>purchase as many or as few pieces as they wish</strong>, then leave a message for the group\n" +
    "    card when they check out. <strong>We take care of everything else</strong> -- from ensuring the gift is\n" +
    "    ordered and shipped to making and sending the homemade group card, we've got you covered!</span></p>\n" +
    "    <button class=\"red\" ng-click=\"goToLink('howitworks')\">LEARN MORE</button>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/home/whatisgiftstarter/why-giftstarter.ng.html',
    "<div class=\"whatisgiftstarter why-giftstarter\">\n" +
    "    <h2>Why GiftStarter?</h2>\n" +
    "    <div>\n" +
    "        <div class=\"item one\">\n" +
    "            <div class=\"ghost\"></div>\n" +
    "            <div class=\"content\">\n" +
    "                <h4 class=\"title\">GET AND GIVE GIFTS YOU WANT</h4>\n" +
    "                <p>\n" +
    "                    <strong>We remove the barrier of large price tags.</strong>\n" +
    "                    The gifts most people want are more expensive than the average giver is\n" +
    "                    able to gift alone, but with GiftStarter, <strong>many people can give\n" +
    "                    a little and together give gifts people actually want.</strong> Imagine\n" +
    "                    a world where birthdays aren't just an assortment of gift cards and\n" +
    "                    $20 checks from grandma.\n" +
    "            </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"item two\">\n" +
    "            <div class=\"ghost\"></div>\n" +
    "            <div class=\"content\">\n" +
    "                <h4 class=\"title\">HAVE MEANINGFUL INTERACTIONS</h4>\n" +
    "                <p>\n" +
    "                    We didn't invent group gifting, but we did make sure the recipient will\n" +
    "                    know exactly who was involved in the gift. Each participant can <strong>\n" +
    "                    add a picture and personal message to the handcrafted group card. </strong>\n" +
    "                    Once the gift is received, the recipient can <strong>post a thank you note\n" +
    "                    </strong> and picture on the gift campaign page for all the contributors\n" +
    "                    to see.\n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"item three\">\n" +
    "            <div class=\"ghost\"></div>\n" +
    "            <div class=\"content\">\n" +
    "                <h4 class=\"title\">PAIN-FREE GROUP GIFTING</h4>\n" +
    "                <p>\n" +
    "                    Whether it's your coworkers in your office or buddies spread across the nation,\n" +
    "                    it's never been so easy to start a group gift. We don't just <strong>take care\n" +
    "                    of the money collection</strong>, but also <strong>ensure the gift is ordered and\n" +
    "                    shipped, along with the group card</strong>. And as always, <strong>shipping\n" +
    "                    is free</strong> for all GiftStarter gifts!\n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\t\t\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/inspirationalexamples/inspirationalexamples.ng.html',
    "<div class=\"inspirationalexamples\" ng-controller=\"InspirationalExamplesController\">\n" +
    "  <div id=\"outer\">\n" +
    "  <div class=\"rotate\">\n" +
    "    <div class=\"product-item first\">\n" +
    "      <a ng-href=\"{{firstProduct.link}}\"><img class=\"left-col\" ng-src=\"{{firstProduct.image}}\"/></a>\n" +
    "      <img class=\"right-col\" ng-src=\"{{firstProduct.desc}}\"/>\n" +
    "    </div>\n" +
    "    <div class=\"product-item second\">\n" +
    "      <a ng-href=\"{{secondProduct.link}}\"><img class=\"left-col\" ng-src=\"{{secondProduct.image}}\"/></a>\n" +
    "      <img class=\"right-col\" ng-src=\"{{secondProduct.desc}}\"/>\n" +
    "    </div>\n" +
    "    <div class=\"product-item third\">\n" +
    "      <a ng-href=\"{{thirdProduct.link}}\"><img class=\"left-col\" ng-src=\"{{thirdProduct.image}}\"/></a>\n" +
    "      <img class=\"right-col\" ng-src=\"{{thirdProduct.desc}}\"/>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "    </div>\n" +
    "  <div id=\"clear\"></div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/login/create-account.html',
    "<div class=\"userlogin__form\">\n" +
    "    <h4>Create account with email address:</h4>\n" +
    "    <form ng-submit=\"$parent.doCreateEmail()\" class=\"create_action\">\n" +
    "        <input class=\"userlogin__name\" type=\"text\" name=\"name\" ng-model=\"$parent.name\" placeholder=\"First Name\" required /><br/>\n" +
    "        <input class=\"userlogin__surname\" type=\"text\" name=\"surname\" ng-model=\"$parent.surname\" placeholder=\"Last Name\" required /><br/>\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Email Address\" required /><br/>\n" +
    "        <div class=\"userlogin__passwordwrap\"><input ng-hide=\"$parent.showPassword\" class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required /><input ng-show=\"$parent.showPassword\" class=\"userlogin__password\" type=\"text\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required /><div class=\"userlogin__eye\" ng-click=\"$parent.showPassword=!$parent.showPassword\"></div></div>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "        <button class=\"userlogin__loginbtn red create_action\" ng-disabled=\"$parent.working\">Create account</button>\n" +
    "    </form>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/login/login-or-create.html',
    "<div class=\"userlogin\" ng-controller=\"LoginOrCreateController\">\n" +
    "    <div class=\"userlogin__emaillogin login-block\" ng-hide=\"showCreate\">\n" +
    "        <ng-include src=\"'/scripts/login/login.html'\"></ng-include>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showSocials\">\n" +
    "            <span>Don't have an account? </span>\n" +
    "           <span><a ng-click=\"showCreate=true; resetForm();\" class=\"userlogin__createacclink linky\">Create</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"userlogin__emaillogin login-block\" ng-show=\"showCreate\">\n" +
    "        <ng-include src=\"'/scripts/login/create-account.html'\"></ng-include>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showSocials\">\n" +
    "            <span>Already have an account? </span>\n" +
    "            <span><a ng-click=\"showCreate=false; resetForm();\" class=\"userlogin__createacclink linky\">Login</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"vertical-line-block\">\n" +
    "        <div class=\"vertical-line\" ng-show=\"showSocials\"/>\n" +
    "    </div>\n" +
    "    <div class=\"userlogin__sociallogin login-block\" ng-show=\"showSocials\">\n" +
    "        <h4>Or {{showCreate?\"create account\":\"login\"}} with social media:</h4>\n" +
    "        <div class=\"social\">\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginFacebook()\"><img class=\"social__icons\" src=\"/assets/login/facebook.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginTwitter()\"><img class=\"social__icons\" src=\"/assets/login/twitter.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginLinkedin()\"><img class=\"social__icons\" src=\"/assets/login/linkedin.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginGoogleplus()\"><img class=\"social__icons\" src=\"/assets/login/google.png\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-show=\"showCreate\">\n" +
    "            <span>Already have an account? </span>\n" +
    "            <span><a ng-click=\"showCreate=false; resetForm();\" class=\"userlogin__createacclink linky\">Login</a></span>\n" +
    "        </div>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showCreate\">\n" +
    "            <span>Don't have an account? </span>\n" +
    "           <span><a ng-click=\"showCreate=true; resetForm();\" class=\"userlogin__createacclink linky\">Create</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ng-hide=\"showSocials\">\n" +
    "        <br/><br/>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<script>\n" +
    "    function handlePopupClosed() {\n" +
    "        angular.element(document.getElementById('shareControllerWrapper')).scope().refreshPermissionsStatus();\n" +
    "    }\n" +
    "</script>"
  );


  $templateCache.put('/scripts/login/login.html',
    "<div class=\"userlogin__form\" ng-hide=\"$parent.showForgot || $parent.showReset\">\n" +
    "    <h4>Login with an email address:</h4>\n" +
    "    <form ng-submit=\"$parent.doLoginEmail()\" class=\"login_action\">\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Enter your email address\" required />\n" +
    "        <div class=\"userlogin__passwordwrap\"><input class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Enter your password\" required></div>\n" +
    "        <a class=\"userlogin__forgot linky\" ng-click=\"$parent.showForgot=true\">Forgot password</a>\n" +
    "        <div class=\"userlogin__wrapper\">\n" +
    "            <!--<input class=\"userlogin__remember\" type=\"checkbox\" name=\"remember\" id=\"remember\">-->\n" +
    "        </div>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "        <button class=\"userlogin__loginbtn red login_action\" ng-disabled=\"$parent.working\">Log In</button>\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"userlogin__form\" ng-show=\"$parent.showForgot\">\n" +
    "    <form ng-submit=\"$parent.doForgotPassword()\">\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Enter your email address\" required />\n" +
    "        <a class=\"userlogin__forgot linky\" ng-click=\"$parent.showForgot=false\">Cancel</a>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "        <button class=\"userlogin__loginbtn\" ng-disabled=\"$parent.working\">Get Password</button>\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"userlogin__form\" ng-show=\"$parent.showReset\">\n" +
    "    <h4>Reset Your Password:</h4>\n" +
    "    <form ng-submit=\"$parent.doResetPassword()\">\n" +
    "        <input class=\"userlogin__email\" type=\"hidden\" name=\"resetcode\" ng-model=\"$parent.resetCode\" placeholder=\"Enter the reset code\" required />\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Enter your email address\" required />\n" +
    "        <div class=\"userlogin__passwordwrap\"><input ng-hide=\"$parent.showPassword\" class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Enter a New Password\" required /><input ng-show=\"$parent.showPassword\" class=\"userlogin__password\" type=\"text\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required /><div class=\"userlogin__eye\" ng-click=\"$parent.showPassword=!$parent.showPassword\"></div></div>\n" +
    "        <!--<input class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.reenterpassword\" placeholder=\"Re-enter the Password\" required>-->\n" +
    "        <a class=\"userlogin__forgot linky\" ng-click=\"$parent.showReset=false\">Cancel</a>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "        <button class=\"userlogin__loginbtn red\" ng-disabled=\"$parent.working\">Change Password</button>\n" +
    "    </form>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/marketingbanner/marketingbanner.ng.html',
    "<div id=\"marketingbanner\">\n" +
    "    <div class=\"marketingbox\"><a href=\"/giftideas\"><img src=\"/assets/marketingbanner/buyPieces.png\"></a></div>\n" +
    "    <div class=\"marketingbox\"><a href=\"/giftideas\"><img src=\"/assets/marketingbanner/freeShipping.png\"></a></div>\n" +
    "    <div class=\"marketingbox\"><a href=\"/search/butter+london\"><img src=\"/assets/marketingbanner/featuredBL.png\"></a></div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/menu/menu.ng.html',
    "<div class=\"menu-wrapper\" ng-class=\"{expanded: expanded}\">\n" +
    "    <button class=\"cancel\" ng-click=\"close()\">X</button>\n" +
    "    <ul class=\"menu\">\n" +
    "        <li class=\"menu-item\"><a href=\"http://www.giftstarter.com/blog\" target=\"_blank\">Blog</a></li>\n" +
    "        <li class=\"menu-item\"><a href=\"/faq\">FAQ</a></li>\n" +
    "        <li class=\"menu-item\" ng-show=\"loggedIn\" ng-click=\"logout()\"><a>Logout</a></li>\n" +
    "        <li class=\"menu-item\" ng-hide=\"loggedIn\" ng-click=\"login()\"><a>Login</a></li>\n" +
    "    </ul>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/partnerportal/partnerportal.html',
    "<div class=\"partnerportal static-pages\" ng-controller=\"PartnerportalController\" >\n" +
    "    <div class=\"headerwrap\">\n" +
    "        <h1>PARTNER PORTAL</h1>\n" +
    "        <br />\n" +
    "        <p>Thanks for joining the gifting revolution!  GiftStarter is a great platform to help you increase average order size, turn your users into brand advocates endorsing your brand to their family and friends.  Let's reinvent gifting.  #GiftsMatter when we #GiftTogether.</p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"login\">\n" +
    "        <div class=\"login-title\" ng-show=\"!loggedIn()\">Welcome, partner!  Please log in:</div>\n" +
    "        <span ng-repeat=\"showCreate in [false]\"><ng-include ng-repeat=\"showSocials in [false]\" src=\"'/scripts/login/login-or-create.html'\"></ng-include></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"core-info\" ng-show=\"loggedIn()\">\n" +
    "        <h1>1. {{coreDataComplete?'Verify':'Enter'}} your company info:</h1>\n" +
    "        <form class=\"core-form\"><a name=\"core-form\"></a>\n" +
    "            <span class=\"row\"><span class=\"label\" for=\"companyName\">Company Name:</span><span class=\"value\" ng-hide=\"editMode\">{{partner.company_name}}</span><span ng-show=\"editMode\" class=\"input\"><input type=\"text\" name=\"companyName\" ng-model=\"partner.company_name\"/></span></span>\n" +
    "            <span class=\"row\"><span class=\"label\" for=\"companyUrl\">Website:</span><span class=\"value\"  ng-hide=\"editMode\">{{partner.company_url}}</span><span ng-show=\"editMode\" class=\"input\"><input type=\"text\" name=\"companyUrl\" ng-model=\"partner.company_url\"/><br/></span></span>\n" +
    "            <span class=\"row\"><span class=\"label\" for=\"phone\">Phone:</span><span class=\"value\" ng-hide=\"editMode\">{{partner.phone_number}}</span><span ng-show=\"editMode\" class=\"input\"><input type=\"text\" name=\"phone\" ng-model=\"partner.phone_number\"/><br/></span></span>\n" +
    "            <span class=\"row\"><span class=\"label\" for=\"phone\">API Key:</span><span class=\"value\" ng-hide=\"editMode\">{{partner.api_key}}</span></span>\n" +
    "            <span class=\"row\"><span class=\"error\" ng-show=\"coreError!=''\">{{coreError}}</span></span>\n" +
    "            <span class=\"row buttons\"><span class=\"buttons\"><button ng-hide=\"editMode\" ng-click=\"editCore()\" ng-disabled=\"loading\">Edit</button><span ng-show=\"editMode\"><button ng-show=\"coreDataComplete\" ng-click=\"cancelCore()\" ng-disabled=\"loading\">Cancel</button> <button ng-click=\"saveCore()\" ng-disabled=\"loading\">Save</button></span></span></span>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div ng-show=\"coreDataComplete\">\n" +
    "        <section id=\"add-the-button\">\n" +
    "            <h1>2. Add the GiftStart It button to your website:</h1>\n" +
    "            <p>Adding the GiftStart It button is easy.  Pick your platform:</p>\n" +
    "            <ul class=\"toggle-button\">\n" +
    "                <li ng-class=\"{'selected': shopifyInstructions}\"><a ng-click=\"showShopifyInstructions()\">Shopify</a></li>\n" +
    "                <li ng-class=\"{'selected': htmlInstructions}\"><a ng-click=\"showHtmlInstructions()\">All Others</a></li>\n" +
    "            </ul>\n" +
    "            <div class=\"add-instructions\" ng-show=\"shopifyInstructions\">\n" +
    "                <p>To add the button to your Shopify store, you can either add it site-wide (for all products), or to individual products.</p>\n" +
    "                <p>&bull; To add the button to <b>all</b> products, click \"Online Store\", then \"Themes\", then \"Edit HTML/CSS\" under the \"...\".\n" +
    "                    Next, click \"product.liquid\" under your Templates, and add the following code on a new line after \"{% include 'product' %}\":</p>\n" +
    "                <p>&bull; or, to add the button to a <b>single</b> product, click the \"&lt;&rt;\" symbol in the editing bar for the Description of your product,\n" +
    "                    then paste the following code (and click \"Save\"):</p>\n" +
    "                <pre ng-click=\"convertToTextarea($event)\">\n" +
    "                &lt;gs-button id=\"gsbutton\" class=\"gsbutton\"&gt;&lt;/gs-button&gt;\n" +
    "                &lt;script&gt;\n" +
    "                    window.giftStartButton = {\n" +
    "                        publicKey: '{{partner.api_key}}'\n" +
    "                    };\n" +
    "                &lt;/script&gt;\n" +
    "                &lt;script src=\"https://www.giftstarter.com/scripts/shopify/button.js\"&gt;&lt;/script&gt;\n" +
    "                &lt;style&gt;\n" +
    "                #gsbutton {\n" +
    "                    height: 36px;\n" +
    "                    border: 2px solid white;\n" +
    "                    border-radius: 4px;\n" +
    "                }\n" +
    "                &lt;/style&gt;\n" +
    "                </pre>\n" +
    "                <p>You can modify the styling if you like, but be sure to only adjust the height or the width - doing both will likely distort the button!</p>\n" +
    "                <p>If you have any questions at all, please email us at <a href=\"mailto:giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a>!</p>\n" +
    "            </div>\n" +
    "            <div class=\"add-instructions\" ng-show=\"htmlInstructions\">\n" +
    "                <p>To add the button to a site, simply insert the following snippet next to your \"Add to Cart\" button:</p>\n" +
    "                <pre ng-click=\"convertToTextarea($event)\">\n" +
    "                &lt;gs-button id=\"gsbutton\" class=\"gsbutton\" style=\"display: none;\"&gt;&lt;/gs-button&gt;\n" +
    "                &lt;script&gt;\n" +
    "                    window.giftStartButton = {\n" +
    "                        productUrl: 'http://example.com/product/12345',\n" +
    "                        title: 'Example title',\n" +
    "                        price: 85.00,\n" +
    "                        imgUrl: 'http://example.com/images/12345.jpg',\n" +
    "                        publicKey: '{{partner.api_key}}'\n" +
    "                    };\n" +
    "                &lt;/script&gt;\n" +
    "                &lt;script src=\"https://www.giftstarter.com/scripts/button/general.js\"&gt;&lt;/script&gt;\n" +
    "                </pre>\n" +
    "                <p>You'll need to replace the example product info in the first script tag with your actual product data.  On most platforms this can be done in the template for your product details page.</p>\n" +
    "                <p>You should style the button to match your existing buttons height and corner rounding, but a good starting point for the buttons CSS is:</p>\n" +
    "                <pre ng-click=\"convertToTextarea($event)\">\n" +
    "                #gsbutton {\n" +
    "                    height: 36px;\n" +
    "                    border: 2px solid white;\n" +
    "                    border-radius: 4px;\n" +
    "                }\n" +
    "                </pre>\n" +
    "                <p>Be sure to only adjust the height or the width - doing both will likely distort the button!</p>\n" +
    "                <p>If you have any questions at all, please email us at <a href=\"mailto:giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a>!</p>\n" +
    "            </div>\n" +
    "        </section>\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/scripts/pay/pay.html',
    "<div class=\"payment\" ng-controller=\"PayPopoverController\">\n" +
    "\n" +
    "    <div class=\"saved-cards\" ng-show=\"cards.length > 0\" ng-class=\"{hidden: putNew}\">\n" +
    "        <span ng-repeat=\"card in cards\" class=\"card\">\n" +
    "            <input ng-attr-id=\"{{card.fingerprint}}\" type=\"checkbox\" ng-checked=\"card.selected\" value=\"{{card.fingerprint}}\" ng-click=\"selectCard()\"/>\n" +
    "            <label ng-attr-for=\"{{card.fingerprint}}\">\n" +
    "                <div class=\"selected\"><img ng-show=\"card.selected\" src=\"/assets/green_check.png\"/></div>\n" +
    "                <img class=\"brand\" ng-src=\"{{card.brandImage}}\">\n" +
    "                <span class=\"last-four\">{{card.last_four}}</span>\n" +
    "            </label>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"loading\" ng-show=\"cardsLoading\"><img src=\"../../../assets/loading_transparent.gif\" width=\"14px\" height=\"14px\"> Loading saved cards</div>\n" +
    "\n" +
    "    <form xstripe-form=\"stripeSubmit\" name=\"stripeForm\" ng-class=\"{submitted: submitted}\" Xng-submit=\"pitchingIn = stripeForm.$valid;\">\n" +
    "\n" +
    "        <input id=\"new-credit-card-cb\" type=\"checkbox\" ng-model=\"putNew\" ng-change=\"deselectCards()\"><label for=\"new-credit-card-cb\"><span class=\"arrow\" ng-class=\"{down: putNew && !cardsLoading}\">&#x25BC;</span><span>Enter New Card</span></label>\n" +
    "\n" +
    "        <div class=\"card-entry\" ng-class=\"{'put-new': putNew && !cardsLoading}\">\n" +
    "            <div id=\"card-imgs\">\n" +
    "                <img src=\"/assets/mastercard_card.png\" />\n" +
    "                <img src=\"/assets/visa_card.png\" />\n" +
    "                <img src=\"/assets/discover_card.png\" />\n" +
    "                <img src=\"/assets/amex_card.png\" />\n" +
    "            </div>\n" +
    "            <div class=\"firstname\">\n" +
    "                <input type=\"text\" id=\"card-firstname\" ng-disabled=\"!putNew\" ng-model=\"firstname\" placeholder=\"First Name\" ng-change=\"updateFormValidity()\" name=\"firstname\"/>\n" +
    "            </div><div class=\"lastname\">\n" +
    "                <input type=\"text\" id=\"card-lastname\" ng-disabled=\"!putNew\" ng-model=\"lastname\" placeholder=\"Last Name\" ng-change=\"updateFormValidity()\" name=\"lastname\"/>\n" +
    "            </div><div class=\"number\">\n" +
    "                <input type=\"text\" id=\"card-number\" ng-disabled=\"!putNew\" ng-model=\"number\" payments-validate=\"card\" payments-type-model=\"type\" payments-format=\"card\" ng-class=\"type\" placeholder=\"Card Number\" ng-change=\"updateFormValidity()\" name=\"cc-number\"/>\n" +
    "            </div><div class=\"cvc\">\n" +
    "                <input type=\"text\" id=\"card-cvc\" ng-disabled=\"!putNew\" ng-model=\"cvc\" payments-validate=\"cvc\" payments-type-model=\"type\" payments-format=\"cvc\" placeholder=\"CVC\" ng-change=\"updateFormValidity()\" name=\"cvc\"/>\n" +
    "            </div><br/><div class=\"expiry\">\n" +
    "                <input type=\"text\" id=\"card-expiry\" ng-disabled=\"!putNew\" ng-model=\"expiry\" payments-validate=\"expiry\" payments-format=\"expiry\" placeholder=\"Expires MM/YY\" ng-change=\"updateFormValidity()\" name=\"expiry\"/>\n" +
    "            </div><div class=\"zip\" ng-class=\"{invalidzip: (addressZip.length < 5)}\">\n" +
    "                <input type=\"text\" id=\"card-zip\" ng-disabled=\"!putNew\" ng-model=\"addressZip\" maxlength=\"5\" placeholder=\"Billing ZIP\" ng-change=\"updateFormValidity()\" name=\"zip\"/>\n" +
    "            </div><br/><div class=\"email\">\n" +
    "                <input type=\"email\" id=\"card-email\" ng-disabled=\"!putNew\" ng-model=\"email\" placeholder=\"Email Address*\" ng-change=\"updateFormValidity()\" name=\"email\"/>\n" +
    "            </div><span class=\"email-note\">\n" +
    "                * Receipt will be emailed\n" +
    "            </span><span class=\"save-card\">\n" +
    "                <input type=\"checkbox\" id=\"save-credit-card\" ng-disabled=\"!putNew\" ng-model=\"saveCreditCard\"/><label for=\"save-credit-card\">Remember my card</label><input type=\"checkbox\" id=\"tooltip-checkbox\"/>\n" +
    "            </span><span class=\"subscribe\" ng-hide=\"userOnMailingList\">\n" +
    "                <input type=\"checkbox\" id=\"subscribe-checkbox\" ng-model=\"emailSubscribe\"/><label for=\"subscribe-checkbox\">Want to hear about new features?</label>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <span ng-show=\"selectedCard\"><input id=\"delete-credit-card-toggle\" type=\"checkbox\" ng-model=\"showDeleteCardDialogue\"><label for=\"delete-credit-card-toggle\"><span class=\"arrow\" ng-class=\"{down: showDeleteCardDialogue && selectedCard}\">&#x25BC;</span><span>Delete Selected Card</span></label></span>\n" +
    "        <div class=\"delete-credit-card-confirm\" ng-show=\"showDeleteCardDialogue && selectedCard\">\n" +
    "            <button class=\"delete-card\" ng-click=\"deleteSelectedCard()\">Delete card #{{selectedLastFour}}</button> <button class=\"delete-cancel\" ng-click=\"showDeleteCardDialogue = false\">Cancel</button>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <span class=\"error\" ng-show=\"errorMessage.length > 0\">{{errorMessage}}</span>\n" +
    "\n" +
    "        <button class=\"large pay primary\" ng-click=\"paypalSubmit()\" ng-class=\"{disabled: pitchingIn}\">Pay ${{currentCharge / 100 | number : 2}} <img ng-show=\"pitchingIn\" src=\"/assets/loading_transparent.gif\"></button>\n" +
    "    </form>\n" +
    "    <div class=\"cancel-button\"><a class=\"cancel-button button linky\" ng-click=\"hidePopover()\">Cancel</a></div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/scripts/popover/email-share/email-share-popover.html',
    "<div class=\"email-share-popover\" ng-controller=\"EmailSharePopoverController\">\n" +
    "    <h1 class=\"white\">Email Share!</h1>\n" +
    "    <div id=\"open-with-email-client\">\n" +
    "        <a href=\"{{emailUrl}}\" target=\"_blank\" ng-click=\"trackEmailClientClick()\">\n" +
    "            <span class=\"share\">Open in email client</span>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <label for=\"toEmails\">To:</label>\n" +
    "        <textarea id=\"toEmails\" ng-model=\"toEmails\" placeholder=\"friend@email.com; family@email.com\"></textarea>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <label for=\"fromEmail\">From:</label>\n" +
    "        <input id=\"fromEmail\" type=\"email\" ng-model=\"fromEmail\" placeholder=\"you@email.com\" name=\"email\"/>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <textarea class=\"message\" ng-model=\"message\" placeholder=\"\">\n" +
    "        </textarea>\n" +
    "        <div class=\"message-sub\">\n" +
    "        {{gsName}}<br/>\n" +
    "        - {{userSvcName}}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <span class=\"error\" ng-hide=\"formValid\">Invalid email!</span>\n" +
    "    <button class=\"large white-border\" ng-click=\"submit()\">Send!</button>\n" +
    "    <div class=\"cancel-button\"><p class=\"cancel-button\" ng-click=\"hidePopover()\">Cancel</p></div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/popover/login/login-popover.html',
    "<div class=\"login-popover\" ng-controller=\"LoginPopoverController\">\n" +
    "    <h1 class=\"white\" ng-show=\"emailFormModel.isLogin\">Log In</h1>\n" +
    "    <h1 class=\"white\" ng-show=\"emailFormModel.isLoginCreate\">Create Account</h1>\n" +
    "    <h1 class=\"white\" ng-show=\"emailFormModel.isForgotPassword || emailFormModel.isReset\">Reset Password</h1>\n" +
    "    <div class=\"block\">\n" +
    "        <div class=\"login-button facebook\" ng-click=\"facebookLogin()\" ng-show=\"!emailFormModel.isEmailLogin\"><img class=\"login-button\" src=\"/assets/login_facebook2.png\" /></div>\n" +
    "        <div class=\"login-button twitter\" ng-click=\"twitterLogin()\" ng-show=\"!emailFormModel.isEmailLogin\"><img class=\"login-button\" src=\"/assets/login_twitter2.png\" /></div>\n" +
    "        <div class=\"login-button googleplus\" ng-click=\"googleLogin()\" ng-show=\"!emailFormModel.isEmailLogin\"><img class=\"login-button\" src=\"/assets/login_google2.png\" /></div>\n" +
    "        <div class=\"login-button\" ng-click=\"emailFormModel.isEmailLogin = !emailFormModel.isEmailLogin\" ng-hide=\"emailFormModel.isEmailLogin\"><img class=\"login-button\" src=\"/assets/login_email.png\" /></div>\n" +
    "        <form name=\"emailLoginForm\" ng-show=\"emailFormModel.isEmailLogin\" class=\"emailLogin\" ng-submit=\"emailFormActions.submit()\" novalidate>\n" +
    "            <div ng-show=\"emailFormModel.isLoginCreate\">\n" +
    "                <input type=\"text\" name=\"emailname\" placeholder=\"Enter your name\" ng-model=\"emailFormModel.emailname\" ng-required=\"emailFormModel.isLoginCreate\"/>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.emailname.$error.required\">Name required.</span>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <input type=\"email\" name=\"email\" placeholder=\"Enter your email\" ng-model=\"emailFormModel.email\" required/>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.email.$error.required\">Email required.</span>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.email.$error.email\">Invalid email.</span>\n" +
    "            </div>\n" +
    "            <div ng-show=\"emailFormModel.isLoginCreate\">\n" +
    "                <input type=\"email\" name=\"emailConfirm\" placeholder=\"Confirm your email\" ng-model=\"emailFormModel.emailConfirm\" ng-required=\"emailFormModel.isLoginCreate\"/>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.emailConfirm.$error.required\">Confirm email required.</span>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.emailConfirm.$error.email\">Invalid email.</span>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && ((emailFormModel.email|lowercase) !== (emailFormModel.emailConfirm|lowercase))\">Emails do not match.</span>\n" +
    "            </div>\n" +
    "            <div ng-hide=\"emailFormModel.isForgotPassword\">\n" +
    "                <input type=\"password\" name=\"password\" placeholder=\"Enter your password\" ng-model=\"emailFormModel.password\" ng-required=\"emailFormModel.isLogin || emailFormModel.isLoginCreate || emailFormModel.isReset\"/>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.password.$error.required\">Password required.</span>\n" +
    "            </div>\n" +
    "            <div ng-show=\"emailFormModel.isLoginCreate || emailFormModel.isReset\">\n" +
    "                <input type=\"password\" name=\"passwordConfirm\" placeholder=\"Confirm your password\" ng-model=\"emailFormModel.passwordConfirm\" ng-required=\"emailFormModel.isLoginCreate || emailFormModel.isReset\"/>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.passwordConfirm.$error.required\">Confirm password required.</span>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && (emailFormModel.password !== emailFormModel.passwordConfirm)\">Passwords do not match.</span>\n" +
    "            </div>\n" +
    "            <div class=\"loginButton\">\n" +
    "                <input type=\"submit\" value=\"Login\" ng-class=\"{loading: emailFormModel.loginInProgress}\" ng-click=\"emailFormActions.login()\" ng-show=\"emailFormModel.isLogin\">\n" +
    "                <input type=\"submit\" value=\"Create\"  ng-class=\"{loading: emailFormModel.createInProgress}\" ng-click=\"emailFormActions.createLogin()\" ng-show=\"emailFormModel.isLoginCreate\">\n" +
    "                <input type=\"submit\" value=\"Get password\" class=\"getPw\" ng-class=\"{loading: emailFormModel.getPwInProgress}\" ng-click=\"emailFormActions.forgotPassword()\" ng-show=\"emailFormModel.isForgotPassword && !emailFormModel.showOk\">\n" +
    "                <input type=\"submit\" value=\"Reset\" ng-class=\"{loading: emailFormModel.resetInProgress}\" ng-click=\"emailFormActions.reset()\" ng-show=\"emailFormModel.isReset\">\n" +
    "                <input type=\"button\" value=\"Ok\" ng-click=\"hidePopover()\" ng-show=\"emailFormModel.showOk\">\n" +
    "\n" +
    "            </div>\n" +
    "            <div ng-show=\"!emailFormModel.isLoginCreate && !emailFormModel.isForgotPassword && !emailFormModel.isReset\">\n" +
    "                <span class=\"or\">or</span>\n" +
    "                <input type=\"button\" class=\"createLogin\" ng-click=\"emailFormActions.createLoginMode($event)\" value=\"Create login\" />\n" +
    "            </div>\n" +
    "            <div ng-show=\"!emailFormModel.isLoginCreate && !emailFormModel.isForgotPassword && !emailFormModel.isReset\">\n" +
    "                <a ng-click=\"emailFormActions.forgotPasswordMode($event)\" class=\"forgotPwdLink linky\">Forgot password.</a>\n" +
    "                <div style=\"clear: both\"></div>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                {{emailFormModel.message}}\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"cancel-button\"><p class=\"cancel-button\" ng-click=\"hidePopover()\">Cancel</p></div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/popover/note/note-popover.html',
    "<div class=\"note-popover\" ng-init=\"stateClass = ''\" ng-controller=\"NotePopoverController\" >\n" +
    "    <div class=\"note-wrapper\">\n" +
    "        <div class=\"profile-picture-wrapper\">\n" +
    "            <img class=\"profile-picture\" ng-src=\"{{profilePicture}}\">\n" +
    "            <a class=\"edit-picture-button button\" ng-click=\"editPhoto()\">Edit Photo</a>\n" +
    "        </div>\n" +
    "        <div class=\"note\">\n" +
    "            <input id=\"name-box\" type=\"text\" ng-model=\"name\" placeholder=\"Name\" />\n" +
    "            <textarea class=\"note\" ng-model=\"noteText\" ng-disabled=\"skipNote\" placeholder=\"Comment\"></textarea>\n" +
    "            <p class=\"chars-left\" ng-show=\"noteText.length > 0\" ng-class=\"{warning: (noteText.length > 214)}\">{{230 - noteText.length}}</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"note-skipbox\">\n" +
    "        <input id=\"skipNote\" type=\"checkbox\" ng-model=\"skipNote\">\n" +
    "        <label for=\"skipNote\">No thanks, just put my name on the card.</label>\n" +
    "    </div>\n" +
    "    <button class=\"large primary\" ng-click=\"action.submit()\" ng-disabled=\"!skipNote && !noteText || noteText.length > 250 \" ng-class=\"{disabled: !skipNote && !noteText}\">Sign it!</button>\n" +
    "    <!-- div class=\"cancel-button\"><p class=\"cancel-button\" ng-click=\"hidePopover()\">Cancel</p></div -->\n" +
    "</div>"
  );


  $templateCache.put('/scripts/popover/pay/pay-popover.html',
    "<div class=\"pay-popover\" ng-controller=\"PayPopoverController\">\n" +
    "    <h1 class=\"white\">Pitch In!</h1>\n" +
    "     <div class=\"powered\">Powered by <img src=\"/assets/powered_by_paypal.png\"></div>\n" +
    "\n" +
    "    <div class=\"saved-cards\" ng-show=\"cards.length > 0\" ng-class=\"{hidden: putNew}\">\n" +
    "        <span ng-repeat=\"card in cards\" class=\"card\">\n" +
    "            <input ng-attr-id=\"{{card.fingerprint}}\" type=\"checkbox\" ng-checked=\"card.selected\" value=\"{{card.fingerprint}}\" ng-click=\"selectCard()\"/>\n" +
    "            <label ng-attr-for=\"{{card.fingerprint}}\">\n" +
    "                <img class=\"brand\" ng-src=\"{{card.brandImage}}\">\n" +
    "                <span class=\"last-four\">{{card.last_four}}</span>\n" +
    "            </label>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"loading\" ng-show=\"cardsLoading\"><img src=\"../../../assets/loading_transparent.gif\" width=\"14px\" height=\"14px\"> Loading saved cards</div>\n" +
    "\n" +
    "    <form xstripe-form=\"stripeSubmit\" name=\"stripeForm\" ng-class=\"{submitted: submitted}\" ng-submit=\"pitchingIn = stripeForm.$valid;\">\n" +
    "\n" +
    "        <input id=\"new-credit-card-cb\" type=\"checkbox\" ng-model=\"putNew\" ng-change=\"deselectCards()\"><label for=\"new-credit-card-cb\"><span class=\"arrow\" ng-class=\"{down: putNew && !cardsLoading}\">&#x25BC;</span><span>Use New Card</span></label>\n" +
    "\n" +
    "        <div class=\"card-entry\" ng-class=\"{'put-new': putNew && !cardsLoading}\">\n" +
    "            <div class=\"number\">\n" +
    "                <img ng-src=\"{{numberImgUrl}}\"/>\n" +
    "                <input type=\"text\" id=\"card-number\" ng-disabled=\"!putNew\" ng-model=\"number\" payments-validate=\"card\" payments-type-model=\"type\" payments-format=\"card\" ng-class=\"type\" placeholder=\"Card Number\" ng-change=\"updateFormValidity()\" name=\"cc-number\"/>\n" +
    "            </div><div class=\"cvc\">\n" +
    "                <img ng-src=\"{{cvcImgUrl}}\"/>\n" +
    "                <input type=\"text\" id=\"card-cvc\" ng-disabled=\"!putNew\" ng-model=\"cvc\" payments-validate=\"cvc\" payments-type-model=\"type\" payments-format=\"cvc\" placeholder=\"CVC\" ng-change=\"updateFormValidity()\" name=\"cvc\"/>\n" +
    "            </div><div class=\"expiry\">\n" +
    "                <img ng-src=\"{{expiryImgUrl}}\"/>\n" +
    "                <input type=\"text\" id=\"card-expiry\" ng-disabled=\"!putNew\" ng-model=\"expiry\" payments-validate=\"expiry\" payments-format=\"expiry\" placeholder=\"MM / YY\" ng-change=\"updateFormValidity()\" name=\"expiry\"/>\n" +
    "            </div><div class=\"zip\" ng-class=\"{invalidzip: (addressZip.length < 5)}\">\n" +
    "                <img ng-src=\"{{zipImgUrl}}\">\n" +
    "                <input type=\"text\" id=\"card-zip\" ng-disabled=\"!putNew\" ng-model=\"addressZip\" maxlength=\"5\" placeholder=\"ZIP\" ng-change=\"updateFormValidity()\" name=\"zip\"/>\n" +
    "            </div><div class=\"email\">\n" +
    "                <img src=\"{{emailImgUrl}}\"/>\n" +
    "                <input type=\"email\" id=\"card-email\" ng-disabled=\"!putNew\" ng-model=\"email\" placeholder=\"Email Address\" ng-change=\"updateFormValidity()\" name=\"email\"/>\n" +
    "            </div><span class=\"save-card\">\n" +
    "                <input type=\"checkbox\" id=\"save-credit-card\" ng-disabled=\"!putNew\" ng-model=\"saveCreditCard\"/><label class=\"small\" for=\"save-credit-card\">Save my card</label><input type=\"checkbox\" id=\"tooltip-checkbox\"/><label for=\"tooltip-checkbox\"><span class=\"tooltip-icon\"><img id=\"save-credit-card-lock\" src=\"/assets/cc_icon_cvc_white.png\"/><span class=\"tooltip\">Transactions are processed via secure 128-bit SSL encryption.</span></span></label>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "        <span class=\"subscribe\" ng-hide=\"userOnMailingList\">\n" +
    "            <input type=\"checkbox\" id=\"subscribe-checkbox\" ng-model=\"emailSubscribe\"/><label class=\"small\" for=\"subscribe-checkbox\">Want to hear about new features?</label>\n" +
    "        </span>\n" +
    "\n" +
    "        <span class=\"error\" ng-show=\"errorMessage.length > 0\">{{errorMessage}}</span>\n" +
    "\n" +
    "        <button class=\"large pay\" ng-click=\"paypalSubmit()\" ng-class=\"{disabled: pitchingIn}\">Pay ${{currentCharge / 100 | number : 2}} <img ng-show=\"pitchingIn\" src=\"/assets/loading_transparent.gif\" height=\"28px\" width=\"28px\"></button>\n" +
    "    </form>\n" +
    "    <div class=\"cancel-button\"><p class=\"cancel-button\" ng-click=\"hidePopover()\">Cancel</p></div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/popover/popover.html',
    "<div class=\"popover-wrapper\" ng-class=\"{shown: popoverShown}\" ng-style=\"{top: topPosition}\">\n" +
    "    <div class=\"popover-container\"></div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/popover/profile/profile-popover.html',
    "<div class=\"profile-popover\" ng-controller=\"ProfilePopoverController\" >\n" +
    "    <div class=\"leftcol\">\n" +
    "        <h1 class=\"white\">Upload your Photo!</h1>\n" +
    "        <p>Your picture will show up on the pieces you purchased and next to your message on the group card that will be hand-made and mailed to the recipient.</p>\n" +
    "        <img src=\"/assets/cardExample.png\"><img src=\"/assets/gridExample.png\">\n" +
    "    </div>\n" +
    "    <div class=\"rightcol\">\n" +
    "        <div class=\"profile-wrapper\">\n" +
    "            <div id=\"profile-image-container\" ng-class=\"{edit: editMode}\">\n" +
    "                <img id=\"profile-image\" ng-src=\"{{profilePicture}}\" ng-hide=\"editMode\" src=\"\"/>\n" +
    "                <gs-image-upload ng-show=\"editMode\" on-image-updated=\"imageUpdated\"></gs-image-upload>\n" +
    "                <button class=\"cancel\" ng-show=\"editMode\" ng-click=\"editMode = false;\">X</button>\n" +
    "                <a class=\"edit button\" ng-show=\"!editMode\" ng-click=\"editMode=true;\" onclick=\"$('#profile-image-container gs-image-upload div div button.image').click()\">EDIT</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <input id=\"useAsProfilePicture\" ng-hide=\"userHasDefaultProfileImage\" type=\"checkbox\" ng-model=\"useAsProfilePicture\">\n" +
    "            <label for=\"useAsProfilePicture\" ng-hide=\"userHasDefaultProfileImage\">Use this as my default profile picture</label>\n" +
    "            <label for=\"useAsProfilePicture\" ng-show=\"userHasDefaultProfileImage\">Since you've never added an image before, this will become your profile picture.</label>\n" +
    "        </div>\n" +
    "        <button class=\"large white-border\" ng-click=\"action.submit()\" ng-class=\"{disabled: !imageSet}\">Submit Photo</button>\n" +
    "        <div class=\"cancel-button\"><a class=\"cancel-button button\" ng-click=\"cancel()\">Cancel</a></div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/popover/sweepstakes/sweepstakes-popover.html',
    "<div class=\"sweeps-popover\">\n" +
    "    <div class=\"close\" style=\"opacity:0.8\" ng-click=\"close()\">X</div>\n" +
    "    <div class=\"logoArea\"></div>\n" +
    "    <div class=\"content\">\n" +
    "        <div class=\"arrow-down\"></div>\n" +
    "        <h1>Enter to Win - Our Gift to You</h1>\n" +
    "        <p class=\"intro\">\n" +
    "            Experience GiftStarter yourself! Simply provide your name and email address below and you'll be\n" +
    "            entered to win your choice of an icPooch - Internet Pet Treat Dispenser with 6oz of icPooch\n" +
    "            Cookies ($130 value), or a Keurig&reg; K45 Elite Brewing System ($120 value).<sup>*</sup>\n" +
    "        </p>\n" +
    "        <div class=\"prizes\">\n" +
    "            <div class=\"sweepsBL\"></div>\n" +
    "            <div class=\"sweepsGP\"></div>\n" +
    "            <div style=\"clear: both; height: 0;\"></div>\n" +
    "        </div>\n" +
    "        <form name=\"sweepForm\" ng-submit=\"submit()\" novalidate>\n" +
    "            <div>\n" +
    "                <input type=\"text\" name=\"first\" class=\"name\" ng-model=\"model.first\" placeholder=\"First Name\" required/>\n" +
    "                <input type=\"text\" name=\"last\" class=\"name\" ng-model=\"model.last\" placeholder=\"Last Name\" required/>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <span ng-show=\"sweepForm.$submitted && sweepForm.first.$error.required\">First name is required.</span>\n" +
    "                <span ng-show=\"sweepForm.$submitted && sweepForm.last.$error.required\">Last name is required.</span>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <input type=\"email\" name=\"email\" class=\"email\" ng-model=\"model.email\" placeholder=\"Email Address\" required/>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <span ng-show=\"sweepForm.$submitted && sweepForm.email.$error.required\">Email is required.</span>\n" +
    "                <span ng-show=\"sweepForm.$submitted && sweepForm.email.$error.email\">Invalid email.</span>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <input type=\"submit\" value=\"Submit\" />\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <a ng-click=\"close()\">{{model.message}}</a>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "        <p class=\"disclaimer\">\n" +
    "            * All entries must be received by 11:59pm PT on Tuesday, March 31, 2015. By entering,\n" +
    "            you are agreeing to receive email communication from GiftStarter. Employees of GiftStarter\n" +
    "            and their families are not eligible to participate.<a style=\"float: right; opacity: .8\" ng-click=\"close()\">cancel</a>\n" +
    "        </p>\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/scripts/popover/thanks/thanks-popover.html',
    "<div class=\"thanks-popover\" ng-controller=\"ThanksPopoverController\">\n" +
    "    <h1 class=\"white\">Success!</h1>\n" +
    "    <p>Ah, that warm fuzzy feeling is the best, isn't it? Thank you for using GiftStarter as the new way to give! Seriously-we think you're just phenomenal.</p>\n" +
    "    <p>Give some friends the opportunity to get some warm fuzzies from this GiftStart, too.</p>\n" +
    "    <div class=\"buttons\">\n" +
    "        <!--<button class=\"share\" ng-click=\"socialShare()\">Facebook</button>-->\n" +
    "        <!--<a href=\"mailto:?subject={{mailSubject}}&body={{mailBody}}\" target=\"_blank\" ng-click=\"mixpanel.track('Email share in thanks clicked');\"><button class=\"share\">Email</button></a>-->\n" +
    "        <!--<button class=\"large white-border\" ng-click=\"close()\">Close</button>-->\n" +
    "        <div class=\"share-button\" ng-click=\"emailShare()\"><img class=\"share-button\" src=\"/assets/login_email.png\" /></div>\n" +
    "        <div class=\"share-button\" ng-click=\"facebookShare()\"><img class=\"share-button\" src=\"/assets/login_facebook2.png\" /></div>\n" +
    "        <div class=\"share-button\" ng-click=\"twitterShare()\"><img class=\"share-button\" src=\"/assets/login_twitter2.png\" /></div>\n" +
    "        <div class=\"share-button\" ng-click=\"googlePlusShare()\"><img class=\"share-button\" src=\"/assets/login_google2.png\" /></div>\n" +
    "    </div>\n" +
    "    <p>Want to start your own GiftStart?<br>It's easy – start <a href=\"/\" ng-click=\"hidePopover()\">here.</a></p>\n" +
    "    <div class=\"cancel-button\"><p class=\"cancel-button\" ng-click=\"hidePopover()\">Close</p></div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/product/product-search.html',
    "<!--<div class=\"product-link wrapper\" ng-controller=\"ProductLinkController\">-->\n" +
    "<div id=\"product-search-anchor\" class=\"product-link\">\n" +
    "    <div class=\"search wrapper\">\n" +
    "        <div class=\"inputs\">\n" +
    "            <input id=\"product-search-input\" class=\"text-input\" type=\"text\" name=\"product-link\" placeholder=\"SEARCH HERE FOR THE PERFECT GIFT...\" ng-model=\"product_url\" ng-keyup=\"$event.keyCode == 13 ? submit() : null\"/><button id=\"product-search-button\" class=\"submit searchbtn\" ng-click=\"submit()\">SEARCH</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"categories-container hidden\">\n" +
    "      <div class=\"categories\">\n" +
    "        <p><strong>BRANDS:</strong></p>\n" +
    "        <ul>\n" +
    "          <li><a target=\"_top\" href=\"/search/apple\">Apple</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/bose\">Bose</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/butter+london\">butter LONDON</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/cuisinart\">Cuisinart</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/dyson+vacuum\">Dyson</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/fat+cork\">Fat Cork</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/frends\">Frends</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/icpooch\">iCPooch</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/samsung\">Samsung</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/sturtevants\">Sturtevant's Sports</a></li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "      <div class=\"categories\">\n" +
    "        <p><strong>BABY GIFTS:</strong></p>\n" +
    "        <ul>\n" +
    "          <li><a target=\"_top\" href=\"/search/baby+crib\">Baby Crib</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/bassinet\">Bassinet</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/cradle\">Cradle</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/crib+bedding\">Crib Bedding</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/diaper+bag\">Diaper Bag</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/high+chair\">High Chair</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/playard\">Playard</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/rocking+chair\">Rocking Chair</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/stroller\">Stroller</a></li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "      <div class=\"categories\">\n" +
    "        <p><strong>ELECTRONIC GIFTS:</strong></p>\n" +
    "        <ul>\n" +
    "          <li><a target=\"_top\" href=\"/search/camera\">Camera</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/home+theater\">Home Theater</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/ipad\">iPad</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/iphone\">iPhone</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/ipod\">iPod</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/macbook\">Macbook</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/playstation\">Playstation</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/television\">Television</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/wireless+speaker\">Wireless Speakers</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/xbox\">Xbox</a></li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "      <div class=\"categories\">\n" +
    "        <p><strong>HOME + WEDDING GIFTS:</strong></p>\n" +
    "        <ul>\n" +
    "          <li><a target=\"_top\" href=\"/search/barbecue+grill\">Barbecue Grill</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/dog+bed\">Dog Bed</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/duvet\">Duvet</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/fish+tank\">Fish Tank</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/keurig\">Keurig</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/lawn+mower\">Lawn Mower</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/rug\">Rugs</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/Vitamix\">Vitamix</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/sofa\">Sofa</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/toaster+oven\">Toaster Oven</a></li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"loading\" ng-show=\"loading\">\n" +
    "        <img src=\"/assets/loading.gif\"/>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"failed\" ng-show=\"failed\">\n" +
    "        <img src=\"/assets/failed.png\"/>\n" +
    "        <div>\n" +
    "            <p>Looks like that search term didn’t find any results.</p><p>Please try a more specific term, or email our gift concierge at <a href=\"mailto:giftconcierge@giftstarter.com\" ng-click=\"giftConciergeClicked()\">giftconcierge@giftstarter.com</a> for help finding the perfect gift!</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"failed\" ng-show=\"results_empty\">\n" +
    "        <img src=\"/assets/failed.png\"/>\n" +
    "        <div>\n" +
    "            <p>Looks like that search term didn’t find any results.</p><p>Please try a more specific term, or email our gift concierge at <a href=\"mailto:giftconcierge@giftstarter.com\" ng-click=\"giftConciergeClicked()\">giftconcierge@giftstarter.com</a> for help finding the perfect gift!</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <section id=\"search-products-section\" class=\"products\" ng-class=\"{hidden: products.length == 0}\">\n" +
    "        <div class=\"product-container\" ng-class=\"{selected: product.selected}\" ng-repeat=\"product in selectedProducts\" ng-hide=\"!product.imgUrl\" ng-click=\"showProductDetails({{$index}})\">\n" +
    "            <div class=\"product\">\n" +
    "                <div class=\"image-container\">\n" +
    "                    <span class=\"vert-align-helper\"></span>\n" +
    "                    <img ng-click=\"goToProduct($index);\" ng-src=\"{{product.imgUrl}}\" onerror=\"angular.element($(this)).scope().fixImage(this);\" index=\"{{$index}}\" />\n" +
    "                </div>\n" +
    "                <div class=\"product-details\">\n" +
    "                    <h4 class=\"title\" ng-click=\"goToProduct($index, $event);\">{{product.title}}</h4>\n" +
    "                    <p class=\"description\" ng-bind-html=\"product.description\"></p>\n" +
    "                    <p class=\"price block\">${{product.price / 100 | number : 2}}</p>\n" +
    "                    <div class=\"buttons\">\n" +
    "                        <button class=\"giftstart primary\" ng-click=\"startCampaignFrom($index);$event.stopPropagation();\">GiftStart it</button>\n" +
    "                        <button class=\"giftstart green\" ng-click=\"saveForLater($index);$event.stopPropagation();\">Save for Later <img ng-show=\"isSavingForLater\" class=\"loader\" src=\"/assets/loading_transparent.gif\"></button>\n" +
    "                        <div class=\"product-message\" ng-show=\"product.selected\" ng-bind-html=\"productMessage\"></div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <button class=\"cancel\" ng-click=\"hideProductDetails();$event.stopPropagation();\">X</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"page-buttons\" ng-show=\"products.length > 10\" >\n" +
    "            <a class=\"button linky\" ng-click=\"decrementPage()\">Previous</a><span class=\"page-number\" ng-class=\"{selected: pageNumber == selectedPage}\" ng-repeat=\"pageNumber in pageNumbers\" ng-click=\"selectPage(pageNumber)\">{{pageNumber}}</span><a class=\"button linky\" ng-click=\"incrementPage()\">Next</a>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "    <!--p class=\"need-help-concierge\">Can't find the gift you want? Simply contact our <a href=\"/concierge\" ng-click=\"giftConciergeClicked()\">Gift Concierge</a> and we'll find it for you. Or visit our <a href=\"/giftideas\">Gift Ideas</a> page for more ideas.</p-->\n" +
    "</div>"
  );


  $templateCache.put('/scripts/share/invite-pitchin.html',
    "<div id=\"shareControllerWrapper\" class=\"share pitchin\" ng-controller=\"ShareController\">\n" +
    "    <div id=\"title\">\n" +
    "        <h1>Invite Friends to Pitch-in</h1>\n" +
    "        <!--p>Your GiftStarter campaign is successfully set up! Invite friends to help pitch-in\n" +
    "        and increase your chances of fully funding the gift!</p-->\n" +
    "    </div>\n" +
    "\n" +
    "    <ng-include src=\"'/scripts/login/login-or-create.html'\"></ng-include>\n" +
    "\n" +
    "    <div ng-show=\"loggedIn()\" id=\"share-block\">\n" +
    "        <div id=\"content\">\n" +
    "            <div class=\"block message\">\n" +
    "            <h4>YOUR MESSAGE</h4>\n" +
    "            <textarea id=\"shareMessage\" ng-model=\"message\"></textarea>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"share-where block\">\n" +
    "                <div class=\"share-where-social\">\n" +
    "                    <h4>SHARE ON SOCIAL MEDIA</h4>\n" +
    "                    <p>Select which networks you would like to post on:</p>\n" +
    "                    <div id=\"social-icons-container\">\n" +
    "                        <a class=\"social__link linky\" ng-click=\"selectedSocials['facebook']=false\"><img class=\"social__icons\" src=\"/assets/share/facebook.png\" ng-show=\"selectedSocials['facebook']\"></a>\n" +
    "                        <img class=\"social__icons linky\" src=/assets/share/facebook-share-unselected.png ng-hide=\"selectedSocials['facebook']\" ng-click=\"selectSocial('facebook')\"/>\n" +
    "                        <a class=\"social__link linky\" ng-click=\"selectedSocials['twitter']=false\"><img class=\"social__icons\" src=\"/assets/share/twitter.png\" ng-show=\"selectedSocials['twitter']\"></a>\n" +
    "                        <img class=\"social__icons linky\" src=/assets/share/twitter-share-unselected.png ng-hide=\"selectedSocials['twitter']\" ng-click=\"selectSocial('twitter')\"/>\n" +
    "                        <a class=\"social__link linky\" ng-click=\"selectedSocials['linkedin']=false\"><img class=\"social__icons\" src=\"/assets/share/linkedin.png\" ng-show=\"selectedSocials['linkedin']\"></a>\n" +
    "                        <img class=\"social__icons linky\" src=/assets/share/linkedin-share-unselected.png ng-hide=\"selectedSocials['linkedin']\" ng-click=\"selectSocial('linkedin')\"/>\n" +
    "                        <!--<a class=\"social__link linky\" ng-click=\"selectedSocials['google']=false\"><img class=\"social__icons\" src=\"/assets/share/google.png\" ng-hide=\"!sharePermission['google'] || !selectedSocials['google']\"></a>-->\n" +
    "                        <!--<img class=\"social__icons linky\" src=/assets/share/google-share-unselected.png ng-show=\"!selectedSocials['google']\" ng-click=\"selectSocial('google')\"/>-->\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"share-where-email\">\n" +
    "                    <h4>SEND AN EMAIL</h4>\n" +
    "                    <p>Enter email addresses separated by a comma<!--, or import gmail contacts to select email addresses-->:</p>\n" +
    "                    <!--a href=\"\"><h4>IMPORT GMAIL CONTACTS</h4></a-->\n" +
    "                    <textarea ng-model=\"emailRecipients\" placeholder=\"Enter email addresses, separated by commas\"></textarea>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"share-buttons\">\n" +
    "            <p ng-show=\"shareSuccess\">YOUR SHARE SUCCESSFULLY POSTED!</p>\n" +
    "            <p class=\"twitter-note\" ng-show=\"selectedSocials['twitter'] && message.length>118\">Note: For Twitter, only the first 118 characters of your message and a link to this campaign will be posted.</p>\n" +
    "            <button class=\"red\" ng-hide=\"shareSuccess\" ng-disabled=\"!selectedSocials['facebook']&&!selectedSocials['twitter']&&!selectedSocials['linkedin']&&!selectedSocials['google']&&emailRecipients.length==0\" ng-click=\"shareClick()\">SHARE</button>\n" +
    "            <button ng-show=\"shareSuccess\" ng-click=\"shareReset()\">SHARE AGAIN</button>\n" +
    "            <button ng-show=\"shareSuccess\" ng-click=\"$parent.showSharePanel(false); shareReset()\">FINISH</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"share-where-link\">\n" +
    "            <h4>SHARE A LINK!</h4>\n" +
    "            <p>Use this link to invite friends and family to GiftStarter through any means you'd like:</p>\n" +
    "            <input value=\"{{campaignUrl()}}\" gs-copy-url readonly/>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--a href=\"\"><h4>SKIP AND SHARE LATER</h4></a>\n" +
    "        <p>You can share your campaign at any time from your profile page or the campaign page!</p-->\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/staffpicks/staffpicks.ng.html',
    "<div class=\"staffpicks\" ng-controller=\"StaffPicksController\">\n" +
    "  <div id=\"outer\">\n" +
    "    <div id=\"titlexo\">\n" +
    "      <img src=\"/assets/staffpicks/staff-picks-title-image.png\" />\n" +
    "    </div>\n" +
    "    <div class=\"rotate\">\n" +
    "      <div class=\"product-item first\">\n" +
    "        <a ng-href=\"{{firstProduct.link}}\"><img class=\"left-col\" ng-src=\"{{firstProduct.image}}\"/></a>\n" +
    "        <div class=\"corner-box\"></div>\n" +
    "        <div>\n" +
    "          <img class=\"avatar\" ng-src=\"{{firstProduct.avatar}}\"/>\n" +
    "          <p>{{firstProduct.desc}}</p>\n" +
    "        </div>\n" +
    "        <div class=\"bottom\">\n" +
    "          <hr />\n" +
    "          <p class=\"title\">{{firstProduct.title}}</p>\n" +
    "          <p>{{firstProduct.price}}</p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"product-item second\">\n" +
    "        <a ng-href=\"{{secondProduct.link}}\"><img class=\"left-col\" ng-src=\"{{secondProduct.image}}\"/></a>\n" +
    "        <div class=\"corner-box\"></div>\n" +
    "        <img class=\"avatar\" ng-src=\"{{secondProduct.avatar}}\"/>\n" +
    "        <p>{{secondProduct.desc}}</p>\n" +
    "        <div class=\"bottom\">\n" +
    "          <hr />\n" +
    "          <p class=\"title\">{{secondProduct.title}}</p>\n" +
    "          <p>{{secondProduct.price}}</p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div id=\"clear\"></div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/static-pages/about/about.html',
    "<div class=\"about body static-pages\" ng-controller=\"AboutController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>WHAT IS GIFTSTARTER?</h1>\n" +
    "    <p>Our mission is to reinvent gifting by putting our hearts back into the giving experience. Give amazing gifts you're proud of, and your friends and loved ones are delighted to get. From a group or from yourself, we'll make it happen. It's that easy.</p>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main threeup\">\n" +
    "    <h2>The Team</h2>\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/arry.png\" alt=\"\" />\n" +
    "      <h3><b>Arry Yu</b></h3>\n" +
    "      <h4>CEO/Cofounder</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/christie.png\" alt=\"\" />\n" +
    "      <h3><b>Christie Gettler</b></h3>\n" +
    "      <h4>Design/Cofounder</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/sharon.png\" alt=\"\" />\n" +
    "      <h3><b>Sharon Kuo</b></h3>\n" +
    "      <h4>Web Engineering</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/joel.png\" alt=\"\" />\n" +
    "      <h3><b>Joel Serino</b></h3>\n" +
    "      <h4>Product Growth</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/tyler.png\" alt=\"\" />\n" +
    "      <h3><b>Tyler Goelz</b></h3>\n" +
    "      <h4>UX Engineer</h4>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"mission\">\n" +
    "    <hr />\n" +
    "    <h2>Our Mission</h2>\n" +
    "    <p class=\"font\">To enable people to make meaningful connections with others using the power of gifts.<br />\n" +
    "      <b>Want to send a gift to someone?</b><br /><a href=\"/giftideas\">You can with GiftStarter</a><br />\n" +
    "      <b>Want to send a group gift to someone?</b><br /><a href=\"/giftideas\">You can with GiftStarter</a><br />\n" +
    "      <b>Want to save up piece by piece for a gift?</b><br /><a href=\"/giftideas\">You can with GiftStarter</a><br />\n" +
    "    Your time is valuable. Don't waste another second -- use GiftStarter for all of your gifting needs.</p>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"milestones\">\n" +
    "    <hr />\n" +
    "    <h2>Our Milestones</h2>\n" +
    "    <table>\n" +
    "      <tr>\n" +
    "        <td><b>March 2014</b></td>\n" +
    "        <td>1<sup>st</sup> place win at Startup Weekend ReDesign Seattle</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <td><b>July 2014</b></td>\n" +
    "        <td>Launched with products from Amazon.com, REI, Nordstrom, Filson, and Costco</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <td><b>August 2014</b></td>\n" +
    "        <td>Accepted into 9Mile Labs (a B2B Technology Startup Accelerator) in Seattle</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <td><b>September 2014</b></td>\n" +
    "        <td>Added over 3,000,000 products from retailers like 1-800-Flowers, B&H Photo, Best Buy, BackCountry, Sur La Table, and Kohl's</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <td><b>October 2014</b></td>\n" +
    "        <td>Launched partnership with butter LONDON&reg;</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <td><b>November 2014</b></td>\n" +
    "        <td>Launched partnerships with Sturtevant's Sports, FatCork, and iCPooch</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <td><b>Janurary 2015</b></td>\n" +
    "        <td>Our first angel investor, Gary Rubens, joins the GiftStarter team</td>\n" +
    "      </tr>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"advisors threeup\">\n" +
    "    <hr />\n" +
    "    <h2>Our Advisors</h2>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/barbary-brunner.png\" alt=\"\" />\n" +
    "      <h3><b>Barbary Brunner</b></h3>\n" +
    "      <h4>Advisor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/jonathan-sposato-advisor.png\" alt=\"\" />\n" +
    "      <h3><b>Jonathan Sposato</b></h3>\n" +
    "      <h4>Advisor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/gina.png\" alt=\"\" />\n" +
    "      <h3><b>Gina Cuff</b></h3>\n" +
    "      <h4>Ecommerce Advisor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/rob-adams.png\" alt=\"\" />\n" +
    "      <h3><b>Rob Adams</b></h3>\n" +
    "      <h4>Advisor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/hoon.png\" alt=\"\" />\n" +
    "      <h3><b>Hoon Kong</b></h3>\n" +
    "      <h4>Engineering Advisor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"investors\">\n" +
    "    <hr />\n" +
    "    <h2>Our Investors</h2>\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/9mile-labs.png\" alt=\"\" />\n" +
    "      <h3><b>9Mile Labs</b></h3>\n" +
    "      <h4>Accelerator/Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/gary-rubens.png\" alt=\"\" />\n" +
    "      <h3><b>Gary Rubens</b></h3>\n" +
    "      <h4>Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/arry-investor.png\" alt=\"\" />\n" +
    "      <h3><b>Arry Yu</b></h3>\n" +
    "      <h4>Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/rao-investor.png\" alt=\"\" />\n" +
    "      <h3><b>Rao Remala</b></h3>\n" +
    "      <h4>Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/rob-adams.png\" alt=\"\" />\n" +
    "      <h3><b>Rob Adams</b></h3>\n" +
    "      <h4>Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/rudy-gadre.png\" alt=\"\" />\n" +
    "      <h3><b>Rudy Gadre</b></h3>\n" +
    "      <h4>Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/jonathan-sposato-advisor.png\" alt=\"\" />\n" +
    "      <h3><b>Jonathan Sposato</b></h3>\n" +
    "      <h4>Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/500startups.png\" alt=\"\" />\n" +
    "      <h3><b>500 Startups</b></h3>\n" +
    "      <h4>Accelerator/Investor</h4>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div id=\"contactus\" class=\"Contact\">\n" +
    "    <hr />\n" +
    "    <h2>Contact Us</h2>\n" +
    "    <p class=\"font\">\n" +
    "      <b>For Help:</b> email our Gift Concierge at <a href=\"mailto:giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a><br /><b>For Press and Partners:</b> email <a href=\"mailto:partner@giftstarter.com\">partner@giftstarter.com</a><br/><br/>\n" +
    "      Also, feel free to call us at 206-486-4849!<br/><br/>\n" +
    "      GIFTSTARTER (also known as Emotiv Labs, Inc.)<br/>\n" +
    "      3727 S. Alaska Street<br/>\n" +
    "      Suite #18284<br/>\n" +
    "      Seattle, WA 98118\n" +
    "    </p>\n" +
    "    <a href=\"/giftideas\" alt=\"\" class=\"button\">START GIFTING</a>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/static-pages/card/card.html',
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head lang=\"en\">\n" +
    "    <meta charset=\"UTF-8\">\n" +
    "    <title></title>\n" +
    "    <link rel=\"stylesheet\" href=\"/stylesheets/compiled.css\"/>\n" +
    "    <link href='https://fonts.googleapis.com/css?family=Roboto:300,600' rel='stylesheet' type='text/css'>\n" +
    "</head>\n" +
    "<body>\n" +
    "\n" +
    "    <section class=\"bow card\">\n" +
    "        <div class=\"product\">\n" +
    "            <img src=\"{{product_img_url}}\"/>\n" +
    "        </div>\n" +
    "        <img class=\"bow image\" src=\"/assets/card_bow.png\"/>\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"whats-giftstarter card\">\n" +
    "        <div class=\"wrapper\">\n" +
    "            <img class=\"logo\" src=\"/assets/Logo-01.png\">\n" +
    "            <p class=\"copy\"><b>Congratulations!</b></p>\n" +
    "            <p class=\"copy\">This {{product_name}} gift was group gifted for you using GiftStarter, so that your family and friends could pitch in to give you this amazing gift. Your Gift Champion, {{gc.name}}, rallied the troops and helped make this happen. This is the handmade card with all of their personal messages to you. And... YES, the actual gift is on its way to you. Watch your mailbox!</p>\n" +
    "            <p class=\"copy\">Happy gifting!</p>\n" +
    "            <!--<p class=\"signoff\">Love,</p>-->\n" +
    "            <!--<p class=\"signature\">THE GIFTSTARTER TEAM</p>-->\n" +
    "        </div>\n" +
    "        <footer>\n" +
    "            <p>SAY THANK YOU HERE!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"{{giftstart_url}}\">{{giftstart_url}}</a></p>\n" +
    "        </footer>\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"gift-champion giver card\">\n" +
    "        <img src=\"{{gc.img_url}}\">\n" +
    "        <div>\n" +
    "            <p class=\"comment\">{{gc.comment}}</p>\n" +
    "            <p class=\"name\">{{gc.name}}</p>\n" +
    "            <p class=\"the-giftstarter\">Gift Champion</p>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"grid card\">\n" +
    "        <div class=\"wrapper\">\n" +
    "            <div class=\"grid\"><img class=\"product\" src=\"{{product_img_url}}\"/><div class=\"overlay\">{% for part_img_url in parts -%}<div class=\"part\" style=\"width: {{part_width}}; height: {{part_height}};\">{% if part_img_url %}\n" +
    "                <img class=\"part-image\" src=\"{{part_img_url}}\" style=\"max-height: {{max_img_height}};\"/>\n" +
    "                {% endif %}\n" +
    "            </div>{%- endfor %}</div></div>\n" +
    "        </div>\n" +
    "        <!--<p>TO VIEW THE WHOLE ONLINE GIFT, VISIT</p>-->\n" +
    "        <a href=\"{{giftstart_url}}\">{{giftstart_url}}</a>\n" +
    "    </section>\n" +
    "\n" +
    "    {% for giver in givers %}\n" +
    "    <section class=\"giver card\">\n" +
    "        <img src=\"{{giver.img_url}}\">\n" +
    "        <div>\n" +
    "            <p class=\"comment\">{% if giver.comment %}{{giver.comment}}{% endif %}</p>\n" +
    "            <p class=\"name\">{{giver.name}}</p>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "    {% endfor %}\n" +
    "\n" +
    "</body>\n" +
    "</html>"
  );


  $templateCache.put('/scripts/static-pages/concierge/concierge.html',
    "<div class=\"concierge static-pages\" ng-controller=\"ConciergeController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>GIFT CONCIERGE IS STANDING BY</h1>\n" +
    "    <p>Need help coming up with ideas, finding a specific gift, or setting up your gift? Send any gift request and we can help.</p>\n" +
    "    <a class=\"button red\" target=\"_blank\" href=\"javascript:void(0);\" onclick=\"olark('api.box.expand')\">CONTACT NOW</a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main\">\n" +
    "    <h2>Give an Amazing Gift</h2>\n" +
    "    <div class=\"concierge-item intro\">\n" +
    "      <p>Give them a gift you're proud to give - and they're happy to get. By bringing people together with GiftStarter, you can give the gift they won't be able to stop talking about.<br /></p><blockquote>\"The best thing about the Gift Concierge is that someone will go out of their way to help you find the perfect gift and to craft the perfect experience. It is like recruiting a super hero that will make the impossible possible.\" - Thibault L.</blockquote><p>The Gift Concierge is here to help you make it happen. See all the ways the Gift Concierge can assist you.</p>\n" +
    "      <a class=\"button\" href=\"/howitworks\">HOW IT WORKS</a>\n" +
    "    </div>\n" +
    "    <div class=\"concierge-item form\">\n" +
    "      <p>Fill out the form below and we'll get back to you the same day (if possible) or within 24 hours guaranteed.</p>\n" +
    "      <div id=\"concierge-form\">\n" +
    "        <form ng-submit=\"sendMsg()\">\n" +
    "          <input type=\"text\" name=\"title\" ng-model=\"title\" placeholder=\"What event is the gift for?\" /><br/>\n" +
    "          <input type=\"text\" name=\"budget\" ng-model=\"budget\" placeholder=\"Is there a budget you want to stay within?\" /><br/>\n" +
    "          <input type=\"text\" name=\"url\" ng-model=\"url\" placeholder=\"URL to the gift you're thinking of\" /><br/>\n" +
    "          <input type=\"email\" name=\"email\" ng-model=\"email\" placeholder=\"Your email address (required)\" /><br/>\n" +
    "          <input type=\"text\" name=\"comments\" ng-model=\"comments\" placeholder=\"Additional comments\" /><br/>\n" +
    "          <button type=\"submit\" class=\"button red\">SUBMIT</button>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "      <p>{{msg}}</p>\n" +
    "    </div>\n" +
    "    <hr />\n" +
    "    <h2>Give the perfect group gift, every time.</h2>\n" +
    "    <div class=\"info\">\n" +
    "      <div class=\"info-item\">\n" +
    "        <img src=\"/assets/concierge/img/clock-icon-2x.png\" alt=\"We'll help you find the perfect gift\">\n" +
    "        <br/>\n" +
    "        <h4>Timely, Personalized Service</h4>\n" +
    "        <p>Our Gift Concierge can provide fast and friendly guidance on how to make your gift campaign a success. We can also help you \"quick start\" your GiftStart campaign by setting it up exactly to your needs then sending you the link.</p>\n" +
    "      </div>\n" +
    "      <div class=\"info-item\">\n" +
    "        <img src=\"/assets/concierge/img/gift-icon-2x.png\" alt=\"Custom help in finding the right gift\">\n" +
    "        <br/>\n" +
    "        <h4>Personal Gifter</h4>\n" +
    "        <p>Fun, Fast and No Pressure Gift Ideas - we provide recommendations without the feeling of obligation to take our advice. Once you settle on the perfect gift and the campaign is set up, we take care of the rest through the GiftStarter platform (collecting payments and personal messages, making the card, shipping). We've seen hundreds of group gifts, let us help you find yours!</p>\n" +
    "      </div>\n" +
    "      <div class=\"info-item\">\n" +
    "        <img src=\"/assets/concierge/img/bulb-icon-2x.png\" alt=\"Group Gift any gift you can imagine\">\n" +
    "        <br/>\n" +
    "        <h4>If You Can Dream It, You Can Gift It</h4>\n" +
    "        <p>Can't find it on our site? We can make that perfect Group Gift Campaign a reality. No matter what the gift, whether it's horseback riding lessons with a local provider or an airline ticket to a beautiful beach, we can make it happen! For ideas and inspiration, check our <a href=\"http://www.pinterest.com/Giftstarter/\">2014 Gift Guides on Pinterest.</a></p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/static-pages/faq/faq.html',
    "<div class=\"faq static-pages\" ng-controller=\"FaqController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>FREQUENTLY ASKED QUESTIONS</h1>\n" +
    "    <p>We are here to help in any way we can. If you need help coming up with ideas, finding a gift or setting up your gift, send any request to us. We respond within 1 business day (9AM-7PM PST). Email <a href=\"mailto: giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a>, call 206-486-4849, or use the chat option in the bottom right corner of your window.</p>\n" +
    "  </div>\n" +
    "    <div class=\"main\">\n" +
    "      <h2 ng-click=\"toggleAll()\"><img src=\"/assets/plus1.png\" class=\"expand\" ng-hide=\"openQuestions.length == questionCount\"/><img src=\"/assets/minus.png\" class=\"contract\" ng-show=\"openQuestions.length == questionCount\"/><span ng-hide=\"openQuestions.length == questionCount\">Expand All</span><span ng-show=\"openQuestions.length == questionCount\">Close All</span></h2>\n" +
    "      <div ng-repeat=\"section in items\" class=\"sections\">\n" +
    "        <h1>{{section.name}}</h1>\n" +
    "        <div ng-repeat=\"question in section.questions\">\n" +
    "          <h2 ng-click=\"toggleQuestion(question)\" ng-class=\"{open: isOpenQuestion(question)}\"><img src=\"/assets/plus1.png\" class=\"expand\" ng-hide=\"isOpenQuestion(question)\"/><img src=\"/assets/minus.png\" class=\"contract\" ng-show=\"isOpenQuestion(question)\"/>{{question.question}}</h2>\n" +
    "          <p ng-show=\"isOpenQuestion(question)\" ng-bind-html=\"question.answer\"></p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/static-pages/giftideas/giftideas.html',
    "<div class=\"giftideas wrapper static-pages\" ng-controller=\"GiftideasController\">\n" +
    "    <!-- ==== HEADERWRAP ==== -->\n" +
    "    <div class=\"headerwrap\" name=\"home\" title=\"GiftStarter Team\" ng-show=\"!category\">\n" +
    "        <h1>FIND THE PERFECT GIFT</h1>\n" +
    "        <p>It's that easy.  Weddings, baby showers, birthdays, any occasion - simply find the perfect gift, share it with friends & family so they can pitch in, and we'll take care of shipping it... including a handmade card.</p>\n" +
    "    </div><!-- /headerwrap -->\n" +
    "\n" +
    "    <ng-include src=\"'/scripts/giftideas/giftideas.ng.html'\"></ng-include>\n" +
    "\n" +
    "    <div class=\"clear\">\n" +
    "        <p>&nbsp;</p>\n" +
    "        <h4 class=\"centered\">Looking for something else?</h4>\n" +
    "        <gs-product-search></gs-product-search>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"category || product\" id=\"disclaimer\">\n" +
    "        If the item you GiftStart has color, size or other options, please contact the Gift Concierge to ensure you get the item that best meets your specifications or if you have any other questions regarding your product selection.\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/static-pages/howitworks/howitworks.html',
    "<div class=\"howitworks static-pages\" ng-controller=\"HowItWorksController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>HOW IT WORKS</h1>\n" +
    "    <p>Let us tell you a bit more about how it works.<br />GiftStarter is the place to give and get meaningful gifts. Gift and pay for ANY product or service TO anyone WITH anyone.</p>\n" +
    "    <a class=\"button red\" target=\"_blank\" href=\"/concierge\">ASK A QUESTION</a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main\">\n" +
    "    <div class=\"menu\">\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'welcome'\" ng-class=\"{selected: sectionShown == 'welcome'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          WELCOME\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'group-gifting'\" ng-class=\"{selected: sectionShown == 'group-gifting'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          GROUP GIFTING\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'concierge'\" ng-class=\"{selected: sectionShown == 'concierge'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          GIFT CONCIERGE\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'search'\" ng-class=\"{selected: sectionShown == 'search'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          FIND A GIFT\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'glossary'\" ng-class=\"{selected: sectionShown == 'glossary'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          GLOSSARY\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"selector-bar\"></div>\n" +
    "\n" +
    "    <div class=\"content\">\n" +
    "      <div id=\"welcome\" ng-show=\"sectionShown == 'welcome'\">\n" +
    "        <h2>Welcome to GiftStarter!</h2>\n" +
    "        <h4>Start amazing gifts here -- ones you are proud to give, and they're happy to get.</h4>\n" +
    "        <p class=\"sub\">\n" +
    "          GiftStarter is the best way to bring family and friends together to give an amazing gift. You start it -- and we help you with the rest. When you use GiftStarter, you don't have to collect the money or chase people down for cash.<br />It only takes a couple minutes to launch a campaign for your gift.\n" +
    "          <br />Start an amazing gift today! Once it is complete, we handle ensuring the card with everyone's messages and the gift is shipped!\n" +
    "        </p>\n" +
    "      </div>\n" +
    "      <div id=\"glossary\" ng-show=\"sectionShown == 'glossary'\">\n" +
    "        <h2>Giftstarter Glossary</h2>\n" +
    "        <h4>GiftStarter is a new gifting movement bringing people committed to giving amazing gifts.</h4>\n" +
    "        <p class=\"sub\">\n" +
    "          Here's a glossary of gifting words to help you in our gifting community:\n" +
    "        </p>\n" +
    "        <table>\n" +
    "          <tr>\n" +
    "            <td>GiftStarter - n.</td>\n" +
    "            <td>That's us! We are here to help you give amazing gifts you are proud to give, and they are happy to get.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Gift Champion - n.</td>\n" +
    "            <td>This is a person (you!) that starts an amazing gift, and invites family and friends to pitch in.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Contributor - n.</td>\n" +
    "            <td>The people invited in by the Gift Champion to pitch in on the amazing gift and sign the card.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Recipient - n.</td>\n" +
    "            <td>The person(s) that receive the amazing gift!</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Gift Concierge - n.</td>\n" +
    "            <td>Our Gift Concierge is like your personal shopper who will help you find and give that amazing gift.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Nudge - n, v.</td>\n" +
    "            <td>These are the gentle friendly reminders (nudges) we make in order to help ensure your gifting event is amazing.</td>\n" +
    "          </tr>\n" +
    "        </table>\n" +
    "      </div>\n" +
    "      <div id=\"search\" ng-show=\"sectionShown == 'search'\">\n" +
    "        <h2>Find an Amazing Gift</h2>\n" +
    "        <h4>GiftStarter helps you give amazing gifts you are proud to give and they are happy to get.</h4>\n" +
    "        <p class=\"sub\">GiftStarter has the tools to help you find those gifts you’re proud to give, and they’re happy to get.</p>\n" +
    "        <div class=\"search-item\">\n" +
    "          <div class=\"desc\">\n" +
    "            <p>SEARCH</p>\n" +
    "            <p>Use our search bar located at the top of the page and on the home page to search for products by name or brand. We source our gifts from reliable stores such as:</p>\n" +
    "          </div>\n" +
    "          <img src=\"/assets/howitworks/how-it-works-findagift-1.png\" />\n" +
    "        </div>\n" +
    "        <div class=\"search-item\">\n" +
    "          <div class=\"desc\">\n" +
    "            <p>GIFT CONCIERGE</p>\n" +
    "            <p>Our Gift Concierge is like you personal shopping assistant who will help you find the perfect gift for the occassion - even if it’s not on our site!</p>\n" +
    "          </div>\n" +
    "          <div id=\"search-item-concierge\">\n" +
    "            <p>You can <a href=\"mailto:giftconcierge@giftstarter.com\">email</a> (giftconcierge@giftstarter.com), contact via <a href=\"javascript:void(0);\" onclick=\"olark('api.box.expand')\">chat</a>, or call  206.486.4849</p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"search-item\">\n" +
    "          <div class=\"desc\">\n" +
    "            <p>GIFT IDEAS</p>\n" +
    "            <p>More of a browser when you shop? Our carefully curated gift ideas are a great place to see what new and exciting products there are to gift.</p>\n" +
    "          </div>\n" +
    "          <img src=\"/assets/howitworks/how-it-works-findagift-2.png\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div id=\"concierge\" ng-show=\"sectionShown == 'concierge'\">\n" +
    "        <h2>Gift Concierge</h2>\n" +
    "        <h4>Fast, fun, and no pressure personal shopper to help you find that perfect gift. Can't find it? We can help. Can't think of an idea? We can help.</h4>\n" +
    "        <p class=\"sub\">We'll get back to you same day if possible -- definitely within 24 hours.</p>\n" +
    "        <div class=\"concierge-table\">\n" +
    "          <div class=\"concierge-item\">\n" +
    "            <p>EMAIL<br/><br/>\n" +
    "              Send us an email at any time. The more information you include about your need, the more we can help!<br/><br/><br/>\n" +
    "              <a href=\"mailto:giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a>\n" +
    "            </p>\n" +
    "          </div>\n" +
    "          <div class=\"concierge-item\">\n" +
    "            <p>LIVE CHAT<br/><br/>\n" +
    "              You can access our live chat program in the bottom right corner of your browser.<br/><br/>\n" +
    "              <a href=\"javascript:void(0);\" onclick=\"olark('api.box.expand')\">Don't see it?</a><br/><br/>\n" +
    "              *Live chat available during business hours (PST)\n" +
    "            </p>\n" +
    "          </div>\n" +
    "          <div class=\"concierge-item\">\n" +
    "            <p>ONLINE FORM<br/><br/>\n" +
    "              Fill out the quick form about your gifting need and we'll get on it ASAP!<br/><br/><br/>\n" +
    "              <a href=\"/concierge\" class=\"button\">ONLINE FORM</a>\n" +
    "            </p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <p>Or you can just plain call us: 206-486-4849.</p>\n" +
    "      </div>\n" +
    "      <div id=\"group-gifting\" ng-show=\"sectionShown == 'group-gifting'\">\n" +
    "        <h2>Group Gifting Starts Here</h2>\n" +
    "        <h4>GiftStarter is a new gifting movement focused on bringing people together in a community that loves giving amazing gifts.<br/></h4>\n" +
    "        <p class=\"sub\">Our patent-pending technology divides the price of the gift into perfect pieces, giving family and friends the ability to purchases as many or as few pieces as they wish! Any product available online can be gifted with GiftStarter, and we’re here to help every step of the way. From collecting the money to shipping the gift - and even creating a special card with your personal messages - we’ve got you covered!<br/></p>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-1.png\" />\n" +
    "          <p class=\"center\"><strong>1</strong><br/>FIND A GIFT</p><p>Search from over 3 million products on our site. You can also discover our favorite gifts on our Gift Ideas page or contact our Gift Concierge for custom gifts.</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-2.png\" />\n" +
    "          <p class=\"center\"><strong>2</strong><br/>SELECT A GIFT</p><p>From the search results or Gift Ideas page, you can click on product images to view product information and details, and the “GiftStart it” button. Click this button to start your group gift!</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-3.png\" />\n" +
    "          <p class=\"center\"><strong>3</strong><br/>ADJUST THE PIECES</p><p>Click the “+” to add pieces, thus lowering the price of each piece. Click the “-” button to remove pieces, and increase the price of each piece. Consider the size of the group you’ll invite; some people will buy 1 piece, some may buy more.</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-4.png\" />\n" +
    "          <p class=\"center\"><strong>4</strong><br/>YOUR GIFTING EVENT</p><p>Describe the reason for this gift. What’s the event? Who is it for? Why is this a good gift for this person and/or event?</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-5.png\" />\n" +
    "          <p class=\"center\"><strong>5</strong><br/>THE GIFT</p><p>Tell us where this gift needs to go and when you want it there and we’ll make it happen! <br />*Note standard shipping is always free with GiftStarter</p>\n" +
    "        </div>\n" +
    "        <p class=\"clear sub\">That’s all there is to it. Share and invite friends and family to purchase pieces and give a gift that shows how much you care. We’re here to help you at any time and to ensure the gift and personal card are delivered. <br /><br />Give a remarkable gift today.</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"clear\">\n" +
    "      <a href=\"/giftideas\" alt=\"\" class=\"button\" id=\"gifting-button\">START GIFTING</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <hr />\n" +
    "\n" +
    "    <h2>Inspiring Examples</h2>\n" +
    "    <ng-include src=\"'/scripts/inspirationalexamples/inspirationalexamples.ng.html'\"></ng-include>\n" +
    "  </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/scripts/static-pages/oldbrowser/oldbrowser.html',
    "<div class=\"oldbrowser wrapper\" ng-controller=\"OldbrowserController\">\n" +
    "    <p>Whoops! Your browser is not supported.  Please use a different browser.</p>\n" +
    "    <p>If you don't have a different browser, you can download one of these for free:</p>\n" +
    "    <p><span><a href=\"https://www.google.com/chrome/browser/\"><img src=\"/assets/chrome-logo.png\"><br/>Google Chrome</a></span><span><a href=\"https://www.mozilla.org/en-US/firefox/new/\"><img src=\"/assets/firefox-logo.png\"><br/>Mozilla Firefox</a></span></p>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/static-pages/partners/partners.html',
    "<div class=\"partners static-pages\" ng-controller=\"PartnersController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>PARTNER WITH US</h1>\n" +
    "    <p>We love our brand partners. Let your customers be your advocates to their family and friends through gifting. Partner with us today, setup is fast and easy.</p>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main\">\n" +
    "    <div id=\"love\">\n" +
    "    <h2>Why do Brands Love GiftStarter?</h2>\n" +
    "    <p class=\"sub\">GiftStarter is the best group gifting service for brands. We enable seamless social commerce with our patent-pending technology. We ship a handmade card and the gift with every GiftStart. Using social, we connect family and friends to gift-pportunities. GiftStarters love our partner products and services. In fact, they are gifted 4:1 over others. Join us and give your customers a better way to gift, together.</p>\n" +
    "      <div class=\"love-item\">\n" +
    "        <img src=\"assets/partners/img/money-icon-2x.png\" alt=\"Increase Sales Opportunities\">\n" +
    "        <br>\n" +
    "        <h4>Increase Sales Opportunities</h4>\n" +
    "        <p>Broaden the reach of your target audience and increase brand exposure with GiftStarter. Group gifts expand your reach and sell additional products and services to audiences who may not have previously been exposed to your brand. Additionally, our Gift Concierge service promotes our brand partners by providing users with group gift ideas, helping to gain new customers.</p>\n" +
    "      </div>\n" +
    "      <div class=\"love-item\">\n" +
    "        <img src=\"assets/partners/img/truck-icon-2x.png\" alt=\"We Take Care of Delivery\">\n" +
    "        <br>\n" +
    "        <h4>We Take Care of Delivery</h4>\n" +
    "        <p>No hassling with special shipment inputs. GiftStarter works directly with the initiators of GiftStarts to collect recipient shipping information and directly inputs this into your current e-commerce flow.</p>\n" +
    "      </div>\n" +
    "      <div class=\"love-item\">\n" +
    "          <img src=\"assets/partners/img/no-fee-icon-2x.png\" alt=\"No Setup Fee\">\n" +
    "          <br>\n" +
    "          <h4>No Setup Fee (Early Partners Only)</h4>\n" +
    "          <p>Using our seamless integration of the GiftStarter button, we work directly with partners to ensure end-to-end integration of the group gifting experience into your e-commerce platform. This complimentary service is provided through our technical and partner teams. Setup typically takes less then 20 minutes.</p>\n" +
    "      </div>\n" +
    "      <div class=\"love-item\">\n" +
    "          <img src=\"assets/partners/img/thumb-2x.png\" alt=\"Our Users, Your Brand Ambassadors\">\n" +
    "          <br>\n" +
    "          <h4>Our Users, Your Brand Ambassadors</h4>\n" +
    "          <p>Partnering with GiftStarter brings the added benefit of engaging directly with ambassadors of your brands, as group gifting allows users to easily promote your products and services through their circle of family and friends. GiftStarter delivers a higher level of perceived value  providing more reasons to purchase including social media integration and handcrafted cards.</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <hr />\n" +
    "    <h2>Featured Partners</h2>\n" +
    "    <div>\n" +
    "      <div class=\"partner-item\">\n" +
    "        <img src=\"assets/partners/img/butter-logo-square.png\" alt=\"butterLondon - Partner\">\n" +
    "\n" +
    "        <p>“With the growing importance of social influence\n" +
    "        and mobile shopping to our customers, we needed to explore a solution that allows our Bezzie Mates to shop and give socially this holiday season. GiftStarter was the perfect partner to celebrate this customer experience and support group giftting across social and digital platforms.”</p>\n" +
    "        <h4><b>Leslie Freitag</b></h4>\n" +
    "        <h5>President & CEO</h5>\n" +
    "      </div>\n" +
    "      <div class=\"partner-item\">\n" +
    "        <img src=\"assets/partners/img/bh-logo.png\" alt=\"B&H Photo - Partner\">\n" +
    "\n" +
    "        <p>“I just love Giftstarter! I think it creates an easy platform for us to present large order items as gifts for photographers, providing a great benefit to B&H customers you can't find anywhere else!”</p>\n" +
    "        <h4><b>Menashe Wodinksy</b></h4>\n" +
    "        <h5>Online Marketing Strategist</h5>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <hr />\n" +
    "    <h2>Start Delighting Customers Now</h2>\n" +
    "    <p>Expand your brand and better connect with audiences through group gifting.</p>\n" +
    "    <a href=\"mailto:partner@giftstarter.com\" class=\"button\">PARTNER WITH US</a>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/static-pages/press/press.html',
    "<div class=\"static-pages presspage\" ng-controller=\"PressController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>IN THE NEWS</h1>\n" +
    "    <p>We've been fortunate enough to be featured by some of the most prestigious media outlets in the world. <span class=\"wrap-on-desktop\">See what all of the buzz is about.</span></p>\n" +
    "    <a class=\"button red\" target=\"_blank\" href=\"/blog\">READ MORE</a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main\">\n" +
    "    <h2>Who's talking about GiftStarter?</h2>\n" +
    "    <div class=\"press-item\" ng-repeat=\"item in items\">\n" +
    "      <a href=\"{{item.link}}\" target=\"_blank\">\n" +
    "      <img src=\"assets/press/{{item.img}}\" />\n" +
    "      </a>\n" +
    "      <p ng-bind-html=\"item.quote\"></p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"bottom\">\n" +
    "    <hr />\n" +
    "    <h2>Try it yourself!</h2>\n" +
    "    <a class=\"button\" href=\"/giftideas\">START GIFTING</a>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/static-pages/privacy/privacy.html',
    "<div class=\"faq wrapper privacyandterms\">\n" +
    "<h1>Privacy Policy</h1>\n" +
    "<p>The Site is operated by GiftStarter, Inc. (\"GiftStarter\" or the \"Company\"). This page sets forth the Privacy Policy (the \"Policy\") for the website at GiftStarter.com, all other sites owned and operated by GiftStarter that redirect to www.GiftStarter.com, and all subdomains (collectively, the “Site”), and the service owned and operated by the Company (together with the Site, the “Service”)</p>\n" +
    "<p>We take the responsibility of having your personal information very seriously. We use your personal information only for providing and improving the Service. We treat your personal information as we would and do treat our own.</p>\n" +
    "<p>By using the Service, you consent to the collection and use of information in accordance with this Policy.</p>\n" +
    "<p>The Company reserves the right, at its sole discretion, to modify or replace this Policy by posting the updated version on the Site. It is your responsibility to check this Policy periodically for changes. Your continued use of the Service following the posting of any changes to this Policy constitutes your acceptance of those changes.</p>\n" +
    "<h2>Collection of Information</h2>\n" +
    "<p>We may collect and process the following information about you:</p>\n" +
    "<ul>\n" +
    "<li>Information (such as your name, email and postal address, telephone number, sex, and country of residence) that you provide by completing forms on the Site, including if you register as a user of the Service, subscribe to our newsletter, upload or submit any material through the Site, or request any information;</li>\n" +
    "<li>Your log-in and password details in connection with the account sign-in process;</li>\n" +
    "<li>Details of any requests or transactions made by you through the Service;</li>\n" +
    "<li>Communications you send to us, for example to report a problem or to submit queries, concerns, or comments regarding the Service or its content;</li>\n" +
    "<li>Information that you post to the Site in the form of comments or contributions to discussions; and</li>\n" +
    "<li>IP addresses.</li>\n" +
    "</ul>\n" +
    "<h2>Uses of Your Personal Information</h2>\n" +
    "<p>We will use the personal information you provide to:</p>\n" +
    "<ul>\n" +
    "<li>Identify you when you sign-in to your account;</li>\n" +
    "<li>Enable us to provide you with the Services;</li>\n" +
    "<li>Send you information we think you may find useful or which you have requested from us;</li>\n" +
    "<li>Present projects to you when you use the Service which we believe will be of interest based on your geographic location and previous use of the Service;</li>\n" +
    "<li>Administer your account with us;</li>\n" +
    "<li>Enable us to contact you regarding any question you make through the Service;</li>\n" +
    "<li>Analyze the use of the Service and the people visiting to improve our content and Services; and</li>\n" +
    "<li>Use for other purposes that we may disclose to you when we request your information.</li>\n" +
    "</ul>\n" +
    "<p>Campaign creators (GiftStarters) receive the names of the Gift Givers during the GiftStart process.</p>\n" +
    "<p>GiftStarters never receive Gift Givers' credit card information.</p>\n" +
    "<p>We provide the verified personal or legal entity name to Gift Givers in their receipt emails. In the future, we may provide these names to Gift Givers or other users on the project page or other areas.</p>\n" +
    "<p>Personal information is collected via Secure Socket Layer (SSL) protocol (https) to ensure security and safety.</p>\n" +
    "<h2>Email</h2>\n" +
    "<p>We want to communicate with you only if you want to hear from us. We try to keep emails to a minimum and give you the ability to opt out when we can.</p>\n" +
    "<p>We will send you email relating to your personal transactions. We will keep these emails to a minimum.\n" +
    "You will also receive certain email notifications, for which you may opt-out.</p>\n" +
    "<p>We may send you service-related announcements on rare occasions when it is necessary to do so.</p>\n" +
    "<h2>Third-Party Services</h2>\n" +
    "<p>We never post anything to your accounts with Facebook, Twitter, or any other third-party sites without your permission.</p>\n" +
    "<p>Except for the purposes of providing the Services, we will not give your name or personal information to third parties.</p>\n" +
    "<h2>Technology</h2>\n" +
    "<p>Cookies are small pieces of information which are issued to your computer when you visit a website and which store and sometimes track information about your use of the Service. GiftStarter uses cookies to help recognize you as a repeat visitor, to improve the quality of our Service, and to try and make your browsing experience meaningful. When you enter our Site, our web server sends a cookie to your computer which allows us to recognize your computer but not specifically who is using it. By associating the identification numbers in the cookies with other customer information when, for example, you log-in to the Service, then we know that the cookie information relates to you. Some of the code and cookies used by our Service are served by us, and some are served by third parties who are delivering services on our behalf.</p>\n" +
    "<p>Most web browsers automatically accept cookies but, if you prefer, you can change your browser to prevent that or to notify you each time a cookie is set. You can also learn more about cookies by visiting <a href=\"http://www.allaboutcookies.org\">www.allaboutcookies.org</a> which includes additional useful information on cookies and how to block cookies using different browsers. By blocking or deleting cookies used on our Service, you may not be able to take full advantage of our Service.</p>\n" +
    "<h2>Voluntary Disclosure</h2>\n" +
    "<p>Any personal information or content that you voluntarily disclose in public areas of the Site becomes publicly available and can be collected and used by other users. You should exercise caution before disclosing your personal information through these public venues.</p>\n" +
    "<p>GiftStarters never receive users' credit card information.</p>\n" +
    "<h2>Wrap-up</h2>\n" +
    "<p>GiftStarter reserves the right to disclose your personally identifiable information as required by law and when we believe that disclosure is necessary to protect our rights, or in the good-faith belief that it is necessary to comply with the law.</p>\n" +
    "<p>On request, we will give you a copy of all the personal information about you that we hold. This information is subject to a fee not exceeding the prescribed fee permitted by law.</p>\n" +
    "<p>People under 18 (or the legal age in your jurisdiction) are not permitted to use GiftStarter on their own, and so this privacy policy makes no provision for their use of the site.</p>\n" +
    "<p>Information that you submit through the Service may be transferred to countries outside the European Economic Area (“EEA”) to provide the Service to you. For example, our servers are in the United States. If we transfer your information outside the EEA in this way, we will take steps to ensure that your privacy rights continue to be protected.</p>\n" +
    "<p>Your privacy is very important to us, but due to the existing legal regulatory and security environment, we cannot fully ensure that your private communications and other personally identifiable information will not be disclosed to third parties. Under certain circumstances, the government or third parties may lawfully or unlawfully intercept or access transmissions or private communications. Additionally, in the unlikely event we need to investigate or resolve possible problems or inquiries, we may disclose information about you to private entities, law enforcement, or other government officials as we, in our sole discretion, believe necessary or appropriate.</p>\n" +
    "<p>GiftStarter encourages you to learn as much as you can about your privacy on the Internet. To find out more, visit <a href=\"http://www.bbbonline.org\">www.bbbonline.org</a> or <a href=\"http://www.TRUSTe.com\">www.TRUSTe.com</a>.</p>\n" +
    "<h2>Questions</h2>\n" +
    "<p>If you have questions or suggestions, please contact our primary Privacy Agent at <a href=\"mailto:arry@giftstarter.com\">arry@giftstarter.com</a>.</p>\n" +
    "<p>Updated: July 2014</p>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/static-pages/terms/terms.html',
    "<div class=\"wrapper faq privacyandterms\">\n" +
    "<h1>Terms of Use</h1>\n" +
    "<p>GiftStarter.com’s goal is to provide the #1 online gifting experience service.  The GiftStarter.com websites exist for the purpose of providing a personal gifting experience with one or more people together.  Any use outside of this purpose is prohibited.  These terms of use apply exclusively to your access and use of the GiftStarter.com website, and any parts or sections thereof including, but not limited to GiftStarter.com web content, member-personalized GiftStarter.com GiftStart information, user information, photos, and graphics (hereinafter referred to as the “site.)</p>\n" +
    "<h2>Summary of Service</h2>\n" +
    "<p>GiftStarter is a platform where certain users (\"GiftStarters\") run GiftStarts to fund gifts from one or more gifters (Gift Givers).  Through the Site, email, websites, and other media, the Service makes accessible various content, including, but not limited to, videos, photographs, images, artwork, graphics, audio clips, comments, data, text, software, scripts, projects, other material and information, and associated trademarks and copyrightable works (collectively, “Content”). Gift GiftStarters, Gift Givers, and other visitors to and users of the Service (collectively, “Users”) may have the ability to contribute, add, create, upload, submit, distribute, facilitate the distribution of, collect, post, or otherwise make accessible (\"Submit\") Content. “User Submissions” means any Content Submitted by Users.</p>\n" +
    "<h2>Acceptance of Terms</h2>\n" +
    "<p>If you do not agree with any of these terms, do not access or otherwise use the Site or any information or materials contained on the Site.  Your use of the Site shall be deemed to be your agreement to abide by each of the terms set below.\n" +
    "Please read these Terms of Use (the \"Agreement\" or \"Terms of Use\") carefully before using the services offered by Emotiv Labs, Inc. or Emotive Labs, Inc. (together “GiftStarter” or the “Company”). This Agreement sets forth the legally binding terms and conditions for your use of the website at www.GiftStarter.com, all other sites owned and operated by GiftStarter that redirect to www.GiftStarter.com, and all subdomains (collectively, the “Site”), and the service owned and operated by the Company (together with the Site, the “Service”). By using the Service in any manner, including, but not limited to, visiting or browsing the Site or contributing content, information, or other materials or services to the Site, you agree to be bound by this Agreement.</p>\n" +
    "<p>The Service is offered subject to acceptance of all of the terms and conditions contained in these Terms of Use, including the Privacy Policy and all other operating rules, policies, and procedures that may be published on the Site by the Company, which are incorporated by reference. These Terms of Use apply to every user of the Service. In addition, some services offered through the Service may be subject to additional terms and conditions adopted by the Company. Your use of those services is subject to those additional terms and conditions, which are incorporated into these Terms of Use by this reference.</p>\n" +
    "<p>The Company reserves the right, at its sole discretion, to modify or replace these Terms of Use by posting the updated terms on the Site. It is your responsibility to check the Terms of Use periodically for changes. Your continued use of the Service following the posting of any changes to the Terms of Use constitutes acceptance of those changes.</p>\n" +
    "<p>The Company reserves the right to change, suspend, or discontinue the Service (including, but not limited to, the availability of any feature, database, or Content) at any time for any reason. The Company may also impose limits on certain features and services or restrict your access to parts or all of the Service without notice or liability.</p>\n" +
    "<p>The Service is available only to individuals who are at least 18 years old (and at least the legal age in your jurisdiction). You represent and warrant that if you are an individual, you are at least 18 years old and of legal age in your jurisdiction to form a binding contract, and that all registration information you submit is accurate and truthful. The Company reserves the right to ask for proof of age from you and your account may be suspended until satisfactory proof of age is provided. The Company may, in its sole discretion, refuse to offer the Service to any person or entity and change its eligibility criteria at any time. This provision is void where prohibited by law and the right to access the Service is revoked in those jurisdictions.</p>\n" +
    "<h2>Rules and Conduct</h2>\n" +
    "<p>As a condition of use, you promise not to use the Service for any purpose that is prohibited by the Terms of Use or law. The Service is provided only for your own personal, non-commercial use (except as allowed by the terms set forth in the section of these Terms of Use titled, \"Gifts: Fundraising and Commerce\"). You are responsible for all of your activity in connection with the Service. You shall not, and shall not permit any third party using your account to, take any action, or Submit Content, that:</p>\n" +
    "<ul>\n" +
    "<li>Infringes any patent, trademark, trade secret, copyright, right of publicity, or other right of any other person or entity, or violates any law or contract;</li>\n" +
    "<li>You know is false, misleading, or inaccurate;</li>\n" +
    "<li>Is unlawful, threatening, abusive, harassing, defamatory, libelous, deceptive, fraudulent, tortious, obscene, offensive, profane, or invasive of another's privacy;</li>\n" +
    "<li>Contains software viruses or any other computer codes, files, or programs that are designed or intended to disrupt, damage, limit, or interfere with the proper function of any software, hardware, or telecommunications equipment or to damage or obtain unauthorized access to any system, data, password, or other information of the Company or any third party;</li>\n" +
    "<li>Is made in breach of any legal duty owed to a third party, such as a contractual duty or a duty of confidence; or\n" +
    "impersonates any person or entity, including any employee or representative of the Company.</li>\n" +
    "</ul>\n" +
    "<p>Additionally, you shall not: (i) take any action that imposes or may impose (as determined by the Company in its sole discretion) an unreasonable or disproportionately large load on the Company’s or its third-party providers’ infrastructure; (ii) interfere or attempt to interfere with the proper working of the Service or any activities conducted on the Service; (iii) bypass any measures the Company may use to prevent or restrict access to the Service (or other accounts, computer systems, or networks connected to the Service); (iv) run Maillist, Listserv, or any form of auto-responder or \"spam\" on the Service; or (v) use manual or automated software, devices, or other processes to \"crawl\" or \"spider\" any page of the Site.</p>\n" +
    "<p>You shall not directly or indirectly: (i) decipher, decompile, disassemble, reverse engineer, or otherwise attempt to derive any source code or underlying ideas or algorithms of any part of the Service, except to the extent applicable laws specifically prohibit such restriction; (ii) modify, translate, or otherwise create derivative works of any part of the Service; or (iii) copy, rent, lease, distribute, or otherwise transfer any of the rights that you receive hereunder. You shall abide by all applicable local, state, national, and international laws and regulations.</p>\n" +
    "<p>Users agree to not abuse other users' personal information. Abuse is defined as using personal information for any purpose other than those explicitly specified in the GiftStarter’s GiftStart, or is not related to fulfilling delivery of a product or service explicitly specified in the GiftStarters’s GiftStart.</p>\n" +
    "<h2>Registration</h2>\n" +
    "<p>You may view Content on the Site without registering, but as a condition of using certain aspects of the Service, you may be required to register with the Company and select a screen name (\"User ID\") and password. You shall provide accurate, complete, and updated registration information. Failure to do so shall constitute a breach of the Terms of Use, which may result in immediate termination of your account. You shall not use as a User ID, domain name, or project name any name or term that (i) is the name of another person, with the intent to impersonate that person; (ii) is subject to any rights of another person, without appropriate authorization; or (iii) is offensive, vulgar, or obscene. The Company reserves the right in its sole discretion to refuse registration of or cancel a User ID, domain name, and project name. You are solely responsible for activity that occurs on your account and shall be responsible for maintaining the confidentiality of your password for the Site. You shall never use another User account without the other User’s express permission. You will immediately notify the Company in writing of any unauthorized use of your account, or other known account-related security breach.</p>\n" +
    "<h2>Hyperlinks to this Site</h2>\n" +
    "<p>You are granted a limited, nonexclusive right to create a \"hypertext\" link to the Site provided that such link is to the entry page of the Site (or your GiftStart page within the Site) and does not portray GiftStarter. or any of its other products or services in a false, misleading, derogatory, or otherwise defamatory manner. This limited right may be revoked at any time for any reason whatsoever. You may not use, frame, or utilize framing techniques to enclose any GiftStarter trademark, logo or trade name or other proprietary information including the images found at the Site, the content of any text or the layout/design of any page or any form contained on a page without the express written consent of GiftStarter (or Emotiv Labs, Inc.)</p>\n" +
    "<h2>Gifts: Fundraising and Commerce</h2>\n" +
    "<p>GiftStarter is a platform where GiftStarters run campaigns to fund gifts. By creating a campaign (GiftStart) on GiftStarter, you as the GiftStarter are offering the public the opportunity to enter into a contract with you. By backing a GiftStart on GiftStarter, you as the Gift Giver(s) accept that offer and the contract between Gift Giver(s) and GiftStarter is formed. GiftStarter is not a party to that agreement between the Gift Giver(s) and GiftStarter. All dealings are solely between Users.</p>\n" +
    "<p>By backing or creating a GiftStart on GiftStarter, you agree to be bound by this entire Agreement, including the following terms:</p>\n" +
    "<ul>\n" +
    "<li>Gift Givers agree to provide their payment information at the time they contribution to a GiftStart. The payment will be collected at the moment of gifting.  The gift or gift amount requested will be gifted to the User designated as the “Gift Recipient” in the GiftStart setup process. The amount Gift Givers contribution is the amount they will be charged.</li>\n" +
    "<li>Gift Givers consent to GiftStarter and its payments partners authorizing or reserving a charge on their payment card or other payment method for any amount up to the full contribution at any time between the contribution and collection of the funds.</li>\n" +
    "<li>Gift Givers agree to have sufficient funds or credit available at the GiftStart deadline to ensure that the contribution will be collectible.</li>\n" +
    "<li>Gift Givers may not cancel or reduce their contribution once the GiftStart has been funded and/or the GiftStart deadline has been passed (10 days).</li>\n" +
    "<li>The Estimated gift delivery date for each gift is not a promise to fulfill by that date, but is merely an estimate of when GiftStarter aims to deliver the gift by.</li>\n" +
    "<li>For some gifts, the GiftStarter needs further information from Gift Givers, such as a mailing address or t-shirt size, to enable the GiftStarter to deliver the gifts. GiftStarter shall request the information directly from GiftStarter or Gift Givers at some point during or after the GiftStart.</li>\n" +
    "<li>GiftStarter does not offer refunds.</li>\n" +
    "<li>Because of occasional failures of payments from Gift Givers, GiftStarter cannot guarantee the receipt by Gift Recipient of the amount contributed minus fees.</li>\n" +
    "<li>GiftStarter and its payments partners will remove their fees before transmitting proceeds of a GiftStart. Fees may vary depending on region and other factors (e.g. taxes, shipping).</li>\n" +
    "<li>GiftStarter reserves the right to cancel a contribution at any time and for any reason.</li>\n" +
    "<li>GiftStarter reserves the right to reject, cancel, interrupt, remove, or suspend a GiftStart at any time and for any reason. GiftStarter is not liable for any damages as a result of any of those actions. GiftStarter’s policy is not to comment on the reasons for any of those actions.</li>\n" +
    "<li>Users should not take any action in reliance on having their project posted on the Site or having any of the money contributed until they have the ability to withdraw and spend the money. There may be a delay between the end of a successful GiftStart and access to the funds.</li>\n" +
    "</ul>\n" +
    "<p>GiftStarter is not liable for any damages or loss incurred related to gifts or any other use of the Service. GiftStarter is under no obligation to become involved in disputes between any Users, or between Users and any third party arising in connection with the use of the Service. This includes, but is not limited to, delivery of goods and services, and any other terms, conditions, warranties, or representations associated with GiftStarts on the Site. GiftStarter does not oversee the performance or punctuality of projects. The Company does not endorse any User Submissions. You release GiftStarter, its officers, employees, agents, and successors in rights from claims, damages, and demands of every kind, known or unknown, suspected or unsuspected, disclosed or undisclosed, arising out of or in any way related to such disputes and the Service.</p>\n" +
    "<h2>Fees and Payments</h2>\n" +
    "<p>Joining GiftStarter is free. However, we do charge fees for certain services. When you use a service that has a fee you have an opportunity to review and accept the fees that you will be charged. Changes to fees are effective after we provide you with notice by posting the changes on the Site. You are responsible for paying all fees and taxes associated with your use of the Service.</p>\n" +
    "<p>Funds contributed by Gift Givers are collected by PayPal. GiftStarter is not responsible for the performance of PayPal.\n" +
    "Third Party Payment Services.</p>\n" +
    "<p>GiftStarter provides links and interfaces to third party payment services, such as PayPal, which permit gift givers to send funds to purchase gifts on behalf of the GiftStarter(s) and Gift Giver(s) for the Gift Recipient(s). You acknowledge that while GiftStarter. provides links to these third party payment services, GiftStarter. does not control and is not responsible for payments made or received through these services. Any use of third party payment services by you will be subject to the fees, terms and conditions of such third party payment services, and at your own risk.</p>\n" +
    "<p>In some circumstances and in order to reduce transactions fees, GiftStarter may collect and pay PayPal payment fees on behalf of the user. You acknowledge these fees will automatically be paid to GiftStarter via PayPal.</p>\n" +
    "<p>Gift givers acknowledge that they are submitting payment via PayPal, and therefore, GiftStarter cannot be responsible for lost payments, identity theft, fraud or refunds.</p>\n" +
    "<h2>Third-Party Sites</h2>\n" +
    "<p>The Service may permit you to link to other websites or resources on the internet, and other websites or resources may contain links to the Site. When you access third-party websites, you do so at your own risk. Those other websites are not under the Company's control, and you acknowledge that the Company is not liable for the content, functions, accuracy, legality, appropriateness, or any other aspect of those other websites or resources. The inclusion on another website of any link to the Site does not imply endorsement by or affiliation with the Company. You further acknowledge and agree that the Company shall not be liable for any damage related to the use of any content, goods, or services available through any third-party website or resource.</p>\n" +
    "<h2>Content and License</h2>\n" +
    "<p>You agree that the Service contains Content provided by the Company and its partners and Users and that the Content may be protected by copyrights, trademarks, service marks, patents, trade secrets, or other rights and laws. You shall abide by and maintain all copyright and other legal notices, information, and restrictions contained in any Content accessed through the Service.</p>\n" +
    "<p>The Company grants to each User of the Service a worldwide, non-exclusive, non-sublicensable and non-transferable license to use and reproduce the Content, solely for personal, non-commercial use. Use, reproduction, modification, distribution, or storage of any Content for other than personal, non-commercial use is prohibited without prior written permission from the Company, or from the copyright holder. You shall not sell, license, rent, or otherwise use or exploit any Content for commercial use or in any way that violates any third-party right.</p>\n" +
    "<h2>Changes to the Site</h2>\n" +
    "<p>The Company reserves the right from time to time to make modifications and changes to the Site. These modifications and changes may include, but are not limited to, discontinuing, temporarily or permanently, any service offered by, or through the Company. (or any part thereof) with or without notice. You agree that the Company shall not be liable to you or to any other party for any changes and modifications to the Site.</p>\n" +
    "<h2>Intellectual Property</h2>\n" +
    "<p>By Submitting User Submissions on the Site or otherwise through the Service, you agree to the following terms:</p>\n" +
    "<ul>\n" +
    "<li>GiftStarter’s Service is patent pending, under both United States and International intellectual property laws and agreements. You shall not directly or indirectly: (i) decipher, decompile, disassemble, reverse engineer, or otherwise attempt to derive any source code or underlying ideas or algorithms of any part of the Service, except to the extent applicable laws specifically prohibit such restriction; (ii) modify, translate, or otherwise create derivative works of any part of the Service; or (iii) copy, rent, lease, distribute, or otherwise transfer any of the rights that you receive hereunder. You shall abide by all applicable local, state, national, and international laws and regulations.</li>\n" +
    "<li>You are publishing your User Submission, and you may be identified publicly by your name or User ID in association with your User Submission.</li>\n" +
    "<li>You grant to GiftStarter a non-exclusive license to access your User Submissions through the Service, and to use, edit, modify, reproduce, distribute, prepare derivative works of, display and perform such User Submissions solely for commercial use.</li>\n" +
    "<li>You further agree that your User Submissions will not contain third-party copyrighted material, or material that is subject to other third-party proprietary rights, unless you have permission from the rightful owner of the material or you are otherwise legally entitled to post the material and to grant GiftStarter all of the license rights granted herein.</li>\n" +
    "<li>You will pay all royalties and other amounts owed to any person or entity based on your Submitting User Submissions to the Service or the Company’s publishing or hosting of the User Submissions as contemplated by these Terms of Use.</li>\n" +
    "<li>The use or other exploitation of User Submissions by the Company and Users as contemplated by this Agreement will not infringe or violate the rights of any third party, including without limitation any privacy rights, publicity rights, copyrights, contract rights, or any other intellectual property or proprietary rights.</li>\n" +
    "<li>The Company shall have the right to delete, edit, modify, reformat, excerpt, or translate any of your User Submissions.</li>\n" +
    "<li>All information publicly posted or privately transmitted through the Site is the sole responsibility of the person from which that content originated.</li>\n" +
    "<li>The Company will not be liable for any errors or omissions in any Content.</li>\n" +
    "<li>The Company cannot guarantee the identity of any other Users with whom you may interact while using the Service.</li>\n" +
    "<li>All Content you access through the Service is at your own risk and you will be solely responsible for any resulting damage or loss to any party.</li>\n" +
    "</ul>\n" +
    "<p>In accordance with the Digital Millennium Copyright Act, GiftStarter has adopted a policy of, in appropriate circumstances, terminating User accounts that are repeat infringers of the intellectual property rights of others. GiftStarter also may terminate User accounts even based on a single infringement.</p>\n" +
    "<h2>Copyright Notifications</h2>\n" +
    "<p>Any materials on the Site, including without limitation any documentation, content, text, data, graphics, images, interfaces or other material or works of authorship (the \"Materials\") are copyrighted material owned by or licensed to GiftStarter. All rights are reserved. The Materials contain trademarks, service marks and trade names which are owned by Honeyfund.com, Inc. and its affiliates, and may also contain brand and product names which are trademarks, service marks or trade names of third parties which are owned by their respective owners.</p>\n" +
    "<p>GiftStarter will remove infringing materials in accordance with the DMCA if properly notified that Content infringes copyright. If you believe that your work has been copied in a way that constitutes copyright infringement, please notify GiftStarter's Copyright Agent by emailing Arry at arry@giftstarter.com. Your email must contain the following information (please confirm these requirements with your legal counsel, or see the U.S. Copyright Act, 17 U.S.C. §512(c)(3), for more information):</p>\n" +
    "<ul>\n" +
    "<li>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest;</li>\n" +
    "<li>A description of the copyrighted work that you claim has been infringed;</li>\n" +
    "<li>A description of where the material that you claim is infringing is located on the Site, sufficient for GiftStarter to locate the material;</li>\n" +
    "<li>Your address, telephone number, and email address;</li>\n" +
    "<li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law; and</li>\n" +
    "<li>A statement by you that the information in your notice is accurate and, under penalty of perjury, that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>\n" +
    "</ul>\n" +
    "<p>If you believe that your work has been removed or disabled by mistake or misidentification, please notify GiftStarter’s Copyright Agent in writing by emailing Arry at arry@giftstarter.com. Your counter-notice must contain the following information (please confirm these requirements with your legal counsel or see the U.S. Copyright Act, 17 U.S.C. §512(g)(3), for more information):</p>\n" +
    "<ul>\n" +
    "<li>A physical or electronic signature of the user of the Services;</li>\n" +
    "<li>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access to it was disabled;</li>\n" +
    "<li>A statement made under penalty of perjury that the subscriber has a good faith belief that the material was removed or disabled as a result of mistake or misidentification of the material; and</li>\n" +
    "<li>The subscriber's name, address, telephone number, and a statement that the subscriber consents to the jurisdiction of the Federal District Court for the judicial district in which the address is located, or if the subscriber's address is outside of the United States, for any judicial district in which the service provider may be found, and that the user will accept service of process from the person who provided notification under subscriber (c)(1)(C) or an agent of such person.</li>\n" +
    "</ul>\n" +
    "<p>Under the Copyright Act, any person who knowingly materially misrepresents that material is infringing or was removed or disabled by mistake or misidentification may be subject to liability.</p>\n" +
    "<p>If you fail to comply with these notice requirements, your notification or counter-notification may not be valid.</p>\n" +
    "<p>Our designated copyright agent for notice of alleged copyright infringement can be reached at:</p>\n" +
    "<p>Emotiv Labs, Inc. <br>\n" +
    "Attn: Copyright Agent <br>\n" +
    "PO Box 18284 <br>\n" +
    "Seattle, WA 98118 <br>\n" +
    "Email: arry@giftstarter.com</p>\n" +
    "<h2>Termination</h2>\n" +
    "<p>The Company may terminate your access to the Service, without cause or notice, which may result in the forfeiture and destruction of all information associated with your account. If you wish to terminate your account, you may do so by following the instructions on the Site. Any fees paid to the Company are non-refundable. All provisions of the Terms of Use that by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>\n" +
    "<h2>Warranty Disclaimer</h2>\n" +
    "<p>The Company has no special relationship with or fiduciary duty to you. You acknowledge that the Company has no duty to take any action regarding any of the following: which Users gain access to the Site; what Content Users access through the Site; what effects the Content may have on Users; how Users may interpret or use the Content; or what actions Users may take as a result of having been exposed to the Content. The Company cannot guarantee the authenticity of any data or information that Users provide about themselves or their GiftStarts and projects. You release the Company from all liability for your having acquired or not acquired Content through the Site. The Site may contain, or direct you to websites containing, information that some people may find offensive or inappropriate. The Company makes no representations concerning any Content on the Site, and the Company is not liable for the accuracy, copyright compliance, legality, or decency of material contained on the Service.</p>\n" +
    "<p>The Company does not guarantee that any Content will be made available through the Service. The Company has no obligation to monitor the Service or Content. The Company reserves the right to, at any time, for any reason, and without notice: (i) cancel, reject, interrupt, remove, or suspend a GiftStart or project; (ii) remove, edit, or modify any Content, including, but not limited to, any User Submission; and (iii) remove or block any User or User Submission. GiftStarter reserves the right not to comment on the reasons for any of these actions.</p>\n" +
    "<p>The Service is provided “as is” and “as available” and is without warranty of any kind, express or implied, including, but not limited to, the implied warranties of title, non-infringement, merchantability, and fitness for a particular purpose, and any warranties implied by any course of performance or usage of trade, all of which are expressly disclaimed. The Company, and its directors, employees, agents, suppliers, partners, and content providers do not warrant that: (a) the Service will be secure or available at any particular time or location; (b) any defects or errors will be corrected; (c) any content or software available at or through the Service is free of viruses or other harmful components; or (d) the results of using the Service will meet your requirements. Your use of the Service is solely at your own risk. Some states or countries do not allow limitations on how long an implied warranty lasts, so the above limitations may not apply to you.</p>\n" +
    "<p>The Company makes no guaranty of confidentiality or privacy of any communication or information transmitted on the Site or any website linked to the Site. The Company will not be liable for the privacy of email addresses, registration and identification information, disk space, communications, confidential or trade-secret information, or any other Content stored on the Company’s equipment, transmitted over networks accessed by the Site, or otherwise connected with your use of the Service.</p>\n" +
    "<p>Electronic Communications Privacy Act Notice (18 USC §2701-2711): THE COMPANY MAKES NO GUARANTY OF CONFIDENTIALITY OR PRIVACY OF ANY COMMUNICATION OR INFORMATION TRANSMITTED ON THE SITE OR ANY WEBSITE LINKED TO THE SITE. The Company will not be liable for the privacy of email addresses, registration and identification information, disk space, communications, confidential or trade-secret information, or any other Content stored on the Company’s equipment, transmitted over networks accessed by the Site, or otherwise connected with your use of the Service.</p>\n" +
    "<h2>Indemnification</h2>\n" +
    "<p>You shall defend, indemnify, and hold harmless the Company, its affiliates, and each of its and its affiliates’ employees, contractors, directors, suppliers, and representatives from all liabilities, claims, and expenses, including reasonable attorneys' fees and other legal costs, that arise from or relate to your use or misuse of, or access to, the Service and Content, or otherwise from your User Submissions, violation of the Terms of Use, or infringement by you, or any third party using your account, of any intellectual property or other right of any person or entity. The Company reserves the right to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will assist and cooperate with the Company in asserting any available defenses.</p>\n" +
    "<h2>Limitation of Liability</h2>\n" +
    "<p>In no event shall the Company, nor its directors, employees, agents, partners, suppliers, or content providers, be liable under contract, tort, strict liability, negligence, or any other legal or equitable theory with respect to the service (i) for any lost profits, data loss, cost of procurement of substitute goods or services, or special, indirect, incidental, punitive, or consequential damages of any kind whatsoever, substitute goods or services (however arising), (ii) for any bugs, viruses, trojan horses, or the like (regardless of the source of origination), or (iii) for any direct damages in excess of (in the aggregate) one hundred U.S. dollars ($100.00). some states or countries do not allow the exclusion or limitation of incidental or consequential damages, so the above limitations and exclusions may not apply to you.</p>\n" +
    "<h2>International</h2>\n" +
    "<p>Accessing the Service is prohibited from territories where the Content is illegal. If you access the Service from other locations, you do so at your own initiative and are responsible for compliance with local laws.</p>\n" +
    "<h2>Electronic Delivery, Notice Policy, and Your Consent</h2>\n" +
    "<p>By using the Services, you consent to receive from GiftStarter all communications including notices, agreements, legally required disclosures, or other information in connection with the Services (collectively, \"Contract Notices\") electronically. GiftStarter may provide the electronic Contract Notices by posting them on the Site. If you desire to withdraw your consent to receive Contract Notices electronically, you must discontinue your use of the Services.</p>\n" +
    "<h2>Governing Law</h2>\n" +
    "<p>These Terms of Service (and any further rules, policies, or guidelines incorporated by reference) shall be governed by and construed in accordance with the laws of the United States, without giving effect to any principles of conflicts of law, and without application of the Uniform Computer Information Transaction Act or the United Nations Convention of Controls for International Sale of Goods. You agree that the Company and its Services are deemed a passive website that does not give rise to personal jurisdiction over GiftStarter or its parents, subsidiaries, affiliates, successors, assigns, employees, agents, directors, officers or shareholders, either specific or general, in any jurisdiction other than the State of Washington. You agree that any action at law or in equity arising out of or relating to these terms, or your use or non-use of the Services, shall be filed only in the state or federal courts located in Washington County in the State of Washington and you hereby consent and submit to the personal jurisdiction of such courts for the purposes of litigating any such action. You hereby irrevocably waive any right you may have to trial by jury in any dispute, action, or proceeding.</p>\n" +
    "<h2>Integration and Severability</h2>\n" +
    "<p>These Terms of Use and other referenced material are the entire agreement between you and the Company with respect to the Service, and supersede all prior or contemporaneous communications and proposals (whether oral, written or electronic) between you and the Company with respect to the Service and govern the future relationship. If any provision of the Terms of Use is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the Terms of Use will otherwise remain in full force and effect and enforceable. The failure of either party to exercise in any respect any right provided for herein shall not be deemed a waiver of any further rights hereunder.</p>\n" +
    "<h2>Miscellaneous</h2>\n" +
    "<p>The Company shall not be liable for any failure to perform its obligations hereunder where the failure results from any cause beyond the Company’s reasonable control, including, without limitation, mechanical, electronic, or communications failure or degradation. The Terms of Use are personal to you, and are not assignable, transferable, or sublicensable by you except with the Company's prior written consent. The Company may assign, transfer, or delegate any of its rights and obligations hereunder without consent. No agency, partnership, joint venture, or employment relationship is created as a result of the Terms of Use and neither party has any authority of any kind to bind the other in any respect. In any action or proceeding to enforce rights under the Terms of Use, the prevailing party will be entitled to recover costs and attorneys' fees. All notices under the Terms of Use will be in writing and will be deemed to have been duly given when received, if personally delivered or sent by certified or registered mail, return receipt requested; when receipt is electronically confirmed, if transmitted by facsimile or e-mail; or the day after it is sent, if sent for next day delivery by recognized overnight delivery service.</p>\n" +
    "<p>Updated: July 2014</p>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/static-pages/what-is-it/what-is-it.html',
    "<section class=\"what-is-it wrapper\" ng-controller=\"whatIsItController\">\n" +
    "    <header>\n" +
    "        <h1> GiftStarter makes giving <span>awesome</span> gifts <span>fun</span> and <span>easy</span>.</h1>\n" +
    "    </header>\n" +
    "    <div class=\"copy\">\n" +
    "        <p>Giving an awesome gift is hard - what your friends really want is usually too expensive.  With GiftStarter, you can bring your friends and family together to get a bigger, better gift.</p>\n" +
    "        <p>All you have to do is create a campaign on GiftStarter and invite your friends!  It's easy for everyone to pitch in, and leave their own special message.  Once it's all bought, GiftStart ships the recipient a beautiful hand-crafted card with everyone's well-wishes, and ships them the gift too!</p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"video\" ng-hide=\"hideVideo\">\n" +
    "        <div id=\"player\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"email\">\n" +
    "        <p>Give us your email, and we'll remind you for your next big event!</p>\n" +
    "        <input type=\"email\" placeholder=\"email@example.com\" ng-model=\"email\"/><button ng-click=\"remindMe();\">Remind Me!</button>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('/scripts/user/profile.html',
    "<div class=\"user-wrapper\" ng-controller=\"ProfileController\">\n" +
    "    <header>\n" +
    "        <div id=\"profile-image-container\" ng-class=\"{edit: editMode}\">\n" +
    "            <img id=\"profile-image\" ng-src=\"{{user.img_url}}\" ng-hide=\"editMode\" src=\"\"/>\n" +
    "            <gs-image-upload ng-show=\"editMode\" on-image-updated=\"imageUpdated\"></gs-image-upload>\n" +
    "            <button class=\"cancel\" ng-show=\"editMode\" ng-click=\"editMode = false;\">X</button>\n" +
    "            <button class=\"edit\" ng-show=\"editable && !editMode\" ng-click=\"editMode=true;\">EDIT</button>\n" +
    "            <button class=\"upload\" ng-click=\"submit()\" ng-show=\"editMode\" ng-class=\"{disabled: !imageSet}\">SAVE</button>\n" +
    "        </div>\n" +
    "        <h1>{{user.name}}</h1>\n" +
    "    </header>\n" +
    "    <section>\n" +
    "        <article class=\"giftstarts\">\n" +
    "            <div><img src=\"/assets/giftstartRibbon.png\"></div>\n" +
    "            <div class=\"ribbontext\">{{user.giftstarts.length}}</div>\n" +
    "            <div class=\"giftstarts\">\n" +
    "                <div class=\"giftstart\" ng-repeat=\"gs in user.giftstarts\">\n" +
    "                    <a ng-href=\"/giftstart/{{gs.giftstart_url_title}}\">\n" +
    "                        <p class=\"title\">{{gs.title}}</p><p class=\"description\">{{gs.description}}</p>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </article>\n" +
    "        <article class=\"pitchins\">\n" +
    "            <div><img src=\"/assets/pitchinRibbon.png\"></div>\n" +
    "            <div class=\"ribbontext\">{{user.pitchins.length}}</div>\n" +
    "            <div class=\"pitchins\">\n" +
    "                <div class=\"pitchin\" ng-repeat=\"pi in user.pitchins\">\n" +
    "                    <a ng-href=\"/giftstart/{{pi.giftstart_url_title}}\">\n" +
    "                        <p class=\"title\">{{pi.gs_title}}</p><p class=\"description\">{{pi.note}}</p>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </article>\n" +
    "    </section>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/user/user_profile.html',
    "<div class=\"userprofile\" ng-controller=\"UserprofileController\" >\n" +
    "    <ng-include src=\"'/scripts/user/user_profile_info.html'\"></ng-include>\n" +
    "    <ng-include src=\"'/scripts/user/user_profile_fields.html'\"></ng-include>\n" +
    "    <h2 class=\"userprofile__header\">\n" +
    "        GiftStarter Campaigns\n" +
    "    </h2>\n" +
    "    <a name=\"mycampaigns\"></a><ng-include src=\"'/scripts/user/user_profile_campaign.html'\"></ng-include>\n" +
    "    <a name=\"savedgiftideas\"></a><ng-include src=\"'/scripts/user/user_profile_giftidea.html'\"></ng-include>\n" +
    "    <a name=\"savedgiftideas\"></a><ng-include src=\"'/scripts/user/user_profile_friendconnections.html'\"></ng-include>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/user/user_profile_campaign.html',
    "<div class=\"userprofile__campaigns\">\n" +
    "    <div class=\"usercampaign\">\n" +
    "        <ng-include src=\"'/scripts/user/user_profile_pitchins.html'\"></ng-include>\n" +
    "    </div>\n" +
    "    <div class=\"usercampaign\">\n" +
    "        <ng-include src=\"'/scripts/user/user_profile_champion.html'\"></ng-include>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/user/user_profile_champion.html',
    "<h3 class=\"usercampaign__header\">\n" +
    "    Championed\n" +
    "</h3>\n" +
    "<div class=\"usercampaign__list\">\n" +
    "    <div ng-show=\"userCampaings.giftstarts.length === 0\">\n" +
    "        <p ng-show=\"editable\">You haven't been a Gift Champion yet. Start a gift today! <br />\n" +
    "            <a href=\"/giftideas\" class=\"usercampaign__link\">Browse Gift Ideas</a>\n" +
    "            <a href=\"/search\" class=\"usercampaign__link\">Search</a>\n" +
    "        </p>\n" +
    "        <p ng-hide=\"editable\" >{{ user.name }} hasn't started any gifts yet</p>\n" +
    "    </div>\n" +
    "    <div class=\"usercampaign__items\" ng-repeat-start=\"giftstart in userCampaings.giftstarts | limitTo:campaingquantity track by $index\" ng-class=\"{true: 'usercampaign__items--row'}[$index % 3 == 0 && !$first]\" ></div>\n" +
    "    <div class=\"usercampaign__productlistitem\">\n" +
    "        <a ng-href=\"/giftstart/{{ giftstart.giftstart_url_title }}\">\n" +
    "            <div class=\"usercampaign__productimgwrap\">\n" +
    "                <img class=\"usercampaign__itemsimages\" ng-src=\"{{ giftstart.product_img_url }}\" alt=\"Championed image\"/>\n" +
    "            </div>\n" +
    "            <h4 clamp=\"2\"  class=\"usercampaign__itemstitle\">\n" +
    "                {{ giftstart.title }}\n" +
    "            </h4>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div ng-repeat-end=\"\" class=\"h--hide\"></div>\n" +
    "</div>\n" +
    "<div class=\"usercampaign__viewmore\" ng-show=\"showMoreCampaign\" >\n" +
    "    <a class=\"usercampaign__viewmorelink linky\" ng-show=\" userCampaings.giftstarts.length > 3\"  ng-click=\"campaingquantity=userCampaings.giftstarts.length; showMoreCampaign = false\">\n" +
    "        <span class=\"usercampaign__viewmoretext\" >View More</span> <span class=\"usercampaign__viewmoreicon\"></span>\n" +
    "    </a>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/user/user_profile_edit.ng.html',
    "<div class=\"userprofile__loading\" ng-show=\"loading\">\n" +
    "    <img class=\"userprofile__loadingimg\" src=\"/assets/loading.gif\" alt=\"preloader\" title=\"preloader\">\n" +
    "</div>\n" +
    "<a ng-show=\"canEdit\" class=\"editlink__edit button linky\" ng-click=\"editUserFields();\">\n" +
    "    Edit\n" +
    "</a>\n" +
    "<a ng-hide=\"canEdit\" class=\"editlink__save button linky\"  ng-click=\"saveInput()\">\n" +
    "    Save\n" +
    "</a>\n" +
    "<a ng-hide=\"canEdit\" class=\"editlink__cancel button linky\" ng-click=\"cancelEdit();\">\n" +
    "    Cancel\n" +
    "</a>\n"
  );


  $templateCache.put('/scripts/user/user_profile_fields.html',
    "\n" +
    "        <div class=\"userprofile__fields\" ng-hide=\"loading\">\n" +
    "            <p class=\"userprofile__text\" ng-show=\"editable\">\n" +
    "                <span class=\"userprofile__emnote\">The information below will not be visible to anyone but you.</span> Adding this information now ensures you'll always know what's happening with gifts you're a part of, and we will know where to ship gifts for you! (Unless specified otherwise)\n" +
    "            </p>\n" +
    "            <form class=\"userprofileform\" name=\"userProfileform\" ng-show=\"editable\">\n" +
    "                <div class=\"userprofileform__firstcol\">\n" +
    "                    <div class=\"userprofileform__email\">\n" +
    "                    <span class=\"invalid invalid--email\" ng-show=\"userProfileform.userEmail.$error.required\">\n" +
    "                        Please fill in your email\n" +
    "                    </span>\n" +
    "                    <span class=\"invalid invalid--email\" ng-show=\"userProfileform.userEmail.$error.email\">\n" +
    "                        Please fill in valid email\n" +
    "                    </span>\n" +
    "                    <p class=\"userprofileform__labelmail\">Email</p>\n" +
    "                    <input type=\"email\" class=\"userprofileform__usermail\" ng-disabled=\"fieldisable\" ng-model=\"user.email\"  placeholder=\"{{ user.email }} Your e-mail\" name=\"userEmail\" ng-required=\"!fieldisable\" />\n" +
    "                </div>\n" +
    "                    <div class=\"userprofileform__phone\">\n" +
    "                    <p class=\"userprofileform__labelphone\">Phone</p>\n" +
    "                    <input type=\"text\"  class=\"userprofileform__userphone\" ng-disabled=\"fieldisable\" ng-model=\"user.phone\" placeholder=\"{{user.phone}} Phone number\" name=\"phone\" required />\n" +
    "                </div>\n" +
    "                </div>\n" +
    "                <div class=\"userprofileform__secondcol\">\n" +
    "                    <div class=\"userprofileform__shipping\">\n" +
    "                        <div>\n" +
    "                            <div class=\"userprofileform__labelshipping\">\n" +
    "                                Shipping Address\n" +
    "                            </div>\n" +
    "                            <div class=\"userprofileform__usershippinginfo\" ng-show=\"fieldisable\">\n" +
    "                                <span class=\"userprofileform__useraddress\">{{ user.shipping_address }} </span><br/>\n" +
    "                                <span class=\"userprofileform__useraddressfull\"> {{ user.shipping_city }} {{ user.shipping_state }} {{ user.shipping_zip }}</span>\n" +
    "                            </div>\n" +
    "                            <input type=\"text\" ng-hide=\"fieldisable\" class=\"userprofileform__usershipping\" ng-disabled=\"fieldisable\" ng-model=\"user.shipping_address\" placeholder=\"{{ user.shipping_address }} Shipping address\" name=\"shippingaddress\" required  />\n" +
    "                        </div>\n" +
    "                        <div>\n" +
    "                            <input type=\"text\" class=\"userprofileform__usercity\" ng-disabled=\"fieldisable\" ng-hide=\"fieldisable\" ng-model=\"user.shipping_city\" placeholder=\"{{ user.shipping_city }} Shipping city\"  name=\"shippingcity\" required  />\n" +
    "                            <input type=\"text\" class=\"userprofileform__userstate\" ng-disabled=\"fieldisable\" ng-hide=\"fieldisable\" ng-model=\"user.shipping_state\" placeholder=\"{{ user.shipping_state }} State\" name=\"shippingstate\" required  />\n" +
    "                            <input type=\"text\" class=\"userprofileform__userzip\" ng-disabled=\"fieldisable\" ng-hide=\"fieldisable\" ng-model=\"user.shipping_zip\" placeholder=\"{{ user.shipping_zip }} ZIP code\" name=\"shippingzip\" required  />\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div ng-show=\"editable\" class=\"editlink\">\n" +
    "                    <gs-user-edit fieldisable=\"fieldisable\" blocked=\"blocked\" user=\"user\" loading=\"loading\"></gs-user-edit>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>"
  );


  $templateCache.put('/scripts/user/user_profile_friendconnections.html',
    "<div class=\"friendconnections\">\n" +
    "    <div class=\"friendconnections__wrap\">\n" +
    "        <h2 class=\"friendconnections__title\">Friend Connections</h2>\n" +
    "        <p class=\"friendconnections__info\">\n" +
    "            Soon you'll be able to connect with your friends and family on GiftStarter. Make sure you never miss a birthday, anniversary, or important event, and finding people to pitch-in will be a breeze. Please check back soon!\n" +
    "        </p>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/user/user_profile_giftidea.html',
    "<div class=\"useridea\">\n" +
    "    <div class=\"useridea__wrap\">\n" +
    "        <h2 class=\"useridea__title\">Saved Gift Ideas</h2>\n" +
    "        <div class=\"useridea__filter\" ng-hide=\"userIdea.length == 0\">\n" +
    "            <span class=\"useridea__filterby\">\n" +
    "                Filter by\n" +
    "            </span>\n" +
    "            <!-- span class=\"useridea__filtertags\">\n" +
    "                My tags\n" +
    "            </span -->\n" +
    "            <span class=\"useridea__filterdate\">\n" +
    "                Date added\n" +
    "            </span>\n" +
    "            <span class=\"useridea__filtertprice\" ng-click=\"userOrder = '-price' \">\n" +
    "                Product price\n" +
    "            </span>\n" +
    "        </div>\n" +
    "        <p class=\"useridea__innfonone\" ng-show=\"userIdea.length == 0\">\n" +
    "            Did you know you can save products you like to your Saved Gift Idea Board? Just click the \"Save It For Later\" button!\n" +
    "        </p>\n" +
    "        <div class=\"useridea__productlist\">\n" +
    "            <div ng-repeat-start=\"idea in userIdea | limitTo:quantity | orderBy:userOrder track by $index\" class=\"h--hide\"></div>\n" +
    "            <div class=\"useridea__productlistitem\">\n" +
    "                    <div class=\"useridea__productdesc\">\n" +
    "                        <a class=\"useridea__productlink\" href=\"{{ giftstartThisUrl(idea.title, idea.price, idea.img, idea.url) }}\">\n" +
    "                            <div class=\"useridea__productimgwrap\">\n" +
    "                                <img class=\"useridea__productimg\" ng-src=\"{{ idea.img }}\" alt=\"Gift Idea Image\"/>\n" +
    "                                <a class=\"useridea__close linky\" ng-show=\"editable\" ng-click=\"DeleteSavedItem(idea)\" ng-disabled=\"idea.loading\">\n" +
    "                                    X <span class=\"useridea__deletetext\">remove</span> <img src=\"/assets/loading_transparent.gif\" class=\"loader\" ng-show=\"idea.loading\">\n" +
    "                                </a>\n" +
    "                            </div>\n" +
    "                        </a>\n" +
    "                        <a class=\"useridea__productlink\" href=\"{{ giftstartThisUrl(idea.title, idea.price, idea.img, idea.url) }}\">\n" +
    "                            <div clamp=\"2\"  class=\"useridea__producttitle\">\n" +
    "                                {{ idea.title }}\n" +
    "                            </div>\n" +
    "                            <div class=\"useridea__productprice\">{{ idea.price / 100 | currency }}</div>\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div ng-repeat-end=\"\" class=\"h--hide\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"useridea__findbtn\">\n" +
    "            <button href=\"search/\" ng-click=\"goToLink('giftideas')\" class=\"useridea__findlink primary-green\">Find more gift ideas</button>\n" +
    "        </div>\n" +
    "        <div ng-show=\"showMore\">\n" +
    "            <a class=\"useridea__viewmorelink linky\" ng-show=\" userIdea.length>10\"  ng-click=\"quantity=userIdea.length; showMore=false\">\n" +
    "                View more\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/user/user_profile_info.html',
    "       <form class=\"userprofile__info\" name=\"userprofileInfo\">\n" +
    "            <div class=\"userprofile__image\" ng-class=\"{true: 'userprofile__image--edit'}[editMode]\">\n" +
    "                <button class=\"userprofile__imagecancel tooltip--right\" data-tooltip=\"Close\" ng-show=\"editMode && !blocked\" ng-click=\"editMode = false;\">x</button>\n" +
    "                <img class=\"userprofile__userimage\" ng-src=\"{{user.img_url}}\" ng-hide=\"editMode && !blocked\" />\n" +
    "                <gs-image-upload ng-show=\"editMode && !blocked\" ng-class=\"{disabled: !imageSet}\" on-image-updated=\"imageUpdated\"></gs-image-upload>\n" +
    "                <img class=\"userprofile__preload\" src=\"/assets/loading_transparent.gif\" alt=\"image loading\" title=\"image loading\" ng-show=\"imgloading\">\n" +
    "                <button class=\"userprofile__imageedit\" ng-hide=\"editMode || blocked\"  ng-click=\"editMode=true;\">Change photo</button>\n" +
    "                <button class=\"userprofile__imagesave\" ng-click=\"submit(); editMode = false;\" ng-show=\"editMode && !blocked\" ng-class=\"{disabled: !imageSet}\">Save</button>\n" +
    "                <button class=\"userprofile__imageupload\" ng-show=\"editMode && !blocked\"  ng-click=\"openImageDialogGlobal();\">Upload</button>\n" +
    "            </div>\n" +
    "            <div class=\"userprofile__name\">\n" +
    "                <h2 ng-show=\"blocked\" class=\"userprofile__title\">\n" +
    "                    {{ user.name }}\n" +
    "                </h2>\n" +
    "                <input class=\"userprofile__title\" type=\"text\" ng-model=\"user.name\" ng-disabled=\"blocked\" ng-hide=\"blocked\" name=\"username\" ng-value=\"user.name\" placeholder=\"{{ user.name }}\" />\n" +
    "            </div>\n" +
    "            <div class=\"userprofile__social\">\n" +
    "                <div class=\"social\" ng-show=\"user.link_facebook||user.link_twitter||user.link_linkedin||user.link_googleplus||user.link_website||editable\">\n" +
    "                    <p class=\"social__desc\">Social profiles</p>\n" +
    "                    <div class=\"social__nolinks\" ng-hide=\"user.link_facebook||user.link_twitter||user.link_linkedin||user.link_googleplus||user.link_website||!blocked\">\n" +
    "                        (none added)\n" +
    "                    </div>\n" +
    "                    <div class=\"social__inline\" >\n" +
    "                        <div class=\"social__editblock\" ng-show=\"user.link_facebook||!blocked\">\n" +
    "                            <a ng-href=\"{{user.link_facebook}}\" class=\"social__link\" target=\"_blank\">\n" +
    "                                <img class=\"social__icons\" src=\"/assets/facebookicon.png\">\n" +
    "                            </a>\n" +
    "                            <input type=\"text\" name=\"linkfacebook\" class=\"social__inputs\" placeholder=\"{{user.link_facebook}} Paste link to profile\" onfocus=\"this.placeholder = ''\" ng-disabled=\"blocked\" ng-hide=\"blocked\" ng-model=\"user.link_facebook\" ng-blur=\"validateLinks()\"/>\n" +
    "                        </div>\n" +
    "                        <div class=\"social__editblock\" ng-show=\"user.link_twitter||!blocked\">\n" +
    "                            <a ng-href=\"{{user.link_twitter}}\" class=\"social__link\" target=\"_blank\">\n" +
    "                                <img class=\"social__icons\" src=\"/assets/twittericon.png\">\n" +
    "                            </a>\n" +
    "                            <input type=\"text\" name=\"linktwitter\" class=\"social__inputs\" placeholder=\"{{user.link_twitter}} Paste link to profile\" onfocus=\"this.placeholder = ''\" ng-disabled=\"blocked\" ng-hide=\"blocked\" ng-model=\"user.link_twitter\" ng-blur=\"validateLinks()\"/>\n" +
    "                        </div>\n" +
    "                        <div class=\"social__editblock\" ng-show=\"user.link_linkedin||!blocked\">\n" +
    "                            <a ng-href=\"{{user.link_linkedin}}\"  class=\"social__link\">\n" +
    "                                <img class=\"social__icons\" src=\"/assets/linkedInicon.png\">\n" +
    "                            </a>\n" +
    "                            <input type=\"text\" name=\"linklinkedin\" class=\"social__inputs\" placeholder=\"{{user.link_linkedin}} Paste link to profile\" onfocus=\"this.placeholder = ''\" ng-disabled=\"blocked\" ng-hide=\"blocked\" ng-model=\"user.link_linkedin\" ng-blur=\"validateLinks()\"/>\n" +
    "                        </div>\n" +
    "                        <div class=\"social__editblock\" ng-show=\"user.link_googleplus||!blocked\">\n" +
    "                            <a ng-href=\"{{user.link_googleplus}}\"  class=\"social__link\" target=\"_blank\">\n" +
    "                                <img class=\"social__icons\" src=\"/assets/googleicon.png\">\n" +
    "                            </a>\n" +
    "                            <input type=\"text\" name=\"linkgoogleplus\" class=\"social__inputs\" placeholder=\"{{user.link_googleplus}} Paste link to profile\" onfocus=\"this.placeholder = ''\" ng-hide=\"blocked\" ng-hide=\"blocked\" ng-model=\"user.link_googleplus\" ng-blur=\"validateLinks()\"/>\n" +
    "                        </div>\n" +
    "                        <div class=\"social__editblock\" ng-show=\"user.link_website||!blocked\">\n" +
    "                            <a href=\"{{user.link_website}}\"  class=\"social__link\" target=\"_blank\">\n" +
    "                                <img class=\"social__icons\" src=\"/assets/wwwicon.png\">\n" +
    "                            </a>\n" +
    "                            <input type=\"text\" name=\"linkwebsite\" class=\"social__inputs\" placeholder=\"{{user.link_website}} Paste link to web page\" onfocus=\"this.placeholder = ''\" ng-disabled=\"blocked\" ng-hide=\"blocked\" ng-model=\"user.link_website\" ng-blur=\"validateLinks()\"/>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"calendar\" ng-show=\"(user.birth_month&&user.birth_day)||editable\">\n" +
    "                <p class=\"calendar__calendartext\">Birth Date</p>\n" +
    "                <div class=\"calendar__monthwrap\">\n" +
    "                    <select ng-disabled=\"blocked\" class=\"calendar__month\" ng-model=\"user.birth_month\" ng-options=\"month.value as month.label for month in months\"></select>\n" +
    "                </div>\n" +
    "                <input type=\"number\" name=\"date\" min=\"1\" max=\"31\" class=\"calendar__date\" ng-disabled=\"blocked\" ng-model=\"user.birth_day\"  />\n" +
    "            </div>\n" +
    "           <div class=\"userprofile__errors\">{{user.error_message}}</div>\n" +
    "            <div ng-show=\"editable\" class=\"editlink editlink--white\">\n" +
    "                <gs-user-edit fieldisable=\"fieldisable\" blocked=\"blocked\" user=\"user\" userinfo=\"true\" loading=\"loading\" ></gs-user-edit>\n" +
    "            </div>\n" +
    "       </form>"
  );


  $templateCache.put('/scripts/user/user_profile_pitchins.html',
    "<h3 class=\"usercampaign__header\">\n" +
    "    Pitch Ins\n" +
    "</h3>\n" +
    "<div class=\"usercampaign__list\">\n" +
    "    <div ng-show=\"userCampaings.pitchins.length === 0\">\n" +
    "        <p ng-show=\"editable\">You haven't pitched-in on any gifts yet.</p>\n" +
    "        <p ng-hide=\"editable\" >{{ user.name }} hasn't pitched in on any gifts yet. Invite them to pitch-in on one of your campaigns!</p>\n" +
    "    </div>\n" +
    "    <div class=\"usercampaign__items\" ng-repeat-start=\"pitchin in pitchins_unique | limitTo:campaingquantity track by $index \" ng-class=\"{true: 'usercampaign__items--row'}[$index % 3 == 0 && !$first]\" ></div>\n" +
    "    <div class=\"usercampaign__productlistitem\">\n" +
    "        <a ng-href=\"/giftstart/{{ pitchin.giftstart_url_title }}\">\n" +
    "            <div class=\"usercampaign__productimgwrap\">\n" +
    "                <img class=\"usercampaign__itemsimages\" ng-src=\"{{ pitchin.gs_img }}\" alt=\"Pitch Ins image\"/>\n" +
    "            </div>\n" +
    "            <h4 clamp=\"2\"  class=\"usercampaign__itemstitle\">\n" +
    "                {{ pitchin.gs_title }}\n" +
    "            </h4>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div ng-repeat-end=\"\" class=\"h--hide\"></div>\n" +
    "</div>\n" +
    "<div class=\"usercampaign__viewmore\" ng-show=\"showMoreCampaign\" >\n" +
    "    <a class=\"usercampaign__viewmorelink linky\" ng-show=\" userCampaings.pitchins.length > 3\"  ng-click=\"campaingquantity=userCampaings.pitchins.length; showMoreCampaign = false\">\n" +
    "        <span class=\"usercampaign__viewmoretext\" >View More</span> <span class=\"usercampaign__viewmoreicon\"></span>\n" +
    "    </a>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/utilities/image-upload/image-upload.html',
    "<div class=\"image-upload wrapper\">\n" +
    "    <canvas></canvas>\n" +
    "    <div class=\"uploader\">\n" +
    "        <input class=\"thanks-image-input\" type=\"file\" capture=\"camera\" accept=\"image/*\"/>\n" +
    "        <button ng-click=\"openImageDialog()\" class=\"image\"></button>\n" +
    "        <button ng-click=\"rotateImage()\" class=\"rotate tooltip--left\" data-tooltip=\"Rotate uploaded image\"></button>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/utilities/link_create.html',
    "<html>\n" +
    "<body>\n" +
    "    <script src=\"http://cdnjs.cloudflare.com/ajax/libs/ramda/0.8.0/ramda.js\"></script>\n" +
    "    <script src=\"http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js\"></script>\n" +
    "    <script src=\"//tinymce.cachefly.net/4.1/tinymce.min.js\"></script>\n" +
    "    <script>\n" +
    "\n" +
    "        function setJson(shortlink) {\n" +
    "            var ret = '\\n     {';\n" +
    "            ret += '\\n         \"productName\":\"'+htmlentities($('#title').val().trim())+'\",';\n" +
    "            ret += '\\n         \"productNameShort\":\"'+htmlentities($('#titleshort').val().trim())+'\",';\n" +
    "            ret += '\\n         \"productSlug\":\"'+htmlentities($('#slug').val().trim())+'\",';\n" +
    "            ret += '\\n         \"productPrice\":\"'+htmlentities($('#price').val().trim())+'\",';\n" +
    "            ret += '\\n         \"productDescription\":\"'+tinyMCE.activeEditor.getContent({format : 'html'}).replace(/\"/g, \"&quot;\").replace(/(?:\\r\\n|\\r|\\n)/g, '<br />')+'\",';\n" +
    "//            ret += '\\n         \"productDescription\":\"'+htmlentities($('#description').val().trim()).replace(/(?:\\r\\n|\\r|\\n)/g, '<br />')+'\",';\n" +
    "            ret += '\\n         \"productMetaDescription\":\"'+htmlentities($('#metadescription').val().trim()).replace(/(?:\\r\\n|\\r|\\n)/g, '<br />')+'\",';\n" +
    "            ret += '\\n         \"productImage\":\"'+htmlentities($('#image').val().trim())+'\",';\n" +
    "            ret += '\\n         \"productThumb\":\"'+htmlentities($('#imagethumb').val().trim())+'\",';\n" +
    "            ret += '\\n         \"imageAltText\":\"'+htmlentities($('#alttext').val().trim())+'\",';\n" +
    "            ret += '\\n         \"giftStartLink\":\"'+shortlink+'\"';\n" +
    "            ret += '\\n     },';\n" +
    "            $('#json').val(ret);\n" +
    "            $('#json').select();\n" +
    "        }\n" +
    "\n" +
    "        function formSubmit() {\n" +
    "            var url = makeUrl($('#url').val(), $('#title').val(),\n" +
    "                    $('#price').val(), $('#image').val(), $('#source').val());\n" +
    "            $('#result').val(url);\n" +
    "            $('#prodimglink').attr(\"href\",$('#image').val());\n" +
    "            $('#prodimg').attr(\"src\",$('#image').val());\n" +
    "            setBitlyUrl(url);\n" +
    "        }\n" +
    "\n" +
    "        function makeUrl(url, title, price, img, source) {\n" +
    "            if (source === '') {\n" +
    "                alert(\"oops!  need a referrer!  just put any tracking string, like 'mancrate_coffee'.\");\n" +
    "                return '';\n" +
    "            }\n" +
    "            return 'https://www.giftstarter.com/create?' + urlSerialize({\n" +
    "                        product_url: url,\n" +
    "                        title: title,\n" +
    "                        price: 100*price,\n" +
    "                        img_url: (img.toLowerCase().indexOf('http')==0?img:('/assets/giftideas/category'+img)),\n" +
    "                        source: source\n" +
    "                    });\n" +
    "        }\n" +
    "\n" +
    "        function urlSerialize(obj) {\n" +
    "            var str = [];\n" +
    "            for(var p in obj)\n" +
    "                if (obj.hasOwnProperty(p)) {\n" +
    "                    str.push(encodeURIComponent(p) + \"=\" +\n" +
    "                    encodeURIComponent(obj[p]));\n" +
    "                }\n" +
    "            return str.join(\"&\");\n" +
    "        }\n" +
    "\n" +
    "        function setBitlyUrl(long_url){\n" +
    "            $('#shortlink').val(\"\");\n" +
    "            $.getJSON(\n" +
    "                \"http://api.bitly.com/v3/shorten?callback=?\",\n" +
    "                {\n" +
    "                    \"format\": \"json\",\n" +
    "                    \"apiKey\": \"R_85bf9d10211f4423b5c3be4a336ad77d\",\n" +
    "                    \"login\": \"giftstarter\",\n" +
    "                    \"longUrl\": long_url\n" +
    "                },\n" +
    "                function(response)\n" +
    "                {\n" +
    "                    $('#shortlink').val(response.data.url);\n" +
    "                    setJson(response.data.url);\n" +
    "                }\n" +
    "            );\n" +
    "        }\n" +
    "\n" +
    "        function setShortTitle() {\n" +
    "            $('#titleshort').val($('#title').val().substring(0, 28));\n" +
    "            setProductSlug();\n" +
    "        }\n" +
    "        function setProductSlug() {\n" +
    "            $('#alttext').val($('#titleshort').val());\n" +
    "            $('#slug').val(JSON.stringify($('#titleshort').val()).trim().replace(/\\W/g,' ').trim().replace(/ +/g,'-'));\n" +
    "            setImageVals();\n" +
    "        }\n" +
    "        function setImageVals() {\n" +
    "            $('#image').val('/'+$('#catslug').val()+'/'+$('#slug').val().toLowerCase()+'.jpg');\n" +
    "            $('#imagethumb').val('/'+$('#catslug').val()+'/'+$('#slug').val().toLowerCase()+'-thumb.jpg');\n" +
    "        }\n" +
    "        function checkSlug() {\n" +
    "            this.value = this.value.replace(/ /g, \"-\");\n" +
    "            setImageVals();\n" +
    "        }\n" +
    "\n" +
    "        function get_html_translation_table(table, quote_style) {\n" +
    "          //  discuss at: http://phpjs.org/functions/get_html_translation_table/\n" +
    "          // original by: Philip Peterson\n" +
    "          //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n" +
    "          // bugfixed by: noname\n" +
    "          // bugfixed by: Alex\n" +
    "          // bugfixed by: Marco\n" +
    "          // bugfixed by: madipta\n" +
    "          // bugfixed by: Brett Zamir (http://brett-zamir.me)\n" +
    "          // bugfixed by: T.Wild\n" +
    "          // improved by: KELAN\n" +
    "          // improved by: Brett Zamir (http://brett-zamir.me)\n" +
    "          //    input by: Frank Forte\n" +
    "          //    input by: Ratheous\n" +
    "          //        note: It has been decided that we're not going to add global\n" +
    "          //        note: dependencies to php.js, meaning the constants are not\n" +
    "          //        note: real constants, but strings instead. Integers are also supported if someone\n" +
    "          //        note: chooses to create the constants themselves.\n" +
    "          //   example 1: get_html_translation_table('HTML_SPECIALCHARS');\n" +
    "          //   returns 1: {'\"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}\n" +
    "\n" +
    "          var entities = {},\n" +
    "            hash_map = {},\n" +
    "            decimal;\n" +
    "          var constMappingTable = {},\n" +
    "            constMappingQuoteStyle = {};\n" +
    "          var useTable = {},\n" +
    "            useQuoteStyle = {};\n" +
    "\n" +
    "          // Translate arguments\n" +
    "          constMappingTable[0] = 'HTML_SPECIALCHARS';\n" +
    "          constMappingTable[1] = 'HTML_ENTITIES';\n" +
    "          constMappingQuoteStyle[0] = 'ENT_NOQUOTES';\n" +
    "          constMappingQuoteStyle[2] = 'ENT_COMPAT';\n" +
    "          constMappingQuoteStyle[3] = 'ENT_QUOTES';\n" +
    "\n" +
    "          useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';\n" +
    "          useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() :\n" +
    "            'ENT_COMPAT';\n" +
    "\n" +
    "          if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {\n" +
    "            throw new Error('Table: ' + useTable + ' not supported');\n" +
    "            // return false;\n" +
    "          }\n" +
    "\n" +
    "          entities['38'] = '&amp;';\n" +
    "          if (useTable === 'HTML_ENTITIES') {\n" +
    "            entities['160'] = '&nbsp;';\n" +
    "            entities['161'] = '&iexcl;';\n" +
    "            entities['162'] = '&cent;';\n" +
    "            entities['163'] = '&pound;';\n" +
    "            entities['164'] = '&curren;';\n" +
    "            entities['165'] = '&yen;';\n" +
    "            entities['166'] = '&brvbar;';\n" +
    "            entities['167'] = '&sect;';\n" +
    "            entities['168'] = '&uml;';\n" +
    "            entities['169'] = '&copy;';\n" +
    "            entities['170'] = '&ordf;';\n" +
    "            entities['171'] = '&laquo;';\n" +
    "            entities['172'] = '&not;';\n" +
    "            entities['173'] = '&shy;';\n" +
    "            entities['174'] = '&reg;';\n" +
    "            entities['175'] = '&macr;';\n" +
    "            entities['176'] = '&deg;';\n" +
    "            entities['177'] = '&plusmn;';\n" +
    "            entities['178'] = '&sup2;';\n" +
    "            entities['179'] = '&sup3;';\n" +
    "            entities['180'] = '&acute;';\n" +
    "            entities['181'] = '&micro;';\n" +
    "            entities['182'] = '&para;';\n" +
    "            entities['183'] = '&middot;';\n" +
    "            entities['184'] = '&cedil;';\n" +
    "            entities['185'] = '&sup1;';\n" +
    "            entities['186'] = '&ordm;';\n" +
    "            entities['187'] = '&raquo;';\n" +
    "            entities['188'] = '&frac14;';\n" +
    "            entities['189'] = '&frac12;';\n" +
    "            entities['190'] = '&frac34;';\n" +
    "            entities['191'] = '&iquest;';\n" +
    "            entities['192'] = '&Agrave;';\n" +
    "            entities['193'] = '&Aacute;';\n" +
    "            entities['194'] = '&Acirc;';\n" +
    "            entities['195'] = '&Atilde;';\n" +
    "            entities['196'] = '&Auml;';\n" +
    "            entities['197'] = '&Aring;';\n" +
    "            entities['198'] = '&AElig;';\n" +
    "            entities['199'] = '&Ccedil;';\n" +
    "            entities['200'] = '&Egrave;';\n" +
    "            entities['201'] = '&Eacute;';\n" +
    "            entities['202'] = '&Ecirc;';\n" +
    "            entities['203'] = '&Euml;';\n" +
    "            entities['204'] = '&Igrave;';\n" +
    "            entities['205'] = '&Iacute;';\n" +
    "            entities['206'] = '&Icirc;';\n" +
    "            entities['207'] = '&Iuml;';\n" +
    "            entities['208'] = '&ETH;';\n" +
    "            entities['209'] = '&Ntilde;';\n" +
    "            entities['210'] = '&Ograve;';\n" +
    "            entities['211'] = '&Oacute;';\n" +
    "            entities['212'] = '&Ocirc;';\n" +
    "            entities['213'] = '&Otilde;';\n" +
    "            entities['214'] = '&Ouml;';\n" +
    "            entities['215'] = '&times;';\n" +
    "            entities['216'] = '&Oslash;';\n" +
    "            entities['217'] = '&Ugrave;';\n" +
    "            entities['218'] = '&Uacute;';\n" +
    "            entities['219'] = '&Ucirc;';\n" +
    "            entities['220'] = '&Uuml;';\n" +
    "            entities['221'] = '&Yacute;';\n" +
    "            entities['222'] = '&THORN;';\n" +
    "            entities['223'] = '&szlig;';\n" +
    "            entities['224'] = '&agrave;';\n" +
    "            entities['225'] = '&aacute;';\n" +
    "            entities['226'] = '&acirc;';\n" +
    "            entities['227'] = '&atilde;';\n" +
    "            entities['228'] = '&auml;';\n" +
    "            entities['229'] = '&aring;';\n" +
    "            entities['230'] = '&aelig;';\n" +
    "            entities['231'] = '&ccedil;';\n" +
    "            entities['232'] = '&egrave;';\n" +
    "            entities['233'] = '&eacute;';\n" +
    "            entities['234'] = '&ecirc;';\n" +
    "            entities['235'] = '&euml;';\n" +
    "            entities['236'] = '&igrave;';\n" +
    "            entities['237'] = '&iacute;';\n" +
    "            entities['238'] = '&icirc;';\n" +
    "            entities['239'] = '&iuml;';\n" +
    "            entities['240'] = '&eth;';\n" +
    "            entities['241'] = '&ntilde;';\n" +
    "            entities['242'] = '&ograve;';\n" +
    "            entities['243'] = '&oacute;';\n" +
    "            entities['244'] = '&ocirc;';\n" +
    "            entities['245'] = '&otilde;';\n" +
    "            entities['246'] = '&ouml;';\n" +
    "            entities['247'] = '&divide;';\n" +
    "            entities['248'] = '&oslash;';\n" +
    "            entities['249'] = '&ugrave;';\n" +
    "            entities['250'] = '&uacute;';\n" +
    "            entities['251'] = '&ucirc;';\n" +
    "            entities['252'] = '&uuml;';\n" +
    "            entities['253'] = '&yacute;';\n" +
    "            entities['254'] = '&thorn;';\n" +
    "            entities['255'] = '&yuml;';\n" +
    "          }\n" +
    "\n" +
    "          if (useQuoteStyle !== 'ENT_NOQUOTES') {\n" +
    "            entities['34'] = '&quot;';\n" +
    "          }\n" +
    "          if (useQuoteStyle === 'ENT_QUOTES') {\n" +
    "            entities['39'] = '&#39;';\n" +
    "          }\n" +
    "          entities['60'] = '&lt;';\n" +
    "          entities['62'] = '&gt;';\n" +
    "\n" +
    "          // ascii decimals to real symbols\n" +
    "          for (decimal in entities) {\n" +
    "            if (entities.hasOwnProperty(decimal)) {\n" +
    "              hash_map[String.fromCharCode(decimal)] = entities[decimal];\n" +
    "            }\n" +
    "          }\n" +
    "\n" +
    "          return hash_map;\n" +
    "        }\n" +
    "\n" +
    "        function htmlentities(string, quote_style, charset, double_encode) {\n" +
    "            //  discuss at: http://phpjs.org/functions/htmlentities/\n" +
    "            // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n" +
    "            //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n" +
    "            //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n" +
    "            // improved by: nobbler\n" +
    "            // improved by: Jack\n" +
    "            // improved by: Rafał Kukawski (http://blog.kukawski.pl)\n" +
    "            // improved by: Dj (http://phpjs.org/functions/htmlentities:425#comment_134018)\n" +
    "            // bugfixed by: Onno Marsman\n" +
    "            // bugfixed by: Brett Zamir (http://brett-zamir.me)\n" +
    "            //    input by: Ratheous\n" +
    "            //  depends on: get_html_translation_table\n" +
    "            //   example 1: htmlentities('Kevin & van Zonneveld');\n" +
    "            //   returns 1: 'Kevin &amp; van Zonneveld'\n" +
    "            //   example 2: htmlentities(\"foo'bar\",\"ENT_QUOTES\");\n" +
    "            //   returns 2: 'foo&#039;bar'\n" +
    "\n" +
    "            var hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style),\n" +
    "            symbol = '';\n" +
    "            string = string == null ? '' : string + '';\n" +
    "\n" +
    "            if (!hash_map) {\n" +
    "                return false;\n" +
    "            }\n" +
    "\n" +
    "            if (quote_style && quote_style === 'ENT_QUOTES') {\n" +
    "            hash_map[\"'\"] = '&#039;';\n" +
    "            }\n" +
    "\n" +
    "            if ( !! double_encode || double_encode == null) {\n" +
    "                for (symbol in hash_map) {\n" +
    "                  if (hash_map.hasOwnProperty(symbol)) {\n" +
    "                    string = string.split(symbol)\n" +
    "                      .join(hash_map[symbol]);\n" +
    "                  }\n" +
    "                }\n" +
    "            } else {\n" +
    "                string = string.replace(/([\\s\\S]*?)(&(?:#\\d+|#x[\\da-f]+|[a-zA-Z][\\da-z]*);|$)/g, function(ignore, text, entity) {\n" +
    "                  for (symbol in hash_map) {\n" +
    "                    if (hash_map.hasOwnProperty(symbol)) {\n" +
    "                      text = text.split(symbol)\n" +
    "                        .join(hash_map[symbol]);\n" +
    "                    }\n" +
    "                  }\n" +
    "\n" +
    "                  return text + entity;\n" +
    "                });\n" +
    "            }\n" +
    "\n" +
    "          return string;\n" +
    "        }\n" +
    "\n" +
    "    </script>\n" +
    "    <div style=\" display:inline-block; float:left; min-width:750px; white-space: nowrap\">\n" +
    "        <label style=\"color:#999999\" for=\"catslug\">Category Slug*</label> <input type=\"text\" id=\"catslug\" required=\"\" value=\"\" placeholder=\"teacher\"/><br>\n" +
    "        <label for=\"url\">Product URL</label> <input type=\"text\" id=\"url\" required=\"\" size=\"80\"/><br>\n" +
    "        <label for=\"title\">Product Title</label> <input type=\"text\" id=\"title\" required=\"\" size=\"80\" onchange=\"setShortTitle()\"/><br>\n" +
    "        <label style=\"color:#999999\" for=\"titleshort\">Short Title*</label> <input type=\"text\" id=\"titleshort\" required=\"\" size=\"40\" maxlength=\"28\" onchange=\"setProductSlug()\"/> (max 28 chars)<br>\n" +
    "        <label style=\"color:#999999\" for=\"slug\">Product Slug*</label> <input type=\"text\" id=\"slug\" required=\"\" size=\"40\"/><br>\n" +
    "        <label for=\"image\">Product Image URL</label> <input type=\"text\" id=\"image\" required=\"\" size=\"40\" value=\"\" placeholder=\"/teacher/visa-gift-card.png\"/><br>\n" +
    "        <label for=\"imagethumb\" style=\"color:#999999\">Product Thumbnail URL</label> <input type=\"text\" id=\"imagethumb\" required=\"\" size=\"40\" value=\"\"/><br>\n" +
    "        <label style=\"color:#999999\" for=\"alttext\">Image ALT text*</label> <input type=\"text\" id=\"alttext\" required=\"\" size=\"40\" /><br>\n" +
    "        <label for=\"price\">Product Price</label> <input type=\"text\" id=\"price\" required=\"\" placeholder=\"e.g. 299.67 for $299.67\"/><br>\n" +
    "        <label style=\"color:#999999;vertical-align:top\" for=\"description\">Description*</label> <textarea type=\"text\" id=\"description\" required=\"\" rows=\"5\" cols=\"60\"> </textarea><br>\n" +
    "        <label style=\"color:#999999;vertical-align:top\" for=\"metadescription\">Meta Description*</label> <textarea type=\"text\" id=\"metadescription\" required=\"\" rows=\"3\" cols=\"60\"> </textarea><br>\n" +
    "        <label for=\"source\">Referrer (a tracking string)</label> <input type=\"text\" id=\"source\" required=\"\" /><br><br>\n" +
    "        <label style=\"color:#999999\">*only required for JSON</label> &nbsp; &nbsp; <button id=\"submit\" onclick=\"formSubmit()\">Create Link</button><br><br>\n" +
    "        <label for=\"result\">Result </label><input id=\"result\" size=\"40\"/> &nbsp;\n" +
    "        <label for=\"shortlink\">Short </label><input id=\"shortlink\"/><br>\n" +
    "        <textarea id=\"json\" rows=\"10\" cols=\"80\"></textarea>\n" +
    "    </div>\n" +
    "    <div><a id=\"prodimglink\" href=\"/assets/link_create_preview.png\" target=\"prodimg\"><img id=\"prodimg\" style=\"display:inline-block; float:left; width:480px; border: 0px;\" src=\"/assets/link_create_preview.png\"></a></div>\n" +
    "\n" +
    "    <script>\n" +
    "        tinymce.init({\n" +
    "            selector:'#description',\n" +
    "            plugins: [\"code\", \"paste\"],\n" +
    "            oninit : \"setPlainText\",\n" +
    "            width: 620,\n" +
    "            toolbar: \"bold italic underline styleselect fontsizeselect bullist numlist outdent indent removeformat subscript superscript code\"\n" +
    "        });\n" +
    "        $('#slug').on('change', checkSlug);\n" +
    "        $('#catslug').on('change', function () {\n" +
    "            this.value = this.value.toLowerCase();\n" +
    "            this.value = this.value.replace(/ /g, \"-\");\n" +
    "            setImageVals();\n" +
    "        });\n" +
    "    </script>\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('/scripts/utilities/toast.html',
    "<div class=\"toast-wrapper\" ng-class=\"{hide: hide, displayed: displayed}\">\n" +
    "    <p class=\"toast\"></p>\n" +
    "    <p class=\"close\" ng-click=\"hideToast()\">X</p>\n" +
    "</div>"
  );

}]);

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsView', ['$timeout', gsView]);

function gsView($timeout) {
    function link(scope, element, attrs) {
        scope.$on('$viewContentLoaded', pathChanged);
        function pathChanged() {$timeout(scrollTop, 0)}
        function scrollTop() {window.scrollTo(0, element[0].offsetTop - 9999)}
    }

    return {link: link}
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsFocus', gsFocus);

function gsFocus($timeout, $parse) {
    return {
        //scope: true
        link: function(scope, element, attrs) {
            var model = $parse(attrs.gsFocus);
            scope.$watch(model, function(value) {
                if(value === true) {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });
            // on blur event:
            element.bind('blur', function() {
                console && console.log && console.log('blur');
                scope.$apply(model.assign(scope, false));
            });
        }
    };
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

setTimeout(function() {
    // For the HubSpot Sidekick bug.  Seriously.
    // https://trello.com/c/8qqEvQL6/182-high-chrome-browser-view-is-not-working
    angular.module('GiftStarterApp')
        .directive('gsMenu', gsMenu);
}, 0);
setTimeout(function() {
    // Fallback for if it still doesn't load
    if (document.getElementById('angular-view') === null) {
        window.location.reload();
    }
}, 3000);

function gsMenu(UserService, PopoverService) {

    function link(scope, element) {
        if (!device.mobile()) {element.style = "display: None"}

        scope.expanded = false;
        scope.loggedIn = UserService.loggedIn;
        scope.login = login;
        scope.logout = logout;
        scope.expand = expand;
        scope.close = close;

        scope.$on('logout-success', loginChanged);
        scope.$on('login-success', loginChanged);
        scope.$on('menu-open', expand);
        scope.$on('menu-close', close);

        function loginChanged() {scope.loggedIn = UserService.loggedIn}
        function expand() {scope.expanded = true}
        function close() {scope.expanded = false}
        function login() {PopoverService.setPopover('login')}
        function logout() {UserService.logout()}
    }

    return {
        restrict: 'E',
        templateUrl: '/scripts/menu/menu.ng.html',
        link: link
    };
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

angular.module('GiftStarterApp').directive('gsScrollPlay',[
    '$window', gsScrollPlay]);

function gsScrollPlay($window) {
    var scope, element, padding, attributes, loaded = false;

    function link($scope, elm, attrs) {
        window.elm = elm;
        scope = $scope;
        element = elm[0];
        attributes = attrs;
        padding = attrs.gsPadding;
        angular.element($window).bind("scroll", onScroll);
    }

    function onScroll() {
        var pxPastTop = $window.innerHeight -
            element.getBoundingClientRect().top;
        if (!loaded) {
            if (pxPastTop > padding) {
                loaded = true;
                var parent = element.parentNode;
                attributes.$set('src', '/assets/howToUseGS.gif');
                element.remove();
                parent.appendChild(element.cloneNode(false));
            }
        }
    }

    return {
        restrict: 'A',
        link: link
    }
}


/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('AboutController', ['$scope','$location','$timeout',
    AboutController]);

function AboutController($scope,  $location,  $timeout) {
    $scope.location = $location;

    $scope.scrollToSearch = function() {
        if (Object.keys($location.search()).length) {
            var selector = document.querySelector('#'+Object.keys($location.search())[0]);
            var element = angular.element(selector);
            element[0].scrollIntoView();
        }
    };

    $scope.$watch('location.search()', function() {
        $timeout($scope.scrollToSearch, 400);
        $timeout($scope.scrollToSearch, 700);
    });
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('FaqController', ['$scope','$location','$timeout', 'Analytics',
    FaqController]);

function FaqController($scope,  $location,  $timeout, Analytics) {
    $scope.location = $location;

    $scope.openQuestions = [];

    var allOpen = false;

    $scope.questionCount = 0;
    var question = function(question, answer) {
        this.question = question;
        this.answer = answer;
        $scope.questionCount++;
    };

    var section = function(name, questions) {
        this.name = name;
        this.questions = questions;
    };

    $scope.items = [
        new section(
            "OVERVIEW",
            [
                new question(
                    "What is GiftStarter?",
                    "GiftStarter is a payment parsing service that lets you buy and gift anything that is sold online, piece by piece, at anytime, and with/for whomever you want. We divide anything sold on the internet into a grid, then family and friends buy it tile by tile off the grid. Once complete, we send a handmade card and ensure the gift is shipped, too!"
                ),
                new question(
                    "How does it work?",
                    "Search for and select a product using the search bar on the homepage, fill out the GiftStarter Campaign information to share your story on why this is important to you or your gift recipient, and bring others along on the giving journey.  We let your family and friends choose their pieces of the gift to give, we send an awesome hand-crafted group card to remember the experience, and the gift too."
                ),
                new question(
                    "Who can use the GiftStarter service?",
                    "Anyone can use the GiftStarter service who has a credit card. We accept payments from most everywhere in the world. Gifts are currently limited to delivery in the United States only for now. Europe and Asia are not available for delivery yet - we are working on it."
                ),
                new question(
                    "What methods of payment do you support?",
                    "We accept Visa, Mastercard, American Express, and Discover. We process credit cards using Paypal, and direct payment via PayPal account is coming soon!"
                ),
                new question(
                    "How does GiftStarter compare to other crowdfunding sites?",
                    "Other crowdfunding sites focus on enabling payment process. We focus on enabling the gifting experience all the way to delivering a hand-crafted group card and gift."
                ),
                new question(
                    "Where do I go if I need help?",
                    "We are always here to help!  Email us at <a href=\"mailto:giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a>.  We are also on standby on <a href=\"https://twitter.com/GiftStarter\">Twitter</a> (@GiftStarter) and <a href=\"www.facebook.com/giftstart\">Facebook</a> (www.facebook.com/giftstart).  Also, feel free to call us at <a href=\"tel:2064864849\">206-486-4849</a>!"
                )
            ]
        ),
        new section(
            "GIFTSTARTER CAMPAIGNS",
            [
                new question(
                    "How long will my Giftstarter Campaign be live?",
                    "The Gift Champion who creates the gift campaign can decide on how long they want the campaign. You can currently choose from 1 day to 30 days."
                ),
                new question(
                    "What happens if my GiftStarter Campaign isn't completed before the due date?",
                    "We send out a giftcard for the amount raised. Depending on the funding level, we will send the recipient a hand-crafted group card with the image of what was intended."
                ),
                new question(
                    "How do I create a successful GiftStarter Campaign?",
                    "When you create the GiftStarter Campaign title and description, share with others who will pitch in why it's awesome, why it is the perfect gift for your recipient, and any personal notes about the recipient. Encourage others who pitch in to share their personal stories related to the recipient too! After all, we're creating a gifting memory together!"
                ),
                new question(
                    "When am I charged?",
                    "We want to get your contribution to the gift as soon as possible, so we charge your card as soon as you pitch in."
                )
            ]
        ),
        new section(
            "GIFTS",
            [
                new question(
                    "After the GiftStarter Campaign ends, when will the gift arrive?",
                    "We will send both the hand-crafted group card (with all those that pitched in and their personal notes) and the gift within 3-5 business days of the GiftStarter Campaign completion."
                ),
                new question(
                    "How is the \"base price\" determined?",
                    "The price of the gift at the time of campaign creation will be used to determine the \"base price.\""
                ),
                new question(
                    "How do I know who pitched in on the gift?",
                    "You'll receive a link to the GiftStarter Campaign once you pitch in. If you're the recipient, you'll receive a hand-crafted gift card at the end of the campaign!"
                )
            ]
        ),
        new section(
            "SERVICE FEES",
            [
                new question(
                    "Does GiftStarter have a fee?",
                    "Yes, our GiftStarter service fee is 8%."
                ),
                new question(
                    "Who pays the fees?",
                    "The 8% service fee is split up among the contributors to the GiftStarter campaign. For example, the fee would be $8.00 for a $100.00 item. And so if you have ten (10) people pitching in, then each person would only pay an additional $0.80. Yes... only 80 cents!! At that point, you could say it's almost free."
                ),
                new question(
                    "Is there a sales tax?",
                    "Yes, we have to pay all required legal taxes."
                ),
                new question(
                    "Do I get a receipt?",
                    "Yes, as soon as you pitch in, you will receive an email receipt."
                )
            ]
        ),
        new section(
            "SECURITY",
            [
                new question(
                    "Is my credit card information secure?",
                    "Security is our top priority. To get specific, our site uses industry standard 128-bit SSL (Secure Sockets Layer) to ensure that sensitive data (ie. credit card number, name, address, etc.) is transmitted securely during every transaction. SSL encrypts the data before it is transmitted so that it can never be read. You will see the SSL seal displayed on the page during checkout and the address bar will change to begin with https."
                ),
                new question(
                    "Is my personal information safe?",
                    "We’re sticklers about this. We never share or sell any of the personal information of our registrants or gift-givers."
                )
            ]
        )
    ];

    $scope.scrollToSearch = function() {
        if (Object.keys($location.search()).length) {
            var selector = document.querySelector('#'+Object.keys($location.search())[0]);
            var element = angular.element(selector);
            element[0].scrollIntoView();
        }
    };

    $scope.$watch('location.search()', function() {
        $timeout($scope.scrollToSearch, 400);
        $timeout($scope.scrollToSearch, 700);
    });

    $scope.toggleQuestion = function(question) {
        if($scope.isOpenQuestion(question)) {
            $scope.openQuestions.splice($scope.openQuestions.indexOf(question), 1);
        } else {
            $scope.openQuestions.push(question);
            Analytics.track("faq", question.question);
        }
    };

    $scope.toggleAll = function() {
        if (allOpen) {
            $scope.openQuestions.length = 0;
            allOpen = false;
        } else {
            for (var sectionIndex = 0; sectionIndex < $scope.items.length; sectionIndex++) {
                for (var questionIndex = 0; questionIndex < $scope.items[sectionIndex].questions.length; questionIndex++) {
                    $scope.openQuestions.push($scope.items[sectionIndex].questions[questionIndex]);
                }
            }
            allOpen = true;
        }
    };

    $scope.isOpenQuestion = function(question) {
        return $scope.openQuestions.indexOf(question) != -1
    }
}
'use strict';

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('GiftideasController', ['$scope', '$http', '$location', 'ProductService', 'UserService', GiftideasController]);

function GiftideasController($scope, $http, $location, ProductService, UserService) {
    $scope.productMessage = '';
    $scope.location = $location;
    $scope.path = $location.path();
    $scope.isSavingForLater = false;
    var pathParts = $scope.path.replace('//', '/').split('/');
    $scope.basePath = pathParts[1];
    var category = pathParts.length > 2 ? pathParts[2] : false;
    var product = pathParts.length > 3 ? pathParts[3] : false;

    // hack for mailing list error where we linked to the wrong category
    if(category && !product && (category === 'lunarnewyear' || category === 'farewell' || category === 'pisces') && $location.search()['utm_campaign'] === '18f05bc479-Weekly_Email_Lunar_New_Year_Pisces_2_19_2015') {
        category = false;
    }

    $scope.saveGiftIdeaForLater = function(product) {
        $scope.isSavingForLater = true;
        var saver = ProductService.saveForLater('GiftIdeas',
            product.giftStartLink,
            parseInt(product.productPrice * 100),
            product.productName,
            product.productDescription,
            product.productImage.indexOf('http') === 0 ? product.productImage : ('/assets/giftideas/category' + product.productImage)
        );
        if(saver) {
            saver.success(function () {
                $scope.productMessage = 'The gift has been saved to your <a href=\'/users/\' + UserService.uid + \'\'>profile</a>.';
                $scope.isSavingForLater = false;
            })
            .error(function () {
                $scope.productMessage = 'An error occurred while saving the product: ' + response['error'];
                $scope.isSavingForLater = false;
            });
        } else {
            $scope.isSavingForLater = false;
        }
    };

    function setMeta(metatitle, metadesc) {
        metatitle = 'GiftStarter: ' + metatitle;
        $('html head title').text(metatitle);
        $('html head meta[property=\'og:title\']').attr('content', metatitle);
        $('html head meta[name=description]').attr('content', metadesc);
        $('html head meta[property="og:description"]').attr('content', metadesc);
    }

    var prior,
        setMetaFlag;

    function productInit (productValue) {
        productValue.productNameStripped = String(productValue.productName).replace(/<[^>]+>/g, '').replace(/&([a-zA-Z0-9#]{2,7});/g, '');
        productValue.hasPrice = /^\d.*/.test(productValue.productPrice);
        productValue.productDescription = productValue.productDescription.replace(/<\/p>\s*(<br\s*\/>)*(<p>\s*&nbsp;\s*<\/p>)*(<br\s*\/>)*\s*<p>/g, '</p><p>');
        productValue.productDescription = productValue.productDescription.replace(/&quot;/g, '"');
        productValue.productDescription = productValue.productDescription.replace(/<a /g, '<a target="_new" ');
    }

    function fillProductData (productValue, productKey) {

        productInit(productValue);

        if(prior != null) {
            $scope.groups.push([prior, productValue]);
            prior = null;
        } else {
            prior = productValue;
        }

        if(product && productValue.productSlug === product) {
            $scope.product = productValue;
            var metatitle = productValue.productName.replace(/&[a-zA-Z0-9]{1,5};/g, '');
            var metadesc = productValue.productMetaDescription && productValue.productMetaDescription.trim() !== '' ? productValue.productMetaDescription : productValue.productDescription;
            setMeta(metatitle, metadesc);
            setMetaFlag = true;
        }
        $scope.lastProduct = productValue;
    }

    function shuffle(groupsArr) {
        var currentIndex = groupsArr.length, temporaryValue, randomIndex ;

        while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = groupsArr[currentIndex];
        groupsArr[currentIndex] = groupsArr[randomIndex];
        groupsArr[randomIndex] = temporaryValue;
      }

      return groupsArr;
    }

    if(category) {
        $http.get('/assets/giftideas/' + category + '.json').then( function (response) {
            $scope.groups = [];
            $scope.category = response.data;
            $scope.categoryPath = $scope.basePath + '/' + category;
            prior = null;
            setMetaFlag = false;
            angular.forEach(response.data.productList, fillProductData);
            shuffle($scope.groups)
            if(!setMetaFlag) {
                var metatitle = response.data.categoryName;
                var metadesc = response.data.categoryMetaDescription && response.data.categoryMetaDescription.trim() !== '' ? response.data.categoryMetaDescription : response.data.categoryBlurb;
                setMeta(metatitle, metadesc);
            }
            if(prior != null) {
                $scope.groups.push([prior]);
            }
        });
    }

    $scope.goToLink = function(destination) {
        window.location.href = destination;
    };
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('ConciergeController', ['$scope', '$http',
    ConciergeController]);

function ConciergeController($scope, $http) {

    var resetForm = function() {
        $scope.email = "";
        $scope.title = "";
        $scope.budget = "";
        $scope.url = "";
        $scope.msg = "";
    };

    resetForm();

    var validateForm = function() {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test($scope.email);
    }

    $scope.sendMsg = function() {
        if (validateForm()) {
            $http.put('/email/contactus.json',{
                "from_email": $scope.email,
                "title": $scope.title,
                "budget": $scope.budget,
                "url": $scope.url
            })
            .success(function (res) {
                resetForm();
                $scope.msg = "Thank you! We'll do our best to respond on the same day, definitely within 24 hours. Please add giftconcierge@giftstarter.com to your address book to make sure you'll receive the reply."
            })
            .error(function (res) {
                $scope.msg = res['error'];
            });
        } else {
            $scope.msg = "Please enter a valid email address.";
        }
    }
}


/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var HowItWorksController = function ($scope, $location) {
        $scope.location = $location;
        $scope.sectionShown = "welcome";
    }

    app.controller('HowItWorksController', [
        '$scope',
        '$location',
        HowItWorksController]);
}(angular.module('GiftStarterApp')));
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('OldbrowserController', ['$scope','$location','$timeout',
    OldbrowserController]);

function OldbrowserController($scope,  $location,  $timeout) {
    $scope.location = $location;

    $scope.scrollToSearch = function() {
        if (Object.keys($location.search()).length) {
            var selector = document.querySelector('#'+Object.keys($location.search())[0]);
            var element = angular.element(selector);
            element[0].scrollIntoView();
        }
    };

    $scope.$watch('location.search()', function() {
        $timeout($scope.scrollToSearch, 400);
        $timeout($scope.scrollToSearch, 700);
    });
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var PartnerportalController = function ($scope, $rootScope, $window, UserService, $timeout, $location, $http, Analytics) {

        $scope.convertToTextarea = function(event) {
            var elem = jQuery(event.target);
            var height = elem.height();
            elem.wrapAll('<textarea>');
            var parent = elem.parent();
            elem.contents().unwrap();
            parent.height(height);
            parent.select();
        };

        function loadCoreData() {
            $scope.loading = true;
            $http({
                method: 'GET',
                url: '/users/partner/' + UserService.uid + '.json'
            }).success(function (response) {
                $scope.coreDataComplete = false;
                $scope.editMode = true;
                $scope.partner = response;
                if ($scope.partner.api_key && $scope.partner.api_key.length > 0) {
                    $scope.coreDataComplete = true;
                    $scope.editMode = false;
                }
                $scope.coreError = '';
                $scope.loading = false;
            }).error(function () {
                $scope.coreError = "Unable to retrieve your company information; please reload the page";
                $scope.coreDataComplete = false;
                $scope.editMode = false;
                $scope.loading = false;
            });
        }

        this.initialize = function() {
            $scope.coreDataComplete = false;
            $scope.editMode = false;
            $scope.loading = false;
            $scope.htmlInstructions = true;
            $scope.shopifyInstructions = false;
            $scope.coreError = "Loading...";
            loadCoreData();
        };

        if(UserService.loggedIn && !UserService.isUserEmailLogin()) {
            UserService.logout();
            $window.location.reload(); //$timeout(UserService.registerLogout,3000);
        } else {
            this.initialize()
        }

        $scope.loggedIn = function() {
            return UserService.loggedIn;
        };

        $scope.editCore = function() {
            $scope.editMode = true;
        };

        $scope.cancelCore = function() {
            $scope.editMode = false;
        };

        $scope.saveCore = function() {
            $scope.loading = true;
            $http({
                method: 'POST',
                url: '/users/partner/' + UserService.uid + '.json',
                data: {partner: $scope.partner}
            })
            .success( function (data) {
                $scope.partner = data;
                $scope.editMode = false;
                if($scope.partner.api_key && $scope.partner.api_key.length>0) {
                    $scope.coreDataComplete = true;
                }
                $scope.coreError = '';
                $scope.loading = false;
                $location.hash('core-form');
            })
            .error(function(data) {
                $scope.coreError = data;
                $scope.loading = false;
            })
        };

        $scope.showShopifyInstructions = function() {
            $scope.shopifyInstructions = true;
            $scope.htmlInstructions = false;
        };

        $scope.showHtmlInstructions = function() {
            $scope.shopifyInstructions = false;
            $scope.htmlInstructions = true;
        };

        $rootScope.$on('login-success', this.initialize);

    };

    app.controller('PartnerportalController', ['$scope', '$rootScope', '$window', 'UserService', '$timeout', '$location', '$http', 'Analytics', PartnerportalController]);

}(angular.module('GiftStarterApp')));


/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('PartnersController', ['$scope','$location','$timeout',
    PartnersController]);

function PartnersController($scope,  $location,  $timeout) {
    $scope.location = $location;

    $scope.scrollToSearch = function() {
        if (Object.keys($location.search()).length) {
            var selector = document.querySelector('#'+Object.keys($location.search())[0]);
            var element = angular.element(selector);
            element[0].scrollIntoView();
        }
    };

    $scope.$watch('location.search()', function() {
        $timeout($scope.scrollToSearch, 400);
        $timeout($scope.scrollToSearch, 700);
    });
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('PressController', ['$scope','$location','$timeout',
    PressController]);

function PressController($scope,  $location,  $timeout) {
    var pressItem = function(link, img, quote) {
        this.link = link;
        this.img = img;
        this.quote = quote;
    };

    $scope.items = [
        new pressItem(
            "http://www.forbes.com/sites/learnvest/2015/09/22/new-parents-reveal-their-smartest-baby-money-moves/",
            "forbes.png",
            "When baby makes three, all kinds of seeming “must-haves” can take a toll on your bottom line—from hand-knit nursery blankets to souped-up strollers. According to the U.S. Department of Agriculture, the average middle-income family shells out about $13,000 in just the first year of a baby’s life. So how can moms and dads navigate the budget-busting new-baby minefield?"
        ),
        new pressItem(
            "http://www.huffingtonpost.com/learnvest/new-parents-dish-on-the-b_b_8186200.html",
            "huffingtonpost.jpg",
            "New parents dish on 'The Best Baby Money Decision I Ever Made' including from GiftStarter cofounder, Christie Gettler Tarazon."
        ),
        new pressItem(
            "http://www.investorideas.com/news/2015/technology/09221.asp",
            "investorideas.png",
            "GiftStarter has built a quick, easy-to-use campaign launch and payment parsing process, allowing users to select gifts... , invite friends and family, regardless of their location and be left assured that GiftStarter's coordination expertise and commitment to service will take care of the money collection, gift ordering, shipping and participant group card creation – resulting in a gifting experience that us seamless from start to finish! <br />  <a href='http://www.investorideas.com/news/2015/technology/09221.asp'>LINK</a>"
        ),
        new pressItem(
            "http://blog.timetrade.com/2015/08/21/wbey-episode-3-amazon-prime-day-giftstarter-top-retail-trends-of-2015/",
            "timetrade.png",
            "GiftStarter.com is a new service promising to help people never give a bad gift again. Instead of finding a cheap gift, or hunting people down who have agreed to go in on group gift, GiftStarter is an online service that allows people to choose a product and pay for it in increments. <a href='https://youtu.be/s_XH5fPG9_g'>Video Link</a>"
        ),
        new pressItem(
            "http://www.bizjournals.com/seattle/print-edition/2015/08/14/friends-help-friends-give-gifts-giftstarter-brings.html",
            "pugetsound.png",
            "Friends help friends give gifts: GiftStarter brings crowdfunding to the party.  How?  GiftStarter lets friends and family collectively buy anything that is sold online.  Meet Arry Yu, CEO.  She's got a gift, and it's in the cloud."
        ),
        new pressItem(
            "http://www.adamsfinancialconcepts.com/index.php/resources/radio-show?filter_order=a.publish_up&filter_order_Dir=desc&format=html",
            "kkol.png",
            "In 20 years, what will be remembered as the most significant accomplishment of the Obama Administration? What does the future have in store for the stock market? Making group gifting easier and bringing people together, GiftStarter CEO Arry Yu, joins us to her story.  Full radio podcast here: <a href='http://www.adamsfinancialconcepts.com/media/com_podcastmanager/08.14.15_AboutMoney_GiftStarter_ArryYu.mp3'>LINK</a>"
        ),
        new pressItem(
            "http://simplyathomemom.com/2015/07/27/back-to-school-gift-ideas-with-giftstarter/",
            "simplyathome.png",
            "In minutes, users can launch a campaign for a gift and then GiftStarter does the rest, from helping collect the money to ordering and shipping the gift with a personalized handmade card from all contributors."
        ),
        new pressItem(
            "http://www.way2goodlife.com/back-to-school-shopping-roundup/",
            "way2goodlife.png",
            "The new school year is getting closer and that means Back to School Shopping. Try GiftStarter.com – this is a group gift solution that makes it easy for family and friends to combine individual budgets and give better, more useful ‪gifts for students in your life."
        ),
        new pressItem(
            "https://www.yahoo.com/tech/underwater-speakers-instagram-prints-124297324844.html",
            "yahoo.png",
            "Like Kickstarter for gifts: online campaigns to fund pricey presents (for birthdays, weddings, whatever) by dividing their prices up among many givers. The site illustrates who’s contributing what. The gift is shipped with a handmade card."
        ),
        new pressItem(
            "http://money.usnews.com/money/personal-finance/articles/2015/08/06/5-ways-to-get-a-big-head-start-on-holiday-shopping",
            "usworldnews.png",
            "...websites like GiftStarter.com, where customers can choose the product they want to buy, break the cost into as many pieces as they need and pay at their own pace."
        ),
        new pressItem(
            "http://issuu.com/arizonahealthandliving/docs/arizona_health_and_living_magazine_/1?e=6323197/14520390",
            "arizonahealthandliving.png",
            "BACK TO SCHOOL can be expensive, especially for college bound students. GiftStarter.com is the ideal solution that makes it easy for family and friends to combine individual budgets to give better more useful gifts to the new college student."
        ),
        new pressItem(
            "http://www.cpapracticeadvisor.com/news/12100941/giftstarter-platform-brings-cloud-to-gift-giving",
            "cpa.png",
            "A new online cloud service is making gift giving easier. GiftStarter allows family and friends to combine individual budgets to give better gifts to loved ones."
        ),
        new pressItem(
            "http://www.designcapsule.com/accessories/giftstarter-for-home-decor-gifts/",
            "designcapsulre.png",
            "The next time you want to surprise a loved one with a gift, you may find GiftStarter the best way to purchase a big ticket item."
        ),
        new pressItem(
            "http://www.seattletimes.com/business/technology/tech-spotlight-giftstarter/",
            "SeattleTimes.png",
            "The gift of efficiency: The site provides the platform for finding the gift, splitting its cost, contacting contributors through social media and processing gift payments. “It really creates that digital event of people coming together in community,” Yu said."
        ),
        new pressItem(
            "http://www.drugstorenews.com/article/giftstarter-looks-take-hassle-out-gift-giving",
            "drug-store-news.png",
            "The way it works is simple. Users launch a campaign for a gift and then GiftStarter does the rest, from helping collect the money to ordering and shipping the gift with a personalized handmade card from all contributors."
        ),
        new pressItem(
            "http://www.retailingtoday.com/article/no-more-crappy-gifts-new-site%E2%80%99s-mission",
            "retailing_today.png",
            "The recently launched Web site GiftStarter ... claims to be reinventing the gifting business so that family members, friends and co-workers are able to co-mingle individual budgets to offer recipients a more substantial gift."
        ),
        new pressItem(
            "http://www.heraldnews.com/article/20150701/BLOGS/307019986",
            "heraldpost.png",
            "That is just the sort of convenience that we always thought the Internet should deliver. And now it does!"
        ),
        new pressItem(
            "http://blogs.capecodonline.com/cape-cod-gaming/2015/07/01/giftstarter-group-gifting-made-easy/",
            "capecod.png",
            "... the scheme that the folks behind GiftStarter have come up with is not only cool, it is a major problem-solver for giving really great gifts!  The site collects the funds and orders and ships the gift – so all you need to do is pick something that is spectacular and then make sure that the right people know about it!"
        ),
        new pressItem(
            "http://agbeat.com/lists/5-things-startups-need-to-do-when-trying-to-sign-with-big-name-brands/",
            "americangeniusnews.png",
            "To better navigate the first few sales in signing on major brands and partners, Yu shares her five tips below in her own words.... Whether you’re working with one person or many people, business is about relationships..."
        ),
        new pressItem(
            "http://www.producthunt.com/tech/giftstarter",
            "producthunt.png",
            "This is awesome. Much better than the person strolling around the office with an envelope and everyone needing change for a $20... It's hard to find good gifts for adults that are inexpensive. I'd typically rather have 15 people buy me 1 thing than 15 different things."
        ),
        new pressItem(
            "http://www.meetadvisors.com/post/7-keys-to-create-a-healthy-work-environment-for-your-business",
            "meetadvisors_logo.png",
            "GiftStarter: startup with happy employees. Culture is created by each individual within a healthy workplace. We build great teams and have very open communication to make sure that everybody is accountable and happy."
        ),
        new pressItem(
            "http://www.seattlen.com/n/bbs/board.php?bo_table=News&wr_id=8398",
            "Seattle-Korean-News.png",
            "유씨는 이 같은 소셜 네트워크 방식에서 착안, 누군가에서 여러 사람이 십시일반 정성을 모아 선물을 사주는 벤처기업 (www.giftstarter.com) 을 창업했다고 설명했다."
        ),
        new pressItem(
            "http://stackeddmagazine.com/2015/04/13/do-the-evolution/",
            "stackedd.png",
            "Both founders of GiftStarter are women, presenting a unique opportunity for Yu’s company to help her employees and partners better understand women’s needs in the workplace."
        ),
        new pressItem(
            "http://www.geekwire.com/2014/9mile-labs-demo-day-favorite-pitches-products-ideas-seattles-b2b-accelerator/",
            "milestone-9.png",
            "Each entrepreneur had a different story to tell and project to pitch, from group gifting platform GiftStarter to structured note-taking service KustomNote  to draft beer inventory system MetaCraft."
        ),
        new pressItem(
            "http://www.womenofpresence.com/arry-yu/",
            "women-of-presence.png",
            "People write personal notes with each pitch-in, all of which are compiled into a beautiful handcrafted card to be delivered with the gift, for the gift recipient on the giftstart completion."
        ),
        new pressItem(
            "http://www.heinzmarketing.com/2014/11/matts-app-week-giftstarter/",
            "heinz.png",
            "Before you know it, the kids are getting that deluxe playset thanks to everyone in the family. It's like Kickstarter, but for gifts. I love it."
        ),
        new pressItem(
            "http://www.bizjournals.com/seattle/print-edition/2014/09/12/40-under-40-2014-arry-yu.html?page=all",
            "PSBJ.png",
            "Most people don't need more bottles of wine or gift cards. Everyone could pitch in $10 or $15 for something someone really wants. We're putting the giving back into gifting."
        ),
        new pressItem(
            "http://www.prweb.com/releases/giftstarter/butterlondon/prweb12271758.htm",
            "prweb.png",
            "Powered by GiftStarter, butter LONDON® will be the first beauty brand to give shoppers access to true social gifting of butter LONDON®'s curated gift collections and sets."
        ),
        new pressItem(
            "http://www.geekwire.com/2014/startup-spotlight-giftstarter-co/",
            "geekwire.png",
            "The site's mission,\" as Yu explains, \"is to bring back the humanity, personality and the joy of real-life interactions, using technology as an enabler - not a focal point."
        ),
        new pressItem(
            "http://blog.up.co/2014/11/30/teammates-challenge-got-seattle-startup-top-accelerator/",
            "up-global.png",
            "GiftStarter seems to have gotten it right without losing the spark of that Sunday night pitch back in March - or at least their partner roster would indicate as much."
        )
    ];
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('whatIsItController', [
    '$scope','$location','ToastService','$http','Analytics',
    '$window', WhatIsItController]);

function WhatIsItController($scope,  $location,  ToastService,  $http,  Analytics,
         $window) {
    $scope.hideVideo = Boolean($location.search().hv);
    $scope.videoWidth = '100%';

    $scope.remindMe = function() {
        $http({
            method: 'PUT', url: '/users/subscribe.json', data: {
                email: $scope.email,
                double_opt_in: false
            }
        });
        Analytics.track('client', 'remind me subscribe');
        ToastService.setToast("Awesome!  We'll keep you posted!", 7000);
    };

    // Load YouTube player asynch
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

}


// Create youtube iframe on load
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'tA2gcLIJYBU',
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        ga('send', 'event', 'client', 'intro-video', 'play');
    } else if (event.data == YT.PlayerState.PAUSED) {
        ga('send', 'event', 'client', 'intro-video', 'pause');
    } else if (event.data == YT.PlayerState.ENDED) {
        ga('send', 'event', 'client', 'intro-video', 'complete');
    }
}
function stopVideo() {
    player.stopVideo();
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('HomeController', [
            '$scope','Analytics','$window','$http','$timeout','AppStateService',
            '$location','ToastService','$interval', '$routeParams', '$rootScope', 'PopoverService',
    function($scope,  Analytics,  $window,  $http,  $timeout,  AppStateService,
             $location, ToastService,  $interval, $routeParams, $rootScope, PopoverService) {

        if (new Date().getTime()<1427871599000 && !device.mobile() && !$window.sessionStorage.getItem('seenSweepsMarch') && !$routeParams.searchTerm && !$window.sessionStorage.getItem('fromSearch')) {
            // Showing per browser session
            PopoverService.setPopover('sweepstakes');
            $window.sessionStorage.setItem('seenSweepsMarch', 'yes')
        }

        Analytics.track('client', 'loaded home');
        if (AppStateService.state) {
            if (AppStateService.state.gsid) {
                $location.path('/giftstart').search('gs-id', AppStateService.state.gsid);
            } else if (AppStateService.state.createSession) {
                $location.path('/create');
            }
        }

        if ($routeParams.resetCode) {
            $rootScope.$broadcast('password-reset-requested');
        }

        if ($routeParams.searchTerm) {
            $timeout(function () {
                $window.sessionStorage.setItem('searchTermFromUrl', $routeParams.searchTerm);
                $rootScope.$broadcast('performSearchFromUrl');
            }, 200);
        }

        $scope.topCampaigns = {};

        $http({method: 'GET', url: '/giftstart/api/hot-campaigns?num_campaigns=2'})
            .success(function(data) {
                Analytics.track("client", "hot campaigns load succeeded");
                $scope.topCampaigns = data;

                // Cache images
                for(var j = 0; j < $scope.topCampaigns.pitchins.length; j++) {
                    for (var i = 0; i < $scope.topCampaigns.pitchins[j].length; i++) {
                        var image = new Image();
                        image.src = $scope.topCampaigns.pitchins[j][i].img;
                    }
                }

            }).error(function(data) {
                Analytics.track("client", "hot campaigns load failed");
            });

        $scope.reachOutNotReadyYet = function() {
            Analytics.track("client", "reach out not ready yet");
            ToastService.setToast("Oops!  Reaching out to friends isn't quite ready yet.<br>Thanks for letting us know you're interested!", 7000);
        };

        $scope.pitchinIndex = 0;
        $scope.fadedIn = false;
        function fadeInComment() {
            $scope.pitchinIndex += 1;
            $scope.fadedIn = true;
            $timeout(fadeOutComment, 6800);
        }
        function fadeOutComment() {
            $scope.fadedIn = false;
        }
        if (!$location.search().TESTING_OMG) {
            fadeInComment();
            $interval(fadeInComment, 7000);
        }

        $scope.goToLink = function(destination) {
            $location.path("/" + destination);
        };

    }
]);
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
GiftStarterApp.controller('GiftsGivenBarController', ['$scope','$timeout',
    GiftsGivenBarController]);

function GiftsGivenBarController($scope) {
    var campaign = function(title, url, img) {
        this.title = title;
        this.url = url;
        this.img = img;
    };

    $scope.campaigns = [
        new campaign(
            "A fantastic bag for a fantastic lady",
            "https://www.giftstarter.com/giftstart/A-fantastic-bag-for-a-fantastic-lady",
            "https://storage.googleapis.com/giftstarter-pictures/p/58.jpeg"
        ),
        new campaign(
            "Just when you thought Quinn and Silas' pictures couldn't get any more amazing...",
            "https://www.giftstarter.com/giftstart/Just-when-you-thought-Quinn-and-Silas-pictures-couldnt-get-any-more-amazing",
            "https://storage.googleapis.com/giftstarter-pictures/p/125.jpeg"
        ),
        new campaign(
            "Agnes Christmas gift",
            "https://www.giftstarter.com/giftstart/Agnes-Christmas-gift",
            "https://storage.googleapis.com/giftstarter-pictures/p/158.jpeg"
        ),
        new campaign(
            "My inner nerd",
            "https://www.giftstarter.com/giftstart/My-inner-nerd",
            "https://storage.googleapis.com/giftstarter-pictures/p/37.jpeg"
        ),
        new campaign(
            "Run Nikki Run!!!",
            "https://www.giftstarter.com/giftstart/Run-Nikki-Run",
            "https://storage.googleapis.com/giftstarter-pictures/p/315.jpeg"
        ),
        new campaign(
            "Let's help Wix move!",
            "https://www.giftstarter.com/giftstart/Lets-help-Wix-move",
            "https://storage.googleapis.com/giftstarter-pictures/p/Lets-help-Wix-move.jpeg"
        ),
        new campaign(
            "GiftStarter Birthday Campaign for Charity",
            "https://www.giftstarter.com/giftstart/GiftStarter-Birthday-Campaign-for-Charity-2",
            "https://storage.googleapis.com/giftstarter-pictures/p/GiftStarter-Birthday-Campaign-for-Charity-2.jpeg"
        ),
        new campaign(
            "Jessi's 30th Birthday Blowout!",
            "https://www.giftstarter.com/giftstart/Jessis-30th-Birthday-Blowout",
            "https://storage.googleapis.com/giftstarter-pictures/p/340.jpeg"
        ),
        new campaign(
            "6 months of seasonal beauty products for Marion's birthday",
            "https://www.giftstarter.com/giftstart/6-months-of-seasonal-beauty-products-for-Marions-birthday",
            "https://storage.googleapis.com/giftstarter-pictures/p/218.jpeg"
        ),
        new campaign(
            "T1 HIMARS Smoke Break",
            "https://www.giftstarter.com/giftstart/T1-HIMARS-Smoke-Break",
            "https://storage.googleapis.com/giftstarter-pictures/p/165.jpeg"
        ),
        new campaign(
            "A Place for Piper",
            "https://www.giftstarter.com/giftstart/A-Place-for-Piper",
            "https://storage.googleapis.com/giftstarter-pictures/p/40.jpeg"
        ),
        new campaign(
            "Andrea and John want a Vitamix for their wedding",
            "https://www.giftstarter.com/giftstart/Andrea-and-John-want-a-Vitamix-for-their-wedding",
            "https://storage.googleapis.com/giftstarter-pictures/p/2.jpg"
        ),
        new campaign(
            "The Truffle Treasure",
            "https://www.giftstarter.com/giftstart/The-Truffle-Treasure-1",
            "https://storage.googleapis.com/giftstarter-pictures/p/The-Truffle-Treasure-1.jpeg"
        ),
        new campaign(
            "Spencer's Birthday Gift- Iphone 6!",
            "https://www.giftstarter.com/giftstart/Spencers-Birthday",
            "https://storage.googleapis.com/giftstarter-pictures/p/390.png"
        ),
        new campaign(
            "Jeffrey Song's Birthday!",
            "https://www.giftstarter.com/giftstart/Jeffrey-Songs-Birthday",
            "https://storage.googleapis.com/giftstarter-pictures/p/Jeffrey-Songs-Birthday.jpeg"
        ),
        new campaign(
            "Sending our love to our newly minted Texan!",
            "https://www.giftstarter.com/giftstart/Sending-our-love-to-our-newly-minted-Texan",
            "https://storage.googleapis.com/giftstarter-pictures/p/487.jpeg"
        ),
        new campaign(
            "Birthday Love for Arry",
            "https://www.giftstarter.com/giftstart/Birthday-Love-for-Arry",
            "https://storage.googleapis.com/giftstarter-pictures/p/488.jpeg"
        ),
        new campaign(
            "Amanda & SoonSol's wedding",
            "https://www.giftstarter.com/giftstart/Amanda--SoonSols-wedding",
            "https://storage.googleapis.com/giftstarter-pictures/p/385.jpeg"
        )
    ];
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

angular.module('GiftStarterApp').directive('gsThankedCampaigns', ['$http',
    'Analytics', gsThankedCampaigns]);

function gsThankedCampaigns($http, Analytics) {
    var $scope;

    function link(scope, elm, attrs) {
        $scope = scope;
        $scope.campaigns = [];

        // Get thanked campaigns
        $http({method: 'GET',
            url: '/giftstarts.json?thanked=true&num=' + attrs.gsNum})
            .success(thankedCampaignsFetched)
            .error(thankedCampaignsFailed);
    }

    function thankedCampaignsFetched(data) {
        Analytics.track('client', 'thanked campaigns fetch success');
        $scope.campaigns = data;
    }

    function thankedCampaignsFailed(reason) {
        console.error('thanked campaigns fetch failed');
        Analytics.track('client', 'thanked campaigns fetch failed');
    }

    return {
        link: link,
        templateUrl: '/scripts/giftstart/thanks/thanked-campaigns.ng.html',
        restrict: 'E'
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsPrintUrl', ['$location', '$http', gsPrintUrl]);


function gsPrintUrl($location, $http) {
    function link(scope, element, attrs) {
        var currentUrl = $location.absUrl().slice(0, -5);
        $http.get('http://api.bitly.com/v3/shorten?callback=',
            { params: {
                "format": "json",
                "apiKey": "R_85bf9d10211f4423b5c3be4a336ad77d",
                "login": "giftstarter",
                "longUrl": currentUrl
            }})
            .success(function(response) {
              element.text(response.data.url);
              element.wrap("<a href=" + response.data.url + "></a>");
            }
        );
    }

    return {
        link: link,
        restrict: 'E'
    };
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var HeaderController = function ($scope, $location, UserService, Analytics, PopoverService, $rootScope, $interval, $timeout, $window, $http, $anchorScroll) {
        var self = this;
        this.thisRoute = $location.path().toString();
        this.loggedIn = UserService.loggedIn;
        this.mobile = device.mobile() || device.tablet();

        this.subliminalOffset = -3.0;
        this.subliminalStyle = {'background-position-y': this.subliminalOffset + 'px'};

        this.logout = logout;
        this.showReset = showReset;
        this.closeLogin = closeLogin;
        this.loginKeyPress = loginKeyPress;

        this.menuOpen = menuOpen;

        this.userImageUrl = UserService.profileImageUrl;
        this.userProfileUrl = '/users/' + UserService.uid;
        this.userName = (UserService.name).toUpperCase();

        this.creating = $location.path().indexOf('/create') === 0;
        this.portaling = $location.path().indexOf('/portal') === 0;

        $scope.isHeaderOnly = self.thisRoute == '/header';
        $scope.isProvidence = self.thisRoute == '/yourvillage';
        
        $scope.search = false;
        $scope.menu = false;
        $scope.notifyOpen = false;

        $scope.numNotifications = 0;
        $scope.numNotificationsUnseen = 0;
        $scope.notifications = null;
        $scope.notificationHover = false;

        $scope.showLoginwrapper = false;
        $scope.showBlackout = false;

        $interval(updateSubliminal, 3000);

        $scope.$on('login-success', updateLogin);
        $scope.$on('logout-success', updateLogin);
        $scope.$on('$routeChangeStart', routeChangeListener);
        $scope.$on('profile-image-changed', updateLogin);

        //check notifications for user
        checkNotifications = function() {
            if(UserService.loggedIn) {
                $http({
                    method: 'GET',
                    url: '/users/notify/' + UserService.uid + '.json'
                }).success(function (response) {
                    $scope.notifications = response.notifications;
                    $scope.numNotifications = 0;
                    $scope.numNotificationsUnseen = 0;
                    for (item in $scope.notifications) {
                        $scope.numNotifications++;
                        if (!$scope.notifications[parseInt(item)].seen) {
                            $scope.numNotificationsUnseen++;
                        }
                    }
                }).error(function (response) {
                    console && console.log && console.log(response)
                });
            }
        };
        $scope.pollNotifications = function(){
            checkNotifications();
            $timeout($scope.pollNotifications, 3000);
        };
        $scope.pollNotifications();

        self.notificationsHoverIn = function() {
            $scope.notificationHover = true;
            notificationsSeen();
        };

        self.notificationsHoverOut = function() {
            $scope.notificationHover = false;
        };

        function notificationsSeen() {
            $http({
                method: 'POST', url: '/users/notify/' + UserService.uid + '.json',
                data: {
                    set_seen: '*'
                }
            })
        }

        self.openNotifications = function() {
            $scope.notifyOpen = true;
            notificationsSeen();
            self.closeMobileMenu();
            $scope.showBlackout = true;
            $anchorScroll('notificationlist')
        };

        self.closeNotifications = function() {
            $scope.showBlackout = false;
            $scope.notifyOpen = false;
        };

        self.notificationClick = function(item) {
            $http({
                method: 'POST', url: '/users/notify/' + UserService.uid + '.json',
                data: {
                    set_acknowledged: '["' + item.id + '"]'
                }
            });
            $scope.notifications.splice($scope.notifications.indexOf(item), 1);
            self.closeNotifications();
        };

        // for sizing using ng-class
        function routeChangeListener(event, next) {
            self.creating = $location.path().indexOf('/create') === 0;
            self.portaling = $location.path().indexOf('/portal') === 0;
            menuClose();
            if (next.$$route) {
                self.thisRoute = next.$$route.originalPath;
            }
        }

        function updateSubliminal() {
            self.subliminalOffset -= 22.8178;
            if (self.subliminalOffset < -253) {
                self.subliminalOffset = -3;
            }
            self.subliminalStyle = {
                'background-position-y': self.subliminalOffset + 'px'
            };
        }

        self.toggleMobileMenu = function() {
            $scope.menu = !$scope.menu;
        };

        self.closeMobileMenu = function() {
            $scope.menu = false;
        };

        function closeLogin() {
            $scope.showBlackout = false;
            $scope.showLoginwrapper = false;
        }

        function revealLogin() {
            $scope.showBlackout = true;
            $scope.showLoginwrapper = true;
        }

        self.showLogin = function() {
            revealLogin();
            $rootScope.$broadcast('loginbox-show-login');
            $timeout(function() {$rootScope.$broadcast('loginbox-show-login');}, 200);
        };

        function showReset() {
            revealLogin();
            $rootScope.$broadcast('loginbox-show-reset');
            jQuery('.loginwrapper .userlogin__password').focus();
        }

        function logout() {
            self.userImageUrl = '';
            Analytics.track('user', 'logout from header');
            UserService.logout();
        }

        function updateLogin() {
            self.loggedIn = UserService.loggedIn;
            self.userImageUrl = UserService.profileImageUrl;
            self.userProfileUrl = '/users/' + UserService.uid;
            self.userName = (UserService.name).toUpperCase();
        }

        function loginKeyPress($event) {
            if($event.keyCode == 27)
              closeLogin();
        }

        function menuOpen() {$rootScope.$broadcast('menu-open')}
        function menuClose() {$rootScope.$broadcast('menu-close')}

        var hideMenu = device.mobile() || device.tablet();

        $scope.headerSearchTerm = '';

        $scope.actions = {
            toggleMobileMenu: function () {
                hideMenu = !hideMenu;

                // Not recommended way: needs to happen in the directive
                // TODO: future work item - move the header to a directive
                if (hideMenu) {
                    device.mobile() && olark('api.box.show');
                    angular.element('ul.headerNav').removeClass('expanded');
                } else {
                    device.mobile() && olark('api.box.hide');
                    angular.element('ul.headerNav').addClass('expanded');
                }
            },
            menuItemClicked: function (isLoginItem) {
                if (device.mobile() || device.tablet()) {
                    device.mobile() && !isLoginItem && olark('api.box.show');
                    angular.element('ul.headerNav').removeClass('expanded');
                    hideMenu = true;
                }
            },
            search: function () {
                $window.sessionStorage.setItem('fromSearch', 'yes');
                $location.path('/');
                $timeout(function () {
                    $rootScope.$broadcast('performSearchFromHeader');
                }, 100);
            }
        };

        $rootScope.$on('header-show-login', function(){
            self.showLogin();
        });

        $rootScope.$on('header-close-login', function(){
            self.closeLogin();
        });

        $rootScope.$on('password-reset-requested', function() {
            if(self.loggedIn) {
                self.logout();
                window.location.reload();
            } else {
                $location.path('/', false);
            }
            self.showReset();
        });

        $scope.scrollTo = function(id) {
            $location.hash(id);
            $anchorScroll();
        };

        if($location.hash() == "nav_mobile") {
            $scope.menu = true;
        } else if($location.hash() == "searchbar") {
            $scope.search = true;
        } else if($location.hash() == "nav_login") {
            self.showLogin();
        } else if($location.hash() == "nav_help" || $location.hash() == "nav_start") {
            var menuopenlistener = function() {
                jQuery('#' + $location.hash()).removeClass("hover");
                angular.element($window).off('mousemove', menuopenlistener);
            };
            jQuery('#' + $location.hash()).addClass("hover");
            angular.element($window).on('mousemove', menuopenlistener);
        }

        var producturl = decodeURIComponent($location.search().producturl);
        if(producturl&&producturl!=""&&producturl!="true"&&producturl!="undefined") {
            var parser = document.createElement('a');
            parser.href = producturl;
            olark('api.box.expand');
            olark('api.chat.sendMessageToVisitor', {
                body: "Welcome!  Can I help you gift this product from "+(parser.hostname=="localhost"?"another site":parser.hostname)+"?"
            });
        }

        var userAgent = navigator.userAgent.toLowerCase();
         if (userAgent .indexOf('safari')!=-1){
           if(userAgent .indexOf('chrome')  > -1){
             //browser is chrome
           }else if((userAgent .indexOf('opera')  > -1)||(userAgent .indexOf('opr')  > -1)){
             //browser is opera
           }else{
               jQuery('.menu-login > .submenu').css('margin-top', '-7px');
           }
          }

    };

    app.controller('HeaderController', [
        '$scope',
        '$location',
        'UserService',
        'Analytics',
        'PopoverService',
        '$rootScope',
        '$interval',
        '$timeout',
        '$window',
        '$http',
        '$anchorScroll',
        HeaderController])
    .run(function($rootScope, $location, $anchorScroll, $routeParams) {
      //when the route is changed scroll to the proper element.
      $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
        $location.hash($routeParams.scrollTo);
        $anchorScroll();
      });
    })

}(angular.module('GiftStarterApp')));

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
(function (app) {
    var SearchController = function ($scope, $location) {
        var self = this;        
        this.thisRoute = $location.path().toString();
        $scope.isProvidence = self.thisRoute == '/yourvillage';
    };
    app.controller('SearchController', [
        '$scope',
        '$location',
        SearchController
        ]);
}(angular.module('GiftStarterApp')));
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('ToastService', ['$rootScope', ToastService]);

function ToastService($rootScope) {

    this.toastText = 'Hey this is my toast text!';
    this.toastMillis = 2000;

    var self = this;

    this.getToastText = function() {
        return self.toastText;
    };

    this.setToast = function(toastText, toastMillis) {
        self.toastText = toastText;
        self.toastMillis = toastMillis;
        $rootScope.$broadcast('display-toast');
    };
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsToast', gsToast);

function gsToast(ToastService, $timeout) {
    function link(scope, element, attr) {
        scope.toastText = 'Het this is my test toast!';
        scope.hide = true;
        scope.displayed = false;
        scope.toastP = element[0].children[0].children[0];

        scope.hideToast = function() {
            scope.hide = true;
            $timeout(scope.displayNoneToast, 250);
        };
        scope.displayNoneToast = function() {scope.displayed = false};

        scope.showToast = function() {
            scope.hide = false;
            scope.displayed = true;
        };

        scope.$on('display-toast', function() {
            scope.toastText = ToastService.getToastText();
            scope.toastP.innerHTML = scope.toastText;
            scope.showToast();
            $timeout(scope.hideToast, ToastService.toastMillis);
        });

    }

    return {
        restrict: 'E',
        templateUrl: '/scripts/utilities/toast.html',
        link: link
    }
}

// Analytics Service
GiftStarterApp.service('Analytics', ['$window','ABChoices','$rootScope',
    '$location', '$analytics', 
	AnalyticsService]);

function AnalyticsService($window,  ABChoices, $rootScope, $location, $analytics) {

    this.track = track; //google analytics
	this.userid = userid; //google analytics
	//this.pageTrack = pageTrack; //angulartics
	this.eventTrack = eventTrack; //angulartics
	this.identify = identify; //angulartics

    this.track('client', 'loaded');

    $rootScope.$on('$viewContentLoaded', pathChanged);

    function pathChanged(event) {path($location.path())}

    function path(path) {
        //console && console.log && console.log('AnalyticsService.path: '+path);
        if ($window.ga) {
            $window.ga('send', 'pageview', {page: path});
        }
		// https://segment.com/docs/libraries/analytics.js/#page
		// analytics.page([category], [name], [properties], [options], [callback]);
		// path, but example:
		  // { 
			// name: 'string',
  			// path: 'string',
  			// referrer: 'string',
  			// search: 'string',
  			// title: 'string',
  			// url: 'string' 
  		  // }
		$analytics.pageTrack(path);
    }

    function track(service, event, label, value) {
        //console && console.log && console.log('AnalyticsService.track: '+service+' '+event+' '+ABChoices.getString()+' '+value);
        if ($window.ga) {
            $window.ga('send', 'event', service, event,
                ABChoices.getString(), value, {'nonInteraction': 1});
        }
    }
	
    function userid(uid) {
		//https://support.google.com/analytics/answer/3123662
		//https://support.google.com/analytics/bin/answer.py?hl=en_US&answer=3123666&vid=null#SetUpUserID
		//https://www.google.com/analytics/web/?hl=en#management/Settings/a51616127w100122713p104027910/%3Fm.page%3DTrackingUserId/
		if ($window.ga) {
			$window.ga('set', '&uid', uid); // Set the user ID using signed-in user_id. 
		}
    }
	
	function eventTrack(event, properties, options, callback) {
		//https://segment.com/docs/libraries/analytics.js/#track
		//analytics.track(event, [properties], [options], [callback]);
		//event, properties, options, callback
		$analytics.eventTrack(event, properties, options, callback); 
    }
	
    function identify(event, properties, options, callback) {
		//https://segment.com/docs/libraries/analytics.js/#identify
		//analytics.identify([userId], [traits], [options], [callback]);
		//event, properties, options, callback
		  // analytics.identify('1e810c197e', {
  		    // name: 'Bill Lumbergh',
  		    // email: 'bill@initech.com',
  		    // newsletter: true,
		  // });
		//$analytics.identify(event, properties, options, callback); 
		$analytics.setUsername(event);
		$analytics.setUserProperties(properties);
    }

}

/* 
 * Angulartics Module 
 * Load core, Segment, Inspectlet, and GTM submodules. 
 * Remove submodules as necessary.
 *
*/
var gsAngulartics = angular.module('gsAngulartics', [
	'angulartics',
	'angulartics.segment',
	'angulartics.google.analytics',
	'angulartics.google.tagmanager'
])
.config(function ($analyticsProvider) {
            $analyticsProvider.firstPageview(true); /* Records pages that don't use $state or $route */
            $analyticsProvider.withAutoBase(true);  /* Records full path */
			$analyticsProvider.withBase(true); /* Records full path - https://github.com/angulartics/angulartics#full-path-tracking-for-pages-without-a-router */
});
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('HeadController', ['$scope','$location',
    HeadController]);

function HeadController($scope,  $location) {
    var headEle = document.querySelector('head');
    var ogurlMeta = document.createElement('meta');
    ogurlMeta.setAttribute('property', 'og:url');
    ogurlMeta.setAttribute('content', $location.absUrl());
    headEle.appendChild(ogurlMeta);

    $scope.ogurl = $location.absUrl();

    $scope.$on('$routeUpdate', function(next, current) {
        setMeta({property: 'og:url', content: $location.absUrl()});
    });

    function setMeta(metaObj) {
        var metaEle = headEle.querySelector('meta[property="' +
            metaObj.property + '"]');
        metaEle.setAttribute('content', metaObj.content);
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('UserService', ['$http','$rootScope','$cookieStore',
    '$window', '$timeout','FacebookService','TwitterService','GooglePlusService', 'emailLoginService',
    'Analytics', UserService]);

function UserService($http,  $rootScope,  $cookieStore,  $window, $timeout,
                     FacebookService,  TwitterService,  GooglePlusService, emailLoginService,
                     Analytics) {
    this.uid = -1;
    this.loggedIn = false;
    this.name = '';
    this.profileImageUrl  = '';
    this.isStripeCustomer = false;
    this.loginService = '';
    this.onMailingList = false;
    this.email = '';
    this.referrer = {};
    this.hasPitchedIn = false;

    var self = this;

    this.uploadProfileImage = uploadProfileImage;

    this.getUser = function(uid, callback) {
        Analytics.track("user", "user fetch initiated");
        $http({method: 'GET', url: '/users/' + uid + '.json'})
            .success(statFetchSuccess)
            .error(Analytics.track("user", "user fetch failed"));

        function statFetchSuccess(response) {
            Analytics.track("user", "user fetch succeeded");
            callback(response);
        }
    };

    this.isSystemDefaultProfileImage = function(uid, callback) {
        $http({method: 'GET', url: '/users/' + uid + '.json'}).success(
            function(data) {
                var u = data[Object.keys(data)[0]];
                callback(u.is_system_default_profile_image);
            }
        );
    };

    this.registerLogin = function(uid, profileImageUrl, token,
                                  onMailingList, name, has_pitched_in) {
        Analytics.track('login', uid);
        Analytics.userid(uid);
        Analytics.identify(uid, {name: name});
        self.uid = uid;
        self.token = token;
        self.name = name;
        self.profileImageUrl = profileImageUrl;
        self.loggedIn = true;
        self.onMailingList = onMailingList;
        self.hasPitchedIn = has_pitched_in;

        $rootScope.uid = uid;
        $rootScope.token = token;

        $cookieStore.put('uid', uid);
        $cookieStore.put('token', token);

        //cookies take time to propagate
        $timeout(function() {
            $rootScope.$broadcast('login-success');
        }, 500);

        if (uid[0] == 'f') {FacebookService.getTaggableFriends()}
    };

    this.logout = function() {
        if (self.loginService === 'facebook') {
            FacebookService.logout();
        } else if (self.loginService === 'twitter') {
            TwitterService.logout();
        } else if (self.loginService === 'googleplus') {
            GooglePlusService.logout();
        } else if (self.loginService === 'emaillogin') {
            emailLoginService.logout();
        }
        self.registerLogout();
    };

    this.registerLogout = function() {
        self.loggedIn = false;
        self.uid = -1;
        self.profileImageUrl = '';

        $rootScope.uid = -1;
        $rootScope.token = -1;

        $cookieStore.remove('uid');
        $cookieStore.remove('token');

        $rootScope.$broadcast('logout-success');
    };

    this.isUserEmailLogin = function() {
        return self.loggedIn && self.uid.substring(0,1).toLowerCase()=='e';
    };

    function uploadProfileImage(imageData) {
        console && console.log && console.log(imageData);
        var contentType = imageData.split(';')[0].replace('data:', '');
        return $http({method: 'PUT', headers: {'Content-Type': contentType},
            url: '/users/' + self.uid + '/img/new.json',
            data: {data: imageData}});
    }

    $rootScope.$on('facebook-login-success', facebookLoggedIn);
    function facebookLoggedIn () {
        Analytics.track('user', 'logged in with facebook');
        self.loginService = 'facebook';
        self.registerLogin(FacebookService.uid, FacebookService.usr_img,
            FacebookService.token, FacebookService.subscribed,
            FacebookService.name, FacebookService.has_pitched_in);
    }
    $rootScope.$on('twitter-login-success', twitterLoggedIn);
    function twitterLoggedIn () {
        Analytics.track('user', 'logged in with twitter');
        self.loginService = 'twitter';
        self.registerLogin(TwitterService.uid, TwitterService.usr_img,
            TwitterService.token, TwitterService.subscribed,
            TwitterService.name, TwitterService.has_pitched_in);
    }
    $rootScope.$on('googleplus-login-success', googleplusLoggedIn);
    function googleplusLoggedIn () {
        Analytics.track('user', 'logged in with googleplus');
        self.loginService = 'googleplus';
        self.registerLogin(GooglePlusService.uid,
            GooglePlusService.usr_img, GooglePlusService.token,
            GooglePlusService.subscribed, GooglePlusService.name,
            GooglePlusService.has_pitched_in);
    }

    $rootScope.$on('email-login-success', emailLoggedIn);
    function emailLoggedIn () {
        Analytics.track('user', 'logged in with email');
        self.loginService = 'emaillogin';
        self.registerLogin(emailLoginService.uid,
            emailLoginService.usr_img, emailLoginService.token,
            emailLoginService.subscribed, emailLoginService.name,
            emailLoginService.has_pitched_in);
    }

    $rootScope.$on('facebook-logout-success', self.registerLogout);
    $rootScope.$on('twitter-logout-success', self.registerLogout);
    $rootScope.$on('googleplus-logout-success', self.registerLogout);
    $rootScope.$on('linkedin-logout-success', self.registerLogout);
    $rootScope.$on('email-logout-success', self.registerLogout);

    if ($window.loginDeets) {
        // base64 decode the name - for unicode chars in names
        $window.loginDeets[4] =  decodeURIComponent(escape(atob($window.loginDeets[4])));
        self.registerLogin.apply(this, $window.loginDeets);
        self.loginService = {f: 'facebook', t:'twitter', g:'googleplus', e:'emaillogin'}[$window.loginDeets[0][0]];
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('ProfileController', ['$scope','UserService',
    '$location','Analytics', ProfileController]);

function ProfileController($scope,  UserService,  $location) {
    $scope.user = {};
    var urlpath = $location.path();
    var thisUser = urlpath.substring(urlpath.lastIndexOf('/')+1)
    var imageData;

    UserService.getUser(thisUser,
        function(data) {
            $scope.user = data[Object.keys(data)[0]]
        });

    $scope.editable = thisUser == UserService.uid;
    $scope.imageSet = false;

    $scope.imageUpdated = imageUpdated;
    $scope.submit = submit;
    
    function imageUpdated(data) {
        $scope.imageSet = true;
        imageData = data;
    }

    function submit() {
        UserService.uploadProfileImage(imageData)
            .success(function(newImageUrl) {
                $scope.user.img_url = newImageUrl;
                $scope.editMode = false;
            })
            .error(function(reason) {
                console && console.log && console.log('Failed to update profile image', reason);
                $scope.editMode = false;
            });
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

var UserprofileController = function ($scope, UserService, $location, $http) {

    var urlpath = $location.path();
    var thisUser = urlpath.substring(urlpath.lastIndexOf('/') + 1);
    $scope.user = {};
    $scope.userIdea = {};
    $scope.pitchins_unique = [];

    $http({
        method: 'GET',
        url: '/users/profile/' + thisUser + '.json?ext=giftideas'
    }).success(function (response) {
        $scope.user = response;
        $scope.userIdea = $scope.user.giftideas;
    });

    UserService.getUser(thisUser,
        function (data) {
            $scope.userCampaings = data[Object.keys(data)[0]];
            $scope.pitchins_unique = getUniquePitchIns($scope.userCampaings.pitchins);
    });

    var getUniquePitchIns = function(pitchins) {
        var flags = [], ret = [], l = pitchins.length, i;
        for( i=0; i<l; i++) {
            if( flags[pitchins[i].giftstart_url_title]) continue;
            flags[pitchins[i].giftstart_url_title] = true;
            ret.push(pitchins[i]);
        }
        return ret;
    };

    $scope.giftstartThisUrl = function (title, price, img, url) {
        return '/create?' + urlSerialize({
            product_url: url,
            title: title,
            price: price,
            img_url: img,
            source: 'StoredProduct'
        });
    };

    $scope.DeleteSavedItem = function(idea) {
        idea.loading = true;
        var index = $scope.userIdea.indexOf(idea);
        $scope.userIdea.splice(index, 1);
        $http.post('/users', {
            'uid': $scope.user.uid,
            'action': 'delete-save-for-later',
            'url': idea.url,
            'retailer': idea.retailer,
            'price': idea.price,
            'title': idea.title,
            'imgUrl': idea.img
        })
            .then(function () {
                idea.loading = false;
            }, function () {
                //alert("Error. Please try again.");
            })
    };

    var urlSerialize = function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" +
                encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };

    $scope.fieldisable = true;
    $scope.blocked = true;
    $scope.quantity = 10;
    $scope.campaingquantity = 3;
    $scope.showMore = true;
    $scope.showMoreCampaign = true;
    $scope.imgloading = false;
    $scope.months = [
        {label: 'Jan', value: 1},
        {label: 'Feb', value: 2},
        {label: 'Mar', value: 3},
        {label: 'Apr', value: 4},
        {label: 'May', value: 5},
        {label: 'Jun', value: 6},
        {label: 'Jul', value: 7},
        {label: 'Aug', value: 8},
        {label: 'Sep', value: 9},
        {label: 'Oct', value: 10},
        {label: 'Nov', value: 11},
        {label: 'Dec', value: 12}
    ];
    var imageData;

    $scope.editable = thisUser == UserService.uid;
    $scope.imageSet = false;
    $scope.user.error_message = "";

    $scope.imageUpdated = imageUpdated;
    $scope.submit = submit;


    $scope.validateLinks = function () {
        $scope.user.link_facebook = addProtocol($scope.user.link_facebook);
        $scope.user.link_twitter = addProtocol($scope.user.link_twitter);
        $scope.user.link_linkedin = addProtocol($scope.user.link_linkedin);
        $scope.user.link_googleplus = addProtocol($scope.user.link_googleplus);
        $scope.user.link_website = addProtocol($scope.user.link_website);
    };

    $scope.$on('logout-success', function() {
            $scope.editable = false;
        }
    );

    var addProtocol = function (link) {
        if (link) {
            link = link.trim().toLowerCase();
            if (link != "" && link.indexOf("http://") < 0 && link.indexOf("https://") < 0) {
                link = "http://" + link;
            }
        }
        return link;
    };

    function imageUpdated(data) {
        $scope.imageSet = true;
        imageData = data;
    }

    function submit() {
        UserService.uploadProfileImage(imageData)
            .then(function (newImageUrl) {
                $scope.user.img_url = newImageUrl.data;
                $scope.editMode = false;
            }, function (reason) {
                console && console.log && console.log('Failed to update profile image', reason);
                $scope.editMode = false;
            });
    }

    $scope.goToLink = function(destination) {
        $location.path("/" + destination);
    };

};

app.controller('UserprofileController', ['$scope','UserService', '$location', '$http', 'Analytics', UserprofileController]);

}(angular.module('GiftStarterApp')));


/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

var gsUserEdit = function ($http, UserService, Analytics) {
    function link(scope, elm, attrs, userProfileform) {
        scope.canEdit = true;
        scope.editUserFields = function () {
            if (!scope.userinfo && scope.blocked) {
                scope.copyUser = angular.copy(scope.user);
                scope.fieldisable = false;
                scope.canEdit = false;
            }
            else if (scope.userinfo && scope.fieldisable) {
                scope.copyUserInfo = angular.copy(scope.user);
                scope.canEdit = false;
                scope.blocked = false;
            }
        };

        scope.cancelEdit = function () {
            scope.canEdit = true;
            scope.user.error_message = "";
            scope.fieldisable = true;
            if (!scope.userinfo) {
                scope.user.name = angular.copy(scope.copyUser.name);
                scope.user.email = angular.copy(scope.copyUser.email);
                scope.user.shipping_address = angular.copy(scope.copyUser.shipping_address);
                scope.user.shipping_city = angular.copy(scope.copyUser.shipping_city);
                scope.user.shipping_state = angular.copy(scope.copyUser.shipping_state);
            } else if (scope.userinfo && scope.fieldisable) {
                scope.user.name = angular.copy(scope.copyUserInfo.name);
                scope.user.link_facebook = angular.copy(scope.copyUserInfo.link_facebook);
                scope.user.link_twitter = angular.copy(scope.copyUserInfo.link_twitter);
                scope.user.link_linkedin = angular.copy(scope.copyUserInfo.link_linkedin);
                scope.user.link_googleplus = angular.copy(scope.copyUserInfo.link_googleplus);
                scope.user.link_website = angular.copy(scope.copyUserInfo.link_website);
                scope.user.birth_month = angular.copy(scope.copyUserInfo.birth_month);
                scope.user.birth_day = angular.copy(scope.copyUserInfo.birth_day);
            }
            scope.blocked = true;
        };

        scope.saveInput = function () {
            scope.loading = true;
            scope.user.error_message = "";
            if (userProfileform.$valid) {
                $http.post('/users', {
                    'uid': scope.user.uid,
                    'action': 'update-profile',
                    name: scope.user.name,
                    email: scope.user.email,
                    link_facebook: scope.user.link_facebook,
                    link_twitter: scope.user.link_twitter,
                    link_linkedin: scope.user.link_linkedin,
                    link_googleplus: scope.user.link_googleplus,
                    link_website: scope.user.link_website,
                    phone: scope.user.phone,
                    shipping_address: scope.user.shipping_address,
                    birth_day: scope.user.birth_day,
                    birth_month: scope.user.birth_month,
                    shipping_city: scope.user.shipping_city,
                    shipping_state: scope.user.shipping_state,
                    shipping_zip: scope.user.shipping_zip
                })
                    .then(function (res) {
                        scope.loading = false;
                    }, function (errorRes) {
                        scope.user.error_message = "Error. Please try again.";
                        userProfileform.$invalid = true;
                    });
                scope.canEdit = true;
                scope.fieldisable = true;
                scope.blocked = true;
            }
            else {
                scope.user.error_message = "It looks like some of your info is incorrect; please try again.";
                scope.loading = false;
                scope.canEdit = false;
                scope.fieldisable = false;
            }
        };

        scope.$on('logout-success', function() {
            scope.canEdit = true;
            scope.fieldisable = true;
            scope.blocked = true;
        }
    );

    }

    return {
        scope: {
            fieldisable: "=",
            user: "=",
            userinfo: "=",
            blocked: "=",
            loading: "="
        },
        require: '^form',
        link: link,
        templateUrl: '/scripts/user/user_profile_edit.ng.html',
        restrict: 'E'
    }

};

    app.directive('gsUserEdit', ['$http', 'UserService', 'Analytics', gsUserEdit]);
}(angular.module('GiftStarterApp')));
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
GiftStarterApp.controller('InspirationalExamplesController', ['$scope','$timeout',
    InspirationalExamplesController]);

function InspirationalExamplesController($scope, $timeout) {
    var product = function(image, price, title, product, numPeople, link, desc) {
        this.image = image;
        this.price = price;
        this.title = title;
        this.product = product;
        this.numPeople = numPeople;
        this.link = link;
        this.desc = desc;
    };
    $scope.products = [
        new product(
            "/assets/howitworks/featuredCampaigns-julep.jpg",
            "$146.25",
            "6 months of seasonal beauty products for Marion's birthday",
            "6 Boxes of Julep Maven",
            "11",
            "https://www.giftstarter.com/giftstart/6-months-of-seasonal-beauty-products-for-Marions-birthday",
            "/assets/inspirationalexamples/6-months-of-beauty.png"
        ),
        new product(
            "/assets/howitworks/featuredCampaigns-cigars.jpg",
            "$122.28",
            "T1 HIMARS Smoke Break",
            "Gurkha Special Ops",
            "3",
            "https://www.giftstarter.com/giftstart/T1-HIMARS-Smoke-Break",
            "/assets/inspirationalexamples/t1-himars-smoke-break.png"
        ),
        new product(
            "/assets/howitworks/featuredCampaigns-tiffanys.jpg",
            "$147.20",
            "Jessi's 30th Birthday Blowout!",
            "TIFFANY 1837™ Circle Pendant",
            "7",
            "https://www.giftstarter.com/giftstart/Jessis-30th-Birthday-Blowout",
            "/assets/inspirationalexamples/jessi-30th-birthday-blowout.png"
        ),
        new product(
            "/assets/howitworks/featuredCampaigns-ghosttruck.jpg",
            "$448.80",
            "Let's help Wix move!",
            "Gift of Moving by Ghostruck (1br move within 30 mi of Seattle)",
            "15",
            "https://www.giftstarter.com/giftstart/Lets-help-Wix-move",
            "/assets/inspirationalexamples/lets-help-wix-move.png"
        ),
        new product(
            "/assets/howitworks/featuredCampaigns-lens.jpg",
            "$1,270.08",
            "Just when you thought Quinn and Silas' pictures couldn't get any more amazing...",
            "Canon EF 135mm f/2L USM Lens for Canon SLR Cameras",
            "8",
            "https://www.giftstarter.com/giftstart/Just-when-you-thought-Quinn-and-Silas-pictures-couldnt-get-any-more-amazing",
            "/assets/inspirationalexamples/just-when-you-thought.png"
        ),
        new product(
            "/assets/howitworks/featuredCampaigns-watch.jpg",
            "$329.52",
            "Run Nikki Run!!!",
            "Garmin Forerunner 220 - Black/Red Bundle (Includes Heart Rate Monitor)",
            "11",
            "https://www.giftstarter.com/giftstart/Run-Nikki-Run",
            "/assets/inspirationalexamples/run-nikki-run.png"
        )
    ];
    var n = 0;
    $scope.firstProduct = $scope.products[n];
    $scope.secondProduct = $scope.products[(n+1)%$scope.products.length];
    $scope.thirdProduct = $scope.products[(n+2)%$scope.products.length];
    var rotate = function() {
        jQuery('.product-item.first').fadeOut(1000, function() {
            n = (n + 1) % $scope.products.length;
            $scope.$apply(function() {$scope.firstProduct = $scope.products[n]});
            jQuery('.product-item.second').fadeOut(1000, function() {
                $scope.$apply(function() {$scope.secondProduct = $scope.products[(n+1)%$scope.products.length]});
                jQuery('.product-item.third').fadeOut(1000, function() {
                    $scope.$apply(function() {$scope.thirdProduct = $scope.products[(n+2)%$scope.products.length]});
                    jQuery('.product-item.third').fadeIn(2000);
                });
            });
            jQuery('.product-item.first').fadeIn(2000);
            jQuery('.product-item.second').fadeIn(2000);
            timer = $timeout(rotate, 12000);
        });
    };
    var timer = $timeout(rotate, 12000);

    $scope.$on('$destroy', function() {$timeout.cancel(timer);});
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('FacebookService', ['ezfb', '$http', '$rootScope',
    '$location', '$window', 'AppStateService', '$q', FacebookService]);

function FacebookService(ezfb,  $http,  $rootScope,  $location,  $window,
                         AppStateService, $q) {
    var self = this;

    this.uid = -1;
    this.usr_img = '';
    this.name = '';
    this.token = '';
    this.taggableFriends = [];

    this.getTaggableFriends = getTaggableFriends;

    this.loginCallback = function(response) {
        if (response.status === 'connected') {
            self.getLongTermToken(response.authResponse.accessToken,
                response.authResponse.userID);
        }
    };

    this.login = function() {
        AppStateService.set('login_service', 'facebook');
        var url = 'https://www.facebook.com/dialog/oauth' +
            '?client_id=' + window.fbAppId +
            '&response_type=code' +
            '&redirect_uri=' + $window.location.protocol + '//' +
            $window.location.host +
            '&state=' + AppStateService.base64State() +
            '&scope=public_profile,email,user_friends'; //user_birthday
        console&console.log&&console.log("FB URL: "+url)&&console.log("\n\n\n");
        $window.open(url, '_self');
    };

    this.checkSharePermission = function() {
            var deferred = $q.defer();
            var doDeferred = function() {
                $http({method: 'POST', url: '/users', data: {
                    action: 'has-share-auth', service: 'facebook'}})
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        console && console.log && console.log(data);
                        deferred.reject(data);
                    });
                return deferred.promise
            };
            return doDeferred();
        };

    this.getSharePermissionUrl = function() {
        AppStateService.set('login_service', 'facebook');
        var url = 'https://www.facebook.com/dialog/oauth' +
            '?client_id=' + window.fbAppId +
            '&response_type=code' +
            '&redirect_uri=' + $window.location.protocol + '//' +
            $window.location.host +
            '&state=' + AppStateService.base64StateForSharing() +
            '&scope=publish_actions'; //user_birthday
        return url;
    };

    this.doShare = function(message, link, linkName) {
            var deferred = $q.defer();
            var doDeferred = function() {
                $http({method: 'POST', url: '/users', data: {
                    action: 'do-share', service: 'facebook',
                    message: message, link: link, link_name: linkName}})
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        console && console.log && console.log(data);
                        deferred.reject(data);
                    });
                return deferred.promise
            };
            return doDeferred();
        };

    this.getLongTermToken = function(token) {
        $http({method: 'POST', url: '/users',
            data: {service: 'facebook', action: 'get-long-term-token',
                auth_token: token,
                location: $location.path() + $window.location.search,
                referrer: AppStateService.referrer}
        })
            .success(function(data) {
                self.uid = data['uid'];
                self.name = data['name'];
                self.usr_img = data['usr_img'];
                self.token = data['token'];
                self.subscribed = data['on_mailing_list'];
                self.has_pitched_in = data['has_pitched_in'];
                $rootScope.$broadcast('facebook-login-success');
            })
    };

    this.logout = function() {
        // TODO: logout doesn't work due to X FRAME restriction...
        // Facebook is trying to go to facebook.com/home.php?
        $rootScope.$broadcast('facebook-logout-success');
    };

    this.inviteFriends = function(uid, method) {
        $window.FB.Canvas.setAutoGrow();
        method = (typeof method === 'undefined') ? 'send' : method;
        ga(method, 'event', 'share campaign', 'facebook');

        if (!device.mobile() && !device.tablet()) {
            $location.search('re', btoa(JSON.stringify({
                type: 'consumer',
                uid: uid,
                channel: 'facebook',
                uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                    function (c) {
                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    })
            })));
            ezfb.ui({method: method, link: $location.absUrl(), href: $location.absUrl(),
                app_id: ezfb.app_id});
            $location.search('re', null);
        } else {
            var shareUrl = 'https://www.facebook.com/sharer/sharer.php';
            var parameters = "?u=" + encodeURIComponent($location.absUrl().split('#')[0]);
            $window.location.href = shareUrl + parameters;
        }
    };

    function getTaggableFriends() {
        return $q(function(resolve, reject) {
            if (self.taggableFriends.length) {
                resolve(self.taggableFriends);
            } else {
                fetchTaggableFriends(resolve, reject);
            }
        });
    }

    function fetchTaggableFriends(resolve, reject) {
        var uid = 'me';
        // TODO: use better abstraction than direct access of inserted token
        return $http({method: 'GET', url: 'https://graph.facebook.com/' +
            uid + '/taggable_friends' + '?access_token=' +
            window.loginDeets[2]})
            .success(function(response) {
                self.taggableFriends = response.data;
                resolve(response.data);
            })
            .error(reject);
    }

    if (AppStateService.fbAuthResponse) {
        self.getLongTermToken(AppStateService.fbAuthResponse.access_token);
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('TwitterService', [
            '$http','$rootScope','$window','$location','$q','AppStateService',
    function($http,  $rootScope,  $window,  $location,  $q,  AppStateService) {

        this.uid = -1;
        this.usr_img = '';
        this.name = '';
        this.token = '';

        this.verifier = '';
        this.auth_url = '';
        this.oauth_token = '';

        var self = this;

        this.login = function() {
            $window.open(self.auth_url, '_self');
        };

        this.logout = function() {
            // TODO: actually log out...?
            $rootScope.$broadcast('twitter-logout-success');
        };

        this.share = function() {
            ga('send', 'event', 'share campaign', 'twitter');
            var shareUrl = 'https://twitter.com/share';
            var parameters = "?url=" + encodeURIComponent($location.absUrl().split('#')[0]) +
                "&text="+encodeURIComponent("Help us gift #together on @GiftStarter! It's easy! Simply purchase 1 or more tiles on the #gift. #GiftsMatter");
            $window.open(shareUrl + parameters);
        };

        this.submitVerifier = function() {
            $http({method: 'POST', url: '/users', data: {
                action: 'submit-verifier', service: 'twitter',
                verifier: self.verfier, oauth_token: self.oauth_token,
                location: $location.path() + $window.location.search,
                referrer: AppStateService.referrer}})
                .success(function(data) {
                    self.uid = data['uid'];
                    self.name = data['name'];
                    self.usr_img = data['usr_img'];
                    self.token = data['token'];
                    self.subscribed = data['on_mailing_list'];
                    self.has_pitched_in = data['has_pitched_in'];
                    $rootScope.$broadcast('twitter-login-success');
                })
                .error(function(data) {console && console.log && console.log(data);});
        };


        this.getAuthUrl = function(successCallback, failureCallback) {
            var deferred = $q.defer();
            AppStateService.set('login_service', 'twitter');
            var doDeferred = function() {
                $http({method: 'POST', url: '/users', data: {
                    action: 'get-auth-url', service: 'twitter',
                    redirect_url: AppStateService.getOauthRedirectUrl()}})
                    .success(function(data) {
                        self.auth_url = data['url'];
                        deferred.resolve(self.auth_url);
                    })
                    .error(function(data) {
                        console && console.log && console.log(data);
                        deferred.reject(data);
                    });
                    return deferred.promise
                };
            return doDeferred()
        };

        this.checkSharePermission = function() {
            var deferred = $q.defer();
            var doDeferred = function() {
                $http({method: 'POST', url: '/users', data: {
                    action: 'has-share-auth', service: 'twitter'}})
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        console && console.log && console.log(data);
                        deferred.reject(data);
                    });
                return deferred.promise
            };
            return doDeferred();
        };


        this.getSharePermissionUrl = function() {
            var deferred = $q.defer();
            var doDeferred = function() {
                AppStateService.set('login_service', 'twitter');
                $http({method: 'POST', url: '/users', data: {
                    action: 'get-share-auth-url', service: 'twitter',
                    redirect_url: AppStateService.getOauthRedirectUrlForSharing()}})
                    .success(function(data) {
                        deferred.resolve(data.url);
                    })
                    .error(function(data) {
                        console && console.log && console.log(data);
                        deferred.reject(data);
                    });
                return deferred.promise
            };
            return doDeferred();
        };

        this.doShare = function(message, link) {
            var deferred = $q.defer();
            var doDeferred = function() {
                $http({method: 'POST', url: '/users', data: {
                    action: 'do-share', service: 'twitter',
                    link: link, message: message}})
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        console && console.log && console.log(data);
                        deferred.reject(data);
                    });
                return deferred.promise
            };
            return doDeferred();
        };

        function twitterOauthCallback(oauthToken, oauthVerifier) {
            self.oauth_token = oauthToken;
            self.verfier = oauthVerifier;
            self.submitVerifier();
        }

        if (AppStateService.oauthToken) {
            twitterOauthCallback(AppStateService.oauthToken,
                AppStateService.oauthVerifier);
        }
    }
]);

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('GooglePlusService', [
            '$http','$rootScope','$window','$location', '$q', 'AppStateService',
    function($http,  $rootScope,  $window,  $location,  $q, AppStateService) {

        this.uid = -1;
        this.usr_img = '';
        this.name = '';
        this.token = '';

        var self = this;

        this.loginCallback = function(authResponse) {
            // Receive access_token, id_token, and one-time code
            // Send one-time code to server
            self.authResponse = authResponse;
            self.submitOneTimeCode();
        };

        this.submitOneTimeCode = function() {
            // Get app state data from auth response
            self.gplus_code_request = {method: 'POST', url: '/users',
                data: {service: 'googleplus', action: 'submit-one-time-code',
                    auth_response: self.authResponse,
                    location: $location.path() + $window.location.search,
                    redirect_url: $window.location.protocol + '//' +
                        $window.location.host + '/',
                    referrer: AppStateService.referrer}};
            $http(self.gplus_code_request)
                .success(function(data) {
                    self.uid = data['uid'];
                    self.name = data['name'];
                    self.usr_img = data['usr_img'];
                    self.token = data['token'];
                    self.subscribed = data['on_mailing_list'];
                    self.has_pitched_in = data['has_pitched_in'];
                    $rootScope.$broadcast('googleplus-login-success');
                })
                .error(function(data) {console && console.log && console.log(data)});
            self.loginRequested = false;
        };

        this.login = function() {
            AppStateService.set('login_service', 'googleplus');
            self.auth_url = 'https://accounts.google.com/o/oauth2/auth' +
                '?scope=' + encodeURIComponent(
                'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email') +
                '&client_id=' +
                encodeURIComponent($window.googlePlusClientId) +
                '&redirect_uri=' +
                encodeURIComponent($window.location.protocol + '//' +
                    $window.location.host + '/') +
                '&response_type=code' +
                '&state=' + AppStateService.base64State() +
                '&access_type=offline';
            self.auth_window = $window.open(self.auth_url, '_self');
            self.loginRequested = true;
        };

        //this.checkSharePermission = function() {
        //        var deferred = $q.defer();
        //        var doDeferred = function() {
        //            $http({method: 'POST', url: '/users', data: {
        //                action: 'has-share-auth', service: 'googleplus'}})
        //                .success(function(data) {
        //                    deferred.resolve(data);
        //                })
        //                .error(function(data) {
        //                    console && console.log && console.log(data);
        //                    deferred.reject(data);
        //                });
        //            return deferred.promise
        //        };
        //        return doDeferred();
        //    };

        //this.getSharePermissionUrl = function() {
        //    AppStateService.set('login_service', 'googleplus');
        //    url = 'https://accounts.google.com/o/oauth2/auth' +
        //        '?scope=' + encodeURIComponent(
        //        'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.stream.write') +
        //        '&client_id=' +
        //        encodeURIComponent($window.googlePlusClientId) +
        //        '&redirect_uri=' +
        //        encodeURIComponent($window.location.protocol + '//' +
        //            $window.location.host + '/') +
        //        '&response_type=code' +
        //        '&state=' + AppStateService.base64StateForSharing() +
        //        '&access_type=offline';
        //    return url;
        //};

        //this.doShare = function(message) {
        //    var deferred = $q.defer();
        //    var doDeferred = function() {
        //        $http({method: 'POST', url: '/users', data: {
        //            action: 'do-share', service: 'googleplus',
        //            message: message}})
        //            .success(function(data) {
        //                deferred.resolve(data);
        //            })
        //            .error(function(data) {
        //                console && console.log && console.log(data);
        //                deferred.reject(data);
        //            });
        //        return deferred.promise
        //    };
        //    return doDeferred();
        //};

        this.logout = function() {
            $rootScope.$broadcast('googleplus-logout-success');
        };

        this.share = function(uid) {
            ga('send', 'event', 'share campaign', 'googleplus');
            var shareUrl = 'https://plus.google.com/share';
            $location.search('re', btoa(JSON.stringify({
                type: 'consumer',
                uid: uid,
                channel: 'googleplus',
                uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                    function(c) {
                        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    }
                )
            })));
            var parameters = '?url=' + encodeURIComponent($location.absUrl().split('#')[0]);
            $window.open(shareUrl + parameters);
            $location.search('re', null);
        };

        if (AppStateService.gplusAuthResponse) {
            self.loginCallback(AppStateService.gplusAuthResponse);
        }

    }
]);

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('LinkedInService', [
            '$http','$rootScope','$window','$location','AppStateService', '$q',
    function($http,  $rootScope,  $window,  $location,  AppStateService, $q) {
        var self = this;

        this.login = function() {
            AppStateService.set('login_service', 'linkedin');
            self.auth_url = 'https://www.linkedin.com/uas/oauth2/authorization' +
                '?scope=' + encodeURIComponent('r_basicprofile r_emailaddress') +
                '&client_id=' + encodeURIComponent($window.linkedInClientId) +
                '&redirect_uri=' + encodeURIComponent($window.location.protocol + '//' + $window.location.host) + //no trailing slash!
                '&response_type=code' +
                '&state=' + AppStateService.base64State();
            self.auth_window = $window.open(self.auth_url, '_self');
            self.loginRequested = true;
        };

        this.logout = function() {
            $rootScope.$broadcast('linkedin-logout-success');
        };

        this.checkSharePermission = function() {
                var deferred = $q.defer();
                var doDeferred = function() {
                    $http({method: 'POST', url: '/users', data: {
                        action: 'has-share-auth', service: 'linkedin'}})
                        .success(function(data) {
                            deferred.resolve(data);
                        })
                        .error(function(data) {
                            console && console.log && console.log(data);
                            deferred.reject(data);
                        });
                    return deferred.promise
                };
                return doDeferred();
            };

        this.getSharePermissionUrl = function() {
            AppStateService.set('login_service', 'linkedin');
            var url = 'https://www.linkedin.com/uas/oauth2/authorization' +
                '?scope=' + encodeURIComponent('r_basicprofile r_emailaddress w_share') +
                '&client_id=' + encodeURIComponent($window.linkedInClientId) +
                '&redirect_uri=' + encodeURIComponent($window.location.protocol + '//' + $window.location.host) + //no trailing slash!
                '&response_type=code' +
                '&state=' + AppStateService.base64StateForSharing();
            return url
        };

        this.doShare = function(message, link, linkName) {
            var deferred = $q.defer();
            var doDeferred = function() {
                $http({method: 'POST', url: '/users', data: {
                    action: 'do-share', service: 'linkedin',
                    message: message, link: link, link_name: linkName}})
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        console && console.log && console.log(data);
                        deferred.reject(data);
                    });
                return deferred.promise
            };
            return doDeferred();
        };

    }
]);

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var EmailLoginService = function ($http, $q, $rootScope) {

        var self = this;

        this.uid = -1;
        this.usr_img = '';
        this.name = '';
        this.token = '';

        var urls = {
                create: '/login/email/create',
                forgotPassword: '/login/email/requestreset',
                login: '/login/email/login',
                reset: '/login/email/reset'
            },
            uid = '';

        var login = function (mode, emailname, email, password, resetCode) {
            var deferred = $q.defer();

            $http.post(
                urls[mode], {
                    emailname: emailname,
                    email: email,
                    password: password,
                    code: resetCode
                }).
                success(function (response) {
                    var resObj = response;
                    if (resObj['ok']) {
                        if (mode === 'login') {
                            var data = resObj['ok'];
                            self.uid = data['uid'];
                            self.usr_img = data['usr_img'];
                            self.name = data['name'];
                            self.token = data['token'];
                            self.subscribed = data['on_mailing_list'];
                            self.has_pitched_in = data['has_pitched_in'];
                            $rootScope.$broadcast('email-login-success');
                        }
                        deferred.resolve(resObj['ok']);
                    } else {
                        deferred.reject(resObj['error']);
                    }
                }).
                error(function () {
                    deferred.reject('We are having technical problems.  Please try again later.');
                });

            return deferred.promise;
        };

        var logout = function () {
            $rootScope.$broadcast('email-logout-success');
        };

        this.login = login;
        this.logout = logout;
    };

    app.service('emailLoginService', ['$http', '$q', '$rootScope', EmailLoginService])
}(angular.module('GiftStarterApp')));
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var LoginOrCreateController = function ($scope, $rootScope, $location, $routeParams, $timeout, $http, AppStateService, UserService, TwitterService,
                                            FacebookService, LinkedInService, GooglePlusService, emailLoginService, Analytics) {

        $scope.working = false;
        if (typeof($scope.showCreate) == 'undefined') {
            $scope.showCreate = true; //override via ng-repeat="showCreate in [true]" during ng-include
        }
        $scope.showForgot = false;
        $scope.showReset = false;
        if (typeof($scope.showSocials) == 'undefined') {
            $scope.showSocials = true; //override via ng-repeat="showSocials in [true]" during ng-include
        }
        $scope.name;
        $scope.surname;
        $scope.email;
        //$scope.reenteremail;
        $scope.password;
        $scope.showPassword;
        //$scope.reenterpassword;
        $scope.message;
        $scope.resetCode;

        $scope.resetForm = function() {
            $scope.name='';
            $scope.surname='';
            $scope.email='';
            //$scope.reenteremail='';
            $scope.password='';
            $scope.showPassword=false;
            //$scope.reenterpassword='';
            $scope.message='';
            $scope.resetCode='';
        };
        $scope.resetForm();

        if(UserService.loggedIn) {
            jQuery('.userlogin').css({display:"none"});
        }

        function doSocialLogin(successFunction, maxRetries) {
            maxRetries = typeof maxRetries !== 'undefined' ? maxRetries : 3;
            if(AppStateService.get('staged_giftstart')) {
                console && console.log && console.log("staged-create: " + AppStateService.get('staged_giftstart')['staging_uuid']);
                $http.post('/giftstart/create.json', AppStateService.get('staged_giftstart'))
                    .success(function (response) {
                        AppStateService.remove('staged_giftstart');
                        AppStateService.setPath($location.path());
                        successFunction();
                    })
                    .error(function () {
                        if(maxRetries>0)
                        console && console.log && console.log("Error while staging GiftStart; retrying...");
                        doSocialLogin(successFunction, maxRetries-1);
                    });
            } else {
                successFunction();
            }
        }

        $scope.doLoginFacebook = function() {
            doSocialLogin(FacebookService.login);
        };
        $scope.doLoginTwitter = function() {
            doSocialLogin(function() {
                TwitterService.getAuthUrl().then(function(url) {
                    TwitterService.login();
                });
            });
        };
        $scope.doLoginGoogleplus = function() {
            doSocialLogin(GooglePlusService.login);
        };
        $scope.doLoginLinkedin = function() {
            doSocialLogin(LinkedInService.login);
        };
        $scope.doLoginEmail = function() {
            Analytics.track('user', 'login attempt with email');
            $scope.working = true;
            emailLoginService.login('login','',$scope.email,$scope.password,'').
                then(function (okMsg) {
                    //reset handled by $scope.$on('login-success')
                }, function (errMsg) {
                    $scope.working = false;
                    $scope.message=errMsg;
                });
        };

        $scope.doCreateEmail = function() {
            Analytics.track('user', 'create email login');
            //if ($scope.email.trim()!=$scope.reenteremail.trim()) {
            //    $scope.message="Your email addresses do not match";
            //    return;
            //}
            //if ($scope.password.trim()!=$scope.reenterpassword.trim()) {
            //    $scope.message="Your passwords do not match";
            //    return;
            //}
            $scope.working = true;
            emailLoginService.login('create',$scope.name+' '+$scope.surname,$scope.email,$scope.password,'').
                then(function (okMsg) {
                    emailLoginService.login('login','',$scope.email,$scope.password,'')
                }, function (errMsg) {
                    $scope.working = false;
                    $scope.message=errMsg;
                });
        };

        $scope.doForgotPassword = function() {
            Analytics.track('user', 'forgot login password');
            $scope.working = true;
            emailLoginService.login('forgotPassword','',$scope.email,'','').
                then(function (okMsg) {
                    $scope.message=okMsg;
                    $scope.showForgot = false;
                    $scope.working = false;
                }, function (errMsg) {
                    $scope.message=errMsg;
                    $scope.working = false;
                });
        };

        $scope.doResetPassword = function() {
            //if ($scope.password.trim()!=$scope.reenterpassword.trim()) {
            //    $scope.message="Your passwords do not match";
            //    return;
            //}
            Analytics.track('user', 'reset login password');
            $scope.working = true;
            emailLoginService.login('reset','',$scope.email,$scope.password,$scope.resetCode).
                then(function (okMsg) {
                    $scope.message=okMsg;
                    $scope.showForgot = false;
                    $scope.working = false;
                    //$timeout(function(){$rootScope.$broadcast('header-show-login')},3000);
                    //jQuery('.userlogin').fadeOut(3000);
                    //jQuery('.userlogin').fadeIn(1500);
                    $scope.doLoginEmail();
                }, function (errMsg) {
                    $scope.message=errMsg;
                    $scope.working = false;
                });
        };

        $scope.$on('logout-success', function() {
            jQuery('.userlogin').fadeIn(1500);
            $scope.resetForm();
        });

        $scope.$on('hide-login-socials', function() {
            $scope.showSocials = false;
        });

        $scope.$on('login-success', function() {
            $scope.resetForm();
            $scope.message=UserService.name?("Welcome, "+UserService.name+"!"):"Welcome!";
            $timeout(function(){$rootScope.$broadcast('header-close-login')},3000);
            jQuery('.userlogin').fadeOut(3000);
            $scope.working = false;
        });

        $rootScope.$on('loginbox-show-login', function(){
            $scope.resetForm();
            $scope.showCreate = false;
            $scope.showReset = false;
            setTimeout(function() {jQuery('.loginwrapper .userlogin__email').focus();}, 0);
        });

        $rootScope.$on('loginbox-show-reset', function() {
            $scope.resetForm();
            $scope.resetCode = $routeParams.resetCode;
            $scope.showCreate = false;
            $scope.showReset = true;
        });

    };

    app.controller('LoginOrCreateController', [
        '$scope', '$rootScope', '$location', '$routeParams', '$timeout', '$http', 'AppStateService', 'UserService', 'TwitterService', 'FacebookService',
        'LinkedInService','GooglePlusService', 'emailLoginService', 'Analytics',
        LoginOrCreateController]);
}(angular.module('GiftStarterApp')));
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('GiftStartService', [
    '$http','$location','UserService','$rootScope', 'PopoverService','$window',
    'Analytics','AppStateService', '$resource',
     GiftStartService]);

function GiftStartService($http,  $location,  UserService,  $rootScope,
                          PopoverService,  $window,  Analytics,
                          AppStateService, $resource) {

    var GiftStart = $resource('/giftstart/:key.json');
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    newPitchIns;

    this.giftStart = {};

    this.payment = {
        gsid: -1,
        parts: [],
        note: '',
        stripeResponse: {},
        emailAddress: '',
        subscribe: false,
        firstName: '',
        lastName: ''
    };

    this.pitchIns = [];
    this.pitchInsInitialized = false;

    this.lastCheckedMilliseconds = new Date().getTime();
    this.updateInterval = 3*1000;

    // Shipping/Contact Info
    this.shippingName = '';
    this.shippingEmail = '';
    this.shippingAddress = '';
    this.shippingCity = '';
    this.shippingState = '';
    this.shippingZip = '';
    this.shippingPhoneNumber = '';
    this.shippingEmail = '';
    this.gcName = '';
    this.gcPhoneNumber = '';
    this.gcEmail = '';

    // Campaign Details
    this.title = '';
    this.description = '';
    this.coupon = '';
    this.specialNotes = '';
    this.productImgUrl = '';
    this.productTitle = '';
    this.retailerLogo = '';
    this.rows = 3;
    this.columns = 3;
    this.productPrice = 0;
    this.salesTax = 0;
    this.shipping = 0;
    this.serviceFee = 0;
    this.totalPrice = 0;
    this.campaignLength = 0;
    this.newPitchIn = {};
    // Thanks data
    this.thanks_img = {};

    // Restore from state
    this.preselectedParts = [];
    if (AppStateService.get('selectedParts')) {
        this.preselectedParts = AppStateService.get('selectedParts');
        AppStateService.remove('selectedParts');
    }

    var self = this;

    var linkReplacerRegex = /(https?:\/\/(([-\w\.]+)+(:\d+)?(\/([-\w\/_\.]*(\?\S+)?)?)?))/g;

    this.makeLinks = function() {
        jQuery('.makelinks').each(function() {
            var thishtml=jQuery(this).html();
            if(thishtml.indexOf('<a')<0) {
                jQuery(this).html(thishtml.replace(linkReplacerRegex, "<a href=\"$1\" title=\"\" target=\"_blank\">$1</a>"));
            }
        })
    };

    this.createGiftStart = function() {
        console&&console.log&&console.log("createGiftStart");
        Analytics.track('campaign', 'created');
		Analytics.eventTrack('New GiftStart', { 
			gsid: self.giftStart.gsid, 
			champion: UserService.uid, 
			name: this.title, 
			price: this.totalPrice,
			category: 'Campaign'
		});
        // Check to see that name is populated (for fb-login it is not yet)
        if (!self.gcName) {self.gcName = UserService.name}

        self.giftStart = self.buildGiftStart();
        self.pitchInsInitialized = false;
        return $http({method: 'POST', url: '/giftstart/create.json',
            data: self.giftStart})
            .success(function(data) {
                self.inflateGiftStart(data);
            })
            .error(function(reason) {
                console && console.log && console.log(reason);
                Analytics.track('campaign', 'campaign create failed');
            });
    };

    this.buildGiftStart = function() {
        return {
            title: self.title,
            description: self.description,
            coupon: self.coupon,
            special_notes: self.specialNotes,
            gift_champion_uid: UserService.uid,
            product_price: self.productPrice,
            sales_tax: self.salesTax,
            shipping: self.shipping,
            service_fee: self.serviceFee,
            total_price: self.totalPrice,
            campaign_length: self.campaignLength,
            product_img_url: self.productImgUrl,
            product_url: self.productUrl,
            product_title: self.productTitle,
            retailer_logo: self.retailerLogo,
            totalSelection: 0,
            funded: 0,
            parts: self.makeParts(self.rows * self.columns, self.totalPrice),
            rows: self.rows,
            columns: self.columns,
            gc_phone_number: self.gcPhoneNumber,
            gc_email: self.gcEmail,
            gc_name: self.gcName,
            shipping_name: self.shippingName,
            shipping_email: self.shippingEmail,
            shipping_address: self.shippingAddress,
            shipping_city: self.shippingCity,
            shipping_state: self.shippingState,
            shipping_zip: self.shippingZip,
            shipping_phone_number: self.shippingPhoneNumber
        };
    };

    this.makeParts = function(numParts, totalPrice) {
        function injectPartToggles(parts) {
            function makePartToggle(i) {
                var ti = i;
                return function () {
                    if (!parts[ti].bought && !parts[ti].disabled) {
                        // If selected is none, this will force it into a bool
                        parts[ti].selected = (parts[ti].selected == false);
                        Analytics.track('campaign', 'overlay part toggled');
                        self.updateSelected();
                    }
//                        if (parts[ti].bought) {
//                            Analytics.track('client',
//                                'go to user page from overlay');
//                            self.goToUserPage(parts[ti].uid);
//                        }
                }
            }

            for (var i = 0; i < parts.length; i++) {
                parts[i].toggle = makePartToggle(i);
            }
        }

        var tempParts = [];
        for (var i = 0; i < numParts; i++) {
            var selected = self.preselectedParts.indexOf(i) > -1;
            tempParts.push({
                bought: false,
                disabled: false,
                selected: selected,
                part_id: i,
                value: Math.floor(totalPrice/numParts)
            });
        }

        injectPartToggles(tempParts);

        return tempParts;
    };

    this.disableParts = function() {
        function disablePart(part) {part.disabled = !part.bought;}
        self.giftStart.parts.map(disablePart);
    };

    function getSelectedParts() {
        var selected = [];
        for (var i = 0; i < self.giftStart.parts.length; i++) {
            if (self.giftStart.parts[i].selected) {
                selected.push(i);
            }
        }
        return selected;
    }

    this.updateSelected = function() {
        self.giftStart.totalSelection = 0;
        self.giftStart.nSelected = 0;
        self.giftStart.nBought = 0;
        self.giftStart.nTotal = 0;
        self.giftStart.remaining = 0;
        self.giftStart.funded = 0;
        self.giftStart.parts.map(function(part) {
            self.giftStart.totalSelection += part.value * part.selected;
            self.giftStart.nSelected += 1 * part.selected;
            self.giftStart.nBought += 1 * part.bought;
            self.giftStart.nTotal += 1;
            self.giftStart.remaining += part.value *
                !(part.selected || part.bought);
            self.giftStart.funded += part.value * part.bought;
        });
        AppStateService.overlayState(getSelectedParts());
        $rootScope.$broadcast('selection-changed');
    };

    this.fetchGiftStart = function(url_title) {
        console && console.log && console.log("fetchGiftStart: "+url_title);
        function fetchSuccess(data) {self.inflateGiftStart(data)}
        function fetchError(reason) {Analytics.track('campaign',
            'campaign fetch failed')}
        $http({method: 'GET', url: '/giftstart/' + url_title + '.json'})
            .success(function(data) {self.inflateGiftStart(data)})
            .error(function(){Analytics.track('campaign',
                'campaign fetch failed')});
    };

    this.inflateGiftStart = function(giftstart) {
        console && console.log && console.log("inflateGiftStart "+giftstart.giftstart_url_title);
        Analytics.track('campaign', 'campaign enabled');

        self.giftStart = giftstart;

        self.giftStart.parts = self.makeParts(self.giftStart.rows *
                self.giftStart.columns,
            self.giftStart.total_price);
        self.updateSelected();

        if (!(/\/giftstart\//.test($location.path()))) {
            console && console.log && console.log(location.pathname);
            $location.path('/giftstart/' + giftstart.giftstart_url_title);
        }

        self.syncPitchIns('GiftStartService');

        setTimeout(self.makeLinks,2000);

        $rootScope.$broadcast('giftstart-loaded');
    };

    this.saveNote = function(noteText, name) {
        self.payment.note = noteText;
        self.payment.firstName = name;
        var data = {payment: self.payment, action: 'pitch-in-note-update',
            uid: UserService.uid};
        $http({method: 'POST', url: '/pay', data: data})
            .success(function (resp) {
                self.newPitchIn = resp;
                self.payment.note = "";
                self.payment.firstName = "";
                $rootScope.$broadcast('note-saved');
            });
    };

    this.saveImage = function(imageUrl) {
        var data = {payment: self.payment, action: 'pitch-in-img-update',
            uid: UserService.uid, imgurl:imageUrl};
        return $http({method: 'POST', url: '/pay', data: data})
    };

    this.uploadImage = function(imageData) {
        var contentType = imageData.split(';')[0].replace('data:', '');
        var data = {payment: self.payment, action: 'pitch-in-img-upload',
            uid: UserService.uid, contenttype: contentType, imgdata: imageData};
        return $http({method: 'POST', url: '/pay', data: data})
    };

    this.attachStripeResponse = function(response) {
        self.payment.stripeResponse = response;
        self.payment.gsid = self.giftStart.gsid;
        self.payment.parts = [];
        for (var i=0; i < self.giftStart.parts.length; i++) {
            if (self.giftStart.parts[i].selected) {
                self.payment.parts.push(self.giftStart.parts[i].part_id);
            }
        }
    };

    this.attachCardData = function(number,cvc,expiry,addressZip) {
        self.payment.cardData = {number:number,cvc:cvc,expiry:expiry,zip:addressZip};
        self.payment.gsid = self.giftStart.gsid;
        self.payment.parts = [];
        for (var i=0; i < self.giftStart.parts.length; i++) {
            if (self.giftStart.parts[i].selected) {
                self.payment.parts.push(self.giftStart.parts[i].part_id);
            }
        }
    };

    this.sendPayment = function(callback) {
        var data = {payment: self.payment, action: 'pitch-in',
            uid: UserService.uid};
        if (self.payment.subscribe) {
            Analytics.track('pitchin', 'subscribed to mailing list');
        }
        if (self.payment.saveCreditCard) {
            Analytics.track('pitchin', 'save credit card');
        }
        $http({method: 'POST', url: '/pay',
            data: data})
            .success(function(data) {
                self.paymentSuccess(data);
                if (callback) {callback(data)}
            })
            .error(function(data) {
                self.paymentFailure(data);
                if (callback) {callback(data)}
            });
    };

    this.payWithFingerprint = function(fingerprint) {
        self.attachStripeResponse('');
        return $http({method: 'POST', url: '/pay',
            data: {fingerprint: fingerprint, action: 'pitch-in',
                subscribe: self.payment.subscribe, payment: self.payment,
                uid: UserService.uid}})
            .success(self.paymentSuccess)
            .error(self.paymentFailure);
    };

    this.showOverlay = function() {$rootScope.$broadcast('show-overlay');};
    this.hideOverlay = function() {$rootScope.$broadcast('hide-overlay');};

    this.paymentSuccess = function(data) {
        if (!data['payment-error']) {
            self.syncPitchIns('GiftStartService');
            self.updateSelected();
            $rootScope.$broadcast('payment-success');
        }
    };

    this.paymentFailure = function(data) {console && console.log && console.log("Pitch-in failed!: "+data)};

    this.updateCampaign = function(newTitle, newDescription, newImage,
                                   newGcName) {
        if (newTitle || newDescription || newImage) {
            var newgs = {};
            if (newTitle) {
                newgs.title = newTitle;
            }
            if (newDescription) {
                newgs.description = newDescription;
            }
            if (newImage) {
                newgs.image = newImage;
            }
            if (newGcName) {
                newgs.gc_name = newGcName;
            }
        }
        Analytics.track('campaign', 'campaign update sent');

        $http({method: 'POST', url: '/giftstart/' +
            self.giftStart.giftstart_url_title + '.json', data: newgs})
            .success(function(response) {
                Analytics.track('campaign', 'campaign update succeeded');
                if (response.title) {
                    self.giftStart.title = response.title;
                }
                if (response.description) {
                    self.giftStart.description = response.description;
                }
                if (response.product_img_url) {
                    self.giftStart.product_img_url =
                        response.product_img_url + '#' +
                        new Date().getTime();
                }
                if (response.gc_name) {
                    self.giftStart.gc_name = response.gc_name;
                }
                $rootScope.$broadcast('giftstart-updated');
            })
            .error(function() {Analytics.track('campaign', 'campaign update failed')})
    };

    this.updateComment = function(pitchIn) {
        var data = {
            pitchin: pitchIn,
            action: 'pitch-in-note-update',
            uid: UserService.uid
        };
        $http({method: 'POST', url: '/pay', data: data})
            .success(function(response) {
                Analytics.track('campaign', 'pitchin comment update succeeded');
            })
            .error(function() {
                Analytics.track('campaign', 'pitchin comment update failed');
            })
    };

    this.updateCommentImage = function(pitchIn, imageData) {
        var contentType = imageData.split(';')[0].replace('data:', '');
        var data = {
            payment: pitchIn, action: 'pitch-in-img-upload',
            uid: UserService.uid, contenttype: contentType, imgdata: imageData
        };
        return $http({method: 'POST', url: '/pay', data: data});
    };

    this.setThanksImage = function(img) {self.thanksImage = img};

    this.updateThanks = function(message) {
        var url = '/thanks';
        if ($location.search().thanks) {
            url += '-' + $location.search().thanks;
        }

        var data = {
            message: message, img: self.thanksImage, gsid: self.giftStart.gsid,
            url_title: self.giftStart.giftstart_url_title
        };
        if (UserService.uid != -1) {data.uid = UserService.uid;}

        return $http({method: 'PUT', url: url, data: data});
    };

    this.goToUserPage = function(uid) {
        $location.path('u').search('').search('uid', uid);
    };

    function checkForSync() {
        $http({
            method: 'POST',
            url: '/pay',
            data: {action: 'get-pitch-ins', gsid: self.giftStart.gsid}
        })
            .success(syncCheckCallback)
            .error(function() {console && console.log && console.log("Failed to contact part sync.")})
    }

    function syncCheckCallback(pitchins) {
        updatePartsFromPitchIns(pitchins);
        formatPitchIns(pitchins);
        $rootScope.$broadcast('pitch-ins-updated');
    }

    function formatPitchIns(pitchins) {
        newPitchIns = pitchins;
        var i, len, date;
        for (i = 0, len = newPitchIns.length; i < len; i++) {
            date = new Date(1000 * pitchins[i].timestamp);
            newPitchIns[i].timestampString = months[date.getMonth()] +
                " " + date.getDate() + ", " +
                ((date.getHours() - 1) % 12) + ":" +
                ('0' + date.getMinutes()).slice(-2) + " " +
                (date.getHours() >= 12 ? 'PM' : 'AM');
        }
        newPitchIns.sort(function(a, b) {return b.timestamp - a.timestamp});
        angular.forEach(newPitchIns, function(newPitchIn) {
            if (self.pitchIns.length < newPitchIns.length && newPitchIn.gsid === self.giftStart.gsid) {
                this.unshift(newPitchIn);
            }
        }, self.pitchIns);
    }

    function updatePartsFromPitchIns(pitchins) {
        for (var i = 0; i < self.giftStart.parts.length; i++) {
            self.giftStart.parts[i].bought = false;
            self.giftStart.parts[i].img = '';
            self.giftStart.parts[i].uid = '';
        }
        for (i = 0; i < pitchins.length; i++) {
            for (var j = 0; j < pitchins[i].parts.length; j++) {
                var partId = pitchins[i].parts[j];
                self.giftStart.parts[partId].bought = true;
                self.giftStart.parts[partId].selected = false;
                self.giftStart.parts[partId].img = pitchins[i].img;
                self.giftStart.parts[partId].uid = pitchins[i].uid;
            }
        }
        if (!Boolean(self.pitchInsInitialized)) {
            self.pitchInsInitialized = true;
            $rootScope.$broadcast('pitch-ins-initialized');
        }
        self.updateSelected();
    }

    function updateLastChecked() {
        self.lastCheckedMilliseconds = new Date().getTime();
    }

    this.syncPitchIns = function(source) {
        console&&console.log&&console.log("syncPitchIns: "+source);
        if (self.giftStart.gsid) {
            if (source == 'pitch-in-hover' || source == 'GiftStartService') {
                // User hovered pitch-in button, need to update immediately
                checkForSync();
                updateLastChecked();
            } else if (!self.pitchInsInitialized) {
                checkForSync();
                updateLastChecked();
             }
        }
    };

    // Sync pitchins on route change (navigation, back, etc.)
    $rootScope.$on('$routeChangeSuccess', function() {
        AppStateService.setPath($location.path());
        self.pitchInsInitialized = false;
        var path = $location.path();
        if (path.indexOf("/giftstart/")>=0) {
            var urlTitle = path.split('/')[2];
            if (urlTitle != undefined) {
                self.fetchGiftStart(urlTitle);
            }
        }
    });

    // Check if giftstart was sent with page on init load
    if ($window.GIFTSTART) {
        self.inflateGiftStart($window.GIFTSTART);
        $rootScope.$broadcast('giftstart-loaded');
    }

}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('GiftStartController', [
            '$scope','$rootScope','GiftStartService','$location','$interval', '$timeout',
            'FacebookService','TwitterService','GooglePlusService','Analytics',
            'ProductService', 'UserService', 'AppStateService', '$window', '$document', '$http', 'PopoverService','LocalStorage',
    GiftStartController]);

function GiftStartController($scope, $rootScope, GiftStartService,  $location,  $interval, $timeout,
         FacebookService,  TwitterService,  GooglePlusService,  Analytics,
         ProductService, UserService, AppStateService, $window, $document, $http, PopoverService, LocalStorage) {

    //alert('TBD: functionality and left-hand side (see Screen Shot 2015-05-29 at 11.14.12 PM')

    Analytics.track('campaign', 'controller created');

    $scope.giftStart = GiftStartService.giftStart;
    $scope.pitchIns = [];

    $scope.secondsLeft = 0;

    $scope.newTitle = $scope.giftStart.title;
    $scope.newDescription = $scope.giftStart.description;
    $scope.editingTitle = false;
    $scope.editingDescription = false;
    $scope.campaignEditable = UserService.uid == $scope.giftStart.gift_champion_uid;
    $scope.pitchInsInitialized = false;
    $scope.pitchinButtonHoverMessage = 'Click on some grid pieces first!';

    $scope.isMobile = device.mobile();
    $scope.newUser = !UserService.hasPitchedIn;
    $scope.loggedIn = UserService.loggedIn;
    $scope.imageUpdated = imageUpdated;
    $scope.picEdit = false;
    $scope.picUploading = false;
    var currentComment;

    $scope.userId = UserService.uid;
    $scope.commentEditing = [];     //keeping as array for one day when we can upload multiple images
    var imageData, commentName, commentImg, commentTxt;

    $scope.productMessage = '';

    $scope.isSavingForLater = false;

    $scope.showLoginBox = false;
    $scope.showPayBox = false;
    $scope.showSignBox = false;
    $scope.showShareBox = false;

    $scope.showShare = UserService.loggedIn && $location.hash() == "share-panel";


    function imageUpdated(data) {
        imageData = data;
    }

    $scope.showSharePanel = function(show) {
            $scope.showShareBox = false;
            $scope.showShare = show;
    };

    $scope.editingComment = function(comment, editing) {
        if (editing) {                      //edit mode on
            $scope.commentEditing.push(comment);
            commentName = comment.name;
            commentTxt = comment.note;
            commentImg = comment.img;
            currentComment = comment;
        } else if (!editing) {              //saving edit
            $scope.picEdit = false;
            $scope.commentEditing.splice($scope.commentEditing.indexOf(comment), 1);
            GiftStartService.updateComment(comment);
            currentComment = null;
        }
    };

    $scope.cancelEditComment = function(comment) {
        $scope.commentEditing.splice($scope.commentEditing.indexOf(comment), 1);
        comment.name = commentName;
        comment.note = commentTxt;
        comment.img = commentImg;
        $scope.picEdit = false;
    };

    $scope.isEditing = function(comment) {
        return $scope.commentEditing.indexOf(comment) != -1;
    };

    $scope.picSubmit = function() {
        $scope.picUploading = true;
        if (imageData) {
            currentComment.img = imageData;
            GiftStartService.updateCommentImage(currentComment, imageData)
                .success(function(response) {
                    console&&console.log&&console.log("pitchin image changed");
                    Analytics.track('campaign', 'pitchin image update succeeded');
                    currentComment.img = response;
                    $rootScope.$broadcast('pitchin-image-changed', response);
                    $scope.picUploading = false;
                    imageData = null;
                    var data = {payment: currentComment, action: 'pitch-in-img-update',
                    uid: currentComment.uid, imgurl: currentComment.img};
                    $http({method: 'POST', url: '/pay', data: data});
                })
                .error(function() {
                    Analytics.track('campaign', 'pitchin image update failed');
                    $scope.picUploading = false;
                    imageData = null;
                });
        }
        $scope.picEdit = false;
    };

    $scope.setPicEdit = function(edit) {
        $scope.picEdit = edit;
    };

    $scope.getTileCost = function() {
        return Math.floor($scope.giftStart.total_price / ($scope.giftStart.rows * $scope.giftStart.columns));
    };

    $rootScope.$on('paybox-hidden', function() {
        $scope.showPayBox = false;
        $scope.showSignBox = true;
    });

    $rootScope.$on('paybox-hidden-cancel', function() {
        $scope.showPayBox = false;
    });

    $rootScope.$on('signbox-hidden', function() {
        $scope.showSignBox = false;
        $scope.showShare = false;
        $scope.showShareBox = true;
    });

    $scope.shareBox = function (show) {
        $scope.showShareBox = show;
    };

    if ($scope.giftStart.gc_name) {
        $scope.newGcName = $scope.giftStart.gc_name;
    } else {
        $scope.newGcName = UserService.name;
    }

    // Remove old giftstart scheme if present (it messes up login)
    if ($location.search()['gs-id']) {
        $location.search('gs-id', null);
    }

    $scope.mailSubject = encodeURIComponent("Join us on a gift together");
    $scope.mailBody= function() {
        $location.search('re', btoa(JSON.stringify({
            type: 'consumer',
            uid: UserService.uid,
            channel: 'email',
            uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            })
        })));
        var url = encodeURIComponent("I thought you might be interested in pitching in on this GiftStarter campaign:\n\n" + $location.absUrl());
        $location.search('re', null);
        return url;
    };

    // Check if we should fetch a giftstart
    if($location.path().length > 11) {
        if (GiftStartService.giftStart.gsid == undefined) {
            var url_title = $location.path().split('/')[2];
            GiftStartService.fetchGiftStart(url_title);
        }
    }

    $scope.fundingBarProgress = function() {
        return (GiftStartService.giftStart.funded /
            GiftStartService.giftStart.total_price * 100).toString() + '%';
    };

    $scope.pitchinBarProgress = function() {
        return ((GiftStartService.giftStart.funded +
            GiftStartService.giftStart.totalSelection) /
            GiftStartService.giftStart.total_price * 100).toString() + '%';
    };

    $document.bind('keyup keydown', function(event) {
        if(event.ctrlKey && event.keyCode === 80) {
            window.open('/pdfify?page=' + $location.path().slice(1) + '/print');
            event.preventDefault();
            return false;
        }
    });

    $scope.$on('pitch-ins-initialized', function() {
        $scope.pitchInsInitialized = true;
    });

    $scope.$on('note-saved', function() {
        $scope.pitchIns.shift();
        $scope.pitchIns.unshift(GiftStartService.newPitchIn);
    });

    $scope.$on('pitch-ins-updated', function() {
    $http({
        method: 'POST',
        url: '/pay',
        data: {action: 'get-pitch-ins', gsid: $scope.giftStart.gsid}
    })
        .success( function (pitchIns) {
            var currentPids = [];
            angular.forEach($scope.pitchIns, function(pitchIn) {
                currentPids.unshift(pitchIn.parts.join('_'));
            });
            angular.forEach(pitchIns, function(pitchIn) {
                if(currentPids.indexOf(pitchIn.parts.join('_'))<0) {
                  $scope.pitchIns.unshift(pitchIn);
                }
            });
            //if ($scope.pitchIns.length < pitchIns.length && pitchIn.gsid === $scope.giftStart.gsid) {
            //    $scope.pitchIns.unshift(pitchIn);
            //}
        //});
        //    angular.forEach(pitchIns, function(pitchIn) {
        //    if ($scope.pitchIns.length < pitchIns.length && pitchIn.gsid === $scope.giftStart.gsid) {
        //        this.unshift(pitchIn);
        //    }
        //}, $scope.pitchIns);
        })
        .error(function() {console && console.log && console.log("Failed to contact part sync.")})
    });

    $scope.$on('selection-changed', function() {
        if (GiftStartService.giftStart.totalSelection > 0) {
            $scope.pitchinButtonHoverMessage = '';
        } else {
            $scope.pitchinButtonHoverMessage = 'Click on some parts first!';
        }
    });

    var syncPitchInsTimerIsFast = true;

    var syncPitchInsTimer = $interval(function(){
        GiftStartService.syncPitchIns("GiftStartService");
        if (syncPitchInsTimerIsFast && ($scope.secondsLeft <= 0 || $scope.campaignComplete())) {
            $interval.cancel(syncPitchInsTimer);
            syncPitchInsTimerIsFast = false;
            syncPitchInsTimer = $interval(function () {
                GiftStartService.syncPitchIns("GiftStartService");
            }, 60000, false);
        }
    }, 1000, false);

    // Synchronize parts on mouse activity
    $scope.mouseActivityCallback = function(source) {
        GiftStartService.syncPitchIns(source);
    };
    $scope.pitchInHoverCallback = function() {
        GiftStartService.syncPitchIns('pitch-in-hover')};

    $scope.pitchIn = function() {
        // Ensure they have selected more than $0 of the gift to pitch in
        if (GiftStartService.giftStart.totalSelection > 0) {
            Analytics.track('pitchin', 'pitchin button clicked');
            if (UserService.loggedIn) {
                AppStateService.set('contributeLogin', false);
                //PopoverService.setPopover('pay');
                $scope.showPayBox = true;
                $rootScope.$broadcast('paybox-shown');
            } else {
                //PopoverService.contributeLogin = true;
                AppStateService.set('contributeLogin', true);
                //PopoverService.setPopover('login');
                $rootScope.$broadcast('loginbox-show-login');
                $scope.showLoginBox = true;
            }
        } else {console && console.log && console.log("Nothing selected!")}
    };

    function restartPitchin() {
        if (AppStateService.get('contributeLogin')) {
            AppStateService.remove('contributeLogin');
            $scope.pitchIn();
        }
    }

    $scope.campaignComplete = function() {
        return (GiftStartService.giftStart.funded /
            GiftStartService.giftStart.total_price > 0.9975);
    };

    $scope.updateSecondsLeft = function() {
        if (($scope.secondsLeft < 0) || ($scope.campaignComplete())) {
            $scope.countdown = "Campaign Complete";
            GiftStartService.disableParts();
        } else {
            $scope.secondsLeft -= 1;

            var days = Math.floor($scope.secondsLeft / 86400).toFixed(0);
            var hours = Math.floor(($scope.secondsLeft / 3600) % 24).toFixed(0);

            $scope.countdown = days + " days, " + hours + " hours";
        }
    };

    function startSecondsLeftTimer() {
        $scope.secondsLeftTimer = $interval($scope.updateSecondsLeft, 1000);
    }
    function stopSecondsLeftTime() {
        $scope.secondsLeftTimer.cancel();
        $scope.secondsLeftTimer = null;
    }

    $scope.saveProdForLater = function() {
        $scope.isSavingForLater = true;
        var saver = ProductService.saveForLater(
            'GiftStartService',
            GiftStartService.giftStart.product_url,
            GiftStartService.giftStart.price,
            GiftStartService.giftStart.product_title,
            '',
            GiftStartService.giftStart.product_img_url
        );
        if(saver) {
            saver.success(function (response) {
                $scope.productMessage = "The gift has been saved to your <a href='/users/"+UserService.uid+"'>profile</a>."
                $scope.isSavingForLater = false;
            })
            .error(function (response) {
                $scope.productMessage = "An error occurred while saving the product: " + response['error'];
                $scope.isSavingForLater = false;
            });
        } else {
            $scope.isSavingForLater = false;
        }
    };

    var colorMap = [];

    $scope.randomColor = function(index) {
        if (colorMap[index] == null) {
            var colors = ["red", "green", "orange", "teal"];
            colorMap[index] = colors[Math.floor(Math.random() * colors.length)];
        }
        return colorMap[index];
    };

    $scope.campaignUrl = function() {
        if($location.path().length > 11) {
            return "http://giftstart.it/g/" + $location.path().slice(11);//$location.absUrl().split(/[#\?]/)[0];
        } else {
            return "";
        }
    };

    $scope.giftstartThisUrl = function() {
        return '/create?' + urlSerialize({
                product_url: GiftStartService.giftStart.product_url,
                title: GiftStartService.giftStart.product_title,
                price: GiftStartService.giftStart.price,
                img_url: GiftStartService.giftStart.product_img_url,
                source: 'GiftStarter'
            });
    };

    var urlSerialize = function(obj) {
        var str = [];
        for(var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" +
                encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };


    $scope.emailShare = function() {
        Analytics.track('campaign', 'email share from campaign');
        if (device.desktop()) {
            PopoverService.setPopover('email-share');
        } else {
            $window.location.href = "mailto:?subject=" + $scope.mailSubject +
                "&body=" + $scope.mailBody();
        }
    };

    $scope.facebookMsg = function() {
        Analytics.track('campaign', 'facebook share from campaign');
        FacebookService.inviteFriends(UserService.uid);
    };
    $scope.facebookShare = function() {
        Analytics.track('campaign', 'facebook share from campaign');
        //FacebookService.inviteFriends(UserService.uid, 'share');
        FB.ui(
         {
          method: 'share',
          href: $location.absUrl()
        }, function(response){});
        FB.Canvas.setAutoGrow();
    };
    $scope.twitterShare = function() {
        Analytics.track('campaign', 'twitter share from campaign');
        TwitterService.share(UserService.uid);
    };
    $scope.googlePlusShare = function() {
        Analytics.track('campaign', 'googleplus share from campaign');
        GooglePlusService.share(UserService.uid);
    };

    $scope.productLinkClicked = function(){
        Analytics.track('campaign', 'product link clicked');
    };

    $scope.goToUserPage = function(uid) {
        Analytics.track('client', 'go to user page from comments');
        GiftStartService.goToUserPage(uid);
    };

    $scope.toPDFPage = function() {
        window.open('/pdfify?page=' + $location.path().slice(1) + '/print');
    };

    $scope.$on('login-success', function() {
        $scope.campaignEditable = UserService.uid === $scope.giftStart.gift_champion_uid;
        $scope.newUser = !UserService.hasPitchedIn;
        $scope.showLoginBox = false;
        restartPitchin();
    });
    $scope.$on('logout-success', function() {
        $scope.campaignEditable = UserService.uid === $scope.giftStart.gift_champion_uid;
    });

    $scope.showOverlay = GiftStartService.showOverlay;
    $scope.hideOverlay = GiftStartService.hideOverlay;

    var imageInput = angular.element(document.getElementById('campaign-image-input'));
    $scope.updateImage = function() {
        var maxImageSize = 2*1024*1024; // 2 MB
        var acceptableFileTypes = ['image/jpeg', 'image/png'];
        if (imageInput[0].files[0]) {
            if (imageInput[0].files[0].size > maxImageSize) {
                alert("Oops!  Images must be smaller than 2 MB.");
            } else if (acceptableFileTypes.indexOf(imageInput[0].files[0].type) == -1) {
                alert("Oops!  Only jpeg and png images are allowed!  You chose a " + imageInput[0].files[0].type + ".");
            } else {
                var reader = new FileReader();
                reader.onload = function (event) {
                    var img_data = event.target.result;
                    $scope.newImage = {data: img_data,
                        filename: imageInput[0].files[0].name};
                };
                reader.readAsDataURL(imageInput[0].files[0]);
            }
        }
    };

    $scope.updateCampaign = function() {
        GiftStartService.updateCampaign($scope.newTitle, $scope.newDescription,
            $scope.newImage, $scope.newGcName);
        $scope.editMode = false;
    };

    if (GiftStartService.giftStart.gsid != undefined) {
        // Start timer update ticker
        $scope.secondsLeft = GiftStartService.giftStart.deadline -
            (new Date()).getTime()/1000;
        startSecondsLeftTimer();
    }

    // Update this giftstart when the service updates it
    $scope.$on('giftstart-loaded', function() {
        $scope.giftStart = GiftStartService.giftStart;
        $scope.secondsLeft = GiftStartService.giftStart.deadline -
            (new Date()).getTime()/1000;
        startSecondsLeftTimer();
    });
    $scope.$on('giftstart-updated', function() {
        $scope.giftStart = GiftStartService.giftStart;
        startSecondsLeftTimer();
    });

    function loginChanged() {
        $scope.campaignEditable =
            UserService.uid == $scope.giftStart.gift_champion_uid;
    }

    function loggedIn() {
        $scope.loggedIn = true;
        loginChanged();
    }

    function loggedOut() {
        $scope.loggedIn = false;
        $scope.showShare = false;
        $scope.showShareBox = false;
        loginChanged();
    }

    $scope.$on('login-success', loggedIn);
    $scope.$on('logout-success', loggedOut);

    $scope.$on('giftstart-loaded', restartPitchin);

    imageInput.bind('change', $scope.updateImage);

    $scope.$on("$destroy", function() {
        if (syncPitchInsTimer) {
            $interval.cancel(syncPitchInsTimer);
        }
    });

}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsCopyUrl', ['$window', gsCopyUrl]);


function gsCopyUrl($window) {
    function link(scope, element, attrs) {
        element.on('click', function () {
            if (!$window.getSelection().toString()) {
                // Required for mobile Safari
                this.setSelectionRange(0, this.value.length)
            }
        });
    }

    return {
        restrict: 'A',
        link: link
    };
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsThanks', gsThanks);

function gsThanks() {

    controller.$inject = ['$scope', 'UserService', '$location',
        'GiftStartService', 'Analytics', 'PopoverService','$window',
        'AppStateService'];
    function controller($scope, UserService, $location, GiftStartService,
                        Analytics, PopoverService, $window, AppStateService) {
        var thanks = this;

        thanks.message = GiftStartService.giftStart.thanks_message;
        thanks.newMessage = getNewMessage() ||
            GiftStartService.giftStart.thanks_message;

        thanks.imgUrl = GiftStartService.giftStart.thanks_img_url;
        thanks.edit = Boolean(/\/thanks\/edit/.test($location.path()));
        thanks.editable = $scope.giftStart.thanks_uid == UserService.uid
            || $location.search().thanks;

        thanks.showLogin = showLogin;
        thanks.update = update;
        thanks.profileImageUrl = UserService.profileImageUrl;

        thanks.imageUpdated = imageUpdated;

        if ($location.search().thanks == undefined) {
            $location.search('thanks', AppStateService.get('thanks-code'));
            AppStateService.remove('thanks-code');
        }

        $scope.$on('login-success', loginChanged);
        $scope.$on('logout-success', loginChanged);
        $scope.$on('giftstart-loaded', giftstartChanged);

        function loginChanged() {
            thanks.profileImageUrl = UserService.profileImageUrl;
            thanks.editable = GiftStartService.giftStart.thanks_uid ==
                UserService.uid;
        }

        function showLogin() {
            cacheNewMessage();
            PopoverService.setPopover('login');
        }

        function giftstartChanged() {
            thanks.message = GiftStartService.giftStart.thanks_message;
            thanks.newMessage = getNewMessage() ||
                GiftStartService.giftStart.thanks_message;

            thanks.imgUrl = GiftStartService.giftStart.thanks_img_url;
            thanks.edit = Boolean(/\/thanks\/edit/.test($location.path()));
            thanks.editable = $scope.giftStart.thanks_uid == UserService.uid
                || $location.search().thanks;
        }

        function cacheNewMessage() {
            var thisThanksURI = '/giftstart/' +
                GiftStartService.giftStart.giftstart_url_title +
                '/thanks/edit/';
            AppStateService.set('thanks-code', $location.search().thanks);
            // TODO: Replace with data layer
            localStorage.setItem(thisThanksURI + 'message', thanks.newMessage);
        }

        function getNewMessage() {
            var thisThanksURI = '/giftstart/' +
                GiftStartService.giftStart.giftstart_url_title +
                '/thanks/edit/';
            // TODO: Replace with data layer
            return localStorage.getItem(thisThanksURI + 'message');
        }

        function update() {
            var req = GiftStartService.updateThanks(thanks.newMessage);
            req.success(
                function(response) {
                    thanks.message = response.thanks_message;
                    thanks.newMessage = thanks.message;
                    thanks.imgUrl = response.thanks_img_url;
                    $location.path('/giftstart/' +
                        GiftStartService.giftStart.giftstart_url_title);
                })
                .error(function(reason) {
                    Analytics.track('campaign', 'thanks failed');
                    $window.alert('Thanking failed!  Did you get the link ' +
                        'right?');
                });
            thanks.edit = false;
        }

        function imageUpdated(imageData) {
            GiftStartService.setThanksImage(imageData);
        }
    }

    return {
        restrict: 'E',
        controller: controller,
        controllerAs: 'thanks',
        templateUrl: '/scripts/giftstart/thanks/thanks.html'
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var controller = function ($scope,
                               $rootScope,
                               GiftStartService,
                               $location,
                               ProductService,
                               UserService,
                               PopoverService,
                               $http,
                               $timeout,
                               Analytics,
                               AppStateService) {

        var shippingRate = 0; //0.045;

        var campaignLength = 10;

        $scope.inputPrice = ProductService.product.price / 100;
        $scope.totalPrice = 0;
        $scope.deliveryDate = null;
        $scope.campaignEndDate = null;
        $scope.getCampaignLength = function (date) {
            if (angular.isDate(date)) {
                campaignLength = Math.round((date.getTime() - new Date().getTime()) / 86400000)-5; //5 days for shipping etc
            }
            return campaignLength;
        };
        $scope.salesTaxRate = 0.098;
        $scope.serviceFeeRate = 0.08;
        $scope.fetchingTaxRate = false;

        $scope.xySets = [[1, 2], [1, 3], [2, 2], [1, 5], [2, 3], [2, 4],
            [3, 3], [2, 5], [3, 4], [3, 5], [4, 4], [3, 6], [4, 5], [4, 6],
            [5, 5], [5, 6], [6, 6], [6, 7], [7, 7]];

        function calculateInitialNumParts() {
            $scope.selectedXYSet = 0;
            for (var guess = 0; guess < $scope.xySets.length; guess++) {
                var calcPrice = $scope.inputPrice / $scope.xySets[guess][0] /
                    $scope.xySets[guess][1];
                if (calcPrice < 20.5) {
                    return guess;
                }
            }
            return $scope.xySets.length - 1;
        }

        $scope.showLoginBox = false;

        $scope.createStep = 1;

        $scope.shippingName = '';
        $scope.shippingEmail = '';
        $scope.shippingZip = '';
        $scope.shippingState = '';
        $scope.shippingDetailsSubmitted = false;

        $scope.product = ProductService.product;
        $scope.imgIndex = 0;
        $scope.selectedImg = ProductService.product.imgs[$scope.imgIndex];
        $scope.title = '';
        $scope.description = '';
        $scope.gcEmail = '';
        if(UserService.loggedIn) {
            UserService.getUser(UserService.uid, function(data) {
                $scope.gcEmail = data[Object.keys(data)[0]].email;
            });
        }
        $scope.coupon = '';
        $scope.specialNotes = '';
        $scope.pitchInsInitialized = false;
        $scope.giftStart = GiftStartService.giftStart;
        $scope.descriptionLongEnough = true;

        this.referral = {};
        $scope.showIntroCopy = false;
        $scope.fromReferral = false;

        $scope.dateChosenValid = dateChosenValid;
        $scope.changeDueDate = false;

        $scope.shippingChanged = function () {
            if ($scope.shippingZip&&$scope.shippingZip.length == 5) {
                Analytics.track('campaign', 'shipping updated');
                $scope.fetchingTaxRate = true;
                $scope.shippingDetailsSubmitted = true;

                $http({
                    method: 'POST', url: '/product',
                    data: {
                        action: 'get-tax-and-shipping',
                        shipping_address: 'street', shipping_city: 'city',
                        title: ProductService.product.title,
                        shipping_state: $scope.shippingState,
                        shipping_zip: $scope.shippingZip
                    }
                })
                .success(function (result) {
                    Analytics.track('product', 'tax and shipping fetch success');
                    $scope.salesTaxRate = result.tax;
                    $scope.fetchingTaxRate = false;
                    $scope.priceChanged();
                })
                .error(function (reason) {
                    $scope.fetchingTaxRate = false;
                    Analytics.track('product', 'tax and shipping fetch failed');
                });
            }
        };

        $scope.nextImage = function () {
            $scope.imgIndex = ($scope.imgIndex + 1) % $scope.product.imgs.length;
            $scope.selectedImg = $scope.product.imgs[$scope.imgIndex];
            $scope.updateGiftStartImage();
        };

        $scope.previousImage = function () {
            $scope.imgIndex = ($scope.imgIndex + $scope.product.imgs.length - 1) % $scope.product.imgs.length;
            $scope.selectedImg = $scope.product.imgs[$scope.imgIndex];
            $scope.updateGiftStartImage();
        };

        $scope.updateGiftStartImage = function () {
            Analytics.track('campaign', 'selected image changed');
            GiftStartService.giftStart.product_img_url = $scope.selectedImg;
        };

        function completePriceChange() {
            Analytics.track('campaign', 'price changed');
            $scope.salesTax = $scope.salesTaxRate * $scope.inputPrice * 100;
            $scope.serviceFee = $scope.serviceFeeRate * $scope.inputPrice * 100;
            $scope.shipping = shippingRate * $scope.inputPrice * 100;
            $scope.totalPrice = $scope.inputPrice * 100 + $scope.salesTax + $scope.serviceFee + $scope.shipping;
            $scope.fetchingTaxRate = false;
            $scope.updateOverlay();
        }

        $scope.priceChanged = function () {
            $scope.fetchingTaxRate = true;
            $http({
                method: 'POST', url: '/product',
                data: {
                    action: 'get-service-fee',
                    coupon: $scope.coupon
                }
            })
            .success(function (result) {
                Analytics.track('product', 'service fee fetch success');
                $scope.serviceFeeRate = result.fee;
                completePriceChange();
            })
            .error(function (reason) {
                Analytics.track('product', 'service fee fetch failure');
                completePriceChange();
            });
        };

        $scope.moreParts = function (event) {
            Analytics.track('campaign', 'number of parts changed');
            if ($scope.selectedXYSet < $scope.xySets.length - 1) {
                $scope.selectedXYSet += 1;
                $scope.x = $scope.xySets[$scope.selectedXYSet][0];
                $scope.y = $scope.xySets[$scope.selectedXYSet][1];
                $scope.updateOverlay();
            }

            event.preventDefault();
        };

        $scope.fewerParts = function (event) {
            Analytics.track('campaign', 'number of parts changed');
            if ($scope.selectedXYSet > 0) {
                $scope.selectedXYSet -= 1;
                $scope.x = $scope.xySets[$scope.selectedXYSet][0];
                $scope.y = $scope.xySets[$scope.selectedXYSet][1];
                $scope.updateOverlay();
            }

            event.preventDefault();
        };

        $scope.updateOverlay = function () {
            GiftStartService.giftStart.columns = $scope.x;
            GiftStartService.giftStart.rows = $scope.y;
            GiftStartService.giftStart.total_price = $scope.totalPrice;
            GiftStartService.giftStart.parts = GiftStartService.makeParts($scope.x * $scope.y, $scope.totalPrice);
            $scope.giftStart = GiftStartService.giftStart;
            $scope.$broadcast('overlay-updated');
        };

        $scope.makeUUID = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        function stagedGiftStart(uuid) {
            return {
                'title': $scope.title,
                'description': $scope.description,
                'coupon': $scope.coupon,
                'product_url': ProductService.product.product_url,
                'product_img_url': $scope.selectedImg,
                'product_price': $scope.inputPrice * 100,
                'product_title': ProductService.product.title,
                'sales_tax': $scope.salesTax,
                'shipping': $scope.shipping,
                'service_fee': $scope.serviceFee,
                'total_price': $scope.totalPrice,
                'campaign_length': campaignLength,
                'columns': $scope.x,
                'rows': $scope.y,
                'shipping_name': $scope.shippingName,
                'shipping_email': $scope.shippingEmail,
                'shipping_state': $scope.shippingState,
                'shipping_zip': $scope.shippingZip,
                'gc_email': $scope.gcEmail,
                'staging_uuid': uuid
            }
        }

        function clearCreateData() {
            $scope.title = '';
            $scope.description = '';
            $scope.coupon = '';
            $scope.selectedImg = '';
            $scope.shippingName = '';
            $scope.shippingEmail = '';
            $scope.shippingZip = '';
            $scope.shippingState = '';
            $scope.inputPrice = 0;
            campaignLength = 10;
            $scope.shippingDetailsSubmitted = false;
        }

        function dateChosenValid() {
            return !($scope.getCampaignLength($scope.deliveryDate) >= 29 ||
            $scope.getCampaignLength($scope.deliveryDate) < 1);
        }

        $scope.dueDateEmpty = function() {
            if($('.endDate')[0].value) {
                return false;
            } else {
                return true;
            }
        };

        $scope.changeDeliveryDate = function() {
            $(".endDate").datepicker("show");
        };

        $scope.deliveryDateChanged = function(dateText) {
            $scope.campaignEndDate = new Date($scope.deliveryDate);
            $scope.campaignEndDate.setDate($scope.campaignEndDate.getDate() - 6);
            $(".endRange").datepicker("option", "maxDate", $scope.campaignEndDate);
            $(".endRange").datepicker("setDate", $scope.campaignEndDate);
        };

        var endDateChanged = function(dateText) {
            $scope.campaignEndDate = new Date(dateText);
            $(".endRange").datepicker("setDate", $scope.campaignEndDate);
        };

        $scope.validationCreateStep = {
            title: 2,
            description: 2,
            coupon: 3,
            shippingState: 3,
            shippingZip: 3,
            shippingName: 3,
            shippingEmail: 3,
            deliveryDate: 3,
            gcEmail: 2
        };

        function resetValidationErrors() {
            $scope.hideValidationError = {
                title: true,
                description: true,
                coupon: true,
                shippingState: true,
                shippingZip: true,
                shippingName: true,
                shippingEmail: true,
                deliveryDate: true,
                gcEmail: true
            };
        }
        resetValidationErrors();

        $scope.isSubmittingData = false;

        $scope.validationTrigger = {
            createButtonClicked: false
        };

        $scope.runValidation = function() {
            var keys = Object.keys($scope.hideValidationError);
            var hasErrors = false;
            keys.forEach(function (key) {
                if ($scope.validationCreateStep[key] == $scope.createStep) {
                    $scope.hideValidationError[key] = false;
                }
                switch($scope.createStep) {
                    case 2: hasErrors = $scope.campaignForm.title.$error.required||$scope.campaignForm.description.$error.required||$scope.campaignForm.gcEmail.$error.required; break;
                    case 3: hasErrors = $scope.campaignForm.shippingState.$error.required||$scope.campaignForm.shippingZip.$error.required||$scope.campaignForm.shippingName.$error.required||$scope.campaignForm.shippingEmail.$error.required||$scope.campaignForm.deliveryDate.$error.required; break;
                }
            });
            $scope.validationTrigger.createButtonClicked = true;
            return !hasErrors;
        };

        $scope.isCreateStepTiles = function() {return $scope.createStep==1;};

        $scope.isCreateStepStory = function() {return $scope.createStep==2;};

        $scope.isCreateStepShipping = function() {return $scope.createStep==3;};

        $scope.goToStep = function(i) {
            $scope.createStep=Math.max(Math.min(i,3),1);
            $('html,body').animate({scrollTop: $('#giftstart-create-controls').offset().top-100}, 500);
        };

        $scope.prevStep = function() {
            $scope.goToStep($scope.createStep-1);
        };

        $scope.nextStep = function() {
            if($scope.runValidation()) {
                $scope.goToStep($scope.createStep + 1);
            }
            jQuery('#giftstart-create-next').blur();
        };

        $scope.next = function() {

            $scope.runValidation();

            GiftStartService.title = $scope.title;
            GiftStartService.description = $scope.description;
            GiftStartService.coupon = $scope.coupon;
            GiftStartService.productUrl = ProductService.product.product_url;
            GiftStartService.productTitle = ProductService.product.title;
            GiftStartService.retailerLogo = ProductService.logo;
            GiftStartService.productImgUrl = $scope.selectedImg;
            GiftStartService.rows = $scope.y;
            GiftStartService.columns = $scope.x;
            GiftStartService.productPrice = $scope.inputPrice*100;
            GiftStartService.shippingName = $scope.shippingName;
            GiftStartService.shippingEmail = $scope.shippingEmail;
            GiftStartService.shippingZip = $scope.shippingZip;
            GiftStartService.shippingState = $scope.shippingState;
            GiftStartService.salesTax = $scope.salesTax;
            GiftStartService.shipping = $scope.shipping;
            GiftStartService.serviceFee = $scope.serviceFee;
            GiftStartService.totalPrice = $scope.totalPrice;
            GiftStartService.campaignLength = campaignLength;
            GiftStartService.specialNotes = $scope.specialNotes;
            GiftStartService.gcEmail = $scope.gcEmail;
            GiftStartService.gcName = UserService.name;

            if ($scope.campaignForm.$valid && ($scope.inputPrice != 0) && dateChosenValid()) {
                if (UserService.loggedIn) {
                    Analytics.track('campaign', 'campaign submitted', '',
                        $scope.totalPrice);
                    $scope.isSubmittingData = true;
                    GiftStartService.createGiftStart()
                        .success(function(data) {
                            clearCreateData();
                            resetValidationErrors();
                        })
                        .error(function(data) {
                            alert("A severe error occurred; please try again? If it keeps happening, please contact the Gift Concierge with the following information: "+data);
                            $scope.isSubmittingData = false;
                        });
                } else {
                    var uuid = $scope.makeUUID();
                    //stash staged giftstart for later use by login-popover.controller
                    AppStateService.set('staging_uuid', uuid);
                    console&&console.log&&console.log("staging: "+stagedGiftStart(uuid)['staging_uuid']);
                    AppStateService.set('staged_giftstart', stagedGiftStart(uuid));
                    console&&console.log&&console.log("staged: "+AppStateService.get('staged_giftstart')['staging_uuid']);
                    //PopoverService.giftstartCreateLogin = true;
                    //PopoverService.setPopover('login');
                    $rootScope.$broadcast('loginbox-show-login');
                    $scope.showLoginBox = true;
                }
            }
        };

        $scope.onDescriptionBlur = function() {
            var longEnough = $scope.description.length > 400;
            if (!longEnough && $scope.descriptionLongEnough) {
                Analytics.track('campaign', 'description too short displayed');
            } else if (longEnough && !$scope.descriptionLongEnough) {
                Analytics.track('campaign', 'description too short hidden');
            }
            $scope.descriptionLongEnough = longEnough;
        };

        // So that users that were browsing another giftstart don't experience
        // the "no overlay initially" bug
        if (!GiftStartService.title) {
            GiftStartService.giftStart.gsid = 0;
            GiftStartService.giftStart = GiftStartService.buildGiftStart();
        } else {
            //$scope.inputPrice = GiftStartService.productPrice/100;
            //$scope.shippingZip = GiftStartService.shippingZip;
            //$scope.shippingState = GiftStartService.shippingState;
            //$scope.title = GiftStartService.title;
            //$scope.description = GiftStartService.description;
            $scope.specialNotes = GiftStartService.specialNotes;
            $scope.giftStart = GiftStartService.giftStart;
        }

        $scope.selectedXYSet = calculateInitialNumParts();

        extractReferral();
        extractPromo();


        function extractReferral() {
            if ($location.search().product_url &&
                $location.search().title &&
                $location.search().price &&
                $location.search().img_url &&
                $location.search().source) {
                restoreFromReferral({
                    product_url: $location.search().product_url,
                    productTitle: $location.search().title,
                    productImgUrl: $location.search().img_url,
                    price: $location.search().price,
                    source: $location.search().source
                });
                $location.search('product_url', null);
                $location.search('title', null);
                $location.search('price', null);
                $location.search('img_url', null);
                $location.search('source', null);
            }
        }

        function extractPromo() {
            if ($location.search().promo == 'dress-for-success') {
                $scope.title = 'Gift a Start Collection';
                $scope.description = 'Give the gift of confidence this holiday season with this curated assortment of beautiful basics. butter LONDON is proud to partner with Dress for Success to gift a new start to women in need. Dress for Success is a not-for-profit organization dedicated to helping women get back on their feet and back into the workforce. For these women giving something as simple as a lipstick can make an impact. Help deliver a new start this holiday season by starting a GiftStart for our Gift A Start Collection.';
                $scope.shippingZip = '98118';
                $scope.shippingState = 'WA';
                $scope.shippingChanged();
                $location.search('promo', null);
            }
        }

        function restoreFromSession(session) {
            // This function doesn't seem to be in use
            $scope.title = session.title;
            $scope.description = session.description;
            $scope.coupon = session.coupon;
            ProductService.product.product_url = session.productUrl;
            ProductService.product.title = session.productTitle;
            ProductService.logo = session.retailerLogo;
            $scope.selectedImg = session.productImgUrl;
            $scope.selectedXYSet = session.selectedXYSet;
            $scope.y = session.rows;
            $scope.x = session.columns;
            $scope.inputPrice = session.productPrice / 100;
            $scope.shippingZip = session.shippingZip;
            $scope.shippingState = session.shippingState;
            $scope.salesTax = session.salesTax;
            $scope.shipping = session.shipping;
            $scope.serviceFee = session.serviceFee;
            $scope.totalPrice = session.totalPrice;
            $scope.campaignLength = session.campaignLength;
            $scope.specialNotes = session.specialNotes;
            $scope.gcEmail = session.gcEmail;

            $scope.$on('login-success', $scope.next);
        }

        function restoreFromReferral(referral) {
            // If user was referred here from a brand
            ProductService.product.product_url = referral.product_url;
            ProductService.product.title = referral.productTitle;
            ProductService.product.imgs = [referral.productImgUrl];
            $scope.selectedImg = referral.productImgUrl;
            $scope.inputPrice = parseInt(referral.price)/100;
            $scope.showIntroCopy = true;
            $scope.fromReferral = true;
            $scope.referredFrom = getReferrerName(referral.source);

            $scope.ghostruck = /ghostruck/.test(referral.source.toLowerCase());

            // special for ghostruck: auto zip and state
            if (/ghostruck/.test(referral.source.toLowerCase())) {
                $scope.shippingState = 'WA';
                $scope.shippingZip = '98118';
                $scope.shippingChanged();
            }

            Analytics.track('client', 'referred from', referral.source);
        }

        function getReferrerName(source) {
            if (/ghostruck/.test(source.toLowerCase())) {
                return 'Ghostruckers!';
            } else {
                return '';
            }
        }

        $timeout(function() {
            $scope.pitchInsInitialized = true;
        }, 2500);

        if (this.referral) {
            $scope.selectedXYSet = calculateInitialNumParts();
        }
        $scope.x = $scope.xySets[$scope.selectedXYSet][0];
        $scope.y = $scope.xySets[$scope.selectedXYSet][1];
        $scope.updateGiftStartImage();
        $scope.priceChanged();

        $(".endDate").datepicker({
            minDate: "+7d",
            maxDate: "+34d",
            onSelect: $scope.deliveryDateChanged
        });

        $(".endRange").datepicker({
            minDate: "+7d",
            maxDate: "+34d",
            onSelect: endDateChanged
        });

        $rootScope.$on('login-success', function(){
            $scope.showLoginBox = false;
            $scope.next();
        });

    };

    app.controller('GiftStartCreateController', [
        '$scope',
        '$rootScope',
        'GiftStartService',
        '$location',
        'ProductService',
        'UserService',
        'PopoverService',
        '$http',
        '$timeout',
        'Analytics',
        'AppStateService',
        controller]);

}(angular.module('GiftStarterApp')));

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('ShareController', [
            '$scope','$rootScope','GiftStartService','$location','$interval', '$timeout',
            'FacebookService','TwitterService','GooglePlusService','LinkedInService','Analytics',
            'ProductService', 'UserService', 'AppStateService', '$window', '$document', '$http', 'PopoverService','LocalStorage',
    ShareController]);

function ShareController($scope, $rootScope, GiftStartService,  $location,  $interval, $timeout,
         FacebookService,  TwitterService,  GooglePlusService, LinkedInService, Analytics,
         ProductService, UserService, AppStateService, $window, $document, $http, PopoverService, LocalStorage) {

    $scope.giftStart = GiftStartService.giftStart;

    $scope.message = "Hey! I just pitched in on a gift for " + $scope.giftStart.shipping_name + " using GiftStarter, a web service where you can buy anything online and split the cost with friends! " + $scope.giftStart.product_title + " will be such an exciting gift for them to receive. Please help to make it happen by following the link below to pitch in too!\n\nLINK: " + $scope.campaignUrl();

    $scope.sharePermission = [];
    $scope.sharePermission["facebook"] = false;
    $scope.sharePermission["twitter"] = false;
    $scope.sharePermission["linkedin"] = false;
    $scope.sharePermission["google"] = false;
    var sharePermissionUrlFacebook = FacebookService.getSharePermissionUrl();
    var sharePermissionUrlTwitter = null;
    var sharePermissionUrlLinkedIn = LinkedInService.getSharePermissionUrl();

    $scope.emailRecipients = "";

    var ensuring = [];
    ensuring["facebook"] = false;
    ensuring["twitter"] = false;
    ensuring["linkedin"] = false;

    $scope.refreshPermissionsStatus = function() {
        //check to see if user has permission to post
        FacebookService.checkSharePermission().then(function(hasPermission) {
            $scope.sharePermission["facebook"] = hasPermission=='1';
            if(ensuring["facebook"]) {$scope.selectedSocials["facebook"] = $scope.sharePermission["facebook"]; ensuring["facebook"] = false;}
        });
        TwitterService.checkSharePermission().then(function(hasPermission) {
            $scope.sharePermission["twitter"] = hasPermission=='1';
            if(ensuring["twitter"]) {$scope.selectedSocials["twitter"] = $scope.sharePermission["twitter"]; ensuring["twitter"] = false;}
        });
        LinkedInService.checkSharePermission().then(function(hasPermission) {
            $scope.sharePermission["linkedin"] = hasPermission=='1';
            if(ensuring["linkedin"]) {$scope.selectedSocials["linkedin"] = $scope.sharePermission["linkedin"]; ensuring["linkedin"] = false;}
        });
        //GooglePlusService.checkSharePermission().then(function(hasPermission) {
        //    $scope.sharePermission["google"] = hasPermission=='1';
        //    if($scope.selectedSocials["google"]) {$scope.selectedSocials["google"] = $scope.sharePermission["google"];}
        //});
        //twitter permissions URL must be generated dynamically
        if(!$scope.sharePermission["twitter"]) {
            TwitterService.getSharePermissionUrl().then(function(url){
                sharePermissionUrlTwitter = url;
            });
        }
    };

    $scope.refreshPermissionsStatus();
    var permissionsTimer = $interval($scope.refreshPermissionsStatus,4*60*1000); //twitter URL expires after 5m
    $scope.$on("$destroy",function() {$interval.cancel(permissionsTimer);});


    $scope.ensureFacebookSharePermission = function() {
        ensuring["facebook"] = true;
        window.open(sharePermissionUrlFacebook);
    };

    $scope.ensureTwitterSharePermission = function() {
        ensuring["twitter"] = true;
        window.open(sharePermissionUrlTwitter);
    };

    $scope.ensureLinkedInSharePermission = function() {
        ensuring["linkedin"] = true;
        window.open(sharePermissionUrlLinkedIn);
    };

    $scope.shareReset = function() {
        $scope.selectedSocials["facebook"] = false;
        $scope.selectedSocials["twitter"] = false;
        $scope.selectedSocials["linkedin"] = false;
        $scope.selectedSocials["google"] = false;
        $scope.emailRecipients = "";
        $scope.shareSuccess = false;
    };

    $scope.shareFacebook = function(message, link, linkName) {
        Analytics.track('campaign', 'facebook share submitted');
        //if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        //if (!linkName) {linkName = $scope.giftStart.product_title;}
        FacebookService.doShare(message, link, linkName);
    };

    $scope.shareTwitter = function(message, link) {
        Analytics.track('campaign', 'twitter share submitted');
        if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        TwitterService.doShare(message, link);
    };

    $scope.shareGplus = function(link) {
        Analytics.track('campaign', 'gplus share submitted');
        if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        window.open("https://plus.google.com/share?url="+link);
        $scope.sharePermission["google"] = true;
    };

    $scope.shareLinkedin = function(message, link, linkName) {
        Analytics.track('campaign', 'linkedin share submitted');
        //if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        //if (!linkName) {linkName = $scope.giftStart.product_title;}
        LinkedInService.doShare(message, link, linkName);
    };

    $scope.shareEmail = function(to, message, link) {
        if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        Analytics.track('campaign', 'email share submitted');
        $scope.sending = true;
        $http({
            method: 'PUT',
            url: '/email/sharecampaign.json',
            data: {
                to: to,
                message: message,
                share_url: link,
                gsid: $scope.giftStart.gsid
            }
        })
        .success(function() {
            //alert('True');
        })
        .error(function() {
            //alert('False');

        });
    };

    $scope.shareSuccess = false;

    $scope.selectedSocials = [];
    $scope.selectedSocials["facebook"] = false;
    $scope.selectedSocials["twitter"] = false;
    $scope.selectedSocials["linkedin"] = false;
    $scope.selectedSocials["google"] = false;

    var ensurePermission = [];
    ensurePermission["facebook"] = $scope.ensureFacebookSharePermission;
    ensurePermission["twitter"] = $scope.ensureTwitterSharePermission;
    ensurePermission["linkedin"] = $scope.ensureLinkedInSharePermission;
    ensurePermission["google"] = $scope.shareGplus;

    $scope.shareClick = function() {
        $scope.shareSuccess = true;

        if($scope.selectedSocials["facebook"]) {
            $scope.shareFacebook($scope.message);
        }
        if($scope.selectedSocials["twitter"]) {
            $scope.shareTwitter($scope.message);
        }
        if($scope.selectedSocials["linkedin"]) {
            $scope.shareLinkedin($scope.message);
        }
        //if($scope.selectedSocials["google"]) {
        //    $scope.shareGoogle();
        //}
        if($scope.emailRecipients.trim().length>0) {
            $scope.shareEmail($scope.emailRecipients, $scope.message)
        }
    };

    $scope.selectSocial = function(social) {
        if(!$scope.sharePermission[social]) {
            ensurePermission[social]();
        } else {
            $scope.selectedSocials[social] = true;
        }
    };

    $scope.campaignUrl = function() {
        if($location.path().length > 11) {
            return "http://giftstart.it/g/" + $location.path().slice(11);//$location.absUrl().split(/[#\?]/)[0];
        } else {
            return "";
        }
    };

    $scope.loggedIn = function() {
        return UserService.loggedIn;
    };
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('ProductService', ['$http','$rootScope','Analytics',
    'UserService', 'PopoverService', '$location', ProductService]);

function ProductService($http,  $rootScope,  Analytics, UserService, PopoverService, $location) {

    this.product = {
        product_url: '',
        imgs: [],
        title: '',
        logo: '',
        imageWidth: 0,
        imageHeight: 0
    };

    this.products = [];

    var self = this;

    this.submitLink = function(url, onSuccess, onFail) {
        $http({
            method: 'GET',
            url: '/products/urls/' + encodeURIComponent(url) + '.json'
        }).success(function(data) {
            if (data.error) {
                console && console.log && console.log("Fetched failed!");
                onFail(data);
            } else {
                self.product.imgs = data.product.imgs;
                self.product.price = data.product.price;
                self.product.title = data.product.title;
                self.logo = data.product.logo;
                onSuccess(self.product);
            }
        }).error(function(data) {
            console && console.log && console.log("Fetched failed!");
            onFail(data);
        });
    };

    this.createCampaignFromProduct = function(url, price, title, imgUrl) {
        Analytics.track('product', 'campaign create from search');
        self.product.product_url = url;
        self.product.price = price;
        self.product.title = title;
        self.logo = '';
        self.product.imgs = [imgUrl];
        $location.path("create");
    };

    this.saveForLater = function(retailer, url, price, title, description, imgUrl) {
        if(!UserService.loggedIn) {
            $rootScope.$broadcast('header-show-login');
        } else {
            Analytics.track('product', 'save for later');
            return $http.post('/users', {
                'uid': UserService.uid,
                'action': 'save-for-later',
                'url': url,
                'retailer': retailer,
                'price': price,
                'title': title,
                'description': description,
                'imgUrl': imgUrl
            });
        }
    };

    this.searchProducts = function(search) {
        if(window.history) {window.history.replaceState({},'GiftStarter Search: '+search,'/search/'+encodeURIComponent(search));}
        Analytics.track('product', 'search submitted');
        $http({method: 'GET',
            url: '/products/' + encodeURIComponent(search) + '.json'})
            .success(self.fetchSuccess);
    };

    this.fetchSuccess = function (result) {
        Analytics.track('product', 'search succeeded');
        self.products = result;
        if (self.products.length) {
            $rootScope.$broadcast('products-fetched');
        } else {
            $rootScope.$broadcast('products-empty');
        }
    };
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsProductSearch', gsProductSearch);

function gsProductSearch(ProductService, $location, Analytics, UserService, $window,
                         $timeout, $rootScope) {
    function link(scope, element) {
        scope.loading = false;
        scope.failed = false;
        scope.results_empty = false;
        scope.product_url = "";
        scope.currentProductLink = '';
        scope.selectedProduct = -1;
        scope.productMessage = '';
        scope.isSavingForLater = false;

        scope.giftConciergeClicked = function() {Analytics.track('client',
            'gift concierge email clicked')};

        function onSuccess(product) {
            Analytics.track('product', 'link submission succeeded');
            scope.loading = false;
            ProductService.product.product_url = scope.product_url;
            ProductService.product.imgs = product.imgs;
            $location.path("create");
        }
        function onFailure(reason) {
            Analytics.track('product', 'link submission failed');
            scope.loading = false;
            scope.failed = true;
        }

        scope.submit = function() {
            // Determine if url or search term
            var isUrl = (scope.product_url.indexOf('http://') == 0) |
                (scope.product_url.indexOf('https://') == 0);

            if (isUrl) {
                scope.submitLink();
            } else {
                scope.submitSearch();
            }
        };

        scope.submitSearch = function() {
            Analytics.track('product', 'search submitted');
            ProductService.searchProducts(scope.product_url);
            scope.loading = true;
            scope.failed = false;
            scope.results_empty = false;
            scope.selectedProducts = [];
        };

        scope.submitLink = function() {
            Analytics.track('product', 'link submitted');

            // Fix urls if they don't start with http://
            if (scope.product_url.slice(0, 7) !== "http://" &&
                scope.product_url.slice(0, 8) !== "https://") {
                scope.product_url = "http://" + scope.product_url;
            }

            scope.loading = true;
            scope.failed = false;
            scope.results_empty = false;
            ProductService.product.product_url = scope.product_url;
            ProductService.submitLink(scope.product_url, onSuccess,
                onFailure);
        };

        scope.$on('products-fetched', function() {
            scope.loading = false;
            scope.failed = false;
            scope.products = ProductService.products.filter(function(product) {
                return product.imgUrl != '' && product.price > 3998;
            });
            scope.pageNumbers = [];
            scope.numPages = Math.floor(scope.products.length / scope.pageSize);
            for (var i = 1; i <= scope.numPages; i++) {
                scope.pageNumbers.push(i);
            }
            scope.selectPage(1);
        });

        scope.$on('products-fetch-fail', function() {
            scope.loading = false;
            scope.failed = true;
        });

        scope.$on('products-empty', function() {
            scope.loading = false;
            scope.results_empty = true;
        });

        scope.selectedPage = 1;
        scope.pageSize = 10;
        scope.numPages = 0;
        scope.pageNumbers = [];

        scope.incrementPage = function() {
            if (scope.selectedPage < scope.pageNumbers.length) {
                Analytics.track('product', 'increment page');
                scope.selectPage(scope.selectedPage + 1);
            }
        };

        scope.decrementPage = function() {
            if (scope.selectedPage > 1) {
                Analytics.track('product', 'decrement page');
                scope.selectPage(scope.selectedPage - 1);
            }
        };

        scope.selectPage = function(page) {
            scope.selectedPage = page;
            scope.selectedProducts = scope.products.slice(
                    (scope.selectedPage - 1) * scope.pageSize,
                    scope.selectedPage * scope.pageSize);
            scope.hideProductDetails();
            $('html, body').animate({
                scrollTop: $('#search-products-section').offset().top-300
                //$('#product-search-anchor').offset().top
            }, 200);
        };

        scope.showProductDetails = function(index) {
            Analytics.track('product', 'show product details');
            scope.hideProductDetails();
            scope.productMessage = '';
            scope.selectedProduct = index;
            scope.selectedProducts[index].selected = true;

            var root = angular.element(document.querySelector(
                '#search-products-section'))[0];

            // Product div animates as it expands, so need to infer height
            // from initial state (2x height/width)
            var height = root.children[index].offsetHeight;
            $timeout(function (){
                var offset = root.children[index].offsetTop;
                var scrollOffset = offset - ($window.innerHeight -
                    2 * height) / 2;
                $window.scrollTo(0, scrollOffset);
            }, 100);
        };

        scope.hideProductDetails = function() {
            scope.selectedProduct = -1;
            scope.selectedProducts.map(function(p) {
                p.selected = false;
                return p;
            });
        };

        scope.fixImage = function(img) {
            var jImg = $(img);
            if(jImg.width()<250) {
                var newSrc = jImg.attr('src').replace('500x500', '250x250');
                jImg.attr('src', newSrc);
                scope.products[jImg.attr('index')].imgUrl=newSrc;
            }
        };

        scope.goToProduct = function($index, $event) {
            if (scope.selectedProduct == $index) {
                //$window.open(scope.selectedProducts[$index].url, '_blank');
                scope.startCampaignFrom($index);
                $event.stopPropagation();
            }
        };

        scope.startCampaignFrom = function(index) {
            ProductService.createCampaignFromProduct(
                scope.selectedProducts[index].url,
                scope.selectedProducts[index].price,
                scope.selectedProducts[index].title,
                scope.selectedProducts[index].imgUrl
            );
        };

        scope.saveForLater = function(index) {
            scope.isSavingForLater = true;
            var saver = ProductService.saveForLater(
                scope.selectedProducts[index].retailer,
                scope.selectedProducts[index].url,
                scope.selectedProducts[index].price,
                scope.selectedProducts[index].title,
                scope.selectedProducts[index].description,
                scope.selectedProducts[index].imgUrl
            );
            if(saver) {
                saver.success(function (response) {
                    scope.productMessage = "The gift has been saved to your <a href='/users/"+UserService.uid+"'>profile</a>."
                    scope.isSavingForLater = false;
                })
                .error(function (response) {
                    scope.productMessage = "An error occurred while saving the product: " + response['error'];
                    scope.isSavingForLater = false;
                });
            } else {
                scope.isSavingForLater = false;
            }
        };

        var performHeadSearch = function () {
            scope.submit();
            $('html, body').animate({
                scrollTop: $('#search-products-section').offset().top-300
                //$('#product-search-anchor').offset().top
            }, 200);
            $window.sessionStorage.setItem('fromSearch', null);
        };

        $rootScope.$on('performSearchFromHeader', function () {
            scope.product_url = $('#product-search-input-head').val();
            performHeadSearch();
        });

        $rootScope.$on('performSearchFromUrl', function () {
            scope.product_url = $window.sessionStorage.getItem('searchTermFromUrl');
            performHeadSearch();
        });
    }

    return {
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/product/product-search.html'
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsOverlay', gsOverlay);

function gsOverlay($compile, $timeout, $window, GiftStartService, Analytics) {
    function link(scope, element, attrs) {
        var overlayElement = angular.element('gs-overlay div.overlay');

        function drawGrid() {
            // Add artificial delay so the DOM elements have time to settle.
            $timeout(function () {
                var overlayHeight = overlayElement.height();
                var overlayWidth = overlayElement.width();

                Analytics.track('campaign', 'overlay drawn');
                var marginHeight = overlayHeight/GiftStartService.giftStart.rows/20;
                var marginWidth = overlayWidth/GiftStartService.giftStart.columns/20;
                var margin = (marginHeight > marginWidth) ? marginWidth : marginHeight;
                var height = Math.floor(overlayHeight/GiftStartService.giftStart.rows - 2*margin);
                var width = Math.floor(overlayWidth/GiftStartService.giftStart.columns - 2*margin - 1);
                scope.$on('hide-overlay', function() {angular.element('gs-overlay div.overlay .part-cell').css('opacity', '0');});
                scope.$on('show-overlay', function() {angular.element('gs-overlay div.overlay .part-cell').css('opacity', '1');});
                // Calculate max widths for bought part user images
                var usrHeight  = overlayHeight/GiftStartService.giftStart.rows - 4*margin;
                var usrWidth  = overlayWidth/GiftStartService.giftStart.columns - 4*margin;
                var usrShortEdge = (usrHeight > usrWidth) ? usrWidth : usrHeight;
                overlayElement.empty();
                if(GiftStartService.giftStart.parts !== 'undefined' && GiftStartService.giftStart.parts.length !== 'undefined'){
                    for (var i = 0; i < GiftStartService.giftStart.parts.length; i++) {
                        var divString = '<div class="part-cell c'+i+
                            '" ng-class="{bought: giftstart.parts['+i+
                            '].bought, selected: giftstart.parts['+i+
                            '].selected, disabled: giftstart.parts['+i+
                            '].disabled}" ng-click="giftstart.parts['+i+
                            '].toggle()" ' +
                            'style="width: '+width+'px;height: '+height+'px;margin:'+margin+'px '+margin+'px;">' +
                            '<div class="td"><span class="price">${{giftstart.parts['+i+
                            '].value / 100 | number : 2}}</span><a ng-href="/users/{{giftstart.parts['+i+'].uid}}"><img class="giver" style="width:' +
                            usrShortEdge + 'px;height:' + usrShortEdge + 'px;" ng-src="{{giftstart.parts['+i+
                            '].img}}"/></a></div></div>';
                        overlayElement.append($compile(divString)(scope));
                    }
                }
            }, 10);
        }

        drawGrid();

        angular.element($window).on('load', drawGrid);
        angular.element($window).on('resize', drawGrid);
        scope.$on('overlay-updated', drawGrid);
        scope.$on('giftstart-loaded', drawGrid);
    }

    return {
        restrict: 'E',
        scope: {giftstart: '='},
        link: link,
        templateUrl: '/scripts/giftstart/overlay/overlay.html'
    };
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('PopoverService', ['$rootScope','$timeout',
    'Analytics','LocalStorage', PopoverService]);

function PopoverService($rootScope,  $timeout,  Analytics, LocalStorage) {

    this.template = '';
    var self = this;
    this.currentLocation = '';
    this.validHashes = ['login', 'pay', 'note', 'thanks'];

    this.setPopover = function(popoverName) {
        //LocalStorage.set('/PopoverService/current', popoverName);
        console && console.log && console.log('setting popover', popoverName);
        if (popoverName === '' || popoverName === null) {
            this.hidePopover();
        } else {
            self.template = '<gs-' + popoverName + '-popover></gs-' + popoverName + '-popover>';
            self.currentLocation = popoverName;
            self.showPopover();
            $rootScope.$broadcast('popover-updated');
        }
    };

    this.setPopoverFromTemplate = function(newTemplate) {
        this.template = newTemplate;
        $rootScope.$broadcast('popover-updated');
    };

    this.getCurrentTemplate = function() {
        return this.template;
    };

    this.hidePopover = function() {
        $timeout(function() {
            //LocalStorage.remove('/PopoverService/current');
            self.contributeLogin = false;
            //LocalStorage.set('/GiftStartService/contributeLogin', false);
            $rootScope.$broadcast('popover-hidden');
            self.currentLocation = '';

            // show olark message app if mobile.
            if (device.mobile()) {
                olark('api.box.show');
            }
        });
    };

    this.showPopover = function() {
        // hide olark message app if mobile.
        if (device.mobile()) {
            olark('api.box.hide');
        }
        //window.setTimeout("var el=jQuery('.popover-container').first();alert('top: '+el.position().top+', left: '+el.position().left+', h: '+el.height()+', w: '+el.width())",1000);
        $rootScope.$broadcast('popover-shown');
    };

    this.nextPopover = function() {
        if (self.validHashes.indexOf(self.currentLocation) + 1 < self.validHashes.length) {
            var nextPopover = self.validHashes[self.validHashes.indexOf(self.currentLocation) + 1];
            self.setPopover(nextPopover);
            Analytics.track('client', 'showing popover ' + nextPopover);
        } else {
            self.hidePopover();
        }
    };

    // Ensure they don't navigate directly to a popover
    //if (LocalStorage.get('/PopoverService/contributeLogin')) {
    //    self.contributeLogin = LocalStorage
    //        .get('/PopoverService/contributing');
    //} else {
        self.contributeLogin = Boolean(self.contributeLogin);
    //}
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsPopover', ['PopoverService', '$compile', '$document',
    gsPopover]);


function gsPopover(PopoverService, $compile, $document) {
    function link(scope, element, attrs) {

        scope.popoverShown = false;

        var templateContainer = angular.element(angular.element(element.children()[0]).children()[0]);
        var currentTemplate = '';
        var bodyElement = angular.element($document.find('body')[0]);

        var fixPosition = function() {
            scope.topPosition = $(window).scrollTop();
        };

        scope.topPosition = 0;

        // When something updates the popover service, this should listen and update from service
        scope.$on('popover-updated', popoverUpdated);
        function popoverUpdated() {
            currentTemplate = PopoverService.getCurrentTemplate();
            templateContainer.empty();
            templateContainer.append($compile(currentTemplate)(scope));
        }

        // When something hides via the popover service, this needs to react
        scope.$on('popover-hidden', popoverHidden);
        function popoverHidden() {
            scope.popoverShown = false;
            bodyElement.removeClass('popoverShown');
        }

        // When something shows via the popover service, this needs to react
        scope.$on('popover-shown', popoverShown);
        function popoverShown() {
            scope.popoverShown = true;
            bodyElement.addClass('popoverShown');
            if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                $(window).on("orientationchange",fixPosition);
            }
            fixPosition();
        }

        // Hide if they click outside of popover
        //element.on('click', PopoverService.hidePopover);

        // Prevent hiding if they click inside popover
        templateContainer.on('click', function(e) {e.stopPropagation()});

    }

    return {
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/popover/popover.html'
    };
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsFundingBar', [gsFundingBar]);


function gsFundingBar() {
    function link(scope, element, attrs) {}

    return {
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/giftstart/funding-bar/funding-bar.html'
    };
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('LoginPopoverController', ['$scope', '$http', '$cookieStore', 'UserService',
    'PopoverService','GiftStartService','TwitterService','FacebookService',
    '$location','GooglePlusService','Analytics','AppStateService', 'emailLoginService', '$routeParams', '$timeout',
    LoginPopoverController]);


function LoginPopoverController($scope, $http, $cookieStore, UserService,  PopoverService,
                                GiftStartService,  TwitterService,
                                FacebookService,  $location, GooglePlusService,
                                Analytics,  AppStateService, emailLoginService, $routeParams, $timeout) {

    $scope.loggedIn = UserService.loggedIn;

    $scope.emailFormModel = {
        isLogin: true,
        isLoginCreate: false,
        isForgotPassword: false,
        isEmailLogin: false,
        isReset: false,
        emailname: '',
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
        message: '',
        loginInProgress: false,
        createInProgress: false,
        resetInProgress: false,
        getPwInProgress: false,
        showOk: false
    };

    var mode = ($routeParams.resetCode) ? 'reset' : 'login',
        loginUrl = '';

    var loadingComplete = function () {
        $scope.emailFormModel.loginInProgress = false;
        $scope.emailFormModel.getPwInProgress = false;
        $scope.emailFormModel.createInProgress = false;
        $scope.emailFormModel.resetInProgress = false;
    };

    var resetForm = function () {
        if ($scope.emailLoginForm) {
            $scope.emailLoginForm.$setPristine();
            $scope.emailFormModel.message = '';
        }

    };

    var confirmPasswordCheck = function () {
        if ($scope.emailFormModel.password === $scope.emailFormModel.passwordConfirm) {
            $scope.emailLoginForm.$setValidity('confirmPassword', true);
        } else {
            $scope.emailLoginForm.$setValidity('confirmPassword', false);
        }
    }

    $scope.emailFormActions = {
        createLoginMode: function (event) {
            $scope.emailFormModel.isLoginCreate = true;
            $scope.emailFormModel.isForgotPassword = false;
            $scope.emailFormModel.isLogin = false;
            $scope.emailFormModel.isReset = false;
            resetForm();
            event && event.preventDefault();
        },
        forgotPasswordMode: function (event) {
            $scope.emailFormModel.isLoginCreate = false;
            $scope.emailFormModel.isForgotPassword = true;
            $scope.emailFormModel.isLogin = false;
            $scope.emailFormModel.isReset = false;
            resetForm();
            event && event.preventDefault();
        },
        loginMode: function (event) {
            $scope.emailFormModel.isLoginCreate = false;
            $scope.emailFormModel.isForgotPassword = false;
            $scope.emailFormModel.isLogin = true;
            $scope.emailFormModel.isReset = false;
            resetForm();
            event && event.preventDefault();
        },
        resetMode: function () {
            $scope.emailFormModel.isEmailLogin = true;
            $scope.emailFormModel.isLoginCreate = false;
            $scope.emailFormModel.isForgotPassword = false;
            $scope.emailFormModel.isLogin = false;
            $scope.emailFormModel.isReset = true;
            resetForm();
        },
        submit: function () {
            if ($scope.emailLoginForm.$valid) {
                AppStateService.setPath($location.path());
                emailLoginService.login(
                    mode,
                    $scope.emailFormModel.emailname,
                    $scope.emailFormModel.email,
                    $scope.emailFormModel.password,
                    $routeParams.resetCode).
                    then(function (okMsg) {
                        if (mode === 'create' || mode === 'reset') {

                            if (mode === 'reset') {
                                $scope.emailFormModel.message = okMsg;
                            }

                            $timeout(function () {
                                // Automatic log in
                                $scope.emailFormActions.login();
                                $scope.emailFormActions.submit();

                                $scope.emailFormModel.resetInProgress = false;
                                $scope.emailFormModel.createInProgress = false;
                            }, 1000);
                        } else if (mode === 'forgotPassword') {
                            $scope.emailFormModel.message = okMsg;
                            $scope.emailFormModel.showOk = true;
                        }

                        $scope.emailFormModel.loginInProgress = false;
                        $scope.emailFormModel.getPwInProgress = false;
                    }, function (errMsg) {
                        $scope.emailFormModel.message = errMsg;
                        loadingComplete();
                    });

                console.log("submitting " + mode);
            }
        },
        createLogin: function () {
            Analytics.track('user', 'create email login');
            mode = 'create';

            confirmPasswordCheck();

            if ($scope.emailFormModel.email.toLowerCase() === $scope.emailFormModel.emailConfirm.toLowerCase()) {
                $scope.emailLoginForm.$setValidity('confirmEmail', true);
            } else {
                $scope.emailLoginForm.$setValidity('confirmEmail', false);
            }

            if ($scope.emailLoginForm.$valid) {
                $scope.emailFormModel.createInProgress = true;
            }
        },
        forgotPassword: function () {
            Analytics.track('user', 'forgot login password');
            mode = 'forgotPassword';
            if ($scope.emailLoginForm.$valid) {
                $scope.emailFormModel.getPwInProgress = true;
            }
        },
        reset: function () {
            Analytics.track('user', 'reset login password');
            mode = 'reset';

            confirmPasswordCheck();

            if ($scope.emailLoginForm.$valid) {
                $scope.emailFormModel.resetInProgress = true;
            }
        },
        login: function () {
            Analytics.track('user', 'login attempt with email');
            mode = 'login';
            if ($scope.emailLoginForm.$valid) {
                $scope.emailFormModel.loginInProgress = true;
            }
        }
    };

    if (mode === 'reset') {
        $scope.emailFormActions.resetMode();
    }

    // Check if user is logged in already
    if (UserService.loggedIn) {loginComplete()}


    // Send user to social login site
    function completeLogin(socialService) {
        Analytics.track('user', 'login attempt with ' + socialService);
        AppStateService.setPath($location.path());
        console && console.log && console.log("Setting path", AppStateService.path);
        switch (socialService) {
            case "facebook": FacebookService.login(); break;
            case "twitter": TwitterService.login(); break;
            case "googleplus": GooglePlusService.login(); break;
        }
    }

    //move staged giftstart from browser to server
    function doLogin(socialService) {
        if(AppStateService.get('staged_giftstart')) {
            console && console.log && console.log("staged-create: " + AppStateService.get('staged_giftstart')['staging_uuid']);
            $http.post('/giftstart/create.json', AppStateService.get('staged_giftstart'))
                .success(function (response) {
                    AppStateService.remove('staged_giftstart');
                    completeLogin(socialService);
                })
                .error(function () {
                    console && console.log && console.log("Error while staging GiftStart; retrying...");
                    doLogin(socialService);
                });

        } else {
            completeLogin(socialService);
        }
    }

    // If they aren't, they'll need to log in
    $scope.facebookLogin = function () {doLogin("facebook")};
    $scope.twitterLogin = function() {doLogin("twitter");};
    $scope.googleLogin  = function() {doLogin("googleplus");};

    $scope.hidePopover = PopoverService.hidePopover;

    function loginComplete() {
        Analytics.track('user', 'login succeeded');
        if (/\/create(\/|$)/.test($location.path())) {
            //give login time to propagate
            setTimeout(GiftStartService.createGiftStart,500);
            setTimeout(PopoverService.hidePopover,2500);
        } else if (($location.path().search('giftstart?') != -1) && PopoverService.contributeLogin) {
            PopoverService.contributeLogin = false;
            PopoverService.nextPopover();
        } else {
            PopoverService.hidePopover();
        }
    }

    TwitterService.getAuthUrl();

    $scope.$on('login-success', loginComplete);

}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsLoginPopover',
    function() {return {restrict: 'E',
        templateUrl: '/scripts/popover/login/login-popover.html'}});

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var noteText = '';
    var skipNote = false;

    var notePopoverController = function ($scope, $rootScope, $location, UserService, PopoverService, GiftStartService, Analytics) {
        
        $scope.noteText = noteText;
        $scope.skipNote = skipNote;
        $scope.profilePicture = UserService.profileImageUrl;
        $scope.name = UserService.name;

        $scope.$on('pitchin-image-changed', function (event,imgUrl) {
            $scope.profilePicture = imgUrl;
        });

        $scope.hidePopover = function () {
            PopoverService.hidePopover();
        };

        $scope.editPhoto = function () {
            noteText = $scope.noteText;
            skipNote = $scope.skipNote;
            PopoverService.setPopover('profile');
        };

        $scope.action = {
            submit: function () {
                if ($scope.skipNote) {
                    Analytics.track('pitchin', 'no note submitted');
                    GiftStartService.saveNote(' ', $scope.name);
                } else {
                    Analytics.track('pitchin', 'note submitted');
                    GiftStartService.saveNote($scope.noteText, $scope.name);
                }
                //PopoverService.setPopover('thanks');
                $rootScope.$broadcast('signbox-hidden');
                $scope.skipNote = skipNote = false;
                $scope.noteText = noteText = '';
                $scope.name = UserService.name;
                $scope.profilePicture = UserService.profileImageUrl;
            }
        }
    };

    app.controller('NotePopoverController', ['$scope', '$rootScope', '$location', 'UserService', 'PopoverService','GiftStartService','Analytics', notePopoverController]);
}(angular.module('GiftStarterApp')));


/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsNotePopover',
    function() {return {restrict: 'E',
        templateUrl: '/scripts/popover/note/note-popover.html'}});

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var profilePopoverController = function ($scope, UserService, PopoverService, GiftStartService, Analytics) {

        $scope.profilePicture = UserService.profileImageUrl;
        $scope.useAsProfilePicture = false;
        $scope.editMode = false;

        $scope.user = UserService.user;

        var imageData;

        $scope.imageSet = false;

        $scope.imageUpdated = imageUpdated;

        $scope.userHasDefaultProfileImage = false;

        UserService.isSystemDefaultProfileImage(UserService.uid,
            function(data) {
                $scope.userHasDefaultProfileImage = data;
            }
        );

        function imageUpdated(data) {
            console && console.log && console.log("imageUpdated: "+data);
            $scope.imageSet = true;
            imageData = data;
        }

        function saveUpdatedImage() {
            if($scope.useAsProfilePicture) {
                UserService.uploadProfileImage(imageData)
                    .success(function (newImageUrl) {
                        GiftStartService.saveImage(newImageUrl);
                        UserService.profileImageUrl = newImageUrl;
                        $scope.$parent.$broadcast('pitchin-image-changed',newImageUrl);
                        $scope.$parent.$broadcast('profile-image-changed',newImageUrl);
                    })
                    .error(function (reason) {
                        console && console.log && console.log('Failed to update profile image', reason);
                    });
            } else {
                GiftStartService.uploadImage(imageData)
                    .success(function (newImageUrl) {
                        GiftStartService.saveImage(newImageUrl);
                        $scope.$parent.$broadcast('pitchin-image-changed',newImageUrl);
                    })
                    .error(function (reason) {
                        console && console.log && console.log('Failed to update pitch-in image', reason);
                    });
            }
        }

        $scope.cancel = function () {
            //PopoverService.setPopover('note');
            PopoverService.hidePopover();
        };

        $scope.action = {
            submit: function () {
                if ($scope.imageSet) {
                    saveUpdatedImage();
                    Analytics.track('pitchin', 'user pitchin image '+($scope.useAsProfilePicture?'and profile image ':'')+'changed');
                    //PopoverService.setPopover('note');
                    PopoverService.hidePopover();
                } else {
                    Analytics.track('pitchin', 'user image not changed');
                    //PopoverService.setPopover('note');
                    PopoverService.hidePopover();
                }
                $scope.editMode = false;
            }
        }
    };

    app.controller('ProfilePopoverController', ['$scope','UserService','PopoverService','GiftStartService','Analytics', profilePopoverController]);
}(angular.module('GiftStarterApp')));


/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsProfilePopover',
    function() {return {restrict: 'E',
        templateUrl: '/scripts/popover/profile/profile-popover.html'}});

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('PayPopoverController', ['$scope','$rootScope','GiftStartService',
    'PopoverService','UserService','Analytics','CardService','$timeout',
    PayPopoverController]);

function PayPopoverController($scope, $rootScope, GiftStartService, PopoverService,
                              UserService,  Analytics, CardService, $timeout) {

    $scope.initialize = function() {

        jQuery('.payment form').find("input[type=text], input[type=email]").val('');

        CardService.fetch();

        // Now that user is logged in, create giftstart in server
        if (!GiftStartService.giftStart.gsid) {
            GiftStartService.createGiftStart()
        }

        $scope.currentCharge = GiftStartService.giftStart.totalSelection;
        $scope.emailSubscribe = true;
        $scope.saveCreditCard = true;
        $scope.pitchingIn = false;
        $scope.userOnMailingList = UserService.onMailingList;
        $scope.addressZip = '';
        $scope.email = '';
        $scope.firstname = '';
        $scope.lastname = '';
        if(UserService.loggedIn) {
            UserService.getUser(UserService.uid, function(data) {
                var u = data[Object.keys(data)[0]];
                $scope.email = u.email;
                if(u.name) {
                    var names = u.name.split(" ");
                    if (names.length > 0) {
                        $scope.firstname = names[0];
                    }
                    if (names.length > 1) {
                        $scope.lastname = names[names.length-1];
                    }
                }
            });
        }

        $scope.cards = CardService.cards;
        $scope.putNew = !(CardService.cards.length > 0);
        $scope.showDeleteCardDialogue = false;
        $scope.cardsLoading = !(CardService.cards.length > 0);

        $scope.errorMessage = '';

        $scope.submitted = false;

        $scope.numberImgUrl = '/assets/cc_icon_card_number.png';
        $scope.cvcImgUrl = '/assets/cc_icon_cvc.png';
        $scope.expiryImgUrl = '/assets/cc_icon_expiry.png';
        $scope.zipImgUrl = '/assets/cc_icon_zip.png';
        $scope.emailImgUrl = '/assets/cc_icon_email.png';

    };

    $scope.initialize();

    $scope.hidePopover = function() {
        PopoverService.hidePopover();
        if($scope.submitted) {
            $rootScope.$broadcast('paybox-hidden');
        } else {
            $rootScope.$broadcast('paybox-hidden-cancel');
        }
    };

    $rootScope.$on('paybox-shown',$scope.initialize);

    $scope.updateFormValidity = function() {
        if ($scope.submitted) {
            $scope.numberImgUrl = $scope.stripeForm.$error.card ?
                '/assets/cc_icon_card_number_error.png' : '/assets/cc_icon_card_number.png';
            $scope.cvcImgUrl = $scope.stripeForm.$error.cvc ?
                '/assets/cc_icon_cvc_error.png' : '/assets/cc_icon_cvc.png';
            $scope.expiryImgUrl = $scope.stripeForm.$error.expiry ?
                '/assets/cc_icon_expiry_error.png' : '/assets/cc_icon_expiry.png';
            $scope.zipImgUrl = $scope.addressZip.length != 5 ?
                '/assets/cc_icon_zip_error.png' : '/assets/cc_icon_zip.png';
            $scope.emailImgUrl = $scope.stripeForm.$error.email ?
                '/assets/cc_icon_email_error.png' : '/assets/cc_icon_email.png';
        }
    };

    $scope.trackConversion =  function() {
		Analytics.eventTrack('Completed Order', { 
			id: GiftStartService.giftStart.gsid, 
			uid: UserService.uid, 
			name: $scope.firstname + '' + $scope.lastname, 
			price: GiftStartService.giftStart.totalSelection,
			category: 'Campaign'
		});
    };

    $scope.paypalSubmit = function() {
        // 1. User submits card details in field
        // 4. Client app sends response with card id to server app
        // 5. Server app attempts to charge card, responds with result (success/fail)
        $scope.submitted = true;
        $scope.pitchingIn = true;
        $scope.updateFormValidity();
        GiftStartService.payment.subscribe = $scope.emailSubscribe;
        if ($scope.selectedCard) {
            GiftStartService.payWithFingerprint($scope.selectedCard)
                .success(function (data) {
                    if (data['payment-error']) {
                        $scope.errorMessage = data['payment-error'];
                    } else {
                        $scope.trackConversion();
                    }
                    $timeout(function(){
                        $scope.pitchingIn = false;
                        //$rootScope.$broadcast('paybox-hidden');
                    },1000);
                })
                .error(function(data) {
                    $scope.pitchingIn = false;
                    console&&console.log&&console.log(data);
                    //$rootScope.$broadcast('paybox-hidden');
                });
        } else {
            // Got stripe token, attach it to the current giftstart payment
            Analytics.track('pitchin', 'payment submitted',
                GiftStartService.giftStart.gsid.toString(),
                $scope.currentCharge);
            GiftStartService.attachCardData($scope.number,$scope.cvc,$scope.expiry,$scope.addressZip);
            GiftStartService.payment.emailAddress = $scope.email;
            GiftStartService.payment.firstname = $scope.firstname;
            GiftStartService.payment.lastname = $scope.lastname;
            GiftStartService.payment.saveCreditCard = $scope.saveCreditCard;
            GiftStartService.sendPayment(function (data) {
                if (data['payment-error']) {
                    $scope.errorMessage = data['payment-error'];
                } else {
                    $scope.trackConversion();
                }
                $timeout(function(){
                    $scope.pitchingIn = false;
                    //$rootScope.$broadcast('paybox-hidden');
                },1000);
            });
        }
    };

    $scope.stripeSubmit = function(status, response) {
        // Charge process!
        // 1. User submits card details in field
        // 2. Client app sends details to stripe
        // 3. Stripe validates details and sends response with card id
        // 4. Client app sends response with card id to server app
        // 5. Server app attempts to charge card, responds with result (success/fail)
        $scope.submitted = true;
        $scope.updateFormValidity();
        GiftStartService.payment.subscribe = $scope.emailSubscribe;
        if ($scope.selectedCard) {
            GiftStartService.payWithFingerprint($scope.selectedCard)
                .success(function (data) {
                    $scope.pitchingIn = false;
                    if (data['payment-error']) {
                        console&&console.log&&console.log(data['payment-error']);
                        $scope.errorMessage = data['payment-error'];
                    } else {
                        $scope.trackConversion();
                        $rootScope.$broadcast('paybox-hidden');
                    }
                })
                .error(function(data) {
                    $scope.pitchingIn = false;
                    console&&console.log&&console.log(data);
                    //$rootScope.$broadcast('paybox-hidden');
                });
        } else if (response.error) {
            $scope.pitchingIn = false;
            //$rootScope.$broadcast('paybox-hidden');
            console&&console.log&&console.log(response);
            Analytics.track('pitchin', 'payment error');
        } else {
            // Got stripe token, attach it to the current giftstart payment
            Analytics.track('pitchin', 'payment submitted',
                GiftStartService.giftStart.gsid.toString(),
                $scope.currentCharge);
            GiftStartService.attachStripeResponse(response);
            GiftStartService.payment.emailAddress = $scope.email;
            GiftStartService.payment.saveCreditCard = $scope.saveCreditCard;
            GiftStartService.sendPayment(function (data) {
                $scope.pitchingIn = false;
                if (data['payment-error']) {
                    console&&console.log&&console.log(data['payment-error']);
                    $scope.errorMessage = data['payment-error'];
                } else {
                    $scope.trackConversion();
                    $rootScope.$broadcast('paybox-hidden');
                }
            });
        }
    };

    $scope.$on('payment-success', function() {
        Analytics.track('pitchin', 'payment succeeded',
            GiftStartService.giftStart.gsid.toString(),
            $scope.currentCharge);
        //if(PopoverService.currentLocation=='pay') {
        //    PopoverService.nextPopover();
        //}
        //PopoverService.setPopover('note');
        $scope.pitchingIn = false;
        $rootScope.$broadcast('paybox-hidden');
        $scope.number = '';
        $scope.cvc = '';
        $scope.expiry = '';
        $scope.addressZip = '';
    });

    $scope.$on('cards-fetch-success', cardsFetched);

    $scope.$on('cards-fetch-failure', cardsFetchFailed);

    function cardsFetchFailed() {
        $scope.cardsLoading = false;
    }

    function cardsFetched() {
        $scope.cards = CardService.cards;
        deselectCards();
        //auto-select first card
        if ($scope.cards.length > 0) {
            $scope.selectCard.apply({card: $scope.cards[0]});
        }
        $scope.putNew = !(CardService.cards.length > 0);
        $scope.cardsLoading = false;
    }

    $scope.deselectCards = deselectCards;
    function deselectCards(except) {
        $scope.showDeleteCardDialogue = false;
        $scope.selectedCard = '';
        $scope.selectedLastFour = '';
        for (var i = 0; i < $scope.cards.length; i++) {
            if ($scope.cards[i].fingerprint != except) {
                $scope.cards[i].selected = false;
            }
        }
    }

    $scope.deleteSelectedCard = function() {
        $scope.showDeleteCardDialogue = false;
        if ($scope.selectedCard) {
            CardService.deleteCard($scope.selectedCard)
                .success(function(response){
                    CardService.fetch()
                });
        }
    };

    $scope.selectCard = function(allowToggle) {
        if (this.card.fingerprint == $scope.selectedCard) {
            deselectCards();
        } else {
            deselectCards(this.card.fingerprint);
            this.card.selected = true;
            $scope.selectedCard = this.card.fingerprint;
            $scope.selectedLastFour = this.card.last_four
        }
    };
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsPayPopover',
    function() {return {restrict: 'E',
        templateUrl: '/scripts/popover/pay/pay-popover.html'}});

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

angular.module('GiftStarterApp').service('CardService', ['$rootScope',
    '$http', 'UserService', 'Analytics', cardService]);

function cardService($rootScope, $http, UserService, Analytics) {
    var self = this;

    var brandImgMap = {
        'Visa': '/assets/visa_card.png',
        'visa': '/assets/visa_card.png',
        'American Express': '/assets/amex_card.png',
        'amex': '/assets/amex_card.png',
        'MasterCard': '/assets/mastercard_card.png',
        'mastercard': '/assets/mastercard_card.png',
        'Discover': '/assets/discover_card.png',
        'discover': '/assets/discover_card.png',
        'JCB': '/assets/jcb_card.png',
        'jcb': '/assets/jcb_card.png',
        'Diners Club': '/assets/dinersclub_card.png',
        'diners': '/assets/dinersclub_card.png',
        'Unknown': '/assets/unknown_card.png',
        'unknown': '/assets/unknown_card.png'
    };

    this.cards = [];
    this.fetch = fetchCards;
    this.deleteCard = deleteCard;

    function fetchCards() {
        if(UserService.uid!=-1) {
            Analytics.track('client', 'user cards fetch started');
            return $http({method: 'GET', url: '/users/' + UserService.uid +
                '/cards.json'})
                .success(handleCardResponse)
                .error(function(reason) {
                    $rootScope.$broadcast('cards-fetch-failure');
                    Analytics.track('client', 'user cards fetch failed');

                });
        }
    }

    function deleteCard(fingerprint) {
        Analytics.track('client', 'user card deleted');
        var deleteIndex = -1;
        for (var i = 0; i < this.cards.length; i++) {
            if(this.cards[i].fingerprint == fingerprint) {deleteIndex=i;}
        }
        if(deleteIndex>=0) {this.cards.splice(deleteIndex, 1);}
        return $http({method: 'POST', url: '/users/' + UserService.uid +
            '/cards.json', data: {action: 'delete-card', fingerprint: fingerprint}});
    }

    function addCardImage(card) {
        var newCard = card;
        newCard.brandImage = brandImgMap[card.brand];
        return newCard;
    }

    function handleCardResponse(data) {
        Analytics.track('client', 'user cards fetch succeeded');
        if (typeof data == 'string') {
            self.cards = JSON.parse(data).map(addCardImage);
        } else {
            self.cards = data.map(addCardImage);
        }
        $rootScope.$broadcast('cards-fetch-success');
        return self.cards;
    }

    return this;
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('ThanksPopoverController', ['$scope',
    'PopoverService','GiftStartService','UserService','FacebookService',
    'TwitterService','GooglePlusService','Analytics',
    ThanksPopoverController]);

function ThanksPopoverController($scope,  PopoverService,  GiftStartService,
                                 UserService,  FacebookService,
                                 TwitterService, GooglePlusService,
                                 Analytics) {

    $scope.close = function(){PopoverService.hidePopover()};

    $scope.mailSubject = "Join us on a gift together";
    $scope.mailBody= "I thought you might be interested in pitching in on this GiftStarter campaign:%0D%0A%0D%0Ahttp://www.giftstarter.com/giftstart?gs-id="
        + GiftStartService.giftStart.gsid;


    $scope.emailShare = function() {
        Analytics.track('campaign', 'email share from campaign');
        if (device.desktop()) {
            PopoverService.setPopover('email-share');
        } else {
            $window.location.href = "mailto:?subject=" + $scope.mailSubject +
                "&body=" + $scope.mailBody();
        }
    };

    $scope.facebookMsg = function() {
        Analytics.track('campaign', 'facebook share from thanks');
        FacebookService.inviteFriends(UserService.uid);
    };
    $scope.facebookShare = function() {
        Analytics.track('campaign', 'facebook share from thanks');
        //FacebookService.inviteFriends(UserService.uid, 'share');
        FB.ui(
         {
          method: 'share',
          href: $location.absUrl()
        }, function(response){});
        FB.Canvas.setAutoGrow();
    };


    $scope.twitterShare = function() {
        Analytics.track('campaign', 'twitter share from thanks');
        TwitterService.share(UserService.uid);
    };

    $scope.googlePlusShare = function() {
        Analytics.track('campaign', 'googleplus share from thanks');
        GooglePlusService.share(UserService.uid);
    };

    $scope.hidePopover = PopoverService.hidePopover;
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsThanksPopover',
    function() {return {restrict: 'E',
        templateUrl: '/scripts/popover/thanks/thanks-popover.html'}});

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var emailSharePopoverController = function ($scope,
                                                PopoverService,
                                                $http,
                                                UserService,
                                                Analytics,
                                                GiftStartService,
                                                $location) {

        var email = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+\.([a-z0-9-]+)+$/i,
            emails;

        var trackEmailClientClick = function () {
            Analytics.track('client', 'email client share clicked');
        };

        var sendEmail = function (to, from, message, share_url) {
            Analytics.track('campaign', 'email share submitted');
            $scope.sending = true;
            $http({
                method: 'PUT',
                url: '/giftstart/share',
                data: {
                    to: to,
                    from: from,
                    message: message,
                    share_url: share_url,
                    gsid: GiftStartService.giftStart.gsid,
                    sender_name: UserService.name,
                    sender_uid: UserService.uid
                }
            })
            .success(function() {
                Analytics.track('campaign', 'email share succeeded');
                $scope.sending = false;
                $scope.toEmails = '';
                $scope.fromEmail = '';
                $scope.message = '';
                $scope.hidePopover();
            })
            .error(function() {
                $scope.sending = false;
                Analytics.track('campaign', 'email share failed');
            });
        };

        $scope.toEmails = '';
        $scope.fromEmail = UserService.email;
        $scope.userSvcName = UserService.name;
        $scope.gsName = GiftStartService.giftStart.title
        $scope.formValid = true;
        $scope.message = "I thought you might be interested in pitching in on this GiftStarter campaign:";
        $scope.formValid = true;
        $scope.emailUrl = "mailto:?subject=" +
                          encodeURI("Join us on a gift together") +
                          "&body=" +
                          encodeURI("I thought you might be interested in pitching in on this GiftStarter campaign:\n\n" +
                          $location.absUrl());

        $scope.sending = false;

        $scope.hidePopover = PopoverService.hidePopover;

        $scope.trackEmailClientClick = trackEmailClientClick;

        $scope.submit = function () {
            emails = $scope.toEmails
                .replace(/[ \n]/g, "")
                .split(/[,;]/)
                .filter(function (eml) { return eml !== ''; });

            $scope.formValid = emails.length > 0 && emails.every(function (s) { return email.test(s) }) && email.test($scope.fromEmail);

            if ($scope.formValid) {
                $location.search('re', btoa(JSON.stringify({
                    type: 'consumer',
                    uid: UserService.uid,
                    channel: 'email',
                    uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    })
                })));
                sendEmail(emails, $scope.fromEmail, $scope.message, $location.absUrl());
                $location.search('re', null);
            }
        };
    };

    app.controller('EmailSharePopoverController', [
        '$scope',
        'PopoverService',
        '$http',
        'UserService',
        'Analytics',
        'GiftStartService',
        '$location',
        emailSharePopoverController
    ]);

}(angular.module('GiftStarterApp')));

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsEmailSharePopover',
    function() {return {restrict: 'E',
        templateUrl: '/scripts/popover/email-share/email-share-popover.html'}});

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    var sweepStakesDirective = function ($http, PopoverService) {
        var link = function (scope, element, attr) {
            scope.model = {
                first: '',
                last: '',
                email: '',
                message: ''
            };

            scope.close = function () {
                PopoverService.hidePopover();
            };

            scope.submit = function () {
                if (scope.sweepForm.$valid) {
                    $http.post('/users/sweepstakes.json',{
                        firstname: scope.model.first,
                        lastname: scope.model.last,
                        email: scope.model.email
                    })
                    .success(function (res) {
                        scope.model.message = res['ok'];
                        PopoverService.hidePopover();
                    })
                    .error(function (res) {
                        scope.model.message = res['error'];
                    });
                }
            }
        };

        return {
            restrict: 'E',
            scope: {},
            link: link,
            templateUrl: '/scripts/popover/sweepstakes/sweepstakes-popover.html'
        };
    };

    app.directive('gsSweepstakesPopover', ['$http', 'PopoverService', sweepStakesDirective]);
}(angular.module('GiftStarterApp')));
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
GiftStarterApp.controller('StaffPicksController', ['$scope','$timeout',
    StaffPicksController]);

function StaffPicksController($scope, $timeout) {
    var product = function(image, price, title, desc, avatar, link) {
        this.image = image;
        this.price = price;
        this.title = title;
        this.desc = desc;
        this.avatar = avatar;
        this.link = link;
    };
    $scope.products = [
        new product(
            "/assets/staffpicks/4momsBreeze.jpg",
            "$299.99",
            "4moms® Breeze®",
            "This is the one thing I repeatedly wish I would have splurged on. Typical pack and plays are such a pain to set up and take down, I long for the ease of this one every time!",
            "/assets/about/img/christie.png",
            "https://www.giftstarter.com/giftideas/baby/4moms-Breeze-Playard"
        ),
        new product(
            "/assets/staffpicks/lumixgh4.jpg",
            "$1,497.99",
            "Lumix GH4",
            "It's an amazing video-centric DSLR. The Lumix GH4 shoots 4k at 24p, supports VFR and unlimited length, and boasts clean HDMI out and onboard WiFi & NFC – all at half the price of a Canon 5D!",
            "/assets/about/img/jon.png",
            "https://www.giftstarter.com/search/lumix%20gh4"
        ),
        new product(
            "/assets/giftideas/category/electronics/apple-watch-milanese.jpg",
            "$699.99",
            "The Apple Watch Milanese",
            "I love all things tech - so I gotta try it! This band is something I would totally wear every day and even out to a dinner party. I bet my husband would steal it and wear it sometimes too.",
            "/assets/about/img/arry.png",
            "https://www.giftstarter.com/giftideas/electronics/Apple-Watch-Milanese"
        ),
        new product(
            "/assets/staffpicks/hue-personal-wireless-light.jpg",
            "$199.99",
            "Hue Personal Wireless Light",
            "The Philips Hue Personal Wireless Lighting Kit connects to your home Wi-Fi and" +
            " up to 50 Philips Hue Bulbs/Lighting. It is the most exciting and unique product. " +
            "The lights sync with an alarm, sets on schedules, " +
            "and the IFTTT connectivity to other 3rd party apps is mindblowing.",
            "/assets/about/img/roy.png",
            "https://www.giftstarter.com/giftideas/electronics/Hue-Personal-Wireless-Light"
        ),
        new product(
            "/assets/staffpicks/uppababy-stroller-2015.jpg",
            "$299.99",
            "UPPAbaby Vista Stroller 2015",
            "It’s the only stroller you’ll ever need. First kid? Use the seat, carseat, or bassinet. Two kids? Attach a second of any of those. Three kids? Add the skateboard to the back. It looks right no matter what configuration you have, and it’s full of features.",
            "/assets/about/img/christie.png",
            "https://www.giftstarter.com/giftideas/baby/UPPAbaby-Stroller-2015"
        ),
        new product(
            "/assets/staffpicks/steelseries-headset-white-thumb.jpg",
            "$159.99",
            "SteelSeries Headphones with Inline Mic",
            "This is a great gift if you need headphones for gaming, streaming, or everyday. It's got inline mic for streaming, looks nice, and is very comfortable.",
            "/assets/about/img/sharon.png",
            "https://www.giftstarter.com/giftideas/electronics/SteelSeries-Headset-White"
        ),
        new product(
            "/assets/staffpicks/brother-thread-serger.jpg",
            "$299.99",
            "Brother Thread Serger",
            "I have my mother’s old sewing machine, but I find for many of my projects a serger would be ideal. This one is very user friendly for novices, with advanced features for experienced users.",
            "/assets/about/img/christie.png",
            "https://www.giftstarter.com/giftideas/forher/Brother-Thread-Serger"
        ),
        new product(
            "/assets/staffpicks/guava-lotus-everywhere-crib.jpg",
            "$509.00",
            "Lotus Everywhere Crib",
            "Transforms from backpack to standard-size crib in under a minute. Lightweight yet stable, with zippered mesh sides and an optional sun-shade, it's perfect for travel AND as a primary sleep-space or play area for your little one.",
            "/assets/about/img/jon.png",
            "https://www.giftstarter.com/giftideas/baby/Guava-Lotus-Everywhere-Crib"
        ),
        new product(
            "/assets/staffpicks/deathadder-gaming-mouse-thumb.jpg",
            "$59.99",
            "Razer Gaming Mouse",
            "This is the ultimate mouse for gaming and everyday use and it's ergonomic, too!!",
            "/assets/about/img/sharon.png",
            "https://www.giftstarter.com/giftideas/electronics/DeathAdder-Gaming-Mouse"
        )
    ];
    var n = 0;
    $scope.firstProduct = $scope.products[n];
    $scope.secondProduct = $scope.products[(n+1)%$scope.products.length];
    var rotate = function() {
        jQuery('.product-item.first').fadeOut(500, function() {
            n = (n + 1) % $scope.products.length;
            $scope.$apply(function() {$scope.firstProduct = $scope.products[n]});
            jQuery('.product-item.second').fadeOut(500, function() {
                $scope.$apply(function() {$scope.secondProduct = $scope.products[(n+1)%$scope.products.length]});
            });
            jQuery('.product-item.first').fadeIn(1000);
            jQuery('.product-item.second').fadeIn(1000);
            timer = $timeout(rotate, 20000);
        });
    };
    var timer = $timeout(rotate, 20000);

    $scope.$on('$destroy', function() {$timeout.cancel(timer);});
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsImageUpload', gsImageUpload);

function gsImageUpload($timeout, $window) {

    function link(scope, element, attrs) {

        var inputEle = document.querySelector('.thanks-image-input');
        var canvasEle = element.children()[0].children[0];
        var ctx = canvasEle.getContext('2d');
        var aspect = attrs.aspect;
        var gsElement = element[0];

        scope.openImageDialog = function () {
            inputEle.click();
        };

        scope.$parent.openImageDialogGlobal = function () {
            scope.openImageDialog();
        };

        // Size canvas to container
        function resizeCanvas() {
            canvasEle.width = gsElement.parentElement.offsetWidth * 2;
            if (aspect) {
                canvasEle.height = gsElement.offsetWidth * 2 / aspect;
            } else {
                canvasEle.height = gsElement.offsetHeight * 2;
            }
        }

        resizeCanvas();

        // Initialize image from localStorage
        if ($window.localStorage.getItem('thank-you-image')) {
            reader = {result: $window.localStorage.getItem('thank-you-image')};
            $window.localStorage.removeItem('thank-you-image');
            makeImage(reader.result);
        }

        // Callback for uploading file
        var reader;
        scope.putImage = function putImage(file) {
            reader = new FileReader();
            reader.onloadend = fileLoaded;
            reader.readAsDataURL(file);
        };

        function setImageRot(orientation) {
            switch (orientation) {
                case 8:
                    ctx.rotate(90 * Math.PI / 180);
                    break;
                case 3:
                    ctx.rotate(180 * Math.PI / 180);
                    break;
                case 6:
                    ctx.rotate(-90 * Math.PI / 180);
                    break;
            }
        }

        function makeImage(imageData) {
            resizeCanvas();
            var tempImg = new Image();
            tempImg.src = imageData;

            tempImg.onload = function imageLoaded() {
                var imageW = tempImg.width;
                var imageH = tempImg.height;
                var rotation = 0;

                if (imageW > imageH) {
                    imageW *= canvasEle.width / imageH;
                    imageH = canvasEle.height;
                } else {
                    imageH *= canvasEle.height / imageW;
                    imageW = canvasEle.width;
                }

                var imageContext = this;
                ctx.drawImage(this, 0, 0, imageW, imageH);
                scope.imageUpdated(canvasEle.toDataURL());

                scope.rotateImage = function rotateImage() {
                    ctx.translate(canvasEle.width / 2, canvasEle.height / 2);
                    rotation = (rotation + 1) % 4;
                    ctx.rotate(Math.PI / 2);
                    ctx.translate(-canvasEle.width / 2, -canvasEle.height / 2);
                    ctx.drawImage(imageContext, imgX, imgY,
                        imageW, imageH);
                    scope.imageUpdated(canvasEle.toDataURL());
                };

                var dragReady = true;
                var dragPrevX = 0;
                var dragPrevY = 0;
                var imgX = 0;
                var imgY = 0;
                var dragNextX = 0;
                var dragNextY = 0;
                var dragging = false;
                angular.element(canvasEle)
                    .on('mousedown touchstart', function (event) {
                        if (dragReady) {
                            dragReady = false;
                            $timeout(function () {
                                dragReady = true;
                            }, 100);

                            dragging = true;
                            dragPrevX = event.screenX ||
                                event.touches.item(0).screenX;
                            dragNextX = dragPrevX;
                            dragPrevY = event.screenY ||
                                event.touches.item(0).screenY;
                            dragNextY = dragPrevY;
                        }
                    });
                angular.element(canvasEle)
                    .on('mouseup touchend mouseleave touchleave',
                    function (event) {
                        dragging = false;
                        scope.imageUpdated(canvasEle.toDataURL());
                    });
                angular.element(canvasEle)
                    .on('mousemove touchmove', function (event) {
                        if (dragging) {
                            event.preventDefault();
                            // Transform drag based on rotation
                            switch (rotation) {
                                case 0:
                                    imgX += dragNextX - dragPrevX;
                                    imgY += dragNextY - dragPrevY;
                                    break;
                                case 1:
                                    if (imageW > imageH) {
                                        imgX += dragNextY - dragPrevY;
                                        imgY += dragNextX - dragPrevX;
                                    } else {
                                        imgX -= dragNextY - dragPrevY;
                                        imgY -= dragNextX - dragPrevX;
                                    }
                                    break;
                                case 2:
                                    imgX -= dragNextX - dragPrevX;
                                    imgY -= dragNextY - dragPrevY;
                                    break;
                                case 3:
                                    if (imageW > imageH) {
                                        imgX -= dragNextY - dragPrevY;
                                        imgY -= dragNextX - dragPrevX;
                                    } else {
                                        imgX += dragNextY - dragPrevY;
                                        imgY += dragNextX - dragPrevX;
                                    }
                                    break;
                            }

                            dragPrevX = dragNextX;
                            dragNextX = event.screenX ||
                                event.touches.item(0).screenX;
                            dragPrevY = dragNextY;
                            dragNextY = event.screenY ||
                                event.touches.item(0).screenY;
                            if (imgX > 0) {
                                imgX = 0
                            }
                            if (imgY > 0) {
                                imgY = 0
                            }
                            if (imageH + imgY < canvasEle.height) {
                                imgY = canvasEle.height - imageH;
                                dragPrevY = dragNextY;
                            }
                            if (imageW + imgX < canvasEle.width) {
                                imgX = canvasEle.width - imageW;
                                dragPrevX = dragNextX;
                            }

                            ctx.drawImage(imageContext, imgX, imgY,
                                imageW, imageH);
                        }
                    });

            };
        }


        function fileLoaded() {
            // Cache thank-you image
            try {
                $window.localStorage.setItem('thank-you-image', reader.result);
            } catch (exception) {
                console && console.log && console.log("Unable to store image in localStorage",
                    exception);
            }
            makeImage(reader.result);
            scope.$parent.imgloading = false;
        }

        function fileChanged() {
            scope.putImage(inputEle.files[0]);
        }
        angular.element(inputEle).on('change', function () {
            scope.$parent.imgloading = true;
            $timeout(function () {
                fileChanged();
            }, 100);
        });
    }

    return {
        restrict: 'E',
        scope: {imageUpdated: '=onImageUpdated', imageData: '=newImageData'},
        link: link,
        templateUrl: '/scripts/utilities/image-upload/image-upload.html'
    };
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('LocalStorage', ['$window', LocalStorage]);

function LocalStorage($window) {

    this.set = set;
    this.get = get;
    this.remove = remove;

    function set(key, data) {
        var item = data;
        if (typeof data != 'string') {
            item = JSON.stringify(data);
        }
        $window.localStorage.setItem(key, item);
    }

    function get(key) {
        var item = $window.localStorage.getItem(key);
        try {
            item = JSON.parse(item);
        } catch (e) {}
        return item;
    }

    function remove(key) {
        $window.localStorage.removeItem(key);
    }
}
// Include the UserVoice JavaScript SDK (only needed once on a page)
UserVoice=window.UserVoice||[];(function(){var uv=document.createElement('script');uv.type='text/javascript';uv.async=true;uv.src='//widget.uservoice.com/N48EEGX3xi555mzpZNQw.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s)})();

//
// UserVoice Javascript SDK developer documentation:
// https://www.uservoice.com/o/javascript-sdk
//

// Set colors
UserVoice.push(['set', {
    accent_color: '#e23a39',
    trigger_color: 'white',
    trigger_background_color: '#df484b'
}]);

// Identify the user and pass traits
// To enable, replace sample data with actual user traits and uncomment the line
UserVoice.push(['identify', {
    //email:      'john.doe@example.com', // User’s email address
    //name:       'John Doe', // User’s real name
    //created_at: 1364406966, // Unix timestamp for the date the user signed up
    //id:         123, // Optional: Unique id of the user (if set, this should not change)
    //type:       'Owner', // Optional: segment your users by type
    //account: {
    //  id:           123, // Optional: associate multiple users with a single account
    //  name:         'Acme, Co.', // Account name
    //  created_at:   1364406966, // Unix timestamp for the date the account was created
    //  monthly_rate: 9.99, // Decimal; monthly rate of the account
    //  ltv:          1495.00, // Decimal; lifetime value of the account
    //  plan:         'Enhanced' // Plan name for the account
    //}
}]);

// Add default trigger to the bottom-right corner of the window:
//UserVoice.push(['addTrigger', { mode: 'contact', trigger_position: 'bottom-right' }]);

// Or, use your own custom trigger:
//UserVoice.push(['addTrigger', '#id', { mode: 'contact' }]);

// Autoprompt for Satisfaction and SmartVote (only displayed under certain conditions)
UserVoice.push(['autoprompt', {}]);
(function () {
    GiftStarterApp.directive('clamp', clampDirective);

    clampDirective.$inject = ['$timeout'];
    function clampDirective($timeout) {
        var directive = {
            restrict: 'A',
            link: linkDirective
        };

        return directive;

        function linkDirective(scope, element, attrs) {
            $timeout(function () {
                var lineCount = 1, lineMax = +attrs.clamp;
                var lineStart = 0, lineEnd = 0;
                var text = element.html().replace(/\n/g, ' ');
                var maxWidth = element[0].offsetWidth;
                var estimateTag = createElement();

                element.empty();
                element.append(estimateTag);

                text.replace(/ /g, function (m, pos) {
                    if (lineCount >= lineMax) {
                        return;
                    } else {
                        estimateTag.html(text.slice(lineStart, pos));
                        if (estimateTag[0].offsetWidth > maxWidth) {
                            estimateTag.html(text.slice(lineStart, lineEnd));
                            resetElement(estimateTag);
                            lineCount++;
                            lineStart = lineEnd + 1;
                            estimateTag = createElement();
                            element.append(estimateTag);
                        }
                        lineEnd = pos;
                    }
                });
                estimateTag.html(text.slice(lineStart));
                resetElement(estimateTag, true);

                scope.$emit('clampCallback', element, attrs);
            });
        }
    }

    return;

    function createElement() {
        var tagDiv = document.createElement('div');
        (function (s) {
            s.position = 'absolute';
            s.whiteSpace = 'pre';
            s.visibility = 'hidden';
            s.display = 'inline-block';
        })(tagDiv.style);

        return angular.element(tagDiv);
    }

    function resetElement(element, type) {
        element.css({
            position: 'inherit',
            overflow: 'hidden',
            display: 'block',
            textOverflow: (type ? 'ellipsis' : 'clip'),
            visibility: 'inherit',
            whiteSpace: 'nowrap',
            width: '100%'
        });
    }
})();

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

angular.module('GiftStarterApp').directive('gsItButton', ['GiftStartService',
    gsItButton]);

function gsItButton(GiftStartService) {

    // Things I need:
    // product url
    // product title
    // product price
    // product img url

    function link(scope, ele, attrs) {
        var anchor = ele[0].children[0].children[0];
        anchor.href = calculateLink();
    }

    function calculateLink() {
        console && console.log && console.log(GiftStartService.giftStart);
        return url = '/create?' + urlSerialize({
                product_url: GiftStartService.giftStart.product_url,
                title: GiftStartService.giftStart.product_title,
                price: GiftStartService.giftStart.price,
                img_url: GiftStartService.giftStart.product_img_url,
                source: 'GiftStarter'
            });
    }

    var urlSerialize = function(obj) {
        var str = [];
        for(var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" +
                encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };

    return {
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/button/giftstart-it-button.ng.html'
    }
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

angular.module('GiftStarterApp').directive('gsItHeader', ['$interval',
    '$window', '$location', 'Analytics', gsItHeader]);

function gsItHeader($interval, $window, $location, Analytics) {

    var $scope,
        shown = $location.path().indexOf('/giftstart') != 0;

    function link(scope, ele, attr) {
        $scope = scope;

        $scope.hideButtonHeader = hideButtonHeader;
        $scope.linkClicked = linkClicked;

        function hideButtonHeader() {$scope.shown = false}
        function showButtonHeader() {$scope.shown = true}
        function onScroll() {
            if (!shown) {
                if (200 < ($window.scrollY || $window.scrollTop)) {
                    shown = true;
                    showButtonHeader();
                }
            }
        }

        function linkClicked() {
            Analytics.track('client', 'giftstart it header button clicked');
        }

        scope.$on('$routeChangeStart', hideButtonHeader);

        var interval = $interval(onScroll, 2000);
    }

    return {
        scope: $scope,
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/header/giftstart-it-header.ng.html'
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

angular.module('GiftStarterApp').directive('gsSubscribeHeader', ['$location',
    'Analytics', '$timeout', 'UserService', gsSubscribeHeader]);

function gsSubscribeHeader($location, Analytics, $timeout, UserService) {
    var $scope,
        show = $location.path().indexOf('/giftstart') == -1 &&
            !UserService.onMailingList;

    function link(scope, ele, attr) {
        $scope = scope;

        $scope.subscribeShow = true;
        $scope.hideSubscribeHeader = hideHeader;
        $scope.subscribeClicked = subscribeClicked;

        function hideHeader() {$scope.subscribeShow = false}
        function showHeader() {$scope.subscribeShow = true}

        function subscribeClicked() {
            Analytics.track('client', 'header email subscribed');
        }

        $timeout(function() {
            if (show) {
                showHeader();
                show = false;
            }
        }, 1500);
    }

    return {
        scope: $scope,
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/header/subscribe-header.ng.html'
    }
}
