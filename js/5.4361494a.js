(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{1960:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.editable?n("div",{staticClass:"row"},[n("span",{staticClass:"col-sm-2 col-xs-1"},[t._t("default")],2),n("span",{staticClass:"col"},[n("q-slider",{attrs:{value:t.currentProb,min:.001,max:.999,step:.001,color:t.color,label:"","label-value":t.percent(t.currentProb),"label-always":""},on:{input:t.setProb}})],1)]):n("div",{staticClass:"row justify-between align-center rounded-borders",style:t.probStyle},[n("span",{staticClass:"overflow-hidden q-pl-sm"},[t._t("default")],2),n("span",[t._v("\n      "+t._s(t.percent(t.currentProb))+"\n    ")])])])},i=[],o=n("bc78"),r={name:"ProbabilityBar",props:{value:{type:Number,required:!0},color:{type:String,default:"primary"},editable:Boolean},data:function(){return{currentProb:this.value}},watch:{value(t){this.currentProb=t}},computed:{probStyle:function(){var t=this.percent(this.currentProb/2),e=this.percent(this.currentProb),n=o["a"].getBrand(this.color),s=o["a"].lighten(n,25);return{background:"linear-gradient(90deg,"+s+" 0%,"+s+" "+t+", white "+e+")"}}},methods:{percent:function(t){return(100*t).toFixed(1)+"%"},setProb:function(t){this.currentProb=t,this.$emit("input",this.currentProb)}}},a=r,l=n("2877"),u=n("c1d0"),p=n("eebe"),c=n.n(p),h=Object(l["a"])(a,s,i,!1,null,null,null);e["a"]=h.exports;c()(h,"components",{QSlider:u["a"]})},"491b":function(t,e,n){"use strict";n.d(e,"c",(function(){return r})),n.d(e,"b",(function(){return u})),n.d(e,"a",(function(){return a}));n("13d5");var s=n("ded3"),i=n.n(s);function o(t,e){return t.id in e.likelihood?e.likelihood[t.id].prob:0}function r(t,e,n){const s=t.map((t=>t.id)),r=Object.keys(e.likelihood).map((t=>parseInt(t))).filter((t=>!(t in s)));r&&n&&r.forEach((e=>{const s=n.find((t=>t.id===e));console.log("Re-adding hypothesis ",s),t=a(t,s)}));var u=t.map((t=>i()(i()({},t),{},{prob:t.prob*o(t,e)})));return l(u)}function a(t,e){var n=t.map((t=>i()(i()({},t),{},{prob:t.prob*(1-e.prob)})));return 0===n.length&&(e.prob=1),n.push(e),n}function l(t){const e=t.reduce(((t,e)=>t+e.prob),0);return t.map((t=>i()(i()({},t),{},{prob:t.prob/e})))}function u(t,e){const n=l(t.filter((t=>t.id in e.likelihood))),s=n.map((t=>i()(i()({},t),{},{prob:t.prob/o(t,e)})));return l(s)}},8153:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"q-pa-md"},[n("q-form",{staticClass:"q-gutter-md",on:{submit:t.onSubmit,reset:t.onReset}},[n("h5",[t._v(" Add an hypothesis ")]),n("q-input",{staticStyle:{"max-width":"400px"},attrs:{filled:"",label:"Hypothesis name",hint:"example: my sneezing is caused by pollen allergy","lazy-rules":"",rules:[function(t){return t&&t.length>0||"Please enter an event"}]},model:{value:t.hypothesis.name,callback:function(e){t.$set(t.hypothesis,"name",e)},expression:"hypothesis.name"}}),n("h5",[t._v(" Initial probability ")]),n("p",[t._v(" What is the initial probability of this hypothesis? ")]),n("probability-bar",{attrs:{color:"secondary",editable:""},model:{value:t.hypothesis.prob,callback:function(e){t.$set(t.hypothesis,"prob",e)},expression:"hypothesis.prob"}},[t._v("\n      "+t._s(t.hypothesis.name)+"\n    ")]),n("div",[n("q-btn",{attrs:{label:"Submit",type:"submit",color:"primary"}}),n("q-btn",{staticClass:"q-ml-sm",attrs:{label:"Reset",type:"reset",color:"primary",flat:""}})],1)],1)],1)},i=[],o=(n("5319"),n("1960")),r=n("18d6"),a=n("491b"),l={name:"AddHypothesis",components:{ProbabilityBar:o["a"]},props:["questionId"],data:function(){var t=r["a"].getItem("question/"+this.questionId);return{question:t,hypothesis:{prob:0===t.hypothesis.length?1:.2,name:"",id:t.hypothesis.length}}},methods:{onSubmit:function(t){this.question.hypothesis=Object(a["a"])(this.question.hypothesis,this.hypothesis),r["a"].set("question/"+this.question.id,this.question),this.$router.replace({name:"question",params:{questionId:this.question.id}})},onReset:function(t){this.hypothesis.name="",this.hypothesis.prob=0===this.question.hypothesis.length?1:.2}}},u=l,p=n("2877"),c=n("0378"),h=n("27f9"),b=n("9c40"),d=n("eebe"),m=n.n(d),y=Object(p["a"])(u,s,i,!1,null,null,null);e["default"]=y.exports;m()(y,"components",{QForm:c["a"],QInput:h["a"],QBtn:b["a"]})}}]);