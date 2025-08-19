/**
 * Fetches and parses Pokemon team data from a Pokepaste URL
 */
export async function fetchTeamFromPokepaste(url: string): Promise<string> {
  try {
    // Validate URL format
    if (!isValidPokepasteUrl(url)) {
      throw new Error('Invalid Pokepaste URL format');
    }

    // Fetch the Pokepaste page
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokepaste: ${response.status}`);
    }

    const html = await response.text();
    
    // Parse the team data from the HTML
    const teamData = parsePokepasteHTML(html);
    
    if (!teamData) {
      throw new Error('Could not find team data in Pokepaste');
    }

    return teamData;
  } catch (error) {
    console.error('Error fetching from Pokepaste:', error);
    throw error;
  }
}

/**
 * Validates if the URL is a valid Pokepaste URL
 */
function isValidPokepasteUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'pokepast.es' || 
           urlObj.hostname === 'www.pokepast.es' ||
           urlObj.hostname === 'pokepaste.es' || 
           urlObj.hostname === 'www.pokepaste.es' ||
           urlObj.hostname === 'pokepaste.net' ||
           urlObj.hostname === 'www.pokepaste.net';
  } catch {
    return false;
  }
}

/**
 * Parses the HTML content to extract Pokemon team data
 */
function parsePokepasteHTML(html: string): string | null {
  try {
    // Create a DOM parser (this will work in the browser)
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Look for the team data in various possible locations
    let teamData = extractFromPreTag(doc) || 
                   extractFromCodeBlock(doc) || 
                   extractFromTextArea(doc);
    
    if (teamData) {
      // Clean up the data
      teamData = cleanTeamData(teamData);
      return teamData;
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing Pokepaste HTML:', error);
    return null;
  }
}

/**
 * Extracts team data from <pre> tags (common in Pokepaste)
 */
function extractFromPreTag(doc: Document): string | null {
  const preTags = doc.querySelectorAll('pre');
  for (const pre of preTags) {
    const text = pre.textContent?.trim();
    if (text && looksLikePokemonTeam(text)) {
      return text;
    }
  }
  return null;
}

/**
 * Extracts team data from code blocks
 */
function extractFromCodeBlock(doc: Document): string | null {
  const codeBlocks = doc.querySelectorAll('code');
  for (const code of codeBlocks) {
    const text = code.textContent?.trim();
    if (text && looksLikePokemonTeam(text)) {
      return text;
    }
  }
  return null;
}

/**
 * Extracts team data from textarea elements
 */
function extractFromTextArea(doc: Document): string | null {
  const textareas = doc.querySelectorAll('textarea');
  for (const textarea of textareas) {
    const text = textarea.textContent?.trim() || textarea.value?.trim();
    if (text && looksLikePokemonTeam(text)) {
      return text;
    }
  }
  return null;
}

/**
 * Checks if the text looks like a Pokemon team
 */
function looksLikePokemonTeam(text: string): boolean {
  const lines = text.split('\n');
  let pokemonCount = 0;
  let hasMoves = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // Check for Pokemon name line (not starting with common prefixes)
    if (!trimmed.startsWith(' ') && !trimmed.startsWith('-') && 
        !trimmed.startsWith('EVs:') && !trimmed.startsWith('IVs:') && 
        !trimmed.startsWith('Ability:') && !trimmed.startsWith('Nature') && 
        !trimmed.startsWith('Level:') && !trimmed.startsWith('Tera Type:')) {
      pokemonCount++;
    }
    
    // Check for moves
    if (trimmed.startsWith('-')) {
      hasMoves = true;
    }
  }
  
  // A valid team should have at least 1 Pokemon and some moves
  return pokemonCount >= 1 && hasMoves;
}

/**
 * Cleans up the team data
 */
function cleanTeamData(data: string): string {
  return data
    .trim()
    .replace(/\r\n/g, '\n')  // Normalize line endings
    .replace(/\r/g, '\n')    // Handle old Mac line endings
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)  // Remove empty lines
    .join('\n');
}

/**
 * Fallback function for server-side rendering
 */
export function createPokepasteFallback(url: string): string {
  return `Pokepaste URL: ${url}

Note: Pokepaste parsing requires client-side JavaScript.
Please paste your team directly or ensure JavaScript is enabled.`;
}
