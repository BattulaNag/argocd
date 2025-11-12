<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Simple Form</title>
</head>
<body>
<div id="root">
  <h2>Submit a note</h2>
  <form id="noteForm">
    <input id="text" placeholder="type note" />
    <button type="submit">Send</button>
  </form>
  <ul id="notes"></ul>
</div>

<script>
const form = document.getElementById('noteForm');
const notes = document.getElementById('notes');

async function load(){
  const r = await fetch('http://localhost:4000/api/notes');
  const j = await r.json();
  notes.innerHTML = j.map(n => '<li>'+n.text+'</li>').join('');
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const text = document.getElementById('text').value;
  await fetch('http://localhost:4000/api/notes', {
    method:'POST',
    headers:{'content-type':'application/json'},
    body:JSON.stringify({text})
  });
  document.getElementById('text').value = '';
  await load();
});

load();
</script>
</body>
</html>
