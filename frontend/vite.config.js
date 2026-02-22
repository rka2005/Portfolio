import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// Dev middleware plugin — makes /api/contact work locally (like Vercel serverless)
function apiDevMiddleware() {
  return {
    name: 'api-contact-middleware',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ message: 'Method not allowed' }));
        }

        // Parse request body
        let body = '';
        req.on('data', chunk => (body += chunk));
        req.on('end', async () => {
          try {
            const { name, email, message } = JSON.parse(body);

            if (!name || !email || !message) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              return res.end(JSON.stringify({ message: 'All fields are required' }));
            }

            // Load env vars (non-VITE_ vars aren't exposed to client, but we can read them here)
            const env = loadEnv('', process.cwd(), '');

            // Send email via Nodemailer
            const nodemailer = await import('nodemailer');
            const transporter = nodemailer.default.createTransport({
              service: 'gmail',
              auth: {
                user: env.GMAIL_USER,
                pass: env.GMAIL_APP_PASSWORD,
              },
            });

            await transporter.sendMail({
              from: `"Portfolio Contact" <${env.GMAIL_USER}>`,
              to: env.GMAIL_USER,
              replyTo: email,
              subject: `New Contact Message from ${name}`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #6c63ff;">New Contact Form Submission</h2>
                  <hr style="border: 1px solid #eee;" />
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Message:</strong></p>
                  <p style="background: #f5f5f5; padding: 15px; border-radius: 8px;">${message}</p>
                  <hr style="border: 1px solid #eee;" />
                  <p style="color: #888; font-size: 12px;">Sent from your Portfolio contact form</p>
                </div>
              `,
            });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Message sent successfully!' }));
          } catch (error) {
            console.error('Dev API error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Server Error: ' + error.message }));
          }
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [apiDevMiddleware(), react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: ['.trycloudflare.com'],
  }
})
