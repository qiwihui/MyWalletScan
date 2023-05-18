import{r as q,j as r}from"./index-0090bc39.js";import{U as ut,S as mt,D as gt,n as W,e as ft}from"./save_excel-81eab0f5.js";import{a as Q,C as ht}from"./axios-e86e25c1.js";import{F as R,a as et,T as kt,D as nt,b as pt,P as wt}from"./index-4b982a76.js";import{I as Y,S as g,P as St}from"./index-46755501.js";import{B as H,E as yt}from"./EditOutlined-a6f8255c.js";import{L as xt}from"./index-9a723ace.js";import{S as Ct}from"./index-f8975bb3.js";async function V(C){try{let u=0,f,k;const c="https://starkscan.stellate.sh/",l={authority:"starkscan.stellate.sh",accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6","content-type":"application/json"},s={query:`query TransactionsTableQuery(
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
`,variables:{first:30,after:null,input:{initiator_address:C,transaction_types:["INVOKE_FUNCTION"],sort_by:"timestamp",order_by:"desc",min_block_number:null,max_block_number:null,min_timestamp:null,max_timestamp:null}}},d=await Q.post(c,s,{headers:l});u+=d.data.data.transactions.edges.length,f=d.data.data.transactions.pageInfo.hasNextPage;const x=d.data.data.transactions.edges[0].node.timestamp,i=new Date(x*1e3);let w=i.getFullYear(),S=i.getMonth()+1,p=i.getDate();S<10&&(S="0"+S),p<10&&(p="0"+p);let z=`${w}/${S}/${p}`;if(f===!0)for(k=d.data.data.transactions.pageInfo.endCursor;f;){s.variables.after=k;const L=await Q.post(c,s,{headers:l});f=L.data.data.transactions.pageInfo.hasNextPage,k=L.data.data.transactions.pageInfo.endCursor,u+=L.data.data.transactions.edges.length}return console.log(u,z),{tx:u,stark_latest_tx:z}}catch(u){return console.error(u),{tx:"Error",stark_latest_tx:"Error"}}}async function at(C,u,f,k){for(let c=0;c<k.length;c++){const l=k[c].node;l.transaction_hash;const s=l.transfer_amount_display,d=l.transfer_from_address;l.timestamp,l.transfer_to_identifier;const x=l.main_call?l.main_call.selector_identifier:null;if(d==="0x0000000000000000000000000000000000000000000000000000000000000000"&&x==="handle_deposit"){const i=l.from_erc20_identifier;if(i in u){const w=u[i].amount+=parseFloat(s),S=u[i].count+=1;u[i]={amount:w,count:S}}else u[i]={amount:parseFloat(s),count:1}}else if(d===C&&x==="initiate_withdraw"){const i=l.from_erc20_identifier;if(i in f){const w=f[i].amount+=parseFloat(s),S=f[i].count+=1;f[i]={amount:w,count:S}}else f[i]={amount:parseFloat(s),count:1}}}return[u,f]}async function M(C){try{const u="https://starkscan.stellate.sh/",f={authority:"starkscan.stellate.sh",accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6","content-type":"application/json"},k={query:`query ERC20TransferEventsTableQuery(
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
`,variables:{first:30,after:null,input:{transfer_from_or_to_address:C,call_invocation_type:"FUNCTION",sort_by:"timestamp",order_by:"desc"}}};let c=await Q.post(u,k,{headers:f}),l=c.data.data.erc20TransferEvents.edges,s={},d={},x=c.data.data.erc20TransferEvents.pageInfo.hasNextPage,i;for([s,d]=await at(C,s,d,l),x&&(i=c.data.data.erc20TransferEvents.pageInfo.endCursor);x===!0;){k.variables.after=i;let p=await Q.post(u,k,{headers:f});x=p.data.data.erc20TransferEvents.pageInfo.hasNextPage,x===!1?i=null:i=p.data.data.erc20TransferEvents.pageInfo.endCursor,[s,d]=await at(C,s,d,p.data.data.erc20TransferEvents.edges)}let w=0,S=0;for(let p in s)w+=s[p].count;for(let p in d)S+=d[p].count;return console.log(s),console.log(d),{d_eth_amount:s["StarkGate: ETH"]?parseFloat(s["StarkGate: ETH"].amount).toFixed(3):0,d_eth_count:s["StarkGate: ETH"]?s["StarkGate: ETH"].count:0,d_usdc_amount:s["StarkGate: USDC"]?parseFloat(s["StarkGate: USDC"].amount).toFixed(3):0,d_usdc_count:s["StarkGate: USDC"]?s["StarkGate: USDC"].count:0,d_usdt_amount:s["StarkGate: USDT"]?parseFloat(s["StarkGate: USDT"].amount).toFixed(3):0,d_usdt_count:s["StarkGate: USDT"]?s["StarkGate: USDT"].count:0,d_dai_amount:s["StarkGate: DAI"]?parseFloat(s["StarkGate: DAI"].amount).toFixed(3):0,d_dai_count:s["StarkGate: DAI"]?s["StarkGate: DAI"].count:0,d_wbtc_amount:s["StarkGate: WBTC"]?parseFloat(s["StarkGate: WBTC"].amount).toFixed(6):0,d_wbtc_count:s["StarkGate: WBTC"]?s["StarkGate: WBTC"].count:0,w_eth_amount:d["StarkGate: ETH"]?parseFloat(d["StarkGate: ETH"].amount).toFixed(3):0,w_eth_count:d["StarkGate: ETH"]?d["StarkGate: ETH"].count:0,w_usdc_amount:d["StarkGate: USDC"]?parseFloat(d["StarkGate: USDC"].amount).toFixed(3):0,w_usdc_count:d["StarkGate: USDC"]?d["StarkGate: USDC"].count:0,w_usdt_amount:d["StarkGate: USDT"]?parseFloat(d["StarkGate: USDT"].amount).toFixed(3):0,w_usdt_count:d["StarkGate: USDT"]?d["StarkGate: USDT"].count:0,w_dai_amount:d["StarkGate: DAI"]?parseFloat(d["StarkGate: DAI"].amount).toFixed(3):0,w_dai_count:d["StarkGate: DAI"]?d["StarkGate: DAI"].count:0,w_wbtc_amount:d["StarkGate: WBTC"]?parseFloat(d["StarkGate: WBTC"].amount).toFixed(6):0,w_wbtc_count:d["StarkGate: WBTC"]?d["StarkGate: WBTC"].count:0,total_deposit_count:w,total_widthdraw_count:S}}catch(u){return console.log(u),{d_eth_amount:"Error",d_eth_count:"Error",d_usdc_amount:"Error",d_usdc_count:"Error",d_usdt_amount:"Error",d_usdt_count:"Error",d_dai_amount:"Error",d_dai_count:"Error",d_wbtc_amount:"Error",d_wbtc_count:"Error",w_eth_amount:"Error",w_eth_count:"Error",w_usdc_amount:"Error",w_usdc_count:"Error",w_usdt_amount:"Error",w_usdt_count:"Error",w_dai_amount:"Error",w_dai_count:"Error",w_wbtc_amount:"Error",w_wbtc_count:"Error",total_deposit_count:"Error",total_widthdraw_count:"Error"}}}async function K(C){try{const u="https://starkscan.stellate.sh/",f={authority:"starkscan.stellate.sh",accept:"application/json","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6","content-type":"application/json"},k={query:`query ContractPageQuery(
  $input: ContractInput!
) {
  contract(input: $input) {
    contract_address
    is_starknet_class_code_verified
    implementation_type
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
`,variables:{input:{contract_address:C}}},c=await Q.post(u,k,{headers:f}),l=c.data.data.contract.eth_balance.balance_display,s=c.data.data.contract.starknet_id?c.data.data.contract.starknet_id.domain:"null",d=c.data.data.contract.deployed_at_timestamp;return{eth_balance:parseFloat(l).toFixed(3),stark_id:s==="null"?"无":s,deployed_at_timestamp:d}}catch(u){return console.log(u),{eth_balance:"Error",stark_id:"Error",deployed_at_timestamp:"Error"}}}const{TextArea:bt}=Y,{Content:Tt}=xt,Ot=()=>{const[C,u]=q.useState(!1),[f,k]=q.useState(!1),[c,l]=q.useState([]),[s]=R.useForm(),[d,x]=q.useState(!1),[i,w]=q.useState([]),[S,p]=q.useState(!1),[z]=R.useForm(),L={onChange:(t,o)=>{w(t)}};q.useEffect(()=>{p(!0);const t=localStorage.getItem("stark_addresses");setTimeout(()=>{p(!1)},500),t&&l(JSON.parse(t))},[]);const rt=t=>{l(c.filter(o=>o.key!==t)),localStorage.setItem("stark_addresses",JSON.stringify(c.filter(o=>o.key!==t)))},st=async()=>{try{const t=await z.validateFields();if(t.address.length!==66&&t.address.length!==64){W.error({message:"错误",description:"请输入正确的stark地址(64位)"},2);return}t.address.startsWith("0x")||(t.address="0x"+t.address),u(!1);const o=c.findIndex(n=>n.address===t.address);if(o!==-1){l(c.map((e,_)=>_===o?{...e,name:t.name}:e));const n=[...c];K(t.address).then(({eth_balance:e,stark_id:_,deployed_at_timestamp:a})=>{n[o]={...n[o],stark_eth_balance:e,stark_id:_,create_time:a},l(n),localStorage.setItem("stark_addresses",JSON.stringify(c))}),M(t.address).then(({d_eth_amount:e,d_eth_count:_,d_usdc_amount:a,d_usdc_count:m,d_usdt_amount:h,d_usdt_count:y,d_dai_amount:b,d_dai_count:T,d_wbtc_amount:I,d_wbtc_count:F,w_eth_amount:E,w_eth_count:v,w_usdc_amount:j,w_usdc_count:D,w_usdt_amount:G,w_usdt_count:N,w_dai_amount:O,w_dai_count:P,w_wbtc_amount:U,w_wbtc_count:A,total_deposit_count:B,total_widthdraw_count:J})=>{n[o]={...n[o],d_eth_amount:e,d_eth_count:_,d_usdc_amount:a,d_usdc_count:m,d_usdt_amount:h,d_usdt_count:y,d_dai_amount:b,d_dai_count:T,d_wbtc_amount:I,d_wbtc_count:F,w_eth_amount:E,w_eth_count:v,w_usdc_amount:j,w_usdc_count:D,w_usdt_amount:G,w_usdt_count:N,w_dai_amount:O,w_dai_count:P,w_wbtc_amount:U,w_wbtc_count:A,total_deposit_count:B,total_widthdraw_count:J},l(n),localStorage.setItem("stark_addresses",JSON.stringify(c))}),V(t.address).then(({tx:e,stark_latest_tx:_})=>{n[o]={...n[o],stark_tx_amount:e,stark_latest_tx:_},l(n),localStorage.setItem("stark_addresses",JSON.stringify(c))})}else{const n={key:c.length.toString(),name:t.name,address:t.address,stark_eth_balance:null,stark_id:null,create_time:null,d_eth_amount:null,d_eth_count:null,d_usdc_amount:null,d_usdc_count:null,d_usdt_amount:null,d_usdt_count:null,d_dai_amount:null,d_dai_count:null,d_wbtc_amount:null,d_wbtc_count:null,w_eth_amount:null,w_eth_count:null,w_usdc_amount:null,w_usdc_count:null,w_usdt_amount:null,w_usdt_count:null,w_dai_amount:null,w_dai_count:null,w_wbtc_amount:null,w_wbtc_count:null,stark_tx_amount:null,stark_latest_tx:null,total_deposit_count:null,total_widthdraw_count:null},e=[...c,n];l(e),V(t.address).then(({tx:_,stark_latest_tx:a})=>{n.stark_tx_amount=_,n.stark_latest_tx=a,l([...e]),localStorage.setItem("stark_addresses",JSON.stringify(e))}),K(t.address).then(({eth_balance:_,stark_id:a,deployed_at_timestamp:m})=>{n.stark_eth_balance=_,n.stark_id=a,n.create_time=m,l([...e]),localStorage.setItem("stark_addresses",JSON.stringify(e))}),M(t.address).then(({d_eth_amount:_,d_eth_count:a,d_usdc_amount:m,d_usdc_count:h,d_usdt_amount:y,d_usdt_count:b,d_dai_amount:T,d_dai_count:I,d_wbtc_amount:F,d_wbtc_count:E,w_eth_amount:v,w_eth_count:j,w_usdc_amount:D,w_usdc_count:G,w_usdt_amount:N,w_usdt_count:O,w_dai_amount:P,w_dai_count:U,w_wbtc_amount:A,w_wbtc_count:B,total_widthdraw_count:J,total_deposit_count:$})=>{n.d_eth_amount=_,n.d_eth_count=a,n.d_usdc_amount=m,n.d_usdc_count=h,n.d_usdt_amount=y,n.d_usdt_count=b,n.d_dai_amount=T,n.d_dai_count=I,n.d_wbtc_amount=F,n.d_wbtc_count=E,n.w_eth_amount=v,n.w_eth_count=j,n.w_usdc_amount=D,n.w_usdc_count=G,n.w_usdt_amount=N,n.w_usdt_count=O,n.w_dai_amount=P,n.w_dai_count=U,n.w_wbtc_amount=A,n.w_wbtc_count=B,n.total_deposit_count=$,n.total_widthdraw_count=J,l([...e]),localStorage.setItem("stark_addresses",JSON.stringify(e))})}}catch(t){W.error({message:"错误",description:t.message},2)}finally{z.resetFields()}},ot=async()=>{try{const o=(await s.validateFields()).addresses.split(`
`),n=[...c];for(let e of o){if(e=e.trim(),e.length!==66&&e.length!==64){W.error({message:"错误",description:"请输入正确的stark地址(64位)"});continue}e.startsWith("0x")||(e="0x"+e);const _=n.findIndex(a=>a.address===e);if(_!==-1){const a=[...n];V(e).then(({tx:m,stark_latest_tx:h})=>{a[_]={...a[_],stark_tx_amount:m,stark_latest_tx:h},l(a),localStorage.setItem("stark_addresses",JSON.stringify(a))}),K(e).then(({eth_balance:m,stark_id:h,deployed_at_timestamp:y})=>{a[_]={...a[_],stark_eth_balance:m,stark_id:h,create_time:y},l(a),localStorage.setItem("stark_addresses",JSON.stringify(a))}),M(e).then(({d_eth_amount:m,d_eth_count:h,d_usdc_amount:y,d_usdc_count:b,d_usdt_amount:T,d_usdt_count:I,d_dai_amount:F,d_dai_count:E,d_wbtc_amount:v,d_wbtc_count:j,w_eth_amount:D,w_eth_count:G,w_usdc_amount:N,w_usdc_count:O,w_usdt_amount:P,w_usdt_count:U,w_dai_amount:A,w_dai_count:B,w_wbtc_amount:J,w_wbtc_count:$,total_widthdraw_count:X,total_deposit_count:Z})=>{a[_]={...a[_],d_eth_amount:m,d_eth_count:h,d_usdc_amount:y,d_usdc_count:b,d_usdt_amount:T,d_usdt_count:I,d_dai_amount:F,d_dai_count:E,d_wbtc_amount:v,d_wbtc_count:j,w_eth_amount:D,w_eth_count:G,w_usdc_amount:N,w_usdc_count:O,w_usdt_amount:P,w_usdt_count:U,w_dai_amount:A,w_dai_count:B,w_wbtc_amount:J,w_wbtc_count:$,total_widthdraw_count:X,total_deposit_count:Z}})}else{const a={key:n.length.toString(),address:e,stark_eth_balance:null,stark_id:null,create_time:null,d_eth_amount:null,d_eth_count:null,d_usdc_amount:null,d_usdc_count:null,d_usdt_amount:null,d_usdt_count:null,d_dai_amount:null,d_dai_count:null,d_wbtc_amount:null,d_wbtc_count:null,w_eth_amount:null,w_eth_count:null,w_usdc_amount:null,w_usdc_count:null,w_usdt_amount:null,w_usdt_count:null,w_dai_amount:null,w_dai_count:null,w_wbtc_amount:null,w_wbtc_count:null,stark_tx_amount:null,stark_latest_tx:null,total_deposit_count:null,total_widthdraw_count:null};n.push(a),l(n),V(e).then(({tx:m,stark_latest_tx:h})=>{a.stark_tx_amount=m,a.stark_latest_tx=h,l([...n]),localStorage.setItem("stark_addresses",JSON.stringify(n))}),K(e).then(({eth_balance:m,stark_id:h,deployed_at_timestamp:y})=>{a.stark_eth_balance=m,a.stark_id=h,a.create_time=y,l([...n]),localStorage.setItem("stark_addresses",JSON.stringify(n))}),M(e).then(({d_eth_amount:m,d_eth_count:h,d_usdc_amount:y,d_usdc_count:b,d_usdt_amount:T,d_usdt_count:I,d_dai_amount:F,d_dai_count:E,d_wbtc_amount:v,d_wbtc_count:j,w_eth_amount:D,w_eth_count:G,w_usdc_amount:N,w_usdc_count:O,w_usdt_amount:P,w_usdt_count:U,w_dai_amount:A,w_dai_count:B,w_wbtc_amount:J,w_wbtc_count:$,total_widthdraw_count:X,total_deposit_count:Z})=>{a.d_eth_amount=m,a.d_eth_count=h,a.d_usdc_amount=y,a.d_usdc_count=b,a.d_usdt_amount=T,a.d_usdt_count=I,a.d_dai_amount=F,a.d_dai_count=E,a.d_wbtc_amount=v,a.d_wbtc_count=j,a.w_eth_amount=D,a.w_eth_count=G,a.w_usdc_amount=N,a.w_usdc_count=O,a.w_usdt_amount=P,a.w_usdt_count=U,a.w_dai_amount=A,a.w_dai_count=B,a.w_wbtc_amount=J,a.w_wbtc_count=$,a.total_widthdraw_count=X,a.total_deposit_count=Z,l([...n]),localStorage.setItem("stark_addresses",JSON.stringify(n))})}}k(!1)}catch(t){W.error({message:"错误",description:t.message})}finally{s.resetFields(),w([])}},lt=async()=>{if(!i.length){W.error({message:"错误",description:"请先选择要刷新的地址"},2);return}x(!0);try{const t=[...c];for(let o of i){const n=t.findIndex(e=>e.key===o);if(n!==-1){const e=t[n];e.stark_tx_amount=null,e.stark_latest_tx=null,e.stark_eth_balance=null,e.stark_id=null,e.create_time=null,e.d_eth_amount=null,e.d_eth_count=null,e.d_usdc_amount=null,e.d_usdc_count=null,e.d_usdt_amount=null,e.d_usdt_count=null,e.d_dai_amount=null,e.d_dai_count=null,e.d_wbtc_amount=null,e.d_wbtc_count=null,e.w_eth_amount=null,e.w_eth_count=null,e.w_usdc_amount=null,e.w_usdc_count=null,e.w_usdt_amount=null,e.w_usdt_count=null,e.w_dai_amount=null,e.w_dai_count=null,e.w_wbtc_amount=null,e.w_wbtc_count=null,e.total_widthdraw_count=null,e.total_deposit_count=null,l([...t]),V(e.address).then(({tx:_,stark_latest_tx:a})=>{e.stark_tx_amount=_,e.stark_latest_tx=a,l([...t]),localStorage.setItem("stark_addresses",JSON.stringify(c))}),K(e.address).then(({eth_balance:_,stark_id:a,deployed_at_timestamp:m})=>{e.stark_eth_balance=_,e.stark_id=a,e.create_time=m,l([...t]),localStorage.setItem("stark_addresses",JSON.stringify(c))}),M(e.address).then(({d_eth_amount:_,d_eth_count:a,d_usdc_amount:m,d_usdc_count:h,d_usdt_amount:y,d_usdt_count:b,d_dai_amount:T,d_dai_count:I,d_wbtc_amount:F,d_wbtc_count:E,w_eth_amount:v,w_eth_count:j,w_usdc_amount:D,w_usdc_count:G,w_usdt_amount:N,w_usdt_count:O,w_dai_amount:P,w_dai_count:U,w_wbtc_amount:A,w_wbtc_count:B,total_widthdraw_count:J,total_deposit_count:$})=>{e.d_eth_amount=_,e.d_eth_count=a,e.d_usdc_amount=m,e.d_usdc_count=h,e.d_usdt_amount=y,e.d_usdt_count=b,e.d_dai_amount=T,e.d_dai_count=I,e.d_wbtc_amount=F,e.d_wbtc_count=E,e.w_eth_amount=v,e.w_eth_count=j,e.w_usdc_amount=D,e.w_usdc_count=G,e.w_usdt_amount=N,e.w_usdt_count=O,e.w_dai_amount=P,e.w_dai_count=U,e.w_wbtc_amount=A,e.w_wbtc_count=B,e.total_widthdraw_count=J,e.total_deposit_count=$,l([...t]),localStorage.setItem("stark_addresses",JSON.stringify(c))})}}}catch(t){W.error({message:"错误",description:t.message},2)}finally{x(!1),w([])}},dt=()=>{l(c.filter(t=>!i.includes(t.key))),localStorage.setItem("stark_addresses",JSON.stringify(c.filter(t=>!i.includes(t.key)))),w([])},ct=()=>{ft(c,"starkInfo")},[_t,tt]=q.useState(null),it=[{title:"#",key:"index",align:"center",render:(t,o,n)=>n+1},{title:"备注",dataIndex:"name",key:"name",align:"center",className:"name",render:(t,o)=>o.key===_t?r.jsx(Y,{placeholder:"请输入备注",defaultValue:t,onPressEnter:e=>{o.name=e.target.value,l([...c]),localStorage.setItem("stark_addresses",JSON.stringify(c)),tt(null)}}):r.jsxs(r.Fragment,{children:[r.jsx(pt,{color:"blue",children:t}),r.jsx(H,{shape:"circle",icon:r.jsx(yt,{}),size:"small",onClick:()=>tt(o.key)})]})},{title:"钱包地址",dataIndex:"address",key:"address",align:"center",className:"address",render:(t,o)=>t===null?r.jsx(g,{}):t.slice(0,4)+"..."+t.slice(-4)},{title:"创建时间",dataIndex:"create_time",key:"create_time",align:"center",className:"create_time",render:(t,o)=>{if(t===null)return r.jsx(g,{});{let n=new Date(t*1e3),e=n.getFullYear(),_=(n.getMonth()+1).toString().padStart(2,"0"),a=n.getDate().toString().padStart(2,"0");return`${e}/${_}/${a}`}}},{title:"StarkId",dataIndex:"stark_id",key:"stark_id",align:"center",render:(t,o)=>t===null?r.jsx(g,{}):t},{title:"StarkWare",className:"zksync2",children:[{title:"ETH",dataIndex:"stark_eth_balance",key:"stark_eth_balance",align:"center",render:(t,o)=>t===null?r.jsx(g,{}):t},{title:"Tx",dataIndex:"stark_tx_amount",key:"stark_tx_amount",align:"center",render:(t,o)=>t===null?r.jsx(g,{}):t},{title:"最后交易时间",dataIndex:"stark_latest_tx",key:"stark_latest_tx",align:"center",render:(t,o)=>t===null?r.jsx(g,{}):t},{title:"官方桥Tx数量",className:"stark_cross_tx",children:[{title:"L1->L2",children:[{title:"ETH",dataIndex:"d_eth_count",key:"12cross_eth_tx",align:"center",render:(t,o)=>t===null?r.jsx(g,{}):t},{title:"USDT",dataIndex:"d_usdt_count",key:"12cross_usdt_tx",align:"center",render:(t,o)=>t===null?r.jsx(g,{}):t},{title:"USDC",dataIndex:"d_usdc_count",key:"12cross_usdc_tx",align:"center",render:(t,o)=>t===null?r.jsx(g,{}):t},{title:"总计",dataIndex:"total_deposit_count",key:"12cross_total_tx",align:"center",render:(t,o)=>t===null?r.jsx(g,{}):t}]},{title:"L2->L1",className:"cross21",children:[{title:"ETH",dataIndex:"w_eth_count",key:"21cross_eth_tx",align:"center",render:(t,o)=>t===null?r.jsx(g,{}):t},{title:"USDT",dataIndex:"w_usdt_count",key:"21cross_usdt_tx",align:"center",render:(t,o)=>t===null?r.jsx(g,{}):t},{title:"USDC",dataIndex:"w_usdc_count",key:"21cross_usdc_tx",align:"center",render:(t,o)=>t===null?r.jsx(g,{}):t},{title:"总计",dataIndex:"total_widthdraw_count",key:"21cross_total_tx",align:"center",render:(t,o)=>t===null?r.jsx(g,{}):t}]}]},{title:"官方桥跨链额",className:"stark_cross_amount",children:[{title:"L1->L2",children:[{title:"ETH",dataIndex:"d_eth_amount",key:"12cross_eth_amount",align:"center",render:(t,o)=>t===null?r.jsx(g,{}):t},{title:"USDT",dataIndex:"d_usdt_amount",key:"12cross_usdt_amount",align:"center",render:(t,o)=>t===null?r.jsx(g,{}):t},{title:"USDC",dataIndex:"d_usdc_amount",key:"12cross_usdc_amount",align:"center",render:(t,o)=>t===null?r.jsx(g,{}):t}]},{title:"L2->L1",className:"cross21",children:[{title:"ETH",dataIndex:"w_eth_amount",key:"21cross_eth_amount",align:"center",render:(t,o)=>t===null?r.jsx(g,{}):t},{title:"USDT",dataIndex:"w_usdt_amount",key:"21cross_usdt_amount",align:"center",render:(t,o)=>t===null?r.jsx(g,{}):t},{title:"USDC",dataIndex:"w_usdc_amount",key:"21cross_usdc_amount",align:"center",render:(t,o)=>t===null?r.jsx(g,{}):t}]}]},{title:"操作",key:"action",align:"center",render:(t,o)=>r.jsx(Ct,{size:"small",children:r.jsx(wt,{title:"确认删除？",onConfirm:()=>rt(o.key),children:r.jsx(H,{icon:r.jsx(nt,{})})})})}]}];return r.jsx("div",{children:r.jsxs(Tt,{children:[r.jsx(et,{title:"批量添加地址",open:f,onOk:ot,onCancel:()=>{k(!1),s.resetFields()},okText:"添加地址",cancelText:"取消",children:r.jsx(R,{form:s,layout:"vertical",children:r.jsx(R.Item,{label:"地址",name:"addresses",rules:[{required:!0}],children:r.jsx(bt,{placeholder:"请输入地址，每行一个",style:{width:"500px",height:"200px"}})})})}),r.jsx(et,{title:"添加地址",open:C,onOk:st,onCancel:()=>u(!1),okText:"添加地址",cancelText:"取消",children:r.jsxs(R,{form:z,layout:"vertical",children:[r.jsx(R.Item,{label:"地址",name:"address",rules:[{required:!0}],children:r.jsx(Y,{placeholder:"请输入地址"})}),r.jsx(R.Item,{label:"备注",name:"name",children:r.jsx(Y,{placeholder:"请输入备注"})})]})}),r.jsx(g,{spinning:S,children:r.jsx(kt,{rowSelection:{type:"checkbox",...L},dataSource:c,pagination:!1,bordered:!0,style:{marginBottom:"20px"},size:"small",columns:it})}),r.jsx(ht,{children:r.jsxs("div",{style:{width:"100%",display:"flex",justifyContent:"space-between"},children:[r.jsx(H,{type:"primary",onClick:()=>{u(!0)},size:"large",style:{width:"20%"},icon:r.jsx(St,{}),children:"添加地址"}),r.jsx(H,{type:"primary",onClick:()=>{k(!0)},size:"large",style:{width:"20%"},icon:r.jsx(ut,{}),children:"批量添加地址"}),r.jsx(H,{type:"primary",onClick:lt,loading:d,size:"large",style:{width:"20%"},disabled:!i.length,icon:r.jsx(mt,{}),children:"刷新选中地址"}),r.jsx(H,{type:"primary",danger:!0,size:"large",onConfirm:dt,style:{width:"20%"},disabled:!i.length,icon:r.jsx(nt,{}),children:"删除选中地址"}),r.jsx(H,{type:"primary",icon:r.jsx(gt,{}),size:"large",style:{width:"8%"},onClick:ct})]})})]})})};export{Ot as default};
