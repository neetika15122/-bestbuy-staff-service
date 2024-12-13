from flask import Flask, request, jsonify
import uuid
import os

app = Flask(__name__)

# In-memory data store for staff information
staff_data = {}

# Get all staff
@app.route('/staff', methods=['GET'])
def get_all_staff():
    return jsonify({"staff": list(staff_data.values())}), 200

# Get staff by ID
@app.route('/staff/<staff_id>', methods=['GET'])
def get_staff(staff_id):
    if staff_id in staff_data:
        return jsonify(staff_data[staff_id]), 200
    return jsonify({"error": "Staff member not found"}), 404

# Create a new staff member
@app.route('/staff', methods=['POST'])
def create_staff():
    data = request.json
    if not all(key in data for key in ['name', 'position', 'department', 'email', 'phone']):
        return jsonify({"error": "Invalid request data"}), 400
    staff_id = str(uuid.uuid4())
    staff_data[staff_id] = {
        "id": staff_id,
        "name": data['name'],
        "position": data['position'],
        "department": data['department'],
        "email": data['email'],
        "phone": data['phone']
    }
    return jsonify(staff_data[staff_id]), 201

# Update an existing staff member
@app.route('/staff/<staff_id>', methods=['PUT'])
def update_staff(staff_id):
    if staff_id not in staff_data:
        return jsonify({"error": "Staff member not found"}), 404
    data = request.json
    staff_data[staff_id].update({
        key: data[key] for key in ['name', 'position', 'department', 'email', 'phone'] if key in data
    })
    return jsonify(staff_data[staff_id]), 200

# Delete a staff member
@app.route('/staff/<staff_id>', methods=['DELETE'])
def delete_staff(staff_id):
    if staff_id in staff_data:
        deleted_staff = staff_data.pop(staff_id)
        return jsonify(deleted_staff), 200
    return jsonify({"error": "Staff member not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv("PORT", 5000)))
