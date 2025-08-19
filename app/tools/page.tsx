import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calculator, Zap, BarChart3, Trophy, Target, Shield, ArrowLeft, Clock, Sword, Users } from "lucide-react"
import Link from "next/link"

const tools = [
  {
    name: "Damage Calculator",
    description: "Calculate exact damage ranges for any matchup",
    icon: Calculator,
    color: "blue",
    status: "Available",
    features: ["All generation mechanics", "Item calculations", "Weather effects", "Critical hits"],
  },
  {
    name: "Speed Calculator",
    description: "Compare speed tiers and find optimal EV spreads",
    icon: Zap,
    color: "yellow",
    status: "Available",
    features: ["Speed tier comparison", "EV optimization", "Nature effects", "Item modifiers"],
  },
  {
    name: "Usage Statistics",
    description: "Detailed meta analysis and Pokemon usage data",
    icon: BarChart3,
    color: "green",
    status: "Available",
    features: ["Real-time updates", "Format filtering", "Trend analysis", "Export data"],
  },
  {
    name: "Tournament Tracker",
    description: "Track tournament results and player statistics",
    icon: Trophy,
    color: "purple",
    status: "Coming Soon",
    features: ["Live results", "Player rankings", "Team analysis", "Historical data"],
  },
  {
    name: "Matchup Predictor",
    description: "Predict team matchups using AI analysis",
    icon: Target,
    color: "red",
    status: "Beta",
    features: ["AI predictions", "Win rate estimates", "Strategy suggestions", "Threat analysis"],
  },
  {
    name: "Team Validator",
    description: "Check team legality and format compliance",
    icon: Shield,
    color: "indigo",
    status: "Available",
    features: ["Format validation", "Rule checking", "Import verification", "Error detection"],
  },
  {
    name: "Practice Timer",
    description: "Tournament-style timer for practice matches",
    icon: Clock,
    color: "orange",
    status: "Available",
    features: ["Official timing", "Turn tracking", "Audio alerts", "Match logging"],
  },
  {
    name: "Move Tutor",
    description: "Learn optimal move combinations and strategies",
    icon: Sword,
    color: "pink",
    status: "Coming Soon",
    features: ["Move suggestions", "Combo analysis", "Timing guides", "Video tutorials"],
  },
  {
    name: "Team Sharing",
    description: "Share and discover teams from the community",
    icon: Users,
    color: "teal",
    status: "Beta",
    features: ["Team gallery", "Rating system", "Comments", "Export options"],
  },
]

export default function ToolsPage() {
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
            VGChat
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/analyzer" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Team Analyzer
          </Link>
          <Link href="/meta" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Meta Analysis
          </Link>
          <Link href="/builder" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Team Builder
          </Link>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">VGC Tools</h1>
            <p className="text-gray-600">Professional tools for competitive Pokemon players</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, index) => {
              const IconComponent = tool.icon
              const colorClasses = {
                blue: "from-blue-500 to-blue-600",
                yellow: "from-yellow-500 to-yellow-600",
                green: "from-green-500 to-green-600",
                purple: "from-purple-500 to-purple-600",
                red: "from-red-500 to-red-600",
                indigo: "from-indigo-500 to-indigo-600",
                orange: "from-orange-500 to-orange-600",
                pink: "from-pink-500 to-pink-600",
                teal: "from-teal-500 to-teal-600",
              }

              return (
                <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${colorClasses[tool.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <Badge
                        variant={
                          tool.status === "Available" ? "default" : tool.status === "Beta" ? "secondary" : "outline"
                        }
                      >
                        {tool.status}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4">{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-gray-600 mb-4">
                      {tool.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      disabled={tool.status === "Coming Soon"}
                      variant={tool.status === "Available" ? "default" : "outline"}
                    >
                      {tool.status === "Available"
                        ? "Launch Tool"
                        : tool.status === "Beta"
                          ? "Try Beta"
                          : "Coming Soon"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Request a Tool</CardTitle>
                <CardDescription>
                  Have an idea for a tool that would help the VGC community? Let us know!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button>Submit Tool Request</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
