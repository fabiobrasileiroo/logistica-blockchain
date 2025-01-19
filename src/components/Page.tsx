'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle2, AlertCircle, Package, ListPlus, Building2, Syringe, Pill, Stethoscope } from 'lucide-react'
import Image from "next/image"

export default function ProductRegistration() {
  const [nome, setNome] = useState("")
  const [quantidade, setQuantidade] = useState("")
  const [localizacao, setLocalizacao] = useState("")
  const [resultado, setResultado] = useState<any>(null)
  const [error, setError] = useState("")
  const [produtosCriados, setProdutosCriados] = useState<any[]>([])

  const cadastrarProduto = async () => {
    try {
      const response = await fetch("/api/cadastrarProduto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, quantidade, localizacao }),
      })

      const data = await response.json()

      if (response.ok) {
        setResultado(data)
        setError("")
        setProdutosCriados((prev) => [
          ...prev,
          {
            nome,
            quantidade,
            localizacao,
            transactionHash: data.transactionHash,
            blockNumber: data.blockNumber,
          },
        ])
        setNome("")
        setQuantidade("")
        setLocalizacao("")
      } else {
        setResultado(null)
        setError(data.message)
      }
    } catch (e: any) {
      setResultado(null)
      setError("Erro ao cadastrar o produto.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-amber-100">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="bg-gradient-to-br from-amber-400 to-amber-500 p-3 rounded-2xl shadow-lg">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Life%20is%20Reel,%20Fish%20It!-7vRMGyCbrUFOYJX8syIYMJQhH7mu0E.png"
              alt="Healthcare Supply Chain Logo"
              width={60}
              height={60}
              className="rounded-xl"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
              Healthcare Supply Chain
            </h1>
            <p className="text-amber-200 text-sm">Gestão Inteligente de Suprimentos Médicos</p>
          </div>
        </div>

        <Tabs defaultValue="register" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 p-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl">
            <TabsTrigger value="register" className="flex items-center gap-2 rounded-lg text-amber-200 data-[state=active]:bg-gradient-to-br data-[state=active]:from-amber-400 data-[state=active]:to-amber-500 data-[state=active]:text-gray-900 transition-all duration-200">
              <Syringe className="w-4 h-4" />
              Cadastrar Produto
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2 rounded-lg text-amber-200 data-[state=active]:bg-gradient-to-br data-[state=active]:from-amber-400 data-[state=active]:to-amber-500 data-[state=active]:text-gray-900 transition-all duration-200">
              <Stethoscope className="w-4 h-4" />
              Inventário
            </TabsTrigger>
          </TabsList>

          <TabsContent value="register">
            <Card className="border-none shadow-lg bg-gradient-to-br from-gray-800 to-gray-900">
              <CardHeader className="border-b border-amber-900/20 bg-gradient-to-r from-gray-800 to-gray-900">
                <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                  Registro de Produto Médico
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    cadastrarProduto()
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-amber-200">Nome do Produto Médico</Label>
                    <Input
                      id="nome"
                      type="text"
                      placeholder="Ex: Seringa Descartável 10ml"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="bg-gray-800/50 border-amber-700/30 focus:border-amber-400/50 focus:ring-amber-400/50 text-amber-100 placeholder-amber-300/30"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantidade" className="text-amber-200">Quantidade em Estoque</Label>
                    <Input
                      id="quantidade"
                      type="number"
                      placeholder="Ex: 100"
                      value={quantidade}
                      onChange={(e) => setQuantidade(e.target.value)}
                      className="bg-gray-800/50 border-amber-700/30 focus:border-amber-400/50 focus:ring-amber-400/50 text-amber-100 placeholder-amber-300/30"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="localizacao" className="text-amber-200">Localização no Almoxarifado</Label>
                    <Input
                      id="localizacao"
                      type="text"
                      placeholder="Ex: Setor A, Prateleira 3"
                      value={localizacao}
                      onChange={(e) => setLocalizacao(e.target.value)}
                      className="bg-gray-800/50 border-amber-700/30 focus:border-amber-400/50 focus:ring-amber-400/50 text-amber-100 placeholder-amber-300/30"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 shadow-md transition-all duration-200"
                  >
                    <Pill className="w-4 h-4 mr-2" />
                    Cadastrar Produto
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col">
                {error && (
                  <Alert variant="destructive" className="mt-4 bg-red-900/50 border border-red-700/50 text-red-100">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Erro no Registro</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {resultado && (
                  <Alert className="mt-4 bg-green-900/50 border border-green-700/50 text-green-100">
                    <CheckCircle2 className="h-4 w-4 text-green-100" />
                    <AlertTitle className="text-green-100">Produto Registrado com Sucesso</AlertTitle>
                    <AlertDescription>
                      <div className="mt-2 space-y-2 text-green-100">
                        <p><strong>Mensagem:</strong> {resultado.message}</p>
                        <p><strong>Hash da Transação:</strong> {resultado.transactionHash}</p>
                        <p><strong>Número do Bloco:</strong> {resultado.blockNumber}</p>
                        <p><strong>Endereço do Contrato:</strong> {resultado.contractAddress}</p>
                        <p>
                          <strong>Ver no Explorador:</strong>{" "}
                          <a
                            href={`https://etherscan.io/tx/${resultado.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-300 hover:underline"
                          >
                            Clique aqui
                          </a>
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <Card className="border-none shadow-lg bg-gradient-to-br from-gray-800 to-gray-900">
              <CardHeader className="border-b border-amber-900/20 bg-gradient-to-r from-gray-800 to-gray-900">
                <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                  Inventário de Produtos Médicos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  {produtosCriados.length > 0 ? (
                    <div className="grid gap-4">
                      {produtosCriados.map((produto, index) => (
                        <Card key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 border-amber-700/20 hover:shadow-md transition-all duration-200">
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <h3 className="font-semibold text-lg text-amber-300">{produto.nome}</h3>
                                <div className="grid gap-1">
                                  <div className="flex items-center gap-2">
                                    <Package className="w-4 h-4 text-amber-200" />
                                    <span className="text-amber-100"><strong>Quantidade:</strong> {produto.quantidade}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-amber-200" />
                                    <span className="text-amber-100"><strong>Localização:</strong> {produto.localizacao}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm text-amber-200 bg-gray-800/50 px-3 py-2 rounded-lg">
                                <p>Bloco: {produto.blockNumber}</p>
                                <p className="truncate w-32" title={produto.transactionHash}>
                                  Hash: {produto.transactionHash.slice(0, 10)}...
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-amber-200">
                      <Stethoscope className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhum produto médico registrado ainda.</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

