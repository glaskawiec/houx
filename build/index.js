module.exports=function(e){var r={};function t(n){if(r[n])return r[n].exports;var u=r[n]={i:n,l:!1,exports:{}};return e[n].call(u.exports,u,u.exports,t),u.l=!0,u.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var u in e)t.d(n,u,function(r){return e[r]}.bind(null,u));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=1)}([function(e,r){e.exports=require("react")},function(e,r,t){"use strict";t.r(r),t.d(r,"Context",function(){return f}),t.d(r,"Provider",function(){return l}),t.d(r,"createStoreWithReducers",function(){return a}),t.d(r,"useHoux",function(){return d});var n=t(0),u=n.createContext,o=n.useContext,i=n.useReducer,c=t(0),f=u(),l=function(e){var r=e.store,t=e.children;return c.createElement(f.Provider,{value:i(r,r())},t)},a=function(e){return function(r,t){for(var n={},u=Object.entries(e),o=0;o<u.length;o++){var i=u[o],c=i[0],f=i[1];n[c]=f(r&&r[c],t)}return n}},d=function(){return o(f)}}]);