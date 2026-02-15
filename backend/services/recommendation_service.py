import json


def get_recommendations(primary_class, color=None):
    with open("database/products.json", "r") as f:
        products = json.load(f)

    # Filter by clothing type
    filtered = [
        p for p in products
        if p["category"].lower() == primary_class.lower()
    ]

    # Optional: filter by color if provided
    if color and color != "unknown":
        filtered = [
            p for p in filtered
            if p.get("color", "").lower() == color.lower()
        ]

    # Return top 3
    return filtered[:3]
