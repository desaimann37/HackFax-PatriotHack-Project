# AI Fashion Recommendation System

An AI-powered fashion recommendation web application that analyzes
uploaded images to:

-   Detect clothing using YOLOv8
-   Identify perceived gender and clothing color using Google Gemini
    Vision
-   Recommend matching products
-   Generate AI-based fashion explanations

------------------------------------------------------------------------

## Features

-  Clothing detection with YOLOv8\
-  Color detection using Gemini Vision\
-  Perceived gender detection\
-  Smart product recommendations\
-  AI-generated styling explanation\
-  FastAPI backend + React frontend\
-  Bounding box visualization on detected clothing

------------------------------------------------------------------------

<<<<<<< HEAD
=======
## Demo Screenshot

![AI Fashion Recommendation System Demo](assets/ui-demo.jpg)

------------------------------------------------------------------------

>>>>>>> 99affee (Update README and add demo screenshot)
## Tech Stack

### Backend

-   Python 3.10+
-   FastAPI
-   Ultralytics YOLOv8
-   Google Gemini API
-   OpenCV
-   Uvicorn

### Frontend

-   React
-   Bootstrap 5
-   Fetch API

------------------------------------------------------------------------

## 📂 Project Structure

backend/ ├── main.py ├── services/ │ ├── yolo_service.py │ ├──
gemini_service.py │ └── recommendation_service.py ├── database/ │ ├──
products.json │ └── product_images/ └── requirements.txt

frontend/ ├── src/ │ ├── components/ │ │ ├── ChatWindow.js │ │ └──
ImageUploader.js │ ├── App.js │ ├── App.css │ └── index.js └──
package.json

------------------------------------------------------------------------

## Setup Instructions

### Backend Setup

cd backend\
python -m venv venv\
source venv/bin/activate (macOS/Linux)\
venv`\Scripts`{=tex}`\activate  `{=tex}(Windows)

pip install -r requirements.txt

Create a `.env` file:

GEMINI_API_KEY=your_api_key_here

Run backend:

uvicorn main:app --reload

Backend runs at: http://localhost:8000

------------------------------------------------------------------------

### Frontend Setup

cd frontend\
npm install\
npm start

Frontend runs at: http://localhost:3000

------------------------------------------------------------------------

## 🔄 How It Works

1.  User uploads an image.\
2.  YOLOv8 detects clothing and draws bounding boxes.\
3.  Gemini Vision analyzes gender and clothing color.\
4.  Backend filters matching products.\
5.  Gemini generates a styling explanation.\
6.  Results are displayed in the UI.

------------------------------------------------------------------------

## Disclaimer

-   Gender detection is based on visual appearance and may not be
    accurate.
-   This project is for educational and demonstration purposes only.

------------------------------------------------------------------------

## 👨‍💻 Author(s)

<<<<<<< HEAD
Aditya
Mann
Tanmay
Aakash
=======
Aditya Raj  
Mann Desai  
Tanmay Sahasrabudhe  
Aakash Patil  
>>>>>>> 99affee (Update README and add demo screenshot)
