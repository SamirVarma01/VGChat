from fastapi import APIRouter, Query
from services.pikalytics import get_usage_stats, scrape_pikalytics_meta

router = APIRouter()

@router.get("/meta")
def get_meta(format: str = Query(default="ss", description="VGC format to analyze")):
    """Get meta analysis data for the specified format."""
    return get_usage_stats(format)

@router.get("/meta/raw")
def get_raw_meta(format: str = Query(default="ss", description="VGC format to analyze")):
    """Get raw meta data from Pikalytics."""
    return scrape_pikalytics_meta(format) 