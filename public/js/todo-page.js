window.onload = function (){

    const pathParts =  window.location.pathname.split("/");
    const todoId = pathParts.length > 3 ? pathParts[3] : null;

    if(!todoId){

        fetch('/api/todo')
        .then(res => res.json())
        .then(todo => {
            console.log(todo)
            const ul = document.getElementById("unordered-list")
            todo.forEach(task => {
                const li = document.createElement("li")
                li.id = task._id;
                li.textContent = task.title;
                ul.appendChild(li)
            });
        })
    .catch(err => console.error("hata",err))

    }else{
        if(Number(todoId)){
            fetch(`/api/todo/${todoId}`)
            .then(res => res.json())
            .then(task => {
                console.log(task)
            })
        .catch(err => console.error("hata",err))
        }else{
            throw new Error("girilen parametre geçersiz")
        }
    }


   


}

const ul = document.getElementById("unordered-list")

ul.addEventListener("click", (e) => {
    if(e.target.tagName == "LI"){
        const button = e.target.querySelector("button");
        const newButton = document.createElement("button")
        newButton.onclick = deleteHandle
        newButton.textContent = "sil"
        if(!button){
            e.target.append(newButton)
        }else{button.remove()}
    }
})
ul.addEventListener("dblclick", (e) => {
    if(e.target.tagName == "LI"){
        const textArea = document.querySelector("textarea");
        if(!textArea){
            e.target.textContent = ""
            const newTextArea = document.createElement("textarea");
            newTextArea.style.resize = "none"
            newTextArea.value = e.target.textContent
            newTextArea.rows=1;
            newTextArea.cols=e.target.textContent.length;

            const doneBtn = document.createElement("button")
            doneBtn.textContent="tamam"
            doneBtn.onclick = close;
            doneBtn.remove();
            
            const upSibling = e.target.closest("li")
            upSibling.append(newTextArea)
            upSibling.append(doneBtn)
        }
        
    }
})

async function close(e) {

    const textarea = e.target.previousSibling.tagName
    if(textarea === "TEXTAREA"){
        const li = e.target.closest("li")
        
        try {  
            li.textContent = e.target.previousSibling.value
            li.display = "block"
            
            const res = await fetch('/api/todo',{
                method: "PUT",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({title: li.textContent, id: li.id})
            })
    
            if(!res.ok) throw new Error("değiştirme isteği başarısız")
            
            textarea.remove()
            window.location.reload()
            
        } catch (err) {
            console.error("deleteHandle hatası : ",err)
        }
        
        
    }   

}
async function deleteHandle(e){
    const taskId= e.target.closest("li").id
    console.log("çalıştı")

    try {  
        const res = await fetch('/api/todo',{
            method: "DELETE",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({id: taskId})
        })

        if(!res.ok) throw new Error("silme isteği başarısız")
        window.location.reload()
        
    } catch (err) {
        console.error("deleteHandle hatası : ",err)
    }
}

