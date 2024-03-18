import axios from 'axios';

async function getEthBalance(walletAddress, network='ethereum') {
    try {
        const rpcPools = {
            ethereum: [
                "https://eth.llamarpc.com",
                "https://rpc.ankr.com/eth",
                "https://1rpc.io/eth",
                "https://eth.rpc.blxrbdn.com",
                "https://eth-mainnet.public.blastapi.io"
                // Add more RPC URLs as needed
            ],
            arbitrum: [
                "https://arbitrum.llamarpc.com",
                "https://rpc.ankr.com/arbitrum",
                "https://1rpc.io/arb",
                "https://arbitrum-one.public.blastapi.io"
            ]
        };

        const randomIndex = Math.floor(Math.random() * rpcPools[network].length);
        const rpcLink = rpcPools[network][randomIndex];

        const response = await axios.post(rpcLink, {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [walletAddress, "latest"],
            id: 1
        });

        let balance = response.data.result;
        return (parseInt(balance, 16) / 10 ** 18).toFixed(4);
    } catch (error) {
        console.error(error);
        return "Error";
    }
}

export default getEthBalance;