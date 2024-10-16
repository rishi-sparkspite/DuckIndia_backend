const admin = require("firebase-admin");

async function initializeFirebaseAdmin() {
  const serviceAccount = {
    type: "service_account",
    project_id: "duckindia-cefc3",
    private_key_id: "5b598a310df1a2a154bb18fa4d1f13be86af86ce",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9sJJP6lLTlMQg\n9gl9zU1/JG1Zgy0X6tbyYu2DP9bzovmqEU3BZ6ewV5r+2Z+Fve8jUVW+zIw4EvSm\nqnfTsOCqyRXwRVyetzqVO7/rHaDe0s6+h22jA8TZ5oJ2Qz5qgQ6/er12H1/G7L1/\nOm0jSQVIt0xQbgRyMvrlvgLNkVruQN4NULmro9KOuIdQRWSHMB9areOOOrslwIoB\nGcp4snQfhVIR9Vdz4XXGsyTdzh5Vounqw21Ktu5igVg/74UsmYSlhTySoWqJuGlo\n+GJi4kkF3imTiMv8luimuKQLUWRW/SeGyfD9NDUbn8WNrQUK5fpG5zcw2isIbuxm\nlTBVI5G1AgMBAAECggEAAQI9gsu1ij5QnTvf4CmaZRzU4h1Ehuk+5X++OFaZDdOY\nYBs2fVEZ23DtXRp5g/z3B/avZpFpU7bIF6IdZ3DjiKqDNUIvoeNKNt5z1v+6bvRN\nxUYdwJ/Zcu7RGF8ZrKlb7ClCHFQ4k39CiFZZdFi3stdujBjfhukZEiDksAm/+8sY\n0PFZNnXWS1mNQTC9QDRTOj35A/HpvxoC3Vttv8AIucV84UX1VJS4MeeB4epmYP/H\nVyTjH6S9SuCr5VkHbt1nrOlVy9lzxaXBAHfW0xVNhamuDJuu/d6h18DJ8LGs1S1x\nSXLXM8Y5Q1X3VAN8w/wKKEphbxyWnPr7M9rjj3D5KQKBgQDy/RvhXhqerSoOTNmU\nChB/F3Ci8rPlyAtVGnQbtMkDjO8Qr7TTnxqw4XG/4s2ie9XYTdqkBVhXTLcd1KX+\noZBN5HSiSZeiygLfY/u/L+dGUYc1TlbDgCbs9YCf7EZoCQLM5DAEisK8hDr3UWOb\nWiTNM6OOsQMS8Vv70SGF2Ol/zQKBgQDH2NcBt/b4VMQH/9oQ+LlgtERsN66rJc6L\nbs0ZotVbTQfT6ma4Li8GqJelrR4EI5dIcvjyd5opscrYucvlr94dctfVk5g/YHRh\ncVlQJ5m7+V1lJijnvvoz08leaUJlJ6aHsPyF7+tygHuq7AhtZdyoySILKK6vT83U\nYcwu6UfhiQKBgDq+flMJ0R2zd4tlgOSNWlefbxe13VAcAMFeV9uq5T36gIFkOS9A\nM8+3cSyWxGgX0CcvC0DEGgtg/JQ1qLvai2yJYrkpWYN9mxwuq9oY1qzlYO6+NbOl\n88Mtxx7inFLies7WC9XNRi8VOLw57P7N2D/T0CLbIIcf2sESWixluG2xAoGBAJCR\nY1AB9a3FHB4xTl2yn9+96DVkvn1elyC0obgm3DL08XGygmZAOpKViUY3ipwx5vFp\nAn/cV3BMBlJrbX2VkJc7Cbmd0KggLXCEH7jlPMgHZzGRvkuPEs5FKcmbWYV1fnlw\nZey6F1e4bD3EC4CgDFUpUvBBmMSHdX1q1dsltHMJAoGAA6VLzZ4b4dkhStVCBHUf\nMrJQ9EkISNiS1DP+TPmSQ35bufhCZBBumKYrOztWvbgosAnUK06wfwHUPvaR6N8n\ncNIWQXUgM1pi9ZElB3r8VJ6mb7QbSkzUSt90N19cY/NX2THHh7KaYI5tN3Jcq7FJ\nDCiCeZ7jb2XyPHwcNPCqAE8=\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-ojo8g@duckindia-cefc3.iam.gserviceaccount.com",
    client_id: "102813689156048215670",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ojo8g%40duckindia-cefc3.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  };
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase connected.");
}

module.exports = { initializeFirebaseAdmin };
