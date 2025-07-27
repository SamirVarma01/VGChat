from fastapi import APIRouter, Query
from services.pikalytics import get_pokemon_sets

router = APIRouter()

@router.get("/sets/{pokemon}")
def get_sets(pokemon: str, format: str = Query(default="ss", description="VGC format to analyze")):
    """Get common sets for a specific Pokemon."""
    return get_pokemon_sets(pokemon, format) 