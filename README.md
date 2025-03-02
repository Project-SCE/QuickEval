# QuickEval - AI-Powered Answer Sheet Evaluation System

QuickEval is an intelligent system that automates the evaluation of student answer sheets using AI. It helps educators save time and maintain consistency in grading.

## Features

- AI-powered evaluation of student answer sheets
- Configurable question papers and answer keys
- Detailed scoring with confidence levels and remarks
- Multi-educator support with unique IDs
- Comprehensive evaluation reports

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI**: OpenAI API
- **Other Tools**: Zod (validation), Vite (build tool)

## Project Structure

```
quickeval/
├── client/               # Frontend React application
│   ├── src/             # React source files
│   ├── tailwind.config.js
│   └── vite.config.js
└── server/              # Backend Node.js application
    ├── models/          # MongoDB schemas
    ├── routes/          # API routes
    ├── utils/           # Utility functions
    └── server.js        # Main server file
```

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
cd client && npm install
cd ../server && npm install
```

3. Set up environment variables:
Create a `.env` file in the server directory with:
```
DB_URL=your_mongodb_connection_string
PORT=3000
OPENAI_API_KEY=your_openai_api_key
```

4. Start the development servers:
```bash
# Start backend
cd server && npm start

# Start frontend
cd client && npm run dev
```

## API Endpoints

- `POST /evaluators`: Create new evaluator with question paper and answer key
- `GET /evaluators/:educatorId`: Get all evaluators for a specific educator

## Key Features

1. **Smart Evaluation**
   - Analyzes student answers against answer keys
   - Provides detailed scoring and feedback
   - Includes confidence levels for each evaluation

2. **Structured Response**
   - Student information extraction
   - Question-wise breakdown
   - Detailed remarks and justification

3. **Educator Dashboard**
   - Manage multiple evaluation sets
   - Track evaluation history
   - Access detailed reports

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
