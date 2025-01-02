// Function to evaluate the sigma sum
function evaluateSigma() {
    // Dapatkan nilai dari form
    const k = parseInt(document.getElementById('lowerLimit').value);
    const n = parseInt(document.getElementById('upperLimit').value);
    let expression = document.getElementById('expression').value;

    // Validasi input
    if (isNaN(k) || isNaN(n) || !expression) {
        document.getElementById('result').textContent = 'Result: Invalid input';
        document.getElementById('steps').innerHTML = '';
        return;
    }

    // Tampilan langkah-langkah
    let steps = `<strong>Langkah-langkah perhitungan:</strong><br>`;
    steps += `1. Definisikan batas:<br>`;
    steps += `&nbsp;&nbsp;&nbsp;&nbsp;Batas Bawah: ${k}<br>`;
    steps += `&nbsp;&nbsp;&nbsp;&nbsp;Batas Atas: ${n}<br>`;
    steps += `2. Tentukan ekspresi:<br>`;
    steps += `&nbsp;&nbsp;&nbsp;&nbsp;Ekspresi: ${expression}<br><br>`;
    steps += `3. Substitusi dan Evaluasi:<br>`;

    // Regex untuk mendeteksi konstanta di depan variabel k
    const regex = /(\d*)\*?k/g;

    // Evaluasi jumlah sigma dan catat langkah-langkahnya
    let result = 0;
    let resultTable = '<tr><th>Step</th><th>Expression</th><th>Value</th></tr>';
    for (let i = k; i <= n; i++) {
        let evalExpr = expression.replace(regex, function(match, p1) {
            return `${p1 ? p1 : 1}*${i}`;
        });
        // Simpan bentuk formal ekspresi sebelum mengganti pangkat
        let formalExpr = evalExpr.replace(/Math\.pow\((\d+),(\d+)\)/g, '$1^$2');
        evalExpr = evalExpr.replace(/(\d+)\^(\d+)/g, 'Math.pow($1,$2)');
        const value = eval(evalExpr);
        result += value;
        resultTable += `<tr><td>k=${i}</td><td>${formalExpr}</td><td>${value}</td></tr>`;
        steps += `&nbsp;&nbsp;&nbsp;&nbsp;Untuk k=${i}: ${formalExpr} = ${value}<br>`;
    }

    steps += `<br>4. Jumlahkan Nilai-nilai:<br>`;
    steps += `&nbsp;&nbsp;&nbsp;&nbsp;Total: ${result}<br>`;

    resultTable += `<tr><td colspan="2"><strong>Total</strong></td><td><strong>${result}</strong></td></tr>`;

    // Tampilkan hasil dan langkah-langkah
    document.getElementById('result').innerHTML = '<table>' + resultTable + '</table>';
    document.getElementById('steps').innerHTML = steps;
}

// Event listeners untuk input real-time
document.getElementById('lowerLimit').addEventListener('input', evaluateSigma);
document.getElementById('upperLimit').addEventListener('input', evaluateSigma);
document.getElementById('expression').addEventListener('input', evaluateSigma);
