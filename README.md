#  Sentivision: Visualize Market Sentiment Through AI

**Sentivision** is an AI-powered tool that fuses **chart pattern recognition** and **financial sentiment analysis** into a single, intuitive dashboard. Upload a candlestick chart, input related news headlines, and get a data-driven trading insight — all powered by deep learning.

---

##  Features

-  **Chart Pattern Detection**  
  Upload a candlestick chart and detect classic technical patterns:
  - Head & Shoulders  
  - Double Bottom  
  - Flags & Pennants  
  *(CNN-based image classifier)*

-  **Financial News Sentiment Analysis**  
  Paste news headlines or summaries and get:
  - Sentiment polarity (Positive / Neutral / Negative)  
  - Confidence percentages  
  *(Transformer-based NLP model: FinBERT or equivalent)*

-  **Insight Generation**  
  Combines pattern and sentiment analysis to offer actionable trading insights:
  - “Bearish reversal likely”  
  - “Bullish continuation supported”  
  - “Unconfirmed – sentiment/pattern mismatch”

-  **Interactive UI (Streamlit)**  
  - Upload chart images  
  - Paste news or headlines  
  - See visual pattern detection + sentiment output  
  - One-click insight summary

---

##  Tech Stack

| Component        | Library/Tool              |
|------------------|---------------------------|
|  Chart Analysis | PyTorch / TensorFlow (CNN) |
|  Sentiment NLP  | HuggingFace Transformers (FinBERT) |
|  Frontend       | Streamlit                |
|  Data Feeds     | (Optional) NewsAPI, Alpha Vantage |
|  Visualization  | Matplotlib / OpenCV      |

---

##  Installation & Running Locally

```bash
# Clone the repo
git clone https://github.com/serigela/Sentivision.git
cd Sentivision

# (Optional) Create virtual environment
python -m venv venv
source venv/bin/activate  # or .\venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Launch the app
streamlit run app.py
