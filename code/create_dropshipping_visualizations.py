#!/usr/bin/env python3
"""
Create visualizations for the US Dropshipping Market Analysis 2025
"""

import warnings
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd
from datetime import datetime

def setup_matplotlib_for_plotting():
    """
    Setup matplotlib and seaborn for plotting with proper configuration.
    Call this function before creating any plots to ensure proper rendering.
    """
    # Ensure warnings are printed
    warnings.filterwarnings('default')  # Show all warnings

    # Configure matplotlib for non-interactive mode
    plt.switch_backend("Agg")

    # Set chart style
    plt.style.use("seaborn-v0_8")
    sns.set_palette("husl")

    # Configure platform-appropriate fonts for cross-platform compatibility
    # Must be set after style.use, otherwise will be overridden by style configuration
    plt.rcParams["font.sans-serif"] = ["Noto Sans CJK SC", "WenQuanYi Zen Hei", "PingFang SC", "Arial Unicode MS", "Hiragino Sans GB"]
    plt.rcParams["axes.unicode_minus"] = False

def create_market_growth_chart():
    """Create market growth projection chart"""
    setup_matplotlib_for_plotting()
    
    # Market size data from sources
    years = [2022, 2023, 2024, 2025, 2026, 2027, 2030]
    market_size = [228.9, 286.4, 365.7, 459.6, 590.0, 718.9, 1265.2]  # in billions USD
    
    fig, ax = plt.subplots(figsize=(12, 8))
    
    # Create the growth line
    ax.plot(years, market_size, marker='o', linewidth=3, markersize=8, color='#2E86AB')
    ax.fill_between(years, market_size, alpha=0.3, color='#2E86AB')
    
    # Annotations for key points
    ax.annotate(f'${market_size[3]:.1f}B\n2025', 
                xy=(2025, market_size[3]), xytext=(2025, market_size[3] + 100),
                ha='center', va='bottom', fontsize=12, fontweight='bold',
                arrowprops=dict(arrowstyle='->', color='red', lw=2))
    
    ax.annotate(f'${market_size[-1]:.1f}B\n2030', 
                xy=(2030, market_size[-1]), xytext=(2030, market_size[-1] + 100),
                ha='center', va='bottom', fontsize=12, fontweight='bold',
                arrowprops=dict(arrowstyle='->', color='red', lw=2))
    
    ax.set_title('Global Dropshipping Market Growth Projection', fontsize=16, fontweight='bold', pad=20)
    ax.set_xlabel('Year', fontsize=14)
    ax.set_ylabel('Market Size (Billions USD)', fontsize=14)
    ax.grid(True, alpha=0.3)
    ax.set_ylim(0, max(market_size) * 1.2)
    
    # Format y-axis to show billions
    ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, p: f'${x:.0f}B'))
    
    plt.tight_layout()
    plt.savefig('/workspace/charts/dropshipping_market_growth.png', dpi=300, bbox_inches='tight')
    plt.close()

def create_profit_margin_comparison():
    """Create profit margin comparison chart"""
    setup_matplotlib_for_plotting()
    
    # Profit margin data from sources
    categories = ['Dropshipping\n(Average)', 'Private Label', 'Wholesale', 'Direct-to-Consumer']
    profit_margins = [20, 55, 35, 55]  # Average percentages
    colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
    
    fig, ax = plt.subplots(figsize=(10, 8))
    
    bars = ax.bar(categories, profit_margins, color=colors, alpha=0.8, edgecolor='white', linewidth=2)
    
    # Add value labels on bars
    for bar, margin in zip(bars, profit_margins):
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height + 1,
                f'{margin}%', ha='center', va='bottom', fontsize=12, fontweight='bold')
    
    ax.set_title('Profit Margin Comparison Across Business Models', fontsize=16, fontweight='bold', pad=20)
    ax.set_ylabel('Average Profit Margin (%)', fontsize=14)
    ax.set_ylim(0, max(profit_margins) * 1.2)
    ax.grid(True, alpha=0.3, axis='y')
    
    plt.tight_layout()
    plt.savefig('/workspace/charts/profit_margin_comparison.png', dpi=300, bbox_inches='tight')
    plt.close()

def create_product_category_chart():
    """Create product category market share chart"""
    setup_matplotlib_for_plotting()
    
    # Product category data from sources
    categories = ['Electronics & Media', 'Fashion', 'Food & Personal Care', 
                 'Toys, Hobby & DIY', 'Furniture & Appliances', 'Others']
    percentages = [34, 23, 11, 10, 9, 13]
    colors = ['#FF9999', '#66B2FF', '#99FF99', '#FFCC99', '#FF99CC', '#99CCFF']
    
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 8))
    
    # Pie chart
    wedges, texts, autotexts = ax1.pie(percentages, labels=categories, colors=colors, 
                                       autopct='%1.1f%%', startangle=90)
    ax1.set_title('Dropshipping Product Categories\nMarket Share 2025', fontsize=14, fontweight='bold')
    
    # Bar chart
    bars = ax2.bar(range(len(categories)), percentages, color=colors, alpha=0.8)
    ax2.set_xlabel('Product Categories', fontsize=12)
    ax2.set_ylabel('Market Share (%)', fontsize=12)
    ax2.set_title('Product Category Distribution', fontsize=14, fontweight='bold')
    ax2.set_xticks(range(len(categories)))
    ax2.set_xticklabels(categories, rotation=45, ha='right')
    
    # Add value labels on bars
    for bar, pct in zip(bars, percentages):
        height = bar.get_height()
        ax2.text(bar.get_x() + bar.get_width()/2., height + 0.5,
                f'{pct}%', ha='center', va='bottom', fontsize=10, fontweight='bold')
    
    ax2.grid(True, alpha=0.3, axis='y')
    
    plt.tight_layout()
    plt.savefig('/workspace/charts/product_categories.png', dpi=300, bbox_inches='tight')
    plt.close()

def create_consumer_delivery_preferences():
    """Create consumer delivery preferences chart"""
    setup_matplotlib_for_plotting()
    
    # Consumer preference data from McKinsey source
    delivery_times = ['Same Day\n($5-10 fee)', '1-2 Days\n($3-5 fee)', '3 Days\n(Free)', '4-7 Days\n(Free)', '7+ Days\n(Free)']
    willingness_pct = [5, 25, 90, 80, 55]  # Percentages willing to accept
    
    fig, ax = plt.subplots(figsize=(12, 8))
    
    bars = ax.bar(delivery_times, willingness_pct, color=['#FF4444', '#FF8844', '#44AA44', '#4488AA', '#8844AA'], 
                  alpha=0.8, edgecolor='white', linewidth=2)
    
    # Add value labels on bars
    for bar, pct in zip(bars, willingness_pct):
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height + 2,
                f'{pct}%', ha='center', va='bottom', fontsize=12, fontweight='bold')
    
    ax.set_title('US Consumer Willingness to Accept Different Delivery Times', 
                fontsize=16, fontweight='bold', pad=20)
    ax.set_ylabel('Percentage of Consumers Willing (%)', fontsize=14)
    ax.set_ylim(0, 100)
    ax.grid(True, alpha=0.3, axis='y')
    
    # Add note about cost vs speed preference
    ax.text(0.5, 0.95, 'Cost became #1 factor in 2024, overtaking speed', 
            transform=ax.transAxes, ha='center', va='top', 
            bbox=dict(boxstyle="round,pad=0.3", facecolor="yellow", alpha=0.7),
            fontsize=11, fontweight='bold')
    
    plt.tight_layout()
    plt.savefig('/workspace/charts/consumer_delivery_preferences.png', dpi=300, bbox_inches='tight')
    plt.close()

def create_advertising_cost_comparison():
    """Create advertising cost comparison chart"""
    setup_matplotlib_for_plotting()
    
    # Social media advertising costs from 2025 data
    platforms = ['TikTok', 'YouTube', 'Meta\n(FB/IG)', 'Snapchat']
    cpm_costs = [6.16, 3.67, 8.17, 8.37]  # CPM costs in USD
    colors = ['#FF0050', '#FF0000', '#1877F2', '#FFFC00']
    
    fig, ax = plt.subplots(figsize=(10, 8))
    
    bars = ax.bar(platforms, cpm_costs, color=colors, alpha=0.8, edgecolor='white', linewidth=2)
    
    # Add value labels on bars
    for bar, cost in zip(bars, cpm_costs):
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height + 0.1,
                f'${cost}', ha='center', va='bottom', fontsize=12, fontweight='bold')
    
    ax.set_title('Social Media Advertising Costs (CPM) - June 2025', 
                fontsize=16, fontweight='bold', pad=20)
    ax.set_ylabel('Cost per 1000 impressions (USD)', fontsize=14)
    ax.set_ylim(0, max(cpm_costs) * 1.2)
    ax.grid(True, alpha=0.3, axis='y')
    
    # Add efficiency note
    ax.text(0.5, 0.95, 'TikTok ads are 47% more efficient than Meta according to 2024 data', 
            transform=ax.transAxes, ha='center', va='top', 
            bbox=dict(boxstyle="round,pad=0.3", facecolor="lightblue", alpha=0.7),
            fontsize=10, fontweight='bold')
    
    plt.tight_layout()
    plt.savefig('/workspace/charts/advertising_costs.png', dpi=300, bbox_inches='tight')
    plt.close()

def create_seasonal_trends_chart():
    """Create seasonal trends chart"""
    setup_matplotlib_for_plotting()
    
    # Seasonal trend data (relative sales index, 100 = average)
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    sales_index = [85, 90, 95, 100, 98, 105, 110, 108, 102, 120, 180, 195]  # Q4 is peak
    
    fig, ax = plt.subplots(figsize=(14, 8))
    
    # Create line plot with area fill
    ax.plot(months, sales_index, marker='o', linewidth=3, markersize=8, color='#2E86AB')
    ax.fill_between(months, sales_index, alpha=0.3, color='#2E86AB')
    
    # Highlight Q4 peak season
    q4_months = [9, 10, 11]  # Oct, Nov, Dec indices
    q4_sales = [sales_index[i] for i in q4_months]
    ax.fill_between([months[i] for i in q4_months], q4_sales, alpha=0.6, color='red', label='Peak Season (Q4)')
    
    # Add annotations for key periods
    ax.annotate('Black Friday/\nCyber Monday Peak', 
                xy=('Nov', 180), xytext=('Sep', 200),
                ha='center', va='bottom', fontsize=11, fontweight='bold',
                arrowprops=dict(arrowstyle='->', color='red', lw=2))
    
    ax.annotate('Holiday Shopping\nPeak', 
                xy=('Dec', 195), xytext=('Oct', 220),
                ha='center', va='bottom', fontsize=11, fontweight='bold',
                arrowprops=dict(arrowstyle='->', color='red', lw=2))
    
    ax.set_title('Seasonal Dropshipping Sales Trends Throughout the Year', 
                fontsize=16, fontweight='bold', pad=20)
    ax.set_ylabel('Sales Index (100 = Average)', fontsize=14)
    ax.set_ylim(70, 230)
    ax.grid(True, alpha=0.3)
    ax.legend(loc='upper left')
    
    plt.tight_layout()
    plt.savefig('/workspace/charts/seasonal_trends.png', dpi=300, bbox_inches='tight')
    plt.close()

def create_success_factors_chart():
    """Create success factors importance chart"""
    setup_matplotlib_for_plotting()
    
    # Success factors based on case studies and analysis
    factors = ['Market Research', 'Product Selection', 'Customer Service', 'Marketing Strategy', 
              'Supplier Relations', 'Website UX', 'Profit Tracking', 'Brand Building']
    importance_scores = [95, 90, 85, 88, 82, 80, 78, 75]  # Importance out of 100
    
    fig, ax = plt.subplots(figsize=(12, 10))
    
    # Create horizontal bar chart
    bars = ax.barh(factors, importance_scores, color=plt.cm.viridis(np.linspace(0, 1, len(factors))))
    
    # Add value labels on bars
    for bar, score in zip(bars, importance_scores):
        width = bar.get_width()
        ax.text(width + 1, bar.get_y() + bar.get_height()/2,
                f'{score}%', ha='left', va='center', fontsize=11, fontweight='bold')
    
    ax.set_title('Critical Success Factors for Dropshipping Businesses', 
                fontsize=16, fontweight='bold', pad=20)
    ax.set_xlabel('Importance Score (out of 100)', fontsize=14)
    ax.set_xlim(0, 100)
    ax.grid(True, alpha=0.3, axis='x')
    
    plt.tight_layout()
    plt.savefig('/workspace/charts/success_factors.png', dpi=300, bbox_inches='tight')
    plt.close()

def main():
    """Create all visualizations"""
    # Create charts directory if it doesn't exist
    import os
    os.makedirs('/workspace/charts', exist_ok=True)
    
    print("Creating dropshipping market visualizations...")
    
    create_market_growth_chart()
    print("✓ Market growth chart created")
    
    create_profit_margin_comparison()
    print("✓ Profit margin comparison chart created")
    
    create_product_category_chart()
    print("✓ Product category chart created")
    
    create_consumer_delivery_preferences()
    print("✓ Consumer delivery preferences chart created")
    
    create_advertising_cost_comparison()
    print("✓ Advertising cost comparison chart created")
    
    create_seasonal_trends_chart()
    print("✓ Seasonal trends chart created")
    
    create_success_factors_chart()
    print("✓ Success factors chart created")
    
    print("\nAll visualizations created successfully!")
    print("Charts saved in /workspace/charts/")

if __name__ == "__main__":
    main()
