// src/utils/email-templates.js

const mjml2html = require('mjml');
const { compile } = require('handlebars');

/**
 * Generates a beautiful contact form notification email using MJML
 * @param {Object} data - The contact form data
 * @returns {Object} The compiled HTML and text versions of the email
 */
export const generateContactEmail = (data) => {
  // MJML template for responsive, beautiful emails
  const mjmlTemplate = `
<mjml>
  <mj-head>
    <mj-title>New Website Contact</mj-title>
    <mj-font name="Figtree" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;700&display=swap" />
    <mj-attributes>
      <mj-all font-family="Figtree, Arial, sans-serif" />
      <mj-text font-size="16px" color="#F0F0F0" line-height="24px" />
      <mj-section padding="20px" />
    </mj-attributes>
    <mj-style>
      .header-section { background-color: #111111; }
      .body-section { background-color: #1A1A1A; }
      .gradient-text {
        background-color: #1A1A1A;
        color: #F0F0F0;
      }
      .contact-table {
        border-collapse: collapse;
        width: 100%;
      }
      .contact-table th, .contact-table td {
        border: 1px solid #333333;
        padding: 12px 15px;
        text-align: left;
      }
      .contact-table th {
        background-color: #111111;
        color: #F0F0F0;
      }
      .contact-table td {
        color: #F0F0F0;
      }
    </mj-style>
  </mj-head>
  <mj-body background-color="#1A1A1A">
    <!-- Header with embedded base64 logo -->
    <mj-section css-class="header-section" padding="30px 0">
      <mj-column>
        <mj-image src="https://res.cloudinary.com/dv7g8veki/image/upload/v1739718392/logo_white_8ba300ca9b.svg" alt="Ittisafur" width="180px" align="center" />
      </mj-column>
    </mj-section>
    
    <!-- Title -->
    <mj-section background-color="#1A1A1A" padding-top="30px" padding-bottom="10px" border-radius="5px 5px 0 0" border="1px solid #333333">
      <mj-column>
        <mj-text align="center" font-size="24px" font-weight="700" css-class="gradient-text">
          New Contact Form Submission
        </mj-text>
        <mj-divider border-color="#333333" border-width="1px" padding="20px 0" />
      </mj-column>
    </mj-section>
    
    <!-- Contact Details -->
    <mj-section background-color="#1A1A1A" padding-top="0" padding-bottom="30px" border-radius="0 0 5px 5px" border-left="1px solid #333333" border-right="1px solid #333333" border-bottom="1px solid #333333">
      <mj-column>
        <mj-table css-class="contact-table">
          <tr>
            <th style="width: 30%; color: #F0F0F0;">Field</th>
            <th style="width: 70%; color: #F0F0F0;">Value</th>
          </tr>
          <tr>
            <td style="color: #F0F0F0;"><strong>Name</strong></td>
            <td style="color: #F0F0F0;">{{name}}</td>
          </tr>
          <tr>
            <td style="color: #F0F0F0;"><strong>Email</strong></td>
            <td style="color: #F0F0F0;"><a href="mailto:{{email}}" style="color: #33D2FF; text-decoration: none;">{{email}}</a></td>
          </tr>
          <tr>
            <td style="color: #F0F0F0;"><strong>Subject</strong></td>
            <td style="color: #F0F0F0;">{{subject}}</td>
          </tr>
          <tr>
            <td style="color: #F0F0F0;"><strong>Message</strong></td>
            <td style="color: #F0F0F0; white-space: pre-line;">{{message}}</td>
          </tr>
          <tr>
            <td style="color: #F0F0F0;"><strong>Submitted</strong></td>
            <td style="color: #F0F0F0;">{{date}}</td>
          </tr>
        </mj-table>
        
        <mj-spacer height="20px" />
        
        <mj-button background="linear-gradient(to right, #9845E8, #33D2FF, #DD5789)" color="#F0F0F0" border-radius="5px" font-weight="500" href="https://ittisafur.com/admin">
          Open Admin Panel
        </mj-button>
      </mj-column>
    </mj-section>
    
    <!-- Footer -->
    <mj-section padding="20px 0">
      <mj-column>
        <mj-text align="center" font-size="14px" color="#F0F0F0">
          &copy; {{year}} Ittisafur.com. All rights reserved.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
  `;

  // Compile the MJML template to HTML
  const { html } = mjml2html(mjmlTemplate);

  // Compile with Handlebars for variable replacement
  const template = compile(html);

  // Generate text version for clients that don't support HTML
  const textTemplate = `
New Contact Form Submission

Name: {{name}}
Email: {{email}}
Subject: {{subject}}
Message: {{message}}
Submitted: {{date}}

Visit your admin panel to respond: https://ittisafur.com/admin
  `;

  const textCompiled = compile(textTemplate);

  // Prepare data for template
  const templateData = {
    name: data.name || 'N/A',
    email: data.email || 'N/A',
    subject: data.subject || 'N/A',
    message: data.message || 'N/A',
    date: new Date(data.createdAt).toLocaleString(),
    year: new Date().getFullYear(),
  };

  // Return both HTML and text versions
  return {
    html: template(templateData),
    text: textCompiled(templateData),
  };
};
