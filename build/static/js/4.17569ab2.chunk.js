(this["webpackJsonponline-shop"]=this["webpackJsonponline-shop"]||[]).push([[4],{100:function(e,t,c){"use strict";c.r(t);var n=c(8),r=c(1),s=c(2),a=c(56),i=c(13),o=c(23),j=c(25),l=c(58),u=c(93),d=c.n(u),h=c(54),b=c(55),O=c(0);t.default=Object(b.a)((function(e){var t=Object(r.useState)(!1),c=Object(n.a)(t,2),u=c[0],b=c[1],p=Object(r.useState)(!1),x=Object(n.a)(p,2),f=x[0],m=x[1],g=Object(r.useState)(!1),k=Object(n.a)(g,2),v=k[0],C=k[1],_=Object(r.useState)(""),y=Object(n.a)(_,2),S=y[0],q=y[1],N=Object(s.g)(),T=function(){u?b(!1):f&&m(!1)},w=null;u?w=Object(O.jsx)(j.a,{cart:e.cart,clicked1:T,clicked2:function(){C(!0);var t=e.cart.map((function(e){return{productId:e.id,quantity:e.quantity}}));h.a.post("/orders",{customer:e.user,products:t}).then((function(t){t.status>=200&&t.status<300&&(C(!1),b(!1),q("Order was created!"),m(!0),e.cart.length=0,localStorage.removeItem("cart"))})).catch((function(e){C(!1)}))}}):f&&(w=Object(O.jsx)(l.a,{message:S,clicked:T})),v&&(w=Object(O.jsx)(i.a,{}));var D=e.cart.map((function(t){return Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:t.category}),Object(O.jsx)("td",{children:t.name}),Object(O.jsx)("td",{children:t.price}),Object(O.jsx)("td",{children:t.quantity}),Object(O.jsx)("td",{children:Object(O.jsx)("button",{className:d.a.CartBtn,onClick:function(){return function(t){var c=e.cart.slice(),n=c.indexOf(t);c.splice(n,1),e.setCart(c),q("Product has been removed from the shopping cart."),m(!0)}(t)},children:"\u274c"})})]},t.id)}));return Object(O.jsxs)("div",{className:d.a.Cart,children:[Object(O.jsx)(o.a,{show:u||f,modalClosed:T,children:w}),Object(O.jsx)(a.a,{title:"Shopping Cart",paramsId:e.match.params,btn1:e.cart.length>0?"CHECKOUT":"GO TO PRODUCTS LIST",clicked1:e.cart.length>0?function(){b(!0)}:function(){N.push("/products")}}),e.cart.length<1?Object(O.jsx)("h4",{children:"The shopping cart is empty! Please add something to it before trying to checkout."}):Object(O.jsxs)("table",{children:[Object(O.jsx)("thead",{children:Object(O.jsxs)("tr",{children:[Object(O.jsx)("th",{children:"Category"}),Object(O.jsx)("th",{children:"Product Name"}),Object(O.jsx)("th",{children:"Price"}),Object(O.jsx)("th",{children:"Quantity"}),Object(O.jsx)("th",{})]})}),Object(O.jsx)("tbody",{children:D})]})]})}),h.a)},54:function(e,t,c){"use strict";var n=c(62),r=c.n(n).a.create({baseURL:"http://localhost:4000/"});t.a=r},55:function(e,t,c){"use strict";var n=c(7),r=c(8),s=c(1),a=c(23),i=function(e){var t=Object(s.useState)(null),c=Object(r.a)(t,2),n=c[0],a=c[1],i=e.interceptors.request.use((function(e){return a(null),e})),o=e.interceptors.response.use((function(e){return e}),(function(e){a(e)}));Object(s.useEffect)((function(){return function(){e.interceptors.request.eject(i),e.interceptors.response.eject(o)}}),[i,o,e.interceptors.request,e.interceptors.response]);return[n,function(){a(null)}]},o=c(0);t.a=function(e,t){return function(c){var j=i(t),l=Object(r.a)(j,2),u=l[0],d=l[1];return Object(o.jsxs)(s.Fragment,{children:[Object(o.jsx)(a.a,{show:u,modalClosed:d,children:u?u.message:null}),Object(o.jsx)(e,Object(n.a)({},c))]})}}},56:function(e,t,c){"use strict";c(1);var n=c(57),r=c.n(n),s=c(15),a=c(2),i=c(0);t.a=function(e){var t=Object(a.h)(),c=Object(i.jsxs)("div",{children:[Object(i.jsx)(s.a,{clicked:e.clicked1,children:e.btn1}),Object(i.jsx)(s.a,{clicked:e.clicked2,children:e.btn2})]});return 0!==Object.keys(e.paramsId).length&&e.roles.includes("admin")||(c=Object(i.jsx)(s.a,{clicked:e.clicked1,children:e.btn1})),("/sales"===t.pathname||"/products"===t.pathname&&!e.roles.includes("admin"))&&(c=null),Object(i.jsxs)("div",{className:r.a.Header,children:[Object(i.jsx)("h2",{children:e.title}),c]})}},57:function(e,t,c){e.exports={Header:"Header_Header__17NkT"}},58:function(e,t,c){"use strict";c(1);var n=c(15),r=c(63),s=c.n(r),a=c(0);t.a=function(e){return Object(a.jsxs)("div",{className:s.a.ActionDoneMessage,children:[Object(a.jsx)("p",{children:e.message}),Object(a.jsx)(n.a,{clicked:e.clicked,children:"OK"})]})}},63:function(e,t,c){e.exports={ActionDoneMessage:"ActionDoneMessage_ActionDoneMessage__3ysrl"}},93:function(e,t,c){e.exports={Cart:"Cart_Cart__1Vqaa",CartBtn:"Cart_CartBtn__2m-Wg"}}}]);
//# sourceMappingURL=4.17569ab2.chunk.js.map