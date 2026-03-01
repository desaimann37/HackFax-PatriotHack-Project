# AI Fashion Recommendation System

An AI-powered fashion recommendation web application that analyzes
uploaded images to:

-   Detect clothing using YOLOv26
-   Identify perceived gender and clothing color using Google Gemini
    Vision
-   Recommend matching products
-   Generate AI-based fashion explanations

------------------------------------------------------------------------

## Features

-  Clothing detection with YOLOv26\
-  Color detection using Gemini Vision\
-  Perceived gender detection\
-  Smart product recommendations\
-  AI-generated styling explanation\
-  FastAPI backend + React frontend\
-  Bounding box visualization on detected clothing

------------------------------------------------------------------------

## Demo Screenshot

![AI Fashion Recommendation System Demo](assets/ui-demo.jpg)

------------------------------------------------------------------------

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

<img width="872" height="600" alt="image" src="https://github.com/user-attachments/assets/7d8d2148-15dc-447b-a60a-916352fda29d" />

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

------------------------------------------------------------------------

### Frontend Setup

cd frontend\
npm install\
npm start

------------------------------------------------------------------------

## 🔄 How It Works

1.  User uploads an image.\
2.  YOLOv26 detects clothing and draws bounding boxes.\
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

## Demonstration:

[Youtube Demo Link](https://youtu.be/3G-lWe0EQRk?si=J6wv45aPrgkZnTyc)
## 👨‍💻 Author(s)

------------------------------------------------------------------------

Deployment: [Deployment Link](https://fashion-ai-frontend-pied.vercel.app/)

-------------------------------------------------------------------------
Aditya Raj  
Mann Desai  
Tanmay Sahasrabudhe  
Aakash Patil  
