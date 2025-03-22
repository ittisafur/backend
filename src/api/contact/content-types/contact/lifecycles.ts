/**
 * Lifecycle callbacks for the `contact` model.
 */
import { generateContactEmail } from '../../../../utils/email-templates';

interface ContactEntry {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface LifecycleEvent {
  result: ContactEntry;
  params: {
    data: Partial<ContactEntry>;
  };
}

export default {
  async afterCreate(event: LifecycleEvent): Promise<void> {
    const { result } = event;

    // Check if this is the published version (or if this content type doesn't use drafts)
    // Only send email for published content to avoid duplicates
    if (!result.publishedAt) {
      console.log(`[Lifecycle Skip] Contact ID: ${result.id} is not published yet, skipping email`);
      return;
    }

    try {
      if (!result.email || !result.name) {
        console.error('Contact submission missing required fields:', result);
        return;
      }

      console.log(`[Email Trigger] Sending email for published contact ID: ${result.id}`);

      // Generate beautiful email using the template
      const emailContent = generateContactEmail(result);

      // Send email asynchronously without awaiting to improve performance
      strapi
        .plugin('email')
        .service('email')
        .send({
          to: 'contact@ittisafur.com',
          from: process.env.ZOHO_SMTP_USER as string,
          subject: `New Website Contact: ${result.subject || 'No Subject'}`,
          text: emailContent.text,
          html: emailContent.html,
        })
        .then(() => {
          console.log(`[Email Sent] Successfully sent notification for contact #${result.id}`);
        })
        .catch((err) => {
          console.error(`[Email Error] Failed to send email for contact #${result.id}:`, err.message);
        });
    } catch (error) {
      console.error(`[Lifecycle Error] Error in contact lifecycle hook:`, error);
    }
  },

  // Optionally add an afterUpdate hook to handle cases where a draft is published later
  async afterUpdate(event: LifecycleEvent): Promise<void> {
    const { result } = event;

    // Check if this update operation is a publish action
    // This happens when publishedAt was null before and now has a value
    if (result.publishedAt && event.params?.data?.publishedAt) {
      console.log(`[Lifecycle Update] Contact ID: ${result.id} was just published, sending email`);

      try {
        if (!result.email || !result.name) {
          console.error('Contact submission missing required fields:', result);
          return;
        }

        console.log(`[Email Trigger] Sending email for newly published contact ID: ${result.id}`);

        // Generate beautiful email using the template
        const emailContent = generateContactEmail(result);

        // Send email asynchronously
        strapi
          .plugin('email')
          .service('email')
          .send({
            to: 'contact@ittisafur.com',
            from: process.env.ZOHO_SMTP_USER as string,
            subject: `New Website Contact: ${result.subject || 'No Subject'}`,
            text: emailContent.text,
            html: emailContent.html,
          })
          .then(() => {
            console.log(`[Email Sent] Successfully sent notification for contact #${result.id}`);
          })
          .catch((err) => {
            console.error(`[Email Error] Failed to send email for contact #${result.id}:`, err.message);
          });
      } catch (error) {
        console.error(`[Lifecycle Error] Error in contact afterUpdate hook:`, error);
      }
    }
  },
};
