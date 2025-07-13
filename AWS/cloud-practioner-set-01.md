---
layout: exam
---

# Practice Exam 2

1. A global company with a large number of AWS accounts is seeking a way in which they can centrally manage billing and security policies across all accounts. Which AWS Service will assist them in meeting these goals?
    - A. AWS Organizations.
    - B. AWS Trusted Advisor.
    - C. IAM User Groups.
    - D. AWS Config.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

2. Which service provides object-level storage in AWS?
    - A. Amazon EBS.
    - B. Amazon Instance Store.
    - C. Amazon EFS.
    - D. Amazon S3.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: D
    </details>

3. A company is concerned that they are spending money on underutilized compute resources in AWS. Which AWS feature will help ensure that their applications are automatically adding/removing EC2 compute capacity to closely match the required demand?
    - A. AWS Elastic Load Balancer.
    - B. AWS Budgets.
    - C. AWS Auto Scaling.
    - D. AWS Cost Explorer.

    <details markdown=1><summary markdown='span'>Answer (Learn more: <a href="https://www.geeksforgeeks.org/devops/amazon-web-services-scaling-amazon-ec2/" target="_blank">Resource</a>) </summary>
      Correct answer: C
       
    </details>

4. Which S3 storage class is best for data with unpredictable access patterns?
    - A. Amazon S3 Intelligent-Tiering.
    - B. Amazon S3 Glacier Flexible Retrieval.
    - C. Amazon S3 Standard.
    - D. Amazon S3 Standard-Infrequent Access.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

5. What is the AWS database service that allows you to upload data structured in key-value format?
    - A. Amazon DynamoDB.
    - B. Amazon Aurora.
    - C. Amazon Redshift.
    - D. Amazon RDS.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

6. Which of the following is NOT correct regarding Amazon EC2 On-demand instances?
    - A. You have to pay a start-up fee when launching a new instance for the first time.
    - B. The on-demand instances follow the AWS pay-as-you-go pricing model.
    - C. With on-demand instances, no longer-term commitments or upfront payments are needed.
    - D. When using on-demand Linux instances, you are charged per second based on an hourly rate.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

7. A company has moved to AWS recently. Which of the following AWS Services will help ensure that they have the proper security settings? (Choose TWO)
    - A. AWS Trusted Advisor.
    - B. Amazon Inspector.
    - C. Amazon SNS.
    - D. Amazon CloudWatch.
    - E. Concierge Support Team.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, B
    </details>
    <details markdown=1><summary markdown='span'>Resource</summary>
      ✅ AWS Trusted Advisor
        AWS Trusted Advisor is a real-time online tool that provides best practice recommendations across several categories to help optimize your AWS environment. It inspects your AWS account and makes suggestions to improve:
        
        Cost Optimization
        
        Performance
        
        Security
        
        Fault Tolerance
        
        Service Limits
        
        🔑 Key Features:
        Provides a dashboard with checks and recommendations.
        
        Helps reduce unnecessary costs (e.g., idle resources).
        
        Alerts about security misconfigurations (e.g., open ports).
        
        Some checks are free (basic), while full access is available with Business or Enterprise support plans.
        
        ✅ Amazon Inspector
        Amazon Inspector is an automated security assessment service that helps you improve the security and compliance of your AWS workloads.
        
        🔑 Key Features:
        Scans EC2 instances and containers (ECR) for vulnerabilities, such as software flaws or outdated packages.
        
        Performs network reachability analysis to check if your instances are accessible from the internet.
        
        Integrates with AWS Security Hub and Amazon EventBridge.
        
        Supports automated and continuous scanning.
        
        Helps meet compliance requirements (e.g., PCI DSS, CIS benchmarks).
        
        🔄 Comparison Summary:
        Feature	AWS Trusted Advisor	Amazon Inspector
        Purpose	Best practices and optimization	Security vulnerability assessment
        Scope	Account-wide checks	EC2 instances & container image scans
        Focus Areas	Cost, performance, security, limits	Security vulnerabilities and compliance
        Real-Time/Automated	Yes (some real-time, dashboard-based)	Yes (automated and continuous scanning)
        Support Plan Requirement	Full checks with Business/Enterprise	No specific plan required
        
        📌 Sample Exam Questions
        ❓ Question 1:
        Which AWS service provides real-time guidance to help you follow AWS best practices for cost optimization, security, and performance?
        
        A. Amazon Inspector
        B. AWS Trusted Advisor
        C. AWS Config
        D. AWS CloudTrail
        
        ✅ Answer: B. AWS Trusted Advisor
        
        ❓ Question 2:
        What is the primary function of Amazon Inspector?
        
        A. To recommend cost savings for underutilized EC2 instances
        B. To monitor and log all AWS API activity
        C. To scan EC2 instances for security vulnerabilities and compliance issues
        D. To encrypt data stored in Amazon S3
        
        ✅ Answer: C. To scan EC2 instances for security vulnerabilities and compliance issues
        
        ❓ Question 3:
        Which AWS service will notify you if you have EC2 instances with unrestricted access to the internet?
        
        A. AWS CloudTrail
        B. AWS Trusted Advisor
        C. Amazon Inspector
        D. AWS Identity and Access Management (IAM)
        
        ✅ Answer: B. AWS Trusted Advisor
        
        ❓ Question 4:
        You want to continuously scan your Amazon EC2 instances and container images for software vulnerabilities. Which AWS service should you use?
        
        A. AWS Shield
        B. Amazon Inspector
        C. AWS GuardDuty
        D. AWS WAF
        
        ✅ Answer: B. Amazon Inspector
        
        ❓ Question 5:
        Which service requires a Business or Enterprise support plan to access full checks?
        
        A. Amazon Inspector
        B. AWS Security Hub
        C. AWS Trusted Advisor
        D. AWS Config
        
        ✅ Answer: C. AWS Trusted Advisor
        
        ❓ Question 6:
        An administrator wants to get a recommendation to improve fault tolerance and performance of AWS resources. Which AWS service should be used?
        
        A. AWS CloudTrail
        B. Amazon Inspector
        C. AWS Trusted Advisor
        D. AWS IAM
        
        ✅ Answer: C. AWS Trusted Advisor
    </details>

8. What is the AWS feature that provides an additional level of security above the default authentication mechanism of usernames and passwords?
    - A. Encrypted keys.
    - B. Email verification.
    - C. AWS KMS.
    - D. AWS MFA.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: D
    </details>

9. A company is introducing a new product to their customers, and is expecting a surge in traffic to their web application. As part of their Enterprise Support plan, which of the following provides the company with architectural and scaling guidance?
    - A. AWS Knowledge Center.
    - B. AWS Health Dashboard.
    - C. Infrastructure Event Management.
    - D. AWS Support Concierge Service.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>
    <details markdown=1><summary markdown='span'>Resource</summary>
      ✅ What is AWS Infrastructure Event Management (IEM)?
        AWS Infrastructure Event Management (IEM) is a short-term, consultative engagement provided by AWS to help you plan and execute large-scale events that involve significant changes to your AWS infrastructure.
        
        These events can include:
        
        Large product launches
        
        Migration cutovers
        
        Major marketing campaigns (like Black Friday)
        
        Application go-lives
        
        Infrastructure upgrades or expansions
        
        📌 Important: AWS IEM is available for Business and Enterprise Support plan customers.
        
        🔑 Key Features of AWS IEM:
        Feature	Description
        Event Planning Support	AWS helps you create a detailed runbook and timeline for your event.
        Architecture and Scaling Guidance	Ensures your architecture is ready for high traffic or workload changes.
        Operational Readiness Reviews	Reviews your AWS environment to spot gaps or risks.
        Monitoring and Incident Support	AWS provides enhanced monitoring during the event and quicker response if issues arise.
        Post-Event Analysis	Review of performance, issues, and improvement areas after the event.
        
        ✅ Use Cases:
        Retailer preparing for Black Friday surge
        
        Gaming company launching a new title
        
        Media platform streaming a live global event
        
        Enterprise migrating critical workloads to AWS
        
        📌 Sample Exam Questions
        ❓ Question 1:
        What is the purpose of AWS Infrastructure Event Management (IEM)?
        
        A. To manage IAM user policies and permissions
        B. To help customers plan and support large-scale infrastructure events
        C. To provide detailed billing breakdowns
        D. To analyze container performance metrics
        
        ✅ Answer: B. To help customers plan and support large-scale infrastructure events
        
        ❓ Question 2:
        Which AWS support plans provide access to Infrastructure Event Management (IEM)?
        
        A. Basic and Developer
        B. Business and Enterprise
        C. Developer and Enterprise
        D. Only available with the Free Tier
        
        ✅ Answer: B. Business and Enterprise
        
        ❓ Question 3:
        An e-commerce company is planning for a major product launch and expects a large spike in traffic. Which AWS offering can help them plan and monitor this event?
        
        A. AWS Shield Advanced
        B. Amazon Inspector
        C. AWS Infrastructure Event Management (IEM)
        D. AWS Control Tower
        
        ✅ Answer: C. AWS Infrastructure Event Management (IEM)
        
        ❓ Question 4:
        Which of the following does AWS not typically offer as part of Infrastructure Event Management?
        
        A. Architectural guidance
        B. Cost forecasting and billing analysis
        C. Operational readiness reviews
        D. Real-time monitoring and incident support
        
        ✅ Answer: B. Cost forecasting and billing analysis
        
        ❓ Question 5:
        Which AWS service is designed to help ensure a smooth launch of mission-critical workloads by offering planning, architectural review, and enhanced support?
        
        A. AWS Systems Manager
        B. AWS Elastic Beanstalk
        C. AWS Infrastructure Event Management
        D. Amazon CloudWatch
        
        ✅ Answer: C. AWS Infrastructure Event Management
    </details>

10. You work as an on-premises MySQL DBA. The work of database configuration, backups, patching, and DR can be time-consuming and repetitive. Your company has decided to migrate to the AWS Cloud. Which of the following can help save time on database maintenance so you can focus on data architecture and performance?
    - A. Amazon RDS.
    - B. Amazon Redshift.
    - C. Amazon DynamoDB.
    - D. Amazon CloudWatch.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

11. Which of the below is a best-practice when designing solutions on AWS?
    - A. Invest heavily in architecting your environment, as it is not easy to change your design later.
    - B. Use AWS reservations to reduce costs when testing your production environment.
    - C. Automate wherever possible to make architectural (© ) experimentation easier.
    - D. Provision a large compute capacity to handle any spikes in load

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

12. According to the AWS Acceptable Use Policy, which of the following statements is true regarding penetration testing of EC2 instances?
    - A. Penetration testing is not allowed in AWS.
    - B. Penetration testing is performed automatically by AWS to determine vulnerabilities in your AWS infrastructure.
    - C. Penetration testing can be performed by the customer on their own instances without prior authorization from AWS.
    - D. The AWS customers are only allowed to perform penetration testing on services managed by AWS.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

13. Which service is used to ensure that messages between software components are not lost if one or more components fail?
    - A. Amazon SQS.
    - B. Amazon SES.
    - C. AWS Direct Connect.
    - D. Amazon Connect.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

14. The principle “design for failure and nothing will fail” is very important when designing your AWS Cloud architecture. Which of the following would help adhere to this principle? (Choose TWO)
    - A. Multi-factor authentication.
    - B. Availability Zones.
    - C. Elastic Load Balancing.
    - D. Penetration testing.
    - E. Vertical Scaling.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B, C
    </details>

15. What is the AWS service that provides a virtual network dedicated to your AWS account?
    - A. AWS VPN.
    - B. AWS Subnets.
    - C. AWS Dedicated Hosts.
    - D. Amazon VPC.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: D
    </details>
    <details markdown=1><summary markdown='span'>Resource</summary>
      ✅ What is Amazon VPC?
        Amazon Virtual Private Cloud (VPC) allows you to launch AWS resources like EC2 instances into a logically isolated virtual network that you define. It gives you full control over your virtual networking environment — including IP address ranges, subnets, route tables, and network gateways.
        
        🔑 Key Concepts of VPC:
        Component	Description
        VPC	Your own isolated network in the AWS cloud.
        Subnet	A subdivision of your VPC. Can be public (connected to the internet) or private (internal-only).
        Route Table	Defines rules (routes) to control network traffic flow.
        Internet Gateway (IGW)	Enables access to the internet for public subnets.
        NAT Gateway	Allows private subnets to access the internet (e.g., for updates), but prevents incoming connections from the internet.
        Security Groups	Virtual firewalls that control inbound and outbound traffic at the instance level.
        Network ACLs	Firewall at the subnet level (stateless).
        Peering	Connects two VPCs so they can communicate privately.
        VPC Endpoints	Private connections to AWS services without going over the public internet.
        
        ✅ VPC Use Cases:
        Hosting secure web applications
        
        Running private backend servers
        
        Creating isolated development and production environments
        
        Connecting to on-premises data centers (via VPN or Direct Connect)
        
        📌 Sample Exam Questions
        ❓ Question 1:
        What does Amazon VPC allow you to do?
        
        A. Store objects like files and images
        B. Launch AWS resources into a virtual network you define
        C. Analyze large datasets using machine learning
        D. Host web applications without any network configuration
        
        ✅ Answer: B. Launch AWS resources into a virtual network you define
        
        ❓ Question 2:
        Which component of a VPC allows instances in a private subnet to access the internet, but prevents incoming traffic from the internet?
        
        A. Internet Gateway
        B. NAT Gateway
        C. Route Table
        D. VPC Peering
        
        ✅ Answer: B. NAT Gateway
        
        ❓ Question 3:
        What is the function of an Internet Gateway in an Amazon VPC?
        
        A. To encrypt data traveling over the internet
        B. To allow instances in the VPC to connect to the internet
        C. To filter traffic using firewall rules
        D. To allow cross-region replication of instances
        
        ✅ Answer: B. To allow instances in the VPC to connect to the internet
        
        ❓ Question 4:
        Which VPC component acts as a virtual firewall for EC2 instances, controlling inbound and outbound traffic?
        
        A. Network ACL
        B. Route Table
        C. Security Group
        D. Subnet
        
        ✅ Answer: C. Security Group
        
        ❓ Question 5:
        Which VPC component is stateful, meaning if you allow inbound traffic, the return traffic is automatically allowed?
        
        A. Subnet
        B. Security Group
        C. Network ACL
        D. Internet Gateway
        
        ✅ Answer: B. Security Group
        
        ❓ Question 6:
        What is the difference between a Security Group and a Network ACL?
        
        A. Security Groups are subnet-level and stateless; Network ACLs are instance-level and stateful
        B. Both are stateless and apply only to private subnets
        C. Security Groups are stateful and apply at the instance level; Network ACLs are stateless and apply at the subnet level
        D. There is no difference between them
        
        ✅ Answer: C. Security Groups are stateful and apply at the instance level; Network ACLs are stateless and apply at the subnet level
        
        ❓ Question 7:
        Which VPC feature allows secure and private communication between two VPCs?
        
        A. Internet Gateway
        B. NAT Gateway
        C. VPC Peering
        D. Route Table
        
        ✅ Answer: C. VPC Peering
    </details>

16. According to the AWS Shared responsibility model, which of the following are the responsibility of the customer? (Choose TWO)
    - A. Managing environmental events of AWS data centers.
    - B. Protecting the confidentiality of data in transit in Amazon S3.
    - C. Controlling physical access to AWS Regions.
    - D. Ensuring that the underlying EC2 host is configured properly.
    - E. Patching applications installed on Amazon EC2.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B, E
    </details>

17. Which of the following AWS services can be used as a compute resource? (Choose TWO)
    - A. Amazon VPC.
    - B. Amazon CloudWatch.
    - C. Amazon S3.
    - D. Amazon EC2.
    - E. AWS Lambda.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: D, E
    </details>

18. Your company is designing a new application that will store and retrieve photos and videos. Which of the following services should you recommend as the underlying storage mechanism?
    - A. Amazon EBS.
    - B. Amazon SQS.
    - C. Amazon S3.
    - D. Amazon Instance store.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

19. Which of the following is equivalent to a user name and password and is used to authenticate your programmatic access to AWS services and APIs?
    - A. Instance Password.
    - B. Key pairs.
    - C. Access Keys.
    - D. MFA.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

20. What does Amazon ElastiCache provide?
    - A. In-memory caching for read-heavy applications.
    - B. An Ehcache compatible in-memory data store.
    - C. An online software store that allows Customers to launch pre-configured software with just few clicks.
    - D. A domain name system in the cloud.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>
    <details markdown=1><summary markdown='span'>Resource</summary>
      ✅ What is Amazon ElastiCache?
        Amazon ElastiCache is a fully managed in-memory data store and cache service that supports two popular open-source engines:
        
        Redis
        
        Memcached
        
        It is used to cache frequently accessed data to reduce latency, increase throughput, and relieve database load, improving overall application performance.
        
        🔑 Key Features:
        Feature	Description
        In-Memory Storage	Extremely fast access (microsecond latency) to data.
        Supports Redis & Memcached	You can choose either engine depending on your use case.
        Fully Managed	AWS handles maintenance, backups, patching, monitoring, and scaling.
        Use with Other AWS Services	Commonly used with Amazon RDS, DynamoDB, Lambda, and EC2.
        High Availability	Redis supports multi-AZ with automatic failover.
        Scalable	Supports both vertical and horizontal scaling.
        
        ✅ Use Cases:
        Caching frequently read data (e.g., product details, user sessions)
        
        Session storage (especially Redis for its persistence support)
        
        Real-time analytics (e.g., leaderboards, counters)
        
        Database query result caching
        
        Reducing load on backend databases
        
        🔄 Redis vs. Memcached (Quick Comparison):
        Feature	Redis	Memcached
        Data Types	Strings, Lists, Sets, etc.	Strings only
        Persistence	Yes	No
        Replication	Yes (multi-AZ)	No
        Pub/Sub	Yes	No
        
        📌 Sample Exam Questions
        ❓ Question 1:
        What is the primary purpose of Amazon ElastiCache?
        
        A. To store static website files
        B. To monitor AWS resource usage
        C. To improve application performance by caching frequently accessed data
        D. To serve video content directly from the cloud
        
        ✅ Answer: C. To improve application performance by caching frequently accessed data
        
        ❓ Question 2:
        Which two engines are supported by Amazon ElastiCache?
        
        A. MySQL and MongoDB
        B. Redis and Memcached
        C. DynamoDB and Cassandra
        D. PostgreSQL and Aurora
        
        ✅ Answer: B. Redis and Memcached
        
        ❓ Question 3:
        Which of the following is a benefit of using Amazon ElastiCache?
        
        A. It provides automatic file backup to S3
        B. It decreases application latency by storing data in memory
        C. It automatically converts relational data to JSON
        D. It enforces IAM policies across all AWS services
        
        ✅ Answer: B. It decreases application latency by storing data in memory
        
        ❓ Question 4:
        A developer wants to reduce database read load and improve response times by caching data. Which AWS service should they use?
        
        A. Amazon RDS
        B. Amazon DynamoDB
        C. Amazon ElastiCache
        D. AWS Lambda
        
        ✅ Answer: C. Amazon ElastiCache
        
        ❓ Question 5:
        Which of the following use cases is not typically associated with Amazon ElastiCache?
        
        A. Storing user session data
        B. Running complex relational joins
        C. Caching API responses
        D. Real-time leaderboard updates
        
        ✅ Answer: B. Running complex relational joins
        
        ❓ Question 6:
        Which ElastiCache engine supports advanced data types and persistence?
        
        A. Memcached
        B. Redis
        C. MySQL
        D. Aurora
        
        ✅ Answer: B. Redis
    </details>

21. What is the AWS service that enables you to manage all of your AWS accounts from a single master account?
    - A. AWS WAF.
    - B. AWS Trusted Advisor.
    - C. AWS Organizations.
    - D. Amazon Config.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

22. Which of the following EC2 instance purchasing options supports the Bring Your Own License (BYOL) model for almost every BYOL scenario?
    - A. Dedicated Instances.
    - B. Dedicated Hosts.
    - C. On-demand Instances.
    - D. Reserved Instances.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

23. Which of the following is one of the benefits of moving infrastructure from an on-premises data center to AWS?
    - A. Free support for all enterprise customers.
    - B. Automatic data protection.
    - C. Reduced Capital Expenditure (CapEx).
    - D. AWS holds responsibility for managing customer applications.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

24. Which of the following are important design principles you should adopt when designing systems on AWS? (Choose TWO)
    - A. Always use Global Services in your architecture rather than Regional Services.
    - B. Always choose to pay as you go.
    - C. Treat servers as fixed resources.
    - D. Automate wherever possible.
    - E. Remove single points of failure.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: D, E
    </details>

25. Which AWS Service can be used to establish a dedicated, private network connection between AWS and your datacenter?
    - A. AWS Direct Connect.
    - B. Amazon CloudFront.
    - C. AWS Snowball.
    - D. Amazon Route 53.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>
    <details markdown=1><summary markdown='span'>Resource</summary>
      ✅ What is AWS Direct Connect?
        AWS Direct Connect is a dedicated network connection between your on-premises data center (or office) and AWS. It allows you to bypass the public internet and establish a private, high-bandwidth, low-latency connection to AWS services.
        
        🔑 Key Features of AWS Direct Connect:
        Feature	Description
        Dedicated Connection	Establishes a private network connection between your network and AWS.
        Consistent Performance	Avoids internet congestion, offering more reliable and predictable network performance.
        High Bandwidth Options	Supports speeds from 50 Mbps to 100 Gbps.
        Secure Connection	Traffic does not traverse the public internet, which enhances security and privacy.
        Works with All AWS Services	Can access Amazon EC2, Amazon S3, VPC, and more.
        Integration with VPN	Can be used together with AWS Site-to-Site VPN for redundancy.
        
        ✅ Use Cases:
        Transferring large datasets to AWS (e.g., backups, video, analytics data)
        
        Hybrid cloud deployments (on-prem + AWS)
        
        Applications that need consistent low-latency performance
        
        Meeting compliance/security requirements by avoiding the internet
        
        🔄 Direct Connect vs VPN:
        Feature	AWS Direct Connect	AWS VPN
        Connection Type	Dedicated physical connection	Over the public internet
        Performance	High, consistent	Variable (depends on internet)
        Security	Private	Encrypted, over internet
        Setup Time	Longer (physical provisioning)	Fast (software configuration)
        Redundancy	Can be paired with VPN	Often used as backup for DX
        
        📌 Sample Exam Questions
        ❓ Question 1:
        What is the primary benefit of using AWS Direct Connect over a standard internet connection?
        
        A. Higher encryption for API traffic
        B. Dedicated network connection for consistent, low-latency performance
        C. Ability to host websites on AWS
        D. Built-in DDoS protection for EC2
        
        ✅ Answer: B. Dedicated network connection for consistent, low-latency performance
        
        ❓ Question 2:
        A company wants a private and reliable connection between its on-premises data center and AWS. Which service should they use?
        
        A. Amazon VPC Peering
        B. AWS Site-to-Site VPN
        C. AWS Direct Connect
        D. AWS Transit Gateway
        
        ✅ Answer: C. AWS Direct Connect
        
        ❓ Question 3:
        Which of the following statements is true about AWS Direct Connect?
        
        A. It encrypts traffic using IPsec over the public internet
        B. It is used to host public websites in AWS
        C. It uses dedicated connections to provide predictable performance
        D. It automatically connects your AWS resources to third-party clouds
        
        ✅ Answer: C. It uses dedicated connections to provide predictable performance
        
        ❓ Question 4:
        Which AWS service is best suited for securely transferring large volumes of data between your on-premises data center and AWS?
        
        A. Amazon CloudFront
        B. AWS Direct Connect
        C. AWS Snowball
        D. AWS VPN
        
        ✅ Answer: B. AWS Direct Connect
        
        ❓ Question 5:
        If a company wants to use AWS Direct Connect for production workloads but still maintain failover in case the connection goes down, what AWS service should they use in combination?
        
        A. Amazon Route 53
        B. AWS Global Accelerator
        C. AWS VPN
        D. AWS WAF
        
        ✅ Answer: C. AWS VPN
    </details>

26. You are working on two projects that require completely different network configurations. Which AWS service or feature will allow you to isolate resources and network configurations?
    - A. Internet gateways.
    - B. Virtual Private Cloud.
    - C. Security Groups.
    - D. Amazon CloudFront.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

27. Which of the following services can help protect your web applications from SQL injection and other vulnerabilities in your application code?
    - A. Amazon Cognito.
    - B. AWS IAM.
    - C. Amazon Aurora.
    - D. AWS WAF.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: D
    </details>

28. An organization needs to analyze and process a large number of data sets. Which AWS service should they use?
    - A. Amazon EMR.
    - B. Amazon MQ.
    - C. Amazon SNS.
    - D. Amazon SQS.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

29. Based on the AWS Shared Responsibility Model, which of the following are the sole responsibility of AWS? (Choose TWO)
    - A. Monitoring network performance.
    - B. Installing software on EC2 instances.
    - C. Creating hypervisors.
    - D. Configuring Access Control Lists (ACLs).
    - E. Hardware maintenance.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C, E
    </details>

30. What is the AWS service that provides you the highest level of control over the underlying virtual infrastructure?
    - A. Amazon Redshift.
    - B. Amazon DynamoDB.
    - C. Amazon EC2.
    - D. Amazon RDS.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

31. What are the default security credentials that are required to access the AWS management console for an IAM user account?
    - A. MFA.
    - B. Security tokens.
    - C. A user name and password.
    - D. Access keys.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

32. In your on-premises environment, you can create as many virtual servers as you need from a single template. What can you use to perform the same in AWS?
    - A. IAM.
    - B. An internet gateway.
    - C. EBS Snapshot.
    - D. AMI.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: D
    </details>

33. What are two advantages of using Cloud Computing over using traditional data centers? (Choose TWO)
    - A. Reserved Compute capacity.
    - B. Eliminating Single Points of Failure (SPOFs).
    - C. Distributed infrastructure.
    - D. Virtualized compute resources.
    - E. Dedicated hosting.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B, C
    </details>

34. Which of the following aspects of security are managed by AWS? (Choose TWO)
    - A. Encryption of EBS volumes.
    - B. VPC security.
    - C. Access permissions.
    - D. Hardware patching.
    - E. Securing global physical infrastructure.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: D, E
    </details>

35. Which statement best describes the operational excellence pillar of the AWS Well-Architected Framework?
    - A. The ability of a system to recover gracefully from failure.
    - B. The efficient use of computing resources to meet requirements.
    - C. The ability to monitor systems and improve supporting processes and procedures.
    - D. The ability to manage datacenter operations more efficiently.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

36. AWS has created a large number of Edge Locations as part of its Global Infrastructure. Which of the following is NOT a benefit of using Edge Locations?
    - A. Edge locations are used by CloudFront to cache the most recent responses.
    - B. Edge locations are used by CloudFront to improve your end users’ experience when uploading files.
    - C. Edge locations are used by CloudFront to distribute traffic across multiple instances to reduce latency.
    - D. Edge locations are used by CloudFront to distribute content to global users with low latency.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

37. What are the change management tools that helps AWS customers audit and monitor all resource changes in their AWS environment? (Choose TWO)
    - A. AWS CloudTrail.
    - B. Amazon Comprehend.
    - C. AWS Transit Gateway.
    - D. AWS X-Ray.
    - E. AWS Config.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, E
    </details>

38. Which of the following services allows you to run containerized applications on a cluster of EC2 instances?
    - A. Amazon ECS.
    - B. AWS Data Pipeline.
    - C. AWS Cloud9.
    - D. AWS Personal Health Dashboard.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

39. Which of the following services will help businesses ensure compliance in AWS?
    - A. CloudFront.
    - B. CloudEndure Migration.
    - C. CloudWatch.
    - D. CloudTrail.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: D
    </details>

40. Which of the following procedures will help reduce your Amazon S3 costs?
    - A. Use the Import/Export feature to move old files automatically to Amazon Glacier.
    - B. Use the right combination of storage classes based on different use cases.
    - C. Pick the right Availability Zone for your S3 bucket.
    - D. Move all the data stored in S3 standard to EBS.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

41. What are the AWS services/features that can help you maintain a highly available and fault-tolerant architecture in AWS? (Choose TWO)
    - A. AWS Direct Connect.
    - B. Amazon EC2 Auto Scaling.
    - C. Elastic Load Balancer.
    - D. CloudFormation.
    - E. Network ACLs.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B, C
    </details>

42. Which of the following activities may help reduce your AWS monthly costs?
    - A. Enabling Amazon EC2 Auto Scaling for all of your workloads.
    - B. Using the AWS Network Load Balancer (NLB) to load balance the incoming HTTP requests.
    - C. Removing all of your Cost Allocation Tags.
    - D. Deploying your AWS resources across multiple Availability Zones.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

43. What is the AWS service/feature that takes advantage of Amazon CloudFront’s globally distributed edge locations to transfer files to S3 with higher upload speeds?
    - A. S3 Transfer Acceleration.
    - B. AWS WAF.
    - C. AWS Snowmobile.
    - D. AWS Snowball.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

44. Which of the following AWS security features is associated with an EC2 instance and functions to filter incoming traffic requests?
    - A. AWS X-Ray.
    - B. Network ACL.
    - C. Security Groups.
    - D. VPC Flow logs.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

45. Which AWS services can be used to improve the performance of a global application and reduce latency for its users? (Choose TWO)
    - A. AWS KMS.
    - B. AWS Global accelerator.
    - C. AWS Direct Connect.
    - D. AWS Glue.
    - E. Amazon CloudFront.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B, E
    </details>

46. Using Amazon RDS falls under the shared responsibility model. Which of the following are customer responsibilities? (Choose TWO)
    - A. Building the relational database schema.
    - B. Performing backups.
    - C. Managing the database settings.
    - D. Patching the database software.
    - E. Installing the database software.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A, C
    </details>

47. A company has a large amount of structured data stored in their on-premises data center. They are planning to migrate all the data to AWS, what is the most appropriate AWS database option?
    - A. Amazon DynamoDB.
    - B. Amazon SNS.
    - C. Amazon RDS.
    - D. Amazon ElastiCache.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: C
    </details>

48. A company has created a solution that helps AWS customers improve their architectures on AWS. Which AWS program may support this company?
    - A. APN Consulting Partners.
    - B. AWS TAM.
    - C. APN Technology Partners.
    - D. AWS Professional Services.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: A
    </details>

49. What is the AWS serverless service that allows you to run your applications without any administrative burden?
    - A. Amazon LightSail.
    - B. AWS Lambda.
    - C. Amazon RDS instances.
    - D. Amazon EC2 instances.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>

50. Jessica is managing an e-commerce web application in AWS. The application is hosted on six EC2 instances. One day, three of the instances crashed; but none of her customers were affected. What has Jessica done correctly in this scenario?
    - A. She has properly built an elastic system.
    - B. She has properly built a fault tolerant system.
    - C. She has properly built an encrypted system.
    - D. She has properly built a scalable system.

    <details markdown=1><summary markdown='span'>Answer</summary>
      Correct answer: B
    </details>
