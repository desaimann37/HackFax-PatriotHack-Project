import os
import json
import re
from dotenv import load_dotenv
import google.generativeai as genai

# 🔹 Load environment variables from .env
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
print("GEMINI_API_KEY loaded:", bool(GEMINI_API_KEY))
print("GEMINI_API_KEY value:", GEMINI_API_KEY)

# 🔹 Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)


def generate_explanation(primary_class, color, gender, recommendations):
    """
    Generate a fashion explanation with recommended accessories and their links.
    
    :param primary_class: str, main clothing item (e.g., "shirt")
    :param color: str, primary color of clothing
    :param gender: str, "male"/"female"/"unknown"
    :param recommendations: list of dicts, each with keys: 'name', 'price', 'url'
    :return: str, explanation with embedded links
    """
    model = genai.GenerativeModel("gemini-2.5-flash-lite")

    # Format product list with URLs
    product_list = ""
    for p in recommendations:
        product_list += f"- [{p['name']}]({p['url']}) (${p['price']})\n"

    prompt = f"""
A person is wearing a {color} {primary_class}.
The person appears to be {gender}.

We are recommending the following ACCESSORIES to enhance this look:

{product_list}

Write a short, stylish, friendly fashion explanation (3-4 sentences)
explaining how these accessories complement the outfit.

Instructions:
- Mention how each accessory works with the outfit (color, balance, style)
- Include each product name as a clickable link (markdown format) as shown above
- Do not repeat the price in the explanation
- Keep the tone modern and fashion-forward
"""

    response = model.generate_content(prompt)

    if not response.text:
        return "These accessories perfectly complement the outfit. Check the links above for more details."

    return response.text.strip()


def analyze_attributes_with_gemini(image_bytes):
    """
    Analyze an image and return the gender and primary clothing color.
    
    :param image_bytes: bytes of the image
    :return: tuple (gender, color)
    """
    model = genai.GenerativeModel("gemini-2.5-flash-lite")

    prompt = """
Analyze this image and answer:

1. What gender does the person appear to be? (male, female, unknown)
2. What is the primary color of the main clothing item?

Respond ONLY in valid JSON:
{
  "gender": "male/female/unknown",
  "color": "color name"
}
"""

    response = model.generate_content(
        [
            prompt,
            {
                "mime_type": "image/jpeg",
                "data": image_bytes
            }
        ]
    )

    text = response.text
    if not text:
        return "unknown", "unknown"

    # 🔹 Remove any code blocks or extra text
    text = text.strip()

    # Extract JSON using regex
    json_match = re.search(r"\{.*\}", text, re.DOTALL)
    if not json_match:
        return "unknown", "unknown"

    json_string = json_match.group()

    try:
        result = json.loads(json_string)
        gender = result.get("gender", "unknown")
        color = result.get("color", "unknown")
        return gender, color
    except json.JSONDecodeError:
        return "unknown", "unknown"


# Example usage
if __name__ == "__main__":
    # 🔹 Test generate_explanation
    sample_recs = [
        {"name": "Leather Belt", "price": "25", "url": "https://example.com/belt"},
        {"name": "Gold Watch", "price": "150", "url": "https://example.com/watch"},
    ]
    explanation = generate_explanation("shirt", "blue", "male", sample_recs)
    print("Fashion Explanation:\n", explanation)

    # 🔹 Test analyze_attributes_with_gemini with a local image
    # with open("test_image.jpg", "rb") as f:
    #     image_bytes = f.read()
    # gender, color = analyze_attributes_with_gemini(image_bytes)
    # print("Detected Gender:", gender)
    # print("Detected Color:", color)
