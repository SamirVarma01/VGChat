export interface AnalysisPoint {
  point: string;
  reasoning: string;
}

export interface LLMAnalysisResult {
  grade: string;
  strengths: AnalysisPoint[];
  weaknesses: AnalysisPoint[];
  threats: AnalysisPoint[];
  suggestions: Array<{
    type: string;
    description: string;
    priority: string;
  }>;
  error?: string;
}

export interface AnalyzeTeamRequest {
  team: string;
}

/**
 * Analyzes a Pokemon team using the LLM service
 */
export async function analyzeTeam(teamData: string): Promise<LLMAnalysisResult> {
  try {
    const response = await fetch('/api/analyze-team', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ team: teamData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error analyzing team:', error);
    return {
      grade: 'F',
      strengths: [],
      weaknesses: [{ point: 'Failed to analyze team due to technical error', reasoning: 'Please try again later' }],
      threats: [{ point: 'Unknown', reasoning: 'Analysis failed' }],
      suggestions: [{
        type: 'general',
        description: 'Please try again later or check your team format',
        priority: 'high'
      }],
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Fetches team data from a Pokepaste URL
 */
export async function fetchTeamFromUrl(url: string): Promise<string> {
  try {
    // For now, we'll just return the URL as the team data
    // In a real implementation, you'd scrape the Pokepaste site
    // or use their API if available
    return `Pokepaste URL: ${url}\n\nNote: Pokepaste URL parsing is not yet implemented. Please paste your team directly.`;
  } catch (error) {
    console.error('Error fetching team from URL:', error);
    throw new Error('Failed to fetch team from URL');
  }
}
