"use strict";(self.webpackChunkgallery_frontend=self.webpackChunkgallery_frontend||[]).push([[997],{3997:function(e,a,n){n.r(a),n.d(a,{default:function(){return w}});var o=n(3032),t=n(5531),l=n(3430),r=n(4322),i=n.n(r),s=n(2791),p=n(6272),d=n(4810),c=n(9293),u="ModalUpload_modalUploadWrapper__dIz44",m="ModalUpload_modalUploadPlaceholder__HOjzg",f="ModalUpload_modalUploadArea__m-Y3S",g="ModalUpload_modalUploadImagesPreviewWrapper__saC+d",_="ModalUpload_modalUploadImageDeleteButton__bqRum",h="ModalUpload_modalUploadImagesPreview__odxiO",v="ModalUpload_modalButtonWrapper__VsVRZ",x="ModalUpload_modalUploadButton__xwD2o",U="ModalUpload_spinnerBackdrop__iOmaU",j=n(184),w=function(e){var a=e.isLoading,n=e.setIsLoading,r=e.modalCloseHandle,w=(0,s.useState)([]),D=(0,l.Z)(w,2),N=D[0],k=D[1],b=(0,s.useState)([]),y=(0,l.Z)(b,2),I=y[0],C=y[1],M=c.Z.imagesStoreSettings.uploadImages,S=function(e){e.preventDefault(),e.stopPropagation();try{var a="drop"===e.type?e.dataTransfer.files:e.target.files;if(a.length&&a.length+N.length<6)for(var n=function(e){var n=a[e];k((function(e){return[].concat((0,t.Z)(e),[{previewImageName:n.name,previewImageSource:URL.createObjectURL(n)}])})),I.push(n)},o=0;o<a.length;o+=1)n(o)}catch(l){(0,p.O)("Error while loading files from local drive.")}},O=function(){var e=(0,o.Z)(i().mark((function e(){var a;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n&&n(!0),a=new FormData,I.forEach((function(e){a.append("images",e)})),e.next=5,M(a);case 5:r();case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,j.jsxs)("div",{className:u,onDragOver:function(e){e.preventDefault(),e.stopPropagation()},onDrop:S,children:[!N.length&&(0,j.jsxs)("div",{className:m,children:[(0,j.jsxs)("p",{children:["Drag'n'drop your images here, ",(0,j.jsx)("br",{})," or click to open filepicker dialogue."]}),(0,j.jsx)("p",{style:{marginTop:"10px",fontSize:"16px"},children:"5 images maximum."})]}),(0,j.jsx)("input",{multiple:!0,type:"file",title:"",name:"uploadingFile",accept:"image/*",className:f,onChange:S}),N.length>0&&(0,j.jsx)("ul",{className:g,children:N.map((function(e){var a,n=e.previewImageName,o=e.previewImageSource;return(0,j.jsxs)("li",{children:[(0,j.jsx)(d.zx,{type:"button",title:"Delete from upload",className:"closeBtn "+_,icon:"icon_close",onClick:(a=n,function(){k(N.filter((function(e){return e.previewImageName!==a}))),C(I.filter((function(e){return e.name!==a})))})}),(0,j.jsx)("img",{src:o,alt:"uploading item",className:h,onDragOver:function(e){e.preventDefault(),e.stopPropagation()},onDrop:function(e){return e.preventDefault()}})]},n)}))}),(0,j.jsxs)("div",{className:v,children:[(0,j.jsx)(d.zx,{type:"button",text:"Upload",disabled:!N.length||a,className:x,onClick:O}),(0,j.jsx)(d.zx,{type:"button",text:"Clear",disabled:!N.length||a,className:x,onClick:function(){C([]),k([])}})]}),a&&(0,j.jsx)(d.$j,{side:20,backdropClassName:U})]})}}}]);
//# sourceMappingURL=997.0eb41071.chunk.js.map