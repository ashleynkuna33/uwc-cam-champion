
UWC CAM Champion

A smart Course Average Mark (CAM) calculator built for university students to track academic performance, predict outcomes, and stay on top of assessments.


Overview

UWC CAM Champion helps students manage their coursework by calculating weighted averages and projecting final marks based on current performance. Instead of guessing "am I passing?", this tool gives real-time clarity on where you stand.

Features

Module Tracking — Add modules with their respective weights and organize all courses in one place.
CAM Calculation — Automatically computes weighted averages and supports tests, assignments, tutorials, and practicals.
Mark Projections — Predict final marks based on upcoming assessments and see what you need to score to pass or get distinctions.
Assessment Reminders — Track upcoming deadlines and avoid missing tests or submissions.
Progress Monitoring — Visualize performance trends and identify weak areas early.

Tech Stack

Frontend: React + Vite
Backend: Spring Boot (Java)
Database: MySQL

Installation

bash# Clone the repo
git clone https://github.com/ashleynkuna33/uwc-cam-champion.git

# Navigate into the project
cd uwc-cam-champion

# Install frontend dependencies
cd frontend
npm install

# Run the frontend
npm start

# Backend setup
cd ../backend

# Ensure you have Java 17+ and Maven installed
# Configure your MySQL connection in src/main/resources/application.properties

# Build and run the Spring Boot backend
./mvnw spring-boot:run
# On Windows:
mvnw.cmd spring-boot:run
Usage

Add your modules
Input assessment weights (tests, assignments, etc.)
Enter your marks as you receive them
View your current CAM, required marks for targets, and upcoming deadlines

Goal
To help students avoid last-minute panic, make data-driven academic decisions, and stay consistent throughout the semester.
Future Improvements

Push notifications
Mobile-first UI
Performance graphs
Collaboration features
User authentication and dashboards

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.
License
MIT License
Notes
The success of this tool depends on simplicity, accuracy in calculations, and fast performance. If the user experience feels complicated or slow, students are unlikely to keep using it.
Author
Built for students, by a student.
