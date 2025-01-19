import { ethers } from "ethers"

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método não permitido" })
  }

  try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
    const contratoABI = [
      "function contador() public view returns (uint)",
      "function visualizarProduto(uint _id) public view returns (string memory, uint, string memory, uint)"
    ]
    const contrato = new ethers.Contract(
      process.env.CONTRACT_ADDRESS!,
      contratoABI,
      provider
    )

    const totalProdutos = await contrato.contador()
    const produtos = []

    for (let i = 0; i < totalProdutos; i++) {
      const produto = await contrato.visualizarProduto(i)
      produtos.push({
        id: i,
        nome: produto[0],
        quantidade: produto[1].toString(),
        localizacao: produto[2],
        timestamp: new Date(parseInt(produto[3].toString()) * 1000),
      })
    }

    res.status(200).json(produtos)
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: "Erro ao listar os produtos.", error: error.message })
  }
}
