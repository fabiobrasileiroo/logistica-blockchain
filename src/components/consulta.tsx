'use client'

import { useEffect, useState } from "react"
import { ethers } from "ethers"

export default function ConsultaProdutos() {
  const [produtos, setProdutos] = useState<any[]>([])

  useEffect(() => {
    let contrato: ethers.Contract | undefined; // Declare a variável contrato no escopo correto

    const fetchProdutos = async () => {
      const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)
      const contratoABI = [
        "event ProdutoRegistrado(uint id, string nome, uint quantidade, string localizacao, uint timestamp)"
      ]
      contrato = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
        contratoABI,
        provider
      )

      contrato.on("ProdutoRegistrado", (id, nome, quantidade, localizacao, timestamp) => {
        setProdutos((prev) => [
          ...prev,
          {
            id: id.toNumber(),
            nome,
            quantidade: quantidade.toNumber(),
            localizacao,
            timestamp: new Date(timestamp.toNumber() * 1000),
          },
        ])
      })
    }

    fetchProdutos()

    // Cleanup para remover os listeners quando o componente for desmontado
    return () => {
      if (contrato) {
        contrato.removeAllListeners("ProdutoRegistrado")
      }
    }
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Consulta de Produtos</h1>
      {produtos.length > 0 ? (
        <ul className="space-y-4">
          {produtos.map((produto) => (
            <li key={produto.id} className="p-4 border rounded shadow-sm">
              <p><strong>ID:</strong> {produto.id}</p>
              <p><strong>Nome:</strong> {produto.nome}</p>
              <p><strong>Quantidade:</strong> {produto.quantidade}</p>
              <p><strong>Localização:</strong> {produto.localizacao}</p>
              <p><strong>Timestamp:</strong> {produto.timestamp.toString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum produto encontrado.</p>
      )}
    </div>
  )
}
