(()=>{var e={};e.id=879,e.ids=[879],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},2412:e=>{"use strict";e.exports=require("assert")},4735:e=>{"use strict";e.exports=require("events")},9021:e=>{"use strict";e.exports=require("fs")},1630:e=>{"use strict";e.exports=require("http")},5591:e=>{"use strict";e.exports=require("https")},1820:e=>{"use strict";e.exports=require("os")},3873:e=>{"use strict";e.exports=require("path")},7910:e=>{"use strict";e.exports=require("stream")},3997:e=>{"use strict";e.exports=require("tty")},9551:e=>{"use strict";e.exports=require("url")},8354:e=>{"use strict";e.exports=require("util")},4075:e=>{"use strict";e.exports=require("zlib")},6406:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>u,pages:()=>d,routeModule:()=>c,tree:()=>p});var s=r(260),a=r(8203),n=r(5155),o=r.n(n),l=r(7292),i={};for(let e in l)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(i[e]=()=>l[e]);r.d(t,i);let p=["",{children:["signup",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,5395)),"C:\\project\\wine\\app\\signup\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,9611)),"C:\\project\\wine\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,9116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,1485,23)),"next/dist/client/components/unauthorized-error"]}],d=["C:\\project\\wine\\app\\signup\\page.tsx"],u={require:r,loadChunk:()=>Promise.resolve()},c=new s.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/signup/page",pathname:"/signup",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:p}})},6739:(e,t,r)=>{Promise.resolve().then(r.bind(r,5395))},3691:(e,t,r)=>{Promise.resolve().then(r.bind(r,3712))},6802:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,3219,23)),Promise.resolve().then(r.t.bind(r,4863,23)),Promise.resolve().then(r.t.bind(r,5155,23)),Promise.resolve().then(r.t.bind(r,802,23)),Promise.resolve().then(r.t.bind(r,9350,23)),Promise.resolve().then(r.t.bind(r,8530,23)),Promise.resolve().then(r.t.bind(r,8921,23))},4954:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,6959,23)),Promise.resolve().then(r.t.bind(r,3875,23)),Promise.resolve().then(r.t.bind(r,8903,23)),Promise.resolve().then(r.t.bind(r,7174,23)),Promise.resolve().then(r.t.bind(r,4178,23)),Promise.resolve().then(r.t.bind(r,7190,23)),Promise.resolve().then(r.t.bind(r,1365,23))},8720:()=>{},2272:()=>{},3712:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>_});var s=r(5512);r(8009);var a=r(6868),n=r(2420),o=r(1226),l=r(8295),i=r(5103),p=r(8531),d=r.n(p),u=r(8713);let{Axios:c,AxiosError:x,CanceledError:m,isCancel:h,CancelToken:g,VERSION:b,all:f,Cancel:v,isAxiosError:y,spread:w,toFormData:P,AxiosHeaders:j,HttpStatusCode:k,formToJSON:C,getAdapter:N,mergeConfig:q}=r(5668).A;var A=r(9524),T=r(9334);function _(){let{register:e,handleSubmit:t,watch:r,formState:{errors:p}}=(0,a.mN)({mode:"onBlur"}),{setTokens:c,setUser:m,user:h}=(0,A.n)(),g=(0,T.useRouter)(),b=async e=>{try{let t={email:e.email,nickname:e.nickname,password:e.password,passwordConfirmation:e.confirmPassword};console.log("Request payload:",t);let r=await (0,u.Hh)(t);console.log("회원가입 성공:",r),c(r.accessToken,r.refreshToken),m(r.user),g.push("/")}catch(e){e instanceof x?console.error("회원가입 실패:",e.response?.data||e.message):console.error("Unexpected error:",e)}},f=r("password");return(0,s.jsx)("div",{className:"flex justify-center items-center min-h-screen bg-gray-100 px-[16px] tablet:px-[124px]",children:(0,s.jsxs)(l.A,{className:"p-56pxr px-20pxr tablet:p-64pxr tablet:px-48pxr pc:p-80pxr pc:px-48pxr w-full max-w-[375px] tablet:max-w-[496px] bg-white shadow-[0px_2px_20px_rgba(0,0,0,0.04)]",children:[(0,s.jsx)(d(),{href:"/",children:(0,s.jsx)(i.default,{src:"/logo-black.svg",alt:"로고 이미지",width:104,height:30,className:"mx-auto mb-56pxr tablet:mb-64pxr",priority:!0})}),(0,s.jsxs)("form",{onSubmit:t(b),children:[(0,s.jsx)(n.A,{label:"이메일",type:"email",wrapperClassName:"gap-[10px]",labelClassName:"text-md font-medium tablet:text-lg text-gray-800",inputClassName:"h-42pxr tablet:h-48pxr placeholder:text-gray-500 placeholder:text-md tablet:placeholder:text-lg",placeholder:"whyne@email.com",register:e("email",{required:"이메일은 필수 입력입니다.",pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:"이메일 형식으로 작성해 주세요."}}),error:p.email?.message}),(0,s.jsx)(n.A,{label:"닉네임",type:"text",wrapperClassName:"gap-[10px] mt-10pxr",labelClassName:"text-md font-medium tablet:text-lg text-gray-800",inputClassName:"h-42pxr tablet:h-48pxr placeholder:text-gray-500 placeholder:text-md tablet:placeholder:text-lg",placeholder:"whyne",register:e("nickname",{required:"닉네임은 필수 입력입니다.",maxLength:{value:20,message:"닉네임은 최대 20자까지 가능합니다."}}),error:p.nickname?.message}),(0,s.jsx)(n.A,{label:"비밀번호",type:"password",wrapperClassName:"gap-[10px] mt-10pxr",labelClassName:"text-md font-medium tablet:text-lg text-gray-800",inputClassName:"h-42pxr tablet:h-48pxr placeholder:text-gray-500 placeholder:text-md tablet:placeholder:text-lg",placeholder:"영문, 숫자, 특수문자(!@#$%^&*) 제한",register:e("password",{required:"비밀번호는 필수 입력입니다.",minLength:{value:8,message:"비밀번호는 최소 8자 이상입니다."},pattern:{value:/^[a-zA-Z0-9!@#$%^&*]+$/,message:"비밀번호는 숫자, 영문, 특수문자로만 가능합니다."}}),error:p.password?.message}),(0,s.jsx)(n.A,{label:"비밀번호 확인",type:"password",wrapperClassName:"gap-[10px] mt-10pxr",labelClassName:"text-md font-medium tablet:text-lg text-gray-800",inputClassName:"h-42pxr tablet:h-48pxr placeholder:text-gray-500 placeholder:text-md tablet:placeholder:text-lg",placeholder:"비밀번호 확인",register:e("confirmPassword",{required:"비밀번호 확인을 입력해주세요.",validate:e=>e===f||"비밀번호가 일치하지 않습니다."}),error:p.confirmPassword?.message}),(0,s.jsx)(o.A,{className:"mt-40pxr tablet:mt-32pxr rounded-[12px] tablet:rounded-[16px] font-sans font-bold text-lg text-white",style:{height:"50px",width:"100%",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",padding:"16px 0",background:"#6A42DB"},variant:"text",type:"submit",children:"가입하기"})]}),(0,s.jsxs)("div",{className:"flex flex-row justify-center mt-24pxr tablet:mt-32pxr gap-[8px] tablet:gap-[14px]  text-[14px] tablet:text-[16px]",children:[(0,s.jsx)("p",{className:"text-gray-500 font-regular",children:"계정이 이미 있으신가요?"}),(0,s.jsx)(d(),{href:"/login",className:"text-purple-100 font-medium underline",children:"로그인하기"})]})]})})}},1226:(e,t,r)=>{"use strict";r.d(t,{A:()=>n});var s=r(5512),a=r(6622);function n({className:e,style:t,variant:r,size:n,type:o="button",children:l,onClick:i,...p}){return(0,s.jsx)(a.A,{className:e,sx:t,variant:r||"contained",size:n||"small",type:o,onClick:i,...p,children:l})}r(8009)},8295:(e,t,r)=>{"use strict";r.d(t,{A:()=>a});var s=r(5512);function a({className:e,children:t,...r}){return(0,s.jsx)("div",{className:`border border-gray-300 border-solid rounded-[1rem] ${e}`,...r,children:t})}r(8009)},2420:(e,t,r)=>{"use strict";r.d(t,{A:()=>a});var s=r(5512);function a({label:e,error:t,wrapperClassName:r="",labelClassName:a="",inputClassName:n="",register:o,...l}){return(0,s.jsxs)("div",{className:`flex flex-col ${r}`,children:[(0,s.jsx)("label",{className:`text-lg font-medium ${a}`,children:e}),(0,s.jsx)("input",{className:`px-20pxr py-14pxr rounded-[12px] tablet:rounded-[16px] border border-gray-300 placeholder:text-gray-500  focus:outline-none ${n}`,...o,...l}),t&&(0,s.jsx)("p",{className:"text-red-500 text-xs tablet:text-sm",children:t})]})}r(8009)},8713:(e,t,r)=>{"use strict";r.d(t,{Hh:()=>l,Jv:()=>i});var s=r(5668),a=r(9524);let n=process.env.NEXT_PUBLIC_API_URL,o=s.A.create({baseURL:n,headers:{"Content-Type":"application/json"}});o.interceptors.request.use(e=>{let{accessToken:t}=a.n.getState();return![{url:"/wines",method:"GET"},{url:"/wines/recommended",method:"GET"},{url:"/oauthApps",method:"POST"},{url:"/auth/signUp",method:"POST"},{url:"/auth/signIn",method:"POST"},{url:"/auth/refresh-token",method:"POST"},{url:"/auth/signIn/",method:"POST"}].some(t=>e.url?.startsWith(t.url)&&e.method?.toUpperCase()===t.method)&&t&&(e.headers.Authorization=`Bearer ${t.trim()}`),e}),o.interceptors.response.use(e=>e,async e=>{let t=e.config;if(e.response?.status===401&&!t._retry){t._retry=!0;let{refreshToken:e}=a.n.getState();if(e)try{let{accessToken:r}=(await s.A.post(`${n}/auth/refresh-token`,{refreshToken:e})).data;return a.n.getState().setTokens(r,e),t.headers.Authorization=`Bearer ${r}`,o(t)}catch(e){throw console.error("token 갱신 실패: ",e),a.n.getState().clearUser(),e}}return console.error("401 외 에러:",e),Promise.reject(e)});let l=async e=>(await o.post("/auth/signUp",e)).data,i=async e=>(await o.post("/auth/signIn",e)).data},9524:(e,t,r)=>{"use strict";r.d(t,{n:()=>n});var s=r(2803),a=r(9499);let n=(0,s.v)()((0,a.Zr)(e=>({isLogin:!1,accessToken:null,refreshToken:null,setTokens:(t,r)=>e({isLogin:!0,accessToken:t.trim(),refreshToken:r.trim()}),user:null,setUser:t=>{e({user:t,isLogin:!0})},clearUser:()=>e({isLogin:!1,accessToken:null,refreshToken:null,user:null})}),{name:"auth-storage",partialize:e=>({isLogin:e.isLogin,accessToken:e.accessToken,refreshToken:e.refreshToken,user:e.user})}))},9611:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u,metadata:()=>d});var s=r(2740),a=r(7879),n=r.n(a),o=r(3298),l=r.n(o),i=r(384),p=r.n(i);r(2704);let d={title:"Create Next App",description:"Generated by create next app"};function u({children:e}){return(0,s.jsx)("html",{lang:"en",children:(0,s.jsx)("body",{className:`${n().variable} ${l().variable} ${p().className} antialiased`,children:e})})}},5395:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(6760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\project\\\\wine\\\\app\\\\signup\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\project\\wine\\app\\signup\\page.tsx","default")},2704:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[456,964,622,737],()=>r(6406));module.exports=s})();