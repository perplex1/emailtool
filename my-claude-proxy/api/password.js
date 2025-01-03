   module.exports = async (req, res) => {
     // Set CORS headers
     res.setHeader('Access-Control-Allow-Credentials', 'true');
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

     // Handle preflight request
     if (req.method === 'OPTIONS') {
       res.status(200).end();
       return;
     }

     if (req.method !== 'POST') {
       res.status(405).json({ error: 'Method Not Allowed' });
       return;
     }

     const { password } = req.body;
     const correctPassword = process.env.PASSWORD; // Ensure this is set in Vercel

     if (password === correctPassword) {
       res.status(200).json({ success: true });
     } else {
       res.status(401).json({ error: 'Incorrect password' });
     }
   };