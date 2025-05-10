import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());
app.use(express.static('public'));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.post('/generate/:template', (req, res) => {
  const { template } = req.params;
  const filePath = path.join(__dirname, 'templates', `${template}.html`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Template not found');
  }

  let html = fs.readFileSync(filePath, 'utf8');

  Object.entries(req.body).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`;
    html = html.split(placeholder).join(value);
  });

  res.setHeader('Content-Disposition', `attachment; filename="${template}.html"`);
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
