document.getElementById('convert').addEventListener('click', function() {
  const input = document.getElementById('input').value;
  const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const processedLines = lines.map(line => line.replace(/"/g, '"+UnicodeToLetter(34)+"'));
  const output = 'Execute({' + processedLines.map(line => `"${line}"`).join(', ') + '})';
  document.getElementById('output').textContent = output;
  
  // Show the copy button if there is output
  if (output.trim() !== '') {
    document.getElementById('copy').style.display = 'block';
  } else {
    document.getElementById('copy').style.display = 'none';
  }
});

document.getElementById('copy').addEventListener('click', function() {
  const output = document.getElementById('output').textContent;
  navigator.clipboard.writeText(output).then(function() {
    alert('Copied to clipboard');
  }, function(err) {
    console.error('Could not copy text: ', err);
  });
});
