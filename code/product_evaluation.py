import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Set up the evaluation criteria and weights
criteria = {
    'trending_demand': {'weight': 0.20, 'description': 'Product is trending with high demand'},
    'not_local': {'weight': 0.15, 'description': 'Not easily found in local stores'},
    'shipping_tolerance': {'weight': 0.15, 'description': 'Customers willing to wait 7-10 days'},
    'sourcing': {'weight': 0.15, 'description': 'Easily sourceable from AliExpress/Alibaba'},
    'compact': {'weight': 0.15, 'description': 'Compact for affordable shipping'},
    'profit_potential': {'weight': 0.20, 'description': 'High profit potential'}
}

# Prepare list of candidate products identified from the research
product_candidates = [
    {
        'name': 'Blue Light Glasses',
        'category': 'Health & Wellness',
        'cost_price': 5.50,  # Average cost from research
        'selling_price': 30.00,  # Estimated market price
        'weight_kg': 0.1,
        'description': 'Glasses that filter blue light from screens, reducing eye strain for remote workers and digital device users.'
    },
    {
        'name': 'Portable Power Banks',
        'category': 'Electronics',
        'cost_price': 18.50,  # Average cost from research
        'selling_price': 52.50,  # Estimated market price
        'weight_kg': 0.4,
        'description': 'Compact portable chargers for mobile devices with fast charging capabilities.'
    },
    {
        'name': 'Wireless Charging Stations',
        'category': 'Electronics',
        'cost_price': 11.50,  # Average cost from research
        'selling_price': 37.50,  # Estimated market price
        'weight_kg': 0.3,
        'description': 'Multi-device wireless charging pads compatible with latest smartphones and accessories.'
    },
    {
        'name': 'Neck Massagers',
        'category': 'Health & Wellness',
        'cost_price': 3.08,  # From research
        'selling_price': 32.50,  # Estimated market price
        'weight_kg': 0.5,
        'description': 'Portable devices that provide pain relief for neck and shoulder tension.'
    },
    {
        'name': 'LED Light Strips',
        'category': 'Smart Home',
        'cost_price': 10.00,  # Estimated average
        'selling_price': 30.00,  # Estimated market price
        'weight_kg': 0.2,
        'description': 'App-controlled, color-changing LED strips for home decoration and ambient lighting.'
    },
    {
        'name': 'Facial Ice Bath Bowls',
        'category': 'Beauty & Personal Care',
        'cost_price': 5.78,  # From research
        'selling_price': 29.99,  # From research
        'weight_kg': 0.3,
        'description': 'Collapsible facial bowls for ice therapy, reducing puffiness and improving skin appearance.'
    },
    {
        'name': 'Portable Humidifiers',
        'category': 'Health & Wellness',
        'cost_price': 8.00,  # Estimated average
        'selling_price': 25.00,  # Estimated market price
        'weight_kg': 0.3,
        'description': 'Compact humidifiers for improving air quality, addressing dry skin and respiratory issues.'
    },
    {
        'name': 'Resistance Bands Sets',
        'category': 'Fitness',
        'cost_price': 3.13,  # From research
        'selling_price': 15.00,  # Estimated market price
        'weight_kg': 0.2,
        'description': 'Versatile exercise bands for home workouts with varying resistance levels.'
    },
    {
        'name': 'Wireless Earbuds',
        'category': 'Electronics',
        'cost_price': 14.00,  # Average from range
        'selling_price': 52.50,  # Average from range
        'weight_kg': 0.1,
        'description': 'Bluetooth wireless earbuds with charging case for smartphones and devices.'
    },
    {
        'name': 'Pet Cooling Mats',
        'category': 'Pet Products',
        'cost_price': 12.00,  # Estimated average
        'selling_price': 35.00,  # Estimated market price
        'weight_kg': 0.6,
        'description': 'Cooling pads that help pets regulate temperature during hot weather.'
    }
]

# Function to evaluate each product against our criteria
def evaluate_products(products, criteria):
    results = []
    
    for product in products:
        # Calculate profit margin
        profit_margin = (product['selling_price'] - product['cost_price']) / product['cost_price'] * 100
        
        # Score each criterion (scale of 1-10)
        evaluation = {
            'Product': product['name'],
            'Category': product['category'],
            'Cost Price': product['cost_price'],
            'Selling Price': product['selling_price'],
            'Profit Margin %': profit_margin,
            'Weight (kg)': product['weight_kg']
        }
        
        # Score criteria based on product attributes and research data
        # This is a simplified scoring based on the research files
        scores = {
            # Scoring logic based on research files
            'trending_demand': {
                'Blue Light Glasses': 9.8,  # High demand from remote workers
                'Portable Power Banks': 8.5,  # Consistent demand
                'Wireless Charging Stations': 8.7,  # Growing with wireless adoption
                'Neck Massagers': 9.2,  # Trending wellness product
                'LED Light Strips': 8.9,  # Strong TikTok presence
                'Facial Ice Bath Bowls': 8.3,  # Growing beauty trend
                'Portable Humidifiers': 8.6,  # Health consciousness trend
                'Resistance Bands Sets': 8.4,  # Home fitness trend
                'Wireless Earbuds': 9.0,  # Consistent tech demand
                'Pet Cooling Mats': 8.1,  # Seasonal but growing
            },
            'not_local': {
                'Blue Light Glasses': 9.5,  # Specialty item not common in stores
                'Portable Power Banks': 7.0,  # Available but limited options
                'Wireless Charging Stations': 7.5,  # Basic versions in stores
                'Neck Massagers': 9.0,  # Specialty types not common
                'LED Light Strips': 8.0,  # Basic versions available
                'Facial Ice Bath Bowls': 9.7,  # Rare in physical retail
                'Portable Humidifiers': 7.5,  # Basic versions in stores
                'Resistance Bands Sets': 7.0,  # Available but limited selection
                'Wireless Earbuds': 6.5,  # Common in stores but limited selection
                'Pet Cooling Mats': 9.0,  # Specialty pet stores only
            },
            'shipping_tolerance': {  # Based on market analysis data
                'Blue Light Glasses': 9.8,  # Non-urgent purchase
                'Portable Power Banks': 8.0,  # Some urgency
                'Wireless Charging Stations': 9.0,  # Non-urgent accessory
                'Neck Massagers': 9.2,  # Non-urgent wellness product
                'LED Light Strips': 9.5,  # Decorative, non-urgent
                'Facial Ice Bath Bowls': 9.3,  # Beauty product, non-urgent
                'Portable Humidifiers': 8.5,  # Some urgency for health
                'Resistance Bands Sets': 9.0,  # Non-urgent fitness
                'Wireless Earbuds': 7.5,  # Some urgency for tech
                'Pet Cooling Mats': 8.0,  # Seasonal urgency
            },
            'sourcing': {  # Based on sourcing analysis
                'Blue Light Glasses': 9.8,  # Abundant suppliers with quality
                'Portable Power Banks': 8.5,  # Many suppliers but need certifications
                'Wireless Charging Stations': 8.7,  # Good availability
                'Neck Massagers': 9.5,  # Excellent supplier options
                'LED Light Strips': 9.0,  # Many quality options
                'Facial Ice Bath Bowls': 8.5,  # Good availability
                'Portable Humidifiers': 8.8,  # Good supplier options
                'Resistance Bands Sets': 9.5,  # Excellent supplier base
                'Wireless Earbuds': 8.0,  # Many options but quality varies
                'Pet Cooling Mats': 8.5,  # Good supplier availability
            },
            'compact': {  # Based on weight and dimensions
                'Blue Light Glasses': 9.8,  # Very lightweight
                'Portable Power Banks': 8.0,  # Moderate weight
                'Wireless Charging Stations': 8.5,  # Relatively compact
                'Neck Massagers': 7.5,  # Moderately bulky
                'LED Light Strips': 9.0,  # Flexible and compact
                'Facial Ice Bath Bowls': 8.0,  # Collapsible but moderate
                'Portable Humidifiers': 8.5,  # Small size
                'Resistance Bands Sets': 9.5,  # Very compact
                'Wireless Earbuds': 9.8,  # Extremely compact
                'Pet Cooling Mats': 6.0,  # Relatively bulky
            },
            'profit_potential': {  # Based on margin and market size
                'Blue Light Glasses': 9.5,  # 300-500% margins
                'Portable Power Banks': 8.5,  # 180-250% margins
                'Wireless Charging Stations': 8.8,  # 200-300% margins
                'Neck Massagers': 9.8,  # 500%+ margins
                'LED Light Strips': 8.7,  # 200% margins
                'Facial Ice Bath Bowls': 9.0,  # 400% margins
                'Portable Humidifiers': 8.5,  # 212% margins
                'Resistance Bands Sets': 9.0,  # 300% margins
                'Wireless Earbuds': 8.7,  # 200-350% margins
                'Pet Cooling Mats': 8.2,  # 190% margins
            }
        }
        
        # Calculate weighted score for each criterion
        weighted_scores = {}
        total_score = 0
        
        for criterion, details in criteria.items():
            raw_score = scores[criterion][product['name']]
            weighted_score = raw_score * details['weight']
            weighted_scores[criterion] = weighted_score
            total_score += weighted_score
            
            # Add individual criterion scores to evaluation dictionary
            evaluation[f'{criterion}_score'] = raw_score
            
        # Add total weighted score
        evaluation['total_score'] = total_score
        evaluation['weighted_scores'] = weighted_scores
        
        results.append(evaluation)
    
    # Convert to DataFrame for analysis
    df = pd.DataFrame(results)
    
    # Sort by total score
    df = df.sort_values('total_score', ascending=False)
    
    return df

# Run the evaluation
results_df = evaluate_products(product_candidates, criteria)

# Create a directory for output if it doesn't exist
if not os.path.exists('charts'):
    os.makedirs('charts')

# Format results for display
print("Top Product Evaluation Results:")
formatted_results = results_df[['Product', 'Category', 'Cost Price', 'Selling Price', 
                               'Profit Margin %', 'Weight (kg)', 'total_score']].copy()
formatted_results = formatted_results.round(2)
formatted_results = formatted_results.sort_values('total_score', ascending=False)
print(formatted_results.to_string(index=False))

# Create a visualization of the top 5 products with scores for each criterion
top_5_products = results_df.head(5)['Product'].tolist()

# Create a DataFrame for visualization
vis_data = []
for product in top_5_products:
    product_row = results_df[results_df['Product'] == product].iloc[0]
    for criterion, details in criteria.items():
        vis_data.append({
            'Product': product,
            'Criterion': criterion,
            'Score': product_row[f'{criterion}_score'],
            'Weighted Score': product_row['weighted_scores'][criterion]
        })

vis_df = pd.DataFrame(vis_data)

# Create visualization
plt.figure(figsize=(12, 8))
sns.set_style('whitegrid')

# Create the grouped bar chart
sns.barplot(x='Criterion', y='Score', hue='Product', data=vis_df)

plt.title('Top 5 Products Evaluation by Criterion', fontsize=16)
plt.xlabel('Evaluation Criterion', fontsize=12)
plt.ylabel('Score (1-10)', fontsize=12)
plt.ylim(0, 10)
plt.legend(title='Product', loc='lower right')
plt.xticks(rotation=45)
plt.tight_layout()

# Save the chart
plt.savefig('charts/product_evaluation_analysis.png', dpi=300, bbox_inches='tight')

# Create a summary of the top product
top_product = results_df.iloc[0]
print(f"\nTop Recommended Product: {top_product['Product']}")
print(f"Overall Score: {top_product['total_score']:.2f}/10")
print(f"Category: {top_product['Category']}")
print(f"Cost Price: ${top_product['Cost Price']:.2f}")
print(f"Selling Price: ${top_product['Selling Price']:.2f}")
print(f"Profit Margin: {top_product['Profit Margin %']:.2f}%")
print(f"Weight: {top_product['Weight (kg)']:.2f} kg")

# Save results to CSV
results_df.to_csv('product_evaluation_results.csv', index=False)

print("\nAnalysis complete. Results saved to product_evaluation_results.csv")
print("Visualization saved to charts/product_evaluation_analysis.png")
