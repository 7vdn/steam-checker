
function verifyOrder() {
    const orderNumber = document.getElementById('orderNumber').value;

    if (!orderNumber) {
        showError('الرجاء إدخال رقم الطلب');
        return;
    }

    document.getElementById('requestForm').classList.add('hidden');
    document.getElementById('loadingScreen').classList.remove('hidden');

    fetch("https://hooks.zapier.com/hooks/catch/22574065/2x1gknr/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ order_id: orderNumber })
    })
    .then(response => {
        if (!response.ok) throw new Error("فشل الاتصال بـ Zapier");
        return response.text();
    })
    .then(() => {
        document.getElementById('verificationCode').textContent = orderNumber;
        document.getElementById('loadingScreen').classList.add('hidden');
        document.getElementById('codeDisplay').classList.remove('hidden');
    })
    .catch(error => {
        showError(error.message || 'حدث خطأ أثناء التحقق');
    });
}

function showError(message) {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('requestForm').classList.add('hidden');
    document.getElementById('loadingScreen').classList.add('hidden');
    document.getElementById('errorDisplay').classList.remove('hidden');
}

function copyCode() {
    const code = document.getElementById('verificationCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('تم نسخ الكود بنجاح');
    });
}

function newRequest() {
    document.getElementById('orderNumber').value = '';
    document.getElementById('requestForm').classList.remove('hidden');
    document.getElementById('loadingScreen').classList.add('hidden');
    document.getElementById('codeDisplay').classList.add('hidden');
    document.getElementById('errorDisplay').classList.add('hidden');
}
