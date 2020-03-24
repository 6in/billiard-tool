webpackJsonp([1],{"/XeC":function(t,e){},"7EO3":function(t,e){},AVHs:function(t,e){},Ba62:function(t,e){},NHnr:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r("fZjL"),n=r.n(o),i=r("7+uW"),a={name:"pool",data:function(){return{title:"this is pool",drag:{obj:null,offsetX:0,offsetY:0},ob2cb_disp:!0,block:100}},props:{radius:{type:String,default:"9.0"},pk:{type:Object},cb:{type:Object},ob:{type:Object}},computed:{r:function(){return Number(this.radius)},gb:function(){var t=this,e=t.getRadianOb(t.ob,t.pk)+Math.PI,r=t.ob.cx+2*t.r*Math.cos(e),o=t.ob.cy+2*t.r*Math.sin(e),n=t.getRadian(t.cb.cx,t.cb.cy,r,o)+Math.PI,i=t.toDegree(e)-t.toDegree(n);return t.$emit("degreeGB2CB",Math.floor(i)),t.$emit("setGB",{cx:r,cy:o}),{cx:r,cy:o}},gb2:function(){var t=this,e=t.getRadianOb(t.ob,t.pk)+Math.PI;return{cx:t.ob.cx+10*t.r*Math.cos(e),cy:t.ob.cy+10*t.r*Math.sin(e)}},tan:function(){var t=this,e=t.getRadianOb(t.ob,t.pk)+Math.PI,r=t.ob.cx+2*t.r*Math.cos(e),o=t.ob.cy+2*t.r*Math.sin(e);e-=Math.PI/2;var n=r+20*t.r*Math.cos(e),i=o+20*t.r*Math.sin(e);return e+=Math.PI,{x1:n,y1:i,x2:r+20*t.r*Math.cos(e),y2:o+20*t.r*Math.sin(e)}},pockets:function(){for(var t=[],e=0;e<3;e++){var r=0;switch(e){case 0:r=this.r;break;case 1:r=0;break;case 2:r=-this.r}for(var o=0;o<2;o++){var n=this.r-o*this.r*2;t.push({x:400*o+n,y:400*e+r})}}return t}},mounted:function(){var t=this,e=t.$refs,r=e.svg,o=e.cb,n=e.ob,i=e.cb2,a=e.ob2;r.addEventListener("mousemove",function(e){return t.mouseMove(e)},!1),r.addEventListener("touchmove",function(e){return t.mouseMove(e)},!1),r.addEventListener("mouseup",function(e){return t.mouseUp(e)},!1),r.addEventListener("touchend",function(e){return t.mouseUp(e)},!1),t.moveable(o),t.moveable(n),t.moveable(i),t.moveable(a),t.$refs.pocket.forEach(function(e){e.addEventListener("mousedown",function(e){return t.onSelectPocket(e)}),e.addEventListener("touchstart",function(e){return t.onSelectPocket(e)})})},methods:{moveable:function(t){var e=this;t.addEventListener("mousedown",function(t){return e.mouseDown(t)},!1),t.addEventListener("touchstart",function(t){return e.mouseDown(t)},!1),t.addEventListener("mousemove",function(t){return e.mouseMove(t)},!1),t.addEventListener("touchmove",function(t){return e.mouseMove(t)},!1),t.addEventListener("mouseup",function(t){return e.mouseUp(t)},!1),t.addEventListener("touchend",function(t){return e.mouseUp(t)},!1)},getRadianOb:function(t,e){return Math.atan2(e.cy-t.cy,e.cx-t.cx)},getRadian:function(t,e,r,o){return Math.atan2(o-e,r-t)},toDegree:function(t){return 180*t/Math.PI},screenPointToSVGPoint:function(t,e,r,o){var n=t.createSVGPoint();n.x=r,n.y=o;var i=e.getScreenCTM();return n.matrixTransform(i.inverse())},mousePointToSVGPoint:function(t){return this.screenPointToSVGPoint(this.$refs.svg,this.drag.obj,t.clientX,t.clientY)},mouseDown:function(t){var e="mousedown"===t.type?t:t.changedTouches[0],r=e.target;"circle"===r.tagName&&(this.drag={obj:r,offsetX:Number(r.getAttribute("cx")),offsetY:Number(r.getAttribute("cy"))}),e.preventDefault()},mouseUp:function(t){this.drag.obj=null,this.$emit("moveEnd")},mouseMove:function(t){if(this.drag.obj){var e="mousemove"===t.type?t:t.changedTouches[0],r=this.mousePointToSVGPoint(e);this.$emit("moveBall",{target:this.drag.obj.id,cx:r.x,cy:r.y}),e.preventDefault()}},onSelectPocket:function(t){var e=("mousedown"===t.type?t:t.changedTouches[0]).target;this.$emit("selectPocket",{x:e.getAttribute("cx"),y:e.getAttribute("cy")})}}},c={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("svg",{ref:"svg",attrs:{width:"400",height:"800"}},[r("g",[r("g",t._l(4,function(e){return r("line",{key:e,attrs:{x1:-t.block/2+t.block*e,y1:0,x2:-t.block/2+t.block*e,y2:800,stroke:"lightgray","stroke-width":"1","stroke-dasharray":"2 2"}})}),0),t._v(" "),r("g",t._l(8,function(e){return r("line",{key:e,attrs:{x1:0,y1:-t.block/2+t.block*e,x2:400,y2:-t.block/2+t.block*e,stroke:"lightgray","stroke-width":"1","stroke-dasharray":"2 2"}})}),0),t._v(" "),r("g",t._l(3,function(e){return r("line",{key:e,attrs:{x1:t.block*e,y1:0,x2:t.block*e,y2:800,stroke:"lightgray","stroke-width":"1"}})}),0),t._v(" "),r("g",t._l(7,function(e){return r("line",{key:e,attrs:{x1:0,y1:t.block*e,x2:400,y2:t.block*e,stroke:"lightgray","stroke-width":"1"}})}),0),t._v(" "),r("g",t._l(t.pockets,function(e,o){return r("circle",{key:o,ref:"pocket",refInFor:!0,attrs:{cx:e.x,cy:e.y,r:(t.block-t.r)/2,fill:"rgba(0,0,255,0.2)"}})}),0)]),t._v(" "),r("circle",{ref:"cb2",attrs:{id:"cb",cx:t.cb.cx,cy:t.cb.cy,r:4*t.r,fill:"rgba(0,0,0,0)"}}),t._v(" "),r("circle",{ref:"cb",staticStyle:{fill:"white"},attrs:{id:"cb",cx:t.cb.cx,cy:t.cb.cy,r:t.r}}),t._v(" "),r("circle",{ref:"ob2",attrs:{id:"ob",cx:t.ob.cx,cy:t.ob.cy,r:4*t.r,fill:"rgba(0,0,0,0)"}}),t._v(" "),r("circle",{ref:"ob",attrs:{id:"ob",cx:t.ob.cx,cy:t.ob.cy,r:t.r,fill:"yellow"}}),t._v(" "),r("circle",{ref:"gb",attrs:{id:"gb",cx:t.gb.cx,cy:t.gb.cy,r:t.r,fill:"gray",stroke:"black"}}),t._v(" "),r("line",{attrs:{x1:t.pk.cx,y1:t.pk.cy,x2:t.ob.cx,y2:t.ob.cy,stroke:"black","stroke-width":"1"}}),t._v(" "),r("line",{attrs:{x1:t.gb.cx,y1:t.gb.cy,x2:t.cb.cx,y2:t.cb.cy,stroke:"black","stroke-width":"1"}}),t._v(" "),r("line",{attrs:{x1:t.ob.cx,y1:t.ob.cy,x2:t.gb.cx,y2:t.gb.cy,stroke:"black","stroke-width":"1"}}),t._v(" "),r("line",{attrs:{x1:t.gb.cx,y1:t.gb.cy,x2:t.gb2.cx,y2:t.gb2.cy,stroke:"black","stroke-width":"1"}}),t._v(" "),r("line",{attrs:{x1:t.tan.x1,y1:t.tan.y1,x2:t.tan.x2,y2:t.tan.y2,stroke:"white","stroke-width":"1"}}),t._v(" "),t.ob2cb_disp?r("g",[r("line",{attrs:{x1:t.ob.cx,y1:t.ob.cy,x2:t.cb.cx,y2:t.cb.cy,stroke:"blue","stroke-width":"1"}})]):t._e(),t._v(" "),null!=t.drag.obj&&"cb"==t.drag.obj.id?r("g",[r("line",{attrs:{x1:t.cb.cx,y1:0,x2:t.cb.cx,y2:800,stroke:"pink","stroke-width":"1","stroke-dasharray":"8 8"}}),t._v(" "),r("line",{attrs:{x1:0,y1:t.cb.cy,x2:400,y2:t.cb.cy,stroke:"pink","stroke-width":"1","stroke-dasharray":"8 8"}})]):t._e(),t._v(" "),null!=t.drag.obj&&"ob"==t.drag.obj.id?r("g",[r("line",{attrs:{x1:t.ob.cx,y1:0,x2:t.ob.cx,y2:800,stroke:"pink","stroke-width":"1","stroke-dasharray":"8 8"}}),t._v(" "),r("line",{attrs:{x1:0,y1:t.ob.cy,x2:400,y2:t.ob.cy,stroke:"pink","stroke-width":"1","stroke-dasharray":"8 8"}})]):t._e()])])},staticRenderFns:[]};var s=r("VU/8")(a,c,!1,function(t){r("QKtQ")},"data-v-c779865e",null).exports,l={name:"ContactPoint",data:function(){return{r:80,cx:200,cy:300}},props:{degree:{type:Number,default:0},dispDegree:{type:Number,default:0}},computed:{ob:function(){var t=this,e=(90-t.degree)*Math.PI/180;return{cx:t.cx+2*t.r*Math.cos(e),cy:t.cy-2*t.r*Math.sin(e)}},cp:function(){var t=this,e=(90-t.degree)*Math.PI/180;return{cx:t.cx+t.r*Math.cos(e),cy:t.cy-t.r*Math.sin(e)}},halfLine:function(){var t=this,e=t.r/2,r=t.r/4,o=Math.sqrt(Math.abs(t.r*t.r-e*e)),n=Math.sqrt(Math.abs(t.r*t.r-r*r)),i=Math.sqrt(Math.abs(t.r*t.r-(r+e)*(r+e)));return[{x:t.r/2,y:o},{x:-r,y:n},{x:t.r/2+r,y:i}]}}},h={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("svg",{attrs:{width:"400",height:"400"}},[r("circle",{attrs:{cx:t.ob.cx,cy:t.ob.cy,r:t.r,fill:"yellow"}}),t._v(" "),r("circle",{attrs:{cx:t.cx,cy:t.cy,r:t.r,fill:"white"}}),t._v(" "),r("line",{attrs:{x1:t.cx,y1:400,x2:t.cx,y2:0,stroke:"black","stroke-width":"1"}}),t._v(" "),r("line",{attrs:{x1:t.cx,y1:t.cy,x2:t.ob.cx,y2:t.ob.cy,stroke:"black","stroke-width":"1"}}),t._v(" "),r("line",{attrs:{id:"ob_center",x1:t.ob.cx,y1:t.ob.cy-t.r,x2:t.ob.cx,y2:t.ob.cy+t.r,stroke:"black","stroke-width":"1"}}),t._v(" "),t._l(t.halfLine,function(e,o){return r("g",{key:o},[r("line",{attrs:{id:"ob_lhs",x1:t.ob.cx-e.x,y1:t.ob.cy-e.y,x2:t.ob.cx-e.x,y2:t.ob.cy+e.y,stroke:"black","stroke-width":"1","stroke-dasharray":"2 2"}}),t._v(" "),r("line",{attrs:{id:"ob_lhs",x1:t.ob.cx+e.x,y1:t.ob.cy-e.y,x2:t.ob.cx+e.x,y2:t.ob.cy+e.y,stroke:"black","stroke-width":"1","stroke-dasharray":"2 2"}}),t._v(" "),r("line",{attrs:{id:"gb_lhs",x1:t.cx-e.x,y1:t.cy-e.y,x2:t.cx-e.x,y2:t.cy+e.y,stroke:"black","stroke-width":"1","stroke-dasharray":"2 2"}}),t._v(" "),r("line",{attrs:{id:"gb_rhs",x1:t.cx+e.x,y1:t.cy-e.y,x2:t.cx+e.x,y2:t.cy+e.y,stroke:"black","stroke-width":"1","stroke-dasharray":"2 2"}})])}),t._v(" "),r("circle",{attrs:{cx:t.cp.cx,cy:t.cp.cy,r:4,fill:"black"}}),t._v(" "),r("text",{attrs:{x:"100",y:"30","font-size":"30",fill:"#ffffff"}},[t._v("角度: "+t._s(t.dispDegree)+" 度")])],2)])},staticRenderFns:[]};var b=r("VU/8")(l,h,!1,function(t){r("hSbY")},"data-v-a65a219e",null).exports,g={name:"flex-box",props:{alignContent:{type:String,default:"stretch"},alignItems:{type:String,default:"stretch"},direction:{type:String,default:"row"},wrap:{type:String,default:"nowrap"},justifyContent:{type:String,default:"flex-start"}}},u={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"flexbox",style:{"align-content":t.alignContent,"align-items":t.alignItems,"flex-direction":t.direction,"flex-wrap":t.wrap,"justify-content":t.justifyContent}},[t._t("default",[r("div",[t._v("content 1")]),t._v(" "),r("div",[t._v("content 2")]),t._v(" "),r("div",[t._v("content 3")])])],2)},staticRenderFns:[]};var d=r("VU/8")(g,u,!1,function(t){r("AVHs")},"data-v-e2b775a2",null).exports,v={name:"flex-item",props:{alignSelf:{type:String,default:"auto"},alignRight:{type:Boolean,default:!1},alignBottom:{type:Boolean,default:!1},marginTop:{type:String,default:void 0},basis:{type:String,default:"auto"},grow:{type:Number,default:0},order:{type:Number,default:0},shrink:{type:Number,default:1}}},f={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"flexitem",style:{"align-self":t.alignSelf,"flex-basis":t.basis,"flex-grow":t.grow,"flex-shrink":t.shrink,"margin-left":!!t.alignRight&&"auto","margin-top":t.marginTop?t.marginTop:!!t.alignBottom&&"auto",order:t.order}},[t._t("default")],2)},staticRenderFns:[]};var x=r("VU/8")(v,f,!1,function(t){r("Swa4")},"data-v-68c32d35",null).exports,y={name:"ThickBall",data:function(){return{r:80,cx:200,cy:200,thickPercent:0}},props:{degree:{type:Number,default:0},tapSize:{type:String,default:"12"}},computed:{ob:function(){var t=this,e=(90-t.degree)*Math.PI/180,r=t.cx+2*t.r*Math.cos(e),o=t.cy-2*t.r*Math.sin(e);return t.emitThickPercent({cx:r,cy:o}),{cx:r,cy:o}},cp:function(){var t=this,e=(90-t.degree)*Math.PI/180;return{cx:t.cx+t.r*Math.cos(e),cy:t.cy-t.r*Math.sin(e)}},isShowRight:function(){return this.ob.cx<this.cx},tap:function(){var t=Number(this.tapSize)*(2*this.r)/57;return{x:200-t/2,w:t}},halfLine:function(){var t=this,e=t.r/2,r=t.r/4,o=Math.sqrt(Math.abs(t.r*t.r-e*e)),n=Math.sqrt(Math.abs(t.r*t.r-r*r)),i=Math.sqrt(Math.abs(t.r*t.r-(r+e)*(r+e)));return[{x:t.r/2,y:o},{x:-r,y:n},{x:t.r/2+r,y:i}]}},methods:{emitThickPercent:function(t){var e=this,r=0,o=0;t.cx<e.cx&&(o=t.cx+e.r,r=e.cx-e.r),e.cx<t.cx&&(o=e.cx+e.r,r=t.cx-e.r);var n=Math.floor((o-r)/(2*e.r)*100);e.thickPercent=n,e.$emit("thickPercent",n)}}},m={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("svg",{attrs:{width:"400",height:"400"}},[r("circle",{attrs:{cx:t.cx,cy:t.cy,r:t.r,fill:"rgba(255,255,255,0.5)"}}),t._v(" "),r("circle",{attrs:{cx:t.ob.cx,cy:t.cy,r:t.r,fill:"rgba(255,255,0,0.5)"}}),t._v(" "),t.isShowRight?r("line",{attrs:{id:"cb_left_edge",x1:t.cx-t.r,y1:0,x2:t.cx-t.r,y2:400,stroke:"black","stroke-width":"1","stroke-dasharray":"8 8"}}):t._e(),t._v(" "),r("line",{attrs:{id:"cb_center",x1:t.cx,y1:0,x2:t.cx,y2:400,stroke:"black","stroke-width":"1"}}),t._v(" "),r("line",{attrs:{id:"ob_center",x1:t.ob.cx,y1:200-t.r,x2:t.ob.cx,y2:200+t.r,stroke:"black","stroke-width":"1"}}),t._v(" "),t.isShowRight?t._e():r("line",{attrs:{id:"cb_right_edge",x1:t.cx+t.r,y1:0,x2:t.cx+t.r,y2:400,stroke:"black","stroke-width":"1","stroke-dasharray":"8 8"}}),t._v(" "),t.isShowRight?r("line",{attrs:{id:"ob_right_edge",x1:t.ob.cx+t.r,y1:0,x2:t.ob.cx+t.r,y2:400,stroke:"black","stroke-width":"1","stroke-dasharray":"8 8"}}):t._e(),t._v(" "),t.isShowRight?t._e():r("line",{attrs:{id:"ob_left_edge",x1:t.ob.cx-t.r,y1:0,x2:t.ob.cx-t.r,y2:400,stroke:"black","stroke-width":"1","stroke-dasharray":"8 8"}}),t._v(" "),r("circle",{attrs:{id:"cp",cx:t.cp.cx,cy:200,r:4,fill:"black"}}),t._v(" "),r("rect",{attrs:{x:t.tap.x,y:300,width:t.tap.w,height:100,fill:"white"}}),t._v(" "),t._l(t.halfLine,function(e,o){return r("g",{key:o},[r("line",{attrs:{id:"ob_lhs",x1:t.ob.cx-e.x,y1:200-e.y,x2:t.ob.cx-e.x,y2:200+e.y,stroke:"black","stroke-width":"1","stroke-dasharray":"2 2"}}),t._v(" "),r("line",{attrs:{id:"ob_lhs",x1:t.ob.cx+e.x,y1:200-e.y,x2:t.ob.cx+e.x,y2:200+e.y,stroke:"black","stroke-width":"1","stroke-dasharray":"2 2"}})])}),t._v(" "),r("text",{attrs:{x:"100",y:"30","font-size":"30",fill:"#ffffff"}},[t._v("厚み: "+t._s(t.thickPercent)+" %")])],2)])},staticRenderFns:[]};var p=r("VU/8")(y,m,!1,function(t){r("d9uk")},"data-v-17c4a2bd",null).exports,k={name:"gl-panel",computed:{r:function(){return Number(this.radius)},cameraPos:function(){var t=this,e=t.gb;t.lookAtGb||(e=t.ob);var r=-t.getRadian(e.cx,e.cy,t.cb.cx,t.cb.cy),o=Math.PI/2+r,n=t.getDistance(e.cx,e.cy,t.cb.cx,t.cb.cy)+20*t.r;return t.isZoom&&(n=10*t.r),n+" "+t.phi+" "+o},ob3d:function(){var t=this.ob.cx-200,e=this.ob.cy-400;return t+" "+this.r+" "+e},cb3d:function(){var t=this.cb.cx-200,e=this.cb.cy-400;return t+" "+this.r+" "+e},gb3d:function(){var t=this.gb.cx-200,e=this.gb.cy-400;return t+" "+this.r+" "+e},pk3d:function(){var t=this.pk.cx-200,e=this.pk.cy-400;return t+" "+this.r+" "+e},gb2cbline:function(){var t=this,e=t.gb;return t.lookAtGb||(e=t.ob),[e.cx-200,t.r,e.cy-400,this.cb.cx-200,t.r,this.cb.cy-400].join(",")},pk2obline:function(){return[this.pk.cx-200,this.r,this.pk.cy-400,this.ob.cx-200,this.r,this.ob.cy-400].join(",")},gb2obline:function(){return[this.gb.cx-200,this.r,this.gb.cy-400,this.ob.cx-200,this.r,this.ob.cy-400].join(",")},lookAt:function(){return this.lookAtGb?this.gb3d:this.ob3d},trainBallsOb2Pk:function(){for(var t=this,e=t.getDistance(t.ob.cx,t.ob.cy,t.pk.cx,t.pk.cy),r=Math.floor(e/(2*t.r))+1,o=Math.PI-t.getRadian(t.pk.cx,t.pk.cy,t.ob.cx,t.ob.cy),n=[],i=-5;i<r;i++){var a=i*t.r*2;n.push({cx:t.ob.cx+a*Math.cos(o),cy:t.ob.cy-a*Math.sin(o)})}return n.map(function(e){return e.cx-200+" "+t.r+" "+(e.cy-400)})},trainBallsCb2Gb:function(){for(var t=this,e=t.getDistance(t.cb.cx,t.cb.cy,t.gb.cx,t.gb.cy),r=Math.floor(e/(2*t.r))+1,o=Math.PI-t.getRadian(t.gb.cx,t.gb.cy,t.cb.cx,t.cb.cy),n=[],i=0;i<r;i++){var a=i*t.r*2;n.push({cx:t.cb.cx+a*Math.cos(o),cy:t.cb.cy-a*Math.sin(o)})}return n.map(function(e){return e.cx-200+" "+t.r+" "+(e.cy-400)})}},props:{radius:{type:String,default:"9"},ob:{type:Object},gb:{type:Object},cb:{type:Object},pk:{type:Object},degree:{type:Number},isZoom:{type:Boolean},lookAtGb:{type:Boolean,default:!1},phi:{type:String,default:"0.1"},showGB:{type:Boolean},trainBalls:{type:Boolean,default:!1},betweenLine:{type:Boolean,default:!0}},data:function(){return{widthSegments:50,heightSegments:50,cameraSpherical:{radius:800,phi:Math.PI/180*80,theta:1},showBalls:!0}},mounted:function(){var t=this,e=t.$refs.gldiv;t.dragging=!1,e.addEventListener("mousedown",function(e){t.dragging=!0}),e.addEventListener("mousemove",function(e){t.dragging}),e.addEventListener("mouseup",function(e){t.dragging=!1})},methods:{getR:function(){return Number(this.radius)},getRadian:function(t,e,r,o){return Math.atan2(o-e,r-t)},toDegree:function(t){return 180*t/Math.PI},getDistance:function(t,e,r,o){return Math.sqrt((r-t)*(r-t)+(o-e)*(o-e))},refreshBalls:function(){var t=this;t.showBalls=!1,console.log("r="+t.r+","+t.r),setTimeout(function(){t.showBalls=!0},10)}}},_={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"gldiv",staticClass:"hello"},[r("vgl-renderer",{staticStyle:{height:"400px"},attrs:{antialias:"","shadow-map-enabled":!0,"disable-depth":!1}},[r("vgl-scene",[r("vgl-box-geometry",{attrs:{name:"box",width:400,height:1,depth:800}}),t._v(" "),r("vgl-box-geometry",{attrs:{name:"wall_vertical",width:1,height:10,depth:340}}),t._v(" "),r("vgl-box-geometry",{attrs:{name:"wall_horizon",width:340,height:10,depth:1}}),t._v(" "),r("vgl-box-geometry",{attrs:{name:"long_line",width:1,height:1,depth:800}}),t._v(" "),r("vgl-box-geometry",{attrs:{name:"short_line",width:400,height:1,depth:1}}),t._v(" "),r("vgl-geometry",{attrs:{name:"grid_line","position-attribute":"-100,1,-400,-100,1,400, 0,1,400, 0,1,-400, 100,1,-400, 200,1,-400, 200,1, -300, -200,1,300 "}}),t._v(" "),r("vgl-mesh-standard-material",{attrs:{name:"ob",color:"#ffff00"}}),t._v(" "),r("vgl-mesh-standard-material",{attrs:{name:"cb",color:"#ffffff"}}),t._v(" "),r("vgl-mesh-lambert-material",{attrs:{name:"green",color:"#009900"}}),t._v(" "),r("vgl-mesh-lambert-material",{attrs:{name:"green2",color:"#005500"}}),t._v(" "),r("vgl-mesh-lambert-material",{attrs:{name:"gray",color:"#000000"}}),t._v(" "),r("vgl-mesh-lambert-material",{attrs:{name:"ltgray",color:"#ffffff"}}),t._v(" "),r("vgl-line-basic-material",{attrs:{name:"line_g",linewidth:2,color:"#ffffff"}}),t._v(" "),t.showBalls?r("vgl-group",[r("vgl-sphere-geometry",{attrs:{name:"sphere",radius:t.r,"width-segments":t.widthSegments,"height-segments":t.heightSegments}}),t._v(" "),r("vgl-mesh",{attrs:{geometry:"sphere",material:"ob",color:"#ff0000",position:t.ob3d,"cast-shadow":"","receive-shadow":""}}),t._v(" "),r("vgl-mesh",{attrs:{geometry:"sphere",material:"cb",position:t.cb3d,"cast-shadow":"","receive-shadow":""}}),t._v(" "),t.showGB?r("vgl-mesh",{attrs:{geometry:"sphere",material:"cb",position:t.gb3d,"cast-shadow":"","receive-shadow":""}}):t._e(),t._v(" "),t.trainBalls?r("vgl-group",[r("vgl-group",t._l(t.trainBallsCb2Gb,function(t,e){return r("vgl-mesh",{key:e,attrs:{geometry:"sphere",material:"cb",position:t,"cast-shadow":"","receive-shadow":""}})}),1),t._v(" "),r("vgl-group",t._l(t.trainBallsOb2Pk,function(t,e){return r("vgl-mesh",{key:e,attrs:{geometry:"sphere",material:"ob",position:t,"cast-shadow":"","receive-shadow":""}})}),1)],1):t._e()],1):t._e(),t._v(" "),r("vgl-mesh",{attrs:{geometry:"long_line",material:"cb",position:"-100 0.1 0"}}),t._v(" "),r("vgl-mesh",{attrs:{geometry:"long_line",material:"cb",position:"   0 0.1 0"}}),t._v(" "),r("vgl-mesh",{attrs:{geometry:"long_line",material:"cb",position:" 100 0.1 0"}}),t._v(" "),r("vgl-group",t._l(7,function(t){return r("vgl-group",{key:t},[r("vgl-mesh",{key:t,attrs:{geometry:"short_line",material:"cb",position:"   0 0.1 "+(100*(t-1)-300)}})],1)}),1),t._v(" "),r("vgl-mesh",{attrs:{geometry:"box",material:"green",position:"0 0 0","receive-shadow":""}}),t._v(" "),r("vgl-mesh",{attrs:{geometry:"wall_vertical",material:"green2",position:"200 0 200","receive-shadow":""}}),t._v(" "),r("vgl-mesh",{attrs:{geometry:"wall_vertical",material:"green2",position:"200 0 -200","receive-shadow":""}}),t._v(" "),r("vgl-mesh",{attrs:{geometry:"wall_vertical",material:"green2",position:"-200 0 200","receive-shadow":""}}),t._v(" "),r("vgl-mesh",{attrs:{geometry:"wall_vertical",material:"green2",position:"-200 0 -200","receive-shadow":""}}),t._v(" "),r("vgl-mesh",{attrs:{geometry:"wall_horizon",material:"green2",position:"0 0 -400","receive-shadow":""}}),t._v(" "),r("vgl-mesh",{attrs:{geometry:"wall_horizon",material:"green2",position:"0 0  400","receive-shadow":""}}),t._v(" "),r("vgl-mesh",{attrs:{geometry:"box2",material:"ob",position:t.gb3d,translate:"  ",rotation:"0 0.5 0"}}),t._v(" "),t.betweenLine?r("vgl-group",[r("vgl-geometry",{attrs:{name:"line_g","position-attribute":t.gb2cbline}}),t._v(" "),r("vgl-geometry",{attrs:{name:"line_pk2ob","position-attribute":t.pk2obline}}),t._v(" "),r("vgl-geometry",{attrs:{name:"line_gb2ob","position-attribute":t.gb2obline}}),t._v(" "),r("vgl-line",{attrs:{geometry:"line_g",material:"line_g"}}),t._v(" "),r("vgl-line",{attrs:{geometry:"line_pk2ob",material:"line_g"}}),t._v(" "),r("vgl-line",{attrs:{geometry:"line_gb2ob",material:"line_g"}})],1):t._e(),t._v(" "),r("vgl-line",{attrs:{geometry:"test",material:"line_g"}}),t._v(" "),r("vgl-ambient-light",{attrs:{color:"#888888"}}),t._v(" "),r("vgl-directional-light",{attrs:{position:"100 100 100","cast-shadow":""}})],1),t._v(" "),r("vgl-perspective-camera",{attrs:{"orbit-position":t.cameraPos,"orbit-target":t.lookAt}})],1)],1)},staticRenderFns:[]};var w=r("VU/8")(k,_,!1,function(t){r("/XeC")},"data-v-adda7b54",null).exports,M=r("MveA"),B=r.n(M);function S(t){t.preventDefault()}var P={name:"HelloWorld",components:{ContactPoint:b,FlexBox:d,FlexItem:x,Pool:s,ThickBall:p,GlPanel:w},props:{msg:String},data:function(){return{pk:{cx:9,cy:9},ob:{cx:100,cy:100},cb:{cx:200,cy:500},gb:{cx:200,cy:500},isSmartPhone:B.a.phone,r:"8.0",gb2cbDegree:0,thick:0,tapSize:"12",zoom:!1,lookAtGb:!0,showGB:!0,phi:""+Math.PI/180*80,trainBalls:!1,betweenLine:!0}},mounted:function(){this.isSmartPhone&&document.addEventListener("touchmove.noScroll",S,{passive:!1})},unmounted:function(){this.isSmartPhone&&document.removeEventListener("touchmove.noScroll",S,{passive:!1})},methods:{onMoveBall:function(t){var e=t.target,r=t.cx,o=t.cy,n=Number(this.r);r<=n&&(r=n),400-n<=r&&(r=400-n),o<=n&&(o=n),800-n<=o&&(o=800-n),this[e].cx=r,this[e].cy=o},onDegreeGB2CB:function(t){this.gb2cbDegree=t},onThickPercent:function(t){this.thick=t},getDegree:function(){var t=0;return(t=this.gb2cbDegree<-270?360+this.gb2cbDegree:Math.abs(this.gb2cbDegree))>90&&(t=360-t),t},onSelectPocket:function(t){var e=t.x,r=t.y;this.pk.cx=e,this.pk.cy=r},onSetGB:function(t){this.gb=t},onClickUpdate:function(){this.$refs.gl_panel.$forceUpdate()},onMoveEnd:function(){var t=this;t.betweenLine=!1,window.setTimeout(function(){t.betweenLine=!0},0)},onClickRefresh:function(){this.$refs.gl_panel.refreshBalls()}}},G={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"hello"},[r("flex-box",{attrs:{direction:"column"}},[r("flex-item",[r("flex-box",{attrs:{"align-items":"center",wrap:"wrap"}},[r("flex-item",[t._v("\n          ボールサイズ:"),r("input",{directives:[{name:"model",rawName:"v-model",value:t.r,expression:"r"}],staticStyle:{width:"100px"},attrs:{type:"range",min:"8.0",max:"12",step:"0.1"},domProps:{value:t.r},on:{__r:function(e){t.r=e.target.value}}})]),t._v(" "),r("flex-item",[t._v("\n          タップ:"+t._s(t.tapSize)+"mm"),r("input",{directives:[{name:"model",rawName:"v-model",value:t.tapSize,expression:"tapSize"}],staticStyle:{width:"100px"},attrs:{type:"range",min:"12",max:"20"},domProps:{value:t.tapSize},on:{__r:function(e){t.tapSize=e.target.value}}})]),t._v(" "),r("flex-item",[t._v("\n          見下ろし角度:"),r("input",{directives:[{name:"model",rawName:"v-model",value:t.phi,expression:"phi"}],staticStyle:{width:"100px"},attrs:{type:"range",min:"0.1",max:"1.5",step:"0.01"},domProps:{value:t.phi},on:{__r:function(e){t.phi=e.target.value}}})]),t._v(" "),r("flex-item",[r("toggle-button",{attrs:{labels:{checked:"ズームON",unchecked:"ズームOFF"},width:100},model:{value:t.zoom,callback:function(e){t.zoom=e},expression:"zoom"}})],1),t._v(" "),r("flex-item",[r("toggle-button",{attrs:{labels:{checked:"GB表示",unchecked:"GB非表示"},width:100},model:{value:t.showGB,callback:function(e){t.showGB=e},expression:"showGB"}})],1),t._v(" "),r("flex-item",[r("toggle-button",{attrs:{labels:{checked:"GB中心",unchecked:"的球中心"},width:100},model:{value:t.lookAtGb,callback:function(e){t.lookAtGb=e},expression:"lookAtGb"}})],1),t._v(" "),r("flex-item",[r("toggle-button",{attrs:{labels:{checked:"Train On",unchecked:"Train Off"},width:100},model:{value:t.trainBalls,callback:function(e){t.trainBalls=e},expression:"trainBalls"}})],1),t._v(" "),r("flex-item",[r("toggle-button",{attrs:{labels:{checked:"Guide On",unchecked:"Guide Off"},width:100},model:{value:t.betweenLine,callback:function(e){t.betweenLine=e},expression:"betweenLine"}})],1)],1)],1),t._v(" "),r("flex-item",[t.isSmartPhone?t._e():r("flex-box",[r("flex-item",[r("pool",{ref:"pool",attrs:{cb:t.cb,ob:t.ob,pk:t.pk,radius:t.r},on:{moveBall:t.onMoveBall,degreeGB2CB:t.onDegreeGB2CB,selectPocket:t.onSelectPocket,setGB:t.onSetGB,moveEnd:t.onMoveEnd}})],1),t._v(" "),r("flex-item",[r("flex-box",{attrs:{direction:"column"}},[r("flex-item",{staticStyle:{width:"800px"}},[r("gl-panel",{ref:"gl_panel",attrs:{radius:t.r,cb:t.cb,gb:t.gb,ob:t.ob,pk:t.pk,degree:t.gb2cbDegree,lookAtGb:t.lookAtGb,"is-zoom":t.zoom,showGB:t.showGB,phi:t.phi,trainBalls:t.trainBalls,betweenLine:t.betweenLine}})],1),t._v(" "),r("flex-item",[r("flex-box",[r("flex-item",[r("thick-ball",{attrs:{degree:t.gb2cbDegree,"tap-size":t.tapSize},on:{thickPercent:t.onThickPercent}})],1),t._v(" "),r("flex-item",[r("contact-point",{attrs:{degree:t.gb2cbDegree,dispDegree:t.getDegree()}})],1)],1)],1)],1)],1)],1),t._v(" "),t.isSmartPhone?r("flex-box",{attrs:{direction:"column"}},[r("flex-item",[r("flex-box",[r("flex-item",[r("pool",{ref:"pool",attrs:{cb:t.cb,ob:t.ob,pk:t.pk,radius:t.r},on:{moveBall:t.onMoveBall,degreeGB2CB:t.onDegreeGB2CB,selectPocket:t.onSelectPocket,setGB:t.onSetGB,moveEnd:t.onMoveEnd}})],1),t._v(" "),r("flex-item",[r("flex-box",{attrs:{direction:"column"}},[r("flex-item",[r("thick-ball",{attrs:{degree:t.gb2cbDegree,"tap-size":t.tapSize},on:{thickPercent:t.onThickPercent}})],1),t._v(" "),r("flex-item",[r("contact-point",{attrs:{degree:t.gb2cbDegree,dispDegree:t.getDegree()}})],1)],1)],1)],1)],1),t._v(" "),r("flex-item",{staticStyle:{width:"800px"}},[r("gl-panel",{ref:"gl_panel",attrs:{radius:t.r,cb:t.cb,gb:t.gb,ob:t.ob,pk:t.pk,degree:t.gb2cbDegree,lookAtGb:t.lookAtGb,"is-zoom":t.zoom,showGB:t.showGB,phi:t.phi,trainBalls:t.trainBalls,betweenLine:t.betweenLine}})],1)],1):t._e()],1)],1)],1)},staticRenderFns:[]};var D={name:"App",components:{HelloWorld:r("VU/8")(P,G,!1,function(t){r("7EO3")},"data-v-17cdf975",null).exports}},E={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("HelloWorld")],1)},staticRenderFns:[]};var L=r("VU/8")(D,E,!1,function(t){r("Ba62")},null,null).exports,R=r("eVSU"),j=r("nkUn"),z=r.n(j);n()(R).forEach(function(t){i.a.component(t,R[t])}),i.a.use(z.a),i.a.config.productionTip=!1,new i.a({el:"#app",components:{App:L},template:"<App/>"})},QKtQ:function(t,e){},Swa4:function(t,e){},d9uk:function(t,e){},hSbY:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.ba8b4145da2e0ff21106.js.map