# Remote Work and Mental Health: A MongoDB Database Project

## Overview

This project explores the relationship between remote work and mental health using a dataset sourced from Kaggle. The dataset contains information about employees' work conditions, mental health status, and related factors, such as work-life balance, stress levels, and company support for remote work. The goal is to derive meaningful insights through MongoDB queries and showcase the results for a database systems course. Additionally, the project now features advanced visualizations of query results using Python.

## Project Objectives

- Understand the impact of remote work on mental health and related factors.
- Perform aggregation queries to analyze the dataset and derive insights.
- Store the query results as JSON files for further analysis or visualization.
- Create visualizations of the query results using Python and save them as a comprehensive PDF file.

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
- **Python**: Install Python 3.x and the following libraries: Matplotlib, Seaborn, Pandas, PyPDF2.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/remote-work-mental-health.git
   ```

2. Import the dataset into MongoDB:
   ```bash
   mongoimport --db RW&MH --collection relation --type csv --headerline --file /path/to/dataset.csv
   ```

3. Open and execute the queries in the `queries.mongodb.js` file using VS Code or Compass.

4. Run the Python script to generate visualizations:
   ```bash
   python generate_visualizations.py
   ```

5. Access the generated PDF containing the visualizations:
   - File name: `advanced_visualizations.pdf`

### Queries

Queries are saved as:

- Project Queries.mongodb

### Query Outputs

Query results are saved as:

- Combined results: `query-results.json`
- Individual query results: `q1.json` to `q12.json`

### Visualization Outputs

Visualizations are created based on query results and saved in:

- `advanced_visualizations.pdf`

### Future Enhancements

**Frontend:** Build an interface (e.g., with React.js) for interactive query execution, visualization, and result display.

### Contribution

This project is open for collaboration!  
Feel free to fork, clone, or contribute by submitting a pull request.

For questions or feedback, contact:

Name: Taha Bin Tazeem  
GitHub: @tahabintazeem  

### License

This project is licensed under the MIT License.