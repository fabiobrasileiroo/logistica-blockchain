import { ethers } from "ethers";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { nome, quantidade, localizacao } = req.body;

  try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL, {
      chainId: 31337,
      name: "hardhat",
    });
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

    const contratoABI = [
      "function cadastrarProduto(string memory _nome, uint _quantidade, string memory _localizacao) public",
    ];
    const contrato = new ethers.Contract(
      process.env.CONTRACT_ADDRESS as string,
      contratoABI,
      wallet
    );

    const tx = await contrato.cadastrarProduto(nome, quantidade, localizacao);
    const receipt = await tx.wait();

    res.status(200).json({
      message: "Produto cadastrado com sucesso!",
      transactionHash: tx.hash,
      blockNumber: receipt.blockNumber,
      contractAddress: process.env.CONTRACT_ADDRESS,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Erro ao cadastrar o produto.", error: error.message });
  }
}
