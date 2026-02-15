from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import base64
import traceback

from services.yolo_service import detect_clothing
from services.recommendation_service import get_recommendations
from services.gemini_service import (
    generate_explanation,
    analyze_attributes_with_gemini
)

app = FastAPI(title="Fashion AI Backend")

# ✅ Enable CORS (for React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, restrict this
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Serve product images from /database folder
app.mount("/products", StaticFiles(directory="database"), name="products")


@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    try:
        # 🔹 Read uploaded image
        image_bytes = await file.read()

        if not image_bytes:
            raise HTTPException(status_code=400, detail="Empty file uploaded.")

        # ==================================================
        # 1️⃣ YOLO Detection
        # ==================================================
        detections, boxed_image_bytes = detect_clothing(image_bytes)


        if not detections:
            return {
                "image": None,
                "detections": [],
                "products": [],
                "gender": "unknown",
                "color": "unknown",
                "explanation": "No clothing detected in the image."
            }

        primary_class = detections[0]["class"]

        # ==================================================
        # 2️⃣ Gemini Vision → Gender + Color
        # ==================================================
        gender, color = analyze_attributes_with_gemini(image_bytes)

        # Fallback safety
        if not gender:
            gender = "unknown"
        if not color:
            color = "unknown"

        # ==================================================
        # 3️⃣ Get Product Recommendations
        # ==================================================
        recommendations = get_recommendations(primary_class, color)

        # ==================================================
        # 4️⃣ Generate Explanation (Gemini text)
        # ==================================================
        explanation = generate_explanation(
            primary_class,
            color,
            gender,
            recommendations
        )

        # ==================================================
        # 5️⃣ Encode Image for Frontend Display
        # ==================================================
        encoded_image = base64.b64encode(boxed_image_bytes).decode("utf-8")


        # ==================================================
        # 6️⃣ Final Response
        # ==================================================
        return {
            "image": encoded_image,
            "detections": detections,
            "products": recommendations,
            "gender": gender,
            "color": color,
            "explanation": explanation
        }

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )
