
const form = document.getElementById("todoForm");

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);

    const payload = {
        title: fd.get('title'),
        description: fd.get('description'),
        completed: fd.get('completed') == "on" || fd.get('completed') === 'true',
        createdAt: new Date().toISOString()
    }

    try {
        const res= await fetch('/api/todo', {
            method: 'POST',
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(payload)
        })

        if(!res.ok) throw new Error("sunucu hatası" + res.status);
        console.log("try çalıştı")

        setTimeout(() => {
             window.location.href = "/pages/todo.html"
        },500)
       

    } catch (error) {
        console.error(error)
    }
    
})