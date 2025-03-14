export default ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, // Set to false if using STARTTLS
        auth: {
          user: env('ZOHO_SMTP_USER'), // Your Zoho email
          pass: env('ZOHO_SMTP_PASSWORD'), // Your app password
        },
      },
      settings: {
        defaultFrom: env('ZOHO_SMTP_USER'),
        defaultReplyTo: env('ZOHO_SMTP_USER'),
      },
    },
  },
});
