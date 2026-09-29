const notes=JSON.parse(localStorage.getItem("studyNotes")||"[]");
const tasks=JSON.parse(localStorage.getItem("studyTasks")||"[]");

function renderNotes(){
  const box=document.getElementById("notesList");
  box.innerHTML=notes.length?notes.map((n,i)=>`<div class="note"><h4>${escapeHtml(n.title)}</h4><p>${escapeHtml(n.text)}</p></div>`).join(""):"<p style='color:#777'>No notes saved yet.</p>";
}
function addNote(){
  const title=document.getElementById("noteTitle").value.trim();
  const text=document.getElementById("noteText").value.trim();
  if(!title||!text){alert("Please enter both topic and notes.");return}
  notes.unshift({title,text});localStorage.setItem("studyNotes",JSON.stringify(notes));
  document.getElementById("noteTitle").value="";document.getElementById("noteText").value="";renderNotes();
}
function renderTasks(){
  const box=document.getElementById("taskList");
  box.innerHTML=tasks.length?tasks.map((t,i)=>`<div class="task ${t.done?"done":""}"><input type="checkbox" ${t.done?"checked":""} onchange="toggleTask(${i})"><span>${escapeHtml(t.text)}</span></div>`).join(""):"<p style='color:#777'>No tasks added yet.</p>";
  const done=tasks.filter(t=>t.done).length, pct=tasks.length?Math.round(done/tasks.length*100):0;
  document.getElementById("progressText").textContent=pct+"%";document.getElementById("progressBar").style.width=pct+"%";
}
function addTask(){
  const el=document.getElementById("taskText"), text=el.value.trim();
  if(!text){alert("Enter a study task.");return}
  tasks.push({text,done:false});localStorage.setItem("studyTasks",JSON.stringify(tasks));el.value="";renderTasks();
}
function toggleTask(i){tasks[i].done=!tasks[i].done;localStorage.setItem("studyTasks",JSON.stringify(tasks));renderTasks()}

const quiz=[
 {q:"Which language is mainly used to style a web page?",o:["HTML","CSS","SQL","Python"],a:1},
 {q:"Which HTML tag creates a hyperlink?",o:["<p>","<img>","<a>","<link>"],a:2},
 {q:"Which JavaScript keyword declares a variable?",o:["let","style","select","table"],a:0},
 {q:"What does CRUD stand for?",o:["Create Read Update Delete","Code Run Use Design","Create Run Update Data","Copy Read Use Delete"],a:0}
];
let qIndex=0,answered=false;
function loadQuestion(){
  answered=false;const q=quiz[qIndex];
  document.getElementById("question").textContent=qIndex+1+". "+q.q;
  document.getElementById("options").innerHTML=q.o.map((x,i)=>`<button class="option" onclick="answer(${i})">${escapeHtml(x)}</button>`).join("");
  document.getElementById("quizResult").textContent="";
}
function answer(i){
  if(answered)return;answered=true;
  document.getElementById("quizResult").textContent=i===quiz[qIndex].a?"✅ Correct!":"❌ Not correct. Try the next question.";
}
function nextQuestion(){qIndex=(qIndex+1)%quiz.length;loadQuestion()}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
renderNotes();renderTasks();loadQuestion();
