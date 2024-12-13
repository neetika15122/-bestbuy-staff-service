# Best Buy Staff-Service Microservice

## Overview
For Best Buy's internal systems, staff information is managed by the `staff-service` microservice. For CRUD operations, it offers REST APIs to manage employee data, including name, position, department, email, and phone number.

## API Endpoints
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

## Installation and Usage
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd bestbuy-staff-service
