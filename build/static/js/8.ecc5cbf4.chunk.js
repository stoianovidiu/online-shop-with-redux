(this["webpackJsonponline-shop"]=this["webpackJsonponline-shop"]||[]).push([[8],{54:function(e,t,c){"use strict";var n=c(62),s=c.n(n).a.create({baseURL:"http://localhost:4000/"});t.a=s},55:function(e,t,c){"use strict";var n=c(7),s=c(8),r=c(1),a=c(23),i=function(e){var t=Object(r.useState)(null),c=Object(s.a)(t,2),n=c[0],a=c[1],i=e.interceptors.request.use((function(e){return a(null),e})),u=e.interceptors.response.use((function(e){return e}),(function(e){a(e)}));Object(r.useEffect)((function(){return function(){e.interceptors.request.eject(i),e.interceptors.response.eject(u)}}),[i,u,e.interceptors.request,e.interceptors.response]);return[n,function(){a(null)}]},u=c(0);t.a=function(e,t){return function(c){var j=i(t),d=Object(s.a)(j,2),o=d[0],l=d[1];return Object(u.jsxs)(r.Fragment,{children:[Object(u.jsx)(a.a,{show:o,modalClosed:l,children:o?o.message:null}),Object(u.jsx)(e,Object(n.a)({},c))]})}}},56:function(e,t,c){"use strict";c(1);var n=c(57),s=c.n(n),r=c(15),a=c(2),i=c(0);t.a=function(e){var t=Object(a.h)(),c=Object(i.jsxs)("div",{children:[Object(i.jsx)(r.a,{clicked:e.clicked1,children:e.btn1}),Object(i.jsx)(r.a,{clicked:e.clicked2,children:e.btn2})]});return 0!==Object.keys(e.paramsId).length&&e.roles.includes("admin")||(c=Object(i.jsx)(r.a,{clicked:e.clicked1,children:e.btn1})),("/sales"===t.pathname||"/products"===t.pathname&&!e.roles.includes("admin"))&&(c=null),Object(i.jsxs)("div",{className:s.a.Header,children:[Object(i.jsx)("h2",{children:e.title}),c]})}},57:function(e,t,c){e.exports={Header:"Header_Header__17NkT"}},91:function(e,t,c){e.exports={Products:"Products_Products__1kZ5u",ProductsBtn:"Products_ProductsBtn__1oof0"}},99:function(e,t,c){"use strict";c.r(t);var n=c(8),s=c(1),r=c.n(s),a=c(2),i=c(56),u=c(13),j=c(91),d=c.n(j),o=c(54),l=c(55),b=c(0),h=r.a.lazy((function(){return c.e(6).then(c.bind(null,95))}));t.default=Object(l.a)((function(e){var t=Object(s.useState)([]),c=Object(n.a)(t,2),r=c[0],j=c[1],l=Object(s.useState)(!1),O=Object(n.a)(l,2),f=O[0],p=O[1],x=Object(s.useState)(!0),m=Object(n.a)(x,2),k=m[0],v=m[1],P=Object(s.useState)(!1),g=Object(n.a)(P,2),_=g[0],y=g[1];Object(s.useEffect)((function(){k&&(y(!0),o.a.get("/products").then((function(e){e.status>=200&&e.status<300&&(y(!1),j(e.data))})).catch((function(e){y(!1)})))}),[k]);var N=Object(a.g)(),S=r.map((function(e){return Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:e.category}),Object(b.jsx)("td",{children:e.name}),Object(b.jsx)("td",{children:e.price}),Object(b.jsx)("td",{children:Object(b.jsx)("button",{className:d.a.ProductsBtn,onClick:function(){return function(e){N.push("/products/".concat(e.id))}(e)},children:"\u27a1\u25b6"})})]},e.id)})),H=Object(b.jsxs)(s.Fragment,{children:[Object(b.jsx)(i.a,{title:"Products",paramsId:e.match.params,roles:e.roles,btn1:"ADD",clicked1:function(){v(!1),p(!0)}}),Object(b.jsxs)("table",{children:[Object(b.jsx)("thead",{children:Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{children:"Category"}),Object(b.jsx)("th",{children:"Product Name"}),Object(b.jsx)("th",{children:"Price"}),Object(b.jsx)("th",{})]})}),Object(b.jsx)("tbody",{children:S})]})]});return _&&!f&&(H=Object(b.jsx)(u.a,{})),f&&(H=Object(b.jsx)(h,{setIsAdding:p,setWasAdded:v,products:r})),Object(b.jsx)("div",{className:d.a.Products,children:H})}),o.a)}}]);
//# sourceMappingURL=8.ecc5cbf4.chunk.js.map