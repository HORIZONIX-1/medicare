# Bug Fix: Separate Chief Complaint and Doctor Notes Fields

## Issue
Previously, both "Chief Complaint" (field 1) and "Doctor Notes" (field 6) were updating the same `notes` field in the database. They are now separate fields.

## Changes Made

### 1. Database Schema (Prisma)
**File**: `backend/src/prisma/schema.prisma`
- Added `chief_complaint String?` field to the `Consultation` model
- Kept `notes String?` field for doctor notes
- These are now two separate fields

### 2. Backend Service
**File**: `backend/src/modules/consultations/consultation.service.ts`
- Updated `updateConsultation()` function to handle both `chief_complaint` and `notes` fields
- Now accepts either field independently or both together

### 3. Frontend - Chief Complaint Component
**File**: `frontend/components/opd/ChiefComplaintCard.tsx`
- Fixed the API call to send `{ chief_complaint: complaint }` instead of `{ notes: complaint }`
- Now updates the correct database field

### 4. Frontend - Doctor Notes Component
**File**: `frontend/components/opd/DoctorNotesCard.tsx`
- Already correctly sends `{ notes }` - no changes needed

### 5. Frontend Type Definitions
**File**: `frontend/types/consultation.ts`
- Already has both `chief_complaint` and `notes` fields - no changes needed

## Database Migration Required

Run the following SQL command on your database:

```sql
ALTER TABLE `Consultation` ADD COLUMN `chief_complaint` VARCHAR(191) NULL;
```

**When**: Before deploying the new backend code, or run this immediately if you're testing in development.

## Testing

1. Go to an OPD consultation page
2. Enter data in "1. Chief Complaint" field and save
3. Verify it updates the database's `chief_complaint` column
4. Enter data in "6. Doctor Notes" field and save
5. Verify it updates the database's `notes` column
6. Reload the page and verify both fields are populated correctly

## Files Modified
- ✅ `backend/src/prisma/schema.prisma`
- ✅ `backend/src/modules/consultations/consultation.service.ts`
- ✅ `frontend/components/opd/ChiefComplaintCard.tsx`
- 📝 `backend/ADD_CHIEF_COMPLAINT.sql` (migration script)
