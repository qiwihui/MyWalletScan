import{a as $,r as A,F as V,j as e,M as me,g as M,c as d,h as ue,B,U as _e,e as J,P as L,D as Q,k as fe,I as ne,L as ge,E as Y,b as R,S as K,C as pe,T as he,d as ye,R as xe,n as P,o as Ce}from"./index-7113eca8.js";import{i as be,d as Te,u as ke}from"./main-534dfcf9.js";import{C as Se,T as je,c as ve}from"./index-3705f24c.js";import{d as X}from"./deleteData-ba66f123.js";import{m as we}from"./index-06ba41d6.js";async function Z(i,a,s){const r=await $.post(i,a,{headers:s});let t=[];const n={"StarkGate: ETH":1800,"StarkGate: USDT":1,"StarkGate: USDC":1,"StarkGate: DAI":1,"StarkGate: WBTC":29500};return r.data.data.erc20TransferEvents.edges.forEach(l=>{const{transaction_hash:_,from_address:g,transfer_amount_display:u,transfer_from_address:y,transfer_to_address:j,from_erc20_identifier:k,main_call:q,timestamp:O,__typename:U}=l.node;t.push({transaction_hash:_,from_address:g,transfer_amount_display:u,transfer_from_address:y,transfer_to_address:j,from_erc20_identifier:k,timestamp:O,main_call:q,__typename:U,total_value:n.hasOwnProperty(k)?u*n[k]:0})}),{transfers:t,hasNextPage:r.data.data.erc20TransferEvents.pageInfo.hasNextPage,endCursor:r.data.data.erc20TransferEvents.pageInfo.endCursor}}async function Fe(i){const a="https://graphql.starkscancdn.com/",s={authority:"graphql.starkscancdn.com",accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6","content-type":"application/json"},r={query:`query ERC20TransferEventsTableQuery(
  $first: Int!
  $after: String
  $input: ERC20TransferEventsInput!
) {
  ...ERC20TransferEventsTablePaginationFragment_erc20TransferEvents_2DAjA4
}

fragment ERC20TransferEventsTablePaginationFragment_erc20TransferEvents_2DAjA4 on Query {
  erc20TransferEvents(first: $first, after: $after, input: $input) {
    edges {
      node {
        id
        ...ERC20TransferEventsTableRowFragment_erc20TransferEvent
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment ERC20TransferEventsTableRowFragment_erc20TransferEvent on ERC20TransferEvent {
  id
  transaction_hash
  from_address
  from_erc20_identifier
  from_contract {
    is_social_verified
    id
  }
  transfer_from_address
  transfer_from_identifier
  transfer_from_contract {
    is_social_verified
    id
  }
  transfer_to_address
  transfer_to_identifier
  transfer_to_contract {
    is_social_verified
    id
  }
  transfer_amount
  transfer_amount_display
  timestamp
  main_call {
    selector_identifier
    id
  }
}
`,variables:{first:100,after:null,input:{transfer_from_or_to_address:i,sort_by:"timestamp",order_by:"desc"}}};let t=[],n=await Z(a,r,s);for(t.push(...n.transfers);n.hasNextPage;)r.variables.after=n.endCursor,n=await Z(a,r,s),t.push(...n.transfers);return t}async function ee(i,a,s){const r=await $.post(i,a,{headers:s});let t=[];return r.data.data.transactions.edges.forEach(n=>{const{actual_fee_display:l,initiator_address:_,initiator_identifier:g,nonce:u,calldata:y,main_calls:j,timestamp:k,transaction_hash:q}=n.node;t.push({actual_fee_display:l,initiator_address:_,initiator_identifier:g,nonce:u,calldata:y,main_calls:j,timestamp:k,transaction_hash:q,transfers:[]})}),{transactions:t,hasNextPage:r.data.data.transactions.pageInfo.hasNextPage,endCursor:r.data.data.transactions.pageInfo.endCursor}}async function Ie(i){const a="https://graphql.starkscancdn.com/",s={authority:"graphql.starkscancdn.com",accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6","content-type":"application/json"},r={query:`query TransactionsTableQuery(
  $first: Int!
  $after: String
  $input: TransactionsInput!
) {
  ...TransactionsTablePaginationFragment_transactions_2DAjA4
}

fragment TransactionsTableExpandedItemFragment_transaction on Transaction {
  entry_point_selector_name
  calldata_decoded
  entry_point_selector
  calldata
  initiator_address
  initiator_identifier
 actual_fee
  actual_fee_display
 main_calls {
    selector
    selector_name
    calldata_decoded
    selector_identifier
    calldata
    contract_address
    contract_identifier
    id
  }
}

fragment TransactionsTablePaginationFragment_transactions_2DAjA4 on Query {
  transactions(first: $first, after: $after, input: $input) {
    edges {
      node {
        id
        ...TransactionsTableRowFragment_transaction
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment TransactionsTableRowFragment_transaction on Transaction {
  id
  transaction_hash
  block_number
  transaction_status
  transaction_type
  timestamp
  nonce
 contract_address
  contract_identifier
 sender_address
  sender_identifier
 initiator_address
  initiator_identifier
  initiator {
    is_social_verified
    id
  }
  main_calls {
    selector_identifier
    id
  }
  ...TransactionsTableExpandedItemFragment_transaction
}
`,variables:{first:100,after:null,input:{initiator_address:i,sort_by:"timestamp",order_by:"desc",min_block_number:null,max_block_number:null,min_timestamp:null,max_timestamp:null}}};let t=[],n=await ee(a,r,s);for(t.push(...n.transactions);n.hasNextPage;)r.variables.after=n.endCursor,n=await ee(a,r,s),t.push(...n.transactions);const l=await Fe(i);return l.forEach(_=>{t.forEach(g=>{_.transaction_hash===g.transaction_hash&&g.transfers.push(_)})}),{transfers:l,transactions:t}}const ae=i=>{const a=new Date(i)*1e3,s=(new Date().getTime()-new Date(a).getTime())/1e3;if(s<60)return Math.round(s)+" 秒前";const r=s/60;if(r<60)return Math.round(r)+" 分前";const t=r/60;if(t<24)return Math.round(t)+" 时前";const n=t/24;return Math.round(n)+" 天前"},Ee=async i=>{try{if(!i)return{tx:0,lastTime:"无交易",fee:0};let a=0;i.forEach(n=>{a+=parseFloat(n.actual_fee_display)});const s=i[0].nonce,r=i[0].timestamp,t=ae(r)||"无交易";return{tx:s,lastTime:t,fee:Number(a).toFixed(3)}}catch{return{tx:"-",lastTime:"-",fee:"-"}}};async function Ae(i){try{const a="https://graphql.starkscancdn.com/",s={query:`query ERC20BalancesByOwnerAddressTableQuery(
  $input: ERC20BalancesByOwnerAddressInput!
) {
  erc20BalancesByOwnerAddress(input: $input) {
    id
    ...ERC20BalancesByOwnerAddressTableRowFragment_erc20Balance
  }
}

fragment ERC20BalancesByOwnerAddressTableRowFragment_erc20Balance on ERC20Balance {
  id
  contract_address
  contract_erc20_identifier
  contract_erc20_contract {
    symbol
    is_social_verified
    icon_url
    id
  }
  balance_display
}
`,variables:{input:{owner_address:i}}},r={authority:"graphql.starkscancdn.com",accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6","content-type":"application/json",origin:"https://starkscan.co",referer:"https://starkscan.co/"},t=await $.post(a,s,{headers:r});let n={ETH:0,USDT:0,USDC:0,DAI:0,WBTC:0};return t.data.data.erc20BalancesByOwnerAddress.forEach(l=>{l.contract_address==="0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"?n.ETH=Number(parseFloat(l.balance_display)).toFixed(3):l.contract_address==="0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8"?n.USDT=Number(parseFloat(l.balance_display)).toFixed(3):l.contract_address==="0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8"?n.USDC=Number(parseFloat(l.balance_display)).toFixed(3):l.contract_address==="0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3"?n.DAI=Number(parseFloat(l.balance_display)).toFixed(3):l.contract_address==="0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3"&&(n.WBTC=Number(parseFloat(l.balance_display)).toFixed(3))}),n}catch(a){return console.log(a),{ETH:"-",USDT:"-",USDC:"-",DAI:"-",WBTC:"-"}}}const De=i=>{const a=i.getFullYear(),s=new Date(a,0,1),r=(i.getDay()+6)%7,t=Math.floor((i.getTime()-s.getTime())/864e5),n=Math.floor((t+s.getDay()-r)/7);return`${a}-${n}`},Be=i=>{let a="";if(!i)return a;for(let s=0;s<i.length;s++)if(i[s]&&(i[s].length===66||i[s].length===64||i[s].length===65)){a=i[s];break}return a},Pe=(i,a)=>{const s=new Set,r=new Set,t=new Set,n=new Set;return a.forEach(l=>{const _=new Date(l.timestamp*1e3),g=_.getFullYear(),u=_.getMonth(),y=_.getDate(),j=De(_);s.add(`${g}-${u}-${y}`),r.add(`${g}-${j}`),t.add(`${g}-${u}`);const k=Be(l.calldata);k&&n.add(k)}),{dayActivity:s.size,weekActivity:r.size,monthActivity:t.size,contractActivity:n.size}};function qe(i,a){if(a.length===0)return{dayActivity:0,weekActivity:0,monthActivity:0,contractActivity:0};const{dayActivity:s,weekActivity:r,monthActivity:t,contractActivity:n}=Pe(i,a);return{dayActivity:s,weekActivity:r,monthActivity:t,contractActivity:n}}const Ne=i=>{let a=0,s=0,r=0,t=0;const n={"StarkGate: ETH":1800,"StarkGate: USDT":1,"StarkGate: USDC":1,"StarkGate: DAI":1,"StarkGate: WBTC":29e3};return i.forEach(l=>{const _=l.transfer_from_address,g=l.transfer_to_address,u=l.transfer_amount_display,y=l.from_erc20_identifier;_.toLowerCase()==="0x0000000000000000000000000000000000000000000000000000000000000000".toLowerCase()&&(l.main_call?l.main_call.selector_identifier:null)==="handle_deposit"&&(a+=1,r+=parseFloat(u)*n[y]),g.toLowerCase()==="0x0000000000000000000000000000000000000000000000000000000000000000".toLowerCase()&&(l.main_call?l.main_call.selector_identifier:null)==="initiate_withdraw"&&(s+=1,t+=parseFloat(u)*n[y])}),{DepositTx:a,WithdrawTx:s,DepositVolume:Number(r.toFixed(2)),WithdrawVolume:Number(t.toFixed(2))}};async function Oe(i){const a="https://graphql.starkscancdn.com/",s={query:`query ContractPageQuery(
  $input: ContractInput!
) {
  contract(input: $input) {
    contract_address
    is_starknet_class_code_verified
    implementation_type
    ...ContractPageContainerFragment_contract
    ...ContractPageOverviewTabFragment_contract
    ...ContractPageClassCodeHistoryTabFragment_contract
    ...ContractFunctionReadWriteTabFragment_contract
    id
  }
}

fragment ContractFunctionReadCallsFragment_starknetClass on StarknetClass {
  is_code_verified
  abi_final
}

fragment ContractFunctionReadWriteTabFragment_contract on Contract {
  contract_address
  starknet_class {
    ...ContractFunctionReadCallsFragment_starknetClass
    ...ContractFunctionWriteCallsFragment_starknetClass
    id
  }
}

fragment ContractFunctionWriteCallsFragment_starknetClass on StarknetClass {
  is_code_verified
  abi_final
}

fragment ContractPageClassCodeHistoryTabFragment_contract on Contract {
  contract_address
  starknet_class {
    is_code_verified
    id
  }
  ...ContractPageCodeSubTabFragment_contract
}

fragment ContractPageCodeSubTabFragment_contract on Contract {
  starknet_class {
    class_hash
    ...StarknetClassCodeTabFragment_starknetClass
    id
  }
}

fragment ContractPageContainerFragment_contract on Contract {
  contract_address
  implementation_type
  is_starknet_class_code_verified
  contract_stats {
    number_of_transactions
    number_of_account_calls
    number_of_events
  }
}

fragment ContractPageOverviewTabClassHashPlacedAtItemFragment_contract on Contract {
  deployed_at_transaction_hash
  class_hash_placed_at_transaction_hash
  class_hash_placed_at_timestamp
}

fragment ContractPageOverviewTabEthBalanceItemFragment_contract on Contract {
  eth_balance {
    balance_display
    id
  }
}

fragment ContractPageOverviewTabFragment_contract on Contract {
  contract_address
  class_hash
  name_tag
  is_social_verified
  deployed_by_contract_address
  deployed_by_contract_identifier
  deployed_at_transaction_hash
  deployed_at_timestamp
  ...ContractPageOverviewTabEthBalanceItemFragment_contract
  ...ContractPageOverviewTabTypeItemFragment_contract
  ...ContractPageOverviewTabStarknetIDItemFragment_contract
  starknet_class {
    ...StarknetClassVersionItemFragment_starknetClass
    id
  }
  ...ContractPageOverviewTabClassHashPlacedAtItemFragment_contract
}

fragment ContractPageOverviewTabStarknetIDItemFragment_contract on Contract {
  starknet_id {
    domain
  }
}

fragment ContractPageOverviewTabTypeItemFragment_contract on Contract {
  implementation_type
  starknet_class {
    type
    id
  }
}

fragment StarknetClassCodeTabAbiAndByteCodeItemFragment_starknetClass on StarknetClass {
  is_code_verified
  abi_final
  bytecode
  sierra_program
}

fragment StarknetClassCodeTabFragment_starknetClass on StarknetClass {
  ...StarknetClassCodeTabVerifiedItemFragment_starknetClass
  ...StarknetClassCodeTabSourceCodeItemFragment_starknetClass
  ...StarknetClassCodeTabAbiAndByteCodeItemFragment_starknetClass
}

fragment StarknetClassCodeTabSourceCodeItemFragment_starknetClass on StarknetClass {
  class_hash
  verified {
    source_code
  }
}

fragment StarknetClassCodeTabVerifiedItemFragment_starknetClass on StarknetClass {
  is_code_verified
  verified {
    name
    source_code
    verified_at_timestamp
  }
}

fragment StarknetClassVersionItemFragment_starknetClass on StarknetClass {
  is_cairo_one
}
`,variables:{input:{contract_address:i}}},r={authority:"graphql.starkscancdn.com",accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6","content-type":"application/json"},t=await $.post(a,s,{headers:r}),n=ae(t.data.data.contract.deployed_at_timestamp),l=t.data.data.contract.starknet_id?t.data.data.contract.starknet_id.domain:"无";return{deployedTime:n,starkId:l}}function Re(i){try{let a=0;const s=["transfer","deposit","handle_deposit","initiate_withdraw"];return i.forEach(r=>{if(r.main_calls&&s.includes(r.main_calls[0].selector_name))return;const t=r.transfers.sort((l,_)=>parseInt(_.total_value)-parseInt(l.total_value));if(t.length===0)return;const n=parseFloat(t[0].total_value);a+=n}),{Vol:a.toFixed(3)}}catch(a){return console.log(a),{Vol:"-"}}}const te=async i=>{let a;try{await be(Te);const s=await Ie(i),r=s.transactions,t=s.transfers,n=qe(i,r),{tx:l,lastTime:_,fee:g}=await Ee(r),u=await Ae(i),y=Ne(t),j=await Oe(i),k=Re(r);return a={accountInfo:j,balance:u,tx:l,lastTime:_,fee:g,activity:n,bridge:y,...k,result:"success"},await ke("starkTransactions",{address:i,data:JSON.stringify(r)}),a}catch(s){return a={result:"error",reason:s.message},a}};const{Text:F}=je,{TextArea:$e}=ne,{Content:Ue}=ge,He=()=>{const[i,a]=A.useState(!1),[s,r]=A.useState(!1),[t,n]=A.useState([]),[l]=V.useForm(),[_,g]=A.useState(!1),[u,y]=A.useState([]),[j,k]=A.useState(!1);let q=t.length+1;const[O,U]=A.useState(!1);A.useEffect(()=>{k(!0);const c=localStorage.getItem("stark_addresses");setTimeout(()=>{k(!1)},500),c&&n(JSON.parse(c)),U(!0)},[]),A.useEffect(()=>{O&&localStorage.setItem("stark_addresses",JSON.stringify(t))},[t,O]);const se=[{title:"#",key:"index",align:"center",render:(c,o,T)=>T+1},{title:"备注",dataIndex:"name",key:"name",align:"center",className:"name",render:(c,o)=>{const T=c||e.jsx(Y,{});return e.jsx(L,{title:e.jsx("div",{children:e.jsx(ne,{placeholder:"请输入备注",defaultValue:c,onChange:f=>{o.name=f.target.value},allowClear:!0,bordered:!0})}),icon:e.jsx(Y,{}),onConfirm:()=>{n([...t]),localStorage.setItem("stark_addresses",JSON.stringify(t))},onCancel:()=>{},okText:"确定",cancelText:"取消",children:e.jsx(R,{color:"blue",style:{cursor:"pointer"},children:T})})}},{title:"钱包地址",dataIndex:"address",key:"address",align:"center",className:"address",render:c=>{const o=()=>{ve(c),we.success("地址已复制")};return c?e.jsxs(e.Fragment,{children:[c.slice(0,4),"...",c.slice(-4),e.jsx(B,{type:"text",icon:e.jsx(Se,{}),onClick:o,style:{marginLeft:8}})]}):e.jsx(M,{})}},{title:"StarkId",dataIndex:["accountInfo","starkId"],key:"starkId",align:"center",render:c=>c},{title:"StarkNet",children:[{title:"ETH",dataIndex:["balance","ETH"],key:"stark_eth_balance",align:"center"},{title:"USDC",dataIndex:["balance","USDC"],key:"stark_usdc_balance",align:"center"},{title:"USDT",dataIndex:["balance","USDT"],key:"stark_usdt_balance",align:"center"},{title:"DAI",dataIndex:["balance","DAI"],key:"stark_dai_balance",align:"center"},{title:"WBTC",dataIndex:["balance","WBTC"],key:"stark_wbtc_balance",align:"center"},{title:"Tx",dataIndex:"tx",key:"stark_tx_amount",align:"center",sorter:(c,o)=>c.tx-o.tx},{title:"最后交易",dataIndex:"lastTime",key:"stark_latest_tx",align:"center",render:(c,o)=>e.jsx("a",{href:`https://voyager.online/contract/${o.address}`,target:"_blank",children:c})},{title:"官方桥Tx",className:"stark_cross_tx",children:[{title:"L1->L2",dataIndex:["bridge","DepositTx"],align:"center"},{title:"L2->L1",dataIndex:["bridge","WithdrawTx"],align:"center"}]},{title:"官方桥金额(U)",className:"stark_cross_amount",children:[{title:"L1->L2",dataIndex:["bridge","DepositVolume"],align:"center"},{title:"L2->L1",dataIndex:["bridge","WithdrawVolume"],align:"center"}]},{title:"活跃统计",className:"stark_activity",children:[{title:"天",dataIndex:["activity","dayActivity"],align:"center"},{title:"周",dataIndex:["activity","weekActivity"],align:"center"},{title:"月",dataIndex:["activity","monthActivity"],align:"center"},{title:"合约",dataIndex:["activity","contractActivity"],align:"center"},{title:"Vol(U)",dataIndex:"Vol",align:"center",sorter:(c,o)=>c.Vol-o.Vol},{title:"fee(E)",dataIndex:"fee",align:"center",sorter:(c,o)=>c.fee-o.fee}]},{title:"状态",key:"result",align:"center",render:(c,o)=>e.jsxs(K,{children:[o.result==="success"?e.jsx(R,{icon:e.jsx(pe,{}),color:"success",children:"成功"}):null,o.result==="error"?e.jsx(he,{title:o.reason,children:e.jsx(R,{icon:e.jsx(ye,{}),color:"error",children:"失败 "})}):null,o.result==="pending"?e.jsx(R,{icon:e.jsx(J,{spin:!0}),color:"processing",children:"获取中 "}):null]})},{title:"操作",key:"action",align:"center",render:(c,o)=>e.jsxs(K,{children:[e.jsx(L,{title:"确认删除？",onConfirm:async()=>{await re(o.address)},children:e.jsx(B,{icon:e.jsx(Q,{})})}),e.jsx(B,{icon:e.jsx(xe,{}),onClick:()=>{z(o.key)}})]})}]}],re=async c=>{n(t.filter(o=>o.address!==c)),localStorage.setItem("stark_addresses",JSON.stringify(t.filter(o=>o.address!==c))),await X("starkTransactions",[c])},ie=async()=>{try{r(!0),a(!1);const o=(await l.validateFields()).addresses.split(`
`),T=5;let f=0,p=[];const E=()=>{for(;p.length>0&&f<T;){const m=p.shift();f+=1,m().finally(()=>{f-=1,E()})}};for(let m of o){if(m=m.trim(),m.length===0){P.error({message:"错误",description:"请输入正确的stark地址(64位)",duration:1});continue}m.startsWith("0x")||(m="0x"+m);const S=()=>new Promise(async(D,N)=>{try{n(w=>{const C=[...w];if(C.findIndex(b=>b.address===m)===-1){const b={key:q.toString(),address:m,result:"pending"};q++,C.push(b)}return C});const x=await te(m);n(w=>{const C=[...w],h=C.findIndex(b=>b.address===m);return h!==-1&&(C[h]={...C[h],...x}),C}),D()}catch(x){N(x)}});p.push(S)}for(E();f>0||p.length>0;)await new Promise(m=>setTimeout(m,100));P.success({message:"成功",description:"批量添加完成",duration:1})}catch(c){P.error({message:"错误",description:c.message,duration:1})}finally{l.resetFields(),y([]),r(!1)}},z=async c=>{const o=c?[c]:u;if(!o.length){P.error({message:"错误",description:"请先选择要刷新的地址",duration:1});return}g(!0);try{let f=0,p=[];const E=()=>{for(;p.length>0&&f<5;){const m=p.shift();f+=1,m().finally(()=>{f-=1,E()})}};for(let m of o){const S=t.findIndex(D=>D.key===m);if(S!==-1){const D=()=>new Promise(async(N,x)=>{try{n(C=>{const h=[...C];for(let b in h[S])b!=="address"&&b!=="name"&&b!=="key"&&(b==="result"?h[S][b]="pending":h[S][b]=null);return h});const w=await te(t[S].address);n(C=>{const h=[...C];return h[S]={...h[S],...w},localStorage.setItem("stark_addresses",JSON.stringify(h)),h}),N()}catch(w){x(w)}});p.push(D)}}for(E();f>0||p.length>0;)await new Promise(m=>setTimeout(m,100));P.success({message:"完成",description:"刷新地址数据完成",duration:1})}catch(T){P.error({message:"错误",description:T.message,duration:1})}finally{g(!1),c||y([])}},ce=async()=>{if(!u.length){P.error({message:"错误",description:"请先选择要删除的地址",duration:1});return}const c=t.filter(o=>u.includes(o.key)).map(o=>o.address);await X("starkTransactions",c),n(t.filter(o=>!u.includes(o.key))),localStorage.setItem("stark_addresses",JSON.stringify(t.filter(o=>!u.includes(o.key)))),y([])},oe=()=>{Ce(t,"starkInfo")},le={selectedRowKeys:u,onChange:c=>{y(c)}};function I(c,o=3){return c===0?"0":c.toFixed(o)}const v={display:"flex",alignItems:"center",justifyContent:"center",height:"100%",width:"100%"},de=c=>{let o=0,T=0,f=0,p=0,E=0,m=0,S=0,D=0,N=0;return c.forEach(x=>{var w,C,h,b,W,G,H;o+=parseFloat(((w=x.balance)==null?void 0:w.ETH)||0),T+=parseFloat(((C=x.balance)==null?void 0:C.USDC)||0),f+=parseFloat(((h=x.balance)==null?void 0:h.USDT)||0),p+=parseFloat(((b=x.balance)==null?void 0:b.DAI)||0),E+=parseFloat(((W=x.balance)==null?void 0:W.WBTC)||0),m+=parseFloat(((G=x.bridge)==null?void 0:G.DepositVolume)||0),S+=parseFloat(((H=x.bridge)==null?void 0:H.WithdrawVolume)||0),D+=parseFloat(x.Vol||0),N+=parseFloat(x.fee||0)}),e.jsx(d.Summary,{children:e.jsxs(d.Summary.Row,{children:[e.jsx(d.Summary.Cell,{index:0,children:e.jsx("div",{style:v,children:e.jsx(F,{type:"danger",children:"总计"})})}),e.jsx(d.Summary.Cell,{index:1}),e.jsx(d.Summary.Cell,{index:2}),e.jsx(d.Summary.Cell,{index:3}),e.jsx(d.Summary.Cell,{index:4}),e.jsx(d.Summary.Cell,{index:5,children:e.jsx("div",{style:v,children:e.jsx(F,{type:"danger",children:I(o)})})}),e.jsx(d.Summary.Cell,{index:6,children:e.jsx("div",{style:v,children:e.jsx(F,{type:"danger",children:I(T)})})}),e.jsx(d.Summary.Cell,{index:7,children:e.jsx("div",{style:v,children:e.jsx(F,{type:"danger",children:I(f)})})}),e.jsx(d.Summary.Cell,{index:8,children:e.jsx("div",{style:v,children:e.jsx(F,{type:"danger",children:I(p)})})}),e.jsx(d.Summary.Cell,{index:9,children:e.jsx("div",{style:v,children:e.jsx(F,{type:"danger",children:I(E)})})}),e.jsx(d.Summary.Cell,{index:10}),e.jsx(d.Summary.Cell,{index:11}),e.jsx(d.Summary.Cell,{index:12}),e.jsx(d.Summary.Cell,{index:13}),e.jsx(d.Summary.Cell,{index:14,children:e.jsx("div",{style:v,children:e.jsx(F,{type:"danger",children:I(m,2)})})}),e.jsx(d.Summary.Cell,{index:15,children:e.jsx("div",{style:v,children:e.jsx(F,{type:"danger",children:I(S,2)})})}),e.jsx(d.Summary.Cell,{index:16}),e.jsx(d.Summary.Cell,{index:17}),e.jsx(d.Summary.Cell,{index:18}),e.jsx(d.Summary.Cell,{index:19}),e.jsx(d.Summary.Cell,{index:20,children:e.jsx("div",{style:v,children:e.jsx(F,{type:"danger",children:I(D,2)})})}),e.jsx(d.Summary.Cell,{index:21,children:e.jsx("div",{style:v,children:e.jsx(F,{type:"danger",children:I(N,2)})})}),e.jsx(d.Summary.Cell,{index:22}),e.jsx(d.Summary.Cell,{index:23})]})})};return e.jsx("div",{children:e.jsxs(Ue,{children:[e.jsx(me,{title:"批量添加地址",open:i,onOk:ie,onCancel:()=>{a(!1),l.resetFields()},okText:"添加地址",cancelText:"取消",width:800,children:e.jsx(V,{form:l,layout:"vertical",children:e.jsx(V.Item,{label:"地址",name:"addresses",rules:[{required:!0,validator:(c,o)=>{const T=o.split(`
`);let f=[];for(let p=0;p<T.length;p++)T[p].trim().length===0&&f.push(p+1);return f.length?Promise.reject(`行 ${f.join(", ")} 的地址格式错误，请输入正确的stark地址`):Promise.resolve()}}],children:e.jsx($e,{placeholder:"请输入地址，每行一个",style:{width:"100%",height:"300px",resize:"none"}})})})}),e.jsx("div",{style:{marginBottom:"50px"},children:e.jsx(M,{spinning:j,size:"small",children:e.jsx(d,{rowSelection:le,dataSource:t,pagination:!1,bordered:!0,style:{marginBottom:"20px"},size:"small",columns:se,summary:de})})}),e.jsx("div",{className:"stark_footer",children:e.jsx(ue,{size:"small",style:{width:"100%"},children:e.jsxs("div",{style:{width:"100%",display:"flex",justifyContent:"space-between"},children:[e.jsx(B,{type:"primary",onClick:()=>{a(!0)},size:"large",style:{width:"25%"},icon:e.jsx(_e,{}),loading:s,children:s?"添加中...":"添加地址"}),e.jsx(B,{type:"primary",onClick:()=>z(),loading:_,size:"large",style:{width:"25%"},icon:e.jsx(J,{}),children:"刷新选中地址"}),e.jsx(L,{title:"确认删除"+u.length+"个地址？",onConfirm:async()=>{await ce()},children:e.jsx(B,{type:"primary",danger:!0,size:"large",style:{width:"25%"},icon:e.jsx(Q,{}),children:"删除选中地址"})}),e.jsx(B,{type:"primary",icon:e.jsx(fe,{}),size:"large",style:{width:"8%"},onClick:oe})]})})})]})})};export{He as default};
