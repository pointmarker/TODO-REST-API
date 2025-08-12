const mongoose = require("mongoose");

//kullanılacak şemanın yaratılması
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});


todoSchema.statics.addNote = async function(title,description,completed,createdAt){
  const newNote = new this({
    title,
    description,
    completed,
    createdAt
  })

  return newNote.save()
}


//modeli dışa aktarırken kullanılacak isim
const Todo = mongoose.model('Todo', todoSchema);

//dışa aktar
module.exports = Todo;
