(this["webpackJsonponline-shop"]=this["webpackJsonponline-shop"]||[]).push([[1],[,,,,,,,,,,,,function(e,t,n){e.exports={SideDrawer:"SideDrawer_SideDrawer__3NVOp",Open:"SideDrawer_Open__DQyUp",Close:"SideDrawer_Close__3Ixcb",Logo:"SideDrawer_Logo__3gFxi"}},function(e,t,n){"use strict";n(1);var c=n(36),r=n.n(c),a=n(0);t.a=function(){return Object(a.jsx)("div",{className:r.a.Loader,children:"Loading..."})}},function(e,t,n){"use strict";n(1);var c=n(32),r=n.n(c),a=n(0);t.a=function(e){return e.show?Object(a.jsx)("div",{className:r.a.Backdrop,onClick:e.clicked}):null}},function(e,t,n){"use strict";n(1);var c=n(28),r=n.n(c),a=n(0);t.a=function(e){return Object(a.jsx)("button",{className:r.a.Button,onClick:e.clicked,disabled:e.disabled,children:e.children})}},,,,,,function(e,t,n){e.exports={NavigationItem:"NavigationItem_NavigationItem__N95rQ",active:"NavigationItem_active__1K1Gs"}},function(e,t,n){e.exports={Toolbar:"Toolbar_Toolbar__2K9iM",DesktopOnly:"Toolbar_DesktopOnly__1kYaB"}},function(e,t,n){"use strict";var c=n(1),r=n(31),a=n.n(r),o=n(14),s=n(0),i=function(e){return Object(s.jsxs)(c.Fragment,{children:[Object(s.jsx)(o.a,{show:e.show,clicked:e.modalClosed}),Object(s.jsx)("div",{className:a.a.Modal,style:{transform:e.show?"translateY(0)":"translateY(-100vh)",opacity:e.show?"1":"0",pointerEvents:e.show?"auto":"none"},children:e.children})]})};t.a=Object(c.memo)(i,(function(e,t){return t.show===e.show}))},,function(e,t,n){"use strict";var c=n(1),r=n(2),a=n(15),o=n(29),s=n.n(o),i=n(0);t.a=function(e){var t=Object(r.h)(),n=null;n="/orders"===t.pathname?"You have ordered the following products: ":"/logout"===t.pathname?"Are you sure you want to logout?":"Are you sure you want to ".concat(e.action,' the "').concat(e.prodName,'" product?');var o="/orders"===t.pathname?Object(i.jsx)("ul",{children:e.cart.map((function(e){return Object(i.jsxs)("li",{children:[e.quantity,'x "',e.name,'";']},e.id)}))}):null;return Object(i.jsx)(c.Fragment,{children:Object(i.jsxs)("div",{className:s.a.ConfirmMessage,children:[Object(i.jsx)("h3",{children:"Confirmation"}),Object(i.jsx)("hr",{}),Object(i.jsx)("p",{children:n}),o,Object(i.jsx)(a.a,{clicked:e.clicked1,children:"Cancel"}),Object(i.jsx)(a.a,{clicked:e.clicked2,children:"OK"})]})})}},,,function(e,t,n){e.exports={Button:"Button_Button__2zMGD"}},function(e,t,n){e.exports={ConfirmMessage:"ConfirmMessage_ConfirmMessage__2wBIS"}},,function(e,t,n){e.exports={Modal:"Modal_Modal__3H_rP"}},function(e,t,n){e.exports={Backdrop:"Backdrop_Backdrop__3IiYY"}},function(e,t,n){e.exports={Content:"Layout_Content__1Vi2v"}},function(e,t,n){e.exports={NavigationItems:"NavigationItems_NavigationItems__2I9Kl"}},function(e,t,n){e.exports={DrawerToggle:"DrawerToggle_DrawerToggle__1A2xE"}},function(e,t,n){e.exports={Loader:"Spinner_Loader__2nMvP",load2:"Spinner_load2__7OmNd"}},,,,,function(e,t,n){},function(e,t,n){},,,,,,,,,,function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(27),o=n.n(a),s=n(11),i=(n(41),n(7)),l=n(8),j=n(2),u=(n(42),n(25)),d=n(23),b=n(0),O=function(e){var t=Object(c.useState)(!0),n=Object(l.a)(t,2),r=n[0],a=n[1],o=Object(j.g)(),s=function(){a(!1),o.goBack()},i=Object(b.jsx)(u.a,{clicked1:s,clicked2:function(){localStorage.removeItem("username"),localStorage.removeItem("roles"),localStorage.removeItem("isAuthenticated"),localStorage.removeItem("cart"),e.cart.length=0,e.setIsAuthenticated(!1)}});return Object(b.jsx)(c.Fragment,{children:Object(b.jsx)(d.a,{show:r,modalClosed:s,children:i})})},h=n(33),x=n.n(h),f=n(34),m=n.n(f),g=n(21),p=n.n(g),v=function(e){return Object(b.jsx)("li",{className:p.a.NavigationItem,children:Object(b.jsx)(s.b,{to:e.link,exact:e.exact,activeClassName:p.a.active,children:e.children})})},_=function(e){var t=e.roles.includes("admin")?Object(b.jsx)(v,{link:"/sales",children:"Sales"}):Object(b.jsx)(v,{link:"/orders",children:"Shopping Cart"});return Object(b.jsxs)("ul",{className:m.a.NavigationItems,children:[Object(b.jsx)(v,{link:"/products",children:"Products"}),t,Object(b.jsx)(v,{link:"/logout",children:"Logout"})]})},k=n(35),S=n.n(k),w=function(e){return Object(b.jsxs)("div",{className:S.a.DrawerToggle,onClick:e.clicked,children:[Object(b.jsx)("div",{}),Object(b.jsx)("div",{}),Object(b.jsx)("div",{})]})},N=n(22),C=n.n(N),I=function(e){return Object(b.jsxs)("header",{className:C.a.Toolbar,children:[Object(b.jsx)(w,{clicked:e.drawerToggleClicked}),Object(b.jsx)("nav",{className:C.a.DesktopOnly,children:Object(b.jsx)(_,{roles:e.roles})})]})},y=n(14),D=n(12),T=n.n(D),B=function(e){var t=[T.a.SideDrawer,T.a.Close];return e.open&&(t=[T.a.SideDrawer,T.a.Open]),Object(b.jsxs)(c.Fragment,{children:[Object(b.jsx)(y.a,{show:e.open,clicked:e.closed}),Object(b.jsx)("div",{className:t.join(" "),onClick:e.closed,children:Object(b.jsx)("nav",{children:Object(b.jsx)(_,{roles:e.roles})})})]})},A=function(e){var t=Object(c.useState)(!1),n=Object(l.a)(t,2),r=n[0],a=n[1];return Object(b.jsxs)(c.Fragment,{children:[e.isAuthenticated?Object(b.jsxs)(c.Fragment,{children:[Object(b.jsx)(I,{roles:e.roles,drawerToggleClicked:function(){a(!r)}}),Object(b.jsx)(B,{roles:e.roles,open:r,closed:function(){a(!1)}})]}):null,Object(b.jsx)("main",{className:x.a.Content,children:e.children})]})},F=n(13),M=function(){var e=Object(j.g)();return Object(c.useEffect)((function(){setTimeout((function(){e.replace("/")}),1e3)}),[e]),Object(b.jsxs)("div",{style:{textAlign:"center"},children:[Object(b.jsx)("h1",{children:"Page not found!"}),Object(b.jsx)("h3",{children:"Redirecting..."}),Object(b.jsx)(F.a,{})]})},P=r.a.lazy((function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,98))})),L=r.a.lazy((function(){return Promise.all([n.e(0),n.e(8)]).then(n.bind(null,99))})),E=r.a.lazy((function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,104))})),z=r.a.lazy((function(){return Promise.all([n.e(0),n.e(4)]).then(n.bind(null,100))})),J=r.a.lazy((function(){return Promise.all([n.e(0),n.e(9)]).then(n.bind(null,101))})),Y=Object(j.i)((function(e){var t=Object(c.useState)([]),n=Object(l.a)(t,2),r=n[0],a=n[1],o=Object(c.useState)([]),s=Object(l.a)(o,2),u=s[0],d=s[1],h=Object(c.useState)(!1),x=Object(l.a)(h,2),f=x[0],m=x[1],g=Object(c.useState)(),p=Object(l.a)(g,2),v=p[0],_=p[1],k=JSON.parse(localStorage.getItem("isAuthenticated"));Object(c.useEffect)((function(){k&&(_(localStorage.getItem("username")),d(JSON.parse(localStorage.getItem("roles"))),m(!0))}),[k]),Object(c.useEffect)((function(){var e=JSON.parse(localStorage.getItem("cart"))||[];a(e)}),[]),Object(c.useEffect)((function(){localStorage.setItem("cart",JSON.stringify(r))}),[r]);var S=null;return S=k?Object(b.jsxs)(j.d,{children:[Object(b.jsx)(j.b,{path:"/products",exact:!0,render:function(e){return Object(b.jsx)(L,Object(i.a)(Object(i.a)({},e),{},{roles:u}))}}),Object(b.jsx)(j.b,{path:"/products/:id",render:function(e){return Object(b.jsx)(E,Object(i.a)(Object(i.a)({},e),{},{cart:r,setCart:a,roles:u}))}}),Object(b.jsx)(j.b,{path:"/sales",render:function(e){return Object(b.jsx)(J,Object(i.a)({},e))}}),Object(b.jsx)(j.b,{path:"/orders",render:function(e){return Object(b.jsx)(z,Object(i.a)(Object(i.a)({},e),{},{cart:r,setCart:a,user:v}))}}),Object(b.jsx)(j.b,{path:"/logout",render:function(){return Object(b.jsx)(O,{setIsAuthenticated:m,cart:r})}}),Object(b.jsx)(j.b,{path:"/",exact:!0,children:Object(b.jsx)(j.a,{to:"/products"})}),Object(b.jsx)(j.b,{path:"*",children:Object(b.jsx)(M,{})})]}):Object(b.jsxs)(j.d,{children:[Object(b.jsx)(j.b,{path:"/auth",render:function(e){return Object(b.jsx)(P,Object(i.a)(Object(i.a)({},e),{},{authenticated:f,setIsAuthenticated:m,setRoles:d,setUser:_}))}}),Object(b.jsx)(j.b,{path:"/",children:Object(b.jsx)(j.a,{to:"/auth"})})]}),Object(b.jsx)("div",{children:Object(b.jsx)(A,{isAuthenticated:f,roles:u,children:Object(b.jsx)(c.Suspense,{fallback:Object(b.jsx)(F.a,{}),children:S})})})})),K=function(e){e&&e instanceof Function&&n.e(11).then(n.bind(null,102)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),c(e),r(e),a(e),o(e)}))};o.a.render(Object(b.jsx)(s.a,{children:Object(b.jsx)(Y,{})}),document.getElementById("root")),K()}],[[52,2,3]]]);
//# sourceMappingURL=main.c8b0f852.chunk.js.map