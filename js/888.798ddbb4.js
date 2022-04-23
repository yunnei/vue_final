"use strict";(self["webpackChunkvue_final"]=self["webpackChunkvue_final"]||[]).push([[888],{7888:function(e,t,a){a.r(t),a.d(t,{default:function(){return ke}});var i=a(6252),l=a(3577);const s={class:"container py-4"},c=(0,i._)("h2",null,"貼文",-1),o={class:"text-end"},n={class:"row row-cols-3 g-2 my-3"},r={class:"card p-0 h-100"},d={class:"card-body d-flex flex-column justify-content-between"},p={class:"mb-4"},m={class:"d-flex justify-content-between align-items-center mb-1"},u={class:"card-title fw-bold"},h={class:"fs-6 fw-normal text-muted"},g={class:"card-text card-truncate"},b={class:"d-flex justify-content-between align-items-end"},f={key:0,class:"text-success fw-bold"},_=(0,i.Uk)(" 已發布"),w=(0,i._)("i",{class:"bi bi-check"},null,-1),v=[_,w],T={key:1,class:"text-muted"},y=["onClick"],k=["onClick"];function M(e,t,a,_,w,M){const $=(0,i.up)("Pagination"),x=(0,i.up)("ArticleModal"),D=(0,i.up)("DelModal");return(0,i.wg)(),(0,i.iD)("div",s,[c,(0,i._)("div",o,[(0,i._)("button",{class:"btn btn-primary",type:"button",onClick:t[0]||(t[0]=e=>M.openModal("new"))}," + 新增貼文 ")]),(0,i._)("div",n,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(w.articles,(e=>((0,i.wg)(),(0,i.iD)("div",{key:e.id,class:"col"},[(0,i._)("div",r,[(0,i._)("div",d,[(0,i._)("div",p,[(0,i._)("div",m,[(0,i._)("h5",u,(0,l.zw)(e.title),1),(0,i._)("span",h,(0,l.zw)(new Date(1e3*e.create_at).toLocaleDateString()),1)]),(0,i._)("p",g,(0,l.zw)(e.description),1)]),(0,i._)("div",b,[(0,i._)("div",null,[e.isPublic?((0,i.wg)(),(0,i.iD)("span",f,v)):((0,i.wg)(),(0,i.iD)("span",T,"未發布"))]),(0,i._)("div",null,[(0,i._)("button",{class:"btn btn-primary me-1",type:"button",onClick:t=>M.getArticle(e.id)}," 編輯 ",8,y),(0,i._)("button",{class:"btn btn-outline-danger",type:"button",onClick:t=>M.openModal("del",e)}," 刪除 ",8,k)])])])])])))),128))]),(0,i.Wm)($,{pagination:w.pagination,onGetData:M.getArticles},null,8,["pagination","onGetData"]),(0,i.Wm)(x,{article:w.articleTemp,"is-new":w.isNew,onUpdateArticle:M.updateArticle,ref:"articleModal"},null,8,["article","is-new","onUpdateArticle"]),(0,i.Wm)(D,{ref:"delModal",item:w.articleTemp,onDelItem:t[1]||(t[1]=e=>M.delArticle(w.articleTemp))},null,8,["item"])])}var $=a(7424),x=a.n($),D=a(3181),A=a(1407),C=a(9963);const U={class:"modal fade",tabindex:"-1",ref:"modal"},P={class:"modal-dialog modal-xl"},S={class:"modal-content"},V={class:"modal-header bg-dark"},N={class:"modal-title text-white"},I={key:0},z={key:1},W=(0,i._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),Z={class:"modal-body"},j={class:"row"},F={class:"col-4"},L={class:"mb-3"},q=(0,i._)("label",{for:"title",class:"form-label fs-5"},"標題",-1),G={class:"mb-3"},H=(0,i._)("label",{for:"image",class:"form-label fs-5"},"封面圖片",-1),K={class:"input-group mb-3"},Y=["src"],O={class:"mb-3"},B=(0,i._)("label",{for:"autohr",class:"form-label fs-5"},"作者",-1),E={class:"mb-3"},J=(0,i._)("label",{for:"create_at",class:"form-label fs-5"}," 建立日期 ",-1),Q={class:"col-8"},R={class:"mb-3"},X=(0,i._)("label",{for:"description",class:"form-label fs-5"},"描述",-1),ee={class:"mb-3"},te=(0,i._)("p",{class:"form-label fs-5"},"內文",-1),ae={class:"mb-3"},ie=(0,i._)("label",{for:"description",class:"form-label fs-5"},"標籤",-1),le={class:"mb-2 fs-5"},se=["onClick"],ce={class:"input-group input-group-sm mb-3 w-50"},oe={type:"text",class:"form-control",placeholder:"請輸入標籤",ref:"newTag"},ne={class:"form-check form-switch"},re={class:"form-check-label",for:"isPublic"},de={key:0},pe={key:1},me={class:"modal-footer"},ue=(0,i._)("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function he(e,t,a,s,c,o){const n=(0,i.up)("ckeditor");return(0,i.wg)(),(0,i.iD)("div",U,[(0,i._)("div",P,[(0,i._)("div",S,[(0,i._)("div",V,[(0,i._)("h5",N,[a.isNew?((0,i.wg)(),(0,i.iD)("span",I,"新增貼文")):((0,i.wg)(),(0,i.iD)("span",z,"編輯貼文"))]),W]),(0,i._)("div",Z,[(0,i._)("div",j,[(0,i._)("div",F,[(0,i._)("div",L,[q,(0,i.wy)((0,i._)("input",{type:"text",class:"form-control",id:"title",placeholder:"請輸入貼文標題","onUpdate:modelValue":t[0]||(t[0]=e=>c.articleTemp.title=e)},null,512),[[C.nr,c.articleTemp.title]])]),(0,i._)("div",G,[H,(0,i._)("div",K,[(0,i.wy)((0,i._)("input",{type:"text",class:"form-control",id:"image",placeholder:"請輸入圖片網址","onUpdate:modelValue":t[1]||(t[1]=e=>c.articleTemp.image=e)},null,512),[[C.nr,c.articleTemp.image]]),(0,i._)("button",{class:"btn btn-outline-danger",type:"button",id:"image",onClick:t[2]||(t[2]=e=>c.articleTemp.image="")}," 刪除 ")]),c.articleTemp.image?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("input",{key:0,class:"form-control",type:"file",ref:"imageFile",onChange:t[3]||(t[3]=(...e)=>o.uploadImage&&o.uploadImage(...e))},null,544)),c.articleTemp.image?((0,i.wg)(),(0,i.iD)("img",{key:1,class:"mt-4 img-fluid",src:c.articleTemp.image},null,8,Y)):(0,i.kq)("",!0)]),(0,i._)("div",O,[B,(0,i.wy)((0,i._)("input",{type:"text",class:"form-control",id:"autohr",placeholder:"請輸入作者名稱","onUpdate:modelValue":t[4]||(t[4]=e=>c.articleTemp.author=e)},null,512),[[C.nr,c.articleTemp.author]])]),(0,i._)("div",E,[J,(0,i.wy)((0,i._)("input",{type:"date",class:"form-control",id:"create_at","onUpdate:modelValue":t[5]||(t[5]=e=>c.create_date=e)},null,512),[[C.nr,c.create_date]])])]),(0,i._)("div",Q,[(0,i._)("div",R,[X,(0,i.wy)((0,i._)("textarea",{class:"form-control",id:"description",rows:"3","onUpdate:modelValue":t[6]||(t[6]=e=>c.articleTemp.description=e)},null,512),[[C.nr,c.articleTemp.description]])]),(0,i._)("div",ee,[te,(0,i.Wm)(n,{editor:c.editor,config:c.editorConfig,modelValue:c.articleTemp.content,"onUpdate:modelValue":t[7]||(t[7]=e=>c.articleTemp.content=e)},null,8,["editor","config","modelValue"])]),(0,i._)("div",ae,[ie,(0,i._)("div",le,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(c.articleTemp.tag,((e,t)=>((0,i.wg)(),(0,i.iD)("span",{key:t,class:"badge bg-secondary text-dark me-1"},[(0,i.Uk)((0,l.zw)(e)+" ",1),(0,i._)("a",{href:"#",onClick:(0,C.iM)((e=>c.articleTemp.tag.splice(t,1)),["prevent"])}," x ",8,se)])))),128))]),(0,i._)("div",ce,[(0,i._)("input",oe,null,512),(0,i._)("button",{class:"btn btn-outline-dark",type:"button",onClick:t[8]||(t[8]=(...e)=>o.addTag&&o.addTag(...e))}," 新增 ")])]),(0,i._)("div",ne,[(0,i.wy)((0,i._)("input",{class:"form-check-input",type:"checkbox",role:"switch",id:"isPublic","onUpdate:modelValue":t[9]||(t[9]=e=>c.articleTemp.isPublic=e),"true-value":!0,"false-value":!1},null,512),[[C.e8,c.articleTemp.isPublic]]),(0,i._)("label",re,[c.articleTemp.isPublic?((0,i.wg)(),(0,i.iD)("span",de,"發布")):((0,i.wg)(),(0,i.iD)("span",pe,"未發布"))])])])])]),(0,i._)("div",me,[ue,(0,i._)("button",{type:"button",class:"btn btn-primary",onClick:t[10]||(t[10]=(...e)=>o.updateArticle&&o.updateArticle(...e))}," 確認 ")])])])],512)}var ge=a(5234),be=a.n(ge),fe={props:["article","isNew"],data(){return{articleTemp:{},create_date:"",modal:{},editor:be(),editorConfig:{toolbar:["heading","bold","italic","link","|","numberedList","bulletedList","|"]}}},watch:{article(){this.articleTemp=this.article,this.create_date=new Date(1e3*this.articleTemp.create_at).toISOString().split("T")[0]},create_date(){this.articleTemp.create_at=new Date(this.create_date).getTime()/1e3}},methods:{updateArticle(){this.$emit("update-article",this.articleTemp)},addTag(){this.articleTemp.tag?this.articleTemp.tag.push(this.$refs.newTag.value):this.articleTemp.tag=[`${this.$refs.newTag.value}`],this.$refs.newTag.value=""},uploadImage(){const e=this.$refs.imageFile.files[0],t=new FormData;t.append("file-to-upload",e);const a="https://vue3-course-api.hexschool.io/v2/api/yunei/admin/upload";this.$http.post(a,t).then((e=>{this.articleTemp.image=e.data.imageUrl})).catch((e=>{console.log(e.response.data)}))}},mounted(){this.modal=this.$refs.modal}},_e=a(3744);const we=(0,_e.Z)(fe,[["render",he]]);var ve=we,Te={components:{DelModal:D.Z,Pagination:A.Z,ArticleModal:ve},data(){return{articles:[],pagination:{},isNew:!1,articleTemp:{tag:[]},create_date:"",articleModal:{},delModal:{}}},methods:{openModal(e,t){"new"===e?(this.isNew=!0,this.articleTemp={create_at:(new Date).getTime()/1e3,isPublic:!1,tag:[]},this.articleModal.show()):"edit"===e?(this.isNew=!1,this.articleTemp={...t},this.articleModal.show()):"del"===e&&(this.articleTemp={...t},this.delModal.show())},getArticles(e=1){const t=`https://vue3-course-api.hexschool.io/v2/api/yunei/admin/articles?page=${e}`;this.$http.get(t).then((e=>{this.articles=e.data.articles,this.pagination=e.data.pagination})).catch((e=>{this.$httpMessageState(e.response,e.response.data.message)}))},getArticle(e){const t=`https://vue3-course-api.hexschool.io/v2/api/yunei/admin/article/${e}`;this.$http.get(t).then((e=>{this.openModal("edit",e.data.article)})).catch((e=>{this.$httpMessageState(e.response,e.response.data.message)}))},updateArticle(){let e=`https://vue3-course-api.hexschool.io/v2/api/yunei/admin/article/${this.articleTemp.id}`,t="put",a=`新增 ${this.articleTemp.title}`;this.isNew&&(e="https://vue3-course-api.hexschool.io/v2/api/yunei/admin/article",t="post",a=`更新 ${this.articleTemp.title}`);const i={data:this.articleTemp};this.$http[t](e,i).then((e=>{this.$httpMessageState(e,a),this.getArticles(),this.articleModal.hide()})).catch((e=>{this.$httpMessageState(e.response,e.response.data.message)}))},delArticle(e){const t=`https://vue3-course-api.hexschool.io/v2/api/yunei/admin/article/${e.id}`;this.$http.delete(t).then((e=>{this.$httpMessageState(e,`刪除 ${this.articleTemp.title}`),this.getArticles(this.pagination.current_page),this.delModal.hide()})).catch((e=>{this.$httpMessageState(e.response,e.response.data.message)}))}},mounted(){this.articleModal=new(x())(this.$refs.articleModal.modal),this.delModal=new(x())(this.$refs.delModal.modal),this.getArticles()}};const ye=(0,_e.Z)(Te,[["render",M]]);var ke=ye}}]);
//# sourceMappingURL=888.798ddbb4.js.map