"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, LinkIcon, Zap, Shield, Target, AlertTriangle, CheckCircle, TrendingUp, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TeamAnalyzer() {
  const [teamData, setTeamData] = useState("")
  const [pasteUrl, setPasteUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    // Simulate API call
    setTimeout(() => {
      setAnalysisResult({
        teamSynergy: 85,
        threats: [
          { name: "Landorus-Therian", severity: "high", reason: "Outspeeds and OHKOs 3 team members" },
          { name: "Incineroar", severity: "medium", reason: "Intimidate weakens physical attackers" },
          { name: "Flutter Mane", severity: "high", reason: "Resists most of your attacks" },
          { name: "Gholdengo", severity: "medium", reason: "Immune to status moves" },
        ],
        strengths: [
          "Strong late-game potential with Trick Room",
          "Good type coverage against common threats",
          "Solid defensive core with regenerator",
        ],
        weaknesses: [
          "Vulnerable to Electric-type moves",
          "Lacks priority moves",
          "Weak to common Fighting-type attacks",
        ],
        recommendations: [
          "Consider adding Thunder Wave for speed control",
          "Replace one Pokemon with an Electric resist",
          "Add a priority move user for late-game cleanup",
        ],
      })
      setIsAnalyzing(false)
    }, 2000)
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
          <Link href="/meta" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Meta Analysis
          </Link>
          <Link href="/builder" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Team Builder
          </Link>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Team Analyzer</h1>
            <p className="text-gray-600">Import your team and get AI-powered strategic analysis</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Import Your Team
                </CardTitle>
                <CardDescription>Paste your team from Pokemon Showdown or provide a Pokepaste link</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="paste" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="paste">Team Data</TabsTrigger>
                    <TabsTrigger value="url">Pokepaste URL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="paste" className="space-y-4">
                    <Textarea
                      placeholder="Paste your team export from Pokemon Showdown here..."
                      value={teamData}
                      onChange={(e) => setTeamData(e.target.value)}
                      className="min-h-[200px]"
                    />
                  </TabsContent>
                  <TabsContent value="url" className="space-y-4">
                    <Input
                      placeholder="https://pokepaste.es/..."
                      value={pasteUrl}
                      onChange={(e) => setPasteUrl(e.target.value)}
                    />
                    <Alert>
                      <LinkIcon className="h-4 w-4" />
                      <AlertDescription>
                        We'll automatically fetch your team data from the Pokepaste link
                      </AlertDescription>
                    </Alert>
                  </TabsContent>
                </Tabs>
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || (!teamData && !pasteUrl)}
                  className="w-full mt-4"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing Team...
                    </>
                  ) : (
                    <>
                      <Target className="h-4 w-4 mr-2" />
                      Analyze Team
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Analysis Results
                </CardTitle>
                <CardDescription>
                  {analysisResult ? "Your team analysis is complete" : "Results will appear here after analysis"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analysisResult ? (
                  <div className="space-y-6">
                    {/* Team Synergy Score */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Team Synergy Score</span>
                        <Badge variant={analysisResult.teamSynergy >= 80 ? "default" : "secondary"}>
                          {analysisResult.teamSynergy}%
                        </Badge>
                      </div>
                      <Progress value={analysisResult.teamSynergy} className="h-2" />
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{analysisResult.threats.length}</div>
                        <div className="text-xs text-red-600">Major Threats</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{analysisResult.strengths.length}</div>
                        <div className="text-xs text-green-600">Key Strengths</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{analysisResult.recommendations.length}</div>
                        <div className="text-xs text-blue-600">Suggestions</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Import your team to see detailed analysis</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          {analysisResult && (
            <div className="mt-8 space-y-6">
              <Tabs defaultValue="threats" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="threats">Threats</TabsTrigger>
                  <TabsTrigger value="strengths">Strengths</TabsTrigger>
                  <TabsTrigger value="weaknesses">Weaknesses</TabsTrigger>
                  <TabsTrigger value="recommendations">Tips</TabsTrigger>
                </TabsList>

                <TabsContent value="threats" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        Major Threats to Your Team
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {analysisResult.threats.map((threat: any, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                          <Badge variant={threat.severity === "high" ? "destructive" : "secondary"}>
                            {threat.severity}
                          </Badge>
                          <div>
                            <div className="font-medium">{threat.name}</div>
                            <div className="text-sm text-gray-600">{threat.reason}</div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="strengths" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        Team Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {analysisResult.strengths.map((strength: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                        >
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div className="text-sm">{strength}</div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="weaknesses" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        Areas for Improvement
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {analysisResult.weaknesses.map((weakness: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg"
                        >
                          <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                          <div className="text-sm">{weakness}</div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                        Strategic Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {analysisResult.recommendations.map((rec: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg"
                        >
                          <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                          <div className="text-sm">{rec}</div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
