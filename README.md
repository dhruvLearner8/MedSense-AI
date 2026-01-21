# MedSense-AI

### This is an app where user can upload their blood documents and AI system will analyze the document like if RBC count is low or WBC is high, chlosterol, diabetes etc. There is a Chatbot to chat with and gain more information about one's blood report. 
### If no report try a sample one

## Hosted on https://medisense-ai-medical-report-interpreter-774762011618.us-west1.run.app/

## Future work
1) Implementing RAG for more complex QA using NIH medical dataset.
2) Extending the app to analyze more than just blood reports, like cancer reports or other reports too.

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
