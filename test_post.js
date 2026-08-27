const url = "https://script.google.com/macros/s/AKfycbyOFnqb4lcLp0D5itWjdrgVGjXIPmua6Gt67mO7ztGDSOdpS_XgEAaRkkb7OxNLebXTfg/exec";

async function testPost() {
  console.log("Sending test POST request to Google Script...");
  
  const formData = new URLSearchParams();
  formData.append("fullName", "Test User");
  formData.append("emailId", "test@example.com");
  formData.append("quizScore", "42");
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });
    
    console.log("Status Code:", response.status);
    const text = await response.text();
    console.log("Response Body:", text);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

testPost();
