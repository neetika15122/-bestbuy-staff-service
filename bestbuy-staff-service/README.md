# Best Buy Staff-Service Microservice

## Overview
For Best Buy's internal systems, staff information is managed by the `staff-service` microservice. For CRUD operations, it offers REST APIs to manage employee data, including name, position, department, email, and phone number.

## Objectives
1. Develop the Staff-Service Microservice.
2. Containerize the Service.
3. Deploy to Azure Kubernetes Service (AKS).
4. Set Up CI/CD Pipeline.
5. Test the CI/CD Pipeline.

## Step 1: Clone the BestBuy-Staff-Service Repository
To begin, clone the [**BestBuyApp**](https://github.com/neetika15122/-bestbuy-staff-service.git) repository, which contains all necessary deployment files.

## Step 2: Create an Azure Kubernetes Cluster (AKS)
1. **Log in to Azure Portal:**
   - Go to [https://portal.azure.com](https://portal.azure.com) and log in with your Azure account.

2. **Create a Resource Group:**
   - In the Azure Portal, search for **Resource Groups** in the search bar.
   - Click **Create** and fill in the following:
     - **Resource group name**: `ExamResource`
     - **Region**: `Central Canada`.
   - Click **Review + Create** and then **Create**.

3. **Create an AKS Cluster:**
   - In the search bar, type **Kubernetes services** and click on it.
   - Click **Create** and select **Kubernetes cluster**
   - In the `Basics` tap fill in the following details:
     - **Subscription**: Select your subscription.
     - **Resource group**: Choose `ExamResource`.
     - **Cluster preset configuration**: Choose `Dev/Test`.
     - **Kubernetes cluster name**: `StaffCluster`.
     - **Region**: Same as your resource group (e.g., `Central Canada`).
     - **Availability zones**: `None`.
     - **AKS pricing tier**: `Free`.
     - **Kubernetes version**: `Default`.
     - **Automatic upgrade**: `Disabled`.
     - **Automatic upgrade scheduler**: `No schedule`.
     - **Node security channel type**: `None`.
     - **Security channel scheduler**: `No schedule`.
     - **Authentication and Authorization**: `Local accounts with Kubernetes RBAC`.
   - In the `Node pools` tap fill in the following details:
     - Select **agentpool**. Optionally change its name to `masternodes`. This nodes will have the controlplane.
        - Set **node size** to `D2as_v4`.
        - **Scale method**: `Manual`
        - **Node count**: `1`
        - Click `update`
     - Click on **Add node pool**:
        - **Node pool name**: `workernodes`.
        - **Mode**: `User` 
        - Set **node size** to `D2as_v4`.
        - **Scale method**: `Manual`
        - **Node count**: `1`
        - Click `add`
   - Click **Review + Create**, and then **Create**. The deployment will take a few minutes.

## Step 3: Connect to AKS Cluster
   - Once the AKS cluster is deployed, navigate to the cluster in the Azure Portal.
   - In the overview page, click on **Connect**. 
   - Select **Azure CLI** tap. You will need Azure CLI. If you don't have it: [**Install Azure CLI**](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)
   - Login to your azure account using the following command:
      ```
      az login
      ```
   - Set the cluster subscription using the command shown in the portal (it will look something like this):
      ```
      az account set --subscription 'subscribtion-id'
      ```

   - Copy the command shown in the portal for configuring `kubectl` (it will look something like this):
     ```
     az aks get-credentials --resource-group BestBuyResource --name BestBuyCluster 
     ```

   - Verify Cluster Access:
      - Test your connection to the AKS cluster by listing all nodes:
        ```
        kubectl get nodes
        ```
        You should see details of the nodes in your AKS cluster if the connection is successful.

## Step 4 API Endpoints
To enable AI-generated product descriptions and image generation features, you will deploy the required **Azure OpenAI Services** for GPT-4 (text generation) and DALL-E 3 (image generation). This step is essential to configure the **AI Service** component in the Algonquin Pet Store application.

### Task 1: Create an Azure OpenAI Service Instance

1. **Navigate to Azure Portal**:
   - Go to the [Azure Portal](https://portal.azure.com/).

2. **Create a Resource**:
   - Select **Create a Resource** from the Azure portal dashboard.
   - Search for **Azure OpenAI** in the marketplace.

3. **Set Up the Azure OpenAI Resource**:
   - Choose the **australiaeast** region for deployment to ensure capacity for GPT-4 and DALL-E 3 models.
   - Fill in the required details:
     - Resource group: Use an existing one or create a new group.
     - Pricing tier: Select `Standard`.

4. **Deploy the Resource**:
   - Click **Review + Create** and then **Create** to deploy the Azure OpenAI service.

### Task 2: Deploy the GPT-4 and DALL-E 3 Models

1. **Access the Azure OpenAI Resource**:
   - Navigate to the Azure OpenAI resource you just created.

2. **Deploy GPT-4**:
   - Go to the **Model Deployments** section and click **Add Deployment**.
   - Choose **GPT-4** as the model and provide a deployment name (e.g., `gpt-4-deployment`).
   - Set the deployment configuration as required and deploy the model.

3. **Deploy DALL-E 3**:
   - Repeat the same process to deploy **DALL-E 3**.
   - Use a descriptive deployment name (e.g., `dalle-3-deployment`).

4. **Note Configuration Details**:
   - Once deployed, note down the following details for each model:
     - Deployment Name
### Base URL: `http://<host>:<port>/`

1. **Get All Staff**
   - `GET /staff`
   - Response: A list of every employee.

2. **Get Staff by ID**
   - `GET /staff/<staff_id>`
   - Response: Details of the staff for the specified ID.

3. **Create Staff**
   - `POST /staff`
   - Body:
     ```json
     {
       "name": "Mary Bond",
       "position": "Supervison",
       "department": "Front-end",
       "email": "mary@supervisor.com",
       "phone": "9876543210"
     }
     ```
   - Response: A recently hired employee.

4. **Update Staff**
   - `PUT /staff/<staff_id>`
   - Body: The only fields that need to be updated are the same as in Create Staff..
   - Response: Updated employee information.

5. **Delete Staff**
   - `DELETE /staff/<staff_id>`
   - Response: Details of a staff member were deleted..

## Step 5: Build, Tag and Push the Docker Image
### **Task 1: Build the Docker Images for staff-service repository **
```bash 
docker build -t bestbuy-staff-service:latest .
```
### **Task 2: Tag the Docker Images for staff-service repository **
```bash
docker tag bestbuy-staff-service:latest username/bestbuy-staff-service:latest
```
### **Task 3: Push the Docker Images for staff-service repository **
```bash
docker push pras0044/bestbuy-staff-service:latest
``` 

## Installation and Usage
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd bestbuy-staff-service
