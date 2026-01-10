# Memory Tracker - Technical Project Walkthrough

## 1. Project Overview
Memory Tracker is a web application designed to help users maximize learning retention using **Spaced Repetition**. By tracking confidence levels on various topics, the system calculates a "Memory Score" and intelligently schedules revision sessions to prevent memory decay.

This guide provides a complete technical breakdown of the project, specifically detailed for a new partner joining the team.

---

## 2. Technical Stack & Architecture

### Frontend (Client)
- **Framework:** React (Vite)
- **Styling:** TailwindCSS
- **State/Routing:** React Router DOM
- **Visualization:** Recharts (for memory graphs)

### Backend (Server)
- **Runtime:** Node.js & Express
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens) & bcryptjs
- **Scheduling:** node-cron (for daily memory decay updates)

---

## 3. Flow Breakdown

### **Step 1: User Logs In & Adds First Topic**

**User Action:** Creates topic "React Hooks" and completes assessment

- Question 1: 75
- Question 2: 80
- Question 3: 70
- Question 4: 85
- Question 5: 80

**Backend Process:**

```javascript
// POST /api/topics
async function createTopic(req, res) {
  const { topicName, assessmentResponses } = req.body;
  // assessmentResponses = [75, 80, 70, 85, 80]

  // 1. Calculate average score
  const averageScore = assessmentResponses.reduce((a, b) => a + b) / assessmentResponses.length;
  // averageScore = 78

  // 2. Calculate initial difficulty from assessment
  const variance = assessmentResponses.reduce((sum, score) => {
    return sum + Math.pow(score - averageScore, 2);
  }, 0) / assessmentResponses.length;

  const standardDeviation = Math.sqrt(variance);
  // standardDeviation ≈ 5.4 (low variance = confident)

  const uncertaintyFactor = standardDeviation / 100; // 0.054
  const scoreFactor = 1 - (averageScore / 100); // 0.22

  const difficulty = (scoreFactor * 0.7) + (uncertaintyFactor * 0.3);
  // difficulty = 0.154 + 0.016 = 0.17 (relatively easy topic)

  // 3. Calculate initial stability
  const baseStability = 1 + (1 - difficulty) * 9;
  // baseStability = 1 + (0.83 * 9) = 8.47 days

  const revisionCount = 0; // First time
  const revisionMultiplier = Math.pow(2.5, revisionCount); // = 1
  const performanceFactor = 0.5 + (averageScore / 200); // 0.5 + 0.39 = 0.89

  const stability = baseStability * revisionMultiplier * performanceFactor;
  // stability = 8.47 * 1 * 0.89 = 7.54 days

  // 4. Calculate optimal revision date (when score drops to 60)
  const targetRetention = 60 / averageScore; // 60/78 = 0.769
  const daysUntilThreshold = -stability * Math.log(targetRetention);
  // daysUntilThreshold = -7.54 * ln(0.769) = -7.54 * (-0.263) = 1.98 days

  const optimalRevisionDate = new Date();
  optimalRevisionDate.setDate(optimalRevisionDate.getDate() + Math.floor(daysUntilThreshold));
  // optimalRevisionDate = Today + 2 days

  // 5. Save to database
  const topic = new Topic({
    userId: req.user.id,
    topicName: "React Hooks",
    baseMemoryScore: 78,
    lastRevisedAt: new Date(), // Day 0: Jan 6, 2026
    revisionCount: 0,
    stability: 7.54,
    difficulty: 0.17,
    revisionHistory: [{
      date: new Date(),
      scoreBeforeRevision: null, // First assessment
      scoreAfterRevision: 78,
      daysSinceLastRevision: 0
    }]
  });

  await topic.save();

  res.json({
    topic,
    currentScore: 78,
    optimalRevisionDate: optimalRevisionDate.toDateString() // "Jan 8, 2026"
  });
}
```

Database State (Day 0 - Jan 6):

```json
{
  "_id": "...",
  "topicName": "React Hooks",
  "baseMemoryScore": 78,
  "lastRevisedAt": "2026-01-06T10:00:00Z",
  "revisionCount": 0,
  "stability": 7.54,
  "difficulty": 0.17,
  "revisionHistory": [...]
}
```

### **Step 2: Next Day - User Adds More Topics (Day 1 - Jan 7)**

**User Action:** Opens app, adds "Node.js Streams"

**Backend Process for "React Hooks" decay:**

```javascript
// GET /api/topics (fetch all topics)
async function getTopics(req, res) {
  const topics = await Topic.find({ userId: req.user.id });

  // For each topic, calculate current score
  const topicsWithCurrentScores = topics.map(topic => {
    const now = new Date(); // Jan 7, 2026
    const daysSinceRevision = (now - topic.lastRevisedAt) / (1000 * 60 * 60 * 24);
    // daysSinceRevision = 1 day

    // Ebbinghaus forgetting curve: R = e^(-t/S)
    const retention = Math.exp(-daysSinceRevision / topic.stability);
    // retention = e^(-1/7.54) = e^(-0.133) = 0.876

    const currentScore = topic.baseMemoryScore * retention;
    // currentScore = 78 * 0.876 = 68.3

    // Calculate days until optimal revision
    const targetRetention = 60 / topic.baseMemoryScore; // 0.769
    const daysUntilThreshold = -topic.stability * Math.log(targetRetention);
    // daysUntilThreshold = 1.98 days from last revision

    const optimalDate = new Date(topic.lastRevisedAt);
    optimalDate.setDate(optimalDate.getDate() + Math.floor(daysUntilThreshold));
    // optimalDate = Jan 8, 2026

    const daysUntilDue = (optimalDate - now) / (1000 * 60 * 60 * 24);
    // daysUntilDue = ~1 day

    return {
      ...topic.toObject(),
      currentScore: Math.round(currentScore), // 68
      optimalRevisionDate: optimalDate,
      daysUntilDue: Math.round(daysUntilDue),
      status: currentScore >= 70 ? 'healthy' :
              currentScore >= 60 ? 'review-soon' : 'urgent'
    };
  });

  res.json(topicsWithCurrentScores);
}
```

**User sees:**

React Hooks: 68/100 📊 (Review in 1 day)
Node.js Streams: 82/100 ✅ (Review in 3 days)

### **Step 3: Day 2 - Further Decay (Day 2 - Jan 8)**

**Backend calculates:**

```javascript
// For "React Hooks"
const daysSinceRevision = 2; // Jan 8 - Jan 6
const retention = Math.exp(-2 / 7.54); // e^(-0.265) = 0.767
const currentScore = 78 * 0.767 = 59.8 ≈ 60
```

**User sees:**

React Hooks: 60/100 ⚠️ (Due TODAY - Review now!)

### **Step 4: User Decides to Revise (Still Day 2)**

**User Action:** Clicks "Revise React Hooks", takes new assessment

- Responses: [85, 90, 80, 88, 82]

**Backend Process:**

```javascript
// POST /api/topics/:id/revise
async function reviseTopic(req, res) {
  const { assessmentResponses } = req.body;
  const topic = await Topic.findById(req.params.id);

  // 1. Calculate current score before revision (for history)
  const now = new Date();
  const daysSinceRevision = (now - topic.lastRevisedAt) / (1000 * 60 * 60 * 24);
  // daysSinceRevision = 2 days

  const retention = Math.exp(-daysSinceRevision / topic.stability);
  const scoreBeforeRevision = topic.baseMemoryScore * retention;
  // scoreBeforeRevision = 60

  // 2. Calculate new assessment score
  const newScore = assessmentResponses.reduce((a, b) => a + b) / assessmentResponses.length;
  // newScore = 85

  // 3. Update difficulty (adaptive learning)
  const variance = assessmentResponses.reduce((sum, score) => {
    return sum + Math.pow(score - newScore, 2);
  }, 0) / assessmentResponses.length;

  const standardDeviation = Math.sqrt(variance);
  const uncertaintyFactor = standardDeviation / 100;
  const scoreFactor = 1 - (newScore / 100);

  const newDifficulty = (scoreFactor * 0.7) + (uncertaintyFactor * 0.3);
  // newDifficulty ≈ 0.12 (got easier!)

  // Blend with old difficulty (weighted average)
  const blendedDifficulty = (topic.difficulty * 0.5) + (newDifficulty * 0.5);
  // blendedDifficulty = (0.17 * 0.5) + (0.12 * 0.5) = 0.145

  // 4. Calculate NEW stability (after first revision)
  const baseStability = 1 + (1 - blendedDifficulty) * 9;
  // baseStability = 1 + (0.855 * 9) = 8.7 days

  const revisionMultiplier = Math.pow(2.5, topic.revisionCount + 1);
  // revisionMultiplier = 2.5^1 = 2.5 (big jump!)

  const performanceFactor = 0.5 + (newScore / 200);
  // performanceFactor = 0.5 + 0.425 = 0.925

  const newStability = baseStability * revisionMultiplier * performanceFactor;
  // newStability = 8.7 * 2.5 * 0.925 = 20.1 days (much longer!)

  // 5. Calculate new optimal revision date
  const targetRetention = 60 / newScore; // 60/85 = 0.706
  const daysUntilThreshold = -newStability * Math.log(targetRetention);
  // daysUntilThreshold = -20.1 * ln(0.706) = -20.1 * (-0.348) = 7.0 days

  const optimalRevisionDate = new Date();
  optimalRevisionDate.setDate(optimalRevisionDate.getDate() + Math.floor(daysUntilThreshold));
  // optimalRevisionDate = Jan 15, 2026 (7 days from now!)

  // 6. Update revision history
  topic.revisionHistory.push({
    date: now,
    scoreBeforeRevision: Math.round(scoreBeforeRevision), // 60
    scoreAfterRevision: newScore, // 85
    daysSinceLastRevision: daysSinceRevision // 2
  });

  // 7. Update topic
  topic.baseMemoryScore = newScore;
  topic.lastRevisedAt = now;
  topic.revisionCount = 1;
  topic.stability = newStability;
  topic.difficulty = blendedDifficulty;

  await topic.save();

  res.json({
    message: "Great job! 🎉",
    improvementScore: newScore - scoreBeforeRevision, // +25 points!
    currentScore: newScore,
    nextRevisionDate: optimalRevisionDate.toDateString(),
    daysUntilNextRevision: 7
  });
}
```

Database State After Revision (Day 2 - Jan 8):

```json
{
  "topicName": "React Hooks",
  "baseMemoryScore": 85,
  "lastRevisedAt": "2026-01-08T14:30:00Z",
  "revisionCount": 1,
  "stability": 20.1,
  "difficulty": 0.145,
  "revisionHistory": [
    {
      "date": "2026-01-06T10:00:00Z",
      "scoreBeforeRevision": null,
      "scoreAfterRevision": 78,
      "daysSinceLastRevision": 0
    },
    {
      "date": "2026-01-08T14:30:00Z",
      "scoreBeforeRevision": 60,
      "scoreAfterRevision": 85,
      "daysSinceLastRevision": 2
    }
  ]
}
```

### **Step 5: Day 3 - Slower Decay (Day 3 - Jan 9)**

**Backend calculates:**

```javascript
// For "React Hooks"
const daysSinceRevision = 1; // Jan 9 - Jan 8
const retention = Math.exp(-1 / 20.1); // e^(-0.0498) = 0.951
const currentScore = 85 * 0.951 = 80.8 ≈ 81
```

**Comparison:**
- **Day 0 → Day 1:** 78 → 68 (lost 10 points)
- **Day 2 (after revision) → Day 3:** 85 → 81 (lost only 4 points!) ✅

**User sees:**

React Hooks: 81/100 ✅ (Review in 6 days)

## 4. Key Mathematical Differences

### **Before First Revision:**

- Stability: 7.54 days
- Daily decay rate: ~13.3% per day
- Memory drops fast!

### **After First Revision:**

- Stability: 20.1 days (2.67x longer!)
- Daily decay rate: ~4.98% per day
- Memory drops much slower! 🎯

---

## 5. Folder Structure Highlights

### `server/src/`
- **`controllers/topicController.js`**: Main logic for creating and revising topics.
- **`utils/memoryScore.js`**: Contains the pure math functions for weighting, decay, and date scheduling.
- **`models/Topic.js`**: Database schema enforcing structure (User ref, Score, Dates).

### `client/src/`
- **`components/TopicList.jsx`**: Displays the list of topics, visualized with color-coded scores.
- **`components/Modal.jsx`**: The popup form where users input their assessment scores (Q1-Q5).
