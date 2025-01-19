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
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="bg-white p-3 rounded-2xl shadow-lg">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Life%20is%20Reel,%20Fish%20It!-7vRMGyCbrUFOYJX8syIYMJQhH7mu0E.png"
              alt="Healthcare Supply Chain Logo"
              width={60}
              height={60}
              className="rounded-xl"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Healthcare Supply Chain
            </h1>
            <p className="text-teal-600 text-sm">Gestão Inteligente de Suprimentos Médicos</p>
          </div>
        </div>

        <Tabs defaultValue="register" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 p-1 bg-teal-50 rounded-xl">
            <TabsTrigger value="register" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white">
              <Syringe className="w-4 h-4" />
              Cadastrar Produto
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white">
              <Stethoscope className="w-4 h-4" />
              Inventário
            </TabsTrigger>
          </TabsList>

          <TabsContent value="register">
            <Card className="border-teal-100 shadow-lg">
              <CardHeader className="border-b border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50">
                <CardTitle className="text-2xl font-bold text-center text-teal-800">
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
                    <Label htmlFor="nome" className="text-teal-700">Nome do Produto Médico</Label>
                    <Input
                      id="nome"
                      type="text"
                      placeholder="Ex: Seringa Descartável 10ml"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="border-teal-200 focus:border-teal-400 focus:ring-teal-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantidade" className="text-teal-700">Quantidade em Estoque</Label>
                    <Input
                      id="quantidade"
                      type="number"
                      placeholder="Ex: 100"
                      value={quantidade}
                      onChange={(e) => setQuantidade(e.target.value)}
                      className="border-teal-200 focus:border-teal-400 focus:ring-teal-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="localizacao" className="text-teal-700">Localização no Almoxarifado</Label>
                    <Input
                      id="localizacao"
                      type="text"
                      placeholder="Ex: Setor A, Prateleira 3"
                      value={localizacao}
                      onChange={(e) => setLocalizacao(e.target.value)}
                      className="border-teal-200 focus:border-teal-400 focus:ring-teal-400"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-md"
                  >
                    <Pill className="w-4 h-4 mr-2" />
                    Cadastrar Produto
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col">
                {error && (
                  <Alert variant="destructive" className="mt-4 bg-red-50 border-red-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Erro no Registro</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {resultado && (
                  <Alert className="mt-4 bg-teal-50 border-teal-200">
                    <CheckCircle2 className="h-4 w-4 text-teal-600" />
                    <AlertTitle className="text-teal-800">Produto Registrado com Sucesso</AlertTitle>
                    <AlertDescription>
                      <div className="mt-2 space-y-2 text-teal-700">
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
                            className="text-teal-600 hover:underline"
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
            <Card className="border-teal-100 shadow-lg">
              <CardHeader className="border-b border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50">
                <CardTitle className="text-2xl font-bold text-center text-teal-800">
                  Inventário de Produtos Médicos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  {produtosCriados.length > 0 ? (
                    <div className="grid gap-4">
                      {produtosCriados.map((produto, index) => (
                        <Card key={index} className="bg-white border-teal-100 hover:shadow-md transition-shadow">
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <h3 className="font-semibold text-lg text-teal-800">{produto.nome}</h3>
                                <div className="grid gap-1">
                                  <div className="flex items-center gap-2">
                                    <Package className="w-4 h-4 text-teal-600" />
                                    <span className="text-teal-700"><strong>Quantidade:</strong> {produto.quantidade}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-teal-600" />
                                    <span className="text-teal-700"><strong>Localização:</strong> {produto.localizacao}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm text-teal-600 bg-teal-50 px-3 py-2 rounded-lg">
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
                    <div className="text-center py-12 text-teal-600">
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

