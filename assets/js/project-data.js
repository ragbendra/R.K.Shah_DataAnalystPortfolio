// Shared project data for use across the portfolio
const projectData = {
  dataVisualization: [
    {
      id: "vizProject1",
      title: "Interactive Dashboard",
      description: "An interactive dashboard for visualizing sales performance data using D3.js.",
      thumbnail: "../assets/images/DataVisualization/CustomerSegmentation/AvgPricePerUnit.png",
      category: "interactive-visualization",
      modalId: "vizModal1",
      githubLink: "https://github.com/yourusername/interactive-dashboard",
      slides: [
        {
          image: "../assets/images/DataVisualization/CustomerSegmentation/TransactionsTime.png",
          alt: "Data Viz Project 1 - Image 1"
        },
        {
          image: "../assets/images/DataVisualization/CustomerSegmentation/UniqueCustomers.png",
          alt: "Data Viz Project 1 - Image 2"
        },
        {
          image: "../assets/images/DataVisualization/CustomerSegmentation/AvgUnitPerCust.png",
          alt: "Data Viz Project 1 - Image 3"
        }
      ],
      tags: ["D3.js", "Interactive Visualization", "Data Dashboard", "JavaScript"]
    },
    {
      id: "vizProject2",
      title: "COVID-19 Data Visualization",
      description: "Visualizing COVID-19 trends using interactive charts built with Chart.js.",
      thumbnail: "../assets/images/DataVisualization/CustomerSegmentation/UniqueCustomers.png",
      category: "data-analysis",
      modalId: "vizModal2",
      githubLink: "https://github.com/yourusername/covid-visualization",
      slides: [
        {
          image: "../assets/images/DataVisualization/CustomerSegmentation/viz-project2.jpg",
          alt: "Data Viz Project 2 - Image 1"
        },
        {
          image: "../assets/images/DataVisualization/CustomerSegmentation/viz-project2-2.jpg",
          alt: "Data Viz Project 2 - Image 2"
        },
        {
          image: "../assets/images/DataVisualization/CustomerSegmentation/viz-project2-3.jpg",
          alt: "Data Viz Project 2 - Image 3"
        }
      ],
      tags: ["Chart.js", "COVID-19 Data", "Time Series Analysis", "Interactive Charts"]
    }
  ],
  
  powerBI: [
    {
      id: "powerbiProject1",
      title: "Sales Performance Dashboard",
      description: "A comprehensive sales performance dashboard built using Power BI to track key metrics and trends.",
      thumbnail: "../assets/images/PowerBI/SalesDashboard/sales_dashboard.png",
      category: "business-intelligence",
      modalId: "powerbiModal1",
      githubLink: "https://github.com/yourusername/powerbi-sales-dashboard",
      slides: [
        {
          image: "../assets/images/PowerBI/SalesDashboard/powerbi-project1.jpg",
          alt: "Power BI Project 1 - Image 1"
        },
        {
          image: "../assets/images/PowerBI/SalesDashboard/powerbi-project1-2.jpg",
          alt: "Power BI Project 1 - Image 2"
        },
        {
          image: "../assets/images/PowerBI/SalesDashboard/powerbi-project1-3.jpg",
          alt: "Power BI Project 1 - Image 3"
        }
      ],
      tags: ["Power BI", "Business Intelligence", "Data Analytics", "Dashboards"]
    },
    {
      id: "powerbiProject2",
      title: "Customer Segmentation Analysis",
      description: "Analyzed customer behavior and segmented customers based on purchasing patterns using Power BI.",
      thumbnail: "../assets/images/PowerBI/CustomerSegmentation/customer_segmentation.png",
      category: "data-analytics",
      modalId: "powerbiModal2",
      githubLink: "https://github.com/yourusername/powerbi-customer-segmentation",
      slides: [
        {
          image: "../assets/images/PowerBI/CustomerSegmentation/powerbi-project2.jpg",
          alt: "Power BI Project 2 - Image 1"
        },
        {
          image: "../assets/images/PowerBI/CustomerSegmentation/powerbi-project2-2.jpg",
          alt: "Power BI Project 2 - Image 2"
        },
        {
          image: "../assets/images/PowerBI/CustomerSegmentation/powerbi-project2-3.jpg",
          alt: "Power BI Project 2 - Image 3"
        }
      ],
      tags: ["Power BI", "Customer Segmentation", "Data Analytics", "Behavioral Insights"]
    }
  ],
  
  // Add other project categories as needed (SQL, Machine Learning, etc.)
};

// Export the data for use in other files
export default projectData;