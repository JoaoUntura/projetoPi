export async function getUsers(req,res) {
    try{
        const users = [
            {name: 'Lucas', age: 23},
            {name: 'João', age: 25},
            {name: 'Maria', age: 30}
        ];
        res.status(201).json({'users': users});
    }catch(e){
        res.status(500).json({'error': e});
    }
}
 

export async function createUser(req,res) {
    const data = req.body;
    res.status(201).json({'dados': data});
} 