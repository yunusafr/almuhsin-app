import{U as e,_ as t,d as n,h as r,it as i,l as a,r as o,t as s,tt as c}from"./button-Dib9PMDK.js";import{t as l}from"./x-Ce_53VBl.js";import{_ as u,g as d,o as f,r as p,t as m,y as h}from"./createBaseUIEventDetails-Dq4lXB_-.js";import{B as g,C as _,E as v,G as y,H as b,K as x,O as S,S as C,T as w,U as T,V as E,W as D,_ as O,b as k,d as A,f as ee,g as te,h as ne,ht as j,k as re,m as ie,p as ae,tt as oe,u as se,v as ce,w as le,x as ue,y as de,z as fe}from"./index-H5p4uhUL.js";import{n as pe,o as me,r as he}from"./zod-Cpe_1iNz.js";import{r as ge}from"./dist-BqQzjwif.js";import{t as _e}from"./label-5a9mE809.js";var M=e();function ve({value:e,onChange:t,placeholder:n}){return(0,M.jsxs)(`div`,{className:`relative w-full max-w-sm`,children:[(0,M.jsx)(oe,{size:18,className:`
        absolute
        left-3
        top-1/2
        -translate-y-1/2
        text-muted-foreground
      `}),(0,M.jsx)(D,{value:e,onChange:t,placeholder:n,className:`
          pl-10
          rounded-2xl
          h-11
        `})]})}var N=i(c(),1),P=N.createContext(!1),F=N.createContext(void 0);function I(e){let n=N.useContext(F);if(e===!1&&n===void 0)throw Error(t(27));return n}var ye={...T,...x},L=N.forwardRef(function(e,t){let{render:n,className:r,style:i,forceRender:o=!1,...s}=e,{store:c}=I(),l=c.useState(`open`),u=c.useState(`nested`),d=c.useState(`mounted`);return a(`div`,e,{state:{open:l,transitionStatus:c.useState(`transitionStatus`)},ref:[c.context.backdropRef,t],stateAttributesMapping:ye,props:[{role:`presentation`,hidden:!d,style:{userSelect:`none`,WebkitUserSelect:`none`}},s],enabled:o||!u})}),R=N.forwardRef(function(e,t){let{render:n,className:i,style:o,disabled:s=!1,nativeButton:c=!0,...l}=e,{store:u}=I(),d=u.useState(`open`),{getButtonProps:f,buttonRef:h}=r({disabled:s,native:c}),g={disabled:s};function _(e){d&&u.setOpen(!1,m(p,e.nativeEvent))}return a(`button`,e,{state:g,ref:[t,h],props:[{onClick:_},l,f]})}),z=N.forwardRef(function(e,t){let{render:n,className:r,style:i,id:o,...s}=e,{store:c}=I(),l=h(o);return c.useSyncedValueWithCleanup(`descriptionElementId`,l),a(`p`,e,{ref:t,props:[{id:l},s]})}),be=function(e){return e.nestedDialogs=`--nested-dialogs`,e}({}),xe=function(e){return e[e.open=b.open]=`open`,e[e.closed=b.closed]=`closed`,e[e.startingStyle=b.startingStyle]=`startingStyle`,e[e.endingStyle=b.endingStyle]=`endingStyle`,e.nested=`data-nested`,e.nestedDialogOpen=`data-nested-dialog-open`,e}({}),B=N.createContext(void 0);function Se(){let e=N.useContext(B);if(e===void 0)throw Error(t(26));return e}var Ce={...T,...x,nestedDialogOpen(e){return e?{[xe.nestedDialogOpen]:``}:null}},V=N.forwardRef(function(e,t){let{render:n,className:r,style:i,finalFocus:o,initialFocus:s,...c}=e,{store:l}=I(),u=l.useState(`descriptionElementId`),d=l.useState(`disablePointerDismissal`),f=l.useState(`floatingRootContext`),p=l.useState(`popupProps`),m=l.useState(`modal`),h=l.useState(`mounted`),_=l.useState(`nested`),v=l.useState(`nestedOpenDialogCount`),b=l.useState(`open`),x=l.useState(`openMethod`),S=l.useState(`titleElementId`),C=l.useState(`transitionStatus`),w=l.useState(`role`),T=f.useState(`floatingId`),E=c.id??T;Se(),y({open:b,ref:l.context.popupRef,onComplete(){b&&l.context.onOpenChangeComplete?.(!0)}});let D=s===void 0?de(l.context.popupRef):s,O=v>0,k=l.useStateSetter(`popupElement`),A=a(`div`,e,{state:{open:b,nested:_,transitionStatus:C,nestedDialogOpen:O},props:[p,{id:E,"aria-labelledby":S??void 0,"aria-describedby":u??void 0,role:w,...ce,hidden:!h,onKeyDown(e){ae.has(e.key)&&e.stopPropagation()},style:{[be.nestedDialogs]:v}},c],ref:[t,l.context.popupRef,k],stateAttributesMapping:Ce});return(0,M.jsx)(g,{context:f,openInteractionType:x,disabled:!h,closeOnFocusOut:!d,initialFocus:D,returnFocus:o,modal:m!==!1,restoreFocus:`popup`,children:A})}),H=N.forwardRef(function(e,t){let{keepMounted:n=!1,...r}=e,{store:i}=I(),a=i.useState(`mounted`),o=i.useState(`modal`),s=i.useState(`open`);return a||n?(0,M.jsx)(B.Provider,{value:n,children:(0,M.jsxs)(E,{ref:t,...r,children:[a&&o===!0&&(0,M.jsx)(A,{ref:i.context.internalBackdropRef,inert:ee(!s)}),e.children]})}):null});function we(e){let{store:t,actionsRef:n}=e,r=t.useState(`open`);le(t,r),ue(t);let{forceUnmount:i}=C(r,t),a=N.useCallback(()=>{t.setOpen(!1,m(f))},[t]);N.useImperativeHandle(n,()=>({unmount:i,close:a}),[i,a])}function U({store:e,parentContext:t,isDrawer:r}){let i=e.useState(`open`),a=e.useState(`disablePointerDismissal`),o=e.useState(`modal`),s=e.useState(`popupElement`),c=e.useState(`floatingRootContext`),[l,f]=N.useState(0),[p,m]=N.useState(0),h=l===0,g=fe(c,{outsidePressEvent(){return e.context.internalBackdropRef.current||e.context.backdropRef.current?`intentional`:{mouse:o===`trap-focus`?`sloppy`:`intentional`,touch:`sloppy`}},outsidePress(t){if(!e.context.outsidePressEnabledRef.current||`button`in t&&t.button!==0||`touches`in t&&t.touches.length!==1)return!1;let n=u(t);return h&&!a?o&&(e.context.internalBackdropRef.current||e.context.backdropRef.current)?e.context.internalBackdropRef.current===n||e.context.backdropRef.current===n||d(n,s)&&!n?.hasAttribute(`data-base-ui-portal`):!0:!1},escapeKey:h});return se(i&&o===!0,s),e.useContextCallback(`onNestedDialogOpen`,(e,t)=>{f(e),m(t)}),e.useContextCallback(`onNestedDialogClose`,()=>{f(0),m(0)}),N.useEffect(()=>(t?.onNestedDialogOpen&&i&&t.onNestedDialogOpen(l+1,p+ +!!r),t?.onNestedDialogClose&&!i&&t.onNestedDialogClose(),()=>{t?.onNestedDialogClose&&i&&t.onNestedDialogClose()}),[r,i,l,p,t]),_(e,{activeTriggerProps:g.reference??n,inactiveTriggerProps:g.trigger??n,popupProps:g.floating??n,nestedOpenDialogCount:l,nestedOpenDrawerCount:p}),null}var Te={...te,modal:S(e=>e.modal),nested:S(e=>e.nested),nestedOpenDialogCount:S(e=>e.nestedOpenDialogCount),nestedOpenDrawerCount:S(e=>e.nestedOpenDrawerCount),disablePointerDismissal:S(e=>e.disablePointerDismissal),openMethod:S(e=>e.openMethod),descriptionElementId:S(e=>e.descriptionElementId),titleElementId:S(e=>e.titleElementId),viewportElement:S(e=>e.viewportElement),role:S(e=>e.role)},Ee=class e extends v{constructor(e,t,n=!1){let r=new O,i=De(e);i.floatingRootContext=ne(r,t,n),super(i,{popupRef:N.createRef(),backdropRef:N.createRef(),internalBackdropRef:N.createRef(),outsidePressEnabledRef:{current:!0},triggerElements:r,onOpenChange:void 0,onOpenChangeComplete:void 0},Te)}setOpen=(e,t)=>{if(t.preventUnmountOnClose=()=>{this.set(`preventUnmountingOnClose`,!0)},!e&&t.trigger==null&&this.state.activeTriggerId!=null&&(t.trigger=this.state.activeTriggerElement??void 0),this.context.onOpenChange?.(e,t),t.isCanceled)return;this.state.floatingRootContext.dispatchOpenChange(e,t);let n={open:e};k(n,e,t.trigger),this.update(n)};static useStore(t,n){return w(t,(t,r)=>new e(n,t,r),!0).store}};function De(e={}){return{...ie(),modal:!0,disablePointerDismissal:!1,popupElement:null,viewportElement:null,descriptionElementId:void 0,titleElementId:void 0,openMethod:null,nested:!1,nestedOpenDialogCount:0,nestedOpenDrawerCount:0,role:`dialog`,...e}}function W(e,t=`dialog`){let{children:n,open:r,defaultOpen:i=!1,onOpenChange:a,onOpenChangeComplete:o,disablePointerDismissal:s=!1,modal:c=!0,actionsRef:l,handle:u,triggerId:d,defaultTriggerId:f=null}=e,p=t===`drawer`,m=t===`alert-dialog`,h=m?!0:c,g=m||s,_=m?`alertdialog`:`dialog`,v=I(!0),y={modal:h,disablePointerDismissal:g,nested:!!v,role:_},b=Ee.useStore(u?.store,{open:i,openProp:r,activeTriggerId:f,triggerIdProp:d,...y});re(()=>{let e=r===void 0&&b.state.open===!1&&i===!0?{open:!0,activeTriggerId:f}:null;m?b.update(e?{...y,...e}:y):e&&b.update(e)}),b.useControlledProp(`openProp`,r),b.useControlledProp(`triggerIdProp`,d),b.useSyncedValues(y),b.useContextCallback(`onOpenChange`,a),b.useContextCallback(`onOpenChangeComplete`,o);let x=b.useState(`open`),S=b.useState(`mounted`),C=b.useState(`payload`);we({store:b,actionsRef:l});let w=x||S,T=N.useMemo(()=>({store:b}),[b]);return(0,M.jsx)(P.Provider,{value:!1,children:(0,M.jsxs)(F.Provider,{value:T,children:[w&&(0,M.jsx)(U,{store:b,parentContext:v?.store.context,isDrawer:p}),typeof n==`function`?n({payload:C}):n]})})}function Oe(e){return W(e,N.useContext(P)?`drawer`:`dialog`)}var G=N.forwardRef(function(e,t){let{render:n,className:r,style:i,id:o,...s}=e,{store:c}=I(),l=h(o);return c.useSyncedValueWithCleanup(`titleElementId`,l),a(`h2`,e,{ref:t,props:[{id:l},s]})});function ke(e){return(0,M.jsx)(Oe,{"data-slot":`dialog`,...e})}function Ae(e){return(0,M.jsx)(H,{"data-slot":`dialog-portal`,...e})}function je({className:e,...t}){return(0,M.jsx)(L,{"data-slot":`dialog-overlay`,className:o(`
fixed
inset-0
z-40
bg-black/40

supports-backdrop-filter:backdrop-blur-sm

duration-200

data-open:animate-in
data-open:fade-in-0

data-closed:animate-out
data-closed:fade-out-0
`,e),...t})}function Me({className:e,children:t,showCloseButton:n=!0,...r}){return(0,M.jsxs)(Ae,{children:[(0,M.jsx)(je,{}),(0,M.jsxs)(V,{"data-slot":`dialog-content`,className:o(`
fixed
left-1/2
top-1/2
z-50

w-[calc(100vw-1.5rem)]
max-w-lg

max-h-[650px]
h-auto
overflow-y-auto

-translate-x-1/2
-translate-y-1/2

rounded-2xl
bg-background

shadow-2xl
outline-none

p-4
sm:p-6

grid
gap-4

origin-center

duration-200

data-open:animate-in
data-open:fade-in-0
data-open:zoom-in-95

data-closed:animate-out
data-closed:fade-out-0
data-closed:zoom-out-95
`,e),...r,children:[t,n&&(0,M.jsxs)(R,{"data-slot":`dialog-close`,render:(0,M.jsx)(s,{variant:`ghost`,size:`icon-sm`,className:`absolute right-3 top-3 rounded-full`}),children:[(0,M.jsx)(l,{className:`size-4`}),(0,M.jsx)(`span`,{className:`sr-only`,children:`Close`})]})]})]})}function Ne({className:e,...t}){return(0,M.jsx)(`div`,{"data-slot":`dialog-header`,className:o(`flex flex-col gap-2 text-left`,e),...t})}function Pe({className:e,...t}){return(0,M.jsx)(G,{"data-slot":`dialog-title`,className:o(`font-heading text-lg font-semibold leading-none tracking-tight`,e),...t})}function Fe({className:e,...t}){return(0,M.jsx)(z,{"data-slot":`dialog-description`,className:o(`
text-sm
leading-6
text-muted-foreground

*:[a]:underline
*:[a]:underline-offset-4
*:[a]:hover:text-foreground
`,e),...t})}var Ie=he,K=N.createContext(null),q=({...e})=>(0,M.jsx)(K.Provider,{value:{name:e.name},children:(0,M.jsx)(pe,{...e})}),J=()=>{let e=N.useContext(K),t=N.useContext(Y),{getFieldState:n,formState:r}=me();if(!e)throw Error(`useFormField should be used within <FormField>`);if(!t)throw Error(`useFormField should be used within <FormItem>`);let i=n(e.name,r),{id:a}=t;return{id:a,name:e.name,formItemId:`${a}-form-item`,formDescriptionId:`${a}-form-item-description`,formMessageId:`${a}-form-item-message`,...i}},Y=N.createContext(null),X=N.forwardRef(({className:e,...t},n)=>{let r=N.useId();return(0,M.jsx)(Y.Provider,{value:{id:r},children:(0,M.jsx)(`div`,{ref:n,className:o(`space-y-2`,e),...t})})});X.displayName=`FormItem`;var Z=N.forwardRef(({className:e,...t},n)=>{let{error:r,formItemId:i}=J();return(0,M.jsx)(_e,{ref:n,className:o(r&&`text-destructive`,e),htmlFor:i,...t})});Z.displayName=`FormLabel`;var Q=N.forwardRef(({...e},t)=>{let{error:n,formItemId:r,formDescriptionId:i,formMessageId:a}=J();return(0,M.jsx)(ge,{ref:t,id:r,"aria-describedby":n?`${i} ${a}`:`${i}`,"aria-invalid":!!n,...e})});Q.displayName=`FormControl`;var Le=N.forwardRef(({className:e,...t},n)=>{let{formDescriptionId:r}=J();return(0,M.jsx)(`p`,{ref:n,id:r,className:o(`text-sm text-muted-foreground`,e),...t})});Le.displayName=`FormDescription`;var $=N.forwardRef(({className:e,children:t,...n},r)=>{let{error:i,formMessageId:a}=J(),s=i?String(i?.message??``):t;return s?(0,M.jsx)(`p`,{ref:r,id:a,className:o(`text-sm font-medium text-destructive`,e),...n,children:s}):null});$.displayName=`FormMessage`;function Re({form:e,onSubmit:t,children:n,className:r=``}){return(0,M.jsx)(Ie,{...e,children:(0,M.jsx)(`form`,{onSubmit:t,className:`space-y-6 ${r}`,children:n})})}function ze({title:e,description:t,children:n,className:r=``}){return(0,M.jsxs)(`section`,{className:`rounded-3xl border bg-card p-6 shadow-sm ${r}`,children:[(e||t)&&(0,M.jsxs)(`div`,{className:`mb-6`,children:[e&&(0,M.jsx)(`h3`,{className:`text-lg font-semibold`,children:e}),t&&(0,M.jsx)(`p`,{className:`mt-1 text-sm text-muted-foreground`,children:t})]}),n]})}function Be({control:e,name:t,label:n,placeholder:r,type:i=`text`,disabled:a=!1}){return(0,M.jsx)(q,{control:e,name:t,render:({field:e})=>(0,M.jsxs)(X,{children:[n&&(0,M.jsx)(Z,{children:n}),(0,M.jsx)(Q,{children:(0,M.jsx)(D,{...e,type:i,placeholder:r,disabled:a,className:`h-11 rounded-xl`})}),(0,M.jsx)($,{})]})})}function Ve({loading:e=!1,submitLabel:t=`Simpan`,cancelLabel:n=`Batal`,onCancel:r,hideCancel:i=!1}){return(0,M.jsxs)(`div`,{className:`flex items-center justify-end gap-3 pt-6`,children:[!i&&(0,M.jsx)(s,{type:`button`,variant:`outline`,onClick:r,disabled:e,children:n}),(0,M.jsxs)(s,{type:`submit`,disabled:e,className:`min-w-36`,children:[e&&(0,M.jsx)(j,{className:`mr-2 h-4 w-4 animate-spin`}),t]})]})}export{ve as S,H as _,Q as a,R as b,Z as c,Me as d,Fe as f,W as g,G as h,Re as i,$ as l,Pe as m,Be as n,q as o,Ne as p,ze as r,X as s,Ve as t,ke as u,V as v,L as x,z as y};