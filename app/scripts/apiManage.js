
async function handleApi(){
    const res = await fetch("https://api.github.com/repos/dharineesh235/freshdesk_app/issues",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : "Bearer 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",
            "Connection":"keep-alive"
          },body:JSON.stringify({
                "title": "issue 4",
                "body": "I'm having a problem with issue 2.",
                "labels": [
                    "bug"
                ]
            })
    })
    const data = await res.json();
    console.log(data);
}

handleApi()