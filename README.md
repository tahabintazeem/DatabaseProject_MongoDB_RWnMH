# Remote Work and Mental Health: A MongoDB Database Project

## Overview

This project explores the relationship between remote work and mental health using a dataset sourced from Kaggle. The dataset contains information about employees' work conditions, mental health status, and related factors, such as work-life balance, stress levels, and company support for remote work. The goal is to derive meaningful insights through MongoDB queries and showcase the results for a database systems course.

## Project Objectives

- Understand the impact of remote work on mental health and related factors.
- Perform aggregation queries to analyze the dataset and derive insights.
- Store the query results as JSON files for further analysis or visualization.

## Dataset Description

**Source**: Kaggle  
**Number of Rows**: ~5000  
**Key Columns**:
- `Employee_ID`: Unique identifier for each employee.
- `Age`, `Gender`, `Job_Role`, `Industry`: Demographic and professional data.
- `Work_Location`: Remote, Hybrid, or Onsite.
- `Stress_Level`: High, Medium, or Low.
- `Mental_Health_Condition`: E.g., Anxiety, Depression.
- `Company_Support_for_Remote_Work`: Rating (1-5).
- Other factors like work-life balance, physical activity, and sleep quality.

**Download Link:**
https://www.kaggle.com/datasets/waqi786/remote-work-and-mental-health/data

## Setup Instructions

### Prerequisites

- **MongoDB**: Install [MongoDB](https://www.mongodb.com/try/download/community) and ensure it's running.
- **MongoDB Compass** or **VS Code**: For query execution and database management.
- **Node.js** (optional): If running the project with a script.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/remote-work-mental-health.git