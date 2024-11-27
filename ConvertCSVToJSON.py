import pandas as pd

# Load your CSV file
file_path = "Impact_of_Remote_Work_on_Mental_Health.csv"
data = pd.read_csv(file_path)

# Convert to JSON
json_file = "Impact_of_Remote_Work.json"
data.to_json(json_file, orient="records", lines=True)
