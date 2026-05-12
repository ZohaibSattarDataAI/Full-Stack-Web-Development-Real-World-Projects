# 🧮 #ZohaibSattarDataAI - Tax Calculator

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green.svg)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-orange.svg)](https://developer.mozilla.org/)

> A professional full-stack income tax calculator application with FastAPI backend and modern responsive frontend.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Tax Logic Explanation](#tax-logic-explanation)
- [Installation Guide](#installation-guide)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Frontend Interface](#frontend-interface)
- [Testing the API](#testing-the-api)
- [Troubleshooting](#troubleshooting)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Author](#author)

## 🎯 Project Overview

The **#ZohaibSattarDataAI Tax Calculator** is a full-stack web application that calculates income tax based on annual salary. The project demonstrates:

- RESTful API development using **FastAPI**
- Modern frontend development with **HTML5/CSS3/JavaScript**
- Integration between frontend and backend using **Fetch API**
- Progressive tax bracket implementation
- Real-time tax calculations with animations

## ✨ Features

### Backend Features
- ✅ RESTful API with 5+ endpoints
- ✅ Automatic interactive API documentation (Swagger UI)
- ✅ CORS enabled for cross-origin requests
- ✅ Input validation and error handling
- ✅ Health check endpoint
- ✅ Tax bracket information endpoint

### Frontend Features
- ✅ Modern, responsive design
- ✅ Real-time tax calculation
- ✅ Animated number counters
- ✅ Dark/Light theme toggle
- ✅ Visual tax bracket indicator
- ✅ Tax saving tips
- ✅ Mobile-friendly layout
- ✅ Toast notifications
- ✅ API connection status indicator

### Tax Logic Features
- ✅ Original Python tax logic preserved
- ✅ Progressive tax brackets (with identified bug)
- ✅ Corrected logic available for comparison
- ✅ Real-time bracket highlighting
- ✅ Detailed tax breakdown

## 🛠️ Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Backend Framework** | FastAPI | 0.104.1 |
| **ASGI Server** | Uvicorn | 0.24.0 |
| **Programming Language** | Python | 3.8+ |
| **Frontend** | HTML5/CSS3/JavaScript | ES6+ |
| **CSS Framework** | Custom CSS with Flexbox/Grid | - |
| **Icons** | Font Awesome | 6.4.0 |
| **Fonts** | Google Fonts (Inter) | - |
| **Animations** | AOS Library | 2.3.1 |

## 📁 Project Structure
tax-calculator/
│
├── backend/
│ ├── main.py # FastAPI application (main server)
│ ├── tax_logic.py # Core tax calculation logic
│ └── requirements.txt # Python dependencies
│
├── frontend/
│ ├── index.html # Main application interface
│ ├── style.css # Styling and animations
│ └── script.js # Frontend logic & API integration
│
├── run.py # Python runner script
├── run_project.bat # Windows batch runner
├── Makefile # Make commands runner
└── README.md # Project documentation

Tax Brackets Table
Salary Range (PKR)	Intended Rate	Actual Applied Rate	Status
0 - 30,000	25%	25%	✅ Working
30,001 - 70,000	15%	50%	✅ Working
70,001+	50%	50%	✅ Working

