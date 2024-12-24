import json
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
import logging
import textwrap
import numpy as np

# Set up basic logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Input and output file paths
input_file_path = 'query-results.json'  # Replace with your file path
output_pdf_path = 'advanced_visualizations.pdf'

# Function to extract nested data
def extract_data(data, key, value_col):
    if not isinstance(data, list):
        logging.error(f"Error: Data for key {key} is not a list.")
        return None

    extracted_data = []
    for item in data:
        if isinstance(item, dict):
            label = item.get('label', item.get('_id', 'Unknown'))
            extracted_data.append({
                '_id': item.get('_id', 'Unknown'),
                value_col: item.get(value_col, 0),
                'label': label
            })
        else:
            logging.warning(f"Warning: Non-dict item in data for key {key}.")

    return pd.DataFrame(extracted_data) if extracted_data else None

# Auto-visualization function
def auto_visualize(data, key, pdf):
    try:
        if not data:
            logging.warning(f"No data for key: {key}")
            return

        if isinstance(data, list):
            df = pd.DataFrame(data)
            
            if not df.empty:
                # If numerical data, plot correlations or distributions
                if df.select_dtypes(include=[np.number]).shape[1] > 1:
                    plt.figure(figsize=(12, 8))
                    sns.heatmap(df.corr(), annot=True, fmt=".2f", cmap="coolwarm", cbar_kws={'shrink': 0.8})
                    plt.title(f"Correlation Heatmap for {key}", fontsize=16, fontweight="bold")
                    pdf.savefig()
                    plt.show()
                else:
                    numerical_cols = df.select_dtypes(include=[np.number]).columns
                    for col in numerical_cols:
                        plt.figure(figsize=(10, 6))
                        sns.histplot(df[col], kde=True, bins=20, color="blue", edgecolor="black")
                        plt.title(f"Distribution of {col} in {key}", fontsize=16, fontweight="bold")
                        plt.xlabel(col, fontsize=14)
                        plt.ylabel("Frequency", fontsize=14)
                        plt.grid(axis="y", linestyle="--", alpha=0.7)
                        pdf.savefig()
                        plt.show()

                # Categorical and numerical combination
                if 'label' in df.columns and df.select_dtypes(include=[np.number]).shape[1] == 1:
                    numerical_col = df.select_dtypes(include=[np.number]).columns[0]
                    plt.figure(figsize=(12, 8))
                    sns.barplot(x='label', y=numerical_col, data=df, palette='coolwarm', edgecolor='black')
                    plt.title(f"Bar Chart of {numerical_col} by Labels in {key}", fontsize=16, fontweight="bold")
                    plt.xticks(rotation=45, ha='right')
                    pdf.savefig()
                    plt.show()
        elif isinstance(data, dict):
            keys = list(data.keys())
            if len(keys) == 2:
                plt.figure(figsize=(10, 6))
                sns.scatterplot(x=keys[0], y=keys[1], data=pd.DataFrame(data))
                plt.title(f"Scatter Plot of {keys[0]} vs {keys[1]} in {key}", fontsize=16, fontweight="bold")
                pdf.savefig()
                plt.show()

    except Exception as e:
        logging.error(f"Error visualizing {key}: {e}")

# Load JSON data
with open(input_file_path, 'r') as f:
    data = json.load(f)

# Save visualizations to PDF
with PdfPages(output_pdf_path) as pdf:
    for key, value in data.items():
        auto_visualize(value, key, pdf)

print(f"Visualizations saved to {output_pdf_path}")
