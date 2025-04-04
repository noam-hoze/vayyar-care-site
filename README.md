# Vayyar Care Mockup

This prototype demonstrates a ChatGPT-powered healthcare assistant for nursing staff.

### App Layout Overview

The mobile application follows a ChatGPT-like interface with the following components:
- **Main Chat Interface**: Nurses can ask questions and receive both conversational text responses and formatted information cards when appropriate - similar to ChatGPT for healthcare
- **Control Panel**: Quick stats for Alerts, Critical cases, and Monitored patients
- **Information Cards**: Display room number, icon, and description for each alert
- **Suggestions**: Contextual recommendations and links (e.g., "Watchlist")
- **Input Bar**: Features VayyarCare GPT input with voice activation

### Scene Flow

#### Scene 1: Shift Start
**Description**: The nurse sees the shift summary and can access the watchlist.

**Screen Components**:
- Name: "Start Shift"
- Content: Clean textual shift summary provided by GPT
- Suggestion: Watchlist link

**Action**: Click on Watchlist

**Next Screen**:
- Name: "Watchlist" 
- Content: Cards with icons, room numbers, and descriptions

#### Scene 2: Morning Routine
**Description**: The nurse navigates the watchlist and receives a live alert. A red dot flickers on the fall alert. Clicking the alert shows a real-time point cloud view of the room.

**Screen Components**:
- Name: "Morning Routine"
- Content: Card with icon, room number, and description: "Unsupervised bed exit detected"

**Action**: Click on room card

**Next Screen**:
- Name: "Live View"
- Content: Point cloud visualization of the room

**Comments**:
- Connect between scene 2 and 3

#### Scene 3: Gait Tracking
**Description**: Display of a single alert with three data points on patient mobility.

**Screen Components**:
- Name: "Gait Tracking"
- Content: Card with icon, room number, and mobility metrics (speed, stride irregularity)
- Suggestion: "PT Evaluation" recommendation in natural language

**Comments**:
- Connect between scene 3 and 4


#### Scene 4: Bathroom Pattern Detection
**Description**: Nurse receives an alert about unusual bathroom activity for a patient.

**Screen Components**:
- Name: "Bathroom Pattern"
- Content: Card showing "In the past 5 hours, John has been going to the bathroom more than 3 times"
- Suggestion: "Check for UTI symptoms" in natural language

#### Scene 5: Documentation
**Description**: Nurse reviews pre-filled report suggestions at desk and approves them.

**Screen Components**:
- Name: "Documentation"
- Content: Data summaries and automated report suggestions

#### Scene 6: Team Huddle
**Description**: Team meeting with shared tablet view showing comparison graphs.

**Screen Components**:
- Name: "Team Huddle"
- Content: Cards displaying analytical conclusions and trends

#### Scene 7: Handoff
**Description**: Nurse completes shift handover with a summary interface.

**Screen Components**:
- Name: "Handoff"
- Content: Cards with conclusive summaries of shift activities

#### Scene 8: Night Mode
**Description**: Darker UI for nighttime with silent notifications and sleep indicators.

**Screen Components**:
- Name: "Night Mode"
- Content: Standard alert cards with subdued styling

#### Scene 9: Next Morning
**Description**: Beginning of new shift with comprehensive data overview.

**Screen Components**:
- Name: "Next Morning"
- Content: Complete shift summary
