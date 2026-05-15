from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional

from tax_logic import calculate_tax, calculate_tax_corrected

app = FastAPI(
    title="Tax Calculator API - #ZohaibSattarDataAI",
    description="Income Tax Calculator API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TaxRequest(BaseModel):
    salary: float = Field(..., gt=0)

class TaxResponse(BaseModel):
    success: bool
    data: Optional[dict] = None
    error: Optional[str] = None
    logic_used: Optional[str] = None
    warning: Optional[str] = None


@app.get("/")
def root():
    return {"message": "Tax Calculator API Running Successfully"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.post("/calculate", response_model=TaxResponse)
def calculate_tax_endpoint(request: TaxRequest):

    try:
        result = calculate_tax(request.salary)

        warning = None

        if 30000 < request.salary <= 70000:
            warning = "⚠️ Middle bracket applies 15% tax in corrected logic."

        return TaxResponse(
            success=True,
            data=result,
            logic_used="Original Logic (Fixed)",
            warning=warning
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/calculate/corrected", response_model=TaxResponse)
def calculate_corrected_tax_endpoint(request: TaxRequest):

    try:
        result = calculate_tax_corrected(request.salary)

        return TaxResponse(
            success=True,
            data=result,
            logic_used="Corrected Logic"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/brackets")
def get_tax_brackets():

    return {
        "tax_brackets": [
            {"range": "0 - 30,000", "tax_rate": "0%"},
            {"range": "30,001 - 70,000", "tax_rate": "15%"},
            {"range": "70,001+", "tax_rate": "25%"}
        ]
    }


if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        "main:app",
        host="full-stack-web-development-real-world-projects-production.up.railway.app",
        port=8000,
        reload=True
    )
