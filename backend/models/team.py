from pydantic import BaseModel
from typing import List, Optional

class PokemonSet(BaseModel):
    name: str
    item: Optional[str]
    ability: Optional[str]
    moves: List[str]
    nature: Optional[str]
    evs: Optional[dict]
    ivs: Optional[dict]

class Team(BaseModel):
    name: str
    pokemon: List[PokemonSet] 