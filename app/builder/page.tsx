"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, X, Zap, ArrowLeft, Download, Share, Shuffle, Target } from "lucide-react"
import Link from "next/link"

const pokemonSuggestions = [
  "Incineroar",
  "Flutter Mane",
  "Landorus-Therian",
  "Gholdengo",
  "Rillaboom",
  "Urshifu-Rapid-Strike",
  "Calyrex-Shadow",
  "Tornadus",
  "Amoonguss",
  "Chien-Pao",
]

const teamSlots = Array(6).fill(null)

export default function TeamBuilder() {
  const [team, setTeam] = useState<any[]>(teamSlots)
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const addPokemon = (pokemon: string, slot: number) => {
    const newTeam = [...team]
    newTeam[slot] = {
      name: pokemon,
      ability: "",
      item: "",
      moves: ["", "", "", ""],
      nature: "",
      evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    }
    setTeam(newTeam)
    setSelectedSlot(null)
  }

  const removePokemon = (slot: number) => {
    const newTeam = [...team]
    newTeam[slot] = null
    setTeam(newTeam)
  }

  const exportTeam = () => {
    // Generate Showdown export format
    console.log("Exporting team...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center justify-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            VGC Coach
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/analyzer" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Team Analyzer
          </Link>
          <Link href="/meta" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Meta Analysis
          </Link>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Team Builder</h1>
              <p className="text-gray-600">Build and optimize your VGC team with AI-powered suggestions</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={exportTeam}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Link href="/analyzer">
                <Button>
                  <Target className="h-4 w-4 mr-2" />
                  Analyze Team
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Team Overview */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Team</CardTitle>
                  <CardDescription>
                    Click on empty slots to add Pokemon, or click existing Pokemon to edit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {team.map((pokemon, index) => (
                      <div
                        key={index}
                        className={`aspect-square border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                          pokemon
                            ? "border-blue-300 bg-blue-50 hover:bg-blue-100"
                            : "border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                        onClick={() => setSelectedSlot(pokemon ? null : index)}
                      >
                        {pokemon ? (
                          <div className="text-center p-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">{pokemon.name.charAt(0)}</span>
                            </div>
                            <div className="font-medium text-sm">{pokemon.name}</div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="mt-2 h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation()
                                removePokemon(index)
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <div className="text-sm text-gray-500">Add Pokemon</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Team Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="coverage" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="coverage">Type Coverage</TabsTrigger>
                      <TabsTrigger value="stats">Base Stats</TabsTrigger>
                      <TabsTrigger value="synergy">Synergy</TabsTrigger>
                    </TabsList>
                    <TabsContent value="coverage" className="space-y-4">
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        {[
                          "Normal",
                          "Fire",
                          "Water",
                          "Electric",
                          "Grass",
                          "Ice",
                          "Fighting",
                          "Poison",
                          "Ground",
                          "Flying",
                          "Psychic",
                          "Bug",
                          "Rock",
                          "Ghost",
                          "Dragon",
                          "Dark",
                          "Steel",
                          "Fairy",
                        ].map((type) => (
                          <Badge key={type} variant="outline" className="justify-center">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="stats" className="space-y-4">
                      <div className="text-center text-gray-500">Add Pokemon to see team stats</div>
                    </TabsContent>
                    <TabsContent value="synergy" className="space-y-4">
                      <div className="text-center text-gray-500">Build your team to see synergy analysis</div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Pokemon Selection */}
            <div className="space-y-6">
              {selectedSlot !== null && (
                <Card>
                  <CardHeader>
                    <CardTitle>Add Pokemon</CardTitle>
                    <CardDescription>Choose a Pokemon for slot {selectedSlot + 1}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Search Pokemon..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {pokemonSuggestions
                        .filter((pokemon) => pokemon.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((pokemon) => (
                          <Button
                            key={pokemon}
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => addPokemon(pokemon, selectedSlot)}
                          >
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mr-3 flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{pokemon.charAt(0)}</span>
                            </div>
                            {pokemon}
                          </Button>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>AI Suggestions</CardTitle>
                  <CardDescription>Recommended Pokemon based on your current team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Tornadus", reason: "Speed control support" },
                    { name: "Amoonguss", reason: "Defensive utility" },
                    { name: "Grimmsnarl", reason: "Screen support" },
                  ].map((suggestion, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{suggestion.name}</div>
                          <div className="text-sm text-gray-600">{suggestion.reason}</div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Shuffle className="h-4 w-4 mr-2" />
                    Random Team
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Target className="h-4 w-4 mr-2" />
                    Meta Sample
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
