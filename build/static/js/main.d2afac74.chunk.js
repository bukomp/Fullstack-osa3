(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(13),c=t.n(r),u=(t(20),t(2)),l=function(e){var n=[];return""!==e.newFilter&&void 0!==e.newFilter&&null!==e.newFilter?e.personData.forEach(function(t){t.name.includes(e.newFilter)&&n.push(o.a.createElement("div",{key:t.name},o.a.createElement("div",null,"".concat(t.name," ").concat(t.number)),o.a.createElement("button",{id:t.id,name:"delete",onClick:e.onDelete},"delete")))}):e.personData.forEach(function(t){n.push(o.a.createElement("div",{key:t.name},o.a.createElement("div",null,"".concat(t.name," ").concat(t.number)),o.a.createElement("button",{id:t.id,name:"delete",onClick:e.onDelete},"delete")))}),n},i=function(e){return o.a.createElement("div",null,"filter shown with",o.a.createElement("input",{name:e.name,value:e.value,onChange:e.onChange}))},m=function(e){var n={margin:"1rem",padding:"1rem",backgroundColor:"#F48A8A",color:"#B41717",border:"0.5rem #B41717 solid"},t={margin:"1rem",padding:"1rem",backgroundColor:"#8CF48A",color:"green",border:"0.5rem green solid"},a={height:"5.35rem",color:"transparent"};return e.data.show&&(a=e.data.error?n:t,setTimeout(function(){e.hideError()},7e3)),o.a.createElement("div",{style:a},e.data.message)},d=function(e){return o.a.createElement("form",{onSubmit:e.handleSubmit},o.a.createElement("div",null,"name:",o.a.createElement("input",{name:e.nameName,value:e.nameValue,onChange:e.nameOnChange})),o.a.createElement("div",null,"number:",o.a.createElement("input",{name:e.numName,value:e.numValue,onChange:e.numOnChange})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},s=t(3),h=t.n(s),f="/api/persons",b=function(){return h.a.get(f)},g=function(){var e=Object(a.useState)(""),n=Object(u.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),s=Object(u.a)(c,2),g=s[0],w=s[1],v=Object(a.useState)(""),E=Object(u.a)(v,2),p=E[0],O=E[1],k=Object(a.useState)({error:!1,show:!1,message:""}),C=Object(u.a)(k,2),y=C[0],j=C[1],F=Object(a.useState)([]),S=Object(u.a)(F,2),D=S[0],N=S[1];Object(a.useEffect)(function(){b().then(function(e){N(e.data)})},[]);var A=function(e,n){j({error:e,show:!0,message:n})},B=function(e){switch(e.target.name){case"name":w(e.target.value);break;case"number":O(e.target.value);break;case"filter":r(e.target.value);break;default:console.log("something went completely wrong")}},V=function(){var e;(e={name:g,number:p},h.a.post(f,e)).then(function(e){console.log(e.data.data),N(e.data.data),w(""),O(""),A(!1,"".concat(g," successfully has been added"))}).catch(function(e){console.log(e),A(!0,"".concat(g," can't be added with error:s ").concat(e))})},J=function(){D.forEach(function(e){var n,t;e.name===g&&(n=e.id,t={name:e.name,number:p},h.a.put(f+"/"+n,t)).then(function(e){b().then(function(e){N(e.data.data),A(!1,"".concat(g," successfully has been updated"))}).catch(function(e){A(!0,"".concat(g," has been updated, but full list couldn't be loaded after with error: ").concat(e))})}).catch(function(e){A(!0,"".concat(g," can't be updated with error: ").concat(e))})})},W=function(e){var n;(n=e,h.a.delete(f+"/"+n)).then(function(e){b().then(function(e){N(e.data.data),A(!1,"".concat(g," successfully has been removed"))}).catch(function(e){})}).catch(function(e){A(!0,"".concat(g," can't be removed with error: ").concat(e))})};return o.a.createElement(o.a.Fragment,null,o.a.createElement(m,{data:y,hideError:function(){j({error:!1,show:!1,message:""})}}),o.a.createElement("h2",null,"Phonebook"),o.a.createElement(i,{name:"filter",value:t,onChange:B}),o.a.createElement("h2",null,"add a new"),o.a.createElement(d,{nameName:"name",nameValue:g,nameOnChange:B,numName:"number",numValue:p,numOnChange:B,handleSubmit:function(e){e.preventDefault(),D.find(function(e){return e.name===g})?window.confirm("".concat(g," is already added. Replace the old number?"))&&J():V()}}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(l,{onDelete:function(e){var n=e.target.id;window.confirm("Are you shure you want to delete this object?")&&W(n)},personData:D,newFilter:t}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[14,1,2]]]);
//# sourceMappingURL=main.d2afac74.chunk.js.map