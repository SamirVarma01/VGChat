"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Crown, Zap, ArrowLeft, ArrowUp, ArrowDown, Minus } from "lucide-react"
import Link from "next/link"

const topPokemon = [
  { name: "Incineroar", usage: 45.2, change: "up", tier: "S" },
  { name: "Flutter Mane", usage: 38.7, change: "up", tier: "S" },
  { name: "Landorus-Therian", usage: 35.1, change: "down", tier: "S" },
  { name: "Gholdengo", usage: 32.8, change: "same", tier: "A+" },
  { name: "Rillaboom", usage: 28.4, change: "up", tier: "A+" },
  { name: "Urshifu-Rapid-Strike", usage: 25.9, change: "down", tier: "A" },
  { name: "Calyrex-Shadow", usage: 23.1, change: "up", tier: "A" },
  { name: "Tornadus", usage: 21.7, change: "same", tier: "A" },
  { name: "Amoonguss", usage: 19.3, change: "down", tier: "A-" },
  { name: "Chien-Pao", usage: 17.8, change: "up", tier: "A-" },
]

const strategies = [
  { name: "Trick Room", usage: 28.5, description: "Slow, bulky Pokemon with room setters" },
  { name: "Sun Teams", usage: 22.1, description: "Chlorophyll sweepers with Torkoal" },
  { name: "Tailwind", usage: 19.7, description: "Speed control with flying types" },
  { name: "Rain", usage: 15.3, description: "Swift Swim and Thunder synergy" },
  { name: "Hyper Offense", usage: 12.8, description: "Fast, hard-hitting Pokemon" },
]

export default function MetaAnalysis() {
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
          <Link href="/builder" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Team Builder
          </Link>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">VGC Meta Analysis</h1>
            <p className="text-gray-600">Current usage statistics and trends from top-level tournament play</p>
            <Badge variant="secondary" className="mt-2">
              Updated: January 2024 • Regulation H
            </Badge>
          </div>

          <Tabs defaultValue="pokemon" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pokemon">Top Pokemon</TabsTrigger>
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="pokemon" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-yellow-500" />
                      Most Used Pokemon
                    </CardTitle>
                    <CardDescription>Usage rates from recent tournament data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {topPokemon.slice(0, 5).map((pokemon, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{pokemon.name}</div>
                            <Badge
                              variant={
                                pokemon.tier === "S" ? "default" : pokemon.tier === "A+" ? "secondary" : "outline"
                              }
                              className="text-xs"
                            >
                              {pokemon.tier}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{pokemon.usage}%</span>
                          {pokemon.change === "up" && <ArrowUp className="h-4 w-4 text-green-500" />}
                          {pokemon.change === "down" && <ArrowDown className="h-4 w-4 text-red-500" />}
                          {pokemon.change === "same" && <Minus className="h-4 w-4 text-gray-400" />}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Usage Distribution</CardTitle>
                    <CardDescription>How usage is spread across the meta</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>S Tier (40%+ usage)</span>
                        <span>3 Pokemon</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>A+ Tier (25-40%)</span>
                        <span>5 Pokemon</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>A Tier (15-25%)</span>
                        <span>8 Pokemon</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>A- Tier (10-15%)</span>
                        <span>12 Pokemon</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Complete Usage Rankings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {topPokemon.map((pokemon, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                          <span className="font-medium">{pokemon.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{pokemon.usage}%</span>
                          {pokemon.change === "up" && <ArrowUp className="h-3 w-3 text-green-500" />}
                          {pokemon.change === "down" && <ArrowDown className="h-3 w-3 text-red-500" />}
                          {pokemon.change === "same" && <Minus className="h-3 w-3 text-gray-400" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="strategies" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      Popular Strategies
                    </CardTitle>
                    <CardDescription>Most common team archetypes in the current meta</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {strategies.map((strategy, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{strategy.name}</span>
                          <span className="text-sm font-medium">{strategy.usage}%</span>
                        </div>
                        <Progress value={strategy.usage} className="h-2" />
                        <p className="text-sm text-gray-600">{strategy.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Strategy Matchups</CardTitle>
                    <CardDescription>How different archetypes perform against each other</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="font-medium text-green-800">Trick Room vs Sun</div>
                        <div className="text-sm text-green-700">Favorable matchup (65% win rate)</div>
                      </div>
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="font-medium text-red-800">Trick Room vs Tailwind</div>
                        <div className="text-sm text-red-700">Unfavorable matchup (35% win rate)</div>
                      </div>
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="font-medium text-yellow-800">Sun vs Rain</div>
                        <div className="text-sm text-yellow-700">Even matchup (50% win rate)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ArrowUp className="h-5 w-5 text-green-500" />
                      Rising Stars
                    </CardTitle>
                    <CardDescription>Pokemon gaining popularity this month</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: "Chien-Pao", change: "+5.2%" },
                      { name: "Calyrex-Shadow", change: "+3.8%" },
                      { name: "Rillaboom", change: "+2.9%" },
                      { name: "Flutter Mane", change: "+2.1%" },
                    ].map((pokemon, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <span className="font-medium">{pokemon.name}</span>
                        <Badge variant="secondary" className="text-green-700 bg-green-100">
                          {pokemon.change}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ArrowDown className="h-5 w-5 text-red-500" />
                      Declining Usage
                    </CardTitle>
                    <CardDescription>Pokemon losing popularity this month</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: "Landorus-Therian", change: "-3.1%" },
                      { name: "Urshifu-Rapid-Strike", change: "-2.7%" },
                      { name: "Amoonguss", change: "-1.9%" },
                      { name: "Grimmsnarl", change: "-1.4%" },
                    ].map((pokemon, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <span className="font-medium">{pokemon.name}</span>
                        <Badge variant="secondary" className="text-red-700 bg-red-100">
                          {pokemon.change}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Meta Insights</CardTitle>
                  <CardDescription>Key observations from recent tournament data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Speed Control Meta</h4>
                    <p className="text-sm text-blue-700">
                      Teams are heavily focused on speed control with Trick Room and Tailwind being the most popular
                      options. Priority moves are becoming increasingly valuable.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">Defensive Cores</h4>
                    <p className="text-sm text-purple-700">
                      Bulky Pokemon with recovery moves are seeing increased usage. Regenerator ability users like
                      Amoonguss and Tornadus provide excellent staying power.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-2">Item Diversity</h4>
                    <p className="text-sm text-orange-700">
                      Choice items are less common, with utility items like Mental Herb, Safety Goggles, and Covert
                      Cloak seeing increased usage for specific matchups.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
