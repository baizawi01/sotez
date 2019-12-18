!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}(global,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=11)}([function(e,t){e.exports=require("typedarray-to-buffer")},function(e,t){e.exports=require("libsodium-wrappers")},function(e,t){e.exports=require("bignumber.js")},function(e,t){e.exports=require("bs58check")},function(e,t){e.exports=require("pbkdf2")},function(e,t){e.exports=require("elliptic")},function(e,t){e.exports=require("@ledgerhq/hw-transport-node-hid")},function(e,t){e.exports=require("buffer/")},function(e,t){e.exports=require("bip39")},function(e,t){e.exports=require("xhr2")},function(e,t){e.exports=require("blake2b")},function(e,t,r){"use strict";r.r(t);var n=r(9),i=r.n(n);class s{constructor(e,t){this._provider=e,this._chain=t}get provider(){return this._provider}set provider(e){this._provider=e}get chain(){return this._chain}set chain(e){this._chain=e}setProvider(e,t=this.chain){this._provider=e,this._chain=t}}var o=r(1),a=r(4),c=r(5),u=r(0),h=r.n(u),p=r(6),l=r.n(p),d=r(3),g=r.n(d),f=r(10),y=r.n(f);function b(e){const t=[];return e.split("/").forEach(e=>{let r=parseInt(e,10);Number.isNaN(r)||(e.length>1&&"'"===e[e.length-1]&&(r+=2147483648),t.push(r))}),t}const m=e=>{switch(e){case 0:return Buffer.of(13,15,37,217);case 1:return Buffer.of(3,254,226,86);case 2:return Buffer.of(3,178,139,127);default:return Buffer.of(0)}},v=e=>{switch(e){case 0:return Buffer.of(6,161,159);case 1:return Buffer.of(6,161,161);case 2:return Buffer.of(6,161,164);default:return Buffer.of(0)}},_=(e,t)=>(e=((e,t)=>{switch(t){case 0:return(e=e.slice(0))[0]=t,e;case 1:case 2:return Buffer.concat([Buffer.of(t,2+(1&e[64])),e.slice(1,33)]);default:return Buffer.of(0)}})(e,t),{publicKey:w(e),address:k(e)}),w=e=>{const t=e[0],r=e.slice(1);return g.a.encode(Buffer.concat([m(t),r]))},k=e=>{const t=e[0],r=e.slice(1);let n=y()(20);return n.update(r),n.digest(n=Buffer.alloc(20)),g.a.encode(Buffer.concat([v(t),n]))};var A=function(e,t,r,n){return new(r||(r=Promise))((function(i,s){function o(e){try{c(n.next(e))}catch(e){s(e)}}function a(e){try{c(n.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,a)}c((n=n.apply(e,t||[])).next())}))};class E{constructor(e){this.transport=e,e.decorateAppAPIMethods(this,["getAddress","signOperation","getVersion"],"XTZ")}getAddress(e,t=!1,r=0,n){return A(this,void 0,void 0,(function*(){n||(n=t?3:2);const i=r,s=b(e),o=Buffer.alloc(1+4*s.length);o[0]=s.length,s.forEach((e,t)=>{o.writeUInt32BE(e,1+4*t)});const a=yield this.transport.send(128,n,0,i,o),c=a[0],u=a.slice(1,1+c);return _(u,r)}))}sign(e,t,r=0,n){return A(this,void 0,void 0,(function*(){const i=b(e);let s=0;const o=Buffer.from(t,"hex"),a=[],c=Buffer.alloc(4*i.length+1);for(c[0]=i.length,i.forEach((e,t)=>{c.writeUInt32BE(e,1+4*t)}),a.push(c);s!==o.length;){const e=230;let t;t=s+e>=o.length?o.length-s:e;const r=Buffer.alloc(t);o.copy(r,0,s,s+t),a.push(r),s+=t}let u,h;for(let e=0;e<a.length;e++){const t=a[e];let i=1;0===e?i=0:e===a.length-1&&(i=129),u=yield this.transport.send(128,n,i,r,t)}if(0===r)h=u.slice(0,u.length-2).toString("hex");else{let e=Buffer.alloc(64);e.fill(0);let t=e.subarray(0,32),r=e.subarray(32,64),n=0;const i=u.readUInt8(n++);if(49!==i&&48!==i)throw new Error("Cannot parse ledger response.");if(u.readUInt8(n++)+4!==u.length)throw new Error("Cannot parse ledger response.");if(2!==u.readUInt8(n++))throw new Error("Cannot parse ledger response.");let s=u.readUInt8(n++);if(s>32&&(n+=s-32,s=32),u.copy(t,32-s,n,n+s),n+=s,2!=u.readUInt8(n++))throw new Error("Cannot parse ledger response.");let o=u.readUInt8(n++);if(o>32&&(n+=o-32,o=32),u.copy(r,32-o,n,n+o),n+=o,n!==u.length-2)throw new Error("Cannot parse ledger response.");h=e.toString("hex")}return{signature:h}}))}signOperation(e,t,r=0){return this.sign(e,t,r,4)}signHash(e,t,r=0){return this.sign(e,t,r,5)}getVersion(){return A(this,void 0,void 0,(function*(){const[e,t,r,n]=yield this.transport.send(128,0,0,0,Buffer.alloc(0));return{major:t,minor:r,patch:n,bakingApp:1===e}}))}}const x={tz1:new Uint8Array([6,161,159]),tz2:new Uint8Array([6,161,161]),tz3:new Uint8Array([6,161,164]),KT:new Uint8Array([2,90,121]),edpk:new Uint8Array([13,15,37,217]),edsk2:new Uint8Array([13,15,58,7]),spsk:new Uint8Array([17,162,224,201]),p2sk:new Uint8Array([16,81,238,189]),sppk:new Uint8Array([3,254,226,86]),p2pk:new Uint8Array([3,178,139,127]),edesk:new Uint8Array([7,90,60,179,41]),edsk:new Uint8Array([43,246,78,7]),edsig:new Uint8Array([9,245,205,134,18]),spsig:new Uint8Array([13,115,101,19,63]),p2sig:new Uint8Array([54,240,44,52]),sig:new Uint8Array([4,130,43]),Net:new Uint8Array([87,82,0]),nce:new Uint8Array([69,220,169]),b:new Uint8Array([1,52]),o:new Uint8Array([5,116]),Lo:new Uint8Array([133,233]),LLo:new Uint8Array([29,159,109]),P:new Uint8Array([2,170]),Co:new Uint8Array([79,179]),id:new Uint8Array([153,103]),TZ:new Uint8Array([2,90,121])},S={block:new Uint8Array([1]),endorsement:new Uint8Array([2]),generic:new Uint8Array([3])},$={"00":"parameter","01":"storage","02":"code","03":"False","04":"Elt","05":"Left","06":"None","07":"Pair","08":"Right","09":"Some","0A":"True","0B":"Unit","0C":"PACK","0D":"UNPACK","0E":"BLAKE2B","0F":"SHA256",10:"SHA512",11:"ABS",12:"ADD",13:"AMOUNT",14:"AND",15:"BALANCE",16:"CAR",17:"CDR",18:"CHECK_SIGNATURE",19:"COMPARE","1A":"CONCAT","1B":"CONS","1C":"CREATE_ACCOUNT","1D":"CREATE_CONTRACT","1E":"IMPLICIT_ACCOUNT","1F":"DIP",20:"DROP",21:"DUP",22:"EDIV",23:"EMPTY_MAP",24:"EMPTY_SET",25:"EQ",26:"EXEC",27:"FAILWITH",28:"GE",29:"GET","2A":"GT","2B":"HASH_KEY","2C":"IF","2D":"IF_CONS","2E":"IF_LEFT","2F":"IF_NONE",30:"INT",31:"LAMBDA",32:"LE",33:"LEFT",34:"LOOP",35:"LSL",36:"LSR",37:"LT",38:"MAP",39:"MEM","3A":"MUL","3B":"NEG","3C":"NEQ","3D":"NIL","3E":"NONE","3F":"NOT",40:"NOW",41:"OR",42:"PAIR",43:"PUSH",44:"RIGHT",45:"SIZE",46:"SOME",47:"SOURCE",48:"SENDER",49:"SELF","4A":"STEPS_TO_QUOTA","4B":"SUB","4C":"SWAP","4D":"TRANSFER_TOKENS","4E":"SET_DELEGATE","4F":"UNIT",50:"UPDATE",51:"XOR",52:"ITER",53:"LOOP_LEFT",54:"ADDRESS",55:"CONTRACT",56:"ISNAT",57:"CAST",58:"RENAME",59:"bool","5A":"contract","5B":"int","5C":"key","5D":"key_hash","5E":"lambda","5F":"list",60:"map",61:"big_map",62:"nat",63:"option",64:"or",65:"pair",66:"set",67:"signature",68:"string",69:"bytes","6A":"mutez","6B":"timestamp","6C":"unit","6D":"operation","6E":"address","6F":"SLICE",70:"DIG",71:"DUG",72:"EMPTY_BIG_MAP",73:"APPLY",74:"chain_id",75:"CHAIN_ID"},P=(()=>{const e={};return Object.keys($).forEach(t=>{e[$[t]]=t}),e})(),U={"00":"default","01":"root","02":"do","03":"set_delegate","04":"remove_delegate"},O=(()=>{const e={};return Object.keys(U).forEach(t=>{e[U[t]]=t}),e})(),T={opMapping:$,opMappingReverse:P,primMapping:{"00":"int","01":"string","02":"seq","03":{name:"prim",len:0,annots:!1},"04":{name:"prim",len:0,annots:!0},"05":{name:"prim",len:1,annots:!1},"06":{name:"prim",len:1,annots:!0},"07":{name:"prim",len:2,annots:!1},"08":{name:"prim",len:2,annots:!0},"09":{name:"prim",len:3,annots:!0},"0A":"bytes"},primMappingReverse:{0:{false:"03",true:"04"},1:{false:"05",true:"06"},2:{false:"07",true:"08"},3:{true:"09"}},forgeOpTags:{"001":{endorsement:0,seed_nonce_revelation:1,double_endorsement_evidence:2,double_baking_evidence:3,activate_account:4,proposals:5,ballot:6,reveal:7,transaction:8,origination:9,delegation:10},"005":{endorsement:0,seed_nonce_revelation:1,double_endorsement_evidence:2,double_baking_evidence:3,activate_account:4,proposals:5,ballot:6,reveal:107,transaction:108,origination:109,delegation:110}},entrypointMapping:U,entrypointMappingReverse:O},C={"001":"PtCJ7pwoxe8JasnHY8YonnLYjcVHmhiARPJvqcC6VfHT5s8k8sY","002":"PsYLVpVvgbLhAhoqAkMFUo6gudkJ9weNXhUYCiLDzcUpFpkk8Wt","003":"PsddFKi32cMJ2qPjf43Qv5GDWLDPZb3T3bF6fLKiF5HtvHNU7aP","004":"Pt24m4xiPbLDhVgVfABUjirbmda3yohdN82Sp9FeuAXJ4eV9otd","005a":"PsBABY5HQTSkA4297zNHfsZNKtxULfL18y95qb3m53QJiXGmrbU","005":"PsBabyM1eUXZseaJdmXFApDSBqj8YBfwELoxZHHW77EMcAbbwAS","006":"PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb"};var L={prefix:x,watermark:S,forgeMappings:T,protocols:C},F=function(e,t,r,n){return new(r||(r=Promise))((function(i,s){function o(e){try{c(n.next(e))}catch(e){s(e)}}function a(e){try{c(n.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,a)}c((n=n.apply(e,t||[])).next())}))};var K={getAddress:({path:e="44'/1729'/0'/0'",displayConfirm:t=!0,curve:r=0}={})=>F(void 0,void 0,void 0,(function*(){const n=yield l.a.create(),i=new E(n);let s;try{s=yield i.getAddress(e,t,r)}catch(e){return n.close(),e}return n.close(),s})),signOperation:({path:e="44'/1729'/0'/0'",rawTxHex:t,curve:r=0,watermark:n=S.generic})=>F(void 0,void 0,void 0,(function*(){const i=yield l.a.create(),s=new E(i);let o;try{const i=`00${n}`.slice(-2);({signature:o}=yield s.signOperation(e,`${i}${t}`,r))}catch(e){return i.close(),e}return i.close(),o})),getVersion:()=>F(void 0,void 0,void 0,(function*(){const e=yield l.a.create(),t=new E(e);let r;try{r=yield t.getVersion()}catch(t){return e.close(),t}return e.close(),r}))},B=r(2),I=r(7);const j=e=>{if("number"==typeof e)return e/1e6;if("string"==typeof e)return parseInt(e,10)/1e6;throw new TypeError('Invalid parameter for "mutez" provided.')},N=e=>new B.BigNumber(new B.BigNumber(e).toFixed(6)).multipliedBy(1e6).toString(),M=function e(t){"("===(t=t.replace(/(?:@[a-z_]+)|(?:#.*$)/gm,"").replace(/\s+/g," ").trim()).charAt(0)&&(t=t.slice(1,-1));let r=0,n=!1,i=!1;const s={prim:"",args:[]};let o="";for(let a=0;a<t.length;a++)if(i)o+=t[a],i=!1;else if(a===t.length-1&&!1===n||" "===t[a]&&0===r&&!1===n){if(a===t.length-1&&(o+=t[a]),o){if(o===parseInt(o,10).toString()){if(!s.prim)return{int:o};s.args.push({int:o})}else if("0"===o[0]&&"x"===o[1]){if(o=o.substr(2),!s.prim)return{bytes:o};s.args.push({bytes:o})}else s.prim?s.args.push(e(o)):s.prim=o;o=""}}else if('"'===t[a]&&n){if(n=!1,!s.prim)return{string:o};s.args.push({string:o}),o=""}else'"'!==t[a]||n||0!==r?("\\"===t[a]?i=!0:"("===t[a]?r++:")"===t[a]&&r--,o+=t[a]):n=!0;return s},q=function e(t){let r=[];if(Object.prototype.hasOwnProperty.call(t,"prim"))"Pair"===t.prim?(r.push(e(t.args[0])),r=r.concat(e(t.args[1]))):"Elt"===t.prim?r={key:e(t.args[0]),val:e(t.args[1])}:"True"===t.prim?r=!0:"False"===t.prim&&(r=!1);else if(Array.isArray(t)){const n=t.length;for(let i=0;i<n;i++){const n=e(t[i]);void 0!==n.key?(Array.isArray(r)&&(r={keys:[],vals:[]}),r.keys.push(n.key),r.vals.push(n.val)):r.push(n)}}else r=Object.prototype.hasOwnProperty.call(t,"string")?t.string:Object.prototype.hasOwnProperty.call(t,"int")?parseInt(t.int,10):t;return r},D=function e(t){const r=[];let n=!1,i="",s="",o=0,a=0,c=!1,u=!1;for(let h=0;h<t.length;h++){if("}"!==s&&";"!==s||(s=""),n){if("}"===t[h]?a--:"{"===t[h]&&a++,0===a){const t=e(s);r.push({prim:i.trim(),args:[t]}),s="",a=0,n=!1}}else{if("{"===t[h]){a++,i=s,s="",n=!0;continue}if(u){s+=t[h],u=!1;continue}if(h===t.length-1&&!1===c||";"===t[h]&&0===o&&!1===c){if(h===t.length-1&&(s+=t[h]),""===s.trim()||"}"===s.trim()||";"===s.trim()){s="";continue}r.push(M(s)),s="";continue}'"'===t[h]&&c?c=!1:'"'!==t[h]||c?"\\"===t[h]?u=!0:"("===t[h]?o++:")"===t[h]&&o--:c=!0}s+=t[h]}return r};var H={textEncode:e=>new Uint8Array(I.Buffer.from(e,"utf8")),textDecode:e=>I.Buffer.from(e).toString("utf8"),b582int:e=>{let t=new B.BigNumber(0);const r="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";for(let n=0;n<e.length;n++)t=t.plus(new B.BigNumber(r.indexOf(e[e.length-1-n])).multipliedBy(new B.BigNumber(r.length).exponentiatedBy(n)));return t.toString(16)},totez:j,mutez:N,b58cencode:(e,t)=>{const r=new Uint8Array(t.length+e.length);return r.set(t),r.set(e,t.length),g.a.encode(I.Buffer.from(r,"hex"))},b58cdecode:(e,t)=>g.a.decode(e).slice(t.length),buf2hex:e=>{const t=new Uint8Array(e),r=[];return t.forEach(e=>{const t=`00${e.toString(16)}`.slice(-2);r.push(t)}),r.join("")},hex2buf:e=>new Uint8Array(e.match(/[\da-f]{2}/gi).map(e=>parseInt(e,16))),hexNonce:e=>{let t="";for(;e--;)t+="0123456789abcedf"[16*Math.random()|0];return t},mergebuf:(e,t)=>{const r=new Uint8Array(e.length+t.length);return r.set(e),r.set(t,e.length),r},sexp2mic:M,mic2arr:q,ml2mic:D,ml2tzjson:M,tzjson2arr:q,mlraw2json:D,mintotz:j,tztomin:N},R=function(e,t,r,n){return new(r||(r=Promise))((function(i,s){function o(e){try{c(n.next(e))}catch(e){s(e)}}function a(e){try{c(n.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,a)}c((n=n.apply(e,t||[])).next())}))};class z{constructor({key:e,passphrase:t,email:r,ledgerPath:n="44'/1729'/0'/0'",ledgerCurve:i=0}={}){this.publicKey=()=>H.b58cencode(this._publicKey,x[`${this._curve}pk`]),this.secretKey=()=>{if(!this._secretKey)throw new Error("Secret key not known.");let e=this._secretKey;if("ed"===this._curve){const{privateKey:t}=o.crypto_sign_seed_keypair(e.slice(0,32));e=h()(t)}return H.b58cencode(e,x[`${this._curve}sk`])},this.publicKeyHash=()=>{const e={ed:x.tz1,sp:x.tz2,p2:x.tz3}[this._curve];return H.b58cencode(o.crypto_generichash(20,this._publicKey),e)},this.initialize=({key:e,passphrase:t,email:r},n)=>R(this,void 0,void 0,(function*(){if(yield o.ready,!this._isLedger&&e||({publicKey:e}=yield K.getAddress({path:this._ledgerPath,displayConfirm:!0,curve:this._ledgerCurve})),r){if(!t)throw new Error("Fundraiser key provided without a passphrase.");const i=H.textDecode(H.textEncode(`${r}${t}`)).normalize("NFKD"),s=a.pbkdf2Sync(e,`mnemonic${i}`,2048,64,"sha512"),{publicKey:c,privateKey:u}=o.crypto_sign_seed_keypair(s.slice(0,32));return this._publicKey=h()(c),this._secretKey=h()(u),this._curve="ed",this._isSecret=!0,void n()}if(this._curve=e.substr(0,2),!["sp","p2","ed"].includes(this._curve))throw new Error("Invalid prefix for a key encoding.");if(![54,55,88,98].includes(e.length))throw new Error("Invalid length for a key encoding");const i="e"===e.substring(2,3),s=i?e.slice(3,5):e.slice(2,4);if(!["pk","sk"].includes(s))throw new Error("Invalid prefix for a key encoding.");let u;if(this._isSecret="sk"===s,u=this._isSecret?H.b58cdecode(e,x[`${this._curve}${i?"e":""}sk`]):H.b58cdecode(e,x[`${this._curve}pk`]),i){if(!t)throw new Error("Encrypted key provided without a passphrase.");const e=h()(u.slice(0,8)),r=u.slice(8),n=a.pbkdf2Sync(t,e,32768,32,"sha512");u=o.crypto_secretbox_open_easy(r,new Uint8Array(24),n)}if(this._isSecret)if(this._secretKey=h()(u),"ed"===this._curve)if(64===u.length)this._publicKey=h()(u.slice(32));else{const{publicKey:e,privateKey:t}=o.crypto_sign_seed_keypair(u,"uint8array");this._publicKey=h()(e),this._secretKey=h()(t)}else if("sp"===this._curve){const e=new c.ec("secp256k1").keyFromPrivate(u),t=e.getPublic().getY().toArray()[31]%2?3:2;this._publicKey=h()(new Uint8Array([t].concat(e.getPublic().getX().toArray())))}else{if("p2"!==this._curve)throw new Error("Invalid key");{const e=new c.ec("p256").keyFromPrivate(u),t=e.getPublic().getY().toArray()[31]%2?3:2;this._publicKey=h()(new Uint8Array([t].concat(e.getPublic().getX().toArray())))}}else this._publicKey=h()(u),this._secretKey=void 0;n()})),this.sign=(e,t)=>R(this,void 0,void 0,(function*(){if(this._isLedger){const r=yield K.signOperation({path:this._ledgerPath,rawTxHex:e,curve:this._ledgerCurve,watermark:t}),n=H.hex2buf(r),i=e+r;return{bytes:e,sig:H.b58cencode(n,x.sig),prefixSig:H.b58cencode(n,x[`${this._curve}sig`]),sbytes:i}}let r=H.hex2buf(e);void 0!==t&&(r=H.mergebuf(t,r));const n=h()(o.crypto_generichash(32,r));if(!this._secretKey)throw new Error("Cannot sign operations without a secret key.");if("ed"===this._curve){const t=o.crypto_sign_detached(n,this._secretKey),r=h()(t),i=e+H.buf2hex(r);return{bytes:e,sig:H.b58cencode(t,x.sig),prefixSig:H.b58cencode(t,x.edsig),sbytes:i}}if("sp"===this._curve){const t=new c.ec("secp256k1").keyFromPrivate(this._secretKey).sign(n,{canonical:!0}),r=new Uint8Array(t.r.toArray().concat(t.s.toArray())),i=h()(r),s=e+H.buf2hex(i);return{bytes:e,sig:H.b58cencode(r,x.sig),prefixSig:H.b58cencode(r,x.spsig),sbytes:s}}if("p2"===this._curve){const t=new c.ec("p256").keyFromPrivate(this._secretKey).sign(n,{canonical:!0}),r=new Uint8Array(t.r.toArray().concat(t.s.toArray())),i=h()(r),s=e+H.buf2hex(i);return{bytes:e,sig:H.b58cencode(r,x.sig),prefixSig:H.b58cencode(r,x.p2sig),sbytes:s}}throw new Error("Provided curve not supported")})),this._isLedger=!e,this._ledgerPath=n,this._ledgerCurve=i,this.ready=new Promise(n=>{this.initialize({key:e,passphrase:t,email:r},n)})}get curve(){return this._curve}get isLedger(){return this._isLedger}set isLedger(e){this._isLedger=e}get ledgerPath(){return this._ledgerPath}set ledgerPath(e){this._ledgerPath=e}get ledgerCurve(){return this._ledgerCurve}set ledgerCurve(e){this._ledgerCurve=e}}var Y=function(e,t,r,n){return new(r||(r=Promise))((function(i,s){function o(e){try{c(n.next(e))}catch(e){s(e)}}function a(e){try{c(n.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,a)}c((n=n.apply(e,t||[])).next())}))};const G=e=>{return e=parseInt(e,10),new Uint8Array([(4278190080&e)>>24,(16711680&e)>>16,(65280&e)>>8,255&e]).buffer},Q=e=>{const t=h()(G(e));return H.buf2hex(t)},J=e=>e?"ff":"00",V=e=>{const t=ge(e.code).toLowerCase(),r=ge(e.storage).toLowerCase();return Q(t.length/2)+t+Q(r.length/2)+r},X=(e,t)=>{const r=e=>{const t=[];t.push(J(!0));const r=ge(e).toLowerCase();return t.push(Q(r.length/2)+r),t.join("")},n=e=>{const t=[],r="default"===e.entrypoint;if(t.push(r?"00":"FF"),!r){const r=ge(e.value).toLowerCase();if(T.entrypointMappingReverse[e.entrypoint])t.push(T.entrypointMappingReverse[e.entrypoint]);else{const r=ge({string:e.entrypoint}).toLowerCase();t.push("FF"),t.push(r.slice(8))}t.push((r.length/2).toString(16).padStart(8,"0")),t.push(r)}return t.join("")},i={[`${C["001"]}`]:r,[`${C["002"]}`]:r,[`${C["003"]}`]:r,[`${C["004"]}`]:r,[`${C["005a"]}`]:n,[`${C["005"]}`]:n,[`${C["006"]}`]:n};if(!i[t])throw new Error(`Unrecognized protocol: ${t}`);return i[t](e)},W=e=>{const t=[`0${parseInt(e.substr(2,1),10)-1}`],r=h()(H.b58cdecode(e,x[e.substr(0,3)]));return t.push(H.buf2hex(r)),t.join("")},Z=(e,t="")=>{const r=[],n={[`${C["001"]}`]:!0,[`${C["002"]}`]:!0,[`${C["003"]}`]:!0,[`${C["004"]}`]:!0},i=e=>!t||n[t]?"K"===e.substr(0,1)?"01":"00":"";if("K"===e.substr(0,1)){r.push(i(e));const t=h()(H.b58cdecode(e,x.KT));r.push(H.buf2hex(t)),r.push("00")}else r.push(i(e)),r.push(W(e));return r.join("")},ee=e=>{const t=[];let r=parseInt(e,10);if(Number.isNaN(r))throw new TypeError(`Error forging zarith ${e}`);for(;;){if(r<128){r<16&&t.push("0"),t.push(r.toString(16));break}{let e=r%128;r-=e,r/=128,e+=128,t.push(e.toString(16))}}return t.join("")},te=e=>{const t=[];switch(e.substr(0,2)){case"ed":t.push("00");break;case"sp":t.push("01");break;case"p2":t.push("02")}const r=h()(H.b58cdecode(e,x[e.substr(0,4)]));return t.push(H.buf2hex(r)),t.join("")},re=(e,t)=>{const r=e=>h()(new Uint8Array([T.forgeOpTags["001"][e]])),n=e=>h()(new Uint8Array([T.forgeOpTags["005"][e]])),i={[`${C["001"]}`]:r,[`${C["002"]}`]:r,[`${C["003"]}`]:r,[`${C["004"]}`]:r,[`${C["005a"]}`]:n,[`${C["005"]}`]:n,[`${C["006"]}`]:n};if(!i[t])throw new Error(`Unrecognized protocol: ${t}`);const s=[];let o=i[t](e.kind);return s.push(H.buf2hex(o)),"endorsement"===e.kind?s.push(ne(e)):"seed_nonce_revelation"===e.kind?s.push(ie(e)):"double_endorsement_evidence"===e.kind?s.push(se(e)):"double_baking_evidence"===e.kind?s.push(oe(e)):"activate_account"===e.kind?s.push(ae(e)):"proposals"===e.kind?s.push(ce(e)):"ballot"===e.kind?s.push(ue(e)):"reveal"===e.kind?s.push(he(e,t)):"transaction"===e.kind?s.push(pe(e,t)):"origination"===e.kind?s.push(le(e,t)):"delegation"===e.kind&&s.push(de(e,t)),s.join("")},ne=e=>{const t=h()(G(e.level));return H.buf2hex(t)},ie=e=>{const t=[],r=h()(G(e.level));return t.push(H.buf2hex(r)),t.push(e.nonce),t.join("")},se=e=>{throw new Error("Double endorse forging is not complete")},oe=e=>{throw new Error("Double bake forging is not complete")},ae=e=>{const t=[],r=h()(H.b58cdecode(e.pkh,x.tz1));return t.push(H.buf2hex(r)),t.push(e.secret),t.join("")},ce=e=>{throw new Error("Proposal forging is not complete")},ue=e=>{const t=[];t.push(W(e.source));const r=h()(G(e.period));t.push(H.buf2hex(r));const n=h()(H.b58cdecode(e.proposal,x.P));let i;return t.push(H.buf2hex(n)),i="yay"===e.ballot||"yea"===e.ballot?"00":"nay"===e.ballot?"01":"02",t.push(i),t.join("")},he=(e,t)=>{const r=[];return r.push(Z(e.source,t)),r.push(ee(e.fee)),r.push(ee(e.counter)),r.push(ee(e.gas_limit)),r.push(ee(e.storage_limit)),r.push(te(e.public_key)),r.join("")},pe=(e,t)=>{const r=[];return r.push(Z(e.source,t)),r.push(ee(e.fee)),r.push(ee(e.counter)),r.push(ee(e.gas_limit)),r.push(ee(e.storage_limit)),r.push(ee(e.amount)),r.push(Z(e.destination)),e.parameters?r.push(X(e.parameters,t)):r.push(J(!1)),r.join("")},le=(e,t)=>{const r=(e,t)=>(t.push(W(e.manager_pubkey)),t.push(ee(e.balance)),t.push(J(e.spendable)),t.push(J(e.delegatable)),e.delegate?(t.push(J(!0)),t.push(W(e.delegate))):t.push(J(!1)),e.script?(t.push(J(!0)),t.push(V(e.script))):t.push(J(!1)),t.join("")),n=(e,t)=>(t.push(ee(e.balance)),e.delegate?(t.push(J(!0)),t.push(W(e.delegate))):t.push(J(!1)),t.push(V(e.script)),t.join("")),i={[`${C["001"]}`]:r,[`${C["002"]}`]:r,[`${C["003"]}`]:r,[`${C["004"]}`]:r,[`${C["005a"]}`]:n,[`${C["005"]}`]:n,[`${C["006"]}`]:n},s=[];return s.push(Z(e.source,t)),s.push(ee(e.fee)),s.push(ee(e.counter)),s.push(ee(e.gas_limit)),s.push(ee(e.storage_limit)),i[t](e,s)},de=(e,t)=>{const r=[];return r.push(Z(e.source,t)),r.push(ee(e.fee)),r.push(ee(e.counter)),r.push(ee(e.gas_limit)),r.push(ee(e.storage_limit)),e.delegate?(r.push(J(!0)),r.push(W(e.delegate))):r.push(J(!1)),r.join("")},ge=e=>{const t=e=>{const r=[];if(e instanceof Array){r.push("02");const n=e.map(e=>t(e)).join(""),i=n.length/2;r.push(i.toString(16).padStart(8,"0")),r.push(n)}else if(e instanceof Object)if("prim"in e){const n=e.args?e.args.length:0;if(r.push(T.primMappingReverse[n][`${!!e.annots}`]),r.push(T.opMappingReverse[e.prim]),e.args&&e.args.forEach(e=>r.push(t(e))),e.annots){const t=e.annots.map(e=>{const t=h()(H.textEncode(e));return H.buf2hex(t)}).join("20");r.push((t.length/2).toString(16).padStart(8,"0")),r.push(t)}}else if("bytes"in e){const t=e.bytes.length/2;r.push("0A"),r.push(t.toString(16).padStart(8,"0")),r.push(e.bytes)}else if("int"in e){const t=new B.BigNumber(e.int,10),n="-"===t.toString(2)[0]?"1":"0",i=t.toString(2).replace("-",""),s=i.length<=6?6:(i.length-6)%7?i.length+7-(i.length-6)%7:i.length,o=i.padStart(s,"0").match(/\d{6,7}/g).reverse();o[0]=n+o[0];const a=o.map((e,t)=>parseInt((t===o.length-1?"0":"1")+e,2).toString(16).padStart(2,"0")).join("");r.push("00"),r.push(a)}else if("string"in e){const t=H.textEncode(e.string),n=[].slice.call(t).map(e=>e.toString(16).padStart(2,"0")).join(""),i=t.length;r.push("01"),r.push(i.toString(16).padStart(8,"0")),r.push(n)}return r.join("")};return t(e).toUpperCase()};var fe={address:Z,decodeRawBytes:e=>{e=e.toUpperCase();let t=0;const r=r=>{const n=e.slice(t,t+r);return t+=r,n},n=()=>{const e=r(2),i=T.primMapping[e];if(i instanceof Object){const e={prim:T.opMapping[r(2)],args:[...Array(i.len)].map(()=>n()),annots:void 0};if(i.len||delete e.args,i.annots){const t=2*parseInt(r(8),16),n=r(t).match(/[\dA-F]{2}/g);if(n){const t=new Uint8Array(n.map(e=>parseInt(e,16))),r=H.textDecode(t);e.annots=r.split(" ")}}else delete e.annots;return e}if("0A"===e){const e=r(8),t=2*parseInt(e,16);return{bytes:r(t)}}if("01"===e){const e=r(8),t=2*parseInt(e,16),n=r(t).match(/[\dA-F]{2}/g);if(n instanceof Array){const e=new Uint8Array(n.map(e=>parseInt(e,16)));return{string:H.textDecode(e)}}throw new Error("Input bytes error")}if("00"===e){const e=parseInt(r(2),16).toString(2).padStart(8,"0"),t=[e.slice(2)];let n="1"===e[0];for(;n;){const e=parseInt(r(2),16).toString(2).padStart(8,"0");t.push(e.slice(1)),n="1"===e[0]}return{int:new B.BigNumber(t.reverse().join(""),2).toString()}}if("02"===e){const e=r(8),i=2*parseInt(e,16),s=t+i,o=[];for(;s>t;)o.push(n());return o}throw new Error(`Invalid raw bytes: Byte:${e} Index:${t}`)};return n()},encodeRawBytes:ge,forge:(e,t,r)=>Y(void 0,void 0,void 0,(function*(){if(!e.contents)throw new Error("No operation contents provided.");if(!e.branch)throw new Error("No operation branch provided.");const n=h()(H.b58cdecode(e.branch,x.b)),i=[H.buf2hex(n)];return e.contents.forEach(e=>{i.push(re(e,r))}),{opbytes:i.join(""),opOb:e,counter:t}})),op:re,endorsement:ne,seedNonceRevelation:ie,doubleEndorsementEvidence:se,doubleBakingEvidence:oe,activateAccount:ae,proposals:ce,ballot:ue,reveal:he,transaction:pe,origination:le,delegation:de,parameters:X,publicKey:te,publicKeyHash:W,zarith:ee,bool:J,script:V,toBytesInt32:G,toBytesInt32Hex:Q},ye=function(e,t,r,n){return new(r||(r=Promise))((function(i,s){function o(e){try{c(n.next(e))}catch(e){s(e)}}function a(e){try{c(n.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,a)}c((n=n.apply(e,t||[])).next())}))};var be=r(8),me=function(e,t,r,n){return new(r||(r=Promise))((function(i,s){function o(e){try{c(n.next(e))}catch(e){s(e)}}function a(e){try{c(n.throw(e))}catch(e){s(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,a)}c((n=n.apply(e,t||[])).next())}))};const ve=(e,t="")=>me(void 0,void 0,void 0,(function*(){try{yield o.ready}catch(e){throw new Error(e)}const r=o,n=e.substr(0,2);if(![54,55,88,98].includes(e.length))throw new Error("Invalid length for a key encoding");const i="e"===e.substring(2,3);if("ed"===n){if(i){const n=h()(H.b58cdecode(e,x.edesk)),i=n.slice(0,8),s=n.slice(8);if(!t)throw new Error("No password was provided to decrypt the key");const o=a.pbkdf2Sync(t,i,32768,32,"sha512"),c=r.crypto_sign_seed_keypair(r.crypto_secretbox_open_easy(s,new Uint8Array(24),o));return{sk:H.b58cencode(c.privateKey,x.edsk),pk:H.b58cencode(c.publicKey,x.edpk),pkh:H.b58cencode(r.crypto_generichash(20,c.publicKey),x.tz1)}}if(98===e.length)return{sk:e,pk:H.b58cencode(H.b58cdecode(e,x.edsk).slice(32),x.edpk),pkh:H.b58cencode(r.crypto_generichash(20,H.b58cdecode(e,x.edsk).slice(32)),x.tz1)};if(54===e.length){const t=H.b58cdecode(e,x.edsk2),n=r.crypto_sign_seed_keypair(t);return{sk:H.b58cencode(n.privateKey,x.edsk),pk:H.b58cencode(n.publicKey,x.edpk),pkh:H.b58cencode(r.crypto_generichash(20,n.publicKey),x.tz1)}}}return console.error("Invalid prefix for a key encoding"),{sk:"",pk:"",pkh:""}}));var _e={extractKeys:ve,generateKeys:(e,t)=>me(void 0,void 0,void 0,(function*(){try{yield o.ready}catch(e){throw new Error(e)}const r=o,n=yield Object(be.mnemonicToSeed)(e,t).then(e=>e.slice(0,32)),i=r.crypto_sign_seed_keypair(h()(n));return{mnemonic:e,passphrase:t,sk:H.b58cencode(i.privateKey,x.edsk),pk:H.b58cencode(i.publicKey,x.edpk),pkh:H.b58cencode(r.crypto_generichash(20,i.publicKey),x.tz1)}})),checkAddress:e=>{try{return H.b58cdecode(e,x.tz1),!0}catch(e){return!1}},generateMnemonic:()=>Object(be.generateMnemonic)(160),sign:(e,t,r,n="")=>me(void 0,void 0,void 0,(function*(){try{yield o.ready}catch(e){throw new Error(e)}const i=o;if(54===t.length||55===t.length)try{({sk:t}=yield ve(t,n))}catch(e){throw new Error(e)}let s=H.hex2buf(e);void 0!==r&&(s=H.mergebuf(r,s));const a=i.crypto_sign_detached(i.crypto_generichash(32,s),H.b58cdecode(t,x.edsk),"uint8array"),c=H.b58cencode(a,x.edsig),u=h()(a),p=e+H.buf2hex(u);return{bytes:e,sig:H.b58cencode(a,x.sig),prefixSig:c,sbytes:p}}))};r.d(t,"Key",(function(){return z})),r.d(t,"crypto",(function(){return _e})),r.d(t,"forge",(function(){return fe})),r.d(t,"utility",(function(){return H})),r.d(t,"ledger",(function(){return K})),r.d(t,"constants",(function(){return L}));t.default=class extends s{constructor(e="http://127.0.0.1:8732",t="main",r={}){super(e,t),this.importKey=(e,t,r)=>ye(this,void 0,void 0,(function*(){this.key=new z({key:e,passphrase:t,email:r}),yield this.key.ready})),this.importLedger=(e="44'/1729'/0'/0'",t=0)=>ye(this,void 0,void 0,(function*(){this.key=new z({ledgerPath:e,ledgerCurve:t}),yield this.key.ready})),this.query=(e,t,r)=>(void 0===t?void 0===r?r="GET":t={}:void 0===r&&(r="POST"),new Promise((n,s)=>{try{const o=new i.a;o.open(r,this.provider+e,!0),o.onload=()=>{if(this._debugMode&&console.log("Node call:",e,t),200===o.status)if(o.responseText){let t=JSON.parse(o.responseText);this._debugMode&&console.log("Node response:",e,t),t&&void 0!==t.error?s(t.error):(t&&void 0!==t.ok&&(t=t.ok),n(t))}else s("Empty response returned");else o.responseText?s(o.responseText):s(o.statusText)},o.onerror=()=>{s(o.statusText)},"POST"===r?(o.setRequestHeader("Content-Type","application/json"),o.send(JSON.stringify(t))):o.send()}catch(e){s(e)}})),this.account=({balance:e,spendable:t,delegatable:r,delegate:n,fee:i=this.defaultFee,gasLimit:s=10600,storageLimit:o=257})=>ye(this,void 0,void 0,(function*(){const a={};void 0!==t&&(a.spendable=t),void 0!==r&&(a.delegatable=r),n&&(a.delegate=n);const c=[Object.assign({kind:"origination",balance:H.mutez(e),fee:i,gas_limit:s,storage_limit:o,manager_pubkey:this.key.publicKeyHash()},a)];return this.sendOperation({operation:c})})),this.getBalance=e=>this.query(`/chains/${this.chain}/blocks/head/context/contracts/${e}/balance`),this.getDelegate=e=>this.query(`/chains/${this.chain}/blocks/head/context/contracts/${e}/delegate`).then(e=>e||!1),this.getManager=e=>this.query(`/chains/${this.chain}/blocks/head/context/contracts/${e}/manager_key`),this.getCounter=e=>this.query(`/chains/${this.chain}/blocks/head/context/contracts/${e}/counter`),this.getBaker=e=>this.query(`/chains/${this.chain}/blocks/head/context/delegates/${e}`),this.getHeader=()=>this.query(`/chains/${this.chain}/blocks/head/header`),this.getHeadMetadata=()=>this.query(`/chains/${this.chain}/blocks/head/metadata`),this.getHead=()=>this.query(`/chains/${this.chain}/blocks/head`),this.getHeadHash=()=>this.query(`/chains/${this.chain}/blocks/head/hash`),this.getBallotList=()=>this.query(`/chains/${this.chain}/blocks/head/votes/ballot_list`),this.getProposals=()=>this.query(`/chains/${this.chain}/blocks/head/votes/proposals`),this.getBallots=()=>this.query(`/chains/${this.chain}/blocks/head/votes/ballots`),this.getListings=()=>this.query(`/chains/${this.chain}/blocks/head/votes/listings`),this.getCurrentProposal=()=>this.query(`/chains/${this.chain}/blocks/head/votes/current_proposal`),this.getCurrentPeriod=()=>this.query(`/chains/${this.chain}/blocks/head/votes/current_period_kind`),this.getCurrentQuorum=()=>this.query(`/chains/${this.chain}/blocks/head/votes/current_quorum`),this.awaitOperation=(e,t=10,r=180)=>{if(r<=0)throw new Error("Timeout must be more than 0");if(t<=0)throw new Error("Interval must be more than 0");const n=Math.ceil(r/t)+1;let i=0,s=!1;const o=t=>{t.hash===e&&(s=!0)};return new Promise((e,r)=>{const a=()=>this.getHead().then(c=>{i++;for(let e=3;e>=0;e--)c.operations[e].forEach(o);s?e(c.hash):i>=n?r(new Error("Timeout")):setTimeout(a,1e3*t)});a()})},this.call=(e,t)=>this.query(e,t),this.prepareOperation=({operation:e,source:t})=>{let r;const n={},i=[];let s,o=!1,a=[];i.push(this.getHeader()),i.push(this.getHeadMetadata()),a=Array.isArray(e)?[...e]:[e];const c=t||this.key.publicKeyHash();for(let e=0;e<a.length;e++)if(["transaction","origination","delegation"].includes(a[e].kind)){o=!0,i.push(this.getManager(c)),i.push(this.getCounter(c));break}return Promise.all(i).then(([e,t,i,u])=>ye(this,void 0,void 0,(function*(){if(s=e,o){if(!this._getManagerKey(i,t.protocol)){const e={kind:"reveal",fee:1420,public_key:this.key.publicKey(),source:c,gas_limit:10600,storage_limit:300};a.unshift(e)}r=parseInt(u,10),(!this._counters[c]||this._counters[c]<r)&&(this._counters[c]=r)}n.branch=s.hash,n.contents=(e=>e.map(e=>{const r=Object.assign({},e);if(["proposals","ballot","transaction","origination","delegation"].includes(e.kind)&&void 0===e.source&&(r.source=c),["reveal","transaction","origination","delegation"].includes(e.kind)){void 0===e.fee?r.fee="0":r.fee=`${e.fee}`,void 0===e.gas_limit?r.gas_limit="0":r.gas_limit=`${e.gas_limit}`,void 0===e.storage_limit?r.storage_limit="0":r.storage_limit=`${e.storage_limit}`,void 0!==e.balance&&(r.balance=`${r.balance}`),void 0!==e.amount&&(r.amount=`${r.amount}`);const t=++this._counters[c];r.counter=`${t}`}return this._conformOperation(r,t.next_protocol)}))(a);let h="";if(this._localForge&&!this._validateLocalForge||(h=yield this.query(`/chains/${this.chain}/blocks/${s.hash}/helpers/forge/operations`,n)),n.protocol=t.next_protocol,!this._localForge)return{opbytes:h,opOb:n,counter:r};const p=yield fe.forge(n,r,t.next_protocol);if(this._validateLocalForge){if(p.opbytes===h)return p;throw new Error("Forge validation error - local and remote bytes don't match")}return Object.assign(Object.assign({},p),{counter:r})})))},this.simulateOperation=({operation:e,source:t})=>this.prepareOperation({operation:e,source:t}).then(e=>this.query(`/chains/${this.chain}/blocks/head/helpers/scripts/run_operation`,e.opOb)),this.sendOperation=({operation:e,source:t,skipPrevalidation:r=!1,skipSignature:n=!1})=>ye(this,void 0,void 0,(function*(){const i=yield this.prepareOperation({operation:e,source:t});if(n)i.opbytes+="00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",i.opOb.signature="edsigtXomBKi5CTRf5cjATJWSyaRvhfYNHqSUGrn4SdbYRcGwQrUGjzEfQDTuqHhuA8b2d8NarZjz8TRf65WkpQmo423BtomS8Q";else{const e=yield this.key.sign(i.opbytes,S.generic);i.opbytes=e.sbytes,i.opOb.signature=e.prefixSig}const s=t||this.key.publicKeyHash();return r?this.silentInject(i.opbytes).catch(e=>{throw this._counters[s]=i.counter,e}):this.inject(i.opOb,i.opbytes).catch(e=>{throw this._counters[s]=i.counter,e})})),this.inject=(e,t)=>{const r=[];let n=[];return this.query(`/chains/${this.chain}/blocks/head/helpers/preapply/operations`,[e]).then(e=>{if(!Array.isArray(e))throw new Error("RPC Fail");for(let t=0;t<e.length;t++)for(let i=0;i<e[t].contents.length;i++)r.push(e[t].contents[i]),void 0!==e[t].contents[i].metadata.operation_result&&"failed"===e[t].contents[i].metadata.operation_result.status&&(n=n.concat(e[t].contents[i].metadata.operation_result.errors));if(n.length)throw new Error(JSON.stringify({error:"Operation Failed",errors:n},null,2));return this.query("/injection/operation",t)}).then(e=>({hash:e,operations:r}))},this.silentInject=e=>this.query("/injection/operation",e).then(e=>({hash:e})),this.transfer=({to:e,amount:t,source:r,fee:n=this.defaultFee,parameters:i,gasLimit:s=10600,storageLimit:o=300,mutez:a=!1})=>{const c={kind:"transaction",fee:n,gas_limit:s,storage_limit:o,amount:a?H.mutez(t):t,destination:e};return i&&(c.parameters="string"==typeof i?H.sexp2mic(i):i),this.sendOperation({operation:[c],source:r})},this.activate=(e,t)=>{const r={kind:"activate_account",pkh:e,secret:t};return this.sendOperation({operation:[r],source:e,skipSignature:!0})},this.originate=({balance:e,code:t,init:r,spendable:n=!1,delegatable:i=!1,delegate:s,fee:o=this.defaultFee,gasLimit:a=10600,storageLimit:c=257})=>ye(this,void 0,void 0,(function*(){let u,h;u="string"==typeof t?H.ml2mic(t):t,h="string"==typeof r?H.sexp2mic(r):r;const p={code:u,storage:h},l=this.key.publicKeyHash(),d={kind:"origination",fee:o,gas_limit:a,storage_limit:c,balance:H.mutez(e),manager_pubkey:l,spendable:n,delegatable:i,script:p};return s&&(d.delegate=s),this.sendOperation({operation:[d]})})),this.setDelegate=({delegate:e,source:t=this.key.publicKeyHash(),fee:r=this.defaultFee,gasLimit:n=10600,storageLimit:i=0})=>ye(this,void 0,void 0,(function*(){const s={kind:"delegation",source:t,fee:r,gas_limit:n,storage_limit:i,delegate:e};return this.sendOperation({operation:[s],source:t})})),this.registerDelegate=({fee:e=this.defaultFee,gasLimit:t=10600,storageLimit:r=0}={})=>ye(this,void 0,void 0,(function*(){const n={kind:"delegation",fee:e,gas_limit:t,storage_limit:r,delegate:this.key.publicKeyHash()};return this.sendOperation({operation:[n]})})),this.typecheckCode=(e,t=1e4)=>{let r;return r="string"==typeof e?H.ml2mic(e):e,this.query(`/chains/${this.chain}/blocks/head/helpers/scripts/typecheck_code`,{program:r,gas:t})},this.packData=(e,t)=>{let r,n;r="string"==typeof e?H.sexp2mic(e):e,n="string"==typeof t?H.sexp2mic(t):t;const i={data:r,type:n,gas:"4000000"};return this.query(`/chains/${this.chain}/blocks/head/helpers/scripts/pack_data`,i)},this.typecheckData=(e,t)=>{let r,n;r="string"==typeof e?H.sexp2mic(e):e,n="string"==typeof t?H.sexp2mic(t):t;const i={data:e,type:t,gas:"4000000"};return this.query(`/chains/${this.chain}/blocks/head/helpers/scripts/typecheck_data`,i)},this.runCode=(e,t,r,n,i=!1)=>{const s=i?"trace_code":"run_code";let o,a,c;return o="string"==typeof e?H.sexp2mic(e):e,a="string"==typeof r?H.sexp2mic(r):r,c="string"==typeof n?H.sexp2mic(n):n,this.query(`/chains/${this.chain}/blocks/head/helpers/scripts/${s}`,{script:o,amount:`${H.mutez(t)}`,input:a,storage:c})},this._getManagerKey=(e,t)=>{if(!e)return null;const r={[`${C["001"]}`]:e.key,[`${C["002"]}`]:e.key,[`${C["003"]}`]:e.key,[`${C["004"]}`]:e.key,[`${C["005a"]}`]:e,[`${C["005"]}`]:e,[`${C["006"]}`]:e};if(!r[t])throw new Error(`Unrecognized protocol: ${t}`);return r[t]},this._conformOperation=(e,t)=>{const r=e=>e,n=e=>(delete e.manager_pubkey,delete e.spendable,delete e.delegatable,e);return{[`${C["001"]}`]:r,[`${C["002"]}`]:r,[`${C["003"]}`]:r,[`${C["004"]}`]:r,[`${C["005a"]}`]:n,[`${C["005"]}`]:n,[`${C["006"]}`]:n}[t](e)},this._defaultFee=r.defaultFee||1420,this._localForge=!1!==r.localForge,this._validateLocalForge=r.validateLocalForge||!1,this._debugMode=r.debugMode||!1,this._counters={}}get defaultFee(){return this._defaultFee}set defaultFee(e){this._defaultFee=e}get localForge(){return this._localForge}set localForge(e){this._localForge=e}get validateLocalForge(){return this._validateLocalForge}set validateLocalForge(e){this._validateLocalForge=e}get counters(){return this._counters}set counters(e){this._counters=e}get debugMode(){return this._debugMode}set debugMode(e){this._debugMode=e}setProvider(e,t=this.chain){super.setProvider(e,t),this.provider=e,this.chain=t}}}])}));