BigQuery is a fully managed, AI-ready data platform that helps you manage and analyze your data with built-in features like machine learning, search, geospatial analysis, and business intelligence. BigQuery's serverless architecture lets you use languages like SQL and Python to answer your organization's biggest questions with zero infrastructure management.

BigQuery provides a uniform way to work with both structured and unstructured data and supports open table formats like Apache Iceberg, Delta, and Apache Hudi. BigQuery streaming supports continuous data ingestion and analysis while BigQuery's scalable, distributed analysis engine lets you query terabytes in seconds and petabytes in minutes.

BigQuery offers built-in governance capabilities that let you discover and curate data, and manage metadata and data quality. Through features like semantic search and data lineage, you can find and validate relevant data for analysis. You can share data and AI assets across your organization with the benefits of access control. These features are powered by Knowledge Catalog, which is a unified, intelligent governance solution for data and AI assets in Google Cloud.

BigQuery's architecture consists of two parts: a storage layer that ingests, stores, and optimizes data and a compute layer that provides analytics capabilities. These compute and storage layers efficiently operate independently of each other thanks to Google's petabit-scale network that enables the necessary communication between them.

Legacy databases usually have to share resources between read and write operations and analytical operations. This can result in resource conflicts and can slow queries while data is written to or read from storage. Shared resource pools can become further strained when resources are required for database management tasks such as assigning or revoking permissions. BigQuery's separation of compute and storage layers lets each layer dynamically allocate resources without impacting the performance or availability of the other.

This separation principle lets BigQuery innovate faster because storage and compute improvements can be deployed independently, without downtime or negative impact on system performance. It is also essential to offering a fully managed serverless data warehouse in which the BigQuery engineering team handles updates and maintenance. The result is that you don't need to provision or manually scale resources, leaving you free to focus on delivering value instead of traditional database management tasks.

BigQuery interfaces include Google Cloud console interface and the BigQuery command-line tool. Developers and data scientists can use client libraries with familiar programming including Python, Java, JavaScript, and Go, as well as BigQuery's REST API and RPC API to transform and manage data. ODBC and JDBC drivers provide interaction with existing applications including third-party tools and utilities.

As a data analyst, data engineer, data warehouse administrator, or data scientist, BigQuery helps you load, process, and analyze data to inform critical business decisions.

## Get started with BigQuery

You can start exploring BigQuery in minutes. Take advantage of BigQuery's free usage tier or no-cost sandbox to start loading and querying data.

* BigQuery sandbox: Get started in the BigQuery sandbox, risk-free and at no cost.
* Public datasets: Experience BigQuery's performance by exploring large, real-world data from the Public Datasets Program.
* Google Cloud console quickstart: Familiarize yourself with the power of the BigQuery Studio.

## Explore BigQuery

BigQuery's serverless infrastructure lets you focus on your data instead of resource management. BigQuery combines a cloud-based data warehouse and powerful analytic tools.

### BigQuery storage

BigQuery stores data using a columnar storage format that is optimized for analytical queries. BigQuery presents data in tables, rows, and columns and provides full support for database transaction semantics (ACID). BigQuery storage is automatically replicated across multiple locations to provide high availability.

* Learn about common patterns to organize BigQuery resources in the data warehouse and data marts.
* Learn about datasets, BigQuery's top-level container of tables and views.
* BigQuery Data Transfer Service automates data ingestion.
* Load data into BigQuery using:
 * Stream data with the Storage Write API.
 * Batch-load data from local files or Cloud Storage using formats that include: Avro, Parquet, ORC, CSV, JSON, Datastore, and Firestore formats.

For more information, see Overview of BigQuery storage.

### BigQuery analytics

Descriptive and prescriptive analysis uses include business intelligence, ad hoc analysis, geospatial analytics, and machine learning. You can query data stored in BigQuery or run queries on data where it lives using external tables or federated queries including Cloud Storage, Bigtable, Spanner, or Google Sheets stored in Google Drive.

* ANSI-standard SQL queries (ISO/IEC 9075 support) including support for joins, nested and repeated fields, analytic and aggregation functions, multi-statement queries, and a variety of spatial functions with geospatial analytics - Geographic Information Systems.
* Pandas-compatible Python API, provided by BigQuery DataFrames.
* Create views to share your analysis.
* Business intelligence tool support including BI Engine with Data Studio, Looker, Google Sheets, and 3rd party tools like Tableau and Power BI.
* BigQuery ML provides machine learning and predictive analytics.
* BigQuery Studio offers features such as Python notebooks, and version control for both notebooks and saved queries. These features make it easier for you to complete your data analysis and machine learning (ML) workflows in BigQuery.
* Query data outside of BigQuery with federated queries and external tables.

For more information, see Overview of BigQuery analytics.

### BigQuery administration

BigQuery provides centralized management of data and compute resources while Identity and Access Management (IAM) helps you secure those resources with the access model that's used throughout Google Cloud. Google Cloud security best practices provide a solid yet flexible approach that can include perimeter security or more complex and granular defense-in-depth approach.

* Intro to data security and governance helps you understand data governance, and what controls you might need to secure BigQuery resources.
* Jobs are actions that BigQuery runs on your behalf to load, export, query, or copy data.
* Reservations let you switch between on-demand pricing and capacity-based pricing.

For more information, see Introduction to BigQuery administration.

## BigQuery resources

Explore BigQuery resources:

* Release notes provide change logs of features, changes, and deprecations.
* Pricing for analysis and storage. See also: BigQuery ML, BI Engine, and Data Transfer Service pricing.
* Locations define where you create and store datasets (regional and multi-region locations).
* Stack Overflow hosts an engaged community of developers and analysts working with BigQuery.
* BigQuery Support provides help with BigQuery.
* Google BigQuery: The Definitive Guide: Data Warehousing, Analytics, and Machine Learning at Scale by Valliappa Lakshmanan and Jordan Tigani, explains how BigQuery works and provides an end-to-end walkthrough on how to use the service.

### APIs, tools, and references

Reference materials for BigQuery developers and analysts:

* BigQuery API and client libraries present overviews of BigQuery's features and their use.
* SQL query syntax for details about using GoogleSQL.
* BigQuery DataFrames API reference for details about using the pandas-compatible Python API.
* BigQuery code samples provide hundreds of snippets for client libraries in C#, Go, Java, Node.js, Python, Ruby. Or view the sample browser.
* DML, DDL, and user-defined functions (UDF) syntax lets you manage and transform your BigQuery data.
* bq command-line tool reference documents the syntax, commands, flags, and arguments for the `bq` CLI interface.
* ODBC / JDBC integration connect BigQuery to your existing tooling and infrastructure.

## Gemini in BigQuery features

Gemini in BigQuery is part of the Gemini for Google Cloud product suite which provides AI-powered assistance to help you work with your data.

Gemini in BigQuery provides AI assistance to help you do the following:

* **Explore and understand your data with data insights**. Data insights offers an automated, intuitive way to uncover patterns and perform statistical analysis by using insightful queries that are generated from the metadata of your tables. This feature is especially helpful in addressing the cold-start challenges of early data exploration. For more information, see Generate data insights in BigQuery.
* **Discover, transform, query, and visualize data with BigQuery data canvas**. You can use natural language with Gemini in BigQuery, to find, join, and query table assets, visualize results, and seamlessly collaborate with others throughout the entire process. For more information, see Analyze with data canvas.
* **Get assisted SQL and Python data analysis**. You can use Gemini in BigQuery to generate or suggest code in either SQL or Python, and to explain an existing SQL query. You can also use natural language queries to begin data analysis. To learn how to generate, complete, and summarize code, see the following documentation: 
 * SQL code assist
 * Use the SQL generation tool
 * Prompt to generate SQL queries
 * Generate SQL queries with Gemini Cloud Assist (Preview)
 * Convert comments to SQL (Preview)
 * Complete a SQL query (Preview)
 * Explain a SQL query
 * Python code assist
 * Generate Python code with the code generation tool
 * Generate Python code with Gemini Cloud Assist (Preview)
 * Python code completion
 * Generate BigQuery DataFrames Python code (Preview)
* **Prepare data for analysis**. Data preparation in BigQuery gives you context aware, AI-generated transformation recommendations to cleanse data for analysis. For more information, see Prepare data with Gemini.
* **Customize your SQL translations with translation rules**. (Preview) Create Gemini-enhanced translation rules to customize your SQL translations when using the interactive SQL translator. You can describe changes to the SQL translation output using natural language prompts or specify SQL patterns to find and replace. For more information, see Create a translation rule.

To learn how to set up Gemini in BigQuery, see Set up Gemini in BigQuery.

## BigQuery roles and resources

BigQuery addresses the needs of data professionals across the following roles and responsibilities.

### Data Analyst

Task guidance to help if you need to do the following:

* Query BigQuery data using interactive or batch queries using SQL query syntax
* Analyze and transform BigQuery data using the pandas-compatible BigQuery DataFrames API.
* Reference SQL functions, operators, and conditional expressions to query data
* Use tools to analyze and visualize BigQuery data including: Looker, Data Studio, and Google Sheets.
 
* Use geospatial analytics to analyze and visualize geospatial data with BigQuery's Geographic Information Systems
 
* Optimize query performance using:
 
 * Partitioned tables: Prune large tables based on time or integer ranges.
 * Materialized views: Define cached views to optimize queries or provide persistent results.
 * BI Engine: BigQuery's fast, in-memory analysis service.

### Data Administrator

Task guidance to help if you need to do the following:

* Manage costs with reservations to balance on-demand and capacity-based pricing.
* Understand data security and governance to help secure data by dataset, table, column, row, or view
* Backup data with table snapshots to preserve the contents of a table at a particular time.
* View BigQuery INFORMATION\_SCHEMA to understand the metadata of datasets, jobs, access control, reservations, tables and more.
* Use Jobs to have BigQuery load, export, query, or copy data are actions on your behalf.
* Monitor logs and resources to understand BigQuery and workloads.

For more information, see Introduction to BigQuery administration.

To take a tour of BigQuery data administration features directly in the Google Cloud console, click **Take the tour**.

Take the tour

### Data Scientist

Task guidance to help if you need to use BigQuery ML's machine learning to do the following:

* Understand the end-to-end user journey for machine learning models
* Manage access control for BigQuery ML
* Create and train a BigQuery ML models including:
 * Linear regression forecasting
 * Binary logistic and multiclass logistic regression classifications
 * K-means clustering for data segmentation
 * Time series forecasting with ARIMA+ models

### Data Developer

Task guidance to help if you need to do the following:

* Load data into BigQuery with:
 * batch-load data for Avro, Parquet, ORC, CSV, JSON , Datastore , and Firestore formats
 * BigQuery Data Transfer Service
 * BigQuery Storage Write API
* Use code sample library including:
 
 * Connection samples
 * Reservation sample
 * Storage code samples
* Google Cloud sample browser (scoped for BigQuery)
 
* APIs and Libraries Overview
 
* ODBC / JDBC integration

## What's next

* For an overview of BigQuery storage, see Overview of BigQuery storage.
* For an overview of BigQuery queries, see Overview of BigQuery analytics.
* For an overview of BigQuery administration, see Introduction to BigQuery administration.
* For an overview of BigQuery security, see Overview of data security and governance.
