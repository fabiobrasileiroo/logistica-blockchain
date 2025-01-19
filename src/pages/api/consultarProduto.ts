import { ethers } from "ethers";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { id } = req.query;

  try {
    // Inicializar o provedor
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL, {
      chainId: 31337,
      name: "hardhat",
    });

    // Inicializar a carteira
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

    // ABI e endereço do contrato
    const contratoABI = [
      "function visualizarProduto(uint _id) public view returns (string memory, uint, string memory, uint)",
    ];
    const contrato = new ethers.Contract(
      process.env.CONTRACT_ADDRESS as string,
      contratoABI,
      wallet
    );

    // Chamar a função do contrato
    const produto = await contrato.visualizarProduto(id);

    // Retornar os dados do produto
    res.status(200).json({
      nome: produto[0],
      quantidade: produto[1].toString(),
      localizacao: produto[2],
      timestamp: new Date(parseInt(produto[3].toString()) * 1000),
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Erro ao consultar o produto.", error: error.message });
  }
}
