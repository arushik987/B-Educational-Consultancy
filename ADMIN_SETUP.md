# Admin Panel Setup Instructions

## Firebase Configuration

### 1. Get Your Admin UID
1. Go to Firebase Console (https://console.firebase.google.com/)
2. Select your project: `beducational-ef1ec`
3. Go to Authentication > Users
4. Create a user account for yourself or use an existing one
5. Copy the UID of your user account

### 2. Update Admin UID
Replace `YOUR_ADMIN_UID_HERE` in these files with your actual UID:
- `admin.html` (line with `const ADMIN_UID = "YOUR_ADMIN_UID_HERE";`)
- `firebase-rules.json` (replace both instances)

### 3. Set Firebase Security Rules
1. Go to Firebase Console > Realtime Database > Rules
2. Replace the existing rules with the content from `firebase-rules.json`
3. Make sure to replace `YOUR_ADMIN_UID_HERE` with your actual UID
4. Click "Publish"

### 4. Enable Authentication (Optional)
If you want to use Firebase Authentication instead of simple password:
1. Go to Authentication > Sign-in method
2. Enable Email/Password provider
3. Update the login logic in `admin.html`

## Features

### Admin Panel (`admin.html`)
- **Secure Access**: Only accessible with your UID
- **Real-time Data**: Live updates from Firebase
- **Statistics Dashboard**: 
  - Total students
  - New students this week
  - Students by course category
- **Student Management**:
  - View all student records
  - Search functionality
  - Responsive design matching website theme

### Student Data Collection
- **No Login Required**: Students can submit forms without registration
- **Data Stored**: All form submissions go to Firebase Realtime Database
- **Form Integration**: Both homepage and contact page forms save data

### Data Structure
```json
{
  "students": {
    "unique_id": {
      "name": "Student Name",
      "email": "student@email.com",
      "phone": "1234567890",
      "courseInterest": "engineering",
      "stream": "btech",
      "message": "Student message",
      "timestamp": "2025-01-XX...",
      "source": "homepage" // or "contact-page"
    }
  }
}
```

## Security Features

1. **UID-based Access**: Only your specific UID can access admin panel
2. **Read-only for Admin**: Admin can only read student data, not modify
3. **Write Access for Forms**: Anyone can submit forms (no authentication required)
4. **Data Validation**: Client-side validation before saving

## Usage

1. **Access Admin Panel**: Navigate to `admin.html`
2. **Login**: Enter admin password (default: "admin123")
3. **View Data**: See all student submissions in real-time
4. **Search**: Use search box to find specific students
5. **Statistics**: Monitor enrollment trends and categories

## Customization

- **Change Admin Password**: Update in `admin.html` login function
- **Add More Fields**: Modify form data structure in both forms
- **Styling**: Admin panel uses same theme as main website
- **Additional Features**: Can add export, email notifications, etc.

## Troubleshooting

1. **CORS Issues**: Make sure Firebase rules allow your domain
2. **Authentication Errors**: Verify UID is correct
3. **Data Not Saving**: Check Firebase rules and network connection
4. **Admin Access Denied**: Verify UID matches exactly

## Next Steps

1. Replace `YOUR_ADMIN_UID_HERE` with your actual UID
2. Update Firebase security rules
3. Test form submissions
4. Access admin panel
5. Customize as needed
