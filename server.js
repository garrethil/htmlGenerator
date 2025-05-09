import express from 'express';

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.post('/generate', (req, res) => {
  const { name, phone } = req.body;

  const template = `
<table cellpadding="0" cellspacing="0" border="0" width="400" style="font-family: Arial, sans-serif; font-size: 14px; background-color: #199aca ; color: #333; ">
  <tr>
    <td style="padding-right: 10px;">
      <img src="https://img.freepik.com/free-psd/gradient-abstract-logo_23-2150689652.jpg?semt=ais_hybrid&w=740" alt="Your Name" width="80" style="border-radius: 50%; margin-left: 50; margin-top: 20;" />
    </td>
    <td>
      <strong style="font-size: 16px; color: #000;">${name}</strong><br />
      <a href="tel:+1234567890" style="color:rgb(232, 50, 26); text-decoration: none;">+1${phone}</a><br />
    </td>
  </tr>
</table>
  `;

  res.setHeader('Content-Disposition', 'attachment; filename="custom.html"');
  res.setHeader('Content-Type', 'text/html');
  res.send(template);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
