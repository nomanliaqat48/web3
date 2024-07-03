export const networks = {
    polygon: {
      chainId: '0x13882',
      chainName: 'Polygon Amoy Testnet',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://rpc-amoy.polygon.technology/'],
      blockExplorerUrls: ['https://www.oklink.com/amoy/'],
    },
    sepolia: {
      chainId: '0xaa36a7',
      chainName: 'Ethereum Sepolia Testnet',
      nativeCurrency: {
        name: 'SepoliaETH',
        symbol: 'SepoliaETH',
        decimals: 18,
      },
      rpcUrls: ['https://eth-sepolia.public.blastapi.io'],
      blockExplorerUrls: ['https://sepolia.etherscan.io'],
    },
  };