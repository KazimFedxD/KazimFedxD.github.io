# EmailJS Setup Instructions

To enable the contact form to send emails, follow these steps:

## 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Create an Email Service

1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the instructions to connect your email
5. Note down your **Service ID** (e.g., `service_abc123`)

## 3. Create an Email Template

1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: {{subject}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

## 4. Get Your Public Key

1. Go to "Account" > "General"
2. Find your **Public Key** (e.g., `AbCdEfGhIjKlMnOp`)

## 5. Update the Contact Form

Open `src/pages/Contact.js` and replace the placeholders:

```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',    // Replace with your Service ID
  'YOUR_TEMPLATE_ID',   // Replace with your Template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject || 'Portfolio Contact',
    message: formData.message,
  },
  'YOUR_PUBLIC_KEY'     // Replace with your Public Key
);
```

## 6. Test the Form

1. Run `npm start` to start the development server
2. Navigate to the Contact page
3. Fill out and submit the form
4. Check your email for the message

## Example Configuration

```javascript
await emailjs.send(
  'service_abc123',
  'template_xyz789',
  {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject || 'Portfolio Contact',
    message: formData.message,
  },
  'AbCdEfGhIjKlMnOp'
);
```

## Troubleshooting

- **Form doesn't send**: Check browser console for errors
- **Wrong email received**: Verify template variables match the send() parameters
- **Emails go to spam**: Add your domain to EmailJS whitelist
- **Rate limits**: Free tier allows 200 emails/month

## Alternative: Direct Email Link

If you prefer not to set up EmailJS, users can still contact you via:
- Email: abbaskazim135@gmail.com
- The form will show a fallback message directing them to email you directly
