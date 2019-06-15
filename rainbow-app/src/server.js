const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors());
let max=1;

class Node{
    constructor(value)
    { 
        this.value = value; 
        this.next = null;
        this.id = max;
        max++;
    }
}

class LinkedList { 
    constructor() 
    { 
        this.head = null; 
        this.size = 0; 
    } 
}

const list = new LinkedList();


app.post('/api/resources',(req,res) => {
    
    let node = new Node(req.body.value); 
  
    let curr; 
  
    if (this.head == null) 
        this.head = node; 
    else { 
        curr = this.head; 
  
        while (curr.next) { 
            curr = curr.next; 
        } 
        curr.next = node; 
    } 
    this.size++; 

    res.send({id:node.id,value:node.value});

   
});


app.put('/api/resources/:id',(req,res) => { 
    
    let curr = this.head; 

    while (curr) { 
        if(curr.id === parseInt(req.params.id)){
            curr.value = req.body.value;
            res.send({id:curr.id,value:curr.value});
            return;    
        }
        curr = curr.next; 
    } 
    res.status(404).send("The value doesn't exist");
});

app.delete('/api/resources/:id',(req,res) => { 
    let curr = this.head; 
    let prev = null; 
  
    while (curr != null) { 
  
        if (curr.id === parseInt(req.params.id)) { 
            if (prev == null) { 
                this.head = curr.next; 
            } else { 
                prev.next = curr.next; 
            } 
            this.size--; 
            res.send({id:curr.id,value:curr.value});
            return;
        } 
        prev = curr; 
        curr = curr.next; 
    } 
    res.status(404).send("The value doesn't exist");
});

app.get('/api/resources',(req,res) => {
    let curr = this.head; 
    let arr = []; 
    while (curr) { 
        arr.push({id:curr.id,value:curr.value});
        curr = curr.next; 
    } 
    res.send(arr);
});

app.get('/api/resources/:id',(req,res) => {
    let curr = this.head; 

    while (curr) { 
        if(curr.id === parseInt(req.params.id)){
            res.send({id:curr.id,value:curr.value});
            return;
            
        }
        curr = curr.next;   
    } 
    res.status(404).send("The value doesn't exist");
});


const port = process.env.PORT || 8081 ;

app.listen(port,() => console.log(`Listening on port ${port}`));