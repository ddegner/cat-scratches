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

* [BigQuery sandbox](/bigquery/docs/sandbox): Get started in the BigQuery sandbox, risk-free and at no cost.
* [Public datasets](/bigquery/public-data): Experience BigQuery's performance by exploring large, real-world data from the Public Datasets Program.
* [Google Cloud console quickstart](/bigquery/docs/quickstarts/quickstart-web-ui): Familiarize yourself with the power of the BigQuery Studio.

## Explore BigQuery

BigQuery's serverless infrastructure lets you focus on your data instead of resource management. BigQuery combines a cloud-based data warehouse and powerful analytic tools.

### BigQuery storage

BigQuery stores data using a columnar storage format that is optimized for analytical queries. BigQuery presents data in tables, rows, and columns and provides full support for database transaction semantics ([ACID](https://en.wikipedia.org/wiki/ACID)). BigQuery storage is automatically replicated across multiple locations to provide high availability.

* [Learn about common patterns to organize BigQuery resources](/bigquery/docs/resource-hierarchy#patterns) in the data warehouse and data marts.
* [Learn about datasets](/bigquery/docs/datasets-intro), BigQuery's top-level container of tables and views.
* [BigQuery Data Transfer Service](/bigquery/docs/dts-introduction) automates data ingestion.
* [Load data into BigQuery](/bigquery/docs/loading-data) using:
    * [Stream data](/bigquery/docs/streaming-data-into-bigquery) with the [Storage Write API](/bigquery/docs/write-api).
    * [Batch-load data](/bigquery/docs/batch-loading-data) from local files or Cloud Storage using formats that include: [Avro](/bigquery/docs/loading-data-cloud-storage-avro), [Parquet](/bigquery/docs/loading-data-cloud-storage-parquet), [ORC](/bigquery/docs/loading-data-cloud-storage-orc), [CSV](/bigquery/docs/loading-data-cloud-storage-csv), [JSON](/bigquery/docs/loading-data-cloud-storage-json), [Datastore](/bigquery/docs/loading-data-cloud-datastore), and [Firestore](/bigquery/docs/loading-data-cloud-firestore) formats.

For more information, see [Overview of BigQuery storage](/bigquery/docs/storage_overview).

### BigQuery analytics

Descriptive and prescriptive analysis uses include business intelligence, ad hoc analysis, geospatial analytics, and machine learning. You can query data stored in BigQuery or run queries on data where it lives using external tables or federated queries including Cloud Storage, Bigtable, Spanner, or Google Sheets stored in Google Drive.

* ANSI-standard SQL queries ([ISO/IEC 9075 support](https://www.iso.org/standard/76583.html)) including support for joins, nested and repeated fields, analytic and aggregation functions, multi-statement queries, and a variety of spatial functions with geospatial analytics - Geographic Information Systems.
* Pandas-compatible Python API, provided by [BigQuery DataFrames](/bigquery/docs/dataframes-quickstart).
* [Create views](/bigquery/docs/views-intro) to share your analysis.
* Business intelligence tool support including [BI Engine](/bigquery/docs/bi-engine-intro) with [Data Studio](/bigquery/docs/visualize-looker-studio), [Looker](/bigquery/docs/looker), [Google Sheets](/bigquery/docs/connected-sheets), and 3rd party tools like Tableau and Power BI.
* [BigQuery ML](/bigquery/docs/bqml-introduction) provides machine learning and predictive analytics.
* [BigQuery Studio](/bigquery/docs/query-overview#bigquery-studio) offers features such as Python notebooks, and version control for both notebooks and saved queries. These features make it easier for you to complete your data analysis and machine learning (ML) workflows in BigQuery.
* [Query data outside of BigQuery](/bigquery/external-data-sources) with [federated queries](/bigquery/docs/federated-queries-intro) and [external tables](/bigquery/docs/external-tables).

For more information, see [Overview of BigQuery analytics](/bigquery/docs/query-overview).

### BigQuery administration

BigQuery provides centralized management of data and compute resources while [Identity and Access Management (IAM)](/iam/docs) helps you secure those resources with the access model that's used throughout Google Cloud. [Google Cloud security best practices](https://cloud.google.com/security/best-practices) provide a solid yet flexible approach that can include perimeter security or more complex and granular [defense-in-depth approach](https://cloud.google.com/security/overview/whitepaper#technology_with_security_at_its_core).

* [Intro to data security and governance](/bigquery/docs/data-governance) helps you understand data governance, and what controls you might need to secure BigQuery resources.
* [Jobs](/bigquery/docs/managing-jobs) are actions that BigQuery runs on your behalf to load, export, query, or copy data.
* [Reservations](/bigquery/docs/reservations-intro) let you switch between on-demand pricing and capacity-based pricing.

For more information, see [Introduction to BigQuery administration](/bigquery/docs/admin-intro).

## BigQuery resources

Explore BigQuery resources:

* [Release notes](/bigquery/docs/release-notes) provide change logs of features, changes, and deprecations.
* [Pricing](https://cloud.google.com/bigquery/pricing) for analysis and storage. See also: [BigQuery ML](https://cloud.google.com/bigquery/pricing#bqml), [BI Engine](https://cloud.google.com/bigquery/pricing#bi_engine_pricing), and [Data Transfer Service](https://cloud.google.com/bigquery/pricing#data-transfer-service-pricing) pricing.
* [Locations](/bigquery/docs/locations) define where you create and store datasets (regional and multi-region locations).
* [Stack Overflow](https://stackoverflow.com/questions/tagged/google-bigquery) hosts an engaged community of developers and analysts working with BigQuery.
* [BigQuery Support](/bigquery/docs/getting-support) provides help with BigQuery.
* [Google BigQuery: The Definitive Guide: Data Warehousing, Analytics, and Machine Learning at Scale](https://www.google.com/books/edition/Google_BigQuery_The_Definitive_Guide/-Jq4DwAAQBAJ) by Valliappa Lakshmanan and Jordan Tigani, explains how BigQuery works and provides an end-to-end walkthrough on how to use the service.

### APIs, tools, and references

Reference materials for BigQuery developers and analysts:

* [BigQuery API](/bigquery/docs/reference/libraries-overview) and [client libraries](/bigquery/docs/reference/libraries) present overviews of BigQuery's features and their use.
* [SQL query syntax](/bigquery/docs/reference/standard-sql/query-syntax) for details about using GoogleSQL.
* [BigQuery DataFrames API reference](https://dataframes.bigquery.dev/reference/index.html) for details about using the pandas-compatible Python API.
* [BigQuery code samples](/bigquery/docs/samples) provide hundreds of snippets for client libraries in [C#](/docs/samples?l=csharp&p=bigquery), [Go](/docs/samples?l=go&p=bigquery), [Java](/docs/samples?l=java&p=bigquery), [Node.js](/docs/samples?l=nodejs&p=bigquery), [Python](/docs/samples?l=python&p=bigquery), [Ruby](/docs/samples?l=ruby&p=bigquery). Or view the [sample browser](/docs/samples?p=bigquery).
* [DML](/bigquery/docs/data-manipulation-language), [DDL](/bigquery/docs/reference/standard-sql/data-definition-language), and [user-defined functions (UDF)](/bigquery/docs/reference/standard-sql/data-definition-language#create_function_statement) syntax lets you manage and transform your BigQuery data.
* [bq command-line tool reference](/bigquery/docs/reference/bq-cli-reference) documents the syntax, commands, flags, and arguments for the `bq` CLI interface.
* [ODBC / JDBC integration](/bigquery/docs/reference/odbc-jdbc-drivers) connect BigQuery to your existing tooling and infrastructure.

## Gemini in BigQuery features

Gemini in BigQuery is part of the [Gemini for Google Cloud](/gemini/docs/overview) product suite which provides AI-powered assistance to help you work with your data.

Gemini in BigQuery provides AI assistance to help you do the following:

* **Explore and understand your data with data insights**. Data insights offers an automated, intuitive way to uncover patterns and perform statistical analysis by using insightful queries that are generated from the metadata of your tables. This feature is especially helpful in addressing the cold-start challenges of early data exploration. For more information, see [Generate data insights in BigQuery](/bigquery/docs/data-insights).
* **Discover, transform, query, and visualize data with BigQuery data canvas**. You can use natural language with Gemini in BigQuery, to find, join, and query table assets, visualize results, and seamlessly collaborate with others throughout the entire process. For more information, see [Analyze with data canvas](/bigquery/docs/data-canvas).
* **Get assisted SQL and Python data analysis**. You can use Gemini in BigQuery to generate or suggest code in either SQL or Python, and to explain an existing SQL query. You can also use natural language queries to begin data analysis. To learn how to generate, complete, and summarize code, see the following documentation: 
    * SQL code assist
        * [Use the SQL generation tool](/bigquery/docs/write-sql-gemini#use_the_sql_generation_tool)
        * [Prompt to generate SQL queries](/bigquery/docs/write-sql-gemini#chat)
        * [Generate SQL queries with Gemini Cloud Assist](/bigquery/docs/write-sql-gemini#chat) ([Preview](https://cloud.google.com/products#product-launch-stages))
        * [Convert comments to SQL](/bigquery/docs/write-sql-gemini#natural_language) ([Preview](https://cloud.google.com/products#product-launch-stages))
        * [Complete a SQL query](/bigquery/docs/write-sql-gemini#complete_a_sql_query) ([Preview](https://cloud.google.com/products#product-launch-stages))
        * [Explain a SQL query](/bigquery/docs/write-sql-gemini#explain_a_sql_query)
    * Python code assist
        * [Generate Python code with the code generation tool](/bigquery/docs/write-sql-gemini#generate_python_code)
        * [Generate Python code with Gemini Cloud Assist](/bigquery/docs/write-sql-gemini#chat-python) ([Preview](https://cloud.google.com/products#product-launch-stages))
        * [Python code completion](/bigquery/docs/write-sql-gemini#complete_python_code)
        * [Generate BigQuery DataFrames Python code](/bigquery/docs/write-sql-gemini#dataframe) ([Preview](https://cloud.google.com/products#product-launch-stages))
* **Prepare data for analysis**. Data preparation in BigQuery gives you context aware, AI-generated transformation recommendations to cleanse data for analysis. For more information, see [Prepare data with Gemini](/bigquery/docs/data-prep-get-suggestions).
* **Customize your SQL translations with translation rules**. ([Preview](https://cloud.google.com/products#product-launch-stages)) Create Gemini-enhanced translation rules to customize your SQL translations when using the [interactive SQL translator](/bigquery/docs/interactive-sql-translator). You can describe changes to the SQL translation output using natural language prompts or specify SQL patterns to find and replace. For more information, see [Create a translation rule](/bigquery/docs/interactive-sql-translator#create-apply-rules).

To learn how to set up Gemini in BigQuery, see [Set up Gemini in BigQuery](/bigquery/docs/gemini-set-up).

## BigQuery roles and resources

BigQuery addresses the needs of data professionals across the following roles and responsibilities.

### Data Analyst

Task guidance to help if you need to do the following:

* [Query BigQuery data](/bigquery/docs/query-overview) using interactive or batch queries using [SQL query syntax](/bigquery/docs/reference/standard-sql/query-syntax)
* [Analyze and transform BigQuery data](/bigquery/docs/dataframes-quickstart) using the pandas-compatible [BigQuery DataFrames API](https://dataframes.bigquery.dev/reference/index.html).
* Reference SQL [functions](/bigquery/docs/reference/standard-sql/functions-all), [operators](/bigquery/docs/reference/standard-sql/operators), and [conditional expressions](/bigquery/docs/reference/standard-sql/conditional_expressions) to query data
* Use tools to analyze and visualize BigQuery data including: [Looker](/bigquery/docs/looker), [Data Studio](/bigquery/docs/visualize-looker-studio), and [Google Sheets](/bigquery/docs/connected-sheets).
    
* [Use geospatial analytics](/bigquery/docs/gis-intro) to analyze and visualize geospatial data with BigQuery's Geographic Information Systems
    
* [Optimize query performance](/bigquery/docs/best-practices-performance-overview) using:
    
    * [Partitioned tables](/bigquery/docs/partitioned-tables): Prune large tables based on time or integer ranges.
    * [Materialized views](/bigquery/docs/materialized-views-intro): Define cached views to optimize queries or provide persistent results.
    * [BI Engine](/bigquery/docs/bi-engine-query): BigQuery's fast, in-memory analysis service.

### Data Administrator

Task guidance to help if you need to do the following:

* [Manage costs](/bigquery/docs/controlling-costs) with [reservations](/bigquery/docs/reservations-intro) to balance on-demand and capacity-based pricing.
* [Understand data security and governance](/bigquery/docs/data-governance) to help secure data by [dataset](/bigquery/docs/control-access-to-resources-iam), [table](/bigquery/docs/control-access-to-resources-iam), [column](/bigquery/docs/column-level-security-intro), [row](/bigquery/docs/row-level-security-intro), or [view](/bigquery/docs/authorized-views)
* [Backup data with table snapshots](/bigquery/docs/table-snapshots-intro) to preserve the contents of a table at a particular time.
* [View BigQuery INFORMATION\_SCHEMA](/bigquery/docs/information-schema-intro) to understand the metadata of [datasets](/bigquery/docs/information-schema-datasets-schemata), [jobs](/bigquery/docs/information-schema-jobs), [access control](/bigquery/docs/information-schema-object-privileges), [reservations](/bigquery/docs/information-schema-reservations), [tables](/bigquery/docs/information-schema-tables) and more.
* [Use Jobs](/bigquery/docs/managing-jobs) to have BigQuery load, export, query, or copy data are actions on your behalf.
* [Monitor logs and resources](/bigquery/docs/monitoring) to understand BigQuery and workloads.

For more information, see [Introduction to BigQuery administration](/bigquery/docs/admin-intro).

To take a tour of BigQuery data administration features directly in the Google Cloud console, click **Take the tour**.

[Take the tour](https://console.cloud.google.com/?walkthrough_id=bigquery--ui-tour-data-admin)

### Data Scientist

Task guidance to help if you need to use [BigQuery ML's machine learning](/bigquery/docs/bqml-introduction) to do the following:

* [Understand the end-to-end user journey for machine learning models](/bigquery/docs/reference/standard-sql/bigqueryml-syntax-e2e-journey)
* [Manage access control](/bigquery/docs/access-control) for BigQuery ML
* [Create and train a BigQuery ML models](/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create) including:
    * [Linear regression](/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-glm) forecasting
    * [Binary logistic](/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-glm) and [multiclass logistic](/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-glm) regression classifications
    * [K-means clustering](/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-kmeans) for data segmentation
    * [Time series](/bigquery/docs/reference/standard-sql/bigqueryml-syntax-create-time-series) forecasting with ARIMA+ models

### Data Developer

Task guidance to help if you need to do the following:

* [Load data into BigQuery](/bigquery/docs/loading-data) with:
    * [batch-load data](/bigquery/docs/batch-loading-data) for [Avro](/bigquery/docs/loading-data-cloud-storage-avro), [Parquet](/bigquery/docs/loading-data-cloud-storage-parquet), [ORC](/bigquery/docs/loading-data-cloud-storage-orc), [CSV](/bigquery/docs/loading-data-cloud-storage-csv), [JSON](/bigquery/docs/loading-data-cloud-storage-json) , [Datastore](/bigquery/docs/loading-data-cloud-datastore) , and [Firestore](/bigquery/docs/loading-data-cloud-firestore) formats
    * [BigQuery Data Transfer Service](/bigquery/docs/dts-introduction)
    * [BigQuery Storage Write API](/bigquery/docs/write-api)
* [Use code sample library](/bigquery/docs/samples) including:
    
    * [Connection samples](/bigquery/docs/samples?api=bigqueryconnectionapi)
    * [Reservation sample](/bigquery/docs/samples?api=bigqueryreservationapi)
    * [Storage code samples](/bigquery/docs/samples?api=bigquerystorage)
* [Google Cloud sample browser](/docs/samples?p=bigquery) (scoped for BigQuery)
    
* [APIs and Libraries Overview](/bigquery/docs/reference/libraries-overview)
    
* [ODBC / JDBC integration](/bigquery/docs/reference/odbc-jdbc-drivers)

## What's next

* For an overview of BigQuery storage, see [Overview of BigQuery storage](/bigquery/docs/storage_overview).
* For an overview of BigQuery queries, see [Overview of BigQuery analytics](/bigquery/docs/query-overview).
* For an overview of BigQuery administration, see [Introduction to BigQuery administration](/bigquery/docs/admin-intro).
* For an overview of BigQuery security, see [Overview of data security and governance](/bigquery/docs/data-governance).
