# Database Schema Documentation

## 📁 Database Information

| Property | Value |
|----------|-------|
| **Database Name** | `students` |
| **Schema** | `public` |

## 📊 Table: `students`

### Table Structure
| Property | Description |
|----------|-------|
| `id` | Auto-incrementing unique identifier |
| `name` Student's full name |
| `email`| Student's email address |
| `age` | Student's age 1-120 |
| `created_at` | Record creation timestamp |
| `updated_at` | Last update timestamp |

## 🔧 Database Functions

### 1. `fn_get_all_students()`

**Purpose:** Retrieve all students ordered by creation date

**Parameters:** None

**Returns:** Table with columns: `id`, `name`, `email`, `age`, `created_at`

---

### 2. `fn_get_student_by_id(p_id INTEGER)`

**Purpose:** Retrieve a single student by ID

**Parameters:**
- `p_id` - Student ID 

**Returns:** Table with columns: `id`, `name`, `email`, `age`, `created_at`

---

### 3. `fn_create_student(p_name VARCHAR, p_email VARCHAR, p_age INTEGER)`

**Purpose:** Create a new student record

**Parameters:**
- `p_name` - Student name 
- `p_email` - Student email 
- `p_age` - Student age 

**Returns:** Table with columns: `id`, `name`, `email`, `age`, `created_at`

---

### 4. `fn_update_student(p_id INTEGER, p_name VARCHAR, p_email VARCHAR, p_age INTEGER)`

**Purpose:** Update an existing student

**Parameters:**
- `p_id` - Student ID to update 
- `p_name` - New name 
- `p_email` - New email 
- `p_age` - New age 

**Returns:** Table with columns: `id`, `name`, `email`, `age`, `created_at`, `updated_at`

---

### 5. `fn_delete_student(p_id INTEGER)`

**Purpose:** Delete a student

**Parameters:**
- `p_id` - Student ID to delete (INTEGER)

**Returns:** `VOID`

---

### 6. `fn_get_students_by_age_range(p_min_age INTEGER, p_max_age INTEGER)`

**Purpose:** Get students within an age range

**Parameters:**
- `p_min_age` - Minimum age 
- `p_max_age` - Maximum age 

**Returns:** Table with columns: `id`, `name`, `email`, `age`, `created_at`

---

### 7. `fn_get_student_statistics()`

**Purpose:** Get aggregate statistics about all students

**Parameters:** None

**Returns:** Table with columns:
- `total_students` 
- `average_age` 
- `min_age` 
- `max_age` 
