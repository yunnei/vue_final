"use strict";(self["webpackChunkvue_final"]=self["webpackChunkvue_final"]||[]).push([[51],{1630:function(t,e,s){s.d(e,{Z:function(){return u}});var a=s(6252),i=s(71);const n={class:"loading-bg"},o=(0,a._)("div",{class:"loading"},[(0,a._)("img",{src:i,alt:"shaved-ice"}),(0,a._)("span"),(0,a._)("span"),(0,a._)("span"),(0,a._)("span")],-1),r=[o];function c(t,e){return(0,a.wg)(),(0,a.iD)("div",n,r)}var d=s(3744);const l={},p=(0,d.Z)(l,[["render",c]]);var u=p},2051:function(t,e,s){s.r(e),s.d(e,{default:function(){return L}});var a=s(6252),i=s(3577);const n={class:"container"},o={class:"my-4"},r=(0,a._)("h2",{class:"text-center my-4"},[(0,a.Uk)(" 宅配專區"),(0,a._)("br"),(0,a._)("span",{class:"text-primary fs-6"},"— 手工製作 低鹽健康 —")],-1),c={class:"row"},d={class:"card border-gray text-center h-100"},l=["src","alt"],p=(0,a._)("button",{class:"btn btn-dark",type:"button"},"更多細節",-1),u={class:"card-body px-1 d-flex flex-column justify-content-between"},g={class:"card-title"},h={key:0,class:"card-text fs-5 fw-bold text-dark mx-2"},_={key:1,class:"card-text fw-bold text-danger fs-4"},b={class:"text-muted fw-normal fs-5"},f=["onClick","disabled"],m=(0,a._)("div",{class:"bg-secondary text-center"},[(0,a._)("h5",{class:"fs-5 fw-bold mb-4 bg-dark text-white py-2 rounded-top"}," 配送須知 / 風險承擔 "),(0,a._)("p",{class:"lh-lg text-dark pb-4"},[(0,a.Uk)(" 軟綿綿的豆腐乳於玻璃罐中很嬌弱，"),(0,a._)("br"),(0,a.Uk)(" 因運送時難免碰撞或嚴重搖晃，"),(0,a._)("br"),(0,a.Uk)(" 可能導致豆腐乳無法維持完整的型態"),(0,a._)("br"),(0,a.Uk)(" 並不影響風味及食用，無法因此退貨，"),(0,a._)("br"),(0,a.Uk)(" 介意者可親至我方門市選購。 ")])],-1);function v(t,e,s,v,k,w){const x=(0,a.up)("Loader"),y=(0,a.up)("Loading"),$=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(y,{active:k.isLoading,opacity:.8,"z-index":1e3},{default:(0,a.w5)((()=>[(0,a.Wm)(x)])),_:1},8,["active","opacity"]),(0,a._)("div",n,[(0,a._)("div",o,[r,(0,a._)("div",c,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(k.products,(t=>((0,a.wg)(),(0,a.iD)("div",{key:t.id,class:"col-md-6 col-lg-3 mt-2"},[(0,a._)("div",d,[(0,a.Wm)($,{class:"image",to:`/product/${t.id}`},{default:(0,a.w5)((()=>[(0,a._)("img",{src:t.imageUrl,class:"card-img-top",alt:t.title},null,8,l),p])),_:2},1032,["to"]),(0,a._)("div",u,[(0,a._)("h5",g,[(0,a.Wm)($,{class:"text-dark",to:{path:`/product/${t.id}`}},{default:(0,a.w5)((()=>[(0,a.Uk)((0,i.zw)(t.title),1)])),_:2},1032,["to"])]),(0,a._)("div",null,[t.price===t.origin_price?((0,a.wg)(),(0,a.iD)("p",h," $ "+(0,i.zw)(t.price),1)):((0,a.wg)(),(0,a.iD)("p",_,[(0,a.Uk)(" $ "+(0,i.zw)(t.price)+" ",1),(0,a._)("del",b," $ "+(0,i.zw)(t.origin_price),1)])),(0,a._)("button",{type:"button",class:"btn btn-outline-dark mx-2",onClick:e=>w.addToCart(t),disabled:k.btnLoading}," 加入購物車 ",8,f)])])])])))),128))])]),m])],64)}var k=s(9868),w=s(1630),x={components:{Loader:w.Z},data(){return{products:[],isLoading:!0,btnLoading:!1}},methods:{getProducts(t=1){let e=`https://vue3-course-api.hexschool.io/v2/api/yunei/products?page=${t}&category=宅配`;this.isLoading=!0,this.$http.get(e).then((t=>{this.products=t.data.products,this.isLoading=!1})).catch((t=>{this.$httpMessageState(t.response,t.response.data.message)}))},addToCart(t,e=1){const s={data:{product_id:t.id,qty:e}},a="https://vue3-course-api.hexschool.io/v2/api/yunei/cart";this.btnLoading=!0,this.$http.post(a,s).then((e=>{this.$httpMessageState(e,`將 ${t.title} 加入購物車`),k.Z.emit("get-cart"),this.btnLoading=!1})).catch((t=>{this.$httpMessageState(t.response,t.response.data.message)}))}},mounted(){this.getProducts()}},y=s(3744);const $=(0,y.Z)(x,[["render",v]]);var L=$},71:function(t,e,s){t.exports=s.p+"img/daoru-logo02.79d17a46.png"}}]);
//# sourceMappingURL=51.a3d22cd9.js.map