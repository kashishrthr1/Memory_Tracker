# Memory Tracker - Complete Technical Documentation

## Overview

Memory Tracker is a sophisticated web application designed to help users monitor and improve their memory retention through spaced repetition and scientific memory decay algorithms. The system tracks learning topics, calculates memory scores based on confidence assessments, and automatically schedules revision intervals to optimize long-term retention.

## Architecture

### Technology Stack

**Frontend (Client):**
- **React 19.2.0** - Modern UI framework with hooks and concurrent features
- **Vite 7.2.4** - Fast development build tool and dev server
- **React Router 7.11.0** - Client-side routing for single-page application
- **TailwindCSS 4.1.18** - Utility-first CSS framework for styling
- **Recharts 3.6.0** - Data visualization library for memory graphs
- **Axios 1.13.2** - HTTP client for API communication
- **Lucide React & React Icons** - Icon libraries for UI components

**Backend (Server):**
- **Node.js** - JavaScript runtime environment
- **Express 5.2.1** - Web application framework
- **MongoDB 7.0.0** - NoSQL database for data persistence
- **Mongoose 9.0.1** - Object Data Modeling (ODM) library for MongoDB
- **JWT (jsonwebtoken 9.0.3)** - Authentication tokens
- **bcryptjs 3.0.3** - Password hashing
- **node-cron 4.2.1** - Scheduled task management for memory decay
- **CORS 2.8.5** - Cross-origin resource sharing

### Project Structure

```
Memory_Tracker/
├── client/                     # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Hero.jsx       # Landing page hero section
│   │   │   ├── Features.jsx   # Feature showcase component
│   │   │   ├── Navbar.jsx     # Navigation bar
│   │   │   ├── Footer.jsx     # Footer component
│   │   │   ├── Overview.jsx   # Dashboard overview with memory score
│   │   │   ├── TopicList.jsx  # Topic management with CRUD operations
│   │   │   ├── ListItem.jsx   # Individual topic item component
│   │   │   ├── Modal.jsx      # Modal component for assessments
│   │   │   ├── MemoryGraph.jsx # Memory visualization chart
│   │   │   ├── RevisionGuide.jsx # Revision scheduling interface
│   │   │   ├── RecentActivity.jsx # Activity tracking component
│   │   │   ├── LeftPanel.jsx  # Dashboard left panel
│   │   │   ├── RightPanel.jsx # Dashboard right panel
│   │   │   ├── LoginForm.jsx  # User login form
│   │   │   ├── RegisterForm.jsx # User registration form
│   │   │   ├── InputField.jsx # Generic input field
│   │   │   └── LoginInput.jsx # Login-specific input field
│   │   ├── pages/              # Page-level components
│   │   │   ├── HomePage.jsx   # Landing page
│   │   │   ├── LoginPage.jsx  # Authentication page
│   │   │   ├── ContactPage.jsx # Contact/information page
│   │   │   └── DashboardPage.jsx # Main dashboard
│   │   ├── styles/             # CSS styling files
│   │   │   ├── home.css       # Landing page styles
│   │   │   ├── login.css      # Authentication page styles
│   │   │   ├── dashboard.css  # Dashboard specific styles
│   │   │   └── contact.css    # Contact page styles
│   │   ├── services/           # API service layer
│   │   │   ├── api.js         # API configuration and base setup
│   │   │   └── authService.js # Authentication service functions
│   │   ├── config/             # Configuration files
│   │   │   └── api.js         # API endpoint configuration
│   │   ├── assets/             # Static assets
│   │   │   └── [images, logos, diagrams]
│   │   ├── App.jsx            # Main application component with routing
│   │   ├── main.jsx           # Application entry point
│   │   ├── index.css          # Global styles
│   │   └── App.css            # App-specific styles
│   ├── public/                # Public static files
│   ├── dist/                  # Build output directory
│   ├── package.json           # Frontend dependencies and scripts
│   └── vite.config.js         # Vite build configuration
├── server/                     # Node.js backend application
│   ├── src/
│   │   ├── models/             # MongoDB data models
│   │   │   ├── User.js        # User schema and model
│   │   │   ├── Topic.js       # Topic schema and memory tracking
│   │   │   ├── MemoryHistory.js # Historical memory score data
│   │   │   ├── Revision.js    # Revision tracking model
│   │   │   └── Assessment.js  # Assessment question model
│   │   ├── controllers/        # Route handlers
│   │   │   ├── authController.js # Authentication logic
│   │   │   ├── topicController.js # Topic CRUD and assessment
│   │   │   └── calendarController.js # Revision scheduling
│   │   ├── routes/             # API route definitions
│   │   │   ├── authRoutes.js  # Authentication endpoints
│   │   │   └── topicRoutes.js # Topic management endpoints
│   │   ├── middleware/         # Express middleware
│   │   │   └── authMiddleware.js # JWT authentication middleware
│   │   ├── services/           # Business logic services
│   │   │   └── topicService.js # Topic-related business logic
│   │   ├── utils/              # Utility functions
│   │   │   └── memoryScore.js # Memory scoring algorithms
│   │   ├── cron/               # Scheduled tasks
│   │   │   └── memoryDecayCron.js # Daily memory decay calculations
│   │   ├── config/             # Configuration
│   │   │   └── db.js          # Database connection
│   │   └── app.js              # Express application setup
│   ├── package.json            # Backend dependencies and scripts
│   ├── server.js               # Server entry point
│   └── .env                    # Environment variables
└── README.md                   # Project documentation
```

## Core Functionality

### 1. User Authentication System

**Registration Flow:**
- User provides username, email, and password
- Password is hashed using bcryptjs with salt rounds
- User data is stored in MongoDB with unique email constraint
- JWT token is generated with 7-day expiration
- Token and user info returned to client for session management

**Login Flow:**
- Email and password validation against database
- bcrypt comparison for password verification
- JWT token generation on successful authentication
- Token stored in client localStorage for subsequent requests

**Authentication Middleware:**
- `authMiddleware.js` protects API routes
- Validates JWT tokens from Authorization headers
- Attaches user data to request object for protected routes

### 2. Memory Tracking Algorithm

The application uses a sophisticated **Spaced Repetition System (SRS)** inspired by the Ebbinghaus Forgetting Curve and SuperMemo algorithms.

**Initial Assessment Analysis:**
- Takes 5 confidence scores (0-100).
- Calculates **Average Score** as the baseline.
- Calculates **Variance & Standard Deviation** to determine "Confidence Consistency".
- Derives an initial **Difficulty** rating based on the score vs. uncertainty (standard deviation).

**Stability Calculation:**
- Stability represents how long a memory stays "fresh" (in days).
- Formula: `Stability = Base * Multiplier * PerformanceFactor`
- **difficulty** acts as a penalty (harder topics decay faster).
- **Revision Count** exponentially increases stability (`2.5 ^ count`).

**Decay Model:**
- Uses exponential decay: `currentScore = baseScore * e^(-time / stability)`
- This models real human memory loss more accurately than linear decay.

### 3. Automated Memory Decay System

**Daily Cron Job:**
- Runs at midnight daily.
- Fetches all user topics.
- Recalculates the **Current Score** based on time elapsed since the last revision.
- Formula: `retention = exp(-daysSinceRevision / stability)`
- Updates the topic status dynamically (Healthy/Review Soon/Urgent).

**Revision Scheduling:**
- The system predicts exactly when the retention will drop to **60%**.
- This date becomes the `optimalRevisionDate`.
- Users are prompted to review *just before* they are likely to forget.

### 4. Topic Management System

**Topic Creation:**
- User enters topic name
- Completes 5-question confidence assessment
- System calculates initial memory score
- Schedules first revision based on score
- Stores topic with user association

**Topic Revision:**
- User selects topic for revision
- Completes assessment questionnaire
- System recalculates **Stability** and **Difficulty**
- Updates revision count and timestamps
- Reschedules next revision based on 60% retention target

**Topic Tracking:**
- Memory score (0-100 scale)
- Revision count (number of times reviewed)
- Creation date and last revision date
- Next scheduled revision date
- Historical score progression

### 5. Data Models

**User Schema:**
```javascript
{
  username: String (required, 3-30 chars),
  email: String (required, unique, lowercase),
  password: String (required, hashed, min 6 chars),
  timestamps: true
}
```

**Topic Schema:**
```javascript
{
  user: ObjectId (ref: User, required),
  topicName: String (required),
  baseMemoryScore: Number (required, 0-100), // Score immediately after learning
  
  // SRS Parameters
  stability: Number, // Days until memory decays significantly
  difficulty: Number, // 0-1 scale (0=hard, 1=easy)
  revisionCount: Number, 
  
  lastRevisedAt: Date,
  revisionHistory: [{
    date: Date,
    scoreBeforeRevision: Number,
    scoreAfterRevision: Number,
    daysSinceLastRevision: Number
  }],
  timestamps: true
}
```

**MemoryHistory Schema:**
```javascript
{
  topic: ObjectId (ref: Topic, required),
  user: ObjectId (ref: User, required),
  date: Date (required),
  memoryScore: Number (required, 0-100)
}
```

## API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /register` - Create new user account
  - Request: `{ username, email, password }`
  - Response: `{ message, token, user }`

- `POST /login` - Authenticate user
  - Request: `{ email, password }`
  - Response: `{ message, token, user }`

- `GET /me` - Get current user profile
  - Protected: Requires JWT token
  - Response: `{ user }`

### Topic Routes (`/api/topics`)

- `POST /` - Create new topic with assessment
  - Protected: Requires JWT token
  - Request: `{ name, q1, q2, q3, q4, q5 }`
  - Response: `{ message, topic }`

- `POST /:id/revise` - Revise existing topic
  - Protected: Requires JWT token
  - Request: `{ q1, q2, q3, q4, q5 }`
  - Response: `{ message, topic }`

- `GET /revision-calendar` - Get revision schedule
  - Protected: Requires JWT token
  - Response: `{ calendarData }`

## Frontend Components

### Dashboard Architecture

**Main Dashboard Layout:**
- Navbar with navigation and user info
- Overview section with memory score visualization
- Topic list with search and filtering
- Revision guide with scheduling information
- Recent activity tracking
- Footer with application links

**Key Components:**

1. **Overview.jsx**
   - Animated memory score display (0-100%)
   - Weekly memory trend visualization
   - Next milestone and revision scheduling
   - Progress indicators and insights

2. **TopicList.jsx**
   - Searchable and sortable topic display
   - Memory score visualization with color coding
   - Revision count and scheduling information
   - Modal-based topic creation and assessment
   - Real-time score updates after revision

3. **MemoryGraph.jsx**
   - Recharts-based line graph
   - Historical memory score visualization
   - Responsive design with tooltips
   - Time-based data presentation

4. **Modal System**
   - Multi-step topic creation flow
   - 5-question assessment interface
   - Confidence slider controls (0-100)
   - Real-time score calculation feedback

## Development Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

**1. Clone and Setup:**
```bash
git clone <repository-url>
cd Memory_Tracker
```

**2. Backend Setup:**
```bash
cd server
npm install
cp .env.example .env  # Configure environment variables
npm run dev  # Start development server (port 5000)
```

**3. Frontend Setup:**
```bash
cd client
npm install
npm run dev  # Start development server (port 5173)
```

### Environment Variables

**Server (.env):**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/memory-tracker
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

**Client (.env):**
```
VITE_API_URL=http://localhost:5000/api
```

### Build & Deployment

**Production Build:**
```bash
# Frontend
cd client
npm run build

# Backend
cd server
npm start
```

**Docker Deployment (Optional):**
```dockerfile
# Dockerfile configuration for containerized deployment
```

## Key Features & Benefits

### For Users
- **Scientific Memory Tracking:** Evidence-based spaced repetition algorithm
- **Visual Progress Monitoring:** Interactive graphs showing memory retention over time
- **Smart Scheduling:** Automated revision scheduling based on individual performance
- **Confidence-Based Assessment:** 5-question system gauging real understanding
- **Gamification Elements:** Score tracking and progress visualization

### For Developers
- **Modern Tech Stack:** React 19, Node.js, MongoDB ecosystem
- **Scalable Architecture:** Modular design with clear separation of concerns
- **RESTful API:** Clean, well-documented API endpoints
- **Real-time Updates:** Immediate UI feedback on score changes
- **Responsive Design:** Mobile-friendly interface using TailwindCSS

## Security Considerations

1. **Authentication:** JWT tokens with 7-day expiration
2. **Password Security:** bcrypt hashing with salt rounds
3. **API Protection:** Route-level authentication middleware
4. **CORS Configuration:** Controlled cross-origin access
5. **Input Validation:** Server-side validation for all user inputs
6. **Environment Variables:** Sensitive data stored securely

## Performance Optimizations

1. **Frontend:**
   - Vite's fast development server
   - Code splitting and lazy loading
   - Optimized bundle size
   - Efficient state management

2. **Backend:**
   - MongoDB indexing for user and topic queries
   - Efficient cron job scheduling
   - Connection pooling for database
   - Minimal API response payloads

## Future Enhancements

1. **Advanced Analytics:**
   - Learning pattern analysis
   - Performance predictions
   - Comparative statistics

2. **Enhanced Features:**
   - Topic categorization and tagging
   - Study session timers
   - Achievement system
   - Social features and sharing

3. **Technical Improvements:**
   - TypeScript migration
   - Progressive Web App (PWA)
   - Offline functionality
   - Mobile app development

## Troubleshooting

**Common Issues:**
1. **MongoDB Connection:** Ensure MongoDB is running and URI is correct
2. **CORS Errors:** Verify frontend API URL matches backend CORS settings
3. **Authentication Failures:** Check JWT secret configuration
4. **Memory Scores Not Updating:** Verify cron job is running properly

**Debug Mode:**
- Backend: Set `NODE_ENV=development` for detailed logs
- Frontend: Use browser developer tools for network inspection
- Database: Check MongoDB logs for connection issues

This documentation provides a comprehensive understanding of the Memory Tracker application, covering its architecture, functionality, and technical implementation details suitable for new developers joining the project.