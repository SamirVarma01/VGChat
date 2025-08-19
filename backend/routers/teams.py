from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
from bs4 import BeautifulSoup
import re

router = APIRouter()

class PokepasteRequest(BaseModel):
    url: str

class PokepasteResponse(BaseModel):
    team_data: str
    success: bool
    message: str

@router.post("/fetch-pokepaste", response_model=PokepasteResponse)
async def fetch_pokepaste(request: PokepasteRequest):
    """Fetch team data from a Pokepaste URL"""
    try:
        # Validate URL format
        if not is_valid_pokepaste_url(request.url):
            raise HTTPException(status_code=400, detail="Invalid Pokepaste URL format")
        
        # Fetch the Pokepaste page
        async with httpx.AsyncClient() as client:
            response = await client.get(request.url)
            response.raise_for_status()
            
        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract team data from various possible locations
        team_data = extract_team_data(soup)
        
        if not team_data:
            raise HTTPException(status_code=404, detail="Could not find team data in Pokepaste")
        
        return PokepasteResponse(
            team_data=team_data,
            success=True,
            message="Team data fetched successfully"
        )
        
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=f"Failed to fetch Pokepaste: {e.response.status_code}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching team data: {str(e)}")

def is_valid_pokepaste_url(url: str) -> bool:
    """Validate if the URL is a valid Pokepaste URL"""
    try:
        import re
        pokepaste_pattern = r'https?://(www\.)?(pokepast\.es|pokepaste\.es|pokepaste\.net)/[a-zA-Z0-9]+'
        return bool(re.match(pokepaste_pattern, url))
    except:
        return False

def extract_team_data(soup) -> str:
    """Extract Pokemon team data from BeautifulSoup object"""
    # Look for team data in various possible locations
    team_data = None
    
    # Try <pre> tags first (most common) - collect ALL pre tags
    pre_tags = soup.find_all('pre')
    if pre_tags:
        # Collect all pre tags that contain Pokemon data
        pokemon_sections = []
        for pre in pre_tags:
            text = pre.get_text().strip()
            if looks_like_pokemon_team(text):
                pokemon_sections.append(text)
        
        if pokemon_sections:
            # Join all Pokemon sections with double newlines for separation
            team_data = '\n\n'.join(pokemon_sections)
    
    # Try <code> blocks if no <pre> found
    if not team_data:
        code_blocks = soup.find_all('code')
        for code in code_blocks:
            text = code.get_text().strip()
            if looks_like_pokemon_team(text):
                team_data = text
                break
    
    # Try textarea elements
    if not team_data:
        textareas = soup.find_all('textarea')
        for textarea in textareas:
            text = textarea.get_text().strip() or textarea.get('value', '').strip()
            if looks_like_pokemon_team(text):
                team_data = text
                break
    
    if team_data:
        return clean_team_data(team_data)
    
    return None

def looks_like_pokemon_team(text: str) -> bool:
    """Check if the text looks like a Pokemon team"""
    if not text:
        return False
        
    lines = text.split('\n')
    pokemon_count = 0
    has_moves = False
    
    for line in lines:
        trimmed = line.strip()
        if not trimmed:
            continue
        
        # Check for Pokemon name line (not starting with common prefixes)
        if (not trimmed.startswith(' ') and 
            not trimmed.startswith('-') and 
            not trimmed.startswith('EVs:') and 
            not trimmed.startswith('IVs:') and 
            not trimmed.startswith('Ability:') and 
            not trimmed.startswith('Nature') and 
            not trimmed.startswith('Level:') and 
            not trimmed.startswith('Tera Type:')):
            pokemon_count += 1
        
        # Check for moves
        if trimmed.startswith('-'):
            has_moves = True
    
    # A valid team should have at least 1 Pokemon and some moves
    return pokemon_count >= 1 and has_moves

def clean_team_data(data: str) -> str:
    """Clean up the team data"""
    return data.strip().replace('\r\n', '\n').replace('\r', '\n') 