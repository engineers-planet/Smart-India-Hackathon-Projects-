import twilio from 'twilio';

export default function sendMessage(req, res) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const phone_no = process.env.TWILIO_PHONE_NUMBER;
  const client = twilio(accountSid, token);
  const { phone, message } = req.body;
  // console.log(phone, message);
  client.messages
    .create({
      body: message,
      from: '+13854173767',
      to: phone,
    })
    .then((message) =>
      res.json({
        success: true,
      }),
    )
    .catch((error) => {
      console.log(error);
      res.json({
        success: false,
      });
    });
}
