"use strict";(self["webpackChunkvue_final"]=self["webpackChunkvue_final"]||[]).push([[797],{1630:function(t,s,a){a.d(s,{Z:function(){return g}});var e=a(6252),i=a(71);const c={class:"loading-bg"},l=(0,e._)("div",{class:"loading"},[(0,e._)("img",{src:i,alt:"shaved-ice"}),(0,e._)("span"),(0,e._)("span"),(0,e._)("span"),(0,e._)("span")],-1),n=[l];function o(t,s){return(0,e.wg)(),(0,e.iD)("div",c,n)}var r=a(3744);const d={},u=(0,r.Z)(d,[["render",o]]);var g=u},9797:function(t,s,a){a.r(s),a.d(s,{default:function(){return T}});var e=a(6252),i=a(3577),c=a(9963);const l={class:"container"},n=(0,e._)("h2",{class:"text-center my-4"},[(0,e.Uk)(" 最新消息"),(0,e._)("br"),(0,e._)("span",{class:"text-primary fs-6"},"— 島入新聞 —")],-1),o=(0,e._)("i",{class:"bi bi-arrow-left"},null,-1),r=(0,e.Uk)(" 返回全部 "),d=[o,r],u={class:"row row-cols-md-2 row-cols-1 gx-4"},g={class:"article card mb-4 col"},p={class:"row g-0"},_={class:"col-md-4 d-flex align-items-center"},h=["src"],m={class:"col-md-8"},v={class:"card-body h-100 d-flex flex-column justify-content-between"},f={class:"mb-2"},w={class:"card-title fw-bold"},b={class:"text-muted"},k={class:"me-2"},x=(0,e._)("i",{class:"bi bi-pencil"},null,-1),y=(0,e._)("i",{class:"bi bi-calendar3"},null,-1),D={class:"card-text mt-2"},L=["onClick"],C=["onClick"];function z(t,s,a,o,r,z){const A=(0,e.up)("Loader"),U=(0,e.up)("Loading"),Z=(0,e.up)("router-link");return(0,e.wg)(),(0,e.iD)(e.HY,null,[(0,e.Wm)(U,{active:r.isLoading,opacity:.8,"z-index":1e3},{default:(0,e.w5)((()=>[(0,e.Wm)(A)])),_:1},8,["active","opacity"]),(0,e._)("div",l,[n,r.tag?((0,e.wg)(),(0,e.iD)("button",{key:0,class:"btn btn-sm btn-outline-dark mb-2",type:"button",onClick:s[0]||(s[0]=t=>z.getArticles())},d)):(0,e.kq)("",!0),(0,e._)("div",u,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(r.articles,(t=>((0,e.wg)(),(0,e.iD)("div",{key:t.id,class:"col"},[(0,e._)("div",g,[(0,e.Wm)(Z,{to:`/news/${t.id}`},{default:(0,e.w5)((()=>[(0,e._)("div",p,[(0,e._)("div",_,[(0,e._)("img",{src:t.image,class:"img-fluid"},null,8,h)]),(0,e._)("div",m,[(0,e._)("div",v,[(0,e._)("div",f,[(0,e._)("h5",w,(0,i.zw)(t.title),1),(0,e._)("small",b,[(0,e._)("span",k,[x,(0,e.Uk)(" "+(0,i.zw)(t.author),1)]),y,(0,e.Uk)(" "+(0,i.zw)(new Date(1e3*t.create_at).toLocaleDateString()),1)]),(0,e._)("p",D,(0,i.zw)(t.description),1)]),(0,e._)("div",null,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(t.tag,((t,s)=>((0,e.wg)(),(0,e.iD)("span",{key:s,class:"me-1",onClick:s=>z.getTagArticle(t)},[(0,e._)("a",{class:"tag badge",href:"#",onClick:(0,c.iM)((s=>z.getTagArticle(t)),["prevent"])},(0,i.zw)(t),9,C)],8,L)))),128))])])])])])),_:2},1032,["to"])])])))),128))])])],64)}var A=a(1630),U={components:{Loader:A.Z},data(){return{articles:[],tag:"",isLoading:!0}},methods:{getArticles(){this.tag="";const t="https://vue3-course-api.hexschool.io/v2/api/yunei/articles";this.isLoading=!0,this.$http.get(t).then((t=>{this.articles=t.data.articles,this.isLoading=!1})).catch((t=>{this.$httpMessageState(t.response,t.response.data.message)}))},getTagArticle(t){this.tag=t;const s=[];this.articles.forEach((a=>{a.tag.forEach((e=>{e===t&&s.push(a)}))})),this.articles=s}},mounted(){this.getArticles()}},Z=a(3744);const H=(0,Z.Z)(U,[["render",z]]);var T=H},71:function(t,s,a){t.exports=a.p+"img/daoru-logo02.79d17a46.png"}}]);
//# sourceMappingURL=797.0bca1f13.js.map