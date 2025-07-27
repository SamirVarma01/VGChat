import requests
from bs4 import BeautifulSoup
import json
from typing import Dict, List, Optional
import time

def get_data(tag, num_spaces=1):
    """
    Creates 2D list by restructuring the data to remove excess newlines and set up the preliminary data
    """
    data_list = tag.text.replace('\n', ' ').strip().split(' ' * num_spaces)
    for i in range(len(data_list)):
        data_list[i] = data_list[i].strip().split(' ')
        temp = []
        for j in range(len(data_list[i])):
            if data_list[i][j] != '':
                temp.append(data_list[i][j])
        data_list[i] = temp
    return data_list

def format_data(element_tag, desired_length=2, num_spaces=1, start_index=0, end_index=0):
    """
    Sets up a 2D lists of strings taken from an html tag
    """
    prelim_data = get_data(element_tag, num_spaces)
    for i in range(len(prelim_data)):
        if (desired_length == 3 and (len(prelim_data[i]) > 3)) or (desired_length == 2 and (len(prelim_data[i]) > 2)):
            temp_str = prelim_data[i][start_index] + ' ' + prelim_data[i][end_index]
            del (prelim_data[i][:2])
            prelim_data[i].insert(0, temp_str)
        elif (desired_length == 3) and ((len(prelim_data[i])) < 3):
            prelim_data[i].insert(1, ' ')
    return prelim_data

def scrape_pikalytics_meta(format_name: str = "sv") -> dict:
    """Scrape meta data from Pikalytics for the specified format."""
    try:
        # Use the main Pikalytics page which shows current VGC format
        url = "https://www.pikalytics.com/"
        
        # Add headers to mimic a browser request
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract Pokemon data from the main page
        pokemon_data = []
        
        # Look for Pokemon entries in the main content area
        # Based on the page structure, we need to find the Pokemon list
        pokemon_elements = soup.find_all('div', class_='pokemon-entry') or soup.find_all('div', class_='pokemon')
        
        if not pokemon_elements:
            # Try alternative selectors based on the page structure
            pokemon_elements = soup.find_all('div', {'data-pokemon': True}) or soup.find_all('span', class_='pokemon-name')
        
        for element in pokemon_elements:
            try:
                # Extract Pokemon name and usage from the element
                name_element = element.find('span', class_='pokemon-name') or element.find('div', class_='name')
                usage_element = element.find('span', class_='usage') or element.find('div', class_='usage')
                
                if name_element:
                    name = name_element.text.strip()
                    usage = 0.0
                    
                    if usage_element:
                        usage_text = usage_element.text.strip()
                        try:
                            usage = float(usage_text.replace('%', ''))
                        except ValueError:
                            usage = 0.0
                    
                    pokemon_data.append({
                        'name': name,
                        'usage': usage,
                        'rank': len(pokemon_data) + 1
                    })
            except (AttributeError, ValueError) as e:
                continue
        
        # If we couldn't find structured data, try to extract from text content
        if not pokemon_data:
            # Look for patterns in the page text that indicate Pokemon usage
            page_text = soup.get_text()
            # This is a fallback - we might need to adjust based on actual page structure
            lines = page_text.split('\n')
            for line in lines:
                if '%' in line and any(char.isalpha() for char in line):
                    # Try to extract Pokemon name and usage from text
                    parts = line.split()
                    for i, part in enumerate(parts):
                        if '%' in part and i > 0:
                            try:
                                usage = float(part.replace('%', ''))
                                name = ' '.join(parts[:i])
                                if len(name) > 0 and usage > 0:
                                    pokemon_data.append({
                                        'name': name,
                                        'usage': usage,
                                        'rank': len(pokemon_data) + 1
                                    })
                            except ValueError:
                                continue
        
        return {
            "format": "VGC 2025 Regulation Set I",  # Current format from the page
            "pokemon": pokemon_data,
            "total_pokemon": len(pokemon_data),
            "scraped_at": time.time()
        }
        
    except requests.exceptions.HTTPError as e:
        return {
            "error": f"HTTP Error {e.response.status_code}: {str(e)}",
            "format": format_name,
            "pokemon": [],
            "total_pokemon": 0,
            "scraped_at": time.time()
        }
    except Exception as e:
        return {
            "error": f"Failed to scrape Pikalytics: {str(e)}",
            "format": format_name,
            "pokemon": [],
            "total_pokemon": 0,
            "scraped_at": time.time()
        }

def get_pokemon_sets(pokemon_name: str, format_name: str = "sv") -> dict:
    """Get common sets for a specific Pokemon from Pikalytics."""
    try:
        # URL for specific Pokemon page
        url = f"https://www.pikalytics.com/pokedex/sv/{pokemon_name.lower()}"
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        sets = []
        
        # Extract moves data - look for moves section
        moves_section = soup.find('div', string=lambda text: text and 'Moves' in text)
        if moves_section:
            moves_container = moves_section.find_parent().find_all('div', class_='move') or moves_section.find_parent().find_all('span', class_='move')
            for move_element in moves_container:
                try:
                    move_name = move_element.find('span', class_='move-name') or move_element
                    move_type = move_element.find('span', class_='move-type')
                    move_usage = move_element.find('span', class_='move-usage')
                    
                    if move_name:
                        sets.append({
                            'type': 'move',
                            'name': move_name.text.strip(),
                            'move_type': move_type.text.strip() if move_type else 'Unknown',
                            'usage': move_usage.text.strip() if move_usage else '0%'
                        })
                except (AttributeError, ValueError):
                    continue
        
        # Extract items data
        items_section = soup.find('div', string=lambda text: text and 'Item' in text)
        if items_section:
            items_container = items_section.find_parent().find_all('div', class_='item') or items_section.find_parent().find_all('span', class_='item')
            for item_element in items_container:
                try:
                    item_name = item_element.find('span', class_='item-name') or item_element
                    item_usage = item_element.find('span', class_='item-usage')
                    
                    if item_name:
                        sets.append({
                            'type': 'item',
                            'name': item_name.text.strip(),
                            'usage': item_usage.text.strip() if item_usage else '0%'
                        })
                except (AttributeError, ValueError):
                    continue
        
        # Extract abilities data
        abilities_section = soup.find('div', string=lambda text: text and 'Ability' in text)
        if abilities_section:
            abilities_container = abilities_section.find_parent().find_all('div', class_='ability') or abilities_section.find_parent().find_all('span', class_='ability')
            for ability_element in abilities_container:
                try:
                    ability_name = ability_element.find('span', class_='ability-name') or ability_element
                    ability_usage = ability_element.find('span', class_='ability-usage')
                    
                    if ability_name:
                        sets.append({
                            'type': 'ability',
                            'name': ability_name.text.strip(),
                            'usage': ability_usage.text.strip() if ability_usage else '0%'
                        })
                except (AttributeError, ValueError):
                    continue
        
        # Extract EV spreads data
        spreads_section = soup.find('div', string=lambda text: text and 'EV Spreads' in text)
        if spreads_section:
            spreads_container = spreads_section.find_parent().find_all('div', class_='spread') or spreads_section.find_parent().find_all('span', class_='spread')
            for spread_element in spreads_container:
                try:
                    nature_element = spread_element.find('span', class_='nature')
                    evs_element = spread_element.find('span', class_='evs')
                    usage_element = spread_element.find('span', class_='usage')
                    
                    if nature_element:
                        sets.append({
                            'type': 'spread',
                            'nature': nature_element.text.strip(),
                            'evs': evs_element.text.strip() if evs_element else 'Unknown',
                            'usage': usage_element.text.strip() if usage_element else '0%'
                        })
                except (AttributeError, ValueError):
                    continue
        
        return {
            "pokemon": pokemon_name,
            "format": "VGC 2025 Regulation Set I",
            "sets": sets,
            "total_sets": len(sets)
        }
        
    except Exception as e:
        return {
            "error": f"Failed to get sets for {pokemon_name}: {str(e)}",
            "pokemon": pokemon_name,
            "format": "VGC 2025 Regulation Set I",
            "sets": [],
            "total_sets": 0
        }

def get_usage_stats(format_name: str = "sv") -> dict:
    """Get usage statistics for the current format."""
    meta_data = scrape_pikalytics_meta(format_name)
    
    if "error" in meta_data:
        return meta_data
    
    # Sort by usage percentage
    sorted_pokemon = sorted(meta_data["pokemon"], key=lambda x: x["usage"], reverse=True)
    
    return {
        "format": format_name,
        "top_pokemon": sorted_pokemon[:20],  # Top 20
        "total_pokemon": meta_data["total_pokemon"],
        "scraped_at": meta_data["scraped_at"]
    } 