# EmailJS Setup Instructions

This document explains how to set up EmailJS for the contact form integration.

## 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your chosen provider
5. Note down your **Service ID**

## 3. Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}} <{{from_email}}>
To: Your Email Address

Message:
{{message}}

---
This message was sent from your website contact form.
```

4. Note down your **Template ID**

## 3.1. Create Auto-Reply Template (Optional)

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure for auto-reply:

```
Subject: Thank you for contacting Creyeti!

Hi {{from_name}},

Thank you for reaching out to us! We've received your message and will get back to you within 24 hours.

Your message:
{{message}}

Best regards,
The Creyeti Team
```

4. Note down your **Auto-Reply Template ID**

## 4. Get Public Key

1. Go to "Account" in your dashboard
2. Find your **Public Key** in the API Keys section

## 5. Update Configuration

### Option A: Using Environment Variables (Recommended)

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace the placeholder values with your actual credentials:

   ```env
   REACT_APP_EMAILJS_SERVICE_ID=your_actual_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=your_actual_template_id
   REACT_APP_EMAILJS_AUTO_REPLY_TEMPLATE_ID=your_auto_reply_template_id
   REACT_APP_EMAILJS_PUBLIC_KEY=your_actual_public_key
   ```

3. The configuration is already set up to use these environment variables in `src/config/emailjs.js`

### Option B: Direct Configuration (Not Recommended for Production)

If you prefer to hardcode the values directly, you can modify `src/config/emailjs.js`:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: "your_actual_service_id",
  TEMPLATE_ID: "your_actual_template_id",
  PUBLIC_KEY: "your_actual_public_key",
};
```

## 6. Test the Integration

1. Start your development server: `npm start` or `yarn start`
2. Navigate to the contact form
3. Fill out and submit the form
4. You'll see toast notifications:
   - **Loading**: "Sending your message..." (while processing)
   - **Success**: "Message sent successfully! We'll get back to you soon." (green toast)
   - **Error**: "Failed to send message. Please try again..." (red toast)
5. Check your email for the message
6. Check the browser console for any error messages

## 7. Toast Notifications

The contact form now includes beautiful toast notifications powered by `react-hot-toast`:

- **Loading State**: Shows while the email is being sent
- **Success State**: Green toast with checkmark when email is sent successfully
- **Error State**: Red toast with error message if something goes wrong
- **Auto-dismiss**: Toasts automatically disappear after a few seconds
- **Custom Styling**: Matches your dark theme with proper contrast and shadows

## Template Parameters

The form sends these parameters to your EmailJS template:

- `from_name`: First Name + Last Name
- `from_email`: User's email address
- `message`: User's message
- `to_name`: "Creyeti Team" (customizable)

## Troubleshooting

- **Email not received**: Check spam folder, verify service configuration
- **Console errors**: Verify all IDs and keys are correct
- **Template not working**: Ensure template variables match the parameter names
- **CORS errors**: Make sure your domain is added to EmailJS allowed origins

## Security Notes

- **Never commit your `.env` file to version control** - it's already in `.gitignore`
- Use environment variables for all environments (development, staging, production)
- The public key is safe to use in frontend code
- Monitor your EmailJS usage to avoid hitting limits
- For production deployment, set environment variables in your hosting platform (Vercel, Netlify, etc.)

## Environment Variables for Different Platforms

### Vercel

Add environment variables in your Vercel dashboard under Project Settings > Environment Variables

### Netlify

Add environment variables in your Netlify dashboard under Site Settings > Environment Variables

### Heroku

```bash
heroku config:set REACT_APP_EMAILJS_SERVICE_ID=your_service_id
heroku config:set REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
heroku config:set REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```
